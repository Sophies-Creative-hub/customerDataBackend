import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customers API',
      version: '1.0.0',
      description: 'Customers API Dokumentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            firstname: {
              type: 'string',
            },
            lastname: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            address: {
              type: 'object',
              properties: {
                street: {
                  type: 'string',
                },
                zip: {
                  type: 'string',
                },
                city: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export {
  swaggerOptions,
  swaggerDocs,
};
