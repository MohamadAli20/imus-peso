/*
* Previous button
*/
$(".btn-prev").off("click").on("click", function(e){
    e.preventDefault();
    
    // if (currentPage > 1) {
        /* remove the bold of the current link */
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        /* decrement the value of the current page */
        currentPage -= 1;
        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar */
        $(`.page${currentPage}`).css("font-weight", "bold");
    // }
});

/*
* Next button (also submits form)
*/
$(".btn-next").off("click").on("click", function(e){
    e.preventDefault();
    
    // let form = $(this).closest('form')[0];
    // if (checkInputField(form)) {
    //     if (currentPage < totalPageCount) { // Ensure totalPageCount is defined
            /* remove the bold of the current link */
            $(`.page${currentPage}`).css("font-weight", "100"); 
            $(`#page${currentPage}`).css("display", "none");

            /* increment the value of the current page */
            currentPage += 1;
            console.log(currentPage)
            $(`#page${currentPage}`).css("display", "block");
            /* bold the selected link or the current page label in the sidebar */
            $(`.page${currentPage}`).css("font-weight", "bold");
    //     }
    // } else {
    //     // Handle form validation failure (optional)
    //     alert("Please fill out all required fields.");
    // }
});