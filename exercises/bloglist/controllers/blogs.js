const router = require('express').Router();

const Blog = require('../models/blog');
const logger = require('../utils/logger');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  logger.info('Read blogs', blogs.length);

  response.json(blogs);
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const update = request.body;

  if (!update.title && !update.author && !update.url && !update.likes) {
    response.status(400).json({ error: 'Missing valid properties to update' });
    return;
  }

  // new: true means to return the newly updated object from the promise
  // runValidators: enables schema validation on update
  const updateOptions = { new: true, runValidators: true };
  const updatedBlog = await Blog.findOneAndUpdate(id, update, updateOptions);

  logger.info('updated blog', updatedBlog);

  if (!updatedBlog || updatedBlog.id !== id) {
    response.status(404).send();
  }

  delete updatedBlog.id;
  response.status(200).json(updatedBlog);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndDelete(id);
  response.status(204).send();
});

module.exports = router;
