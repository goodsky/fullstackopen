import { createSlice }  from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    concatAnecdote(state, action) {
      const addedAnecdote = action.payload
      return state.concat(addedAnecdote)
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      anecdotes.sort((a, b) => b.votes - a.votes)
      return anecdotes
    }
  }
})

export const { concatAnecdote, setAnecdotes } = anecdoteSlice.actions

export const addAnecdote = (anecdoteText) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdoteService.addAnecdote(anecdoteText)
    dispatch(concatAnecdote(addedAnecdote))
    dispatch(setNotification(`You added '${anecdoteText}'`, 5))
  }
}

export const incrementVote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const existingAnecdote = anecdotes.find(x => x.id === id)
    const updatedAnecdote = { ...existingAnecdote, votes: existingAnecdote.votes + 1 }

    console.log('updating anecdote', updatedAnecdote)
    await anecdoteService.updateAnecdote(updatedAnecdote)

    let updatedAnecdotes = anecdotes.map(x => x.id === id ? updatedAnecdote : x)
    dispatch(setAnecdotes(updatedAnecdotes))
    dispatch(setNotification(`You voted for '${updatedAnecdote.content}'`, 2))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await anecdoteService.getAll()
    const defaultAnecdotes = response.data
    console.log('loaded', defaultAnecdotes.length, 'default anecdotes from thunk')
    dispatch(setAnecdotes(defaultAnecdotes))
  }
}

export default anecdoteSlice.reducer