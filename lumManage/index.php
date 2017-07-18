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

?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美钻石 :: 产品｜客户 管理系统</title>

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


div#themaincontentbox{
	position:relative;
	width:100%;
	height:500px;
}
div#clientsouter-box{
	position:relative;
	width:250px;
	height:100%;
	margin-left:20px;
}
div#clients-filterbox{
	position:relative;
	height:118px;
	border-style:solid;
	border-width:1px;
	border-color:#F6F;
	border-radius:6px;
}
div#client-list{
	position:relative;
	border-left-style:solid;
	border-width:2px;
	border-color:#F6F;
	height:300px;
	overflow:auto;
}
.clientinfo-container{
	position:relative;
	padding:3px 8px;
	background-color:#FFDFFF;
	margin:7px 0;
	border-top-style:solid;
	border-bottom-style:solid;
	border-width:1px;
	border-color:#F6F;
	cursor:pointer;
}
.clientinfo-container:hover{
	background-color:#FFF;
}
.clientbasicinfobox{
	position:relative;
	padding-bottom:20px;
	padding-left:48px;
}
div.client-action-buttons-box{
	position:absolute;
	bottom:0;
	right:0;
}
.clientinfo-container p{
	margin:2px 0;
	font-size:12px;
}
p.actionnumbers{
	font-size:10px;
	color:#999;
}
p.no-name{
	display:none;
}
.thename, .theweixinname{
	font-weight:bold;
	font-size:14px;
}
span.unknown-name{
	color:#AAA;
	font-size:16px;
}
.num_message, .num_purchase{
	font-size:14px;
	font-weight:bold;
	color:#666;
}
.clientmanagebtn-history, .clientmanagebtn-choose, .clientmanagebtn-edit{
	display:inline-block;
	border-width:1px;
	padding:0 3px;
	font-size:12px;
}
.clientmanagebtn-history{
	background-color:#9CF;
}
.clientmanagebtn-choose{
	background-color:#F3C;
}
.clientmanagebtn-edit{
	background-color:#C96;
	color:#FFF;
}
.client-detial-info-box{
	border-top-style:dashed;
	border-width:1px;
	border-color:#F6F;
	padding-top:12px;
	margin-top:12px;
	display:none;
}







div#history-record-box{
	position:absolute;
	top:30px;
	left:300px;
	width:750px;
	height:560px;
}
div#do-action-box{
	position:absolute;
	top:30px;
	left:300px;
	width:1080px;
	height:560px;
	display:none;
}
div#enquirybox{
	position:absolute;
	top:0;
	left:0;
	width:370px;
	height:300px;
	border-style:solid;
	border-width:1px;
	border-color:#999;
	border-radius:8px;
}
div#diamond-searchingbox{
	position:absolute;
	top:0;
	left:0;
	width:370px;	
}
div#diamond-searchingbox{
	background-color:#9FF;
	width:1050px;
}
div.historicalbox{
	position:relative;
	overflow:auto;
	font-size:14px;
}
div#sendnowbox{
	position:relative;
	height:109px;
	padding:10px 15px 0 15px;
	border-top-style:solid;
	border-top-width:1px;
	border-top-color:#999;
}
textarea#wechatreplytxt{
	width:98%;
	height:58px;
}
button#wechatreplybtn{
	background-color:#C6C;
	color:#FFF;
	padding:3px 12px;
	font-size:18px;
	color:#FFF;
	border-width:1px;
}
div.messagebox{
	position:relative;
	padding:8px 12px 10px 20px;
	border-radius:20px;
	margin-bottom:8px;
	margin-top:8px;
}
.messagetime{
	margin:0 0 3px 0;
	font-size:12px;
	color:#06F;
}
.coming_message{
	background-color:#0FF;
	margin-right:88px;
	margin-left:10px;
}
.going_message{
	background-color:#0C0;
	margin-left:88px;
	margin-right:10px;
	color:#FFF;
}
img.sexicon{
	width:18px;
	position:relative;
	top:2px;
}
span.user-icon{
	display:inline-block;
	position:absolute;
	top:0;
	left:0;
	width:38px;
	border-style:solid;
	border-width:1px;
	border-color:#999;
	background-repeat:no-repeat;
	background-position:center top;
	background-size: auto 100%;	
}
.user-icon img{
	position:relative;
	width:38px;
}
.tel-container, .email-container, .address-container{
	padding-bottom:2px;
	border-bottom-style:dashed;
	border-width:1px;
	border-color:#F6F;
}


#factbox{
	position:absolute;
	width:350px;
	left:390px;
	height:300px;
	top:0;
	background-color:#FC0;
	overflow:auto;
}
.history span.view_stockref_txt, .history p.companydetail{
	display:none;
}
button.buydiamondbtn, button#savethebuybtn{
	display:inline-block;
	padding:3px 8px;
	background-color:#F3F;
	color:#FFF;
	font-size:18px;
}
div.complete-detial-dia-bought{
	padding:5px;
	background-color:#FFF;
	margin:5px;
	font-size:14px;
}
a.viewinvoicebtn{
	display:inline-block;
	padding:3px;
	background-color:#F93;
	color:#FFF;
	border-style:solid;
	border-width:1px;
	border-color:#960;
}






#recent-contact-btn, #recent-transaction-btn, #all-clients-btn{
	display:inline-block;
	position:relative;
	margin:3px;
	padding:2px 5px;
	font-size:13px;
	background-color:#F9F;
	cursor:pointer;
}
#instantmessagebox{
	position:fixed;
	width:180px;
	height:120px;
	overflow:auto;
	top:10px;
	right:128px;
	border-style:solid;
	border-width:1px;
	border-color:#666;
	background-color:#FFF;
}
.newmessagenoti{
	margin:2px 0;
	padding:2px;
	background-color:#F9C;
	color:#FFF;
	font-size:10px;
}
.newmessageClientbtn{
	background-color:#900;
	border-width:1px;
	color:#FFF;
}
.message_img{
	width:100%;
}



