/**
 * @openapi
 * /events/list-events:
 *   get:
 *     tags: [Event]
 *     summary: List published events
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/list-merged-events:
 *   get:
 *     tags: [Event]
 *     summary: List merged events (platform + community)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/detail-event/{id}:
 *   get:
 *     tags: [Event]
 *     summary: Event detail
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /events/event/dashboard/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Event organizer dashboard
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/create-event:
 *   post:
 *     tags: [Event]
 *     summary: Create event
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, startAt]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               startAt: { type: string, format: date-time }
 *               endAt: { type: string, format: date-time }
 *               location: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /events/events-with-details:
 *   get:
 *     tags: [Event]
 *     summary: All events with ticket details
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/update/{id}/status:
 *   put:
 *     tags: [Event]
 *     summary: Update event status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { $ref: '#/components/schemas/EventStatus' }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/remove/{id}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete event
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/scan-qrCode:
 *   post:
 *     tags: [Event]
 *     summary: Scan event ticket QR code (check-in)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [qrCode]
 *             properties:
 *               qrCode: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/detail-ticket/{id}:
 *   get:
 *     tags: [Event]
 *     summary: Get ticket detail
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /events/tickets-user/{userId}:
 *   get:
 *     tags: [Event]
 *     summary: Tickets owned by user
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
 * /events/order/checkout-pay:
 *   post:
 *     tags: [Event]
 *     summary: Checkout and pay for event tickets
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, items]
 *             properties:
 *               selectedUserId: { type: string, format: uuid }
 *               eventId: { type: string, format: uuid }
 *               pin: { type: string }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ticketTypeId: { type: string, format: uuid }
 *                     quantity: { type: integer }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /ticket-type/create:
 *   post:
 *     tags: [Event]
 *     summary: Create event ticket type
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, name, price, quota]
 *             properties:
 *               eventId: { type: string, format: uuid }
 *               name: { type: string }
 *               price: { type: number }
 *               quota: { type: integer }
 *               description: { type: string }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /ticket-type/event/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Ticket types for an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /attendances/check-in/{eventId}:
 *   post:
 *     tags: [Event]
 *     summary: Check in to event
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /community-events/create/{communityId}:
 *   post:
 *     tags: [Event]
 *     summary: Create community event
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, startAt, type]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               startAt: { type: string, format: date-time }
 *               endAt: { type: string, format: date-time }
 *               type: { type: string, enum: [ONLINE, OFFLINE, HYBRID] }
 *               location: { type: string }
 *               meetingLink: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 */

export {};
