var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

var messagetextbox= jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messagetextbox.val()
  },function(){
    messagetextbox.val('')
  });
});

var locationbutton =jQuery('#send-location');
locationbutton.on('click',function(){
  if(!navigator.geolocation)
  {
    return alert('geolocation is not supported by browser');
  }
locationbutton.attr('disabled','disabled').text('Sending location..');
  navigator.geolocation.getCurrentPosition(function(position){
    locationbutton.removeAttr('disabled').text('Send location');
    console.log(position);
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationbutton.removeAttr('disabled').text('Send location');
    alert('unable to fetch current position');
  });
});
