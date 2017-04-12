<?php
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


if($_POST || $_GET){include('nuke_magic_quotes.php');}


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
	$query_weight_from=str_replace(',','.',$_POST['weight_from']);
}

if($_POST['weight_to']==''){
	$query_weight_to='100';
}else{
	$query_weight_to = str_replace(',','.',$_POST['weight_to']);
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
	$query_sorting =' ORDER BY stock_ref '.$sorting_direction;
	break;

}



require_once('connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql_currency='SELECT * FROM convert_currency';
foreach($conn->query($sql_currency) as $row_currency){
	$USD_EUR=$row_currency['USD_EUR'];
	$USD_GBP=$row_currency['USD_GBP'];
	$USD_CNY=$row_currency['USD_CNY'];
}



$sql_count='SELECT COUNT(*) AS num FROM diamonds WHERE'.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(carat >= '.$query_weight_from.' AND carat <= '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured;
foreach($conn->query($sql_count) as $num){
	$result_number=$num['num'];
}
/**/

$sql='SELECT * FROM diamonds WHERE'.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(carat >= '.$query_weight_from.' AND carat <= '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured.' '.$query_sorting.' LIMIT '.$startfrom.', 35';

//exit($sql);

$stmt=$conn->query($sql);
$error=$conn->errorInfo();
if(isset($error[2])) exit($error[2]);
?>




<div id="dia-data-box">

<?php
$r=0;
foreach($stmt as $row){
	$r++;
?>
<div class="dia-piece-box">
<div class="<?php echo $r; ?> generalinfobox">

<!-- reference number, no use here 
<td align="center" class="ref_number">
<span class="valuetxt" style="width:102px;">
<?php echo $row['stock_ref']; ?>
</span>
</td>
-->

<span class="shapedesc-box">
<?php
switch ($row['shape']){
	case "BR":
	$pic_where="01.gif";
	$shape_TXT='圆形';
	break;

	case "CU":
	$pic_where="12.gif";
	$shape_TXT='枕形';
	break;

	case "EM":
	$pic_where="10.gif";
	$shape_TXT='祖母绿';
	break;

	case "AS":
	$pic_where="10.gif";
	$shape_TXT='祖母绿';
	break;

	case "HS":
	$pic_where="08.gif";
	$shape_TXT='心形';
	break;

	case "MQ":
	$pic_where="05.gif";
	$shape_TXT='橄榄形';
	break;


	case "OV":
	$pic_where="11.gif";
	$shape_TXT='椭圆形';
	break;


	case "PR":
	$pic_where="03.gif";
	$shape_TXT='公主方';
	break;

	case "PS":
	$pic_where="02.gif";
	$shape_TXT='梨形';
	break;

	case "RAD":
	$pic_where="06.gif";
	$shape_TXT='雷蒂恩';
	break;

	case "TRI":
	$pic_where="04.gif";
	$shape_TXT='三角形';
	break;

	default:
	$pic_where="01.gif";
	$shape_TXT='圆形';
}
?>
  <img class="shapeicon" src="../images/site_elements/icons/<?php echo $pic_where; ?>" />
  <span class="shape-txt"><?php echo $shape_TXT; ?></span>
</span>


<span class="valuetxt value_carat">

<?php
	echo number_format($row['carat'],2);
	$thesizeofdiamond=$row['carat'];

	if($thesizeofdiamond<=0.89){
		$price_ratio=1.35;
	}else if($thesizeofdiamond>0.89 && $thesizeofdiamond<=1.49){
		$price_ratio=1.3;
	}else if($thesizeofdiamond>1.49 && $thesizeofdiamond<=2.99){
		$price_ratio=1.2;
	}else if($thesizeofdiamond>2.99){
		$price_ratio=1.15;
	}
?>
克拉


</span><span class="valuetxt value_color">

颜色 <?php echo $row['color']; ?> 



</span><span class="valuetxt value_clarity">净度 <?php echo $row['clarity']; ?>


</span><span class="valuetxt value_certificate">证书 <?php echo $row['grading_lab']; ?>


</span><span class="valuetxt value_cut">切工 
<?php
if($row['cut_grade']==NULL || $row['cut_grade']==''){ 
	echo '-';
}else{
	echo $row['cut_grade'];
}
?>



</span><span class="valuetxt value_polish">抛光 <?php echo $row['polish']; ?>
</span><span class="valuetxt value_symmetry">对称性 <?php echo $row['symmetry']; ?>

<?php
$price=$row['retail_price'];
$euro_price=round($price*$USD_EUR).'欧元';
$yuan_price=round($price*$USD_CNY).'元人民币';
$dollar_price=round($price).'美元';
?>
</span><span class="valuetxt value_priceeuro"><?php echo $euro_price ?></span><span class="detail-btn">详情</span>

</div><!-- end generalinfobox -->

<div id="d_<?php echo $r; ?>" class="details">

<p class="details_txt">
<span>
荧光强度:
<?php
echo $row["fluorescence_intensity"];
?>
</span>
<span> 
所在地: <?php echo $row['country']; ?>
</span>
<span>
证书编号: <?php echo $row['certificate_number']; ?>
 &nbsp; &nbsp;
<?php
if(trim($row["grading_lab"])=='HRD'){
?>
<a class="certi_linker" target="_blank" href="http://www.hrdantwerplink.be/index.php?record_number=<?php echo $row['certificate_number']; ?>&weight=<?php echo $row['carat']; ?>&L=">查看证书</a>
<?php
}else if(trim($row["grading_lab"])=='GIA'){
?>
<a class="certi_linker" target="_blank" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno=<?php echo $row['certificate_number']; ?>">查看证书</a>
<?php
}else if(trim($row["grading_lab"])=='IGI'){
?>
<a class="certi_linker" target="_blank" href="http://www.igiworldwide.com/igi/verify.php?r=<?php echo $row['certificate_number']; ?>">查看证书</a>
<?php
}
?>

</span>

<span>库存编号 <?php echo $row['stock_ref']; ?></span>

<!--<span class="btnforprice" onclick="openthepriceinfo()">-->
<span class="price">
<?php echo $yuan_price; ?>
  <br />
<?php echo $dollar_price; ?>
</span>

<span class="btnforprice" onclick="opentheappointmentbox('<?php echo $row['id']; ?>')">预约看钻</span>

</p>

<?php
if(isset($row['recommend_words']) && $row['recommend_words']!=''){
?>
<p class="commentbox"><?php echo $row['recommend_words']; ?></p>
<?php
}
?>

</div><!-- end details -->

</div><!-- end dia-pice-box -->
<?php
}
?>
</div>

<div id="howmanyrecords" style="display:none;"><?php echo $result_number; ?></div>

<div style="display:none;">
	<div id="diamond-data-price-qrcode">
		<div style="text-align:center;padding: 10px;">请加我们客服咨询价格</div>
		<img src="../images/recommendation/qr_contact.jpg" />
	</div>
</div>
<script>
$('.diamond-data-price-trigger').fancybox({
	padding: 0,
	openEffect: 'elastic',
	closeEffect: 'elastic'
});
</script>
