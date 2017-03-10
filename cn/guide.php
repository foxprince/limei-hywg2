<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>利美钻石 - 购买指南</title>
	<?php
		include_once('header.php');
	?>
	<style type="text/css">
	body{
	font-size:0;
	}
	
#guidebtn{
	border-bottom-style:solid;
	border-width:2px;
}

div.pagemenu{
	display:inline-block;
	position:relative;
	float:left;
	padding:0;
}
.pagemenu ul{
	margin:0;
	padding:0;
}
.pagemenu li{
	border-bottom-style:dotted;
	border-width:1px;
	border-color:#CC6699;
	padding-right:0px;
	list-style:none;
	width:120px;
	white-space:nowrap;
}
.pagemenu li h2{
	font-size:14px;
}
.pagemenu li h2 a{
	color:#555;
	text-decoration:none;
}
li.crr a{
	color:#000 !important;
}

div#content{
	width:520px;
	margin-left:35px;
	float:left;
	font-size:15px;
	padding-top:8px;
	padding-right:15px;
}
div#content img{
	width:510px;
}
div#content h1{
	margin-top:0;
	font-size:16px;
}





div#makeorderbox{
	margin-top:5px;
	padding: 30px 0;
	
	background-position:center center;
	background-repeat:no-repeat;
}
div#makeorderbox>ul{
	margin:0;
	padding:0;
}


li.box{
	display:inline-block;
	margin:12px 35px;
	width:133px;
	height:228px;
	border-radius:12px;
	background-color:#C90;
	padding:12px;
	float:left;
	color:#FFF;
	cursor:default;
	font-size:14px;
}

li.box>ul{
	padding:0;
	margin:8px 0 0 15px;
}
li.box>ul>li{
	list-style:circle;
}
li.box a{
	text-decoration:none;
	color:#FFF;
}
li.box a:hover{
	text-decoration:underline;
}
li.box>a{
	font-size:18px;
	font-weight:bold;
}





ul.news-box{
	padding:0;
}
li.newspiece{
	display:inline-block;
	list-style:none;
	width:165px;
	padding:0;
	margin:2px;
	height:128px;
	position:relative;
	background-color:#CCC;
}
li.pagesbtn{
	list-style:none;
	margin-top:35px;
}
a.imglinker{
	position:absolute;
	width:165px;
	top:0;
	left:0;
	height:128px;
	overflow:hidden;
}
a.imglinker img{
	width:100%;
}
a.txtlinker{
	position:absolute;
	bottom:0;
	left:0;
	padding:5px;
	width:155px;
	font-size:12px;
	color:#000;
	text-decoration:none;
	background-color:#F5F6F7;
	background-color:rgba(255,255,255,.95);
}
a.articlepagelinker{
	display:inline-block;
	padding:2px;
	color:#333;
	font-size:13px;
}
ol{
	padding-left:25px;
}
ol li{
	padding:8px 0;
}
</style>
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

	<?php
		include_once('footer.php');
	?>
</body>
</html>