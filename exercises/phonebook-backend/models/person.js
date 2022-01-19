const mongoose = require('mongoose');

const mongodbUri = process.env.MONGODB_URI;
mongoose.connect(mongodbUri)
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB', err);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Person', personSchema);
