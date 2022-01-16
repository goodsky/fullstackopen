const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const MAX_ID = 1000000000;
const generateId = () => {
    return Math.floor(Math.random() * MAX_ID);
};

app.use(express.static('build'));

app.get('/info', (request, response) => {
    const phonebookInfo = `Phonebook has info for ${people.length} people`;
    const timestamp = new Date().toString();
    response.send(`<p>${phonebookInfo}</p><p>${timestamp}</p>`);
});

app.get('/api/persons', (request, response) => {
    console.log('Fetched persons', people.length);
    response.json(people);
});

app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person || !person.name || !person.number) {
        console.log('Invalid data!');
        return response.status(400).json({ error: 'Person must have "name" and "number".'});
    }

    if (people.find(p => p.name === person.name)) {
        console.error('Phone book already contains person', person.name);
        return response.status(409).json({ error: 'Person with name already exists.' });
    }

    const newPerson = {
        id: generateId(),
        name: person.name,
        number: person.number,
    };

    if (people.find(p => p.id === newPerson.id)) {
        console.error('Wow! We already have a person with id', p.id);
        return response.status(500).json({ error: 'You just lost the lottery. Try calling again.' });
    }

    console.log('Adding person', newPerson);
    people.push(newPerson);
    response.status(201).json(newPerson);
});

app.get('/api/persons/:id', (request, response) => {
    const rawId = request.params.id;
    const id = Number(request.params.id);

    const person = people.find(p => p.id === id);

    if (person) {
        console.log('Reading person', person.name);
        response.json(person);
    }
    else {
        console.log('Person does not exist', rawId);
        response.sendStatus(404);
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const rawId = request.params.id;
    const id = Number(request.params.id);

    const person = people.find(p => p.id === id);
    if (person) {
        console.log('Deleting person', person.name);
        people = people.filter(p => p.id !== id);
    }
    
    response.sendStatus(204);
});

// Heroku sets the PORT environment variable
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
