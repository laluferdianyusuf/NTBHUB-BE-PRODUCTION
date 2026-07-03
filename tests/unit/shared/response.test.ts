import express from "express";
import supertest from "supertest";
import { sendSuccess, sendError } from "shared/http/response";

describe("response helpers", () => {
  it("sendSuccess returns standard envelope", async () => {
    const app = express();
    app.get("/", (_req, res) => sendSuccess(res, { id: 1 }, "OK", 201));

    const res = await supertest(app).get("/");
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      status: true,
      status_code: 201,
      message: "OK",
      data: { id: 1 },
    });
  });

  it("sendError returns standard error envelope", async () => {
    const app = express();
    app.get("/", (_req, res) => sendError(res, "Nope", 422));

    const res = await supertest(app).get("/");
    expect(res.status).toBe(422);
    expect(res.body).toEqual({
      status: false,
      status_code: 422,
      message: "Nope",
    });
  });
});
