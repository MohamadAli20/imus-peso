/*
* Previous button
*/
$(".btn-prev").off("click").on("click", function(e){
    e.preventDefault();
    
    $(`.page${currentPage}`).css("font-weight", "100"); 
    $(`#page${currentPage}`).css("display", "none");

    /* decrement the value of the current page */
    currentPage -= 1;
    $(`#page${currentPage}`).css("display", "block");
    /* bold the selected link or the current page label in the sidebar */
    $(`.page${currentPage}`).css("font-weight", "bold");
   
});

/*
* Next button (also submits form)
*/
$(".btn-next").off("click").on("click", function(e){
    e.preventDefault();

    checkInputField($(`#page${currentPage}`))

    if(isEmptyField === false){
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none")    
        /* increment the value of the current page */
        currentPage += 1;
        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar */
        $(`.page${currentPage}`).css({
            "font-weight": "bold",
            "color": "red"
        });
    }
});

/*
* Submit button
* AJAX to information to the controller
*/

$(".btn-submit").click(function(e){
    e.preventDefault();

    let isChecked = true;
    let certifyAuthorize = document.querySelectorAll(".certify-authorize")
    for(let i = 0; i < certifyAuthorize.length; i++){
        let checkbox = $(certifyAuthorize)[i];
        if($(checkbox).prop("checked") === false){
            isChecked = false;
        }
    }
    if(isChecked){
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
        }, 3000);
    }
})