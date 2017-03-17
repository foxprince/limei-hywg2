<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>留言 - 利美钻石</title>
	<?php
		include_once('header.php');
	?>
	<style>
	.div{width:370px;margin:-80px auto 0;}
	.cformlabel{display:inline-block;width:80px;margin-bottom:10px;}
	.div_foot{height:290px;}
	.foot_center{top:150px;}
	.pq input{width:271px;}
	.pq select{width:275px;}
	</style>
</head>
<body>
	<?php
		include_once('topbar.php');
	?>
<div class="div_down">
    <div class="text-title" style="margin-top: -15px;"><span>留言</span></div>
    <div class="text-top" style="margin-top: -15px;">
      <img class="ring" src="../images/ring.png">
    </div>
</div>
<div class="div_text" >
<div class="text_in" style="margin-top: 350px;"> 
<div  class="container-fluid">
<div class="row ">
<div class=" col-xs-12 col-sm-12 col-md-9">
<?php
if(isset($_POST['thetxt']) && isset($_POST['email'])){
	
	
	 $input_email=$_POST['email'];
	 $input_name=$_POST['name'];
	 $input_address=$_POST['address'];
	 $input_country=$_POST['country'];
	 $input_question=$_POST['thetxt'];
	 $input_price=$_POST['price'];
	
	//require_once('recaptchalib.php');
	//$privatekey = "6LcO9u0SAAAAAGMQoM3deCE6Pw9eZ8oFOeZAZYVc";
// 	$resp = recaptcha_check_answer ($privatekey,
// 									$_SERVER["REMOTE_ADDR"],
// 									$_POST["recaptcha_challenge_field"],
// 									$_POST["recaptcha_response_field"]);

	//if (!$resp->is_valid) {
	// What happens when the CAPTCHA was entered incorrectly
	/*
	die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
		 "(reCAPTCHA said: " . $resp->error . ")");
		 */
		 //$message="验证码输入错误，请重试";
		 
	//}else 
	if(!filter_var($input_email, FILTER_VALIDATE_EMAIL)){
		$message="电子邮件地址无效，请核实";
	}else if($input_question==''){
		$message="您发送的消息不能为空";
	}else {
	// Your code here to handle a successful verification
		$to      = 'info@lumiagem.com';
		$subject = '您有一则通过网站发送的新留言';
		$message = "发信人: $input_name\n发信人地址: $input_address\n发信人国家: $input_country\n价格范围: $input_price\n\n信息内容:\n".$input_question;
		$headers = "From: $input_name <$input_email>";
		
		mail($to, $subject, $message, $headers);
		$message = "谢谢您的留言，我们会尽快和您联系";
		$input_email="";
		$input_name="";
		$input_address='';
		$input_question="";
		$input_price="";
		$input_country="";
	}

	
	
}else{
	$input_email="";
	$input_name="";
	$input_address='';
	$input_question="";
	$input_price="";
	$input_country="";
}
?>


<script type="text/javascript">
var RecaptchaOptions = {
theme : 'clean'
};
</script>




<?php
if(isset($message)){
?>
<h4 id="feedbackmessage"><?php echo $message; ?></h4>
<?php
}
?>

<p style="margin-bottom:35px; font-weight:bold;">留言给我们:</p>
<form action="" method="post" id="contactform">
<p class="pq"><label for="name" class="cformlabel">姓名</label> <input type="text" name="name" id="visitorname" value="<?php echo $input_name; ?>" /></p>
<p class="pq"><label for="name" class="cformlabel">邮寄地址</label> <input type="text" name="address" id="visitorname" value="<?php echo $input_address; ?>" /></p>
<p class="pq"><label for="name" class="cformlabel">国家</label> <input type="text" name="country" id="visitorname" value="<?php echo $input_country; ?>" /></p>

<p class="pq"><label for="email" class="cformlabel">E-mail</label> <input type="text" name="email" id="visitoremail" value="<?php echo $input_email; ?>" /></p>
<p class="pq">
<label for="subject" class="cformlabel">价格范围</label>

<select name="price" id="subjectselect">
<option value="">请选择...</option>
<option value="less than 3000€" <?php if($input_price=='less than 3000€'){ echo 'selected="selected"';} ?>>3000€以内</option>
<option value="3000 - 5000€" <?php if($input_price=='3000 - 5000€'){ echo 'selected="selected"';} ?>>3000 - 5000€</option>
<option value="5000 - 7000€" <?php if($input_price=='5000 - 7000€'){ echo 'selected="selected"';} ?>>5000 - 7000€</option>
<option value="7000 - 10000€" <?php if($input_price=='7000 - 10000€'){ echo 'selected="selected"';} ?>>7000 - 10000€</option>
<option value="10000 - 15000€" <?php if($input_price=='10000 - 15000€'){ echo 'selected="selected"';} ?>>10000 - 15000€</option>
<option value="15000 - 20000€" <?php if($input_price=='15000 - 20000€'){ echo 'selected="selected"';} ?>>15000 - 20000€</option>
<option value="20000€ or more" <?php if($input_price=='20000€ or more'){ echo 'selected="selected"';} ?>>20000€以上</option>

</select>
</p>
<p class="pq" style="margin-top:12px;"><label for="thetxt" class="cformlabel">留言:</label></p>
<textarea name="thetxt" id="thetxt" style="width:350px; height:165px;"><?php echo $input_question; ?></textarea>


<br /><br />


<?php
  //require_once('recaptchalib.php');
  //$publickey = "6LcO9u0SAAAAANawStaX2pepCvdjPzfACk8Pizeo"; // you got this from the signup page
  //echo recaptcha_get_html($publickey);
?>

<br />

<input type="submit" id="cformsendbtn" value="发送信息" />

</form>

</div>
</div>
</div></div></div>
<script type="text/javascript">
$('document').ready(function(){
	$('a#contactbtn').css({'border-bottom-style':'solid',
	'border-width':'2px'});
});
</script>


<?php
		include_once('footer.php');
	?>
   
</body>
</html>