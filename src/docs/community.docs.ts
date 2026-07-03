/**
 * @openapi
 * /communities/create-community:
 *   post:
 *     tags: [Community]
 *     summary: Create a community
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               isPublic: { type: boolean, default: true }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /communities/list/{userId}:
 *   get:
 *     tags: [Community]
 *     summary: Communities joined by user
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
 * /communities/list-public:
 *   get:
 *     tags: [Community]
 *     summary: Public communities
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /communities/detail/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Community detail
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /communities/update/{id}:
 *   put:
 *     tags: [Community]
 *     summary: Update community
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               isPublic: { type: boolean }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /communities/delete/{id}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /communities/members/{id}:
 *   get:
 *     tags: [Community]
 *     summary: List community members
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/UuidPath'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /community-members/add/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Add member to community (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId: { type: string, format: uuid }
 *               role: { $ref: '#/components/schemas/CommunityMemberRole' }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /community-members/request/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Request to join community
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId: { type: string, format: uuid }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /community-members/approve/{memberId}:
 *   patch:
 *     tags: [Community]
 *     summary: Approve pending member
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /community-members/reject/{memberId}:
 *   delete:
 *     tags: [Community]
 *     summary: Reject or remove member
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /community-posts/create:
 *   post:
 *     tags: [Community]
 *     summary: Create community post
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [communityId, content]
 *             properties:
 *               communityId: { type: string, format: uuid }
 *               content: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /community-reactions/toggle:
 *   post:
 *     tags: [Community]
 *     summary: Toggle reaction on post
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId, type]
 *             properties:
 *               postId: { type: string, format: uuid }
 *               type: { type: string, enum: [LIKE, LOVE, HAHA, WOW, SAD, ANGRY] }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /comments/{entityType}/{entityId}:
 *   get:
 *     tags: [Community]
 *     summary: List comments for entity
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema: { $ref: '#/components/schemas/CommentEntityType' }
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /comments/create:
 *   post:
 *     tags: [Community]
 *     summary: Create comment
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [entityType, entityId, content]
 *             properties:
 *               entityType: { $ref: '#/components/schemas/CommentEntityType' }
 *               entityId: { type: string }
 *               content: { type: string }
 *               parentId: { type: string, format: uuid }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 *
 * /comments/{commentId}/like:
 *   post:
 *     tags: [Community]
 *     summary: Like/unlike comment
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *
 * /community-twibbons/create:
 *   post:
 *     tags: [Community]
 *     summary: Create twibbon frame
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               communityId: { type: string, format: uuid }
 *               title: { type: string }
 *               frame: { type: string, format: binary }
 *     responses:
 *       201:
 *         $ref: '#/components/responses/Created'
 */

export {};
