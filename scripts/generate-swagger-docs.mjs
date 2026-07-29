import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODULES = path.join(ROOT, "src", "modules");
const OUT = path.join(ROOT, "src", "docs", "generated.docs.ts");

const MOUNT_MAP = {
  auth: "auth",
  users: "users",
  profiles: "profile",
  search: "search",
  logs: "log",
  presence: "presence",
  maps: "maps",
  "well-known": "well-known",
  "deep-link": "deep-link",
  urls: "url-preview",
  interests: "interest",
  bookings: "booking",
  orders: "order",
  invoice: "invoice",
  payment: "payment",
  venues: "venue",
  "venue-balance": "venue-balance",
  "venue-category": "venue-category",
  "venue-service": "venue-service",
  "venue-sub-category": "venue-sub-category",
  "venue-unit": "venue-units",
  "venue-staff": "venue-staff",
  menus: "menu",
  operational: "operational",
  floors: "floor",
  reviews: "review",
  "reviews-place": "review-place",
  "public-places": "public-place",
  promotion: "promotion",
  banners: "promotion-banner",
  events: "event",
  "ticket-type": "event-ticket-type",
  attendances: "event-attendance",
  communities: "community",
  "community-members": "community-member",
  "community-posts": "community-post",
  "community-reactions": "community-reaction",
  "community-events": "community-event",
  "community-event-orders": "community-event-order",
  "community-twibbons": "community-twibbon",
  "community-attendances": "community-event-attendance",
  comments: "comment",
  finance: "finance",
  account: "account",
  ledger: "ledger",
  "user-balance": "user-balance",
  withdraw: "withdraw",
  points: "points",
  devices: "device",
  locations: "location",
  notifications: "notification",
  news: "news",
  invitations: "invitation",
  tasks: "task",
  courier: "courier",
};

const TAG_MAP = {
  auth: "Auth",
  users: "Users",
  profiles: "Users",
  bookings: "Booking",
  orders: "Booking",
  invoice: "Booking",
  payment: "Finance",
  venues: "Venue",
  "venue-balance": "Venue",
  "venue-category": "Venue",
  "venue-service": "Venue",
  "venue-sub-category": "Venue",
  "venue-unit": "Venue",
  "venue-staff": "Venue",
  menus: "Venue",
  operational: "Venue",
  floors: "Venue",
  reviews: "Venue",
  "reviews-place": "Venue",
  "public-places": "Venue",
  promotion: "Venue",
  banners: "Venue",
  events: "Event",
  "ticket-type": "Event",
  attendances: "Event",
  communities: "Community",
  "community-members": "Community",
  "community-posts": "Community",
  "community-reactions": "Community",
  "community-events": "Community",
  "community-event-orders": "Community",
  "community-twibbons": "Community",
  "community-attendances": "Community",
  comments: "Community",
  finance: "Finance",
  account: "Finance",
  ledger: "Finance",
  "user-balance": "Finance",
  withdraw: "Finance",
  points: "Finance",
  devices: "Platform",
  locations: "Platform",
  notifications: "Platform",
  news: "Platform",
  invitations: "Platform",
  tasks: "Platform",
  courier: "Platform",
  search: "Platform",
  logs: "Platform",
  presence: "Platform",
  maps: "Platform",
  interests: "Platform",
  urls: "Platform",
  "well-known": "Platform",
  "deep-link": "Platform",
};

