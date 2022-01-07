import React, { useState, useEffect } from 'react'
import noteService from './services/notes'

const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'mark not important' : 'mark important';

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>);
};

const Notes = (props) => {
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);

    // By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
    // An empty array signifies that this effect should run only once.
    useEffect(() => {
        console.log('Note effect...');
        noteService
            .getAll()
            .then(response => {
                console.log('Note promise fulfilled');
                setNotes(response.data);
            });
    }, []);

    // Is there any problem with doing this outside of an effect hook?
    // yes... it creates an infinite loop!!!
    // on every render, it will fetch the data... update the notes... which triggers a re-render!
    // noteService
    //     .getAll()
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
        };

        console.log('Adding note...', noteObject);
        noteService
            .create(noteObject)
            .then(response => {
                console.log('POST response', response);
                setNotes(notes.concat(response.data));
                setNewNote('');
            });
        
        //setNotes(notes.concat(noteObject));
        //setNewNote('');
    };

    const handleNewNoteChange = (event) => {
        console.log('Typing note...', event.target.value);
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} is toggling`);
        noteService
            .get(id)
            .then(response => {
                const note = response.data;
                console.log(`fetched note`, note);

                const toggledNote = { ...note, important: !note.important };
                console.log(`toggled note`, toggledNote);

                noteService
                    .update(id, toggledNote)
                    .then(response => {
                        console.log('toggled importance', response);
                        setNotes(notes.map(note => note.id !== id ? note : response.data));
                    });
            });
    };

    const notesToShow = showAll ?
        notes :
        notes.filter(note => note.important);

    console.log('render', notesToShow.length, 'notes');

    return (
        <div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
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