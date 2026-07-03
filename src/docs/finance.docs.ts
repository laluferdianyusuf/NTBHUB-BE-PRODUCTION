/**
 * @openapi
 * /payment/topUp:
 *   post:
 *     tags: [Finance]
 *     summary: Top up balance via bank transfer
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, bankCode]
 *             properties:
 *               amount: { type: number, minimum: 10000, example: 50000 }
 *               bankCode: { type: string, example: bca }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /payment/topUpQris:
 *   post:
 *     tags: [Finance]
 *     summary: Top up balance via QRIS
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, minimum: 10000 }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /payment/callback:
 *   post:
 *     tags: [Finance]
 *     summary: Midtrans payment webhook
 *     description: Called by Midtrans — do not invoke manually.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Callback acknowledged
 *
 * /payment/lists/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: Payment history by user
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ledger/account/{accountId}:
 *   get:
 *     tags: [Finance]
 *     summary: Ledger history by account
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ledger/account/{accountId}/balance:
 *   get:
 *     tags: [Finance]
 *     summary: Account balance
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ledger/balance:
 *   get:
 *     tags: [Finance]
 *     summary: Balance by owner (user/venue/event/courier)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: venueId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: eventId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: courierId
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ledger/user-transactions:
 *   get:
 *     tags: [Finance]
 *     summary: Current user transaction history
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - in: query
 *         name: referenceType
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ledger/all-transactions:
 *   get:
 *     tags: [Finance]
 *     summary: All platform transactions (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - in: query
 *         name: type
 *         schema: { type: string }
 *       - in: query
 *         name: mode
 *         schema: { type: string, enum: [USER_TRANSACTION, APP_REVENUE] }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /withdraw/request/{accountId}:
 *   post:
 *     tags: [Finance]
 *     summary: Request withdrawal
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, bankCode, accountNumber, accountName]
 *             properties:
 *               amount: { type: number }
 *               bankCode: { type: string }
 *               accountNumber: { type: string }
 *               accountName: { type: string }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /withdraw/{id}/approve:
 *   post:
 *     tags: [Finance]
 *     summary: Approve withdrawal (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /user-balance/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: User wallet balance
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venue-balance/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Venue balance
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /points/history/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: Points history
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /account/create:
 *   post:
 *     tags: [Finance]
 *     summary: Create ledger account
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string, format: uuid }
 *               venueId: { type: string, format: uuid }
 *               type: { type: string }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /finance/summary:
 *   get:
 *     tags: [Finance]
 *     summary: Platform finance summary (admin)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 */

export {};
