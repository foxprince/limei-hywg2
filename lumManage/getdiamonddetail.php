<?php
if(!isset($_POST['diamond_id'])){
	exit('NO_DATA');
}

$diamondid=$_POST['diamond_id'];

require_once('../../belgem/includes/connection.php');
$conn_dia=dbConnect('write','pdo');
$conn_dia->query("SET NAMES 'utf8'");


$sql_dia='SELECT * FROM diamonds WHERE stock_ref = "'.$diamondid.'"';

$stmt_dia=$conn_dia->query($sql_dia);
foreach($stmt_dia as $row_dia){
}

//$diamond_detail=$obj_reply->{'response'}->{'body'}->{'diamond'};

$shape=$row_dia['shape'];
$size=$row_dia['carat'];
$color=$row_dia['color'];
$fancy_color_dominant_color=$row_dia['fancy_color'];
$fancy_color_secondary_color='-';
$fancy_color_overtone='-';
$fancy_color_intensity='-';
$clarity=$row_dia['clarity'];
$cut=$row_dia['cut_grade'];
$symmetry=$row_dia['symmetry'];
$polish=$row_dia['polish'];
$depth_percent='-';
$fluor_color='-';
$fluor_intensity=$row_dia['fluorescence_intensity'];
$total_sales_price_in_currency=($row_dia['raw_price_retail'])*1.01;
$lab=$row_dia['grading_lab'];
$cert_num=$row_dia['certificate_number'];
$stock_num='-';
$sellerdetials='-';
$seller_account_id='-';
$seller_company=$row_dia['from_company'];
$seller_name='-';
$seller_email='-';
$seller_phone=$row_dia['contact_tel'];
$seller_country=$row_dia['country'];
$seller_state='-';
$seller_city='-';


//require_once('../connection.php');


function dbConnect2nd($usertype='write', $connectionType = 'pdo') {
	$host = 'localhost';
	$db = 'sihui_limei';
	if ($usertype  == 'read') {
	$user = 'sihui_liu';
	$pwd = 'p@ss0Day!';
	} elseif ($usertype == 'write') {
	$user = 'sihui_liu';
	$pwd = 'p@ss0Day!';
	} else {
	exit('Unrecognized connection type');
	}
	if ($connectionType == 'mysqli') {
	return new mysqli($host, $user, $pwd, $db) or die ('Cannot open database');
	} else {
	try {
	  return new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
	} catch (PDOException $e) {
	  echo 'Cannot connect to database';
	  exit;
	}
	}
}


$conn=dbConnect2nd('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql_check='SELECT COUNT(*) AS found FROM diamonds_history WHERE diamond_id = "'.$diamondid.'"';
$stmt_check=$conn->query($sql_check);
foreach($stmt_check as $row){
	$found=$row['found'];
}


if($found<=0){
	$sql='INSERT diamonds_history (diamond_id, stock_ref, shape, carat, color, fancy_color, clarity, grading_lab, certificate_number, cut_grade, polish, symmetry, fluorescence_intensity, price, seller_account_id, seller_company, seller_name, seller_email, seller_phone, seller_country, seller_state, seller_city) VALUE (:diamond_id, :stock_ref, :shape, :carat, :color, :fancy_color, :clarity, :grading_lab, :certificate_number, :cut_grade, :polish, :symmetry, :fluorescence_intensity, :price, :seller_account_id, :seller_company, :seller_name, :seller_email, :seller_phone, :seller_country, :seller_state, :seller_city)';
	
	$stmt=$conn->prepare($sql);	  
					
	$stmt->bindParam(':diamond_id', $diamondid, PDO::PARAM_STR);
    $stmt->bindParam(':stock_ref', $stock_num, PDO::PARAM_STR);
	$stmt->bindParam(':shape', $shape, PDO::PARAM_STR);
	$stmt->bindParam(':carat', $size, PDO::PARAM_STR);
	$stmt->bindParam(':color', $color, PDO::PARAM_STR);
	$stmt->bindParam(':fancy_color', $fancy_color_dominant_color, PDO::PARAM_STR);
	$stmt->bindParam(':clarity', $clarity, PDO::PARAM_STR);
	$stmt->bindParam(':grading_lab', $lab, PDO::PARAM_STR);
	$stmt->bindParam(':certificate_number', $cert_num, PDO::PARAM_STR);
	$stmt->bindParam(':cut_grade', $cut, PDO::PARAM_STR);
	$stmt->bindParam(':polish', $polish, PDO::PARAM_STR);
	$stmt->bindParam(':symmetry', $symmetry, PDO::PARAM_STR);
	$stmt->bindParam(':fluorescence_intensity', $fluor_intensity, PDO::PARAM_STR);
	$stmt->bindParam(':price', $total_sales_price_in_currency, PDO::PARAM_STR);
	$stmt->bindParam(':seller_account_id', $seller_account_id, PDO::PARAM_STR);
	$stmt->bindParam(':seller_company', $seller_company, PDO::PARAM_STR);
	$stmt->bindParam(':seller_name', $seller_name, PDO::PARAM_STR);
	$stmt->bindParam(':seller_email', $seller_email, PDO::PARAM_STR);
	$stmt->bindParam(':seller_phone', $seller_phone, PDO::PARAM_STR);
	$stmt->bindParam(':seller_country', $seller_country, PDO::PARAM_STR);
	$stmt->bindParam(':seller_state', $seller_state, PDO::PARAM_STR);
	$stmt->bindParam(':seller_city', $seller_city, PDO::PARAM_STR);
	
	$stmt->execute();
	$OK=$stmt->rowCount();
}
?>

<div class="complete-detial-dia-toview" title="<?php echo $diamondid; ?>">

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
<span><?php echo $seller_company; ?></span>
<!--
<span>联系人: <?php echo $seller_name; ?></span>
-->
<span><?php echo $seller_phone; ?></span>
</p>

<span class="app_time">尚未预定日期</span><button class="canceltoviewbtn" onclick="canceltoview('<?php echo $diamondid; ?>')">取消</button>
</div>

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

