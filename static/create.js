//Connect to socket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//Handle user input for name
addEventListener('DOMContentLoaded', () => {
    document.querySelector('#user-form').onsubmit = () => {
        //get entered screenname
        var screenname = document.querySelector("#screennname");
        //check that username is long enough
        if(screenname.length < 5)
            alert("Name must be at least five characters");
        else
        {
            //Set name in local storage and notify server to redirect
            localStorage.setItem("name", screenname);
            socket.emit('new user', {"new user": true});
        };
        //Stop form from submitting
        return false;
    };
});