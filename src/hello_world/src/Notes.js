import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Note = ({ note }) => (<li>{note.content}</li>);

const Notes = (props) => {
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);

    // By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
    // An empty array signifies that this effect should run only once.
    useEffect(() => {
        console.log('Note effect...');
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('Note promise fulfilled');
                setNotes(response.data);
            });
    }, []);

    // Is there any problem with doing this outside of an effect hook?
    // yes... it creates an infinite loop!!!
    // on every render, it will fetch the data... update the notes... which triggers a re-render!
    // axios
    //     .get('http://localhost:3001/notes')
    //     .then(response => {
    //         console.log('Note promise fulfilled');
    //         setNotes(response.data);
    //     });

    const addNote = (event) => {
        // NB: prevent default prevents the form from trying to do an automatic web request.
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };

        console.log('Adding note...', noteObject);
        setNotes(notes.concat(noteObject));
        setNewNote('');
    };

    const handleNewNoteChange = (event) => {
        console.log('Typing note...', event.target.value);
        setNewNote(event.target.value);
    };

    const notesToShow = showAll ?
        notes :
        notes.filter(note => note.important);

    console.log('render', notesToShow.length, 'notes');

    return (
        <div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />)}
            </ul>
            <button onClick={() => setShowAll(!showAll)}>
                {showAll ? 'show important' : 'show all'}
            </button>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNewNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
};

export default Notes;