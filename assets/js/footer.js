/*
* Previous and Next button 
*/ 
$(".btn-prev").click(function(e){
    e.preventDefault();

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
    
    let form = $(this).closest('form')[0];
    checkInputField(form);

    /* remove the bold of the previous link*/
    $(`.page${currentPage}`).css("font-weight", "100"); 
    $(`#page${currentPage}`).css("display", "none");

    /* increment the value of the current page */
    currentPage++;
    $(`#page${currentPage}`).css("display", "block");
    /* bold the selected link or the current page label in the sidebar*/
    $(`.page${currentPage}`).css("font-weight", "bold"); 
    
})