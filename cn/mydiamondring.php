<?php
session_start();

if(((!isset($_POST['diaChoice']) && !isset($_SESSION['dia_id'])) || !isset($_SESSION['ringChoice']))){
	header('Location: diamonds-rings.php');
	exit();
}
if(isset($_POST['diaChoice'])){
	$_SESSION['dia_id']=$_POST['diaChoice'];
}

$dia_id=$_SESSION['dia_id'];
$ring_id=$_SESSION['ringChoice'];
###########################################################

include_once('connection-dia-data.php');
$conn_dia=dbConnect_dia('write','pdo');
$conn_dia->query("SET NAMES 'utf8'");



$crr_page='mydiamond';


$sql_ring='SELECT * FROM jewelry WHERE id = '.$ring_id;
foreach($conn->query($sql_ring) as $r_ring){
	$ring_name_ch = $r_ring['name_ch'];
	$ring_image1 = $r_ring['image1'];
	$ring_image2 = $r_ring['image2'];
	$ring_image3 = $r_ring['image3'];
	$ring_image4 = $r_ring['image4'];
	$ring_image5 = $r_ring['image5'];
	$ring_image6 = $r_ring['image6'];
	$ring_image7 = $r_ring['image7'];
	$ring_image8 = $r_ring['image8'];
	$ring_text_ch = $r_ring['text_ch'];
	$ring_price=$r_ring['price'];
}

$sql_dia='SELECT * FROM diamonds WHERE id = '.$dia_id;
foreach($conn_dia->query($sql_dia) as $r_dia){
	$dia_id = $r_dia['id'];
	$dia_stock_ref = $r_dia['stock_ref'];
	$dia_carat = $r_dia['carat'];
	$dia_color = $r_dia['color'];
	$dia_fancy_color = $r_dia['fancy_color'];
	$dia_clarity = $r_dia['clarity'];
	$dia_grading_lab = $r_dia['grading_lab'];
	$dia_certificate_number = $r_dia['certificate_number'];
	$dia_cut_grade = $r_dia['cut_grade'];
	$dia_polish = $r_dia['polish'];
	$dia_symmetry = $r_dia['symmetry'];
	$dia_fluorescence_intensity = $r_dia['fluorescence_intensity'];
	$dia_price_usd=$r_dia['retail_price'];
}

$sql_currency='SELECT * FROM convert_currency';
foreach($conn_dia->query($sql_currency) as $row_crc){
	$USD_EUR=$row_crc['USD_EUR'];
	$USD_GBP=$row_crc['USD_GBP'];
	$USD_CNY=$row_crc['USD_CNY'];
}



?>
<title>我的钻戒 - 利美钻石</title>
<style type="text/css">
div#content{
	padding-bottom:58px;
}
div.ring-box{
	position:relative;
	width:460px;
	float:left;
	margin-top:25px;
}
a.ring-img-big{
	display:inline-block;
	width:460px;
}
.ring-img-big img{
	width:100%;
	height:auto;
}

div.dia-box{
	position:relative;
	display:block;
	width:698px;
	float:left;
	margin:25px 0 0 65px;
	padding:35px 0 35px 50px;
	border-style:solid;
	border-width:3px;
	border-color:#CCC;
	background-color:#fff;
}
.styletitle{	
}
#dia-para-title{
	margin:30px 0 20px 0;
	font-size:24px;
}
.dia-para-box p{
	margin-bottom:2px;
}

a.certi_linker{
	display:inline-block;
}
img#gradinglabicon{
	border-style:solid;
	border-width:1px;
	border-color:#999;
}
p#appointmentbtnbox{
	margin-top:30px;
}
button.appointmentbtn{
	background-color:#C30;
	color:#FFF;
	font-size:18px;
	padding:5px 20px;
	border-style:solid;
	border-width:1px;
	border-color:#930;	
}

/* ============================================ */
div#appointmentcontainer{
	display:block;
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	left:0;
	background-color:rgba(255,255,255,0.88);
	z-index:88;
	display:none;
}
div#appointment-create{
	position:relative;
	width:381px;
	margin:95px auto 0 auto;
	background-color:#f9f9f9;
	border-style:solid;
	border-width:3px;
	border-color:#999;
	text-align:center;
	vertical-align:central;
}
div#register-box, div#login-box{
	display:inline-block;
}
div#register-box{
	margin-left:35px;
	display:none;
}
div.middle-separator{
	display:inline-block;
	width:2px;
	border-left-style:solid;
	border-color:#FFF;
	border-width:3px;
	padding-left:23px;
	margin-left:25px;
	overflow:visible;
	vertical-align:central;
	float:left;
	margin-top:55px;
}
span#the-or{
	display:inline-block;
	position:relative;
	padding:5px;
	background-color:#e0e0e0;
	left:-38px;
	margin:110px 0;
	color:#FFF;
	font-size:20px;
}
#register-box .title03, #login-box .title03{
	font-size:18px;
	margin:20px 0 15px 0;
}
#loginform input, #loginform-returnuser input{
	width:200px;
}
p.maketheappointmentbtnbox{
	padding:20px;
}

