<?php include_once('header.php');?>    <title>首饰 - 利美钻石</title>	<link rel="stylesheet" type="text/css" href="css/nouislider.css">    <script type="text/javascript" src="js/nouislider.min.js"></script>    <script type="text/javascript" src="js/wNumb.js"></script>        <style>    .slider-container .back-bar .pointer-label{top:24px;}      .dia-list-01 .scale{display: none;}      .theme-green .back-bar{height: 10px;}      .theme-green .back-bar .selected-bar{height: 6px;}      .pointer{width: 21px; height: 21px; background: #b3b3b3; border: 6px solid #fff; }      .dia-list-02 .pointer-label,.dia-list-02 .scale{display: none;}      .filter_line_price{margin: 2px 20px 2px 20px;width:470px;float: left}      .layout-slider{width: 318px;}      .pointer-label{border:1px solid #d1a82d; background: #f5eee2;}      .c1 .noUi-connect{background: #f0d0cb;}      .c2 .noUi-connect{background: #ebe9d3;}      .c3 .noUi-connect{background: #d7e2cf;}      .c4 .noUi-connect{background: #b2ddd9;}      .c5 .noUi-connect{background: #d5e9ef;}      .c6 .noUi-connect{background: #d7d6e6;}      .c7 .noUi-connect{background: #dfcedf;}    #priceFrom,#priceTo,#caratFrom,#caratTo,#fpriceFrom,#fpriceTo,#fcaratFrom,#fcaratTo{width: 60px; height: 24px; padding:0 2px; text-align: center; margin-top: 10px;}        .noUi-target{margin-bottom: 6px;}        .noUi-horizontal{height: 10px; border-radius: 6px;box-shadow: -1px 1px 2px #000 inset;}        .noUi-horizontal .noUi-handle{top: -10px;}        .noUi-connect{box-shadow: none;}        .noUi-horizontal .noUi-handle{width: 24px; height: 24px; border-radius: 50%; box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #666;}        .noUi-handle:after{display: none;}        .noUi-handle:before{width: 10px; height: 10px; background: #ccc; border-radius: 50%; left:6px; background: #d2d2d2;}        .noUi-connect {		  background: #c18971;		  box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.45);		  -webkit-transition: background 450ms;		  transition: background 450ms;		}		.tip{display:none;}    </style></head><body><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 -->  <div class="contain">	<?php include_once('orderStep.php'); ?>    <div class="pro-t clear">      <?php $category =$_GET['category']; $titleImg = "xltj.jpg";      switch($category){		case "ring":			$titleImg = "xlzj.jpg";break;		case "necklace":			$titleImg = "xldz.jpg";break;		case "earring":			$titleImg = "xles.jpg";break;		default:			$titleImg = "xltj.jpg";break;      }      ?>	  <ul class="pro-t-l fl">         <li><a href="jewelry.php?category=ring" <?php if(strcmp($category,'ring')==0) echo 'class="on"';?>><span style="font-size: 14px;">钻戒</span></a></li>        <li><a href="jewelry.php?category=necklace" <?php if(strcmp($category,'necklace')==0) echo 'class="on"';?>><span style="font-size: 14px;">吊坠</span></a></li>        <li><a href="jewelry.php?category=earring" <?php if(strcmp($category,'earring')==0) echo 'class="on"';?>><span style="font-size: 14px;">耳饰</span></a></li>      </ul>            <div class="price-box fl">        <span>预算区间</span>          <div class="filter_line_price" style="">              <div id="priceRange"></div><input type="text" class="pointer pointer-label" id="priceFrom" value="1000"><input class="pointer pointer-label" style="float: right;"type="text" id="priceTo" value="10000">          <?php        $sql="select min(price+0) as minP,max(price+0) as maxP from jewelry where price not in('','咨询客服') and price is not null";        foreach($conn->query($sql) as $row){        	$minP=$row['minP'];        	$maxP=$row['maxP'];        }        ?>          <script>				var priceSlider = document.getElementById('priceRange');				noUiSlider.create(priceSlider, {					connect: true,					tooltips: false,					behaviour: 'tap',					start: [ <?php echo $minP;?>, <?php echo $maxP;?> ],					range: {						'min': [ <?php echo $minP;?>],						'max': [ <?php echo $maxP;?> ]					}				});				var fromNumber = document.getElementById('priceFrom');				var toNumber = document.getElementById('priceTo');				priceSlider.noUiSlider.on('update', function( values, handle ) {					var value = values[handle];					if ( handle ) 						toNumber.value = value;					else							fromNumber.value = value;					$price_from= fromNumber.value;					$price_to = toNumber.value;				});				priceSlider.noUiSlider.on('change', function( values, handle ) {  });				fromNumber.addEventListener('change', function(){					priceSlider.noUiSlider.set([this.value, null]);					$price_from= fromNumber.value;					$price_to = toNumber.value;				});				toNumber.addEventListener('change', function(){					priceSlider.noUiSlider.set([null,this.value]);					$price_from= fromNumber.value;					$price_to = toNumber.value;				});			</script>          </div>      </div>		<div class="sewv fr">            <div class="sewvtop">                <img src="images/dollar.png" <?php if($_REQUEST['currency']!=''&&$_REQUEST['currency']=='USD') echo 'class="country"';?> onclick="filter_currency('USD')"/>                <img src="images/eur.png" <?php if($_REQUEST['currency']==''||$_REQUEST['currency']=='EUR') echo 'class="country"';?>onclick="filter_currency('EUR')"/>              	<img src="images/cny.png"  <?php if($_REQUEST['currency']!=''&&$_REQUEST['currency']=='CNY') echo 'class="country"';?>onclick="filter_currency('CNY')"/>           	</div>       	</div>      <div class="fr" style="line-height:23px;">价格：</div>    </div>	<?php if($_GET['from']){?>	<div class="x-bot" style="left:100px;">          <img src="images/<?php echo $titleImg?>" width="1000px" class="on">    </div><?php }?>    <div class="pro-box">      <ul class="clear">        <?php        $sql_currency='SELECT * FROM convert_currency';        foreach($conn->query($sql_currency) as $row_currency){        	$USD_EUR=$row_currency['USD_EUR'];        	$USD_GBP=$row_currency['USD_GBP'];        	$USD_CNY=$row_currency['USD_CNY'];        }                $sql_count='SELECT COUNT(*) AS num_articles FROM jewelry';        if($_GET['category'])        	if($category!='recommend')        		$sql_count .= ' WHERE category ="'.$_GET['category'].'"';        	else         		$sql_count .= ' WHERE recommend_index >0';        foreach($conn->query($sql_count) as $number){        	$articleCount=$number['num_articles'];        }        $totalpages=ceil($articleCount/16);        if(isset($_GET['n'])){        	$crr_page=$_GET['n'];        	if($crr_page>$totalpages){        		$crr_page=$totalpages;        	}        }else{        	$crr_page=1;        }        $startnumber=($crr_page-1)*16;                $sql='SELECT * FROM jewelry ';		if($_GET['category'])			if($category!='recommend')				$sql .= ' WHERE category ="'.$_GET['category'].'"';			else 				$sql .= ' WHERE recommend_index >0';		$sql .='  ORDER BY id DESC limit '.$startnumber.',16';		foreach($conn->query($sql) as $row) {			if(is_numeric($row['price'])) {				$priceDesc = round($row['price']).'欧元';				if($_REQUEST['currency']!='')					if($_REQUEST['currency']=='USD')						$priceDesc = round($row['price']/$USD_EUR) .'美元';					else if($_REQUEST['currency']=='CNY')						$priceDesc = round($row['price']/$USD_EUR*$USD_CNY) .'元';			}			else 				$priceDesc = $row['price'];		?>		<li><a href="jewelry-detail.php?id=<?php echo $row['id']; ?>"><img src="/images/sitepictures/thumbs/<?php echo $row['image1']; ?>" alt="<?php echo $row['name_ch']; ?>" />		<h3 style="font-size: 14px;"><?php echo $row['name_ch']; ?></h3><h4><?php echo $priceDesc ?></h4></a>		</li>		<?php }?>      </ul>    </div>    <div class="page w1000">      <div class="fr">        <span>第</span>        <?php			if(isset($totalpages) && $totalpages>1){				for($i=1; $i<=$totalpages; $i++){				if($crr_page==$i){					echo '<span style="font-weight:bold;">'.$i.'</span>'; 				}else{?>					<a href="jewelry.php?category=<?php echo $category;?>&n=<?php echo $i; ?>"><?php echo $i;?></a>				<?php }				}			}			?>        <span>页</span>      </div>    </div>  </div><!-- 内容主题 结束 --></div></body><script>function filter_currency(cury) {	window.location.href="jewelry.php?currency="+cury+"&category=<?php echo $category;?>";}</script><?php include_once('footer.php');?></html>