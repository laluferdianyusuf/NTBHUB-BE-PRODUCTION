/**
 * Shared auth middleware singleton — avoid `new AuthMiddlewares()` in every route file.
 */
export { AuthMiddlewares, auth } from "middlewares/auth.middleware";
