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


if(!isset($_POST['shape'])){
	exit('no data posted - shape');
}
if(!isset($_POST['color'])){
	exit('no data posted - color');
}
if(!isset($_POST['clarity'])){
	exit('no data posted - clarity');
}
if(!isset($_POST['weight_from'])){
	exit('no data posted - weightfrom');
}
if(!isset($_POST['weight_to'])){
	exit('no data posted -weightto');
}
if(!isset($_POST['price_from'])){
	exit('no data posted - pricefrom');
}
if(!isset($_POST['price_to'])){
	exit('no data posted - priceto');
}
if(!isset($_POST['featured'])){
	exit('no data posted - featured');
}
if(!isset($_POST['sorting'])){
	exit('no data posted - sorting');
}


//if($_POST || $_GET){include('../includes/nuke_magic_quotes.php');}


$and='';

if($_POST['shape']==''){
	$query_shape='';
}else{
	$query_shape=' ('.$_POST['shape'].')';
	$and=' AND ';
}

if($_POST['color']==''){
	$query_color='';
}else{
	$query_color=$and.' ('.$_POST['color'].')';
	$and=' AND ';
}

if($_POST['clarity']==''){
	$query_clarity='';
}else{
	$query_clarity=$and.' ('.$_POST['clarity'].')';
	$and=' AND ';
}

if($_POST['cut']==''){
	$query_cut='';
}else{
	$query_cut=$and.' ('.$_POST['cut'].')';
	$and=' AND ';
}

if($_POST['polish']==''){
	$query_polish='';
}else{
	$query_polish=$and.' ('.$_POST['polish'].')';
	$and=' AND ';
}

if($_POST['sym']==''){
	$query_sym='';
}else{
	$query_sym=$and.' ('.$_POST['sym'].')';
	$and=' AND ';
}

if($_POST['fluo']==''){
	$query_fluo='';
}else{
	$query_fluo=$and.' ('.$_POST['fluo'].')';
	$and=' AND ';
}

if($_POST['certi']==''){
	$query_certi='';
}else{
	$query_certi=$and.' ('.$_POST['certi'].')';
	$and=' AND ';
}

if($_POST['weight_from']==''){
	$query_weight_from=0;
}else{
	$query_weight_from=str_replace(',','.',$_POST['weight_from'])-0.01;
}

if($_POST['weight_to']==''){
	$query_weight_to='100';
}else{
	$query_weight_to = str_replace(',','.',$_POST['weight_to'])+0.01;
}

if($_POST['price_from']==''){
	$query_price_from=0;
}else{
	$query_price_from=$_POST['price_from'];
}

if($_POST['price_to']==''){
	$query_price_to=9999999;
}else{
	$query_price_to=$_POST['price_to'];
}

$featured=$_POST['featured'];
if($featured=='YES'){
	$featured=' AND featured = "YES" ';
}else{
	$featured='';
}

if(isset($_POST['crr_page'])){
	$crr_page=$_POST['crr_page'];
}else{
	$crr_page=1;
}

$startfrom=($crr_page-1)*35;




$sorting_direction=$_POST['sorting_direction'];

$sorting=$_POST['sorting'];


switch ($sorting){
	
	case "weight":
	$query_sorting =' ORDER BY carat '.$sorting_direction;
	break;
	
	case "color":
	$query_sorting =' ORDER BY color '.$sorting_direction;
	break;
	
	case "clarity":
	$query_sorting =' ORDER BY clarity_number '.$sorting_direction;
	break;
	
	case "cut":
	$query_sorting =' ORDER BY cut_number '.$sorting_direction;
	break;
	
	case "price":
	$query_sorting =' ORDER BY price '.$sorting_direction;
	break;
	
	default:
	$query_sorting =' ORDER BY price '.$sorting_direction;
	break;
	
}

//$query_sorting =' ORDER BY price ASC';

require_once('../../belgem/includes/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql_count='SELECT COUNT(*) AS num FROM diamonds WHERE'.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(carat BETWEEN '.$query_weight_from.' AND '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured;

//exit($sql_count);

foreach($conn->query($sql_count) as $num){
	$result_number=$num['num'];
}
$diamonds_number=$result_number;
/**/

$sql='SELECT * FROM diamonds WHERE'.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(carat BETWEEN '.$query_weight_from.' AND '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured.' '.$query_sorting.' LIMIT '.$startfrom.', 35';


//exit($sql);


$stmt=$conn->query($sql);
$error=$conn->errorInfo();
if(isset($error[2])) exit($error[2]);



$r=0;
foreach($stmt as $row){
$r++;
?>






<p class="<?php echo $r; ?> valueline" title="<?php echo $row['stock_ref']; ?>">


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
?>

<div id="howmanyrecords" style="display:none;"><?php echo $diamonds_number; ?></div>

<?php
$howmanypages=ceil($diamonds_number/50);
if($howmanypages>1){
?>
<p id="page-navi">第
<?php
	for($i=1; $i<=$howmanypages; $i++){
		if($crr_page==$i){
			$crrPageClass='class="crr-page"';			
		}else{
			$crrPageClass='';
		}
?>
 <button <?php echo $crrPageClass; ?> onclick="choosethispage('<?php echo $i; ?>')"><?php echo $i; ?></button> 
<?php
	}
?>
页</p>
<?php
}
?>