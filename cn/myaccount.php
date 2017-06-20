<?php 
session_start();
function gheader($url)  
{  
echo '<html><head><meta http-equiv="Content-Language" content="utf-8"><meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"><meta http-equiv="refresh"  
content="0;url='.$url.'"><title>loading ... </title></head><body>
<script>window.location="'.$url.'";</script></body></html>';  
exit();  
}  
if(!isset($_SESSION['useraccount'])){
 	gheader('login.php');
}
?>
<?php
		include_once('header.php');
	?>
	<title>利美钻石 </title>
	
<?php
$userid=$_SESSION['useraccount'];
$user_info='SELECT * FROM clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$website_username=$r_u['website_username'];
	$website_password=$r_u['website_password'];
}

if(isset($_POST['usernamenew']) && isset($_POST['passwordold']) && isset($_POST['passwordnew']) && isset($_POST['passwordnewrepeat'])){
	
	//exit('post');
	
	$usernamenew=addslashes($_POST['usernamenew']);
	$passwordold=addslashes($_POST['passwordold']);
	$passwordnew=addslashes($_POST['passwordnew']);
	$passwordnewrepeat=addslashes($_POST['passwordnewrepeat']);
	
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
if(isset($_GET['delete'])){
	$id=$_GET['delete'];
	$sql_delete='delete from viewing_record WHERE id = '.$id;
	$conn->query($sql_delete);
}
?>
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


div#account-setting-form-box{
	position:relative;
	width:288px;
	padding:15px;
	background-color:#FFF;
	border-style:solid;
	border-width:1px;
	border-color:#999;
	margin-left:158px;
	margin-top:25px;
	margin-bottom:50px;
}
p.feedbackmessage, p.errormessage{
	font-size:24px;
	color:#C30;
}
</style>
</head>

<body>
	<div class="zhuti clear">
		<?php include_once('topbar.php'); ?>
		<div class="contain clear">
	    	<div class="account">
	    		<p style="color: #bd8167;font-size:16px;">个人信息</p>
	    		<div class="account-left">
	    			<div class="account-top"></div>
	    			<div class="account-text">
	    			<span>查看／修改您的个人信息</span>
	    			<div class="linput" style="height: 30px;">
            <div class="linputs"><label>真实姓名：</label><input type="text" name="name" value="<?php echo $name;?>"/></div>
            <div class="rinputs"><label>电子邮件：</label><input type="text" name="email" value="<?php echo $email;?>"/></div>
        </div>
        </div>
	    			<div class="account-bottom"></div>
	    		</div>
	    		<div class="account-right">
	    			<div class="account-top"></div>
	    			<div class="account-text"><span>修改密码</span>gggg</div>
	    			<div class="account-bottom"></div>
	    		</div>
	    		<!--  
				<a style="font-size:14px; display:inline-block; margin-left:25px; padding: 5px 12px; background-color:#eee; position:relative; top:-3px;" href="manageaccount.php">修改用户名密码</a>
				<a class="btn" style="font-size:14px; display:inline-block; margin-left:25px; padding: 5px 12px; background-color:#eee; position:relative; top:-3px;" href="login.php?action=logout">退出登录</a>
				-->
			</div>
		</div>
	</div>
	<?php include_once('footer.php'); ?>
</body>