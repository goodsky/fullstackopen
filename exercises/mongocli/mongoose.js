const mongoose = require('mongoose');

const argv = require('yargs')(process.argv.slice(2))
    .usage('Usage: $0 <mongodbPassword> [options]')
    .demandCommand(1)
    .argv;

const args = argv._;
const [pass, name, number] = args;

const connectionString = `mongodb+srv://fullstack:${pass}@cluster0.gw3qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(connectionString);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (name !== undefined && number !== undefined) {
    const newPerson = new Person({
        name: name,
        number: number,
    });

    newPerson.save().then(result => {
        console.log('Person saved', result);
        mongoose.disconnect();
        //mongoose.connection.close();
    });
} else {
    Person.find({}).then(result => {
        console.log('People found', result);
        mongoose.disconnect();
        //mongoose.connection.close();
    })
}
