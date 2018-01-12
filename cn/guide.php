<?
header("location: http://www.lumiagem.be/cn/intro.php?c=order");
exit;
?>
<?php include_once('header.php');?>
	<title>利美钻石 - 购买指南</title>
	
</head>
<body>
<?php
	include_once('topbar.php');
?>
<?php
include_once("menu.php");
?>

<?php

if(isset($_GET['p'])){
	$p=$_GET['p'];
}else{
	$p='';
}

switch($p){
	case 'steps':
	$the_page='steps.php';
	break;
	
	case 'choose-diamond':
	$the_page='choose-diamond.php';
	break;
	
	case 'choose-jewelry':
	$the_page='choose-jewelry.php';
	break;
	
	case 'makeorder':
	$the_page='makeorder.php';
	break;
	
	case 'buyeasy':
	$the_page='buyeasy.php';
	break;
	
	case 'service':
	$the_page='service.php';
	break;
	
	case 'knowledge':
	$the_page='knowledge.php';
	break;
	
	case 'industry':
	$the_page='industry.php';
	break;
	
	case 'article':
	$the_page='article.php';
	break;

	default:
	$the_page='steps.php';
}
include_once("$the_page");
?>
	<div class="div_down">
		<div class="text-bottom"></div>
   	</div>
	
	<?php
		include_once('footer.php');
	?>
</body>
</html>