<?php include_once('header.php');?>
	<title>购物车 - 利美钻石</title>
</head>
<link rel="stylesheet" type="text/css"  href="./css/jquery.datetimepicker.css">
<script type="text/javascript" src="./js/jquery.datetimepicker.js"></script>
<body>
<div class="zhuti clear">
	<?php
		include_once('topbar.php');
	?>
	<div class="contain">
			<div class="layout" id="makeOrder">
    <div class="l-top"><img src="images/yuyue_button.png"/></div>
    <div class="l-middle" >
        <div id="appointmentList"></div>
        <div id="pro_pics"class="pro_pics" >
            <div class="add_pic" id="add_pic"><div class="fonts"><a href="dia.php">追加商品</a></div></div>
        </div>
    </div>
    <form id="appointmentForm" >
<?php
$userid=$_SESSION['useraccount'];
$user_info='select name,tel,email from clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$name=$r_u['name'];
	$email=$r_u['email'];
	$tel=$r_u['tel'];
}
?>
    <div class="l-input" id="appointmentDiv">
        <div class="linput" style="height: 30px;">
            <div class="linputs"><label>真实姓名：</label><input type="text" name="name" value="<?php echo $name;?>"/></div>
            <div class="rinputs"><label>电子邮件：</label><input type="text" name="email" value="<?php echo $email;?>"/></div>
        </div>
        <div>
            <div class="linputs"><label>手机号：</label><input type="text" name="tel" value="<?php echo $tel;?>"/></div>
            <div class="rinputs"><label>预约时间：</label><input type="text" name="viewTime"  placeholder="点击选择" id="datetimepicker" value="">
            </div>
        </div>
        <br>
        <br>
        <div style="text-align:center;">
        	<p id="appointmentResult"></p>
        </div>
        <div class="l-bottom" id="appointmentBottom">
	        <input type="hidden" name="appointmentId" id="appointmentId"/>
	        <input type="button" value="" id="sub_btn" onclick="appointment();"/>
    	</div>
    	<div class="contacticonsbox" style="width:100%;height:100%;text-align:center;position:relative; padding-left:0; margin-left:0; left:0;">
    		<div  style="width:80%;height:100%;text-align:center;vertical-align:top;">
    		<div style="width:1%;display:inline-block;vertical-align:top;font-size: 14px;">在线客服</div>
    		<div style="width:12%;display:inline-block;">
    		<img src="images/kefuqrcode.jpg" width="81" height="79">
    		</div>
    		<div style="width:20%;display:inline-block;vertical-align:top;">
    		<a href="callto://Belgem.antwerp"><img id="skype" src="images/skype.gif"></a>
		    		<a href="tel:+32(0)36897394"><img id="phone" src="images/phone.gif"></a>
    		</div>
    		<div style="width:33%;display:inline-block;vertical-align:top;">
		    	<p>在您选购钻石首饰的过程中如有疑问</p>
		    	<p>欢迎致电或添加我们的客服微信号咨询</p>
		    	<p>微信号limeikefu或直接扫描二维码添加</p>
		   	</div>
    		</div>
    	</div>
    	
    </div>
    </form>
</div>
	</div>
</div>
<script>
popup();
var date = new Date ();
date.setHours (date.getHours () + 1)
	$("#datetimepicker").val(date.toLocaleString ());
	$('#datetimepicker').datetimepicker();
	function appointment(id) {
		if(Cookies.get('userId')===undefined){
			alert("请登录之后到购物车之内复查您的预约并继续操作。");
			window.location.href="login.php";
		}
		else {
			$.ajax({
				type : "post",
				url : "action.php?action=appointmentMakeAll",
				data: $('#appointmentForm').serialize(),
				complete : function() {
					// layer.close(page_layer);
				},
				success : function(json) {
					$('#appointmentResult').html(json);
					$('#appointmentBottom').html('');
				},
				error : function() {
					alert('载入数据失败！');
				}
			});
		}
	}
	function removeAppointment(item) {
		$.ajax({
			type : "get",
			url : "action.php?action=removeAppointment&id="+$(item).attr('id'),
			success : function(json) {
				remove(item);
				$("#pro_pics").html('<div class="add_pic" id="add_pic"><div class="fonts"><a href="dia.php">追加商品</a></div></div>');
			}
		});
	}
	function remove(item) {
		$(item).parent().parent().parent().fadeOut();
	}
function popup(id) {
	//获得已经预约的钻石
	$.ajax({
		type : "get",
		url : "action.php?action=appoinmentList",
		complete : function() {
		},
		success : function(json) {
			$("#appointmentList").html('');
			var data=eval(json);
			var i = 0;
			$.each(data, function (n, j) {
			    var item ='<div class="pro_pics">';
	            item +='<div class="pic_00"><img src="images/pic_01.png"/>';
		        item +='    <div class="quxiao" >';
		        item +='        <img class="removeApp" id="'+j.id+'" onclick="removeAppointment(this)" src="images/close.png"/>';
		        item +='    </div>';
	            item +='</div>';
				item += '<div class="detail">';
                item += '<p>圆形裸钻</p>';
                item += '<p>'+j.diamond_carat+'克拉</p>';
                item += '<p>颜色：'+j.diamond_color+'</p>';
                item += '<p>净度：'+j.diamond_clarity+'</p>';
                item += '<p>切工：'+j.diamond_cut+'</p>';
                item += '<p>抛光：'+j.diamond_polish+'</p>';
                item += '<p>对称性：'+j.diamond_symmetry+'</p>';
                item += '<p>证书：'+j.grading_lab+'</p>';
                item += '<p>编号：'+j.stock_ref+'</p>';
                item += '<p>价格：'+Math.round(j.diamond_price)+'欧元</p>';
                if(j.grading_lab=="HRD"){
                	item += '<a class="certi_linker" target="_blank" href="http://www.hrdantwerplink.be/index.php?record_number='+j.certificate_number+'&weight=&L="><img id="gradinglabicon" src="./images/hrd.gif" /></a>';
                }else if(j.grading_lab=='GIA'){
                	item += '<a class="certi_linker" target="_blank" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='+j.certificate_number+'"><img id="gradinglabicon" src="./images/gia.gif" /></a>';
                } else if(j.grading_lab=='IGI'){
                	item += '<a class="certi_linker" target="_blank" href="http://www.igiworldwide.com/igi/verify.php?r='+j.certificate_number+'"><img id="gradinglabicon" src="./images/igi.gif" /></a>';
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
<?php include_once('footer.php');?>
</body>
</html>