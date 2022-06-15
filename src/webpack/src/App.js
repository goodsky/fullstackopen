import React, {useEffect, useState} from 'react'
import Counter from './Counter'
import FooClassComponent from './FooClassComponent'
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

  useEffect(() => {
    async function getMessageAsync() {
      const newMessage = await getMessage()
      setMessage(newMessage)
    }
    getMessageAsync()
  })

  return (
    <div className="container">
      <div>{message}</div>
      <Counter />
      <FooClassComponent />
    </div>
  )
}

export default App