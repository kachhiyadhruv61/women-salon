const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const bookingpayController = require('../controllers/bookingpayController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Booking Payments
 *   description: Booking Payment CRUD API
 */

/**
 * @swagger
 * /bookingpay:
 *   get:
 *     summary: Get all booking payments
 *     tags: [Booking Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of booking payments
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/bookingpay', auth, bookingpayController.getBookings);

/**
 * @swagger
 * /bookingpay/{id}:
 *   get:
 *     summary: Get booking payment by ID
 *     tags: [Booking Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking payment found
 *       404:
 *         description: Booking payment not found
 */
router.get('/bookingpay/:id', auth, bookingpayController.getBookingById);

/**
 * @swagger
 * /bookingpay:
 *   post:
 *     summary: Create booking payment
 *     tags: [Booking Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: "B123"
 *               amount:
 *                 type: number
 *                 example: 500
 *               paymentMethod:
 *                 type: string
 *                 example: UPI
 *               paymentStatus:
 *                 type: string
 *                 example: paid
 *               userName:
 *                 type: string
 *                 example: Aditi
 *               contact:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       201:
 *         description: Booking payment created
 *       400:
 *         description: Validation error
 */
router.post(
  '/bookingpay',

  body('bookingId')
    .notEmpty().withMessage('Booking ID is required'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number'),

  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required'),

  validate,
  auth,
  bookingpayController.createBooking
);

/**
 * @swagger
 * /bookingpay/{id}:
 *   put:
 *     summary: Update booking payment
 *     tags: [Booking Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Booking payment updated
 *       404:
 *         description: Booking payment not found
 */
router.put(
  '/bookingpay/:id',

  body('amount').optional().isNumeric(),
  body('paymentMethod').optional(),
  body('paymentStatus').optional(),

  validate,
  auth,
  bookingpayController.updateBooking
);

/**
 * @swagger
 * /bookingpay/{id}:
 *   delete:
 *     summary: Delete booking payment
 *     tags: [Booking Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Booking payment deleted
 *       404:
 *         description: Booking payment not found
 */
router.delete('/bookingpay/:id', auth, bookingpayController.deleteBooking);

module.exports = router;