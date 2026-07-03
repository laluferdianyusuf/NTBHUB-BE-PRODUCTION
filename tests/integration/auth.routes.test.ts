import express from "express";
import supertest from "supertest";
import authRouter from "modules/auth/auth.routes";
import {
  errorHandler,
  notFoundHandler,
} from "middlewares/error.middleware";

const createAuthTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/auth", authRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
};

describe("Auth routes integration", () => {
  const app = createAuthTestApp();

  it("POST /api/v1/auth/login validates body", async () => {
    const res = await supertest(app)
      .post("/api/v1/auth/login")
      .send({ email: "not-an-email" });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe(false);
  });

  it("GET /api/v1/auth/me requires bearer token", async () => {
    const res = await supertest(app).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Unauthorized/i);
  });

  it("POST /api/v1/auth/login rejects empty body", async () => {
    const res = await supertest(app).post("/api/v1/auth/login").send({});
    expect(res.status).toBe(422);
  });
});
