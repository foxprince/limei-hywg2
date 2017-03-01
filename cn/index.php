<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"  href="css/css.css">
<title>LUMIA</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <script src="../js/jquery-1.11.2.min.js"></script>
</head>
<?php
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
?>
<body>
<div class="zhuti">
  <header>
    <div class="top">
      <div class="t_left"><div class="caidan"><div class="caidanl"><a href="javascript:;"><img src="images/caidan.gif"></a></div><div class="caidanr"><a href="javascript:;">菜单</a></div></div></div>
      <div class="t_cen"><img src="images/logo.png"></div>
      <div class="t_right">
        <div class="gouwu"><div class="gouwul"><a href="">加入LUMIA</a></div><div class="gouwur"><a href=""><img src="images/gwc.gif"></a></div></div>
      </div>
    </div>
  </header>
  
  <div class="datu">
      <div class="xlcd" id="xlcd" style="display:none;">
          <ul>
              <li><a href="/cn" class="on">首页</a></li>
              <li><a href="about.php">品牌文化</a></li>
				<li><a href="jewelry.php">首饰</a></li>
				<li><a href="diamonds.php">裸钻</a></li>
				<li><a href="contact.php">留言</a></li>
				<li><a href="aboutus.php">联系我们</a></li>
          </ul>
      </div>
  </div>
  
  
  <div class="pic">
    <div class="pic_k">
      <ul>
        <li><a href="javascript:;" bgurl="images/top1.jpg"><img src="images/top1s.jpg"></a></li>
        <li><a href="javascript:;" bgurl="images/top2.jpg"><img src="images/top2s.jpg"></a></li>
        <li><a href="javascript:;" bgurl="images/top3.jpg"><img src="images/top3s.jpg"></a></li>
      </ul>
    </div>
  </div>
  
  
  <div class="dingzhi">
    <div class="dz_k">
      <div class="d-top"><img src="images/dz.png"></div>
      <div class="d-cen">
        <dl>
          <dt><img src="images/annia.png"></dt><dd>挑选裸钻</dd>
        </dl>
        
        <dl>
          <dt><img src="images/annib.png"></dt><dd>挑选戒拖</dd>
        </dl>
        
        <dl>
          <dt><img src="images/annic.png"></dt><dd>加工镶嵌</dd>
        </dl>
        
        <dl>
          <dt><img src="images/annid.png"></dt><dd>礼盒包装</dd>
        </dl>
      </div>
      <div class="d-bot"><a href="diamonds.php"><img src="images/aniu.png"></a></div>
    </div>
  </div>
  
  
  <div class="xilie">
    <div class="x-top"><img src="images/xlcp.png"></div>
    <div class="x-cen">
      <div class="x-cenk">
        <ul>
          <li class="on">推荐</li>
          <li>婚戒</li>
          <li>对戒</li>
          <li>配饰</li>
        </ul>
      </div>
    </div>
      <div class="x-bot">
          <a href="jewelry.php"><img src="images/ccs.png" class="on"></a>
          <a href="jewelry.php"><img src="images/ccs.png"></a>
          <a href="jewelry.php"><img src="images/ccs.png"></a>
          <a href="jewelry.php"><img src="images/ccs.png"></a>
      </div>
  </div>
  
  <div class="kongbai"></div>
  
  <section>
    <div class="about-k">
      <div class="about-title"><img src="images/xz.png"></div>
      <div class="about-bot">
        <div class="about-left"><img src="images/xz2.png"></div>
        <div class="about-right">
          <div class="about"><b class="wz">钻石源头</b><br>

<br>利美钻石诞生于安特卫普，这座城市自1447年起便成为了世界钻石交易中心， 闻名于世。全球80%的钻石在这里切割，半数以上的钻石都在安特卫普交易。利美钻石品牌背后的是全球最出色的钻石供应商和钻石百年世家的传承的信念。

<br><br><b class="wz">欧洲匠人</b><br><br>

Antwerp Cut 安特卫普切工，又被称为行业标准钻石切割。安特卫普钻石工匠的手艺被公认为是全世界最优秀的，在安特卫普，每天有上千名工人为获得著名品质标记Antwerp Cut而全力以赴。安特卫普能成为并保持世界钻石中心的地位，与欧洲匠人精湛的工艺是分不开的，至今欧洲匠人仍然垄断者大克拉钻的切割。

