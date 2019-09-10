<?php
session_start();

if(isset($_SESSION['the_account'])){
	$accountname=$_SESSION['the_account'];
}else{
	exit("no session value");
}

if(!isset($_POST['account'])){
	exit("no posted value");
}

if($accountname!=$_POST['account']){
	exit("account no match");
}



require_once('../../_global_functionalities/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


//save info data in database 
if(isset($_POST['account']) && isset($_POST["project"]) && isset($_POST["image_name"])){
	
	$accountname=$_POST['account'];
	$project_insert=$_POST["project"];
	$imagename_insert=$_POST["image_name"];
	
	
	$theimagepath="../../../$accountname/____theworks/$imagename_insert";
	$size=getimagesize($theimagepath); 
	
	$imagewidth=$size[0];
	$imageheight=$size[1];
	
	$imagetype=$size[2];
	if(!in_array($imagetype , array(IMAGETYPE_GIF, IMAGETYPE_JPEG,IMAGETYPE_PNG))){
		exit("The file type of $imagename_insert is not supported.");
	}
	
	$worktitle_insert="";
	$category="visual art";
	$workdescription_insert="";
	
	$insertOK=false;
	
	$sql_count='SELECT MAX(order_number) AS max_order_number FROM works WHERE account="'.$accountname.'" AND project="'.$project_insert.'"';
	$result_db=$conn->query($sql_count);
	$error_count = $conn->errorInfo();
	if(isset($eror_count[2])) exit("database problem");
	
	foreach($result_db as $num){
		$order_insert=$num['max_order_number']+1;
	}
	
	
	$sql_insert='INSERT INTO works (account, project, image_name, image_width, image_height, worktitle, category, image_description, order_number) 
				 VALUES(:account, :project, :image_name, :image_width, :image_height, :worktitle, :category, :image_description, :order_number)';
	$stmt=$conn->prepare($sql_insert);	
	
	$stmt->bindParam(':account', $accountname, PDO::PARAM_STR);
	$stmt->bindParam(':project', $project_insert, PDO::PARAM_STR);  
	$stmt->bindParam(':image_name', $imagename_insert, PDO::PARAM_STR);
	$stmt->bindParam(':image_width',$imagewidth, PDO::PARAM_INT);
	$stmt->bindParam(':image_height',$imageheight, PDO::PARAM_INT);
	$stmt->bindParam(':worktitle', $worktitle_insert, PDO::PARAM_STR);
	$stmt->bindParam(':category', $category, PDO::PARAM_STR);
	$stmt->bindParam(':image_description',$workdescription_insert, PDO::PARAM_STR);
	$stmt->bindParam(':order_number',$order_insert, PDO::PARAM_INT);
	$stmt->execute();
	$insertOK=$stmt->rowCount();
	
	if($insertOK){
		exit('ok');
	
	}else{
		echo "data posting problem";
		$error=$stmt->errorInfo();
		if(isset($error[2])){
			$error=$error[2];
			$message_db='We\'re sorry, An error occurred during the submission, please try again.';
		}
	}
	
}       

?>