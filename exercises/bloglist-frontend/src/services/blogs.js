import axios from 'axios'
const baseUrl = '/api/blogs'

let blogsToken = null

const addBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: blogsToken,
    },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: blogsToken,
    },
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response.data
}

const incrementLikes = async (blog) => {
  const config = {
    headers: {
      Authorization: blogsToken,
    },
  }

  await axios.post(`${baseUrl}/${blog.id}/likes`, null, config)
}

const setToken = (token) => {
  blogsToken = `Bearer ${token}`
}

export default {
  addBlog,
  deleteBlog,
  getAll,
  getBlog,
  incrementLikes,
  setToken,
}
