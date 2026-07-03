import { prisma } from "config/prisma";

export class CommentLikeRepository {
  async likeComment(commentId: string, userId: string) {
    return await prisma.$transaction([
      prisma.commentLike.create({
        data: {
          commentId,
          userId,
        },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      }),
    ]);
  }

  async unlikeComment(commentId: string, userId: string) {
    return await prisma.$transaction([
      prisma.commentLike.delete({
        where: {
          commentId_userId: { commentId, userId },
        },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      }),
    ]);
  }

  async isLikedByUser(commentId: string, userId: string) {
    return await prisma.commentLike.findUnique({
      where: {
        commentId_userId: { commentId, userId },
      },
    });
  }

  async findLikedCommentIds(userId: string, commentIds: string[]) {
    if (!commentIds.length) return new Set<string>();

    const likes = await prisma.commentLike.findMany({
      where: {
        userId,
        commentId: { in: commentIds },
      },
      select: { commentId: true },
    });

    return new Set(likes.map((like) => like.commentId));
  }
}
