$(document).ready(function(){
	$(".a_menu1").click(function() {
		var th=$(this);
		$(th).next().slideToggle("fast",function(){
			$(th).parent().siblings().find(".div2").slideUp();
			$(th).parent().siblings().find(".triangle-right").slideUp();
			$(th).parent().siblings().find(".div1").slideUp("fast",function(){
				$(th).css({"color":"#b68168"});
				$(th).parent().siblings().find(".a_menu1").css({"color":"#373232"});
			});
		});
		
	});
	$(".a_menu2").click(function(){
		var th2=$(this);
		$(th2).css({"color":"#b68168"}).nextAll().slideToggle("fast",function(){
			$(th2).parent().siblings().find(".div2").slideUp("fast",function(){
				$(th2).css({"color":"#b68168"});
				$(th2).parent().siblings().find(".a_menu2").css({"color":"#373232"});
			});
			$(th2).parent().siblings().find(".triangle-right").slideUp("fast");
		});
	});
});