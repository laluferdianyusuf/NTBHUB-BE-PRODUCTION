/**
 * @openapi
 * /notifications/notification:
 *   get:
 *     tags: [Platform]
 *     summary: Get current user notifications
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /notifications/notification/user:
 *   post:
 *     tags: [Platform]
 *     summary: Send push notification (admin)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, body]
 *             properties:
 *               title: { type: string }
 *               body: { type: string }
 *               recipientId: { type: string, format: uuid }
 *               recipientType: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /notifications/read/{recipientId}:
 *   put:
 *     tags: [Platform]
 *     summary: Mark all notifications as read
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: recipientType
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /news/create:
 *   post:
 *     tags: [Platform]
 *     summary: Scrape and save news from URL
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sourceUrl]
 *             properties:
 *               sourceUrl: { type: string, format: uri }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /news/all:
 *   get:
 *     tags: [Platform]
 *     summary: List all news
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /search/global:
 *   get:
 *     tags: [Platform]
 *     summary: Global search (users, venues, events, communities)
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [ALL, USER, VENUE, EVENT, COMMUNITY] }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /presence/heartbeat:
 *   post:
 *     tags: [Platform]
 *     summary: Update user online presence
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /presence/online:
 *   get:
 *     tags: [Platform]
 *     summary: List online users
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /presence/nearby:
 *   get:
 *     tags: [Platform]
 *     summary: Nearby online users
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema: { type: number }
 *       - in: query
 *         name: longitude
 *         schema: { type: number }
 *       - in: query
 *         name: radius
 *         schema: { type: number, default: 5000 }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /maps/places/autocomplete:
 *   get:
 *     tags: [Platform]
 *     summary: Google Places autocomplete
 *     parameters:
 *       - in: query
 *         name: input
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /maps/places/details:
 *   get:
 *     tags: [Platform]
 *     summary: Google Place details
 *     parameters:
 *       - in: query
 *         name: placeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /devices/register:
 *   post:
 *     tags: [Platform]
 *     summary: Register FCM device token
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, platform]
 *             properties:
 *               token: { type: string }
 *               platform: { type: string, enum: [android, ios, web] }
 *               venueId: { type: string, format: uuid }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /locations/track:
 *   post:
 *     tags: [Platform]
 *     summary: Track user GPS location
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [latitude, longitude]
 *             properties:
 *               latitude: { type: number }
 *               longitude: { type: number }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /invitations/generate:
 *   post:
 *     tags: [Platform]
 *     summary: Generate venue invitation link
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, venueId]
 *             properties:
 *               email: { type: string, format: email }
 *               venueId: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /invitations/claim:
 *   post:
 *     tags: [Platform]
 *     summary: Claim invitation with key
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key]
 *             properties:
 *               key: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /urls/preview:
 *   post:
 *     tags: [Platform]
 *     summary: Get Open Graph link preview
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [link]
 *             properties:
 *               link: { type: string, format: uri }
 *     responses:
 *       200:
 *         description: Link preview data
 *
 * /tasks/create:
 *   post:
 *     tags: [Platform]
 *     summary: Create scheduled task
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entityType: { type: string }
 *               entityId: { type: string, format: uuid }
 *               type: { type: string }
 *               scheduledAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /courier/register:
 *   post:
 *     tags: [Platform]
 *     summary: Register as courier
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleType: { type: string, enum: [MOTORCYCLE, CAR, BICYCLE] }
 *               plateNumber: { type: string }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /logs/log/logs:
 *   get:
 *     tags: [Platform]
 *     summary: Query application logs (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /well-known/.well-known/assetlinks.json:
 *   get:
 *     tags: [Platform]
 *     summary: Android App Links verification
 *     responses:
 *       200:
 *         description: assetlinks.json for Android deep linking
 *
 * /well-known/.well-known/apple-app-site-association:
 *   get:
 *     tags: [Platform]
 *     summary: iOS Universal Links verification
 *     responses:
 *       200:
 *         description: apple-app-site-association JSON
 *
 * /deep-link/{type}/{id}:
 *   get:
 *     tags: [Platform]
 *     summary: Deep link landing page with OG meta tags
 *     description: Returns HTML page that redirects to mobile app. Types - user, venue, event, verify-email, reset-password, invite.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema: { type: string, enum: [user, venue, event, verify-email, reset-password, invite] }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: ref
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: HTML landing page
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

export {};
