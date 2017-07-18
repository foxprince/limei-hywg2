<?php
if(isset($_GET['diamondid'])){
    $diamond=$_GET['diamondid'];
}else{
	exit('no data');
}
if(isset($_GET['clientid'])){
    $client=$_GET['clientid'];
}else{
	exit('no data');
}



/*
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
*/




//$address=$address_invoice.' '.$postcode_invoice.', '.$country_invoice;



require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql_find='SELECT * FROM purchase_record WHERE diamond = "'.$diamond.'" AND buyer = "'.$client.'"';
foreach($conn->query($sql_find) as $row){
	$euros_invoice=$row['actual_price_euros'];
	$yuan_invoice=$row['actual_price_yuan'];
	$ring=$row['ring'];
	$buytime=date("Y-m-d", strtotime($row['action_time']));
}

$sql_client='SELECT * FROM clients_list WHERE id = "'.$client.'"';
foreach($conn->query($sql_client) as $row){
	$realname=$row['name'];
	$tel=$row['tel'];
	$address=$row['address'];
}

$sql_dia='SELECT * FROM diamonds_history WHERE diamond_id = "'.$diamond.'"';
foreach($conn->query($sql_dia) as $row){
	$diamond_size=$row['carat'];
	$color=$row['color'];
	$clarity=$row['clarity'];
	$grading_lab=$row['grading_lab'];
	$cut_grade=$row['cut_grade'];
	$polish=$row['polish'];
	$symmetry=$row['symmetry'];
}


$diamond_discription=$diamond_size.'CT '.$color.', '.$clarity.', '.shortcutForCutting($cut_grade).' '.shortcutForCutting($polish).' '.shortcutForCutting($symmetry).', '.$grading_lab.'<br />'.$ring;

require_once('generate_invoice.php');

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
generate_invoice($diamond_discription, $realname, $address, $tel, $ring, $euros_invoice, $yuan_invoice, $buytime);
?>

</body>
</html>
<?php

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