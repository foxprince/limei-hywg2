<?php
//echo 'processing begins<br>';


require_once('Upload.php');
$destination='../images/sitepictures/';

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
	
	
	
	$image=$destination.$final_name;
	$imagedetails=getimagesize($image);
	$imageWidth=$imagedetails[0];
	$imageHeight=$imagedetails[1];
	
	if($imageWidth>5800 || $imageHeight>5800){
		$feedback="<p class='message'>ERROR_DIMENSION</p>";
		exit($feedback);	
	}
	
	$ratio=$imageWidth/$imageHeight;
	
	if($imageWidth>1280 || $imageHeight>1280){
		//resize block
		require_once('ResizeImage.php');
		
		$maxsize=1280;
		
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
			exit("<p class='message'>ERROR_UNKNOWN</p>");
		}
		if($success_R){
			$sizeVerified=true;
		}else{
			exit("<p class='message'>ERROR_UNKNOWN</p>");
		}
	}else{
		$sizeVerified=true;
		//echo "<p id='size'>size ok</p>";
	}
		
	
	if(!$sizeVerified){
		exit("<p class='message'>ERROR_UNKNOWN</p>");
	}
	
	require_once('ResizeImage.php');
		
	$maxsize=450;
	$destinationT=$destination.'/thumbs/';
	try{
		$resize=new image_Resize($image);
		$resize->setDestination($destinationT);
		$resize->setMaxSize($maxsize);
		$resize->setSuffix('');
		$resize->create();
		$messages_T=$resize->getMessages();
		$success_T=$resize->thumbCreated();
		
	} catch (Exception $e){
		$error=$e->getMessage();
		exit("<p class='message'>ERROR_UNKNOWN</p>");
	}
	if($success_T){
		$thumbcreated=true;
	}else{
		exit("<p class='message'>ERROR_UNKNOWN</p>");
	}
	
	
	
}
		


$pic_location=$_POST['picturewhere'];



switch ($pic_location){
	case "jewelry1";
	$pic_where="1";
	break;
	
	case "jewelry2";
	$pic_where="2";
	break;
	
	case "jewelry3";
	$pic_where="3";
	break;
	
	case "jewelry4";
	$pic_where="4";
	break;
	
	case "jewelry5";
	$pic_where="5";
	break;
	
	case "jewelry6";
	$pic_where="6";
	break;
	
	case "jewelry7";
	$pic_where="7";
	break;
	
	case "jewelry8";
	$pic_where="8";
	break;
}

if($pic_location=="sitemedia"){
	require_once('../cn/connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	$sql_insert='INSERT INTO site_pics (image, submitted_at) VALUES (:image, NOW())';
	$stmt=$conn->prepare($sql_insert);	  
			
	$stmt->bindParam(':image', $final_name, PDO::PARAM_STR);
	
	$stmt->execute();
	$OK=$stmt->rowCount();
	
	$error=$conn->errorInfo();
	if(isset($error[2])) die($error[2]);
	if(isset($error[1])) die($error[1]);
	
	if(!$OK){
		exit('<p class="message">ERROR_UNKNOWN - database</p>');
	}
}


	echo '<p class="message">OK</p>';
	echo '<p id="imagename">'.$final_name.'</p>';
	echo '<p id="imagewhere">'.$pic_where.'</p>';


?>