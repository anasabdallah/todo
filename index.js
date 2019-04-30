var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var worker = require('./workers/worker');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    worker.getTodos(req, res);
});

app.post('/', (req, res) => {
    worker.addTodo(req, res);
});

app.delete('/', (req, res) => {
    worker.deleteTodo(req, res);
});

app.listen(3000, () => {
    console.log("running on 3000")
});