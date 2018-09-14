<?php
if($_REQUEST['action']) {
	if($_REQUEST['action']=='resetOrderDia') {
		$_SESSION['orderDiaId'] = null;
		setcookie("orderDiaId",NULL);
		header("Location: ./dia.php");
		exit;
	}
	else if($_REQUEST['action']=='resetOrderJew') {
		$_SESSION['orderJewId'] = null;
		setcookie("orderJewId",NULL);
		header("Location: ./jewelry.php");
		exit;
	}
}
if($_REQUEST['step']) {
	$_SESSION['orderStep']=$_REQUEST['step'];
}
$firtStep = "two";
$firstClass="active";
$secondStep = "three";
$secondClass="";
$diaFirst = true;
$sql_currency='SELECT * FROM convert_currency';
foreach($conn->query($sql_currency) as $row_currency){
	$USD_EUR=$row_currency['USD_EUR'];
	$USD_GBP=$row_currency['USD_GBP'];
	$USD_CNY=$row_currency['USD_CNY'];
}
logger("orderDiaId:".$_SESSION['orderDiaId']);
/*if($_COOKIE["orderDiaId"]||$_REQUEST['step']=="dia")
	$diaFirst = true;
else if($_COOKIE["orderJewId"])
	$diaFirst = false;
else if($_REQUEST['step']=="jew")
	$diaFirst = false;
else */
if(strpos($_SERVER['PHP_SELF'], "jew")) {
	$firtStep = "three";$secondStep = "two";
	$firstClass="";$secondClass="active";
	$diaFirst = false;
}
?>
<!-- 步骤 -->
    <div class="step-box">
      <ul class="step">
        <li class="tc one-box">
          <div><!-- 此处为背景控件active -->
            <div class="one">定制您的首饰</div>
          </div>
        </li>
        <li class="two-box">
          <div id="step1" class = "<?php echo $firstClass;?>"><!-- 此处为背景控件active -->
            <div class="two">
            <?php if(isset($_COOKIE["orderDiaId"])){
        	$sql='SELECT * FROM diamonds WHERE id = '.$_COOKIE["orderDiaId"];
        	foreach($conn->query($sql) as $r){}
        	if($_COOKIE["DIA_CURRENCY"]=='EUR')
        		$priceDesc='€'.round($r['retail_price']*$USD_EUR);
        	else if($_COOKIE["DIA_CURRENCY"]=='CNY')
        		$priceDesc='¥'.round($r['retail_price']*$USD_CNY);
        	else
        		$priceDesc='$'.round($r['retail_price']);
        	?>
            <p><?php echo $r['carat'].'ct '.$r['color'].'色 '.$r['clarity'].' '.$r['cut_grade'].' '.$r['polish'].' '.$r['symmetry']?></p>
            <p><?php echo $r['grading_lab']?> 钻石</p>
            <p><?php echo $priceDesc?><i><a href="dia.php?action=resetOrderDia">重选</a></i></p>
            <?php }else{ ?>
            <a class="link" href="dia.php"><span>选择裸钻</span></a><div class="icon"><img src="./images/step-three.png" alt=""></div><?php }?>
            </div>
          </div>
        </li>
        <li class="tc three-box">
          <div id="step2" class="<?php echo $secondClass;?>">
            <div class="three">
            <?php if(isset($_COOKIE['orderJewId'])){
        	$sql='SELECT * FROM jewelry WHERE id = '.$_COOKIE['orderJewId'];
        	foreach($conn->query($sql) as $r_jew){}
        	if($_COOKIE["DIA_CURRENCY"]=='USD')
        		$jewPriceDesc='$'.round($r_jew['price']/$USD_EUR);
        	else if($_COOKIE["DIA_CURRENCY"]=='CNY')
        		$jewPriceDesc='¥'.round($r_jew['price']/$USD_EUR*$USD_CNY);
        	else
        		$jewPriceDesc='€'.round($r_jew['price']);
        	?>
        	<p><?php echo $r_jew['name_ch']; ?></p>
			<p><?php echo $jewPriceDesc ?> <a href="jewelry.php?action=resetOrderJew">重选</a></p>
        	<?php }else{ ?>
            <a class="link" href="jewelry.php"><span>选择款式</span></a><div class="icon"><img src="./images/step-two.png" alt=""></div><?php }?>
            </div>
          </div>
        </li>
        <li class="tc four-box">
          <div id="step3">
            <div class="four">完成定制</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 步骤END -->