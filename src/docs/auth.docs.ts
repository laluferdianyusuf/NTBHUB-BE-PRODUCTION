/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, email, username, password]
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email }
 *               username: { type: string }
 *               password: { type: string, minLength: 6 }
 *               role: { type: string, enum: [CUSTOMER, ADMIN, VENUE_OWNER] }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiSuccessResponse' }
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *
 * /auth/register-admin:
 *   post:
 *     tags: [Auth]
 *     summary: Register admin (requires secret key)
 *     parameters:
 *       - in: header
 *         name: x-admin-secret
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, email, username, password, secretKey]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               username: { type: string }
 *               password: { type: string }
 *               secretKey: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Admin registered
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokens'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: New tokens issued
 *
 * /auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Verify email with PIN
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, pin]
 *             properties:
 *               userId: { type: string }
 *               pin: { type: string }
 *     responses:
 *       200:
 *         description: Email verified
 *
 * /auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Resend verification email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200:
 *         description: Verification sent
 *
 * /auth/google:
 *   post:
 *     tags: [Auth]
 *     summary: Login with Google ID token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken: { type: string }
 *     responses:
 *       200:
 *         description: Google login success
 *
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /auth/set-pin/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Set transaction PIN
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pin]
 *             properties:
 *               pin: { type: string, minLength: 4, maxLength: 6 }
 *     responses:
 *       200:
 *         description: PIN set
 *
 * /auth/set-biometric/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Enable/disable biometric auth
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [biometric]
 *             properties:
 *               biometric: { type: boolean }
 *     responses:
 *       200:
 *         description: Biometric updated
 *
 * /auth/verify-pin/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Verify transaction PIN
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pin]
 *             properties:
 *               pin: { type: string }
 *     responses:
 *       200:
 *         description: PIN verified
 */

export {};
