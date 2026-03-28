const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const staffController = require('../controllers/staffController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: Staff CRUD API
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members
 */
router.get('/staff',auth, staffController.getStaff);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Staff ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff found
 *       404:
 *         description: Staff not found
 */
router.get('/staff/:id',auth, staffController.getStaffById);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create new staff
 *     tags: [Staff]
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
 *               - role
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Meena Joshi
 *               email:
 *                 type: string
 *                 example: meena@gmail.com
 *               gender:
 *                 type: string
 *                 example: Female
 *               salary:
 *                 type: number
 *                 example: 25000
 *               image:
 *                 type: string
 *                 example: image-url.jpg
 *               services:
 *                 type: string
 *                 example: Makeup, Facial
 *               phone:
 *                 type: string
 *                 example: 9988776655
 *               experience:
 *                 type: string
 *                 example: 4 Years
 *               specialization:
 *                 type: string
 *                 example: Bridal Makeup
 *               date:
 *                 type: string
 *                 example: 2024-06-01
 *               status:
 *                 type: string
 *                 example: Active
 *               action:
 *                 type: string
 *                 example: Available
 *     responses:
 *       201:
 *         description: Staff created
 */
router.post(
  '/staff',
  body('image')
    .optional()
    .isURL().withMessage('Image must be a valid URL'),
  body('email')
    .optional()
    .isEmail().withMessage('Email must be valid'),
  body('gender')
    .optional()
    .isIn(['Female']). withMessage('Gender must be Female'),
  body('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number'),
  body('services')
    .optional()
    .isString().withMessage('Services must be a string'),
  body('experience')
    .optional()
    .isString().withMessage('Experience must be a string'),
  body('specialization')
    .optional()
    .isString().withMessage('Specialization must be a string'),
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  validate,auth,
  staffController.createStaff
);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update staff
 *     tags: [Staff]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               salary:        
 *                type: number
 *               image:
 *                type: string
 *               services:
 *                 type: string
 *               phone:
 *                 type: string
 *               experience:
 *                 type: string
 *               specialization:
 *                type: string
 *               status:
 *                 type: string
 *               action:
 *                 type: string
 *     responses:
 *       200:
 *         description: Staff updated
 *       404:
 *         description: Staff not found
 */
router.put(
  '/staff/:id',
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  validate,auth,
  staffController.updateStaff
);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete staff
 *     tags: [Staff]
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
 *         description: Staff deleted
 *       404:
 *         description: Staff not found
 */
router.delete('/staff/:id',auth,staffController.deleteStaff);

module.exports = router;