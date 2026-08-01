import { Server, Socket } from "socket.io";

export const registerUserSocket = (_io: Server, socket: Socket) => {
  const userId = (socket as any).user.sub;
  socket.join(`user:${userId}`);
};
