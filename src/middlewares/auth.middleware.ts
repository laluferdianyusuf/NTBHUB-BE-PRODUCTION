import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import jwt from "jsonwebtoken";
import { EventTicketTypeRepository } from "modules/event-ticket-type/event-ticket-type.repository";
import { UserRepository } from "modules/users/users.repository";
import { UserRoleRepository } from "modules/user-role/user-role.repository";
import { VenueRepository } from "modules/venue/venue.repository";

const redis = new Redis();

const userRepository = new UserRepository();
const venueRepository = new VenueRepository();
const userRoleRepository = new UserRoleRepository();
const eventTicketTypeRepository = new EventTicketTypeRepository();

export class AuthMiddlewares {
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: Missing token",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as {
        sub: string;
      };

      const blacklisted = await redis.get(`blacklist:${token}`);
      if (blacklisted) {
        return res.status(401).json({
          status: false,
          message: "Token revoked",
        });
      }

      const user = await userRepository.findById(decoded.sub);
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found",
        });
      }

      (req as any).user = user;
      (req as any).token = token;

      next();
    } catch (err: any) {
      return res.status(401).json({
        status: false,
        message:
          err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
        isExpired: err.name === "TokenExpiredError",
      });
    }
  };

  authorizeGlobalRole =
    (roles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

      const hasRole = await userRoleRepository.hasRole({
        userId: user.id,
        role: { in: roles } as any,
      });

      if (!hasRole) {
        return res.status(403).json({
          status: false,
          message: "Forbidden: insufficient global role",
        });
      }

      next();
    };

  authorizeVenueRole =
    (roles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

      const venueId =
        req.params.venueId ||
        req.params.id ||
        req.body.venueId ||
        req.query.venueId;

      if (!venueId) {
        return res.status(400).json({
          status: false,
          message: "Missing venueId",
        });
      }

      const venue = await venueRepository.findVenueById(venueId);
      if (!venue) {
        return res.status(404).json({
          status: false,
          message: "Venue not found",
        });
      }

      const hasRole = await userRoleRepository.hasRole({
        userId: user.id,
        role: { in: roles } as any,
        venueId,
      });

      if (!hasRole) {
        return res.status(403).json({
          status: false,
          message: "Forbidden: insufficient venue role",
        });
      }

      (req as any).venue = venue;

      next();
    };

  authorizeEventRole =
    (roles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

      const eventId =
        req.params.eventId || req.body.eventId || req.query.eventId;

      if (!eventId) {
        return res.status(400).json({
          status: false,
          message: "Missing eventId",
        });
      }

      const hasRole = await userRoleRepository.hasRole({
        userId: user.id,
        role: { in: roles } as any,
        eventId,
      });

      if (!hasRole) {
        return res.status(403).json({
          status: false,
          message: "Forbidden: insufficient event role",
        });
      }

      next();
    };

  authorizeEventRoleFromTicketType =
    (roles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user?.id) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

      const ticketTypeId = req.params.id;
      if (!ticketTypeId) {
        return res.status(400).json({
          status: false,
          message: "Missing ticket type id",
        });
      }

      const ticketType = await eventTicketTypeRepository.findById(
        undefined,
        ticketTypeId,
      );

      if (!ticketType) {
        return res.status(404).json({
          status: false,
          message: "Ticket type not found",
        });
      }

      const hasRole = await userRoleRepository.hasRole({
        userId: user.id,
        role: { in: roles } as any,
        eventId: ticketType.eventId,
      });

      if (!hasRole) {
        return res.status(403).json({
          status: false,
          message: "Forbidden: insufficient event role",
        });
      }

      next();
    };
}

/** Shared singleton — import via `shared/middleware/auth` or this export. */
export const auth = new AuthMiddlewares();
