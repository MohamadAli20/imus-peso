$(document).ready(function(){
    /*
    * show side bar ehrn arrow forward is clicked
    * change the arrow forward with arrow back
    */
    let openSideBar = () => {
        $(".form-section").animate({left: '0px'})
        $("#arrow-forward").css("display", "none");
        $("#arrow-back").css("display", "block");
    }
    let closeSideBar = () => {
        /* Only execute this when the screen size is equal or less than 576 pixels width */
        if ($(window).width() <= 576) {
            $(".form-section").animate({left: '-200px'});
            $("#arrow-forward").css("display", "block");
            $("#arrow-back").css("display", "none");
        }
    }
    /* Open the side bar when arrow forward icon is clicked */
    $(document).on('click', "#arrow-forward", function(){
       openSideBar();
       $('#navbarNav').collapse('hide'); /* Hide navbar*/
    });
    /* Close side bar when arrow back icon is clicked */
    $(document).on('click', '#arrow-back', function(){
        closeSideBar();
    });
    /* Set the font color of input date when its value is changed */
    $("input[type='date']").change(function() {
        $(this).css('color', 'black');
    });
    /* Hide the side bar when navbar (menu) icon is clicked */
    $(".navbar-toggler").click(function(){
        closeSideBar();
    });

    /* 
    * The following are the Next and Previous button 
    * for every sections of the form
    */
    let currentPage = 1;
    let checkInputField = (form) => {

        let formDataArray = $(form).serializeArray();
        console.log(formDataArray)

        /* Check if input field is empty */
        let isEmpty = formDataArray.some(field => field.value.trim() === '');

        // if (isEmpty) {
        //     let p = document.createElement('p');
        //     p.className = "alert alert-danger"
        //     p.style.color = 'red';
        //     p.innerText = 'There are empty fields in the form.';
        //     $(".message").append(p);
            
        //     setTimeout(function(){
        //         $(".message .alert").remove();
        //     }, 3000);

        // }
        // else{
        //     /* remove the bold of the previous link*/
        //     $(`.page${currentPage}`).css("font-weight", "100"); 
        //     $(`#page${currentPage}`).css("display", "none");

        //     /* increment the value of the current page */
        //     currentPage++;
        //     $(`#page${currentPage}`).css("display", "block");
        //     /* bold the selected link or the current page label in the sidebar*/
        //     $(`.page${currentPage}`).css("font-weight", "bold"); 
        // }



    }
    $(".btn-prev").click(function(){
        /* remove the bold of the succeeding link*/
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        $(`#page${currentPage}`).css("display", "none");
        /* decrement the value of the current page */
        currentPage--;
        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar*/
        $(`.page${currentPage}`).css("font-weight", "bold");
    });
    /* Submitting form also proceed to the next page*/
    $(".btn-next").click(function(e){
        e.preventDefault();
        
        // let form = $(this).closest('form')[0];
        // checkInputField(form);

        /* remove the bold of the previous link*/
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        /* increment the value of the current page */
        currentPage++;
        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar*/
        $(`.page${currentPage}`).css("font-weight", "bold"); 
        
    })

    /* 
    * The following, stores the value of input tag to the checked radio button
    */
    /* Disability */
    $("#input_disability_others").change(function(){
        let val = $("#input_disability_others").val();
        $("#disability_others").val(val);
    })
    /* Others radio button under employed category */
    $("#input_employed_others").change(function(){
        let val = $("#input_employed_others").val();
        $("#employed_others").val(val);
    });
    /* Laid off abroad */
    $("#input_laid_off_abroad").change(function(){
        let val = $("#input_laid_off_abroad").val();
        $("#laid_off_abroad").val(val);
    });
    /* Others radio button under unemployed category */
    $("input_unemployed_others").change(function(){
        let val = $("input_unemployed_others").val();
        $("#unemployed_others").val(val);
    });
    /* Yes radio */
});
