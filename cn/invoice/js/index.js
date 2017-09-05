
function to_name(e){
    $('#to_name').html(e)
}
function to_port(e){
    $('#to_port').html(e)
}
function to_address(e){
    //$('#to_address').html(e)
}
function to_city(e){
    //$('#to_city').html(e)
}
function to_code(e){
    //$('#to_code').html(e)
}
function to_country(e){
    //$('#to_country').html(e)
}

function to_print(){
    var countCont = $('.addContent').children('.addApend').length;
    var html = '';
    var address = $('#street').val()+'　'+$('#postcode').val()+'　'+$('#city').val()+'　'+$('#country').val()
    $('#to_address').html(address)
    $('.del_items').remove();
    for (var i = 0 ;i<countCont; i++){
        html += '<div class="del_items items clearfix">'+
                '<div class="col-xs-3 clearfix">'+
                '<p id="model">'+$(".addApend").eq(i).find("#form_model").find("option:selected").val()+'</p>'+
                '<p>Carat Weight <span class="pull-right">'+$(".addApend").eq(i).find("#form_weight").val()+'</span></p>'+
                '<p>Colour Grade <span class="pull-right">'+$(".addApend").eq(i).find('#form_colourGrade').find('option:selected').val()+'</span></p>'+
                '<p>Clarity Grade <span class="pull-right">'+$(".addApend").eq(i).find('#form_clarity').find('option:selected').val()+'</span></p>'+
                '<p>'+$(".addApend").eq(i).find('#form_jewerly').find('option:selected').val()+' White Gold '+$(".addApend").eq(i).find('#form_material').find('option:selected').val()+'</p>'+

                '</div>'+
                '<div class="col-xs-3 clearfix">'+
                '<p>'+$(".addApend").eq(i).find('#form_gia').find('option:selected').val()+'</p>'+
                '<p>Cut Grade <span class="pull-right">'+$(".addApend").eq(i).find('#form_cutGrade').find('option:selected').val()+'</span></p>'+
                '<p>Polish <span class="pull-right">'+$(".addApend").eq(i).find('#form_polish').find('option:selected').val()+'</span></p>'+
                '<p>Symmetry<span class="pull-right">'+$(".addApend").eq(i).find('#form_symmetry').find('option:selected').val()+'</span></p>'+
                '</div>'+
                '<div class="col-xs-3 clearfix">'+
                '<p>'+$(".addApend").eq(i).find('#form_color').find('option:selected').val()+'</p>'+
                '<p>　</p><p>　</p><p>　</p><p>€'+$(".addApend").eq(i).find("#form_price2").val()+'</p>'+
                '</div>'+
                '<div class="col-xs-3 clearfix">'+
                '<p>€'+$(".addApend").eq(i).find("#form_price").val()+'</p>'+
                '</div></div>';
    }
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
    $(data).parents('.addApend').remove();
    total();
}



$(function () {
    //html内容
    var content = ht();

    /*add list*/
    var clickCount = 0;
    var add = $('.activeAdd');
    var addContent = $('.addContent');
    add.click(function () {
        clickCount++;
        if (addContent.html() != "") {
            /*搞了好一会 才搞定*/
        } else {
            addContent.html(content);
        }
        //console.log(clickCount);
        var appendDate = $('.addApend').eq(0);
        if (clickCount > 1) {
            addContent.append(content);
        }

    });
    /*减号*/
    var time = new Date();
    var to_time = String(time.getFullYear())+String(PrefixInteger(time.getMonth()+1))+String(PrefixInteger(time.getDate()));
    $('.to_time').html('DATE：  '+ to_time);
    $('.to_invoice').html('INVOICE：  '+ to_time);
});


//补零
function PrefixInteger(num) {
    return ( "0000000000000000" + num ).substr(-2);
}

/**
 * 保存信息
 */
