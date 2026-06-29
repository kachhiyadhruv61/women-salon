const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const validate = require('../middleware/validationMiddleware');
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service CRUD API
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Services not found
 *       500:
 *         description: Internal server error
 */
router.get('/services', serviceController.getServices);

/**
 * @swagger
 * /services/{id}/{name}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/services/:id/:name', serviceController.getServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create new service
 *     tags: [Services]
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
 *               - duration
 *               - amount
 *               - fishtankStatus
 *               - serviceStatus
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hair Spa
 *               duration:
 *                 type: string
 *                 example: 60 mins
 *               amount:
 *                 type: number
 *                 example: 1200
 *               fishtankStatus:
 *                 type: string
 *                 example: Available
 *               serviceStatus:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Service created
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/services',

  body('name')
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('duration')
    .optional(),

  body('amount')
    .optional()
    .isNumeric().withMessage('Amount must be a number'),

  body('fishtankStatus')
    .optional(),

  body('serviceStatus')
    .optional(),

  validate,auth,
  serviceController.createService
);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Services]
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
 *               duration:
 *                 type: string
 *               amount:
 *                 type: number
 *               fishtankStatus:
 *                 type: string
 *               serviceStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service updated
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/services/:id',

  body('name')
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('duration')
    .optional(),

  body('amount')
    .optional()
    .isNumeric().withMessage('Amount must be a number'),

  body('fishtankStatus')
    .optional(),

  body('serviceStatus')
    .optional(),

  validate,auth,
  serviceController.updateService
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized access
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete('/services/:id',auth, serviceController.deleteService);

router.get('/serviceCategories', auth, serviceController.getServiceCategories);
router.get('/api/serviceCategories', auth, serviceController.getServiceCategories);
router.post('/serviceCategories', auth, serviceController.createServiceCategory);
router.post('/api/serviceCategories', auth, serviceController.createServiceCategory);
router.put('/serviceCategories/:id', auth, serviceController.updateServiceCategory);
router.put('/api/serviceCategories/:id', auth, serviceController.updateServiceCategory);
router.delete('/serviceCategories/:id', auth, serviceController.deleteServiceCategory);
router.delete('/api/serviceCategories/:id', auth, serviceController.deleteServiceCategory);

router.get('/serviceVariants', auth, serviceController.getServiceVariants);
router.get('/api/serviceVariants', auth, serviceController.getServiceVariants);
router.post('/serviceVariants', auth, serviceController.createServiceVariant);
router.post('/api/serviceVariants', auth, serviceController.createServiceVariant);
router.put('/serviceVariants/:id', auth, serviceController.updateServiceVariant);
router.put('/api/serviceVariants/:id', auth, serviceController.updateServiceVariant);
router.delete('/serviceVariants/:id', auth, serviceController.deleteServiceVariant);
router.delete('/api/serviceVariants/:id', auth, serviceController.deleteServiceVariant);

router.get('/servicePackages', auth, serviceController.getServicePackages);
router.get('/api/servicePackages', auth, serviceController.getServicePackages);
router.post('/servicePackages', auth, serviceController.createServicePackage);
router.post('/api/servicePackages', auth, serviceController.createServicePackage);
router.put('/servicePackages/:id', auth, serviceController.updateServicePackage);
router.put('/api/servicePackages/:id', auth, serviceController.updateServicePackage);
router.delete('/servicePackages/:id', auth, serviceController.deleteServicePackage);
router.delete('/api/servicePackages/:id', auth, serviceController.deleteServicePackage);

module.exports = router;
