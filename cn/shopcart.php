<?php include_once('header.php');?>
	<title>购物车 - 利美钻石</title>
</head>
<link rel="stylesheet" type="text/css"  href="./css/jquery.datetimepicker.css">
<script type="text/javascript" src="./js/jquery.datetimepicker.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="css/jquery.fancybox.min.css"> -->
<!-- <script type="text/javascript" src="js/jquery.fancybox.min.js"></script> -->

<body onload="popup();">
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
function popup(id) {
	//获得已经预约的钻石
	$.ajax({
		type : "get",
		url : "action.php?action=appointmentList",
		complete : function() {
		},
		success : function(json) {
			$("#appointmentList").html('');
			var data=eval(json);
			var i = 0;
			$.each(data, function (n, j) {
			    var item ='<div class="pro_pics">';
				if(j.jewellery_id>0)
					item +='<div class="pic_00"><img width=122 height=122 src="../images/sitepictures/'+j.image1+'"/>';
				else
					item +='<div class="pic_00"><img src="images/pic_01.png"/>';
		        item +='    <div class="quxiao" >';
		        item +='        <img class="removeApp" id="'+j.id+'" onclick="removeAppointment(this)" src="images/close.png"/>';
		        item +='    </div>';
	            item +='</div>';
				item += '<div class="detail">';
				if(j.jewellery_id>0)
					item += '<p>'+j.name_ch+'</p>';
				else
                	item += '<p>'+j.shapeTxt+'裸钻</p>';
                item += '<p>'+j.diamond_carat+'克拉</p>';
                item += '<p>颜色：'+j.diamond_color+'</p>';
                item += '<p>净度：'+j.diamond_clarity+'</p>';
                item += '<p>切工：'+j.diamond_cut+'</p>';
                item += '<p>抛光：'+j.diamond_polish+'</p>';
                item += '<p>对称性：'+j.diamond_symmetry+'</p>';
                item += '<p>证书：'+j.grading_lab+'</p>';
                item += '<p>编号：'+j.stock_ref+'</p>';
                item += '<p>价格：'+Math.round(j.diamond_price)+'美元</p>';
                if(j.grading_lab=="HRD"){
                	item += '<a class="certi_linker" target="_black" href="http://www.hrdantwerplink.be/index.php?record_number='+j.certificate_number+'&weight=&L="><img id="gradinglabicon" src="./images/HRD.png" width="98" height="37" /></a>';
                }else if(j.grading_lab=='GIA'){
                	item += '<a class="certi_linker" target="_black" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='+j.certificate_number+'"><img id="gradinglabicon" src="./images/GIA.png" width="98" height="37"/></a>';
                } else if(j.grading_lab=='IGI'){
                	item += '<a class="certi_linker" target="_black" href="http://www.igiworldwide.com/igi/verify.php?r='+j.certificate_number+'"><img id="gradinglabicon" src="./images/IGI.png" width="98" height="37"/></a>';
                }
                item += '<p>点击查看证书</p>';
                item += '</div></div>';
                i = i+1;
				$("#appointmentList").prepend(item);
				if(i==5)
					$("#pro_pics").html("");
			});
		},
		error : function() {
			alert('载入数据失败！');
		}
	});
}
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