$(document).ready(function() {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    let daysInMonth = getDaysInMonth(currentYear, currentMonth);

    let currentDate = (daysInMonth, currentYear, currentMonth) => {
        $('#daysTableBody').find("tr").remove();
        for (let day = 1; day <= daysInMonth; day++) {
            let date = new Date(currentYear, currentMonth, day);
            let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            
            $('#daysTableBody').append(
                '<tr>' +
                    '<th scope="row" class="text-center">' + dateString + '</th>' +
                    '<td class="applicant text-center">0</td>' +
                    '<td class="employed text-center">0</td>' +
                    '<td class="unemployed text-center">0</td>' +
                '</tr>'
            );
        };
    }
    
    currentDate(daysInMonth, currentYear, currentMonth);

    let retrieveMonthlyReport = (currentMonth, currentYear) => {
        // console.log(currentMonth, currentYear);
        $.ajax({
            url: "/get_all_application",
            type: "POST",
            data: { month: currentMonth, year: currentYear },
            success: function(response) {
                let date = new Date(currentYear, currentMonth);
                let dateString = date.toLocaleDateString('en-US', { month: 'long' });
            
                // $("#month").text(dateString.toLocaleUpperCase());
                // console.log(dateString, currentMonth)
                let monthOption = $("select[name='month']").find("option");
                for(let i = 0; i < monthOption.length; i++){
                    let val = $(monthOption)[i];
                    if(currentMonth == $(val).val()){
                        $(val).prop("selected", true);
                        break;
                    }
                }
                let yearOption = $("select[name='year']").find("option");
                for(let i = 0; i < yearOption.length; i++){
                    let val = $(yearOption)[i];
                    if(currentYear == $(val).val()){
                        $(val).prop("selected", true);
                        break;
                    }
                }

                $(".total-applicant-number").text(response.length);
                if (response.length > 0) {
                    let dayCol = document.querySelectorAll("tbody tr th");
                    let applicantCol = document.querySelectorAll(".applicant");
                    let employedCol = document.querySelectorAll(".employed");
                    let unemployedCol = document.querySelectorAll(".unemployed");
                    for (let i = 0; i < response.length; i++) {
                        let dayNum = (parseInt(response[i].day) - 1);
                        $(applicantCol)[dayNum].textContent = response[i].total_records;
                        $(employedCol)[dayNum].textContent = response[i].total_employed;
                        $(unemployedCol)[dayNum].textContent = response[i].total_unemployed;
                    }
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    
    retrieveMonthlyReport(currentMonth, currentYear);

    $("select[name='month']").click(function() {
        currentMonth = parseInt($("select[name='month']").val());
        currentYear = parseInt($("select[name='year']").val());
        daysInMonth = getDaysInMonth(currentYear, currentMonth);
        currentDate(daysInMonth, currentYear, currentMonth);
        retrieveMonthlyReport(currentMonth, currentYear);
    });

    $("select[name='year']").click(function() {
        currentMonth = parseInt($("select[name='month']").val());
        currentYear = parseInt($("select[name='year']").val());
        daysInMonth = getDaysInMonth(currentYear, currentMonth);
        currentDate(daysInMonth, currentYear, currentMonth);
        retrieveMonthlyReport(currentMonth, currentYear);
    });

    $(".generate-report").click(function(e) {
        $.ajax({
            url: '/generate_report',
            type: 'GET',
            data: { month: currentMonth, year: currentYear },
            xhrFields: {
                responseType: 'blob' // This is important to handle binary data
            },
            success: function(response) {
                const url = window.URL.createObjectURL(new Blob([response]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'form.pdf'; // Specify the filename for download
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error: ' + textStatus, errorThrown);
            }
        });
        e.preventDefault();
    });
});
