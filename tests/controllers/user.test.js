const dbHandler = require('../db-handler');
const app = require('../../app.js');
const request = require('supertest');
const {createUser} = require('../utils/user-util.js');


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
      //given
      await createUser({userName: "test", password: "1234", superUser: true});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});
      //when
      const res = await request(app)
        .post('/user/register')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({});
      //then
      expect(res.statusCode).toEqual(400);
    });

    it('should return 200 and create user account for superuser only', async () => {
      //given
      await createUser({userName: "test", password: "1234", superUser: true});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/user/register')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({userName: "test1", password: "1234"});
      //then
      expect(res.statusCode).toEqual(200);
    });

    it('should return 401 for create user account if the user is not superuser', async () => {
      //given
      await createUser({userName: "test", password: "1234", superUser: false});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/user/register')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({userName: "test1", password: "1234"});
      //then
      expect(res.statusCode).toEqual(401);
    });

    it('should return 409 if the userName already exist', async () => {
      //given
      await createUser({userName: "test123", password: "1234"});
      await createUser({userName: "test", password: "1234", superUser: true});
      const tokenRes = await request(app).post('/user/authenticate').send({userName: "test", password: "1234"});

      //when
      const res = await request(app)
        .post('/user/register')
        .set('Authorization', 'bearer ' + tokenRes.body.jwtToken)
        .send({userName: "test123", password: "1234"});
      //then
      expect(res.statusCode).toEqual(409);
    });

  });


  describe('Testing user authenticate API', () => {
    it('should return 400 if the request missing username and password while authenticate', async () => {
      //when
      const res = await request(app).post('/user/authenticate').send({});
      //then
      expect(res.statusCode).toEqual(400);
    });

    it('should return 200 and jwt token for correct username and password', async () => {
      //given
      await createUser({userName: "test123", password: "1234"});

      //when
      const res = await request(app).post('/user/authenticate').send({userName: "test123", password: "1234"});
      //then
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("jwtToken");
    });

  });
});
