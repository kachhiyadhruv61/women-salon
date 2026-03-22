const express = require('express');
const router = express.Router();

const verifyPaymentController = require('../controllers/verifyPaymentController');

/**
 * @swagger
 * tags:
 *   name: Verify-Payment
 *   description: Payment verification API
 */

/**
 * @swagger
 * /verify-payment:
 *   post:
 *     summary: Verify payment
 *     tags: [Verify-Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           example:
 *             razorpay_order_id: order_123456
 *             razorpay_payment_id: pay_123456
 *             razorpay_signature: abcdef123456
 *     responses:
 *       200:
 *         description: Payment verification result
 */
router.post('/verify-payment', verifyPaymentController.verifyPaymentStatus);

module.exports = router;