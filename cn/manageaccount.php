<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php
		include_once('header.php');
	?>
<?php
session_start();


$userid=$_SESSION['useraccount'];


require_once('connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$user_info='SELECT * FROM clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$website_username=$r_u['website_username'];
	$website_password=$r_u['website_password'];
	
	
	$user_tel=$r_u['tel'];
	$user_email=$r_u['email'];
	$user_realname=$r_u['name'];
	$user_weichatid=$r_u['wechat_id'];
}

if(isset($_POST['usernamenew']) && isset($_POST['passwordold']) && isset($_POST['passwordnew']) && isset($_POST['passwordnewrepeat'])){
	
	//exit('post');
	
	$usernamenew=$_POST['usernamenew'];
	$passwordold=$_POST['passwordold'];
	$passwordnew=$_POST['passwordnew'];
	$passwordnewrepeat=$_POST['passwordnewrepeat'];
	
	if($passwordnewrepeat!=$passwordnew){
		$errormessage='两次输入的新密码不一致，请重新输入';
	}
	if($passwordold!=$website_password){
		$errormessage='密码输入不正确，请重试';
	}
	if($passwordnewrepeat==$passwordnew && $passwordold==$website_password){
		$sql_user_update='UPDATE clients_list SET website_username = "'.$usernamenew.'", website_password = "'.$passwordnew.'" WHERE id = '.$userid;
		$stmt_user_update=$conn->query($sql_user_update);
		$userupdated=$stmt_user_update->rowCount();
		
		if($userupdated){
			$website_username=$usernamenew;
			$feedbackmessage='您已经成功修改了您的用户名和密码';
		}
	}
	
}

if(isset($_POST['tel']) && isset($_POST['emailaddres'])){
	$new_tel=$_POST['tel'];
	$new_email=$_POST['emailaddres'];
	$new_realname=$_POST['realname'];
	$new_weichatid=$_POST['weichatid'];
	
	
	
	$sql_user_update='UPDATE clients_list SET wechat_id = "'.$new_weichatid.'", name = "'.$new_realname.'", tel = "'.$new_tel.'", email = "'.$new_email.'" WHERE id = '.$userid;
	$stmt_user_update=$conn->query($sql_user_update);
	$userupdated=$stmt_user_update->rowCount();
	
	if($userupdated){
		$website_username=$usernamenew;
		$feedbackmessage='您已经成功修改了您的联系信息';
		
		
		$user_tel=$new_tel;
		$user_email=$new_email;
		$user_realname=$new_realname;
		$user_weichatid=$new_weichatid;
		
		
	}
	
	
	
}
?>

<title>利美钻石 - 我的钻戒历史纪录</title>
<style type="text/css">
div.history-choice{
	border-bottom-style:solid;
	border-width:1px;
	border-color:#999;
	padding:20px 0;
}
img.demo-pic{
	display:block;
	float:left;
	width:228px;
	margin:25px 25px 0 0;
}
div.dia-para-box{
	float:left;
	width:358px;
	font-size:14px;
}
.dia-para-box h3{
	font-size:18px;
}
.dia-para-box p{
	font-size:14px;
	margin:0 0 3px 0;
}


div#account-profile-form-box, div#account-setting-form-box{
	float:left;
	position:relative;
	width:288px;
	padding:15px;
	background-color:#FFF;
	border-style:solid;
	border-width:1px;
	border-color:#999;
	margin:25px;
}


p.feedbackmessage, p.errormessage{
	font-size:24px;
	color:#C30;
}


#account-profile-form-box h3, #account-setting-form-box h3{
	font-size:16px;
}

</style>
</head>


<body>
<?php
	include_once('topbar.php');
?>

<!--div  home-visual-box-->
<div  class="container-fluidX container maxcontainer">


<!--div  bodycontent----------------------------------------------------------------------------------------->



<div class="bodycontent">
<div class="loginbox">

<?php
if(isset($errormessage)){
?>
<p class="errormessage"><?php echo $errormessage; ?></p>
<?php
}
?>

<?php
if(isset($feedbackmessage)){
?>
<p class="feedbackmessage"><?php echo $feedbackmessage; ?></p>
<?php
}
?>

<h3>我的利美钻戒 账户信息</h3>




</div>
</div>


<div id="account-profile-form-box">
<h3>查看／修改您的联系信息</h3>
<form id="account-settingsform" action="" method="post">
<input type="hidden" name="changeaction" value="generalinfo" />
<p><label>微信ID：</label><input name="weichatid" class="logininput" id="weichatid" type="text" value="<?php echo $user_weichatid; ?>" /></p>
<p><label>真实姓名：</label><input name="realname" class="logininput" id="realname" type="text" value="<?php echo $user_realname; ?>" /></p>
<p><label>电话：</label><input name="tel" class="logininput" id="tel" type="text" value="<?php echo $user_tel; ?>" /></p>
<p><label>电子邮件：</label><input name="emailaddres" class="logininput" id="emailaddres" type="text" value="<?php echo $user_email; ?>" /></p>

<p><input type="submit" name="submitthelogininfo" value="保存" /></p>
</form>
</div>


<div id="account-setting-form-box">
<h3>修改您的用户名和密码</h3>
<form id="account-settingsform" action="" method="post">
<input type="hidden" name="changeaction" value="usernamepassword" />
<p><label>用户名：</label><input name="usernamenew" class="logininput" id="username-input" type="text" value="<?php echo $website_username; ?>" /></p>
<p><label>旧密码：</label><input name="passwordold" class="passwordinput" id="passwordinput-input-old" type="password" /></p>
<p><label>新密码：</label><input name="passwordnew" class="passwordinput" id="passwordinput-input-new" type="password" /></p>
<p><label>新密码确认：</label><input name="passwordnewrepeat" class="passwordinput" id="passwordinput-input-new-repeat" type="password" /></p>

<p><input type="submit" name="submitthelogininfo" value="保存" /></p>
</form>
</div>



<br style="clear:both;">

<?php
		include_once('footer.php');
		?>




</div>
</body>
