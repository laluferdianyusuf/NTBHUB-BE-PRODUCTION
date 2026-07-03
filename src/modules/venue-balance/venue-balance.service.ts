import { VenueBalanceRepository } from "modules/venue-balance/venue-balance.repository";
const venueBalanceRepository = new VenueBalanceRepository();

export class VenueBalanceServices {
  async getVenueBalance(venueId: string) {
    const balance = await venueBalanceRepository.getBalanceByUserId(venueId);

    return {
      balance,
    };
  }
}
