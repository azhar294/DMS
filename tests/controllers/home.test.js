const dbHandler =  require('../db-handler.js');
const app =  require('../../app.js');
const { expect } = require('@jest/globals');
const request = require('supertest');

describe('Testing home API', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });
    afterEach(async () => {
        await dbHandler.clear();
    });
    afterAll(async () => {
        await dbHandler.close();
        app.close();
    });

    it('should test that true === true', async () => {
        const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveLength(1)
      })
});