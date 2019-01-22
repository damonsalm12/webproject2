    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    addEventListener('DOMContentLoaded', () => {
      //check local storage for user and redirect to create if they do not have a name
      if(!localStorage.getItem("name"))
      {
          window.location.replace("../create")
        };
        //Send message to server when a user creates a new channel
        var button = document.querySelector("#create-button");
        button.addEventListener('click', () => {
            var channelname = document.querySelector('#channelname').value;
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
