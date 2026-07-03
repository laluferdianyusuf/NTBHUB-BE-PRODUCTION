/**
 * @openapi
 * /users/all-users:
 *   get:
 *     tags: [Users]
 *     summary: List all users
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiSuccessResponse' }
 *
 * /users/all-top-spender:
 *   get:
 *     tags: [Users]
 *     summary: Top spenders leaderboard
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Top spenders
 *
 * /users/detail-user/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User detail
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /users/manage-profile:
 *   patch:
 *     tags: [Users]
 *     summary: Update own profile
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Profile updated
 *
 * /users/change-password:
 *   patch:
 *     tags: [Users]
 *     summary: Change password (authenticated)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string, minLength: 6 }
 *     responses:
 *       200:
 *         description: Password changed
 *
 * /users/forgot-password:
 *   post:
 *     tags: [Users]
 *     summary: Request password reset PIN
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
 *         description: Reset PIN sent
 *
 * /users/verify/forgot-password:
 *   post:
 *     tags: [Users]
 *     summary: Verify forgot-password PIN
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
 *         description: PIN verified, returns reset token
 *
 * /users/reset-password:
 *   post:
 *     tags: [Users]
 *     summary: Reset password with token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [resetToken, newPassword]
 *             properties:
 *               resetToken: { type: string }
 *               newPassword: { type: string, minLength: 6 }
 *     responses:
 *       200:
 *         description: Password reset
 *
 * /users/delete-user/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 * /profiles/detail/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get public profile detail
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Profile detail
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /profiles/{id}/view:
 *   post:
 *     tags: [Users]
 *     summary: Record profile view
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: View recorded
 *
 * /profiles/{id}/like:
 *   post:
 *     tags: [Users]
 *     summary: Toggle profile like
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Like toggled
 */

export {};
