$(document).ready(function() {
    console.log("hdhfdh");
    let isAdmin = localStorage.getItem('isAdmin');
    
    // Function to check account status and redirect accordingly
    let checkAccount = () => {
        console.log("checkAccount called, isAdmin:", isAdmin);
        
        if(isAdmin === '1'){
            console.log("Redirecting to /dashboard");
            window.location.href = "/dashboard";

            return true;
        } 
        else if(isAdmin === '0'){
            console.log("Redirecting to /");
            // window.location.href = "/";
            return true;
        }
        else if(isAdmin === null && isAdmin === undefined){
            console.log("Redirecting to /");
            // window.location.href = "/";
            return false;
        }


    
    };
    
    // Perform account check once when the document is ready
    checkAccount();
    
    // Event handler for the .apply-now button click
    $(".peso-link").click(function() {

        if (isAdmin === null) {
            $("#navLoginBtn").trigger('click');
        } 
        else{
            // localStorage.setItem("url", "/peso");
            window.location.href = "/peso";
        }

        console.log($(this));
    });
    $(".about-link").click(function() {
        if (isAdmin === null) {
            $("#navLoginBtn").trigger('click');
        } 
        else {
            window.location.href = "/about";
        }
    });
    $(".apply-now").click(function(e) {
        e.preventDefault();
        let result = checkAccount();
        console.log(result);
        if (isAdmin === null) {
            $("#navLoginBtn").trigger('click');
        }
        if(result === true){
            window.location.href = "/apply";
        }
    });
    
});
