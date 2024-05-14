/*
* LANGUAGE / DIALECT PROFICIENCY
* English 
*/
let englishObj = { english: {} };
$(".checkbox_language1").change(function(){
    /* check if the checkbox is checked */
    if($(this).prop("checked")){
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
    if($(this).prop("checked")){
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
    if($(this).prop("checked")){
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
let inputSpecifyLanguage = $(".input_other_language");
inputSpecifyLanguage.on("input", function(){
    let inputVal = $(inputSpecifyLanguage).val();
    if(inputVal !== ""){
        /* enable checkboxes */
        $(".checkbox_other_language").prop('disabled', false);
        specifyLanguageObj = {}; /* empty the object after every change */
        specifyLanguageObj[inputVal] = {};
        /* store the specified language to the input type hidden */
    }
    else{
        /* disable checkboxes */
        $(".checkbox_other_language").prop('disabled', true);
        $(".checkbox_other_language").prop("checked", false);
        specifyLanguageObj = {};
    }
    $("input[name='other_language']").val(JSON.stringify(specifyLanguageObj));
})
/* Radio button for the specify language */
$(".checkbox_other_language").change(function(){
    /* get the key value */
    let language = $(inputSpecifyLanguage).val();
    /* check if the checkbox is checked */
    if($(this).prop("checked")){
        let key = $(this).val();
        specifyLanguageObj[language][key] = 1; /* assigning 1 to the nested object */

        $("input[name='other_language']").val(JSON.stringify(specifyLanguageObj));
    }
    else{
        delete specifyLanguageObj[language][$(this).val()]; /* remove the key from the nested object */
        $("input[name='other_language']").val(JSON.stringify(specifyLanguageObj));
    }
});

