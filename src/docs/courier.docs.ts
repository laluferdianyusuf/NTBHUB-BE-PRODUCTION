/**
 * @openapi
 * /courier/register:
 *   post:
 *     tags: [Courier]
 *     summary: Daftar sebagai kurir
 *     description: |
 *       Mendaftarkan user yang sudah login sebagai kurir.
 *       Otomatis menambahkan role `COURIER` dan akun ledger kurir.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourierRegisterRequest'
 *           example:
 *             vehicleType: MOTORCYCLE
 *             plateNumber: DR 1234 AB
 *     responses:
 *       201:
 *         description: Kurir terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id: { type: string, format: uuid }
 *                         userId: { type: string, format: uuid }
 *                         status: { type: string, example: OFFLINE }
 *                         vehicleType: { type: string, example: MOTORCYCLE }
 *
 * /courier/profile:
 *   get:
 *     tags: [Courier]
 *     summary: Profil kurir
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Data profil kurir
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id: { type: string, format: uuid }
 *                         status: { $ref: '#/components/schemas/CourierStatus' }
 *                         vehicleType: { $ref: '#/components/schemas/VehicleType' }
 *                         rating: { type: number, example: 4.9 }
 *                         totalTrips: { type: integer, example: 42 }
 *
 * /courier/status:
 *   patch:
 *     tags: [Courier]
 *     summary: Ubah status ketersediaan kurir
 *     description: Kurir harus ONLINE agar bisa menerima assignment order.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourierStatusRequest'
 *           example:
 *             status: ONLINE
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/location:
 *   post:
 *     tags: [Courier]
 *     summary: Update lokasi GPS kurir
 *     description: |
 *       Kirim setiap 5–10 detik saat ONLINE atau sedang delivery.
 *       Jika sedang delivery aktif, customer menerima event Socket.IO `delivery:location`.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourierLocationRequest'
 *           example:
 *             latitude: -8.5833
 *             longitude: 116.1167
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/deliveries/active:
 *   get:
 *     tags: [Courier]
 *     summary: Delivery aktif kurir
 *     description: Order yang sedang ASSIGNED, PICKED_UP, atau ON_THE_WAY.
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Delivery aktif atau null
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       oneOf:
 *                         - $ref: '#/components/schemas/Delivery'
 *                         - type: 'null'
 *
 * /courier/deliveries/history:
 *   get:
 *     tags: [Courier]
 *     summary: Riwayat delivery kurir
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/deliveries/order/{orderId}:
 *   get:
 *     tags: [Courier]
 *     summary: Tracking delivery by order ID
 *     description: Customer atau kurir yang terlibat dapat melihat status delivery.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/OrderIdPath'
 *     responses:
 *       200:
 *         description: Detail delivery + lokasi kurir terakhir
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Delivery'
 *                         - type: object
 *                           properties:
 *                             courierLocation:
 *                               type: object
 *                               nullable: true
 *                               properties:
 *                                 latitude: { type: number }
 *                                 longitude: { type: number }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /courier/deliveries/{deliveryId}:
 *   get:
 *     tags: [Courier]
 *     summary: Detail delivery by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /courier/deliveries/{deliveryId}/accept:
 *   post:
 *     tags: [Courier]
 *     summary: Terima assignment delivery
 *     description: |
 *       Konfirmasi order dalam 30 detik setelah `delivery:assigned`.
 *       Membatalkan timeout auto-reassign.
 *       Emit Socket.IO `delivery:accepted`.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/deliveries/{deliveryId}/reject:
 *   post:
 *     tags: [Courier]
 *     summary: Tolak assignment delivery
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         description: Delivery dikembalikan ke PENDING dan di-assign ulang
 *
 * /courier/deliveries/{deliveryId}/pickup:
 *   post:
 *     tags: [Courier]
 *     summary: Tandai barang sudah diambil dari venue
 *     description: Status ASSIGNED → PICKED_UP. Emit `delivery:picked_up`.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/deliveries/{deliveryId}/on-the-way:
 *   post:
 *     tags: [Courier]
 *     summary: Tandai kurir menuju customer
 *     description: Status PICKED_UP → ON_THE_WAY. Emit `delivery:on_the_way`.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/deliveries/{deliveryId}/deliver:
 *   post:
 *     tags: [Courier]
 *     summary: Selesaikan delivery
 *     description: |
 *       Status → DELIVERED. Kurir kembali ONLINE.
 *       Emit `delivery:delivered` ke customer.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /courier/assign/{deliveryId}:
 *   post:
 *     tags: [Courier]
 *     summary: Manual assign delivery (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/DeliveryIdPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 */

export {};
