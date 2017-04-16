<?php
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
require_once('log.php');
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8" />
<meta content="比利时钻石,安特卫普钻石" name="keywords" />
<meta name="description" content="利美钻石主营产品：比利时钻石，安特卫普钻石，利美钻石婚戒定制专家，为您专业定制独一无二的钻戒，每颗钻石都配有国际钻石证书，清晰的解释，贴心的建议和优惠的价格是利美对您的承诺，作为华人的购钻渠道，利美钻石将竭诚为您的选择提供最专业的服务。"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">
<link rel="stylesheet" type="text/css" href="./css/public.css">
<link rel="stylesheet" type="text/css" href="./css/text.css">
<link rel="stylesheet" type="text/css" href="./css/css.css">
<script type="text/javascript" src="./js/jquery.1.11.3.min.js"></script>
<script type="text/javascript" src="./js/text.js"></script>