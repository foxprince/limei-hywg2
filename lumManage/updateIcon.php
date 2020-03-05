<?php
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

require_once('getaccesstoken.php');

require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

/*
$sql_last_update='SELECT * FROM user_info_update_log ORDER BY action_time DESC LIMIT 1';
foreach($conn->query($sql_last_update) as $row_last){
	$lst_update=$row_last['action_time'];
};

echo $lst_update;

exit();
*/

$clientlist=array();

$sql_w_openid='SELECT id, wechat_open_id, wechat_name, address, icon FROM clients_list WHERE reference = "NEW-WECHAT" ORDER BY subscribed_time DESC';
foreach($conn->query($sql_w_openid) as $row){
	$crr_wechat_openid=$row['wechat_open_id'];
	$crr_id=$row['id'];
	$crr_wechat_name=$row['wechat_name'];
	$crr_address=$row['address'];
	$crr_icon=$row['icon'];
	
	
	if(in_array($crr_wechat_openid, $clientlist)){
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
		$clientlist[]=$crr_wechat_openid;
		
		
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
			CURLOPT_URL =>'https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$theaccesstoken.'&openid='.$crr_wechat_openid.'&lang=zh_CN',
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
			$sql_update='UPDATE clients_list SET wechat_name = ?, address = ?, icon = ? WHERE id = ?';
			$stmt_update=$conn->prepare($sql_update);		
			$stmt_update->execute(array($wechat_name, $address, $usericon, $crr_id));
			$OK=$stmt_update->rowCount();
			if($OK){
				echo 'updated->'.$crr_id.'<br>';
			}
		}else{
			echo 'no need update->'.$crr_id.'<br>';
		}
		
	}
}

$status='OK';
$sql_log_updated='INSERT INTO user_info_update_log (status) VALUES (:status)';
$stmt_log_updated=$conn->prepare($sql_log_updated);
$stmt_log_updated->bindParam(':status', $status, PDO::PARAM_STR);			
$stmt_log_updated->execute();

