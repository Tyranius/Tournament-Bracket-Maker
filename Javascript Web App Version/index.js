const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.use('/public', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
}) // http://localhost:3000

app.get('/I-am-a-little-teapot-this-we-know', (req, res) => res.send("foo"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
