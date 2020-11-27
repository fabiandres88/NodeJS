const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

mongoClient.connect(url).then ((client) => {
    
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    
    dboper.inserDocument(db, {name: "Burger Bon Jovi", description: "Delicious"}, 'dishes')
        .then((result) => {
        console.log('Insert Document:\n', result.ops);
        return dboper.findDocument(db, "dishes");
})
.then((docs) => {
    console.log('Found Documents:\n', docs);

    return dboper.updateDocument(db, {name: 'Burger U2'}, {description: 'Cheap'}, 'dishes');
})
.then((result) => {
    console.log("Updated Document:\n", result.result);

    return dboper.findDocument(db, 'dishes');
})
.then((docs) => {
    console.log('Found Documents:\n', docs);
    return  db.dropCollection('dishes');
})
.then((result)=> {
    console.log('Dropped Collection: ', result);
    return client.close();
})
.catch((error) => {
    console.log(error);
})
})