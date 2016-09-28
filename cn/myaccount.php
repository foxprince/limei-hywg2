<?php 
session_start();
function gheader($url)  
{  
echo '<html><head><meta http-equiv="Content-Language" content="utf-8"><meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"><meta http-equiv="refresh"  
content="0;url='.$url.'"><title>loading ... </title></head><body>
<script>window.location="'.$url.'";</script></body></html>';  
exit();  
}  
if(!isset($_SESSION['useraccount'])){
 	gheader('login.php');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>利美钻石 - 我的钻戒历史纪录</title>
	<?php
		include_once('header.php');
	?>
<?php

$userid=$_SESSION['useraccount'];
require_once('connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$user_info='SELECT * FROM clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$website_username=$r_u['website_username'];
	$website_password=$r_u['website_password'];
}

if(isset($_POST['usernamenew']) && isset($_POST['passwordold']) && isset($_POST['passwordnew']) && isset($_POST['passwordnewrepeat'])){
	
	//exit('post');
	
	$usernamenew=$_POST['usernamenew'];
	$passwordold=$_POST['passwordold'];
	$passwordnew=$_POST['passwordnew'];
	$passwordnewrepeat=$_POST['passwordnewrepeat'];
	
	if($passwordnewrepeat!=$passwordnew){
		$errormessage='两次输入的新密码不一致，请重新输入';
	}
	if($passwordold!=$website_password){
		$errormessage='密码输入不正确，请重试';
	}
	if($passwordnewrepeat==$passwordnew && $passwordold==$website_password){
		$sql_user_update='UPDATE clients_list SET website_username = "'.$usernamenew.'", website_password = "'.$passwordnew.'" WHERE id = '.$userid;
		$stmt_user_update=$conn->query($sql_user_update);
		$userupdated=$stmt_user_update->rowCount();
		
		if($userupdated){
			$website_username=$usernamenew;
			$feedbackmessage='您已经成功修改了您的用户名和密码';
		}
	}
	
}
if(isset($_GET['delete'])){
	$id=$_GET['delete'];
	$sql_delete='delete from viewing_record WHERE id = '.$id;
	$conn->query($sql_delete);
}
?>
<style type="text/css">
div.history-choice{
	border-bottom-style:solid;
	border-width:1px;
	border-color:#999;
	padding:20px 0;
}
img.demo-pic{
	display:block;
	float:left;
	width:228px;
	margin:25px 25px 0 0;
}
div.dia-para-box{
	float:left;
	width:358px;
	font-size:14px;
}
.dia-para-box h3{
	font-size:18px;
}
.dia-para-box p{
	font-size:14px;
	margin:0 0 3px 0;
}


div#account-setting-form-box{
	position:relative;
	width:288px;
	padding:15px;
	background-color:#FFF;
	border-style:solid;
	border-width:1px;
	border-color:#999;
	margin-left:158px;
	margin-top:25px;
	margin-bottom:50px;
}
p.feedbackmessage, p.errormessage{
	font-size:24px;
	color:#C30;
}
</style>
</head>


<body>
<?php
					include_once('topbar.php');
				?>
<!--div  home-visual-box-->
<div  class="container-fluidX container maxcontainer">



<!--div  bodycontent----------------------------------------------------------------------------------------->



<div id="bodycontent">
<div id="loginbox">

<?php
if(isset($errormessage)){
?>
<p class="errormessage"><?php echo $errormessage; ?></p>
<?php
}
?>

<?php
if(isset($feedbackmessage)){
?>
<p class="feedbackmessage"><?php echo $feedbackmessage; ?></p>
<?php
}
?>

<h3>我的钻戒历史纪录  <a style="font-size:14px; display:inline-block; margin-left:25px; padding: 5px 12px; background-color:#eee; position:relative; top:-3px;" href="manageaccount.php">修改用户名密码</a></h3>


