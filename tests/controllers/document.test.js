const dbHandler = require('../db-handler');
const app = require('../../app.js');
const request = require('supertest');
const {createDocument} = require('../utils/document-util');
const {createUser} = require('../utils/user-util');


describe('Testing document related APIs', () => {
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

  describe('Testing document create API', () => {
    it('should return 200 and create document', async () => {
      await createUser({userName: "test", password: "1234"});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/document/create')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({
          name: 'test',
          type: 'Folder'
        });
      //then
      expect(res.statusCode).toEqual(200);
    });

    it('should return 401 if jwt token is missing in header', async () => {
      //when
      const res = await request(app)
        .post('/document/create')
        .send({
          name: 'test',
          type: 'Folder'
        });
      //then
      expect(res.statusCode).toEqual(401);
    });

    it('should return 400 if the request is invalid', async () => {
      //given
      await request(app).post('/user/register').send({userName: "test", password: "1234"});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/document/create')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({
          name: 'test'
        });
      //then
      expect(res.statusCode).toEqual(400);
    });


    it('should return 409 if the file/folder already exist for the user', async () => {
      //given
      const user = await createUser({userName: "test", password: "1234"});
      await createDocument({name: 'test', type: 'Folder', createdBy: user._id});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/document/create')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({
          name: 'test',
          type: 'Folder'
        });
      //then
      expect(res.statusCode).toEqual(409);
    });

    it('should return 400 if the user trying to create nested folder', async () => {
      //given
      const user = await createUser({userName: "test", password: "1234"});
      const document = await createDocument({name: 'test', type: 'Folder', createdBy: user._id});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/document/create')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({
          name: 'test',
          type: 'Folder',
          rootDir: document._id
        });
      //then
      expect(res.statusCode).toEqual(400);
    });

  });

});
