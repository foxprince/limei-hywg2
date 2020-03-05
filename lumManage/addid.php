<?php

require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql_listing='SELECT * FROM wechat_record';
foreach($conn->query($sql_listing) as $row){
	$crr_id=$row['id'];
	$crr_wechat_open_id=$row['wechat_open_id'];
	
	$sql_checkid='SELECT id FROM clients_list WHERE wechat_open_id = "'.$crr_wechat_open_id.'"';
	foreach($conn->query($sql_checkid) as $row_c_id){	
		$crr_client_id=$row_c_id['id'];
	}
	$sql_modify='UPDATE wechat_record SET client_id = "'.$crr_client_id.'" WHERE id = "'.$crr_id.'"';
	$stmt=$conn->query($sql_modify);
	$ok=$stmt->rowCount();
	if($ok){
		echo 'updated id = '.$crr_id.' to '.$crr_client_id.'<br>';
	}
}
