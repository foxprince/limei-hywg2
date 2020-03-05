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


//$clientID=$_POST['clientID'];
//$sortby='BYCONTACT';


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

/*<button type="button" class="clientmanagebtn-history" onclick="showHistory('<?php echo $row['theuserID']; ?>')">历史纪录</button>*/

$sql='SELECT DISTINCT client_id, wechat_name FROM wechat_record WHERE message_direction = "COMING" AND message_read = "NO" ORDER BY CreateTime DESC';

$stmt=$conn->query($sql);
$row_num=$stmt->rowCount();

if(!$row_num){exit();}

foreach($stmt as $row){
	$clientID=$row['client_id'];
	$wc_name=$row['wechat_name'];
	if($wc_name=='' || $wc_name==NULL || trim($wc_name)=='not set yet'){
		$wc_name='微信用户';
	}
?>

<p class="newmessagenoti" id="newmessagefrom_<?php echo $clientID; ?>">
新消息来自 <span style="font-size:16px; white-space:nowrap; color:#000;"><?php echo $wc_name; ?></span><button class="newmessageClientbtn" id="newmessageBTNfrom_<?php echo $clientID; ?>" onclick="showHistory('<?php echo $clientID; ?>')">查看</button>
</p>


<?php
}

?>
