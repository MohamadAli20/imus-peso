$(document).ready(function() {
    let isAdmin = localStorage.getItem('isAdmin');
    
    // Function to check account status and redirect accordingly
    let checkAccount = () => {
        console.log("checkAccount called, isAdmin:", isAdmin);
        
        if(isAdmin === '1' && window.location.pathname !== "/dashboard"){
            console.log("Redirecting to /dashboard");
            window.location.href = "/dashboard";
        } 
        else if(isAdmin === '0' && window.location.pathname !== "/"){
            console.log("Redirecting to /");
            window.location.href = "/";
        }
        else if(isAdmin === null && window.location.pathname !== "/"){
            console.log("Redirecting to /");
            window.location.href = "/";
        }
    };
    
    // Perform account check once when the document is ready
    checkAccount();
    
    // Event handler for the .apply-now button click
    $(".apply-now").click(function() {
        if (isAdmin === null) {
            $("#navLoginBtn").trigger('click');
        } else {
            window.location.href = "/apply";
        }
    });
});
