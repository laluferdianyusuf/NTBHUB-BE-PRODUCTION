import express, { Request, Response } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { AppError } from "shared/errors";
import { errorHandler } from "middlewares/error.middleware";

describe("asyncHandler", () => {
  const run = (handler: (req: Request, res: Response) => Promise<unknown>) => {
    const app = express();
    app.get("/test", asyncHandler(handler));
    app.use(errorHandler);
    return app;
  };

  it("forwards resolved handler result without crashing", async () => {
    const app = run(async (_req, res) => {
      res.status(200).json({ ok: true });
    });

    const supertest = (await import("supertest")).default;
    const res = await supertest(app).get("/test");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("passes AppError to error middleware", async () => {
    const app = run(async () => {
      throw new AppError("Bad request", 400);
    });

    const supertest = (await import("supertest")).default;
    const res = await supertest(app).get("/test");
    expect(res.status).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Bad request");
  });

  it("passes unexpected errors to error middleware as 500", async () => {
    const app = run(async () => {
      throw new Error("Unexpected");
    });

    const supertest = (await import("supertest")).default;
    const res = await supertest(app).get("/test");
    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
  });
});
