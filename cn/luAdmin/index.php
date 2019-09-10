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



if(isset($_POST['content_en']) && isset($_POST['content_ch'])){
	
	include('nuke_magic_quotes.php');
	
	$content_en=$_POST['content_en'];
	$content_ch=$_POST['content_ch'];
	$title_en=$_POST['title_en'];
	$title_ch=$_POST['title_ch'];
	
	
	
	require_once('../connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	$sql_insert='INSERT INTO news (title_en, title_ch, content_en, content_ch) 
	VALUES(:title_en, :title_ch, :content_en, :content_ch)';
	
	
	$stmt=$conn->prepare($sql_insert);	  
	$stmt->bindParam(':title_en', $title_en, PDO::PARAM_STR);
	$stmt->bindParam(':title_ch', $title_ch, PDO::PARAM_STR);
	$stmt->bindParam(':content_en', $content_en, PDO::PARAM_STR);
	$stmt->bindParam(':content_ch', $content_ch, PDO::PARAM_STR);
	
	$stmt->execute();
	$OK=$stmt->rowCount();
	
	
	if($OK){
		$message_db="发布成功";
		//echo "db ok";
	}else{
		//echo "db no ok";
		$error=$stmt->errorInfo();
			if(isset($error[2])){
				$error=$error[2];
				//echo $error;
			}
	}	
}

?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>最新消息发布</title>
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
	

</style>
<script src="/cn/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="tinymce/tinymce.min.js"></script>
<script type="text/javascript">
tinymce.init({
    selector: "textarea",
	theme: "modern",
    width: 650,
    height: 300,
    plugins: [
         "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
         "save table contextmenu directionality emoticons template paste textcolor"
    ],
    toolbar: "insertfile undo redo | fontsizeselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons"
 });
</script>

<script type="text/javascript">
$(document).ready(function(){
	
	$("#submit_article").click(function(){
		
			$("form#uploadArticle").submit();
		
	});
});


function formcomplete(){
	
	
	if($.trim($('#title').val())==''){
		alert('没有标题！');
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

<h1>最新消息发布</h1>

<p style="padding-right:58px; text-align:right; position:fixed; top:200px; right:0; width:180px; z-index:8;"><a target="_blank" style="position:relative; display:inline-block; text-decoration:none; color:#FFF; background-color:#CC6699; padding:25px 38px; border-radius:6px; white-space:nowrap;" href="upload_sitepics.php">打开图片上传页面</a></p>

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








<form action="" method="post" id="uploadArticle">
  
 
  <p>  
  <label for="title_ch">题目（中文）</label> <span></span><br />          
  <input type="text" name="title_ch" style="width:500px;" />
  <br />          
  <label for="content_ch">消息内容（中文）</label> <span></span>
  <br />          
  <textarea name="content_ch" class="maitext" id="content_ch" cols="60" rows="8"></textarea>  
  <br />
  提示：回车键换段落，shift＋回车键 为换行
  </p>
  
  
  
  <p> 
  <label for="title_en">题目（英文）</label> <span></span><br />          
  <input type="text" name="title_en" style="width:500px;" /><br />  
  
  <label for="content_en">消息内容（英文）</label> <span></span>
  <br />          
  <textarea name="content_en" class="maitext" id="content_en" cols="60" rows="8"></textarea>  
  
  </p>
  
  
  
  <p>
    <button type="button" id="submit_article" style="font-size:24px; font-weight:bold; padding:5px 20px; background-color:#CC6699; color:#FFF;"> 提交文章 </button>
  </p>
  <br /><br /><br /><br /><br />
</form>







</body>
</html>