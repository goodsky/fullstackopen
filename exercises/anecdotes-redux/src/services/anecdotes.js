import axios from 'axios'

const serverUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  return await axios.get(serverUrl)
}

const addAnecdote = async (anecdoteText) => {
  const anecdote = {
    content: anecdoteText,
    votes: 0
  }
  const response = await axios.post(serverUrl, anecdote)
  console.log('response', response)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  await axios.put(`${serverUrl}/${anecdote.id}`, anecdote)
}

const anecdoteService = { getAll, addAnecdote, updateAnecdote }
export default anecdoteService
