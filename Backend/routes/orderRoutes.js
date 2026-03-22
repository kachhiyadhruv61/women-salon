const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order CRUD API
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Internal server error
 */
router.get('/orders',auth, orderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get(
  '/orders/:id',
  param('id').isMongoId().withMessage('Invalid Order ID'),
  validate,
  auth,
  orderController.getOrderById
);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *               - paymentStatus
 *               - totalAmount
 *               - orderStatus
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 example: UPI
 *               paymentStatus:
 *                 type: string
 *                 example: Paid
 *               totalAmount:
 *                 type: number
 *                 example: 1500
 *               orderStatus:
 *                 type: string
 *                 example: Confirmed
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/orders',

  body('paymentMethod')
    .notEmpty().withMessage('Payment mode is required'),

  body('paymentStatus')
    .notEmpty().withMessage('Payment status is required'),

  body('totalAmount')
    .notEmpty().withMessage('totalAmount is required')
    .isNumeric().withMessage('totalAmount must be a number'),

  body('orderStatus')
    .notEmpty().withMessage('Order status is required'),

  // 🔥 IMPORTANT FOR STOCK
  body('items')
    .isArray({ min: 1 }).withMessage('Items are required'),


  body('items.*.qty')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),

  validate,
  auth,
  orderController.createOrder
);
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
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
 *               userId:
 *                 type: integer
 *               paymentMethod:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/orders/:id',

  param('id').isMongoId().withMessage('Invalid Order ID'),

  body('userId')
    .notEmpty().withMessage('User ID is required'),

  body('paymentMethod')
    .notEmpty().withMessage('Payment mode is required'),

  body('paymentStatus')
    .notEmpty().withMessage('Payment status is required'),

  body('totalAmount')
    .notEmpty().withMessage('totalAmount is required')
    .isNumeric().withMessage('totalAmount must be a number'),

  body('orderStatus')
    .notEmpty().withMessage('Order status is required'),

  validate,
  auth,
  orderController.updateOrder
);

/**
 * 🟢 USER CANCEL ORDER
 * PUT /orders/cancel/:orderId
 */
router.put(
  '/orders/cancel/:id',
  auth,
  orderController.cancelOrder
);


/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Order deleted
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/orders/:id',
  param('id').isMongoId().withMessage('Invalid Order ID'),
  validate,
  auth,
  orderController.deleteOrder
);

module.exports = router;
