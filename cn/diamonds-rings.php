<?php
session_start();

###########################################################
###########################################################
###########################################################
###################### check posted values ################
################################################################
################################################################
if(isset($_POST['budget'])){
	$_SESSION['budget']=$_POST['budget'];
	if(isset($_SESSION['ringChoice'])){
		$_SESSION['ringChoice']=0;
	}
}

if(isset($_POST['currency'])){
	$_SESSION['currency']=$_POST['currency'];
}

if(isset($_POST['ringChoice'])){
	$_SESSION['ringChoice']=$_POST['ringChoice'];
}


###########################################################
###########################################################
###########################################################
################ var the var ################################################
################################################################
################################################################
if(!isset($_SESSION['budget'])){
	$budget=10000;
}else{
	$budget=$_SESSION['budget'];
}

if(!isset($_SESSION['currency'])){
	$currency='USD';
}else{
	$currency=$_SESSION['currency'];
}

if(!isset($_SESSION['ringChoice'])){
	$ringChoice=0;
}else{
	$ringChoice=$_SESSION['ringChoice'];
}



if(isset($_POST['ringChoice']) && isset($_SESSION['dia_id']) && (isset($_POST['changeringchoice']) && $_POST['changeringchoice']=='changed')){
	header('Location: mydiamondring.php?changed=changed');
	exit;
}


include_once('connection-dia-data.php');
$conn_dia=dbConnect_dia('write','pdo');
$conn_dia->query("SET NAMES 'utf8'");

$sql_currency='SELECT * FROM convert_currency';
foreach($conn_dia->query($sql_currency) as $row_crc){
	$USD_EUR = $row_crc['USD_EUR'];	
	$USD_GBP = $row_crc['USD_GBP'];	
	$USD_CNY = $row_crc['USD_CNY'];	
}

if($currency == 'EUR'){
	$budget_USD=$budget/$USD_EUR;
}else if($currency == 'CNY'){
	$budget_USD=$budget/$USD_CNY;
}else if($currency=='GBP'){
	$budget_USD=$budget/$USD_GBP;
}else{
	$budget_USD=$budget;
}


$crr_page='diamonds';

?>


<title>我的钻戒 - 利美钻石</title>
<style type="text/css">
div#body-content{
	display:block;
	position:relative;
}
div.ring-demo-box{
	position:relative;
}
div.rings-container-inner{
	position:relative;
	padding:20px 0 0 0;
	margin:20px 0 0 0;
}
div.r_box{
	display:inline-block;
	position:relative;
	width:238px;
	padding:12px;
	margin:3px;
	background-color:#FFF;
	text-align:center;
}
a.j_linker{
	position:relative;
	display:block;
}
a.j_linker:hover{
	background-color:#eee;
	text-decoration:none;
}
span.pic-ring-containter{
	display:inline-block;
	width:212px;
	height:218px;
	background-position:center center;
	background-size: 228px auto;
	background-color:#FFF;
	background-repeat:no-repeat;
}
span.jewlery_name{
}
p.choose-ring-btn-box{
	margin-top:12px;
}
button.ringChoiceBtn{
	background-color:#C30;
	color:#FFF;
	font-size:14px !important;
	border-width:1px;
	border-color:#933;
	border-width:1px;
	padding:3px 38px;
}


div#budget-re-inputbox{
	display:block;
	position:absolute;
	top:0px;
	left:258px;
}



div#budgetform{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	left:0;
	background-color:#EEE;
	background-color:rgba(255,255,255,0.88);
	z-index:88;
	display:none;
}

div#diamond-recommendation-form{
	position:relative;
	width:398px;
	padding:20px 10px 20px 10px;
	background-color:#E0e0e0;
	margin:120px auto 0 auto;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:#999;

}
input#theinputbudgetfromthepopupform{
	width:238px;
	padding:5px;
}
p.reco-form-title{
	padding-bottom:18px;
	font-size:14px;
}
p.recobtn-box{
	margin-top:32px;
}
button.reco-btn, button.reco-re-btn{
	background-color:#C30;
	padding:8px 35px;
	color:#FFF;
	border-style:solid;
	border-width:1px;
	border-color:#333;
}
button.reco-re-btn{
	padding: 3px 20px;
}

div.diamond-recommendation-form-title{
	position:absolute;
	top:3px;
	right:0;
}




/* =========================================== */
div.ring-demo-pic-box{
	position:relative;
	width:448px;
	float:left;
	margin-top:35px;
}
img#ring-demo-pic{
	width:432px;
}

div.dia-choices-container{
	position:relative;
	width:780px;
	padding:0 0 0 55px;
	float:left;
	border-left-style:solid;
	border-width:1px;
	border-color:#CCC;
	margin-left:40px;
	margin-top:35px;
}
div.dia-choice-container{
	position:relative;
	display:inline-block;
	width:328px;
	background-color:#fff;
	border-style:solid;
	border-width:3px;
	border-color:#CCC;
	padding:20px;
	text-align:center;
	margin:0 12px 15px 0;
}
p.styletitle{
	position:relative;
	width:432px;
	text-align:center;
	font-size:18px;
	margin-top:15px;
}
img.dia-choice-img{
	width:188px;
}
.dia-choice-container .title03{
	margin-top:8px;
	margin-bottom:15px;
	font-size:24px;
}

