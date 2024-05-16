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
let typeWorkOccupationObj = JSON.parse($("input[name='preferred_work_occupation']").val());
let workOccupationObj = JSON.parse($("input[name='work_occupation']").val());
let workOccupation = {
    location1: "",
    location2: "",
    location3: ""
}
$(".type_work_occupation").click(function(){
    if($(this).prop("checked")){
        $(".type_work_occupation").prop("checked", false);
        $(this).prop("checked", true);

        let type_work_occupation = $(this).val();
        typeWorkOccupationObj["type_work_occupation"] = type_work_occupation;
    }
    else{
        delete typeWorkOccupationObj["location"];
        // delete addressObj["address"];
        $(".input_address").val("");
    }
    $("input[name='preferred_work_occupation']").val(JSON.stringify(typeWorkOccupationObj));
    $("input[name='work_occupation']").val(JSON.stringify(workOccupationObj));
});
/* Input work location */ 
$(".location1").on("input", function(){
    if($(".type_work_occupation").prop("checked")){
        let val = $(this).val();
        workOccupation["location1"] = val;
        workOccupationObj["location"] = workOccupation;
    }
    $("input[name='work_occupation']").val(JSON.stringify(workOccupationObj));
});
$(".location2").on("input", function(){
    if($(".type_work_occupation").prop("checked")){
        let val = $(this).val();
        workOccupation["location2"] = val;
        workOccupationObj["location"] = workOccupation;
    }
    $("input[name='work_occupation']").val(JSON.stringify(workOccupationObj));
});
$(".location3").on("input", function(){
    if($(".type_work_occupation").prop("checked")){
        let val = $(this).val();
        workOccupation["location3"] = val;
        workOccupationObj["location"] = workOccupation;
    }
    $("input[name='work_occupation']").val(JSON.stringify(workOccupationObj));
});
