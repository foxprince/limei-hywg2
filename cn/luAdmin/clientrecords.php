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


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美-客户信息管理</title>
<style type="text/css">
td{
	background:#EFF;
	padding:5px;
}
.filterbtn{
	display:inline-block;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="formplugin.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	(function(){
	var status = $('#status');	  
		$('form').ajaxForm({
			beforeSend: function() {
				status.empty();
				
			},
			uploadProgress: function(event, position, total, percentComplete) {
				
			},
			complete: function(xhr) {
				
				$('div#uploadingIndication').fadeOut('fast');
				//$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.find("p#message").html();
				var where=status.find("p#where").html();
				
				if(feedback=='ok'){
					$('#'+where).val('成功保存！');
					
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
});

</script>
</head>

<body>


<?php
include('navi.php');
?>
<hr />

<h3>微信客户管理：</h3>

<p style="width:188px; background-color:#CC6699;"><a href="clients.php" style="color:#FFF; text-decoration:none;">回到客户列表</a></p>




<div style="border-style:solid; width:358px; border-color:#CC6699;">
<?php

$wechat_open_id=$_GET['user'];
$sql_general="SELECT * FROM clients_list WHERE wechat_open_id = '".$wechat_open_id."'";
foreach($conn->query($sql_general) as $row_general){
	$wechat_name=$row_general['wechat_name'];
	$real_name=$row_general['name'];
}



$sql="SELECT * FROM wechat_record WHERE wechat_open_id = '".$wechat_open_id."' ORDER BY id DESC";
$ooh=$conn->query($sql);

if($wechat_name=='-' || $wechat_name==''){
?>

<form action="updateclientwechatname.php" method="post">
<label>客户微信名：</label>
<input type="text" name="wechatname" value="<?php echo $wechat_name; ?>" />
<input type="hidden" name="openid" value="<?php echo $wechat_open_id; ?>" />
<input type="submit" name="savenewname" id="savewechatname" value="保存微信名" />

</form>

<?php
}else{
?>
<h3> 微信名： <?php echo $wechat_name; ?></h3>
<?php
}

if($real_name=='-' || $real_name==''){
?>
<form action="updateclientrealname.php" method="post">
<label>客户实名：</label>
<input type="text" name="realname" value="<?php echo $wechat_name; ?>" />
<input type="hidden" name="openid" value="<?php echo $wechat_open_id; ?>" />
<input type="submit" name="savenewname" id="saverealname" value="保存实名" />

</form>
<?php
}else{
?>
<h3> 实名：<?php echo $real_name; ?></h3>
<?php
}
?>

</div>


<table>
<tr>
<td colspan="4" style="background-color:#FFF;">
信息历史记录：
</td>
</tr>
<tr>
<td width="180" align="center" style="font-size:14px; background-color:#6CF">发送时间</td>
<td width="600" align="center" style="font-size:14px; background-color:#6CF">信息内容</td>
</tr>
<?php
foreach($ooh as $row){
?>
<tr>
<td><?php echo $row['CreateTime']; ?></td>
<td>

<?php echo $row['message']; ?>

</td>
</tr>
<?php
}
?>

</table>
<div id="status" style="display:none;"></div>



<div id="uploadingIndication" style="position:fixed; top:50px; left:50px; width:200px; padding:38px 0; text-align:center; background-color:#FF0; display:none;">
更新中...
</div>

<p style="height:50px;">&nbsp;</p>
</body>
</html>