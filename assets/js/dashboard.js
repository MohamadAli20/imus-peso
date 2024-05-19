$(document).ready(function(){

	/* Change icon when view or delete icon is hovered over */
	let deleteGray = "/images/delete_gray.svg"; 
    let deleteRed = "/images/delete_red.svg";
    $(".deleteIcon").hover(
        function(){
            $(this).attr("src", deleteRed);
        },
        function(){
            $(this).attr("src", deleteGray);
        }
    );
	let viewGray = "/images/view_gray.svg"; 
    let viewRed = "/images/view_green.svg";
    $(".viewIcon").hover(
        function(){
            $(this).attr("src", viewRed);
        },
        function(){
            $(this).attr("src", viewGray);
        }
    );

	/* Display the result every time the inputs search is changed */
	/* To be fix: Use session to use one controller for default and search application by name */
	$(".search").on("input", function(){
		let searchVal = $(this).val().trim();
		if(searchVal !== ""){
			$.ajax({
				url: "/search/"+searchVal,
				type: "POST",
				data: { searchVal },
				success: function(response){
					console.log(response.length);
					$(".application").remove();
					for(let i = 0; i < response.length; i++){
						let container = document.createElement("div");
						container.className = "row py-2 application";

						let div1 = document.createElement("div");
						div1.className = "col-lg-3 col-md-3 col-sm-3 col-2";
						div1.textContent = response[i].id;

						let div2 = document.createElement("div");
						div2.className = "col-lg-3 col-md-3 col-sm-3 col-7";
						div2.textContent = response[i].firstname + " " + response[i].surname;

						container.append(div1);
						container.append(div2);

						$(".content").append(container);

						/* Footer */
						$("a").remove();
						
						for(let page = 1; page <=  Math.ceil(response.length/9); page++){
							let a = document.createElement("a");
							a.setAttribute("href", "/dashboard/"+page);
							a.textContent = page;
							$("footer").append(a);
						}
					}
				},
				error: function(error){
					console.error(error);
				}
			});
		}
		if(searchVal === ""){
			location.reload();
		}
	});

	/*  */
	let selectedApplication;
	$(".deleteIcon").click(function(){
		selectedApplication = $(this).parent().parent();
	});

	$("#btnDelete").click(function(){
		let id = $(selectedApplication).find("input[name='applicationId']").val();
		$.ajax({
			url: "/delete/" + id,
			type: "DELETE",
			success: function(response){
				if(response){
					window.location.href = "/dashboard";
				}
			},
			error: function(error){
				console.error(error);
			}
		});
	});

});