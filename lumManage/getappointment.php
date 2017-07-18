<?php
if(!isset($_POST['cliend_id'])){
	exit('NO_DATA');
}

$client_id=$_POST['cliend_id'];
       
	   
require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");                                                                

//$sql='SELECT * FROM viewing_record WHERE viewer = "'.$client_id.'" AND view_time > SUBDATE(NOW(), INTERVAL 2 DAY) AND extra_info != "SOLD"';
$sql='SELECT * FROM viewing_record WHERE viewer = "'.$client_id.'" AND view_time > SUBDATE(NOW(), INTERVAL 2 DAY) AND extra_info <> "SOLD"';

$stmt=$conn->query($sql);
$found=$stmt->rowCount();

if($found){	
	foreach($stmt as $row){
		$diamondid=$row['diamond'];
		$app_date=$row['view_time'];
		$sql_dia='SELECT * FROM diamonds_history WHERE diamond_id = "'.$diamondid.'"';
		foreach($conn->query($sql_dia) as $row_dia){
			$shape=$row_dia['shape'];
			$size=$row_dia['carat'];
			$color=$row_dia['color'];
			$fancy_color_dominant_color=$row_dia['fancy_color'];
			$clarity=$row_dia['clarity'];
			$cut=$row_dia['cut_grade'];
			$polish=$row_dia['polish'];
			$symmetry=$row_dia['symmetry'];
			$fluor_intensity=$row_dia['fluorescence_intensity'];
			$lab=$row_dia['grading_lab'];
			$total_sales_price_in_currency=$row_dia['price'];
			$seller_company=$row_dia['seller_company'];
			$seller_name=$row_dia['seller_name'];
			$seller_phone=$row_dia['seller_phone'];
			$seller_country=$row_dia['seller_country'];
			$seller_email=$row_dia['seller_email'];
		}
?>

<div class="complete-detial-dia-toview saved" title="<?php echo $diamondid; ?>">

<p class="to-view-detail" title="<?php $diamondid; ?>">
<span class="valuetxt view_stockref_txt">
<?php echo $diamondid; ?>
</span>

<!--
<span class="valuetxt view_shape_txt">
<?php
switch ($shape){
	case "Round":
	$pic_where="01.gif";
	break;
	
	case "Cushion":
	$pic_where="12.gif";
	break;
	
	case "Emerald":
	$pic_where="10.gif";
	break;
	
	case "Asscher":
	$pic_where="10.gif";
	break;
	
	case "Heart":
	$pic_where="08.gif";
	break;
	
	case "Marquise":
	$pic_where="05.gif";
	break;
	
	
	case "Oval":
	$pic_where="11.gif";
	break;
	
	
	case "Princess":
	$pic_where="03.gif";
	break;
	
	case "Pear":
	$pic_where="02.gif";
	break;
	
	case "Radiant":
	$pic_where="06.gif";
	break;
	
	
	
	default:
	$pic_where="01.gif";
}
?>
<img height="15" src="../images/site_elements/icons/<?php echo $pic_where; ?>" />
</span>



<span class="valuetxt view_weight_txt">
<span class="thevaluetxt">
<?php 
$thesizeofdiamond=$size;

if($thesizeofdiamond<=0.89){
	$price_ratio=1.35;
}else if($thesizeofdiamond>0.89 && $thesizeofdiamond<=1.49){
	$price_ratio=1.3;
}else if($thesizeofdiamond>1.49 && $thesizeofdiamond<=2.99){
	$price_ratio=1.2;
}else if($thesizeofdiamond>2.99){
	$price_ratio=1.15;
}

echo number_format($thesizeofdiamond,2); 
?>
</span>克拉
</span>



<span class="valuetxt view_colorvalue">
<?php
if($fancy_color_dominant_color!=NULL && ($fancy_color_dominant_color)!=''){
	echo '彩钻:'.$fancy_color_dominant_color;
}else{
	echo $color;
}
?>
</span>


<span class="valuetxt view_clarityvalue"><?php echo $clarity; ?></span>



<span class="view_cutting_grade">切工: 
<span class="view_cutting_grade_inner">
<span class="valuetxt view_cuttinggrade_txt"><?php echo shortcutForCutting($cut); ?></span>
<span class="valuetxt view_cuttinggrade_txt"><?php echo shortcutForCutting($polish); ?></span>
<span class="valuetxt view_cuttinggrade_txt"><?php echo shortcutForCutting($symmetry); ?></span>
</span>
</span>

<span class="valuetxt view_fluo_txt">荧光强度: <?php echo $fluor_intensity; ?></span>

<span class="valuetxt view_certivalue"><?php echo $lab; ?></span>

<span class="view_valuetxt">
价格: <span class="view_thevaluetxt">
<?php
$raw_price=$total_sales_price_in_currency;
$selling_price=($raw_price-20)/1.1*$price_ratio;
echo round($selling_price);
echo '<span class="view_rawprice">(raw:'.$raw_price.')</span>';
?>

</span>
</span>
-->
</p>

<p class="companydetail">
<span><?php echo $seller_company; ?>,</span>
<span><?php echo $seller_phone; ?></span>
</p>

<span class="app_time"><?php echo $app_date; ?></span><button class="canceltoviewbtn" onclick="canceltoview('<?php echo $diamondid; ?>')">取消</button>

<p class="buy-action-container">
<!--
成交价：<input type="text" id="price_<?php echo $diamondid; ?>" style="width:98px;" />
-->
<button class="buydiamondbtn" onclick="buydiamond('<?php echo $diamondid; ?>')">购买 </button>
</p>

</div>

<?php
	}
	
}
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

