var socket=io();
socket.on('connect',function() {
  console.log('connected to Server');
  socket.emit('createMessage',{
    from:'dvrajudatla',
    text:'hey hi'
  });
});
socket.on('disconnect',function(){
  console.log('Disconnected from the server');
});
socket.on('newMessage',function (newMessage){
  console.log('New Message ',newMessage);
});
