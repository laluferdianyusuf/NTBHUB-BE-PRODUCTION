/**
 * Remove legacy shim layers: rewrite imports to modules/*, delete dead code.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "src");

function read(p) {
  return fs.readFileSync(p, "utf8");
}
function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}
function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== "node_modules") walk(f, files);
    else if (f.endsWith(".ts")) files.push(f);
  }
  return files;
}

function toModulePath(absPath) {
  return absPath
    .replace(/\\/g, "/")
    .split("/src/")[1]
    .replace(/\.ts$/, "");
}

function buildExportMap(suffix) {
  const map = new Map();
  for (const file of walk(path.join(SRC, "modules"))) {
    if (!file.endsWith(`${suffix}.ts`)) continue;
    const content = read(file);
    const modPath = toModulePath(file);
    for (const m of content.matchAll(/^export (?:class|type|const|function) (\w+)/gm)) {
      map.set(m[1], modPath);
    }
    for (const m of content.matchAll(/^export \{[^}]*\b(\w+)\b[^}]*\} from/gm)) {
      // skip re-exports
    }
  }
  return map;
}

const controllers = buildExportMap("controller");
const services = buildExportMap("service");
const repositories = buildExportMap("repository");

// Legacy aliases used in codebase
const SERVICE_ALIASES = {
  BookingServices: services.get("BookingService"),
  LogServices: services.get("LogServices"),
  MapsService: services.get("MapsService"),
  PresenceService: services.get("PresenceService"),
};
const CONTROLLER_ALIASES = {};

function resolveSymbol(name, map, aliases) {
  return aliases[name] ?? map.get(name);
}

function rewriteNamedImport(content, barrel, map, aliases) {
  const re = new RegExp(
    `import\\s+\\{([^}]+)\\}\\s+from\\s+["']${barrel}(?:/[^"']+)?["'];?`,
    "g",
  );
  return content.replace(re, (full, inner) => {
    const names = inner
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const parts = s.split(/\s+as\s+/);
        return { name: parts[0].trim(), alias: parts[1]?.trim() };
      });

    const lines = [];
    for (const { name, alias } of names) {
      const mod = resolveSymbol(name, map, aliases);
      if (!mod) {
        console.warn(`  unresolved: ${name} from ${barrel}`);
        lines.push(full);
        continue;
      }
      const exp = alias ? `${name} as ${alias}` : name;
      lines.push(`import { ${exp} } from "${mod}";`);
    }
    if (lines.length === 1 && lines[0] === full) return full;
    return lines.filter((l) => l.startsWith("import")).join("\n");
  });
}

function rewriteRelativeLegacy(content) {
  return content
    .replace(
      /from ["']\.\.\/services\/notification\.services["']/g,
      'from "modules/notification/notification.service"',
    )
    .replace(
      /from ["']\.\.\/services\/promotion\.services["']/g,
      'from "modules/promotion/promotion.service"',
    )
    .replace(
      /from ["']services\/notification\.services["']/g,
      'from "modules/notification/notification.service"',
    )
    .replace(
      /from ["']services\/promotion\.services["']/g,
      'from "modules/promotion/promotion.service"',
    )
    .replace(
      /from ["']services\/account\.services["']/g,
      'from "modules/account/account.service"',
    )
    .replace(
      /from ["']repositories\/account\.repo["']/g,
      'from "modules/account/account.repository"',
    )
    .replace(
      /from ["']repositories\/booking\.repo["']/g,
      'from "modules/booking/booking.repository"',
    )
    .replace(
      /from ["']repositories\/floor\.repo["']/g,
      'from "modules/floor/floor.repository"',
    )
    .replace(
      /from ["']repositories\/notification\.repo["']/g,
      'from "modules/notification/notification.repository"',
    )
    .replace(
      /from ["']controllers\/comment\.controllers["']/g,
      'from "modules/comment/comment.controller"',
    );
}

function optimizeRouteAuth(content) {
  if (!content.includes("AuthMiddlewares")) return content;
  let c = content.replace(
    /import \{ AuthMiddlewares \} from "middlewares\/auth\.middleware";\n?/g,
    'import { auth } from "shared/middleware/auth";\n',
  );
  c = c.replace(/const auth = new AuthMiddlewares\(\);\n?/g, "");
  c = c.replace(/auth\.authenticate/g, "auth.authenticate");
  return c;
}

function localControllerImport(routeFile, content) {
  const dir = path.dirname(routeFile);
  const base = path.basename(dir);
  const localController = path.join(dir, `${base}.controller.ts`);
  if (!fs.existsSync(localController)) return content;

  const ctrlContent = read(localController);
  const classMatch = ctrlContent.match(/export class (\w+)/);
  if (!classMatch) return content;

  const cls = classMatch[1];
  if (content.includes(`from "controllers"`) && content.includes(cls)) {
    content = content.replace(
      new RegExp(`import \\{[^}]*${cls}[^}]*\\} from "controllers";`),
      `import { ${cls} } from "./${base}.controller";`,
    );
  }
  return content;
}

// --- build maps ---
console.log("Maps:", controllers.size, services.size, repositories.size);

// --- rewrite all src files ---
for (const file of walk(SRC)) {
  if (
    file.includes(`${path.sep}controllers${path.sep}`) ||
    file.includes(`${path.sep}services${path.sep}`) ||
    file.includes(`${path.sep}repositories${path.sep}`) ||
    file.includes(`${path.sep}routes${path.sep}v1${path.sep}`)
  ) {
    continue;
  }

  let content = read(file);
  const orig = content;

  content = rewriteNamedImport(content, "controllers", controllers, CONTROLLER_ALIASES);
  content = rewriteNamedImport(content, "services", services, SERVICE_ALIASES);
  content = rewriteNamedImport(content, "repositories", repositories, {});
  content = rewriteRelativeLegacy(content);

  if (file.endsWith(".routes.ts")) {
    content = optimizeRouteAuth(content);
    content = localControllerImport(file, content);
  }

  if (content !== orig) write(file, content);
}

// --- fix multi-controller route files manually via second pass ---
const multiControllerRoutes = {
  "modules/event/event.routes.ts": [
    ["EventController", "./event.controller"],
    ["EventOrderController", "modules/event-order/event-order.controller"],
    ["EventTicketController", "modules/event-ticket/event-ticket.controller"],
    ["EventTicketTypeController", "modules/event-ticket-type/event-ticket-type.controller"],
  ],
  "modules/community-event/community-event.routes.ts": [
    ["CommunityEventController", "./community-event.controller"],
    ["CommunityEventTicketController", "modules/community-event-ticket/community-event-ticket.controller"],
    ["CommunityEventTicketTypeController", "modules/community-event-ticket-type/community-event-ticket-type.controller"],
    ["CommunityEventOrderController", "modules/community-event-order/community-event-order.controller"],
  ],
  "modules/review-place/review-place.routes.ts": [
    ["ReviewPlaceControllers", "./review-place.controller"],
  ],
  "modules/url-preview/url-preview.routes.ts": [
    ["getLinkPreview", "./url-preview.controller"],
  ],
};

for (const [rel, imports] of Object.entries(multiControllerRoutes)) {
  const file = path.join(SRC, rel);
  if (!fs.existsSync(file)) continue;
  let c = read(file);
  c = c.replace(/import \{[^}]+\} from "controllers";\n?/g, "");
  const importLines = imports
    .map(([sym, from]) => `import { ${sym} } from "${from}";`)
    .join("\n");
  c = c.replace(/(import \{ Router \} from "express";)/, `$1\n${importLines}`);
  write(file, c);
}

// --- log module cleanup ---
const logIndex = path.join(SRC, "modules/log/index.ts");
write(
  logIndex,
  `export * from "./log.repository";
export * from "./log.service";
export { default as logsRouter } from "./log.routes";
`,
);
const logCtrl = path.join(SRC, "modules/log/log.controller.ts");
if (fs.existsSync(logCtrl)) fs.unlinkSync(logCtrl);

// --- delete legacy trees ---
function rmDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

rmDir(path.join(SRC, "routes", "v1"));
rmDir(path.join(SRC, "controllers"));
rmDir(path.join(SRC, "services"));
rmDir(path.join(SRC, "repositories"));

// orphan internal module indexes (not in barrel, optional cleanup)
for (const d of ["user-role", "tracking", "task-qr-service", "rate-limiter-service", "reward", "review-public-place"]) {
  const idx = path.join(SRC, "modules", d, "index.ts");
  if (fs.existsSync(idx)) fs.unlinkSync(idx);
}

console.log("Cleanup done. Run tsc.");
