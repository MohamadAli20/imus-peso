$(document).ready(function(){
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for(let day = 1; day <= daysInMonth; day++){
        let date = new Date(currentYear, currentMonth, day);
        let dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        $('#daysTableBody').append(
            '<tr>' +
                '<th scope="row">' + dateString + '</th>' +
                '<td class="applicant">0</td>' +
                '<td class="employed">0</td>' +
                '<td class="unemployed">0</td>' +
            '</tr>'
        );
    };

    $.ajax({
        url: "/get_all_application",
        type: "GET",
        success: function(response){
            let date = new Date(currentYear, currentMonth);
            let dateString = date.toLocaleDateString('en-US', { month: 'long' });
        
            $("#month").append(dateString.toLocaleUpperCase());
            $(".total-applicant-number").append(response.length);
            if(response.length > 0){
                let dayCol = document.querySelectorAll("tbody tr th");
                let applicantCol = document.querySelectorAll(".applicant");
                let employedCol = document.querySelectorAll(".employed");
                let unemployedCol = document.querySelectorAll(".unemployed");
                for(let i = 0; i < response.length; i++){
                    let dayNum = (parseInt(response[i].day) - 1)
                    // $(dayCol)[dayNum].textContent = parseInt(response[i].day);
                    $(applicantCol)[dayNum].textContent = response[i].total_records;
                    $(employedCol)[dayNum].textContent = response[i].total_employed;
                    $(unemployedCol)[dayNum].textContent = response[i].total_unemployed;
                }
            }
        },
        error: function(error){
            console.error(error);
        }
    });

    $(".generate-report").click(function(){
        // alert("Generate Report!");
        $.ajax({
            url: '/generate_report',
            type: 'GET',
            success: function(response){
                console.log(response);
            },
            error: function(error){
                console.error(error);
            }
        });
    });
});