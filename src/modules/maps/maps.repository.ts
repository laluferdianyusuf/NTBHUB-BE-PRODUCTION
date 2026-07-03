import { googleApi } from "utils/googleApi";
import { BaseRepository } from "shared/database";

export class MapsRepository extends BaseRepository {
  constructor(private readonly apiKey: string) {
    super();
  }

  autocomplete(input: string) {
    return googleApi.get("/place/autocomplete/json", {
      params: {
        input,
        language: "id",
        components: "country:id",
        key: this.apiKey,
      },
    });
  }

  placeDetails(placeId: string) {
    return googleApi.get("/place/details/json", {
      params: {
        place_id: placeId,
        fields: "geometry,name,formatted_address",
        key: this.apiKey,
      },
    });
  }

  directions(
    origin: string,
    destination: string,
    mode: "driving" | "walking" | "bicycling" | "transit" = "driving",
  ) {
    return googleApi.get("/directions/json", {
      params: {
        origin,
        destination,
        mode,
        alternatives: false,
        key: this.apiKey,
      },
    });
  }
}
