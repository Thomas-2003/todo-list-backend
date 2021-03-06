const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo-list');
module.exports = { mongoose }
const bodyparser = require("body-parser")
app.use(bodyparser.json()); //utilizes the body-parser package
app.use(bodyparser.urlencoded({
    extended: true
}));


const { myLogger, authCheck } = require('./helper.js')
const todosContoller = require('./todosController')
const authContoller = require('./authController')

app.use(cors({
    origin: ['http://localhost:3000', 'https://todo-list-backend-amber.vercel.app']
}));

app.use(myLogger);

app.get('/', (req, res) => {

    res.send('Hello World!')
})
//TODO support the use of query params, to sort the list by title


app.get('/todos', authCheck, todosContoller.getTodos)

app.post('/todos/save', authCheck, todosContoller.saveTodos)
app.post('/users/login', authContoller.login)
app.post('/users/register', authContoller.register)
app.post('/users/delete', authCheck, authContoller.deleteToDo)
app.post('/users/edit', authCheck, authContoller.edit)
app.get('/verify/:uuid', authContoller.verify)




app.get('*', function (req, res) { // wildcard route, to catch all missing routes
    res.send('This route is not found', 404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})