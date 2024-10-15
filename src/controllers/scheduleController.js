const Schedule = require('../models/Schedule');
const Activity = require('../models/Activity');
const logger = require('../utils/logger'); 

exports.createSchedule = async (req, res, next) => {
  try {
    const { name, imageUrl } = req.body;
    const userId = req.user.id;

    const schedule = await Schedule.create({ name, imageUrl, userId });

    // Log information about the created schedule
    logger.info(`Schedule ${schedule.id} created by User ${userId}`, {
      userId: userId,
      scheduleId: schedule.id,
      action: 'createSchedule',
    });

    res.status(201).json({ message: 'Schedule created', data: schedule });
  } catch (error) {
    // Log the error and pass it to the next middleware
    logger.error('Error in createSchedule', {
      error: error.message,
      userId: req.user.id,
      action: 'createSchedule',
    });

    next(error);
  }
};

exports.getScheduleWithActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findOne({
      where: { id, userId: req.user.id },
      include: [Activity],
    });

    if (!schedule) {
      // Log a warning if the schedule is not found
      logger.warn(`Schedule with ID ${id} not found for User ${req.user.id}`, {
        userId: req.user.id,
        scheduleId: id,
        action: 'getScheduleWithActivities',
      });

      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Log information about the retrieved schedule
    logger.info(`Schedule ${id} retrieved by User ${req.user.id}`, {
      userId: req.user.id,
      scheduleId: id,
      action: 'getScheduleWithActivities',
    });

    res.json({ data: schedule });
  } catch (error) {
    // Log the error and pass it to the next middleware
    logger.error('Error in getScheduleWithActivities', {
      error: error.message,
      userId: req.user.id,
      action: 'getScheduleWithActivities',
    });

    next(error);
  }
};
