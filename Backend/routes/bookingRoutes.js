const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking CRUD API
 */


/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Bookings not found
 *       500:
 *         description: Internal server error
 */
router.get('/bookings',auth, bookingController.getBookings);


/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.get('/bookings/:id',auth, bookingController.getBookingById);


/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create booking with optional Razorpay payment
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - service
 *               - date
 *               - time
 *               - amount
 *               - advanceAmount
 *               - paymentMethod
 *             properties:
 *               userName:
 *                 type: string
 *                 example: Aditi
 *               service:
 *                 type: string
 *                 example: Facial
 *               date:
 *                 type: string
 *                 example: 2026-01-20
 *               time:
 *                 type: string
 *                 example: 10:30 AM
 *               amount:
 *                 type: number
 *                 example: 2000
 *               advanceAmount:
 *                 type: number
 *                 example: 500
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, razorpay, upi]
 *                 example: razorpay
 */
router.post(
  '/bookings',

  body('userName')
    .notEmpty().withMessage('Name is required'),

  body('service')
    .notEmpty().withMessage('Service is required'),

  body('date')
    .notEmpty().withMessage('Date is required'),

  body('time')
  .notEmpty().withMessage('Time required'),

  body('amount')
  .isNumeric(),

  body('advanceAmount')
  .isNumeric(),

  body('paymentMethod').notEmpty(),

  validate,auth,
  bookingController.createBooking
);


/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               service:
 *                 type: string
 *               date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/bookings/:id',

  body('name')
    .optional(),

  body('service')
    .optional(),

  body('date')
    .optional(),

  body('status')
    .optional(),

  validate,auth,
  bookingController.updateBooking
);


/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
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
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.delete('/bookings/:id',auth,bookingController.deleteBooking);

module.exports = router;