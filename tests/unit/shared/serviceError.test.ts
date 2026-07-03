import {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from "shared/errors";
import { mapServiceError, runService } from "shared/http/serviceError";

describe("mapServiceError", () => {
  it("re-throws AppError unchanged", () => {
    const err = new NotFoundError("User not found");
    expect(() => mapServiceError(err)).toThrow(NotFoundError);
  });

  it("maps known messages to typed errors", () => {
    expect(() => mapServiceError(new Error("Unauthorized"))).toThrow(
      UnauthorizedError,
    );
    expect(() => mapServiceError(new Error("User not found"))).toThrow(
      NotFoundError,
    );
    expect(() => mapServiceError(new Error("Forbidden"))).toThrow(
      ForbiddenError,
    );
  });

  it("maps unknown Error to AppError 400", () => {
    try {
      mapServiceError(new Error("Something went wrong"));
    } catch (e) {
      expect(e).toMatchObject({ statusCode: 400, message: "Something went wrong" });
    }
  });
});

describe("runService", () => {
  it("returns service result on success", async () => {
    const result = await runService(async () => ({ id: "1" }));
    expect(result).toEqual({ id: "1" });
  });

  it("maps thrown errors through mapServiceError", async () => {
    await expect(
      runService(async () => {
        throw new Error("User not found");
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
