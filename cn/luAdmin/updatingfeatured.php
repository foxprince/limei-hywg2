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



if(isset($_POST['id'])){
	
	include('nuke_magic_quotes.php');
	
	$id=$_POST['id'];
	$thevalue=$_POST['thevalue'];
	
	$sql_update="UPDATE diamonds SET featured = '".$thevalue."' WHERE id = ".$id;
	$stmt=$conn->query($sql_update);
    $OK=$stmt->rowCount();
			

	if($OK){
		echo 'OK';
	}else{
		echo "ERROR";
	}
}
?>

