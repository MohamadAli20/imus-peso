let categories = [
    "personalInformation",
    "jobPreference",
    "languageDialectProficiency",
    "educationalBackground",
    "techicalVocationalTraining",
    "eligibilityProfessionalLicense",
    "workExperience",
    "otherSkills"
]
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
window.addEventListener('resize', () => {
    if (window.innerWidth > 576) {
        // Ensure sidebar is visible and positioned correctly
        $(".form-section").css("left", "0px");
        $("#arrow-forward").css("display", "none");
        $("#arrow-back").css("display", "block");
    }
    if (window.innerWidth < 575) {
        $(".form-section").css("left", "-70%");
        $("#arrow-forward").css("display", "block");
        $("#arrow-back").css("display", "none");
    }
});

// Initial check to handle the case when the script runs
if(window.innerWidth > 576){
    $(".form-section").css("left", "0px");
    $("#arrow-forward").css("display", "none");
    $("#arrow-back").css("display", "block");
}
if(window.innerWidth < 575){
    $(".form-section").css("left", "-70%");
    $("#arrow-forward").css("display", "block");
    $("#arrow-back").css("display", "none");
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
let isEmptyField = undefined;
let checkInputField = (form) => {
    let formData = $(form).serializeArray();
    $(".custom-message").remove();

    for(let i = 0; i < formData.length; i++){
        if(formData[i].value === ""){
            let p = document.createElement('p');
            p.className = "alert alert-danger col-lg-5 col-md-5 col-sm-6 col-12 custom-message"
            p.style.color = 'red';
            p.style.margin = "0 auto";
            p.innerText = 'Please check all the boxes.';
            $("#message").append(p);
            $("#message").css({
                "display": "block",
                "position": "fixed",
                "top": "0",
                "z-index": "5"
            });
            setTimeout(function(){
                $(".custom-message").remove();
            }, 3000);
            isEmptyField = true;
            break;
        }
        else{
            isEmptyField = false;
        }
    }  
    if(isEmptyField === false){
        addToObject(formData);
    }
}
$("a").click(function(){
    checkInputField($(`#page${currentPage}`));

    if(isEmptyField === false){
        /* Remove the current form or page */
        $(`#page${currentPage}`).css("display", "none");
    

        let pageNo = $(this).prop("class");
        let lastCharacter = pageNo[pageNo.length - 1];

        $(".side-bar-links").find("a").css("font-weight", "100");
        $(".side-bar-links").find("a").css("background-color", "#053774");

        $(this).css({
            "font-weight": "bold",
            "background-color": "rgba(3, 138, 255, 0.1)"
        });
        /* Display the selected form */
        $(`#${pageNo}`).css("display", "block");

        /* Update the currentPage value */
        currentPage = parseInt(lastCharacter);
    }
})
