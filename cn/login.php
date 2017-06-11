<?php include_once('header.php');?>
<title>用户登录 - 利美钻石</title>
<?php 
function gheader($url)  
{  
echo '<html><head><meta http-equiv="Content-Language" content="utf-8"><meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"><meta http-equiv="refresh"  
content="0;url='.$url.'"><title>loading ... </title></head><body>
<script>window.location="'.$url.'";</script></body></html>';  
//exit();  
}  
?>

<?php
if($_REQUEST['action']) {
	$action = $_REQUEST['action'];
	if($action=='logout') {
		$_SESSION['useraccount']=null;
		setcookie("userId",null);
		gheader('login.php');
	}
}
if($_cookie['userId']){
	gheader('myaccount.php');
}
if(isset($_POST['username']) && isset($_POST['password'])){
	$username=addslashes($_POST['username']);
	$password=addslashes($_POST['password']);
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
		//设置cookie
		setcookie("userId",$userid,time()+365*24*3600);
		//更改预约表的viewer
		$userSql = "update viewing_record set viewer=:userId where viewer=:everUserId";
		logger($userSql);
		$stmt=$conn->prepare($userSql);
		$stmt->execute(array(
				'userId'=> $userid,
				'everUserId'=> $_cookie['everUserId']
		));
		setcookie("everUserId",$userid,time()+365*24*3600);
		gheader('myaccount.php');
	}else{
		$errormessage='用户名或密码不正确，请重试';
	}
}
?>
</head>
<body>
<div class="zhuti clear">
	<?php
		include_once('topbar.php');
	?>
<div class="contain clear">

<div class="col-xs-12 col-sm-12 col-md-9">
					<div class="div_back">
                        <div class="logo_login">
                            <img src="./images/logo_login.png">
                        </div>
                        <?php
						if(isset($errormessage)){
						?>
						<p id="error-message"><?php echo $errormessage; ?></p>
						<?php }?>
                        <div class="login_div">
                            <form action="" id="loginform" method="post" onsubmit="return checkForm()">
                            <div class="login_username">
                                <span>用户名：</span>
                                <input type="text" id="txt_login" name="username">
                            </div>
                            <div class="login_line">
                                <img src="./images/line.png">
                            </div>
                            <div class="login_password">
                                <span>密码：</span>
                                <input type="password" id="pwd_login" name="password" >
                            </div>
                            <div class="login_line">
                                <img src="./images/line.png">
                            </div>
                            <div class="login_btn">
                            <a class="button" href="javascript:void(0)" onclick="$('#loginform').submit()">登录</a>
                            </div>
                            <a class="btn" href="javascript:void(0);" id="forgetusernameandpasswordbox" onClick="$('#getpassback').fadeToggle();">忘记了?</a>
<div id="getpassback" style="display:none;">
如果您已经关注了利美钻石的微信官方服务号，请打开我们的微信服务号，在下面的小菜单中选择 ‘欢迎预约’&rarr;‘登录网站’，您即会收到用来登录网站的用户名和密码
</div>
                            </form>
                        </div>
                        
                        <div class="erweima">
                                <img src="./images/erweima.png">
                                <p>扫描关注利美公众号</p>
                                <p>立即获得您的用户名和密码</p>
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
<?php
		include_once('footer.php');
	?>
</body>

