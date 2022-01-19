const mongodb = require('mongodb');

const argv = require('yargs')(process.argv.slice(2))
    .usage('Usage: $0 <mongodbPassword> [options]')
    .demandCommand(1)
    .argv;

const args = argv._;
const [pass, name, number] = args;

const connectionString = `mongodb+srv://fullstack:${pass}@cluster0.gw3qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = 'myFirstDatabase';
const collectionName = 'people';

const client = new mongodb.MongoClient(connectionString);
const database = client.db(dbName);
const collection = database.collection(collectionName);

if (name !== undefined && number !== undefined) {
    (async () => {
        await client.connect();

        const newPerson = {
            name: name,
            number:number,
        };

        const result = await collection.insertOne(newPerson);
        console.log('Person inserted', result);

        await client.close();
    })().catch(err => console.error(err));
} else {
    (async () => {
        await client.connect();

        const cursor = await collection.find({});
        const people = await cursor.toArray();

        console.log('People found', people);

        await client.close();
    })().catch(err => console.error(err));
}
