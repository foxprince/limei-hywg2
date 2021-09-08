
function getPage(page = 0) {
    let params = '?page=' + page + '&size=20&visiable=1&status=AVAILABLE'
    // 排序
    params += '&sort=' + sortFiled + ',' + sortType

    // 形状
    if (shapeVal.length > 0) {
        params += '&shape=' + shapeVal
    }
    // 彩钻
    if (fancyColorVal.length > 0) {
        params += '&fancyColor=' + fancyColorVal
    }
    // 重量
    if (caratVal.length > 0) {
        // params += 'carat=' + caratVal[0] + "&carat=" + caratVal[1]
        params = handleParams(params, ['carat', caratVal])
    }
    // 切工
    if (cutVal.length > 0) {
        params += '&cutGrade=' + cutVal
    }
    // 价格
    var priceradioVal = $('.priceradio').sfcheckbox('getVal')
    if (priceVal.length > 0) {
        // params += "retailPrice=" + priceVal[0] + "&retailPrice=" + priceVal[1]
        let price = ''
        switch (priceradioVal) {
            case '1':
                price = 'retailPrice';
                break;
            case '2':
                price = 'retailEurPrice';
                break;
            case '3':
                price = 'retailCnyPrice';
                break;
        }
        params = handleParams(params, [price, priceVal])
    }
    // 颜色
    if (colorVal.length > 0) {
        params += '&color=' + colorVal
    }
    // 净度
    if (clarityVal.length > 0) {
        params += '&clarity=' + clarityVal
    }

    // 证书
    if (gradingLabVal.length > 0) {
        params += '&gradingLab=' + gradingLabVal
    }

    // 证书搜索
    if (searchVal) {
        params += '&certificateNumber=' + searchVal
    }

    // 荧光强度
    if (fluorescenceVal.length > 0) {
        params += '&fluorescenceIntensity=' + fluorescenceVal
    }

    // 对称
    if (symmetryVal.length > 0) {
        params += '&symmetry=' + symmetryVal
    }

    // 抛光
    if (polishVal.length > 0) {
        params += '&polish=' + polishVal
    }

    utils.ajaxPost("rest/diamonds" + params, { isAsyn: true,isLoading: true,type: 'get' }, function (data) {
        utils.config.isScrolling = false;
        console.log('data', data)

        // 分頁
        $("#pager").zPager({
            totalData: data.page.totalElements,
            current: data.page.number + 1,
            btnShow: true,
            ajaxSetData: false
        });

        $('.total .val').html(data.page.totalElements);

        handleTable(data._embedded.diamonds, {
            priceradio: priceradioVal
        })
    })
}
// handler
function handleParams(params, filter) {
    params = params ? params + '&' : params
    return params + filter[0] + '=' + filter[1][0] + '&' + filter[0] + '=' + filter[1][1]
}
function handleTable(data, params) {
    let html = ''
    for (let i of data) {
        // 01.Round Brilliant, 圆形，参数：BR
        // 02.Pear , 水滴形，参数：PS
        // 03，Princess, 公主方，参数：PR
        // 04,Heart, 心形，参数：HS
        // 05, Marquise,马眼形， 参数：MQ
        // 06，Oval, 椭圆形，参数：OV
        // 07,Emerald, 祖母绿形，参数：EM
        // 08，radiant, 雷电形，参数：RAD
        // 09，cushion, 垫形，参数：CU
        switch (i.shape) {
            case 'BR':
                i.img = 'demone4';
                i.shapeLabel = 'Round Brilliant'
                break;
            case 'PS':
                i.img = 'demone7';
                i.shapeLabel = 'Pear'
                break;
            case 'PR':
                i.img = 'demone5';
                i.shapeLabel = 'Princess'
                break;
            case 'HS':
                i.img = 'demone1';
                i.shapeLabel = 'Heart'
                break;
            case 'MQ':
                i.img = 'demone2';
                i.shapeLabel = 'Marquise'
                break;
            case 'OV':
                i.img = 'demone4';
                i.shapeLabel = 'Oval'
                break;
            case 'EM':
                i.img = 'demone3';
                i.shapeLabel = 'Emerald'
                break;
            case 'RAD':
                i.img = 'demone4';
                i.shapeLabel = 'Radiant'
                break;
            case 'CU':
                i.img = 'demone6';
                i.shapeLabel = 'Cushion'
                break;
        }

        let price = ''
        switch (params.priceradio) {
            case '1':
                price = '$ ' + i.retailPrice;
            case '2':
                price = '€ ' + i.retailEurPrice;
            case '3':
                price = '￥ ' + i.retailCnyPrice;
        }

        html += `<li class="table_item">
                    <span><img src="../../image/homePage/${i.img}.png" ></span>
                    <span>${i.carat}</span>
                    <span>${i.color}</span>
                    <span>${i.clarity}</span>
                    <span>${i.cutGrade}</span>
                    <span>${i.polish}</span>
                    <span>${i.symmetry}</span>
                    <span>${i.gradingLab}</span>
                    <span>${price}</span>
                    <span class="show_details" value="${i.id}">DETAILS</span>
			</li>`
    }
    // 写入列表
    $("ul.table_list_box").empty().append(html)

    var detail = '';
    // 详情弹窗
    $('.table_item .show_details').on('click', function(e){
        let v = data.find(function(item) {
            return item.id.toString() === $(this).attr('value')
        }, $(this))

        if (v) {
            detail = v;
            $('.detail_dialog .item_wrap .shape').html(v.shapeLabel);
            $('.detail_dialog .item_wrap .carat').html(v.carat);
            $('.detail_dialog .item_wrap .colour').html(v.color);
            $('.detail_dialog .item_wrap .clarity').html(v.clarity);
            $('.detail_dialog .item_wrap .cutGrade').html(v.cutGrade);
            $('.detail_dialog .item_wrap .polish').html(v.polish);
            $('.detail_dialog .item_wrap .symmetry').html(v.symmetry);
            $('.detail_dialog .item_wrap .certificate').html(v.gradingLab);
            $('.detail_dialog .item_wrap .fluorescence').html(v.fluorescenceIntensity);
            $('.detail_dialog .item_wrap .certificateNumber').html(v.certificateNumber);
            $('.detail_dialog .item_wrap .country').html(v.country);
            $('.detail_dialog .item_wrap .stockRef').html(v.stockRef);
            $('.detail_dialog .select_wrap label').attr('priceU', v.retailPrice).attr('priceE', v.retailEurPrice).attr('priceC', v.retailCnyPrice);
        }
        onDetailSelectChange()

        if(utils.getCookie('send_jewelry')) {$('#add_jewelry').remove();}
        else{$('#online').remove();}
        $('.detail_dialog').fadeIn()
    })
    $('.detail_dialog .close').on('click', function(){
        $('.detail_dialog').fadeOut()
    })
    $('.detail_dialog .select_choose').change(function(v, e) {
        onDetailSelectChange()
    })
    // 详情页-价格单位筛选
    function onDetailSelectChange() {
        let priceSelect = $('.detail_dialog .select_choose').val();
        if (priceSelect === '1') {
            $('.detail_dialog .select_wrap label').html($('.detail_dialog .select_wrap label').attr('priceU'))
        } else if (priceSelect === '2') {
            $('.detail_dialog .select_wrap label').html($('.detail_dialog .select_wrap label').attr('priceE'))
        } else if (priceSelect === '3') {
            $('.detail_dialog .select_wrap label').html($('.detail_dialog .select_wrap label').attr('priceC'))
        }
    }

    $('#add_shopping').click(function() {
        console.log('detail', detail)
        utils.setCookie('send_diamond', JSON.stringify(detail), 24 + 365 * 100);

        location.href = '../contactUs/home.html';
    })
    $('#add_jewelry').click(function() {
        console.log('detail', detail)
        utils.setCookie('send_diamond', JSON.stringify(detail), 24 + 365 * 100);

        location.href = '../jewellery/chooseJewel.html';
    })

        $('#online').click(function() {
            console.log('detail', detail)
            utils.setCookie('send_diamond', JSON.stringify(detail), 24);

            location.href = '../shoppingCar/appointment.html';
        })
        $('#add_jewelry').click(function() {
            console.log('detail', detail)
            utils.setCookie('send_diamond', JSON.stringify(detail), 24);
            location.href = '../jewellery/chooseJewel.html';
        })
}

(function(){
    getPage()
})()
