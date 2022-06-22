import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'

import AddBlog from './AddBlog'
import Toggleable from './Toggleable'
import { incrementLikes, deleteBlog } from '../reducers/blogs'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.login)

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const blogDetails = (
    <Box>
      <i>{blog.user.name}</i>
      <Typography>{blog.likes} likes</Typography>
      <Button color="secondary" onClick={() => dispatch(incrementLikes(blog))}>
        like
      </Button>
      {blog.user.username === loggedInUser.username ? (
        <Button color="error" onClick={() => dispatch(deleteBlog(blog))}>
          delete
        </Button>
      ) : null}
      <br />
    </Box>
  )

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          <Typography>{blog.title}</Typography>
        </Link>
        {isExpanded ? blogDetails : null}
      </TableCell>
      <TableCell>
        <i>{blog.author}</i>
      </TableCell>
      <TableCell>
        <Button onClick={toggleIsExpanded}>{isExpanded ? '-' : '+'}</Button>
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
