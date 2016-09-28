<div id="bodycontent">
	<div id="filter_box">

		<div id="filter_box_inner">
			<div class="filter_line">
				<span class="filter_title" id="filter_title_shape">形状<br>shape</span>
				<ul class="fileber_shape_outer">
					<li class="filter_shape" id="filter_shapeBR" onclick="filter_shape(&#39;BR&#39;)"><img src="../images/01.gif"></li>
					<li class="filter_shape" id="filter_shapePS" onclick="filter_shape(&#39;PS&#39;)"><img src="../images/02.gif"></li>
					<li class="filter_shape" id="filter_shapePR" onclick="filter_shape(&#39;PR&#39;)"><img src="../images/03.gif"></li>
					<li class="filter_shape" id="filter_shapeHS" onclick="filter_shape(&#39;HS&#39;)"><img src="../images/08.gif"></li>
					<li class="filter_shape" id="filter_shapeMQ" onclick="filter_shape(&#39;MQ&#39;)"><img src="../images/05.gif"></li>
					<li class="filter_shape" id="filter_shapeOV" onclick="filter_shape(&#39;OV&#39;)"><img src="../images/11.gif"></li>
					<li class="filter_shape" id="filter_shapeEM" onclick="filter_shape(&#39;EM&#39;)"><img src="../images/10.gif"></li>
					<li class="filter_shape" id="filter_shapeRAD" onclick="filter_shape(&#39;RAD&#39;)"><img src="../images/06.gif"></li>
					<li class="filter_shape" id="filter_shapeCU" onclick="filter_shape(&#39;CU&#39;)"><img src="../images/12.gif"></li>
				</ul>
			</div>

			<div class="filter_line">
			<div class="filter_line_inner" id="filter_line_color" style="border-width:1px;">
				<span class="filter_title">颜色<br>color</span>
				<ul>
					<li class="filter_color" id="filter_colorD" onclick="filter_color(&#39;D&#39;)">D</li>
					<li class="filter_color" id="filter_colorE" onclick="filter_color(&#39;E&#39;)">E</li>
					<li class="filter_color" id="filter_colorF" onclick="filter_color(&#39;F&#39;)">F</li>
					<li class="filter_color" id="filter_colorG" onclick="filter_color(&#39;G&#39;)">G</li>
					<li class="filter_color" id="filter_colorH" onclick="filter_color(&#39;H&#39;)">H</li>
					<li class="filter_color" id="filter_colorI" onclick="filter_color(&#39;I&#39;)">I</li>
					<li class="filter_color" id="filter_colorJ" onclick="filter_color(&#39;J&#39;)">J</li>
					<li class="filter_color" id="filter_colorK" onclick="filter_color(&#39;K&#39;)">K</li>
					<li class="filter_color" id="filter_colorL" onclick="filter_color(&#39;L&#39;)">L</li>
					<li class="filter_color" id="filter_colorM" onclick="filter_color(&#39;M&#39;)">M</li>
				</ul>
			</div>


			<div class="filter_line_inner">
				<span class="filter_title" style="top:-4px;">重量<br>carat</span>
				<div id="filter_line_weight">
					<div class="layout-slider" style="width: 40%;float:left;">
						<input id="zuanZhong" type="slider" name="price" value="35;60" />
					</div>
					<div style="width: 20px;height:10px;float:left;">
					</div>
					<script type="text/javascript" charset="utf-8">
						jQuery("#zuanZhong").slider({ from: 0.1,fromtext:"钻重", to: 100, step: 0.1, smooth: true, round: 0, dimension: "", skin: "plastic" });
					</script>
						<input type="text" id="weight_from" value="0.01"> - <input type="text" id="weight_to" value="50"> 
						<div id="slider-range-weight" style="display:inline-block; width:188px; margin-left:25px;float:left;" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 2.5%; width: 20%;"></div><span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 2.5%;"></span><span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 22.5%;"></span></div>
						<button type="button" id="btn_weight" data-vivaldi-spatnav-clickable="1">更新结果</button>
<!--

<select id="weight_from">
<option value="-">所有</option>
<option value="0.9">小于 0.9</option>
<option value="1.5">0.9 - 1.49</option>
<option value="2.0">1.5 - 1.99</option>
<option value="2.5">2.00 - 2.49</option>
<option value="3.0">2.50 - 2.99</option>
<option value="big">大于 3.0</option>
</select>
-->


					</div>
				</div>
			</div>

<div class="filter_line">
<div class="filter_line_inner" id="filter_line_clarity" style="border-width:1px;">
<span class="filter_title">净度<br>clarity</span>
<ul>
<li class="filter_clarity" id="filter_clarityFL" onclick="filter_clarity(&#39;FL&#39;)">FL</li>
<li class="filter_clarity" id="filter_clarityIF" onclick="filter_clarity(&#39;IF&#39;)">IF</li>
<li class="filter_clarity" id="filter_clarityWS1" onclick="filter_clarity(&#39;WS1&#39;)">VVS1</li>
<li class="filter_clarity" id="filter_clarityWS2" onclick="filter_clarity(&#39;WS2&#39;)">VVS2</li>
<li class="filter_clarity" id="filter_clarityVS1" onclick="filter_clarity(&#39;VS1&#39;)">VS1</li>
<li class="filter_clarity" id="filter_clarityVS2" onclick="filter_clarity(&#39;VS2&#39;)">VS2</li>
<li class="filter_clarity" id="filter_claritySI1" onclick="filter_clarity(&#39;SI1&#39;)">SI1</li>
<li class="filter_clarity" id="filter_claritySI2" onclick="filter_clarity(&#39;SI2&#39;)">SI2</li>
</ul>
</div>

<div class="filter_line_inner">
<span class="filter_title" style="top:-5px;">价格(美元)<br>price($)</span>

<div id="filter_line_price">
	<div class="layout-slider" style="width: 40%;float:left;">
		<input id="zuanZhong" type="slider" name="price" value="35;60" />
	</div>
	<div style="width: 20px;height:10px;float:left;">
	</div>
	<script type="text/javascript" charset="utf-8">
		jQuery("#zuanZhong").slider({ from: 0.1,fromtext:"钻重", to: 100, step: 0.1, smooth: true, round: 0, dimension: "", skin: "plastic" });
	</script>

<input type="text" id="price_from" value="50"> - <input type="text" id="price_to" value="999999"> 

<div id="slider-range" style="display:inline-block; width:188px; margin-left:25px;float:left;" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 0%; width: 5.00083%;"></div><span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span><span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 5.00083%;"></span></div>

<button type="button" id="btn_price" data-vivaldi-spatnav-clickable="1">更新结果</button>

<!--

<select id="price_from">
<option value="-">所有</option>
<option value="100">小于 100</option>
<option value="200">100 - 200</option>
<option value="300">200 - 300</option>
<option value="500">300 - 500</option>
<option value="800">500 - 800</option>
<option value="1000">800 - 1000</option>
<option value="1200">1000 - 1200</option>
<option value="1500">1200 - 1500</option>
<option value="2000">1500 - 2000</option>
<option value="3000">2000 - 3000</option>
<option value="5000">3000 - 5000</option>
<option value="big">大于 5000</option>
</select>

-->



</div>
</div>
</div>




<div class="filter_line">
<div class="filter_line_inner" id="filter_line_cut" style="border-width:1px;">
<span class="filter_title">切工<br>cut</span>
<ul>
<li class="filter_clarity" id="filter_cutEX" onclick="filter_cut(&#39;EX&#39;)">EX</li>
<li class="filter_clarity" id="filter_cutVG" onclick="filter_cut(&#39;VG&#39;)">VG</li>
<li class="filter_clarity" id="filter_cutG" onclick="filter_cut(&#39;G&#39;)">G</li>
<li class="filter_clarity" id="filter_cutF" onclick="filter_cut(&#39;F&#39;)">F</li>

