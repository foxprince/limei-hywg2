<!DOCTYPE html><html><head>    <title>首饰 - 利美钻石</title>	<?php include_once('header.php');?>	<link rel="stylesheet" type="text/css" href="css/jquery.range.css">    <script type="text/javascript" src="js/jquery.range.js"></script></head><body><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 -->  <div class="contain">    <div class="pro-t clear">      <?php       $category =$_GET['category'];      ?>      <ul class="pro-t-l fl">        <li><a href="jewelry.php?category=ring" <?php if(strcmp($category,'ring')==0) echo 'class="on"';?>><span style="font-size: 16px;">钻戒</span></a></li>        <li><a href="jewelry.php?category=necklace" <?php if(strcmp($category,'necklace')==0) echo 'class="on"';?>><span style="font-size: 16px;">项链</span></a></li>        <li><a href="jewelry.php?category=earring" <?php if(strcmp($category,'earring')==0) echo 'class="on"';?>><span style="font-size: 16px;">耳环</span></a></li>      </ul>      <div class="price-box fl">        <span>预算区间</span>          <div id="filter_line_price" style="float: left">              <div class="layout-slider" style="width: 540px; float: left;">                  <input class="doller" type="slider" name="doller" value="100,5000" />              </div>              <input type="hidden" id="price_from" value="100">              <input type="hidden" id="price_to" value="10000">              <script type="text/javascript" charset="utf-8">                  jQuery(function () {                      jQuery('.doller').jRange({                          from: 0,                          to: 50000,                          step: 1,                          format: '%s',                          width: 540,                          showLabels: true,                          isRange: true,                          fromEvt: '#price_from',                          toEvt: '#price_to'                      });                  })              </script>          </div>      </div>        <div class="filter_line_inner" style="width:900px;">        </div>      <div class="rmb fr">单位：         <select>          <option>人民币</option>          <option>美元</option>          <option>欧元</option>        </select>      </div>    </div>    <div class="pro-box">      <ul class="clear">        <?php        $sql_count='SELECT COUNT(*) AS num_articles FROM jewelry';        if($_GET['category'])        	$sql_count .= ' WHERE category ="'.$_GET['category'].'"';        foreach($conn->query($sql_count) as $number){        	$articleCount=$number['num_articles'];        }        $totalpages=ceil($articleCount/16);        if(isset($_GET['n'])){        	$crr_page=$_GET['n'];        	if($crr_page>$totalpages){        		$crr_page=$totalpages;        	}        }else{        	$crr_page=1;        }        $startnumber=($crr_page-1)*16;                $sql='SELECT * FROM jewelry';		if($_GET['category'])			$sql .= ' WHERE category ="'.$_GET['category'].'"';		$sql .='  ORDER BY id limit '.$startnumber.',16';		foreach($conn->query($sql) as $row) {		?>		<li><a href="jewelry-detail.php?id=<?php echo $row['id']; ?>"><img src="/images/sitepictures/thumbs/<?php echo $row['image1']; ?>" alt="<?php echo $row['name_ch']; ?>" /><h3 style="font-size: 14px;"><?php echo $row['name_ch']; ?></h3></a></li>		<?php }?>      </ul>    </div>    <div class="page w1000">      <div class="fr">        <span>第</span>        <?php			if(isset($totalpages) && $totalpages>1){				for($i=1; $i<=$totalpages; $i++){				?>								<?php 				if($crr_page==$i){					echo '<span style="font-weight:bold;">'.$i.'</span>'; 				}else{?>					<a href="jewelry.php?category=<?php echo $category;?>&n=<?php echo $i; ?>"><?php echo $i;?></a>				<?php }				}			}			?>        <span>页</span>      </div>    </div>  </div><!-- 内容主题 结束 --></div></body><?php include_once('footer.php');?></html>