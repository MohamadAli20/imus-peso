$(document).ready(function(){
    // Forward arrow click handler
    $(document).on('click', "#arrow-forward", function(){
        $(".form-section").animate({left: '0px'})
        $('#arrow-forward').remove();
        
        let img = $('<img id="arrow-back" src="/images/arrow_back.svg" alt="Arrow back icon">');
        $("#arrow-icon").append(img);
    });

    // Back arrow click handler using event delegation
    $(document).on('click', '#arrow-back', function(){
        $(".form-section").animate({left: '-200px'});
        $('#arrow-back').remove();
        
        let img = $('<img id="arrow-forward" src="/images/arrow_forward.svg" alt="Arrow forward icon">');
        $("#arrow-icon").append(img);
    });

    $("input[type='date']").change(function() {
        $(this).css('color', 'black');
    });

    // $('input[placeholder]').placeholderLabel({

    //     // placeholder color
    //     placeholderColor: "#898989", 
    
    //     // label color
    //     labelColor: "#4AA2CC",
    
    //     // size of label
    //     labelSize: "14px",
    
    //     // font style
    //     fontStyle: "normal", 
    
    //     // uses border color
    //     useBorderColor: true, 
    
    //     // displayed in the input
    //     inInput: true, 
    
    //     // time to move
    //     timeMove: 200 
        
    //   });
        
});
