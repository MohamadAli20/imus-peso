$(document).ready(function(){

    let isShow = 0;
    $(".navbar-toggler").click(function(){
        if(isShow === 0){
            $(".carousel-control-next").css("display", "none");
            $(".carousel-control-prev").css("display", "none");
            isShow = 1;
        }
        else{
            $(".carousel-control-next").css("display", "block");
            $(".carousel-control-prev").css("display", "block")           
            isShow = 0;
        }
    })
    // Listen for the popstate event to handle back navigation
    window.addEventListener('popstate', function(event) {
        let isAdmin = localStorage.getItem('isAdmin');

        if(isAdmin === null){
            window.location.href = "/";
        }
    });

});