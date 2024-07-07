$(document).ready(function(){
    let grayDownloadIcon = '/images/download.svg';
    let greenDownloadIcon = '/images/download-green.svg';
    $(".download-icon").hover(
        function(){
            $(".download-icon").attr("src", greenDownloadIcon);
        },
        function(){
            $(".download-icon").attr("src", grayDownloadIcon);
        }
    );

    // Filter table
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    $.ajax({
        url: "/get_all_record",
        type: "GET",
        // data: { year: year, month: month },
        success: function(response){
            if(response.length > 0){
                // birthdate: "2000-06-09"
                // created_at: "2024-07-07T05:13:17.000Z"
                // employment_status: "{\"employment_status\":\"employed\",\"employed_type\":\"self employed\",\"job\":{\"job1\":\"vendor/retailer\"}}"
                // firstname:"Maria Clara"
                // surname: "Protacio"
                // gender: "female"
                // status: "pending"
                // user_id: 5
                for(let i = 0; i < response.length; i++){
                    let dobString = response[i].birthdate;
                    let dob = new Date(dobString);
                    let today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    if (today.getMonth() < dob.getMonth() ||
                        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
                    age--;
                    }

                    let dateString = response[i].created_at;
                    let dateObj = new Date(dateString);
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"];
                    let monthName = monthNames[dateObj.getMonth()];
                    let day = dateObj.getDate();
                    let year = dateObj.getFullYear();

                    
                    // create html tags
                    let tr = document.createElement("tr");
                    let thId = document.createElement("th");
                    thId.setAttribute("scope", "row");
                    thId.textContent = response[i].user_id;
                    tr.append(thId);

                    let name = response[i].firstname + " " + response[i].surname;
                    let tdName = document.createElement("td");
                    tdName.textContent = name;
                    tr.append(tdName);

                    let tdAge = document.createElement("td");
                    tdAge.textContent = age;
                    tr.append(tdAge);

                    let tdDateSubmission = document.createElement("td");
                    tdDateSubmission.textContent = `${monthName} ${day}, ${year}`;
                    tr.append(tdDateSubmission);

                    let tdGender = document.createElement("td");
                    tdGender.textContent = response[i].gender.charAt(0).toUpperCase() + response[i].gender.slice(1).toLowerCase();
                    tr.append(tdGender);

                    let employmentStatusObj = JSON.parse(response[i].employment_status).employment_status;
                    let tdEmploymentStatus = document.createElement("td");
                    tdEmploymentStatus.textContent = employmentStatusObj.charAt(0).toUpperCase() + employmentStatusObj.slice(1).toLowerCase();
                    tr.append(tdEmploymentStatus);

                    let tdApplicationStatus = document.createElement("td");
                    tdApplicationStatus.textContent = response[i].status.charAt(0).toUpperCase() + response[i].status.slice(1).toLowerCase();
                    tr.append(tdApplicationStatus);

                    $("tbody").append(tr)
                }
            }
        },
        error: function(error){
            console.error(error);
        }
    })
});