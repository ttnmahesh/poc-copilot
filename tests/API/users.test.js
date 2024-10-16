const { test, expect } = require('@playwright/test');
const httpClient = require('../utils/httpClient');

test.describe('Users API', () => {
    test('GET /users should return a list of users', async () => {
        const response = await httpClient.get('/users?page=2');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('data');
        expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('POST /users should create a new user', async () => {
        const newUser = {
            name: 'John Doe',
            job: 'Software Developer'
        };
        const response = await httpClient.post('/users', newUser);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('name', 'John Doe');
        expect(response.data).toHaveProperty('job', 'Software Developer');
    });

    test('GET /users/:id should return a single user', async () => {
        const response = await httpClient.get('/users/2');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('id', 2);
    });

    test('PUT /users/:id should update a user', async () => {
        const updatedUser = {
            name: 'Jane Doe',
            job: 'Product Manager'
        };
        const response = await httpClient.put('/users/2', updatedUser);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('name', 'Jane Doe');
        expect(response.data).toHaveProperty('job', 'Product Manager');
    });

    test('DELETE /users/:id should delete a user', async () => {
        const response = await httpClient.delete('/users/2');
        expect(response.status).toBe(204);
    });
});