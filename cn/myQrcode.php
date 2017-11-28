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
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<title>利美钻石 - 我的二维码</title>
<style type="text/css">
div.history-choice {
	border-bottom-style: solid;
	border-width: 1px;
	border-color: #999;
	padding: 20px 0;
}

img.demo-pic {
	display: block;
	float: left;
	width: 228px;
	margin: 25px 25px 0 0;
}

div.dia-para-box {
	float: left;
	width: 358px;
	font-size: 14px;
}

.dia-para-box h3 {
	font-size: 18px;
}

.dia-para-box p {
	font-size: 14px;
	margin: 0 0 3px 0;
}

div#account-setting-form-box {
	position: relative;
	width: 288px;
	padding: 15px;
	background-color: #FFF;
	border-style: solid;
	border-width: 1px;
	border-color: #999;
	margin-left: 158px;
	margin-top: 25px;
	margin-bottom: 50px;
}

p.feedbackmessage, p.errormessage {
	font-size: 24px;
	color: #C30;
}
</style>
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
