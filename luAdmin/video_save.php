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

include('nuke_magic_quotes.php');


$where=$_POST['where'];
$id=$_POST['id'];
$thelink=$_POST['thelink'];
$ref=$_POST['ref'];
$thelink_clean=$_POST['videolink'];

require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

//$sql_update="UPDATE diamonds SET ".$pic." = '".$final_name."' WHERE id = $id";
$sql_insert='INSERT INTO video_diamond (ref_number, thelink_clean) VALUES(:ref_number, :thelink_clean)';
	
	
	$stmt=$conn->prepare($sql_insert);	  
	$stmt->bindParam(':ref_number', $ref, PDO::PARAM_STR);
	$stmt->bindParam(':thelink_clean', $thelink_clean, PDO::PARAM_STR);
	
	
	$stmt->execute();
	$OK=$stmt->rowCount();


$sql='SELECT id FROM video_diamond WHERE ref_number = "'.$ref.'" ORDER BY id DESC LIMIT 1';
foreach($conn->query($sql) as $row){
	$theid=$row['id'];
}		


if($OK){
	echo '<p class="message">OK</p>';
	echo '<p id="linkfeedback">'.$thelink.'</p>';
	echo '<p id="idfeedback">'.$id.'</p>';
	echo '<p id="idfeedbackv">'.$theid.'</p>';
}else{
	echo '<p class="message">error</p>';
}

?>