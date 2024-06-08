$(document).ready(function(){
    let close = true;
    $(".visible-password").click(function(){
        $("input[name='password']").attr("type", "text");
        $(".visible-password").attr("src", "/images/visibility.svg");        
    })
    $(".visible-confirm-password").click(function(){
        $("input[name='confirm_password']").attr("type", "text");
        $(".visible-confirm-password").attr("src", "/images/visibility.svg");
    })
});