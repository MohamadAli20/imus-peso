let finalInformation = {
    personalInformation: [],
    jobPreference: [],
    languageDialectProficiency: [],
    educationalBackground: [],
    techicalVocationalTraining: [],
    eligibilityProfessionalLicense: [],
    workExperience: [],
    otherSkills: []
}

/* Display alert message */
let alertMessage = (message) => {
    $(".message").css({
        "position": "absolute",
        "top": "0",
        "z-index": "10",
        "display": "block",
        "width": "50%",
        "text-align": "center",
        "left": "50%",
        "transform": "translateX(-50%)"
    })

    let p = document.createElement('p');
    p.className = "alert alert-danger"
    p.style.color = 'red';
    p.innerText = message;
    $(".message").append(p);

    /* remove and restyle element */
    setTimeout(function(){
        $(".message .alert").remove();
        $(".message").css({
            "position": "none",
            "top": "0",
            "z-index": "10",
            "display": "none"
        })
    }, 3000);
}

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

let currentPage = 1;
let addToObject = (formData) => {
    if(currentPage === 1){
        finalInformation.personalInformation = formData;
    }
    if(currentPage === 2){
        finalInformation.jobPreference = formData;            
    }
    if(currentPage === 3){
        finalInformation.languageDialectProficiency = formData;  
    }
    if(currentPage === 4){
        finalInformation.educationalBackground = formData;
    }
    if(currentPage === 5){
        finalInformation.techicalVocationalTraining = formData;
    }
    if(currentPage === 6){
        finalInformation.eligibilityProfessionalLicense = formData;
    }
    if(currentPage === 7){
        finalInformation.workExperience = formData;
    }
    if(currentPage === 8){
        finalInformation.otherSkills = formData;
    }
    console.log(finalInformation);
}

/* 
* The following are the Next and Previous button 
* for every sections of the form
*/

let checkInputField = (form) => {

    let formData = $(form).serializeArray();
    addToObject(formData);

    /* Check if input field is empty */
    let isEmpty = formData.some(field => field.value.trim() === '');

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
