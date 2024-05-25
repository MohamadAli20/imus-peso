$(document).ready(function(){

    let isAdmin = localStorage.getItem('isAdmin');
    if(isAdmin == 1){
        window.location.href = "/dashboard";
    }
    if(isAdmin == 0){
        window.location.href = "/";
    }
    if(isAdmin == null){
        // window.location.href = "/";
    }
    // $(".apply-now").click(function(){
        
    // });

});