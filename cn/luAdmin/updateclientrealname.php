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

if(!isset($_POST['openid']) || !isset($_POST['realname'])){
	exit('error');
}

$realname=$_POST['realname'];
$openid=$_POST['openid'];

$sql='UPDATE clients_list SET name = ? WHERE wechat_open_id = ?';
$stmt=$conn->prepare($sql);		
$stmt->execute(array($realname, $openid));
$OK=$stmt->rowCount();

if($OK){
	echo '<p id="message">ok</p>';
	echo '<p id="where">saverealname</p>';
}