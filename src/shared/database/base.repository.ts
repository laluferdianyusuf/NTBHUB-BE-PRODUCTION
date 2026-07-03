import { prisma } from "config/prisma";
import type { PrismaClient } from "@prisma/client";

/**
 * Base class for repositories — single Prisma entry point per module.
 */
export abstract class BaseRepository {
  protected readonly db: PrismaClient = prisma;
}
