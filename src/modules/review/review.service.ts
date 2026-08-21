import { prisma } from "config/prisma";
import { BookingRepository } from "modules/booking/booking.repository";
import { ReviewRepository } from "modules/review/review.repository";
import { VenueRepository } from "modules/venue/venue.repository";
import { uploadImage } from "utils/uploadS3";
const reviewRepository = new ReviewRepository();
const venueRepository = new VenueRepository();
const bookingRepository = new BookingRepository();

export class ReviewServices {
  async createReview(
    data: { bookingId: string; rating: number; comment?: string },
    file?: Express.Multer.File,
  ) {
    const { bookingId, rating, comment } = data;

    let imageUrl: string | null = null;

    if (file && file.path) {
      const image = await uploadImage({ file, folder: "reviews" });
      imageUrl = image.url;
    }

    return prisma.$transaction(async (tx) => {
      const booking = await bookingRepository.findBookingById(bookingId, tx);

      if (!booking) {
        throw new Error("Booking not found");
      }

      if (booking.review) {
        throw new Error("Review already exists");
      }

      if (booking.status !== "COMPLETED") {
        throw new Error("Cannot review uncompleted booking");
      }

      const review = await reviewRepository.create(
        {
          rating: Number(rating),
          comment,
          image: imageUrl,
          booking: { connect: { id: bookingId } },
        },
        tx,
      );

      const aggregation = await reviewRepository.aggregateByVenue(
        booking.venueId,
        tx,
      );

      await venueRepository.updateRating(
        booking.venueId,
        aggregation._avg.rating ?? 0,
        aggregation._count.rating,
        tx,
      );

      return review;
    });
  }

  async getReviewById(id: string) {
    try {
      const review = await reviewRepository.findById(id);

      if (!review) {
        return {
          status: false,
          status_code: 404,
          message: "Review not found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "Internal server error",
        data: null,
      };
    }
  }

  async getReviewByBookingId(bookingId: string) {
    const review = await reviewRepository.findByBookingId(bookingId);

    return review;
  }

  async getVenueRating(venueId: string) {
    const [ratingResult, reviews] = await Promise.all([
      reviewRepository.getRatingByVenueId(venueId),
      reviewRepository.findManyByVenueId(venueId),
    ]);

    const rating = Number((ratingResult._avg.rating ?? 0).toFixed(2));

    return {
      rating,
      totalReviews: ratingResult._count.rating,

      ratings: reviews.map((review) => review.rating),

      reviewers: reviews.map((review) => ({
        id: review.booking.user.id,
        name: review.booking.user.name,
        email: review.booking.user.email,
        photo: review.booking.user.photo,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      })),
    };
  }
}
