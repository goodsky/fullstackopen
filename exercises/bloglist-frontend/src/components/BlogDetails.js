import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { incrementLikes, addComment, deleteBlog } from '../reducers/blogs'

const BlogCommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography>
          <i>This blog has no comments!</i>
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment._id}>
              <TableCell>{comment.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const { loggedInUser } = useSelector((state) => state.login)

  const [comment, setComment] = useState('')

  if (!blog) {
    return (
      <Box>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h2">Uh oh! Blog not found.</Typography>
        </Paper>
        <Button href="/">Go Home</Button>
      </Box>
    )
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h3">{blog.title}</Typography>
      <Typography variant="subtitle1">added by {blog.user.name}</Typography>
      <a href={blog.url} target="_blank" rel="noreferrer noopener">
        <Typography>{blog.url}</Typography>
      </a>
      <Typography>{blog.likes} likes</Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ m: 2 }}
        onClick={() => dispatch(incrementLikes(blog))}
      >
        like
      </Button>
      {blog.user.username === loggedInUser.username ? (
        <Button
          variant="outlined"
          color="error"
          sx={{ m: 2 }}
          onClick={() => dispatch(deleteBlog(blog))}
        >
          delete
        </Button>
      ) : null}

      <Typography sx={{ mt: 4 }} variant="h4">
        comments
      </Typography>
      <Stack component="form" onSubmit={handleAddComment}>
        <TextField
          label="Comment"
          multiline
          rows={5}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          variant="filled"
        />
        <Button type="submit">add comment</Button>
      </Stack>
      <BlogCommentList comments={blog.comments} />
    </Paper>
  )
}

export default BlogDetails
