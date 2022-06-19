const {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
} = require('../utils/list_helpers');

const logger = require('../utils/logger');

// Dummy Function ==========================================================
describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

// Favorite Blog ==========================================================
describe('favorite blog', () => {
  test('no blogs, returns null', () => {
    const blogs = [];

    const result = favoriteBlog(blogs);
    logger.info(result);
    expect(result).toEqual(null);
  });

  test('single blog, returns that blog', () => {
    const blogs = [
      {
        title: 'Foo',
        author: 'Bar',
        url: 'https://localhost',
        likes: 32,
      },
    ];

    const result = favoriteBlog(blogs);
    expect(result).toEqual(blogs[0]);
  });

  test('multiple blogs, returns blog with most likes', () => {
    const blogs = [
      {
        title: 'Least Popular',
        author: 'nobody',
        url: 'https://localhost/1',
        likes: 1,
      },
      {
        title: 'Most Popular',
        author: 'somebody',
        url: 'https://localhost/3',
        likes: 3,
      },
      {
        title: 'Middle Popular',
        author: 'moot',
        url: 'https://localhost/2',
        likes: 2,
      },
    ];

    const result = favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });

  test('multiple blogs with tie, returns any blog with most likes', () => {
    const blogs = [
      {
        title: 'Social Networks',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/bliki/SocialNetworks.html',
        likes: 3,
      },
      {
        title: 'Google Earth is Shiny, but so is Amazon Streets',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/google-earth-is-shiny-but-so-is-amazon-streets',
        likes: 3,
      },
      {
        title: 'How to write like Raymond: The typing-saver',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20220118-00/?p=106174',
        likes: 3,
      },
    ];

    const result = favoriteBlog(blogs);
    const isOneOfBlogs = blogs.includes(result);
    expect(isOneOfBlogs).toEqual(true);
  });
});

// Most Blogs ==========================================================
describe('most blogs', () => {
  test('no blogs, returns null', () => {
    const blogs = [];

    const result = mostBlogs(blogs);
    expect(result).toEqual(null);
  });

  test('single blog, returns that author', () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
    ];

    const result = mostBlogs(blogs);
    expect(result).toEqual({ author: 'Martin Fowler', blogs: 1 });
  });

  test('multiple blogs, returns author with most blogs', () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
      {
        title:
          'JavaScript and TypeScript Projects with React, Angular, or Vue in Visual Studio 2022 with or without .NET',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/javascript-and-typescript-projects-with-react-angular-or-vue-in-visual-studio-2022-with-or-without-net',
        likes: 3,
      },
      {
        title: 'A Proof-of-Concept of BigQuery',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/bigQueryPOC.html',
        likes: 4,
      },
      {
        title: 'AcademicRotation',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/bliki/AcademicRotation.html',
        likes: 2,
      },
      {
        title: 'To Hell with Bad Browsers',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/to-hell-with-bad-browsers',
        likes: 13,
      },
      {
        title:
          'The MainWindowHandle property is just a guess based on heuristics',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20220124-00/?p=106192',
        likes: 1,
      },
    ];

    const result = mostBlogs(blogs);
    expect(result).toEqual({ author: 'Martin Fowler', blogs: 3 });
  });

  test('multiple blogs with tie, returns any author with most blogs', () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
      {
        title:
          'JavaScript and TypeScript Projects with React, Angular, or Vue in Visual Studio 2022 with or without .NET',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/javascript-and-typescript-projects-with-react-angular-or-vue-in-visual-studio-2022-with-or-without-net',
        likes: 3,
      },
      {
        title: 'A Proof-of-Concept of BigQuery',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/bigQueryPOC.html',
        likes: 4,
      },
      {
        title: 'To Hell with Bad Browsers',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/to-hell-with-bad-browsers',
        likes: 13,
      },
      {
        title:
          'The MainWindowHandle property is just a guess based on heuristics',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20220124-00/?p=106192',
        likes: 1,
      },
    ];

    const result = mostBlogs(blogs);
    expect(['Martin Fowler', 'Scott Hanselman']).toContain(result.author);
    expect(result.blogs).toEqual(2);
  });
});

// Most Likes ==========================================================
describe('most likes', () => {
  test('no blogs, returns null', () => {
    const blogs = [];

    const result = mostLikes(blogs);
    expect(result).toBe(null);
  });

  test("single blog, returns that author's likes", () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
    ];

    const result = mostLikes(blogs);
    expect(result).toEqual({ author: 'Martin Fowler', likes: 7 });
  });

  test('multiple blogs, returns author with most likes', () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
      {
        title:
          'JavaScript and TypeScript Projects with React, Angular, or Vue in Visual Studio 2022 with or without .NET',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/javascript-and-typescript-projects-with-react-angular-or-vue-in-visual-studio-2022-with-or-without-net',
        likes: 3,
      },
      {
        title: 'A Proof-of-Concept of BigQuery',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/bigQueryPOC.html',
        likes: 4,
      },
      {
        title: 'AcademicRotation',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/bliki/AcademicRotation.html',
        likes: 2,
      },
      {
        title: 'To Hell with Bad Browsers',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/to-hell-with-bad-browsers',
        likes: 13,
      },
      {
        title:
          'The MainWindowHandle property is just a guess based on heuristics',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20220124-00/?p=106192',
        likes: 1,
      },
    ];

    const result = mostLikes(blogs);
    expect(result).toEqual({ author: 'Scott Hanselman', likes: 16 });
  });

  test('multiple blogs with tie, returns any author with most likes', () => {
    const blogs = [
      {
        title: "A Cherry Picker's Guide to Doctor Who",
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/doctor-who.html',
        likes: 7,
      },
      {
        title:
          'JavaScript and TypeScript Projects with React, Angular, or Vue in Visual Studio 2022 with or without .NET',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/javascript-and-typescript-projects-with-react-angular-or-vue-in-visual-studio-2022-with-or-without-net',
        likes: 3,
      },
      {
        title: 'A Proof-of-Concept of BigQuery',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/bigQueryPOC.html',
        likes: 4,
      },
      {
        title: 'To Hell with Bad Browsers',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/to-hell-with-bad-browsers',
        likes: 13,
      },
      {
        title: '2007 year-end link clearance',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20071231-01/?p=23973',
        likes: 16,
      },
    ];

    const result = mostLikes(blogs);
    expect(['Raymond Chen', 'Scott Hanselman']).toContain(result.author);
    expect(result.likes).toEqual(16);
  });
});

// Total Likes ==========================================================
describe('total likes', () => {
  test('no blogs, equals 0 likes', () => {
    const blogs = [];

    const likes = totalLikes(blogs);
    expect(likes).toBe(0);
  });

  test('single blog, equals the likes of that blog', () => {
    const blogs = [
      {
        title: 'Foo',
        author: 'Bar',
        url: 'https://localhost',
        likes: 32,
      },
    ];

    const likes = totalLikes(blogs);
    expect(likes).toBe(32);
  });

  test('multiple blogs, equals the sum of likes', () => {
    const blogs = [
      {
        title: 'Foo',
        author: 'Bar',
        url: 'https://localhost',
        likes: 1,
      },
      {
        title: 'Foo',
        author: 'Bar',
        url: 'https://localhost',
        likes: 2,
      },
      {
        title: 'Foo',
        author: 'Bar',
        url: 'https://localhost',
        likes: 3,
      },
    ];

    const likes = totalLikes(blogs);
    expect(likes).toBe(6);
  });
});
