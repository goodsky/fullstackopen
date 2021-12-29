import {useState} from 'react';
import './App.css';

import Button from './Button'
import Statistics from './Statistics'

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementFeedback = (value, setter) => () => {
    setter(value + 1);
  };

  return (
    <div className="app">
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={incrementFeedback(good, setGood)} />
      <Button text={'neutral'} handleClick={incrementFeedback(neutral, setNeutral)} />
      <Button text={'bad'} handleClick={incrementFeedback(bad, setBad)} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
