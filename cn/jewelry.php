<?php include_once('header.php');?>    <title>首饰 - 利美钻石</title>	<link rel="stylesheet" type="text/css" href="css/jquery.range.css">    <script type="text/javascript" src="js/jquery.range.js"></script></head><body><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 -->  <div class="contain">    <div class="pro-t clear">      <?php $category =$_GET['category']; $titleImg = "xltj.jpg";      switch($category){		case "ring":			$titleImg = "xlzj.jpg";break;		case "necklace":			$titleImg = "xldz.jpg";break;		case "earring":			$titleImg = "xles.jpg";break;		default:			$titleImg = "xltj.jpg";break;      }      ?><!--       <ul class="pro-t-l fl">         <li><a href="jewelry.php?category=ring" <?php if(strcmp($category,'ring')==0) echo 'class="on"';?>><span style="font-size: 14px;">钻戒</span></a></li>        <li><a href="jewelry.php?category=necklace" <?php if(strcmp($category,'necklace')==0) echo 'class="on"';?>><span style="font-size: 14px;">吊坠</span></a></li>        <li><a href="jewelry.php?category=earring" <?php if(strcmp($category,'earring')==0) echo 'class="on"';?>><span style="font-size: 14px;">耳饰</span></a></li>      </ul> -->      <div class="price-box fl">        <span>预算区间</span>          <div id="filter_line_price" style="float: left">              <div class="layout-slider" style="width: 540px; float: left;">                  <input class="doller" type="slider" name="doller" value="100,5000" />              </div>              <input type="hidden" id="price_from" value="100">              <input type="hidden" id="price_to" value="10000">              <script type="text/javascript" charset="utf-8">                  jQuery(function () {                      jQuery('.doller').jRange({                          from: 0,                          to: 50000,                          step: 1,                          format: '%s',                          width: 540,                          showLabels: true,                          isRange: true,                          fromEvt: '#price_from',                          toEvt: '#price_to'                      });                  })              </script>          </div>      </div>		<div class="sewv fr">            <div class="sewvtop">                <img src="images/dollar.png" onclick="filter_currency('USD')"/>                <img src="images/eur.png" onclick="filter_currency('EUR')"/>              	<img src="images/cny.png"  onclick="filter_currency('CNY')"/>           	</div>       	</div>      <div class="fr" style="line-height:23px;">价格：</div>    </div>	<?php if($_GET['from']){?>	<div class="x-bot" style="left:100px;">          <img src="images/<?php echo $titleImg?>" width="1000px" class="on">    </div><?php }?>    <div class="pro-box">      <ul class="clear">        <?php        $sql_count='SELECT COUNT(*) AS num_articles FROM jewelry';        if($_GET['category'])        	if($category!='recommend')        		$sql_count .= ' WHERE category ="'.$_GET['category'].'"';        	else         		$sql_count .= ' WHERE recommend_index >0';        foreach($conn->query($sql_count) as $number){        	$articleCount=$number['num_articles'];        }        $totalpages=ceil($articleCount/16);        if(isset($_GET['n'])){        	$crr_page=$_GET['n'];        	if($crr_page>$totalpages){        		$crr_page=$totalpages;        	}        }else{        	$crr_page=1;        }        $startnumber=($crr_page-1)*16;                $sql='SELECT * FROM jewelry';		if($_GET['category'])			if($category!='recommend')				$sql .= ' WHERE category ="'.$_GET['category'].'"';			else 				$sql .= ' WHERE recommend_index >0';		$sql .='  ORDER BY id limit '.$startnumber.',16';		foreach($conn->query($sql) as $row) {		?>		<li><a href="jewelry-detail.php?id=<?php echo $row['id']; ?>"><img src="/images/sitepictures/thumbs/<?php echo $row['image1']; ?>" alt="<?php echo $row['name_ch']; ?>" />		<h3 style="font-size: 14px;"><?php echo $row['name_ch']; ?></h3><h4><?php echo $row['price']; ?>元</h4></a>		</li>		<?php }?>      </ul>    </div>    <div class="page w1000">      <div class="fr">        <span>第</span>        <?php			if(isset($totalpages) && $totalpages>1){				for($i=1; $i<=$totalpages; $i++){				?>								<?php 				if($crr_page==$i){					echo '<span style="font-weight:bold;">'.$i.'</span>'; 				}else{?>					<a href="jewelry.php?category=<?php echo $category;?>&n=<?php echo $i; ?>"><?php echo $i;?></a>				<?php }				}			}			?>        <span>页</span>      </div>    </div>  </div><!-- 内容主题 结束 --></div></body><script>      // 单位下拉      $(document).ready(function(){        //子导航展开收缩        $(".sewvtop").click(function(){          $(this).find("em").removeClass("lbaxztop2").addClass("lbaxztop").parents(".sewv").siblings().children(".sewvtop").find("em").removeClass("lbaxztop").addClass(".lbaxztop2");          $(this).next(".sewvbm").toggle().parents(".sewv").siblings().find(".sewvbm").hide();        });        /*鼠标离开下拉框关闭*/        $(".sewv").mouseleave(function(){          $(".sewvbm").hide();          $(this).children(".sewvtop").find("em").addClass("lbaxztop2");        });        //赋值        $(".sewvbm>li").click(function(){          var selva=$(this).text();          $(this).parents(".sewvbm").siblings(".sewvtop").find("span").text(selva);          $(this).parent("ul").hide();          $(this).parents(".sewv").children(".sewvtop").find("em").addClass("lbaxztop2");        });              });    </script><?php include_once('footer.php');?></html>