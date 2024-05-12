$(document).ready(function(){
    
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

    /* 
    * PERSONAL INFORMATION
    * Stores the value of input tag to the checked radio button
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
    /* Yes radio if OFW */
    $("#input_ofw_country").change(function(){
        let val = $("#input_ofw_country").val();
        $("#yes_ofw").val(val);
    });
    /* Yes radio if former OFW */
    let formerCountry = "na";
    let monthYearReturnPh = "na";
    $("#ofw_former_country").change(function(){
        formerCountry = $("#ofw_former_country").val();
        $("#yes_former_ofw").val(formerCountry + " " + monthYearReturnPh);
    });
    $("#month_year_return_ph").change(function(){
        monthYearReturnPh = $("#month_year_return_ph").val();
        $("#yes_former_ofw").val(formerCountry + " " + monthYearReturnPh);
    });
    /* If 4p's beneficiary */
    $("#4ps_household_no").change(function(){
        let val = $("#4ps_household_no").val();
        $("#yes_4ps_beneficiary").val(val)
    });

    /*
    * LANGUAGE / DIALECT PROFICIENCY
    * English 
    */
    let englishObj = { english: {} };
    $(".checkbox_language1").change(function(){
        /* check if the checkbox is checked */
        if($(this).is(":checked")){
            let key = $(this).val();
            englishObj.english[key] = 1; /* assigning 1 to the nested object */

            $("input[name='language1']").val(JSON.stringify(englishObj));
        }
        else{
            delete englishObj.english[$(this).val()]; /* remove the key from the nested object */
            
            $("input[name='language1']").val(JSON.stringify(englishObj));
        }
    });
    /* Filipino */
    let filipinoObj = { filipino: {} };
    $(".checkbox_language2").change(function(){
        /* check if the checkbox is checked */
        if($(this).is(":checked")){
            let key = $(this).val();
            filipinoObj.filipino[key] = 1; /* assigning 1 to the nested object */

            $("input[name='language2']").val(JSON.stringify(filipinoObj));
        }
        else{
            delete filipinoObj.filipino[$(this).val()]; /* remove the key from the nested object */
            
            $("input[name='language2']").val(JSON.stringify(filipinoObj));
        }
    });
    /* Mandarin */
    let mandarinObj = { mandarin: {} };
    $(".checkbox_language3").change(function(){
        /* check if the checkbox is checked */
        if($(this).is(":checked")){
            let key = $(this).val();
            mandarinObj.mandarin[key] = 1; /* assigning 1 to the nested object */

            $("input[name='language3']").val(JSON.stringify(mandarinObj));
        }
        else{
            delete mandarinObj.mandarin[$(this).val()]; /* remove the key from the nested object */
            
            $("input[name='language3']").val(JSON.stringify(mandarinObj));
        }
    });
    /* 
    * Other language 
    * Set the specified language as the key of the object 
    */
    let specifyLanguageObj = {};
    let inputSpecifyLanguage = $("#input_specify_language");
    inputSpecifyLanguage.on("input", function(){
        let inputVal = $(inputSpecifyLanguage).val();
        if(inputVal !== ""){
            /* enable checkboxes */
            $(".checkbox_specify_language").prop('disabled', false);
            specifyLanguageObj = {}; /* empty the object after every change */
            specifyLanguageObj[inputVal] = {};
            /* store the specified language to the input type hidden */
            $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
        }
        else{
            /* disable checkboxes */
            $(".checkbox_specify_language").prop('disabled', true);

        }
    })
    /* Radio button for the specify language */
    $(".checkbox_specify_language").change(function(){
        /* get the key value */
        let language = $(inputSpecifyLanguage).val();
        /* check if the checkbox is checked */
        if($(this).is(":checked")){
            let key = $(this).val();
            specifyLanguageObj[language][key] = 1; /* assigning 1 to the nested object */

            $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
        }
        else{
            delete specifyLanguageObj[language][$(this).val()]; /* remove the key from the nested object */
            $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
        }
    });

    /*
    * OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING
    */
    $("#input_other_skills").change(function(){
        let val = $("#input_other_skills").val();
        $("input[name='other_skills']").val(val);
    });

    /*
    * Check if certification and authorization is checked;
    */
    $(".btn-submit").click(function(e){
        e.preventDefault()
        
        let isCertify = $("input[name='certify']").prop("checked");
        let isAuthorize = $("input[name='authorize']").prop("checked") 
        let isAware = $("input[name='aware']").prop("checked")

        if(isCertify === true && isAuthorize === true && isAware === true){
            $.ajax({
                url: "/addInformation",
                type: "POST",
                data: JSON.stringify(finalInformation),
                contentType: "application/json",
                success: function(response){
                    console.log(response);
                },
                error: function(xhr, status, error){
                    console.error(error);
                }
            })
        }
        else{
            alertMessage("Check all the checkboxes.");
        }
        
    });
});
