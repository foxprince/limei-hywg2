<?php
/*===================session========================*/
session_start();
// if session variable not set, redirect to login page
if(!isset($_SESSION['invoiceAdmin'])) {
  header('Location: login.php');
  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title></title>
    <link rel="stylesheet" type="text/css" href="dist/css/style.css" />
    <link rel="stylesheet" href="../css/page.init.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/jquery.datetimepicker.css">
    <link rel="stylesheet" href="css/index.css">
	<link rel="stylesheet" href="css/print.css">
	<link rel="stylesheet" type="text/css" href="../css/jquery.fancybox.min.css">
    <script src="dist/js/jquery-2.1.3.min.js"></script>
    <script src="../js/pageInit.js"></script>
    <script src="../js/cookie.js"></script>
    <script src="../js/jquery.datetimepicker.js"></script>
    <script type="text/javascript" src="../js/jquery.fancybox.min.js"></script>
    <script src="dist/js/flexible.js"></script>
    <style>
    th {text-align: center;}
    </style>
</head>

<body>
    <div class="order_look">
        <header class="c_header">
            <a href="javascript:;" class="h_logo" title=""></a><span>票据查询 </span>
        </header>

        <main>
            <form action="" id="searchForm"class="c_form">
                <p class="item">
                    <!-- <label for="" class="field">类型</label>
                    <select id="type" name="type" class="i_text" style="width:2.6rem;">
                    	<option value="">全部</option><option value="invoice">发票</option><option value="receipt">收据</option>
                    </select> -->
                    <label for="" class="field">货币</label>
                    <select id="currency" name="currency" class="i_text" style="width:2.6rem;">
                    	<option value="">全部</option><option value="EUR">EUR</option><option value="CNY">CNY</option><option value="USD">USD</option>
                    </select>
                    <label for="" class="field">日期选择</label>
                    <input type="text" id="start" class="i_text i_date" placeholder="起始日期"> 至 <input type="text" id="end" class="i_text i_date ml0" placeholder="结束日期">
                    <button class="button" onclick="filterTax(this,'0');return false;">未退税</button>
                    <button class="button"  onclick="filterTax(this,'1');return false;">已退税</button>
                    <button class="button" onclick="filterTax(this,'2');return false;">退税异常</button>
                    <a class="c_btn " href="login.php?quit=quit">退出登录</a>
                </p>
                <p class="item">
                    <label for="" class="field">订单编号</label>
                    <input type="number" id="invoice_no" name="invoice_no" class="i_text" placeholder="订单编号">
                    <label for="" class="field">证书编号</label>
                    <input type="text" id="reportNo" class="i_text" placeholder="证书编号">
                    <label for="" class="field">客户姓名</label>
                    <input type="text" id="custom" class="i_text" placeholder="客户姓名">
                <button type="button" class="c_btn J_lookfor">查询</button><a class="c_btn " href="http://cn.lumiagem.com/cn/invoice/export.php?type=invoice">全部导出</a></p>
            </form>
            <table class="t_data">
            	<thead>
            		<tr>
            			<th>日期<img class="sortImg" onclick="clickSort(this)" sort="tranc_date" src="../images/selebom.png"/></th>
            			<th>客户姓名<img class="sortImg" onclick="clickSort(this)" sort="name" src="../images/selebom.png"/></th>
            			<th>重量|颜色|净度|证书</th>
            			<th>类型</th>
            			<th>发票编号<img class="sortImg" onclick="clickSort(this)" sort="invoice_no" src="../images/selebom.png"/></th>
            			<th>退税<img class="sortImg" onclick="clickSort(this)" sort="tax_rebate" src="../images/selebom.png"/></th>
            			<th>货币</th>
            			<th>金额<img class="sortImg" onclick="clickSort(this)" sort="total_price" src="../images/selebom.png"/></th>
            			<th>VAT</th>
            			<th>修改</th>
            			<th>删除</th>
            		</tr>
            	</thead>
            	<tbody class='J_databody'>
            	</tbody>
            	<tfoot>
            		<tr>
            			<td colspan="7"></td>
            			<td>合计：</td>
            			<td><span id='totalEurPrice'>€ 0.00</span></td><td><span id='totalUsdPrice'>$ 0.00</span></td><td><span id='totalCnyPrice'>￥ 0.00</span></td>
            			<td></td>
            		</tr>
            	</tfoot>
            </table>
        </main>
    </div>
                <!--print 打印-->
            <div class="row lnvoice-row white_content" id="makeOrder"  style="display: none">
                <div class="l-close"><a class="btn" href="javascript:;" onclick="popToggle()"><img src="../images/close.png"></a></div>
                <!--logo-->
                <div class="col-xs-12 text-center">
                    <img src="images/logo.png" class="logo" alt="">
                </div>
                <!--抬头-->
                <div class="col-xs-12 rise clearfix">
                    <p>LUMIA JEWELRY</p>
                    <p class="rise-vat print_none">VAT：0599.972.516</p>
                    <p>PELIKAANSTRAAT 62 BUS 314</p>
                    <div class="clearfix">
                        <span class="pull-left" id="corp">2018   ANTWERPEN</span>
                        <span class="pull-right to_time"></span>
                    </div>
                    <div class="clearfix" style="margin-bottom: 5px">
                        <span class="pull-left">Tel:  0032 3 689 73 94 </span>
                        <span class="pull-right  to_invoice"></span>
                    </div>
                    <div id="offerList" class="clearfix" style="margin-bottom: 5px">
						<span class="pull-left">OFFER LIST </span>
					</div>
                </div>
                <!--ITEMS-->
                <header id="items" class="col-xs-12 clearfix header_items">
                    ITEMS
                </header>
                <div id="itemList"></div>
                <!--价格-->
                <div class="prices clearfix">
                    <!--内容-->
                    <div class="col-xs-3 clearfix"></div>
                    <div class="col-xs-6 clearfix"></div>
                    <div class="col-xs-1 clearfix">
                        <p class="vat_price">21%VAT:</p>
                        <p class="">Total:</p>
                    </div>
                    <div class="col-xs-2  clearfix">
                        <p id="vat_price" class="vat_price">€0</p>
                        <p id="print_price"class="total_price">€0</p>
                    </div>
                </div>
                <!--客户信息-->
                <div class="client clearfix">
                    <div class="col-xs-2  client-cli">
                        <p>Name</p>
                        <p>Passport No. </p>
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
    
    	<div class="black_overlay" id="fade" style="display:none;"></div>
    	<div id=win style="display:none; POSITION:absolute; left:50%; top:50%; margin-left:-300px; margin-top:-200px; border:1px solid #888; background-color:#edf; text-align:center">输入用户名密码登录<br>
    		<form id="invoceLoginForm">
    			用户名：<input type="text" name="username"/>
    			密  码：<input id="invoiceAdmin" type="password" name="invoiceAdmin"/>
    			<button  onclick="invoiceLogin()">登录</button>
    		</form>
    	</div> 
    <script>
    document.onkeydown = function(e) {
        e = e || window.event;
        if(e.keyCode == 13) {
        		pageflag = true;
            $('.page').empty();
            query(1);
            return false;
        }
    }
    $('.i_date').datetimepicker({
        lang:"en",           //语言选择中文
        format:"Ymd",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:true,    //关闭选择今天按钮
        validateOnBlur:true
    });
    function printTranc(trancId) {
    	$.ajax({
            async:false,
            url: '../action.php?action=trancDetail&id='+trancId,
            type: "GET",
            dataType: 'json',
            success: function (data) {
   				var json=eval(data),to=json.trancDetail.currency,currencyHint='€';
   				var html = '';
   				if(to=='CNY'){
   					currencyHint = '￥';
   				}else if(to=='EUR'){
   					currencyHint = '€';
   				}else if(to=='USD'){
   					currencyHint = '$';
   				}
   				var address = json.trancDetail.street+'　'+json.trancDetail.postcode+'　'+json.trancDetail.city+'　'+json.trancDetail.country;
   				$('.to_time').html('DATE：  '+ json.trancDetail.tranc_date);
   				$('#to_name').html(json.trancDetail.name);
   				$('#to_port').html(json.trancDetail.passport);
   				$('#to_address').html(address)
   				$('#print_price').html(currencyHint+json.trancDetail.total_price);
   				if(json.trancDetail.type=='receipt'){
   					$('.vat_price').hide();$('.to_invoice').hide();}
   				else {
   					$('#offerList').html("OFFERLIST");
   					$('.to_invoice').show();$('.to_invoice').html('INVOICE：  '+ json.trancDetail.invoice_no);
   					$('.vat_price').show();$('#vat_price').html(currencyHint+json.trancDetail.vat_price);
   				}
   				$.each(json.list, function (n, j) {
   					html += '<div class="del_items items clearfix">'+
   				    '<div class="col-xs-3 clearfix">';
   				    if(j.type=='dia'||j.type=='diajew')
   				    	html += '<p id="model">'+j.shape+'</p>'+
   				    	 '<p>Carat Weight <span class="pull-right"><span class="pull-left">'+j.carat+'</span></span></p>'+
   			         '<p>Colour Grade <span class="pull-right"><span  class="pull-left">'+j.color+'</span></span></p>'+
   			         '<p>Clarity Grade <span class="pull-right"><span class="pull-left">'+j.clarity+'</span></span></p>';
   				    if(j.type=='diajew'||j.type=='jew')
   				    	html +='<p style="margin-top: 10px;">'+j.material+' '+j.jewerly_color+' White Gold '+j.jewerly+'</p>';
   				    html+='</div>'+
   				    '<div class="col-xs-3 clearfix">';
   				    if(j.type=='dia'||j.type=='diajew')
   				    	html+='<p>'+j.grading_lab+'&nbsp;'+j.report_no+'</p>'+
   			        '<p>Cut Grade <span class="pull-right">'+j.cut_grade+'</span></p>'+
   			        '<p>Polish <span class="pull-right">'+j.polish+'</span></p>'+
   			        '<p>Symmetry<span class="pull-right">'+j.symmetry+'</span></p>';
   				    html+='</div>'+
   				    '<div class="col-xs-4 clearfix">';
   				 	if(j.type=='dia'||j.type=='diajew')
   				    	html+='<p>'+j.fancy+'</p>';
   				    html+='</div>'+ '<div class="col-xs-2 clearfix">';
   				 	if(j.type=='dia'||j.type=='diajew')
   				    	html+='<p>'+currencyHint+j.price+'</p>';
   				    html+='<p>　</p><p>　</p><p>　</p>';
   				    if(j.type=='jew'||j.type=='diajew')
   				        html+='<p>'+currencyHint+j.jewerly_price+'</p>';
   				    html+='</div></div>';
   				})
   				$('#itemList').html(html);
   				html = "";
    			//$('.lnvoice-row').show();
    				$("#fade").fadeToggle();
    				$(".lnvoice-row").fadeToggle("slow").focus();
    			//window.print();
    		}
    	});
    }
    var pageflag = true;
    var $sorting="id";var $sorting_direction = "desc";
    function invoiceLogin() {
		$.ajax({
	        async:false,
	        url: "../action.php?action=invoiceLogin&invoiceAdmin="+$('#invoiceAdmin').val(),
	        type: "GET",
	        success: function (json) {alert(json);
	        setCookie('invoiceAdmin','true',1);
	        	document.getElementById("win").style.display="none";
	        	query(1);
			}
		});
	}
    $(function(){
    		query(1);
    		/* if(getCookie('invoiceAdmin')) {
    			
    		}else {
    			alert("请登录");
    			document.getElementById("win").style.display=""; 
    		} */
    		// 点击展开数据
            function fnDataToggle(){
                $('body').on('click','.J_databody tr .J_toggle', function(){
                    var 
                        self = $(this),
                        obox = self.find('.J_o_box');

                    if(obox.is(':hidden')){
                        self.css({'height': '2rem'});
                        obox.fadeIn(200);
                        //self.find('.J_toggle').addClass('rotate');
                    } else {
                        self.css({'height': 'auto'});
                        obox.hide();
                        self.find('.J_toggle').removeClass('rotate');
                    }
                    return false;
                });
            }
            //fnDataToggle();//点击展开事件
			
            $(".J_lookfor").click(function(){
               pageflag = true;
               $('.page').empty();
               query(1);
            });
            $(".printTranc").click(function(){
            	
            });
            //$(".deleteTranc").click(function(){
            
    	});
    	function deleteTranc(item,id){
        	var e = item;
        	if(confirm('您确认删除吗？')){
        		//var id = $(this).attr("trancId");
        		$.ajax({
                    async:false,
                    url: "../action.php?action=deleteTranc&id="+id,
                    type: "GET",
                    success: function (json) {
                    	//$('.trancLine [trancId='+id+']').remove();
                    	$(e).parent().parent().parent().remove();
                    	pageflag = true;
                    	//listpage(total,total_pages);
                    	query(1);
            		}
            	});
        	}
        }
        function listpage(total,total_pages){
            $.pageInit({
                container:'.page',//容器：默认page
                //setPos:'body',//放置位置：默认body
                totalPages:total_pages,//总页数：必填
                totalLists:total,//数据总数：必填
                initPage:1,//初始页码：默认1
                inputVal:1,//设置跳转的input值：默认1
                //要执行的函数：默认null，必须为fn且返回true则可执行分页，false则不执行
                callBack:function(n){
                    var flag = true;
                    query(n);
                    return flag;
                }
            });
            pageflag = false;
        }
		var taxConfirm=null;
        function query(page){
            let query ='../action.php?action=trancList&type=invoice&sort='+$sorting+"&sortDirection="+$sorting_direction;
            let type = $('#type').val();
            let name = $('#custom').val();
            let start = $('#start').val();
            let end = $('#end').val();
            let invoice_no = $('#invoice_no').val();
            let url = query +'&page=' + page;
            if(null!==taxConfirm){
                url += '&taxConfirm=' + taxConfirm;
            }
//             if(''!==type){
//                 url += '&type=' + type;
//             }
            if(''!==$('#currency').val()){
                url += '&currency=' + $('#currency').val();
            }
            if(''!==name){
                url += '&name=' + name;
            }
            if(''!==start){
                url += '&start=' + start.replace(/-/g, '');
            }
            if(''!==end){
                url += '&end=' + end.replace(/-/g, '');
            }
            if(''!==invoice_no){
                url += '&invoice_no=' + invoice_no;
            }
            if(''!==$('#reportNo').val()){
                url += '&reportNo=' + $('#reportNo').val();
            }
            $.ajax({
                async:false,
                url: url,
                type: "GET",
                dataType: 'json',
                timeout: 5000,
                success: function (json) {
                    var totalEurPrice = 0,totalCnyPrice = 0,totalUsdPrice = 0;
                    $('.J_databody').html('');
                    total = json.total;
                    total_pages = json.total_pages;
                    if(json.list)
                    for(var i=0;i<json.list.length;i++){
                        var temp = '<tr trancId="'+json.list[i].id+'" class="trancLine"><td>'+json.list[i].tranc_date+'</td><td>'+json.list[i].name+'</td>'
                        +'<td><ul>';
                        var tprice = 0;
						if(json.list[i].detail_list) {
	                        for(var j=0;j<json.list[i].detail_list.length;j++){
	                        		var d = json.list[i].detail_list[j];
	                        		var tprice = json.list[i].type=='invoice'?(json.list[i].total_price-json.list[i].vat_price):json.list[i].total_price;
	                        		if(tprice>0) tprice=Number(tprice).toFixed(2);
								if(d.type=='jew')
									temp +='<li>'+d.jewerly+' | '+d.material+'</li>';
								else
			                     	temp +='<li>'+d.carat+' | '+d.color+' | '+d.clarity+' | '+d.report_no+' | '+(d.type!='jew'?'(原价'+d.raw_price+')':'')+'</li>';
                        		}
						}
                        temp += '</ul></td>'
                        +'<td><a trancId="'+json.list[i].id+'"  class="printTranc t_operate" onclick="printTranc('+json.list[i].id+')">'  +json.list[i].type+'</a></td><td>'+ (json.list[i].type=='invoice'?json.list[i].invoice_no:"--") +'</td>'
                        +'<td>';
                        if(json.list[i].type=='invoice'&&json.list[i].tax_rebate!=null) {
                        		temp+='<input type="checkbox" name="taxCheck" '+ (json.list[i].tax_confirm==1?"checked":"")+' onclick="fun_taxConfirm(this)"/><button class="t_operate  '+ (json.list[i].tax_confirm==1?"b_blue":(json.list[i].tax_confirm==2?"b_orange":""))+'">' + json.list[i].tax_rebate +'</button>';
                        		temp+='<input type="checkbox" class="alertCheck" name="taxCheck" '+ (json.list[i].tax_confirm==2?"checked":"")+' onclick="fun_taxConfirm(this,2)"/>';
                        		temp+='<label for="Wrong" onclick="taxConfirm($(this).prev(\'input\'),2)"></label>';
                        }
                        temp +='</td>'
                        +'<td>' + (json.list[i].currency==null?"EUR":json.list[i].currency) +'</td>'
                        +'<td>'+ (tprice) +'</td>'
                        +'<td>' + (json.list[i].type=='invoice'?json.list[i].vat_price:"--") +'</td><td><div class="pl"><a trancId="'+json.list[i].id+'" href="index.php?id='+json.list[i].id+'" target="_blank"class="modify J_modify">修改</a></div></td><td><p class="o_box J_o_box"><button trancId="'+json.list[i].id+'"  class="deleteTranc t_operate" onclick="deleteTranc(this,'+json.list[i].id+')">删除</button></p></td></tr>';
						if(json.list[i].currency==null||json.list[i].currency=='EUR')
                        		totalEurPrice += parseFloat(tprice);
						if(json.list[i].currency=='CNY')
                    			totalCnyPrice += parseFloat(tprice);
						if(json.list[i].currency=='USD')
                    			totalUsdPrice += parseFloat(tprice);
                        $('.J_databody').append(temp);
                    }
                    $('#totalEurPrice').html('€ '+totalEurPrice);
                    $('#totalCnyPrice').html('¥ '+  totalCnyPrice);
                    $('#totalUsdPrice').html('$ '+  totalUsdPrice);
                    if(pageflag){
                       listpage(total,total_pages);
                    }
                },
                error: function(xhr){
                    alert("请求出错:"+xhr);
                }
            });
        }
           
        function popToggle(id) {
	        	$("#fade").fadeToggle();
	        	$("#makeOrder").fadeToggle("slow").focus();
        }
        function clickSort(item){
			if($(item).attr("src")=="../images/selebom.png") {
				$sorting_direction="asc";
				$(item).attr("src","../images/seletop.png");
			}
			else {
				$sorting_direction="desc";
				$(item).attr("src","../images/selebom.png");
			}
			$sorting = $(item).attr("sort");
    			query(1);
		}
		function filterTax(item,filterTaxConfirm) {
			$(item).siblings().removeClass("b_blue");
			if(!$(item).hasClass("b_blue")){
				$(item).addClass("b_blue");
				taxConfirm=filterTaxConfirm;
			}
			else {
				$(item).removeClass("b_blue");
				taxConfirm=null;
			}
			query(1);
			return false;
		}
	function fun_taxConfirm(item,taxConfirm) {
	    	var e = $(item).parent();
	    	var tax_confirm = 0;
	    	if(item.checked) {
			if(taxConfirm=="2") {
				$(item).addClass("b_orange");
				$(item).prev("button").addClass("b_orange");
				$(item).prev("checkbox").removeAttr("checked");
				tax_confirm = 2;
			}
			else {
				$(item).next("button").addClass("b_blue");
	    			tax_confirm = 1;
			}
	    	}
	    	else {
	    		if(taxConfirm=="2")
	    			$(item).prev("button").removeClass("b_orange");
	    		else 
		    		$(item).next("button").removeClass("b_blue");
	    	}
	    	var id = $(e).parent().attr("trancId");

		var url = "../action.php?action=confirmTax&id="+id+"&tax_confirm="+tax_confirm;
        $.get(url,function(data){ alert(data); } )
    }

    </script>
</body>
</html>