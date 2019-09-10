<?php
/*===================session========================*/
session_start();

if(!isset($_SESSION['authenticated'])) {  
  exit('<p class="message">error</p>');
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit('<p class="message">error</p>');
}

		



$id=$_POST['id'];
$stars=$_POST['stars'];
$comment=$_POST['thecomment'];

require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql_update='UPDATE diamonds SET recommend_words = "'.$comment.'", stars = '.$stars.' WHERE id ='.$id;
	
	
$stmt=$conn->query($sql_update);	  
	
$OK=$stmt->rowCount();


			


if($OK){
	echo 'OK';
}else{
	echo 'ERROR';
}

?>