const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const fs = require('fs');
const { myLogger, authCheck } = require('./helper.js')
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(myLogger);

app.get('/', (req, res) => {

    res.send('Hello World!')
})
//TODO support the use of query params, to sort the list by title

let initialTodos = [{
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
app.get('/todos', (req, res) => {
    if (req.query.sort === "title") {
        initialTodos = initialTodos.sort((a, b) => {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
    }
    if (req.query.filter === "completed") {
        initialTodos = initialTodos.filter(todo => todo.completed)
    } else if (req.query.filter === "uncompleted") {
        initialTodos = initialTodos.filter(todo => !todo.completed)
    }
    res.json(initialTodos)
})

app.post('/todos/save', authCheck, (req, res) => {
    const textToWrite = initialTodos.map(t => t.title).join("\n")
    fs.writeFile('./todos.txt', textToWrite, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log('Saved todos to disk');
    })
    res.json({ message: "success" })
})

app.get('*', function (req, res) { // wildcard route, to catch all missing routes
    res.send('This route is not found', 404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})