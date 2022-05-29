import { useSelector, useDispatch } from 'react-redux'
import { incrementVote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(incrementVote(id))
  }

  const createNew = (formEvent) => {
    formEvent.preventDefault()
    const text = formEvent.target.anecdoteText.value
    formEvent.target.anecdoteText.value = ''
    
    console.log('new anecdote', text)
    dispatch(addAnecdote(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="anecdoteText"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App