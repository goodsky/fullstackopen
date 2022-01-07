import React, { useEffect, useState } from 'react'
import personsService from './services/persons.js'

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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setNewName('');
    setNewNumber('');

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson !== undefined) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Do you want to update the old number with this one?`);
      if (confirmUpdate) {
        personsService
          .update(existingPerson.id, newPerson)
          .then(response => {
            console.log('Updated person in db', response);
            setPersons(persons.map(p => p.id === existingPerson.id ? newPerson : p));
          });
      }
    }
    else {
      personsService
        .create(newPerson)
        .then(response => {
          console.log('Saved person to db', response);
          setPersons(persons.concat(response));
        });
    }
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

const Person = ({ person, deletePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={deletePerson}>delete</button></td>
  </tr>
);

const Phonebook = ({ persons, setPersons, nameFilter }) => {
  const personsToPrint = nameFilter === '' ?
    persons :
    persons.filter(person => person.name.includes(nameFilter));

  const deletePerson = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (!confirmDelete) {
      return;
    }

    personsService
      .remove(person.id)
      .then(_ => {
        console.log('Deleted person', person);
        setPersons(persons.filter(p => p.id !== person.id));
      });
  };

  return (
    <table>
      <tbody>
        {personsToPrint.map(person => 
          <Person key={person.name} person={person} deletePerson={() => deletePerson(person)} />)}
      </tbody>
    </table>
  );
};

function App() {
  const [persons, setPersons] = useState([]);

  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber ] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(result => {
        console.log('Fetched persons...', result);
        setPersons(result);
      });
  }, []);

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
      <Phonebook persons={persons} setPersons={setPersons} nameFilter={nameFilter} />
    </div>
  );
}

export default App;
