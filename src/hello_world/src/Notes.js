
const Note = ({ note }) => (<li>{note.content}</li>);

const Notes = ({ notes }) => {

    return (
        <div>
            <ul>
                {notes.map(note => <Note key={note.id} note={note} />)}
            </ul>
        </div>
    )
};

export default Notes;