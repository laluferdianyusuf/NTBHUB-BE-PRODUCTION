import "queue/courier-worker";
import { server } from "./app";
import "./config/env";
import { env } from "./config/env";

server.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${env.PORT}`);

  console.log(`Swagger running on http://localhost:${env.PORT}/api-docs`);

  console.log(`Socket.IO running on http://localhost:${env.PORT}/socket.io`);
});
