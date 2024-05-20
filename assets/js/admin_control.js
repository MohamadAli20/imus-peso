/*
* show side bar ehrn arrow forward is clicked
* change the arrow forward with arrow back
*/
let openSideBar = () => {
    $(".form-section").animate({left: '0px'});
    $("#arrow-forward").css("display", "none");
    $("#arrow-back").css("display", "block");
}

let closeSideBar = () => {
    if (window.innerWidth <= 576) {
        $(".form-section").animate({left: '-70%'});
        $("#arrow-forward").css("display", "block");
        $("#arrow-back").css("display", "none");
    }
}

// Add event listener to handle window resize events
// window.addEventListener('resize', () => {
//     if (window.innerWidth > 576) {
//         // Ensure sidebar is visible and positioned correctly
//         $(".form-section").css("left", "0px");
//         $("#arrow-forward").css("display", "none");
//         $("#arrow-back").css("display", "block");
//     }
//     if (window.innerWidth < 575) {
//         $(".form-section").css("left", "-70%");
//         $("#arrow-forward").css("display", "block");
//         $("#arrow-back").css("display", "none");
//     }
// });

// // Initial check to handle the case when the script runs
// if(window.innerWidth > 576){
//     $(".form-section").css("left", "0px");
//     $("#arrow-forward").css("display", "none");
//     $("#arrow-back").css("display", "block");
// }
// if(window.innerWidth < 575){
//     $(".form-section").css("left", "-70%");
//     $("#arrow-forward").css("display", "block");
//     $("#arrow-back").css("display", "none");
// }

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

let currentPage = 1;
/* 
* The following are the Next and Previous button 
* for every sections of the form
*/

$("a").click(function(){
    /* Remove the current form or page */
    $(`#page${currentPage}`).css("display", "none");
    checkInputField($(`#page${currentPage}`));

    let pageNo = $(this).prop("class");
    let lastCharacter = pageNo[pageNo.length - 1];

    $(".side-bar-links").find("a").css("font-weight", "100");
    $(this).css("font-weight", "bold")
    /* Display the selected form */
    $(`#${pageNo}`).css("display", "block");

    /* Update the currentPage value */
    currentPage = parseInt(lastCharacter);
})


/*PREVIOUS AND NEXT BUTTON*/
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
    // e.preventDefault();
    
    // $(`.page${currentPage}`).css("font-weight", "100"); 
    // $(`#page${currentPage}`).css("display", "none");


    // /* increment the value of the current page */
    // currentPage += 1;
    // $(`#page${currentPage}`).css("display", "block");
    // /* bold the selected link or the current page label in the sidebar */
    // $(`.page${currentPage}`).css("font-weight", "bold");

    let currentForm = $(this).parent().parent()[0]
    $(currentForm).css("display", "none");
    $(".educational-background").css({
        "visibility": "visible"
    })
});