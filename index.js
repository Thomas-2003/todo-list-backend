const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.get('/', (req, res) => {
    console.log(`GET / at ${Date.now()}`)

    res.send('Hello World!')
})
app.get('/todos', (req, res) => {
    const jsonResponse = [{
        title: "Bread",
        id: 1,
        completed: false
    },
    {
        title: "Milk",
        id: 2,
        completed: false
    },
    {
        title: "Beer",
        id: 3,
        completed: false
    }]
    console.log(`GET /todos at ${Date.now()}`)
    res.json(jsonResponse)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})