<?php
session_start ();

$userid = $_REQUEST ['id'];

require_once ('./connection.php');
$conn = dbConnect ( 'write', 'pdo' );
$conn->query ( "SET NAMES 'utf8'" );

$user_info = 'SELECT * FROM clients_list WHERE id = "' . $userid . '"';
foreach ( $conn->query ( $user_info ) as $r_u ) {
	$website_username = $r_u ['website_username'];
	$website_password = $r_u ['website_password'];
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8" />
	<meta content="比利时钻石,安特卫普钻石,钻石购买,钻交所,钻石交易所，比利时钻交所，比利时钻石交易所" name="keywords" />
	<meta name="description" content="利美钻石主营产品：比利时钻石，安特卫普钻石，利美钻石婚戒定制专家，为您专业定制独一无二的钻戒，每颗钻石都配有国际钻石证书，清晰的解释，贴心的建议和优惠的价格是利美对您的承诺，作为华人的购钻渠道，利美钻石将竭诚为您的选择提供最专业的服务。"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<link rel="stylesheet" type="text/css" href="./css/public.css">
	<link rel="stylesheet" type="text/css" href="./css/text.css">
	<link rel="stylesheet" type="text/css" href="./css/css.css">
<title>利美钻石 - 我的二维码</title>
</head>
<body>
  <!--div  home-visual-box-->
  <div class="container-fluidX container maxcontainer">
    <!--div  bodycontent----------------------------------------------------------------------------------------->
    <div id="bodycontent">
      <div id="loginbox">

<?php
if (isset ( $errormessage )) {
	?>
<p class="errormessage"><?php echo $errormessage; ?></p>
<?php } ?>

<?php
if (isset ( $feedbackmessage )) {
	?>
<p class="feedbackmessage"><?php echo $feedbackmessage; ?></p>
<?php } ?>

<h3>我的二维码</h3>
<?php
if ($r_u ['qrcode']) {
	?>
        <div class="history-choice">
          您的专属二维码如下，您可以将此二维码发给您的好友分享 <img src="../luAdmin/qrcode/<?php echo $r_u['qrcode']; ?>" class="demo-pic" /> <br
            style="clear: both;" />
          <div class="dia-para-box">
            扫描您的二维码关注利美钻石的好友有：<br />
            <?php
	$sql_history = 'SELECT wechat_name FROM clients_list WHERE referee = "' . $r_u ['id'] . '"';
	foreach ( $conn->query ( $sql_history ) as $row_history ) {
		echo $row_history ['wechat_name'] . "<br/>";
	}
	?>
          </div>
          <!-- end dia-para-box -->
        </div>
<?php
} else {
	echo '您尚未被分配二维码';
}
?>


</div>
    </div>
  </div>
</body>
</html>
