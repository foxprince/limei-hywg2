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
<!-- 新增CSS20170620 -->
<style>
      .contain{min-height: 500px;}
      .contain h2{font-size: 17px; color: #bd8167; font-weight: bold; padding-top: 30px;}
      .message-box{width: 856px; margin:0 auto;}
      .message-box:after{content:".";display:block;height:0;clear:both;visibility:hidden}
      .message{width: 348px; padding:20px 10px; border-radius: 4px; margin:30px; box-shadow: 0 0 40px #999;}
      .message .hint{display:none;margin-top: 20px; text-align: center;padding-left: 10px; height: 30px; font-size: 16px; background-color: #f1f1f1; line-height: 30px; color:#bc8064;}
      .message .tit{padding-left: 10px; height: 30px; font-size: 16px; background-color: #f1f1f1; line-height: 30px; color:#bc8064;}
      .message .tit span{width: 12px; height: 6px; font-size: 20px; color: #999; margin-right: 2px;}
      .message ul{margin-top:16px;}
      .message li{margin-top:12px;}
      .message li span{display: inline-block; width: 84px; text-align: right; margin-right: 6px; color:#333; font-size: 14px;}
      .message li input{height: 24px; border:none;  border:1px solid #c18971; width: 204px;}
      .message .btn{margin:0 auto; width: 94px; margin-top: 16px;}
      .message .btn a{display: block; width: 74px; height: 32px; cursor: pointer; line-height: 32px; border-radius: 50px; font-size: 14px; color:#fff; background-color: #f9b5b2; border-color:#f9b5b2; padding:0 18px; }
      .message .btn span{width: 8px; height: 8px; display: inline-block; border-radius: 50%; margin-right: 18px; margin-bottom: 2px; background-color: #fff;}
      .message .btn a:hover{background-color: #fb918c; border-color:#fb918c;}
      .message .btn a:hover span{ background-color: #ccc;}

      .signout{margin:0 auto; width: 94px; margin-top: 30px;}
      .signout a{display: block; width: 74px; height: 32px; cursor: pointer; line-height: 32px; border-radius: 50px; font-size: 14px; color:#999; background-color: #fff; border:1px solid #999; padding:0 18px; }
      .signout span{width: 8px; height: 8px; display: inline-block; border-radius: 50%; margin-right: 10px; margin-bottom: 2px; background-color: #999;}
      .signout a:hover{background-color: #f9b5b2; border-color:#f9b5b2; color:#fff;}
      .signout a:hover span{ background-color: #fff;}
    </style>
</head>

<body>
	<div class="zhuti clear">
		<?php include_once('topbar.php'); ?>
		<!-- 内容主题 -->
	  <div class="contain">
	      <!-- 关于我们 -->
	      <h2 class="tc">个人信息</h2>
	      <div class="message-box">
	        <div class="message fl"><form id="profileForm">
	          <div class="tit"><span>></span>查看/修改您的联系信息</div>
	          <ul>
	            <li><span>微信ID:</span><?php echo $r_u['wechat_name'];?></li>
	            <li><span>真实姓名:</span><input type="text" name="name" value="<?php echo $r_u['name'];?>"></li>
	            <li><span>电话:</span><input type="text" name="tel" value="<?php echo $r_u['tel'];?>"></li>
	            <li><span>电子邮件:</span><input type="text" name="email" value="<?php echo $r_u['email'];?>"></li>
	          </ul>
	          <div class="hint" id="profileHint">保存成功的提示</div>
	          <div class="btn"><a href="javascript:;" onclick="updateProfile()" ><span></span>保存</a></div></form>
	        </div>
	        <div class="message fl"><form id="passForm">
	          <div class="tit"><span>></span>修改密码</div>
	          <ul>
	            <li><span>用户名:</span><input type="text" name="usernamenew" value="<?php echo $r_u['website_username'];?>"></li>
	            <li><span>当前密码:</span><input type="password" name="passwordold" ></li>
	            <li><span>新密码:</span><input type="password" name="passwordnew"></li>
	            <li><span>确认新密码:</span><input type="password" name="passwordnewrepeat"></li>
	          </ul>
	          <div class="hint" id="passHint">保存成功的提示</div>
	          <div class="btn"><a href="javascript:;" onclick="updatePass()" ><span></span>保存</a></div></form>
	        </div>
	      </div>
	      <div class="signout"><a href="login.php?action=logout" ><span></span>退出登录</a></div>
	  </div>
	</div>
	<?php include_once('footer.php'); ?>
	<script>
	$(function(){
		
	});
	function updateProfile(item) {
		$.ajax({
			type : "post",
			url : "action.php?action=updateProfile",
			data: $('#profileForm').serialize(),
			success : function(json) {
				$('#profileHint').text(json).fadeIn();
			}
		});
	}
	function updatePass(item) {
		$.ajax({
			type : "post",
			url : "action.php?action=updatePassword",
			data: $('#passForm').serialize(),
			success : function(json) {
				$('#passHint').text(json).fadeIn();
			}
		});
	}
	</script>
</body>