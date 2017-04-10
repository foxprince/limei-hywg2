  <header>
    <div class="top">
      <div class="t_cen"><img src="images/logo.png"></div>
    </div>
  </header>

  <div class="nav">
    <div class="nav-box">
      <ul class="clear">
        <li><a href="index.php" class="on"><span></span>首页</a></li>
        <li><a href="about.php"><span></span>品牌文化</a></li>
        <li><a href="jewelry.php"><span></span>首饰</a></li>
        <li><a href="diamonds.php"><span></span>裸钻</a></li>
        <li><a href=""><span></span>社区</a></li>
        <li><a href="aboutus.php"><span></span>联系我们</a></li>
        <li>
        <?php if(!isset($_SESSION['useraccount'])){?>
    	<a href="login.php"><span></span>加入LUMIA</a>
    	<?php }else{
    	$sql_ordernum='SELECT COUNT(*) AS myordernum FROM viewing_record WHERE viewer = "'.$_SESSION['useraccount'].'"';
		foreach($conn->query($sql_ordernum) as $r_o_n){
			$myordernum=$r_o_n['myordernum'];
		}?>
        <a href="myaccount.php"><span></span>我的钻戒(<?php echo $myordernum; ?>)</a>
    	<?php }?>
        <li><a href=""><span></span><img src="images/gwc.gif"></a></li>
      </ul>
    </div>
  </div>
  
