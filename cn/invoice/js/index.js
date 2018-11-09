var currency='EUR';
var currencyHint = '€';
var trancId = 0;
$(document).ready(function(){
    //html内容
    /*add list*/
	$('.activeAdd').click(function() {
        var obj = $(this).attr('obj');
        var content = '<div type='+obj+' class="addContent clearfix '+obj+'">'+ht(obj)+'</div>';
        $('.Add').before(content);
    });
    
    //$('.to_invoice').html('INVOICE：  '+ to_time);
});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function toggJew(item){
	$(item).next('.jt-box').toggle();
	if($(item).next('.jt-box').css("display")=='block'){
		$(item).parents(".addContent").addClass("jew");
		$(item).parents(".addContent").attr("type","diajew");
	}
	if($(item).next('.jt-box').css("display")=='none') {
		$(item).parents(".addContent").removeClass("jew");
		$(item).parents(".addContent").attr("type","dia");
	}
}
function to_name(e){
    $('#to_name').html(e)
}
function to_port(e){
    $('#to_port').html(e)
}

/**
 * @returns
 */
/**
 * @returns
 */
function to_print(type){
	$('.to_time').html('DATE：  '+ $('#tranc_date').val());
	var html = '';
    var address = $('#street').val()+'　'+$('#postcode').val()+'　'+$('#city').val()+'　'+$('#country').val()
    $('#to_address').html(address);
    if(type=='receipt') {
    		$('#offerList').html("OFFERLIST");
    }
    to_name($('#name').val());
    to_port($('#passport').val());
    $('.del_items').remove();
    $('.addContent').each(function(){
    		html += '<div class="del_items items clearfix">'+'<div class="col-xs-3 clearfix">';
        if($(this).hasClass("dia")||$(this).hasClass("diajew"))
	        	html += '<p id="model">'+$(this).find("#form_model").find("option:selected").val()+'</p>'+
	        	 '<p>Carat Weight <span class="pull-right"><span class="pull-left">'+$(this).find("#form_weight").val()+'</span></span></p>'+
	         '<p>Colour Grade <span class="pull-right"><span  class="pull-left">'+$(this).find('#form_colourGrade option:selected').val()+'</span></span></p>'+
	         '<p>Clarity Grade <span class="pull-right"><span class="pull-left">'+$(this).find('#form_clarity option:selected').val()+'</span></span></p>';
        if($(this).hasClass("jew")||$(this).hasClass("diajew"))
        		html +='<p style="margin-top: 10px;">'+$(this).find('#form_material option:selected').val()+' '+$(this).find('#form_jew_color option:selected').val()+' Gold '+$(this).find('#form_jewerly option:selected').val()+'</p>';
        html+='</div>'+'<div class="col-xs-3 clearfix">';
        if($(this).hasClass("dia")||$(this).hasClass("diajew"))
        		html+='<p>'+$(this).find('#form_gia option:selected').val()+'&nbsp;'+$(this).find('#ref').val()+'</p>'+
	        '<p>Cut Grade <span class="pull-right">'+$(this).find('#form_cutGrade option:selected').val()+'</span></p>'+
	        '<p>Polish <span class="pull-right">'+$(this).find('#form_polish option:selected').val()+'</span></p>'+
	        '<p>Symmetry<span class="pull-right">'+$(this).find('#form_symmetry option:selected').val()+'</span></p>';
        html+='</div>'+'<div class="col-xs-4 clearfix">';
        if($(this).hasClass("dia")||$(this).hasClass("diajew"))
        		html+='<p>'+$(this).find('#form_color option:selected').val()+'</p>';
        html+='</div>'+'<div class="col-xs-2 clearfix">';
        if($(this).hasClass("dia")||$(this).hasClass("diajew"))
        		html+='<p>'+currencyHint+$(this).find("#form_price").val()+'</p>';
        if($(this).hasClass("diajew")||($(this).hasClass("dia")&&$(this).hasClass("jew")))
        		html+='<p>　</p><p>　</p><p>　</p>';
        if($(this).hasClass("jew")||$(this).hasClass("diajew"))
            html+='<p>'+currencyHint+$(this).find("#form_price2").val()+'</p>';
        html+='</div></div>';
    })
    $('#items').after(html);
}

/*zhangheng  463106544*/
function deleteDate(data) {
    $(data).next('.delete-content').fadeIn();
}

/*返回*/
function returnData(data) {
    $(data).parents('.delete-content').fadeOut();
}
/**
 * 移除
 * @param data
 */
function removeData(data) {
    $(data).parents('.addContent').remove();
    total();
}

