const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Schedule = sequelize.define('Schedule', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relationships
Schedule.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Schedule, { foreignKey: 'userId' });

module.exports = Schedule;
