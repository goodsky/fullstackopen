import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'

import { addBlog } from '../reducers/blogs'

const AddBlog = ({ parentRef }) => {
  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    dispatch(addBlog(newBlog))

    parentRef.current.toggleVisible()
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <Paper sx={{ p: 2 }} elevation={1}>
      <Box component="form" onSubmit={handleAddBlog}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              sx={{ width: '100%' }}
              required
              label="Title"
              value={newBlogTitle}
              onChange={(event) => setNewBlogTitle(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: '100%' }}
              required
              label="Author"
              value={newBlogAuthor}
              onChange={(event) => setNewBlogAuthor(event.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              sx={{ width: '100%' }}
              required
              label="URL"
              value={newBlogUrl}
              onChange={(event) => setNewBlogUrl(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" variant="contained">
          Add
        </Button>
      </Box>
    </Paper>
  )
}

export default AddBlog
