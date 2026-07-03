import express from "express";
import supertest from "supertest";
import { z } from "zod";
import { errorHandler } from "middlewares/error.middleware";
import { validate } from "shared/validation/validate";

describe("validate middleware", () => {
  const app = express();
  app.use(express.json());
  app.post(
    "/test",
    validate({ body: z.object({ email: z.string().email() }) }),
    (_req, res) => res.status(200).json({ ok: true }),
  );
  app.use(errorHandler);

  it("passes valid body to handler", async () => {
    const res = await supertest(app)
      .post("/test")
      .send({ email: "user@example.com" });
    expect(res.status).toBe(200);
  });

  it("returns 422 for invalid body", async () => {
    const res = await supertest(app).post("/test").send({ email: "bad" });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe(false);
  });
});
