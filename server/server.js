const path=require('path');
const publicPath=path.join(__dirname, '../public');
const socketIO=require('socket.io');
const http=require('http');
const express=require('express');
const port=process.env.PORT || 3000;

var app=express();
var server =http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',{
    from:'dvrajudatla',
    text:'how r u',
    createdAt:123
  });

  socket.on('createMessage',(Message)=>{
    console.log('created Message ',Message);
  });

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });
});



server.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});
