// подключение express
const express = require("express");
const webSocket = require('ws');
const jsonParser = express.json();
const bodyParser = require('body-parser');

let sendSocketMess;

const server = new webSocket.Server({port: 4000});
server.on('connection', ws => {
    ws.on('message', (mes) => {
        console.log(mes);
        
    });
    // ws.send('Здоров блять');
    sendSocketMess = (data) => ws.send(data);
});

// создаем объект приложения

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    
    next();
  });
  
app.get("/app", (request, response) => {
    console.log('good');
    response.send({test: 'ddssss'});
    
});

app.post("/app", jsonParser, (request, response) => {
    if(!request.body) return response.sendStatus(400);
    response.json({name: 'username'});
    sendSocketMess(request.body.imgBase64);
});

app.listen(3000);