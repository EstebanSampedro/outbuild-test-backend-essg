const { Sequelize } = require('sequelize');

// Initialize Sequelize with the database connection URL and necessary options
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Specify PostgreSQL as the database
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL for secure connection
      rejectUnauthorized: false,
    },
  },
  logging: false, 
});

module.exports = sequelize; 
