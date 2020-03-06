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

app.get('/participants', (req, res) => {
    /** inside here return a JSON object like this:
    * {
    *      participants: []
    * }
    * see result at: http://localhost:3000/
    */
   res.sendStatus(504);
})

app.get('/I-am-a-little-teapot-this-we-know', (req, res) => res.send("foo"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
