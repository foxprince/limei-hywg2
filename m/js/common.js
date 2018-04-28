var utils = {
    config:{
        apiDomain:'http://www.shianca.com:9009',
        allowAjax: true,
        loadingMsg: '数据载入中',
        timer : 60,
        clearInterval: null
    },
    init: function () {
        //绑定菜单事件
        $(".fixHeader > label").click(function () {
            if ($("aside").css("right") == "-100px")
                $("aside").animate({right:0});
            else
                $("aside").animate({right:-100});
        })
    },
    comHtml:function(index){
        var html = '<div class="asideMenu hide"><div class="opacity"></div><aside>';
        html += '<a href="index.html">加入LUMIA</a>';
        html += '<a href="prodlist.html">首页</a>';
        html += '<dl><dt><a href="prodlist.html">品牌文化</a></dt><dd class="hide">';
        html += '<a href="prodlist.html">品牌故事</a>';
        html += '<a href="prodlist.html">利美优势</a>';
        html += '<a href="prodlist.html">媒体报道</a>';
        html += '<a href="prodlist.html">购买指南</a>';
        html += '<a href="prodlist.html">钻石知识</a>';
        html +='</dd></dl>';
        html += '<a href="prodlist.html">首饰</a>';
        html += '<a href="prodlist.html">裸钻</a>';
        html += '<a href="prodlist.html">社区</a>';
        html += '<a href="prodlist.html">联系我们</a>';
        html += '<a href="prodlist.html">购物车</a>';
        html += '</aside></div>';
        
        document.writeln(html);
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return '';
    },
    isNull:function(o,dev){
        return o == null ? (dev != undefined ? dev : '') : '';
    },
    bottomPup: function (data) {
        var html = '';
        if (typeof data.title != 'undefined')
            html += '<div class="title fontSize16">' + data.title + '</div>'
        if (typeof data.list != 'undefined') {
            for (var o in data.list) {
                html += '<p onclick="' + data.list[o].fun + '(this)" ';

                for (var a in data.list[o].args) {
                    html += ' data-' + a + '="' + data.list[o].args[a] + '"'
                }

                html += '>' + data.list[o].title + '</p>';
            }
        }
        html += '<p class="cancel" onclick="layer.close(pop)">取消</p>';

        pop = layer.open({
            type: 1,
            title:false,
            skin: 'bottomPup', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            offset:'b',
            shadeClose: false,
            maxWidth:$(window).width(),
            content: '<div class="pup">' + html + '</div>'
        });
    },
    ajaxPost: function (url, config, cb, compcb) {
        config.isSyn = config.isSyn || false;
        config.isLoading = config.isLoading || false;
        if (config.isSyn == true) {
            if (this.config.allowAjax == false)
                return;
            this.config.allowAjax = false;
        }
        config.method = config.method || 'post';
        config.dataType = config.dataType || 'jsonp';
        config.data = config.data || '';

        var tip;
        if (config.isLoading == true)
            tip = layer.load(1, { shade: [0.3, '#000'], time: 9999999, maxWidth: 50 });

        if (url.indexOf('http') != 0)
            url = this.config.apiDomain + url;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: config.method,
            url: url,
            data: config.data,
            dataType: config.dataType,
            error: function (a) {
                //alert(JSON.stringify(a))
            },
            complete: function (xhr) {
                if (config.isSyn == true) {
                    utils.config.allowAjax = true;
                }
                if (config.isLoading == true)
                    layer.close(tip);

                typeof compcb == "function" && compcb(xhr.status);
            },
            success: function (data, status) {
                typeof cb == "function" && cb(data);
            }
        })
        return false;
    },
    getOpenId : function(){
        var openid = this.getQueryString('openId');
        if (openid == '') {
            openid = localStorage.getItem('cya_openId');
        } else {
            localStorage.setItem('cya_openId', openid);
        }
        return openid;
    },
    msg: function (msg, icon) {
        icon = icon || 6;
        layer.alert(msg, { icon: icon, title: '提示', closeBtn: false, shade: [0.3, '#000'], shadeClose: true })
    },
    msgJump: function (msg, url, icon) {
        url = url || location.href;
        icon = icon || 6;
        layer.alert(msg, { icon: icon, title: '提示', shadeClose: false, closeBtn: false, shade: [0.3, '#000'] }, function () {
            location.href = url;
        })
    },
    sendCode : function(o) {
        var self = $(o);
        if (!self.hasClass("disabled")) {
            var phone = $("#phone").val();
            var reg = /^1[3|5|7|8|4][0-9]{9}$/;
            if (!reg.test(phone)) {
                this.msg('请输入正确的手机号码',5);
            } else {
                self.addClass('disabled');
                self.val(this.config.timer);
                this.config.clearInterval = setInterval(this.timer_Elapsed, 1000);

                this.ajaxPost("/api/sms/code", { data: { mobile: phone } })
            }
        }
    },
    timer_Elapsed: function () {
        utils.config.timer--;
        var self = $(".getcode");
        self.text('等待'+utils.config.timer+'秒');
        if (utils.config.timer <= 0) {
            utils.config.timer = 60;
            clearInterval(utils.config.clearInterval);
            self.removeClass('disabled');
            self.text("重新发送");
        }
    }
}

$(function () {
    $(".fix_nav").click(function () {
        $(".asideMenu").show();
    })
    $(".asideMenu .opacity").click(function () {
        $(".asideMenu").hide();
    })
})