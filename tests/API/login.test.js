const { test, expect } = require('@playwright/test');
const httpClient = require('../utils/httpClient');

test.describe('Login API', () => {
    test('POST /login should log in a user with valid credentials', async () => {
        const credentials = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        };
        const response = await httpClient.post('/login', credentials);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('token');
    });

    test('POST /login should fail with invalid credentials', async () => {
        const credentials = {
            email: 'copilot.holt@reqres.in',
            password: 'wrongpassword'
        };
        const response = await httpClient.post('/login', credentials).catch(err => err.response);
        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error', 'user not found');
    });

    // test case for generate random unique number
    test('generateUniqueRandomNumbers should return an array of unique random numbers', async () => {
        const utils = require('../utils/utils');
        const min = 1;
        const max = 10;
        const count = 5;
        const result = utils.generateUniqueRandomNumbers(min, max, count);
        expect(result.length).toBe(count);
        expect(new Set(result).size).toBe(count);
    });
});