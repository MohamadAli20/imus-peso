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
        $(".form-section").animate({left: '-200px'});
        $("#arrow-forward").css("display", "block");
        $("#arrow-back").css("display", "none");
    }
    
    $(document).on('click', "#arrow-forward", function(){
       openSideBar();
       $('#navbarNav').collapse('hide');
    });
    $(document).on('click', '#arrow-back', function(){
        closeSideBar();
    });

    $("input[type='date']").change(function() {
        $(this).css('color', 'black');
    });

    $(".navbar-toggler").click(function(){
        closeSideBar();
        // let img = $('<img id="arrow-forward" src="/images/arrow_forward.svg" alt="Arrow forward icon">');
        // $("#arrow-icon").css("left", "0");
    })
});
