var utils = {
    apiUrl: '/',
	allowAjax:true,
	keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	ajax: {
	    type: 'get',
	    dataType: 'json',
	    jsonpName: 'callback'
    },
    
    toTop: function () {
        $("html,body").animate({ scrollTop: 0 }, 400);
    },
    addDate: function (days, date) {
        var d = new Date();
        if (date != undefined)
            d = new Date(date);
        d.setDate(d.getDate() + days);

        return utils.formatDate(d, "yyyy-MM-dd");
    },
    keynum: function (o) {
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
            } else {
                if (parseInt(o.value) < min)
                    o.value = min;
                if (parseInt(o.value) > max)
                    o.value = max;
            }
        } else {
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
            try {
                return decodeURI(r[2]);
            } catch (e) {
                return unescape(r[2]);
            }
        }
        return '';
    },
    isNullorEmpty: function (a) {
        if (typeof a == 'undefined' || a == null || a === '')
            return true;

        return false;
    },
    isNull: function (o, dev) {
        return o == null ? (dev != undefined ? dev : '') : o;
    },
    showLoading: function () {
        layer.load(1, { shade: [0.3, '#000'], time: 9999999, maxWidth: 50 });
    },
    hideLoading:function(){
        layer.closeAll();
    },
    ajaxPost: function (url, config, cb, status_cb) {
        if (config.isAsyn == true) {
            if (this.allowAjax == false) {
                return false;
            }
            this.allowAjax = false;
        }
        var tip;
        if (config.isLoading == true)
            tip = layer.load(1, { shade: [0.3, '#000'], time: 9999999, maxWidth: 50 });

        config.type = config.type || this.ajax.type;
        config.dataType = config.dataType || this.ajax.dataType;
        if(config.contentType)
            headers = Object.assign({},headers,config.contentType);
        config.data = config.data || {};

        config.data.random = Math.random();
        if (url.indexOf('http') == -1)
            url = this.apiUrl + url;
        url = url.replace('{?projection}', '');
        $.ajax({
            type: config.type,
            async: config.isAsyn,
            url: encodeURI(url),
            data: config.data,
            dataType: config.dataType,
            jsonp: this.ajax.jsonpName,
            cache:true,
            //jsonpCallback: 'callback',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            error: function (data) {
                if (!utils.isNullorEmpty(data.responseText) && !utils.isNullorEmpty(JSON.parse(data.responseText).msg)) {
                    utils.msg('提示', JSON.parse(data.responseText).msg, 'warning');
                }
            },
            complete: function (xhr) {
                if (config.isAsyn == true)
                    this.allowAjax = true;
                if (config.isLoading == true)
                    layer.close(tip);
                typeof status_cb == "function" && status_cb(xhr.status);
            },
            success: function (data) {
                //if (data.code != undefined && data.code == -99)
                //    utils.noLogin();
                //else
                typeof cb == "function" && cb(data);
            }
        })
        return false;
    },
    maxLen: function (o) {
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
            this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
            this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
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
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
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
        if (typeof string != 'string')
            string = string + '';
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
    getPagePath: function () {
        var rootPath = 'platform/';
        return location.href.substr(location.href.indexOf(rootPath) + rootPath.length).toLowerCase();
    },
    msg: function (title, msg, type) {
        if (type == "warning")
            $('#dialog_tip .modal-content').html('<div class="alert alert-warning" style="margin:0"><span class="fa fa-close"></span> <strong>' + title + '</strong>&nbsp;&nbsp;' + msg + '</div>');
        else
            $('#dialog_tip .modal-content').html('<div class="alert alert-success" style="margin:0"><span class="fa fa-check"></span> <strong>' + title + '</strong>&nbsp;&nbsp;' + msg + '</div>');

        $('#dialog_tip').modal('toggle')
    },
    trim: function (val) {
        return val.replace(/^\s+|\s+$/gm, '');
    },
    postForm: function (formName, url, cb, com_cb) {
        var dataSerialize = $(formName).serialize();
        utils.ajaxPost(url, { isAsyn: true, isLoading: true, type: 'post', data: dataSerialize }, cb, com_cb)
        return false;
    },
    timeToTimestamp: function (date, precision) {
        date = date.replace(/-/g, '/');
        var timestamp = new Date(date).getTime();
        if (precision != undefined && precision == 1) {
            return timestamp;
        } else {
            return timestamp / 1000;
        }
    },
    timestampToTime: function (timestamp, precision, format) {
        var time;
        format = format || 'yyyy-MM-dd hh:mm:ss';
        if (precision != undefined && precision == 1) {
            time = new Date(parseInt(timestamp));
        } else {
            time = new Date(parseInt(timestamp) * 1000);
        }
        time = this.formatDate(time, format);
        return time;
    },
    formatDate: function (date, format) {
        if (utils.isNullorEmpty(date)) {
            return "";
        }
        if (typeof date == 'string') {
            date = date.replace(/-/g, '/');
            date = new Date(date);
        }

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
        if (!utils.isNullorEmpty(str) && str.length - frontLen - endLen > 0) {
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
    getLoadFile: function (url, cb) {
        if (url == undefined)
            url = $(".skin-part a.jump.on").data("url");
        $.get(url).success(function (content) {
            $(".content-wrap").html(content);
            typeof cb == 'function' && cb();
        });
    },
    showPage: function (config, param) {
        if (typeof config.tableName == "undefined") {
            alert('缺少tableName!');
            return;
        }
        if (typeof config.columns == "undefined") {
            alert('缺少columns');
            return;
        }
        if (typeof config.url == "undefined") {
            alert('缺少url');
            return;
        }
        param = param || {};

        if (typeof ajaxTable != "undefined") {
            ajaxTable.fnClearTable(false);  //不加false的话，fnClearTable 会执行一次ajax请求
            ajaxTable.fnDestroy();
        }
        //排序
        var orderArr = [];
        if (config.order != undefined && config.order.index!=undefined) {
            orderArr.push([config.order.index, config.order.orderType || 'desc'])
        }
        //要冻结的列
        var leftColumns = 0, rightColumns = 0;
        if (config.fixedColumns != null) {
            if (config.fixedColumns.leftColumns != null)
                leftColumns = config.fixedColumns.leftColumns;
            if (config.fixedColumns.rightColumns != null)
                rightColumns = config.fixedColumns.rightColumns;
        }
        config.pageLength = config.pageLength || 20;
        ajaxTable = $(config.tableName).dataTable({
            'paging': true,
            'lengthChange': true,
            'searching': false,
            'ordering': config.order != undefined ? true : false,
            'info': true,
            'autoWidth': false,
            "pageLength": config.pageLength,
            "pagingType": "full_numbers",
            "processing": true,
            "bDestroy": true,
            "order": orderArr,
            "language": oLanguageData,
            "retrieve": true,
            "scrollX": false, //自动列宽
            "fixedColumns": {
                leftColumns: leftColumns,
                rightColumns: rightColumns
            },
            "columns": config.columns,
            //"dom": 'tpi',//控制Datatables元素的位置
            serverSide: true, //启用服务器端分页
            ajax: function (data, callback, settings) {
                param.size = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                //param.start = data.start;//开始的记录序号
                param.page = (data.start / data.length);//当前页码
                if (data.order.length > 0) {
                    //param.order_field = data.columns[data.order[0].column].name;
                    //param.order_type = data.order[0].dir;
                    param.sort = data.columns[data.order[0].column].name + ',' + data.order[0].dir;
                }
                utils.ajaxPost(config.url, { data: param }, function (data) {
                    var returnData = {};

                    if (utils.isNullorEmpty(data._embedded)) {
                        returnData.recordsTotal = data.totalElements;//返回数据全部记录
                        returnData.recordsFiltered = data.totalElements;
                        if (data.totalElements == 0)
                            returnData.data = [];
                        else
                            returnData.data = data.content;

                    } else {
                        returnData.recordsTotal = data.page.totalElements;//返回数据全部记录
                        returnData.recordsFiltered = data.page.totalElements;
                        if (data.page.totalElements == 0)
                            returnData.data = [];
                        else {
                            for (var o in data._embedded) {
                                returnData.data = data._embedded[o];
                                break;
                            }
                        }
                    }

                    callback(returnData);
                    
                })
            },
            "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                typeof config.footCall == 'function' && config.footCall(nFoot,aData);
            }
        })

    },
    showStaticPage: function (config) {
        config.pageLength = config.pageLength || 20;
        if (typeof ajaxTable != "undefined") {
            ajaxTable.fnClearTable(false);  //不加false的话，fnClearTable 会执行一次ajax请求
            ajaxTable.fnDestroy();
        }
        //排序
        var orderArr = [];
        if (config.order != undefined && config.order.index != undefined) {
            orderArr.push([config.order.index, config.order.orderType || 'desc'])
        }
        //要冻结的列
        var leftColumns = 0, rightColumns = 0;
        if (config.fixedColumns != null) {
            if (config.fixedColumns.leftColumns != null)
                leftColumns = config.fixedColumns.leftColumns;
            if (config.fixedColumns.rightColumns != null)
                rightColumns = config.fixedColumns.rightColumns;
        }
        ajaxTable = $(config.tableName).dataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': config.order != undefined ? true : false,
            'info': true,
            'autoWidth': false,
            "pageLength": config.pageLength,
            "pagingType": "full_numbers",
            "processing": true,
            "bDestroy": true,
            "order": orderArr,
            "language": oLanguageData,
            "retrieve": true,
            "scrollX": true, //自动列宽
            "fixedColumns": {
                leftColumns: leftColumns,
                rightColumns: rightColumns
            }
        })
    },
    getRowDetail: function (idx) {
        var nTrs = ajaxTable.fnGetNodes();
        return ajaxTable.fnGetData(nTrs[idx]);
    },
    modalMiddle: function (name, cb, isMiddle) {
        //$(name).modal({ "backdrop": "static" }).modal('show').on("shown.bs.modal", function () {  .modal({ "backdrop": "static" })点击阴影不关闭

        $(name).modal({ "backdrop": "static" }).modal('show').on("shown.bs.modal", function () {
            //滚动条到顶部
            $(this).find(".modal-body").scrollTop(0)

            if (isMiddle != undefined) {
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
            if ($(name + " .chosen-select").length > 0)
                $(name + " .chosen-select").chosen({ disable_search_threshold: 10 });
            typeof cb != 'undefined' && cb != null && cb();
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
        utils.modalMiddle("#myModal", cb,true)
    },
    noLogin: function () {
        $("#sidebar").remove();
        utils.showModal('您还没有登录，请先登录！', '<a href="login.html" class="btn btn-primary">立即登录</a>')
    },
    checkLogin: function (cb) {
        utils.ajaxPost('api/checkLogin', { isAsyn: true, isLoading: true, type: 'get' }, function (data) {
            var flag = data.code == 0 ? true : false;
            if (!flag) {
                utils.noLogin();
            } else {
                typeof cb == "function" && cb(data);
            }
        })
    },
    addCheckUser: function (u) {
        utils.setLocalStorage("active_user", u);
    },
    getCheckUser: function () {
        return utils.getLocalStorage("active_user");
    },
    removeCheckUser: function () {
        utils.delLocalStorage("active_user");
    },
    form2Json: function (formName) {
        var arr = $(formName).serializeArray();
        var json = {};
        $.each(arr, function () {
            if (json[this.name]) {
                if (!json[this.name].push) {
                    json[this.name] = [json[this.name]];
                }
                json[this.name].push(this.value || '');
            } else {
                json[this.name] = this.value || '';
            }
        });
        return json;
    },
    jsonParseParam: function (param, key) {
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
    getPreMonth: function (date) {
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
    getNextMonth: function (date) {
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
    },
    addMonth:function(i,format){
        var today = new Date(); // 获取今天时间
        var month = today.getMonth();
        var date = today.getDate();
        today.setDate(date + 1);
        today.setMonth(month - i);

        if (format == undefined)
            return this.formatDate(today);
        else
            return this.formatDate(today, format);
    },
	formatMoney:function(s){
	    if (typeof s != 'string') {
	        if (typeof s == 'number')
	            s = s.toFixed(2);
	        s = s.toString();
	    }
		if (/[-\+][^0-9\.]/.test(s)) return "0.00";
		s = s.replace(/^(\d*)$/, "$1.");
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while (re.test(s))
			s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		 return s.replace(/^\./, "0.")
	},
	getLoadFile: function (url, cb) {
	    if (url == undefined) {
	        url = $("#sidebar .active").length > 0 ? $("#sidebar .active a").data("url") : $("#sidebar .current a").data("url");
	        if(url.indexOf('?')>0) {
	        		var loc = url.substring(url.lastIndexOf('=')+1, url.length);
	        		utils.setLocalStorage('type', loc);
	        		url = url.substring(0,url.indexOf("?"));
	        }
	    }
	    $.get(url+".html").success(function (content) {
	        $("#main-sub-content").html(content);
	        typeof cb == 'function' && cb();
	    });
	},
	getThumbName: function(src) {
		if(utils.isNullorEmpty(src))
            return "null";
        if(src.toUpperCase().indexOf("WEBP")>0) {return src;}
	    var i = src.lastIndexOf(".");
	    return src.substring(0,i).concat("_thumb").concat(src.substring(i));
	}
}
var _timer = 60, _clear;

function sendCode() {
    var self = $(".code button");
    if (!self.hasClass("disabled")) {
        self.addClass('disabled');

        self.text(_timer);
        _clear = setInterval(timer_Elapsed, 1000);

        utils.ajaxPost("Ajax/SendMsg", $("#validForm").serialize(),function (data) {
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

function appendTip() {
    $("body").append('<div class="modal fade" id="dialog_tip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>')
}
function userList() {
	$(document).on('click','.autoComplete input[name="user"]',function(){
	//$('.autoComplete input[name="user"]').click(function () {
        if ($('.autoComplete .users .item').length > 0) {
            $('.autoComplete .users').show();
        }
        return false;
    })
    $(document).on('keyup','.autoComplete input[name="user"]',function(){
    //$('.autoComplete input[name="user"]').keyup(function () {
        var key = $(this).val();
        if (utils.isNullorEmpty(key)) {
            $('.autoComplete input[name="userId"]').val('');
            $('.autoComplete .users').hide();
        }
        else {
            utils.ajaxPost('rest/users?projection=simple&wxUser.nickname=' + key, {}, function (data) {
                var html = '';
                for (var o in data._embedded.users) {
                    html += '<div class="userItem" data-id="' + data._embedded.users[o].id +'">' + data._embedded.users[o].wxUser.nickname +'</div>'
                }
                if (!utils.isNullorEmpty(html))
                    $('.autoComplete .users').html(html).show();
            })
        }
    })
    $(document).on('click','.userItem',function(){
    //$('.autoComplete').on('click', '.item', function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('.autoComplete input[name="user"]').val($(this).text());
        $('.autoComplete input[name="userId"]').val($(this).data('id'));
        $('.autoComplete .users').hide();
    })
    $(document).click(function () {
        $('.autoComplete .users').hide();
    })
}
