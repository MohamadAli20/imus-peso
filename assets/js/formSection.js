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
    
    /* */
    $("#next-job-preference").click(function(){
        $(".personal-information").css("display", "none");
        $(".job-preference").css("display", "block");

        $("#personal-information").css("font-weight", "100");
        $("#job-preference").css("font-weight", "bold")
    })
    $("#prev-personal-information").click(function(){
        $(".personal-information").css("display", "block");
        $(".job-preference").css("display", "none");
    })
    /* Add more experience */
    let workExperienceNo = 2;
    $(".addWorkExperience").click(function(){
        
        // let div = document.createElement("div");
        // div.className = "col-lg-6 mt-3";
        
        // let input = document.createElement("input");
        // input.className = "form-control";
        // input.setAttribute("type", "text");
        // input.setAttribute("placeholder", `${workExperienceNo}. Company name`);

        // div.append(label);
        // div.append(input);

        // // $(".divider").before(`<div class='col-lg-6 mt-3'><label style="position: absolute; cursor: initial; font-style: normal; color: rgb(137, 137, 137); font-size: 16px; margin-top: 6px; margin-left: 7px; padding-left: 5px; padding-right: 5px; background-color: rgb(255, 255, 255);">Address (City/Municipality)</label><input class='form-control' type='text' bind-placeholder-label='true'></div>`);
        // // $(".divider").before(`<div class="col-lg-6 mt-3"><input class="form-control" type="text" placeholder="Address (City/Municipality)"></div>`);
        // $(".divider").before(div)
        // workExperienceNo++;
    })
});
