/* eslint-disable no-console */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await helper.loadInitialUsers();
});

describe('when reading users', () => {
  test('reading users returns the users', async () => {
    const response = await api
      .get('/api/users')
      .send();

    const users = response.body;
    expect(users.length).toEqual(helper.initialUsers.length);
  });
});

describe('when creating new users', () => {
  test('adding a user adds a user to database', async () => {
    const newUser = {
      username: 'newguy',
      password: 'password',
      name: 'Bob Newbie',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const users = await helper.usersInDb();
    expect(users.length).toBe(helper.initialUsers.length + 1);

    const usernames = users.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('adding a user returns the users in response', async () => {
    const newUser = {
      username: 'newguy',
      password: 'password',
      name: 'Bob Newbie',
    };

    const response = await api
      .post('/api/users')
      .send(newUser);

    const responseBody = response.body;
    expect(responseBody.username).toEqual(newUser.username);
    expect(responseBody.name).toEqual(newUser.name);
    expect(responseBody.id).toBeDefined();
  });

  test('adding a user with too-short username returns 400', async () => {
    const invalidUser = {
      username: 'x',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400);
  });

  test('adding a user with no username returns 400', async () => {
    const invalidUser = {
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400);
  });

  test('adding a user with too-short password returns 400', async () => {
    const invalidUser = {
      username: 'newguy',
      password: '1',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400);
  });

  test('adding a user with no password returns 400', async () => {
    const invalidUser = {
      username: 'newguy',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400);
  });

  test('adding a user with existing username returns 400', async () => {
    const invalidUser = {
      username: helper.initialUsers[0].username,
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
