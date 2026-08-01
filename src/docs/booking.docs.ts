/**
 * @openapi
 * /bookings/booking/create:
 *   post:
 *     tags: [Booking]
 *     summary: Create a new venue booking
 *     description: Creates booking for TIME, SESSION, or INSTANT service types. May include optional menu orders.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *
 * /bookings/booking/payment/{id}:
 *   put:
 *     tags: [Booking]
 *     summary: Bayar booking pending via wallet
 *     description: |
 *       Debit saldo NTB Hub langsung. Response berisi `newBalance` dan `paymentId`.
 *       Emit Socket.IO `payment:completed` + `balance:updated`.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingPaymentRequest'
 *           example:
 *             pin: "123456"
 *     responses:
 *       201:
 *         description: Booking paid
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BookingPaymentResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /bookings/booking/bookings:
 *   get:
 *     tags: [Booking]
 *     summary: List all bookings (admin)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/users/{userId}:
 *   get:
 *     tags: [Booking]
 *     summary: Get bookings by user
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/BookingStatus'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/by-venue/{venueId}/admin:
 *   get:
 *     tags: [Booking]
 *     summary: Venue bookings — admin view
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: tab
 *         schema: { type: string, default: all_book }
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/by-venue/{venueId}/venue-owner:
 *   get:
 *     tags: [Booking]
 *     summary: Venue bookings — owner view
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: tab
 *         schema: { type: string }
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/venue/dashboard/{venueId}:
 *   get:
 *     tags: [Booking]
 *     summary: Venue booking dashboard metrics
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
 * /bookings/booking/status-paid/{userId}:
 *   get:
 *     tags: [Booking]
 *     summary: Paid bookings by user
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
 * /bookings/booking/status-complete/{userId}:
 *   get:
 *     tags: [Booking]
 *     summary: Completed bookings by user
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
 * /bookings/booking/status-pending/{userId}:
 *   get:
 *     tags: [Booking]
 *     summary: Pending bookings by user
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
 * /bookings/booking/{id}:
 *   get:
 *     tags: [Booking]
 *     summary: Get booking detail by ID
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /bookings/booking/{id}/cancel:
 *   put:
 *     tags: [Booking]
 *     summary: Cancel a booking
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/{id}/complete:
 *   put:
 *     tags: [Booking]
 *     summary: Mark booking as completed
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/existing/bookings:
 *   get:
 *     tags: [Booking]
 *     summary: Check existing active bookings
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /bookings/booking/venue-with-details:
 *   get:
 *     tags: [Booking]
 *     summary: List venues with booking details
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /orders/create-order:
 *   post:
 *     tags: [Booking]
 *     summary: Buat order makanan/minuman
 *     description: |
 *       Set `requiresDelivery: true` jika order perlu diantar kurir.
 *       Wajib sertakan `dropoffAddress` (+ koordinat opsional) untuk delivery.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *           example:
 *             venueId: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *             requiresDelivery: true
 *             dropoffAddress: "Jl. Pejanggik No. 88, Mataram"
 *             dropoffLatitude: -8.5833
 *             dropoffLongitude: 116.1167
 *             items:
 *               - menuId: 7c9e6679-7425-40de-944b-e07fc1f90ae7
 *                 quantity: 2
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /orders/pay-order/{orderId}:
 *   post:
 *     tags: [Booking]
 *     summary: Bayar order via wallet
 *     description: |
 *       Jika `requiresDelivery: true`, otomatis membuat delivery dan dispatch kurir.
 *       Response include `deliveryId` untuk tracking.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/OrderIdPath'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPaymentRequest'
 *           example:
 *             pin: "123456"
 *     responses:
 *       203:
 *         description: Order paid
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OrderPaymentResponse'
 *
 * /orders/cancel-order/{orderId}:
 *   post:
 *     tags: [Booking]
 *     summary: Batalkan order pending
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/OrderIdPath'
 *     responses:
 *       203:
 *         $ref: '#/components/responses/Success'
 *
 * /orders/users:
 *   get:
 *     tags: [Booking]
 *     summary: List order user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /invoice/invoice/{bookingId}:
 *   get:
 *     tags: [Booking]
 *     summary: Get invoice by booking ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 */

export {};