button#maketheappointmentbtn, input#submitthelogininfobtn{
	background-color:#C30;
	border-style:solid;
	border-width:1px;
	border-color:#930;
	padding:5px 18px;
	color:#FFF;
	font-size:16px;
	width:auto;
}
input.logininput, input.passwordinput{
	
}
#loginform>p>label{
	width:68px;
	text-align:left;
	white-space:nowrap;
}
p#submitthelogininfobtnbox{
	margin:20px;
}
input#submitthelogininfobtn{
}
div#wechatscanboxforlogin{
	padding:0 0 25px 0;
	margin-top:15px;
}
#wechatscanboxforlogin p{
	font-size:12px;
}
#linecarrier{
	width:158px;
	margin:10px auto 5px auto;
	border-top-style:solid;
	border-top-width:3px;
	border-color:#f9f9f9;
	height:15px;
}
#wechatscanboxforlogin p.empha{
	color:#C30;
	font-size:14px;
}
img#qrcode-wechat{
	width:129px;
}

p#forgetusernameandpasswordbox{
	font-size:12px;
	color:#666;
	margin-bottom:0;
	cursor:pointer;
}
div#getpassback{
	padding:5px 25px;
	font-size:12px;
	display:none;
}
span#close-login-box-btn{
	position:absolute;
	display:block;
	top:2px;
	right:8px;
	font-size:16px;
	color:#999;
	cursor:pointer;
}
img#thecertiimg{
	position:absolute;
	right:25px;
	bottom:25px;
	width:225px;
}
p.dia-para{
	white-space:nowrap;
}
p#changeRingChoiceBtnbox{
	position:relative;
	padding-top:10px;
	text-align:center;
}
a#changeRingChoicebtn{
	display:inline-block;
	background-color:#aaa;
	color:#FFF;
	font-size:14px;
	padding:3px 8px;
	margin-left:0;
}
a#changeDiaChoicebtn{
	display:inline-block;
	background-color:#aaa;
	color:#FFF;
	font-size:14px;
	padding:3px 8px;
	margin-left:15px;
}



