/**
 * @openapi
 * /payment/topUp:
 *   post:
 *     tags: [Finance]
 *     summary: Top up saldo via Virtual Account
 *     description: |
 *       Membuat pembayaran Midtrans VA. Response berisi `paymentId` untuk SSE/polling.
 *
 *       **Realtime update (pilih salah satu):**
 *       - SSE: `GET /payment/{paymentId}/stream`
 *       - Socket.IO: listen `payment:completed` di room user
 *       - Polling: `GET /payment/{paymentId}/status` setiap 5 detik
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopUpRequest'
 *           example:
 *             amount: 100000
 *             bankCode: bca
 *     responses:
 *       201:
 *         description: VA generated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TopUpResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /payment/topUpQris:
 *   post:
 *     tags: [Finance]
 *     summary: Top up saldo via QRIS
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopUpQrisRequest'
 *           example:
 *             amount: 50000
 *     responses:
 *       201:
 *         description: QRIS URL generated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TopUpResponse'
 *
 * /payment/{paymentId}/status:
 *   get:
 *     tags: [Finance]
 *     summary: Cek status pembayaran (polling fallback)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PaymentIdPath'
 *     responses:
 *       200:
 *         description: Status pembayaran saat ini
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PaymentStatusResponse'
 *             example:
 *               status: true
 *               status_code: 200
 *               message: Payment status retrieved
 *               data:
 *                 paymentId: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *                 status: SUCCESS
 *                 amount: 100000
 *                 method: VA
 *                 provider: MIDTRANS
 *                 entityType: TOPUP
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /payment/{paymentId}/stream:
 *   get:
 *     tags: [Finance]
 *     summary: Stream status pembayaran (SSE)
 *     description: |
 *       Server-Sent Events untuk screen menunggu pembayaran top-up.
 *       Connection ditutup otomatis setelah `payment:completed`, `payment:failed`, atau `payment:expired`.
 *
 *       **Events:**
 *       - `connected` — koneksi aktif
 *       - `payment:completed` — pembayaran sukses
 *       - `payment:failed` — pembayaran gagal
 *       - `payment:expired` — VA/QRIS expired
 *
 *       **Contoh payload `payment:completed`:**
 *       ```json
 *       {
 *         "userId": "uuid",
 *         "paymentId": "uuid",
 *         "status": "SUCCESS",
 *         "amount": 100000,
 *         "newBalance": 250000,
 *         "method": "VA",
 *         "provider": "MIDTRANS"
 *       }
 *       ```
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PaymentIdPath'
 *     responses:
 *       200:
 *         description: SSE stream
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *             example: |
 *               event: connected
 *               data: {"paymentId":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}
 *
 *               event: payment:completed
 *               data: {"userId":"...","paymentId":"...","status":"SUCCESS","newBalance":250000}
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 * /payment/callback:
 *   post:
 *     tags: [Finance]
 *     summary: Midtrans payment webhook
 *     description: Dipanggil oleh Midtrans — jangan invoke manual.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id: { type: string, example: TOPUP-A1B2C3D4 }
 *               transaction_status: { type: string, example: settlement }
 *               gross_amount: { type: string, example: "104440.00" }
 *               signature_key: { type: string }
 *     responses:
 *       200:
 *         description: Callback acknowledged
 *
 * /payment/lists/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: Riwayat top-up by user
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
 *               amount: { type: number, example: 500000 }
 *               bankCode: { type: string, example: bca }
 *               accountNumber: { type: string, example: "1234567890" }
 *               accountName: { type: string, example: "John Doe" }
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
