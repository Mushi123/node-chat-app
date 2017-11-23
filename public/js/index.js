var socket = io(); // initiating a request from client to server to open up a socket
//and keep connection/socket open
socket.on('connect',function(){
  console.log("Connected to server");

  // socket.emit('createEmail',{
  //   to:"John@eg.com",
  //   text:"All good"
  // })That works
  socket.emit('createMessage',{
    from:'mush@eg.com',
    text:'That works'
  })
});
socket.on('disconnect',function()  {
  console.log("Disconnected from server");
});

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
socket.on('newMessage',function(m){
  console.log('newMessage',m);
})
