	<header>
    <div class="top">
      <!--<div class="t_left"><div class="caidan"><div class="caidanl"><a href="javascript:;"><img src="images/caidan.gif"></a></div><div class="caidanr"><a href="javascript:;">菜单</a></div></div></div>-->
      <div class="t_cen"><img src="images/logo.png"></div>
      <!--<div class="t_right">
        <div class="gouwu"><div class="gouwul"><a href="">加入LUMIA</a></div><div class="gouwur"><a href=""><img src="images/gwc.gif"></a></div></div>
      </div>-->
    </div>
  </header>
  
  <div class="xlcd" id="xlcd" >
  	<a href="index.php" >首页</a><a href="about.php">品牌文化</a><a href="jewelry.php">首饰</a><a href="diamonds.php">裸钻</a><a href="contact.php">留言</a><a href="aboutus.php">联系我们</a>
  	<?php if(!isset($_SESSION['useraccount'])){?>
    	<a href="login.php">用户登录</a>
    <?php }else{
    	$sql_ordernum='SELECT COUNT(*) AS myordernum FROM viewing_record WHERE viewer = "'.$_SESSION['useraccount'].'"';
		foreach($conn->query($sql_ordernum) as $r_o_n){
			$myordernum=$r_o_n['myordernum'];
		}?>
        <a href="myaccount.php">我的钻戒(<?php echo $myordernum; ?>)</a>
    <?php }?>
  	<a href="aboutus.php"><img src="images/gwc.gif"></a>
  </div>