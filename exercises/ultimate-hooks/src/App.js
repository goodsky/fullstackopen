import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [
    {
      type,
      value,
      onChange
    },
    reset
  ]
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      return response.data
    } catch (ex) {
      console.log("Resource Error (getAll):", ex)
    }
  }

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
    } catch (ex) {
      console.log("Resource Error (create):", ex)
    }
  }

  const service = {
    create,
    getAll
  }

  useEffect(() => {
    async function loadAll() {
      const initialResource = await service.getAll()
      setResources(initialResource)
    }
    loadAll()
  },
  [])

  return [
    resources, service
  ]
}

const App = () => {
  const [content, resetContent] = useField('text')
  const [name, resetName] = useField('text')
  const [number, resetNumber] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    await noteService.create({ content: content.value })
    resetContent()
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    await personService.create({ name: name.value, number: number.value})
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App