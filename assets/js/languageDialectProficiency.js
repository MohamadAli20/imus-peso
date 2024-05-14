// $(document).ready(function(){

    /*
    * LANGUAGE / DIALECT PROFICIENCY
    * English 
    */
    let englishObj = JSON.parse($("input[name='language1']").val());
    let obj = {
        'language': "",
        'read':0,
        'write':0,
        'speak':0,
        'understand':0
    }
    $(".checkbox_language1").click(function(){
        /* check if the checkbox is checked */
        if($(this).prop("checked")){
            let val = $(this).val();
            console.log(val)
            // for
            // console.log(englishObj)
            // englishObj["english"] = {"read": 0, }; /* assigning 1 to the nested object */

            // $("input[name='language1']").val(JSON.stringify(englishObj));
        }
        else{
            // delete englishObj.english[$(this).val()]; /* remove the key from the nested object */
            
        }
        $("input[name='language1']").val(JSON.stringify(englishObj));
    });
//     /* Filipino */
//     let filipinoObj = { filipino: {} };
//     $(".checkbox_language2").change(function(){
//         /* check if the checkbox is checked */
//         if($(this).is(":checked")){
//             let key = $(this).val();
//             filipinoObj.filipino[key] = 1; /* assigning 1 to the nested object */

//             $("input[name='language2']").val(JSON.stringify(filipinoObj));
//         }
//         else{
//             delete filipinoObj.filipino[$(this).val()]; /* remove the key from the nested object */
            
//             $("input[name='language2']").val(JSON.stringify(filipinoObj));
//         }
//     });
//     /* Mandarin */
//     let mandarinObj = { mandarin: {} };
//     $(".checkbox_language3").change(function(){
//         /* check if the checkbox is checked */
//         if($(this).is(":checked")){
//             let key = $(this).val();
//             mandarinObj.mandarin[key] = 1; /* assigning 1 to the nested object */

//             $("input[name='language3']").val(JSON.stringify(mandarinObj));
//         }
//         else{
//             delete mandarinObj.mandarin[$(this).val()]; /* remove the key from the nested object */
            
//             $("input[name='language3']").val(JSON.stringify(mandarinObj));
//         }
//     });
//     /* 
//     * Other language 
//     * Set the specified language as the key of the object 
//     */
//     let specifyLanguageObj = {};
//     let inputSpecifyLanguage = $("#input_specify_language");
//     inputSpecifyLanguage.on("input", function(){
//         let inputVal = $(inputSpecifyLanguage).val();
//         if(inputVal !== ""){
//             /* enable checkboxes */
//             $(".checkbox_specify_language").prop('disabled', false);
//             specifyLanguageObj = {}; /* empty the object after every change */
//             specifyLanguageObj[inputVal] = {};
//             /* store the specified language to the input type hidden */
//             $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
//         }
//         else{
//             /* disable checkboxes */
//             $(".checkbox_specify_language").prop('disabled', true);

//         }
//     })
//     /* Radio button for the specify language */
//     $(".checkbox_specify_language").change(function(){
//         /* get the key value */
//         let language = $(inputSpecifyLanguage).val();
//         /* check if the checkbox is checked */
//         if($(this).is(":checked")){
//             let key = $(this).val();
//             specifyLanguageObj[language][key] = 1; /* assigning 1 to the nested object */

//             $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
//         }
//         else{
//             delete specifyLanguageObj[language][$(this).val()]; /* remove the key from the nested object */
//             $("input[name='specify_language']").val(JSON.stringify(specifyLanguageObj));
//         }
//     });


// });