$(document).ready(() => {


    let form = $(".modal-body form");
    
    $("#btnLogin").click(function(){
        $(".message .alert").remove();

        let email = $(form).find("input[name='email']").val();
        let password = $(form).find("input[name='password']").val();
    
        console.log(email);
        $.ajax({
            url: "/authenticate",
            type: "POST",
            data: {email, password},
            success: function(response){
                console.log($(".alert"))
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