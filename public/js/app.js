var socket = io();
var name = getQueryVariable('name') || 'Anon';
var room = getQueryVariable('room');

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	console.log(name + " joined " + room);
});

socket.on('message', function(message){
	console.log(message.text);
	var $message = jQuery('.messages');
	$message.append('<p><strong>' +message.name + ' ' + moment.unix(message.timestamp).format('MMM Do YYYY, h:mma')+'</strong></p>');
	$message.append('<p>'  +message.text + '</p>');
});

//Handles message submission

var $form = jQuery("#message-form");

$form.on('submit', function(event){

	event.preventDefault();
	socket.emit('message',{
		name: name,
		timestamp: moment().unix(),
		text: $form.find('input[name=message]').val()
	});

	$form.find('input[name=message]').val('');

});