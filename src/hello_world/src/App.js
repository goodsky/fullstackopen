import React from 'react'

import Counter from './Counter'
import Hello from './Hello'
import Notes from './Notes'

const App = (props) => {
  console.log("Hello from React Application!");

  const person = {
    name: 'Skyler',
    age: 30,
  };

  const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2019-05-30T19:20:14.298Z',
      important: true
    }
  ];

  return (
    <>
      <h1>Greetings</h1>
      <Hello person={person} />

      <h1>App Counter</h1>
      <Counter />

      <h1>Notes</h1>
      <Notes notes={notes} />
    </>
  );
}

export default App;
