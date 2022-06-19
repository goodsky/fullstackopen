/* eslint-disable max-len */
const router = require('express').Router();

const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');

const getUser = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (ex) {
    logger.info('Exception while fetching user', ex);
    return null;
  }
};

const getBlog = async (blogId) => {
  try {
    return await Blog.findById(blogId);
  } catch (ex) {
    logger.info('Exception while fetching blog', ex);
    return null;
  }
};

const getBlogAndVerifyUserIsOwner = async (blogId, user) => {
  const blog = await getBlog(blogId);
  let userIsOwner = false;

  if (blog && blog.user.toString() === user.userId.toString()) {
    userIsOwner = true;
    logger.info(
      'checking if user is owner',
      blog.user.toString(),
      user.userId.toString(),
      userIsOwner,
    );
  }

  return { blog, userIsOwner };
};

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  logger.info('Read blogs', blogs.length);

  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  const blog = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  logger.info('Read blog', blog.id);

  response.json(blog);
});

router.post('/', async (request, response) => {
  const { body, user } = request;

  if (!user) {
    response.status(401).json({ error: 'invalid user in token' });
    return;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0, // default number of likes
    user: user.userId,
  });

  // Note: there is a race condition between updating blog and user.
  const savedBlog = await blog.save();

  const userDocument = await getUser(user.userId);
  if (userDocument) {
    userDocument.blogs = userDocument.blogs.concat(savedBlog);
    await userDocument.save();
  }

  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body, user } = request;

  if (!user) {
    response.status(401).json({ error: 'invalid user in token' });
    return;
  }

  if (!body.title && !body.author && !body.url && !body.likes) {
    response.status(400).json({ error: 'Missing valid properties to update' });
    return;
  }

  const { blog, userIsOwner } = await getBlogAndVerifyUserIsOwner(id, user);

  if (!blog) {
    response.status(404).send();
    return;
  }

  if (!userIsOwner) {
    response.status(401).json({ error: 'unauthorized' });
    return;
  }

  // new: true means to return the newly updated object from the promise
  // runValidators: enables schema validation on update
  const updateOptions = { new: true, runValidators: true };
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, updateOptions);

  logger.info('updated blog', updatedBlog);
  response.status(200).json(updatedBlog);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { user } = request;

  if (!user) {
    response.status(401).json({ error: 'invalid user in token' });
    return;
  }

  const { blog, userIsOwner } = await getBlogAndVerifyUserIsOwner(id, user);

  if (!blog) {
    response.status(404).send();
    return;
  }

  if (!userIsOwner) {
    response.status(401).json({ error: 'unauthorized' });
    return;
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (deletedBlog) {
    const userDoc = await getUser(deletedBlog.user);
    if (userDoc) {
      const updatedUserBlogs = userDoc.blogs.filter((blogId) => {
        logger.info('blogId', blogId);
        logger.info('equal?', blogId.toString() !== deletedBlog.id.toString());
        return blogId.toString() !== deletedBlog.id.toString();
      });

      if (updatedUserBlogs.length !== userDoc.blogs.length) {
        logger.info('Removing blog from user');
        userDoc.blogs = updatedUserBlogs;
        await userDoc.save();
      } else {
        logger.error('User did not have blog ref!');
      }
    }
  }

  response.status(204).send();
});

router.post('/:id/likes', async (request, response) => {
  const { id } = request.params;

  const blog = await getBlog(id);
  if (!blog) {
    logger.info(`Blog ${id} does not exist`);
    response.status(404).send();
    return;
  }

  blog.likes += 1;
  await blog.save();

  response.status(204).send();
});

router.post('/:id/comments', async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;

  const blog = await getBlog(id);
  if (!blog) {
    logger.info(`Blog ${id} does not exist`);
    response.status(404).send();
    return;
  }

  if (!comment) {
    logger.info('Ignoring empty comment.');
    response.status(400).send();
    return;
  }

  blog.comments.push({
    comment,
  });
  await blog.save();

  response.status(204).send();
});

module.exports = router;
