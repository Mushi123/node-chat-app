const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')

const publicPath=path.join(__dirname,'../public')
const port=process.env.PORT||3000
var app=express();
var server=http.createServer(app)
var io=socketIO(server)//we get back our websockets server
const {generateMessage,generateLocationMessage}=require('./utils/message')


app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User connected');


  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'))
  socket.on('createMessage',(message,callback) => {//emits an event to a single connection
    console.log("createMessage ",message);
    io.emit('newMessage',generateMessage(message.from,message.text))
    callback("This is from server")//will send an event to the front end i.e. acknowledgement which will run the frontend's callback
    // socket.broadcast.emit('newMessage',{//emitting events to all except for this socket
    //   from: message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })
  })
  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude))
  })
  socket.on('disconnect',() => {
    console.log('Disconnected from client');
  })
})//register event listener. This particular event lets you listen for a new connection

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
})
