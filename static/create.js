
//Handle user input for name
addEventListener('DOMContentLoaded', () => {

    document.querySelector('#user-form').onsubmit = () => {
        //get entered screenname
        var screenname = document.querySelector("#screenname").value;
        //check that username is long enough
        if(screenname.length < 5)
            alert("Name must be at least five characters");
        else
        {
            //Set name in local storage and notify server
            localStorage.setItem("name", screenname);
            window.location.replace("../homepage")
        };
        return false;
    };
});