const ROUTE_RE =
  /router\.(get|post|put|patch|delete)\(\s*["'`]([^"'`]+)["'`]/gi;

const WRITE_METHODS = new Set(["post", "put", "patch"]);

function findRoutesFile(moduleName) {
  const dir = path.join(MODULES, moduleName);
  if (!fs.existsSync(dir)) return null;
  const exact = path.join(dir, `${moduleName}.routes.ts`);
  if (fs.existsSync(exact)) return exact;
  const alt = fs.readdirSync(dir).find((f) => f.endsWith(".routes.ts"));
  return alt ? path.join(dir, alt) : null;
}

function parseRoutes(content) {
  const routes = [];
  let m;
  while ((m = ROUTE_RE.exec(content)) !== null) {
    routes.push({ method: m[1].toLowerCase(), path: m[2] });
  }
  return routes;
}

function needsAuth(content, routePath) {
  const idx = content.indexOf(`"${routePath}"`);
  if (idx === -1) return false;

  const context = content.slice(idx, idx + 500);

  return (
    context.includes("auth.authenticate") ||
    context.includes("...venueStaff") ||
    context.includes("...adminAuth") ||
    context.includes("...authenticated")
  );
}

function humanSummary(method, openApiPath) {
  const parts = openApiPath
    .replace(/^\//, "")
    .split("/")
    .filter((p) => !p.startsWith("{"))
    .slice(-3);
  const action = {
    get: "Get",
    post: "Create",
    put: "Update",
    patch: "Update",
    delete: "Delete",
  }[method];
  return `${action} ${parts.join(" ")}`
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function operationId(method, openApiPath) {
  return (
    method +
    openApiPath
      .replace(/^\//, "")
      .replace(/\{([^}]+)\}/g, "_$1")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 80)
  );
}

function responseBlock(method) {
  const lines = [" *     responses:"];
  if (method === "post") {
    lines.push(" *       201:", " *         description: Created");
  }
  lines.push(
    " *       200:",
    " *         description: Success",
    " *       401:",
    " *         description: Unauthorized",
    " *       403:",
    " *         description: Forbidden",
    " *       404:",
    " *         description: Not found",
    " *       422:",
    " *         description: Validation error",
  );
  return lines;
}

const grouped = new Map();

for (const [mount, moduleName] of Object.entries(MOUNT_MAP)) {
  const routesFile = findRoutesFile(moduleName);
  if (!routesFile) continue;

  const content = fs.readFileSync(routesFile, "utf8");
  const routes = parseRoutes(content);
  const tag = TAG_MAP[mount] ?? "Platform";

  for (const { method, path: routePath } of routes) {
    const openApiPath =
      `/${mount}${routePath.startsWith("/") ? routePath : `/${routePath}`}`.replace(
        /:([a-zA-Z]+)/g,
        "{$1}",
      );

    if (!grouped.has(openApiPath)) grouped.set(openApiPath, new Map());
    const methods = grouped.get(openApiPath);
    if (methods.has(method)) continue;

    const pathParams = [...openApiPath.matchAll(/\{([^}]+)\}/g)].map(
      (x) => x[1],
    );
    const secured = needsAuth(content, routePath);

    const opLines = [
      ` *   ${method}:`,
      ` *     tags: [${tag}]`,
      ` *     summary: ${humanSummary(method, openApiPath)}`,
      ` *     operationId: ${operationId(method, openApiPath)}`,
    ];

    if (secured) opLines.push(" *     security:", " *       - bearerAuth: []");

    const paramLines = [];
    for (const name of pathParams) {
      paramLines.push(
        " *       - in: path",
        ` *         name: ${name}`,
        " *         required: true",
        " *         schema:",
        " *           type: string",
      );
    }
    if (method === "get") {
      for (const q of ["page", "limit", "search"]) {
        paramLines.push(
          " *       - in: query",
          ` *         name: ${q}`,
          " *         schema:",
          " *           type: string",
        );
      }
    }
    if (paramLines.length) {
      opLines.push(" *     parameters:", ...paramLines);
    }

    if (WRITE_METHODS.has(method)) {
      opLines.push(
        " *     requestBody:",
        " *       content:",
        " *         application/json:",
        " *           schema:",
        " *             type: object",
      );
    }

    opLines.push(...responseBlock(method));
    methods.set(method, opLines);
  }
}

const lines = ["/**", " * @openapi"];

for (const [openApiPath, methods] of grouped) {
  lines.push(` * ${openApiPath}:`);
  for (const opLines of methods.values()) {
    lines.push(...opLines);
  }
  lines.push(" *");
}

lines.push(" */", "", "export {};", "");

fs.writeFileSync(OUT, lines.join("\n"));
console.log(
  `Generated ${OUT} — ${grouped.size} paths, ${[...grouped.values()].reduce((n, m) => n + m.size, 0)} operations`,
);
