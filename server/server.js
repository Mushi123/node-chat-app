const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')
const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString}=require('./utils/validation')
const {Users}=require('./utils/users')
const publicPath=path.join(__dirname,'../public')
const port=process.env.PORT||3000
var app=express();
var server=http.createServer(app)
var io=socketIO(server)//we get back our websockets server

var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User connected');



  socket.on('join',(params,callback) => {
    if(!isRealString(params.name)||!isRealString(params.room)){
      return callback('Name and room name invalid')
    }
    //have access to socket.id
    socket.join(params.room);
    users.removeUser(socket.id)//remove current user from any potential previous rooms and add them to the new one
    users.addUser(socket.id,params.name,params.room)
    io.to(params.room).emit('updateUserList',users.getUserList(params.room))
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`))

    //io.to(room name).emit-> sends msg to everyone in the room
    //socket.broadcast.to().emit-> all in room except for me
    callback();
  })
  socket.on('createMessage',(message,callback) => {
    // console.log("createMessage ",message);
    var user=users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
    }

    callback()//will send an event to the front end i.e. acknowledgement which will run the frontend's callback
    // socket.broadcast.emit('newMessage',{//emitting events to all except for this socket
    //   from: message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })
  })
  socket.on('createLocationMessage',(coords) => {
    var user=users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))
    }

  })
  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id)
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room))
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`))
    }
    //console.log('Disconnected from client');
  })
})//register event listener. This particular event lets you listen for a new connection

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
})
