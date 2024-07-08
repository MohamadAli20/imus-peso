$(document).ready(async function(){
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    $.ajax({
        url: "/get_all_application",
        type: "POST",
        data: { month: currentMonth, year: currentYear, gender: "male" },
        success: function(response) {
            let total = 0;
            for(let i = 0; i < response.length; i++){
                total += response[0].total_records;
            }
           $("#total_applicants").text(total);
        },
        error: function(error) {
            console.error(error);
        }
    });

    $.ajax({
        url: '/count_male',
        type: 'GET',
        success: function(response){
            $("#total_male").text(response.total_male);
        },
        error: function(error){
            console.error(error);
        }
    });

    $.ajax({
        url: '/count_female',
        type: 'GET',
        success: function(response){
            $("#total_female").text(response.total_female);
        },
        error: function(error){
            console.error(error);
        }
    });

    $.ajax({
        url: '/count_unemployed',
        type: 'GET',
        success: function(response){
            $("#total_unemployed").text(response.total_unemployed);
        },
        error: function(error){
            console.error(error);
        }
    })

    $.ajax({
        url: '/count_per_status_application',
        type: 'GET',
        success: function(response){
            let totalPending = 0;
            let totalOnProcess = 0;
            let totalRejected = 0;
            let totalAccepted = 0;
            for(let i = 0; i < response.length; i++){
                let status = response[i].status;
                let total = response[i].total;
                if(status === 'pending'){
                    totalPending = total;
                }
                else if(status === 'on-process'){
                    totalOnProcess = total;
                }
                else if(status === 'rejected'){
                    totalRejected = total;
                }
                else if(status === 'accepted'){
                    totalAccepted = total;
                }
            }
            $("#total_on_process").text(totalOnProcess);
            $("#total_accepted").text(totalAccepted);
            $("#total_rejected").text(totalRejected);
        },
        error: function(error){
            console.error(error);
        }
    })

    /*TOP 10 POSITION*/
    var topPosition = {
        animationEnabled: true,
	title: {
		text: "Top 10 Job Experienced of Applicants",            
		fontColor: "Peru"
	},	
	axisY: {
		tickThickness: 0,
		lineThickness: 0,
		valueFormatString: " ",
		includeZero: true,
		gridThickness: 0                    
	},
	axisX: {
		tickThickness: 0,
		lineThickness: 0,
		labelFontSize: 18,
		labelFontColor: "Peru"				
	},
	data: [{
		indexLabelFontSize: 16,
		toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
		indexLabelPlacement: "inside",
		indexLabelFontColor: "orange",
		indexLabelFontWeight: 600,
		indexLabelFontFamily: "Verdana",
		color: "#32393d",
		type: "bar",
		dataPoints: []
	}]
    }
    
    let positionDataPoints = topPosition.data[0].dataPoints;
    try{
        const position = await $.ajax({
            url: "/get_top_position",
            type: "GET"
        })
        let positionArr = position.position;
        let totalPosition = 0;
        for(let j = 0; j < positionArr.length; j++){
            totalPosition += parseInt(positionArr[j].count);
        }
        for(let i = 0; i < positionArr.length; i++){
            let position = positionArr[i].position;
            let positionYValue = Math.round((parseInt(positionArr[i].count)/totalPosition) * 100); // Round to nearest integer
            positionDataPoints.push({ y: positionYValue, label: `${positionYValue}%`, indexLabel: position.toUpperCase() });
        }

    } catch (error) {
        console.error(error);
    }
    $("#topPosition").CanvasJSChart(topPosition);

     /*PREFERRED WORK LOCATION*/
     var workLocation = {
        animationEnabled: true,
	title: {
		text: "Top 10 Preferred Work Location of Applicants",                
		fontColor: "Peru"
	},	
	axisY: {
		tickThickness: 0,
		lineThickness: 0,
		valueFormatString: " ",
		includeZero: true,
		gridThickness: 0                    
	},
	axisX: {
		tickThickness: 0,
		lineThickness: 0,
		labelFontSize: 18,
		labelFontColor: "Peru"				
	},
	data: [{
		indexLabelFontSize: 16,
		toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
		indexLabelPlacement: "inside",
		indexLabelFontColor: "black",
		indexLabelFontWeight: 600,
		indexLabelFontFamily: "Verdana",
		color: "#62C9C3",
		type: "bar",
		dataPoints: []
	}]
    }
    
    let location_data_points = workLocation.data[0].dataPoints;
    try{
        const locations = await $.ajax({
            url: "/get_top_five_location",
            type: "GET"
        })
        let locationArr = locations.location;
        let totalLocation = 0;
        for(let j = 0; j < locationArr.length; j++){
            totalLocation += parseInt(locationArr[j].count);
        }
        for(let i = 0; i < locationArr.length; i++){
            // {work_occupation: 'MANILA', count: 3}
            let location = locationArr[i].work_occupation;
            let locationYValue = Math.round(parseInt(locationArr[i].count)/totalLocation * 100);

            location_data_points.push({ label: locationYValue + "%", y: locationYValue, indexLabel: location })
        }
    } catch (error) {
        console.error(error);
    }
    $("#location").CanvasJSChart(workLocation);
    
    /*TOP COMPANY*/
    var topCompany = {
        animationEnabled: true,
        title: {
            text: `Top 10 Company Work Experience of Applicants`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: "Companies"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let topCompanyDataPoints = topCompany.data[0].dataPoints;
    try{
        const topCompany = await $.ajax({
            url: "/get_top_company",
            type: "GET"
        })
        let companyArr = topCompany.company;
        console.log(companyArr)
        let totalCompany = 0;
        for(let j = 0; j < companyArr.length; j++){
            totalCompany += parseInt(companyArr[j].count);
        }
        console.log(totalCompany);
        for(let i = 0; i < companyArr.length; i++){
            // {company_name: '"Toei Animation"', count: 1}
            let company = companyArr[i].company_name;
            let companyYValue = Math.round(parseInt(companyArr[i].count)/totalCompany * 100);

            topCompanyDataPoints.push({ label: company.toUpperCase(), y: companyYValue })
        }
    } catch (error) {
        console.error(error);
    }

    $("#topCompany").CanvasJSChart(topCompany); /* Add data to the graph */

    // TOP SKILLS
    var skillGraph = {
        animationEnabled: true,
        title: {
            text: `Most Other Skills Acquired with Formal Training of Applicants`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: ""
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let skillDataPoints = skillGraph.data[0].dataPoints;
    try{
        const topSkill = await $.ajax({
            url: "/get_top_skill",
            type: "GET"
        })
        let totalSkill = 0;
        for(let j = 0; j < topSkill.length; j++){
            totalSkill += parseInt(topSkill[j].skill_count);
        }
        // console.log(totalSkill);
        for(let i = 0; i < topSkill.length; i++){
            let skill = topSkill[i].skill;
            console.log(skill)
            let skillYValue = Math.round(parseInt(topSkill[i].skill_count)/totalSkill * 100);

            skillDataPoints.push({ label: skill.toUpperCase(), y: skillYValue })
        }
        $("#skillGraph").CanvasJSChart(skillGraph);
    }
    catch(error){
        console.error(error);
    }
});