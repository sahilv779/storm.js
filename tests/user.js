const request = require('supertest');
const express = require('express');
const dynamicRoutes = require('../routes/dynamicRoutes');

const app = express();
app.use(express.json());
app.use('/api', dynamicRoutes);

describe('User API', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/api/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                name: 'Test User',
                email: 'test.user@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    // Add more tests for other endpoints
});
