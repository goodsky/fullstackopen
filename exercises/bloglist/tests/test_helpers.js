const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialUsers = [
  {
    username: 'admin',
    password: 'iamas3cr3tvalue',
    name: 'Alice Administrator',
  },
  {
    username: 'lurker',
    password: 'iamas3cr3tvalue',
  },
];

const loadInitialUsers = async () => {
  await User.deleteMany({});
  const userModels = await Promise.all(
    initialUsers.map(async (user) => {
      const userPwHash = await bcrypt.hash(user.password, 10);
      return new User({
        username: user.username,
        passwordHash: userPwHash,
        name: user.name,
      });
    }),
  );
  const promises = userModels.map((user) => user.save());
  await Promise.all(promises);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const intitialBlogs = [
  {
    title: 'A Cherry Picker\'s Guide to Doctor Who',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/articles/doctor-who.html',
    likes: 7,
  },
  {
    title: 'JavaScript and TypeScript Projects with React, Angular, or Vue in Visual Studio 2022 with or without .NET',
    author: 'Scott Hanselman',
    url: 'https://www.hanselman.com/blog/javascript-and-typescript-projects-with-react-angular-or-vue-in-visual-studio-2022-with-or-without-net',
    likes: 3,
  },
  {
    title: 'The MainWindowHandle property is just a guess based on heuristics',
    author: 'Raymond Chen',
    url: 'https://devblogs.microsoft.com/oldnewthing/20220124-00/?p=106192',
    likes: 1,
  },
];

const loadInitialBlogs = async () => {
  await loadInitialUsers();
  const users = await usersInDb();
  const user = users[0];

  await Blog.deleteMany({});
  const blogObjects = intitialBlogs.map((blog) => new Blog({ ...blog, user: user.id }));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const user = new User({
    username: 'REMOVE ME',
    passwordHash: 'fakehash',
  });

  const savedUser = await user.save();

  const blog = new Blog({
    title: 'REMOVE ME',
    author: 'testdata',
    url: 'remove:me',
    likes: 0,
    user: savedUser.id,
  });

  await blog.save();
  await blog.remove();
  await user.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

const authHeaderForUser = async (user) => {
  if (!user) {
    const users = await usersInDb();
    // eslint-disable-next-line no-param-reassign
    [user] = users;
  }

  const payload = {
    userId: user.id,
    username: user.username,
    name: user.name,
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  return `Bearer ${token}`;
};

const isValidToken = (token) => {
  try {
    jwt.verify(token, config.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  intitialBlogs,
  initialUsers,
  loadInitialBlogs,
  loadInitialUsers,
  blogsInDb,
  usersInDb,
  nonExistingId,
  authHeaderForUser,
  isValidToken,
};