/* for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

div#diamond-list{
	overflow:auto;
}


/* end for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* end for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/* end for diamonds choosing part -----------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

div#diamond-choicesbox{
	position:absolute;
	top: 50px;
	left:1080px;
	width: 200px;
	height: 420px;
	padding:10px;
	border-style:solid;
	border-width:1px;
	border-color:#06F;
	z-index:8;
}

div#choice-manipulating-box{
	margin-top:12px;
	padding-top:0;
	border-top-style:solid;
	border-top-width:1px;
	border-color:#0CF;
}
button#viewlistsavebtn{
	background-color:#0CF;
	padding:5px 20px;
	border-width:1px;
	font-size:18px;
}


div.choice-view{
	display:inline-block;
	padding:3px;
	background-color:#CFF;
	border-style:solid;
	border-width:1px;
	border-color:#09F;
	font-size:12px;
	margin:0 3px 5px 0;
}
button.choiceDetailbtn{
	background-color:#3CF;
	font-size:14px;
	border-width:1px;
	padding:5px 8px;
}
button.choiceCancelbtn{
	background-color:#CCC;
	font-size:12px;
	border-width:1px;
	padding:2px;
}
input#datepicker-appointment{
	font-size:18px;
}
#choicelist>div.saved{
	background-color:#FC0;
}


span.sold{
	display:inline-block;
	background-color:#F63;
	padding:3px 12px;
	font-size:18px;
	color:#FFF;
}



div#invoice-form{
	position:fixed;
	width:35%;
	height:85%;
	top:50px;
	right:35px;
	background-color:#CFF;
	z-index:8;
	box-shadow: 0 0 5px #333;
	display:none;
}
div#invoice-form-inner{
	position:relative;
	margin:18px;
	background-color:#FFF;
	padding:8px;
}
span.mustfillin{
	color:#F00;
}







<?php
if($_SESSION['account']=='admin'){
?>
span.view_rawprice, p.companydetail, span.rawprice, span.more-detail{
	display:none !important;
}
<?php
}
?>
</style>
<link rel="stylesheet" href="filterstyle.css" type="text/css" media="screen">
<link rel="stylesheet" href="diamondliststyle.css" type="text/css" media="screen">
<link rel="stylesheet" href="chosendiastyle.css" type="text/css" media="screen">
<link rel="stylesheet" href="http://edecenter.com/lab/jquery-ui.css" />


<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>
<script src="http://edecenter.com/lab/jquery-ui.min.js"></script>

</head>

<body>
<div id="header">
<?php
include('navi.php');
?>
<hr style="margin-left:250px;" />

<h1 class="pagetitle">产品｜客户 管理系统</h1>
</div>
<div id="themaincontentbox"><!-- the main body box -->

<div id="clientsouter-box">

    <div id="clients-filterbox">
    <?php include_once('includes/client-filter.php'); ?>
    </div>
    
    <div id="client-list">
    </div>

</div>


<div id="history-record-box">

    <div id="enquirybox">
        <div id="historical" class="historicalbox">
        </div>
        
        <div id="sendnowbox">
        
        </div>
    </div>    
    
    <div id="factbox">
    </div>

</div>


<div id="do-action-box">
    <div id="diamond-searchingbox">
        <div id="diamond-filterbox">
        <?php include_once('includes/diamond-filter.php'); ?>
        </div>
        <div id="diamond-list">
        </div>
    </div>
    <div id="diamond-choicesbox">
        <div id="choicelist">
        
        </div>
        
        <div id="choice-manipulating-box">
        <p style="margin:12px 0 0 0;">预约时间: <input type="text" id="datepicker-appointment"></p>
        <p style="margin:12px 0 0 0;"><button type="button" id="viewlistsavebtn" onclick="saveAppo()">保存预约</button></p>
        
        </div>
    </div>
    
    
    
    <div id="purchasebox">
        
    </div>
   
</div>


<div id="processingindi-box" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(255,255,255,.9); display:none;">
<p style="position:relative; width:250px; padding:50px 0; text-align:center; margin:80px; background-color:#FF0;">处理中。。。</p>
</div>



<div id="instantmessagebox">
</div>


</div><!-- .the main body box -->

<!--
<button onclick="playSound('multimedia_system_alert_006');">Play</button> 
-->

<div id="invoice-form">
<div id="invoice-form-inner">
<form method="post" action="create_invoice.php" target="_blank" id="create_invoice_form">
<h4 style="margin-top:3px;">发票信息</h4><br />
<input type="hidden" id="diamond_id_for_invoice" name="diamond_id_for_invoice" />
<input type="hidden" id="client_id_for_invoice" name="client_id_for_invoice" />
<p>姓名：<input type="text" id="realname-invoice" name="realname_invoice" /><span class="mustfillin">(必填)</span></p>
<p>地址：<input type="text" id="address-invoice" name="address_invoice" style="width:288px;" /></p>
<p>邮编：<input type="text" id="postcode-invoice" name="postcode_invoice" /></p>
<p>国家：<input type="text" id="country-invoice" name="country_invoice" /></p>
<p>电话：<input type="text" id="tel-invoice" name="tel_invoice" /></p>
<p>***</p>
<p>戒托/配饰：
<select id="ring" name="ring">
<option value="">无</option>
<option value="18K GOLD RING">18K GOLD RING 戒指</option>
<option value="18K GOLD PENDANT">18K GOLD PENDANT 吊坠</option>
<option value="18K GOLD EARINGS">18K GOLD EARINGS 耳坠</option>
</select>
</p>
<p>金额<span class="mustfillin">(必填)</span>:<br />欧元<input type="text" id="euros-invoice" name="euros_invoice" /> &nbsp; &nbsp; 人民币:<input type="text" id="yuan-invoice" name="yuan_invoice" /></p>
<br /><br />
<p>
<button type="button" id="savethebuybtn" onclick="savethebuy()">保存购买纪录并生成发票</button> 
<button type="button" id="closeInvoiceForm" onclick="InvoiceFormclose()">取消</button>

</p>
</form>
</div>
</div>

<div id="sound" style="display:none;"></div>



<div id="monitor" style="position:fixed; top:3px; left:0px; width:200px; height:50px; background-color:#FFC; z-index:88; display:none;"></div>



<script type="text/javascript">
//. all global variables defined here
var $crr_client_id='';
var $t;//for setInterval
var $tt;
var $crr_records_num=0;
var $unReadNum=0;//for the number of messages that are not read,when record refreshed, this number will keep the same
//. END of global variables




// events listeners
$(document).ready(function(){
	setAllPartsHeight();
	clientFilter('BYCONTACT');
	checkWeixinNewRecord();
	scrollmonitor();
});
$(window).resize(function(){
	setAllPartsHeight();
});
//$t=setInterval('refreshHistory()',30000);
// .events listeners



//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++ upstairs for General functionalities  +++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++ downstairs for WeChat ++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++



//. here goes client filtering system
function clientFilter(ref){
	$('#processingindi-box').fadeIn('fast');
	$.post(
	'getClients.php',
	{sortby: ref},
	function(data){
		$('#client-list').html(data);
		$('.historicalbox, #sendnowbox').html('');
		$('div.historicalbox').attr('id',('historical000'));
		clearTimeout($t);
		$('#processingindi-box').stop(true).fadeOut('fast');
	}
	);
}

function searchclient(){
	$('#processingindi-box').fadeIn('fast');
	var thekeyword=$('#client-keyword').val();
	$.post(
	'searchClients.php',
	{keyword: thekeyword},
	function(data){
		//console.log(data);
		$('#client-list').html(data);
		$('.historicalbox, #sendnowbox').html('');
		$('div.historicalbox').attr('id',('historical000'));
		clearTimeout($t);
		$('#processingindi-box').stop(true).fadeOut('fast');
	}
	);
}
//. END client filtering


// here goes showing history system
function showHistory(cID){
	if(!checkIfAppoSaved()){
		
		alert('有尚未保存的预约！');
		return false;
	}
	
	//$('#factbox, #history-record-box').html('');
	
	$('#do-action-box').fadeOut('fast',function(){
		$('#history-record-box').fadeIn('fast');
	});
	
	
	
	$crr_client_id=cID;
	
	console.log('--------->>> set box to crr_id: '+$crr_client_id);
	
	$('div.historicalbox').attr('id',('historical'+$crr_client_id));
	
	clearTimeout($t);
	//clearTimeout($tt);
	
	
	$('#processingindi-box').fadeIn('fast');
	
	$('.client-detial-info-box').stop(true).removeAttr('style');
	$('.clientinfo-container').stop(true).removeAttr('style');
	
	if($('#client_'+$crr_client_id).length>0){
		
		var dis_to_scroll=$("#client_"+$crr_client_id).offset().top-$('div.clientinfo-container').eq(0).offset().top;
		$('#client-list').animate({"scrollTop":dis_to_scroll}, 388);
		
	}else{
		//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
		// here get the client info for the left colomn
		//±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
		$('#processingindi-box').fadeIn('fast');
		$.post(
		'getClient.php',
		{id: $crr_client_id},
		function(data){
			$('#client-list').html(data);
			$('#processingindi-box').stop(true).fadeOut('fast');
		}
		);
	}
	
	//openup the details for the client info	
	$('#client_'+$crr_client_id).css('background-color','#F0ACF0');
	$('#client_'+$crr_client_id+' .client-detial-info-box').fadeIn('fast');
	//.openup the details for the client info
	
	$.post(
	'contacthistory.php',
	{clientID: cID},
	function(data){
		console.log('data back to crr_id: '+$crr_client_id);
		$('#historical'+$crr_client_id).html(data);
		$('#processingindi-box').stop(true).fadeOut('fast');
		clearTimeout($t);
		var id_for_crr_box=$crr_client_id;
		$t=setTimeout('refreshHistory("'+id_for_crr_box+'")',5000);//the content of history is refreshed every 5 seconds after each load
		EnterKeyListener();
		getTotalMessageNumber();
		if($('#newmessagefrom_'+cID).length>0){
			$('#newmessagefrom_'+cID).remove();
		}
	}
	);
	$.post(
	'messagereplyform.php',
	{clientID: cID},
	function(data){
		$('#sendnowbox').html(data);
	}
	);
	
	getViewingHistory($crr_client_id);
}

function getTotalMessageNumber(){
	$crr_records_num=$('.historicalbox div.coming_message').length;
	$unReadNum=$('.historicalbox div.new-message').length;
}

//. END showing history system
// refresh history
function refreshHistory(crr_box_id){
	var crr_idofbox=crr_box_id;
	
	if(crr_idofbox){
		console.log('********fetch data for crr_id: '+crr_idofbox);
		$.post(
		'contacthistory.php',
		{clientID: crr_idofbox},
		function(data){
			console.log('######## put data for crr_id: '+crr_idofbox+' | crr chosen id: '+$crr_client_id);
			$('#historical'+crr_idofbox).html(data);
			newMessageChecking();
			clearTimeout($t);
			crr_idofbox=$crr_client_id;
			$t=setTimeout('refreshHistory("'+crr_idofbox+'")',5000);
		}
		);
	}else{
		console.log('no id chosen');
	}
}

function newMessageChecking(){
	var crr_records_number=$('.historicalbox div.coming_message').length;
	var newMessageNumber=crr_records_number-$crr_records_num;
	if(newMessageNumber>0){
		$crr_records_num=crr_records_number;
		$unReadNum+=newMessageNumber;
		playSound('multimedia_system_alert_006');
	}
	if($unReadNum>0){
		for (i = 0; i < $unReadNum; i++) {
			$('.historicalbox div.coming_message').eq(i).css({'border-style':'solid', 'border-width':'2px', 'border-color':'#F90'});
		}
	}
}
// .END refresh history



//. here goes replywechat system
function replyMessage(){
	$('#processingindi-box').fadeIn('fast');
	var themessage=$('#wechatreplytxt').val();
	$.post(
	'replywechat.php',
	{clientID: $crr_client_id, message: themessage},
	function(data){
		console.log(data);	
		if(data=='ok'){
			$('#processingindi-box').stop(true).fadeOut('fast');
			var newmessage='<div class="messagebox going_message"><p class="messagetime">刚刚</p><div class="the_message">'+themessage+'</div></div>';
			$('div.historicalbox').prepend(newmessage);
			$('.historicalbox div.coming_message').removeAttr('style');
			$('#wechatreplytxt').val('');
			$unReadNum=0;
		}
	}
	);
}
//. END replywechat system


//monitor new weChat messages
function checkWeixinNewRecord(){
	$.post(
	'new-message-wechat.php',
	{clientID: $crr_client_id},
	function(data){
		//console.log('new record checked');
		$('#instantmessagebox').html(data);
		clearTimeout($tt);
		$tt=setTimeout('checkWeixinNewRecord()',12000);
	}
	);
}
//. END monitor new weChat messages


//listener for Enter key
function EnterKeyListener(){
	//alert('listen enter key');
	$('#wechatreplytxt').off();
	$('#wechatreplytxt').keypress(function (e) {
	 var key = e.which;
	 if(key == 13){  // the enter key code	  
		if($.trim($('#wechatreplytxt').val())!=''){
			$('button#wechatreplybtn').click();
		}
	 }
	});
}
//.end Listener for enter key





//here goes the viewing history
function getViewingHistory(c_id){
	var crr_client_id=c_id;
	$.post(
	'getviewhistory.php',
	{cliend_id: crr_client_id},
	function(data){
		//console.log('new record checked');
		$('div#factbox').html(data);
	}
	);
}
//.END  the viewing history

//sound warning effect
function playSound(filename){   
                document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
            }
//.end sound warning effect



//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++ upstairs for Wechat  ++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++ downstairs for diamond +++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++


function chooseDiamonds(cID){
	if(!checkIfAppoSaved()){
		alert('有尚未保存的预约！');
		return false;
	}
	
	$crr_client_id=cID;
	
	$('div.historicalbox').attr('id',('historical000'));
	clearTimeout($t);
	
	$('.client-detial-info-box').stop(true).removeAttr('style');
	$('.clientinfo-container').stop(true).removeAttr('style');
	var dis_to_scroll=$("#client_"+$crr_client_id).offset().top-$('div.clientinfo-container').eq(0).offset().top;
	$('#client-list').animate({"scrollTop":dis_to_scroll}, 388);
	//openup the details for the client info	
	$('#client_'+$crr_client_id).css('background-color','#F0ACF0');
	$('#client_'+$crr_client_id+' .client-detial-info-box').fadeIn('fast');
	//.openup the details for the client info
	
	
	$('#history-record-box').fadeOut('fast',function(){
		$('#do-action-box').fadeIn('fast',function(){
			setAllPartsHeight();
		});
	});
	
	//here we put all needed info to the invoice form
	$('input#client_id_for_invoice').val($crr_client_id);
	if($('#client_'+$crr_client_id+' .clientbasicinfobox .clientbasicinfo p.namecontainer span.unknown-name').length==0){
		var realname=$.trim($('#client_'+$crr_client_id+' .clientbasicinfobox .clientbasicinfo p.namecontainer span.thename').html());
		$('input#realname-invoice').val(realname);
	}	
	
	var invoiceaddress=$('#client_'+$crr_client_id+' .client-detial-info-box p.address-container span.info-txt').html();
	$('input#address-invoice').val(invoiceaddress);
	
	var invoicetel=$('#client_'+$crr_client_id+' .client-detial-info-box p.tel-container span.info-txt').html();
	$('input#tel-invoice').val(invoicetel);
	//.END here we put all needed info to the invoice form
	
	getAppo($crr_client_id);
}



//

var $featured='NO';



var $shapeBR=false;
var $shapePS=false;
var $shapePR=false;
var $shapeHS=false;
var $shapeMQ=false;
var $shapeOV=false;
var $shapeEM=false;
var $shapeRAD=false;
var $shapeCU=false;

var $shape = '';


var $colorD = false;
var $colorE = false;
var $colorF = false;
var $colorG = false;
var $colorH = false;
var $colorI = false;
var $colorJ = false;
var $colorK = false;
var $colorL = false;
var $colorM = false;

var $color = '';



var $clarityFL = false;
var $clarityIF = false;
var $clarityWS1 = false;
var $clarityWS2 = false;
var $clarityVS1 = false;
var $clarityVS2 = false;
var $claritySI1 = false;
var $claritySI2 = false;

var $clarity = '';

//======================= cut ==========================
var $cutEX=false;
var $cutVG=false;
var $cutG=false;
var $cutF=false;

var $cut='';

//======================= sym ==========================
var $symEX=false;
var $symVG=false;
var $symG=false;
var $symF=false;

var $sym='';

//======================= polish ==========================
var $polishEX=false;
var $polishVG=false;
var $polishG=false;
var $polishF=false;

var $polish='';

//======================= certi ==========================
var $certiIGI=false;
var $certiHRD=false;
var $certiGIA=false;

var $certi='';

//======================= fluo ==========================
var $fluoVST=false;
var $fluoSTG=false;
var $fluoMED=false;
var $fluoFNT=false;
var $fluoNON=false;

var $fluo='';



var $weight_from = '';
var $weight_to = '';
var $price_from = '';
var $price_to = '';
var $sorting = 'price';
var $sorting_weight_direction = 'ASC';
var $sorting_color_direction = 'ASC';
var $sorting_clarity_direction = 'ASC';
var $sorting_cut_direction = 'ASC';
var $sorting_price_direction = 'ASC';
var $sorting_direction = 'ASC';

var $crr_page=1;


function filter_shape(theshape){
	var $theshape=theshape;
	var $or='';
	$shape='';
	
	if($theshape=='BR'){
		if($shapeBR){
			$shapeBR=false;
			$('#filter_shapeBR').removeAttr('style');
		}else{
			$shapeBR=true;
			$('#filter_shapeBR').css('background-color','#E9E3CF');
		}
	}else if($theshape=='PS'){
		if($shapePS){			
			$shapePS=false;
			$('#filter_shapePS').removeAttr('style');
		}else{
			$shapePS=true;
			$('#filter_shapePS').css('background-color','#E9E3CF');
		}
	}else if($theshape=='PR'){		
		if($shapePR){
			$shapePR=false;
			$('#filter_shapePR').removeAttr('style');
		}else{
			$shapePR=true;
			$('#filter_shapePR').css('background-color','#E9E3CF');
		}
	}else if($theshape=='HS'){
		if($shapeHS){
			$shapeHS=false;
			$('#filter_shapeHS').removeAttr('style');
		}else{
			$shapeHS=true;
			$('#filter_shapeHS').css('background-color','#E9E3CF');
		}
	}else if($theshape=='MQ'){
		if($shapeMQ){
			$shapeMQ=false;
			$('#filter_shapeMQ').removeAttr('style');
		}else{
			$shapeMQ=true;
			$('#filter_shapeMQ').css('background-color','#E9E3CF');
		}
	}else if($theshape=='OV'){
		if($shapeOV){
			$shapeOV=false;
			$('#filter_shapeOV').removeAttr('style');
		}else{
			$shapeOV=true;
			$('#filter_shapeOV').css('background-color','#E9E3CF');
		}
	}else if($theshape=='EM'){
		if($shapeEM){
			$shapeEM=false;
			$('#filter_shapeEM').removeAttr('style');
		}else{
			$shapeEM=true;
			$('#filter_shapeEM').css('background-color','#E9E3CF');
		}
	}else if($theshape=='RAD'){
		if($shapeRAD){
			$shapeRAD=false;
			$('#filter_shapeRAD').removeAttr('style');
		}else{
			$shapeRAD=true;
			$('#filter_shapeRAD').css('background-color','#E9E3CF');
		}
	}else if($theshape=='CU'){
		if($shapeCU){
			$shapeCU=false;
			$('#filter_shapeCU').removeAttr('style');
		}else{
			$shapeCU=true;
			$('#filter_shapeCU').css('background-color','#E9E3CF');
		}
	}
	
	if($shapeBR){
		$shape+=' shape = "BR" ';
		$or = ' OR ';
	}
	if($shapePS){
		$shape+=$or+' shape = "PS" ';
		$or = ' OR ';
	}
	if($shapePR){
		$shape+=$or+' shape = "PR" ';
		$or = ' OR ';
	}
	if($shapeHS){
		$shape+=$or+' shape = "HS" ';
		$or = ' OR ';
	}
	if($shapeMQ){
		$shape+=$or+' shape = "MQ" ';
		$or = ' OR ';
	}
	if($shapeOV){
		$shape+=$or+' shape = "OV" ';
		$or = ' OR ';
	}
	if($shapeEM){
		$shape+=$or+' shape = "EM" ';
		$or = ' OR ';
	}
	if($shapeRAD){
		$shape+=$or+' shape = "RAD" ';
		$or = ' OR ';
	}
	if($shapeCU){
		$shape+=$or+' shape = "CU" ';
		$or = ' OR ';
	}
	
	update();
}
function filter_color(thecolor){
	var $thecolor=thecolor;
	var $or='';
	$color='';
	
	if($thecolor=='D'){
		if($colorD){
			$colorD=false;
			$('#filter_colorD').removeAttr('style');
		}else{
			$colorD=true;
			$('#filter_colorD').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='E'){
		if($colorE){
			$colorE=false;
			$('#filter_colorE').removeAttr('style');
		}else{
			$colorE=true;
			$('#filter_colorE').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='F'){
		if($colorF){
			$colorF=false;
			$('#filter_colorF').removeAttr('style');
		}else{
			$colorF=true;
			$('#filter_colorF').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='G'){
		if($colorG){
			$colorG=false;
			$('#filter_colorG').removeAttr('style');
		}else{
			$colorG=true;
			$('#filter_colorG').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='H'){
		if($colorH){
			$colorH=false;
			$('#filter_colorH').removeAttr('style');
		}else{
			$colorH=true;
			$('#filter_colorH').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='I'){
		if($colorI){
			$colorI=false;
			$('#filter_colorI').removeAttr('style');
		}else{
			$colorI=true;
			$('#filter_colorI').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='J'){
		if($colorJ){
			$colorJ=false;
			$('#filter_colorJ').removeAttr('style');
		}else{
			$colorJ=true;
			$('#filter_colorJ').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='K'){
		if($colorK){
			$colorK=false;
			$('#filter_colorK').removeAttr('style');
		}else{
			$colorK=true;
			$('#filter_colorK').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='L'){
		if($colorL){
			$colorL=false;
			$('#filter_colorL').removeAttr('style');
		}else{
			$colorL=true;
			$('#filter_colorL').css('background-color','#E9E3CF');
		}
	}else if($thecolor=='M'){
		if($colorM){
			$colorM=false;
			$('#filter_colorM').removeAttr('style');
		}else{
			$colorM=true;
			$('#filter_colorM').css('background-color','#E9E3CF');
		}
	}
	
	if($colorD){
		$color+=' color = "D" ';
		$or=' OR ';
	}
	if($colorE){
		$color+=$or+' color = "E" ';
		$or=' OR ';
	}
	if($colorF){
		$color+=$or+' color = "F" ';
		$or=' OR ';
	}
	if($colorG){
		$color+=$or+' color = "G" ';
		$or=' OR ';
	}
	if($colorH){
		$color+=$or+' color = "H" ';
		$or=' OR ';
	}
	if($colorI){
		$color+=$or+' color = "I" ';
		$or=' OR ';
	}
	if($colorJ){
		$color+=$or+' color = "J" ';
		$or=' OR ';
	}
	if($colorK){
		$color+=$or+' color = "K" ';
		$or=' OR ';
	}
	if($colorL){
		$color+=$or+' color = "L" ';
		$or=' OR ';
	}
	if($colorM){
		$color+=$or+' color = "M" ';
	}
	
	update();
}



function filter_clarity(theclarity){
	var $theclarity=theclarity;
	var $or='';
	$clarity='';
	
	if($theclarity=='FL'){
		if($clarityFL){
			$clarityFL=false;
			$('#filter_clarityFL').removeAttr('style');
		}else{
			$clarityFL=true;
			$('#filter_clarityFL').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='IF'){
		if($clarityIF){
			$clarityIF=false;
			$('#filter_clarityIF').removeAttr('style');
		}else{
			$clarityIF=true;
			$('#filter_clarityIF').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='WS1'){
		if($clarityWS1){
			$clarityWS1=false;
			$('#filter_clarityWS1').removeAttr('style');
		}else{
			$clarityWS1=true;
			$('#filter_clarityWS1').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='WS2'){
		if($clarityWS2){
			$clarityWS2=false;
			$('#filter_clarityWS2').removeAttr('style');
		}else{
			$clarityWS2=true;
			$('#filter_clarityWS2').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='VS1'){
		if($clarityVS1){
			$clarityVS1=false;
			$('#filter_clarityVS1').removeAttr('style');
		}else{
			$clarityVS1=true;
			$('#filter_clarityVS1').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='VS2'){
		if($clarityVS2){
			$clarityVS2=false;
			$('#filter_clarityVS2').removeAttr('style');
		}else{
			$clarityVS2=true;
			$('#filter_clarityVS2').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='SI1'){
		if($claritySI1){
			$claritySI1=false;
			$('#filter_claritySI1').removeAttr('style');
		}else{
			$claritySI1=true;
			$('#filter_claritySI1').css('background-color','#E9E3CF');
		}
	}else if($theclarity=='SI2'){
		if($claritySI2){
			$claritySI2=false;
			$('#filter_claritySI2').removeAttr('style');
		}else{
			$claritySI2=true;
			$('#filter_claritySI2').css('background-color','#E9E3CF');
		}
	}
	if($clarityFL){
		$clarity+=' clarity = "FL" ';
		$or = ' OR ';
	}
	if($clarityIF){
		$clarity+=$or+' clarity = "IF" ';
		$or = ' OR ';
	}
	if($clarityWS1){
		$clarity+=$or+' clarity = "VVS1" ';
		$or = ' OR ';
	}
	if($clarityWS2){
		$clarity+=$or+' clarity = "VVS2" ';
		$or = ' OR ';
	}
	if($clarityVS1){
		$clarity+=$or+' clarity = "VS1" ';
		$or = ' OR ';
	}
	if($clarityVS2){
		$clarity+=$or+' clarity = "VS2" ';
		$or = ' OR ';
	}
	if($claritySI1){
		$clarity+=$or+' clarity = "SI1" ';
		$or = ' OR ';
	}
	if($claritySI2){
		$clarity+=$or+' clarity = "SI2" ';
		$or = ' OR ';
	}
	
	
	update();
}


function filter_cut(thegrade){
	var $thecutgrade=thegrade;
	var $or='';
	$cut='';
	
	if($thecutgrade=='EX'){
		if($cutEX){
			$cutEX=false;
			$('#filter_cutEX').removeAttr('style');
		}else{
			$cutEX=true;
			$('#filter_cutEX').css('background-color','#E9E3CF');
		}
	}else if($thecutgrade=='VG'){
		if($cutVG){
			$cutVG=false;
			$('#filter_cutVG').removeAttr('style');
		}else{
			$cutVG=true;
			$('#filter_cutVG').css('background-color','#E9E3CF');
		}
	}else if($thecutgrade=='G'){
		if($cutG){
			$cutG=false;
			$('#filter_cutG').removeAttr('style');
		}else{
			$cutG=true;
			$('#filter_cutG').css('background-color','#E9E3CF');
		}
	}else if($thecutgrade=='F'){
		if($cutF){
			$cutF=false;
			$('#filter_cutF').removeAttr('style');
		}else{
			$cutF=true;
			$('#filter_cutF').css('background-color','#E9E3CF');
		}
	}
	
	if($cutEX){
		$cut+=' cut_grade = "EX" ';
		$or= ' OR ';
	}
	if($cutVG){
		$cut+=$or+' cut_grade = "VG" ';
		$or= ' OR ';
	}
	if($cutG){
		$cut+=$or+' cut_grade = "G" ';
	    $or= ' OR ';
	}
	if($cutF){
		$cut+=$or+' cut_grade = "F" ';
		$or= ' OR ';
	}
	
	
	update();
}

//filter polish =============================
//filter polish =============================
//filter polish =============================
//filter polish =============================
function filter_polish(thegrade){
	var $thepolishgrade=thegrade;
	var $or='';
	$polish='';
	
	if($thepolishgrade=='EX'){
		if($polishEX){
			$polishEX=false;
			$('#filter_polishEX').removeAttr('style');
		}else{
			$polishEX=true;
			$('#filter_polishEX').css('background-color','#E9E3CF');
		}
	}else if($thepolishgrade=='VG'){
		if($polishVG){
			$polishVG=false;
			$('#filter_polishVG').removeAttr('style');
		}else{
			$polishVG=true;
			$('#filter_polishVG').css('background-color','#E9E3CF');
		}
	}else if($thepolishgrade=='G'){
		if($polishG){
			$polishG=false;
			$('#filter_polishG').removeAttr('style');
		}else{
			$polishG=true;
			$('#filter_polishG').css('background-color','#E9E3CF');
		}
	}else if($thepolishgrade=='F'){
		if($polishF){
			$polishF=false;
			$('#filter_polishF').removeAttr('style');
		}else{
			$polishF=true;
			$('#filter_polishF').css('background-color','#E9E3CF');
		}
	}
	
	if($polishEX){
	    $polish+=' polish = "EX" ';
		$or= ' OR ';
	}
	if($polishVG){
		$polish+=$or+' polish = "VG" ';
		$or= ' OR ';
	}
	if($polishG){
		$polish+=$or+' polish = "G" ';
		$or= ' OR ';
	}
	if($polishF){
		$polish+=$or+' polish = "F" ';
		$or= ' OR ';
	}
	update();
}

//filter symmetry =============================
//filter symmetry =============================
//filter symmetry =============================
//filter symmetry =============================
function filter_sym(thegrade){
	var $thesymgrade=thegrade;
	var $or='';
	$sym='';
	
	if($thesymgrade=='EX'){
		if($symEX){
			$symEX=false;
			$('#filter_symEX').removeAttr('style');
		}else{
			$symEX=true;
			$('#filter_symEX').css('background-color','#E9E3CF');
		}
	}else if($thesymgrade=='VG'){
		if($symVG){
			$symVG=false;
			$('#filter_symVG').removeAttr('style');
		}else{
			$symVG=true;
			$('#filter_symVG').css('background-color','#E9E3CF');
		}
	}else if($thesymgrade=='G'){
		if($symG){
			$symG=false;
			$('#filter_symG').removeAttr('style');
		}else{
			$symG=true;
			$('#filter_symG').css('background-color','#E9E3CF');
		}
	}else if($thesymgrade=='F'){
		if($symF){
			$symF=false;
			$('#filter_symF').removeAttr('style');
		}else{
			$symF=true;
			$('#filter_symF').css('background-color','#E9E3CF');
		}
	}
	
	if($symEX){
		$sym+=' symmetry = "EX" ';
		$or= ' OR ';
	}
	if($symVG){
		$sym+=$or+' symmetry = "VG" ';
		$or= ' OR ';
	}
	if($symG){
		$sym+=$or+' symmetry = "G" ';
		$or= ' OR ';
	}
	if($symF){
		$sym+=$or+' symmetry = "F" ';
		$or= ' OR ';
	}
	update();
}

//filter certificate =============================
//filter certificate =============================
//filter certificate =============================
//filter certificate =============================
function filter_certi(thelab){
	var $thecerti=thelab;
	var $or='';
	$certi='';
	
	if($thecerti=='IGI'){
		if($certiIGI){
			$certiIGI=false;
			$('#filter_certiIGI').removeAttr('style');
		}else{
			$certiIGI=true;
			$('#filter_certiIGI').css('background-color','#E9E3CF');
		}
	}else if($thecerti=='GIA'){
		if($certiGIA){
			$certiGIA=false;
			$('#filter_certiGIA').removeAttr('style');
		}else{
			$certiGIA=true;
			$('#filter_certiGIA').css('background-color','#E9E3CF');
		}
	}else if($thecerti=='HRD'){
		if($certiHRD){
			$certiHRD=false;
			$('#filter_certiHRD').removeAttr('style');
		}else{
			$certiHRD=true;
			$('#filter_certiHRD').css('background-color','#E9E3CF');
		}
	}
	
	if($certiIGI){
		$certi+=' grading_lab = "IGI" ';
		$or= ' OR ';
	}
	if($certiGIA){
		$certi+=$or+' grading_lab = "GIA" ';
		$or= ' OR ';
	}
	if($certiHRD){
		$certi+=$or+' grading_lab = "HRD" ';
		$or= ' OR ';
	}
	
	update();
}

//filter FLUO =============================
//filter FLUO =============================
//filter FLUO =============================
//filter FLUO =============================
function filter_fluo(thegrade){
	var $thefluo=thegrade;
	var $or='';
	$fluo='';
	//VST STG MED FNT NON
	if($thefluo=='VST'){
		if($fluoVST){
			$fluoVST=false;
			$('#filter_fluoVST').removeAttr('style');
		}else{
			$fluoVST=true;
			$('#filter_fluoVST').css('background-color','#E9E3CF');
		}
	}else if($thefluo=='STG'){
		if($fluoSTG){
			$fluoSTG=false;
			$('#filter_fluoSTG').removeAttr('style');
		}else{
			$fluoSTG=true;
			$('#filter_fluoSTG').css('background-color','#E9E3CF');
		}
	}else if($thefluo=='MED'){
		if($fluoMED){
			$fluoMED=false;
			$('#filter_fluoMED').removeAttr('style');
		}else{
			$fluoMED=true;
			$('#filter_fluoMED').css('background-color','#E9E3CF');
		}
	}else if($thefluo=='FNT'){
		if($fluoFNT){
			$fluoFNT=false;
			$('#filter_fluoFNT').removeAttr('style');
		}else{
			$fluoFNT=true;
			$('#filter_fluoFNT').css('background-color','#E9E3CF');
		}
	}else if($thefluo=='NON'){
		if($fluoNON){
			$fluoNON=false;
			$('#filter_fluoNON').removeAttr('style');
		}else{
			$fluoNON=true;
			$('#filter_fluoNON').css('background-color','#E9E3CF');
		}
	}
	
	if($fluoVST){
		$fluo+=' fluorescence_intensity = "VST" OR fluorescence_intensity = "Very Strong" ';
		$or= ' OR ';
	}
	if($fluoSTG){
		$fluo+=$or+' fluorescence_intensity = "STG" OR fluorescence_intensity = "Strong" ';
		$or= ' OR ';
	}
	if($fluoMED){
		$fluo+=$or+' fluorescence_intensity = "MED" OR fluorescence_intensity = "Medium" ';
		$or= ' OR ';
	}
	if($fluoFNT){
		$fluo+=$or+' fluorescence_intensity = "FNT" OR fluorescence_intensity = "SLT"  OR fluorescence_intensity = "VSL" OR fluorescence_intensity = "Faint" OR fluorescence_intensity = "Very Slight" OR fluorescence_intensity = "Slight" ';
		$or= ' OR ';
	}
	if($fluoNON){
		$fluo+=$or+' fluorescence_intensity = "NON" OR fluorescence_intensity = "None"';
		$or= ' OR ';
	}
	update();
}


function sorting_weight(){
	$sorting='weight';
	if($sorting_weight_direction == 'ASC'){
		$sorting_weight_direction = 'DESC';
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$sorting_weight_direction = 'ASC';
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	$sorting_direction=$sorting_weight_direction;
	update();
}
function sorting_color(){
	$sorting = 'color';
	if($sorting_color_direction == 'ASC'){
		$sorting_color_direction = 'DESC';
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_color_direction = 'ASC';
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_color_direction;
	update();
}
function sorting_clarity(){
	$sorting = 'clarity';
	if($sorting_clarity_direction == 'ASC'){
		$sorting_clarity_direction = 'DESC';
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_clarity_direction = 'ASC';
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_clarity_direction;
	update();
}
function sorting_cut(){
	$sorting = 'cut';
	if($sorting_cut_direction == 'ASC'){
		$sorting_cut_direction = 'DESC';
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_cut_direction = 'ASC';
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_cut_direction;
	update();
}
function sorting_price(){
	$sorting = 'price';
	if($sorting_price_direction == 'ASC'){
		$sorting_price_direction = 'DESC';
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$sorting_price_direction = 'ASC';
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	$sorting_direction=$sorting_price_direction;
	update();
}

function arrowDirection(){
	if($sorting_weight_direction == 'ASC'){
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	if($sorting_color_direction == 'ASC'){
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_clarity_direction == 'ASC'){
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_cut_direction == 'ASC'){
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_price_direction == 'ASC'){
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-up.png');
	}
}

function updateweight(){
	$weight_from=$('#weight_from').val();
	$weight_to=$('#weight_to').val();
	
	update();
}

function updateprice(){
	$price_from=$('#price_from').val();
	$price_to=$('#price_to').val();		
	
	update();
}

function update(){
	
	nowworkingonfilter=true;
	$('div#loading_indi').fadeIn('fast');
	$.post(
		"getdiamonds.php", 
		{shape:$shape, color:$color, clarity:$clarity, cut:$cut, polish:$polish, sym:$sym, fluo:$fluo, certi:$certi, weight_from:$weight_from, weight_to:$weight_to, price_from:$price_from, price_to:$price_to, featured: $featured, sorting:$sorting, sorting_direction:$sorting_direction, crr_page:$crr_page}, 
		function(data){
			
			//alert(data);
			//return;
			
			var contentLoaded=data;
			$('div#processingindi-box').fadeOut('fast');
			$('#diamond-list').html(data);
			//
			
<?php
if($_SESSION['account']=='superadmin'){
?>			
			getDiaDetails();
<?php
}
?>			
			examineAlreadyChosen();
		}
	);
}

function searchbystockref(){
	var theStockRef=$('input#stockreftosearch').val();
	if($.trim(theStockRef)==''){
		return;
	}
	$.post(
		"getdiamonds-byref.php", 
		{stockref:theStockRef}, 
		function(data){
			var contentLoaded=data;
			$('div#processingindi-box').fadeOut('fast');
			$('#diamond-list').html(data);
			//
			
<?php
if($_SESSION['account']=='superadmin'){
?>			
			getDiaDetails();
<?php
}
?>			
			examineAlreadyChosen();
		}
	);
}

function choosethispage(page){
	$crr_page=page;
	update();
}

var crrlistnavipage=0;
var $intotalhowmanyrecords=0;


//to get all the company details one by one by post................
function getDiaDetails(){
	$('#diamond-list p.valueline').each(function(){
		var crr_obj=$(this);
		var crr_dia_c_name=crr_obj.children('span.more-detail').children('span.companynamefordia').html();
		var crr_dia_id=crr_obj.attr('title');
		if($.trim(crr_dia_c_name)=='-'){
			seemore(crr_dia_id);
		}
	});
}


function examineAlreadyChosen(){
	$('div.complete-detial-dia-toview').each(function(){
		var crr_choice=$(this).attr('title');
		$('p.valueline[title="'+crr_choice+'"]').children('button.choosethisdiamondbtn').attr('disabled','disabled').html('已选择');
	});
}

function getAppo($theCid){
	var theCid=$theCid;
	$.post(
		"getappointment.php", 
		{cliend_id:theCid}, 
		function(data){	
			$('div#processingindi-box').fadeOut('fast');			
			$('#choicelist').html(data);
		}
	);
}

function seemore(refNum){
	var theRefNum=refNum;
	
	$('div#processingindi-box').fadeIn('fast');
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! now post !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	$.post(
		"http://happyeurope.eu/_admin/getdiamondcompany.php", 
		{diamond_id:theRefNum}, 
		function(data){
			console.log(data);
		    $('div#processingindi-box').fadeOut('fast');
			$('p.valueline[title="'+theRefNum+'"]').children('span.more-detail').html(data);
		}
	);
}


function chooseToView(refNum){
	var theRefNum=refNum;
	
	$('div#processingindi-box').fadeIn('fast');
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! now post !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	$.post(
		"getdiamonddetail.php", 
		{diamond_id:theRefNum}, 
		function(data){	
			$('div#processingindi-box').fadeOut('fast');			
			$('#choicelist').prepend(data);
		}
	);
	
	$('p.valueline[title="'+theRefNum+'"]').children('button.choosethisdiamondbtn').attr('disabled','disabled').html('已选择');
	/**/
}


