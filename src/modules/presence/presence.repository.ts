import { BaseRepository } from "shared/database";

export class PresenceRepository extends BaseRepository {
  upsert(userId: string, context: string, contextId?: string) {
    return this.db.userPresenceSnapshot.upsert({
      where: { id: `${userId}:${context}:${contextId ?? "global"}` },
      update: { lastSeen: new Date() },
      create: {
        id: `${userId}:${context}:${contextId ?? "global"}`,
        userId,
        context,
        contextId,
        lastSeen: new Date(),
      },
    });
  }

  list(context: string, contextId?: string) {
    return this.db.userPresenceSnapshot.findMany({
      where: { context, contextId },
    });
  }
}
