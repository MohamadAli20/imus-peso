$(document).ready(function(){

    let isAdmin = localStorage.getItem('isAdmin');
    let checkAccount = () => {
        if(isAdmin == 1){
            window.location.href = "/dashboard";
        }
        if(isAdmin == 0){
            window.location.href = "/";
        } 
    }
    checkAccount();
    
    $(".apply-now").click(function(){
        // checkAccount();
        if(isAdmin == null){
            $("#navLoginBtn").trigger('click');
        }
        else{
            window.location.href = "/apply"
        }
    });

});