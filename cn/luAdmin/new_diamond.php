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



if(isset($_POST['weight']) && isset($_POST['color']) && isset($_POST['clarity']) && isset($_POST['shape']) && isset($_POST['price'])){
	
	include('nuke_magic_quotes.php');
	     
	
	$weight = $_POST['weight'];
	$color = $_POST['color'];
	$clarity = $_POST['clarity'];
	$shape = $_POST['shape'];
	$price = $_POST['price'];
	$code = $_POST['code'];
	if(isset($_POST['certificate'])){
		$certificate = $_POST['certificate'];
	}else{
		$certificate = "NO";
	}
	
	
	
	
	require_once('../connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	$sql_insert='INSERT INTO diamonds (weight, color, clarity, shape, price, code, certificate) 
	VALUES(:weight, :color, :clarity, :shape, :price, :code, :certificate)';
	
	
	$stmt=$conn->prepare($sql_insert);	  
	$stmt->bindParam(':weight', $weight, PDO::PARAM_STR);
	$stmt->bindParam(':color', $color, PDO::PARAM_STR);
	$stmt->bindParam(':clarity', $clarity, PDO::PARAM_STR);
	$stmt->bindParam(':shape', $shape, PDO::PARAM_STR);
	$stmt->bindParam(':price',$price, PDO::PARAM_STR);
	$stmt->bindParam(':code', $code, PDO::PARAM_STR);
	$stmt->bindParam(':certificate', $certificate, PDO::PARAM_STR);
	
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
<title>提交裸钻信息</title>
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
<script src="/js/jquery-1.11.2.min.js"></script>


<script type="text/javascript">
$(document).ready(function(){
	
	$("#submit_article").click(function(){
		if(formcomplete()){
			$("form#addnewdiamond").submit();
		}
	});
});


function formcomplete(){
	
	
	if($.trim($('#weight').val())=='' || $.trim($('#color').val())==''  || $.trim($('#clarity').val())=='' || $.trim($('#shape').val())=='' || $.trim($('#price').val())=='' || $.trim($('#code').val())==''){
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

<h1>提交裸钻信息</h1>
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








<form action="" method="post" id="addnewdiamond">
  
  
  
  <p>
  <label>重量</label><span>(必填)</span><br>
  <input name="weight" id="weight" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>颜色</label><span>(必填)</span><br>
  <input name="color" id="color" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>净度</label><span>(必填)</span><br>
  <input name="clarity" id="clarity" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>切工</label><span>(必填)</span><br>
  <input name="shape" id="shape" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>价格</label><span>(必填)</span><br>
  <input name="price" id="price" type="text" class="formbox" size="200"/>
  </p>
  <p>
  <label>编号</label><span>(必填)</span><br>
  <input name="code" id="code" type="text" class="formbox" size="200"/>
  </p>
  
 
  
  <p style="font-size:24px;">
  <input name="certificate" id="certificate" type="checkbox"  size="200" value="YES"/>证书
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