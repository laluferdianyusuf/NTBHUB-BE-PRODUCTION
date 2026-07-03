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
 *     summary: Pay for a pending booking
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingPaymentRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
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
 * /orders/order/create:
 *   post:
 *     tags: [Booking]
 *     summary: Create food/service order
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuId: { type: string, format: uuid }
 *                     quantity: { type: integer }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
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