//补零
function PrefixInteger(num) {
    return ( "0000000000000000" + num ).substr(-2);
}

/**
 * 保存信息
 */
function saveOrUpdate(type){
    var data = {
        'id':trancId,'name':$('#name').val(),'tax_rebate':$('#tax_rebate').val(),'notes':$('#notes').val(),
        'passport':$('#passport').val(),'tel':$('#tel').val(),
        'street':$('#street').val(),'email':$('#email').val(),
        'city':$('#city').val(),'currency':currency,'type':type,
        'postcode':$('#postcode').val(),'vat_price':$('.vat_price').attr('data-price'),'total_price':$('.total_price').attr('data-price'),
        'country':$('#country').val(),'tranc_date':$('#tranc_date').val(),'invoice_no':$('#invoice_no').val(),
        'list':[]
        };
    $('.addContent').each(function(){	
    	data.list.push({'type':$(this).attr('type'),
            'report_no':$(this).find('.report_no').val(),
            'shape':$(this).find('.shape').find('option:selected').val(),
            'carat':$(this).find('.carat').val(),
            'color':$(this).find('.color').find('option:selected').val(),
            'fancy':$(this).find('.fancy').find('option:selected').val(),
            'clarity':$(this).find('.clarity').find('option:selected').val(),
            'grading_lab':$(this).find('.grading_lab').find('option:selected').val(),
            'cut_grade':$(this).find('.cut_grade').find('option:selected').val(),
            'polish':$(this).find('.polish').find('option:selected').val(),
            'symmetry':$(this).find('.symmetry').find('option:selected').val(),
            'price':$(this).find('.price').val(),
            'jewerly':$(this).find('.jewerly').find('option:selected').val(),
            'material':$(this).find('.material').find('option:selected').val(),
            'jewerly_price':$(this).find('.jewerly_price').val(),
            'jewerly_color':$(this).find('.jewerly_color').val(),
            'raw_price':$(this).find('.raw_price').val()
        });
    });
    if(data){
    		var url = "../action.php?action=addTranc";
    		if(trancId>0)
    			url = "../action.php?action=updateTranc";
    		$.ajax({  
    	         type : "post",  
    	          url : url,  
    	          data : {transaction:JSON.stringify(data)},  
    	          async : false,  
    	          success : function(data){  
    	        	  	if(data){
    	                  alert('保存成功')
    	                  strs=data.split(",")
    	                  trancId = strs[0];
    	                  $('#invoice_no').val(strs[1]);
    	              }else{
    	                  alert('网络错误，请检查信息并重试')
    	              }
    	          }  
    	     }); 
    }
}

/**
 * 拼接内容html
 * @returns {string}
 */
