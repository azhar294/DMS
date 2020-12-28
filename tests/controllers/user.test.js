const dbHandler = require('../db-handler');
const app = require('../../app.js');
const request = require('supertest');
const userRepository = require('../../app/repositories/user-repository');


describe('Testing user related APIs', () => {
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

  describe('Testing user register API', () => {
  it('should return 400 if the request missing username and password', async () => {
    //when
    const res = await request(app).post('/user/register').send({});
    //then
    expect(res.statusCode).toEqual(400);
  });

  it('should return 200 and create user account', async () => {
    //when
    const res = await request(app).post('/user/register').send({ userName : "test", password : "1234"});
    //then
    expect(res.statusCode).toEqual(200);
  });

  it('should return 409 if the userName already exist', async () => {
    //given
    await  userRepository.create({userName : "test123", passwordHash : "saew4r4535@4afda"});
    //when
    const res = await request(app).post('/user/register').send({ userName : "test123", password : "1234"});
    //then
    expect(res.statusCode).toEqual(409);
  });

});
});