function saves(){
    var data = {
        'name':$('#name').val(),
        'passport':$('#passport').val(),
        'street':$('#street').val(),
        'city':$('#city').val(),
        'postcode':$('#postcode').val(),
        'country':$('#country').val(),
        'json_list':[]
        };
    var countCont = $('.addContent').children('.addApend').length;
    for (var i = 0 ;i<countCont; i++){
        data.json_list.push({
            'report_no':$('.addApend').eq(i).find('.report_no').val(),
            'shape':$('.addApend').eq(i).find('.shape').find('option:selected').val(),
            'carat':$('.addApend').eq(i).find('.carat').val(),
            'color':$('.addApend').eq(i).find('.color').find('option:selected').val(),
            'fancy':$('.addApend').eq(i).find('.fancy').find('option:selected').val(),
            'clarity':$('.addApend').eq(i).find('.clarity').find('option:selected').val(),
            'grading_lab':$('.addApend').eq(i).find('.grading_lab').find('option:selected').val(),
            'cut_grade':$('.addApend').eq(i).find('.cut_grade').find('option:selected').val(),
            'polish':$('.addApend').eq(i).find('.polish').find('option:selected').val(),
            'symmetry':$('.addApend').eq(i).find('.symmetry').find('option:selected').val(),
            'price':$('.addApend').eq(i).find('.price').val(),
            'jewerly':$('.addApend').eq(i).find('.jewerly').find('option:selected').val(),
            'material':$('.addApend').eq(i).find('.material').find('option:selected').val(),
            'jewerly_price':$('.addApend').eq(i).find('.jewerly_price').val(),
            'vat_price':$('.vat_price').attr('data-price'),
            'total_price':$('.total_price').attr('data-price'),
        });
    }
    if(data){
        var url = "service.php";
        $.post(url,{data:data},function(data){
            if(data == 1){
                alert('保存成功')
            }else{
                alert('网络错误，请检查信息并重试')
            }
        },'json')
    }
}

/**
 * 拼接内容html
 * @returns {string}
 */
function ht(){
    var html = "";
    html += "<div class='addApend clearfix'>";
    html += "<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>";
    html += "<span class='delete addImg' onclick='deleteDate(this)'></span>";

    /*jianhao */
    html += "<div class='delete-content'>";
    html += "<div class='col-lg-1 pdNone returnData col-md-1 col-sm-12 col-xs-12'>";
    html += "<span class='return addImg' onclick='returnData(this)'></span>";
    html += "</div>";

    html += "<div class='col-lg-1 pdNone returnData col-md-1 col-sm-12 col-xs-12'>";
    html += "<span class='remove addImg' onclick='removeData(this)'></span>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";
    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Model</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += "<select id='form_model' class='shape form-control'>";
    html += "<option value='Round Brilliant'>Round Brilliant</option>";
    html += "<option value='Pear'>Pear</option>";
    html += "<option value='Princess'>Princess</option>";
    html += "<option value='Heart'>Heart</option>";
    html += "<option value='Marquise'>Marquise</option>";
    html += "<option value='Oval'>Oval</option>";
    html += "<option value='Emerald'>Emerald</option>";
    html += "<option value='Radiant'>Radiant</option>";
    html += "<option value='Cushion'>Cushion</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";


    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += "<select id='form_color' class='fancy form-control'>";
    html += "<option value=''></option>";
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
    html += " <input onblur='total()' value='' id='form_price' class='price form-control' type='text' placeholder='0.00'>";
    html += "</div>";
    html += "</div>";

    html += "</div>";
    html += "<div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";

    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Carat Weight</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += " <input id='form_weight' class='carat form-control' type='text' placeholder='0.00'>";
    html += "</div>";
    html += "</div>";

    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Colour Grade</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += "<select id='form_colourGrade' class='color form-control'>";
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
    html += "<option value='EX'>EX</option>";
    html += "<option value='VG'>VG</option>";
    html += "<option value='G'>G</option>";
    html += "<option value='F'>F</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";

    html += "</div>";
    /*边线*/
    html += "<div class='col-lg-9 col-lg-offset-2 col-md-offset-2 pdNone col-md-9  formBorder  col-sm-12 col-xs-12'></div>";
    html += "<div class='col-lg-4 col-lg-offset-2 col-md-offset-2 pdNone col-md-4    col-sm-12 col-xs-12'>";


    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += "<select id='form_jewerly' class='jewerly form-control'>";
    html += "<option value='Ring'>Ring</option>";
    html += "<option value='Necklace'>Necklace</option>";
    html += "<option value='Earring'>Earring</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";


    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Price</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += " <input onblur='total()' class='jewerly_price form-control' id='form_price2' value='' type='text' placeholder='0.00'>";
    html += "</div>";
    html += "</div>";

    html += "</div>";

    html += "<div class='col-lg-4 col-lg-offset-1 col-md-offset-1 pdNone col-md-4    col-sm-12 col-xs-12'>";


    html += "<div class='form-group clearfix'>";
    html += "<label class='col-sm-2 col-xs-3  control-label'>Material</label>";
    html += "<div class='col-sm-10 col-xs-9'>";
    html += "<select id='form_material' class='material form-control'>";
    html += "<option value='Pt'>Pt</option>";
    html += "<option value='18K'>18K</option>";
    html += "</select>";
    html += "</div>";
    html += "</div>";

    html += "</div>";

    html += "</div>";
    return html;
}

