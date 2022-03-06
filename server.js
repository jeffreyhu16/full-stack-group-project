const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://admin:gosoappasser20@cluster0.o3bew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
    if (err) { console.log(err) }
    console.log('connected to mongo');
    const db = client.db('full-stack-group-project');
    const commentsCollection = db.collection('comments');

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/comments', (req, res) => {
        db.collection('comments').find().toArray()
            .then(data => res.send(data))
            .catch(err => console.log(err));
    });

    app.post('/comment', (req, res) => {
        commentsCollection.insertOne(req.body)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }); 

    app.delete('/comment', (req, res) => {
        commentsCollection.deleteOne({ name: req.body.name })
            .then(result => res.send('delete complete'))
            .catch(err => console.log(err));
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));