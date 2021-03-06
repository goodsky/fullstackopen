import React, { useEffect, useState } from 'react';
import personsService from './services/persons.js';

const Notification = ({ message, setMessage }) => {
    const notificationPopUpDurationMs = 3000;
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return message === null ? null : PopUp({ message, setMessage, durationMs: notificationPopUpDurationMs, style: notificationStyle });
};

const Error = ({ message, setMessage }) => {
    const errorPopUpDurationMs = 5000;
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return message === null ? null : PopUp({ message, setMessage, durationMs: errorPopUpDurationMs, style: errorStyle });
};

const PopUp = ({ message, setMessage, durationMs, style }) => {
    useEffect(() => {
        setTimeout(() =>
            setMessage(null),
        durationMs); },
    [setMessage, durationMs]);

    return (
        <div style={style}>
            {message}
        </div>
    );
};

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
        setNotificationMessage,
        setErrorMessage,
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
                        setNotificationMessage(`Updated ${newName}`);
                    })
                    .catch(error => {
                        const errorBody = error.response.data;
                        console.log('Failed to update person in db', error.message, errorBody);
                        setErrorMessage(errorBody.error !== undefined ? errorBody.error : 'Failed to update person!');
                        refreshPeople(setPersons);
                    });
            }
        }
        else {
            personsService
                .create(newPerson)
                .then(response => {
                    console.log('Saved person to db', response);
                    setPersons(persons.concat(response));
                    setNotificationMessage(`Added ${newName}`);
                })
                .catch(error => {
                    const errorBody = error.response.data;
                    console.log('Failed to save person to db', error.message, errorBody);
                    setErrorMessage(errorBody.error !== undefined ? errorBody.error : 'Failed to create person!');
                    refreshPeople(setPersons);
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

const Phonebook = ({
    persons, setPersons,
    nameFilter,
    setNotificationMessage,
    setErrorMessage }) => {

    const personMatchesFilter = (person) => {
        const personNameLowercase = person.name.toLowerCase();
        const nameFilterLowercase = nameFilter.toLowerCase();

        return personNameLowercase.includes(nameFilterLowercase);
    };

    const personsToPrint = nameFilter === '' ?
        persons :
        persons.filter(personMatchesFilter);

    const deletePerson = (person) => {
        const confirmDelete = window.confirm(`Delete ${person.name}?`);
        if (!confirmDelete) {
            return;
        }

        personsService
            .remove(person.id)
            .then(() => {
                console.log('Deleted person', person);
                setPersons(persons.filter(p => p.id !== person.id));
                setNotificationMessage(`Removed ${person.name}`);
            })
            .catch(error => {
                console.log('Failed to delete person', error);
                setErrorMessage('Error while deleting person! Try again.');
                refreshPeople(setPersons);
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

const refreshPeople = (setPersons) =>
    personsService
        .getAll()
        .then(result => {
            console.log('Fetched persons...', result);
            setPersons(result);
        });

function App() {
    const [persons, setPersons] = useState([]);

    const [nameFilter, setNameFilter] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber ] = useState('');

    const [notificationMessage, setNotificationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        refreshPeople(setPersons);
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <Notification message={notificationMessage} setMessage={setNotificationMessage} />
            <Filter
                nameFilter={nameFilter} setNameFilter={setNameFilter} />

            <h2>Add Someone</h2>
            <AddPerson
                persons={persons} setPersons={setPersons}
                newName={newName} setNewName={setNewName}
                newNumber={newNumber} setNewNumber={setNewNumber}
                setNotificationMessage={setNotificationMessage}
                setErrorMessage={setErrorMessage}  />

            <h2>Numbers</h2>
            <Phonebook
                persons={persons} setPersons={setPersons}
                nameFilter={nameFilter}
                setNotificationMessage={setNotificationMessage}
                setErrorMessage={setErrorMessage} />
        </div>
    );
}

export default App;
