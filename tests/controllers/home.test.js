const dbHandler = require('../db-handler');
const app = require('../../app.js');
const request = require('supertest');
const articleRepository = require('../../app/repositories/article-repository');


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

  it('should return 200 with response contain 1 or more article ', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return 500 if the db operation fails', async () => {
    articleRepository.find = jest.fn().mockRejectedValue(new Error('error'));
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(500);
  })
});
