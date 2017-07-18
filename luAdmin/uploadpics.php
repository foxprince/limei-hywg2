<?php
/*===================session========================*/
session_start();

if(isset($_POST['logout'])){
	if(isset($_SESSION['authenticated'])){
			$_SESSION=array();
			if (isset($_COOKIE[session_name()])){
			    setcookie(session_name(), '', time()-86400, '/');
			}
			session_destroy();
	 }
	 header('Location: login.php');
     exit;
}

// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit;
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit;
}

?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>上传图片</title>
<style>
body{
	font-family:Georgia, "Times New Roman", Times, serif;
	font-size:14px;
	font-weight:100;
	}

h1{
	position:relative;
	left:40px;
	font-family:Verdana, Geneva, sans-serif;
	font-weight:bold;
	font-size:20px;
	color:#000;
	margin-top:0px;
}
form{
	position:relative;
	left:40px;
	}

p{
	margin-top:30px;
	}
label{
	background-color:#CFF;
	}
.formbox{
	width:450px;}
.alert{
	font-family:"Courier New", Courier, monospace;
	font-size:14px;
	color:#F00;
	position:relative;
	left:40px;}
span{
	color:#F00;
	}
.logout{
	position:absolute;
	left:100%;
	top:20px;
	margin-left:-58px;}
.mnavic{
	position:absolute;
	left:380px;
	top:20px;
	}
.mnavic a{
	margin:10px;
	padding-left:5px;
	padding-right:5px;
	cursor:pointer;
	}
.mnavi{
	background-color:#CFF;
	border-style:outset;
	border-width:2px;
	font-family:Verdana, Geneva, sans-serif;
	font-size:12px;
	text-decoration: none;
	color:#000;
	}
.instruction{
	background-color:#FF9;
	color:#000;
	font-weight:bold;
	}
	
.progress { position:relative; width:260px; border: 1px solid #AAA; padding: 1px; border-radius: 3px; margin:12px 0px; display:none;}
.bar { background-color:#CCC; width:0%; height:13px; border-radius: 3px; background-image:url(../../_0_image_elements/animated-overlay.gif); }
.percent { position:absolute; display:inline-block; top:3px; left:48%; font-size:10px; display:none;}
#footer{
	margin:30px auto;
}
</style>
<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="formplugin.js"></script>


<script type="text/javascript">
$(document).ready(function(){
	
	$('input.image_selecting').change(function(e) {
		e.preventDefault(); 
		//check first if the file extension is correct
		var filefullpath=$(this).val();
		var dotposition=filefullpath.lastIndexOf('.');
		var extension=filefullpath.substring(dotposition);
		if(extension=='.jpg' || extension=='.jpe' || extension=='.jpeg' || extension=='.JPG' || extension=='.JPEG' || extension=='.JPE' || extension=='.gif' || extension=='.GIF' || extension=='.png' || extension=='.PNG'){
			$("#uploadImage").submit();
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
				status.html(xhr.responseText);

				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					
					var imagename=status.find("p#imagename").html();
					
					$("#img"+imagewhere).attr('src',('../images/contentimgs/'+imagename));
					$("#thepic").html(imagename);			
				}else{					
					alert("Er is een onbekende fout opgetreden. Probeer het opnieuw.");											  
				}
			}
		}); 
	})();
	
	
	
	
	$("#submit_article").click(function(){
		if(formcomplete()){
			$("form#addnewjewelry").submit();
		}
	});
});


function formcomplete(){
	
	
	if($.trim($('#name_ch').val())=='' || $.trim($('#name_en').val())==''){
		alert('请输入名称！');
		return false;
	}
	
	if($('#cate').val()=='undefined'){
		alert('请选择类别！');
		return false;
	}
	
	return true;
}

</script>


</head>

<body>
<!--
<div class="mnavic">

<a class="mnavi" href="index.php">SUBMISSION</a><a class="mnavi" href="list.php">MANAGEMENT</a>
<a class="mnavi" href="banner.php">BANNER</a>
</div>
-->
<?php
include('navi.php');
?>
<hr />

<h1>上传钻石图片</h1>
<?php 
if(isset($failure)){
    echo "<p class='alert'>"."$failure"."</p>";
}
if(isset($error)){
	//print_r($error);
    echo "<p class='alert'>"."$error"."</p>";
}
if(isset($message_db)){
	echo "<p class='alert'>"."$message_db"."</p>";
}


?>










<div class="picture" style="position:relative;">
    <form action="uploadingimag_save.php" method="post" enctype="multipart/form-data" id="uploadImage" class="uploadImage"> 
    <label>添加图片:</label>
        <img id="img" width="58" src="../images/contentimgs/noimage.jpg" />
        <input type="file" name="image" id="image_selecting" class="image_selecting">                
    </form>
    
    <p id="pic_name_label"><span>图片名称: </span><span id="thepic"></span></p>
    
    <div class="progress" style="width:140px; position:absolute; top:120px; left:750px;">
        <div class="bar"></div >
        <div class="percent">0%</div >
    </div>    
</div>


  
  
  
<form class="logout" action="" method="post" > 
     <input type="submit" name="logout" id="logout" value="logout">
</form>
<div id="status" style="display:none"></div>
<!--
<iframe height=218 width=310 src="http://player.youku.com/embed/XNjA4MzI1NTAw" frameborder=0 allowfullscreen></iframe>
-->
<br /><br /><br /><br /><br /><br />
</body>
</html>