    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    //When connected check local storage for name and report to server
    socket.on('connect', () => {
        if(!localStorage.getItem("name"))
            socket.emit('check name exists', {'name exists': false});
    });

    addEventListener('DOMContentLoaded', () => {
        //Send message to server when a user creates a new channel
        var button = document.querySelector("#create-button");
        button.addEventListener('click', () => {
            var channelname = document.querySelector("#channel-name");
            if (channelname.length < 5)
                alert("Channel name must be at least five characters");
            else
                socket.emit("new channel", {"new channel": channelname});
        });
        
        //Update channel list when a user creates a new one
        var div = document.getElementById("channels");
        socket.on("create channel", data => {
            var a = document.createElement("a");
            a.href=("/channel/" + data["create channel"]);
            div.appendChild(a);
        });
    });

