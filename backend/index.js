const http = require('http')
const path = require('path'); 
const express = require('express');
const {Server} = require("socket.io");
const app = express();

//convert app in to http server
const server = http.createServer(app);
//convert http into the io server
const io = new Server(server);

//Socket.io
io.on('connection',(socket)=>{
//every socket has an id
 socket.on('chatMessage',message =>{
  console.log(message);
  //broadcast to all the clients
  io.emit('chatMessage',message);
 })
 console.log('A new user connected',socket.id);
})

app.use(express.static("/public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  // res.send("hello")
  res.sendFile(__dirname + '/index.html');
})

server.listen(9000,()=> console.log(`server started at PORT:${9000}`));
