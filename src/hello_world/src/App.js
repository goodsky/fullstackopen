import React from 'react'

import Counter from './Counter'
import Hello from './Hello'

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
    </>
  );
}

export default App;