<?php
$userhistory='SELECT * FROM viewing_record WHERE viewer = "'.$userid.'" ORDER BY id DESC';
$stmt_history=$conn->query($userhistory);
$historyfound=$stmt_history->rowCount();
if($historyfound){
	
	include_once('connection-dia-data.php');
	$conn_dia=dbConnect_dia('write','pdo');
	$conn_dia->query("SET NAMES 'utf8'");
	
	
	
	
	foreach($stmt_history as $row_history){
		$user_diamond = $row_history['diamond'];
		
		$user_jewellery_price = $row_history['jewellery_price'];
		$user_jewellery_id = $row_history['jewellery_id'];
		$user_view_time = $row_history['view_time'];
		$totalprice=$row_history['totalprice_in_currency'];
		
		$sql_dia='SELECT * FROM diamonds WHERE id = '.$user_diamond;
		
		foreach($conn_dia->query($sql_dia) as $r_d){
			$user_diamond_shape = $r_d['shape'];
			$user_diamond_color = $r_d['color'];
			$user_diamond_clarity = $r_d['clarity'];
			$user_diamond_carat = $r_d['carat'];
			$user_diamond_cut = $r_d['cut_grade'];
			$user_diamond_symmetry = $r_d['symmetry'];
			$user_diamond_polish = $r_d['polish'];
			$user_diamond_fluo = $r_d['fluorescence_intensity'];
			$user_diamond_price = $r_d['retail_price'];
			$user_diamond_grading_lab=$r_d['grading_lab'];
			$user_diamond_certificate_number=$r_d['certificate_number'];
		}
		
		$demopiclink='./img-eles/goodprice.png';
		
		if($user_jewellery_id!='' && $user_jewellery_id!=NULL && $user_jewellery_id!=0){
			$sql_ring='SELECT * FROM jewelry WHERE id = '.$user_jewellery_id;
			foreach($conn->query($sql_ring) as $r_r){
				$user_ring_name_ch=$r_r['name_ch'];
				$user_ring_image1=$r_r['image1'];
			}
			$demopiclink='../images/sitepictures/'.$user_ring_image1;
		}
		
?>
<div class="history-choice">

<img src="<?php echo $demopiclink; ?>" class="demo-pic" />





<div class="dia-para-box">
<?php
if(isset($user_ring_name_ch)){
?>
<h3><?php echo $user_ring_name_ch; ?></h3>
<p class="totalpricebox">总价格：<?php echo $totalprice; ?></p>
<?php
}else{
?>
<h3>裸钻</h3>
<?php
}
?>

<h3>钻石参数：</h3>
<p class="dia-para"><label class="dia-label">克拉:</label><?php echo $user_diamond_carat; ?>克拉</p>
<p class="dia-para"><label class="dia-label">颜色:</label><?php echo $user_diamond_color; ?></p>
<p class="dia-para"><label class="dia-label">净度:</label><?php echo $user_diamond_clarity; ?></p>
<p class="dia-para"><label class="dia-label">切工:</label>切割：<?php echo $user_diamond_cut; ?> | 抛光：<?php echo $user_diamond_polish; ?> | 对称性：<?php echo $user_diamond_symmetry; ?></p>
<p class="dia-para"><label class="dia-label">荧光:</label><?php  echo $user_diamond_fluo; ?></p>
<p class="dia-para"><label class="dia-label">出品地:</label>比利时 安特卫普</p>
<p class="dia-para"><label class="dia-label">证书编号:</label><?php echo $user_diamond_certificate_number; ?></p>
<p class="dia-para"><label class="dia-label">价格:</label><?php echo $user_diamond_price; ?> 美元</p>
<p class="dia-para"><label class="dia-label">查看证书:</label>

<p class="dia-para"><a class="button" href="myaccount.php?delete=<?php echo $row_history['id'];?>">删除</a></p>

<?php
if($user_diamond_grading_lab=='HRD'){
?>
<a class="certi_linker" target="_blank" href="http://www.hrdantwerplink.be/index.php?record_number=<?php echo $user_diamond_certificate_number; ?>&weight=<?php echo $user_diamond_carat; ?>&L="><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($user_diamond_grading_lab); ?>.png" /></a>
<?php
}else if($user_diamond_grading_lab=='GIA'){
?>
<a class="certi_linker" target="_blank" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno=<?php echo $user_diamond_certificate_number; ?>"><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($user_diamond_grading_lab); ?>.png" /></a>
<?php
}else if($user_diamond_grading_lab=='IGI'){
?>
<a class="certi_linker" target="_blank" href="http://www.igiworldwide.com/igi/verify.php?r=<?php echo $user_diamond_certificate_number; ?>"><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($user_diamond_grading_lab); ?>.png" /></a>
<?php
}
?>

</p>


</div><!-- end dia-para-box -->



<br style="clear:both;" />

</div>
<?php		
	}
}else{
   echo '您尚未选购任何钻石';
}
?>




</div>
</div>






<div class="row">
<div class="col-xs-12 col-sm-12 col-md-12">
		<?php
		include_once('footer.php');
		?>
</div>
</div>




</div>
</body>