</ul>
</div>

<div class="filter_line_inner">
<span class="filter_title">荧光<br>fluo</span>
<ul>
<li class="filter_clarity" id="filter_fluoVST" onclick="filter_fluo(&#39;VST&#39;)">极强</li>
<li class="filter_clarity" id="filter_fluoSTG" onclick="filter_fluo(&#39;STG&#39;)">强</li>
<li class="filter_clarity" id="filter_fluoMED" onclick="filter_fluo(&#39;MED&#39;)">中</li>
<li class="filter_clarity" id="filter_fluoFNT" onclick="filter_fluo(&#39;FNT&#39;)">弱</li>
<li class="filter_clarity" id="filter_fluoNON" onclick="filter_fluo(&#39;NON&#39;)">无</li>

</ul>
</div>

</div>



<div class="filter_line">
<div class="filter_line_inner" id="filter_line_polish" style="border-width:1px;">
<span class="filter_title">抛光<br>polish</span>
<ul>
<li class="filter_clarity" id="filter_polishEX" onclick="filter_polish(&#39;EX&#39;)">EX</li>
<li class="filter_clarity" id="filter_polishVG" onclick="filter_polish(&#39;VG&#39;)">VG</li>
<li class="filter_clarity" id="filter_polishG" onclick="filter_polish(&#39;G&#39;)">G</li>
<li class="filter_clarity" id="filter_polishF" onclick="filter_polish(&#39;F&#39;)">F</li>

</ul>
</div>

<div class="filter_line_inner" id="filter_line_lab" style="border-width:1px;">
<span class="filter_title">证书<br>Certi</span>
<ul>
<li class="filter_clarity" id="filter_certiIGI" onclick="filter_certi(&#39;IGI&#39;)">IGI</li>
<li class="filter_clarity" id="filter_certiHRD" onclick="filter_certi(&#39;HRD&#39;)">HRD</li>
<li class="filter_clarity" id="filter_certiGIA" onclick="filter_certi(&#39;GIA&#39;)">GIA</li>

</ul>
</div>
</div>




<div class="filter_line">
<div class="filter_line_inner" id="filter_line_symm" style="border-width:1px;">
<span class="filter_title">对称性<br>sym</span>
<ul>
<li class="filter_clarity" id="filter_symEX" onclick="filter_sym(&#39;EX&#39;)">EX</li>
<li class="filter_clarity" id="filter_symVG" onclick="filter_sym(&#39;VG&#39;)">VG</li>
<li class="filter_clarity" id="filter_symG" onclick="filter_sym(&#39;G&#39;)">G</li>
<li class="filter_clarity" id="filter_symF" onclick="filter_sym(&#39;F&#39;)">F</li>
</ul>
</div>

<div class="filter_line_inner" id="filter_line_stockref" style="left:0;">
<span class="filter_title" style="display:inline-block; position:relative;">按库存编号/证书编号查询</span>
<input name="stockreftosearch" id="stockreftosearch" style="width:128px; position:relative; margin-left:25px;">
<button id="stockrefbtn" onclick="searchbystockref()">查找</button>
</div>
</div>


</div>

</div>



<div class="main_contentbox" id="diamondscontentbox">






<div id="tableheader">
<p id="listdescription">
为您找到<span>14580</span>条结果。

第
<button class="gotopagebtn crr-dia-p" onclick="choosethispage(&#39;1&#39;)">1</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;2&#39;)">2</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;3&#39;)">3</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;4&#39;)">4</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;5&#39;)">5</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;6&#39;)">6</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;7&#39;)">7</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;8&#39;)">8</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;9&#39;)">9</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;10&#39;)">10</button>
页

<button class="next-pages-btn" onclick="choosethispage(&#39;11&#39;)">...后10页</button>
</p>
<table cellpadding="2" cellspacing="0" border="0" style="border-style:solid; border-width:1px; border-color:#666;">
<tbody><tr class="t_h">
<td align="center" class="1st_col" style="width:37px;">预定</td>
<td align="center" class="1st_col" style="width:80px;">库存编号</td>
<td align="center" style="width:41px;">形状</td>
<td align="center" style="width:38px;">
<img class="iconarrow" id="arrow_sorting_weight" width="8" src="../images/arrow-down.png"><button type="button" class="sortbtn" title="点击排序" style="background-color:#FFF; color:#000;" onclick="sorting_weight()">
重量
</button>
</td>

<td align="center" style="width:28px;">色级</td>
<td align="center" style="width:38px;">净度</td>
<td align="center" style="width:96px;">证书</td>
<td align="center">切工</td>
<td align="center">抛光</td>
<td align="center" style="white-space:nowrap;">对称性</td>

<td align="center" style="width:72px;">荧光</td>
<td align="center" style="width:72px;">
零售价格($)
</td>
<td align="center" style="width:72px;">
<img class="iconarrow" id="arrow_sorting_price" width="8" src="../images/arrow-down(1).png"><button type="button" class="sortbtn" title="点击排序" style="background-color:#FFF; color:#000;" onclick="sorting_price()">
价格($)
</button>
</td>
<td align="center" style="width:72px;">
价格(€)
</td>
<td align="center" style="width:72px;">
价格(￥)
</td>
<td align="center" style="width:72px;">
价格(￡)
</td>



<td align="center" style="width:59px;">
公司名
</td>

</tr>
</tbody></table>
</div>


<div id="diamondsdata" style="padding-bottom:35px;">



<table cellpadding="2" cellspacing="0" border="0">



