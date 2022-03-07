const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Mehods", "GET, PUT, POST, DELETE");
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
    // find out why mainContent.textContent disapears before deleting DB data //
    app.delete('/comment', (req, res) => {
        commentsCollection.deleteOne({ title: req.body.title })
            .then(result => {
                res.send(req.body);
                console.log(result);
            })
            .catch(err => console.log(err));
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));