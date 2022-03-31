import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('Renders title, but not author, url, or likes', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'http://TestUrl',
    likes: 42,
    user: {
      username: 'TestUsername',
      name: 'TestName',
    },
  };

  const mockIncrementLikes = jest.fn();
  const mockDeleteBlog = jest.fn();

  render(<Blog blog={blog} incrementLikes={mockIncrementLikes} deleteBlog={mockDeleteBlog} />);

  // testing-library/react API:
  //  findBy* -> Promise or else a failed Promise
  //  getBy* -> Element or else an exception is thrown
  //  queryBy* -> Element or else null

  screen.getByText('TestTitle');
  expect(screen.queryByText('TestAuthor')).toBeNull();
  expect(screen.queryByText('http://TestUrl')).toBeNull();
  expect(screen.queryByText('42')).toBeNull();
});