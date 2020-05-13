const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.use('/public', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
}) // http://localhost:3000

app.get('/participants-text', (req, res) => {
    res.sendStatus(504);
});

const participant = {
    id: 0,
    name: "",
    oponents: [],
    wins: 0,
    losses: 0
};

const participants = [
    {
        id: 0,
        name: "Becca",
        wins: 0,
        losses: 0
    },
    {
        id: 1,
        name: "Daniel",
        wins: 0,
        losses: 0
    },
    {
        id: 2,
        name: "Shaun",
        wins: 0,
        losses: 0
    },
    {
        id: 3,
        name: "Kari",
        wins: 0,
        losses: 0
    }
]

// Browser -> http://localhost:3000/participants
// Sever -> {} to client
app.get('/participants', (req, res) => {
    setTimeout(() => {
        res.json({participants});
    }, 2000);
})

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
