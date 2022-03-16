import axios from 'axios'
const baseUrl = '/api/blogs'

let blogsToken = null;

const addBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: blogsToken,
    }
  };

  await axios.post(baseUrl, blog, config);
};

const incrementLikes = async (blog) => {
  const config = {
    headers: {
      Authorization: blogsToken,
    }
  };

  await axios.post(`${baseUrl}/${blog.id}/likes`, null, config);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async(blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`);
  return response.data;
}

const setToken = (token) => {
  blogsToken = `Bearer ${token}`
};

export default { addBlog, incrementLikes, getAll, getBlog, setToken };