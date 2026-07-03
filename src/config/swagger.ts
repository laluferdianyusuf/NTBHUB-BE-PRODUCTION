import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const docsGlob = path.resolve(process.cwd(), "src/docs/**/*.{ts,js}");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NTB Hub API",
      version: "1.0.0",
      description: `
REST API untuk platform **NTB Hub** — booking venue, event ticketing, community, dan dompet digital.

## Autentikasi
Kebanyakan endpoint membutuhkan header:
\`\`\`
Authorization: Bearer <access_token>
\`\`\`
Token didapat dari \`POST /auth/login\` atau \`POST /auth/register\`.

## Format Response
Semua response JSON mengikuti envelope:
\`\`\`json
{ "status": true, "status_code": 200, "message": "...", "data": { ... } }
\`\`\`

## Base URL
Semua path di bawah prefix \`/api/v1\`.
      `.trim(),
      contact: { name: "NTB Hub", email: "support@ntbhub.com" },
      license: { name: "Proprietary" },
    },
    externalDocs: {
      description: "OpenAPI JSON",
      url: "/api-docs.json",
    },
    servers: [
      { url: "http://localhost:3100/api/v1", description: "Local development" },
      { url: "https://api.ntbhub.com/api/v1", description: "Production" },
    ],
    tags: [
      {
        name: "Auth",
        description: "Registrasi, login, refresh token, PIN transaksi",
      },
      { name: "Users", description: "Profil, password, manajemen user" },
      { name: "Booking", description: "Booking venue, order, invoice" },
      { name: "Venue", description: "Venue, layanan, menu, review, promosi" },
      { name: "Event", description: "Event, tiket, check-in QR" },
      { name: "Community", description: "Komunitas, post, member, komentar" },
      { name: "Finance", description: "Payment, ledger, withdraw, saldo" },
      {
        name: "Platform",
        description: "Notifikasi, maps, search, device, courier",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT access token dari `/auth/login`",
        },
      },
    },
  },
  apis: [docsGlob],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi;
