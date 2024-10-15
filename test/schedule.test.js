const request = require('supertest');
const app = require('../src/index');

describe('Schedule API Tests', () => {
  let token;
  let scheduleId;

  beforeAll(async () => {
    // Register and authenticate a user to obtain a token
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpass' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpass' });

    token = res.body.token;
  });

  test('Create an empty schedule', async () => {
    const res = await request(app)
      .post('/api/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Schedule', imageUrl: 'http://example.com/image.png' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('id');
    scheduleId = res.body.data.id;
  });


});
