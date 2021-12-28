import React from 'react'

const Hello = (foo) => (
    <p>Hello {foo.name}, you are {foo.age} years old</p>
  )

const App = () => {
  console.log("Hello from component");

  const name1 = "Peter";
  const age1 = 13;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={age1} age={age1} />
      <Hello name="Daisy" age={17} />
    </>
  );
}

export default App;