function saveAppo(){
	if($.trim($('input#datepicker-appointment').val())==''){
		alert('请选择预约时间!');
		return;
	}
	if($('#diamond-choicesbox div#choicelist div.complete-detial-dia-toview').length<=0){
		alert('请选择备选钻石');
		return;
	}
	var dia_list_toview='';
	var dia_list_counter=0;
	var appo_time=$('input#datepicker-appointment').val();
	console.log($('#diamond-choicesbox div#choicelist div.complete-detial-dia-toview').length);
	
	$('#diamond-choicesbox div#choicelist div.complete-detial-dia-toview').each(function(){
		var crr_dia_id=$(this).attr('title');
		if(dia_list_counter==0){
			$sep_sigen='';
		}else{
			$sep_sigen=';';
		}
		dia_list_toview+=$sep_sigen+crr_dia_id;
		console.log('added ---:'+dia_list_toview);
		dia_list_counter++;
	});
	
	$('div#processingindi-box').fadeIn('fast');
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! now post !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//console.log(dia_list_toview);
	$.post(
		"save_dia_appointment.php", 
		{viewerid:$crr_client_id, diamonds:dia_list_toview, appotime:appo_time}, 
		function(data){	
			$('div#processingindi-box').fadeOut('fast');			
			$('#diamond-choicesbox div#choicelist div.complete-detial-dia-toview span.app_time').html(appo_time);
			//$('div.complete-detial-dia-toview').css('background-color','#FC6');
			$('div.complete-detial-dia-toview').addClass('saved');
		}
	);
}