function ht(type){
    var html = "";
    if(type=='dia'){
        html += diaContent();}
    /*边线*/
    if(type=='jew')
    	html += jewelryContent();
    return html;
}
function diaContent() {
	var html ="<div class='addApend clearfix dia'>\
		<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>\
		<div class='col-lg-1 pdNone returnData d-delete col-md-1 col-sm-12 col-xs-12'>\
		<span class='remove addImg' onclick='removeData(this)'></span>\
		</div></div></div>";
		html += "<div class='zj-form clearfix'><div class='col-lg-5 col-md-offset-1 pdNone col-md-4 col-sm-12 col-xs-12'>";
	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Model</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_model' class='shape form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='BR'>Round Brilliant</option>";
	    html += "<option value='PR'>Pear</option>";
	    html += "<option value='PS'>Princess</option>";
	    html += "<option value='HS'>Heart</option>";
	    html += "<option value='MQ'>Marquise</option>";
	    html += "<option value='OV'>Oval</option>";
	    html += "<option value='EM'>Emerald</option>";
	    html += "<option value='RAD'>Radiant</option>";
	    html += "<option value='CU'>Cushion</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_color' class='fancy form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='Yellow'>Yellow</option>";
	    html += "<option value='Pink'>Pink</option>";
	    html += "<option value='Green'>Green</option>";
	    html += "<option value='Red'>Red</option>";
	    html += "<option value='Blue'>Blue</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Certification</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_gia' class='grading_lab form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='GIA'>GIA</option>";
	    html += "<option value='HRD'>HRD</option>";
	    html += "<option value='IGI'>IGI</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Report No.</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += " <input id='ref' onblur='ref(this,$(this).val())' class='report_no form-control' value='' type='text' placeholder='000000'>";
	    html += "</div>";
	    html += "</div>";


	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Price</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += " <input onblur='total()' value='0.00' id='form_price' class='price form-control' type='text' placeholder='0.00'>";
	    html += "</div>";
	    html += "</div>";

	    html += "</div>";
	    html += "<div class='col-lg-5  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Carat Weight</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += " <input id='form_weight' class='carat form-control' type='text' value='0.00' placeholder='0.00'>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour Grade</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_colourGrade' class='color form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='D'>D</option>";
	    html += "<option value='E'>E</option>";
	    html += "<option value='F'>F</option>";
	    html += "<option value='G'>G</option>";
	    html += "<option value='H'>H</option>";
	    html += "<option value='I'>I</option>";
	    html += "<option value='J'>J</option>";
	    html += "<option value='K'>K</option>";
	    html += "<option value='L'>L</option>";
	    html += "<option value='M'>M</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Clarity Grade</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_clarity' class='clarity form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='FL'>FL</option>";
	    html += "<option value='IF'>IF</option>";
	    html += "<option value='VVS1'>VVS1</option>";
	    html += "<option value='VVS2'>VVS2</option>";
	    html += "<option value='VS1'>VS1</option>";
	    html += "<option value='VS2'>VS2</option>";
	    html += "<option value='SI1'>SI1</option>";
	    html += "<option value='SI2'>SI2</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Cut Grade</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_cutGrade' class='cut_grade form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='EX'>EX</option>";
	    html += "<option value='VG'>VG</option>";
	    html += "<option value='G'>G</option>";
	    html += "<option value='F'>F</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Polish</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_polish' class='polish form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='EX'>EX</option>";
	    html += "<option value='VG'>VG</option>";
	    html += "<option value='G'>G</option>";
	    html += "<option value='F'>F</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "<div class='form-group clearfix'>";
	    html += "<label class='col-sm-2 col-xs-3  control-label'>Symmetry</label>";
	    html += "<div class='col-sm-10 col-xs-9'>";
	    html += "<select id='form_symmetry' class='symmetry form-control'>";
	    html += "<option value='-'>-</option>";
	    html += "<option value='EX'>EX</option>";
	    html += "<option value='VG'>VG</option>";
	    html += "<option value='G'>G</option>";
	    html += "<option value='F'>F</option>";
	    html += "</select>";
	    html += "</div>";
	    html += "</div>";

	    html += "</div></div>";
	    
	    html +="<div class='jt-form clearfix'>\
	    <span class='addImg add-thr toggJew' onclick='toggJew(this);'></span>\
	    <div class='J_jtBox jt-box'>\
	    <div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>\
	    <div class='col-sm-10 col-xs-9'>\
	    <select id='form_jewerly' class='jewerly form-control'>\
	    <option value='Ring'>Ring</option><option value='Necklace'>Necklace</option><option value='Earring'>Earring</option><option value='Diamond Ring'>Diamond Ring</option><option value='Diamond Necklace'>Diamond Necklace</option><option value='Diamond Earring'>Diamond Earring</option>\
	    </select>\
	    </div></div><div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Price</label>\
	    <div class='col-sm-10 col-xs-9'> \
	    <input onblur='total()' class='jewerly_price form-control' id='form_price2' value='0.00' type='text' placeholder='0.00'>\
	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Material</label><div class='col-sm-10 col-xs-9'>\
	    <select id='form_material' class='material form-control'><option value='18K'>18K</option><option value='Pt'>Pt</option></select>\
	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
 	    <label class='col-sm-2 col-xs-3  control-label'>Color</label><div class='col-sm-10 col-xs-9'>\
 	    <select id='form_jew_color' class='jewerly_color form-control'><option value='White'>White</option><option value='Yellow'>Yellow</option><option value='Rose'>Rose</option></select>\
 	    </div></div></div></div>";
	 return html;  
}
function jewelryContent() {
	var html ="<div class='addApend clearfix dia'>\
		<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>\
		<div class='col-lg-1 pdNone returnData d-delete col-md-1 col-sm-12 col-xs-12'>\
		<span class='remove addImg' onclick='removeData(this)'></span>\
		</div></div></div>";
	html +="<div class='jt-form clearfix'>\
	    <div class='J_jtBox jt-box' style='display:block;'>\
	    <div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>\
	    <div class='col-sm-10 col-xs-9'>\
	    <select id='form_jewerly' class='jewerly form-control'>\
	    <option value='Ring'>Ring</option><option value='Necklace'>Necklace</option><option value='Earring'>Earring</option><option value='Diamond Ring'>Diamond Ring</option><option value='Diamond Necklace'>Diamond Necklace</option><option value='Diamond Earring'>Diamond Earring</option>\
	    </select>\
	    </div></div><div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Price</label>\
	    <div class='col-sm-10 col-xs-9'> \
	    <input onblur='total()' class='jewerly_price form-control' id='form_price2' value='0.00' type='text' placeholder='0.00'>\
	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
	    <label class='col-sm-2 col-xs-3  control-label'>Material</label><div class='col-sm-10 col-xs-9'>\
	    <select id='form_material' class='material form-control'><option value='18K'>18K</option><option value='Pt'>Pt</option></select>\
	    </div></div></div><div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>\
	    <div class='form-group clearfix'>\
 	    <label class='col-sm-2 col-xs-3  control-label'>Color</label><div class='col-sm-10 col-xs-9'>\
 	    <select id='form_jew_color' class='jewerly_color form-control'><option value='White'>White</option><option value='Yellow'>Yellow</option><option value='Rose'>Rose</option></select>\
 	    </div></div></div></div>";
    return html;
}
function invoiceNo(){
	var no = "";
	$.ajax({
        url:'../action.php?action=invoiceNo',
        type:'get',
        dataType:'json',
        async:false,
        success:function(data){
        	no = data;
        }
	});
	return no;
}

