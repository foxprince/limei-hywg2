<?php
$error='';
if(isset($_POST['login'])){
    session_start();
	$password=$_POST['pwd'];
	if($password=='P@4Lzs2016!'){
		    $_SESSION['authenticated']='SiHui';
			session_regenerate_id();
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
			header("Location: list_jewelry.php");
			exit('');
		}
	}

	$error='Invalid username or password';

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
	background-color:#CCC;
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


<p style='text-align:center;'><img src="../images/site_elements/logo.png" style="width:115px;" /></p>
<h1 style="margin-top:20px; text-align:center;">利美珠宝网站管理 login</h1>
<?php
if($error){
    echo "<p class='warning'>$error, please try again.</p>";
}
?>

<form id="loginform" method="post" action="">

    <p style="text-align:center;">
        <label for="pwd">Password:</label>
        <input type="password" name="pwd" id="pwd">
        <input name="login" type="submit" id="login" value="Login">
    </p>

</form>

<form id="giaform" method="get" onsubmit="openPdf()" >

    <p style="text-align:center;">
        <label for="pwd">GIA编号:</label>
        <input type="text" name="diamondid" id="diamondid">
        <button name="login" type="submit" >查询</button>
    </p>

</form>
<script type="">
function openPdf() {
	id = document.getElementById("diamondid");
	window.open("https://api.checkgems.com/api/v2/certs/GIA/"+id.value+".pdf","_blank");
}
</script>
</body>
</html>