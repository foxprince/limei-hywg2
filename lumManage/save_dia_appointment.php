<?php
if(!isset($_POST['viewerid']) || !isset($_POST['diamonds']) || !isset($_POST['appotime'])){
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

require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$viewer_id=$_POST['viewerid'];
$appo_time=$_POST['appotime'];
$raw_dia_data=$_POST['diamonds'];

$dias_toview=explode(";", $raw_dia_data);

foreach($dias_toview as $dia){
	$crrdia=trim($dia);
	
	$check='SELECT * FROM viewing_record WHERE diamond = "'.$crrdia.'" AND viewer = "'.$viewer_id.'"';
	$stmt_check=$conn->query($check);
	$found=$stmt_check->rowCount();
	
	if($found){
		foreach($stmt_check as $row_found){
			$crr_record_id=$row_found['id'];
		}
		$sql_update='UPDATE viewing_record SET view_time = "'.$appo_time.'", extra_info = "UPDATED" WHERE id ="'.$crr_record_id.'"';
		$stmt_update=$conn->query($sql_update);
		$OK=$stmt_update->rowCount();
		
	}else{	
		$sql_insert='INSERT INTO viewing_record (diamond, viewer, view_time) VALUES (:diamond, :viewer, :view_time)';
	
		$stmt=$conn->prepare($sql_insert);	  
		
		$stmt->bindParam(':diamond', $crrdia, PDO::PARAM_STR);
		$stmt->bindParam(':viewer', $viewer_id, PDO::PARAM_STR);
		$stmt->bindParam(':view_time', $appo_time, PDO::PARAM_STR);
		
		$stmt->execute();
		$OK=$stmt->rowCount();
	}
}

echo 'OK';



