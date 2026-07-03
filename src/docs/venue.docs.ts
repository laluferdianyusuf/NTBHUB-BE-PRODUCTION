/**
 * @openapi
 * /venues/create-venue:
 *   post:
 *     tags: [Venue]
 *     summary: Create a new venue
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, address, latitude, longitude]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               address: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               phone: { type: string }
 *               categoryId: { type: string, format: uuid }
 *               image: { type: string, format: binary }
 *               gallery:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /venues/venue/venues:
 *   get:
 *     tags: [Venue]
 *     summary: List all venues
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venues/venue/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue detail
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /venues/venue/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venue (owner/admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               address: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               image: { type: string, format: binary }
 *               gallery:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 * /venues/venue/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venue (owner/admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venues/activate/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Activate venue
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venues/venue/popular/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Popular venues
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venues/active/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Active venues list
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venues/venue/liked-byUser/{userId}:
 *   get:
 *     tags: [Venue]
 *     summary: Venues liked by user
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
 * /venues/customers/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Customers of a venue
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
 * /venues/venue/{venueId}/like:
 *   post:
 *     tags: [Venue]
 *     summary: Toggle like on venue
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
 * /venues/venue/{venueId}/impression:
 *   post:
 *     tags: [Venue]
 *     summary: Record venue impression/view
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
 * /venues/venue/{venueId}/likes/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue like count
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
 * /venues/venue/{venueId}/impressions/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue impression count
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venue-category/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue category
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code]
 *             properties:
 *               name: { type: string }
 *               code: { type: string }
 *               icon: { type: string }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /venue-category/categories:
 *   get:
 *     tags: [Venue]
 *     summary: List venue categories
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /venue-service/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue service
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [venueId, subCategoryId, bookingType, unitType]
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               subCategoryId: { type: string, format: uuid }
 *               bookingType: { $ref: '#/components/schemas/BookingType' }
 *               unitType: { $ref: '#/components/schemas/UnitType' }
 *               config: { type: object }
 *               file: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /venue-unit/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue unit (table/room/seat)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [venueId, serviceId, name, price, type]
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               serviceId: { type: string, format: uuid }
 *               floorId: { type: string, format: uuid }
 *               name: { type: string }
 *               price: { type: number }
 *               type: { $ref: '#/components/schemas/UnitType' }
 *               isActive: { type: boolean }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /menus/create/menu:
 *   post:
 *     tags: [Venue]
 *     summary: Create menu item
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /public-places/list-places:
 *   get:
 *     tags: [Venue]
 *     summary: List public places (tourist spots)
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema: { type: number }
 *       - in: query
 *         name: longitude
 *         schema: { type: number }
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - in: query
 *         name: type
 *         schema: { type: string }
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /reviews/review/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue review
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [venueId, rating]
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               rating: { type: number, minimum: 1, maximum: 5 }
 *               comment: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /promotion/create-promotion:
 *   post:
 *     tags: [Venue]
 *     summary: Create promotion
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId: { type: string, format: uuid }
 *               code: { type: string }
 *               discountType: { type: string, enum: [PERCENTAGE, FIXED] }
 *               discountValue: { type: number }
 *               startDate: { type: string, format: date-time }
 *               endDate: { type: string, format: date-time }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 */

export {};
