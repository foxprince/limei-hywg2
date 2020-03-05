<?php
if(!isset($_POST['diamondid']) || !isset($_POST['ClientID']) || !isset($_POST['price'])){
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

require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$viewer_id=$_POST['ClientID'];
$diamond_id=$_POST['diamondid'];
$price=$_POST['price'];

$status='BOUGHT';


$sql='INSERT INTO purchase_record (diamond, buyer, status, action_time, actual_price) VALUES (:diamond, :buyer, :status, NOW(), :actual_price)';

$stmt=$conn->prepare($sql);	  
		
$stmt->bindParam(':diamond', $diamond_id, PDO::PARAM_STR);
$stmt->bindParam(':buyer', $viewer_id, PDO::PARAM_STR);
$stmt->bindParam(':status', $status, PDO::PARAM_STR);
$stmt->bindParam(':actual_price', $price, PDO::PARAM_STR);

$stmt->execute();
$OK=$stmt->rowCount();


$sql_update='UPDATE viewing_record SET extra_info = "SOLD" WHERE diamond = "'.$diamond_id.'" AND viewer = "'.$viewer_id.'"';
$stmt_update=$conn->query($sql_update);
$updated=$stmt_update->rowCount();


if($OK && $updated){
	echo 'OK';
}




