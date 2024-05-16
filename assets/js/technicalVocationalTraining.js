// let coursesObj = JSON.parse($("input[name='courses']").val());
// let institutionsObj = JSON.parse($("input[name='institutions']").val());
// let dateFromObj = JSON.parse($("input[name='date_from']").val());
// let dateTObj = JSON.parse($("input[name='date_to']").val());
// let certificatesObj = JSON.parse($("input[name='certificated']").val());

let coursesObj = {
    course1: "",
    course2: "",
    course3: ""
};
let institutionsObj = {
    institution1: "",
    institution2: "",
    institution3: ""
}
let dateFromObj = {
    dateFrom1: "",
    dateFrom2: "",
    dateFrom3: ""
};
let dateToObj = {
    dateTo1: "",
    dateTo2: "",
    dateTo3: ""
};
let certificatesObj = {
    certificate1: "", 
    certificate2: "",
    certificate3: ""
}

$(".courses").on("input", function(){
    let course = $(this).val();
    
});