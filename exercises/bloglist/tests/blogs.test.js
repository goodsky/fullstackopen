/* eslint-disable no-console */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');

const request = supertest(app);

beforeEach(async () => {
  await helper.loadInitialBlogs();
});

describe('when reading the initial blogs', () => {
  test('blogs are returned as json', async () => {
    await request
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of blogs are returned', async () => {
    const response = await request
      .get('/api/blogs')
      .expect(200);

    const blogs = response.body;
    expect(blogs).toHaveLength(helper.intitialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await request
      .get('/api/blogs')
      .expect(200);

    const blogs = response.body.map((blog) => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }));

    expect(blogs).toContainEqual(helper.intitialBlogs[0]);
  });

  test('blogs contain an id property', async () => {
    const response = await request
      .get('/api/blogs')
      .expect(200);
    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe('when reading a specific blog', () => {
  test('blog is returned as json', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const response = await request
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const receivedBlog = response.body;
    expect(receivedBlog.id).toBeDefined();
    expect(receivedBlog.user).toBeDefined();
  });
});

describe('when posting a new blog', () => {
  test('increases the number of blogs by 1', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    };

    await request
      .post('/api/blogs/')
      .set('Authorization', await helper.authHeaderForUser())
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
    };

    const newBlogResponse = await request
      .post('/api/blogs')
      .set('Authorization', await helper.authHeaderForUser())
      .send(newBlog)
      .expect(201);

    const newBlogObject = newBlogResponse.body;

    const response = await request.get('/api/blogs');
    const blogs = response.body.map((blog) => ({
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
      id: blog.id,
      user: blog.user.id,
    }));
    expect(blogs).toContainEqual(newBlogObject);
  });

  test('if missing token then return unauthorized (401)', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    };

    await request
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });

  test('if token for invalid user then return bad request', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    };

    const invalidUser = {
      id: 'foo',
      username: 'bar',
    };

    await request
      .post('/api/blogs')
      .set('Authorization', await helper.authHeaderForUser(invalidUser))
      .send(newBlog)
      .expect(400);
  });

  test('if invalid token then return return unauthorized (401)', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
    };

    await request
      .post('/api/blogs')
      .set('Authorization', 'Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZ')
      .send(newBlog)
      .expect(401);
  });

  test('if request is missing title and url property it returns bad request', async () => {
    const newBlog = {
      author: 'Anon',
    };

    await request
      .post('/api/blogs')
      .set('Authorization', await helper.authHeaderForUser())
      .send(newBlog)
      .expect(400);
  });

  test('extra properties are ignored', async () => {
    const newBlog = {
      title: 'Fixing Performance Regressions Before they Happen',
      author: 'Angus Croll',
      url: 'https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe',
      likes: 1337,
      foo: 'bar',
    };

    const newBlogResponse = await request
      .post('/api/blogs')
      .set('Authorization', await helper.authHeaderForUser())
      .send(newBlog);

    const newBlogObject = newBlogResponse.body;

    const response = await request.get('/api/blogs');
    const blogs = response.body;
    const updatedBlog = blogs.find((x) => x.id === newBlogObject.id);
    expect(updatedBlog.likes).toEqual(0);
    expect(updatedBlog.foo).not.toBeDefined();
  });
});

describe('when updating a blog', () => {
  test('if owner, then all properties are updated', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    const updatedBlogResponse = await request
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .send(updatedBlog)
      .expect(200);

    expect(updatedBlogResponse.body).toEqual({
      ...updatedBlog,
      id: blog.id.toString(),
      user: blog.user.toString(),
    });

    const allBlogs2 = await helper.blogsInDb();
    expect(allBlogs2).not.toContainEqual(blog);
    expect(allBlogs2).toContainEqual({ ...updatedBlog, id: blog.id, user: blog.user });
  });

  test('if owner, just likes can be updated', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const updatedLikeCount = blog.likes + 1;
    const updatedBlog = { likes: updatedLikeCount };

    await request
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .send(updatedBlog)
      .expect(200);

    const allBlogs2 = await helper.blogsInDb();
    const blog2 = allBlogs2.find((x) => x.id.toString() === blog.id.toString());
    expect(blog2.likes).toBe(updatedLikeCount);
  });

  test('if not owner, then returns not authorized (401)', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    const users = await helper.usersInDb();
    const nonOwner = users[1]; // second user is not the owner

    await request
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser(nonOwner))
      .send(updatedBlog)
      .expect(401);
  });

  test('if no token is supplied, then returns not authorized (401)', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    await request
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(401);
  });

  test('an empty body returns a 400 status code', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    await request
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .send({})
      .expect(400);
  });

  test('a non-existant id returns a 404 status code', async () => {
    const missingId = await helper.nonExistingId();
    const updatedBlog = {
      title: 'New Title',
      author: 'New Author',
      url: 'New Url',
      likes: 1337,
    };

    await request
      .put(`/api/blogs/${missingId}`)
      .set('Authorization', await helper.authHeaderForUser())
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
      .set('Authorization', await helper.authHeaderForUser())
      .send(updatedBlog)
      .expect(404);
  });

  test('extra properties are ignored', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const updatedLikeCount = blog.likes + 1;
    const updatedBlog = { likes: updatedLikeCount, foo: 'bar' };

    await request
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .send(updatedBlog)
      .expect(200);

    const allBlogs2 = await helper.blogsInDb();
    const blog2 = allBlogs2.find((x) => x.id.toString() === blog.id.toString());
    expect(blog2.likes).toBe(updatedLikeCount);
    expect(blog2.foo).not.toBeDefined();
  });
});

describe('when liking a blob', () => {
  test('the likes go up by 1', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    await request
      .post(`/api/blogs/${blog.id}/likes`)
      .expect(204);

    const allBlogs2 = await helper.blogsInDb();
    const likedBlog = allBlogs2.find((blog2) => blog.id.toString() === blog2.id.toString());
    expect(likedBlog.likes).toBe(blog.likes + 1);
  });

  test('a non-existant id returns a 404 status code', async () => {
    const missingId = await helper.nonExistingId();

    await request
      .post(`/api/blogs/${missingId}/likes`)
      .expect(404);
  });

  test('an invalid id returns a 404 status code', async () => {
    await request
      .put('/api/blogs/0/likes')
      .expect(404);
  });
});

describe('when deleting an existing blog', () => {
  test('if owner, the number of blogs goes down by 1', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    await request
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .expect(204);

    const allBlogs2 = await helper.blogsInDb();

    expect(allBlogs2).toHaveLength(allBlogs.length - 1);
  });

  test('if owner, the blog is removed from the list', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    await request
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser())
      .expect(204);

    const allBlogs2 = await helper.blogsInDb();

    expect(allBlogs2).not.toContainEqual(blog);
  });

  test('if not owner, returns not authorized (401)', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[1];

    const users = await helper.usersInDb();
    const nonOwner = users[1]; // second user is not the owner

    await request
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', await helper.authHeaderForUser(nonOwner))
      .expect(401);
  });

  test('if no token, returns not authorized (401)', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = allBlogs[0];

    await request
      .delete(`/api/blogs/${blog.id}`)
      .expect(401);
  });

  test('an invalid id returns a 404 status code', async () => {
    await request
      .delete('/api/blogs/0')
      .set('Authorization', await helper.authHeaderForUser())
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
