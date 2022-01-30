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

describe('when reading the initial blogs', () => {
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
});

describe('when posting a new blog', () => {
  test('increases the number of blogs by 1', async () => {
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

  test('adds the new blog to the collection', async () => {
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

  test('if request is missing likes property it defaults to 0', async () => {
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

  test('if request is missing title and url property it returns bad request', async () => {
    const newBlog = {
      author: 'Anon',
    };

    await request
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

  test('extra properties are ignored', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
      likes: 505,
      foo: 'bar',
    };

    const newBlogResponse = await request
      .post('/api/blogs')
      .send(newBlog);

    const newBlogObject = newBlogResponse.body;

    const response = await request.get('/api/blogs');
    const blogs = response.body;
    const updatedBlog = blogs.find((x) => x.id === newBlogObject.id);
    expect(updatedBlog.foo).not.toBeDefined();
  });
});

describe('when updating a blog', () => {
  test('all properties are updated', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    const updatedBlogResponse = await request
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog);

    expect(updatedBlogResponse.body).toEqual({ ...updatedBlog, id: blog.id.toString() });

    const allBlogs2 = await helper.blogsInDb();
    expect(allBlogs2).not.toContainEqual(blog);
    expect(allBlogs2).toContainEqual({ ...updatedBlog, id: blog.id });
  });

  test('with just likes are updated', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    const updatedLikeCount = blog.likes + 1;
    const updatedBlog = { likes: updatedLikeCount };

    await request
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200);

    const allBlogs2 = await helper.blogsInDb();
    const blog2 = allBlogs2.find((x) => x.id.toString() === blog.id.toString());
    expect(blog2.likes).toBe(updatedLikeCount);
  });

  test('an empty body returns a 400 status code', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    await request
      .put(`/api/blogs/${blog.id}`)
      .send({})
      .expect(400);
  });

  test('a missing id returns a 404 status code', async () => {
    const missingId = await helper.nonExistingBlogId();
    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    await request
      .put(`/api/blogs/${missingId}`)
      .send(updatedBlog)
      .expect(404);
  });

  test('an invalid id returns a 404 status code', async () => {
    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    await request
      .put('/api/blogs/0')
      .send(updatedBlog)
      .expect(404);
  });

  test('extra properties are ignored', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    const updatedLikeCount = blog.likes + 1;
    const updatedBlog = { likes: updatedLikeCount, foo: 'bar' };

    await request
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200);

    const allBlogs2 = await helper.blogsInDb();
    const blog2 = allBlogs2.find((x) => x.id.toString() === blog.id.toString());
    expect(blog2.likes).toBe(updatedLikeCount);
    expect(blog2.foo).not.toBeDefined();
  });
});

describe('when deleting an existing blog', () => {
  test('the number of blogs goes down by 1', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    await request
      .delete(`/api/blogs/${blog.id}`)
      .expect(204);

    const allBlogs2 = await helper.blogsInDb();

    expect(allBlogs2).toHaveLength(allBlogs.length - 1);
  });

  test('the blog is removed from the list', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    await request
      .delete(`/api/blogs/${blog.id}`)
      .expect(204);

    const allBlogs2 = await helper.blogsInDb();

    expect(allBlogs2).not.toContainEqual(blog);
  });

  test('an invalid id returns a 400 status code', async () => {
    await request
      .delete('/api/blogs/0')
      .expect(400);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
