$(document).ready(function(){

    let showNotif = false;
    $(".notif-logo").click(function(){
        if(!showNotif){
            $(".notification-container").css("display", "block");
            showNotif = true;
        }
        else if(showNotif){
            $(".notification-container").css("display", "none");
            showNotif = false;
        }
    });

    let idUser = localStorage.getItem("userId");
    $.ajax({
        url: "/notification/"+idUser,
        type: "GET",
        success: function(response){
            // {id: 1, user_id: 2, description: 'Mohamad Ali successfully submitted application.', created_at: null, updated_at: null}
            // {id: 2, user_id: 2, description: 'Mohamad Ali application is on-process', created_at: null, updated_at: null}
            // console.log(response);
            if(response.length !== 0){
                for(let i = 0; i < response.length; i++){
                    // Parse the given date string into a Date object
                    const givenDate = new Date(response[i].created_at);
                    
                    // Get the current date and time as a Date object
                    const now = new Date();
                    
                    // Calculate the difference between the two dates in milliseconds
                    const diffInMilliseconds = now - givenDate;
                    
                    // Convert the difference from milliseconds to hours
                    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
                    
                    let div = document.createElement("div");
                    div.className = "p-2 border div-notif";
                    div.textContent = response[i].description;
                    let span = document.createElement('span');
                    span.textContent = Math.round(diffInHours) + "hr/s ago";
                    span.className = "d-block";
                    div.append(span);
                    $(".notification-container").append(div);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    })
})