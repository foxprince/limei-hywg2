var utils = {
    config:{
        // apiUrl:'https://49.4.8.16/',
        //apiUrl:'http://114.115.178.232:30000/',
        apiUrl:'/',
        allowAjax:true,
        customerAccount:'',
        keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        identifyType: ['二代身份证', '护照', '营业执照', '一代身份证', '临时身份证', '回乡证', '台胞证', '港澳身份证', '台湾身份证', '其他（个人）', '组织结构代码'],
        node: [
            {
                id: "5",
                name: "郑州电信"
            },
            {
                id: "9",
                name: "长春电信"
            },
            {
                id: "13",
                name: "武汉电信"
            },
            {
                id: "15",
                name: "海口电信"
            },
            {
                id: "16",
                name: "西藏电信"
            },
            {
                id: "18",
                name: "西宁电信"
            },
            {
                id: "19",
                name: "新疆电信"
            },
            {
                id: "21",
                name: "南京电信"
            },
            {
                id: "23",
                name: "南宁电信"
            },
            {
                id: "27",
                name: "太原电信"
            },
            {
                id: "30",
                name: "兰州电信"
            },
            {
                id: "31",
                name: "大连电信"
            },
            {
                id: "43",
                name: "蚌埠电信"
            },
            {
                id: "44",
                name: "重庆电信"
            },
            {
                id: "48",
                name: "济南电信"
            },
            {
                id: "63",
                name: "宿迁电信"
            },
            {
                id: "49",
                name: "天津电信"
            },
            {
                id: "60",
                name: "无锡电信"
            },
            {
                id: "90",
                name: "CHN_ZJningbo_CT1"
            },
            {
                id: "71",
                name: "CHN_BJ_CT1"
            },
            {
                id: "88",
                name: "CHN_ZJwenzhou_CT1"
            },
            {
                id: "95",
                name: "CHN_JXjiujiang_CT1"
            },
            {
                id: "72",
                name: "CHN_GZguiyang_CT1"
            },
            {
                id: "77",
                name: "CHN_FJfuzhou_CT1"
            }
        ],
        billingModel: [
            { id: 1, name: '流量计费', desc: '后付费按日结算，按照每日实际使用的流量进行计费。', update: '新的计费模式将在次日零点生效。' },
            { id: 2, name: '峰值带宽计费', desc: '后付费按日结算，按照每日峰值带宽进行计费，系统每5分钟统计1个峰值带宽，每日得到288个值，取其中的最大值作为计费带宽。', update: '新的计费模式将在次日零点生效。' },
            { id: 3, name: '月结95带宽峰值计费', desc: '后付费按月结算，在一个自然月内，将每个有效日的所有峰值带宽的统计点进行排序，去掉数值最高的5%的统计点，取剩下的数值最高统计点，该点就是95峰值的计费点。', update: '新的计费模式将在次月1日零点生效。' },
            { id: 4, name: '日峰值月平均计费', desc: '后付费按月结算，在一个自然月内，对所有有效日的最大峰值带宽求和取平均，获得当月的计费带宽，再根据合同约定的单价计费。', update: '新的计费模式将在次月1日零点生效。' },
        ],
        isps: [
            {
                id: "298cdd7edd0c9f3142f5f3aa65ae1ff9",
                name: "电信"
            },
            {
                id: "ccdb267e3e22be652da1bd2d1d439e8d",
                name: "移动"
            },
            {
                id: "a9158cbb80deac8320fa43439b3e5357",
                name: "联通"
            },
            {
                id: "0e02da33ca2e41555a2124a137665c83",
                name: "教育网"
            },
            {
                id: "aa22afdc01153c086d3429c82194ebe8",
                name: "鹏博士"
            },
            {
                id: "453f63be65a07caf34b966f28e5fd7a8",
                name: "铁通"
            },
            {
                id: "a3a4da9d3c1bd1989714f9b3827ea741",
                name: "方正宽带"
            },
            {
                id: "cd2fed00b1d1c51d193b8cf3df7b976c",
                name: "科技网"
            },
            {
                id: "7e5f9b318fb4cd3b52f9ff68456f6694",
                name: "天地祥云"
            },
            {
                id: "5647fd9d0e3ec48eb1338af56104b8d8",
                name: "光环新网"
            },
            {
                id: "2e448941ce3b1a8966ce0527e58a0c39",
                name: "歌华有线"
            },
            {
                id: "6722341276a6f3ae7268862db0be8362",
                name: "陕西广电"
            },
            {
                id: "5f5d1e868c8daa8fe03956a99f5460ba",
                name: "珠江宽频"
            },
            {
                id: "bade84bc4d0b60da455692d48c935efe",
                name: "山东云网"
            },
            {
                id: "cd0fb88b5c935ab0cd81c54950d3c612",
                name: "天威视讯"
            },
            {
                id: "43f5be11ea0277ccb580f1da57bdc4e8",
                name: "东方有线"
            },
            {
                id: "264b7d000d1ed4d574420759c884ea0e",
                name: "海外"
            },
            {
                id: "fb574f57087f2400b0cceb37aadfaa7a",
                name: "浙江华数"
            },
            {
                id: "3979effe72fd6048b42d8af8fc8d4282",
                name: "广电"
            }
        ],
        regions:[
            {
                id: "c72ee9fca6f615b2673d1dd32d7300f5",
                name: "北京"
            },
            {
                id: "1fb37d2c86468b1685b8a7ecc450ba31",
                name: "河北"
            },
            {
                id: "2b53828a457b83ea1774688c92323ef8",
                name: "天津"
            },
            {
                id: "ac260d7066447f1610a771103f85b008",
                name: "山西"
            },
            {
                id: "17f30f401c2e722254ff7b36740b0d95",
                name: "内蒙古"
            },
            {
                id: "58109d02ae9f0684bc1c561e13227054",
                name: "黑龙江"
            },
            {
                id: "5b37057043a21d5646311e63868cbe97",
                name: "吉林"
            },
            {
                id: "f63fa058f0067d74c2b7e779b9bf56ee",
                name: "辽宁"
            },
            {
                id: "8b18441f7c9807d7c98bbcf1f52d6974",
                name: "江苏"
            },
            {
                id: "7dc7f3612637ce361962760d0a1a9998",
                name: "上海"
            },
            {
                id: "05a2fa3d36cf8f7eb8e7f52355ef3bb9",
                name: "浙江"
            },
            {
                id: "740c16dab6c6886394a13c9c8fed74da",
                name: "安徽"
            },
            {
                id: "2b0ab796d5d7dd1a612ada095547d293",
                name: "福建"
            },
            {
                id: "df132c22a82d84ffa9119c4e59be2ebe",
                name: "江西"
            },
            {
                id: "ef54426d89649292296a32a15b7511f4",
                name: "山东"
            },
            {
                id: "e58f04ced8d41d205acc24d73cc00150",
                name: "湖北"
            },
            {
                id: "e679ebef581087e8165746384c9b7f30",
                name: "湖南"
            },
            {
                id: "306cad8b1edbd55f03da3f506e54638f",
                name: "河南"
            },
            {
                id: "262679c64274104d4667bf5f3c54292c",
                name: "广东"
            },
            {
                id: "6d22020fb03d670ecc606b0da456e9fe",
                name: "广西"
            },
            {
                id: "9fd9dfbce392daecb0cb6a5bc710bdf8",
                name: "海南"
            },
            {
                id: "c969ee3d02cfd6a4b229990c59c3c668",
                name: "四川"
            },
            {
                id: "af36557a50c81a09d18595fa2dc00e8c",
                name: "西藏"
            },
            {
                id: "a7c2af53b17f360184680b78a8a4b826",
                name: "重庆"
            },
            {
                id: "dca19657de0625bafec6571a396e13fb",
                name: "云南"
            },
            {
                id: "2b488027ac45f9eed8decba1c36e2bd3",
                name: "贵州"
            },
            {
                id: "88891e52b17aae3fd1e4b654235d97c3",
                name: "甘肃"
            },
            {
                id: "5f2a8bd5476b91f3bc6ab6805e3acec4",
                name: "新疆"
            },
            {
                id: "69a7ac4ee26b6430eb71c49fe4e1cb51",
                name: "陕西"
            },
            {
                id: "e35233c72bac321dcaa287a1e9d58811",
                name: "青海"
            },
            {
                id: "1f8b3d5fa30b4a59165d8015c34aea12",
                name: "宁夏"
            },
            {
                id: "1337db1e928727e2c791d93fa1c5e789",
                name: "中国台湾"
            },
            {
                id: "30244557b98f8facb5ca49d52a2abee3",
                name: "中国香港"
            },
            {
                id: "921f033f4d71842e0813766fce79fa70",
                name: "中国澳门"
            }
        ]
    },
    toTop : function(){
        $("html,body").animate({scrollTop:0},400);
    },
    addDate: function (days,date) {
        var d = new Date();
        if (date != undefined)
            d = new Date(date);
        d.setDate(d.getDate()+days);

        return utils.formatDate(d, "yyyy-MM-dd");
    },
    keynum : function(o){
        var reg = /^[1-9][0-9]*$/;
        if (o.value != '') {
            if (!reg.test(o.value)) {
                o.value = '1';
            }
        }
    },
    max: function (min, max, o) {
        var reg = /^[1-9][0-9]*$/;
        if (o.value != '') {
            if (!reg.test(o.value)) {
                o.value = min;
            }else{
                if(parseInt(o.value) < min)
                    o.value = min;
                if(parseInt(o.value) > max)
                    o.value = max;
            }
        }else{
            o.value = min;
        }
    },
    checkAll: function (flag, container) {
        if (typeof container == 'undefined')
            $("body").find("input[type='checkbox']").prop("checked", flag)
        else
            $(container).find("input[type='checkbox']").prop("checked", flag)
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            try{
                return decodeURI(r[2]);
            } catch (e) {
                return unescape(r[2]);
            }
        }
        return '';
    },
    isNullorEmpty: function (a) {
        if (a == null || a === '')
            return true;

        return false;
    },
    isNull: function (o, dev) {
        return o == null ? (dev != undefined ? dev : '') : o;
    },
    ajaxPost: function (url, config, cb) {

        if (config.isAsyn == true) {
            if (utils.config.allowAjax == false) {
                return false;
            }
            utils.config.allowAjax = false;
        }
        var tip;
        if (config.isLoading == true)
            tip = layer.load(1, { shade: [0.3, '#000'], time: 9999999, maxWidth: 50 });

        config.type = config.type || 'get';
        config.dataType = config.dataType || 'json';

        // $.ajax({
        //     type: config.type,
        //     url: encodeURI(utils.config.apiUrl + url),
        //     dataType: "json", //预期服务器返回数据的类型
        //     data: config.data,
        //     success: function(data){
        //         if(data.success){
        //             cb(data)
        //         }else{
        //             cb(data)
        //         }
        //     },
        //     error:function(jqXHR){
        //         cb(data)
        //     }
        // })

        $.ajax({
            type: config.type,
            url: encodeURI(utils.config.apiUrl + url),
            data: config.data,
            dataType: config.dataType,
            // jsonp:'callback',
            // jsonpCallback: 'callback',
            error: function (a) {
                //alert(JSON.stringify(a))
            },
            complete: function () {
                if (config.isAsyn == true)
                    utils.config.allowAjax = true;
                if (config.isLoading == true)
                    layer.close(tip);
            },
            success: function (data) {
                if (data.code != undefined && data.code == -99)
                    utils.noLogin();
                else
                    typeof cb == "function" && cb(data);
            }
        })
        return false;
    },
    msgJump: function (msg, url, icon) {
        url = url || location.href;
        icon = icon || 6;
        layer.alert(msg, { icon: icon, title: '提示', shadeClose: false, closeBtn: false, shade: [0.3, '#000'] }, function () {
            location.href = url;
        })
    },
    maxLen : function(o) {
        var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : "";

        if (o.getAttribute && o.value.length > nMaxLen) {
            o.value = o.value.substring(0, nMaxLen)
        }
    },
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this.config.keyStr.charAt(enc1) + this.config.keyStr.charAt(enc2) +
                this.config.keyStr.charAt(enc3) + this.config.keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this.config.keyStr.indexOf(input.charAt(i++));
            enc2 = this.config.keyStr.indexOf(input.charAt(i++));
            enc3 = this.config.keyStr.indexOf(input.charAt(i++));
            enc4 = this.config.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8_decode(output);
        return output;
    },
    utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },
    utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    isLocalStorage: function () {
        if (window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') == 123)) {
            localStorage.removeItem("a");
            return true;
        }
        return false;
    },
    setLocalStorage: function (key, value, hours) {
        if (this.isLocalStorage())
            window.localStorage.setItem(key, this.encode(value));
        else {
            this.setCookie(key, value, hours);
        }
    },
    getLocalStorage: function (key) {
        if (this.isLocalStorage()) {

            var value = window.localStorage.getItem(key);
            if (value != null)
                value = this.decode(value);
            else
                value = '';
            return value;
        }
        else
            return this.getCookie(key);
    },
    delLocalStorage: function (key) {
        if (this.isLocalStorage())
            window.localStorage.removeItem(key);
        else
            this.delCookie(key);
    },
    //获取cookie
    getCookie: function (name) {
        var search = name + "=";
        var offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            var end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;
            var value = unescape(document.cookie.substring(offset, end));

            if (value != "")
                value = this.decode(value);

            return value;
        }
        else return "";
    },
    _getCookie: function (name) {
        var value = (document.cookie.match(new RegExp("(^" + name + "| " + name + ")=([^;]*)")) == null) ? "" : decodeURIComponent(RegExp.$2);
        if (value != "")
            value = this.decode(value);

        return value;
    },
    setCookie: function (name, value, hours) {
        value = this.encode(value);
        if (hours != 0) {
            var expireDate = new Date(new Date().getTime() + hours * 3600000);
            document.cookie = name + "=" + escape(value) + "; path=/; domain=; expires=" + expireDate.toGMTString();
        } else {
            document.cookie = name + "=" + escape(value) + "; path=/; domain=; ";
        }
    },
    delCookie: function (name) {
        var expireDate = new Date(new Date().getTime());
        document.cookie = name + "= ; path=/; domain=; expires=" + expireDate.toGMTString();
    },
    showLoading: function () {
        $("#loader").fadeIn();
        $(".mask").fadeIn();
    },
    hideLoading: function () {
        $("#loader").fadeOut(300);
        $(".mask").fadeOut(300);
    },
    getPagePath: function () {
        var rootPath = 'platform/';
        return location.href.substr(location.href.indexOf(rootPath) + rootPath.length).toLowerCase();
    },
    msg: function (title,msg, result , icon) {
        $('#dialog_tip .modal-content').html('<div class="alert alert-'+result+'" style="margin:0"><span class="'+icon+'"></span> <strong>'+title+'</strong>&nbsp;&nbsp;'+msg+'</div>');
        $('#dialog_tip').modal('toggle')
    },
    trim:function(val){
        return val.replace(/^\s+|\s+$/gm, '');
    },
    postForm: function (formName, url, cb) {
        var dataSerialize = $(formName).serialize();
        utils.ajaxPost(url, { isAsyn: true, isLoading: true, data: dataSerialize }, function (data) {
            if (typeof cb != 'undefined') {
                cb(data);
            } else {
                if (data.Code == 1) {
                    if (data.Info != undefined) {
                        layer.alert(data.Info, { icon: 1, title: '提示', shade: [0.3, '#000'], closeBtn: false, shadeClose: false }, function () {
                            if (data.Reload == undefined)
                                location.href = data.Url;
                            else
                                parent.location.reload();
                        })

                    } else {
                        if (data.Reload == undefined)
                            location.href = data.Url;
                        else
                            parent.location.reload();
                    }
                } else {
                    layer.alert(data.Info, { icon: 2, title: '提示', closeBtn: false, shade: [0.3, '#000'], shadeClose: false }, function () {
                        if (data.Url != undefined)
                            location.href = data.Url;
                        else
                            layer.closeAll();
                    })
                }
            }
        })
        return false;
    },
    timeToTimestamp: function (date, precision) {
        date = date.replace(/-/g,'/');
        var timestamp = new Date(date).getTime();
        if (precision != undefined && precision == 1) {
            return timestamp;
        } else {
            return timestamp / 1000;
        }
    },
    timestampToTime : function (timestamp, precision,format) {
        var time;
        format = format ||'yyyy-MM-dd hh:mm:ss';
        if (precision != undefined && precision == 1) {
            time = new Date(parseInt(timestamp));
        } else {
            time = new Date(parseInt(timestamp) * 1000);
        }
        time = this.formatDate(time, format);
        return time;
    },
    formatDate : function (date, format) {
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var milliseconds = date.getMilliseconds();
        milliseconds = milliseconds < 10 ? '00' + milliseconds : milliseconds;

        return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('hh', hour).replace('mm', minutes).replace('ss', seconds).replace('fff', milliseconds);
    },
    hideText: function (str, frontLen, endLen) {
        if (!utils.isNullorEmpty(str) &&  str.length - frontLen - endLen > 0) {
            var len = str.length - frontLen - endLen;
            var xing = '';
            for (var i = 0; i < len; i++) {
                xing += '*';
            }
            return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
        } else {
            return str;
        }
    },
    getLoadFile:function(url,cb){
        if(url == undefined)
            url = $(".skin-part a.jump.on").data("url");

        $.get(url+".html").success(function(content){
            $(".content-wrap").html(content);
            typeof cb == 'function' && cb();
        });
    },
    showPage: function (list, column, url, param, order,footCall) {
        if (typeof ajaxTable != "undefined") {
            ajaxTable.fnClearTable(false);  //不加false的话，fnClearTable 会执行一次ajax请求
            ajaxTable.fnDestroy();
        }
        var curOrderArr = [], ordering = false;
        param = param || {};
        if (order != null) {
            ordering = order.ordering || false;
            orderType = order.orderType || 'desc';
            if (order.index != undefined) {
                curOrderArr.push([order.index, orderType])
            }
        }
        ajaxTable = $(list).dataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': ordering,
            'info': true,
            'autoWidth': false,
            "pageLength": 20,
            "pagingType": "full_numbers",
            "processing": true,
            "bDestroy": true,
            "order": curOrderArr,
            "language": oLanguageData,
            "retrieve": true,
            "columns": column,
            serverSide: true, //启用服务器端分页
            ajax: function (data, callback, settings) {
                param.pagesize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                //param.start = data.start;//开始的记录序号
                param.pageno = (data.start / data.length) + 1;//当前页码
                if (data.order.length > 0) {
                    param.order_field = data.columns[data.order[0].column].name;
                    param.order_type = data.order[0].dir;
                }

                utils.ajaxPost(url, { data: param }, function (data) {
                    if (data.code == 0) {
                        var returnData = {};
                        returnData.recordsTotal = data.count;//返回数据全部记录
                        returnData.recordsFiltered = data.count;
                        if(data.count == 0)
                            returnData.data = [];
                        else
                            returnData.data = data.data;
                        callback(returnData);
                    }
                })
            },
            "fnFooterCallback": function(nFoot, aData, iStart, iEnd, aiDisplay) {
                typeof footCall == 'function' && footCall(aData);
            }
        })

    },
    modalMiddle: function (name, cb) {
        //$(name).modal({ "backdrop": "static" }).modal('show').on("shown.bs.modal", function () {  .modal({ "backdrop": "static" })点击阴影不关闭

        $(name).modal({ "backdrop": "static" }).modal('show').on("shown.bs.modal", function () {
            if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                // 是弹出框居中。。。
                var $modal_dialog = $(this).find('.modal-dialog');
                //获取可视窗口的高度
                //var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                var clientHeight = $(window).height();
                //得到dialog的高度
                var dialogHeight = $modal_dialog.height();
                //计算出距离顶部的高度
                var m_top = (clientHeight - dialogHeight) / 2;
                $modal_dialog.css({ 'margin': m_top + 'px auto' });
            }
            if($(name + " .chosen-select").length > 0)
                $(name + " .chosen-select").chosen({ disable_search_threshold: 10 });
            typeof cb != 'undefined' && cb();
        });
    },
    modalResize: function (name) {
        if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            // 是弹出框居中。。。
            var $modal_dialog = $(name).find('.modal-dialog');
            //获取可视窗口的高度
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            //得到dialog的高度
            var dialogHeight = $modal_dialog.height();
            //计算出距离顶部的高度
            var m_top = (clientHeight - dialogHeight) / 2;
            $modal_dialog.css({ 'margin': m_top + 'px auto' });
        }
    },
    showModal: function (body, footer, cb) {
        $("#myModal .modal-body").text(body);
        $("#myModal .modal-footer").html(footer);
        utils.modalMiddle("#myModal",cb)
    },
    noLogin: function () {
        $("#login_after_content").remove();
        utils.showModal('您还没有登录，请先登录！', '<a href="mlogin.html" class="btn btn-primary">立即登录</a>')
    },
    checkLogin:function (cb) {
        utils.ajaxPost('api/api/check-login', { isAsyn: true, isLoading: true, type: 'get' }, function (data) {
            var flag = data.code == 0 ? true : false;
            if(!flag){
                utils.noLogin();
            }else {
                typeof cb == "function" && cb(data);
            }
        })
    },
    checkCustomLogin:function (cb) {
        utils.ajaxPost('check-login', { isAsyn: true, isLoading: true, type: 'get',data:{type:1} }, function (data) {
            var flag = data.code == 0 ? true : false;
            if(!flag){
                utils.noLogin();
            }else {
                typeof cb == "function" && cb(data);
            }
        })
    },
    addCheckUser:function(u){
        utils.setLocalStorage("active_user",u);
    },
    getCheckUser:function(){
        return utils.getLocalStorage("active_user");
    },
    removeCheckUser:function(){
        utils.delLocalStorage("active_user");
    },
    jsonParseParam : function (param, key) {
        var paramStr = "";
        if (param instanceof String || param instanceof Number || param instanceof Boolean) {
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        } else {
            $.each(param, function (i) {
                var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += '&' + utils.jsonParseParam(this, k);
            });
        }
        return paramStr.substr(1);
    },
    getPreMonth : function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        return new Date(year2 + '/' + month2 + '/' + day2);
    },
    getNextMonth : function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        return new Date(year2 + '/' + month2 + '/' + day2);
    }
}