function canceltoview(refNum){
	//console.log(refNum);
	var theRefNum=refNum;
	var r=confirm('确定要移除该选择吗？');
	if(r){
		$('div#processingindi-box').fadeIn('fast');
		$.post(
		'cancelviewChoice.php',
		{stockRef:theRefNum, ClientID:$crr_client_id}, 
		function(data){
			console.log(data);
			$('div#processingindi-box').fadeOut('fast');
			if(data=='OK' || data=='EMPTY'){
				console.log(data+' ---- ---  --- to delete'+theRefNum);				
				$('div.complete-detial-dia-toview[title="'+theRefNum+'"]').remove();
				$('p.valueline[title="'+theRefNum+'"]').children('button.choosethisdiamondbtn').removeAttr('disabled').html('备选');
			}
		}
		);
	}
	
}

function buydiamond(dia_id){
	$('input#diamond_id_for_invoice').val(dia_id);
	$('div#invoice-form').fadeIn('fast');
}
function InvoiceFormclose(){
	$('div#invoice-form').fadeOut('fast');
}
function savethebuy(){
	var diamond_id=$('input#diamond_id_for_invoice').val();
	var client_name=$.trim($('input#realname-invoice').val());
	var client_address=$('input#address-invoice').val()+' '+$('input#postcode-invoice').val()+'<br />'+$('input#country-invoice').val();
	var client_tel=$('input#tel-invoice').val();
	var jewelry=$('#ring').val();
	var theprice_euros=$.trim($('input#euros-invoice').val());
	var theprice_yuan=$.trim($('input#yuan-invoice').val());
	if(client_name==''){
		alert('请添写客户姓名');
		return;
	}
	if(theprice_euros=='' && theprice_yuan==""){
		alert('请添写价格');
		return;
	}
	$('form#create_invoice_form').submit();
	$('div#invoice-form').fadeOut('fast');
	$('div.complete-detial-dia-toview[title="'+diamond_id+'"]').find('button.buydiamondbtn').html('已购');
	$('div.complete-detial-dia-toview[title="'+diamond_id+'"]').find('button').attr('disabled','disabled');
	/*
	$('div#processingindi-box').fadeIn('fast');
	$.post(
		'save_bought_diamond.php',
		{diamondid:diamond_id, ClientID:$crr_client_id, Clientname:client_name, Clientaddress:client_address, Clienttel:client_tel, chosenJewelry:jewelry, priceeuros:theprice_euros, priceyuan:theprice_yuan}, 
		function(data){			
			console.log(data);
			$('div#processingindi-box').fadeOut('fast');
			if(data=='OK'){
				$('div.complete-detial-dia-toview[title="'+diamond_id+'"]').children('p.buy-action-container').html('<span class="sold">已售出</span>');
			}
		}
	);
	*/
	
}


