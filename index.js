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
//TODO support the use of query params, to sort the list by title

app.get('/todos', (req, res) => {
    let jsonResponse = [{
        title: "Bread",
        id: 1,
        completed: false
    },
    {
        title: "Milk",
        id: 2,
        completed: true
    },
    {
        title: "Beer",
        id: 3,
        completed: false
    }]
    console.log(`GET /todos at ${Date.now()}`)
    console.log(req.query);
    if (req.query.sort === "title") {
        jsonResponse = jsonResponse.sort((a, b) => {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
    }
    if (req.query.filter === "completed") {
        jsonResponse = jsonResponse.filter(todo => todo.completed)
    } else if (req.query.filter === "uncompleted") {
        jsonResponse = jsonResponse.filter(todo => !todo.completed)
    }
    res.json(jsonResponse)
})

app.get('*', function (req, res) { // wildcard route, to catch all missing routes
    res.send('This route is not found', 404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})