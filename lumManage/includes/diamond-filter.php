<div id="filter_box">



<div id="filter_box_inner">
<div class="filter_line">
<span class="filter_title" id="filter_title_shape">形状</span>
<ul class="fileber_shape_outer">
<li class="filter_shape" id="filter_shapeBR" onclick="filter_shape('BR')"><img src="../images/site_elements/icons/01.gif" /></li>
<li class="filter_shape" id="filter_shapePS" onclick="filter_shape('PS')"><img src="../images/site_elements/icons/02.gif" /></li>
<li class="filter_shape" id="filter_shapePR" onclick="filter_shape('PR')"><img src="../images/site_elements/icons/03.gif" /></li>
<li class="filter_shape" id="filter_shapeHS" onclick="filter_shape('HS')"><img src="../images/site_elements/icons/08.gif" /></li>
<li class="filter_shape" id="filter_shapeMQ" onclick="filter_shape('MQ')"><img src="../images/site_elements/icons/05.gif" /></li>
<li class="filter_shape" id="filter_shapeOV" onclick="filter_shape('OV')"><img src="../images/site_elements/icons/11.gif" /></li>
<li class="filter_shape" id="filter_shapeEM" onclick="filter_shape('EM')"><img src="../images/site_elements/icons/10.gif" /></li>
<li class="filter_shape" id="filter_shapeRAD" onclick="filter_shape('RAD')"><img src="../images/site_elements/icons/06.gif" /></li>
<li class="filter_shape" id="filter_shapeCU" onclick="filter_shape('CU')"><img src="../images/site_elements/icons/12.gif" /></li>
</ul>
</div>

<div class="filter_line">
<div class="filter_line_inner" id="filter_line_color" style="border-width:1px;">
<span class="filter_title">颜色</span>
<ul>
<li class="filter_color" id="filter_colorD" onclick="filter_color('D')">D</li>
<li class="filter_color" id="filter_colorE" onclick="filter_color('E')">E</li>
<li class="filter_color" id="filter_colorF" onclick="filter_color('F')">F</li>
<li class="filter_color" id="filter_colorG" onclick="filter_color('G')">G</li>
<li class="filter_color" id="filter_colorH" onclick="filter_color('H')">H</li>
<li class="filter_color" id="filter_colorI" onclick="filter_color('I')">I</li>
<li class="filter_color" id="filter_colorJ" onclick="filter_color('J')">J</li>
<li class="filter_color" id="filter_colorK" onclick="filter_color('K')">K</li>
<li class="filter_color" id="filter_colorL" onclick="filter_color('L')">L</li>
<li class="filter_color" id="filter_colorM" onclick="filter_color('M')">M</li>
</ul>
</div>


<div class="filter_line_inner">
<span class="filter_title">重量</span>
<div id="filter_line_weight">

<input type="text" id="weight_from" value="0.01" /> - <input type="text" id="weight_to" value="50" /> 
<button type="button" id="btn_weight" onclick="updateweight()">更新结果</button>
</div>
</div>
</div>

<div class="filter_line">
<div class="filter_line_inner" id="filter_line_clarity" style="border-width:1px;">
<span class="filter_title">净度</span>
<ul>
<li class="filter_clarity" id="filter_clarityFL" onclick="filter_clarity('FL')">FL</li>
<li class="filter_clarity" id="filter_clarityIF" onclick="filter_clarity('IF')">IF</li>
<li class="filter_clarity" id="filter_clarityWS1" onclick="filter_clarity('WS1')">VVS1</li>
<li class="filter_clarity" id="filter_clarityWS2" onclick="filter_clarity('WS2')">VVS2</li>
<li class="filter_clarity" id="filter_clarityVS1" onclick="filter_clarity('VS1')">VS1</li>
<li class="filter_clarity" id="filter_clarityVS2" onclick="filter_clarity('VS2')">VS2</li>
<li class="filter_clarity" id="filter_claritySI1" onclick="filter_clarity('SI1')">SI1</li>
<li class="filter_clarity" id="filter_claritySI2" onclick="filter_clarity('SI2')">SI2</li>
</ul>
</div>

<div class="filter_line_inner">
<span class="filter_title">价格(美元)</span>
<div id="filter_line_price">


<input type="text" id="price_from" value="50" /> - <input type="text" id="price_to" value="999999" /> 
<button type="button" id="btn_price" onclick="updateprice()">更新结果</button>



</div>
</div>
</div>




<div class="filter_line">
<div class="filter_line_inner" id="filter_line_clarity" style="border-width:1px;">
<span class="filter_title">切工</span>
<ul>
<li class="filter_clarity" id="filter_cutEX" onclick="filter_cut('EX')">EX</li>
<li class="filter_clarity" id="filter_cutVG" onclick="filter_cut('VG')">VG</li>
<li class="filter_clarity" id="filter_cutG" onclick="filter_cut('G')">G</li>
<li class="filter_clarity" id="filter_cutF" onclick="filter_cut('F')">F</li>

</ul>
</div>

<div class="filter_line_inner">
<span class="filter_title">荧光</span>
<ul>
<li class="filter_clarity" id="filter_fluoVST" onclick="filter_fluo('VST')">极强</li>
<li class="filter_clarity" id="filter_fluoSTG" onclick="filter_fluo('STG')">强</li>
<li class="filter_clarity" id="filter_fluoMED" onclick="filter_fluo('MED')">中</li>
<li class="filter_clarity" id="filter_fluoFNT" onclick="filter_fluo('FNT')">弱</li>
<li class="filter_clarity" id="filter_fluoNON" onclick="filter_fluo('NON')">无</li>

</ul>
</div>

</div>



<div class="filter_line">
<div class="filter_line_inner" id="filter_line_clarity" style="border-width:1px;">
<span class="filter_title">抛光</span>
<ul>
<li class="filter_clarity" id="filter_polishEX" onclick="filter_polish('EX')">EX</li>
<li class="filter_clarity" id="filter_polishVG" onclick="filter_polish('VG')">VG</li>
<li class="filter_clarity" id="filter_polishG" onclick="filter_polish('G')">G</li>
<li class="filter_clarity" id="filter_polishF" onclick="filter_polish('F')">F</li>

</ul>
</div>

<div class="filter_line_inner" id="filter_line_clarity" style="border-width:1px;">
<span class="filter_title">证书</span>
<ul>
<li class="filter_clarity" id="filter_certiIGI" onclick="filter_certi('IGI')">IGI</li>
<li class="filter_clarity" id="filter_certiHRD" onclick="filter_certi('HRD')">HRD</li>
<li class="filter_clarity" id="filter_certiGIA" onclick="filter_certi('GIA')">GIA</li>

</ul>
</div>
</div>




<div class="filter_line">
<div class="filter_line_inner">
<span class="filter_title">对称性</span>
<ul>
<li class="filter_clarity" id="filter_symEX" onclick="filter_sym('EX')">EX</li>
<li class="filter_clarity" id="filter_symVG" onclick="filter_sym('VG')">VG</li>
<li class="filter_clarity" id="filter_symG" onclick="filter_sym('G')">G</li>
<li class="filter_clarity" id="filter_symF" onclick="filter_sym('F')">F</li>
</ul>
</div>


<div class="filter_line_inner">
<span class="filter_title" style="position:relative; display:inline-block; padding:0; margin:0;">库存编号</span>
<input name="stockreftosearch" id="stockreftosearch" style="width:128px; position:relative; margin-left:15px;" />
<button id="stockrefbtn" onclick="searchbystockref()">查找</button>
</div>


</div>


<p id="filtertab">筛选结果</p>



</div>

</div>