//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++ upstairs for diamond  ++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------------------------------------------------------------------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++ downstairs for layout +++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++||||||||||||||||||||||++++++++++++++++++++++++++++++++++++++++++++++
//layout contral part
function setAllPartsHeight(){
	var crr_b_h=$(window).height();
	var headerheight=150;
	$('div#themaincontentbox').css('height',(crr_b_h-headerheight));
	$('div#client-list').css('height',(crr_b_h-headerheight-120));
	$('#history-record-box, #do-action-box').css('height',(crr_b_h-headerheight-80));
	$('#enquirybox, #factbox').css('height',(crr_b_h-headerheight-80));
	$('div.historicalbox').css('height',(crr_b_h-headerheight-80-120));
	//$('div#diamond-list').css('height',(crr_b_h-headerheight-80-5-($('div#diamond-filterbox').height())));
}
//.layout contral part




function scrollmonitor(){
	$( window ).scroll(function() {
		var crr_b_h=$(window).height();
		var headerheight=150;
		
		$('#diamond-choicesbox').css('top',(50+$( window ).scrollTop()));
		
		if($( window ).scrollTop()>=132){
			$('div#clientsouter-box').css({'top': ($( window ).scrollTop()-130)});
			$('div#client-list').css('height',(crr_b_h-headerheight-120+132));
		}else{
			$('div#clientsouter-box').removeAttr('style');
			$('div#client-list').css('height',(crr_b_h-headerheight-120+$( window ).scrollTop()));
			$('#monitor').html($('div#client-list').height());
		}
	});
}

function checkIfAppoSaved(){
	var totalAppo=$('#choicelist>div.complete-detial-dia-toview').length;
	var totalAppoSaved=$('#choicelist>div.saved').length;
	console.log(totalAppo+'---- appo ** saved ----'+totalAppoSaved);
	if(totalAppo==totalAppoSaved){
		return true;
	}else{
		return false;
	}
}




$(function() {
	$( "#datepicker-appointment" ).datepicker({
	    dateFormat: "yy-mm-dd"
	});
});
</script>




</body>
</html>