$(document).ready(function(){
	$("#txt_login").click(function() {
		var th=$(this);
		$(th).val("");
		$(th).css({"color":"black"});
		$(th).parents(".div_login").children("#error-message").hide();
	});
});