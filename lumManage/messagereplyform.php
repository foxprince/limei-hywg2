<?php
if(!isset($_POST['clientID'])){
	exit('ERROR');
}

session_start();
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit('ERROR');
}
if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	if (isset($_COOKIE['limei112233'])){
		setcookie('limei112233', '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit('ERROR');
}


$clientID=$_POST['clientID'];
//$sortby='BYCONTACT';


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql='SELECT reference FROM clients_list WHERE id = "'.$clientID.'"';



foreach($conn->query($sql) as $row){
	$ifnewwechat=$row['reference'];
	if($ifnewwechat=='NEW-WECHAT' || $ifnewwechat=='FINAL-WECHAT'){
?>
<textarea id="wechatreplytxt" name="wechatreplytxt" onfocus="EnterKeyListener()"></textarea><br />
<button type="button" id="wechatreplybtn" onclick="replyMessage()">回复信息</button>
<?php
}else{
	echo '消息来自非认证公众平台，无法回复';
}
?>
</div>

</div>

<?php
}
?>
