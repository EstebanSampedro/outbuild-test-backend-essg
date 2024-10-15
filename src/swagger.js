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
          url: 'http://localhost:3000', // domain
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
          // Endpoints schemas
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
  