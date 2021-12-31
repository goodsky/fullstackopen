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

  return (
    <>
      <h1>Greetings</h1>
      <Hello person={person} />

      <h1>App Counter</h1>
      <Counter />

      <h1>Notes</h1>
      <Notes />
    </>
  );
}

export default App;
