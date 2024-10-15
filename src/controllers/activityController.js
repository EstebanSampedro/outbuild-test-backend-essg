const Activity = require('../models/Activity');
const Schedule = require('../models/Schedule');
const logger = require('../utils/logger'); 

exports.addActivity = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const { name, startDate, endDate } = req.body;

    // Verify that the schedule exists and belongs to the authenticated user
    const schedule = await Schedule.findOne({
      where: { id: scheduleId, userId: req.user.id },
    });

    if (!schedule) {
      // Log a warning if the schedule is not found
      logger.warn(`Schedule with ID ${scheduleId} not found for User ${req.user.id}`, {
        userId: req.user.id,
        scheduleId,
        action: 'addActivity',
      });
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Create the activity associated with the schedule
    const activity = await Activity.create({
      name,
      startDate,
      endDate,
      scheduleId,
    });

    // Log information about the created activity
    logger.info(`Activity ${activity.id} added to Schedule ${scheduleId} by User ${req.user.id}`, {
      userId: req.user.id,
      scheduleId,
      activityId: activity.id,
      action: 'addActivity',
    });

    res.status(201).json({ message: 'Activity added', data: activity });
  } catch (error) {
    // Log the error and pass it to the next middleware
    logger.error('Error in addActivity', {
      error: error.message,
      userId: req.user.id,
      action: 'addActivity',
    });

    next(error);
  }
};

exports.addMultipleActivities = async (req, res, next) => {
    try {
      const { scheduleId } = req.params;
      const { activities } = req.body;
  
      // Verify that the schedule exists and belongs to the authenticated user
      const schedule = await Schedule.findOne({
        where: { id: scheduleId, userId: req.user.id },
      });
  
      if (!schedule) {
        // Log a warning if the schedule is not found
        logger.warn(`Schedule with ID ${scheduleId} not found for User ${req.user.id}`, {
          userId: req.user.id,
          scheduleId,
          action: 'addMultipleActivities',
        });
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      // Prepare activities with the scheduleId
      const activitiesWithScheduleId = activities.map((activity) => ({
        ...activity,
        scheduleId,
      }));
  
      // Bulk create activities
      await Activity.bulkCreate(activitiesWithScheduleId);
  
      // Log information about the added activities
      logger.info(`Multiple activities added to Schedule ${scheduleId} by User ${req.user.id}`, {
        userId: req.user.id,
        scheduleId,
        action: 'addMultipleActivities',
      });
  
      res.status(201).json({ message: 'Activities added successfully' });
    } catch (error) {
      // Log the error and pass it to the next middleware
      logger.error('Error in addMultipleActivities', {
        error: error.message,
        userId: req.user.id,
        action: 'addMultipleActivities',
      });
  
      next(error);
    }
  };
  