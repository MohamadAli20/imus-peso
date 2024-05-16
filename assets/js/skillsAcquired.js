/*
* OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING
*/
let skillsObj = {};

$(".skills").click(function() {
    let skill = $(this).val();
    
    if ($(this).prop("checked")) {
        if (skillsArr.indexOf(skill) === -1) {
            skillsArr.push(skill);
        }
    } else {
        let index = skillsArr.indexOf(skill);
        if (index !== -1) {
            skillsArr.splice(index, 1);  // Remove the skill if it is unchecked
        }
    }
    
    $("input[name='skills_acquired']").val(JSON.stringify(skillsArr));
});

$(".other_skill").click(function() {
    let otherSkill = $(".input_other_skill").val();
    
    if ($(this).prop("checked")) {
        if(otherSkill !== "" && skillsArr.indexOf(otherSkill) === -1) {
            skillsArr.push(otherSkill);
        }
    } else {
        let index = skillsArr.indexOf(otherSkill);
        if (index !== -1) {
            skillsArr.splice(index, 1);  // Remove the skill if it is unchecked
        }
    }
    
    $("input[name='skills_acquired']").val(JSON.stringify(skillsArr));
});

$(".input_other_skill").on("input", function() {
    let oldSkill = $(".input_other_skill").data("oldSkill");
    let newSkill = $(this).val();
    
    if ($(".other_skill").prop("checked")) {
        if (oldSkill && skillsArr.indexOf(oldSkill) !== -1) {
            // Remove the old skill from the array
            skillsArr.splice(skillsArr.indexOf(oldSkill), 1);
        }
        
        if (newSkill && skillsArr.indexOf(newSkill) === -1) {
            // Add the new skill to the array
            skillsArr.push(newSkill);
        }
    }
    
    // Store the new skill as the old skill for the next input event
    $(".input_other_skill").data("oldSkill", newSkill);
    
    $("input[name='skills_acquired']").val(JSON.stringify(skillsArr));
});
