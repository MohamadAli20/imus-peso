$(document).ready(() => {

    let checkUserLogin = () => {
        let username = localStorage.getItem('username');
        if(username){
            $("#username p").text(username);
            $("#username").css("display", "block")
            $("#navLoginBtn").css("display", "none");
        }
        else{
            $("#username p").text("");
            $("#username").hide();
            $("#navLoginBtn").show();
        }
    }
    checkUserLogin();

    $("#btnLogout").click(function(){
        localStorage.removeItem('username');
        checkUserLogin();
        location.reload();
    });
    

    let form = $(".modal-body form");
    $("#btnLogin").click(function(){
        $(".message .alert").remove();

        let email = $(form).find("input[name='email']").val();
        let password = $(form).find("input[name='password']").val();
    
        $.ajax({
            url: "/authenticate",
            type: "POST",
            data: {email, password},
            success: function(response){
                if(response.success){
                    localStorage.setItem('username', response.username)
                    $("#username").css("display", "block");
                    $("#navLoginBtn").css("display", "none");
                    location.reload();
                }
                else{
                    $(".message").css({
                        'display': 'block',
                        'zIndex': '5'
                    });

                    let p = document.createElement('p');
                    p.className = "alert alert-danger"
                    p.style.color = 'red';
                    p.innerText = response;
                    $(".message").append(p);
                    
                    setTimeout(function(){
                        $(".message .alert").remove();
                    }, 3000);
                }
            },
            error: function(xhr, error, status){
                console.error(error);
            }
        })
    });

    /* For registration */
    $('#success').delay(3000).fadeOut();
    $('#error').delay(3000).fadeOut();
});