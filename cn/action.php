<?php
session_start();
include_once 'log.php';
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
if($_REQUEST['action']) {
	$action = $_REQUEST['action'];
	switch($action) {
		case "appoinmentList":
			$userid = $_SESSION ['useraccount'];
			$userhistory='SELECT * FROM viewing_record WHERE viewer = "'.$userid.'" ORDER BY id DESC';
			logger($userhistory);
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$appoinmentList=array();$i=0;
			if($historyfound){
				foreach($stmt_history as $row_history){
					$user_diamond = $row_history['diamond'];
					$user_jewellery_price = $row_history['jewellery_price'];
					$user_jewellery_id = $row_history['jewellery_id'];
					$user_view_time = $row_history['view_time'];
					$totalprice=$row_history['totalprice_in_currency'];
					$sql_dia='SELECT * FROM diamonds WHERE id = '.$user_diamond;
					foreach($conn->query($sql_dia) as $r_d){
						$appoinmentList[$i]=$r_d;
					}
					$demopiclink='./img-eles/goodprice.png';
					if($user_jewellery_id!='' && $user_jewellery_id!=NULL && $user_jewellery_id!=0){
						$sql_ring='SELECT * FROM jewelry WHERE id = '.$user_jewellery_id;
						foreach($conn->query($sql_ring) as $r_r){
							$user_ring_name_ch=$r_r['name_ch'];
							$user_ring_image1=$r_r['image1'];
						}
						$demopiclink='../images/sitepictures/'.$user_ring_image1;
					}
					$i++;
				}
			}
			echo json_encode($appoinmentList);
			break;
		default:
			echo "ok";
			break;
	}
}
?>