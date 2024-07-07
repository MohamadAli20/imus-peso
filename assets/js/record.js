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
    let genderVal = "";
    let employmentStatusVal = "";
    let applicationStatusVal = ""
    let retrievedData = () => {
        // Filter table
        $.ajax({
            url: "/get_all_record",
            type: "POST",
            data: { gender: genderVal, employment_status: employmentStatusVal, application_status: applicationStatusVal},
            success: function(response){
                if(response.length > 0){
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
    }
    retrievedData();
    $("select[name='filter-record']").change(function(){
        let value = $(this).val();
        if(value.toLowerCase() === "male" || value.toLowerCase() === "female"){
            employmentStatusVal = "";
            applicationStatusVal = "";
            genderVal = value;
        }
        if(value.toLowerCase() === "employed" || value.toLowerCase() === "unemployed"){
            genderVal = "";
            applicationStatusVal = "";
            employmentStatusVal = value;
        }
        if(value.toLowerCase() === "accepted" || value.toLowerCase() === "rejected"){
            genderVal = "";
            employmentStatusVal = "";
            applicationStatusVal = value;
        }
        if(value === ""){
            genderVal = "";
            employmentStatusVal = "";
            applicationStatusVal = "";
        }
        $("tbody").children().remove();
        retrievedData();
    })

    let downloadInProgress = false;
    $(".download-icon").click(function() {
        if (downloadInProgress) {
            console.log("Download already in progress.");
            return;
        }

        downloadInProgress = true;
        $.ajax({
            url: '/download_record',
            type: 'POST',
            data: { 
                gender: genderVal, 
                employment_status: employmentStatusVal 
            },
            xhrFields: {
                responseType: 'blob'
            },
            success: function(response) {
                const todayFile = new Date();
                const yearFile = todayFile.getFullYear();
                const monthFile = todayFile.getMonth() + 1;
                const dayFile = todayFile.getDate();

                const formattedMonth = monthFile < 10 ? `0${monthFile}` : monthFile;
                const formattedDay = dayFile < 10 ? `0${dayFile}` : dayFile;
                const filename = `Record-${yearFile}-${formattedMonth}-${formattedDay}.pdf`;

                const blob = new Blob([response], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = `${filename}.pdf`;

                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                downloadInProgress = false;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error: ' + textStatus, errorThrown);
                downloadInProgress = false;
            }
        });
    });

});