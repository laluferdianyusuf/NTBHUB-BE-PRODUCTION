import "./config/env";
import { env } from "./config/env";
import { app, server } from "./app";

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  console.log(`Swagger running on http://localhost:${env.PORT}/api-docs`);
});

server.listen(env.SOCKET_PORT, () => {
  console.log(
    `Server with Socket.IO running on http://localhost:${env.SOCKET_PORT}`,
  );
});
