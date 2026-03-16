const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact CRUD API
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts
  *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.get('/contacts',auth, contactController.getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get(
  '/contacts/:id',
  param('id').isInt().withMessage('Contact ID must be integer'),
  validate,auth,
  contactController.getContactById
);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create new contact
 *     tags: [Contacts]
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
 *               - phone
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Priya Mehta
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 example: priya@example.com
 *               subject:
 *                 type: string
 *                 example: Order Issue
 *               message:
 *                 type: string
 *                 example: I did not receive my order.
 *               action:
 *                 type: string
 *                 example: Open
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Validation error
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/contacts',

  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('subject')
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),

  body('message')
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),

  body('action')
    .optional()
    .isIn(['Open', 'Closed'])
    .withMessage('Action must be Open or Closed'),

  validate,auth,
  contactController.createContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update contact
 *     tags: [Contacts]
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               action:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Validation error
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.put(
  '/contacts/:id',
  param('id').isInt().withMessage('Contact ID must be integer'),

  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('phone')
    .optional()
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),

  body('subject')
    .optional()
    .isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),

  body('message')
    .optional()
    .isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),

  body('action')
    .optional()
    .isIn(['Open', 'Closed'])
    .withMessage('Action must be Open or Closed'),

  validate,auth,
  contactController.updateContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/contacts/:id',
  param('id').isInt().withMessage('Contact ID must be integer'),
  validate,auth,
  contactController.deleteContact
);

module.exports = router;
