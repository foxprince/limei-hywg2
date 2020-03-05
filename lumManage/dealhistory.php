<?php
if(!isset($_POST['clientID'])){
	exit('ERROR');
}

session_start();
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit('ERROR');
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
	header('Location: login.php');
    exit('ERROR');
}


$clientID=$_POST['clientID'];
//$sortby='BYCONTACT';


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");
?>
<div id="box-to-view">
<?php
$view_time=array();
$sql_toview='SELECT * FROM viewing_record WHERE viewer = "'.$clientID.'" AND view_time > NOW() ORDER BY view_time DESC';
foreach($conn->query($sql_toview) as $row_r){
	$view_id=$row_r['id'];
	$diamondtoview=$row_r['diamond'];
	$view_time[]=$row_r['view_time'];
	
	$sql_dia_info='SELECT * FROM diamonds WHERE stock_ref = "'.$diamondtoview.'"';
	foreach($conn->query($sql_dia_info) as $row_d){
		$d_shape=$row_d['shape'];
		$d_carat=$row_d['carat'];
		$d_color=$row_d['color'];
		$d_fancy_color=$row_d['fancy_color'];
		$d_clarity=$row_d['clarity'];
		$d_grading_lab=$row_d['grading_lab'];
		$d_cut_grade=$row_d['cut_grade'];
		$d_polish=$row_d['polish'];
		$d_symmetry=$row_d['symmetry'];
		$d_fluorescence_intensity=$row_d['fluorescence_intensity'];
		$d_price=$row_d['price'];
	}
?>

<div class="dia_to_view">

<span class="stock_ref"><?php echo $diamondtoview; ?></span>
<span class="shape">形状:<?php echo $d_shape; ?></span>
<span class="weight"><?php echo $d_carat; ?>克拉</span>
<span class="color">
<?php
if($d_fancy_color!=NULL && $d_fancy_color!=''){
	echo '彩钻: '.$d_fancy_color;
}else{
	echo '颜色: '.$d_color;
}
?>
</span>
<span class="clarity">净度:<?php echo $d_clarity; ?></span>

<span class="certi">证书:<?php echo $d_grading_lab; ?></span>

<span class="cut">切工:<?php echo $d_cut_grade.', '.$d_polish.', '.$d_symmetry; ?></span>

<span class="fluo">荧光:<?php echo $d_fluorescence_intensity; ?></span>
<span class="price">价格:<?php echo $d_price; ?></span>

<button class="cancelviewbtn" onclick="cancelview('<?php echo $view_id; ?>')">取消</button>
<br style="clear:both;" />

</div>

<?php
}
?>

</div>
<p class="view_time">预约看货时间: 
<?php
foreach($view_time as $time_toview){
?>
<span class="timetoview">
<?php echo $time_toview; ?>
</span>
<?php
}
?>
</p>








<div class="box_viewed">
<?php
$sql_toview='SELECT * FROM viewing_record WHERE viewer = "'.$clientID.'" AND view_time <= NOW() ORDER BY view_time DESC';
foreach($conn->query($sql_toview) as $row_r){
	$view_id=$row_r['id'];
	$diamondtoview=$row_r['diamond'];
	$view_time=$row_r['view_time'];
	
	$sql_dia_info='SELECT * FROM diamonds WHERE stock_ref = "'.$diamondtoview.'"';
	foreach($conn->query($sql_dia_info) as $row_d){
		$d_shape=$row_d['shape'];
		$d_carat=$row_d['carat'];
		$d_color=$row_d['color'];
		$d_fancy_color=$row_d['fancy_color'];
		$d_clarity=$row_d['clarity'];
		$d_grading_lab=$row_d['grading_lab'];
		$d_cut_grade=$row_d['cut_grade'];
		$d_polish=$row_d['polish'];
		$d_symmetry=$row_d['symmetry'];
		$d_fluorescence_intensity=$row_d['fluorescence_intensity'];
		$d_price=$row_d['price'];
	}
	$sql_sell='SELECT id FROM purchase_record WHERE diamond = "'.$diamondtoview.'"';
	$stmt_sell=$conn->query($sql_sell);
	$if_sold=$stmt_sell->rowCount();
	if($if_sold){
		$boxclass='sold';
	}else{
		$boxclass='';
	}
?>

<div class="dia_viewed <?php echo $boxclass; ?>">

<span class="stock_ref"><?php echo $diamondtoview; ?></span>
<span class="shape">形状:<?php echo $d_shape; ?></span>
<span class="weight"><?php echo $d_carat; ?>克拉</span>
<span class="color">
<?php
if($d_fancy_color!=NULL && $d_fancy_color!=''){
	echo '彩钻: '.$d_fancy_color;
}else{
	echo '颜色: '.$d_color;
}
?>
</span>
<span class="clarity">净度:<?php echo $d_clarity; ?></span>

<span class="certi">证书:<?php echo $d_grading_lab; ?></span>

<span class="cut">切工:<?php echo $d_cut_grade.', '.$d_polish.', '.$d_symmetry; ?></span>

<span class="fluo">荧光:<?php echo $d_fluorescence_intensity; ?></span>
<span class="price">价格:<?php echo $d_price; ?></span>

<?php
if(!$if_sold){
?>
<button class="buybtn" onclick="buydiamond('<?php echo $view_id; ?>')">购买</button>
<?php
}else{
?>
<span class="sold-noti">该钻石已售出</span>
<?php
}
?>
<br style="clear:both;" />

</div>

<?php
}
?>
</div>
