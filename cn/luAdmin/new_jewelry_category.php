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



if(isset($_POST['cate_cn']) && isset($_POST['cate_en'])){
	
	include('nuke_magic_quotes.php');
	     
	$cate_cn=$_POST['cate_cn'];
	$cate_en=$_POST['cate_en'];
	
	
	
	require_once('../connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	$sql_insert='INSERT INTO jewelry_category (category_en, category_cn) 
	VALUES(:category_en, :category_cn)';
	
	
	$stmt=$conn->prepare($sql_insert);	  
	$stmt->bindParam(':category_en', $cate_en, PDO::PARAM_STR);
	$stmt->bindParam(':category_cn', $cate_cn, PDO::PARAM_STR);
	
	
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
<title>珠宝类型</title>
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


<script type="text/javascript">
$(document).ready(function(){
	
	$("#submit_article").click(function(){
		if(formcomplete()){
			$("form#addnew").submit();
		}
	});
});


function formcomplete(){
	
	
	if($.trim($('#cate_cn').val())=='' || $.trim($('#cate_en').val())==''){
		alert('所有内容都要填写！');
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

<h1>添加首饰类别</h1>
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








<form action="" method="post" id="addnew">
  
  
  
  <p>
  <label>类别名称(中文)</label><span>(必填)</span><br>
  <input name="cate_cn" id="cate_cn" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>类别名称(英文)</label><span>(必填)</span><br>
  <input name="cate_en" id="cate_en" type="text" class="formbox" size="200"/>
  </p>

  <p>
    <button type="button" id="submit_article" style="font-size:24px; font-weight:bold; padding:5px 20px;"> 提交 </button>
  </p>
  <br /><br /><br /><br /><br /><br /><br /><br /><br />
</form>
<form class="logout" action="" method="post" > 
     <input type="submit" name="logout" id="logout" value="logout">
</form>




</body>
</html>