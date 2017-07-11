<?php include_once('header.php');?>
	<title>购物车 - 利美钻石</title>
</head>
<link rel="stylesheet" type="text/css"  href="./css/jquery.datetimepicker.css">
<script type="text/javascript" src="./js/jquery.datetimepicker.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="css/jquery.fancybox.min.css"> -->
<!-- <script type="text/javascript" src="js/jquery.fancybox.min.js"></script> -->

<body onload="popup(0);">
<div class="zhuti clear">
	<?php
		include_once('topbar.php');
	?>
	<div class="contain">
	<?php include('orderPopup.php'); ?>
	</div>
</div>


<?php include_once('footer.php');?>
</body>
<script>
var date = new Date ();
date.setHours (date.getHours () + 1)
$(function () {
	$('#datetimepicker').datetimepicker();
	$("#datetimepicker").val(date.toLocaleString ());
});
</script>
<script>
$(function () {
// 	$("[data-fancybox]").fancybox({
// 		iframe : {
// 			tpl : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
// 			preload : true,
// 			// Scrolling attribute for iframe tag
// 			scrolling : 'yes',
// 			// Custom CSS styling for iframe wrapping element
// 			css : {}
// 		},
// 		beforeLoad: function(){
// 		 $("body").css({"overflow-y":"hidden"});
// 		},
// 		afterClose: function(){
// 		 $("body").css({"overflow-y":"visible"});
// 		}
// 	});
	$("#skype").hover(function(){ $("#skype").attr("src","images/skype_on.gif"); },function(){ $("#skype").attr("src","images/skype.gif"); });
	$("#phone").hover(function(){ $("#phone").attr("src","images/phone_on.gif"); },function(){ $("#phone").attr("src","images/phone.gif"); });
});
</script>
</html>