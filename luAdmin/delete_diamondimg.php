<?php
/*===================session========================*/
session_start();



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


require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");



$dir=$_POST['dir'];
$imagename=$_POST['imgname'];

if(is_readable("../images/contentimgs/$dir/thumbs/$imagename")){
	$OK=unlink("../images/contentimgs/$dir/thumbs/$imagename");
}

if($OK){
	if(is_readable("../images/contentimgs/$dir/$imagename")){
		$OK=unlink("../images/contentimgs/$dir/$imagename");
	}
}



if($OK){
	echo "ok";
}else{
	echo "Error: unkown problem";
}
?>
