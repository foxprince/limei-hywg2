<?php
if(!isset($_POST['client_id_for_invoice']) || !isset($_POST['diamond_id_for_invoice'])){
	exit('ERROR-NO POSTING DATA');
}


session_start();
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit('ERROR');
}
if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	if (isset($_COOKIE['limei112233'])){
		setcookie('limei112233', '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit('ERROR');
}


$diamond_id_for_invoice=$_POST['diamond_id_for_invoice'];
$client_id_for_invoice=$_POST['client_id_for_invoice'];
$realname_invoice=$_POST['realname_invoice'];
$address_invoice=$_POST['address_invoice'];
$postcode_invoice=$_POST['postcode_invoice'];
$country_invoice=$_POST['country_invoice'];
$tel_invoice=$_POST['tel_invoice'];
$ring=$_POST['ring'];
$euros_invoice=$_POST['euros_invoice'];
$yuan_invoice=$_POST['yuan_invoice'];


$address=$address_invoice.' '.$postcode_invoice.', '.$country_invoice;



require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql_update='UPDATE clients_list SET name = "'.$realname_invoice.'", tel = "'.$tel_invoice.'", address = "'.$address.'" WHERE id = "'.$client_id_for_invoice.'"';
$stmt_update=$conn->query($sql_update);


$status='BOUGHT';

$sql='INSERT INTO purchase_record (diamond, buyer, status, action_time, ring, actual_price_euros, actual_price_yuan) VALUES (:diamond, :buyer, :status, NOW(), :ring, :actual_price_euros, :actual_price_yuan)';

$stmt=$conn->prepare($sql);	  
		
$stmt->bindParam(':diamond', $diamond_id_for_invoice, PDO::PARAM_STR);
$stmt->bindParam(':buyer', $client_id_for_invoice, PDO::PARAM_STR);
$stmt->bindParam(':status', $status, PDO::PARAM_STR);
$stmt->bindParam(':ring', $ring, PDO::PARAM_STR);
$stmt->bindParam(':actual_price_euros', $euros_invoice, PDO::PARAM_STR);
$stmt->bindParam(':actual_price_yuan', $yuan_invoice, PDO::PARAM_STR);

$stmt->execute();
$OK=$stmt->rowCount();


$sql_update2='UPDATE viewing_record SET extra_info = "SOLD" WHERE diamond = "'.$diamond_id_for_invoice.'" AND viewer = "'.$client_id_for_invoice.'"';
$stmt_update2=$conn->query($sql_update2);
$updated2=$stmt_update2->rowCount();

$sql_dia='SELECT carat, color, clarity, grading_lab, cut_grade, polish, symmetry FROM diamonds_history WHERE diamond_id = "'.$diamond_id_for_invoice.'"';
foreach($conn->query($sql_dia) as $row){
	$dia_size=$row['carat'];
	$color=$row['color'];
	$dia_clarity=$row['clarity'];
	$grading_lab=$row['grading_lab'];
	$cut_grade=$row['cut_grade'];
	$polish=$row['polish'];
	$symmetry=$row['symmetry'];
}
$diamond_discription=$dia_size.'CT '.$color.', '.$dia_clarity.', '.shortcutForCutting($cut_grade).' '.shortcutForCutting($polish).' '.shortcutForCutting($symmetry).', '.$grading_lab.'<br />'.$ring;

require_once('generate_invoice.php');


function shortcutForCutting($grade){
	if($grade=='Excellent'){
		return 'EX';
	}else if($grade=='Very Good'){
		return 'VG';
	}else if($grade=='Good'){
		return 'G';
	}else if($grade=='Fair'){
		return 'F';
	}
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>LUMIA: INVOICE</title>
<style type="text/css">
table{
	border-right-style:solid;
	border-bottom-style:solid;
	border-width:1px;
	border-color:#999;
}
td{
	border-top-style:solid;
	border-left-style:solid;
	border-width:1px;
	border-color:#999;
	padding:8px;
}
</style>
</head>

<body>

<?php
generate_invoice($diamond_discription, $realname_invoice, $address, $tel_invoice, $ring, $euros_invoice, $yuan_invoice, 'NOW');
?>

</body>
</html>


