$(document).ready(function(){

	$(".search").on("input", function(){
		let searchVal = $(".search").val();
		$.ajax({
			url: "/search/"+searchVal,
			type: "POST",
			data: { searchVal },
			success: function(response){
				if(response){
					location.reload();
				}
				
			},
			error: function(error){
				console.error(error);
			}
		})
	})
});