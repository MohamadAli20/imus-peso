$(document).ready(function(){

    let show = false;
    $("#username").click(function(){
        if(!show){
            $(".account-info-container").css("display", "block");
            show = true;
            $(".notification-container").css("display", "none");
        }
        else if(show){
            $(".account-info-container").css("display", "none");
            show = false;
        }
    });

    // Get the modal
    var modal = document.getElementById("accountModal");
    var notificationContainer = document.getElementById("notificationContainer");

    // Get the trigger elements
    var username = document.getElementById("username");
    var notifLogo = document.getElementById("notifLogo");
    var navLoginBtn = document.getElementById("navLoginBtn");

    // Add a click event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the click is outside the modal and the trigger elements
        if (!modal.contains(event.target) && 
            !notificationContainer.contains(event.target) && 
            event.target !== username && 
            event.target !== navLoginBtn && 
            !username.contains(event.target) &&
            !notifLogo.contains(event.target)) {
            // Hide the modal
            modal.style.display = "none";
            // Hide the notification container
            notificationContainer.style.display = "none";
        }
    });

    $("input[type='date']").change(function() {
        $(this).css('color', 'black');
    });

    let userId = localStorage.getItem("userId");
    let refreshProfileInfo = () => {
        $.ajax({
            url: "/user_account",
            type: "POST",
            data: { id: userId },
            success: function(response){
                let input;
                let label;
                if(response[0].username !== ""){
                    input = $("input[name='username']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].username);
                }
                if(response[0].firstname !== ""){
                    input = $("input[name='firstname']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].firstname);
                }
                if(response[0].lastname !== ""){
                    input = $("input[name='surname']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].lastname);
                }
                if(response[0].email !== ""){
                    input = $("input[name='email']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].email);
                }
                if(response[0].phonenumber !== ""){
                    input = $("input[name='phonenumber']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].phonenumber);
                }
                if(response[0].birthdate !== ""){
                    input = $("input[name='birthdate']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].birthdate);
                    $(input).css("color", "black");
                }
                if(response[0].civil_status !== ""){
                    select = $("select[name='civil_status']");
                    label = $(select).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(select).val(response[0].civil_status);
                    $(select).css("color", "black");
                }
                // console.log(response[0].image_path)
                if(response[0].image_path !== null){
                    $(".image").attr("src", "/"+response[0].image_path);
                }
            },
            error: function(error){
                console.error(error);
            }
        });
    }
    refreshProfileInfo();

    $(".btn-edit").click(function(e){
        e.preventDefault();

        let disabledInput = document.querySelectorAll("input");
        let disabledSelect = document.querySelectorAll("select");
        $(disabledInput).css("border", "1px solid #5cb85c");
        $(disabledSelect).css("border", "1px solid #5cb85c");        
        $(disabledInput).prop("disabled", false);
        $(disabledSelect).prop("disabled", false);

        $(".btn-edit").prop("disabled", false);
        $(".btn-account-save").prop("disabled", false);
    });
    $("#btn-save-account").click(function(e){
        // Create a FormData object
        let formData = new FormData();

        let id = localStorage.getItem("userId");
        let username = $("input[name='username']").val();
        let surname = $("input[name='surname']").val();
        let firstname = $("input[name='firstname']").val();
        let email = $("input[name='email']").val();
        let phonenumber = $("input[name='phonenumber']").val();
        let birthdate = $("input[name='birthdate']").val();
        let civilStatus = $("select[name='civil_status']").val();
        
        formData.append("id", id);
        formData.append("username", username);
        formData.append("surname", surname);
        formData.append("firstname", firstname);
        formData.append("email", email);
        formData.append("phonenumber", phonenumber);
        formData.append("birthdate", birthdate);
        formData.append("civil_status", civilStatus);
            

        if($('input[type="file"]').val()){
            console.log("There's image selected.");
    
            let imageFile = $("input[name='image']")[0].files[0]; // Get the first file (if multiple files are allowed)
            formData.append("image", imageFile);
        }
        else{
            // alert("No image is selected.");
        }
        $.ajax({
            url: "/update_user_by_id",
            type: "POST",
            data: formData,
            processData: false, // Prevent jQuery from automatically processing data
            contentType: false, // Set content type to false for FormData
            success: function(response){
                console.log(response);
            },
            error: function(error){
                console.error(error);
            }
        });

        location.reload();

        let enabledInput = $(".account-container").find("input");
        let enabledSelect = $(".account-container").find("select");        
        $(enabledInput).prop("disabled", true);
        $(enabledSelect).prop("disabled", true);

        $(enabledInput).css("border", "1px solid #898989");
        $(enabledSelect).css("border", "1px solid #898989");
    
        $(".btn-edit").prop("disabled", false);
        $(".btn-account-save").prop("disabled", false);
    });
});