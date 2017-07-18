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



$id=$_POST['id'];


$sql_delete="DELETE FROM news WHERE id = ?";

					
$stmt=$conn->prepare($sql_delete);	  
$stmt->execute(array($id));
$OK=$stmt->rowCount();
$error=$stmt->errorInfo();
if(isset($error[2])){
	$error=$error[2];
	exit($error);
}
if($OK){
	echo "ok";
}else{
	echo "Error: unkown problem";
}
?>
