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


require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql='SELECT * FROM wechat_record WHERE client_id = "'.$clientID.'" ORDER BY CreateTime DESC';



foreach($conn->query($sql) as $row){
	$ifwechat=$row['if_wechat'];
	$message_direction=$row['message_direction'];
	$message_read=$row['message_read'];
	
	if($ifwechat=='YES' || $ifwechat=='NEW'){
		if($message_direction=='COMING'){
			$message_class='coming_message';
		}else if($message_direction=='GOING'){
			$message_class='going_message';
		}else{
			$message_class='nocomenogo';
		}
	}else{
		$message_class='nocomenogo';
	}
	if($message_read=='NO'){
		$message_class_read=' new-message';
	}else{
		$message_class_read='';
	}
?>

<div class="messagebox <?php echo $message_class.$message_class_read; ?>">
<p class="messagetime"><?php echo $row['CreateTime']; ?></p>

<div class="the_message">
<?php 
if($row['MsgType']=='text'){
    echo nl2br($row['message']); 
}else if($row['MsgType']=='image'){
?>
<img src="<?php echo $row['message']; ?>" class="message_img" />
<?php
}else{
	echo '多媒体文件，请登录微信网站查看';
}
?>
</div>

</div>

<?php
}
$sql_update='UPDATE wechat_record SET message_read = "YES" WHERE client_id = "'.$clientID.'"';
$conn->query($sql_update);





//==========================================================
//==========================================================
//==========================================================
//==========================================================
//=========== MAKE SURE ALL INFO IS UP TO DATE =====================
//==========================================================
//==========================================================

$sql_o='SELECT wechat_open_id FROM clients_list WHERE id = "'.$clientID.'"';//o means open_id

foreach($conn->query($sql_o) as $row_o){
	$the_open_id=$row_o['wechat_open_id'];
}

$sql_info='SELECT * FROM clients_list WHERE wechat_open_id = "'.$the_open_id.'" AND reference = "NEW-WECHAT" ORDER BY subscribed_time DESC';

$found=0;
foreach($conn->query($sql_info) as $row_u){
	
	$crr_id=$row_u['id'];
	
	$crr_wechat_name=$row_u['wechat_name'];
	$crr_address=$row_u['address'];
	$crr_icon=$row_u['icon'];
	
	$lastrefresh=strtotime($row_u['last_update_time']);
	
	if($found>0){
		$sql_delete_double='DELETE FROM clients_list WHERE id = "'.$crr_id.'"';
		$stmt_del=$conn->query($sql_delete_double);
		$deleted=$stmt_del->rowCount();
		if($deleted){
			$sql_log='INSERT INTO log_for_delete_double (wechat_open_id) VALUES(:wechat_open_id)';
			$stmt_log=$conn->prepare($sql_log);
			$stmt_log->bindParam(':wechat_open_id', $crr_wechat_openid, PDO::PARAM_STR);			
			$stmt_log->execute();
		}
	}else{
		//not to update too soon since last time
		
		$now=strtotime('now');
		
		$how_long_since_last_refresh=($now-$lastrefresh)/60/60;
		echo '<!-- how long last time: '.$how_long_since_last_refresh.'  -->';
		
		
		if($how_long_since_last_refresh>240){
		
			//update the wechat info
			
			require_once('getaccesstoken.php');
			//here we get all the infos of the user
			//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
			//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
			//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
			//$theaccesstoken
			// Get cURL resource
			$curl_ci = curl_init();//client info
			// Set some options - we are passing in a useragent too here
			curl_setopt_array($curl_ci, array(
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL =>'https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$theaccesstoken.'&openid='.$the_open_id.'&lang=zh_CN',
				CURLOPT_USERAGENT => 'Codular Sample cURL Request'
			));
			// Send the request & save response to $resp
			$resp_ci = curl_exec($curl_ci);
			// Close request to clear up some resources
			curl_close($curl_ci);
			
			//$json = '{"foo-bar": 12345}';			
			$obj_ci = json_decode($resp_ci);
			
			$wechat_name=$obj_ci->{'nickname'}; // 12345
			
			$address001=$obj_ci->{'city'};
			$address002=$obj_ci->{'province'};
			$address002=$obj_ci->{'country'};
			
			$address=$address001.', '.$address002.', '.$address003;
			
			$usericon=$obj_ci->{'headimgurl'};
			
			
			if($wechat_name!=$crr_wechat_name || $address!=$crr_address || $usericon!=$crr_icon){
				$sql_update='UPDATE clients_list SET wechat_name = ?, address = ?, icon = ?, last_update_time = NOW() WHERE id = ?';
				$stmt_update=$conn->prepare($sql_update);		
				$stmt_update->execute(array($wechat_name, $address, $usericon, $crr_id));
				$OK=$stmt_update->rowCount();
				if($OK){
					echo '<!-- updated: made changes -->';
				}
			}else{
				$sql_update='UPDATE clients_list SET last_update_time = NOW() WHERE id = ?';
				$stmt_update=$conn->prepare($sql_update);		
				$stmt_update->execute(array($crr_id));
				$OK=$stmt_update->rowCount();
				if($OK){
					echo '<!-- updated: made changes only for the update time -->';
				}
				echo '<!-- updated: everything is same -->';
			}
		
		}
	}
	
	$found++;
}

?>