@media (max-width:1383px){
	#content>h2{
		text-align:center;
	}
	div.ring-box{
		float:none;
		margin:20px auto 5px auto
	}
	div.dia-box{
		float:none;
		margin:20px auto;;
	}
}
@media (max-width:768px){
div.dia-box{
	width:358px;
}
img#thecertiimg{
	display:none;
}
div.dia-box{
	padding:30px 10px;
}
}
@media (max-width:480px){
div.ring-box, a.ring-img-big{
	width:100%;
}

}
@media (max-width:420px){
div.ring-box, a.ring-img-big{
	width:100%;
}
div#appointment-create{
	width:98%;
}
}
</style>
<script type="text/javascript">
/*!
 * jQuery Placeholder Plugin v2.1.3
 * https://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var $element = $(element);
                var $passwordInput = $element.data('placeholder-password');

                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var $element = $(element);
                var $replacement;
                var $passwordInput;

                if (value !== '') {

                    $replacement = $element.data('placeholder-textinput');
                    $passwordInput = $element.data('placeholder-password');

                    if ($replacement) {
                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                        $replacement[0].value = value;

                    } else if ($passwordInput) {
                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!$element.data('placeholder-enabled')) {
                    element.value = value;
                    return $element;
                }

                if (value === '') {
                    
                    element.value = value;
                    
                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {
                    
                    if ($element.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;

        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        
        var input = this;
        var $input = $(input);
        
        if (input.value === $input.attr('placeholder') && $input.hasClass(settings.customClass)) {
            
            input.value = '';
            $input.removeClass(settings.customClass);

            if ($input.data('placeholder-password')) {

                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    $input[0].value = value;

                    return value;
                }

                $input.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur') {
            
            if ($input.hasClass(settings.customClass)) {
                return;
            }

            if (input.type === 'password') {
                $replacement = $input.prevAll('input[type="text"]:first');
                if ($replacement.length > 0 && $replacement.is(':visible')) {
                    return;
                }
            }
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {
                    
                    try {
                        $replacement = $input.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }

                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }

                input.value = '';
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

            } else {
                
                var $passwordInput = $input.data('placeholder-password');

                if ($passwordInput) {
                    $passwordInput[0].value = '';
                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            $input.addClass(settings.customClass);
            $input[0].value = $input.attr('placeholder');

        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));
</script>

<script type="text/javascript">
$(document).ready(function(){
	$('input, textarea').placeholder();
	$(".ring-img-big").fancybox({
			maxWidth	: 1200,
			maxHeight	: 720,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
});

function appointment(){
<?php
if(!isset($_SESSION['useraccount'])){
?>
$('div#appointmentcontainer').fadeIn('normal');
<?php
}else{
?>
$('form#loginform').submit();
<?php
}
?>
}

function maketheappointment(){
	if($('input#wechat-appointment').val()=="" && $('input#email-appointment').val()==''){
		alert('必须要填写其中的一项：微信ID或者电子邮箱');
		return;
	}
	if($('input#password-create').val() != $('input#password-create-again').val()){
		alert('两次输入的密码不一致！');
		return;
	}
	$('form#loginform').submit();
}

function showHowGetPassBack(){
	$('#getpassback').fadeIn();
}
function closeloginbox(){
	$('div#appointmentcontainer').fadeOut('normal');
}
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


<div id="content">

<div class="title02" style="font-size:30px; margin:20px 0 10px;">您的选择</div>

<div class="ring-box">
<a class="ring-img-big fancybox.iframe" href="jewelry-view.php?id=<?php echo $ring_id; ?>">
<img id="ringimg-big" src="/images/sitepictures/<?php echo $ring_image1; ?>" />
</a>
<p id="changeRingChoiceBtnbox">
<a id="changeRingChoicebtn" href="diamonds-rings.php?change=ring">更换款式</a>
</p>
</div>


<div class="dia-box">

<p>款式：<strong class="styletitle"><?php echo $ring_name_ch; ?></strong></p>

<p>价格：

<?php

$ring_price_usd=$ring_price/$USD_EUR;

$total_price_usd=$ring_price_usd+$dia_price_usd;

if(isset($_SESSION['currency'])){
	if($_SESSION['currency']=='EUR'){
		$total_price=$total_price_usd*$USD_EUR;
		$price_unit='欧元';
	}else if($_SESSION['currency']=='CNY'){
		$total_price=$total_price_usd*$USD_CNY;
		$price_unit='人民币';
	}else if($_SESSION['currency']=='GBP'){
		$total_price=$total_price_usd*$USD_GBP;
		$price_unit='英镑';
	}else if($_SESSION['currency']=='USD'){
		$total_price=$total_price_usd;
		$price_unit='美元';
	}
}else{
	$total_price=$total_price_usd;
	$price_unit='美元';
	
	
}

echo  number_format((float) $total_price, 2, '.', '');
echo $price_unit;
//number_format((float) $number, $precision, '.', ''); 

$thetotalprice=number_format((float) $total_price, 2, '.', '').' '.$price_unit;
?>
</p>

<div class="dia-para-box">
<div id="dia-para-title">钻石参数：</div>
<p class="dia-para"><label class="dia-label">克拉:</label><?php echo $dia_carat; ?>克拉</p>
<p class="dia-para"><label class="dia-label">颜色:</label><?php echo $dia_color; ?></p>
<p class="dia-para"><label class="dia-label">净度:</label><?php echo $dia_clarity; ?></p>
<p class="dia-para"><label class="dia-label">切工:</label>切割：<?php echo $dia_cut_grade; ?> / 抛光：<?php echo $dia_polish; ?> / 对称性：<?php echo $dia_symmetry; ?></p>
<!-- <p class="dia-para" style="display:none;"><label class="dia-label">荧光:</label><?php  echo $dia_fluorescence_intensity; ?></p> -->
<p class="dia-para"><label class="dia-label">出品地:</label>比利时 安特卫普</p>
<p class="dia-para"><label class="dia-label">价格:</label><?php
if(isset($_SESSION['useraccount'])){
	if($_SESSION['currency'] == 'EUR'){
		$crr_currency=$USD_EUR;
		$crr_currency_txt='欧元';
	}else if($_SESSION['currency'] == 'CNY'){
		$crr_currency=$USD_CNY;
		$crr_currency_txt='人民币';
	}else if($_SESSION['currency']=='GBP'){
		$crr_currency=$USD_GBP;
		$crr_currency_txt='英镑';
	}else{
		$crr_currency=1;
		$crr_currency_txt='美元';
	}
	
	$dia_price_in_currency=$crr_currency*$dia_price_usd;
	$dia_price_txt=number_format((float) $dia_price_in_currency, 2, '.', '').' '.$crr_currency_txt;
	
	echo $dia_price_txt;
}
?>
</p>
<p class="dia-para"><label class="dia-label">证书编号:</label><?php echo $dia_certificate_number; ?></p>
<p class="dia-para"><label class="dia-label">查看证书:</label>



<?php
if($dia_grading_lab=='HRD'){
	$img_cert_link='hrd-cert.jpg';
?>
<a class="certi_linker" target="_blank" href="http://www.hrdantwerplink.be/index.php?record_number=<?php echo $dia_certificate_number; ?>&weight=<?php echo $dia_color; ?>&L="><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($dia_grading_lab); ?>.png" /></a>
<?php
}else if($dia_grading_lab=='GIA'){
	$img_cert_link='gia-cert.png';
?>
<a class="certi_linker" target="_blank" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno=<?php echo $dia_certificate_number; ?>"><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($dia_grading_lab); ?>.png" /></a>
<?php
}else if($dia_grading_lab=='IGI'){
	$img_cert_link='igi-cert.jpg';
?>
<a class="certi_linker" target="_blank" href="http://www.igiworldwide.com/igi/verify.php?r=<?php echo $dia_certificate_number; ?>"><img id="gradinglabicon" src="../images/site_elements/<?php echo strtoupper($dia_grading_lab); ?>.png" /></a>
<?php
}
?>

</p>


<img id="thecertiimg" src="img-eles/<?php echo $img_cert_link ?>" />


<p id="appointmentbtnbox">
<button type="button" onClick="appointment()" class="appointmentbtn">预约看钻</button> <a id="changeDiaChoicebtn" href="diamonds-rings.php?change=diamond">重新选钻</a>
</p>

</div><!-- end dia-para-box -->

</div><!-- end dia-box -->


<br style="clear:both;" />

</div><!-- end content -->


<?php
if(!isset($_SESSION['useraccount'])){
?>
<div id="appointmentcontainer">


<div id="appointment-create">

<div id="register-box">
<div class="title03">请填写您的信息：</div>
<form action="appointmentmade.php" method="post" id="loginform">
<input type="hidden" name="useraccount" value="new" />
<input type="hidden" name="thetotalprice" value="<?php echo $thetotalprice; ?>" />

<p><input type="text" name="name" id="name-appointment" placeholder="姓名" /></p>

<p><input type="text" name="wechat-appointment" id="wechat-appointment" placeholder="微信ID" /></p>
<p><input type="text" name="email-appointment" id="email-appointment" placeholder="电子邮箱" /></p>

<p><input type="text" name="tel-appointment" id="tel-appointment" placeholder="电话" /></p>
<p><input type="password" name="password-create" id="password-create" placeholder="登录密码"/></p>
<p><input type="password" name="password-create-again" id="password-create-again" placeholder="登录密码确认"/></p>

<p><input type="text" name="other-appointment" id="other-appointment" placeholder="其他联系方式，请注明" /></p>
</form>

<p class="maketheappointmentbtnbox"><button id="maketheappointmentbtn" onClick="maketheappointment()">预约看钻</button></p>
</div>





<div id="login-box">
<div class="title03">登录“我的钻戒”</div>


<div id="wechatscanboxforlogin">
<p class="empha">扫描关注利美公众号,<br>立即获得您的用户名和密码</p>
<img id="qrcode-wechat" src="/cn/img-eles/qrcode_for_gh_f1bedb342697_344.jpg" />
</div>


<form action="appointmentmade.php" method="post" id="loginform-returnuser">
<input type="hidden" name="useraccount" value="login" />
<input type="hidden" name="thetotalprice" value="<?php echo $thetotalprice; ?>" />
<p><input name="username" class="logininput" id="username-input" placeholder="用户名" type="text" /></p>
<p><input name="password" class="passwordinput" id="passwordinput-input" placeholder="密码" type="password" /></p>
<p id="forgetusernameandpasswordbox" onClick="showHowGetPassBack()">忘记了?</p>
<div id="getpassback">
如果您已经关注了利美钻石的微信官方服务号，请打开我们的微信服务号，在下面的小菜单中选择 ‘欢迎预约’&rarr;‘登录网站’，您即会收到用来登录网站的用户名和密码
</div>
<p id="submitthelogininfobtnbox"><input type="submit" name="submitthelogininfo" id="submitthelogininfobtn" value="登录并预约" /></p>
</form>


<span id="close-login-box-btn" onClick="closeloginbox()">x</span>

</div><!-- end login-box -->

<br style="clear:both;" />

</div>

</div>
<?php
}else{
?>
<form action="appointmentmade.php" method="post" id="loginform">
<input type="hidden" name="useraccount" value="loggedin" />
<input type="hidden" name="thetotalprice" value="<?php echo $thetotalprice; ?>" />
</form>
<?php
}
?>




<?php
include_once('footer.php');
?>
</div>
</body>

</html>
