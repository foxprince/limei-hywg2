
function getPage(page = 0) {
    let params = '?page=' + page + '&size=20'

    // 彩色
    if (colorTypeVal) {
        params += '&colorType=' + colorTypeVal
    }

    // 价格
    var priceradioVal = $('.priceradio').sfcheckbox('getVal')
    if (priceVal.length > 0) {
        let price = ''
        switch (priceradioVal) {
            case '1':
                price = 'usdPrice';
                break;
            case '2':
                price = 'eurPrice';
                break;
            case '3':
                price = 'cnyPrice';
                break;
        }
        params = handleParams(params, [price, priceVal])
    }
    // 分类
    if (categoryVal.length > 0) {
        params += '&category=' + categoryVal
    }


    utils.ajaxPost("rest/jewelries" + params, { isAsyn: true,isLoading: true,type: 'get' }, function (data) {
        utils.config.isScrolling = false;
        console.log('data', data)

        // 分頁
        $("#pager").zPager({
            totalData: data.page.totalElements,
            current: data.page.number + 1,
            btnShow: true,
            ajaxSetData: false
        });

        handleTable(data._embedded.jewelries, {
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

        let price = ''
        switch (params.priceradio) {
            case '1':
                price = '$ ' + i.usdPrice;
            case '2':
                price = '€ ' + i.eurPrice;
            case '3':
                price = '￥ ' + i.cnyPrice;
        }
        // let local = 'http://www.lumiagem.com'
        html += `<li value="${i.id}">
                    <a href="javascript:;">
                        <img src="../../image/header/heart_n.png">
                        <img src="http://www.lumiagem.com/images/sitepictures/thumbs/${i.image1}" alt="">
                    </a>
                </li>`
    }
    $("ul.products").empty().append(html)

    var detail = '';
    // 详情弹窗
    $('.products li').on('click', function(e){
        let v = data.find(function(item) {
            return item.id.toString() === $(this).attr('value')
        }, $(this))

        if (v) {
            detail = v;
            $('.detail_dialog .detail_title .nameEn').html(v.nameEn);

            if (v.price === '咨询客服') {
                $('.price_select').fadeOut();
                $('.price_ask').fadeIn();
            } else {
                $('.detail_dialog .price_select .price').html(v.price);
                $('.price_select').fadeIn();
                $('.price_ask').fadeOut();
            }

            let swiper_slide = `
                <div class="swiper-slide"><img src="http://www.lumiagem.com/images/sitepictures/${v.image1}" alt=""></div>
                `
            if (v.image2) {
                swiper_slide += `<div class="swiper-slide"><img src="http://www.lumiagem.com/images/sitepictures/${v.image2}" alt=""></div>`
            }
            if (v.image3) {
                swiper_slide += `<div class="swiper-slide"><img src="http://www.lumiagem.com/images/sitepictures/${v.image3}" alt=""></div>`
            }
            if (v.image4) {
                swiper_slide += `<div class="swiper-slide"><img src="http://www.lumiagem.com/images/sitepictures/${v.image4}" alt=""></div>`
            }
            if (v.image5) {
                swiper_slide += `<div class="swiper-slide"><img src="http://www.lumiagem.com/images/sitepictures/${v.image5}" alt=""></div>`
            }

            $('.detail_dialog .swiper-wrapper').html(swiper_slide);

            $('.detail_dialog').fadeIn()
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true, // 循环模式选项
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            if(utils.getCookie('send_diamond')){$('.selectdiamond').remove();}
            else{$('.online').remove();}
        }

    })
    $('.detail_dialog .close').on('click', function(){
        $('.detail_dialog').fadeOut()
    })

    $('.selectdiamond').click(function() {
        console.log('detail', detail)
        detail.material = $('.detail_dialog .material_select').val();
        detail.size = $('.detail_dialog .size_select').val();

        utils.setCookie('send_jewelry', JSON.stringify(detail), 24 + 365 * 100);

        location.href = '../diamond/selectDiamond.html';
    })
}

(function(){
    getPage()
})()
