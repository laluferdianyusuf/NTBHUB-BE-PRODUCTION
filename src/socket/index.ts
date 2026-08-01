import { Server } from "socket.io";
import { setupRedisSubscriber } from "events/redis.subscriber";
import { socketAuth } from "./auth";
import { registerLocationSocket } from "./location.socket";
import { registerPresenceSocket } from "./presence.socket";
import { registerUserSocket } from "./user.socket";

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket"],
  });

  io.use(socketAuth);

  setupRedisSubscriber(io).catch((err) => {
    console.error("[SOCKET] Redis subscriber setup failed:", err);
  });

  io.on("connection", (socket) => {
    console.log("SOCKET CONNECTED:", (socket as any).user.sub);
    registerUserSocket(io, socket);
    registerPresenceSocket(io, socket);
    registerLocationSocket(io, socket);
  });

  return io;
};
