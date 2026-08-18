import { redis } from "config/redis.config";

const COURIER_GEO_KEY = "couriers:geo";
const COURIER_ONLINE_KEY = "couriers:online";

export async function updateCourierLocation(
  courierId: string,
  lat: number,
  lng: number,
) {
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Invalid courier coordinates");
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new Error("Courier coordinates out of range");
  }

  await redis.geoadd(COURIER_GEO_KEY, longitude, latitude, courierId);

  await redis.sadd(COURIER_ONLINE_KEY, courierId);

  await redis.set(`courier:${courierId}:alive`, "1", "EX", 30);
}

export async function findNearestCouriers(
  lat: number,
  lng: number,
  radiusKm = 5,
  limit = 10,
) {
  const latitude = Number(lat);
  const longitude = Number(lng);
  const radius = Number(radiusKm);
  const count = Number(limit);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(radius) ||
    !Number.isFinite(count)
  ) {
    throw new Error("Invalid GEO search parameters");
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new Error("Invalid GEO coordinates");
  }

  if (radius <= 0 || count <= 0) {
    throw new Error("Invalid GEO radius or limit");
  }

  const result = await redis.geosearch(
    COURIER_GEO_KEY,

    "FROMLONLAT",
    longitude,
    latitude,

    "BYRADIUS",
    radius,
    "km",

    "ASC",

    "COUNT",
    count,
  );

  return result as string[];
}

export async function filterAvailableCouriers(courierIds: string[]) {
  if (!courierIds.length) {
    return [];
  }

  const pipeline = redis.pipeline();

  for (const courierId of courierIds) {
    pipeline.sismember(COURIER_ONLINE_KEY, courierId);

    pipeline.get(`courier:${courierId}:alive`);
  }

  const results = await pipeline.exec();

  if (!results) {
    return [];
  }

  const available: string[] = [];

  for (let i = 0; i < courierIds.length; i++) {
    const onlineResult = results[i * 2];
    const aliveResult = results[i * 2 + 1];

    const isOnline = onlineResult?.[1] === 1 || onlineResult?.[1] === "1";

    const isAlive = aliveResult?.[1] === "1";

    if (isOnline && isAlive) {
      available.push(courierIds[i]);
    }
  }

  return available;
}
