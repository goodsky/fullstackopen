import React, {useEffect, useState} from 'react'
import './index.css'

const delay = (delayMs) => {
  return new Promise(resolve => setTimeout(resolve, delayMs))
}

const getMessage = async () => {
  await delay(5000)
  return "You got a message!"
}

const App = () => {
  const [message, setMessage] = useState('')
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([]) // default to null to test source map

  useEffect(() => {
    async function getMessageAsync() {
      const newMessage = await getMessage()
      setMessage(newMessage)
    }
    getMessageAsync()
  })

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      <div>{message}</div>
      <div>
        {counter} clicks
        <button onClick={handleClick}>press</button>
      </div>
    </div>
  )
}

export default App