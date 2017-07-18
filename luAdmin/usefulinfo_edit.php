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


if(!isset($_GET['id'])){
	exit('error: id needed');
}

$id=$_GET['id'];

require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql_get='SELECT * FROM usefulinfo WHERE id = "'.$id.'"';
foreach($conn->query($sql_get) as $row){
	$category=$row['category'];
	$title_en=$row['title_en'];
	$title_ch=$row['title_ch'];
	
	$text_en=$row['text_en'];
	$text_ch=$row['text_ch'];
}



if(isset($_POST['content_en']) && isset($_POST['content_ch'])){
	
	include('nuke_magic_quotes.php');
	
	$category=$_POST['category'];
	$title_en=$_POST['title_en'];
	$title_ch=$_POST['title_ch'];
	
	$text_en=$_POST['content_en'];
	$text_ch=$_POST['content_ch'];
	$main_image_ch=$_POST['main_image_ch'];
	$main_image_en=$_POST['main_image_en'];
	
	
	$sql_update='UPDATE usefulinfo SET category = ?, title_en = ?, title_ch = ?, text_en = ?, text_ch = ?, main_image_ch = ?, main_image_en = ? WHERE id = ?';
	
	
	$stmt=$conn->prepare($sql_update);	  
	
	$stmt->execute(array($category, $title_en, $title_ch, $text_en, $text_ch, $main_image_ch, $main_image_en, $id));
	$OK=$stmt->rowCount();
	
	
	if($OK){
		$message_db="更新成功";
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
<title>文章更新</title>
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
	background-color:#fff0ff;
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
	
input#title_ch, input#title_en{
	width:500px;
}
</style>
<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>
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
		var thecontent_ch=tinyMCE.get('content_ch').getContent();
		var thecontent_en=tinyMCE.get('content_en').getContent();
		
		$('#thecontent_pre_ch').html(thecontent_ch);
		var themainimage_ch=$('#thecontent_pre_ch').find('img').eq(0).attr('src');
		$('#thecontent_pre_en').html(thecontent_en);
		var themainimage_en=$('#thecontent_pre_en').find('img').eq(0).attr('src');
		
		$('input#main_image_ch').val(themainimage_ch);
		$('input#main_image_en').val(themainimage_en);
		
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

<h1>站内文章更新 </h1>
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
<label>文章分类</label><span>(必填)</span> &nbsp;
<select name="category" id="cate" style="font-size:18px;">
<option value="undefined">请选择...</option>
<option value="promotion-diamond" <?php if($category=='promotion-diamond'){echo 'selected = "selected"';} ?>>特惠信息(裸钻)</option>
<option value="promotion-jewelry" <?php if($category=='promotion-jewelry'){echo 'selected = "selected"';} ?>>特惠信息(首饰)</option>
<option value="knowledge" <?php if($category=='knowledge'){echo 'selected = "selected"';} ?>>钻石知识</option>
<!--
<option value="industry" <?php if($category=='industry'){echo 'selected = "selected"';} ?>>产业新闻</option>
-->
<option value="publicmedia" <?php if($category=='publicmedia'){echo 'selected = "selected"';} ?>>媒体报道</option>
</select>
  </p>
  
  
  <p>  
  <label>文章题目（中文）</label> <span></span>
  <br />          
  <input type="text" name="title_ch" id="title_ch" value="<?php echo $title_ch; ?>" />
  <br /><br />
  <label>文章题目（英文）</label> <span></span>
  <br />          
  <input type="text" name="title_en" id="title_en" value="<?php echo $title_en; ?>" />
  <br />
  </p>
  
 
  <p>  
  <label for="content_ch">文章内容（中文）</label> <span></span>
  <br />          
  <textarea name="content_ch" class="maitext" id="content_ch" cols="60" rows="8"><?php echo $text_ch; ?></textarea>  
  <br />
  提示：回车键换段落，shift＋回车键 为换行
  </p>
  
  
  
  <p>  
  <label for="content_en">文章内容（英文）</label> <span></span>
  <br />          
  <textarea name="content_en" class="maitext" id="content_en" cols="60" rows="8"><?php echo $text_en; ?></textarea>  
  
  </p>
  
  
  <input name="main_image_ch" id="main_image_ch" type="hidden" value="" />
  <input name="main_image_en" id="main_image_en" type="hidden" value="" />
  
  <p>
    <button type="button" id="submit_article" style="font-size:18px; font-weight:bold; padding:12px 50px; background-color:#CC6699; color:#FFF; border-width:1px;"> 更新文章 </button>
  </p>
  <br /><br /><br /><br /><br />
</form>




<div id="thecontent_pre_ch" style="display:none;"></div>
<div id="thecontent_pre_en" style="display:none;"></div>


<iframe src="upload_sitepics.php" style="position:absolute; left:738px; width:380px; top:120px; height:980px; border-style:solid; border-color:#CC6699; border-width:1px;"></iframe>



</body>
</html>