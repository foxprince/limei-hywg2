<?php
/*===================session========================*/
session_start();

if(isset($_POST['logout'])){
	if(isset($_SESSION['authenticated'])){
			$_SESSION=array();
			if (isset($_COOKIE[session_name()])){
			    setcookie(session_name(), '', time()-86400, '/');
			}
			if (isset($_COOKIE['limei112233'])){
			    setcookie('limei112233', '', time()-86400, '/');
			}
			session_destroy();
	 }
	 header('Location: login.php');
     exit;
}

// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
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
	header('Location: login.php');
    exit();
}


require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美钻石 :: 预约订单</title>


<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />

<style type="text/css">
body{
	padding:0;
	margin:0;
	font-family:'Microsoft Yahei', 微软雅黑, STHeiti,simsun,Arial,sans-serif;
}
div#header{
	position:relative;
	height:130px;
	background-color:#FCC;
	margin:0;
	padding:0;
	border-bottom-style:solid;
	border-width:5px;
	border-color:#C6F;
	margin-bottom:10px;
}

#logo{
	position:absolute;
	top:20px;
	left:30px;
}
#navi{
	position:relative;
	margin:0 0 0 230px;
	padding:28px 0 10px 0;
}
#navi li{
	display:inline-block;
	list-style:none;
	margin: 0 20px;
	font-size:22px;
}
#navi li a{
	color:#000;
	font-weight:bold;
	text-decoration:none;
}
h1.pagetitle{
	font-size:18px;
	margin:0;
	padding:5px 0 0 250px;
	color:#C6F;
}


p.appo-record{
	background-color:#6FF;
	padding:3px;
}
#bodycontent p{
	padding:10px 20px;
}
</style>

<script src="/js/jquery-1.11.2.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<script src="Chart.js"></script>
</head>

<body>
<div id="header">
<?php
include('navi.php');
?>
<hr style="margin-left:250px;" />

<h1 class="pagetitle">预约 | 订单</h1>
</div>

<div id="bodycontent">
<?php 
$sql_list='SELECT * FROM viewing_record WHERE extra_info <> "SOLD" AND view_time > SUBDATE(NOW(), INTERVAL 30 DAY) ORDER BY view_time ASC';
foreach($conn->query($sql_list) as $row){
	$dia_id=$row['diamond'];
	$viewer_id=$row['viewer'];
	$sql_dia='SELECT * FROM diamonds_history WHERE diamond_id = "'.$dia_id.'"';
	foreach($conn->query($sql_dia) as $row_dia){
		$dia_size=$row_dia['carat'];
		$dia_color=$row_dia['color'];
		$dia_clarity=$row_dia['clarity'];
		
		$dia_cut=$row_dia['cut_grade'];
		$polish=$row_dia['polish'];
		$symmetry=$row_dia['symmetry'];
		
		$diamond_info=$row['diamond'].', '.$dia_size.'克拉, '.$dia_color.'色, '.$dia_clarity.', '.$dia_cut.', '.$polish.', '.$symmetry.', ';
	}
	$sql_client='SELECT * FROM clients_list WHERE id = "'.$viewer_id.'"';
	foreach($conn->query($sql_client) as $row_c){
		$c_name=$row_c['wechat_name'];
		$tel=$row_c['tel'];
		$email=$row_c['email'];
	}
?>
<p class="appo-record">
<span class="dia-to-view">钻石: <?php echo $diamond_info; ?>, </span>
<span class="appo-time">看货时间:<?php echo $row['view_time']; ?></span>
<span class="viewer">客户:<?php echo $c_name; ?></span><br />
电话：<?php echo $tel; ?> &nbsp; &nbsp; &nbsp; 邮箱：<?php echo $email; ?>
</p>
<?php
}
?>
</div>



</body>
</html>