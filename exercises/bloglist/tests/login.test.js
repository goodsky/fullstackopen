/* eslint-disable no-console */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await helper.loadInitialUsers();
});

describe('when logging in', () => {
  test('valid username and password returns token, name and username', async () => {
    const user = helper.initialUsers[0];
    const loginPayload = {
      username: user.username,
      password: user.password,
    };

    const response = await api
      .post('/api/login')
      .send(loginPayload)
      .expect(200);

    const { token, name, username } = response.body;
    expect(helper.isValidToken(token)).toBeTruthy();
    expect(name).toEqual(user.name);
    expect(username).toEqual(user.username);
  });

  test('invalid password returns unauthorized (401)', async () => {
    const user = helper.initialUsers[0];
    const loginPayload = {
      username: user.username,
      password: 'this is not the password',
    };

    await api
      .post('/api/login')
      .send(loginPayload)
      .expect(401);
  });

  test('invalid username returns unauthorized (401)', async () => {
    const user = helper.initialUsers[0];
    const loginPayload = {
      username: 'this is not the username',
      password: user.password,
    };

    await api
      .post('/api/login')
      .send(loginPayload)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
