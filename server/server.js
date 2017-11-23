const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')

const publicPath=path.join(__dirname,'../public')
const port=process.env.PORT||3000
var app=express();
var server=http.createServer(app)
var io=socketIO(server)//we get back our websockets server


app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User connected');
  // socket.emit('newMessage',{
  //   from:"mush@eg.com",
  //   text:"Hey sup!!",
  //   createdAt:1231223
  // })
  // socket.on('createEmail',function(email){
  //   console.log("Email to create", email);
  // })
  socket.on('createMessage',(message) => {//emits an event to a single connection
    console.log("createMessage ",message);
    io.emit('newMessage',{
      from: message.from,
      text:message.text,
      createdAt:new Date().getTime()
    })
  })
  socket.on('disconnect',() => {
    console.log('Disconnected from client');
  })
})//register event listener. This particular event lets you listen for a new connection

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
})
