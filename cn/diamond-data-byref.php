<?php
if(!isset($_POST['number'])){
	exit('no data posted - number');
}

$numbertosearch=$_POST['number'];


if($_POST || $_GET){include('nuke_magic_quotes.php');}



require_once('connection-dia-data.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");



$sql='SELECT * FROM diamonds WHERE stock_ref LIKE "'.$numbertosearch.'" OR certificate_number = "'.$numbertosearch.'"';

//exit($sql);

$stmt=$conn->query($sql);
$found=$stmt->rowCount();
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
	$shape_TXT='祖母绿形';
	break;

	case "AS":
	$pic_where="10.gif";
	$shape_TXT='祖母绿形';
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
	$shape_TXT='公主方形';
	break;

	case "PS":
	$pic_where="02.gif";
	$shape_TXT='梨形';
	break;

	case "RAD":
	$pic_where="06.gif";
	$shape_TXT='雷蒂恩形';
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


</span><span class="detail-btn">详情</span>

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

<span class="btnforprice" onclick="openthepriceinfo()">价格</span>

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

<div id="howmanyrecords" style="display:none;"><?php echo $found; ?></div>

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
