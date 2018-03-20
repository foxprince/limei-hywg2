<?php
session_start();
// if(!isset($_POST['shape'])){
// 	exit('no data posted - shape');
// }
// if(!isset($_POST['color'])){
// 	exit('no data posted - color');
// }
// if(!isset($_POST['clarity'])){
// 	exit('no data posted - clarity');
// }
// if(!isset($_POST['weight_from'])){
// 	exit('no data posted - weightfrom');
// }
// if(!isset($_POST['weight_to'])){
// 	exit('no data posted -weightto');
// }
// if(!isset($_POST['price_from'])){
// 	exit('no data posted - pricefrom');
// }
// if(!isset($_POST['price_to'])){
// 	exit('no data posted - priceto');
// }
// if(!isset($_POST['featured'])){
// 	exit('no data posted - featured');
// }
// if(!isset($_POST['sorting'])){
// 	exit('no data posted - sorting');
// }

if($_POST || $_GET){include('nuke_magic_quotes.php');}
$and='';
$fancy = false;
if($_POST['fancy'])
	$fancy = true;
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
require_once('log.php');
require_once('connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql_currency='SELECT * FROM convert_currency';
foreach($conn->query($sql_currency) as $row_currency){
	$USD_EUR=$row_currency['USD_EUR'];
	$USD_GBP=$row_currency['USD_GBP'];
	$USD_CNY=$row_currency['USD_CNY'];
}

if($_POST['currency']!=''){
	if($_POST['currency']=='EUR') {
		$query_price_from = $query_price_from/$USD_EUR;
		$query_price_to = $query_price_to/$USD_EUR;
	}
	else if($_POST['currency']=='CNY') {
		$query_price_from = $query_price_from/$USD_CNY;
		$query_price_to = $query_price_to/$USD_CNY;
	}
}
$featured=$_POST['featured'];
if($featured=='YES'){
	$featured=' AND featured = "YES" ';
}else{
	$featured='';
}

$pagesize = 10;
if(isset($_POST['crr_page'])){
	$crr_page=$_POST['crr_page'];
}else{
	$crr_page=1;
}
$startfrom=($crr_page-1)*$pagesize;
$sorting_direction=$_POST['sorting_direction'];
$sorting=$_POST['sorting'];
switch ($sorting){
	case "carat":
	$query_sorting =' ORDER BY carat '.$sorting_direction;
	break;

	case "color":
	$query_sorting =' ORDER BY color '.$sorting_direction;
	break;

	case "clarity":
	$query_sorting =' ORDER BY clarity '.$sorting_direction;
	break;

	case "cut":
	$query_sorting =' ORDER BY cut_grade '.$sorting_direction;
	break;

	case "polish":
	$query_sorting =' ORDER BY polish '.$sorting_direction;
	break;
	case "symmetry":
		$query_sorting =' ORDER BY symmetry '.$sorting_direction;
		break;
	case "grading_lab":
		$query_sorting =' ORDER BY grading_lab '.$sorting_direction;
		break;
	default:
	$query_sorting =' ORDER BY retail_price '.$sorting_direction;
	break;
}
$ref=$_REQUEST['ref'];
if($_REQUEST['ref']!=null)
	$sql_count='SELECT COUNT(*) AS num FROM diamonds WHERE visiable=1 and stock_ref LIKE "'.$ref.'" OR certificate_number = "'.$ref.'"';
else
	$sql_count='SELECT COUNT(*) AS num FROM diamonds WHERE visiable=1 and '.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(format(carat,2) >= '.$query_weight_from.' AND format(carat,2) <= '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured;
foreach($conn->query($sql_count) as $num){
	$result_number=$num['num'];
}
$tpages = ceil ( $result_number / $pagesize );
$adjacents = 10;
if ($page <= 0)
	$page = 1;

/**/
if($_REQUEST['ref']!=null)
	$sql='SELECT * FROM diamonds WHERE visiable=1 and stock_ref LIKE "'.$ref.'" OR certificate_number = "'.$ref.'"';
else	
	$sql='SELECT * FROM diamonds WHERE visiable=1 and '.$query_shape.$query_color.$query_clarity.$query_cut.$query_polish.$query_sym.$query_fluo.$query_certi.$and.'(format(carat,2) >= '.$query_weight_from.' AND format(carat,2) <= '.$query_weight_to.') AND (price BETWEEN '.$query_price_from.' AND '.$query_price_to.') AND status = "AVAILABLE" '.$featured.' '.$query_sorting.' LIMIT '.$startfrom.', '.$pagesize;
logger($sql);
//exit($sql);

$stmt=$conn->query($sql);
$error=$conn->errorInfo();
if(isset($error[2])) exit($error[2]);
?>


<?php
$r=0;
foreach($stmt as $row){
	$r++;
	if(strlen($row['color'])>1)
		switch (substr($row['color'],-1)) {
			case "Y" :
				$fancyTxt = "黄";break;
				case "P" :
					$fancyTxt = "粉";break;
					case "G" :
						$fancyTxt = "绿";break;
						case "R" :
							$fancyTxt = "红";break;
							case "B" :
								$fancyTxt = "蓝";break;
		}
	switch ($row['shape']){
		case "BR":
			$pic_where="01.png";
			$shape_TXT='圆形';
			break;
		case "PR":
			$pic_where="08.png";
			$shape_TXT='水滴形';
			break;
		case "PS":
			$pic_where="02.png";
			$shape_TXT='公主方';
			break;
		case "HS":
			$pic_where="04.png";
			$shape_TXT='心形';
			break;
		case "MQ":
			$pic_where="05w.png";
			$shape_TXT='马眼形';
			break;
		case "OV":
			$pic_where="06w.png";
			$shape_TXT='椭圆形';
			break;
		case "EM":
			$pic_where="03w.png";
			$shape_TXT='祖母绿形';
			break;
		case "AS":
			$pic_where="03w.png";
			$shape_TXT='祖母绿形';
			break;
		case "RAD":
			$pic_where="07.png";
			$shape_TXT='雷电形';
			break;
		case "CU":
			$pic_where="09.png";
			$shape_TXT='垫形';
			break;
		default:
			$pic_where="01.png";
			$shape_TXT='圆形';
	}
	$price=$row['retail_price'];
	$euro_price=round($price*$USD_EUR).'欧元';
	$yuan_price=round($price*$USD_CNY).'元人民币';
	$dollar_price=round($price).'美元';
	$singlePrice = $dollar_price;
	$morePrice = $yuan_price.' <br/>'.$euro_price;
	if($_POST['currency']!=''){
		if($_POST['currency']=='EUR') {
			$singlePrice = $euro_price;
			$morePrice = $yuan_price.' <br/>'.$dollar_price;
		}
		else if($_POST['currency']=='CNY') {
			$singlePrice = $yuan_price;
			$morePrice = $euro_price.' <br/>'.$dollar_price;
		}
	}
	if(trim($row["grading_lab"])=='HRD')
		$certi_linker="http://ws2.hrdantwerp.com/HRD.CertificateService.WebAPI/certificate?certificateType=MCRT&certificateNumber=". $row['certificate_number'];
	else if(trim($row["grading_lab"])=='GIA')
		$certi_linker="https://www.gia.edu/otmm_wcs_int/proxy-pdf/?url=https://myapps.gia.edu/RptChkClient/reportClient.do?ReportNumber=55D341284A617F73B46866D227152ECE&ReportNumber=".$row['certificate_number'];
	else if(trim($row["grading_lab"])=='IGI')
		$certi_linker="http://global.igiworldwide.com/viewpdf.php?r=".$row['certificate_number'];
	?>
				<div class="dia-piece-box" onclick="showDetail('<?php echo $row['id']; ?>')">
                    <div class="1 generalinfobox">
                        <span class="valuetxt shapedesc-box">
                          <img class="shapeicon" id="<?php echo $row['id'];?>_shapeicon" src="./images/<?php echo $pic_where; ?>" alt="<?php echo $shape_TXT; ?>"/>
                        </span>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_carat"><?php echo number_format($row['carat'],2);?></span>
                        <?php if($fancy){?>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_fancy"><?php echo $fancyTxt; ?></span>
                        <?php }?>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_color"> <?php echo $row['color']; ?> </span>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_clarity"><?php echo $row['clarity']; ?></span>
                        <?php if(!$fancy){?>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_cut"><?php echo ($row['cut_grade']===NULL?"-":$row['cut_grade']); ?></span>
                        <?php }?>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_polish"><?php echo $row['polish']; ?></span>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_symmetry"><?php echo $row['symmetry']; ?></span>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_grading_lab"><?php echo $row['grading_lab']; ?></span>
                        <span class="valuetxt" id="<?php echo $row['id'];?>_price"><?php echo $singlePrice ?></span>
                        <span class="detail-btn" >详情</span>
                    </div><!-- end generalinfobox -->
                    <div id="detail-<?php echo $row['id']; ?>" class="details">
                        <p class="details_txt">
                            <span>荧光强度:<?php echo $row["fluorescence_intensity"];?></span>
                            <span> 所在地: <?php echo $row['country']; ?></span>
                            <span>证书编号: <?php echo $row['certificate_number']; ?> &nbsp; &nbsp;<a class="certi_linker" target="_blank" href="<?php echo $certi_linker; ?>">查看证书</a></span>
                            <span id="<?php echo $row['id'];?>_stock_ref">编号: <?php echo $row['stock_ref']; ?></span>
                            <span class="price"><?php echo $morePrice ?></span>
                            <span class="btnforprice" onclick="popup('<?php echo $row['id']; ?>')">预约裸钻</span>
                            <span class="btnforprice" onclick="makeOrder('<?php echo $row['id']; ?>')">定制首饰</span>
                        </p>
                    </div><!-- end details -->
					<?php if(isset($row['recommend_words']) && $row['recommend_words']!=''){ ?>
					<p class="commentbox"><?php echo $row['recommend_words']; ?></p> <?php } ?>
				</div><!-- end dia-pice-box -->
				<?php
				}
				?>

<div id="howmanyrecords" style="display:none;"><?php echo $result_number; ?></div>
<div id="diapagenavi" style="display:none;">
<?php
include ("pagination2.php");
echo paginate_two ( $crr_page, $tpages, $adjacents );
?>
</div>
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
