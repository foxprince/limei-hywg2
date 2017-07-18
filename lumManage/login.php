<?php 
$error='';
session_start();
if(isset($_COOKIE['limei112233']) && $_COOKIE['limei112233']=="limeiLumiAlumiaLimEi123"){
	 $_SESSION['authenticated']='SiHui';
	 $_SESSION['account']='admin';
	 header("Location: index.php");
	 exit('');
}else if(isset($_COOKIE['limei112233']) && $_COOKIE['limei112233']=="limeiLumiAlumiaLimEi123-super"){
	 $_SESSION['authenticated']='SiHui';
	 $_SESSION['account']='superadmin';
	 header("Location: index.php");
	 exit('');
}



if(isset($_POST['login'])){
    $user=$_POST['username'];
	$password=$_POST['pwd'];
	if($user=='superadmin' && $password=='limei-chuxiao'){
		$_SESSION['authenticated']='SiHui';
		$_SESSION['account']='superadmin';
		session_regenerate_id();
		if(isset($_POST['keeploggedin']) && $_POST['keeploggedin']=="YES"){
			$cookie_token='limeiLumiAlumiaLimEi123-super';
			setcookie("limei112233", $cookie_token, time()+5184000, '/');
		}
	}else if($user=='admin' && $password=='limei_diamond1'){
		$_SESSION['authenticated']='SiHui';
		$_SESSION['account']='admin';
		session_regenerate_id();
		if(isset($_POST['keeploggedin']) && $_POST['keeploggedin']=="YES"){
			$cookie_token='limeiLumiAlumiaLimEi12333';
			setcookie("limei112233", $cookie_token, time()+5184000, '/');
		}
	}else{
		if(isset($_SESSION['authenticated'])){
			$_SESSION=array();
			if (isset($_COOKIE[session_name()])){
			    setcookie(session_name(), '', time()-86400, '/');
			}
			session_destroy();
		}
	}
	if(isset($_SESSION['authenticated'])){
		if($_SESSION['authenticated']=='SiHui'){
			header("Location: index.php");
			exit('');
		}
	}
		
	$error='用户名或密码不正确！';
	
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<style>
body{
	font-family:Georgia, "Times New Roman", Times, serif;
	font-size:14px;
	font-weight:100;
	padding:0;
	margin:0;
	background-color:#F3F3F3;
	border-top-style:solid;
	border-width:5px;
	border-color:#C69;
	}
img{
	width:300px;
	position:relative;
}
h1{
	position:relative;
	font-family:Verdana, Geneva, sans-serif;
	font-weight:bold;
	font-size:20px;
	color:#000;
	margin-top:0px;
}
form{
	position:relative;
	}

p{
	margin-top:30px;
	}
label{
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
.warning{
	position:relative;
	left:40px;
	font-family:"Courier New", Courier, monospace;
	color:#F00;}
</style>
<title>login</title>
</head>

<body>


<p style='text-align:center;'><img src="../images/site_elements/logo.gif" style="width:115px;" /></p>
<h1 style="margin-top:20px; text-align:center;">利美公司客户管理系统 login</h1>
<?php
if($error){
    echo "<p class='warning'>$error, please try again.</p>";
}
?>

<form id="loginform" method="post" action="">
    
    <p style="text-align:center;">
    
    	<label for="user">用户名:</label>
        <input type="text" name="username" id="username">
        
        <label for="pwd">Password:</label>
        <input type="password" name="pwd" id="pwd">
        <input name="login" type="submit" id="login" value="登录" style="background-color:#C6F; font-size:16px; color:#FFF; padding:3px 8px; border-width:1px;"><br /><br />
        <input type="checkbox" name="keeploggedin" value="YES" />保持登录状态
    </p>
    
        
</form>
</body>
</html>