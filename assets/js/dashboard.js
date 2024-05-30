$(document).ready(function(){

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
					// localStorage.setItem('total', response.length);
					$(".application").remove();
					for(let i = 0; i < response.length; i++){
						/* container*/
						let container = document.createElement("div");
						container.className = "row py-2 application";

						let divId = document.createElement("div");
						divId.className = "col-lg-3 col-md-3 col-sm-3 col-2";
						divId.textContent = response[i].id;

						let divName = document.createElement("div");
						divName.className = "col-lg-3 col-md-3 col-sm-3 col-7";
						divName.textContent = response[i].firstname + " " + response[i].surname;

						let divEmail = document.createElement("div");
						divEmail.className = "col-lg-3 col-md-3 col-sm-3 email";
						divEmail.textContent = response[i].email

						let divAction = document.createElement("div");
						divAction.className = "col-lg-3 col-md-3 col-sm-3 col-3 action";

						let a = document.createElement("a");
						a.setAttribute("href", "/view_application/"+response[i].id);

						let viewIcon = document.createElement("img");
						viewIcon.className = "viewIcon";
						viewIcon.setAttribute("src", "/images/view_gray.svg");
						viewIcon.setAttribute("alt", "View icon");

						a.append(viewIcon);
						divAction.append(a);

						let deleteIcon = document.createElement("img");
						deleteIcon.className = "deleteIcon";
						deleteIcon.setAttribute("src", "/images/delete_gray.svg");
						deleteIcon.setAttribute("alt", "Delete icon");
						deleteIcon.setAttribute("data-bs-toggle", "modal");
						deleteIcon.setAttribute("data-bs-target", "#deleteModal");

						divAction.append(deleteIcon);

						container.append(divId);
						container.append(divName);
						container.append(divEmail);
						container.append(divAction);

						$(".content").append(container);

						/* Footer */
						$("footer a").remove();
						
						// for(let page = 1; page <=  Math.ceil(response.length/9); page++){
						// 	let a = document.createElement("a");
						// 	a.setAttribute("href", "/dashboard/"+page);
						// 	a.textContent = page;
						// 	$("footer").append(a);
						// }
					}
				},
				error: function(error){
					console.error(error);
				}
			});
		}
		if(searchVal === ""){
			// localStorage.setItem('total', '');
			location.reload();
		}
	});
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
	/*  */
	let selectedApplication;
	$(".deleteIcon").click(function(){
		selectedApplication = $(this).parent().parent();
	});
	/* Delete */
	$("#btnDelete").click(function(){
		let id = $(selectedApplication).find("input[name='applicationId']").val();
		$.ajax({
			url: "/delete/" + id,
			type: "DELETE",
			success: function(response){
				console.log(response);
				if(response){
					window.location.href = "/dashboard";
				}
			},
			error: function(error){
				console.error(error);
			}
		});
	});

	/* Download */
	$(".download-button").click(function(){
		
		// e.preventDefault();
		let id = $(this).parent().parent().find("input").val();

		$.ajax({
			url: "/retrieve_by_id/"+id,
			type: "GET",
			success: function(response){
				if(response.length > 0 ){
					
					$.ajax({
						url: "/download_form",
						type: "POST",
						data: { response },
						success: function(response){
							// console.log(response);
						}, 
						error: function(error){
							console.error(error);
						}
					})
		
				}
			},
			error: function(error){
				console.error(error);
			}
		})
	});
});