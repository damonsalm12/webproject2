// Connect to socket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
// Handle user input and send as message to server
addEventListener('DOMContentLoaded', () => {
    // Add the channelname to local storage
    const channel_name = document.querySelector('#name').innerHTML;
    localStorage.setItem('channel', channel_name);

    // When message is recieved from the server, check if it belongs to this channel and add
    socket.on('add message', data => {
        if (data['channel'] === channel_name)
        {
            console.log('message recieved')
            var list = document.querySelector('#message-list');
            var message = document.createElement('li');

            message.classList.add('list-group-item');
            message.innerHTML = data['message'];
            list.appendChild(message);
        }
    });
    // Send channel name and message to server when user sends a message
    document.querySelector('#message').onsubmit = (e) => {
        e.preventDefault();
        var channel = localStorage.getItem('channel');
        console.log(channel)
        console.log('sending message');
        socket.emit('new message', {'channel': channel ,'message': localStorage.getItem('name') + ': ' + document.querySelector('#message-text').value});
        return false;
    };
});
