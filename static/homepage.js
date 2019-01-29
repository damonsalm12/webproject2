    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    addEventListener('DOMContentLoaded', () => {

        //Send message to server when a user creates a new channel
        document.querySelector("#create-channel").onsubmit = (e) => {
            e.preventDefault();

            var channelname = document.querySelector('#channelname').value;
            if (channelname.length < 5)
                alert("Channel name must be at least five characters");
            else
                socket.emit("new channel", {"new channel": channelname});
                console.log('new channel '+ channelname);
              //  window.location.replace("../disp_channel/" + data["create channel"])
            return false;
        };

        //Update channel list when a user creates a new one
        var div = document.getElementById("channels");
        socket.on("create channel", (data) => {
            console.log('creating channel');
            var a = document.createElement("a");
            a.href=("/disp_channel/" + data["create channel"]);
            a.classList.add('list-group-item')
            a.classList.add('list-group-item')
            a.innerHTML=data["create channel"]
            div.appendChild(a)
        });
    });
