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
        <div class="pro_pics" >
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
    		<div style="width:12%;display:inline-block;">
    		<img src="images/kefuqrcode-small.gif">
    		</div>
    		<div style="width:20%;display:inline-block;">
    		<a href="callto://Belgem.antwerp"><img id="skype" src="images/skype.gif"></a>
		    		<a href="tel:+32(0)36897394"><img id="phone" src="images/phone.gif"></a>
    		</div>
    		<div style="width:33%;display:inline-block;">
		    	<p>在您选购钻石首饰的过程中如有疑问</p>
		    	<p>欢迎致电或添加我们的客服微信号咨询</p>
		    	<p>微信号limeikefu或直接扫描二维码添加</p>
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
		//获得已经预约的钻石
		$.ajax({
			type : "post",
			url : "action.php?action=appointmentMakeAll",
			data: $('#appointmentForm').serialize(),
			complete : function() {
				// layer.close(page_layer);
			},
			success : function(json) {
				$('#appointmentResult').html(json);
			},
			error : function() {
				alert('载入数据失败！');
			}
		});
		$('#diaId').val(id);
		//popToggle();
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
                item += '<p>价格：'+j.diamond_price+'欧元</p>';
                item += '</div></div>';
				$("#appointmentList").prepend(item);
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