const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const registerController = require('../controllers/registerController');
const validate = require('../middleware/validationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Registers
 *   description: Register CRUD API
 */


/**
 * @swagger
 * /registers:
 *   get:
 *     summary: Get all registers
 *     tags: [Registers]
 *     responses:
 *       200:
 *         description: List of register records
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Records not found
 *       500:
 *         description: Internal server error
 */
router.get('/registers', registerController.getRegisters);


/**
 * @swagger
 * /registers/{id}:
 *   get:
 *     summary: Get register by ID
 *     tags: [Registers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Register ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Register found
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Register not found
 *       500:
 *         description: Internal server error
 */
router.get('/registers/:id', registerController.getRegisterById);


/**
 * @swagger
 * /registers:
 *   post:
 *     summary: Create new register
 *     tags: [Registers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dipali
 *               username:
 *                 type: string
 *                 example: Dipali004
 *               email:
 *                 type: string
 *                 example: dipali@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: user
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               gender:
 *                 type: string
 *                 example: female
 *               emailOtp:
 *                 type: string
 *                 example: 1234
 *               address:
 *                 type: string
 *                 example: Surat
 *               pincode:
 *                 type: string
 *                 example: 395006
 *     responses:
 *       201:
 *         description: Register created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Register not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/registers',
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Userame must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .optional()
    .isLength({ min: 10 }).withMessage('Phone must be at least 10 digits'),

  validate,
  registerController.createRegister
);


/**
 * @swagger
 * /registers/{id}:
 *   put:
 *     summary: Update register
 *     tags: [Registers]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               emailOtp:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Register updated
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Register not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/registers/:id',
  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('username')
    .optional()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('email')
    .optional()
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validate,
  registerController.updateRegister
);


/**
 * @swagger
 * /registers/{id}:
 *   delete:
 *     summary: Delete register
 *     tags: [Registers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Register deleted
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Register not found
 *       500:
 *         description: Internal server error
 */
router.delete('/registers/:id', registerController.deleteRegister);


module.exports = router;