/**
 * 检测输入编号是否有信息
 * @param to
 * @param ref
 */
function ref(to,ref){
    var url = 'service.php';
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
            html += "<div class='col-lg-1 pdNone col-md-1 col-sm-12 col-xs-12'>";
            html += "<span class='delete addImg' onclick='deleteDate(this)'></span>";

            /*jianhao */
            html += "<div class='delete-content'>";
            html += "<div class='col-lg-1 pdNone returnData col-md-1 col-sm-12 col-xs-12'>";
            html += "<span class='return addImg' onclick='returnData(this)'></span>";
            html += "</div>";

            html += "<div class='col-lg-1 pdNone returnData col-md-1 col-sm-12 col-xs-12'>";
            html += "<span class='remove addImg' onclick='removeData(this)'></span>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";
            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Model</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_model' class='shape form-control' disabled>";
            html += "<option value='"+data.shape+"'>"+data.shape+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Colour</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_color' class='fancy form-control' disabled>";
            html += "<option value='"+data.fancy_color+"'>"+data.fancy_color+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Certification</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_gia' class='grading_lab form-control' disabled>";
            html += "<option value='"+data.grading_lab+"'>"+data.grading_lab+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Report No.</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += " <input id='ref' onblur='ref($(this).val())' class='report_no form-control' disabled value='"+ref+"' type='text' placeholder='000000'>";
            html += "</div>";
            html += "</div>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Price</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += " <input class='price form-control' disabled type='text' value='"+data.retail_price+"' placeholder='0.00'>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-lg-4  col-md-offset-1 pdNone col-md-4   col-sm-12 col-xs-12'>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Carat Weight</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += " <input id='form_weight' class='carat form-control' disabled type='text' disabled placeholder='0.00' value='"+data.carat+"'>";
            html += "</div>";
            html += "</div>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Colour Grade</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_colourGrade' disabled class='color form-control'>";
            html += "<option value='"+data.color+"'>"+data.color+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Clarity Grade</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_clarity' disabled class='clarity form-control'>";
            html += "<option value='"+data.clarity+"'>"+data.clarity+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Cut Grade</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_cutGrade' disabled class='cut_grade form-control'>";
            html += "<option value='"+data.cut_grade+"'>"+data.cut_grade+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Polish</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_polish' disabled class='polish form-control'>";
            html += "<option value='"+data.polish+"'>"+data.polish+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Symmetry</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_symmetry' disabled class='symmetry form-control'>";
            html += "<option value='"+data.symmetry+"'>"+data.symmetry+"</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";

            html += "</div>";
            /*边线*/
            html += "<div class='col-lg-9 col-lg-offset-2 col-md-offset-2 pdNone col-md-9  formBorder  col-sm-12 col-xs-12'></div>";
            html += "<div class='col-lg-4 col-lg-offset-2 col-md-offset-2 pdNone col-md-4    col-sm-12 col-xs-12'>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Jewelry</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_jewerly' class='jewerly form-control'>";
            html += "<option value='Ring'>Ring</option>";
            html += "<option value='Necklace'>Necklace</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";

            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Price</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += " <input onblur='total()' value='' id='form_price2' class='jewerly_price form-control' type='text' placeholder='0.00'>";
            html += "</div>";
            html += "</div>";

            html += "</div>";

            html += "<div class='col-lg-4 col-lg-offset-1 col-md-offset-1 pdNone col-md-4    col-sm-12 col-xs-12'>";


            html += "<div class='form-group clearfix'>";
            html += "<label class='col-sm-2 col-xs-3  control-label'>Material</label>";
            html += "<div class='col-sm-10 col-xs-9'>";
            html += "<select id='form_material' class='material form-control'>";
            html += "<option value='Pt'>Pt</option>";
            html += "<option value='18K'>18K</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }
    }})
    if(html){
        $(to).parents('.addApend').html(html)
        total()
    }

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
    $('.vat_price').html('€'+vat)
    $('.vat_price').attr('data-price',vat)
    $('.total_price').html('€'+Number(totals)+Number(vat))
    $('.total_price').attr('data-price',Number(totals)+Number(vat))
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
    //$('.vat_price').html('€'+vat)
    //$('.vat_price').attr('data-price',vat)
    //$('.total_price').html('€'+totals)
    $('.total_price').attr('data-price',Number(totals)+Number(vat))
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
    //$('.vat_price').html('€'+vat)
    $('.vat_price').attr('data-price',vat)
    //$('.total_price').html('€'+totals)
    $('.total_price').attr('data-price',Number(totals)+Number(vat))
}
