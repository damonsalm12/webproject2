// Connect to socket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
// Handle user input and send as message to server
addEventListener('DOMContentLoaded', () => {
    // Add the channelname to local storage
    const channel_name = document.querySelector('#name').value;
    localStorage('channel') = channel_name;

    // When message is recieved from the server, check if it belongs to this channel and add
    socket.on('add message', data => {
        if (data['channel'] === channel_name)
        {
            var list = document.querySelector('#message-list');
            var message = document.createElement('li');

            message.classList('list-group-item');
            message.innerHTML(data['message']);
            list.appendChild(message);
        }
    });
    // Send channel name and message to server when user sends a message
    document.querySelector('#message').onsubmit = () => {
        socket.emit('new message', {'channel': channel_name ,'message': localStorage('name') + ': ' + document.querySelector('message-text').value})
    };

});