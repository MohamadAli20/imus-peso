$(document).ready(function(){
    /*
    * Previous button
    */
    $(".btn-prev").off("click").on("click", function(e){
        e.preventDefault();
        
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        /* decrement the value of the current page */
        currentPage -= 1;
        $(".side-bar-links").find("a").css("font-weight", "100");
        $(".side-bar-links").find("a").css("background-color", "rgb(8, 72, 151)");

        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar */
        $(`.page${currentPage}`).css({
            "font-weight": "bold",
            "background-color": "rgba(3, 138, 255, 0.1)"
        });
    
    });

    /*
    * Next button (also submits form)
    */
    let nextPage = () => {
        checkInputField($(`#page${currentPage}`))

        if(isEmptyField === false){
            $(`.page${currentPage}`).css("font-weight", "100"); 
            $(`#page${currentPage}`).css("display", "none")    
            /* increment the value of the current page */
            currentPage += 1;
            $(".side-bar-links").find("a").css("font-weight", "100");
            $(".side-bar-links").find("a").css("background-color", "rgb(8, 72, 151)");

            $(`#page${currentPage}`).css("display", "block");
            /* bold the selected link or the current page label in the sidebar */
            $(`.page${currentPage}`).css({
                "font-weight": "bold",
                "background-color": "rgba(3, 138, 255, 0.1)"
            });
        }
    }
    $(".btn-next").off("click").on("click", function(e){
        e.preventDefault();

        nextPage();
    });

    let isChecked = true;
    $(".certify-authorize").change(function() {
        let certifyAuthorize = document.querySelectorAll(".certify-authorize");
        for (let i = 0; i < certifyAuthorize.length; i++) {
            if (!certifyAuthorize[i].checked) {
                isChecked = false;
                break;
            }
            if (certifyAuthorize[i].checked) {
                isChecked = true;
            }
        }

        if(isChecked){
            $(".btn-submit").prop("disabled", false);
        }
        else{
            $(".btn-submit").prop("disabled", true);
        }
    });

    /*
    * Submit button
    * AJAX to information to the controller
    */
    $(".btn-submit").click(function(e){
        e.preventDefault();

        if(isChecked){
            // Send the data to the database
            $.ajax({
                url: "/addInformation",
                type: "POST",
                contentType : "application/json",
                data: JSON.stringify(finalInformation),
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.error(error);
                }
            });

            $("#btnSuccess").trigger('click');
        }
        else{
            let p = document.createElement('p');
            p.className = "alert alert-danger col-lg-5 col-md-5 col-sm-6 col-12 custom-message"
            p.style.color = 'red';
            p.style.margin = "0 auto";
            p.innerText = 'Please check all the boxes.';
            $("#message").append(p);
            $("#message").css({
                "display": "block",
                "position": "absolute",
                "top": "0",
                "z-index": "5"
            });
            
            setTimeout(function(){
                $(".custom-message").remove();
            }, 1000);
        }
    });
    $(".btn-exit").click(function(){
        window.location.href = "/dashboard"
    })
    // document.onkeydown = function (e) {
    //     if(e.keyCode === 13){
    //         nextPage();
    //     }
    // }   
});