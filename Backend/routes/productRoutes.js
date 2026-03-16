const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product CRUD API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/products',auth, productController.getProducts);

/**
 * @swagger
 * /products/{id}/{name}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get(
  '/products/:id/:name',
  param('id').isInt().withMessage('Product ID must be integer'),
  validate,auth,
  productController.getProductById
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Aloe Vera Gel
 *               amount:
 *                 type: number
 *                 example: 199
 *               stock:
 *                 type: integer
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: Pure aloe vera soothing gel
 *               status:
 *                 type: string
 *                 example: Available
 *               action:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/products',
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be 0 or more'),

  body('description')
    .optional()
    .isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),

  body('status')
    .optional()
    .isIn(['Available', 'Out of Stock'])
    .withMessage('Status must be Available or Out of Stock'),

  body('action')
    .optional()
    .isIn(['Active', 'Inactive'])
    .withMessage('Action must be Active or Inactive'),

  validate,auth,
  productController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
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
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               action:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/products/:id',
  param('id').isInt().withMessage('Product ID must be integer'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be 0 or more'),

  body('description')
    .optional()
    .isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),

  body('status')
    .optional()
    .isIn(['Available', 'Out of Stock'])
    .withMessage('Status must be Available or Out of Stock'),

  body('action')
    .optional()
    .isIn(['Active', 'Inactive'])
    .withMessage('Action must be Active or Inactive'),

  validate,auth,
  productController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/products/:id',
  param('id').isInt().withMessage('Product ID must be integer'),
  validate,auth,
  productController.deleteProduct
);

module.exports = router;
