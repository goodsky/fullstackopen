const Blog = require('../models/blog');

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

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: 'REMOVE ME',
    author: 'testdata',
    url: 'remove:me',
    likes: 0,
  });

  await blog.save();
  await blog.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  intitialBlogs, nonExistingBlogId, blogsInDb,
};
