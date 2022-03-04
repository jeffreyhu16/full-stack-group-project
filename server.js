const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/comment', (req, res) => {
    res.send('post request received');
    console.log(req.body);
});

const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://admin:gosoappasser20@cluster0.o3bew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
    if (err) { console.log(err) }
    console.log('connected to mongo');
})

app.listen(3000, () => console.log('Listening on port 3000'));