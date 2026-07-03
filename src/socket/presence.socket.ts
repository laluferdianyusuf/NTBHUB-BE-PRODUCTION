import { PresenceService } from "modules/presence/presence.service";

const service = new PresenceService();

const safeAsyncHandler =
  (handler: (...args: any[]) => Promise<void>) =>
  async (...args: any[]) => {
    try {
      await handler(...args);
    } catch (err) {
      console.error("[SOCKET] Handler error:", err);
    }
  };

export const registerPresenceSocket = (io: any, socket: any) => {
  const userId = socket.user.sub;

  socket.on(
    "presence:auto-init",
    safeAsyncHandler(async ({ lat, lng }: { lat: number; lng: number }) => {
      await service.heartbeat(userId, "global", lat, lng);
    }),
  );

  socket.on(
    "presence:radius-bulk",
    safeAsyncHandler(
      async ({
        targets,
      }: {
        targets: { id: string; lat: number; lng: number; radius: number }[];
      }) => {
        if (!Array.isArray(targets)) return;

        const results: { id: string; total: number }[] = [];

        for (const t of targets) {
          const users = await service.getNearbyOnlineUsers(
            t.lat,
            t.lng,
            t.radius,
            "global",
          );

          results.push({ id: t.id, total: users.length });
        }

        socket.emit("presence:radius-bulk:result", results);
      },
    ),
  );

  socket.on(
    "presence:join",
    safeAsyncHandler(
      async ({
        context,
        contextId,
        lat,
        lng,
      }: {
        context: string;
        contextId?: string;
        lat: number;
        lng: number;
      }) => {
        const room = `${context}:${contextId}`;

        socket.join(room);

        await service.heartbeat(userId, context, lat, lng, contextId);

        const count = await service.countOnline(context, contextId);

        io.to(room).emit("presence:update", {
          context,
          contextId,
          count,
        });
      },
    ),
  );

  socket.on(
    "presence:nearby",
    safeAsyncHandler(
      async ({
        lat,
        lng,
        radius,
      }: {
        lat: number;
        lng: number;
        radius: number;
      }) => {
        const users = await service.getNearbyOnlineUsers(
          lat,
          lng,
          radius,
          "global",
        );

        socket.emit("presence:nearby:result", {
          total: users.length,
        });
      },
    ),
  );

  socket.on(
    "presence:leave",
    safeAsyncHandler(
      async ({ context, contextId }: { context: any; contextId: any }) => {
        const room = `${context}:${contextId}`;

        socket.leave(room);

        await service.markOffline(userId, context, contextId);

        const count = await service.countOnline(context, contextId);

        io.to(room).emit("presence:update", {
          context,
          contextId,
          count,
        });
      },
    ),
  );

  socket.on("disconnect", () => {
    // Redis TTL handles offline safely
  });
};
