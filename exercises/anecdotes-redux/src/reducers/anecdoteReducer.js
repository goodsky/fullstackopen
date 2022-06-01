import { createSlice }  from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const existingAnecdote = state.find(x => x.id === id)
      const updatedAnecdote = { ...existingAnecdote, votes: existingAnecdote.votes + 1 }

      let updatedAnecdotes = state.map(x => x.id === id ? updatedAnecdote : x)
      updatedAnecdotes.sort((a, b) => b.votes - a.votes)
      return updatedAnecdotes
    },
    addAnecdote(state, action) {
      const addedAnecdote = action.payload
      return state.concat(addedAnecdote)
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      return anecdotes
    }
  }
})

export const { incrementVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer