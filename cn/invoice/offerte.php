<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title></title>
		
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/index.css">
		<link rel="stylesheet" href="css/print.css">
		<style>
			.lnvoice-row {
				position: fixed;
				top: -9999px; 
				background-color:white;
			}
			input[type="text"],select.form-control {
				background: #f9f9f9;
				border-color: #e4e4e4;
			}
			
		</style>
	</head>
<div class="modal fade" id="currencyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">
					请选择币种
				</h4>
			</div>
			<div class="modal-body" style="left:33%;">
				<span >
					<img class="modalCurr" src="images/eur.png" id="eurImg" onclick="currencyRate('EUR',true)"/>
					<img class="modalCurr" src="images/cny.png" id="cnyImg" onclick="currencyRate('CNY',true)"/>
					<img class="modalCurr" src="images/amr.png" id="usdImg" onclick="currencyRate('USD',true)"/>
				</span>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
	<body>
		<div class="container-fluid">
			<!--正文-->
			<div class="row row-content">
				<!--logo-->
				<div class="logo col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left">
				</div>
				<!--个人信息 -->
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h2 class="title">PERSONAL INFORMATION</h2>
				</div>
				<!--表单-->
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<form class="form-horizontal form-login">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 clearfix">
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label">Name</label>
							<div class="col-sm-7 col-xs-8">
								<input onblur="to_name($(this).val())" type="text" id="name" class="form-control" placeholder="name">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label">Passport No.</label>
							<div class="col-sm-7 col-xs-8">
								<input onblur="to_port($(this).val())" type="text" class="form-control" id="passport" placeholder="EA1234567">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label">Address</label>
							<div class="col-sm-7 col-xs-8">
								<input  type="text" class="form-control" id="street" placeholder="Street">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label"></label>
							<div class="col-sm-7 col-xs-8">
								<input  type="text" class="form-control" id="city" placeholder="City">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label"></label>
							<div class="col-sm-7 col-xs-8">
								<input type="text" class="form-control" id="postcode" placeholder="Postal code">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-xs-3  control-label"></label>
							<div class="col-sm-7 col-xs-8">
								<input  type="text" class="form-control" id="country" placeholder="Country">
							</div>
						</div>
				</div>
				<div class="col-lg-6 col-md-6">
					<div class="form-group">
							<label class="col-sm-2 col-xs-3 control-label">购买方式</label>
							<div class="col-sm-9 col-xs-8">
								<select name="visit_type" id="visit_type">
									<option value="预约" selected>预约</option>
                                	<option value="现场">现场</option>
								</select>
							</div>
					</div>
					<div class="form-group notesDiv">
							<label class="col-sm-2 col-xs-3 control-label">Notes</label>
							<div class="col-sm-9 col-xs-9">
								<textarea rows="5" class="form-control" id="notes" name="notes"></textarea>
							</div>
					</div>
					<div class="form-group">
							<label class="col-sm-2 col-xs-3 control-label">退税方式</label>
							<div class="col-sm-9 col-xs-8">
								<select id="tax_rebate">
									<option value="易">易退税</option>
									<option value="信">信用卡冻结</option>
									<option value="公">公司退税</option>
									<option value="支">支付宝</option>
								</select>
							</div>
					</div>
						<div class="form-group">
							<label class="col-sm-2 col-xs-3  control-label">Tel</label>
							<div class="col-sm-9 col-xs-8">
								<input  type="text" class="form-control" id="tel" name="tel" placeholder="tel">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-xs-3  control-label">Email</label>
							<div class="col-sm-9 col-xs-8">
								<input  type="text" class="form-control" id="email" name="email" placeholder="email">
							</div>
						</div>
				</div>
				</form>
				</div>
				<!--添加信息-->
				<div class="clearfix">
					<div class="col-xs-12">
						<div class="staff  color-3a">
							DIAMOND DOSSIER&nbsp;&nbsp;<span>（由工作人员填写）</span></div>
						<div class="form-inline form-login clearfix date-form">
							<div class="form-group col-xs-2" style="margin-top: 5px;padding: 0">
								<span class="currency">
									<img src="images/eur.png" id="eurImg" onclick="currencyRate('EUR')"/>
					              	<img src="images/cny.png" id="cnyImg" onclick="currencyRate('CNY')"/>
					              	<img src="images/amr.png" id="usdImg" onclick="currencyRate('USD')"/>
					                <input type="hidden" name="currency" id="currency" value="EUR"/>
				           		</span>
							</div>
							<div class="form-group col-xs-5">
								<label class="control-label" style="padding-top: 0; ">Date</label>
								<input type="text" id="tranc_date" class="form-control" placeholder="">
							</div>
							<div class="form-group col-xs-5">
								<label class="control-label" style="padding-top: 0; ">Invoice</label>
								<input type="text" class="form-control" id="invoice_no" placeholder="">
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="addContent clearfix"></div> -->
				<div class="Add">
					<span class="addImg activeAdd" obj="dia">添加钻戒</span>
					<span class="addImg activeAdd add-two" obj="jew">添加首饰</span>
				</div>

				<div>
				<div class="Total">
                	<h1 class="clearfix">Total：<lable class="currencyHint"></lable><span data-price="0" class="total_price"><input name="total_price" value="0.00"/></span></h1>
                </div>
				</div>
				<div class="col-xs-12 text-right fotter">
					<input type="checkbox" name="printReportNo" value="1" checked="true"/>证书编号
					<button type="button" class="c_btn J_lookfor pull-right" onclick="receipt('offerte')">OFFERTE</button>
				</div>
			</div>
			</div>
			<!--print 打印-->
			<div class="row lnvoice-row">
				<!--logo-->
				<div class="col-xs-12 text-center" style="min-height:100px; ">
					<img src="images/logo.png" class="logo" alt="">
				</div>
				<!--抬头-->
				<div class="col-xs-12 rise clearfix">
					<p>LUMIA JEWELRY</p>
					<p>PELIKAANSTRAAT 62 BUS 314</p>
					<div class="clearfix">
						<span class="pull-left" id="corp">2018   ANTWERPEN</span>
						<span class="pull-right to_time"></span>
					</div>
					<div class="clearfix" style="margin-bottom: 5px">
						<span id="offerList" class="pull-left">Tel:  0032 3 689 73 94 </span>
						<span class="pull-right  to_invoice"></span>
					</div>
				</div>
				<!--ITEMS-->
				<header id="items" class="col-xs-12 clearfix header_items">
					ITEMS
				</header>
				<!--价格-->
				<div class="prices clearfix">
					<!--内容-->
					<div class="col-xs-3 clearfix"></div>
					<div class="col-xs-6 clearfix"></div>
					<div class="col-xs-1 clearfix">
						<p class="">Total:</p>
					</div>
					<div class="col-xs-2  clearfix">
                        <lable class="currencyHint"></lable><span id="print_price"class="total_price"></span>
					</div>
				</div>
				<!--客户信息-->
				<div class="client clearfix">
					<div class="col-xs-2  client-cli">
						<p>Name</p>
						<p id="passportLabel">Passport No. </p>
						<p>Address </p>
						
					</div>
					<!--信息-->
					<div class="col-xs-10 client-cli">
						<p id="to_name"></p>
						<p id="to_port"></p>
						<p id="to_address"></p>
						
					</div>
				</div>
			</div>
	</body>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/index.js"></script>
	<script>
	$('#currencyModal').modal('show');
	var invoiceOrReceipt = 'receipt';
	var time = new Date();
    var to_time = String(time.getFullYear())+String(PrefixInteger(time.getMonth()+1))+String(PrefixInteger(time.getDate()));
    //$('#corp').html(String(time.getFullYear())+'   ANTWERPEN');
    $('#tranc_date').val(to_time);
    $('#invoice_no').val(invoiceNo());
	var no = getUrlParam('id');
    if(no){
    	trancId = no;
    	var obj = $(this).attr('obj');
        var content = '<div type='+obj+' class="addContent clearfix '+obj+'">'+ht(obj)+'</div>';
        $.ajax({
            async:false,
            url: '../action.php?action=trancDetail&id='+no,
            type: "GET",
            dataType: 'json',
            success: function (data) {
            	var json=eval(data),to=json.trancDetail.currency;//,currencyHint='€';
   				var html = '';
   				currency=to;
   				if(to=='CNY'){
   					currencyHint = '￥';$('#cnyImg').addClass("selected");
   				}else if(to=='EUR'){
   					currencyHint = '€';$('#eurImg').addClass("selected");
   				}else if(to=='USD'){
   					currencyHint = '$';$('#usdImg').addClass("selected");
   				}
   				var address = json.trancDetail.street+'　'+json.trancDetail.postcode+'　'+json.trancDetail.city+'　'+json.trancDetail.country;
   				$('#name').val(json.trancDetail.name);$('#street').val(json.trancDetail.street);
   				$('#tel').val(json.trancDetail.tel);$('#email').val(json.trancDetail.email);
   				$('#notes').val(json.trancDetail.notes);
   				$('#passport').val(json.trancDetail.passport);$('#postcode').val(json.trancDetail.postcode); 
   				$('#city').val(json.trancDetail.city);$('#country').val(json.trancDetail.country);
   				$('#tranc_date').val(json.trancDetail.tranc_date);$('#invoice_no').val(json.trancDetail.invoice_no);
   				$('#tax_rebate').val(json.trancDetail.tax_rebate);
   				$('.currencyHint').html(currencyHint);
                $('input[name="total_price"]').val(json.trancDetail.total_price);
                $('input[name="vat_price"]').val(json.trancDetail.vat_price);
   				$.each(json.list, function (n, j) {
   			        var content = '<div type='+j.type+' class="addContent clearfix '+j.type+'">';
   			        if(j.type=='jew') {
   			        	content +="<div class='addApend clearfix dia'>\
   			     		<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>\
   			     		<div class='col-lg-1 pdNone returnData d-delete col-md-1 col-sm-12 col-xs-12'>\
   			     		<span class='remove addImg' onclick='removeData(this)'></span>\
   			     		</div></div></div>";
   			     		content +="<div class='jt-form clearfix'>\
   			     	    <div class='J_jtBox jt-box' style='display:block;'>\
   			     	    <div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
   			     	    <div class='form-group clearfix'>\
   			     	    <label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>\
   			     	    <div class='col-sm-10 col-xs-9'>\
   			     	    <input id='type' type='text' name='jewerlyType' list='typelist' value='"+j.jewerly+"'>\
                                                                                   			     	    <datalist id='typelist'>\
                                                                                                        　　<option value='Ring'>Ring</option><option value='Necklace'>Necklace</option><option value='Earring'>Earring</option><option value='Diamond Ring'>Diamond Ring</option><option value='Diamond Necklace'>Diamond Necklace</option><option value='Diamond Earring'>Diamond Earring</option>\
                                                                                                        </datalist>\
   			     	    </div></div><div class='form-group clearfix'>\
   			     	    <label class='col-sm-2 col-xs-3  control-label'>Price</label>\
   			     	    <div class='col-sm-10 col-xs-9'> \
   			     	    <input onblur='total_receipt' class='jewerly_price form-control' id='form_price2' value=";
   			     	    content += j.jewerly_price+" type='text' placeholder='0.00'>\
   			     	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	   			 	    <div class='form-group clearfix'>\
	   				    <label class='col-sm-2 col-xs-3  control-label'>Material</label><div class='col-sm-10 col-xs-9'>\
	   				    <select id='form_material' class='material form-control'><option value='18K' "+(j.material=='18K'?'selected':'')+">18K</option><option value='Pt' "+(j.material=='Pt'?'selected':'')+">Pt</option></select>\
	   				    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	   				    <div class='form-group clearfix'>\
	   			 	    <label class='col-sm-2 col-xs-3  control-label'>Color</label><div class='col-sm-10 col-xs-9'>\
	   			 	    <select id='form_jew_color' class='jewerly_color form-control'><option value='White' "+(j.jewerly_color=='White'?'selected':'')+">White</option><option value='Yellow' "+(j.jewerly_color=='Yellow'?'selected':'')+">Yellow</option><option value='Rose' "+(j.jewerly_color=='Rose'?'selected':'')+">Rose</option></select>\
	   			 	    </div></div></div></div>";
   			        }
   			        if(j.type=='dia'||j.type=='diajew') {
   			        	content +="<div class='addApend clearfix dia'>\
   			     		<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>\
   			     		<div class='col-lg-1 pdNone returnData d-delete col-md-1 col-sm-12 col-xs-12'>\
   			     		<span class='remove addImg' onclick='removeData(this)'></span>\
   			     		</div></div></div>";
   			     		var html = "<div class='zj-form clearfix'><div class='col-lg-5 col-md-offset-1 pdNone col-md-4 col-sm-12 col-xs-12'>";
   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Model</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<select id='form_model' class='shape form-control'>";
   			     	    html += "<option value='-'  "+(j.shape=='-' ? 'selected':'')+">-</option>";
   			     	    html += "<option value='BR' "+(j.shape=='BR'? 'selected':'')+">Round Brilliant</option>";
   			     	    html += "<option value='PR' "+(j.shape=='PR'? 'selected':'')+">Princess</option>";
   			     	    html += "<option value='PS' "+(j.shape=='PS'? 'selected':'')+">Pear Shape</option>";
   			     	    html += "<option value='HS' "+(j.shape=='HS'? 'selected':'')+">Heart</option>";
   			     	    html += "<option value='MQ' "+(j.shape=='MQ'? 'selected':'')+">Marquise</option>";
   			     	    html += "<option value='OV' "+(j.shape=='OV'? 'selected':'')+">Oval</option>";
   			     	    html += "<option value='EM' "+(j.shape=='EM'? 'selected':'')+">Emerald</option>";
   			     	    html += "<option value='RAD'"+(j.shape=='RAD'?'selected':'')+">Radiant</option>";
   			     	    html += "<option value='CU' "+(j.shape=='CU'?'selected':'')+">Cushion</option>";
   			     	    html += "</select>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	     html += "<input id='color' type='text' name='fancy' list='colorList' placeholder='请选择' value='"+j.fancy+"'>\
                                                                                                           			     	    <datalist id='colorList'>\
                                                                                                                                  <option value='Yellow'>Yellow</option>\
                                                                                                                                  <option value='Pink'>Pink</option>\
                                                                                                                                  <option value='Green'>Green</option>\
                                                                                                                                  <option value='Red'>Red</option>\
                                                                                                                                  <option value='Blue'>Blue</option>\
                                                                                                                                </datalist>";
   			     	    html += "</div>";
   			     	    html += "</div>";

	   			     	html += "<div class='form-group clearfix'>";
			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Fluorescence</label>";
			     	    html += "<div class='col-sm-10 col-xs-9'>";
			     	    html += "<select id='form_color' class='fancy form-control'>";
			     	    html += "<option value='-' "+(j.fluorescence=='NON' ? 'selected':'')+">无</option>";
			     	    html += "<option value='Yellow' "+(j.fluorescence=='FNT' ? 'selected':'')+">弱</option>";
			     	    html += "<option value='Pink' "+(j.fluorescence=='MED' ? 'selected':'')+">中</option>";
			     	    html += "<option value='Green' "+(j.fluorescence=='STR' ? 'selected':'')+">强</option>";
			     	    html += "<option value='Red' "+(j.fluorescence=='VST' ? 'selected':'')+">极强</option>";
			     	    html += "</select>";
			     	    html += "</div>";
			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Certification</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<input id='gradingLab' type='text' name='gradingLab' list='gradingLabList' value='"+j.grading_lab+"' placeholder='请选择'>\
                                                                                                   			     	    <datalist id='gradingLabList'>\
                                                                                                                          <option value='GIA'>GIA</option>\
                                                                                                                          <option value='HRD'>HRD</option>\
                                                                                                                          <option value='IGI'>IGI</option>\
                                                                                                                        </datalist>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Report No.</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += " <input id='ref' onblur='ref(this,$(this).val())' class='report_no form-control' value='"+j.report_no+"' type='text' placeholder='000000'>";
   			     	    html += "</div>";
   			     	    html += "</div>";


   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Price</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += " <input onblur='total_receipt' value='"+j.price+"' id='form_price' class='price form-control' type='text' placeholder='0.00'>";
   			     	    html += "</div>";
   			     	    html += "</div>";
   			     	    html += "<input type='hidden' name='raw_price' class='raw_price' value='"+j.raw_price+"'>";

   			     	    html += "</div>";
   			     	    html += "<div class='col-lg-5  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Carat Weight</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += " <input id='form_weight' class='carat form-control' type='text' value='"+j.carat+"' placeholder='0.00'>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour Grade</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<input id='colourGrade' type='text' name='colourGrade' list='colourGradeList' value='"+j.color+"' placeholder='请选择'>\
                                                           			     	    <datalist id='colourGradeList'>\
                                                                                  <option value='D'>D</option><option value='E'>E</option><option value='F'>F</option><option value='G'>G</option>\
                                                                                  <option value='H'>H</option><option value='I'>I</option><option value='J'>J</option><option value='K'>K</option>\
                                                                                  <option value='L'>L</option><option value='M'>M</option>\
                                                                                </datalist>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Clarity Grade</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<input id='clarityGrade' type='text' name='clarityGrade' list='clarityGradeList' value='"+j.clarity+"' placeholder='请选择'>\
                                                                                                   			     	    <datalist id='clarityGradeList'>\
                                                                                                                          <option value='FL'>FL</option><option value='IF'>IF</option><option value='VVS1'>VVS1</option><option value='VVS2'>VVS2</option>\
                                                                                                                          <option value='VS1'>VS1</option><option value='VS2'>VS2</option><option value='SI1'>SI1</option><option value='SI2'>SI2</option>\
                                                                                                                        </datalist>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Cut Grade</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<select id='form_cutGrade' class='cut_grade form-control'>";
   			     	    html += "<option value='-'  "+(j.cut_grade=='-' ? 'selected':'')+">-</option>";
   			     	    html += "<option value='EX' "+(j.cut_grade=='EX' ? 'selected':'')+">EX</option>";
   			     	    html += "<option value='VG' "+(j.cut_grade=='VG' ? 'selected':'')+">VG</option>";
   			     	    html += "<option value='G'  "+(j.cut_grade=='G' ? 'selected':'')+">G</option>";
   			     	    html += "<option value='F'  "+(j.cut_grade=='F' ? 'selected':'')+">F</option>";
   			     	    html += "</select>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Polish</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<select id='form_polish' class='polish form-control'>";
   			     	    html += "<option value='-'  "+(j.polish=='-' ? 'selected':'')+">-</option>";
   			     	    html += "<option value='EX' "+(j.polish=='EX' ? 'selected':'')+">EX</option>";
   			     	    html += "<option value='VG' "+(j.polish=='VG' ? 'selected':'')+">VG</option>";
   			     	    html += "<option value='G'  "+(j.polish=='G' ? 'selected':'')+">G</option>";
   			     	    html += "<option value='F'  "+(j.polish=='F' ? 'selected':'')+">F</option>";
   			     	    html += "</select>";
   			     	    html += "</div>";
   			     	    html += "</div>";
   			     	    html += "<div class='form-group clearfix'>";
   			     	    html += "<label class='col-sm-2 col-xs-3  control-label'>Symmetry</label>";
   			     	    html += "<div class='col-sm-10 col-xs-9'>";
   			     	    html += "<select id='form_symmetry' class='symmetry form-control'>";
   			     	    html += "<option value='-'  "+(j.symmetry=='-' ? 'selected':'')+">-</option>";
   			     	    html += "<option value='EX' "+(j.symmetry=='EX' ? 'selected':'')+">EX</option>";
   			     	    html += "<option value='VG' "+(j.symmetry=='VG' ? 'selected':'')+">VG</option>";
			     	    html += "<option value='G'  "+(j.symmetry=='G' ? 'selected':'')+">G</option>";
   			     	    html += "<option value='F'  "+(j.symmetry=='F' ? 'selected':'')+">F</option>";
   			     	    html += "</select>";
   			     	    html += "</div>";
   			     	    html += "</div>";

   			     	    html += "</div></div>";
   			     	    if(j.type=='diajew') {
   			     	    html +="<div class='jt-form clearfix'>\
   			     	    <span class='addImg add-thr toggJew' onclick='toggJew(this);' ></span>\
   			     	    <div class='J_jtBox jt-box' style='display:block;'>\
   			     	    <div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
   			     	    <div class='form-group clearfix'>\
   			     	    <label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>\
   			     	    <div class='col-sm-10 col-xs-9'>\
   			     	    <input id='type' type='text' name='jewerlyType' list='typelist' value='"+j.jewerly+"'>\
                                                           			     	    <datalist id='typelist'>\
                                                                                　　<option value='Ring'>Ring</option><option value='Necklace'>Necklace</option><option value='Earring'>Earring</option><option value='Diamond Ring'>Diamond Ring</option><option value='Diamond Necklace'>Diamond Necklace</option><option value='Diamond Earring'>Diamond Earring</option>\
                                                                                </datalist>\
   			     	    </div></div><div class='form-group clearfix'>\
   			     	    <label class='col-sm-2 col-xs-3  control-label'>Price</label>\
   			     	    <div class='col-sm-10 col-xs-9'> \
   			     	    <input onblur='total_receipt' class='jewerly_price form-control' id='form_price2' value='"+j.jewerly_price+"' type='text' placeholder='0.00'>\
   			     	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
   			     	    <div class='form-group clearfix'>\
   			     	<label class='col-sm-2 col-xs-3  control-label'>Material</label><div class='col-sm-10 col-xs-9'>\
   				    <select id='form_material' class='material form-control'><option value='18K' "+(j.material=='18K'?'selected':'')+">18K</option><option value='Pt' "+(j.material=='Pt'?'selected':'')+">Pt</option></select>\
   				    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
   				    <div class='form-group clearfix'>\
   			 	    <label class='col-sm-2 col-xs-3  control-label'>Color</label><div class='col-sm-10 col-xs-9'>\
   			 	    <select id='form_jew_color' class='jewerly_color form-control'><option value='White' "+(j.jewerly_color=='White'?'selected':'')+">White</option><option value='Yellow' "+(j.jewerly_color=='Yellow'?'selected':'')+">Yellow</option><option value='Rose' "+(j.jewerly_color=='Rose'?'selected':'')+">Rose</option></select>\
   			     	    </div></div></div></div>";
   			     	    }
   			     	    content += html;
   			        }
   			        content +='</div>';
   			        $('.Add').before(content);
   					
   				});
    		}
    	});
        
    }
    $(document).ready(function(){
		$(".visit_type").change(function(){
			$("textarea[name=notes]").val($(this).val());
			return false;
		})
	})
	    function saves() {
    		saveOrUpdate();
    	}
		/*发票*/
		function invoice(type) {
			if(type=='invoice'||type=='credit')
				total_invoice();
			else if(type=='credit-invoice') 
				total_receipt();
			if(type=='invoice')
				saveOrUpdate('invoice');
			to_print(type);
            if(type=='invoice'||type=='credit-invoice')
				$('.to_invoice').html('INVOICE：  '+ $('#invoice_no').val());
            else if(type=='credit')
            		$('.to_invoice').html('CREDIT NOTE：  '+ $('#invoice_no').val()+'C');
            if(type=='credit-invoice')
            		$('.print_none').hide();
            else
            		$('.print_none').show();
			window.print();
		}
		/*收据*/
		function receipt(type){
            saveOrUpdate(type);
			$('.to_invoice').html('');
			$('.print_none').hide();
			to_print(type,$("input[name='printReportNo']").prop("checked"));
            window.print();
		}
    </script>
</html>