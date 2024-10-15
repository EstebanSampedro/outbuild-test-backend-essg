require('dotenv').config();
const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middlewares
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Outbuild API',
      version: '1.0.0',
      description: 'API to manage schedules and activities',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
                description: "The user's username",
              },
              password: {
                type: 'string',
                description: "The user's password",
              },
            },
          },
          AuthToken: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'JWT token for authentication',
              },
            },
          },
        Schedule: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            imageUrl: { type: 'string' },
            userId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Activity: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            scheduleId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ScheduleWithActivities: {
          allOf: [
            { $ref: '#/components/schemas/Schedule' },
            {
              type: 'object',
              properties: {
                Activities: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Activity' },
                },
              },
            },
          ],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import Routes
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

// Import Sequelize instance
const sequelize = require('./models/index');

// Synchronize models and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
