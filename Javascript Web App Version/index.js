const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use('/public', express.static('dist'))
const dbPath = path.join(__dirname, "./database.json");
// parse application/json
var jsonParser = bodyParser.json()
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
}) // http://localhost:3000

app.get('/participants-text', (req, res) => {
    res.sendStatus(504);
});

// Browser -> http://localhost:3000/participants
// Sever -> {} to client
app.get('/participants', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(dbPath)));
});

app.post('/participants', (req, res) => {
    const currentDatabase = JSON.parse(fs.readFileSync(dbPath));
    const { participants } = currentDatabase;
    currentDatabase.participants = [...participants, { ...req.body, id: participants[participants.length - 1].id + 1 }].sort(((a, b) => a.id - b.id));
    fs.writeFileSync(dbPath, JSON.stringify(currentDatabase));
    res.status(200).send();
});

app.put('/participants', (req, res) => {
    const currentDatabase = JSON.parse(fs.readFileSync(dbPath));
    const { participants } = currentDatabase;
    currentDatabase.participants = [...participants.filter(p => p.id !== req.body.id), { ...req.body }].sort(((a, b) => a.id - b.id));
    fs.writeFileSync(dbPath, JSON.stringify(currentDatabase));
    res.status(200).send();
});

app.delete('/participants/:id', (req, res) => {
    const currentDatabase = JSON.parse(fs.readFileSync(dbPath));
    const { participants } = currentDatabase;
    const { id } = req.params;
    // Remove from array by id
    //currentDatabase.participants =  [...participants.filter(p => p.id !== req.body.id), { ...req.body }].sort(((a,b) => a.id - b.id));
    fs.writeFileSync(dbPath, JSON.stringify(currentDatabase));
    res.status(200).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// MANA -- MongoDB, Apache, NodeJs, AngularJS
// MANR -- MongoDB, Apache, NodeJs, ReactJS
// SANR -- SQL, Apache, NodeJS, ReactJS

// Teachers | Id, Name

// Students | Id, Name, TeacherId

// Mongo
// student: {
//     id: "3",
//     name: "John Doe",
//     Teacher: {
//         id: "1",
//         name: "Mr Rizk",
//         Id: "32"
//     }    
// }

//https://www.google.com
// Domain Name Servers -> https://.... -> 8.8.8.8