$(".skin-part a.jump").click(function(){
    var verifiedstatus  = $(this).data('verifiedstatus');
    if(verifiedstatus != undefined && verifiedstatus == 1){
        //未认证
        utils.showModal('请进行实名认证！', '<a href="javascript:;" onclick="go_auth()" class="btn btn-primary">去认证</a>')
        return;
    }else if(verifiedstatus != undefined && verifiedstatus == 2){
        //未认证
        utils.showModal('用户认证审核中！', '<button type="button" data-dismiss="modal" class="btn btn-primary">确定</button>')
        return;
    }

    $(".skin-part a.jump").removeClass("on");

    $("#breadcrumb li:gt(1)").remove();
    if($(this).parent().parent().prev().html() == undefined){
        $("#breadcrumb").append("<li><a>"+ $(this).find("span").text() +"</a></li>");

        utils.setLocalStorage("menu_local_sel",""+$(this).parent().parent().index(),24);
    }else{
        $("#breadcrumb").append('<li><a>'+ $(this).parent().parent().prev().find("span").text() +'</a></li><li><i class="fa fa-angle-right"></i></li><li><a>'+ $(this).find("span").text() +'</a></li>')
        utils.setLocalStorage("menu_local_sel",$(this).parent().parent().parent().parent().index()  +"_"+$(this).parent().index(),24);
    }

    $(window).scrollTop(0);
    $(this).addClass("on");
    utils.getLoadFile()
})

