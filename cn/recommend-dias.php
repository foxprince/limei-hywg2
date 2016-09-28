<div  class="container-jewelry">
<div class="dia-choice-box">
<div class="title03" style="font-size:24px; margin:20px 0 10px;">步骤二 选钻石</div>

<?php
$sql_ring='SELECT * FROM jewelry WHERE id = '.$ringChoice;
foreach($conn->query($sql_ring) as $rowring){
	$ring_name_ch=$rowring['name_ch'];
	$ring_img=$rowring['image1'];
	$ring_price=$rowring['price'];
}
?>


<div class="ring-demo-pic-box">
<img id="ring-demo-pic" src="../images/sitepictures/<?php echo $ring_img; ?>" />
<p class="styletitle">款式：<?php echo $ring_name_ch; ?></p>
<p class="changeringchoicebtnholder"><a id="changeRingChoicebtn" href="diamonds-rings.php?start=over">更改选择</a></p>
</div>



<div class="dia-choices-container">
<?php
$budget_diamond=$budget_USD-$ring_price;



$searchprice1=$budget_diamond*0.80;
$searchprice2=$budget_diamond*1.01;

$sql_price_perfect='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "D" OR color = "E" OR color = "F") AND (clarity = "FL" OR clarity = "IF" OR clarity = "VVS1" OR clarity = "VVS2") AND cut_grade = "EX" AND polish = "EX" AND symmetry = "EX" AND fluorescence_intensity = "None" AND retail_price <= '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price DESC LIMIT 8';
$sql_price_size='SELECT * FROM diamonds WHERE shape = "BR" AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY carat DESC LIMIT 8';
$sql_price_goodprice='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "D" OR color = "E" OR color = "F" OR color = "G"  OR color = "H" OR color = "I") AND (clarity = "SI1" OR clarity = "SI2" OR clarity = "VS1" OR clarity = "VS2") AND ((cut_grade = "VG" AND polish = "VG") OR (symmetry = "VG" AND cut_grade = "VG") OR (symmetry = "VG" AND polish = "VG")) AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price DESC LIMIT 8';
$sql_price_lowprice='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "J" OR color = "K" OR color = "G"  OR color = "H" OR color = "I") AND (clarity = "SI1" OR clarity = "SI2" OR clarity = "VS1" OR clarity = "VS2") AND ((cut_grade = "G") OR (symmetry = "G") OR (polish = "G")) AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price ASC LIMIT 8';

$stmt_price_perfect=$conn_dia->query($sql_price_perfect);
$found_price_perfect=$stmt_price_perfect->rowCount();

$stmt_price_size=$conn_dia->query($sql_price_size);
$found_price_size=$stmt_price_size->rowCount();

$stmt_price_goodprice=$conn_dia->query($sql_price_goodprice);
$found_price_goodprice=$stmt_price_goodprice->rowCount();

$stmt_price_lowprice=$conn_dia->query($sql_price_lowprice);
$found_price_lowprice=$stmt_price_lowprice->rowCount();


if(!$found_price_perfect && !$found_price_size && !$found_price_goodprice && !$found_price_lowprice){
?>
<p>无法为您找到匹配的钻石，请适当提高您的预算</p>
<?php
}


