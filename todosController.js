let { initialTodos } = require('./initialData')
const fs = require('fs');


const getTodos = (req, res) => {
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
}
const saveTodos = (req, res) => {
    const textToWrite = initialTodos.map(t => t.title).join("\n")
    fs.writeFile('./todos.txt', textToWrite, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log('Saved todos to disk');
    })
    res.json({ message: "success" })
}
module.exports = { getTodos, saveTodos }