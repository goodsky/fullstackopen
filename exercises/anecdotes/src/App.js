import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map(x => 0));

  const updateSelection = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    console.log('Next anecdote index...', randomIndex);
    setSelected(randomIndex);
  };

  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const getMostPopularAnecdote = () => {
    let mostPopular = [];

    for (let i = 0; i < votes.length; i++) {
      if (mostPopular.length === 0 ||
        mostPopular[0].votes < votes[i]) {
        // If the current anecdote is more popular
        // then reset the array of anecdotes to contain only this one.
        mostPopular = [{ text: anecdotes[i], votes: votes[i] }];
      }
      else if (mostPopular[0].votes === votes[i]) {
        // If there is a tie for the number of votes,
        // then keep track of all tied anecdotes.
        mostPopular.push({ text: anecdotes[i], votes: votes[i] });
      }
    }

    // Personal decision:
    // If the most popular anecdote has '0' votes then don't return it.
    if (mostPopular.length === 0 ||
        mostPopular[0].votes === 0) {
          return undefined;
    }

    // In the case of a tie, return a random anecdote within the tie.
    const mostPopularIndex = Math.floor(Math.random() * mostPopular.length);
    return mostPopular[mostPopularIndex];
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={{ text: anecdotes[selected], votes: votes[selected] }} />
      <button onClick={incrementVote}>vote</button>
      <button onClick={updateSelection}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <MostPopularAnecdote anecdote={getMostPopularAnecdote()} />
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      {anecdote.text}
      <br />
      <i>This anecdote has {anecdote.votes} votes!</i>
    </div>
  );
};

const MostPopularAnecdote = ({ anecdote }) => {
  if (anecdote === undefined) {
    return (<p><i>No popular anecdotes yet today!</i></p>);
  }

  return (<Anecdote anecdote={anecdote} />)
};

export default App;