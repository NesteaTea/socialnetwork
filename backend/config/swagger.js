import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Social Network API',
            version: '1.0.0',
            description: 'Документация API социальной сети',
        },
        servers: [{ url: 'http://localhost:4000' }],
    },
    apis: ['./routes/*.js'],
};

export default swaggerJsdoc(swaggerOptions);