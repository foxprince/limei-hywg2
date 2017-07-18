<?php

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

if(!isset($_POST['imageUploading'])){
	exit('错误，没有接收到上传的文件');
}




require_once('Upload.php');
$destination='../contentimages/';

try{
	$upload = new img_Upload($destination);
	$upload->move();
	$result_upload=$upload->getMessages();
	$success=$upload->uploadingSuccess();
}catch (Exception $e){
	$error=$e->getMessage();
	$errormessage="<p class='message'>ERROR_UNKNOWN</p>";
	exit($errormessage);
}	

	
if(!$success){
	$imagesizeinfo=$upload->sizeMessage();
	$imageformatinfo=$upload->formatMessage();
	if($imagesizeinfo=='EXCEED'){
		//echo "<p id='size'>too big</p>";
		$errormessage="<p class='message'>SIZE_EXCEED</p>";
		exit($errormessage);
	}else if($imageformatinfo=='NOT_PERMITTED'){
		$errormessage="<p class='message'>FORMAT_WRONG</p>";
		exit($errormessage);
	}else{
		//echo "<p class='error'>An error has occured during uploading, please try again.</p>";
		exit("<p class='message'>ERROR_UNKNOWN</p>");
	}
}else{		
	//check the dimensions of the image
	$final_name=$upload->finalName();
	
	$image=$destination.$final_name;
	$imagedetails=getimagesize($image);
	$imageWidth=$imagedetails[0];
	$imageHeight=$imagedetails[1];
	$ratio=$imageWidth/$imageHeight;
	if($imageWidth<180 || $imageHeight<120){
		//$sizeVerified=true;
		$feedback="<p class='message'>image too small</p>";
		exit($feedback);		
	}else{
		if($imageWidth>730 || $imageHeight>580){
			//resize block
			require_once('ResizeImage.php');
			/*
			if(($imageWidth/$imageHeight)>1){
				$maxsize=1920;
			}else{
				$maxsize=1080;
			}
			*/
			$maxsize=730;
			try{
				$resize=new image_Resize($image);
				$resize->setDestination($destination);
				$resize->setMaxSize($maxsize);
				$resize->setSuffix('');
				$resize->create();
				$messages_R=$resize->getMessages();
				$success_R=$resize->thumbCreated();
				
			} catch (Exception $e){
				$error=$e->getMessage();
				//$errormessage="<p class='error'>".$error."</p>";
				//echo $errormessage;
				exit("<p class='message'>ERROR_UNKNOWN</p>");
			}
			if($success_R){
				$sizeVerified=true;
				//echo "<p id='size'>size ok</p>";
			}else{
				exit("<p class='message'>ERROR_UNKNOWN</p>");
			}
		}else{
			$sizeVerified=true;
			//echo "<p id='size'>size ok</p>";
			
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>大纪元比利时生活网－管理界面</title>
</head>

<body>

<?php
include('navi.php');
?>
<hr />

<h1>图片文件上传</h1>


<?php
if($sizeVerified){
	echo '图片上传成功';
}else{
	echo '图片上传失败，请重试';
}
?>
</body>
</html>