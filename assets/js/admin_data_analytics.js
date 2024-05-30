window.onload = async function () {

    let total;
    let totalMale;
    let totalFemale;

    try {
        const response1 = await $.ajax({
            url: "/count_form",
            type: "GET"
        });
        total = parseInt(response1.total);
        $(".total_form").append(response1.total);

        const response2 = await $.ajax({
            url: "/count_male",
            type: "GET"
        });
        totalMale = (parseInt(response2.total_male)/total) * 100;

        const response3 = await $.ajax({
            url: "/count_female",
            type: "GET"
        })
        totalFemale = (parseInt(response3.total_female)/total) * 100;

    } catch (error) {
        console.error(error);
    }

    /* TOTAL APPLICATION AND TOTAL GENDER (MALE AND FEMALE) */
    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });
    let options = {
        title: {
            text: "Application Summary"
        },
        subtitles: [{
            text: `As of ${monthName}, ${date.getFullYear()} there are ${total} applications submitted`
        }],
        theme: "light2",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: totalMale, label: "Male" },
                { y: totalFemale, label: "Female" },
            ]
        }]
    };
    $("#pieGraph").CanvasJSChart(options); /* Add data to the graph */
    
    /*UNEMPLOYED*/
    let unemployedPieGraph = {
        title: {
            text: "Unemployed"
        },
        subtitles: [{
            text: `As of ${monthName}, ${date.getFullYear()}`
        }],
        theme: "light2",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: []
        }]
    };
    let unemployed_data_points = unemployedPieGraph.data[0].dataPoints;
    try{
        const arr = await $.ajax({
            url: "/get_top_unemployed",
            type: "GET"
        })
        
        let unemployed = arr.unemployed
        for(let i = 0; i < unemployed.length; i++){
            let empType = unemployed[i].unemployed_type;
            let yValue = Math.round(parseInt(unemployed[i].count)/total * 100);
            unemployed_data_points.push({ y: yValue, label: empType });
        }

    } catch (error) {
        console.error(error);
    }
    $("#unemployedPieGraph").CanvasJSChart(unemployedPieGraph); /* Add data to the graph */
    
    /*PREFERRED OCCUPATION*/
    var employmentStatus = {
        animationEnabled: true,
        title: {
            text: `Preferred Occupation - ${date.getFullYear()}`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: "Occupation"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let data_points = employmentStatus.data[0].dataPoints;

    try{
        const response5 = await $.ajax({
            url: "/get_top_five_occupation",
            type: "GET"
        })
        let len = response5.occupation.length;
        for(let i = 0; i < len; i++){
            let occupation = response5.occupation[i].occupation;
            let yValue = Math.round(parseInt(response5.occupation[i].count)/total * 100);

            data_points.push({ label: occupation, y: yValue })
        }

    } catch (error) {
        console.error(error);
    }

    $("#barGraph").CanvasJSChart(employmentStatus); /* Add data to the graph */

    /* LOCATION */
    
    
    /*PREFERRED WORK LOCATION*/
    var workLocation = {
        animationEnabled: true,
	title: {
		text: "Preferred Work Location",                
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
        let len = locations.location.length;
        for(let i = 0; i < len; i++){
            let location = locations.location[i].work_occupation;
            let count = parseInt(locations.location[i].count);
            let yValue = Math.round((count / total) * 100); // Round to nearest integer
            // let yValue = (parseInt(locations.location[i].count)/total * 100);

            // location_data_points.push({ label: location, y: yValue })
            location_data_points.push({ y: yValue, label: `${yValue}%`, indexLabel: location });
            // console.log(locations.location[i].work_occupation)
        }

    } catch (error) {
        console.error(error);
    }
    $("#location").CanvasJSChart(workLocation);
    
    
};
