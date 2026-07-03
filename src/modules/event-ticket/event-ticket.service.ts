import { EventTicketRepository } from "modules/event-ticket/event-ticket.repository";

export class EventTicketService {
  private repo = new EventTicketRepository();

  async getTicketById(id: string) {
    const result = await this.repo.findById(id);

    return result;
  }

  async getTicketByUserId(userId: string) {
    const result = await this.repo.findByUserId(userId);

    return result;
  }

  async getTicketByOrderId(orderId: string) {
    const result = await this.repo.findByOrderId(orderId);

    return result;
  }
}
