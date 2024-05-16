// let coursesObj = JSON.parse($("input[name='courses']").val());
// let institutionsObj = JSON.parse($("input[name='institutions']").val());
// let dateFromObj = JSON.parse($("input[name='date_from']").val());
// let dateTObj = JSON.parse($("input[name='date_to']").val());
// let certificatesObj = JSON.parse($("input[name='certificated']").val());

let coursesObj = {};
let dateFromObj = {};
let dateToObj = {};
let institutionsObj = {};
let certificatesObj = {};

let courses = document.querySelectorAll(".courses");
let dateFrom = document.querySelectorAll(".date_from");
let dateTo = document.querySelectorAll(".date_to");
let institutions = document.querySelectorAll(".institutions");
let certificates = document.querySelectorAll(".certificates");

let addCourses = () => {
    let num = 1;
    for(let i = 0; i < courses.length;i++){
        let inputCourse = $(courses)[i];
        coursesObj[`course${num}`] = $(inputCourse).val();
        num++;
    }
}
let addDateFrom = () => {
    let num = 1;
    for(let j = 0; j < dateFrom.length; j++){
        let inputDateFrom = $(dateFrom)[j];
        dateFromObj[`date_from${num}`] = $(inputDateFrom).val();
        num++;
    }
}
let addDateTo = () => {
    let num = 1;
    for(let k = 0; k < dateTo.length; k++){
        let inputDateTo = $(dateTo)[k];
        dateToObj[`date_to${num}`] = $(inputDateTo).val();
        num++;
    }
}
let addInstitutions = () => {
    let num = 1;
    for(let l = 0; l < institutions.length; l++){
        let inputInstitutions = $(institutions)[l];
        institutionsObj[`institution${num}`] = $(inputInstitutions).val();
        num++;
    }
}
let addCertificates = () => {
    let num = 1;
    for(let m = 0; m < certificates.length; m++){
        let inputCertificates = $(certificates)[m];
        certificatesObj[`certificate${num}`] = $(inputCertificates).val();
        num++;
    }
}

$("input").on("input", function(){
    /* call these function to update object value */
    addCourses();
    addDateFrom();
    addDateTo();
    addInstitutions();
    addCertificates();

    // console.log(coursesObj);
    // console.log(dateFromObj);
    // console.log(dateToObj);
    // console.log(institutionsObj);
    // console.log(certificatesObj);

    /* Update input tag value */
    $("input[name='courses']").val(JSON.stringify(coursesObj));
    $("input[name='institutions']").val(JSON.stringify(institutionsObj));
    $("input[name='date_from']").val(JSON.stringify(dateFromObj));
    $("input[name='date_to']").val(JSON.stringify(dateToObj));
    $("input[name='certificates']").val(JSON.stringify(certificatesObj));
    
});