if($found_price_perfect){
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
	$dia_loop_num=0;
	$chosen_dia_loop_num=rand(0, 7);
	foreach($stmt_price_perfect as $r){
		if($dia_loop_num ==	$chosen_dia_loop_num){
			$ref=$r['stock_ref'];
			$shape=$r['shape'];
			$size=$r['carat'];
			$color=$r['color'];
			$clarity=trim($r['clarity']);
			if($clarity==''){
				$clarity='-';
			}
			$cut=trim($r['cut_grade']);
			if($cut==''){
				$cut='-';
			}
			$symmetry=trim($r['symmetry']);
			if($symmetry==''){
				$symmetry='-';
			}
			$polish=trim($r['polish']);
			if($polish==''){
				$polish='-';
			}
			$fluor_intensity=trim($r['fluorescence_intensity']);
			$total_sales_price_in_currency=$r['raw_price_retail'];
			$lab=$r['grading_lab'];
			
			
			if($fluor_intensity=='None'){
				$fluo_txt='无荧光. ';
			}else{
				$fluo_txt='荧光：'.$fluor_intensity.'. ';
			}
			
			$price=$r['retail_price'];
			$crr_dia_id=$r['id'];
		}
		$dia_loop_num++;
	}
?>
  <div class="dia-choice-container" id="perfect-dia-box">
  <div class="title03">完美精品</div>
    <img class="dia-choice-img" onclick="choose_dia(<?php echo $crr_dia_id; ?>)" src="/cn/img-eles/perfect.png" />
    <div class="dia-descr">
    <p><?php echo $size; ?>克拉</p>
    
    <p>
    <span>
    颜色：<?php echo $color; ?>
    </span>
    &nbsp; / &nbsp;
    <span>
    净度：<?php echo $clarity; ?>
    </span>
    </p>
    <p>
    <span>
    切工：<?php echo $cut; ?> / <?php echo $polish; ?> / <?php echo $symmetry; ?>
    </span>
    </p>
    
    <?php
		if(isset($_SESSION['useraccount'])){
			if($currency == 'EUR'){
				$crr_currency=$USD_EUR;
				$crr_currency_txt='欧元';
			}else if($currency == 'CNY'){
				$crr_currency=$USD_CNY;
				$crr_currency_txt='人民币';
			}else if($currency=='GBP'){
				$crr_currency=$USD_GBP;
				$crr_currency_txt='英镑';
			}else{
				$crr_currency=1;
				$crr_currency_txt='美元';
			}
			
			$dia_price_in_currency=$crr_currency*$price;
			$dia_price_txt=number_format((float) $dia_price_in_currency, 2, '.', '').' '.$crr_currency_txt;
		?>
    <p><span>价格：<?php echo $dia_price_txt; ?></span></p>
    <?php
		}
		?>
    
    <button type="button" class="chooseDiabtn" onclick="choose_dia(<?php echo $crr_dia_id; ?>)">选择</button>
    </div>
  </div>
<?php
}
if($found_price_goodprice){
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
	$dia_loop_num=0;
	$chosen_dia_loop_num=rand(0, 7);
	
	foreach($stmt_price_goodprice as $r){
		if($dia_loop_num==$chosen_dia_loop_num){
			$ref=$r['stock_ref'];
			$shape=$r['shape'];
			$size=$r['carat'];
			$color=$r['color'];
			$clarity=trim($r['clarity']);
			if($clarity==''){
				$clarity='-';
			}
			$cut=trim($r['cut_grade']);
			if($cut==''){
				$cut='-';
			}
			$symmetry=trim($r['symmetry']);
			if($symmetry==''){
				$symmetry='-';
			}
			$polish=trim($r['polish']);
			if($polish==''){
				$polish='-';
			}
			$fluor_intensity=trim($r['fluorescence_intensity']);
			$total_sales_price_in_currency=$r['raw_price_retail'];
			$lab=$r['grading_lab'];
			
			
			if($fluor_intensity=='None'){
				$fluo_txt='无荧光. ';
			}else{
				$fluo_txt='荧光：'.$fluor_intensity.'. ';
			}
			
			$price=$r['retail_price'];
			$crr_dia_id=$r['id'];
		}
		$dia_loop_num++;
	}
?>
  <div class="dia-choice-container" id="perfect-dia-box">
  <div class="title03">高性价比</div>
    <img class="dia-choice-img" onclick="choose_dia(<?php echo $crr_dia_id; ?>)" src="/cn/img-eles/goodprice.png" />
    <div class="dia-descr">
    <p><?php echo $size; ?>克拉</p>
    
    <p>
    <span>
    颜色：<?php echo $color; ?>
    </span>
    &nbsp; / &nbsp;
    <span>
    净度：<?php echo $clarity; ?>
    </span>
    </p>
    <p>
    <span>
    切工：<?php echo $cut; ?> / <?php echo $polish; ?> / <?php echo $symmetry; ?>
    </span>
    </p>
    
    <?php
		if(isset($_SESSION['useraccount'])){
			if($currency == 'EUR'){
				$crr_currency=$USD_EUR;
				$crr_currency_txt='欧元';
			}else if($currency == 'CNY'){
				$crr_currency=$USD_CNY;
				$crr_currency_txt='人民币';
			}else if($currency=='GBP'){
				$crr_currency=$USD_GBP;
				$crr_currency_txt='英镑';
			}else{
				$crr_currency=1;
				$crr_currency_txt='美元';
			}
			
			$dia_price_in_currency=$crr_currency*$price;
			$dia_price_txt=number_format((float) $dia_price_in_currency, 2, '.', '').' '.$crr_currency_txt;
		?>
    <p><span>价格：<?php echo $dia_price_txt; ?></span></p>
    <?php
		}
		?>
    
    <button type="button" class="chooseDiabtn" onclick="choose_dia(<?php echo $crr_dia_id; ?>)">选择</button>
    </div>
  </div>
<?php
}
if($found_price_size){
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
  $dia_loop_num=0;
	$chosen_dia_loop_num=rand(0, 7);
	
	foreach($stmt_price_size as $r){
		if($dia_loop_num==$chosen_dia_loop_num){
			$ref=$r['stock_ref'];
			$shape=$r['shape'];
			$size=$r['carat'];
			$color=$r['color'];
			$clarity=trim($r['clarity']);
			if($clarity==''){
				$clarity='-';
			}
			$cut=trim($r['cut_grade']);
			if($cut==''){
				$cut='-';
			}
			$symmetry=trim($r['symmetry']);
			if($symmetry==''){
				$symmetry='-';
			}
			$polish=trim($r['polish']);
			if($polish==''){
				$polish='-';
			}
			$fluor_intensity=trim($r['fluorescence_intensity']);
			$total_sales_price_in_currency=$r['raw_price_retail'];
			$lab=$r['grading_lab'];
			
			
			if($fluor_intensity=='None'){
				$fluo_txt='无荧光. ';
			}else{
				$fluo_txt='荧光：'.$fluor_intensity.'. ';
			}
			
			$price=$r['retail_price'];
			$crr_dia_id=$r['id'];
		}
		$dia_loop_num++;
	}
?>
  <div class="dia-choice-container" id="perfect-dia-box">
  <div class="title03">无敌大钻</div>
    <img class="dia-choice-img" onclick="choose_dia(<?php echo $crr_dia_id; ?>)" src="/cn/img-eles/size.png" />
    <div class="dia-descr">
    <p><?php echo $size; ?>克拉</p>
    
    <p>
    <span>
    颜色：<?php echo $color; ?>
    </span>
    &nbsp; / &nbsp;
    <span>
    净度：<?php echo $clarity; ?>
    </span>
    </p>
    <p>
    <span>
    切工：<?php echo $cut; ?> / <?php echo $polish; ?> / <?php echo $symmetry; ?>
    </span>
    </p>
    
    <?php
		if(isset($_SESSION['useraccount'])){
			if($currency == 'EUR'){
				$crr_currency=$USD_EUR;
				$crr_currency_txt='欧元';
			}else if($currency == 'CNY'){
				$crr_currency=$USD_CNY;
				$crr_currency_txt='人民币';
			}else if($currency=='GBP'){
				$crr_currency=$USD_GBP;
				$crr_currency_txt='英镑';
			}else{
				$crr_currency=1;
				$crr_currency_txt='美元';
			}
			
			$dia_price_in_currency=$crr_currency*$price;
			$dia_price_txt=number_format((float) $dia_price_in_currency, 2, '.', '').' '.$crr_currency_txt;
		?>
    <p><span>价格：<?php echo $dia_price_txt; ?></span></p>
    <?php
		}
		?>
    <button type="button" class="chooseDiabtn" onclick="choose_dia(<?php echo $crr_dia_id; ?>)">选择</button>
    </div>
  </div>
<?php
}
if($found_price_lowprice){
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
  $dia_loop_num=0;
	$chosen_dia_loop_num=rand(0, 7);
	
	foreach($stmt_price_lowprice as $r){
		if($dia_loop_num==$chosen_dia_loop_num){
			$ref=$r['stock_ref'];
			$shape=$r['shape'];
			$size=$r['carat'];
			$color=$r['color'];
			$clarity=trim($r['clarity']);
			if($clarity==''){
				$clarity='-';
			}
			$cut=trim($r['cut_grade']);
			if($cut==''){
				$cut='-';
			}
			$symmetry=trim($r['symmetry']);
			if($symmetry==''){
				$symmetry='-';
			}
			$polish=trim($r['polish']);
			if($polish==''){
				$polish='-';
			}
			$fluor_intensity=trim($r['fluorescence_intensity']);
			$total_sales_price_in_currency=$r['raw_price_retail'];
			$lab=$r['grading_lab'];
			
			
			if($fluor_intensity=='None'){
				$fluo_txt='无荧光';
			}else{
				$fluo_txt='荧光：'.$fluor_intensity.'. ';
			}
			
			$price=$r['retail_price'];
			$crr_dia_id=$r['id'];
		}
		$dia_loop_num++;
	}
?>
  <div class="dia-choice-container" id="perfect-dia-box">
  <div class="title03">实惠优选</div>
    <img class="dia-choice-img" onclick="choose_dia(<?php echo $crr_dia_id; ?>)" src="/cn/img-eles/lowprice.png" />
    <div class="dia-descr">
    <p><?php echo $size; ?>克拉</p>
    
    <p>
    <span>
    颜色：<?php echo $color; ?>
    </span>
    &nbsp; / &nbsp;
    <span>
    净度：<?php echo $clarity; ?>
    </span>
    </p>
    <p>
    <span>
    切工：<?php echo $cut; ?> / <?php echo $polish; ?> / <?php echo $symmetry; ?>
    </span>
    </p>
    
    <?php
		if(isset($_SESSION['useraccount'])){
			if($currency == 'EUR'){
				$crr_currency=$USD_EUR;
				$crr_currency_txt='欧元';
			}else if($currency == 'CNY'){
				$crr_currency=$USD_CNY;
				$crr_currency_txt='人民币';
			}else if($currency=='GBP'){
				$crr_currency=$USD_GBP;
				$crr_currency_txt='英镑';
			}else{
				$crr_currency=1;
				$crr_currency_txt='美元';
			}
			
			$dia_price_in_currency=$crr_currency*$price;
			$dia_price_txt=number_format((float) $dia_price_in_currency, 2, '.', '').' '.$crr_currency_txt;
		?>
    <p><span>价格：<?php echo $dia_price_txt; ?></span></p>
    <?php
		}
		?>
    
    <button type="button" class="chooseDiabtn" onclick="choose_dia(<?php echo $crr_dia_id; ?>)">选择</button>
    </div>
  </div>
<?php
}
?>



</div>

<br style="clear:both" />


<script type="text/javascript">
function choose_dia(diaID){
	$('#diaChoice').val(diaID);
	$('form#decisionform').submit();
}
</script>

</div><!-- END dia-choice-box -->
</div>


