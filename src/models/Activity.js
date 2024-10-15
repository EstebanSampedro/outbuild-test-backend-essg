const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Schedule = require('./Schedule');

const Activity = sequelize.define('Activity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Relationships
Activity.belongsTo(Schedule, { foreignKey: 'scheduleId' });
Schedule.hasMany(Activity, { foreignKey: 'scheduleId' });

module.exports = Activity;
