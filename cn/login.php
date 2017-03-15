<?php 
session_start();
function gheader($url)  
{  
echo '<html><head><meta http-equiv="Content-Language" content="utf-8"><meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"><meta http-equiv="refresh"  
content="0;url='.$url.'"><title>loading ... </title></head><body>
<script>window.location="'.$url.'";</script></body></html>';  
exit();  
}  

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>用户登录 - 利美钻石</title>
	<?php
		include_once('header.php');
	?>
<?php
if(isset($_SESSION['useraccount'])){
	gheader('myaccount.php');
}

if(isset($_POST['username']) && isset($_POST['password'])){
	$username=$_POST['username'];
	$password=$_POST['password'];
	
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	
	$sqlaccount='SELECT * FROM clients_list WHERE website_username = "'.$username.'" AND website_password = "'.	$password.'"';
	$stmt=$conn->query($sqlaccount);
	$found=$stmt->rowCount();
	if($found){
		foreach($stmt as $r){
			$userid=$r['id'];
		}
		$_SESSION['useraccount']=$userid;
		gheader('myaccount.php');
	}else{
		$errormessage='用户名或密码不正确，请重试';
	}
}
?>


</head>

<script type="text/javascript">
$(function(){
    //改变div的高度
    $(".div_back").height($(window).height());
    //改变div的宽度
    $(".div_back").width($(window).width());
});
</script>

<body>
	<?php
		include_once('topbar.php');
	?>
<div class="div">
<div class="col-xs-12 col-sm-12 col-md-9">
	<div class="div_back">
		<div class="div_login">
			<img style="margin-top:70px;margin-left:240px;" src="../images/loginlogo.png">
			<a class="a_id">ID</a>
			<?php
			if(isset($errormessage)){
			?>
			<p id="error-message"><?php echo $errormessage; ?></p>
			<?php
			}
			?>
			<form action="" method="post" onsubmit="return checkForm()" id="loginform">
				<input type="hidden" name="useraccount" value="login" />
				<input id="txt_login" name="username" type="text" placeholder="用户名"/>
				<input id="pwd_login" name="password" type="password" placeholder="密码"/>
				<input id="sub_login" type="submit" name="submitthelogininfo" value="" id="submitthelogininfobtn"/>
			</form>
			<img style="margin-left:220px;" src="../images/weixin.png"/>
		</div>
		
   </div>
<script type="text/javascript">
	function checkForm(){
		if($("#txt_login").val()==""){
			alert("用户名不能为空！");
			$("#txt_login").focus();
			return false;
		}
		else {
			if($("#pwd_login").val()==""){
				alert("密码不能为空！");
				$("#pwd_login").focus();
				return false;
			}
		}
	}
</script>
</div>
</div>
</div>
</body>

