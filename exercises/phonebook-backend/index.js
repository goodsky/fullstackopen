require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.static('build'));

app.get('/info', (request, response, next) => {
    Person.find()
        .then(people => {
            const phonebookInfo = `Phonebook has info for ${people.length} people`;
            const timestamp = new Date().toString();
            response.send(`<p>${phonebookInfo}</p><p>${timestamp}</p>`);
        })
        .catch(error => next(error));
});

app.get('/api/persons', (request, response, next) => {
    Person.find()
        .then(people => {
            console.log('Fetched persons', people.length);
            response.json(people);
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const person = request.body;
    const newPerson = new Person({
        name: person.name,
        number: person.number,
    });

    newPerson.save()
        .then(result => {
            console.log('Added person', result);
            response.status(201).json(result);
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const person = request.body;
    if (!person || !person.name || !person.number) {
        console.log('Invalid data!');
        return response.status(400).json({ error: 'Person must have "name" and "number".' });
    }

    const updatedPerson = {
        name: person.name,
        number: person.number,
    };

    // new: true means to return the newly updated object from the promise
    // runValidators: enables schema validation on update
    const updateOptions = { new: true, runValidators: true };
    Person.findByIdAndUpdate(request.params.id, updatedPerson, updateOptions)
        .then(result => {
            console.log('Updated person', result);
            response.json(result);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                console.log('Reading person', person.name);
                response.json(person);
            } else {
                console.log('Person does not exist', request.params.id);
                response.sendStatus(404);
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            console.log('Deleted person', request.params.id);
            response.sendStatus(204);
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(`Unhandled error [${error.name}]:`, error.message);

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'invalid id' });
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

// Heroku sets the PORT environment variable
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
