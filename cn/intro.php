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
										<img src="images/makeorder.jpg" style="max-width: 590px;" alt="预约购买"/>
										<img src="images/csqrcode.jpg" alt="利美客服二维码"/>
										<?php } else if ($c == 'maintain') {?>
										<div style="text-align: center;">
											<img style="max-width: 200px;" src="images/maintain-01.jpg" alt="终生保养服务"/>
											<p>凡购买的客户都可享受终生保养服务</p>
											<div style="display:inline-block;">
												<div style="display:inline-block;">
												<img style="max-width: 250px;" src="images/maintain-02.jpg"/>
												<p>抛光、翻新</p></div>
												<div style="display:inline-block;">
												<img style="max-width: 250px;" src="images/maintain-03.jpg"/>
												<p>修改戒圈大小</p></div>
											</div>
										</div>
										<?php } else if ($c == 'route') {?>
										<div>
											<img style="max-width: 550px;" src="images/traffic.jpg" alt="利美钻石交通指引"/>
											<p>公司地址：DIAMANTCLUB VAN ANTWERPEN</p><p>Pelikaanstraat 62, 2018 Antwerp, Belgium 比利时安特卫普</p>
											<p>电话：+32 (0)3 689 73 94</p>
											<p>您可以选择从大门 <img src="images/traffic-02.png" style="max-width: 20px;" alt="利美钻石交通指引"/>  Pelikaanstraat 62 2018 Antwerp 进入</p><p> (周一至周五开放）</p>
											<p>或大门 <img src="images/traffic-03.png" style="max-width: 20px;" alt="利美钻石交通指引"/> Hovenierstraat 35 2018 Antwerp 进入</p><p> （周一至周日开放）</p>
											<p>钻石街停车场地址 <img src="images/traffic-04.png" style="max-width: 20px;" alt="利美钻石交通指引"/>：Vestingstraat 382018 Antwerp Belgium</p>
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
