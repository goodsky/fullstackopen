import React, { useState } from 'react'

const Filter = (props) => {
  const { nameFilter, setNameFilter } = props;

  return (
  <div>
    <label htmlFor='filter'>filter names:</label><input id='filter' value={nameFilter} onChange={event => setNameFilter(event.target.value)}/>
  </div>
  );
};

const AddPerson = (props) => {
  const {
    persons, setPersons,
    newName, setNewName,
    newNumber, setNewNumber,
  } = props;

  const handleAdd = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson !== undefined) {
      window.alert(`${newName} is already added to the phonebook`);
      resetForm();
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    console.log('Adding person', newPerson);
    setPersons(persons.concat(newPerson));
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleAdd}>
      <div>
        <label htmlFor='name'>name:</label><input id='name' value={newName} onChange={event => setNewName(event.target.value)}/>
      </div>
      <div>
        <label htmlFor='number'>number:</label><input id='number' value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    </tr>
);

const Phonebook = ({ persons, nameFilter }) => {
  const personsToPrint = nameFilter === '' ?
    persons :
    persons.filter(person => person.name.includes(nameFilter));

  return (
    <table>
      <tbody>
        {personsToPrint.map(person => 
          <Person key={person.name} person={person} />)}
      </tbody>
    </table>
  );
};

function App() {
  const [persons, setPersons] = useState([
    {
      name: 'Skyler Goodell',
      number: '123-4567',
    },
    {
      name: 'Kristin Goodell',
      number: '765-4321',
    },
  ]);

  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber ] = useState('');

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>Add Someone</h2>
      <AddPerson
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Phonebook persons={persons} nameFilter={nameFilter} />
    </div>
  );
}

export default App;
