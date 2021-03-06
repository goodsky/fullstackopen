import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notification'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      const blogs = action.payload
      blogs.sort((b1, b2) => b2.likes - b1.likes)
      return blogs
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      updatedBlogs.sort((b1, b2) => b2.likes - b1.likes)
      return updatedBlogs
    },
  },
})

const { setBlogs, updateBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    dispatch(setBlogs(allBlogs))
    console.log(`Initialized with ${allBlogs.length} blogs`)
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    // const addedBlog = await blogService.addBlog(newBlog)
    // const { blogs } = getState()
    // const updatedBlogs = blogs.concat(addedBlog)

    await blogService.addBlog(newBlog)
    const updatedBlogs = await blogService.getAll()
    dispatch(setNotification(`${newBlog.title} added!`))
    dispatch(setBlogs(updatedBlogs))
    console.log(`Added blog: ${newBlog.title}`)
  }
}

export const incrementLikes = (blog) => {
  return async (dispatch) => {
    await blogService.incrementLikes(blog)
    const updatedBlog = await blogService.getBlog(blog.id)

    dispatch(setNotification(`You voted for '${updatedBlog.title}'!`))
    dispatch(updateBlog(updatedBlog))
    console.log(`Voted for blog: ${updatedBlog.title}`)
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blog, comment)
    const updatedBlog = await blogService.getBlog(blog.id)

    dispatch(setNotification(`You commented on '${updatedBlog.title}'!`))
    dispatch(updateBlog(updatedBlog))
    console.log(`Added comment: ${comment}`)
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    if (!window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      return
    }

    await blogService.deleteBlog(blog)

    const { blogs } = getState()
    const updatedBlogs = blogs.filter(
      (existingBlog) => existingBlog.id !== blog.id
    )

    dispatch(setNotification(`You deleted '${blog.title}'!`))
    dispatch(setBlogs(updatedBlogs))
    console.log(`Deleted blog ${blog.title}`)
  }
}

export default blogsSlice.reducer
