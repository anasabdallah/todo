var fs = require('fs');

// get todos
module.exports.getTodos = function(req, res){
    getData((err, data)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            var jsonData = JSON.parse(data);
            if(jsonData.todos.length === 0){
                res.send("No Todos!");    
            } else {
                res.send(jsonData.todos);
            }
        }
    });
}

// add a todo
module.exports.addTodo = function(req, res){
    getData((err, data)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            todoObj = {
                "title": req.body.title,
                "body": req.body.body,
                "date": new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
            console.log(todoObj)
            var jsonData = JSON.parse(data);
            jsonData.todos.push(todoObj);
            writeData(jsonData, (err) =>{
                if(err){
                    console.log(err);
                    res.send(err);
                } else {
                    res.send("db updated!")
                }
            })
        }
    });
}


function getData(cb){
    fs.readFile(__dirname + '/../db/database.json', (err, data) => {
        cb(err, data);
    });
}

function writeData(data, cb){
    fs.writeFile(__dirname + '/../db/database.json', JSON.stringify(data), function(err){
        cb(err);
    });
}