const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const staffController = require('../controllers/staffController');
const validate = require('../middleware/validationMiddleware');

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
 *     responses:
 *       200:
 *         description: List of staff members
 */
router.get('/staff', staffController.getStaff);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff]
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
router.get('/staff/:id', staffController.getStaffById);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create new staff
 *     tags: [Staff]
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
 *               role:
 *                 type: string
 *                 example: Beautician
 *               services:
 *                 type: string
 *                 example: Makeup, Facial
 *               phone:
 *                 type: string
 *                 example: 9988776655
 *               experience:
 *                 type: string
 *                 example: 4 Years
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
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('role')
    .notEmpty().withMessage('Role is required'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  validate,
  staffController.createStaff
);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update staff
 *     tags: [Staff]
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
 *               role:
 *                 type: string
 *               services:
 *                 type: string
 *               phone:
 *                 type: string
 *               experience:
 *                 type: string
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
  body('role')
    .notEmpty().withMessage('Role is required'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  validate,
  staffController.updateStaff
);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete staff
 *     tags: [Staff]
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
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router;