<tbody><tr class="1 valueline sourse_RAPNET" title="67907947">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_67907947" onchange="makeorder(&#39;67907947&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(67907947,1)" id="visiable-67907947">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
67907947</span><br>
<span style="font-size:10px; color:#999;">(# P195/07)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.32</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=2206561052">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(2206561052)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Faint
</td>
<td align="center">
274.56</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
253.44</span>

<br>
<span style="font-size:10px;">
(原价:-45)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">228</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">1698</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">173</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_67907947">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="2 valueline sourse_RAPNET" title="71498497">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_71498497" onchange="makeorder(&#39;71498497&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(71498497,1)" id="visiable-71498497">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
71498497</span><br>
<span style="font-size:10px; color:#999;">(# P134/04)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.hrdantwerplink.be/index.php?record_number=14013125001">HRD</a></span><br>
<span class="lab-num" style="font-size:10px;">(14013125001)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
288.145</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
265.98</span>

<br>
<span style="font-size:10px;">
(原价:-45)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">239</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">1782</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">181</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_71498497">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="3 valueline sourse_RAPNET" title="57246162">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57246162" onchange="makeorder(&#39;57246162&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57246162,1)" id="visiable-57246162">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57246162</span><br>
<span style="font-size:10px; color:#999;">(# 572171)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G39210">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G39210)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Very Slight
</td>
<td align="center">
297.011</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
274.164</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">247</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">1837</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">187</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57246162">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="4 valueline sourse_RAPNET" title="53367007">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367007" onchange="makeorder(&#39;53367007&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367007,1)" id="visiable-53367007">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367007</span><br>
<span style="font-size:10px; color:#999;">(# 5037071)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VVS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5F74108">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5F74108)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">G</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">G</span></td>

<td style="width:72px; text-align:center;">

Very Slight
</td>
<td align="center">
305.76</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
282.24</span>

<br>
<span style="font-size:10px;">
(原价:-44)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">254</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">1891</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">193</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367007">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="5 valueline sourse_RAPNET" title="53367174">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367174" onchange="makeorder(&#39;53367174&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367174,1)" id="visiable-53367174">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367174</span><br>
<span style="font-size:10px; color:#999;">(# 308348)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.33</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5E14438">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5E14438)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
316.173</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
291.852</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">263</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">1955</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">199</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367174">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="6 valueline sourse_RAPNET" title="57246161">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57246161" onchange="makeorder(&#39;57246161&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57246161,1)" id="visiable-57246161">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57246161</span><br>
<span style="font-size:10px; color:#999;">(# 525034)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6D58824">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6D58824)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
327.6</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
302.4</span>

<br>
<span style="font-size:10px;">
(原价:-30)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">272</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2026</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">206</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57246161">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="7 valueline sourse_RAPNET" title="53367008">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367008" onchange="makeorder(&#39;53367008&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367008,1)" id="visiable-53367008">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367008</span><br>
<span style="font-size:10px; color:#999;">(# 5056562)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VVS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5G98801">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5G98801)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">G</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
327.6</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
302.4</span>

<br>
<span style="font-size:10px;">
(原价:-40)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">272</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2026</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">206</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367008">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="8 valueline sourse_RAPNET" title="53367006">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367006" onchange="makeorder(&#39;53367006&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367006,1)" id="visiable-53367006">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367006</span><br>
<span style="font-size:10px; color:#999;">(# 5027026)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">IF</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5F16974">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5F16974)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Strong
</td>
<td align="center">
327.6</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
302.4</span>

<br>
<span style="font-size:10px;">
(原价:-44)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">272</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2026</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">206</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367006">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="9 valueline sourse_RAPNET" title="57789716">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57789716" onchange="makeorder(&#39;57789716&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57789716,1)" id="visiable-57789716">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57789716</span><br>
<span style="font-size:10px; color:#999;">(# 60143)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.33</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=130427287">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(130427287)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
329.472</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
304.128</span>

<br>
<span style="font-size:10px;">
(原价:-36)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">274</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2038</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">207</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57789716">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="10 valueline sourse_RAPNET" title="53367191">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367191" onchange="makeorder(&#39;53367191&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367191,1)" id="visiable-53367191">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367191</span><br>
<span style="font-size:10px; color:#999;">(# 5037218)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.35</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.happyeurope.eu/cn/diamonds.php#not-available"></a></span><br>
<span class="lab-num" style="font-size:10px;">()</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Strong
</td>
<td align="center">
338.52</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
312.48</span>

<br>
<span style="font-size:10px;">
(原价:-38)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">281</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2094</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">213</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367191">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="11 valueline sourse_RAPNET" title="57246160">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57246160" onchange="makeorder(&#39;57246160&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57246160,1)" id="visiable-57246160">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57246160</span><br>
<span style="font-size:10px; color:#999;">(# 578317)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G68886">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G68886)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
339.69</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
313.56</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">282</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2101</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">214</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57246160">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="12 valueline sourse_RAPNET" title="53367009">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367009" onchange="makeorder(&#39;53367009&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367009,1)" id="visiable-53367009">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367009</span><br>
<span style="font-size:10px; color:#999;">(# 576364)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G52901">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G52901)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
339.69</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
313.56</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">282</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2101</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">214</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367009">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="13 valueline sourse_RAPNET" title="59424655">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_59424655" onchange="makeorder(&#39;59424655&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(59424655,1)" id="visiable-59424655">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
59424655</span><br>
<span style="font-size:10px; color:#999;">(# 1179662572)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.23</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
D</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=1179662572">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(1179662572)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
355.212</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
314.226</span>

<br>
<span style="font-size:10px;">
(原价:-1)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">283</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2105</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">214</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_59424655">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">N. Shah &amp; CO BVBA</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="14 valueline sourse_RAPNET" title="60295278">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_60295278" onchange="makeorder(&#39;60295278&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(60295278,1)" id="visiable-60295278">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
60295278</span><br>
<span style="font-size:10px; color:#999;">(# C1741)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.29</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
I</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6E41833">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6E41833)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">G</span></td>

<td style="width:72px; text-align:center;">

Faint
</td>
<td align="center">
362.108</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
320.327</span>

<br>
<span style="font-size:10px;">
(原价:-15)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">288</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2146</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">218</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_60295278">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">BELADAMAS NV</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="15 valueline sourse_RAPNET" title="67907933">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_67907933" onchange="makeorder(&#39;67907933&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(67907933,1)" id="visiable-67907933">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
67907933</span><br>
<span style="font-size:10px; color:#999;">(# P195/05)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=2206402821">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(2206402821)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Faint
</td>
<td align="center">
351</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
324</span>

<br>
<span style="font-size:10px;">
(原价:-40)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">292</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2171</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">221</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_67907933">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="16 valueline sourse_RAPNET" title="67907950">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_67907950" onchange="makeorder(&#39;67907950&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(67907950,1)" id="visiable-67907950">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
67907950</span><br>
<span style="font-size:10px; color:#999;">(# P157/154)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.33</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=2161909458">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(2161909458)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Faint
</td>
<td align="center">
353.925</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
326.7</span>

<br>
<span style="font-size:10px;">
(原价:-45)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">294</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2189</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">223</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_67907950">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="17 valueline sourse_RAPNET" title="53621667">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53621667" onchange="makeorder(&#39;53621667&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53621667,1)" id="visiable-53621667">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53621667</span><br>
<span style="font-size:10px; color:#999;">(# 31969)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=101424356">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(101424356)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
354.9</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
327.6</span>

<br>
<span style="font-size:10px;">
(原价:-30)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">295</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2195</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">223</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53621667">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="18 valueline sourse_RAPNET" title="54183416">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_54183416" onchange="makeorder(&#39;54183416&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(54183416,1)" id="visiable-54183416">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
54183416</span><br>
<span style="font-size:10px; color:#999;">(# 32315)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
J</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=108455315">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(108455315)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
380.25</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
336.375</span>

<br>
<span style="font-size:10px;">
(原价:-35)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">303</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2254</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">229</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_54183416">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="19 valueline sourse_RAPNET" title="57246164">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57246164" onchange="makeorder(&#39;57246164&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57246164,1)" id="visiable-57246164">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57246164</span><br>
<span style="font-size:10px; color:#999;">(# 574766)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.35</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G39320">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G39320)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
365.82</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
337.68</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">304</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2262</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">230</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57246164">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="20 valueline sourse_RAPNET" title="53441283">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53441283" onchange="makeorder(&#39;53441283&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53441283,1)" id="visiable-53441283">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53441283</span><br>
<span style="font-size:10px; color:#999;">(# 31970)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=101424355">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(101424355)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
365.82</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
337.68</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">304</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2262</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">230</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53441283">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="21 valueline sourse_RAPNET" title="67907945">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_67907945" onchange="makeorder(&#39;67907945&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(67907945,1)" id="visiable-67907945">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
67907945</span><br>
<span style="font-size:10px; color:#999;">(# P169/84)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.32</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VVS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=1199207544">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(1199207544)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
366.08</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
337.92</span>

<br>
<span style="font-size:10px;">
(原价:-45)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">304</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2264</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">230</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_67907945">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="22 valueline sourse_RAPNET" title="71498505">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_71498505" onchange="makeorder(&#39;71498505&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(71498505,1)" id="visiable-71498505">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
71498505</span><br>
<span style="font-size:10px; color:#999;">(# P157/50)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.42</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.hrdantwerplink.be/index.php?record_number=14029119020">HRD</a></span><br>
<span class="lab-num" style="font-size:10px;">(14029119020)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
382.2</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
352.8</span>

<br>
<span style="font-size:10px;">
(原价:-50)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">318</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2364</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">241</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_71498505">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="23 valueline sourse_RAPNET" title="72827373">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_72827373" onchange="makeorder(&#39;72827373&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(72827373,1)" id="visiable-72827373">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
72827373</span><br>
<span style="font-size:10px; color:#999;">(# P228/39)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
I</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=2226852309">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(2226852309)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
399.776</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
353.648</span>

<br>
<span style="font-size:10px;">
(原价:-38)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">318</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2369</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">241</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_72827373">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">AMI DIAMONDS B.V.B.A.</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="24 valueline sourse_RAPNET" title="53367118">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367118" onchange="makeorder(&#39;53367118&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367118,1)" id="visiable-53367118">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367118</span><br>
<span style="font-size:10px; color:#999;">(# 5196342)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VVS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G55771">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G55771)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
383.656</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
354.144</span>

<br>
<span style="font-size:10px;">
(原价:-32)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">319</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2373</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">242</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367118">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="25 valueline sourse_RAPNET" title="53367173">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367173" onchange="makeorder(&#39;53367173&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367173,1)" id="visiable-53367173">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367173</span><br>
<span style="font-size:10px; color:#999;">(# 5017375)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.33</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">IF</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5E77831">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5E77831)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">G</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
384.384</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
354.816</span>

<br>
<span style="font-size:10px;">
(原价:-44)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">319</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2377</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">242</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367173">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="26 valueline sourse_RAPNET" title="64564349">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_64564349" onchange="makeorder(&#39;64564349&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(64564349,1)" id="visiable-64564349">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
64564349</span><br>
<span style="font-size:10px; color:#999;">(# 8532)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
K</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VVS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&amp;childpagename=GIA%2FPage%2FReportCheck&amp;c=Page&amp;cid=1355954554547&amp;reportno=5172204089">GIA</a></span><br>
<span class="lab-num" style="font-size:10px;">(5172204089)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
386.88</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
357.12</span>

<br>
<span style="font-size:10px;">
(原价:-38)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">321</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2393</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">244</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_64564349">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">SUNNEX BVBA</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="27 valueline sourse_RAPNET" title="57572584">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57572584" onchange="makeorder(&#39;57572584&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57572584,1)" id="visiable-57572584">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57572584</span><br>
<span style="font-size:10px; color:#999;">(# 60127)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
J</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=130427323">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(130427323)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
405.6</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
358.8</span>

<br>
<span style="font-size:10px;">
(原价:-35)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">323</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2404</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">245</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57572584">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="28 valueline sourse_RAPNET" title="53367000">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367000" onchange="makeorder(&#39;53367000&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367000,1)" id="visiable-53367000">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367000</span><br>
<span style="font-size:10px; color:#999;">(# 577363)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
J</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G52902">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G52902)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
405.6</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
358.8</span>

<br>
<span style="font-size:10px;">
(原价:-35)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">323</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2404</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">245</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367000">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="29 valueline sourse_RAPNET" title="53367151">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367151" onchange="makeorder(&#39;53367151&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367151,1)" id="visiable-53367151">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367151</span><br>
<span style="font-size:10px; color:#999;">(# 574356)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.32</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G59746">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G59746)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
390.208</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
360.192</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">324</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2413</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">246</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367151">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="30 valueline sourse_RAPNET" title="53367150">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367150" onchange="makeorder(&#39;53367150&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367150,1)" id="visiable-53367150">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367150</span><br>
<span style="font-size:10px; color:#999;">(# 581013)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.32</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G68954">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G68954)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
390.208</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
360.192</span>

<br>
<span style="font-size:10px;">
(原价:-33)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">324</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2413</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">246</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367150">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="31 valueline sourse_RAPNET" title="53367114">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367114" onchange="makeorder(&#39;53367114&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367114,1)" id="visiable-53367114">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367114</span><br>
<span style="font-size:10px; color:#999;">(# 577905)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">IF</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F6G63706">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F6G63706)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
393.328</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
363.072</span>

<br>
<span style="font-size:10px;">
(原价:-39)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">327</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2433</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">248</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367114">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="32 valueline sourse_RAPNET" title="57483147">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_57483147" onchange="makeorder(&#39;57483147&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(57483147,1)" id="visiable-57483147">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
57483147</span><br>
<span style="font-size:10px; color:#999;">(# 60128)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.31</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
J</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=130427292">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(130427292)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
411.06</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
363.63</span>

<br>
<span style="font-size:10px;">
(原价:-32)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">327</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2436</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">248</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_57483147">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="33 valueline sourse_RAPNET" title="55576247">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_55576247" onchange="makeorder(&#39;55576247&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(55576247,1)" id="visiable-55576247">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
55576247</span><br>
<span style="font-size:10px; color:#999;">(# 32312)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.30</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
I</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=113493912">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(113493912)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">VG</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

None
</td>
<td align="center">
411.84</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
364.32</span>

<br>
<span style="font-size:10px;">
(原价:-34)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">328</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2441</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">249</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_55576247">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="34 valueline sourse_RAPNET" title="54771088">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_54771088" onchange="makeorder(&#39;54771088&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(54771088,1)" id="visiable-54771088">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
54771088</span><br>
<span style="font-size:10px; color:#999;">(# 36023)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.34</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
L</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">VS2</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=113477469">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(113477469)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">EX</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
396.474</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
365.976</span>

<br>
<span style="font-size:10px;">
(原价:-31)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">329</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2452</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">250</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_54771088">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


<tr class="35 valueline sourse_RAPNET" title="53367380">
<td width="38" style="width:38px;" align="center"><input type="checkbox" class="selectcheckbox" id="check_53367380" onchange="makeorder(&#39;53367380&#39;)">
<button class="deleterulesbtn" onclick="chgVisiable(53367380,1)" id="visiable-53367380">隐藏</button></td>
<td align="center" class="ref_number" style="width:80px;">
<span class="valuetxt" style="width:80px; font-size:1.1em; font-weight:bold;">
53367380</span><br>
<span style="font-size:10px; color:#999;">(# 5035748)</span>
</td>
<td align="center" style="width:40px;">
<img height="25" src="../images/01.gif"></td>


<td align="center" class="value_carat" style="width:35px;">
<span class="valuetxt">
0.42</span>
</td>


<td align="center" class="value_color" style="width:26px;">
<span class="valuetxt">
M</span>
</td>


<td align="center" class="value_clarity" style="width:38px;"><span class="valuetxt">SI1</span></td>



<td align="center" class="value_certificate" style="width:94px;">
<span class="valuetxt"><a target="_blank" style="color:#000; font-weight:bold;" href="http://www.igiworldwide.com/verify.php?r=F5F73824">IGI</a></span><br>
<span class="lab-num" style="font-size:10px;">(F5F73824)</span>

</td>



<td align="center" class="value_cut" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_polish" style="width:35px;"><span class="valuetxt">EX</span></td>


<td align="center" class="value_symmetry" style="width:35px;"><span class="valuetxt">VG</span></td>

<td style="width:72px; text-align:center;">

Slight
</td>
<td align="center">
397.488</td>
<td align="center">
<span class="valuetxt" style="width:70px;">
366.912</span>

<br>
<span style="font-size:10px;">
(原价:-44)
</span>

 

</td>

<td align="center">
<span class="valuetxt" style="width:70px;">330</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">2458</span>
</td>

<td align="center">
<span class="valuetxt" style="width:70px;">250</span>
</td>

<td width="30" style="width:28px; overflow:hidden; white-space:normal;" class="companyname" id="c_name_dia_53367380">


<span style="font-size:14px; white-space:normal;" class="nameofcompany">GUTFREUND DIAMONDS bvba</span><br>
<span style="font-size:10px;" class="telofcompany"></span>

</td>

</tr>


</tbody></table>

<p id="dia-page-navi-bottom">
为您找到<span>14580</span>条结果。

第
<button class="gotopagebtn crr-dia-p" onclick="choosethispage(&#39;1&#39;)">1</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;2&#39;)">2</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;3&#39;)">3</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;4&#39;)">4</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;5&#39;)">5</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;6&#39;)">6</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;7&#39;)">7</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;8&#39;)">8</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;9&#39;)">9</button>
<button class="gotopagebtn" onclick="choosethispage(&#39;10&#39;)">10</button>
页

<button class="next-pages-btn" onclick="choosethispage(&#39;11&#39;)">...后10页</button>
</p>

<div id="howmanyrecords" style="display:none;">14580</div>

</div>





</div>





<div id="loading_indi" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 6; display: none; background-color: rgba(255, 255, 255, 0.701961);">
<p style="position:relative; top:50%; margin-top:-50px; width:128px; height:70px; margin-left:auto; margin-right:auto; text-align:center; background-color:#FFF; padding-top:20px; border-radius:8px;"><img width="25px" src="../images/loadingGraphic.gif"><br><span style="position:relative; left:8px; display:inline-block; margin-top:12px;">载入中...</span></p>
</div>

<script type="text/javascript">
var $featured='NO';



var $shapeBR=false;
var $shapePS=false;
var $shapePR=false;
var $shapeHS=false;
var $shapeMQ=false;
var $shapeOV=false;
var $shapeEM=false;
var $shapeRAD=false;
var $shapeCU=false;

var $shape = '';


var $colorD = false;
var $colorE = false;
var $colorF = false;
var $colorG = false;
var $colorH = false;
var $colorI = false;
var $colorJ = false;
var $colorK = false;
var $colorL = false;
var $colorM = false;

var $color = '';



var $clarityFL = false;
var $clarityIF = false;
var $clarityWS1 = false;
var $clarityWS2 = false;
var $clarityVS1 = false;
var $clarityVS2 = false;
var $claritySI1 = false;
var $claritySI2 = false;

var $clarity = '';

//======================= cut ==========================
var $cutEX=false;
var $cutVG=false;
var $cutG=false;
var $cutF=false;

var $cut='';

//======================= sym ==========================
var $symEX=false;
var $symVG=false;
var $symG=false;
var $symF=false;

var $sym='';

//======================= polish ==========================
var $polishEX=false;
var $polishVG=false;
var $polishG=false;
var $polishF=false;

var $polish='';

//======================= certi ==========================
var $certiIGI=false;
var $certiHRD=false;
var $certiGIA=false;

var $certi='';

//======================= fluo ==========================
var $fluoVST=false;
var $fluoSTG=false;
var $fluoMED=false;
var $fluoFNT=false;
var $fluoNON=false;

var $fluo='';



var $weight_from = '';
var $weight_to = '';
var $price_from = '';
var $price_to = '';
var $sorting = 'price';
var $sorting_weight_direction = 'ASC';
var $sorting_color_direction = 'ASC';
var $sorting_clarity_direction = 'ASC';
var $sorting_cut_direction = 'ASC';
var $sorting_price_direction = 'ASC';
var $sorting_direction = 'ASC';

var $crr_page=1;


function filter_shape(theshape){
	var $theshape=theshape;
	var $or='';
	$shape='';
	
	if($theshape=='BR'){
		if($shapeBR){
			$shapeBR=false;
			$('#filter_shapeBR').removeClass('btn-active');
		}else{
			$shapeBR=true;
			$('#filter_shapeBR').addClass('btn-active');
		}
	}else if($theshape=='PS'){
		if($shapePS){			
			$shapePS=false;
			$('#filter_shapePS').removeClass('btn-active');
		}else{
			$shapePS=true;
			$('#filter_shapePS').addClass('btn-active');
		}
	}else if($theshape=='PR'){		
		if($shapePR){
			$shapePR=false;
			$('#filter_shapePR').removeClass('btn-active');
		}else{
			$shapePR=true;
			$('#filter_shapePR').addClass('btn-active');
		}
	}else if($theshape=='HS'){
		if($shapeHS){
			$shapeHS=false;
			$('#filter_shapeHS').removeClass('btn-active');
		}else{
			$shapeHS=true;
			$('#filter_shapeHS').addClass('btn-active');
		}
	}else if($theshape=='MQ'){
		if($shapeMQ){
			$shapeMQ=false;
			$('#filter_shapeMQ').removeClass('btn-active');
		}else{
			$shapeMQ=true;
			$('#filter_shapeMQ').addClass('btn-active');
		}
	}else if($theshape=='OV'){
		if($shapeOV){
			$shapeOV=false;
			$('#filter_shapeOV').removeClass('btn-active');
		}else{
			$shapeOV=true;
			$('#filter_shapeOV').addClass('btn-active');
		}
	}else if($theshape=='EM'){
		if($shapeEM){
			$shapeEM=false;
			$('#filter_shapeEM').removeClass('btn-active');
		}else{
			$shapeEM=true;
			$('#filter_shapeEM').addClass('btn-active');
		}
	}else if($theshape=='RAD'){
		if($shapeRAD){
			$shapeRAD=false;
			$('#filter_shapeRAD').removeClass('btn-active');
		}else{
			$shapeRAD=true;
			$('#filter_shapeRAD').addClass('btn-active');
		}
	}else if($theshape=='CU'){
		if($shapeCU){
			$shapeCU=false;
			$('#filter_shapeCU').removeClass('btn-active');
		}else{
			$shapeCU=true;
			$('#filter_shapeCU').addClass('btn-active');
		}
	}
	
	if($shapeBR){
		$shape+=' shape = "BR" ';
		$or = ' OR ';
	}
	if($shapePS){
		$shape+=$or+' shape = "PS" ';
		$or = ' OR ';
	}
	if($shapePR){
		$shape+=$or+' shape = "PR" ';
		$or = ' OR ';
	}
	if($shapeHS){
		$shape+=$or+' shape = "HS" ';
		$or = ' OR ';
	}
	if($shapeMQ){
		$shape+=$or+' shape = "MQ" ';
		$or = ' OR ';
	}
	if($shapeOV){
		$shape+=$or+' shape = "OV" ';
		$or = ' OR ';
	}
	if($shapeEM){
		$shape+=$or+' shape = "EM" ';
		$or = ' OR ';
	}
	if($shapeRAD){
		$shape+=$or+' shape = "RAD" ';
		$or = ' OR ';
	}
	if($shapeCU){
		$shape+=$or+' shape = "CU" ';
		$or = ' OR ';
	}
	
	update();
}
function filter_color(thecolor){
	var $thecolor=thecolor;
	var $or='';
	$color='';
	
	if($thecolor=='D'){
		if($colorD){
			$colorD=false;
			$('#filter_colorD').removeClass('btn-active');
		}else{
			$colorD=true;
			$('#filter_colorD').addClass('btn-active');
		}
	}else if($thecolor=='E'){
		if($colorE){
			$colorE=false;
			$('#filter_colorE').removeClass('btn-active');
		}else{
			$colorE=true;
			$('#filter_colorE').addClass('btn-active');
		}
	}else if($thecolor=='F'){
		if($colorF){
			$colorF=false;
			$('#filter_colorF').removeClass('btn-active');
		}else{
			$colorF=true;
			$('#filter_colorF').addClass('btn-active');
		}
	}else if($thecolor=='G'){
		if($colorG){
			$colorG=false;
			$('#filter_colorG').removeClass('btn-active');
		}else{
			$colorG=true;
			$('#filter_colorG').addClass('btn-active');
		}
	}else if($thecolor=='H'){
		if($colorH){
			$colorH=false;
			$('#filter_colorH').removeClass('btn-active');
		}else{
			$colorH=true;
			$('#filter_colorH').addClass('btn-active');
		}
	}else if($thecolor=='I'){
		if($colorI){
			$colorI=false;
			$('#filter_colorI').removeClass('btn-active');
		}else{
			$colorI=true;
			$('#filter_colorI').addClass('btn-active');
		}
	}else if($thecolor=='J'){
		if($colorJ){
			$colorJ=false;
			$('#filter_colorJ').removeClass('btn-active');
		}else{
			$colorJ=true;
			$('#filter_colorJ').addClass('btn-active');
		}
	}else if($thecolor=='K'){
		if($colorK){
			$colorK=false;
			$('#filter_colorK').removeClass('btn-active');
		}else{
			$colorK=true;
			$('#filter_colorK').addClass('btn-active');
		}
	}else if($thecolor=='L'){
		if($colorL){
			$colorL=false;
			$('#filter_colorL').removeClass('btn-active');
		}else{
			$colorL=true;
			$('#filter_colorL').addClass('btn-active');
		}
	}else if($thecolor=='M'){
		if($colorM){
			$colorM=false;
			$('#filter_colorM').removeClass('btn-active');
		}else{
			$colorM=true;
			$('#filter_colorM').addClass('btn-active');
		}
	}
	
	if($colorD){
		$color+=' color = "D" ';
		$or=' OR ';
	}
	if($colorE){
		$color+=$or+' color = "E" ';
		$or=' OR ';
	}
	if($colorF){
		$color+=$or+' color = "F" ';
		$or=' OR ';
	}
	if($colorG){
		$color+=$or+' color = "G" ';
		$or=' OR ';
	}
	if($colorH){
		$color+=$or+' color = "H" ';
		$or=' OR ';
	}
	if($colorI){
		$color+=$or+' color = "I" ';
		$or=' OR ';
	}
	if($colorJ){
		$color+=$or+' color = "J" ';
		$or=' OR ';
	}
	if($colorK){
		$color+=$or+' color = "K" ';
		$or=' OR ';
	}
	if($colorL){
		$color+=$or+' color = "L" ';
		$or=' OR ';
	}
	if($colorM){
		$color+=$or+' color = "M" ';
	}
	
	update();
}



function filter_clarity(theclarity){
	var $theclarity=theclarity;
	var $or='';
	$clarity='';
	
	if($theclarity=='FL'){
		if($clarityFL){
			$clarityFL=false;
			$('#filter_clarityFL').removeClass('btn-active');
		}else{
			$clarityFL=true;
			$('#filter_clarityFL').addClass('btn-active');
		}
	}else if($theclarity=='IF'){
		if($clarityIF){
			$clarityIF=false;
			$('#filter_clarityIF').removeClass('btn-active');
		}else{
			$clarityIF=true;
			$('#filter_clarityIF').addClass('btn-active');
		}
	}else if($theclarity=='WS1'){
		if($clarityWS1){
			$clarityWS1=false;
			$('#filter_clarityWS1').removeClass('btn-active');
		}else{
			$clarityWS1=true;
			$('#filter_clarityWS1').addClass('btn-active');
		}
	}else if($theclarity=='WS2'){
		if($clarityWS2){
			$clarityWS2=false;
			$('#filter_clarityWS2').removeClass('btn-active');
		}else{
			$clarityWS2=true;
			$('#filter_clarityWS2').addClass('btn-active');
		}
	}else if($theclarity=='VS1'){
		if($clarityVS1){
			$clarityVS1=false;
			$('#filter_clarityVS1').removeClass('btn-active');
		}else{
			$clarityVS1=true;
			$('#filter_clarityVS1').addClass('btn-active');
		}
	}else if($theclarity=='VS2'){
		if($clarityVS2){
			$clarityVS2=false;
			$('#filter_clarityVS2').removeClass('btn-active');
		}else{
			$clarityVS2=true;
			$('#filter_clarityVS2').addClass('btn-active');
		}
	}else if($theclarity=='SI1'){
		if($claritySI1){
			$claritySI1=false;
			$('#filter_claritySI1').removeClass('btn-active');
		}else{
			$claritySI1=true;
			$('#filter_claritySI1').addClass('btn-active');
		}
	}else if($theclarity=='SI2'){
		if($claritySI2){
			$claritySI2=false;
			$('#filter_claritySI2').removeClass('btn-active');
		}else{
			$claritySI2=true;
			$('#filter_claritySI2').addClass('btn-active');
		}
	}
	if($clarityFL){
		$clarity+=' clarity = "FL" ';
		$or = ' OR ';
	}
	if($clarityIF){
		$clarity+=$or+' clarity = "IF" ';
		$or = ' OR ';
	}
	if($clarityWS1){
		$clarity+=$or+' clarity = "VVS1" ';
		$or = ' OR ';
	}
	if($clarityWS2){
		$clarity+=$or+' clarity = "VVS2" ';
		$or = ' OR ';
	}
	if($clarityVS1){
		$clarity+=$or+' clarity = "VS1" ';
		$or = ' OR ';
	}
	if($clarityVS2){
		$clarity+=$or+' clarity = "VS2" ';
		$or = ' OR ';
	}
	if($claritySI1){
		$clarity+=$or+' clarity = "SI1" ';
		$or = ' OR ';
	}
	if($claritySI2){
		$clarity+=$or+' clarity = "SI2" ';
		$or = ' OR ';
	}
	
	
	update();
}


function filter_cut(thegrade){
	var $thecutgrade=thegrade;
	var $or='';
	$cut='';
	
	if($thecutgrade=='EX'){
		if($cutEX){
			$cutEX=false;
			$('#filter_cutEX').removeClass('btn-active');
		}else{
			$cutEX=true;
			$('#filter_cutEX').addClass('btn-active');
		}
	}else if($thecutgrade=='VG'){
		if($cutVG){
			$cutVG=false;
			$('#filter_cutVG').removeClass('btn-active');
		}else{
			$cutVG=true;
			$('#filter_cutVG').addClass('btn-active');
		}
	}else if($thecutgrade=='G'){
		if($cutG){
			$cutG=false;
			$('#filter_cutG').removeClass('btn-active');
		}else{
			$cutG=true;
			$('#filter_cutG').addClass('btn-active');
		}
	}else if($thecutgrade=='F'){
		if($cutF){
			$cutF=false;
			$('#filter_cutF').removeClass('btn-active');
		}else{
			$cutF=true;
			$('#filter_cutF').addClass('btn-active');
		}
	}
	
	if($cutEX){
		$cut+=' cut_grade = "EX" ';
		$or= ' OR ';
	}
	if($cutVG){
		$cut+=$or+' cut_grade = "VG" ';
		$or= ' OR ';
	}
	if($cutG){
		$cut+=$or+' cut_grade = "G" ';
	    $or= ' OR ';
	}
	if($cutF){
		$cut+=$or+' cut_grade = "F" ';
		$or= ' OR ';
	}
	
	
	update();
}

//filter polish =============================
//filter polish =============================
//filter polish =============================
//filter polish =============================
function filter_polish(thegrade){
	var $thepolishgrade=thegrade;
	var $or='';
	$polish='';
	
	if($thepolishgrade=='EX'){
		if($polishEX){
			$polishEX=false;
			$('#filter_polishEX').removeClass('btn-active');
		}else{
			$polishEX=true;
			$('#filter_polishEX').addClass('btn-active');
		}
	}else if($thepolishgrade=='VG'){
		if($polishVG){
			$polishVG=false;
			$('#filter_polishVG').removeClass('btn-active');
		}else{
			$polishVG=true;
			$('#filter_polishVG').addClass('btn-active');
		}
	}else if($thepolishgrade=='G'){
		if($polishG){
			$polishG=false;
			$('#filter_polishG').removeClass('btn-active');
		}else{
			$polishG=true;
			$('#filter_polishG').addClass('btn-active');
		}
	}else if($thepolishgrade=='F'){
		if($polishF){
			$polishF=false;
			$('#filter_polishF').removeClass('btn-active');
		}else{
			$polishF=true;
			$('#filter_polishF').addClass('btn-active');
		}
	}
	
	if($polishEX){
	    $polish+=' polish = "EX" ';
		$or= ' OR ';
	}
	if($polishVG){
		$polish+=$or+' polish = "VG" ';
		$or= ' OR ';
	}
	if($polishG){
		$polish+=$or+' polish = "G" ';
		$or= ' OR ';
	}
	if($polishF){
		$polish+=$or+' polish = "F" ';
		$or= ' OR ';
	}
	update();
}

//filter symmetry =============================
//filter symmetry =============================
//filter symmetry =============================
//filter symmetry =============================
function filter_sym(thegrade){
	var $thesymgrade=thegrade;
	var $or='';
	$sym='';
	
	if($thesymgrade=='EX'){
		if($symEX){
			$symEX=false;
			$('#filter_symEX').removeClass('btn-active');
		}else{
			$symEX=true;
			$('#filter_symEX').addClass('btn-active');
		}
	}else if($thesymgrade=='VG'){
		if($symVG){
			$symVG=false;
			$('#filter_symVG').removeClass('btn-active');
		}else{
			$symVG=true;
			$('#filter_symVG').addClass('btn-active');
		}
	}else if($thesymgrade=='G'){
		if($symG){
			$symG=false;
			$('#filter_symG').removeClass('btn-active');
		}else{
			$symG=true;
			$('#filter_symG').addClass('btn-active');
		}
	}else if($thesymgrade=='F'){
		if($symF){
			$symF=false;
			$('#filter_symF').removeClass('btn-active');
		}else{
			$symF=true;
			$('#filter_symF').addClass('btn-active');
		}
	}
	
	if($symEX){
		$sym+=' symmetry = "EX" ';
		$or= ' OR ';
	}
	if($symVG){
		$sym+=$or+' symmetry = "VG" ';
		$or= ' OR ';
	}
	if($symG){
		$sym+=$or+' symmetry = "G" ';
		$or= ' OR ';
	}
	if($symF){
		$sym+=$or+' symmetry = "F" ';
		$or= ' OR ';
	}
	update();
}

//filter certificate =============================
//filter certificate =============================
//filter certificate =============================
//filter certificate =============================
function filter_certi(thelab){
	var $thecerti=thelab;
	var $or='';
	$certi='';
	
	if($thecerti=='IGI'){
		if($certiIGI){
			$certiIGI=false;
			$('#filter_certiIGI').removeClass('btn-active');
		}else{
			$certiIGI=true;
			$('#filter_certiIGI').addClass('btn-active');
		}
	}else if($thecerti=='GIA'){
		if($certiGIA){
			$certiGIA=false;
			$('#filter_certiGIA').removeClass('btn-active');
		}else{
			$certiGIA=true;
			$('#filter_certiGIA').addClass('btn-active');
		}
	}else if($thecerti=='HRD'){
		if($certiHRD){
			$certiHRD=false;
			$('#filter_certiHRD').removeClass('btn-active');
		}else{
			$certiHRD=true;
			$('#filter_certiHRD').addClass('btn-active');
		}
	}
	
	if($certiIGI){
		$certi+=' grading_lab = "IGI" ';
		$or= ' OR ';
	}
	if($certiGIA){
		$certi+=$or+' grading_lab = "GIA" ';
		$or= ' OR ';
	}
	if($certiHRD){
		$certi+=$or+' grading_lab = "HRD" ';
		$or= ' OR ';
	}
	
	update();
}

//filter FLUO =============================
//filter FLUO =============================
//filter FLUO =============================
//filter FLUO =============================
function filter_fluo(thegrade){
	var $thefluo=thegrade;
	var $or='';
	$fluo='';
	//VST STG MED FNT NON
	if($thefluo=='VST'){
		if($fluoVST){
			$fluoVST=false;
			$('#filter_fluoVST').removeClass('btn-active');
		}else{
			$fluoVST=true;
			$('#filter_fluoVST').addClass('btn-active');
		}
	}else if($thefluo=='STG'){
		if($fluoSTG){
			$fluoSTG=false;
			$('#filter_fluoSTG').removeClass('btn-active');
		}else{
			$fluoSTG=true;
			$('#filter_fluoSTG').addClass('btn-active');
		}
	}else if($thefluo=='MED'){
		if($fluoMED){
			$fluoMED=false;
			$('#filter_fluoMED').removeClass('btn-active');
		}else{
			$fluoMED=true;
			$('#filter_fluoMED').addClass('btn-active');
		}
	}else if($thefluo=='FNT'){
		if($fluoFNT){
			$fluoFNT=false;
			$('#filter_fluoFNT').removeClass('btn-active');
		}else{
			$fluoFNT=true;
			$('#filter_fluoFNT').addClass('btn-active');
		}
	}else if($thefluo=='NON'){
		if($fluoNON){
			$fluoNON=false;
			$('#filter_fluoNON').removeClass('btn-active');
		}else{
			$fluoNON=true;
			$('#filter_fluoNON').addClass('btn-active');
		}
	}
	
	if($fluoVST){
		$fluo+=' fluorescence_intensity = "VST" OR fluorescence_intensity = "Very Strong" ';
		$or= ' OR ';
	}
	if($fluoSTG){
		$fluo+=$or+' fluorescence_intensity = "STG" OR fluorescence_intensity = "Strong" ';
		$or= ' OR ';
	}
	if($fluoMED){
		$fluo+=$or+' fluorescence_intensity = "MED" OR fluorescence_intensity = "Medium" ';
		$or= ' OR ';
	}
	if($fluoFNT){
		$fluo+=$or+' fluorescence_intensity = "FNT" OR fluorescence_intensity = "SLT"  OR fluorescence_intensity = "VSL" OR fluorescence_intensity = "Faint" OR fluorescence_intensity = "Very Slight" OR fluorescence_intensity = "Slight" ';
		$or= ' OR ';
	}
	if($fluoNON){
		$fluo+=$or+' fluorescence_intensity = "NON" OR fluorescence_intensity = "None"';
		$or= ' OR ';
	}
	update();
}


function sorting_weight(){
	$sorting='weight';
	if($sorting_weight_direction == 'ASC'){
		$sorting_weight_direction = 'DESC';
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$sorting_weight_direction = 'ASC';
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	$sorting_direction=$sorting_weight_direction;
	update();
}
function sorting_color(){
	$sorting = 'color';
	if($sorting_color_direction == 'ASC'){
		$sorting_color_direction = 'DESC';
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_color_direction = 'ASC';
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_color_direction;
	update();
}
function sorting_clarity(){
	$sorting = 'clarity';
	if($sorting_clarity_direction == 'ASC'){
		$sorting_clarity_direction = 'DESC';
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_clarity_direction = 'ASC';
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_clarity_direction;
	update();
}
function sorting_cut(){
	$sorting = 'cut';
	if($sorting_cut_direction == 'ASC'){
		$sorting_cut_direction = 'DESC';
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$sorting_cut_direction = 'ASC';
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-up.png');
	}
	$sorting_direction=$sorting_cut_direction;
	update();
}
function sorting_price(){
	$sorting = 'price';
	if($sorting_price_direction == 'ASC'){
		$sorting_price_direction = 'DESC';
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$sorting_price_direction = 'ASC';
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	$sorting_direction=$sorting_price_direction;
	update();
}

function arrowDirection(){
	if($sorting_weight_direction == 'ASC'){
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-down.png?v=2');
	}else{
		$('#arrow_sorting_weight').attr('src','../images/site_elements/arrow-up.png?v=2');
	}
	if($sorting_color_direction == 'ASC'){
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_color').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_clarity_direction == 'ASC'){
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_clarity').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_cut_direction == 'ASC'){
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_cut').attr('src','../images/site_elements/arrow-up.png');
	}
	if($sorting_price_direction == 'ASC'){
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-down.png');
	}else{
		$('#arrow_sorting_price').attr('src','../images/site_elements/arrow-up.png');
	}
}

function update(){
	nowworkingonfilter=true;
	$('div#loading_indi').fadeIn('fast');
	$.post(
		"diamond-data.php", 
		{shape:$shape, color:$color, clarity:$clarity, cut:$cut, polish:$polish, sym:$sym, fluo:$fluo, certi:$certi, weight_from:$weight_from, weight_to:$weight_to, price_from:$price_from, price_to:$price_to, featured: $featured, sorting:$sorting, sorting_direction:$sorting_direction, crr_page:$crr_page}, 
		function(data){
			var contentLoaded=data;
			//alert(data);
			$('div#loading_indi').fadeOut('fast');
			$('div#diamondsdata').html(data);
			//var howmanyrecords=$("div#howmanyrecords").html();
			//$('span#resulthowmany').html(howmanyrecords);
			//dia-page-navi-bottom
			$('p#listdescription').html($('#dia-page-navi-bottom').html());
			diamondlistpagenavi(howmanyrecords);
			arrowDirection();
			addlisteners();
			fetchCompanies();
			update_selected();
		}
	);
}


function choosethispage(page){
	$crr_page=page;
	update();
}

var crrlistnavipage=0;
var $intotalhowmanyrecords=0;


function diamondlistpagenavi(howmanyrecords){
	$intotalhowmanyrecords=howmanyrecords;
	$('span#diapagenavi').empty();
	var totalrecords=parseFloat(howmanyrecords);
	var totalpages=Math.ceil(totalrecords/35);
	for(var i=crrlistnavipage*10+1; i<=totalpages; i++){
		if(i<=crrlistnavipage*35+10){
			if(i==$crr_page){
				$('span#diapagenavi').append('<span class="dia-page-btn" id="crr_page">'+i+'</span>');
			}else{
				$('span#diapagenavi').append('<span class="dia-page-btn" onclick="choosethispage('+i+')">'+i+'</span>');
			}
		}
	}
}



function update_selected(){
	orderlist=[];
	$('span.an_order').each(function(){
		var crr_order=$(this).html();
		orderlist.push(crr_order);
	});
	//$.inArray(
	$('input.selectcheckbox').each(function(){
		var crr_obj=$(this);
		var crr_id_raw=crr_obj.attr('id');
		var crr_ref=crr_id_raw.replace('check_', '');
		if($.inArray(crr_ref, orderlist)>-1){
			//alert(orderlist);
			crr_obj.prop( "checked", true );
		}
	});
}

function fetchCompanies(){
	//company doesn't need to fetch anymore
}

function searchbystockref(){
	var theStockRef=$('input#stockreftosearch').val();
	if($.trim(theStockRef)==''){
		return;
	}
	$.post(
		"diamond-data-byref.php", 
		{stockref:theStockRef}, 
		function(data){
			var contentLoaded=data;
			//alert(data);
			$('div#loading_indi').fadeOut('fast');
			$('div#diamondsdata').html(data);
			//var howmanyrecords=$("div#howmanyrecords").html();
			//$('span#resulthowmany').html(howmanyrecords);
			//dia-page-navi-bottom
			$('p#listdescription').html($('#dia-page-navi-bottom').html());
			diamondlistpagenavi(howmanyrecords);
			arrowDirection();
			addlisteners();
			fetchCompanies();
			update_selected();
		}
	);
}
</script>


<script type="text/javascript">
$(document).ready(function(){
	addlisteners();
	update();
});

function addlisteners(){
	//$('#weight_from, #price_from').off();
	
	$('#btn_price, #btn_weight').off();
	
	$('#btn_weight').click(function(){
		
		$weight_from=$('#weight_from').val();
		$weight_to=$('#weight_to').val();
		
		update();
	});
	
	$('#btn_price').click(function(){
		
		$price_from=$('#price_from').val();
		$price_to=$('#price_to').val();		
		
		update();
	});
	

	$('span#more').click(function(){
		crrlistnavipage++;//$intotalhowmanyrecords
		diamondlistpagenavi($intotalhowmanyrecords);
	});
	
}






function makeorder(theRef){
		if($("#check_"+theRef).prop("checked")){
		//alert('c');
		$('#theorders').prepend('<span class="an_order" id="order_'+theRef+'">'+theRef+'</span>');
	}else{
		$('span#order_'+theRef).remove();
	}
	return;
	var refnumber=theRef;
	$('#indication').fadeIn('fast');
	$.post(
		"../_admin/saveorder.php", 
		{stock_ref: refnumber}, 
		function(data){
			//alert(data);
			if($.trim(data)=='OK'){
				alert('ordered');
			}else{
				alert('Server is busy, please try later!');
			}
			$('#indication').fadeOut('fast');
		}
	);
	}

function confirmorder(){
	var stockref='';
	$('span.an_order').each(function(){
		stockref+='|'+$(this).html();
	});
	//alert(stockref);
	$.post(
		"../_admin/saveorder.php", 
		{stock_ref: stockref}, 
		function(data){
			//alert(data);
			if($.trim(data)=='OK'){
				alert('已经成功预定');
				$('#alreadyordered').prepend($('#theorders').html());
				$('#theorders').html('');
			}else{
				alert('Server is busy, please try later!');
			}
			$('#indication').fadeOut('fast');
		}
	);
}

function removeFromSession(stockref){
		$.post(
				"cv.php", 
				{stockref:stockref, action:'removeFromSession'}, 
				function(data){
					if(data=='error'){
						alert('未知错误，即将刷新浏览器，请稍后重试'+data);
					}
					else {
						$('#visiable-'+stockref).remove();
					}
				}
		);
}


function chgVisiable(stockref,visiable){
$('button#visiable-'+stockref).html('修改中...');
		$.post(
				"cv.php", 
				{stockref:stockref, visiable:visiable}, 
				function(data){
					if(data=='error'){
						alert('未知错误，即将刷新浏览器，请稍后重试'+data);
					}
					else {
						if(data=='1')
							$('button#visiable-'+stockref).html('隐藏');
						else
							$('button#visiable-'+stockref).html('取消隐藏');
					}
				}
		);
}



$(function() {
    $( "#slider-range-weight" ).slider({
      range: true,
	  step: 0.1,
      min: 0,
      max: 20,
      values: [ 0.5, 3 ],
      slide: function( event, ui ) {
        //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		$('#weight_from').val(ui.values[ 0 ]);
		$('#weight_to').val(ui.values[ 1 ]);
      }
    });
  });

$(function() {
    $( "#slider-range" ).slider({
      range: true,
	  step: 100,
      min: 50,
      max: 599999,
      values: [ 75, 30000 ],
      slide: function( event, ui ) {
        //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		$('#price_from').val(ui.values[ 0 ]);
		$('#price_to').val(ui.values[ 1 ]);
      }
    });
  });
</script>