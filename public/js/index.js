var socket = io(); // initiating a request from client to server to open up a socket
//and keep connection/socket open
socket.on('connect',function(){
  console.log("Connected to server");

  // socket.emit('createEmail',{
  //   to:"John@eg.com",
  //   text:"All good"
  // })That works
  // socket.emit('createMessage',{
  //   from:'mush@eg.com',
  //   text:'That works'
  // })
});
socket.on('disconnect',function()  {
  console.log("Disconnected from server");
});

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
socket.on('newMessage',function(m){
  console.log('newMessage',m);
  var li=jQuery('<li></li>');
  li.text(`${m.from}: ${m.text}`)
  jQuery('#messages').append(li)
})

// socket.emit('createMessage',{
//   from:"Frank",
//   text:"Hi"
// },function(m){
//   console.log(m);
// })

jQuery('#message-form').on('submit',(e) => {
  //console.log(e);
  e.preventDefault()//stops refresh
  socket.emit('createMessage',{
    from:'user',
    text:jQuery('[name=message]').val()
  },function(){

  })
})