button.chooseDiabtn{
	background-color:#C30;
	border-style:solid;
	border-width:1px;
	border-color:#930;
	color:#FFF;
	font-size:16px;
	padding:3px 28px;
	display:inline-block;
	margin-top:12px;
	letter-spacing:5px;
}
p.changeringchoicebtnholder{
	text-align:center;
}
a#changeRingChoicebtn{
	display:inline-block;
	background-color:#bbb;
	color:#FFF;
	font-size:14px;
	padding:3px 8px;
}
img.dia-choice-img{
	cursor:pointer;
}
img.dia-choice-img:hover{
	opacity:0.8;
}




@media (max-width:1383px){
div.ring-demo-pic-box{
	float:none;
	margin:30px auto 10px auto;
}
div.dia-choices-container{
	float:none;
	margin:0 auto;
	border-left:none;
	padding-left:20px;
	width: 708px;
	border-top-style:solid;
	border-width:3px;
	border-color:#e9e9e9;
	padding-top:25px;
	margin-top:20px;
	
}
.dia-choice-box .title03,.ring-demo-box .title03{
	font-size:24px;
	font-weight:bold;
	text-align:center;
}
div#budget-re-inputbox{
	position:relative;
	left:0;
	text-align:center;
	margin:35px auto;
}
div.rings-container-inner{
	text-align:center;
}

}

@media (max-width:808px){
div.dia-choices-container{
	width:320px;
	padding-left:0;
}
div.dia-choice-container{
	width:320px;
	margin:10px 0;
}
}

@media (max-width:808px){
#budget-re-inputbox>form>label{
	display:block;
	text-align:center;
	width:100%;
	padding:0;
	margin:0 0 12px 0;
	
}
}
@media (max-width:450px){
div.ring-demo-pic-box{
	width:92%;
}
img#ring-demo-pic, p.styletitle{
	width:100%;
	margin:0;
	padding:0;
}
}
@media (max-width:420px){
div#diamond-recommendation-form{
	width:92%;
}
}
</style>


<script type="text/javascript">
$(document).ready(function(){
    $(".j_linker").fancybox({
			maxWidth	: 1680,
			maxHeight	: 820,
			fitToView	: false,
			width		: '95%',
			height		: '85%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
});
</script>

<?php
		include_once('header.php');
	?>
</head>


<body>




<div class="container-fluidX container maxcontainer">
<?php
		include_once('topbar.php');
	?>


<div id="body-content">

<?php

if((isset($_SESSION['budget']) && $ringChoice==0) || (isset($_GET['start']) && $_GET['start']=='over') || (isset($_GET['change']) && $_GET['change']=='ring')){
	include('recommend-rings.php');
}else if($ringChoice!=0){
	include('recommend-dias.php');
}else{
	include('recommend-rings.php');
	include('recommend-form.php');
}


?>





<div id="budget-re-inputbox">
<form action="diamonds-rings.php" method="post">
<label>重新输入预算：</label>

<input type="text" name="budget" value="<?php if (isset($budget)) {echo $budget;} ?>"/>

<select name="currency">
    <option value="EUR" <?php if ($currency == 'EUR') { ?>selected="selected"<?php } ?>>欧元</option>
    <option value="CNY" <?php if ($currency == 'CNY') { ?>selected="selected"<?php } ?>>人民币</option>
    <option value="USD" <?php if ($currency == 'USD') { ?>selected="selected"<?php } ?>>美元</option>
    <option value="GBP" <?php if ($currency == 'GBP') { ?>selected="selected"<?php } ?>>英镑</option>
</select>

<button type="submit" class="reco-re-btn"> 推 荐 </button>

</form>
</div>
</div><!-- end bodycontent -->

<form action="diamonds-rings.php" method="post" id="ringChoiceForm">
<input type="hidden" name="ringChoice" id="ringChoice" />
<?php 
if(isset($_GET['change']) && $_GET['change']=='ring'){
?>
<input type="hidden" name="changeringchoice" value="changed" />
<?php 
} 
?>
</form>

<form action="mydiamondring.php" method="post" id="decisionform">
<input type="hidden" name="ringchoice" value="<?php echo $ringChoice; ?>" />
<input type="hidden" name="diaChoice" id="diaChoice" value="" />
</form>



<div id="wechatscanbox">
<div id="wechatscanboxinner">
<span id="wechatscanboxclosebtn" onClick="closeWechatbox()">X</span>
<p>请加微信询问价格</p>
<p><img style="width:128px;" src="../images/site_elements/wechat_scan.jpg"></p>
</div>
</div>


<?php
include_once('footer.php');
?>

</div>

</body>

<script type="text/javascript">

</script>


</html>
