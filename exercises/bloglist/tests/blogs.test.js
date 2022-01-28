/* eslint-disable no-console */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');

const request = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.intitialBlogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

test('blogs are returned as json', async () => {
  await request
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct number of blogs are returned', async () => {
  const response = await request.get('/api/blogs');
  const blogs = response.body;
  expect(blogs).toHaveLength(helper.intitialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await request.get('/api/blogs');

  // eslint-disable-next-line no-param-reassign
  const blogs = response.body.map((blog) => { delete blog.id; return blog; });
  expect(blogs).toContainEqual(helper.intitialBlogs[0]);
});

test('blogs contain an id property', async () => {
  const response = await request.get('/api/blogs');
  const firstBlog = response.body[0];
  expect(firstBlog.id).toBeDefined();
});

test('posting a blog increases the number of blogs by 1', async () => {
  const newBlog = {
    title: 'Fixing Performance Regressions Before they Happen',
    author: 'Angus Croll',
    url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    likes: 505,
  };

  await request
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await request.get('/api/blogs');
  const blogs = response.body;
  expect(blogs).toHaveLength(helper.intitialBlogs.length + 1);
});

test('posting a blog add the new blog to the collection', async () => {
  const newBlog = {
    title: 'Fixing Performance Regressions Before they Happen',
    author: 'Angus Croll',
    url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    likes: 505,
  };

  const newBlogResponse = await request
    .post('/api/blogs')
    .send(newBlog);

  const newBlogObject = newBlogResponse.body;

  const response = await request.get('/api/blogs');
  const blogs = response.body;
  expect(blogs).toContainEqual(newBlogObject);
});

test('request is missing likes property, defaults to 0', async () => {
  const newBlog = {
    title: 'Why Discord is Switching from Go to Rust',
    author: 'Jesse Howarth',
    url: 'https://discord.com/blog/why-discord-is-switching-from-go-to-rust',
  };

  const newBlogResponse = await request
    .post('/api/blogs')
    .send(newBlog);

  const newBlogObject = newBlogResponse.body;

  expect(newBlogObject.likes).toBe(0);
});

test('request is missing title and url property, returns bad request', async () => {
  const newBlog = {
    author: 'Anon',
  };

  await request
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(async () => {
  mongoose.connection.close();
});
