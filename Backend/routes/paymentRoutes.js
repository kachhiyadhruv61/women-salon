const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const validate = require('../middleware/validationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment CRUD API
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.get('/payments', paymentController.getPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/payments/:id', paymentController.getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *               - userId
 *               - paymentMode
 *               - amount
 *               - status
 *               - date
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: TXN1003
 *               userId:
 *                 type: integer
 *                 example: 1
 *               paymentMode:
 *                 type: string
 *                 example: UPI
 *               amount:
 *                 type: number
 *                 example: 1500
 *               status:
 *                 type: string
 *                 example: Success
 *               date:
 *                 type: string
 *                 example: 2026-02-17
 *     responses:
 *       201:
 *         description: Payment created
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/payments',

  body('transactionId')
    .notEmpty().withMessage('Transaction ID is required'),

  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  body('paymentMode')
    .notEmpty().withMessage('Payment mode is required'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number'),

  body('status')
    .notEmpty().withMessage('Status is required'),

  body('date')
    .notEmpty().withMessage('Date is required'),

  validate,
  paymentController.createPayment
);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update payment
 *     tags: [Payments]
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
 *               transactionId:
 *                 type: string
 *               userId:
 *                 type: integer
 *               paymentMode:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/payments/:id',

  body('transactionId')
    .notEmpty().withMessage('Transaction ID is required'),

  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  body('paymentMode')
    .notEmpty().withMessage('Payment mode is required'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number'),

  body('status')
    .notEmpty().withMessage('Status is required'),

  body('date')
    .notEmpty().withMessage('Date is required'),

  validate,
  paymentController.updatePayment
);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Payment deleted
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
