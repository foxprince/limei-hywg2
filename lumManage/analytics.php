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
<title>利美钻石 :: 产品｜销售分析</title>


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

<h1 class="pagetitle">数据分析</h1>

<div id="according-size">
<h3>按重量</h3>

    <div class="interested-chart">
    <h4>客户兴趣</h4>
    <canvas id="chart-area-interest-size" width="600" height="600" style="width: 300px; height: 300px;"></canvas> 
    <?php  
	$sql_size_interests_1='SELECT COUNT(*) AS NUM_I_S_1 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat<0.5';
	foreach($conn->query($sql_size_interests_1) as $row){
		$size_interest_1=$row['NUM_I_S_1'];
	}
	$sql_size_interests_2='SELECT COUNT(*) AS NUM_I_S_2 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat>=0.5 AND carat<1';
	foreach($conn->query($sql_size_interests_2) as $row){
		$size_interest_2=$row['NUM_I_S_2'];
	}
	$sql_size_interests_3='SELECT COUNT(*) AS NUM_I_S_3 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat>=1 AND carat<1.5';
	foreach($conn->query($sql_size_interests_3) as $row){
		$size_interest_3=$row['NUM_I_S_3'];
	}
	$sql_size_interests_4='SELECT COUNT(*) AS NUM_I_S_4 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat>=1.5 AND carat<2';
	foreach($conn->query($sql_size_interests_4) as $row){
		$size_interest_4=$row['NUM_I_S_4'];
	}
	$sql_size_interests_5='SELECT COUNT(*) AS NUM_I_S_5 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat>=2 AND carat<3';
	foreach($conn->query($sql_size_interests_5) as $row){
		$size_interest_5=$row['NUM_I_S_5'];
	}
	$sql_size_interests_6='SELECT COUNT(*) AS NUM_I_S_6 FROM viewing_record, diamonds_history WHERE viewing_record.diamond = diamonds_history.diamond_id AND carat>=3';
	foreach($conn->query($sql_size_interests_6) as $row){
		$size_interest_6=$row['NUM_I_S_6'];
	}
	
	$size_interest_all=$size_interest_1+$size_interest_2+$size_interest_3+$size_interest_4+$size_interest_5+$size_interest_6;	
	?>
    
    <script type="text/javascript">
	

		var interest_size = [
				{
					value: <?php echo $size_interest_1; ?>,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "小于0.5克拉"
				},
				{
					value: <?php echo $size_interest_2; ?>,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "0.5 - 1克拉"
				},
				{
					value: <?php echo $size_interest_3; ?>,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "1-1.5克拉"
				},
				{
					value: <?php echo $size_interest_4; ?>,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "1.5-2克拉"
				},
				{
					value: <?php echo $size_interest_5; ?>,
					color: "#4D5360",
					highlight: "#616774",
					label: "2-3克拉"
				},
				{
					value: <?php echo $size_interest_6; ?>,
					color: "#4F8360",
					highlight: "#616774",
					label: "大于3克拉"
				}

			];

			window.onload = function(){
				var ctx_interest_size = document.getElementById("chart-area-interest-size").getContext("2d");
				window.myPie = new Chart(ctx_interest_size).Pie(interest_size);
			};



	
    </script>
    
    
    </div>
    
    <div class="action-chart">
    <h4>实际购买</h4>
    </div>

</div>

</div>


</body>
</html>