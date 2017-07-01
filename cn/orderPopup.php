<?php 
if(strpos($_SERVER['PHP_SELF'], "dia.php"))
	$isPop = true;
?>
<div class="layout <?php if($isPop){echo 'white_content';}?>" id="makeOrder" <?php if($isPop){echo 'style="display:none;"';}?>>
<?php if($isPop){?><div class="l-close"><a class="btn" href="javascript:void(0)" onclick="popToggle()"><img src="images/close.png"/></a></div><?php }?>
<div class="l-top"><img src="images/yuyue_button.png"/></div>
<div class="l-middle" >
<div id="appointmentList"></div>
<div id="pro_pics"class="pro_pics" >
<div class="add_pic" id="add_pic"> <div class="fonts"><a href="dia.php?step=dia"><img src="images/addDia.gif"/></a></div><div class="fonts" style=" padding-top: 10px; "><a href="jewelry.php?step=jew"><img src="images/addJew.gif"/></a></div> </div>
</div>
</div>
<form id="appointmentForm" >
<?php
$userid=$_SESSION['useraccount'];
$user_info='select name,tel,email from clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$name=$r_u['name'];
	$email=$r_u['email'];
	$tel=$r_u['tel'];
}
?>
    <div class="l-input" id="appointmentDiv">
        <div class="linput" style="height: 30px;">
            <div class="linputs"><label>真实姓名：</label><input id="name" type="text" name="name" value="<?php echo $name;?>"/></div>
            <div class="rinputs"><label>电子邮件：</label><input id="email" type="text" name="email" value="<?php echo $email;?>"/></div>
        </div>
        <div>
            <div class="linputs"><label>电话：</label><input type="text" id="tel" name="tel" value="<?php echo $tel;?>"/></div>
            <div class="rinputs"><label>预约时间：</label><input type="text" name="viewTime"  placeholder="点击选择" id="datetimepicker"  value="">
            </div>
        </div>
        <br>
        <br>
        <div style="text-align:center;">
        	<p id="appointmentResult"></p>
        </div>
        <div class="l-bottom" id="appointmentBottom">
	        <input type="hidden" name="appointmentId" id="appointmentId"/>
	        <input type="button" value="" id="sub_btn" onclick="appointment();"/>
    	</div>
    	<div class="contacticonsbox" style="width:100%;height:100%;text-align:center;position:relative; padding-left:0; margin-left:0; left:0;">
    		<div  style="width:80%;height:100%;text-align:center;vertical-align:top;">
    		<div style="width:1%;display:inline-block;vertical-align:top;font-size: 14px;">在线客服</div>
    		<div style="width:12%;display:inline-block;">
    		<img src="images/kefuqrcode.jpg" width="81" height="79">
    		</div>
    		<div style="width:20%;display:inline-block;vertical-align:top;">
    		<a href="callto://Belgem.antwerp"><img id="skype" src="images/skype.gif"></a>
		    		<a href="tel:+32(0)36897394"><img id="phone" src="images/phone.gif"></a>
    		</div>
    		<div style="width:33%;display:inline-block;vertical-align:top;">
		    	<p>在您选购钻石首饰的过程中如有疑问</p>
		    	<p>欢迎致电或添加我们的客服微信号咨询</p>
		    	<p>微信号limeikefu或直接扫描二维码添加</p>
		   	</div>
    		</div>
    	</div>
    	
    </div>
    </form>
</div>
