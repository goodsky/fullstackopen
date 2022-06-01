import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const createNew = async (formEvent) => {
    formEvent.preventDefault()
    const text = formEvent.target.anecdoteText.value
    formEvent.target.anecdoteText.value = ''
    
    console.log('new anecdote', text)
    const addedAnecdote = await anecdoteService.addAnecdote(text)
    dispatch(addAnecdote(addedAnecdote))
    dispatch(setMessage(`You added '${text}'`))
  }

  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={createNew}>
      <div><input name="anecdoteText"/></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

export default AnecdoteForm