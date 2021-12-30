import React, { useState } from 'react'

const Note = ({ note }) => (<li>{note.content}</li>);

const Notes = (props) => {
    const [ notes, setNotes ] = useState(props.notes);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);

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