import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const MODULES = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "modules");

for (const dir of fs.readdirSync(MODULES)) {
  const routesFile = path.join(MODULES, dir, `${dir}.routes.ts`);
  if (!fs.existsSync(routesFile)) continue;

  let content = fs.readFileSync(routesFile, "utf8");
  const next = content.replace(/^const \w+Controller = new \w+Controller\(\);\r?\n\r?\n/gm, "");
  if (next !== content) {
    fs.writeFileSync(routesFile, next);
    console.log("cleaned", routesFile);
  }
}

console.log("Route cleanup done");