<br><br>
<b class="wz">裸钻精品</b><br><br>
利美是位于比利时安特卫普钻石交易所内，是AntwerpDiamond Club钻石交易所的注册会员，世界钻石交易所联合会的会员，同时也是上海钻交所的会员。从原石采购并自己进行组织加工，通过大宗采购来降低成本，这使得我们的销售价格甚至小于某些公司的成本价。 中国一些知名的珠宝品牌商也是我们的客户。</div>
        </div> 
       
      </div>
    </div> 
  </section>
  
  
  
  <div class="tuijian">
    <div class="t-top"><img src="images/tuijianword.png"></div>
    <div class="x-cen">
      <div class="x-cenk">
        <ul>
          <li class="on">裸钻</li>
          <li>戒指</li>
          <li>吊坠</li>
          <li>耳饰</li>
        </ul>
      </div>
    </div>
      <div class="t-bot">

          <div class="t-left">
              <div class="t-nr"><div class="t-nl"><div class="t-nll"><a href=""><img src="images/tuijiancc1.png"></a></div></div><div class="t-nr1"><a href=""><img src="images/tuijiancc.png"></a></div></div>
          </div>
          <div class="t-right">
              <div class="t-rnr">
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc2.png"></a></div>
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc3.png"></a></div>
              </div>
          </div>
      </div>
      <div class="t-bot" style="display:none;">

          <div class="t-left">
              <div class="t-nr"><div class="t-nl"><div class="t-nll"><a href=""><img src="images/tuijiancc1.png"></a></div></div><div class="t-nr1"><a href=""><img src="images/tuijiancc.png"></a></div></div>
          </div>
          <div class="t-right">
              <div class="t-rnr">
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc2.png"></a></div>
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc3.png"></a></div>
              </div>
          </div>
      </div>
      <div class="t-bot" style="display:none;">

          <div class="t-left">
              <div class="t-nr"><div class="t-nl"><div class="t-nll"><a href=""><img src="images/tuijiancc1.png"></a></div></div><div class="t-nr1"><a href=""><img src="images/tuijiancc.png"></a></div></div>
          </div>
          <div class="t-right">
              <div class="t-rnr">
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc2.png"></a></div>
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc3.png"></a></div>
              </div>
          </div>
      </div>
      <div class="t-bot" style="display:none;">

          <div class="t-left">
              <div class="t-nr"><div class="t-nl"><div class="t-nll"><a href=""><img src="images/tuijiancc1.png"></a></div></div><div class="t-nr1"><a href=""><img src="images/tuijiancc.png"></a></div></div>
          </div>
          <div class="t-right">
              <div class="t-rnr">
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc2.png"></a></div>
                  <div class="t-rpic"><a href=""><img src="images/tuijiancc3.png"></a></div>
              </div>
          </div>
      </div>
  </div>
  
  
  <div class="new">
    <div class="newk">
      <div class="newkk">
        <div class="n-pp"><a href="about.php"><img src="images/ppgs.png"></a></div>
        <div class="n-pp1"><a href="guide.php"><img src="images/zszs.png"></a></div>
        <div class="n-new">
          <div class="n-title"><a href="">最新动态</a></div>
          <div class="n-con">
            <?php 
            $sql='SELECT * FROM usefulinfo  ORDER BY id DESC LIMIT 0,5';
			$stmt=$conn->query($sql);
            ?>
            <ul>
              <?php foreach($stmt as $row){?>
              <li>
              <a href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>"> <span class="sp_short"><?php echo $row['title_ch']; ?></span></a>
              </li>
              <?php }?>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  <footer>
    <div class="f-top">
      <div class="f-au">
        <dl><dt><img src="images/footico.png" ></dt><dd>权威认证</dd></dl>
        <dl><dt><img src="images/footico2.png"></dt><dd>权威认证</dd></dl>
        <dl><dt><img src="images/footico4.png"></dt><dd>终生保养</dd></dl>
        <dl><dt><img src="images/footico3.png"></dt><dd>以小换大</dd></dl>
        <dl><dt><img src="images/footico5.png"></dt><dd>直邮中国</dd></dl>
        <dl><dt><img src="images/footico6.png"></dt><dd>全程保险</dd></dl>
      </div>
    </div>
    <div class="f-bot">
      <div class="foot">
        <div class="f-left">
          <div class="fo-left"><img src="images/footword.png"></div>
          <div class="fo-cen"><img src="images/footword2.png"></div>
          <div class="fo-right"><img src="images/footword3.png"></div>
        </div>
        <div class="f-right"><img src="images/footerwe.png"></div>
      </div>
    </div>
  </footer>  
  
</div>
<script>
    $(function () {
        $(".caidanr a,.caidanl a").hover(function () {
            if ($(".xlcd").is(":hidden")) {
                $(".xlcd").show();
            } else {
                $(".xlcd").hide();
            }
        })
        $(".xilie .x-cenk li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
            $(".xilie .x-bot img").removeClass("on");
            $(".xilie .x-bot a").eq($(this).index()).find("img").addClass("on");
        })
		$(".pic .pic_k li a").click(function () {
			var bkgUrl=$(this).attr("bgurl");
            $(".datu").css("background-image","url("+bkgUrl+")");
        })
        $(".tuijian .x-cenk li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");

            $(".tuijian .t-bot").hide()
            $(".tuijian .t-bot").eq($(this).index()).show();
        })
    })
</script>
</body>

</html>
