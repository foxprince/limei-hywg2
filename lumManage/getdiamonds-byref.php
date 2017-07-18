<?php
session_start();


if(!isset($_SESSION['authenticated'])) {
  exit();
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
    exit();
}


if(!isset($_POST['stockref'])){
	exit('no data posted');
}

$crr_search=strtoupper($_POST['stockref']);




require_once('../../belgem/includes/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");



$sql_crr='SELECT * FROM diamonds WHERE stock_ref = "'.$crr_search.'" OR stock_num_rapnet = "'.$crr_search.'"';

$stmt_crr=$conn->query($sql_crr);
$error=$conn->errorInfo();
if(isset($error[2])) exit($error[2]);


$found_crr=$stmt_crr->rowCount();


if(isset($_SESSION['searchlist'])){
	$thesearchlist_str=$_SESSION['searchlist'];
	$listarray=explode("|", $thesearchlist_str);
}else{
	$thesearchlist_str='';
	$listarray=array();
}


$r=0;




if($found_crr){
	
if(isset($_SESSION['searchlist'])){
	
	$listarray=array_unique($listarray);
	
	$thesearchlist_str=$crr_search;
	foreach($listarray as $refrow){
		if($refrow!=$crr_search){
			$thesearchlist_str.='|'.$refrow;
		}
	}
	$_SESSION['searchlist']=$thesearchlist_str;
}else{
	$_SESSION['searchlist']=$crr_search;
}


foreach($stmt_crr as $row){
$r++;
?>






<p class="<?php echo $r; ?> valueline crrsearchresult" title="<?php echo $row['stock_ref']; ?>">


<span class="valuetxt stockref_txt" style="line-height:9px;">
<?php echo $row['stock_ref']; ?>
<br />
<span style="font-size:9px; color:#666;">(#<?php echo $row['stock_num_rapnet']; ?>)</span>
</span>

<span class="valuetxt shape_txt">
<?php
switch ($row['shape']){
	case "BR":
	$pic_where="01.gif";
	break;
	
	case "CU":
	$pic_where="12.gif";
	break;
	
	case "EM":
	$pic_where="10.gif";
	break;
	
	case "AS":
	$pic_where="10.gif";
	break;
	
	case "HS":
	$pic_where="08.gif";
	break;
	
	case "MQ":
	$pic_where="05.gif";
	break;
	
	
	case "OV":
	$pic_where="11.gif";
	break;
	
	
	case "PR":
	$pic_where="03.gif";
	break;
	
	case "PS":
	$pic_where="02.gif";
	break;
	
	case "RAD":
	$pic_where="06.gif";
	break;
	
	case "TRI":
	$pic_where="04.gif";
	break;
	
	default:
	$pic_where="01.gif";
}
?>
<img height="25" src="../images/site_elements/icons/<?php echo $pic_where; ?>" />
</span>



<span class="valuetxt weight_txt">
<span class="thevaluetxt">
<?php 
$thesizeofdiamond=$row['carat'];

echo number_format($thesizeofdiamond,2); 
?>
</span>克拉
</span>



<span class="valuetxt colorvalue">
<?php

echo $row['color'];

?>
</span>


<span class="valuetxt clarityvalue"><?php echo $row['clarity']; ?></span>



<span class="cutting_grade"> 
<span class="cutting_grade_inner">
<span class="valuetxt cuttinggrade_txt"><?php echo $row['cut_grade']; ?></span>
<span class="valuetxt cuttinggrade_txt"><?php echo $row['polish']; ?></span>
<span class="valuetxt cuttinggrade_txt"><?php echo $row['symmetry']; ?></span>
</span>
</span>

<span class="valuetxt fluo_txt">荧光: <?php echo $row["fluorescence_intensity"]; ?></span>

<?php
$certi_num=$row['certificate_number'];
$thelab=$row['grading_lab'];
if('GIA'==$thelab){
	$certi_link='http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='.$certi_num;
}else if('IGI'==$thelab){
	//$certi_link='http://www.igiworldwide.com/igi/verify.php?r='.$certi_num;
	$certi_link='http://www.igiworldwide.com/verify.php?r='.$certi_num;
}else if('HRD'==$thelab){
	$certi_link='http://www.hrdantwerplink.be/index.php?record_number='.$certi_num;
}else{
	$certi_link='#not-available';
}
?>

<span class="valuetxt certivalue">
<a target="_blank" class="certi-linker" href="<?php echo $certi_link; ?>"><?php echo $row['grading_lab']; ?></a>
<span class="certi-num"><?php echo $certi_num; ?></span>
</span>

<span class="valuetxt">
价格: <span class="thevaluetxt">
<?php
$raw_price=$row['raw_price_retail'];
$selling_price=$row['retail_price'];
echo round($selling_price);
echo '<span class="rawprice">(raw:'.$raw_price.')</span>';//$price_ratio
//echo '<span class="rawprice">(ratio:'.$price_ratio.')</span>';//$price_ratio
?>

</span>
</span>




<span class="more-detail">
<!--
<button class="seemore-thisdiamondbtn" onclick="seemore('<?php echo $row['stock_ref']; ?>')">详情</button>
-->
<?php
if($_SESSION['account']=='superadmin'){
	if($row['from_company']!=NULL && $row['from_company']!=''){
?>	
<span style="font-size:14px;" class="companynamefordia"><?php echo $row['from_company']; ?></span>
<span style="font-size:12px;" class="companytelfordia"><?php echo $row['contact_tel']; ?></span>
<?php
	}else{
		echo '-';
	}
}
?>
</span>


<button class="choosethisdiamondbtn" onclick="chooseToView('<?php echo $row['stock_ref']; ?>')">备选</button>

</p>
<?php
}

}else{
?>
<p>没有找到库存编号为‘<?php echo $crr_search; ?>’的钻石。</p>
<?php
}
#######################################################################################################
#######################################################################################################
#######################################################################################################
#######################################################################################################
#######################################################################################################
#######################################################################################################
#######################################################################################################


foreach($listarray as $refcrr){
if(trim($refcrr)!='' && $crr_search!=$refcrr){
$sql_crr_list='SELECT * FROM diamonds WHERE stock_ref = "'.$refcrr.'"';
$stmt_list=$conn->query($sql_crr_list);
$found_list=$stmt_list->rowCount();
if($found_list){
foreach($stmt_list as $row){
	$r++;
?>







<p class="<?php echo $r; ?> valueline" title="<?php echo $row['stock_ref']; ?>">


<span class="valuetxt stockref_txt">
<?php echo $row['stock_ref']; ?>
</span>

<span class="valuetxt shape_txt">
<?php
switch ($row['shape']){
	case "BR":
	$pic_where="01.gif";
	break;
	
	case "CU":
	$pic_where="12.gif";
	break;
	
	case "EM":
	$pic_where="10.gif";
	break;
	
	case "AS":
	$pic_where="10.gif";
	break;
	
	case "HS":
	$pic_where="08.gif";
	break;
	
	case "MQ":
	$pic_where="05.gif";
	break;
	
	
	case "OV":
	$pic_where="11.gif";
	break;
	
	
	case "PR":
	$pic_where="03.gif";
	break;
	
	case "PS":
	$pic_where="02.gif";
	break;
	
	case "RAD":
	$pic_where="06.gif";
	break;
	
	case "TRI":
	$pic_where="04.gif";
	break;
	
	default:
	$pic_where="01.gif";
}
?>
<img height="25" src="../images/site_elements/icons/<?php echo $pic_where; ?>" />
</span>



<span class="valuetxt weight_txt">
<span class="thevaluetxt">
<?php 
$thesizeofdiamond=$row['carat'];

echo number_format($thesizeofdiamond,2); 
?>
</span>克拉
</span>



<span class="valuetxt colorvalue">
<?php

echo $row['color'];

?>
</span>


<span class="valuetxt clarityvalue"><?php echo $row['clarity']; ?></span>



<span class="cutting_grade"> 
<span class="cutting_grade_inner">
<span class="valuetxt cuttinggrade_txt"><?php echo $row['cut_grade']; ?></span>
<span class="valuetxt cuttinggrade_txt"><?php echo $row['polish']; ?></span>
<span class="valuetxt cuttinggrade_txt"><?php echo $row['symmetry']; ?></span>
</span>
</span>

<span class="valuetxt fluo_txt">荧光: <?php echo $row["fluorescence_intensity"]; ?></span>

<?php
$certi_num=$row['certificate_number'];
$thelab=$row['grading_lab'];
if('GIA'==$thelab){
	$certi_link='http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='.$certi_num;
}else if('IGI'==$thelab){
	//$certi_link='http://www.igiworldwide.com/igi/verify.php?r='.$certi_num;
	$certi_link='http://www.igiworldwide.com/verify.php?r='.$certi_num;
}else if('HRD'==$thelab){
	$certi_link='http://www.hrdantwerplink.be/index.php?record_number='.$certi_num;
}else{
	$certi_link='#not-available';
}
?>

<span class="valuetxt certivalue">
<a target="_blank" class="certi-linker" href="<?php echo $certi_link; ?>"><?php echo $row['grading_lab']; ?></a>
<span class="certi-num"><?php echo $certi_num; ?></span>
</span>

<span class="valuetxt">
价格: <span class="thevaluetxt">
<?php
$raw_price=$row['raw_price_retail'];
$selling_price=$row['retail_price'];
echo round($selling_price);
echo '<span class="rawprice">(raw:'.$raw_price.')</span>';//$price_ratio
//echo '<span class="rawprice">(ratio:'.$price_ratio.')</span>';//$price_ratio
?>

</span>
</span>




<span class="more-detail">
<!--
<button class="seemore-thisdiamondbtn" onclick="seemore('<?php echo $row['stock_ref']; ?>')">详情</button>
-->
<?php
if($_SESSION['account']=='superadmin'){
	if($row['from_company']!=NULL && $row['from_company']!=''){
?>	
<span style="font-size:14px;" class="companynamefordia"><?php echo $row['from_company']; ?></span>
<span style="font-size:12px;" class="companytelfordia"><?php echo $row['contact_tel']; ?></span>
<?php
	}else{
		echo '-';
	}
}
?>
</span>


<button class="choosethisdiamondbtn" onclick="chooseToView('<?php echo $row['stock_ref']; ?>')">备选</button>

</p>



<?php
}
}
}	
}
?>
