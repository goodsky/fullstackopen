import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testBlog = {
  title: 'TestTitle',
  author: 'TestAuthor',
  url: 'http://TestUrl',
  likes: 42,
  user: {
    username: 'TestUsername',
    name: 'TestName',
  },
};

test('Renders title, but not author, url, or likes', () => {
  render(<Blog blog={testBlog} />);

  // testing-library/react API:
  //  findBy* -> Promise or else a failed Promise
  //  getBy* -> Element or else an exception is thrown
  //  queryBy* -> Element or else null
  screen.getByText('TestTitle');
  expect(screen.queryByText('by TestAuthor')).toBeNull();
  expect(screen.queryByText('http://TestUrl')).toBeNull();
  expect(screen.queryByText('likes 42')).toBeNull();
});

test('After button click, renders author, url and button clicks', () => {
  render(<Blog blog={testBlog} />);

  const button = screen.getByText('show');
  userEvent.click(button);

  screen.getByText('TestTitle');
  screen.getByText('by TestAuthor');
  screen.getByText('http://TestUrl');
  screen.getByText('likes 42');
});

test('Like button is clicked twice, then callback is invoked twice', () => {
  const mockIncrementLikes = jest.fn();

  render(<Blog blog={testBlog} incrementLikes={mockIncrementLikes} />);

  const showButton = screen.getByText('show');
  userEvent.click(showButton);

  const button = screen.getByText('like');
  userEvent.click(button);
  userEvent.click(button);

  expect(mockIncrementLikes.mock.calls.length).toBe(2);
});