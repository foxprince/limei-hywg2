  <header>
    <div class="top">
      <div class="t_cen"><a href="/" alt="利美钻石主营产品：比利时钻石，安特卫普钻石，利美钻石婚戒定制专家，为您专业定制独一无二的钻戒，每颗钻石都配有国际钻石证书，清晰的解释，贴心的建议和优惠的价格是利美对您的承诺，作为华人的购钻渠道，利美钻石将竭诚为您的选择提供最专业的服务"><img src="images/logo.png" width="152" height="59"></a></div>
    </div>
  </header>

  <div class="nav">
    <div class="nav-box">
      <ul class="clear">
        <li><a href="index.php" ><span></span>首页</a></li>
        <li><a href="about.php"><span></span>品牌文化</a></li>
        <li><a href="jewelry.php"><span></span>首饰</a></li>
        <li><a href="dia.php"><span></span>裸钻</a></li>
        <li><a href="intro.php?c=article"><span></span>文章</a></li>
        <li><a href="aboutus.php"><span></span>联系我们</a></li>
        <?php
        if (!isset($_COOKIE["userId"])){
        	$sql_ordernum='SELECT COUNT(*) AS myordernum FROM viewing_record WHERE viewer = "'.$_COOKIE["everUserId"].'" and diamond in (select id from diamonds)';
        	foreach($conn->query($sql_ordernum) as $r_o_n){
        		$myordernum=$r_o_n['myordernum'];
        	}?>
    	<li><a href="login.php"><span></span>加入LUMIA</a></li>
    	<li><a id="gwc" href="shopcart.php"><span></span> <img id="gwcLogo" src="images/gwc.gif" >(<?php echo $myordernum; ?>)  </a></li>
    	<?php }else{
    	$sql_ordernum='SELECT COUNT(*) AS myordernum FROM viewing_record WHERE viewer = "'.$_COOKIE["userId"].'"  and diamond in (select id from diamonds)';
    	foreach($conn->query($sql_ordernum) as $r_o_n){
    		$myordernum=$r_o_n['myordernum'];
    	}?>
        <li><a href="myaccount.php"><span></span>加入LUMIA</a></li>
    	<li><a id="gwc" href="shopcart.php"><img id="gwcLogo" src="images/gwc.gif" >(<b id="gwcTotal"><?php echo $myordernum; ?></b>) </a></li>
    	<?php }?>
      </ul>
    </div>
  </div>
  