function go_auth(){
    $("#myModal").modal('hide');
    utils.getLoadFile('custom_auth');
}

var _timer = 60, _clear;

function sendCode() {
    var self = $(".code button");
    if (!self.hasClass("disabled")) {
        self.addClass('disabled');

        self.text(_timer);
        _clear = setInterval(timer_Elapsed, 1000);

        utils.ajaxPost("Ajax/SendMsg", $("#validForm").serialize(), {}, function (data) {

            if (typeof (data) == "object" &&
                Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
            } else {
                data = JSON.parse(data);
            }

            if (data.status != 0) {
                _timer = 60;
                self.removeClass('disabled');
                self.text("重新发送");
                clearInterval(_clear);
                utils.msg(data.data);
            }
        })
    }
}
function timer_Elapsed() {
    _timer--;
    var self = $(".code button");
    self.text(_timer);
    if (_timer <= 0) {
        _timer = 60;
        clearInterval(_clear);
        self.removeClass('disabled');
        self.text("重新发送");
    }
}
$(function () {
    $(".btn.del").click(function () {
        if ($(".table-datatable input[type='checkbox']:checked").length == 0) {
            alert('请选中数据后再做提交！');
        } else {
            utils.showLoading();
            var ids = '';
            $.each($(".table-datatable input[type='checkbox']:checked"), function (index,item) {
                ids += ',' + item.value;
            })
            if (ids.length > 0) {
                ids = ids.substr(1);
                utils.ajaxPost($(this).data("url"), { data: { ids: ids } }, function (data) {
                    if (data.Code == 1) {
                        ShowData();
                    } else {
                        utils.hideLoading();
                        alert(data.Info);
                    }
                })
            }
        }
    })
})
