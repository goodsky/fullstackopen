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

const anecdoteService = { getAll, addAnecdote }
export default anecdoteService
