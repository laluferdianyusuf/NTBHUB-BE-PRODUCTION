import { Request, Response } from "express";
import { NotFoundError, ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { MapsService } from "./maps.service";

const mapsService = new MapsService();

export class MapsController {
  static async autocomplete(req: Request, res: Response) {
    const input = (req.query.input as string)?.trim();

    if (!input || input.length < 3) {
      throw new ValidationError("Input minimal 3 karakter");
    }

    const typesQuery = req.query.types as string;
    const allowedTypes = typesQuery
      ? typesQuery.split(",").map((t) => t.trim())
      : ["geocode", "locality", "airport"];

    const result = await runService(() => mapsService.autocomplete(input, allowedTypes));
    return sendSuccess(res, result, "Autocomplete results");
  }

  static async placeDetails(req: Request, res: Response) {
    const placeId = req.params.placeId?.trim();
    if (!placeId) {
      throw new ValidationError("placeId wajib diisi");
    }

    const result = await runService(() => mapsService.placeDetails(placeId));
    if (!result) {
      throw new NotFoundError("Place tidak ditemukan");
    }

    return sendSuccess(res, result, "Place details");
  }

  static async directions(req: Request, res: Response) {
    const { origin, destination, mode } = req.query;

    if (!origin || !destination) {
      throw new ValidationError("origin dan destination wajib diisi");
    }

    const allowedModes = ["driving", "walking", "bicycling", "transit"];
    const travelMode = allowedModes.includes(mode as string)
      ? (mode as "driving" | "walking" | "bicycling" | "transit")
      : "driving";

    const result = await runService(() => mapsService.directions(
      origin as string,
      destination as string,
      travelMode,
    ));

    if (!result) {
      throw new NotFoundError("Route tidak ditemukan");
    }

    return sendSuccess(res, result, "Directions");
  }
}
