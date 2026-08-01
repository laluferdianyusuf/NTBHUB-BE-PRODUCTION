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
 *           example: "123456"
 *
 *     BookingPaymentResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Booking paid successfully
 *         paymentId:
 *           type: string
 *           format: uuid
 *         bookingId:
 *           type: string
 *           format: uuid
 *         newBalance:
 *           type: number
 *           example: 200000
 *
 *     CourierStatus:
 *       type: string
 *       enum: [OFFLINE, ONLINE, ON_DELIVERY, SUSPENDED]
 *       example: ONLINE
 *
 *     DeliveryStatus:
 *       type: string
 *       enum: [PENDING, ASSIGNED, PICKED_UP, ON_THE_WAY, DELIVERED, CANCELLED]
 *       example: ASSIGNED
 *
 *     VehicleType:
 *       type: string
 *       enum: [MOTORCYCLE, CAR, BICYCLE, WALKING]
 *       example: MOTORCYCLE
 *
 *     PaymentMethod:
 *       type: string
 *       enum: [VA, QRIS, WALLET]
 *
 *     PaymentProvider:
 *       type: string
 *       enum: [MIDTRANS, NTB_HUB]
 *
 *     PaymentStatus:
 *       type: string
 *       enum: [PENDING, SUCCESS, FAILED, EXPIRED]
 *
 *     TopUpRequest:
 *       type: object
 *       required: [amount, bankCode]
 *       properties:
 *         amount:
 *           type: number
 *           minimum: 10000
 *           example: 100000
 *         bankCode:
 *           type: string
 *           enum: [bca, bni, bri, mandiri, permata]
 *           example: bca
 *
 *     TopUpQrisRequest:
 *       type: object
 *       required: [amount]
 *       properties:
 *         amount:
 *           type: number
 *           minimum: 10000
 *           example: 50000
 *
 *     TopUpResponse:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: string
 *           format: uuid
 *         invoiceId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           example: 100000
 *         grossAmount:
 *           type: number
 *           example: 104440
 *         vaNumber:
 *           type: string
 *           example: "8077712345678901"
 *         qrisUrl:
 *           type: string
 *           format: uri
 *         expiredAt:
 *           type: string
 *           format: date-time
 *
 *     PaymentStatusResponse:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: string
 *           format: uuid
 *         status:
 *           $ref: '#/components/schemas/PaymentStatus'
 *         amount:
 *           type: number
 *         method:
 *           $ref: '#/components/schemas/PaymentMethod'
 *         provider:
 *           $ref: '#/components/schemas/PaymentProvider'
 *         entityType:
 *           type: string
 *           example: TOPUP
 *         newBalance:
 *           type: number
 *
 *     CreateOrderRequest:
 *       type: object
 *       required: [venueId, items]
 *       properties:
 *         venueId:
 *           type: string
 *           format: uuid
 *         promoCode:
 *           type: string
 *           example: DISKON10
 *         requiresDelivery:
 *           type: boolean
 *           default: false
 *           example: true
 *         dropoffAddress:
 *           type: string
 *           example: "Jl. Pejanggik No. 88, Mataram"
 *         dropoffLatitude:
 *           type: number
 *           example: -8.5833
 *         dropoffLongitude:
 *           type: number
 *           example: 116.1167
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             required: [menuId, quantity]
 *             properties:
 *               menuId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 example: 2
 *
 *     OrderPaymentRequest:
 *       type: object
 *       properties:
 *         pin:
 *           type: string
 *           example: "123456"
 *
 *     OrderPaymentResponse:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           format: uuid
 *         deliveryId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         newBalance:
 *           type: number
 *           example: 150000
 *
 *     CourierRegisterRequest:
 *       type: object
 *       required: [vehicleType]
 *       properties:
 *         vehicleType:
 *           $ref: '#/components/schemas/VehicleType'
 *         plateNumber:
 *           type: string
 *           example: DR 1234 AB
 *
 *     CourierStatusRequest:
 *       type: object
 *       required: [status]
 *       properties:
 *         status:
 *           type: string
 *           enum: [ONLINE, OFFLINE]
 *           example: ONLINE
 *
 *     CourierLocationRequest:
 *       type: object
 *       required: [latitude, longitude]
 *       properties:
 *         latitude:
 *           type: number
 *           example: -8.5833
 *         longitude:
 *           type: number
 *           example: 116.1167
 *
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         orderId:
 *           type: string
 *           format: uuid
 *         status:
 *           $ref: '#/components/schemas/DeliveryStatus'
 *         pickupAddress:
 *           type: string
 *         dropoffAddress:
 *           type: string
 *         courier:
 *           type: object
 *           nullable: true
 *
 *     DeliveryEventPayload:
 *       type: object
 *       description: Socket.IO event payload (delivery:assigned, delivery:location, dll.)
 *       properties:
 *         deliveryId:
 *           type: string
 *           format: uuid
 *         orderId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         courierUserId:
 *           type: string
 *           format: uuid
 *         status:
 *           $ref: '#/components/schemas/DeliveryStatus'
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *
 *     PaymentEventPayload:
 *       type: object
 *       description: Socket.IO event payload (payment:completed, balance:updated)
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         paymentId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [SUCCESS, FAILED, EXPIRED]
 *         newBalance:
 *           type: number
 *           example: 250000
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
 *     PaymentIdPath:
 *       in: path
 *       name: paymentId
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *     DeliveryIdPath:
 *       in: path
 *       name: deliveryId
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *     OrderIdPath:
 *       in: path
 *       name: orderId
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
