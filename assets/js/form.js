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
    $(".btn-next").click(function(){
        /* remove the bold of the previous link*/
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        /* increment the value of the current page */
        currentPage++;
        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar*/
        $(`.page${currentPage}`).css("font-weight", "bold"); 
    });

    /*
    * Get the value from the input tag
    * Validate if empty or not
    */
    $(".btn-next").click(function(){
        var formDataArray = $("form").serializeArray();
        
        // Log the array of form data to the console
        console.log(formDataArray);
        
        // You can then use the array 'formDataArray' as needed
        // For example, you can convert it into a JSON object
        var formDataObject = {};
        $.each(formDataArray, function(i, field){
            formDataObject[field.name] = field.value;
        });
        console.log("Form data as JSON:", formDataObject);
    });
});
