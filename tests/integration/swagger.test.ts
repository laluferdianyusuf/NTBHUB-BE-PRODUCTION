import { swaggerSpec } from "../../src/config/swagger";

type OpenApiSpec = {
  openapi: string;
  info: { title: string };
  paths: Record<string, Record<string, { tags?: string[] }>>;
  components?: { securitySchemes?: Record<string, unknown> };
};

const spec = swaggerSpec as OpenApiSpec;

describe("Swagger documentation", () => {
  it("generates OpenAPI 3 spec with project metadata", () => {
    expect(spec.openapi).toBe("3.0.0");
    expect(spec.info.title).toBe("NTB Hub API");
    expect(spec.components?.securitySchemes?.bearerAuth).toBeDefined();
  });

  it("documents auth endpoints", () => {
    expect(spec.paths["/auth/login"]).toBeDefined();
    expect(spec.paths["/auth/register"]).toBeDefined();
    expect(spec.paths["/auth/me"]).toBeDefined();
  });

  it("documents community member endpoints", () => {
    expect(spec.paths["/community-members/add/{communityId}"]).toBeDefined();
  });

  it("includes generated routes from all modules", () => {
    const pathCount = Object.keys(spec.paths ?? {}).length;
    expect(pathCount).toBeGreaterThan(100);
  });

  it("groups endpoints by domain tags", () => {
    const tags = new Set<string>();
    for (const pathItem of Object.values(spec.paths ?? {})) {
      for (const operation of Object.values(pathItem ?? {})) {
        for (const tag of operation.tags ?? []) {
          tags.add(tag);
        }
      }
    }
    expect(tags.has("Auth")).toBe(true);
    expect(tags.has("Community")).toBe(true);
    expect(tags.has("Venue")).toBe(true);
  });
});
