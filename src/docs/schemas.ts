/**
 * @openapi
 * components:
 *   schemas:
 *     ApiSuccessResponse:
 *       type: object
 *       required: [status, status_code, message]
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         status_code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           nullable: true
 *           description: Payload varies per endpoint
 *
 *     ApiErrorResponse:
 *       type: object
 *       required: [status, status_code, message]
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         status_code:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Validation failed
 *
 *     Role:
 *       type: string
 *       enum: [CUSTOMER, ADMIN, VENUE_OWNER, EVENT_OWNER, COURIER]
 *
 *     BookingStatus:
 *       type: string
 *       enum: [PENDING, PAID, COMPLETED, CANCELLED, EXPIRED]
 *
 *     EventStatus:
 *       type: string
 *       enum: [DRAFT, PUBLISHED, ONGOING, COMPLETED, CANCELLED]
 *
 *     CommunityMemberRole:
 *       type: string
 *       enum: [MEMBER, MODERATOR, ADMIN]
 *
 *     CommunityMemberStatus:
 *       type: string
 *       enum: [PENDING, APPROVED, REJECTED]
 *
 *     CommentEntityType:
 *       type: string
 *       enum: [NEWS, COMMUNITY_POST, PUBLIC_PLACE, VENUE]
 *
 *     BookingType:
 *       type: string
 *       enum: [TIME, SESSION, INSTANT]
 *
 *     UnitType:
 *       type: string
 *       enum: [TABLE, ROOM, SEAT, FIELD, OTHER]
 *
 *     WithdrawStatus:
 *       type: string
 *       enum: [PENDING, PROCESSING, PAID, REJECTED]
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 20
 *         total:
 *           type: integer
 *           example: 100
 *         totalPages:
 *           type: integer
 *           example: 5
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         image:
 *           type: string
 *           nullable: true
 *         isVerified:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 *     CreateBookingRequest:
 *       type: object
 *       required: [userId, venueId, serviceId, unitId]
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         venueId:
 *           type: string
 *           format: uuid
 *         serviceId:
 *           type: string
 *           format: uuid
 *         unitId:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *           example: "2026-06-27"
 *         startTime:
 *           type: integer
 *           description: Hour 0-23 for TIME booking
 *           example: 10
 *         endTime:
 *           type: integer
 *           description: Hour 0-23 for TIME booking
 *           example: 12
 *         sessionId:
 *           type: string
 *           format: uuid
 *         promoCode:
 *           type: string
 *         orders:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *
 *     BookingPaymentRequest:
 *       type: object
 *       properties:
 *         pin:
 *           type: string
 *           minLength: 4
 *           maxLength: 6
 *
 *     Venue:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         address:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         isActive:
 *           type: boolean
 *         image:
 *           type: string
 *           nullable: true
 *
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         startAt:
 *           type: string
 *           format: date-time
 *         endAt:
 *           type: string
 *           format: date-time
 *         status:
 *           $ref: '#/components/schemas/EventStatus'
 *         location:
 *           type: string
 *
 *     Community:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         image:
 *           type: string
 *           nullable: true
 *
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         isRead:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *   parameters:
 *     PageQuery:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *         minimum: 1
 *     LimitQuery:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 20
 *         minimum: 1
 *         maximum: 100
 *     SearchQuery:
 *       in: query
 *       name: search
 *       schema:
 *         type: string
 *     UuidPath:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *
 *   responses:
 *     Success:
 *       description: Operation successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiSuccessResponse'
 *     Created:
 *       description: Resource created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiSuccessResponse'
 *     Unauthorized:
 *       description: Missing or invalid bearer token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiErrorResponse'
 *     Forbidden:
 *       description: Insufficient permissions
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiErrorResponse'
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiErrorResponse'
 *     ValidationError:
 *       description: Request validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiErrorResponse'
 */

export {};
