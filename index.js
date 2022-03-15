const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const { myLogger, authCheck } = require('./helper.js')
const todosContoller = require('./todosController')

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(myLogger);

app.get('/', (req, res) => {

    res.send('Hello World!')
})
//TODO support the use of query params, to sort the list by title


app.get('/todos', todosContoller.getTodos)

app.post('/todos/save', authCheck, todosContoller.saveTodos)

app.get('*', function (req, res) { // wildcard route, to catch all missing routes
    res.send('This route is not found', 404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})