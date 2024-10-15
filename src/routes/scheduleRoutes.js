const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Schedules
 *     description: Schedule management
 *   - name: Activities
 *     description: Activity management
 */

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create an empty schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Schedule information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Unique name of the schedule
 *               imageUrl:
 *                 type: string
 *                 description: URL of the building image
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Invalid input
 */
router.post('/', scheduleController.createSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Get a schedule with its activities
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleWithActivities'
 *       404:
 *         description: Schedule not found
 */
router.get('/:id', scheduleController.getScheduleWithActivities);

/**
 * @swagger
 * /api/schedules/{scheduleId}/activities:
 *   post:
 *     summary: Add an activity to a schedule
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Schedule ID to which the activity will be added
 *     requestBody:
 *       description: Activity information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the activity
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the activity
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the activity
 *     responses:
 *       201:
 *         description: Activity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Schedule not found
 */
router.post('/:scheduleId/activities', activityController.addActivity);

/**
 * @swagger
 * /api/schedules/{scheduleId}/activities/bulk:
 *   post:
 *     summary: Add multiple activities to a schedule
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Schedule ID to which the activities will be added
 *     requestBody:
 *       description: List of activities
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activities
 *             properties:
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - startDate
 *                     - endDate
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the activity
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       description: Start date of the activity
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       description: End date of the activity
 *     responses:
 *       201:
 *         description: Activities added successfully
 *       404:
 *         description: Schedule not found
 */
router.post('/:scheduleId/activities/bulk', activityController.addMultipleActivities);

module.exports = router;
