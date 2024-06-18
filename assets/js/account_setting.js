$(document).ready(function(){

    let show = false;
    $("#username").click(function(){
        if(!show){
            $(".account-info-container").css("display", "block");
            show = true;
            $(".notification-container").css("display", "none");
        }
        else if(show){
            $(".account-info-container").css("display", "none");
            show = false;
        }
    });

    // Get the modal
    var modal = document.getElementById("accountModal");
    var notificationContainer = document.getElementById("notificationContainer");

    // Get the trigger elements
    var username = document.getElementById("username");
    var notifLogo = document.getElementById("notifLogo");
    var navLoginBtn = document.getElementById("navLoginBtn");

    // Add a click event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the click is outside the modal and the trigger elements
        if (!modal.contains(event.target) && 
            !notificationContainer.contains(event.target) && 
            event.target !== username && 
            event.target !== navLoginBtn && 
            !username.contains(event.target) &&
            !notifLogo.contains(event.target)) {
            // Hide the modal
            modal.style.display = "none";
            // Hide the notification container
            notificationContainer.style.display = "none";
        }
    });
})