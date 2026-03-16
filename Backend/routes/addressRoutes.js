const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();

const addressController = require('../controllers/addressController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address CRUD API
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get('/addresses', auth, addressController.getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Address ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address found
 *       404:
 *         description: Address not found
 */
router.get(
  '/addresses/:id',
  param('id').isInt().withMessage('Address ID must be integer'),
  validate,
  auth,
  addressController.getAddressById
);

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create new address
 *     tags: [Addresses]
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
 *               - mobile
 *               - address
 *               - pincode
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Priya Mehta
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *               address:
 *                 type: string
 *                 example: 12, River View Apartment
 *               pincode:
 *                 type: string
 *                 example: 380009
 *               location:
 *                 type: string
 *                 example: Home
 *     responses:
 *       201:
 *         description: Address created
 *       400:
 *         description: Validation error
 */
router.post(
  '/addresses',

  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('mobile')
    .notEmpty().withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),

  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),

  body('pincode')
    .notEmpty().withMessage('Pincode is required')
    .isLength({ min: 6, max: 6 }).withMessage('Pincode must be 6 digits'),

  body('location')
    .notEmpty().withMessage('Location is required')
    .isIn(['Home', 'Office', 'Other'])
    .withMessage('Location must be Home, Office, or Other'),

  validate,
  auth,
  addressController.createAddress
);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Update address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Address updated
 *       404:
 *         description: Address not found
 *       400:
 *         description: Validation error
 */
router.put(
  '/addresses/:id',

  param('id').isInt().withMessage('Address ID must be integer'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('mobile')
    .optional()
    .isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),

  body('address')
    .optional()
    .isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),

  body('pincode')
    .optional()
    .isLength({ min: 6, max: 6 }).withMessage('Pincode must be 6 digits'),

  body('location')
    .optional()
    .isIn(['Home', 'Office', 'Other'])
    .withMessage('Location must be Home, Office, or Other'),

  validate,
  auth,
  addressController.updateAddress
);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address deleted
 *       404:
 *         description: Address not found
 */
router.delete(
  '/addresses/:id',
  param('id').isInt().withMessage('Address ID must be integer'),
  validate,
  auth,
  addressController.deleteAddress
);

module.exports = router;