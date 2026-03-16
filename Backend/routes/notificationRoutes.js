const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification CRUD API
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/notifications',auth, notificationController.getNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification found
 *       404:
 *         description: Notification not found
 */
router.get('/notifications/:id',auth, notificationController.getNotificationById);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: Appointment Reminder
 *               message:
 *                 type: string
 *                 example: Your appointment is scheduled tomorrow
 *               type:
 *                 type: string
 *                 example: info
 *               recipient:
 *                 type: string
 *                 example: Admin
 *               status:
 *                 type: string
 *                 example: unread
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post(
  '/notifications',
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('message')
    .notEmpty().withMessage('Message is required'),
  validate,auth,
  notificationController.createNotification
);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *               recipient:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification updated
 *       404:
 *         description: Notification not found
 */
router.put(
  '/notifications/:id',
  body('title')
    .optional()
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('message')
    .optional()
    .notEmpty().withMessage('Message cannot be empty'),
  validate,auth,
  notificationController.updateNotification
);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 */
router.delete('/notifications/:id',auth, notificationController.deleteNotification);

module.exports = router;