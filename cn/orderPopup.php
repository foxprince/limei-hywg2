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
<!--  <div class="l-input" id="appointmentDiv">
        <div class="linput" style="height: 30px;">
            <div class="linputs"><label>真实姓名：</label><input id="name" type="text" name="name" value="<?php echo $name;?>"/></div>
            <div class="rinputs"><label>电子邮件：</label><input id="email" type="text" name="email" value="<?php echo $email;?>"/></div>
        </div>
        <div>
            <div class="linputs"><label>电话：</label><input type="text" id="tel" name="tel" placeholder="需填写国家代码" value="<?php echo $tel;?>"/></div>
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
	        <a id="appointmentBtn" href="javascript:void(0);" onclick="appointment();" class="btn">确定预约</a> 
    	</div>-->
    	<div class="l-bottom " style="width:100%;height:100%;text-align:center;position:relative; padding-left:0; margin-left:0; left:0;">
    		<div class="custm_serv" style="width:1.5%;">在线客服</div>
    		<div class="custm_serv">
    		<img src="images/kefuqrcode.jpg" width="81" height="79">
    		</div>
    		<div class="custm_serv">
		    	<p>如需咨询或预约请添加我们的客服</p>
		    	<p>微信号limeikefu01或直接扫描二维码添加</p>
		   	</div>
    		</div>
    	
    </div>
    </form>
</div>
