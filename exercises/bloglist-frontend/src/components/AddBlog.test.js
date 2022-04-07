import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AddBlog from './AddBlog';

test('Blog is submitted on submit', () => {
  const mockAdd = jest.fn();

  const { container } = render(<AddBlog addBlog={mockAdd} />);

  const titleInput = container.querySelector('#add-blog-title');
  const authorInput = container.querySelector('add-blog-author');
  const urlInput = container.querySelector('#add-blog-url');
  const button = screen.getByText('Add');

  userEvent.type(titleInput, 'This is a Test Title');
  userEvent.type(authorInput, 'Unit Test');
  userEvent.type(urlInput, 'https://this-is-a-unit-test.testing');

  act(() => {
    userEvent.click(button);
  });

  expect(mockAdd.mock.calls.length).toBe(1);

  const addedBlog = mockAdd.mock.calls[0][0];
  expect(addedBlog.title).toBe('This is a Test Title');
});