/**
 * 检测输入编号是否有信息
 * @param to
 * @param ref
 */
function ref(to,ref){
    var url = '../action.php?action=fetchDia&currency='+currency;
    var html = '';
    var price = '';
    $.ajax({
        url:url,
        type:'post',
        data:{ref:ref},
        dataType:'json',
        async:false,
        success:function(data){
        if(data){
        	var p = $(to).parents('.zj-form');
        	p.find(".shape option[value='"+data.shape+"']").prop("selected","selected");
        	p.find(".fancy option[value='"+data.fancy_color+"']").prop("selected","selected");
        	p.find(".grading_lab option[value='"+data.grading_lab+"']").prop("selected","selected");
        	p.find(".price").val(data.retail_price); 
        	p.find(".carat").val(data.carat); 
        	p.find(".color option[value='"+data.color+"']").prop("selected","selected");
        	p.find(".clarity option[value='"+data.clarity+"']").prop("selected","selected");
        	p.find(".cut_grade option[value='"+data.cut_grade+"']").prop("selected","selected");
        	p.find(".polish option[value='"+data.polish+"']").prop("selected","selected");
        	p.find(".symmetry option[value='"+data.symmetry+"']").prop("selected","selected");
        }
    }})
    total();
}
/*汇率转换*/
$(".currency img").click(function () {
    $(this).addClass("selected").siblings().removeClass("selected");
})
function currencyRate(to) {
	var totals = 0;
	if(to!=currency){
		$.ajaxSetup({  
		    async : false  
		});
		$.get('../action.php?action=currencyRate',{from:currency,to:to},function(rate){
	        $('.price').each(function(){
	            $(this).val(($(this).val()*rate).toFixed(2));
	        })
	        $('.jewerly_price').each(function(){
	        	$(this).val(($(this).val()*rate).toFixed(2));
	        })
	    })
    }
	if(to=='CNY'){
		currencyHint = '￥';
	}else if(to=='EUR'){
		currencyHint = '€';
	}else if(to=='USD'){
		currencyHint = '$';
	}
	currency=to;
	total();
}
/**
 * 求和
 */
function  total(){
    var totals = 0;
    $('.price').each(function(){
    	totals += Number($(this).val())
    })
    $('.jewerly_price').each(function(){
        totals += Number($(this).val())
    })
    var vat = (totals*0.21).toFixed(2);
    $('.vat_price').html(currencyHint+vat)
    $('.vat_price').attr('data-price',vat)
    $('.total_price').html(currencyHint+totals)
    $('.total_price').attr('data-price',totals)
}
function  total_invoice(){
    var totals = 0;
    $('.price').each(function(){
        totals += Number($(this).val())
    })
    $('.jewerly_price').each(function(){
        totals += Number($(this).val())
    })
    var vat = (totals*0.21).toFixed(2);
    $('.vat_price').html(currencyHint+vat)
    $('.vat_price').attr('data-price',vat)
    $('.total_price').html(currencyHint+((Number(totals)+Number(vat))).toFixed(2))
    $('.total_price').attr('data-price',((Number(totals)+Number(vat))).toFixed(2))
}
function  total_receipt(){
    var totals = 0;
    $('.price').each(function(){
        totals += Number($(this).val())
    })
    $('.jewerly_price').each(function(){
        totals += Number($(this).val())
    })
    var vat = (totals*0.21).toFixed(2);
    $('.vat_price').html(currencyHint+vat)
    $('.vat_price').attr('data-price',vat)
    $('.total_price').html(currencyHint+(Number(totals)))
    $('.total_price').attr('data-price',Number(totals))
}
