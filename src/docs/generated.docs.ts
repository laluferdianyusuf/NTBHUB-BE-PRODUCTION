/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth register
 *     operationId: postauth_register
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/register-admin:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth register admin
 *     operationId: postauth_register_admin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth login
 *     operationId: postauth_login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth refresh
 *     operationId: postauth_refresh
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth verify email
 *     operationId: postauth_verify_email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth resend verification
 *     operationId: postauth_resend_verification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/google:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth google
 *     operationId: postauth_google
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get auth me
 *     operationId: getauth_me
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/set-pin/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth set pin
 *     operationId: postauth_set_pin_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/set-biometric/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth set biometric
 *     operationId: postauth_set_biometric_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /auth/verify-pin/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Create auth verify pin
 *     operationId: postauth_verify_pin_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/all-users:
 *   get:
 *     tags: [Users]
 *     summary: Get users all users
 *     operationId: getusers_all_users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/all-top-spender:
 *   get:
 *     tags: [Users]
 *     summary: Get users all top spender
 *     operationId: getusers_all_top_spender
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/detail-user/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get users detail user
 *     operationId: getusers_detail_user_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/manage-profile:
 *   patch:
 *     tags: [Users]
 *     summary: Update users manage profile
 *     operationId: patchusers_manage_profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/change-password:
 *   patch:
 *     tags: [Users]
 *     summary: Update users change password
 *     operationId: patchusers_change_password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/forgot-password:
 *   post:
 *     tags: [Users]
 *     summary: Create users forgot password
 *     operationId: postusers_forgot_password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/verify/forgot-password:
 *   post:
 *     tags: [Users]
 *     summary: Create users verify forgot password
 *     operationId: postusers_verify_forgot_password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/reset-password:
 *   post:
 *     tags: [Users]
 *     summary: Create users reset password
 *     operationId: postusers_reset_password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /users/delete-user/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete users delete user
 *     operationId: deleteusers_delete_user_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /profiles/detail/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get profiles detail
 *     operationId: getprofiles_detail_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /profiles/{id}/view:
 *   post:
 *     tags: [Users]
 *     summary: Create profiles view
 *     operationId: postprofiles_id_view
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /profiles/{id}/like:
 *   post:
 *     tags: [Users]
 *     summary: Create profiles like
 *     operationId: postprofiles_id_like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /search/global:
 *   get:
 *     tags: [Platform]
 *     summary: Get search global
 *     operationId: getsearch_global
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /logs/log/logs:
 *   get:
 *     tags: [Platform]
 *     summary: Get logs log logs
 *     operationId: getlogs_log_logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /presence/heartbeat:
 *   post:
 *     tags: [Platform]
 *     summary: Create presence heartbeat
 *     operationId: postpresence_heartbeat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /presence/online:
 *   get:
 *     tags: [Platform]
 *     summary: Get presence online
 *     operationId: getpresence_online
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /presence/nearby:
 *   get:
 *     tags: [Platform]
 *     summary: Get presence nearby
 *     operationId: getpresence_nearby
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /maps/places/autocomplete:
 *   get:
 *     tags: [Platform]
 *     summary: Get maps places autocomplete
 *     operationId: getmaps_places_autocomplete
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /maps/places/details/{placeId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get maps places details
 *     operationId: getmaps_places_details_placeId
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /maps/directions:
 *   get:
 *     tags: [Platform]
 *     summary: Get maps directions
 *     operationId: getmaps_directions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /well-known/.well-known/assetlinks.json:
 *   get:
 *     tags: [Platform]
 *     summary: Get well known .well known assetlinks.json
 *     operationId: getwell_known_well_known_assetlinks_json
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /well-known/.well-known/apple-app-site-association:
 *   get:
 *     tags: [Platform]
 *     summary: Get well known .well known apple app site association
 *     operationId: getwell_known_well_known_apple_app_site_association
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /deep-link/{type}/{id}:
 *   get:
 *     tags: [Platform]
 *     summary: Get deep link
 *     operationId: getdeep_link_type_id
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /urls/link-preview:
 *   post:
 *     tags: [Platform]
 *     summary: Create urls link preview
 *     operationId: posturls_link_preview
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /interests/:
 *   get:
 *     tags: [Platform]
 *     summary: Get interests
 *     operationId: getinterests_
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /interests/me:
 *   get:
 *     tags: [Platform]
 *     summary: Get interests me
 *     operationId: getinterests_me
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /interests/update/me:
 *   put:
 *     tags: [Platform]
 *     summary: Update interests update me
 *     operationId: putinterests_update_me
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invoice/invoice/invoices:
 *   get:
 *     tags: [Booking]
 *     summary: Get invoice invoice invoices
 *     operationId: getinvoice_invoice_invoices
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/create-venue:
 *   post:
 *     tags: [Venue]
 *     summary: Create venues create venue
 *     operationId: postvenues_create_venue
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Get venues venue venues
 *     operationId: getvenues_venue_venues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/customers/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venues customers
 *     operationId: getvenues_customers_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/liked-byUser/{userId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venues venue liked byUser
 *     operationId: getvenues_venue_liked_byUser_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/popular/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue popular venues
 *     operationId: getvenues_venue_popular_venues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/active/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Get venues active venues
 *     operationId: getvenues_active_venues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venues venue
 *     operationId: getvenues_venue_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venues venue update
 *     operationId: putvenues_venue_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venues venue delete
 *     operationId: deletevenues_venue_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/activate/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venues activate
 *     operationId: putvenues_activate_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/{venueId}/like:
 *   post:
 *     tags: [Venue]
 *     summary: Create venues venue like
 *     operationId: postvenues_venue_venueId_like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/{venueId}/impression:
 *   post:
 *     tags: [Venue]
 *     summary: Create venues venue impression
 *     operationId: postvenues_venue_venueId_impression
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/{venueId}/likes/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue likes count
 *     operationId: getvenues_venue_venueId_likes_count
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venues/venue/{venueId}/impressions/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue impressions count
 *     operationId: getvenues_venue_venueId_impressions_count
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-balance/balance/venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue balance balance venue
 *     operationId: getvenue_balance_balance_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-category/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue category create
 *     operationId: postvenue_category_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-category/categories:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue category categories
 *     operationId: getvenue_category_categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue service create
 *     operationId: postvenue_service_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/by-venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue service by venue
 *     operationId: getvenue_service_by_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/services-venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue service services venue
 *     operationId: getvenue_service_services_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/summary/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue service summary
 *     operationId: getvenue_service_summary_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/detail/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue service detail
 *     operationId: getvenue_service_detail_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venue service update
 *     operationId: putvenue_service_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/toggle-status/{id}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update venue service toggle status
 *     operationId: patchvenue_service_toggle_status_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/deactivate/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venue service deactivate
 *     operationId: deletevenue_service_deactivate_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-service/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venue service delete
 *     operationId: deletevenue_service_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-sub-category/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue sub category create
 *     operationId: postvenue_sub_category_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-sub-category/create-many:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue sub category create many
 *     operationId: postvenue_sub_category_create_many
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-sub-category/by-category/{categoryId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue sub category by category
 *     operationId: getvenue_sub_category_by_category_categoryId
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-sub-category/sub-all:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue sub category sub all
 *     operationId: getvenue_sub_category_sub_all
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue unit create
 *     operationId: postvenue_unit_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/bulk-create:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue unit bulk create
 *     operationId: postvenue_unit_bulk_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/by-service/{serviceId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit by service
 *     operationId: getvenue_unit_by_service_serviceId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/by-venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit by venue
 *     operationId: getvenue_unit_by_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/all/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit all
 *     operationId: getvenue_unit_all_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/summary/{serviceId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit summary
 *     operationId: getvenue_unit_summary_serviceId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/availability/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit availability
 *     operationId: getvenue_unit_availability_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/detail/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue unit detail
 *     operationId: getvenue_unit_detail_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venue unit update
 *     operationId: putvenue_unit_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/toggle-status/{id}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update venue unit toggle status
 *     operationId: patchvenue_unit_toggle_status_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-unit/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venue unit delete
 *     operationId: deletevenue_unit_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-staff/create/{venueId}:
 *   post:
 *     tags: [Venue]
 *     summary: Create venue staff create
 *     operationId: postvenue_staff_create_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-staff/list:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue staff list
 *     operationId: getvenue_staff_list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-staff/detail/{staffId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get venue staff detail
 *     operationId: getvenue_staff_detail_staffId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-staff/update/{staffId}:
 *   put:
 *     tags: [Venue]
 *     summary: Update venue staff update
 *     operationId: putvenue_staff_update_staffId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /venue-staff/delete/{staffId}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete venue staff delete
 *     operationId: deletevenue_staff_delete_staffId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/all:
 *   get:
 *     tags: [Venue]
 *     summary: Get menus all
 *     operationId: getmenus_all
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/create/menu:
 *   post:
 *     tags: [Venue]
 *     summary: Create menus create menu
 *     operationId: postmenus_create_menu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/create-menus:
 *   post:
 *     tags: [Venue]
 *     summary: Create menus create menus
 *     operationId: postmenus_create_menus
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/menu/venues/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get menus menu venues
 *     operationId: getmenus_menu_venues_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/menu/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get menus menu
 *     operationId: getmenus_menu_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *   put:
 *     tags: [Venue]
 *     summary: Update menus menu
 *     operationId: putmenus_menu_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *   delete:
 *     tags: [Venue]
 *     summary: Delete menus menu
 *     operationId: deletemenus_menu_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /menus/available/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update menus available
 *     operationId: putmenus_available_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get operational operate venue
 *     operationId: getoperational_operate_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/create/{venueId}:
 *   post:
 *     tags: [Venue]
 *     summary: Create operational operate create
 *     operationId: postoperational_operate_create_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/edit/{venueId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update operational operate edit
 *     operationId: patchoperational_operate_edit_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/toggle/{venueId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update operational operate toggle
 *     operationId: patchoperational_operate_toggle_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/copy-next/{venueId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update operational operate copy next
 *     operationId: patchoperational_operate_copy_next_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/holiday/{venueId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update operational operate holiday
 *     operationId: patchoperational_operate_holiday_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /operational/operate/special/{venueId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update operational operate special
 *     operationId: patchoperational_operate_special_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /floors/floor/venues/{venueId}:
 *   post:
 *     tags: [Venue]
 *     summary: Create floors floor venues
 *     operationId: postfloors_floor_venues_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *   get:
 *     tags: [Venue]
 *     summary: Get floors floor venues
 *     operationId: getfloors_floor_venues_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /floors/floor/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get floors floor
 *     operationId: getfloors_floor_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /floors/floor/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update floors floor update
 *     operationId: putfloors_floor_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /floors/floor/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete floors floor delete
 *     operationId: deletefloors_floor_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews/review/create:
 *   post:
 *     tags: [Venue]
 *     summary: Create reviews review create
 *     operationId: postreviews_review_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews/review/by-booking/{bookingId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get reviews review by booking
 *     operationId: getreviews_review_by_booking_bookingId
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews/review/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get reviews review
 *     operationId: getreviews_review_venueId
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews-place/create-review:
 *   post:
 *     tags: [Venue]
 *     summary: Create reviews place create review
 *     operationId: postreviews_place_create_review
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews-place/detail-review/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get reviews place detail review
 *     operationId: getreviews_place_detail_review_id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /reviews-place/rating/{placeId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get reviews place rating
 *     operationId: getreviews_place_rating_placeId
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/list-places:
 *   get:
 *     tags: [Venue]
 *     summary: Get public places list places
 *     operationId: getpublic_places_list_places
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/detail-place/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get public places detail place
 *     operationId: getpublic_places_detail_place_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/create-place:
 *   post:
 *     tags: [Venue]
 *     summary: Create public places create place
 *     operationId: postpublic_places_create_place
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/update-place/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update public places update place
 *     operationId: putpublic_places_update_place_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/delete-place/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete public places delete place
 *     operationId: deletepublic_places_delete_place_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/place/{placeId}/like:
 *   post:
 *     tags: [Venue]
 *     summary: Create public places place like
 *     operationId: postpublic_places_place_placeId_like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/place/{placeId}/impression:
 *   post:
 *     tags: [Venue]
 *     summary: Create public places place impression
 *     operationId: postpublic_places_place_placeId_impression
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/place/{placeId}/likes/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get place likes count
 *     operationId: getpublic_places_place_placeId_likes_count
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /public-places/place/{placeId}/impressions/count:
 *   get:
 *     tags: [Venue]
 *     summary: Get place impressions count
 *     operationId: getpublic_places_place_placeId_impressions_count
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /promotion/create-promotion:
 *   post:
 *     tags: [Venue]
 *     summary: Create promotion create promotion
 *     operationId: postpromotion_create_promotion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /promotion/approved-promotion/{promotionId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update promotion approved promotion
 *     operationId: patchpromotion_approved_promotion_promotionId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promotionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /promotion/reject-promotion/{promotionId}:
 *   patch:
 *     tags: [Venue]
 *     summary: Update promotion reject promotion
 *     operationId: patchpromotion_reject_promotion_promotionId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promotionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /promotion/summary/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get promotion summary
 *     operationId: getpromotion_summary_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /promotion/by-venue/{venueId}:
 *   get:
 *     tags: [Venue]
 *     summary: Get promotion by venue
 *     operationId: getpromotion_by_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/banners:
 *   get:
 *     tags: [Venue]
 *     summary: Get banners banners
 *     operationId: getbanners_banners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/{id}/view:
 *   post:
 *     tags: [Venue]
 *     summary: Create banners view
 *     operationId: postbanners_id_view
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/{id}/click:
 *   post:
 *     tags: [Venue]
 *     summary: Create banners click
 *     operationId: postbanners_id_click
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/:
 *   post:
 *     tags: [Venue]
 *     summary: Create banners
 *     operationId: postbanners_
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/update/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update banners update
 *     operationId: putbanners_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/delete/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete banners delete
 *     operationId: deletebanners_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /banners/{id}/analytics:
 *   get:
 *     tags: [Venue]
 *     summary: Get banners analytics
 *     operationId: getbanners_id_analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/list-events:
 *   get:
 *     tags: [Event]
 *     summary: Get events list events
 *     operationId: getevents_list_events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/list-merged-events:
 *   get:
 *     tags: [Event]
 *     summary: Get events list merged events
 *     operationId: getevents_list_merged_events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/detail-event/{id}:
 *   get:
 *     tags: [Event]
 *     summary: Get events detail event
 *     operationId: getevents_detail_event_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/event/dashboard/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Get events event dashboard
 *     operationId: getevents_event_dashboard_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/create-event:
 *   post:
 *     tags: [Event]
 *     summary: Create events create event
 *     operationId: postevents_create_event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/events-with-details:
 *   get:
 *     tags: [Event]
 *     summary: Get events events with details
 *     operationId: getevents_events_with_details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/update/{id}/status:
 *   put:
 *     tags: [Event]
 *     summary: Update events update status
 *     operationId: putevents_update_id_status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/remove/{id}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete events remove
 *     operationId: deleteevents_remove_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/scan-qrCode:
 *   post:
 *     tags: [Event]
 *     summary: Create events scan qrCode
 *     operationId: postevents_scan_qrCode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/detail-ticket/{id}:
 *   get:
 *     tags: [Event]
 *     summary: Get events detail ticket
 *     operationId: getevents_detail_ticket_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/tickets-user/{userId}:
 *   get:
 *     tags: [Event]
 *     summary: Get events tickets user
 *     operationId: getevents_tickets_user_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/orders-tickets/{orderId}:
 *   get:
 *     tags: [Event]
 *     summary: Get events orders tickets
 *     operationId: getevents_orders_tickets_orderId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/ticket/type/create:
 *   post:
 *     tags: [Event]
 *     summary: Create ticket type create
 *     operationId: postevents_ticket_type_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/ticket/type/update/{id}:
 *   put:
 *     tags: [Event]
 *     summary: Update ticket type update
 *     operationId: putevents_ticket_type_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/ticket/type/delete/{id}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete ticket type delete
 *     operationId: deleteevents_ticket_type_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/ticket/type/event/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Get ticket type event
 *     operationId: getevents_ticket_type_event_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/order/ticket-payment/webhook:
 *   post:
 *     tags: [Event]
 *     summary: Create order ticket payment webhook
 *     operationId: postevents_order_ticket_payment_webhook
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/order/checkout-pay:
 *   post:
 *     tags: [Event]
 *     summary: Create events order checkout pay
 *     operationId: postevents_order_checkout_pay
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/detail-order/{id}:
 *   get:
 *     tags: [Event]
 *     summary: Get events detail order
 *     operationId: getevents_detail_order_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/orders:
 *   get:
 *     tags: [Event]
 *     summary: Get events orders
 *     operationId: getevents_orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /events/orders/by-events/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Get events orders by events
 *     operationId: getevents_orders_by_events_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ticket-type/create-ticket:
 *   post:
 *     tags: [Event]
 *     summary: Create ticket type create ticket
 *     operationId: postticket_type_create_ticket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ticket-type/event-ticket/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Get ticket type event ticket
 *     operationId: getticket_type_event_ticket_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ticket-type/update-ticket/{id}:
 *   put:
 *     tags: [Event]
 *     summary: Update ticket type update ticket
 *     operationId: putticket_type_update_ticket_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ticket-type/delete-ticket/{id}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete ticket type delete ticket
 *     operationId: deleteticket_type_delete_ticket_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /attendances/events/{eventId}/check-in:
 *   post:
 *     tags: [Event]
 *     summary: Create attendances events check in
 *     operationId: postattendances_events_eventId_check_in
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/create-community:
 *   post:
 *     tags: [Community]
 *     summary: Create communities create community
 *     operationId: postcommunities_create_community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/list/{userId}:
 *   get:
 *     tags: [Community]
 *     summary: Get communities list
 *     operationId: getcommunities_list_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/list-public:
 *   get:
 *     tags: [Community]
 *     summary: Get communities list public
 *     operationId: getcommunities_list_public
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/detail/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Get communities detail
 *     operationId: getcommunities_detail_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/update/{id}:
 *   put:
 *     tags: [Community]
 *     summary: Update communities update
 *     operationId: putcommunities_update_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/delete/{id}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete communities delete
 *     operationId: deletecommunities_delete_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /communities/members/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Get communities members
 *     operationId: getcommunities_members_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-members/add/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community members add
 *     operationId: postcommunity_members_add_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-members/request/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community members request
 *     operationId: postcommunity_members_request_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-members/approve/{memberId}:
 *   patch:
 *     tags: [Community]
 *     summary: Update community members approve
 *     operationId: patchcommunity_members_approve_memberId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-members/reject/{memberId}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community members reject
 *     operationId: deletecommunity_members_reject_memberId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-posts/list/{communityId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community posts list
 *     operationId: getcommunity_posts_list_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-posts/create/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community posts create
 *     operationId: postcommunity_posts_create_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-posts/update/{postId}:
 *   put:
 *     tags: [Community]
 *     summary: Update community posts update
 *     operationId: putcommunity_posts_update_postId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-posts/delete/{postId}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community posts delete
 *     operationId: deletecommunity_posts_delete_postId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-reactions/list/{postId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community reactions list
 *     operationId: getcommunity_reactions_list_postId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-reactions/add/{postId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community reactions add
 *     operationId: postcommunity_reactions_add_postId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-reactions/remove/{reactionId}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community reactions remove
 *     operationId: deletecommunity_reactions_remove_reactionId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/list/{communityId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events list
 *     operationId: getcommunity_events_list_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/create-event/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community events create event
 *     operationId: postcommunity_events_create_event_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/create-collaboration:
 *   post:
 *     tags: [Community]
 *     summary: Create community events create collaboration
 *     operationId: postcommunity_events_create_collaboration
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/detail/{eventId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events detail
 *     operationId: getcommunity_events_detail_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/event/dashboard/{eventId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events event dashboard
 *     operationId: getcommunity_events_event_dashboard_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/scan-community-qrCode:
 *   post:
 *     tags: [Community]
 *     summary: Create community events scan community qrCode
 *     operationId: postcommunity_events_scan_community_qrCode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/detail-ticket/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events detail ticket
 *     operationId: getcommunity_events_detail_ticket_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/tickets-user/{userId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events tickets user
 *     operationId: getcommunity_events_tickets_user_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/orders-tickets/{orderId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events orders tickets
 *     operationId: getcommunity_events_orders_tickets_orderId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/ticket/type/create/{communityEventId}:
 *   post:
 *     tags: [Community]
 *     summary: Create ticket type create
 *     operationId: postcommunity_events_ticket_type_create_communityEventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityEventId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/ticket/type/event/{communityEventId}:
 *   get:
 *     tags: [Community]
 *     summary: Get ticket type event
 *     operationId: getcommunity_events_ticket_type_event_communityEventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityEventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/order/checkout-ticket:
 *   post:
 *     tags: [Community]
 *     summary: Create community events order checkout ticket
 *     operationId: postcommunity_events_order_checkout_ticket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/order/ticket-payment/webhook:
 *   post:
 *     tags: [Community]
 *     summary: Create order ticket payment webhook
 *     operationId: postcommunity_events_order_ticket_payment_webhook
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/order/checkout-pay:
 *   post:
 *     tags: [Community]
 *     summary: Create community events order checkout pay
 *     operationId: postcommunity_events_order_checkout_pay
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/detail-order/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Get community events detail order
 *     operationId: getcommunity_events_detail_order_id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/orders:
 *   get:
 *     tags: [Community]
 *     summary: Get community events orders
 *     operationId: getcommunity_events_orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-events/scan-qrCode:
 *   post:
 *     tags: [Community]
 *     summary: Create community events scan qrCode
 *     operationId: postcommunity_events_scan_qrCode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-event-orders/orders:
 *   get:
 *     tags: [Community]
 *     summary: Get community event orders orders
 *     operationId: getcommunity_event_orders_orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-twibbons/list/{communityId}:
 *   get:
 *     tags: [Community]
 *     summary: Get community twibbons list
 *     operationId: getcommunity_twibbons_list_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-twibbons/create/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Create community twibbons create
 *     operationId: postcommunity_twibbons_create_communityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-twibbons/update/{twibbonId}:
 *   put:
 *     tags: [Community]
 *     summary: Update community twibbons update
 *     operationId: putcommunity_twibbons_update_twibbonId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: twibbonId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-twibbons/delete/{twibbonId}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community twibbons delete
 *     operationId: deletecommunity_twibbons_delete_twibbonId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: twibbonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /community-attendances/events/{eventId}/check-in:
 *   post:
 *     tags: [Community]
 *     summary: Create community attendances events check in
 *     operationId: postcommunity_attendances_events_eventId_check_in
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /comments/list/{entityType}/{entityId}:
 *   get:
 *     tags: [Community]
 *     summary: Get comments list
 *     operationId: getcomments_list_entityType_entityId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /comments/create:
 *   post:
 *     tags: [Community]
 *     summary: Create comments create
 *     operationId: postcomments_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /comments/like/{commentId}:
 *   post:
 *     tags: [Community]
 *     summary: Create comments like
 *     operationId: postcomments_like_commentId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /comments/report/{commentId}:
 *   post:
 *     tags: [Community]
 *     summary: Create comments report
 *     operationId: postcomments_report_commentId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /comments/delete/{commentId}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete comments delete
 *     operationId: deletecomments_delete_commentId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /finance/owner/dashboard/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get finance owner dashboard
 *     operationId: getfinance_owner_dashboard_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /finance/owner/summary/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get finance owner summary
 *     operationId: getfinance_owner_summary_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /finance/owner/transactions/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get finance owner transactions
 *     operationId: getfinance_owner_transactions_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /finance/owner/withdrawals/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get finance owner withdrawals
 *     operationId: getfinance_owner_withdrawals_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /account/ensure:
 *   post:
 *     tags: [Finance]
 *     summary: Create account ensure
 *     operationId: postaccount_ensure
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /account/{type}/{id}:
 *   get:
 *     tags: [Finance]
 *     summary: Get account
 *     operationId: getaccount_type_id
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/account/{accountId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger account
 *     operationId: getledger_account_accountId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/account/{accountId}/balance:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger account balance
 *     operationId: getledger_account_accountId_balance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/balance:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger balance
 *     operationId: getledger_balance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/user-transactions:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger user transactions
 *     operationId: getledger_user_transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/venue-transactions/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger venue transactions
 *     operationId: getledger_venue_transactions_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/community-event-transactions/{communityEventId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger community event transactions
 *     operationId: getledger_community_event_transactions_communityEventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityEventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/event-transactions/{eventId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger event transactions
 *     operationId: getledger_event_transactions_eventId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/courier-transactions/{courierId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger courier transactions
 *     operationId: getledger_courier_transactions_courierId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courierId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /ledger/all-transactions:
 *   get:
 *     tags: [Finance]
 *     summary: Get ledger all transactions
 *     operationId: getledger_all_transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /user-balance/balance/user/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get user balance balance user
 *     operationId: getuser_balance_balance_user_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/request/{accountId}:
 *   post:
 *     tags: [Finance]
 *     summary: Create withdraw request
 *     operationId: postwithdraw_request_accountId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/by-account/{accountId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get withdraw by account
 *     operationId: getwithdraw_by_account_accountId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/venue/{venueId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get withdraw venue
 *     operationId: getwithdraw_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/:
 *   get:
 *     tags: [Finance]
 *     summary: Get withdraw
 *     operationId: getwithdraw_
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/{id}/approve:
 *   post:
 *     tags: [Finance]
 *     summary: Create withdraw approve
 *     operationId: postwithdraw_id_approve
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/{id}/processing:
 *   post:
 *     tags: [Finance]
 *     summary: Create withdraw processing
 *     operationId: postwithdraw_id_processing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/{id}/paid:
 *   post:
 *     tags: [Finance]
 *     summary: Create withdraw paid
 *     operationId: postwithdraw_id_paid
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /withdraw/{id}/reject:
 *   post:
 *     tags: [Finance]
 *     summary: Create withdraw reject
 *     operationId: postwithdraw_id_reject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /points/point/user/{userId}:
 *   get:
 *     tags: [Finance]
 *     summary: Get points point user
 *     operationId: getpoints_point_user_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /devices/register:
 *   post:
 *     tags: [Platform]
 *     summary: Create devices register
 *     operationId: postdevices_register
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /devices/get/byUser/{userId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get devices get byUser
 *     operationId: getdevices_get_byUser_userId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /locations/track:
 *   post:
 *     tags: [Platform]
 *     summary: Create locations track
 *     operationId: postlocations_track
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /locations/user/{userId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get locations user
 *     operationId: getlocations_user_userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/notification/user:
 *   post:
 *     tags: [Platform]
 *     summary: Create notifications notification user
 *     operationId: postnotifications_notification_user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/notification:
 *   get:
 *     tags: [Platform]
 *     summary: Get notifications notification
 *     operationId: getnotifications_notification
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/by-recipient/{recipientId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get notifications by recipient
 *     operationId: getnotifications_by_recipient_recipientId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/notification/venue/{venueId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get notifications notification venue
 *     operationId: getnotifications_notification_venue_venueId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/read/{recipientId}:
 *   put:
 *     tags: [Platform]
 *     summary: Update notifications read
 *     operationId: putnotifications_read_recipientId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /notifications/unread/{recipientId}:
 *   put:
 *     tags: [Platform]
 *     summary: Update notifications unread
 *     operationId: putnotifications_unread_recipientId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/create-news:
 *   post:
 *     tags: [Platform]
 *     summary: Create news create news
 *     operationId: postnews_create_news
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/create-comment:
 *   post:
 *     tags: [Platform]
 *     summary: Create news create comment
 *     operationId: postnews_create_comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/create-impression/{newsId}:
 *   post:
 *     tags: [Platform]
 *     summary: Create news create impression
 *     operationId: postnews_create_impression_newsId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/all-news:
 *   get:
 *     tags: [Platform]
 *     summary: Get news all news
 *     operationId: getnews_all_news
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/all-comments/{newsId}:
 *   get:
 *     tags: [Platform]
 *     summary: Get news all comments
 *     operationId: getnews_all_comments_newsId
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /news/detail-news/{id}:
 *   get:
 *     tags: [Platform]
 *     summary: Get news detail news
 *     operationId: getnews_detail_news_id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/pending:
 *   get:
 *     tags: [Platform]
 *     summary: Get invitations pending
 *     operationId: getinvitations_pending
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/venue/create-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations venue create invitation
 *     operationId: postinvitations_venue_create_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/event/create-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations event create invitation
 *     operationId: postinvitations_event_create_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/community/create-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations community create invitation
 *     operationId: postinvitations_community_create_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/venue/claim-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations venue claim invitation
 *     operationId: postinvitations_venue_claim_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/event/claim-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations event claim invitation
 *     operationId: postinvitations_event_claim_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /invitations/community/claim-invitation:
 *   post:
 *     tags: [Platform]
 *     summary: Create invitations community claim invitation
 *     operationId: postinvitations_community_claim_invitation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /tasks/create:
 *   post:
 *     tags: [Platform]
 *     summary: Create tasks create
 *     operationId: posttasks_create
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /tasks/generate/{taskId}/qr:
 *   post:
 *     tags: [Platform]
 *     summary: Create tasks generate qr
 *     operationId: posttasks_generate_taskId_qr
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /tasks/verify:
 *   post:
 *     tags: [Platform]
 *     summary: Create tasks verify
 *     operationId: posttasks_verify
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /tasks/list-tasks:
 *   get:
 *     tags: [Platform]
 *     summary: Get tasks list tasks
 *     operationId: gettasks_list_tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 * /tasks/all/list-tasks:
 *   get:
 *     tags: [Platform]
 *     summary: Get tasks all list tasks
 *     operationId: gettasks_all_list_tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 *
 */

export {};
