<?php
/*===================session========================*/
session_start();

// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit();
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit();
}


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>钻石目录</title>
<link href="style.css" rel="stylesheet" type="text/css">
<style type="text/css">
body{
	background-color:#F6F6F8;
}
#piccontainer{
	position:relative;
	width:350px;
}
div.picbox{
	text-align:center;
	padding:12px;
	border-style:solid;
	border-color:#CC6699;
	border-width:2px;
	margin-bottom:8px;
	font-size:12px;
}
img.theimg{
	width:120px;
	margin-bottom:3px;
}
span.suc_indi{
	position:absolute;
	display:inline-block;
	background-color:#C90;
	border-radius:6px;
	top:5px;
	left:5px;
	padding:5px 12px;
	color:#FFF;
}
.progress{
	display:none;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="formplugin.js"></script>
<script type="text/javascript">
var crr_idofpic;
var crr_picnumber;
var crr_idv;
$(document).ready(function(){
	
	
	
	$('input.image_selecting').change(function(e) {
		
		var crr_obj=$(this);
		
		e.preventDefault(); 
		//check first if the file extension is correct
		var filefullpath=$(this).val();
		var dotposition=filefullpath.lastIndexOf('.');
		var extension=filefullpath.substring(dotposition);
		if(extension=='.jpg' || extension=='.jpe' || extension=='.jpeg' || extension=='.JPG' || extension=='.JPEG' || extension=='.JPE' || extension=='.gif' || extension=='.GIF' || extension=='.png' || extension=='.PNG'){
			$('div.progress').fadeIn('fast');
			crr_obj.parent('form').submit();
		}else{
			alert("图片格式不支持，请上传. JPEG,. GIF 或. PNG 图片.");
		}		
	});
	
	
	
		
	(function(){
	var bar = $('.progress .bar');
	var percent = $('.progress .percent');
	var status = $('#status');	  
		$('form.uploadImage').ajaxForm({
			beforeSend: function() {
				status.empty();
				var percentVal = '0%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			uploadProgress: function(event, position, total, percentComplete) {
				
				var percentVal = percentComplete + '%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			complete: function(xhr) {
				
				$('div#uploadingIndication').fadeOut('fast');
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					var imgname=status.find("p#imagename").html();
					$('#piccontainer').prepend('<div class="picbox"><img class="theimg" src="../images/sitepictures/'+imgname+'" /><br />链接:<input type="text" style="width:320px" value="../images/sitepictures/'+imgname+'" /></div>');
					$('div.progress').fadeOut('slow');
					$('.suc_indi').delay(1500).fadeOut('slow');
					
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
	
});



</script>
</head>

<body>

<h3>上传站内图片</h3>




<p style="margin-bottom:5px;">为钻石添加图片与视频:</p>
<div style='width:320px; padding:25px 15px; background-color:#CCC; margin-bottom:35px;'>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage" class="uploadImage"> 
<label>选择本地图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="sitemedia">
<input type="file" name="image" class="image_selecting">                
</form>
</div>

<div class="progress" style="width:350px;">
    <div class="bar"></div >
    <div class="percent" style="display:none;">0%</div >
</div>

<?php

$sql="SELECT * FROM site_pics ORDER BY submitted_at DESC LIMIT 58";

$ooh=$conn->query($sql);
?>
<span>最近上传的图片:</span>
<div id="piccontainer">

<?php
foreach($ooh as $row){
?>
<div class="picbox">
<img class="theimg" src="../images/sitepictures/<?php echo $row['image']; ?>" />
<br />

链接:<input type="text" style="width:320px" value="../images/sitepictures/<?php echo $row['image']; ?>" />
</div>
<?php
}
?>

</div>


<div id="status" style="display:none"></div>
<div id="iframecontainer" style="display:none;"></div>
<p style="height:50px;">&nbsp;</p>



</body>
</html>