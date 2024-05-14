$(document).ready(function(){

     /*
    * OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING
    */
     $("#input_other_skills").change(function(){
        let val = $("#input_other_skills").val();
        $("input[name='other_skills']").val(val);
    });

})