
let preferredOccupationObj = JSON.parse($("input[name='preferred_occupation']").val());
let occupationObj = JSON.parse($("input[name='occupation']").val());
let obj = {
    occupation1: "",
    occupation2: "",
    occupation3: ""
};
$(".type_preferred_occupation").click(function(){
    if($(this).prop("checked")){
        $(".type_preferred_occupation").prop("checked", false);
        $(this).prop("checked", true);

        let type_preferred_occupation = $(this).val();
        preferredOccupationObj["type_preferred_occupation"] = type_preferred_occupation;
    }
    else{
        delete preferredOccupationObj["type_preferred_occupation"];
        delete occupationObj["occupation"];
        $(".input_occupation").val("");
    }
    $("input[name='preferred_occupation']").val(JSON.stringify(preferredOccupationObj));
    $("input[name='occupation']").val(JSON.stringify(occupationObj));
});

/* Specified occupation */ 
$(".preferred_occupation1").on("input", function(){
    if($(".type_preferred_occupation").prop("checked")){
        let occupation = $(this).val();
        obj["occupation1"] = occupation;
        occupationObj["occupation"] = obj;
    }
    $("input[name='occupation']").val(JSON.stringify(occupationObj));
}); 
$(".preferred_occupation2").on("input", function(){
    if($(".type_preferred_occupation").prop("checked")){
        let occupation = $(this).val();
        obj["occupation2"] = occupation;
        occupationObj["occupation"] = obj;
    }
    $("input[name='occupation']").val(JSON.stringify(occupationObj));
});
$(".preferred_occupation3").on("input", function(){
    if($(".type_preferred_occupation").prop("checked")){
        let occupation = $(this).val();
        obj["occupation3"] = occupation;
        occupationObj["occupation"] = obj;
    }
    $("input[name='occupation']").val(JSON.stringify(occupationObj));
});  

/* Work location */
let workLocationObj = JSON.parse($("input[name='preferred_work_occupation']").val());
let addressObj = JSON.parse($("input[name='work_address']").val());
let work_address = {
    address1: "",
    address2: "",
    address3: ""
}
$(".work_location").click(function(){
    if($(this).prop("checked")){
        $(".work_location").prop("checked", false);
        $(this).prop("checked", true);

        let location = $(this).val();
        workLocationObj["location"] = location;
    }
    else{
        delete workLocationObj["location"];
        delete addressObj["address"];
        $(".input_address").val("");
    }
    $("input[name='preferred_work_occupation']").val(JSON.stringify(workLocationObj));
    $("input[name='work_address']").val(JSON.stringify(addressObj));
});
/* Input work location */ 
$(".address1").on("input", function(){
    if($(".work_location").prop("checked")){
        let val = $(this).val();
        work_address["address1"] = val;
        addressObj["address"] = work_address;
    }
    $("input[name='work_address']").val(JSON.stringify(addressObj));
});
$(".address2").on("input", function(){
    if($(".work_location").prop("checked")){
        let val = $(this).val();
        work_address["address2"] = val;
        addressObj["address"] = work_address;
    }
    $("input[name='work_address']").val(JSON.stringify(addressObj));
});
$(".address3").on("input", function(){
    if($(".work_location").prop("checked")){
        let val = $(this).val();
        work_address["address3"] = val;
        addressObj["address"] = work_address;
    }
    $("input[name='work_address']").val(JSON.stringify(addressObj));
});

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
// $(".btn-next").click(function(e){
//     e.preventDefault();
    
//     let form = $(this).closest('form')[0];
//     checkInputField(form);

//     /* remove the bold of the previous link*/
//     $(`.page${currentPage}`).css("font-weight", "100"); 
//     $(`#page${currentPage}`).css("display", "none");

//     /* increment the value of the current page */
//     currentPage++;
//     $(`#page${currentPage}`).css("display", "block");
//     /* bold the selected link or the current page label in the sidebar*/
//     $(`.page${currentPage}`).css("font-weight", "bold"); 
    
// })

// /*
// * Check if certification and authorization is checked;
// */
// $(".btn-submit").click(function(e){
//     e.preventDefault()
    
//     let isCertify = $("input[name='certify']").prop("checked");
//     let isAuthorize = $("input[name='authorize']").prop("checked") 
//     let isAware = $("input[name='aware']").prop("checked")

//     if(isCertify === true && isAuthorize === true && isAware === true){
//         $.ajax({
//             url: "/addInformation",
//             type: "POST",
//             data: JSON.stringify(finalInformation),
//             contentType: "application/json",
//             success: function(response){
//                 console.log(response);
//             },
//             error: function(xhr, status, error){
//                 console.error(error);
//             }
//         })
//     }
//     else{
//         alertMessage("Check all the checkboxes.");
//     }
    
// });