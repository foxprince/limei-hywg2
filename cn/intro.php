<?php
$title = "";
$c = "";
if (isset($_GET['c'])) {
    $c = $_GET['c'];
	if ($c == 'order') {
        $title = "预约购买";
    } else if ($c == 'tochina') {
        $title = "直邮中国";
	} else if ($c == 'route') {
	    $title = "交通指示";
	} else if ($c == 'maintain') {
	    $title = "终生保养";
	} else if ($c == 'gia') {
	    $title = "GIA认证";
	} else if ($c == 'hrd') {
	    $title = "HRD认证";
	} else if ($c == 'igi') {
	    $title = "IGI认证";
	}
}
?>
<?php include_once 'header.php';?>
        <title>
            <?php echo $title; ?> - 利美钻石
        </title>
        
    </head>
    <body>
        <div class="zhuti clear">
            <?php include_once 'topbar.php'; ?>
            <div class="contain clear">
			<?php include_once("menu.php"); ?>
			<div class="con-r">
                <div class="div_down">
					<div class="text-title"><span><?php echo $title; ?></span></div>
						<div class="text-top">
							<img class="ring" src="../images/ring.png">
						</div>
					</div>
					<div class="div_text">
							<div class="text_in"> 
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-9">
										<?php if ($c == 'gia') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="gia.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'hrd') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="hrd.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'igi') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="igi.html" allowTransparency="true"></IFRAME> 
										<?php }else if ($c == 'order') {?>
										<p>通过浏览本网站，您可以了解利美钻石的最新库存，包括裸钻现货以及可供选择的首饰样式进行搭配。不论您希望根据自己的喜好订购镶嵌好钻石的首饰，还是选购裸钻，都可以根据网站信息来下单。</p>
										<p>在您选购钻石、首饰的过程中，利美钻石在安特卫普的专业人员会为您提供免费的咨询服务。在您浏览了本网站后，无论您有任何问题，欢迎您随时和我们公司沟通联系，以便我们向您解释价格、付款方式以及提货方式等问题。</p>
										<p>点击预约咨询，留下您的联系方式，并简要说明您的需求，利美安特卫普办公室的工作人员会直接与您联系。</p>
										<p>清晰的解释、贴心的建议和优惠的价格是利美对您的承诺。</p>
										<img src="images/csqrcode.jpg" alt="利美客服二维码"/>
										<?php } else if ($c == 'route') {?>
										<div>
											<span style="color:#4f4747;"><img class="fa fa-train" src="images/icon-train.png" alt="火车"/>：安特卫普市中央火车站（Antwerspanen-Centraal）出站后200米，安特卫普钻交所大楼入口位于spanelikaanstraat上，如您对环境不熟悉，欢迎来电，由专人带您前往本公司。</span>
											<br/><br/>
											<span style="color:#4f4747;"><img class="fa" src="images/icon-parking.png" alt="火车"/>：建议您使用Vestingstraat街的两家停车场(如地图所示)</span>
											<span class="blank">&nbsp;</span><br/>
											<span class="sp_waring"> 注意事项：公司位于安特卫普钻交所大楼内，请每位来访客人务必携带本人护照或者欧洲所在国身份证，以供钻交所门卫安检放行之用。向安检递交身份证时请说明希望访问Belgem公司。</span>
											<span class="blank">&nbsp;</span><br/>
											<span style="color:#4f4747;">为了您的方便，请您在来访前提前电话通知我们公司。</span>
										</div>
										<?php }?>
									</div>
								</div>
					</div></div>
					<div class="div_down">
						<div class="text-bottom"></div>
					</div>
            </div>
        </div>
      </div>
      <?php include_once 'footer.php';?>
    </body>
</html>
