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
    
    let passwordVisible = false;
    $(".login-password").click(function(){
        if(passwordVisible === false){
            passwordVisible = true;
            $("#loginForm label input").attr("type", "text");
            $("#loginForm label img").attr("src", "/images/visibility.svg");
        }
        else{
            passwordVisible = false;
            $("#loginForm label input").attr("type", "password");
            $("#loginForm label img").attr("src", "/images/visibility_off.svg");
        }
    })

    $("#btnLogout").click(function(){
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        checkUserLogin();
        window.location.href = "/";
    });
    

    let form = $(".modal-body form");
    let loginSubmit = () => {
        let email = $(form).find("input[name='email']").val();
        let password = $(form).find("input[name='password']").val();
    
        $.ajax({
            url: "/authenticate",
            type: "POST",
            data: {email, password},
            success: function(response){
                if(response.success){
                    localStorage.setItem('isAdmin', response.isAdmin);
                    localStorage.setItem('username', response.username)
                    $("#username").css("display", "block");
                    $("#navLoginBtn").css("display", "none");
                    if(response.isAdmin == 1){
                        window.location.href = "/dashboard";
                    }
                    else{
                        window.location.href = "/";
                    }
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
    }

    $("#btnLogin").click(function(){
        $(".message .alert").remove();

        loginSubmit();
    });

    /* For registration */
    $('#success').delay(3000).fadeOut();
    $('#error').delay(3000).fadeOut();

    document.onkeydown = function (e) {
        // console.log('e: ', e);
        // console.log('e.keyCode: ', e.keyCode);
        if(e.keyCode === 13){
            console.log("Enter is clicked.");
            // nextPage();
            loginSubmit();
        }   
    }
});