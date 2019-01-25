addEventListener('DOMContentLoaded', () => {
    //check local storage for user and redirect to create if they do not have a name
    if(!localStorage.getItem("name"))
    {
        window.location.replace("../create");
    } 
    // Check local storage for last channel and redirect there
    else if (localStorage.getItem('channel')){
         window.location.replace("../disp_channel/" + localStorage.getItem('channel'));
    }
    else {
        window.location.replace("../homepage");
    };
});