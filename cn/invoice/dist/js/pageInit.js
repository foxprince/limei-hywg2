if(typeof jQuery !=='undefined'){
    (function($,window,undefined){

        var curPage='',
        //跳转是否有值
            jumpVal='',
        //从DOM中重新获取数据总数/总页数
            lists='',
            totals='',
        //是否返回值
            isTrue=false;

        var Page=function(opts){
            this.settings= $.extend({},Page.defaults,opts);
            curPage=this.settings.initPage;
            totals=this.settings.totalPages;
            jumpVal=this.settings.inputVal;
            this.init();
        };

        //默认配置
        Page.defaults={
            container:'.turn_page',
            setPos:'body',
            totalPages:null,
            totalLists:null,
            initPage:1,
            inputVal:1,
            callBack:null
        };

        Page.prototype={
            init:function(){
                this.create();
            },
            create:function(){
                var _template='<div class="page">'+
                    '<span class="page_details">'+
                    '共<span class="page_num">'+this.settings.totalLists+'</span>条记录，'+
                    '第<span class="page_current">'+curPage+'</span>/'+
                    '<span class="page_size">'+this.settings.totalPages+'</span>页'+
                    '</span>'+
                    '<div class="page_to">'+
                    '<ul class="flex_parent">'+
                    '<li class="page_first flex_child">首页</li>'+
                    '<li class="page_pre page_hide flex_child">上一页</li>'+
                    '<li class="page_next flex_child">下一页</li>'+
                    '<li class="page_last flex_child">末页</li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="page_jump">'+
                    '<span>第<input type="text" class="page_jump_input" value="'+this.settings.inputVal+'">页</span>'+
                    '<input type="button" class="page_jump_btn" value="Go">'+
                    '</div>'+
                    '</div>';
                $(this.settings.setPos).append(_template);
                this.refreshDom();
                this.bindEvent();
            },
            bindEvent:function(){
                var _this=this;
                //跳转首页
                $(this.settings.container).on("click",".page_first",function(){

                    lists=$(_this.settings.container).find(".page_num").text();
                    totals=$(_this.settings.container).find(".page_size").text();

                    if($.isFunction(_this.settings.callBack)){
                        curPage=1;
                        isTrue=_this.settings.callBack(1);
                        if(isTrue){
                            _this.refreshDom();
                            $(_this.settings.container).find(".page_current").text(1);
                            $(_this.settings.container).find(".page_jump_input").val(curPage);
                        }
                    }
                });
                //跳转上一页
                $(this.settings.container).on("click",".page_pre",function(){

                    lists=$(_this.settings.container).find(".page_num").text();
                    totals=$(_this.settings.container).find(".page_size").text();

                    if($.isFunction(_this.settings.callBack)){
                        if(curPage>1){
                            curPage=curPage-1;
                            isTrue=_this.settings.callBack(curPage);
                            if(isTrue){
                                _this.refreshDom();
                                $(_this.settings.container).find(".page_current").text(curPage);
                                $(_this.settings.container).find(".page_jump_input").val(curPage);
                            }
                        }
                    }
                });
                //跳转下一页
                $(this.settings.container).on("click",".page_next",function(){

                    lists=$(_this.settings.container).find(".page_num").text();
                    totals=$(_this.settings.container).find(".page_size").text();


                    if($.isFunction(_this.settings.callBack)){
                        if(curPage<totals){
                            curPage=curPage+1;
                            isTrue=_this.settings.callBack(curPage);
                            if(isTrue){
                                _this.refreshDom();
                                $(_this.settings.container).find(".page_current").text(curPage);
                                $(_this.settings.container).find(".page_jump_input").val(curPage);
                            }
                        }
                    }
                });
                //跳转末页
                $(this.settings.container).on("click",".page_last",function(){

                    lists=$(_this.settings.container).find(".page_num").text();
                    totals=$(_this.settings.container).find(".page_size").text();

                    if($.isFunction(_this.settings.callBack)){
                        curPage=totals;
                        isTrue=_this.settings.callBack(curPage);
                        if(isTrue){
                            _this.refreshDom();
                            $(_this.settings.container).find(".page_current").text(totals);
                            $(_this.settings.container).find(".page_jump_input").val(curPage);
                        }
                    }
                });
                //Go跳转
                $(this.settings.container).on("click",".page_jump_btn",function(){

                    lists=$(_this.settings.container).find(".page_num").text();
                    totals=$(_this.settings.container).find(".page_size").text();

                    if($.isFunction(_this.settings.callBack)){
                        jumpVal=Number($(_this.settings.container).find("input.page_jump_input").val());
                        console.log('跳转的页数：'+jumpVal+';跳转之前的页数：'+curPage);
                        if(jumpVal>=1 && jumpVal <=totals){
                            curPage=jumpVal;
                            isTrue=_this.settings.callBack(curPage);
                            if(isTrue){
                                _this.refreshDom();
                                $(_this.settings.container).find(".page_current").text(curPage);
                            }
                        }else{
                            jumpVal=curPage;
                        }
                    }
                });
            },
            refreshDom:function(){
                $(this.settings.container).find("li.flex_child").removeClass("page_hide");
                if(Number(totals)==1){
                    $(this.settings.container).find(".page_pre").addClass("page_hide");
                    $(this.settings.container).find(".page_next").addClass("page_hide");
                }
                else if(Number(totals)==2){
                    if(Number(curPage)==1){
                        $(this.settings.container).find(".page_pre").addClass("page_hide");
                    }else{
                        $(this.settings.container).find(".page_next").addClass("page_hide");
                    }
                }
                else if(Number(curPage)==1 && Number(totals)>2){
                    $(this.settings.container).find(".page_pre").addClass("page_hide");
                }
                else if(Number(curPage)==Number(totals) && Number(totals)>2){
                    $(this.settings.container).find(".page_next").addClass("page_hide");
                }
            }
        };

        var pageInit=function(opts){
            return new Page(opts);
        };

        window.pageInit= $.pageInit=pageInit;

    })(jQuery,window,undefined);
}else{
    if(typeof jQuery === 'undefined'){
        console.warn('jQuery is undefined,please load jQuery first.');
    }
}




