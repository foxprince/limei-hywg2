<?php
if(!isset($_POST['ClientID'])){
	exit('ERROR-DATA');
}

session_start();
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit('ERROR-SESSION');
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
    exit('ERROR-SESSION');
}


$stock_ref=$_POST['stockRef'];
$client_ID=$_POST['ClientID'];
//$sortby='BYCONTACT';


require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql_check='SELECT id FROM viewing_record WHERE diamond= "'.$stock_ref.'" AND viewer = "'.$client_ID.'"';
$stmt_check=$conn->query($sql_check);
$found=$stmt_check->rowCount();

if($found){
	$sql_del='DELETE FROM viewing_record WHERE diamond= "'.$stock_ref.'" AND viewer = "'.$client_ID.'"';
	$stmt_del=$conn->query($sql_del);
	$deleted=$stmt_del->rowCount();
	if($deleted){
		echo 'OK';
	}else{
		echo 'ERROR-DEL';
	}
}else{
	echo 'EMPTY';
}

?>
