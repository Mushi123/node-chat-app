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

socket.on('newLocationMessage',function(m) {

  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My current location</a>');
  li.text(`${m.from}: `);
  a.attr('href',m.url)
  li.append(a);
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

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function(){
    alert('Unable to fetch location')
  })
})
