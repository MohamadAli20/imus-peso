let id = localStorage.getItem("userId");
$.ajax({
    url: "/check_form/"+id  ,
    type: "GET",
    success: function(response){
        console.log(response)
        // Personal information
        $("input[name='surname']").val(response[0].surname);
        $("input[name='firstname']").val(response[0].firstname);
        $("input[name='middlename']").val(response[0].middlename);
        $("input[name='suffix']").val(response[0].suffix);
        $("input[name='birthdate']").val(response[0].birthdate);
        $("input[name='birthdate']").css("color", "black");
        $("input[name='email']").val(response[0].email);
        $("input[name='contact']").val(response[0].contact);
        $("input[name='height']").val(response[0].height);
        let applicantGender = response[0].gender;
        if(applicantGender.toLowerCase() === "male"){
            $("#male").prop("checked", true);
        }
        else if(applicantGender.toLowerCase() === "female"){
            $("#female").prop("checked", true);
        }
        let applicantCivilStatus = response[0].civil_status;
        if(applicantCivilStatus.toLowerCase() === "single"){
            $("#single").prop("checked", true);
        }
        else if(applicantCivilStatus.toLowerCase() === "married"){
            $("#married").prop("checked", true);
        }
        else if(applicantCivilStatus.toLowerCase() === "widowed"){
            $("#widowed").prop("checked", true);
        }
        let disability = JSON.parse(response[0].disability);
        Object.keys(disability)
            .forEach(key => {
                if(disability[key] === "na"){ 
                    $("#none").prop("checked", true);
                }
                if(disability[key] === "visual"){
                    $("#visual").prop("checked", true);
                }
                if(disability[key] === "hearing"){
                    $("#hearing").prop("checked", true);
                }
                if(disability[key] === "speech"){
                    $("#speech").prop("checked", true);
                }
                if(disability[key] === "physical"){
                    $("#physical").prop("checked", true);
                }
                if(disability[key] === "mental"){
                    $("#mental").prop("checked", true);
                }
                if(key === "other" && disability[key] !== ""){
                    $("#disability_others").prop("checked", true);
                    $(".input_other_disability").val(disability[key]);
                }
            });
        $("input[name='religion']").val(response[0].religion);
    },
    error: function(error){
        console.error(error);
    }
})