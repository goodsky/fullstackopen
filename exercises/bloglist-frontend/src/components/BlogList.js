import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

import AddBlog from './AddBlog'
import Toggleable from './Toggleable'
import { incrementLikes, deleteBlog } from '../reducers/blogs'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const blogDetails = (
    <div>
      <br />
      submitted by {blog.user.name}
      <br />
      <a href={blog.url} target="_blank" rel="noreferrer noopener">
        {blog.url}
      </a>
      <br />
      <span>likes {blog.likes}</span>
      <button onClick={() => dispatch(incrementLikes(blog))}>like</button>
      <br />
      <button
        className="blog-deletebutton"
        onClick={() => dispatch(deleteBlog(blog))}
      >
        delete
      </button>
      <br />
    </div>
  )

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        {isExpanded ? blogDetails : null}
      </TableCell>
      <TableCell>
        <i>{blog.author}</i>
      </TableCell>
      <TableCell>
        <button onClick={toggleIsExpanded}>{isExpanded ? '-' : '+'}</button>
      </TableCell>
    </TableRow>
  )
}

const BlogList = ({ blogs }) => {
  const newBlogRef = useRef()

  return (
    <div>
      <Toggleable buttonLabel="add new blog" ref={newBlogRef}>
        <AddBlog parentRef={newBlogRef} />
      </Toggleable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
