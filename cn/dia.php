<?php include_once('header.php');?>    <title>裸钻-利美钻石</title>    <link rel="stylesheet" type="text/css" href="css/jquery.fancybox.min.css">    <script type="text/javascript" src="js/jquery.fancybox.min.js"></script>    <link rel="stylesheet" type="text/css" href="css/nouislider.css">    <script type="text/javascript" src="js/nouislider.min.js"></script>    <script type="text/javascript" src="js/wNumb.js"></script>    <script type="text/javascript" src="js/diamondChoose.js"></script>    <link rel="stylesheet" type="text/css"  href="./css/jquery.datetimepicker.css">    <script type="text/javascript" src="./js/jquery.datetimepicker.js"></script>	<style>      .pro-t{margin-top:34px; margin-bottom: 0;}      .pro-t span{font-size: 14px;}      .fileber_shape{padding: 0 4px;}            .fileber_shape li{width: 28px; height: 28px; display: inline-block; cursor: pointer; padding: 3px 1px; margin: 4px 0;}      .fileber_shape li span{width: 28px; height: 28px; display: block;  background-size: 100%;}      .fileber_shape .fs_01{width: 28px; height: 27px;background-image: url(images/01.png);}      .fileber_shape .fs_02{width: 28px; height: 28px;background-image: url(images/02.png);}      .fileber_shape .fs_03{width: 28px; height: 28px;background-image: url(images/03w.png);}      .fileber_shape .fs_04{width: 28px; height: 26px;background-image: url(images/04.png);}      .fileber_shape .fs_05{width: 28px; height: 28px;background-image: url(images/05w.png);}      .fileber_shape .fs_06{width: 28px; height: 28px;background-image: url(images/06w.png);}      .fileber_shape .fs_07{width: 28px; height: 28px;background-image: url(images/07.png);}      .fileber_shape .fs_08{width: 28px; height: 28px;background-image: url(images/08.png);}      .fileber_shape .fs_09{width: 28px; height: 28px;background-image: url(images/09.png);}      .fileber_shape .on .fs_01{width: 28px; height: 27px;background-image: url(images/01_on.png);}      .fileber_shape .on .fs_02{width: 28px; height: 28px;background-image: url(images/02_on.png);}      .fileber_shape .on .fs_03{width: 28px; height: 28px;background-image: url(images/03w_on.png);}      .fileber_shape .on .fs_04{width: 28px; height: 26px;background-image: url(images/04_on.png);}      .fileber_shape .on .fs_05{width: 28px; height: 28px;background-image: url(images/05w_on.png);}      .fileber_shape .on .fs_06{width: 28px; height: 28px;background-image: url(images/06w_on.png);}      .fileber_shape .on .fs_07{width: 28px; height: 28px;background-image: url(images/07_on.png);}      .fileber_shape .on .fs_08{width: 28px; height: 28px;background-image: url(images/08_on.png);}      .fileber_shape .on .fs_09{width: 28px; height: 28px;background-image: url(images/09_on.png);}            .fileber_fancy li{font-size:14px;text-align:center;width: 46px; height: 46px; display: inline-block; cursor: pointer; padding: 3px 6px; margin: 0 0;}      .fileber_fancy li.on{color:#d0a692;}      .fileber_fancy li span{display: block; width: 46px; height: 46px; background-size: 100%;}      .fileber_fancy .fancy_yellow{background-image: url(images/fancy_yellow.png);}      .fileber_fancy .fancy_pink{background-image: url(images/fancy_pink.png);}      .fileber_fancy .fancy_green{background-image: url(images/fancy_green.png);}      .fileber_fancy .fancy_red{background-image: url(images/fancy_red.png);}      .fileber_fancy .fancy_blue{background-image: url(images/fancy_blue.png);}            .slider-container .back-bar .pointer-label{top:24px;}      .dia-list-01 .scale{display: none;}      .theme-green .back-bar{height: 10px;}      .theme-green .back-bar .selected-bar{height: 6px;}      .pointer{width: 21px; height: 21px; background: #b3b3b3; border: 6px solid #fff; }      .dia-list-02 .pointer-label,.dia-list-02 .scale{display: none;}      #filter_line_price{margin-top: 16px;}      .layout-slider{width: 318px;}      .pointer-label{border:1px solid #d1a82d; background: #f5eee2;}      .c1 .noUi-connect{background: #f0d0cb;}      .c2 .noUi-connect{background: #ebe9d3;}      .c3 .noUi-connect{background: #d7e2cf;}      .c4 .noUi-connect{background: #b2ddd9;}      .c5 .noUi-connect{background: #d5e9ef;}      .c6 .noUi-connect{background: #d7d6e6;}      .c7 .noUi-connect{background: #dfcedf;}      .dia-list-02 ul{margin-top: 14px;}      .dia-list-02 li{font-size: 14px;float: left; border-right: 1px solid #666; height: 6px; padding-top: 4px; text-align: center;}      .dia-list-02 li:first-child{width: 1px;}      .w12 li{width: 10.4%;font-size: 6px;float: left; border-right: 1px solid #666; height: 6px; padding-top: 4px; text-align: center;}      .w11 li{width: 9.6%;}      .w10 li{width: 11.9%;}.w6 li{width: 18%;}      .w5 li{width: 24.1%;}      .dia-checkbox{font-size:14px; margin-bottom: 1em;}      .dia-checkbox label{font-size: 14px; margin:0 18px;}            .dia-list-02{width: 31%;}      /*搜索*/      #searchform{margin-top: 16px;}      .search{display: inline-block;}      .search .box{margin-right: 4px;width: 140px;border:1px solid #d7b34b; padding:4px; font-size: 14px; border-radius: 0px; background: #f5eee2; float: left;}      .search .btn{background: #bd8165; width: 72px; height: 29px; border:1px solid #a47058; cursor: pointer; border-radius: 0px;}      .search .btn:hover{background: #975a3d;}      .search .btn img{padding-top: 2px;}      .reset{background: #bd8165; width: 72px; height: 29px; margin-left: 6px; border:1px solid #a47058; cursor: pointer; float: right; color: #fff;}      .reset:hover{background: #975a3d;}      .main_contentbox_dia_data { width: 1000px; margin: 0px auto; margin-top: 30px;}      #listdescription {position: relative; font-size: 14px; line-height: 30px; border-bottom: 2px solid #fed8d0;}      #listdescription span {font-size: 16px;font-weight: bold;}      div.dia-piece-box { cursor: pointer; position: relative; padding: 14px 5px; background-color: #fff; font-size: 12px; text-align: center;}      #dia-data-box div.dia-piece-box:hover{background: #ffe3df;}      #dia-data-box .dia-piece-box:nth-child(even){background: #f1f1f1;}      img.shapeicon {height: 32px;top: 5px;left: 138px;vertical-align: middle;}      span.shape-txt{display: inline-block; padding: 0 0 0 50px; font-size: 12px; text-align: left; width: 98px;}      span.valuetxt { display: inline-block; padding: 0; width: 97px; position: relative; top: 0; margin: 0; overflow: visible; font-size: 12px; color: #000; text-align: center;}      span.detail-btn { cursor: pointer; padding: 3px 10px; background-color: #bd8165; border-radius: 2px;margin-left: 20px;color: #fff;white-space: nowrap; border:1px solid #a47058;}      span.detail-btn:hover{background: #a47058;}      div.details {padding: 8px;margin-top: 8px;display: none;}      p.details_txt {padding-left: 20px;}      p.details_txt {margin: 0;padding-bottom: 15px;}      p.details_txt span {margin-right: 20px;cursor: pointer;}      a.certi_linker {color: #C30;display: inline-block;padding: 0 25px 0 0;}      span.price {display: inline-block;position: relative;top: 8px;}      span.btnforprice {display: inline-block;padding: 4px 10px;color: #FFF;background-color: #C30;margin-left: 0;}      .shapedesc-box{width: 100px; display: inline-block;}       #priceFrom,#priceTo,#caratFrom,#caratTo,#fpriceFrom,#fpriceTo,#fcaratFrom,#fcaratTo{width: 60px; height: 24px; padding:0 2px; text-align: center; margin-top: 10px;}        .noUi-target{margin-bottom: 6px;}        .noUi-horizontal{height: 10px; border-radius: 6px;box-shadow: -1px 1px 2px #000 inset;}        .noUi-connect{box-shadow: none;}        .noUi-horizontal .noUi-handle{top: -10px;width: 24px; height: 24px; border-radius: 50%; box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #666;}        .noUi-handle:after{display: none;}        .noUi-handle:before{width: 10px; height: 10px; background: #ccc; border-radius: 50%; left:6px; background: #d2d2d2;}        .noUi-connect {		  background: #FFF;		  box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.45);		  -webkit-transition: background 450ms;		  transition: background 450ms;		}		.tip{display:none;}    </style></head><body><div id="loading_indi" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:#FFF; background-color:rgba(255, 255, 255, 0.7); z-index:6; display:none;"><p style="position:relative; top:50%; margin-top:-50px; width:128px; height:70px; margin-left:auto; margin-right:auto; text-align:center; background-color:#FFF; padding-top:20px; border-radius:8px;"><img width="25px" src="../images/site_elements/loadingGraphic.gif" /><br /><span style="position:relative; left:8px; display:inline-block; margin-top:12px;">载入中...</span></p></div><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 -->  <div class="contain">    <?php include_once('orderStep.php'); ?>    <div class="chg-box">    <h1 style="text-align:center; font-size:16px;color:#999;margin:1em;">根据您的要求挑选钻石</h1>    <ul class="clear">	    <li ><a  href="dia.php" ><img src="images/white<?php echo ($_REQUEST['fancy']===null)?"On":"Switch" ?>.gif"/></a></li>	    <li ><a  href="dia.php?fancy=true" ><img src="images/fancy<?php echo ($_REQUEST['fancy']!=null)?"On":"Switch" ?>.gif"/></a></li>    </ul>    </div>        <p id="listdescription"></p>    <!-- <div style="text-align:center; height:110px;"><img src="images/dia-tit-bg.png" alt=""></div> -->    <?php if($_REQUEST['fancy']===null){?>    <div id="whiteDia" style="display:block;">	    <!-- 第一排 -->	    <div class="pro-t clear">      <div class="fl" style="width:318px;" >        <span>形状</span>        <ul class="fileber_shape">          <li id="filter_shapeBR"  onclick="filter_shape('BR')" ><span class="fs_01"></span></li>          <li id="filter_shapePR" onclick="filter_shape('PR')"><span  class="fs_08"></span></li>          <li id="filter_shapeEM"  onclick="filter_shape('EM')" ><span class="fs_03"></span></li>          <li id="filter_shapePS"  onclick="filter_shape('PS')" ><span class="fs_02"></span></li>          <li id="filter_shapeRAD"  onclick="filter_shape('RAD')" ><span class="fs_07"></span></li>          <li id="filter_shapeOV"  onclick="filter_shape('OV')" ><span class="fs_06"></span></li>          <li id="filter_shapeMQ"  onclick="filter_shape('MQ')" ><span class="fs_05"></span></li>          <li id="filter_shapeHS"  onclick="filter_shape('HS')" ><span class="fs_04"></span></li>          <li id="filter_shapeCU"  onclick="filter_shape('CU')" ><span class="fs_09"></span></li>        </ul>      </div>      <div class="fl dia-list-01 c1" style="margin-left:20px; width:318px;">        <span>钻重 CT</span>        <div id="filter_line_price">          <div class="layout-slider">              <div id="caratRange"></div><input class="pointer pointer-label"type="text" id="caratFrom" value="1"><input style="float: right;" class="pointer pointer-label" type="text" id="caratTo" value="5">              <script>				var caratSlider = document.getElementById('caratRange');				noUiSlider.create(caratSlider, {					connect: true,					behaviour: 'tap',					start: [ 0, 20 ],					range: {						'min': [ 0],						'30%': [  1 ],						'70%': [  5 ],						'max': [ 20 ]					}				});				var caratFrom = document.getElementById('caratFrom');				var caratTo = document.getElementById('caratTo');				caratSlider.noUiSlider.on('update', function( values, handle ) {					var value = values[handle];					if ( handle ) 						caratTo.value = value;					else							caratFrom.value = value;					$weight_from = caratFrom.value;					$weight_to = caratTo.value;				});				caratSlider.noUiSlider.on('set', function( values, handle ) { update(); });				caratFrom.addEventListener('change', function(){					caratSlider.noUiSlider.set([this.value, null]);					$weight_from = caratFrom.value;					$weight_to = caratTo.value;					update();				});				caratTo.addEventListener('change', function(){					caratSlider.noUiSlider.set([null,this.value]);					$weight_from = caratFrom.value;					$weight_to = caratTo.value;					update();				});			</script>          </div>			        </div>      </div>      <div class="fl dia-list-02 c5" style="margin-left:20px; width:318px;">        <span>切工</span><a href="javascript:;" ><img id="3ex" onclick="chgEx(this)" style=" margin: 0 0 -1.1em 1em;"  src="images/3ex.gif"/></a>        <script>		function chgEx(item) {			if($(item).attr("src")=="images/3ex.gif") {				$(item).attr("src","images/3exOn.gif");				cutSlider.noUiSlider.set([0,1]);$cut = 'cut_grade in("'+cutRange.slice(cutSlider.noUiSlider.get('start')[0],cutSlider.noUiSlider.get('start')[1]).join('","')+'")';				polishSlider.noUiSlider.set([0,1]);$polish = 'polish in("'+polishRange.slice(polishSlider.noUiSlider.get('start')[0],polishSlider.noUiSlider.get('start')[1]).join('","')+'")';				symSlider.noUiSlider.set([0,1]);$sym = 'symmetry in("'+symRange.slice(symSlider.noUiSlider.get('start')[0],symSlider.noUiSlider.get('start')[1]).join('","')+'")';			}			else {				$(item).attr("src","images/3ex.gif");				cutSlider.noUiSlider.set([0,4]);$cut ='';				polishSlider.noUiSlider.set([0,4]);$polish = '';				symSlider.noUiSlider.set([0,4]);$sym ='';			}			update();		}        </script>        <div id="filter_line_price">          <div id="cutRange"></div><div class="tip"><span id="cutFrom">VG</span> - <span id="cutTo">F</span></div>          <script>          	var cutSlider = document.getElementById('cutRange');			var cutFrom = document.getElementById('cutFrom');			var cutTo = document.getElementById('cutTo');			noUiSlider.create(cutSlider, {				connect: true,				behaviour: 'tap',				start: [ 0, 4 ],				step : 1,				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var cutRange = [				'EX','VG','G','F'			];			cutSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					cutTo.innerHTML = cutRange[values[handle]];				else						cutFrom.innerHTML = cutRange[values[handle]];				filter_cut();			});          </script>        </div>        <ul class="clear w5"><li></li><li>Excellent</li><li>Very Good</li><li>Good</li><li>Fair</li></ul>      </div>      	    </div><!-- 第一排 -->	    <!-- 第二排 -->	    <div class="pro-t clear">      <div class="fl dia-list-01 c7" style="width:316px;">        <span>价格</span>        <div class="sewv">          <div class="sewvtop">                <img src="images/dollar.png" class="country" onclick="filter_currency('USD')"/>                <img src="images/eur.png" onclick="filter_currency('EUR')"/>              	<img src="images/cny.png"  onclick="filter_currency('CNY')"/>           </div>        </div>        <div id="filter_line_price" style="margin-top:10px;">          <div id="priceRange"></div><input type="text" class="pointer pointer-label" id="priceFrom" value="1000"><input class="pointer pointer-label" style="float: right;"type="text" id="priceTo" value="10000">              <script>				var priceSlider = document.getElementById('priceRange');				noUiSlider.create(priceSlider, {					connect: true,					tooltips: false,					behaviour: 'tap',					start: [ 0, 5000000 ],					range: {						'min': [ 100],						'10%': [  1000 ],						'70%': [  10000 ],						'max': [ 5000000 ]					}				});				var fromNumber = document.getElementById('priceFrom');				var toNumber = document.getElementById('priceTo');				priceSlider.noUiSlider.on('update', function( values, handle ) {					var value = values[handle];					if ( handle ) 						toNumber.value = value;					else							fromNumber.value = value;					$price_from= fromNumber.value;					$price_to = toNumber.value;				});				priceSlider.noUiSlider.on('change', function( values, handle ) { update(); });				fromNumber.addEventListener('change', function(){					priceSlider.noUiSlider.set([this.value, null]);					$price_from= fromNumber.value;					$price_to = toNumber.value;					update();				});				toNumber.addEventListener('change', function(){					priceSlider.noUiSlider.set([null,this.value]);					$price_from= fromNumber.value;					$price_to = toNumber.value;					update();				});			</script>        </div>      </div>      <div class="fl dia-list-02 c2" style="margin-left:20px; width:318px;">        <span>颜色</span>        <div id="filter_line_price">          <div id="colorRange"></div>          <div class="tip"><span id="colorFrom">E</span> - <span id="colorTo">I</span></div>          <script>			var colorSlider = document.getElementById('colorRange');			var colorFrom = document.getElementById('colorFrom');			var colorTo = document.getElementById('colorTo');			noUiSlider.create(colorSlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 10 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 10 ]				}			});			var colorRange = [				'D','E','F','G','H','I','J','K','L','M'			];			colorSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					colorTo.innerHTML = colorRange[values[handle]];				else						colorFrom.innerHTML = colorRange[values[handle]];				filter_color();			});          </script>        </div>        <ul class="clear w11"><li></li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li></ul>      </div>            <div class="fl dia-list-02 c4" style="margin-left:20px; width:318px;">        <span>抛光</span>        <div id="filter_line_price">          <div id="polishRange"></div><div class="tip"><span id="polishFrom">VG</span> - <span id="polishTo">F</span></div>          <script>          	var polishSlider = document.getElementById('polishRange');			var polishFrom = document.getElementById('polishFrom');			var polishTo = document.getElementById('polishTo');			noUiSlider.create(polishSlider, {				connect: true,				behaviour: 'tap',				start: [ 0, 4 ],				step : 1,				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var polishRange = [				'EX','VG','G','F'			];			polishSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					polishTo.innerHTML = polishRange[values[handle]];				else						polishFrom.innerHTML = polishRange[values[handle]];				filter_polish();			});          </script>        </div>        <ul class="clear w5"><li></li><li>Excellent</li><li>Very Good</li><li>Good</li><li>Fair</li></ul>      </div>          </div><!-- 第二排 -->	    <!-- 第3排 -->	    <div class="pro-t clear">      <div class="fl" style="width:316px;">        <form action="" class="dia-checkbox">           权威证书:          <label><input id="filter_certiIGI" name="certi" type="checkbox" onclick="filter_certi('GIA')" value="GIA" />GIA</label>           <label><input id="filter_certiHRD" name="certi" type="checkbox" onclick="filter_certi('IGI')" value="IGI" />IGI</label>           <label><input id="filter_certiGIA" name="certi" type="checkbox" onclick="filter_certi('HRD')" value="HRD" />HRD</label>         </form>         <div style="margin-top:35px;">            <fieldset class="search clear">                 <input type="text" class="box" name="ref" class="fl inputText" placeholder="输入证书号" id="queryRef" onchange="update();">                 <button class="btn fl" title="SEARCH" ><img src="images/search-icon.png" alt=""></button>            </fieldset>            <button class="reset btn">重置</button>        </div>      </div>      <div class="fl dia-list-02 c3" style="margin-left:20px; width:318px;">        <span>净度</span>        <div id="filter_line_price">          <div id="clarityRange"></div><div class="tip"><span id="clarityFrom">E</span> - <span id="clarityTo">I</span></div>          <script>          	var claritySlider = document.getElementById('clarityRange');			var clarityFrom = document.getElementById('clarityFrom');			var clarityTo = document.getElementById('clarityTo');			noUiSlider.create(claritySlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 8 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 8 ]				}			});			var clarityRange = [				'FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2'			];			claritySlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					clarityTo.innerHTML = clarityRange[values[handle]];				else						clarityFrom.innerHTML = clarityRange[values[handle]];				filter_clarity();			});          </script>        </div>        <ul class="clear w10"><li></li><li>FL</li><li>IF</li><li>VVS1</li><li>VVS2</li><li>VS1</li><li>VS2</li><li>SI1</li><li>SI2</li></ul>      </div>      <div class="fl dia-list-02 c6" style="margin-left:20px; width:318px;">        <span>对称</span>        <div id="filter_line_price">          <div id="symRange"></div><div class="tip"><span id="symFrom">VG</span> - <span id="symTo">F</span></div>          <script>          	var symSlider = document.getElementById('symRange');			var symFrom = document.getElementById('symFrom');			var symTo = document.getElementById('symTo');			noUiSlider.create(symSlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 4 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var symRange = [				'EX','VG','G','F'			];			symSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					symTo.innerHTML = symRange[values[handle]];				else						symFrom.innerHTML = symRange[values[handle]];				filter_sym();			});          </script>        </div>        <ul class="clear w5"><li></li><li>Excellent</li><li>Very Good</li><li>Good</li><li>Fair</li></ul>      </div>                </div><!-- 第3排 -->    </div>    <?php }else{ ?>    <!-- 彩钻选项 --><script type="text/javascript">$fancy='true';$color='length(color)>1 and color like "F%"';</script>    <div id="fancyDia">		 <!-- 第一排 -->	    <div class="pro-t clear">      <div class="fl" style="width:314px;">        <span>彩钻</span>        <ul class="fileber_fancy">          <li id="filter_fancyY"  color="Y" ><span class="fancy_yellow"></span>黄</li>          <li id="filter_fancyP"  color="P" ><span class="fancy_pink"></span>粉</li>          <li id="filter_fancyG"  color="G" ><span class="fancy_green"></span>绿</li>          <li id="filter_fancyR"  color="R" ><span class="fancy_red"></span>红</li>          <li id="filter_fancyL"  color="B" ><span class="fancy_blue"></span>蓝</li>        </ul>      </div>      <div class="fl dia-list-01 c1" style="margin-left:20px; width:318px;">        <span>钻重 CT</span>        <div id="filter_line_price">          <div class="layout-slider">              <div id="fcaratRange"></div><input class="pointer pointer-label"type="text" id="fcaratFrom" value="0"><input style="float: right;" class="pointer pointer-label" type="text" id="fcaratTo" value="20">              <script>				var fcaratSlider = document.getElementById('fcaratRange');				noUiSlider.create(fcaratRange, {					connect: true,					tooltips: false,					behaviour: 'tap',					start: [ 0, 20 ],					range: {						'min': [ 0],						'30%': [  1 ],						'70%': [  5 ],						'max': [ 20 ]					}				});				var caratFrom = document.getElementById('fcaratFrom');				var caratTo = document.getElementById('fcaratTo');				fcaratSlider.noUiSlider.on('update', function( values, handle ) {					var value = values[handle];					if ( handle ) 						fcaratTo.value = value;					else							fcaratFrom.value = value;					$weight_from = caratFrom.value;					$weight_to = caratTo.value;				});				fcaratSlider.noUiSlider.on('change', function( values, handle ) {update(); });				fcaratFrom.addEventListener('change', function(){					fcaratSlider.noUiSlider.set([this.value, null]);					$weight_from = caratFrom.value;					$weight_to = caratTo.value;					update();				});				fcaratTo.addEventListener('change', function(){					fcaratSlider.noUiSlider.set([null,this.value]);					$weight_from = caratFrom.value;					$weight_to = caratTo.value;					update();				});			</script>          </div>			        </div>      </div>      <div class="fl dia-list-02 c4" style="margin-left:20px; width:316px;">        <span>抛光</span>        <div id="filter_line_price">          <div id="polishRange"></div><div class="tip"><span id="fpolishFrom">VG</span> - <span id="fpolishTo">F</span></div>          <script>          	var polishSlider = document.getElementById('polishRange');			var fpolishFrom = document.getElementById('fpolishFrom');			var fpolishTo = document.getElementById('fpolishTo');			noUiSlider.create(polishSlider, {				connect: true,				behaviour: 'tap',				start: [ 0, 4 ],				step : 1,				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var polishRange = [				'EX','VG','G','F'			];			polishSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					fpolishTo.innerHTML = polishRange[values[handle]];				else						fpolishFrom.innerHTML = polishRange[values[handle]];				filter_polish();			});          </script>        </div>        <ul class="clear w5"><li></li><li>Excellent</li><li>Very Good</li><li>Good</li><li>Fair</li></ul>      </div>    </div><!-- 第一排 -->	    <!-- 第二排 -->	    <div class="pro-t clear">      <div class="fl" style="width:316px;">        <span>形状</span>        <ul class="fileber_shape">          <li id="filter_shapeBR"  onclick="filter_shape('BR')" ><span class="fs_01"></span></li>          <li id="filter_shapePR" onclick="filter_shape('PR')"><span  class="fs_08"></span></li>          <li id="filter_shapeEM"  onclick="filter_shape('EM')" ><span class="fs_03"></span></li>          <li id="filter_shapePS"  onclick="filter_shape('PS')" ><span class="fs_02"></span></li>          <li id="filter_shapeRAD"  onclick="filter_shape('RAD')" ><span class="fs_07"></span></li>          <li id="filter_shapeOV"  onclick="filter_shape('OV')" ><span class="fs_06"></span></li>          <li id="filter_shapeMQ"  onclick="filter_shape('MQ')" ><span class="fs_05"></span></li>          <li id="filter_shapeHS"  onclick="filter_shape('HS')" ><span class="fs_04"></span></li>          <li id="filter_shapeCU"  onclick="filter_shape('CU')" ><span class="fs_09"></span></li>        </ul>      </div>      <div class="fl dia-list-02 c2" style="margin-left:20px; width:314px;">        <span>颜色</span>        <div id="filter_line_price">          <div id="colorRange"></div>          <div class="tip"><span id="fcolorFrom">Faint</span> - <span id="fcolorTo">Fancy Vivld</span></div>          <script>			var colorSlider = document.getElementById('colorRange');			var fcolorFrom = document.getElementById('fcolorFrom');			var fcolorTo = document.getElementById('fcolorTo');			noUiSlider.create(colorSlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 4 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var colorRange = [				'Fancy Light','Fancy',,'Fancy Intense','Fancy Deep','Fancy Vivld'			];			colorSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					fcolorTo.innerHTML = colorRange[values[handle]];				else						fcolorFrom.innerHTML = colorRange[values[handle]];				filter_color();			});          </script>        </div>        <ul class="clear w6"><li></li><li>Fancy Light</li><li>Fancy</li><li>Fancy Intense</li><li>Fancy Deep</li><li>Fancy Vivld</li></ul>      </div>      <div class="fl dia-list-02 c6" style="margin-left:20px;width:316px;">        <span>对称</span>        <div id="filter_line_price">          <div id="symRange"></div><div class="tip"><span id="fsymFrom">VG</span> - <span id="fsymTo">F</span></div>          <script>          	var symSlider = document.getElementById('symRange');			var fsymFrom = document.getElementById('fsymFrom');			var fsymTo = document.getElementById('fsymTo');			noUiSlider.create(symSlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 4 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 4 ]				}			});			var symRange = [				'EX','VG','G','F'			];			symSlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					fsymTo.innerHTML = symRange[values[handle]];				else						fsymFrom.innerHTML = symRange[values[handle]];				filter_sym();			});          </script>        </div>        <ul class="clear w5"><li></li><li>Excellent</li><li>Very Good</li><li>Good</li><li>Fair</li></ul>      </div>    </div><!-- 第二排 -->	    <!-- 第3排 -->	    <div class="pro-t clear">      <div class="fl dia-list-01 c7" style="width:316px;">        <span>价格</span>        <div class="sewv">          <div class="sewvtop">			<img src="images/dollar.png" class="country" onclick="filter_currency('USD')"/>            <img src="images/eur.png" onclick="filter_currency('EUR')"/>            <img src="images/cny.png"  onclick="filter_currency('CNY')"/>		  </div>        </div>        <div id="filter_line_price" style="margin-top:10px;">          <div id="fpriceRange"></div><input type="text" class="pointer pointer-label" id="fpriceFrom" value="0"><input class="pointer pointer-label" style="float: right;"type="text" id="fpriceTo" value="5000000">              <script>				var fpriceSlider = document.getElementById('fpriceRange');				noUiSlider.create(fpriceSlider, {					connect: true,					tooltips: false,					behaviour: 'tap',					start: [ 0, 5000000 ],					range: {						'min': [ 100],						'10%': [  1000 ],						'70%': [  10000 ],						'max': [ 5000000 ]					}				});				var ffromNumber = document.getElementById('fpriceFrom');				var ftoNumber = document.getElementById('fpriceTo');				fpriceSlider.noUiSlider.on('update', function( values, handle ) {					var value = values[handle];					if ( handle ) 						ftoNumber.value = value;					else							ffromNumber.value = value;					$price_from= ffromNumber.value;					$price_to = ftoNumber.value;				});				fpriceSlider.noUiSlider.on('change', function( values, handle ) {update(); });				ffromNumber.addEventListener('change', function(){					fpriceSlider.noUiSlider.set([this.value, null]);					$price_from= ffromNumber.value;					$price_to = ftoNumber.value;					update();				});				ftoNumber.addEventListener('change', function(){					fpriceSlider.noUiSlider.set([null,this.value]);					$price_from= ffromNumber.value;					$price_to = ftoNumber.value;					update();				});			</script>        </div>      </div>      <div class="fl dia-list-02 c3" style="margin-left:20px; width:318px;">        <span>净度</span>        <div id="filter_line_price">          <div id="clarityRange"></div><div class="tip"><span id="fclarityFrom">E</span> - <span id="fclarityTo">I</span></div>          <script>          	var claritySlider = document.getElementById('clarityRange');			var fclarityFrom = document.getElementById('fclarityFrom');			var fclarityTo = document.getElementById('fclarityTo');			noUiSlider.create(claritySlider, {				connect: true,				behaviour: 'tap',				step : 1,				start: [ 0, 8 ],				format: wNumb({					decimals: 0				}),				range: {					'min': [ 0 ],					'max': [ 8 ]				}			});			var clarityRange = [				'FL','IF','VVS1','VVS2','VS1','VS2','SI1','SI2'			];			claritySlider.noUiSlider.on('change', function ( values, handle ) {				if ( handle ) 					fclarityTo.innerHTML = clarityRange[values[handle]];				else						fclarityFrom.innerHTML = clarityRange[values[handle]];				filter_clarity();			});          </script>        </div>        <ul class="clear w10"><li></li><li>FL</li><li>IF</li><li>VVS1</li><li>VVS2</li><li>VS1</li><li>VS2</li><li>SI1</li><li>SI2</li></ul>      </div>      <div class="fl" style="margin-left:22px; width:320px;">        <form action="diamond-data.php" class="dia-checkbox">           权威证书:          <label><input id="filter_certiIGI" name="certi" type="checkbox" onclick="filter_certi('GIA')" value="GIA" />GIA</label>           <label><input id="filter_certiHRD" name="certi" type="checkbox" onclick="filter_certi('IGI')" value="IGI" />IGI</label>           <label><input id="filter_certiGIA" name="certi" type="checkbox" onclick="filter_certi('HRD')" value="HRD" />HRD</label>         </form>         <div style="margin-top:35px;">            <fieldset class="search clear">                 <input type="text" class="box" class="fl inputText" placeholder="输入证书号" id="queryRef">                 <button class="btn fl" title="SEARCH" onclick="queryByRef()"><img src="images/search-icon.png" alt=""></button>            </fieldset>            <button class="reset btn">重置</button>        </div>      </div>    </div><!-- 第3排 -->    </div>	<?php }?>    <div class="main_contentbox_dia_data" id="diamondscontentbox_data">        <div id="tableheader">            <p id="listdescription">为您找到<span id="resulthowmany"></span>条</p>        </div>        <div id="dia-data-box">                <div class="dia-piece-box" style="background:none; padding:12px 5px;">                    <div class="generalinfobox" style="text-align:left;">                        <span style="border:none; width:98px;" class="valuetxt value_carat">形状<img class="sortImg" onclick="clickSort(this)" sort="shape" src="images/selebom.png"/></span>                        <span style="border:none; width:98px;" class="valuetxt value_carat">钻重<img class="sortImg" onclick="clickSort(this)"sort="carat" src="images/selebom.png"/></span>                        <?php if($_REQUEST['fancy']!=null){?><span style="border:none; width:98px;" class="valuetxt value_cut">彩钻<img class="sortImg" onclick="clickSort(this)"sort="fancy"src="images/selebom.png"/></span><?php }?>                        <span style="border:none; width:98px;" class="valuetxt value_color">颜色<img class="sortImg" onclick="clickSort(this)"sort="color"src="images/selebom.png"/></span>                        <span style="border:none; width:98px;" class="valuetxt value_clarity">净度<img class="sortImg" onclick="clickSort(this)"sort="clarity"src="images/selebom.png"/></span>                        <?php if($_REQUEST['fancy']===null){?><span style="border:none; width:98px;" class="valuetxt value_cut">切工<img class="sortImg" onclick="clickSort(this)"sort="cut"src="images/selebom.png"/></span><?php }?>                        <span style="border:none; width:98px;" class="valuetxt value_polish">抛光<img class="sortImg" onclick="clickSort(this)"sort="polish"src="images/selebom.png"/></span>                        <span style="border:none; width:98px;" class="valuetxt value_symmetry">对称性<img class="sortImg" onclick="clickSort(this)"sort="symmetry"src="images/selebom.png"/></span>                        <span style="border:none" class="valuetxt value_certificate">证书<img class="sortImg" onclick="clickSort(this)"sort="grading_lab"src="images/selebom.png"/></span>                        <span style="border:none" class="valuetxt value_priceeuro">价格<img class="sortImg" onclick="clickSort(this)"sort="price"src="images/selebom.png"/></span>                    </div><!-- end generalinfobox -->                </div>	        <div id="diamondsdata">	        </div>        </div>    </div>    <div class="page w1000">      <div class="fr">        <div id="diapagenaviResult"></div>      </div>    </div>  </div><!-- 内容主题 结束 --></div><?php include_once('orderPopup.php'); ?><div class="black_overlay" id="fade" style="display:none;"></div><?php include_once('footer.php');?><script></script><script>	// 单位下拉	$(document).ready(function(){    });            $(function () {    	var date = new Date ();		date.setHours (date.getHours () + 1)      	$("#datetimepicker").val(date.toLocaleString ());      	$('#datetimepicker').datetimepicker();  		$('#add_pic').click(function(){    			popToggle();    		});    		$(".chg-box li").click(function () {            	$(this).children("a").addClass("on");            	$(this).siblings().children("a").removeClass("on");            	//$('#recommendImg').hide().attr("src",$(this).attr("src")).fadeIn('slow');        	}) 		}); 		function clickSort(item){			if($(item).attr("src")=="images/selebom.png") {				$sorting_direction="asc";				$(item).attr("src","images/seletop.png");			}			else {				$sorting_direction="desc";				$(item).attr("src","images/selebom.png");			}			$sorting = $(item).attr("sort");    		update();		}    	function queryByRef() {    		update();    	}    </script><script>$(function () {	update();});$(function () {	$(".fs_01").hover(function(){ $(this).css("background-image","url(images/01_on.png"); },function(){if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/01.png"); }});	$(".fs_02").hover(function(){ $(this).css("background-image","url(images/02_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/02.png"); }});	$(".fs_03").hover(function(){ $(this).css("background-image","url(images/03w_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/03w.png"); }});	$(".fs_04").hover(function(){ $(this).css("background-image","url(images/04_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/04.png"); }});	$(".fs_05").hover(function(){ $(this).css("background-image","url(images/05w_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/05w.png"); }});	$(".fs_06").hover(function(){ $(this).css("background-image","url(images/06w_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/06w.png"); }});	$(".fs_07").hover(function(){ $(this).css("background-image","url(images/07_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/07.png"); }});	$(".fs_08").hover(function(){ $(this).css("background-image","url(images/08_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/08.png"); }});	$(".fs_09").hover(function(){ $(this).css("background-image","url(images/09_on.png"); },function(){ if(!($(this).parent().hasClass("on"))) {$(this).css("background-image","url(images/09.png"); }});	$(".noUi-handle").hover(function(){console.log($(".noUi-handle").css("background-color"));		$(".noUi-handle").css("background-color","#f9b5b2;"); console.log("after"+$(".noUi-handle").css("background-color"));}	);	$("#3ex").hover(		function(){ $("#3ex").attr("src","images/3exOn.gif"); },		function(){ $("#3ex").attr("src","images/3ex.gif"); }	);});</script></body></html>