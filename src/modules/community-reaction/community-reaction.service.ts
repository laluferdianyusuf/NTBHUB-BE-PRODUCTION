import { CommunityReactionRepository } from "modules/community-reaction/community-reaction.repository";

export class CommunityReactionServices {
  private reactionRepo = new CommunityReactionRepository();

  async getReactions(postId: string) {
    console.log(postId);

    return this.reactionRepo.findByPost(postId);
  }

  async addReaction(postId: string, userId: string, type: string) {
    return this.reactionRepo.create({ postId, userId, type });
  }

  async removeReaction(reactionId: string) {
    return this.reactionRepo.delete(reactionId);
  }
}
