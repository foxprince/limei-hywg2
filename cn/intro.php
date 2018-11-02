<?php
$title = "";
$c = "";
if (isset($_GET['c'])) {
    $c = $_GET['c'];
	if ($c == 'order') {
        $title = "预约购买";
    } else if ($c == 'tochina') {
        $title = "直邮中国";
	} else if ($c == 'orderStep') {
        $title = "定制首饰步骤";
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
	} else if ($c == 'article') {
		$title = "文章列表";
	} else if ($c == 'lumia') {
		$title = "利美品牌";
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
									<div class="col-xs-12 col-sm-12 col-md-9" style="text-align: center;">
										<?php if ($c == 'gia') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="gia.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'hrd') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="hrd.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'igi') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="igi.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'orderStep') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="articles/ssdz.html" allowTransparency="true"></IFRAME> 
										<?php }elseif ($c == 'article') {?><IFRAME ID="Frame1" style="background-color=transparent" title="test" frameborder="0"  width="100%" height="1500" scrolling="yes" SRC="articles/index.html" allowTransparency="true"></IFRAME> 
										<?php }else if ($c == 'tochina') {?>
										<img src="images/toChina.jpg" style="max-width: 590px;" alt="直邮中国"/>
										<?php }else if ($c == 'order') {?>
										<img src="images/makeorder.jpg" style="max-width: 590px;" alt="预约购买"/>
										<img src="images/csqrcode.jpg" width="50%" alt="利美客服二维码"/>
										<a href="tel:+32(0)36897394"><img src="images/cstel.jpg" width="50%" alt="利美客服电话"/></a>
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
											<p>您可以选择从大门 <img src="images/traffic-02.png" style="max-width: 20px;" alt="利美钻石交通指引"/>  Pelikaanstraat 62, 2018 Antwerp 进入</p><p> (周一至周五开放）</p>
											<p>或大门 <img src="images/traffic-03.png" style="max-width: 20px;" alt="利美钻石交通指引"/> Hovenierstraat 35, 2018 Antwerp 进入</p><p> （周一至周日开放）</p>
											<p>钻石街停车场地址 <img src="images/traffic-04.png" style="max-width: 20px;" alt="利美钻石交通指引"/>：Vestingstraat 38, 2018 Antwerp Belgium</p>
										</div>
										<?php }else if ($c == 'lumia') {?>
										<div>
											<p>LUMIA利美钻石品牌</p>
<p>是首个获得欧洲最权威钻石交易所 Diamantclub席位的中国公司。</p>
<p>安特卫普钻交所的信誉保障，让LUMIA利美钻石和世界顶级珠宝品牌一样成为少数可以直接从比利时选钻的珠宝品牌。这意味着利美钻石拥有比利时最优质钻石的优先选择权。</p>
<br/>
<p>从这里走出的每一颗钻石都配有美国GIA或欧洲HRD鉴定证书，以确保每一个产品都能从源头查清身世同时利美钻石有着完善的售后服务，从运输安全保障，到重新打磨抛光，甚至私人定制，利美都能完美实现。</p>
<br/>
<p>LUMIA利美愿自己的产品能够经得起时间的考验，从而见证每一个拥有者的幸福。</p>
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
