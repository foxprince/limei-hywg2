<?php
/*===================session========================*/
session_start();

// if session variable not set, redirect to login page
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



require_once('Upload.php');
$destination='../images/contentimgs/';

try{
	$upload = new img_Upload($destination);
	$upload->move();
	$result_upload=$upload->getMessages();
	$success=$upload->uploadingSuccess();
}catch (Exception $e){
	$error=$e->getMessage();
	$errormessage='<p class="message">ERROR_UNKNOWN</p>';
	exit($errormessage);
}	

//echo "uploading done<br>";	
if(!$success){
	$imagesizeinfo=$upload->sizeMessage();
	$imageformatinfo=$upload->formatMessage();
	if($imagesizeinfo=='<p class="message">EXCEED</p>'){
		echo "<p id='size'>too big</p>";
		$errormessage='<p class="message">SIZE_EXCEED</p>';
		exit($errormessage);
	}else if($imageformatinfo=='NOT_PERMITTED'){
		$errormessage='<p class="message">FORMAT_WRONG</p>';
		exit($errormessage);
	}else{
		echo "<p class='error'>An error has occured during uploading, please try again.</p>";
		exit('<p class="message">ERROR_UNKNOWN</p>');
	}
}else{		
	//check the dimensions of the image
	$final_name=$upload->finalName();
	//echo $final_name;
}
		


$pic=$_POST['pic'];
$id=$_POST['id'];

require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

//$sql_update="UPDATE diamonds SET ".$pic." = '".$final_name."' WHERE id = $id";
switch ($pic){
	case "image1";
	$sql_update="UPDATE diamonds SET image1 = '".$final_name."' WHERE id = $id";
	break;
	
	case "image2";
	$sql_update="UPDATE diamonds SET image2 = '".$final_name."' WHERE id = $id";
	break;
	case "image3";
	$sql_update="UPDATE diamonds SET image3 = '".$final_name."' WHERE id = $id";
	break;
	case "image4";
	$sql_update="UPDATE diamonds SET image4 = '".$final_name."' WHERE id = $id";
	break;
	case "image5";
	$sql_update="UPDATE diamonds SET image5 = '".$final_name."' WHERE id = $id";
	break;
	
	
}
$stmt=$conn->query($sql_update);

$OK=$stmt->rowCount();
			


if($OK){
	echo '<p class="message">OK</p>';
	echo '<p id="imagename">'.$final_name.'</p>';
	echo '<p id="imagewhere">'.$pic_where.'</p>';
}else{
	echo '<p class="message">error</p>';
}

?>