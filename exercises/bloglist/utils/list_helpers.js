const lo = require('lodash');
const logger = require('./logger');

const randomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const dummy = (blogs) => {
  logger.info(`Dummy received ${blogs.length} blogs`);
  return 1;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === undefined || blogs.length === 0) {
    return null;
  }

  const maxLikes = blogs.reduce((max, blog) => {
    if (max === undefined || blog.likes > max) {
      return blog.likes;
    }
    return max;
  }, -1);

  const topBlogs = [];
  blogs.forEach((blog) => {
    if (blog.likes === maxLikes) {
      topBlogs.push(blog);
    }
  });

  return randomItem(topBlogs);
};

const mostBlogs = (blogs) => {
  if (blogs.length === undefined || blogs.length === 0) {
    return null;
  }

  const blogsByAuthors = lo.toArray(lo.groupBy(blogs, (blog) => blog.author));
  const authorWithMostBlogs = lo.maxBy(blogsByAuthors, (blogsArray) => blogsArray.length);

  return {
    author: authorWithMostBlogs[0].author,
    blogs: authorWithMostBlogs.length,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === undefined || blogs.length === 0) {
    return null;
  }

  const blogsByAuthors = lo.toArray(lo.groupBy(blogs, (blog) => blog.author));
  // eslint-disable-next-line max-len
  const likesByAuthors = blogsByAuthors.map((bs) => bs.reduce(
    (agg, b) => ({
      author: b.author,
      likes: agg.likes + b.likes,
    }),
    { likes: 0 },
  ));

  return lo.maxBy(likesByAuthors, (o) => o.likes);
};

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return sumOfLikes;
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};
