let id = localStorage.getItem("userId");
$("label").css("margin-top", "-12px");
$.ajax({
    url: "/check_form/"+id  ,
    type: "GET",
    success: function(response){
        // $("label").css("margin-top", "-12px");
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
        // console.log(JSON.stringify(disability));
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
        $("input[name='disability']").val(JSON.stringify(disability));

        $("input[name='religion']").val(response[0].religion);
        
        let addressObj = {
            "house_no_street": "",
            "barangay": "",
            "city_municipality": "",
            "province": ""
        };
        let addressApplicant = JSON.parse(response[0].address);
        $(".province").val(addressApplicant.province);
        addressObj.province =  addressApplicant.province
        $(".city_municipality").val(addressApplicant.city_municipality);
        addressObj.city_municipality = addressApplicant.city_municipality
        $(".barangay").val(addressApplicant.barangay);
        addressObj.barangay =  addressApplicant.barangay
        $(".house_no_street").val(addressApplicant.house_no_street);
        addressObj.house_no_street =  addressApplicant.house_no_street
        $("input[name='address']").val(JSON.stringify(addressObj));
        
        let employmentStatusObj = JSON.parse(response[0].employment_status);
        if(employmentStatusObj.employment_status === "employed"){
            $("#employed").prop("checked", true);
            
            if(employmentStatusObj.employed_type === "wage employed"){
                $(".wage_employed").prop("checked", true);
                $(".wage_employed").prop("disabled", false);
            }
            if(employmentStatusObj.employed_type === "self employed"){
                $(".self_employed").prop("checked", true);
                $(".self_employed").prop("disabled", false);

                for(let key in employmentStatusObj.job){
                    $(".job").prop("disabled", false);
                    $(".other_job").prop("disabled", false);
                    let jobStr = employmentStatusObj.job[key];
                    if(jobStr === "fisherman/fisherfolk"){
                        $("#fisherman").prop("checked", true);
                    }
                    if(jobStr === "vendor/retailer"){
                        $("#vendor").prop("checked", true);
                    }
                    if(jobStr === "home based worker"){
                        $("#home_based_worker").prop("checked", true);
                    }
                    if(jobStr === "transport"){
                        $("#transport").prop("checked", true);
                    }
                    if(jobStr === "domestic"){
                        $("#domestic").prop("checked", true);
                    }
                    if(jobStr === "freelancer"){
                        $("#freelancer").prop("checked", true);
                    }
                    if(jobStr === "artisan/craft worker"){
                        $("#artisan_craft_worker").prop("checked", true);
                    }
                    if(key === "other" && jobStr !== ""){
                        $(".other_job").prop("checked", true);
                        $(".input_other_job").val(jobStr)
                    }
                }
            }
        }
        if(employmentStatusObj.employment_status === "unemployed"){
            $("#unemployed").prop("checked", true);
            $(".other_unemployed_type").prop("disabled", false);

            $(".how_long_looking_for_work").val(employmentStatusObj.how_long_looking_for_work)
            $(".unemployed_type").prop("disabled", false);
            if(employmentStatusObj.unemployed_type === "new entrant or fresh graduate"){
                $("#new_entrant_fresh_graduate").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "finished contract"){
                $("#finished_contract").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "resigned"){
                $("#resigned").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "retired"){
                $("#retired").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "terminated/laid off due calamity"){
                $("#laid_off_due_calamity").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "terminated/laid off (local)"){
                $("#laid_off_local").prop("checked", true);
            }
            if(employmentStatusObj.unemployed_type === "terminated/laid off (abroad)"){
                $(".laid_off_abroad").prop("checked", true);
                $(".input_laid_off_abroad").val(employmentStatusObj.country);
            }
            if(employmentStatusObj.other !== "" && employmentStatusObj.other !== undefined){
                $(".unemployed_type").prop("checked", false);
                $(".other_unemployed_type").prop("checked", true);
                $(".input_other_unemployed_type").val(employmentStatusObj.other);
            }
        }
        $("input[name='employment_status']").val(JSON.stringify(employmentStatusObj));

        let ofwObj = JSON.parse(response[0].is_ofw);
        if(ofwObj.is_ofw === "no"){
            $("#no_ofw").prop("checked", true);
        }
        else if(ofwObj.is_ofw !== "no"){
            $("#yes_ofw").prop("checked", true);
            $(".input_ofw_country").val(ofwObj.is_ofw);
        }
        $("input[name='is_ofw']").val(JSON.stringify(ofwObj));

        let formerOfwObj = JSON.parse(response[0].is_former_ofw);
        if(formerOfwObj.is_former_ofw === "no"){
            $(".no_former_ofw").prop("checked", true);
        }
        else if(formerOfwObj.is_former_ofw !== "no"){
            $(".yes_former_ofw").prop("checked", true);
            $(".ofw_former_country").val(formerOfwObj.country);
            $(".month_year_return_ph").val(formerOfwObj.month_year);
        }
        $("input[name='is_former_ofw']").val(JSON.stringify(formerOfwObj));


        let beneficiary4psObj = JSON.parse(response[0].is_4ps_beneficiary);
        // console.log(beneficiary4psObj);
        if(beneficiary4psObj.is_4ps_beneficiary === "no"){
            $(".no_4ps_beneficiary").prop("checked", true);
        }
        else if(beneficiary4psObj.is_4ps_beneficiary === "yes"){
            $(".yes_4ps_beneficiary").prop("checked", true);
            $(".4ps_household_no").val(beneficiary4psObj.household_no)
        }
        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(beneficiary4psObj));
    
        // Job preference
        let preferredOccupationObj = JSON.parse(response[0].preferred_occupation);
        if(preferredOccupationObj.type_preferred_occupation === "part time"){
            $("#part-time").prop("checked", true);
        }
        else if(preferredOccupationObj.type_preferred_occupation === "full time"){
            $("#full-time").prop("checked", true);
        }
        $("input[name='preferred_occupation']").val(response[0].preferred_occupation);
    
        let occupationObj = JSON.parse(response[0].occupation);
        if(occupationObj.occupation1 !== ""){
            $(".preferred_occupation1").val(occupationObj.occupation1);
        }
        if(occupationObj.occupation2 !== ""){
            $(".preferred_occupation2").val(occupationObj.occupation2);
        }
        if(occupationObj.occupation3 !== ""){
            $(".preferred_occupation3").val(occupationObj.occupation3);
        }
        $("input[name='occupation']").val(response[0].occupation);

        let preferredWorkOccupationObj = JSON.parse(response[0].preferred_work_occupation);
        if(preferredWorkOccupationObj.type_work_occupation === "local"){
            $("#local").prop("checked", true);
        }
        else if(preferredWorkOccupationObj.type_work_occupation === "overseas"){
            $("#overseas").prop("checked", true);
        }
        $("input[name='preferred_work_occupation']").val(response[0].preferred_work_occupation);
    
        let workLocationObj = JSON.parse(response[0].work_occupation);
        if(workLocationObj.location1 !== ""){
            $(".location1").val(workLocationObj.location1);
        }
        if(workLocationObj.location2 !== ""){
            $(".location2").val(workLocationObj.location2);
        }
        if(workLocationObj.location3 !== ""){
            $(".location3").val(workLocationObj.location3);
        }
        $("input[name='work_occupation']").val(response[0].work_occupation);

        let objEnglish = JSON.parse(response[0].language1);
        if(objEnglish !== "{}"){
            for(let key in objEnglish.english){
                if(key === "read"){
                    $(".english_read").prop("checked", true);
                }
                if(key === "write"){
                    $(".english_write").prop("checked", true);
                }
                if(key === "speak"){
                    $(".english_speak").prop("checked", true);
                }
                if(key === "understand"){
                    $(".english_understand").prop("checked", true);
                }
            }
        }
        $("input[name='language1']").val(response[0].language1);

        let objFilipino = JSON.parse(response[0].language2);
        if(objFilipino !== "{}"){
            for(let key in objFilipino.filipino){
                if(key === "read"){
                    $(".filipino_read").prop("checked", true);
                }
                if(key === "write"){
                    $(".filipino_write").prop("checked", true);
                }
                if(key === "speak"){
                    $(".filipino_speak").prop("checked", true);
                }
                if(key === "understand"){
                    $(".filipino_understand").prop("checked", true);
                }
            }
        }
        $("input[name='language2']").val(response[0].language2);

        let objMandarin = JSON.parse(response[0].language3);
        if(objMandarin !== "{}"){
            for(let key in objMandarin.mandarin){
                if(key === "read"){
                    $(".mandarin_read").prop("checked", true);
                }
                if(key === "write"){
                    $(".mandarin_write").prop("checked", true);
                }
                if(key === "speak"){
                    $(".mandarin_speak").prop("checked", true);
                }
                if(key === "understand"){
                    $(".mandarin_understand").prop("checked", true);
                }
            }
        }
        $("input[name='language3']").val(response[0].language3);

        // $(".checkbox_other_language").prop("disabled", false)
        let otherLangObj = JSON.parse(response[0].other_language);
        if(otherLangObj !== "{}"){
            for(let key in otherLangObj){
                $(".input_other_language").val(key);

                for(let key2 in (otherLangObj[key])){
                    if(key2 === "read"){
                        $(".other_language_read").prop("checked", true);
                    }
                    if(key2 === "write"){
                        $(".other_language_write").prop("checked", true);
                    }
                    if(key2 === "speak"){
                        $(".other_language_speak").prop("checked", true);
                    }
                    if(key2 === "understand"){
                        $(".other_language_understand").prop("checked", true);
                    }
                }
            }
        }

        // Educational background
        $("input[name='elementary_school']").val(response[0].elementary_school);
        $("input[name='elementary_course']").val(response[0].elementary_course);
        $("input[name='elementary_year_graduated']").val(response[0].elementary_year_graduated);
        let elemUndergrad = JSON.parse(response[0].if_elementary_undergraduate);
        if(elemUndergrad !== "{}"){
            // console.log(elemUndergrad);
            $(".elem_what_level").val(elemUndergrad.what_level);
            $(".elem_last_year_attended").val(elemUndergrad.last_year_attended);
            $(".elem_awards_received").val(elemUndergrad.awards_received);
        }
        $("input[name='if_elementary_undergraduate']").val(response[0].if_elementary_undergraduate);
        
        $("input[name='secondary_school']").val(response[0].secondary_school);
        $("input[name='secondary_course']").val(response[0].secondary_course);
        $("input[name='secondary_year_graduated']").val(response[0].secondary_year_graduated);        
        let secondaryUndergrad = JSON.parse(response[0].if_secondary_undergraduate);
        if(secondaryUndergrad !== "{}"){
            // console.log(elemUndergrad);
            $(".secondary_what_level").val(secondaryUndergrad.what_level);
            $(".secondary_last_year_attended").val(secondaryUndergrad.last_year_attended);
            $(".secondary_awards_received").val(secondaryUndergrad.awards_received);
        }
        $("input[name='if_secondary_undergraduate']").val(response[0].if_secondary_undergraduate);

        $("input[name='tertiary_school']").val(response[0].tertiary_school);
        $("input[name='tertiary_course']").val(response[0].tertiary_course);
        $("input[name='tertiary_year_graduated']").val(response[0].tertiary_year_graduated);  
        let tertiaryUndergrad = JSON.parse(response[0].if_tertiary_undergraduate);
        if(tertiaryUndergrad !== "{}"){
            // console.log(elemUndergrad);
            $(".tertiary_what_level").val(tertiaryUndergrad.what_level);
            $(".tertiary_last_year_attended").val(tertiaryUndergrad.last_year_attended);
            $(".tertiary_awards_received").val(tertiaryUndergrad.awards_received);
        }
        $("input[name='if_tertiary_undergraduate']").val(response[0].if_tertiary_undergraduate);
        
        $("input[name='graduate_studies_school']").val(response[0].graduate_studies_school);
        $("input[name='graduate_studies_course']").val(response[0].graduate_studies_course);
        $("input[name='graduate_studies_year_attended']").val(response[0].graduate_studies_year_attended);        
        let graduateStudiesUndergrad = JSON.parse(response[0].if_graduate_studies_undergraduate);
        if(graduateStudiesUndergrad !== "{}"){
            // console.log(elemUndergrad);
            $(".graduate_studies_what_level").val(graduateStudiesUndergrad.what_level);
            $(".graduate_studies_last_year_attended").val(graduateStudiesUndergrad.last_year_attended);
            $(".graduate_studies_awards_received").val(graduateStudiesUndergrad.awards_received);
        }
        $("input[name='if_graduate_studies_undergraduate']").val(response[0].if_graduate_studies_undergraduate);

        // Technical/Vocational And Other Training
        let techVocObj = JSON.parse(response[0].course);
        if(techVocObj.course1 !== ""){

        }
    },
    error: function(error){
        console.error(error);
    }
})