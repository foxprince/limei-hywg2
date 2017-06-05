define("new_video/player.html.js",[],function(){
return'<div id="js_mpvedio_<#=id#>" class="js_mpvedio">\n<div class="js_page_video page_video" style="width:<#=width#>px;height:<#=height#>px;display:<#=display#>;">\n    <!--ps: @拉风\n        1.全屏body添加扩展类： full_screen_mv\n        2.全屏是竖屏播放的情况：需要给page_video这个div加一个margin-left,margin-top\n        这两个值是page_video设置的高度和宽度的一半的负数；\n        3.如果是横屏的话(横屏默认为全屏)，page_video上设置的宽度和高度去掉即可。\n    -->\n\n<!--     <div class="wrp_loading js_loading">\n        <div class="wrp_svg">\n            <svg  class="rotate_svg" width="64" height="64" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="40%" stroke-width="4"/>\n                <path fill="#fff" stroke="#f00" stroke-width="4" fill-opacity="0" d="M4.5 35\n               A 26 26, 0,0,0, 27 56" transform="rotate(330.191 30 30)">\n             <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="5s" repeatCount="indefinite"></animateTransform>\n          \n          </path>\n            </svg>\n            <svg class="loader_bg" xmlns="http://www.w3.org/2000/svg" width="64" height="64">\n                <circle cx="50%" cy="50%" r="40%" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0;"></circle>\n            </svg>            \n        </div>\n    </div>     -->   \n    <!--下载腾讯视频-->\n    <div id="ing_download_<#=id#>" class="app_download_container" style="display:none;">\n        <# if (window.cgiData) { #>\n        <img class="app_thumb" src="<#=window.cgiData.appImg||""#>">\n        <# } else { #>\n        <img class="app_thumb" src="">\n        <# } #>\n        <span class="btn_app_download_wrp js_download_btn">\n            <span class="btn_app_download js_download_text">下载</span>\n        </span>\n        <span class="btn_app_download_wrp js_progress_main" style="display:none;">\n            <span class="btn_app_download progress_text js_progress_text"></span>\n            <span class="app_download_progress js_progress" style="width:0%;"></span>\n        </span>\n        <div class="app_download_info">\n            <strong class="app_download_title">提升3倍流畅度</strong>\n            <p class="app_download_desc"><span class="js_installStatus"></span>腾讯视频客户端</p>\n        </div>\n    </div>\n\n    <!-- 视频加载失败 -->\n    <!--\n    <div class="wx_video_error_box">\n        <div class="wx_video_error_msg">\n            <p>视频加载失败，请刷新重试</p>\n            <a class="wx_video_error_msg_btn" href="javascript:void(0);">刷新</a>\n        </div>\n        <img class="wx_video_error_loading" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==">\n    </div>\n    -->\n    <!--菊花-->\n    <div class="wrp_loading js_loading start_loading"  style="display:none;">\n        <div class="mid_opr">\n            <div class="spinner" role="progressbar"\n                style="position: absolute; width: 0px; z-index: 2000000000; left: 50%; top: 50%;backface-visibility:hidden; -webkit-backface-visibility:hidden;">\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-0-12 1.25s linear infinite;-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(0deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(0deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-1-12 1.25s linear infinite;-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(30deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(30deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-2-12 1.25s linear infinite;-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(60deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(60deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-3-12 1.25s linear infinite;-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(90deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(90deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-4-12 1.25s linear infinite;-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(120deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(120deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-5-12 1.25s linear infinite;-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(150deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(150deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-6-12 1.25s linear infinite;-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(180deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(180deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-7-12 1.25s linear infinite;-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(210deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(210deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-8-12 1.25s linear infinite;-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(240deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(240deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-9-12 1.25s linear infinite;-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(270deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(270deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-10-12 1.25s linear infinite;-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(300deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(300deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-11-12 1.25s linear infinite;-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(330deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(330deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n            </div>\n        </div>\n        <!--\n        <svg version="1.1" class="svg_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n        width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">\n\n        <circle cx="30" cy="30" r="26" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0" />\n        <path  fill="#fff" stroke="#fff"  stroke-width="4"  fill-opacity="0" d="M4.5 35A 26 26, 0,0,0, 27 56" style="stroke-linecap:round;">\n        <animateTransform attributeType="xml"\n        attributeName="transform"\n        type="rotate"\n        from="0 30 30"\n        to="360 30 30"\n        dur="0.5s"\n        repeatCount="indefinite"/>\n        </path> \n        </svg>\n        -->\n    </div> \n\n    <!-- 播放按钮 z-index:12 -->\n    <div class="video_pause_controll js_video_pause_controll">\n        <a class="btn_pause js_btn_pause">\n            <i class="icon_pause"></i>\n        </a>\n    </div>\n\n    <!-- 互选视频广告 静音btn 静音状态className:muting -->\n    <# if(ad_muted_btn){ #>\n    <span class="js_muted_btn video_muted_btn muting">静音</span>\n    <# } #>\n\n    <!-- 视频广告 z-index:13 -->\n    <div class="video_ad js_ad_controll" style="display:none;">\n        <span class="button_left_time video_ad_time_meta">广告<span class="button_left_time_num js_play_time"></span></span>\n        <a href="javascript:void(0);" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n        <a href="javascript:void(0);" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n\n    </div>\n    <!-- 视频广告详情入口 -->\n    <div class="video_ad_detail js_ad_detail" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">了解详情</a>\n    </div>\n    <div class="video_ad_detail js_ad_app" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n    </div>\n    \n     <!--最后的视频推荐 z-index:11-->\n    <div class="js_end_dom continue_play none">\n        <!--\n        <div class="continue_inner">\n            <div class="hd_opr"><a href="#" class="btn_replay"><i class="icon_replay"></i>重新播放</a></div>\n            <div class="tit_desc">以下视频将跳到腾讯视频播放</div>\n            <ul class="video_list">\n               <li class="video_item">\n                   <a href="#" class="inner_item">\n                       <img  class="cover" src="<%@GetResFullName($images_path$pages/default_avator.png)%>"/>\n                       <div class="desc">\n                        这里是video的标题啊标题京东覅是\n                       </div>\n                   </a>\n               </li> \n            </ul>\n        </div>\n        -->\n    </div> \n\n    <!--封面-->\n    <div class="js_poster_cover poster_cover">\n        <img src="<#=cover#>">\n        <!-- <div class="poster_cover_mask"></div> -->\n    </div>\n    <!--大播放-->    \n    <div style="display:none;" class="full_screen_opr js_video_play_controll">\n        <a href="javascript:void(0);" class="mid_play_box js_btn_play">\n            <i class="icon_mid_play"></i>\n            <p class="js_video_length video_length" style="display:none;"></p>\n        </a>\n    </div>\n\n    <!--mask,暂停状态下，提醒状态等的半透明蒙层-->\n    <div class="video_mask none"></div>\n    \n    <!--快进。后退 操作 快进：next,快退，pre-->\n    <div  class="mid_opr fast_pre_next none js_forward">\n        <p class="video_length">\n            <span class="played_time js_forward_play_time">03:30</span>\n            <em>/</em>\n            <span class="total_time">03:30</span>\n        </p>\n        <div class="video_processor_bar">\n            <div class="processor_bar_inner js_forward_bar" style="width:30%;"></div>\n        </div>\n    </div>\n\n   <!--播放条-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <div class="js_controll video_opr" style="display:none">\n         <div class="opr_inner">  \n            <div class="opr_inner_fl">\n                <div class="js_switch switch switch_on"><!--switch_off 关闭，switch on开启-->\n                     <a href="javascript:void(0);" class="btn_opr">on/off</a>\n                 </div>\n                <div class="played_time js_now_play_time">\n                      00:00\n                </div> \n            </div>\n           \n             <div class="wrp_play_bar">                    \n                <div class="js_progress_bar wrp_progress" style="display:none;">\n                    <div class="progress_bar">\n                        <div class="js_played_bar played_bar" style="width:0%"></div>\n                        <div class="js_buffer_bar buffer_bar" style="width:0%"></div><!--缓冲条-->\n                        <div class="js_played_speed_cnt wrp_speed_dot"><i class="speed_dot" style="left:0%"></i></div>\n                    </div>  \n                </div>                        \n             </div>\n            \n            <!-- <div class="wrp_pop_play"><a href="#" class="pop_play">小窗</a></div> -->\n            <!--清晰度选择-->\n           <!--  <div class="play_mode">\n                 <a href="#" class="btn_mode current">超清</a>\n                 <div class="pop_mode_select">\n                     <ul class="clarity">\n                         <li class="clarity_item current">超清</li>\n                         <li class="clarity_item">标清</li>\n                         <li class="clarity_item">流畅</li>\n                     </ul>\n                 </div>\n            </div> -->\n            <div class="opr_inner_fr">\n                <div class="total_time js_total_time" style="display:none;"></div> \n                <# if (!_mustHideFullScreen) { #><div class="js_full_screen_control screenSize_control full"><i class="icon_control"></i></div>  <!--全屏className：full,小窗className：small-->  \n<# } #>\n            </div>\n         </div>\n    </div>\n    <!--视频-->\n    <div class="js_inner inner">\n        <div class="js_video_poster video_poster" style="display:none;">\n            <div class="video_mask"></div>\n             <video   webkit-playsinline playsinline>\n                  您的浏览器不支持 video 标签\n             </video>\n        </div> \n    </div>\n\n</div>\n\n    <!--全屏遮罩-->\n<div class="js_full_mask full_mask" style=""></div>\n\n<!-- \n11 菊花\n10 最后的视频推荐\n9封面上边的控制按钮\n8  以后的广告浮层\n7 封面\n6 视频+控制条 （在里边控制条z-index>视频） -->\n\n</div>\n';
});define("biz_wap/zepto/touch.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function t(e,t,o,n){
return Math.abs(e-t)>=Math.abs(o-n)?e-t>0?"Left":"Right":o-n>0?"Up":"Down";
}
function o(){
p=null,g.last&&(g.el&&"function"==typeof g.el.trigger&&g.el.trigger("longTap"),g={});
}
function n(){
p&&clearTimeout(p),p=null;
}
function i(){
a&&clearTimeout(a),l&&clearTimeout(l),c&&clearTimeout(c),p&&clearTimeout(p),a=l=c=p=null,
g={};
}
function r(e){
return("touch"==e.pointerType||e.pointerType==e.MSPOINTER_TYPE_TOUCH)&&e.isPrimary;
}
function u(e,t){
return e.type=="pointer"+t||e.type.toLowerCase()=="mspointer"+t;
}
var a,l,c,p,s,g={},f=750;
e(document).ready(function(){
var w,y,T,h,d=0,m=0;
"MSGesture"in window&&(s=new MSGesture,s.target=document.body),e(document).bind("MSGestureEnd",function(e){
var t=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;
t&&g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t));
}).on("touchstart MSPointerDown pointerdown",function(t){
(!(h=u(t,"down"))||r(t))&&(T=h?t:t.touches[0],t.touches&&1===t.touches.length&&g.x2&&(g.x2=void 0,
g.y2=void 0),w=Date.now(),y=w-(g.last||w),g.el=e("tagName"in T.target?T.target:T.target.parentNode),
a&&clearTimeout(a),g.x1=T.pageX,g.y1=T.pageY,y>0&&250>=y&&(g.isDoubleTap=!0),g.last=w,
p=setTimeout(o,f),s&&h&&s.addPointer(t.pointerId));
}).on("touchmove MSPointerMove pointermove",function(e){
(!(h=u(e,"move"))||r(e))&&(T=h?e:e.touches[0],n(),g.x2=T.pageX,g.y2=T.pageY,d+=Math.abs(g.x1-g.x2),
m+=Math.abs(g.y1-g.y2));
}).on("touchend MSPointerUp pointerup",function(o){
(!(h=u(o,"up"))||r(o))&&(n(),g.x2&&Math.abs(g.x1-g.x2)>30||g.y2&&Math.abs(g.y1-g.y2)>30?c=setTimeout(function(){
g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t(g.x1,g.x2,g.y1,g.y2))),
g={};
},0):"last"in g&&(30>d&&30>m?l=setTimeout(function(){
var t=e.Event("tap");
t.cancelTouch=i,g.el&&"function"==typeof g.el.trigger&&g.el.trigger(t),g.isDoubleTap?(g.el&&g.el.trigger("doubleTap"),
g={}):a=setTimeout(function(){
a=null,g.el&&g.el.trigger("singleTap"),g={};
},250);
},0):g={}),d=m=0);
}).on("touchcancel MSPointerCancel pointercancel",i),e(window).on("scroll",i);
}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){
e.fn[t]=function(e){
return this.on(t,e);
};
});
}(Zepto);
});define("biz_wap/zepto/event.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function n(e){
return e._zid||(e._zid=d++);
}
function t(e,t,o,u){
if(t=r(t),t.ns)var a=i(t.ns);
return(g[n(e)]||[]).filter(function(e){
return!(!e||t.e&&e.e!=t.e||t.ns&&!a.test(e.ns)||o&&n(e.fn)!==n(o)||u&&e.sel!=u);
});
}
function r(e){
var n=(""+e).split(".");
return{
e:n[0],
ns:n.slice(1).sort().join(" ")
};
}
function i(e){
return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)");
}
function o(e,n){
return e.del&&!y&&e.e in E||!!n;
}
function u(e){
return b[e]||y&&E[e]||e;
}
function a(t,i,a,s,f,d,l){
var v=n(t),h=g[v]||(g[v]=[]);
i.split(/\s/).forEach(function(n){
if("ready"==n)return e(document).ready(a);
var i=r(n);
i.fn=a,i.sel=f,i.e in b&&(a=function(n){
var t=n.relatedTarget;
return!t||t!==this&&!e.contains(this,t)?i.fn.apply(this,arguments):void 0;
}),i.del=d;
var v=d||a;
i.proxy=function(e){
if(e=c(e),!e.isImmediatePropagationStopped()){
e.customData=s;
var n=v.apply(t,e._args==p?[e]:[e].concat(e._args));
return n===!1&&(e.preventDefault(),e.stopPropagation()),n;
}
},i.i=h.length,h.push(i),"addEventListener"in t&&t.addEventListener(u(i.e),i.proxy,o(i,l));
});
}
function s(e,r,i,a,s){
var c=n(e);
(r||"").split(/\s/).forEach(function(n){
t(e,n,i,a).forEach(function(n){
delete g[c][n.i],"removeEventListener"in e&&e.removeEventListener(u(n.e),n.proxy,o(n,s));
});
});
}
function c(n,t){
return(t||!n.isDefaultPrevented)&&(t||(t=n),e.each(_,function(e,r){
var i=t[e];
n[e]=function(){
return this[r]=P,i&&i.apply(t,arguments);
},n[r]=z;
}),(t.defaultPrevented!==p?t.defaultPrevented:"returnValue"in t?t.returnValue===!1:t.getPreventDefault&&t.getPreventDefault())&&(n.isDefaultPrevented=P)),
n;
}
function f(e){
var n,t={
originalEvent:e
};
for(n in e)w.test(n)||e[n]===p||(t[n]=e[n]);
return c(t,e);
}
var p,d=(e.zepto.qsa,1),l=Array.prototype.slice,v=e.isFunction,h=function(e){
return"string"==typeof e;
},g={},m={},y="onfocusin"in window,E={
focus:"focusin",
blur:"focusout"
},b={
mouseenter:"mouseover",
mouseleave:"mouseout"
};
m.click=m.mousedown=m.mouseup=m.mousemove="MouseEvents",e.event={
add:a,
remove:s
},e.proxy=function(t,r){
if(v(t)){
var i=function(){
return t.apply(r,arguments);
};
return i._zid=n(t),i;
}
if(h(r))return e.proxy(t[r],t);
throw new TypeError("expected function");
},e.fn.bind=function(e,n,t){
return this.on(e,n,t);
},e.fn.unbind=function(e,n){
return this.off(e,n);
},e.fn.one=function(e,n,t,r){
return this.on(e,n,t,r,1);
};
var P=function(){
return!0;
},z=function(){
return!1;
},w=/^([A-Z]|returnValue$|layer[XY]$)/,_={
preventDefault:"isDefaultPrevented",
stopImmediatePropagation:"isImmediatePropagationStopped",
stopPropagation:"isPropagationStopped"
};
e.fn.delegate=function(e,n,t){
return this.on(n,e,t);
},e.fn.undelegate=function(e,n,t){
return this.off(n,e,t);
},e.fn.live=function(n,t){
return e(document.body).delegate(this.selector,n,t),this;
},e.fn.die=function(n,t){
return e(document.body).undelegate(this.selector,n,t),this;
},e.fn.on=function(n,t,r,i,o){
var u,c,d=this;
return n&&!h(n)?(e.each(n,function(e,n){
d.on(e,t,r,n,o);
}),d):(h(t)||v(i)||i===!1||(i=r,r=t,t=p),(v(r)||r===!1)&&(i=r,r=p),i===!1&&(i=z),
d.each(function(p,d){
o&&(u=function(e){
return s(d,e.type,i),i.apply(this,arguments);
}),t&&(c=function(n){
var r,o=e(n.target).closest(t,d).get(0);
return o&&o!==d?(r=e.extend(f(n),{
currentTarget:o,
liveFired:d
}),(u||i).apply(o,[r].concat(l.call(arguments,1)))):void 0;
}),a(d,n,i,r,t,c||u);
}));
},e.fn.off=function(n,t,r){
var i=this;
return n&&!h(n)?(e.each(n,function(e,n){
i.off(e,t,n);
}),i):(h(t)||v(r)||r===!1||(r=t,t=p),r===!1&&(r=z),i.each(function(){
s(this,n,r,t);
}));
},e.fn.trigger=function(n,t){
return n=h(n)||e.isPlainObject(n)?e.Event(n):c(n),n._args=t,this.each(function(){
"dispatchEvent"in this?this.dispatchEvent(n):e(this).triggerHandler(n,t);
});
},e.fn.triggerHandler=function(n,r){
var i,o;
return this.each(function(u,a){
i=f(h(n)?e.Event(n):n),i._args=r,i.target=a,e.each(t(a,n.type||n),function(e,n){
return o=n.proxy(i),i.isImmediatePropagationStopped()?!1:void 0;
});
}),o;
},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.trigger(n);
};
}),["focus","blur"].forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.each(function(){
try{
this[n]();
}catch(e){}
}),this;
};
}),e.Event=function(e,n){
h(e)||(n=e,e=n.type);
var t=document.createEvent(m[e]||"Events"),r=!0;
if(n)for(var i in n)"bubbles"==i?r=!!n[i]:t[i]=n[i];
return t.initEvent(e,r,!0),c(t);
};
}(Zepto);
});define("biz_wap/zepto/zepto.js",[],function(){
"use strict";
var t=function(){
function t(t){
return null==t?String(t):J[W.call(t)]||"object";
}
function n(n){
return"function"==t(n);
}
function e(t){
return null!=t&&t==t.window;
}
function i(t){
return null!=t&&t.nodeType==t.DOCUMENT_NODE;
}
function r(n){
return"object"==t(n);
}
function o(t){
return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype;
}
function s(t){
return t instanceof Array;
}
function u(t){
return"number"==typeof t.length;
}
function c(t){
return P.call(t,function(t){
return null!=t;
});
}
function a(t){
return t.length>0?C.fn.concat.apply([],t):t;
}
function l(t){
return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase();
}
function f(t){
return t in M?M[t]:M[t]=new RegExp("(^|\\s)"+t+"(\\s|$)");
}
function h(t,n){
return"number"!=typeof n||z[l(t)]?n:n+"px";
}
function p(t){
var n,e;
return j[t]||(n=L.createElement(t),L.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),
n.parentNode.removeChild(n),"none"==e&&(e="block"),j[t]=e),j[t];
}
function d(t){
return"children"in t?$.call(t.children):C.map(t.childNodes,function(t){
return 1==t.nodeType?t:void 0;
});
}
function g(t,n,e){
for(E in n)e&&(o(n[E])||s(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),s(n[E])&&!s(t[E])&&(t[E]=[]),
g(t[E],n[E],e)):n[E]!==x&&(t[E]=n[E]);
}
function m(t,n){
return null==n?C(t):C(t).filter(n);
}
function v(t,e,i,r){
return n(e)?e.call(t,i,r):e;
}
function y(t,n,e){
null==e?t.removeAttribute(n):t.setAttribute(n,e);
}
function b(t,n){
var e=t.className,i=e&&e.baseVal!==x;
return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n);
}
function w(t){
var n;
try{
return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?C.parseJSON(t):t:n):t;
}catch(e){
return t;
}
}
function N(t,n){
n(t);
for(var e in t.childNodes)N(t.childNodes[e],n);
}
var x,E,C,O,T,S,A=[],$=A.slice,P=A.filter,L=window.document,j={},M={},z={
"column-count":1,
columns:1,
"font-weight":1,
"line-height":1,
opacity:1,
"z-index":1,
zoom:1
},Z=/^\s*<(\w+|!)[^>]*>/,q=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,_=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,k=/^(?:body|html)$/i,B=/([A-Z])/g,R=["val","css","html","text","data","width","height","offset"],V=["after","prepend","before","append"],F=L.createElement("table"),H=L.createElement("tr"),I={
tr:L.createElement("tbody"),
tbody:F,
thead:F,
tfoot:F,
td:H,
th:H,
"*":L.createElement("div")
},U=/complete|loaded|interactive/,D=/^[\w-]*$/,J={},W=J.toString,X={},Y=L.createElement("div"),G={
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
};
return X.matches=function(t,n){
if(!n||!t||1!==t.nodeType)return!1;
var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;
if(e)return e.call(t,n);
var i,r=t.parentNode,o=!r;
return o&&(r=Y).appendChild(t),i=~X.qsa(r,n).indexOf(t),o&&Y.removeChild(t),i;
},T=function(t){
return t.replace(/-+(.)?/g,function(t,n){
return n?n.toUpperCase():"";
});
},S=function(t){
return P.call(t,function(n,e){
return t.indexOf(n)==e;
});
},X.fragment=function(t,n,e){
var i,r,s;
return q.test(t)&&(i=C(L.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(_,"<$1></$2>")),
n===x&&(n=Z.test(t)&&RegExp.$1),n in I||(n="*"),s=I[n],s.innerHTML=""+t,i=C.each($.call(s.childNodes),function(){
s.removeChild(this);
})),o(e)&&(r=C(i),C.each(e,function(t,n){
R.indexOf(t)>-1?r[t](n):r.attr(t,n);
})),i;
},X.Z=function(t,n){
return t=t||[],t.__proto__=C.fn,t.selector=n||"",t;
},X.isZ=function(t){
return t instanceof X.Z;
},X.init=function(t,e){
var i;
if(!t)return X.Z();
if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&Z.test(t))i=X.fragment(t,RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}else{
if(n(t))return C(L).ready(t);
if(X.isZ(t))return t;
if(s(t))i=c(t);else if(r(t))i=[t],t=null;else if(Z.test(t))i=X.fragment(t.trim(),RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}
}
return X.Z(i,t);
},C=function(t,n){
return X.init(t,n);
},C.extend=function(t){
var n,e=$.call(arguments,1);
return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){
g(t,e,n);
}),t;
},X.qsa=function(t,n){
var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,u=D.test(s);
return i(t)&&u&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:$.call(u&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n));
},C.contains=function(t,n){
return t!==n&&t.contains(n);
},C.type=t,C.isFunction=n,C.isWindow=e,C.isArray=s,C.isPlainObject=o,C.isEmptyObject=function(t){
var n;
for(n in t)return!1;
return!0;
},C.inArray=function(t,n,e){
return A.indexOf.call(n,t,e);
},C.camelCase=T,C.trim=function(t){
return null==t?"":String.prototype.trim.call(t);
},C.uuid=0,C.support={},C.expr={},C.map=function(t,n){
var e,i,r,o=[];
if(u(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),
null!=e&&o.push(e);
return a(o);
},C.each=function(t,n){
var e,i;
if(u(t)){
for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t;
}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;
return t;
},C.grep=function(t,n){
return P.call(t,n);
},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){
J["[object "+n+"]"]=n.toLowerCase();
}),C.fn={
forEach:A.forEach,
reduce:A.reduce,
push:A.push,
sort:A.sort,
indexOf:A.indexOf,
concat:A.concat,
map:function(t){
return C(C.map(this,function(n,e){
return t.call(n,e,n);
}));
},
slice:function(){
return C($.apply(this,arguments));
},
ready:function(t){
return U.test(L.readyState)&&L.body?t(C):L.addEventListener("DOMContentLoaded",function(){
t(C);
},!1),this;
},
get:function(t){
return t===x?$.call(this):this[t>=0?t:t+this.length];
},
toArray:function(){
return this.get();
},
size:function(){
return this.length;
},
remove:function(){
return this.each(function(){
null!=this.parentNode&&this.parentNode.removeChild(this);
});
},
each:function(t){
return A.every.call(this,function(n,e){
return t.call(n,e,n)!==!1;
}),this;
},
filter:function(t){
return n(t)?this.not(this.not(t)):C(P.call(this,function(n){
return X.matches(n,t);
}));
},
add:function(t,n){
return C(S(this.concat(C(t,n))));
},
is:function(t){
return this.length>0&&X.matches(this[0],t);
},
not:function(t){
var e=[];
if(n(t)&&t.call!==x)this.each(function(n){
t.call(this,n)||e.push(this);
});else{
var i="string"==typeof t?this.filter(t):u(t)&&n(t.item)?$.call(t):C(t);
this.forEach(function(t){
i.indexOf(t)<0&&e.push(t);
});
}
return C(e);
},
has:function(t){
return this.filter(function(){
return r(t)?C.contains(this,t):C(this).find(t).size();
});
},
eq:function(t){
return-1===t?this.slice(t):this.slice(t,+t+1);
},
first:function(){
var t=this[0];
return t&&!r(t)?t:C(t);
},
last:function(){
var t=this[this.length-1];
return t&&!r(t)?t:C(t);
},
find:function(t){
var n,e=this;
return n="object"==typeof t?C(t).filter(function(){
var t=this;
return A.some.call(e,function(n){
return C.contains(n,t);
});
}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){
return X.qsa(this,t);
});
},
closest:function(t,n){
var e=this[0],r=!1;
for("object"==typeof t&&(r=C(t));e&&!(r?r.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;
return C(e);
},
parents:function(t){
for(var n=[],e=this;e.length>0;)e=C.map(e,function(t){
return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0;
});
return m(n,t);
},
parent:function(t){
return m(S(this.pluck("parentNode")),t);
},
children:function(t){
return m(this.map(function(){
return d(this);
}),t);
},
contents:function(){
return this.map(function(){
return $.call(this.childNodes);
});
},
siblings:function(t){
return m(this.map(function(t,n){
return P.call(d(n.parentNode),function(t){
return t!==n;
});
}),t);
},
empty:function(){
return this.each(function(){
this.innerHTML="";
});
},
pluck:function(t){
return C.map(this,function(n){
return n[t];
});
},
show:function(){
return this.each(function(){
"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName));
});
},
replaceWith:function(t){
return this.before(t).remove();
},
wrap:function(t){
var e=n(t);
if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;
return this.each(function(n){
C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i);
});
},
wrapAll:function(t){
if(this[0]){
C(this[0]).before(t=C(t));
for(var n;(n=t.children()).length;)t=n.first();
C(t).append(this);
}
return this;
},
wrapInner:function(t){
var e=n(t);
return this.each(function(n){
var i=C(this),r=i.contents(),o=e?t.call(this,n):t;
r.length?r.wrapAll(o):i.append(o);
});
},
unwrap:function(){
return this.parent().each(function(){
C(this).replaceWith(C(this).children());
}),this;
},
clone:function(){
return this.map(function(){
return this.cloneNode(!0);
});
},
hide:function(){
return this.css("display","none");
},
toggle:function(t){
return this.each(function(){
var n=C(this);
(t===x?"none"==n.css("display"):t)?n.show():n.hide();
});
},
prev:function(t){
return C(this.pluck("previousElementSibling")).filter(t||"*");
},
next:function(t){
return C(this.pluck("nextElementSibling")).filter(t||"*");
},
html:function(t){
return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(n){
var e=this.innerHTML;
C(this).empty().append(v(this,t,n,e));
});
},
text:function(t){
return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){
this.textContent=t===x?"":""+t;
});
},
attr:function(t,n){
var e;
return"string"==typeof t&&n===x?0==this.length||1!==this[0].nodeType?x:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:this.each(function(e){
if(1===this.nodeType)if(r(t))for(E in t)y(this,E,t[E]);else y(this,t,v(this,n,e,this.getAttribute(t)));
});
},
removeAttr:function(t){
return this.each(function(){
1===this.nodeType&&y(this,t);
});
},
prop:function(t,n){
return t=G[t]||t,n===x?this[0]&&this[0][t]:this.each(function(e){
this[t]=v(this,n,e,this[t]);
});
},
data:function(t,n){
var e=this.attr("data-"+t.replace(B,"-$1").toLowerCase(),n);
return null!==e?w(e):x;
},
val:function(t){
return 0===arguments.length?this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){
return this.selected;
}).pluck("value"):this[0].value):this.each(function(n){
this.value=v(this,t,n,this.value);
});
},
offset:function(t){
if(t)return this.each(function(n){
var e=C(this),i=v(this,t,n,e.offset()),r=e.offsetParent().offset(),o={
top:i.top-r.top,
left:i.left-r.left
};
"static"==e.css("position")&&(o.position="relative"),e.css(o);
});
if(0==this.length)return null;
var n=this[0].getBoundingClientRect();
return{
left:n.left+window.pageXOffset,
top:n.top+window.pageYOffset,
width:Math.round(n.width),
height:Math.round(n.height)
};
},
css:function(n,e){
if(arguments.length<2){
var i=this[0],r=getComputedStyle(i,"");
if(!i)return;
if("string"==typeof n)return i.style[T(n)]||r.getPropertyValue(n);
if(s(n)){
var o={};
return C.each(s(n)?n:[n],function(t,n){
o[n]=i.style[T(n)]||r.getPropertyValue(n);
}),o;
}
}
var u="";
if("string"==t(n))e||0===e?u=l(n)+":"+h(n,e):this.each(function(){
this.style.removeProperty(l(n));
});else for(E in n)n[E]||0===n[E]?u+=l(E)+":"+h(E,n[E])+";":this.each(function(){
this.style.removeProperty(l(E));
});
return this.each(function(){
this.style.cssText+=";"+u;
});
},
index:function(t){
return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0]);
},
hasClass:function(t){
return t?A.some.call(this,function(t){
return this.test(b(t));
},f(t)):!1;
},
addClass:function(t){
return t?this.each(function(n){
O=[];
var e=b(this),i=v(this,t,n,e);
i.split(/\s+/g).forEach(function(t){
C(this).hasClass(t)||O.push(t);
},this),O.length&&b(this,e+(e?" ":"")+O.join(" "));
}):this;
},
removeClass:function(t){
return this.each(function(n){
return t===x?b(this,""):(O=b(this),v(this,t,n,O).split(/\s+/g).forEach(function(t){
O=O.replace(f(t)," ");
}),void b(this,O.trim()));
});
},
toggleClass:function(t,n){
return t?this.each(function(e){
var i=C(this),r=v(this,t,e,b(this));
r.split(/\s+/g).forEach(function(t){
(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t);
});
}):this;
},
scrollTop:function(t){
if(this.length){
var n="scrollTop"in this[0];
return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){
this.scrollTop=t;
}:function(){
this.scrollTo(this.scrollX,t);
});
}
},
scrollLeft:function(t){
if(this.length){
var n="scrollLeft"in this[0];
return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){
this.scrollLeft=t;
}:function(){
this.scrollTo(t,this.scrollY);
});
}
},
position:function(){
if(this.length){
var t=this[0],n=this.offsetParent(),e=this.offset(),i=k.test(n[0].nodeName)?{
top:0,
left:0
}:n.offset();
return e.top-=parseFloat(C(t).css("margin-top"))||0,e.left-=parseFloat(C(t).css("margin-left"))||0,
i.top+=parseFloat(C(n[0]).css("border-top-width"))||0,i.left+=parseFloat(C(n[0]).css("border-left-width"))||0,
{
top:e.top-i.top,
left:e.left-i.left
};
}
},
offsetParent:function(){
return this.map(function(){
for(var t=this.offsetParent||L.body;t&&!k.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;
return t;
});
}
},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){
var n=t.replace(/./,function(t){
return t[0].toUpperCase();
});
C.fn[t]=function(r){
var o,s=this[0];
return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){
s=C(this),s.css(t,v(this,r,n,s[t]()));
});
};
}),V.forEach(function(n,e){
var i=e%2;
C.fn[n]=function(){
var n,r,o=C.map(arguments,function(e){
return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e);
}),s=this.length>1;
return o.length<1?this:this.each(function(t,n){
r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null,o.forEach(function(t){
if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();
N(r.insertBefore(t,n),function(t){
null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML);
});
});
});
},C.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){
return C(t)[n](this),this;
};
}),X.Z.prototype=C.fn,X.uniq=S,X.deserializeValue=w,C.zepto=X,C;
}();
window.Zepto=t,void 0===window.$&&(window.$=t);
});;define('page/pages/video.css', [], function(require, exports, module) {
	return "html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:16px}body,h1,h2,h3,h4,h5,p,ul,ol,dl,dd,fieldset,textarea{margin:0}fieldset,legend,textarea,input,button{padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;*font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}ul,ol{padding-left:0;list-style-type:none}a img,fieldset{border:0}a{text-decoration:none}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.6}a{color:#607fa6;text-decoration:none}.tips_global{color:#8c8c8c}.tc{text-align:center}.tr{text-align:right}.line_wrp{line-height:58px;color:#607fa6}body,html{height:100%;width:100%;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.none{display:none}.clearfix:after{content:\" \";display:block;clear:both;height:0}.clearfix{zoom:1}.wrp_pop_tips{width:100%;height:100%;background-color:#000;position:absolute;left:0;top:0;z-index:20;line-height:100%;text-align:center}.wrp_pop_tips .pop_tips{position:absolute;top:50%;left:0;margin-top:-36px;display:inline-block;padding:15px 0;text-align:center;color:#fff;width:100%}.wrp_pop_tips .pop_tips .error_code{display:block;font-style:normal;font-size:12px;color:#888;margin-top:10px}.wrp_load_failed{width:100%;height:100%;background-color:#000;position:absolute;left:0;top:0;z-index:20;line-height:100%;text-align:center}.wrp_load_failed .wrp_icon_info{width:60px;height:60px;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;border:1px solid #fff;position:absolute;left:50%;top:50%;display:block;margin-left:-30px;margin-top:-50px}.wrp_load_failed .wrp_icon_info:after{content:\"\";position:absolute;left:50%;top:50%;display:block;width:50px;height:50px;margin-left:-25px;margin-top:-25px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_load_faild27d36a.png) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto}.wrp_load_failed p{width:100%;height:60px;position:absolute;top:50%;display:block;margin-top:30px;color:#fff}.page_video{min-height:200px;max-height:100%;position:relative;background-color:#000}.page_video .wrp_loading{width:100%;height:100%;position:absolute;left:0;top:0;z-index:8}.page_video .wrp_loading .svg_loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px}.page_video .wrp_loading.start_loading .mid_opr{width:100%;height:100%;top:0;left:0;bottom:0;right:0;margin:0}.page_video .mid_opr{width:52px;height:52px;position:absolute;left:50%;top:50%;margin-left:-26px;margin-top:-26px;z-index:10;background-color:rgba(0,0,0,0.5);text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#fff}.page_video .mid_opr .spinner{transform:scale(0.7);-webkit-transform:scale(0.7);-moz-transform:scale(0.7);-ms-transform:scale(0.7)}.page_video .mid_opr .icon_mid_play{display:inline-block;width:0;height:0;margin-top:25px;margin-left:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.page_video .mid_opr .icon_mid_speed_play{display:inline-block;width:35px;height:20px;margin-top:27px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_speed_play27d36a.png) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto}.page_video .mid_opr .video_length{color:#cbcbcb;font-size:12px}.page_video .mid_opr .video_length .played_time{color:#fff;font-weight:400}.page_video .mid_opr .video_length em{margin:0 2px}.page_video .mid_opr.fast_pre_next{width:132px;height:52px;border-radius:3px;margin-left:-66px;margin-top:-26px;background-color:rgba(0,0,0,0.5)}.page_video .mid_opr.fast_pre_next .video_length{padding-top:10px;padding-bottom:7px;font-weight:300}.page_video .mid_opr .video_processor_bar{position:relative;margin:0 auto;width:106px;height:3px;border-radius:2px;background-color:rgba(0,0,0,0.4);text-align:left}.page_video .mid_opr .processor_bar_inner{position:absolute;display:inline-block;width:106px;height:3px;border-radius:2px;background-color:#09bb07;opacity:.9}.page_video .mid_opr.next .icon_mid_speed_play{transform:rotate(180deg);-webkit-transform:rotate(180deg)}.page_video .full_screen_opr{z-index:12;text-align:center;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,0.5)}.page_video .full_screen_opr .icon_mid_play{display:inline-block;width:0;height:0;margin-top:25px;margin-left:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.page_video .full_screen_opr .video_length{color:#fefefe;font-size:12px}.page_video .full_screen_opr .video_length .played_time{color:#fff;font-weight:400}.page_video .full_screen_opr .video_length em{margin:0 2px}.page_video .full_screen_opr .mid_play_box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%)}.page_video .full_screen_opr .mid_play_box .video_length{font-size:14px;font-weight:300}.page_video .poster_cover{height:100%;width:100%;text-align:center;position:absolute;overflow:hidden;left:0;top:0;z-index:7}.page_video .poster_cover img{height:100%;width:100%;position:absolute;left:0;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%)}.page_video .poster_cover_mask{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.35)}.page_video .continue_play{position:absolute;left:0;top:0;right:0;bottom:0;z-index:11;color:#fff;font-size:14px;background-color:#000}.page_video .continue_play .continue_opr{position:absolute;text-align:right;bottom:15px;right:4%;z-index:2}.page_video .continue_play .continue_opr .btn_replay{color:#fff}.page_video .continue_play .continue_opr .icon_replay{display:inline-block;width:12px;height:13px;margin-right:5px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_replay27d36a.png) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto;vertical-align:middle}.page_video .continue_play .continue_nav{position:absolute;z-index:3;bottom:15px;left:50%;margin-left:-20px;width:40px}.page_video .continue_play .continue_nav .nav_dot{width:4px;height:4px;font-size:0;text-indent:-999em;display:inline-block;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;border:1px solid #949494;margin-right:3px}.page_video .continue_play .continue_nav .nav_dot.current{background-color:#fff;border-color:#fff}.page_video .continue_play .tit_desc{width:94%;position:absolute;height:150px;top:50%;margin-top:-98px;left:50%;margin-left:-47%;color:#959494;text-align:left}.page_video .continue_play .tit_desc span{display:block;border-bottom:1px solid #2c2c2c;padding-bottom:8px}.page_video .continue_play .wrp_video_continue{position:relative;height:100%;left:0;top:0}.page_video .continue_play .dl_video_continue{position:relative;height:100%;left:0;top:0;z-index:1}.page_video .continue_play .dd_continue_inner{width:100%;position:relative;top:50%;height:150px;margin-top:-68px;text-align:center;z-index:0}.page_video .continue_play .dd_continue_inner .video_list{display:table;width:94%;text-align:left;margin:15px auto 0;font-size:12px}.page_video .continue_play .dd_continue_inner .video_list .video_item{height:35px;margin-bottom:15px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item{display:block;position:relative;color:#fff}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:60px;height:35px;position:absolute;left:0;top:0}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{padding-left:70px;margin-top:-5px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;box-sizing:border-box;-webkit-box-sizing:border-box}.page_video .continue_play .dd_continue_inner .video_list .video_item:last-child{margin-bottom:0}.page_video .video_mask{width:100%;height:100%;background-color:rgba(0,0,0,0.5);position:absolute;left:0;top:0;z-index:1}.page_video .inner{position:relative;width:100%;height:100%;z-index:6;overflow:hidden}.page_video .inner .video_poster{width:100%;height:100%}.page_video .inner .video_poster video{width:100%;height:100%;vertical-align:middle;position:relative;z-index:1;padding:0;top:0}.page_video .inner .video_poster video::-webkit-media-controls{display:none!important}.page_video .inner .video_poster .video_mask{width:100%;height:100%;vertical-align:middle;position:absolute;z-index:2;background-color:transparent}.page_video .video_opr{background-color:rgba(0,0,0,0.6);color:#fff;z-index:9;position:absolute;left:0;right:0;bottom:0;color:#cbcbcb;height:50px;font-size:14px}.page_video .video_opr .opr_inner{padding:0 15px;position:relative}.page_video .video_opr .opr_inner .opr_inner_fl{position:absolute;left:15px;top:0}.page_video .video_opr .opr_inner .opr_inner_fr{position:absolute;right:15px;top:0}.page_video .video_opr .opr_inner .wrp_play_bar{padding:24px 90px 23px 82px;box-sizing:border-box;-webkit-box-sizing:border-box}.page_video .video_opr .opr_inner_fl .switch{display:inline-block;vertical-align:middle;padding:16px 12px 12px 0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-appearance:none}.page_video .video_opr .opr_inner_fl .switch .btn_opr{width:15px;height:18px;display:inline-block;text-indent:-999em}.page_video .video_opr .opr_inner_fl .switch.switch_on .btn_opr{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_play_small27d36a.png) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto}.page_video .video_opr .opr_inner_fl .switch.switch_off .btn_opr{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTg1RjJGODBGQTBBMTFFNEI2QUJCQjU2OEZFMTFENzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTg1RjJGODFGQTBBMTFFNEI2QUJCQjU2OEZFMTFENzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODVGMkY3RUZBMEExMUU0QjZBQkJCNTY4RkUxMUQ3NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxODVGMkY3RkZBMEExMUU0QjZBQkJCNTY4RkUxMUQ3NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PmECzPoAAABRSURBVHja7NgxDgAgCEPRYjye1\/V8qIOjii4uvwkTKW\/H3F2L1D5jWXSXUM828FzYJRzqJX0KMDAwMDAwMDAwMDAwMDCwlA8vBXu4Geo1AQYA08wNr4Eto7IAAAAASUVORK5CYII=) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto}.page_video .video_opr .opr_inner_fl .played_time{display:inline-block;vertical-align:middle;color:#fff;font-size:12px;padding:14px 0;font-weight:300}.page_video .video_opr .wrp_play_bar .wrp_progress{position:relative;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar{height:3px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;background-color:#454545;position:relative}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .played_bar{position:absolute;height:3px;left:0;top:0;background-color:#fff;z-index:4;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .buffer_bar{position:absolute;height:3px;left:0;top:0;background-color:#a2a2a2;z-index:3;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .wrp_speed_dot{position:absolute;left:-1px;top:50%;margin-top:-10px;width:20px;height:20px;line-height:15px;z-index:5}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .wrp_speed_dot .speed_dot{width:12px;height:12px;position:absolute;top:50%;margin-top:-6px;background-color:#fff;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;margin-left:-1px}.page_video .video_opr .opr_inner_fr .total_time{color:#fff;font-size:12px;display:inline-block;padding:14px 0;top:-1px;position:relative;font-weight:300}.page_video .video_opr .opr_inner_fr .screenSize_control{display:inline-block;vertical-align:middle;padding:14px 0 14px 8px;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.page_video .video_opr .opr_inner_fr .screenSize_control .icon_control{width:18px;height:18px;display:inline-block;text-indent:-999em;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYVJREFUWAnt2DtOwzAYB\/DmsaGoGwdAygHyYunOAkdAnIudjZkuSHCAJkuy0gvAxkgUKXz\/CEskcRLbdWwGLEVuP79+tVvb6mbzx5IDT1EU723bnsvYHMfZp2l6I9NGpK6LSrIYkY5V6\/jDhvTJPwl4lWXZYVhm4n03Q2ygH8yW8uc8zy9Z3GTeA2FmbKN6ICyTbVQPhKWxjRqBbKO4IJuoSZAt1CzIBmoRZBolBDKJ6kC0Ge7xYOC5xNsSqqq6mGsjW9ad9rKNcKzgeKFNdOt53l0cxw+yfUzVVwKhM8xM0zS7IAgewzD8mhrgP657BpSXjAcpy\/Ksrutb13VfkiQ58uosxYR\/9ksdoRwYyu7py16o3qe0gnzff1W5T9Gd\/gkPPpRWUBRFbyr3KWpzjUc7CB3yNk+Z5dM6QwAhnYJaBXQKajWQKmpVkApqdZAsyghIBmUMJIoyCppCIc6ScRAGHu5TDIN89O\/H70LV1ziX2FEw1wfVGRVbmaGRggJ0KH\/w4tZj37PhT+ObZtthAAAAAElFTkSuQmCC) no-repeat 0 0;-webkit-background-size:18px 18px;background-size:18px 18px}.full_mask{position:fixed;bottom:0;top:0;left:0;right:0;z-index:1;background-color:#000;display:none}.full_screen_mv .page_video{position:absolute;left:50%;top:50%;margin-left:-150px;margin-top:-100px;background-color:#000;z-index:10}.full_screen_mv .page_video .inner{overflow:visible;position:absolute;left:0;top:0}.full_screen_mv .page_video .inner .video_poster video{background-color:#000;max-height:100%;max-width:100%;display:inline-block}.full_screen_mv .page_video .video_opr{position:fixed;bottom:0}.full_screen_mv .page_video .video_opr .screenSize_control .icon_control{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_rebackplay@2x27d36a.png) no-repeat 0 0;-webkit-background-size:100% auto;background-size:100% auto}.full_screen_mv .page_content{height:100%;overflow:hidden}.full_screen_mv .full_mask{display:block}@media all and (orientation:portrait){.full_screen_mv .opr_fade_out{-webkit-animation:opr_fade_out .4s ease-in-out 1}.full_screen_mv .opr_fade_in{-webkit-animation:opr_fade_in .4s ease-in-out 1}@-webkit-keyframes opr_fade_out{0%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}100%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}}@-webkit-keyframes opr_fade_in{0%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}100%{bottom:0;filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}}}@media all and (orientation:landscape){.full_screen_mv .page_video .video_opr .opr_inner{padding:0 25px}.full_screen_mv .page_video .video_opr .opr_inner .opr_inner_fl{left:25px}.full_screen_mv .page_video .video_opr .opr_inner .opr_inner_fr{right:25px}}.interact_video{text-align:right;background-color:#f5f5f5;border:1px solid #e7e6e4;line-height:2.5;overflow:hidden;font-size:11px;padding:0 15px;font-size:14px;position:relative}.interact_video .access_original{-webkit-tap-highlight-color:rgba(0,0,0,0);color:#959494;position:absolute;left:0;right:0;top:0;bottom:0;text-align:right;padding-right:15px}.interact_video .access_original:after{content:\" \";display:inline-block;height:7px;width:7px;border-width:1px 1px 0 0;border-color:#c8c7cd;border-style:solid;transform:matrix(0.71,0.71,-0.71,0.71,0,0);-ms-transform:matrix(0.71,0.71,-0.71,0.71,0,0);-webkit-transform:matrix(0.71,0.71,-0.71,0.71,0,0);position:relative;top:-2px;top:-1px;margin-left:.3em}.interact_video .video_original{text-align:left;padding-left:15px;padding-right:25px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.interact_video .video_original:after{position:absolute;top:50%;margin-top:-4px;right:15px}.interact_video .video_resource{float:left;color:#959494}.interact_video .inter_opr{float:right;color:#607fa6}.interact_video .inter_opr .praise_area{padding-left:10px;float:right}.interact_video .inter_opr .btn_detail{display:inline-block;text-align:center;position:relative}.interact_video .inter_opr .love_num{font-size:13px;line-height:13px}.interact_video .inter_opr .icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;vertical-align:0;position:relative;top:1px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.interact_video .inter_opr .loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.pages_common_area{overflow:hidden}.tc{text-align:center}.tr{text-align:right}.tips_global{color:#8c8c8c}.video_info_area{margin-top:1em}.video_info_area.empty_data .praise_access_wrp{float:none}.video_info_area.empty_data .praise_user_list{padding:0}.video_info_area.empty_data .praise_access_wrp,.video_info_area.empty_data .comment_access_wrp{text-align:center}.video_info_area.empty_data .discuss_container{margin-right:15px;padding-right:0}.video_info_hd{overflow:hidden;font-size:14px;line-height:2.2em;padding:0 15px;position:relative}.video_info_hd:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #dfdfdd;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.video_info_bd{padding:0 0 0 15px}.video_extend_inner{padding-right:15px}.no_in_mm{padding-top:2em}.mpvideo_wrp{min-height:270px}.video_abstract{position:relative;margin-top:10px;font-size:14px;padding:15px}.video_abstract .video_title{font-size:16px;font-weight:400;font-style:normal}.video_abstract .inner_abstract{padding-top:10px;color:#8c8c8c;line-height:1.6;max-height:4.7em;overflow:hidden;margin-bottom:.5em;word-wrap:break-word;word-break:break-all;-webkit-transition:max-height .3s ease-in}.video_abstract .inner_abstract.hide{position:absolute;left:15px;right:15px;visibility:hidden;z-index:-1;max-height:none}.opr_fade_out{-webkit-animation:opr_fade_out .7s ease-in-out 1}.opr_fade_in{-webkit-animation:opr_fade_in .7s ease-in-out 1}@-webkit-keyframes opr_fade_out{0%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}100%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}}@-webkit-keyframes opr_fade_in{0%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}100%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}}.video_pause_controll{position:absolute;z-index:12;left:0;top:0;width:100%;height:100%;display:none;background-color:rgba(0,0,0,0.5)}.video_pause_controll .btn_pause{position:absolute;left:50%;top:50%;z-index:10;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);text-align:center;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;color:#fff}.video_pause_controll .btn_pause .icon_pause{display:inline-block;font-size:0;width:0;height:0;margin-top:25px;margin-left:25px;margin-bottom:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.video_ad{position:absolute;z-index:13;right:0;top:0;width:100%;height:54px;text-align:right;padding-top:4px;padding-right:10px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background-image:-webkit-gradient(linear,0 0,0 100%,from(rgba(51,51,51,0.43)),to(rgba(255,255,255,0)));background-image:-webkit-linear-gradient(top,rgba(51,51,51,0.43) 0,rgba(255,255,255,0) 100%);background-image:linear-gradient(to bottom,rgba(51,51,51,0.43) 0,rgba(255,255,255,0) 100%)}.video_ad_detail{position:absolute;z-index:14;right:0;bottom:0;width:100%;height:30px}.video_ad_detail .btn_ad_detail{position:absolute;right:10px;bottom:10px;background-color:rgba(37,37,37,0.7);padding:2px 10px;border-radius:4px;font-size:12px;color:#fff}.video_ad_detail .btn_ad_detail.primary{color:#09ba07;border:1px solid #09ba07;overflow:hidden}.video_ad_detail .btn_ad_detail.with_arrow{background-color:rgba(45,45,45,0.7);padding:0;line-height:2.3;min-width:98px;text-align:center}.video_ad_detail .btn_ad_detail.with_arrow:after{content:\" \";display:inline-block;height:7px;width:7px;border-width:1px 1px 0 0;border-color:#fff;border-style:solid;transform:matrix(0.71,0.71,-0.71,0.71,0,0);-ms-transform:matrix(0.71,0.71,-0.71,0.71,0,0);-webkit-transform:matrix(0.71,0.71,-0.71,0.71,0,0);position:relative;top:-2px;top:0;margin-top:-2px;margin-left:4px;vertical-align:middle}.video_ad_time_meta{font-size:12px;margin-left:.7em;padding-left:.7em;color:#fff;position:relative}.video_ad_time_meta:before{content:\" \";width:1px;height:10px;background-color:#fff;position:absolute;left:-2px;top:50%;margin-top:-5px}.video_ad_time_meta:first-child:before{display:none}.btn_close .left_time{color:#fcd037;position:relative;margin-right:10px;font-weight:400;font-style:normal}.imgad_cover{height:100%;width:100%;text-align:center;position:absolute;overflow:hidden;left:0;top:0;z-index:7}.imgad_cover img{height:100%;width:100%}.imgad_cover_border{border:1px solid #d8d8d8;position:absolute;left:-1px;top:-1px;right:-1px;bottom:-1px}@media(min-device-width:480px){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}}@media(min-device-width:360px){.video_ad_time_meta{font-size:13px}.video_ad_detail .btn_ad_detail{font-size:14px}}@media only screen and (min-width:375px){.page_video .continue_play .tit_desc{margin-top:-120px}.page_video .continue_play .dd_continue_inner{margin-top:-88px}.page_video .continue_play .dd_continue_inner .video_list{font-size:14px}.page_video .continue_play .dd_continue_inner .video_list .video_item{height:50px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:80px;height:50px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{padding-left:95px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{font-size:14px}}@-webkit-keyframes opacity-60-25-0-12{0%{opacity:.25}0.01%{opacity:.25}0.02%{opacity:1}60.01%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-1-12{0%{opacity:.25}8.34333%{opacity:.25}8.35333%{opacity:1}68.3433%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-2-12{0%{opacity:.25}16.6767%{opacity:.25}16.6867%{opacity:1}76.6767%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-3-12{0%{opacity:.25}25.01%{opacity:.25}25.02%{opacity:1}85.01%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-4-12{0%{opacity:.25}33.3433%{opacity:.25}33.3533%{opacity:1}93.3433%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-5-12{0%{opacity:.270958333333333}41.6767%{opacity:.25}41.6867%{opacity:1}1.67667%{opacity:.25}100%{opacity:.270958333333333}}@-webkit-keyframes opacity-60-25-6-12{0%{opacity:.375125}50.01%{opacity:.25}50.02%{opacity:1}10.01%{opacity:.25}100%{opacity:.375125}}@-webkit-keyframes opacity-60-25-7-12{0%{opacity:.479291666666667}58.3433%{opacity:.25}58.3533%{opacity:1}18.3433%{opacity:.25}100%{opacity:.479291666666667}}@-webkit-keyframes opacity-60-25-8-12{0%{opacity:.583458333333333}66.6767%{opacity:.25}66.6867%{opacity:1}26.6767%{opacity:.25}100%{opacity:.583458333333333}}@-webkit-keyframes opacity-60-25-9-12{0%{opacity:.687625}75.01%{opacity:.25}75.02%{opacity:1}35.01%{opacity:.25}100%{opacity:.687625}}@-webkit-keyframes opacity-60-25-10-12{0%{opacity:.791791666666667}83.3433%{opacity:.25}83.3533%{opacity:1}43.3433%{opacity:.25}100%{opacity:.791791666666667}}@-webkit-keyframes opacity-60-25-11-12{0%{opacity:.895958333333333}91.6767%{opacity:.25}91.6867%{opacity:1}51.6767%{opacity:.25}100%{opacity:.895958333333333}}.app_download_container{overflow:hidden;padding:10px 12px;color:#fff;background-color:rgba(0,0,0,0.65);position:absolute;left:0;right:0;bottom:0;z-index:13}.app_download_container .app_thumb{float:left;width:45px;height:45px}.app_download_container .btn_app_download_wrp{float:right;position:relative;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;overflow:hidden;font-size:0;margin-top:10px}.app_download_container .btn_app_download{display:inline-block;border:1px solid #09ba07;text-align:center;width:3.2em;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;color:#09ba07;line-height:1.75;position:relative;z-index:1}.app_download_container .btn_app_download.progress_text{color:#fff}.app_download_container .app_download_progress{position:absolute;top:0;bottom:0;left:0;background-color:rgba(9,186,7,0.75)}.app_download_container .app_download_info{overflow:hidden;padding:0 10px;word-wrap:break-word;word-break:break-all}.app_download_container .app_download_title{display:block;font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-bottom:-3px}.app_download_container .app_download_desc{font-size:15px}.inner_app_download_container{position:absolute;left:0;right:0;bottom:0;z-index:5;text-align:center;color:#fff}.inner_app_download_container .inner_app_download_bd{background-color:#459aea;display:table-cell;padding:0 20px;vertical-align:middle;word-wrap:break-word;word-break:break-all;width:2000px;height:45px}.inner_app_download_container .inner_app_download_bd.success{background-color:#09ba07}.inner_app_download_container .app_download_progress_wrp{background-color:#398bd7;height:3px;position:relative;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;margin-top:5px;margin-bottom:3px}.inner_app_download_container .app_download_progress{position:absolute;left:0;top:0;bottom:0;background-color:#fff;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.wx_video_error_box{position:absolute;top:0;bottom:0;left:0;right:0;z-index:25;background-color:#262626;text-align:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.wx_video_error_msg{color:#fff}.wx_video_error_msg_btn{display:inline-block;padding:0 1.34em;line-height:1.7;color:#fff;margin-top:2em;-webkit-tap-highlight-color:rgba(0,0,0,0)}.wx_video_error_loading{width:26px;margin-top:-0.2em;vertical-align:middle;animation:loading 1000ms steps(13,end) 0ms infinite}.wx_video_error_refresh{width:17px;margin:-0.2em .34em 0 0;vertical-align:middle}.wx_video_error_code{display:block;font-style:normal;font-size:12px;color:#888;margin-top:10px}@-webkit-keyframes loading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes loading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.video_muted_btn{position:absolute;left:5px;bottom:3px;z-index:13;line-height:300px;overflow:hidden;border-width:12px 10px;border-style:solid;border-color:transparent;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABCCAMAAAAYE8oxAAABRFBMVEUAAAABAQEAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEGBgb\/\/\/\/+\/v4ICAj+\/v7+\/v7\/\/\/\/+\/v78\/Pz6+vqCgoL5+fn4+Pjy8vL4+Pjv7+\/e3t7w8PDHx8evr69DQ0M7OzspKSlTU1P+\/v7+\/v79\/f319fX29vbu7u729vbc3Nzn5+fU1NTb29vr6+vk5OTX19e+vr7b29vHx8fz8\/O6urqBgYHc3NxjY2OGhob7+\/v19fX7+\/vx8fH7+\/vu7u7y8vL4+Pjs7Ozr6+vS0tLR0dHHx8fo6OiysrLY2Njb29uHh4ft7e16enpnZ2cxMTHPz89YWFjExMRlZWWTk5MoKCiEhITn5+f7+\/vi4uLq6urm5ub4+Pjj4+Pw8PCwsLDa2trNzc2fn5+MjIzf399zc3NcXFydnZ2xsbH\/\/\/9PhljfAAAAa3RSTlMABQcLDhoXER0TJzIhJfvsLPXv9+no3zTjxsW1rpqDbEouJyAR+fLg0Mu3jo6MioN2dGhkWVJRIiAcGxba2NHMyr+yoZaPgH96aF1ORkU\/PDo6NDItKyopDr+4r6yclol4bmFhYFRQSUA0LriWdMcAAAObSURBVFjD7ZdXd9swDIVLUaIkV44dZ+\/Ymc1q9t6r2Xt178n\/\/14ANB8kubGGTx96ipfkCvGnCwKwlCf\/4+8GY6Ostjy2Iw1WQ6Dx0CElN1jtgCttUkqTs5oBF9YlhBsmMrZ0xhIAb4YkhuBGKDWfyy0xFhd41SgV0TSCqW64\/IozFg94UpAqrBCRn+D1yVjny\/hsg\/wz0d6D6\/VXnMUAHtbJR4hu3zAk1qPPFeMfEPWIR+e0HjKHEU0yxkfl40RTeBOQGeo3WBSewXdkmEhDOM+YNlnMQWqqwqgCIBC8v0MGiXoI687IFNxUeGOQWvXvE6VktdBE9vAOfm9cUEhuW9eDoI99RLpXNCKtJA38pjo6MOl0gewwQfqbFp1oztWpudYmL0A3LPMA0Y1M5Kb1HFXjijbptYP85Ft6vBzDo\/DWUHZrk84+qE5\/2YZpRSXSyc2gLCxypu5wjiNp84REOrnssNRDiCfmNIG6S0wkRI\/U\/aWyR0BNQzYx0bSKA1L3l8GHccjHoexkRDJJ7ZWzvHywaLkzFdF2aIB2y2WLXhDP3KRE+nNB3d4GW2S5BUSrSE7UrmSbq4j2LYhcOiK5ks2iTOwDUS+4kZxIDIJQs5USZipiS5mo9vIWhZWO2EtVayLycymJnyUODBI1vzUlkeZxRBOnEZ+O6NLOvNW9fo87k67Xi\/Q1PlMmutu41yLVzkyjbii5iiiaQPWIVHvdhnrLoS00+E9ULW4a4izpfbjAcHimQDQhPvn34yrKQhF7oR13WsmJBp8kOeaUj\/Gujo4RskmfM8fU6FxRF70HaqAEjUn6dL0pkJrQFhcHcdj9x0gPo0z+aSAuXwaI5Il3k9jIWqbq9DjKI0j6ibZwshl\/5PNPX1ciunPN0NoLbXEZLTd70KXAm5TtCssfjpfJd1Ug2s5918CRJ8iUoSy\/oKIDSM5NX9i2sLL5iTDRhHKuPRoWUL\/wFFvvkV\/9jZTblpc\/8L\/ZUzlQjbA5Nbp\/EzMHdATVgtFnvfzHBh8RKFgNR6B+UR\/Oqr5UZ1KFmS8FHxFvhTyq+Rs9HE7JYqRQyK9NwW8zCPq50khtUV2Kg\/zeqonBduIgtWdVlyIjcfh\/rFUmmqLUlTt3RKz\/5ZkByOzlRphIKcsrOYKWJx4SBnOLHvGhM3GFcAkYD4mDmXkjBQ8SmRok6FN8pHCc3fCIqLVAYHyk6Qar8w1SEiRXa1KroD0x0gPD5f0r8RsZhZXDnmumggAAAABJRU5ErkJggg==) no-repeat 0 0;width:27px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:27px auto;background-size:27px auto}.video_muted_btn.muting{background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABCCAMAAAAYE8oxAAABTVBMVEUAAAAAAAAAAAABAQEAAAAAAAAFBQXq6uoAAAD\/\/\/8AAAAAAAABAQEWFhba2tr4+PgWFhYAAABLS0sBAQH+\/v719fX+\/v7\/\/\/\/9\/f3y8vJJSUliYmJBQUElJSX+\/v77+\/v7+\/v6+vr19fXy8vLt7e3v7+\/g4ODp6enW1tbQ0NDIyMiBgYEVFRU0NDT+\/v78\/Pz5+fn39\/fs7Ozh4eHs7Ozn5+fw8PDz8\/Otra2AgIDCwsIAAABoaGgcHBzc3NyMjIxoaGj6+vr19fX7+\/v29vbu7u7q6urm5ub6+vr4+Pj7+\/vr6+vOzs61tbXo6OjX19fAwMC6urrd3d3R0dHHx8fb29vt7e12dnZQUFBpaWmZmZktLS2+vr6EhIT7+\/v7+\/vb29vy8vL19fXBwcHk5OSfn5+MjIygoKAeHh7V1dU5OTmSkpJRUVGysrL\/\/\/+xlHuyAAAAbnRSTlMABxkLDgQSuiD7FSMTLGSxLicNMvXM6\/jvsywaER\/y6OHR0cS3rZyOiIFsNCga6OPguJWIeXVbUUpGMC0rJBwcCdvYxsXAv62ooZGFeWpoaGJZWFBNRj89PDgvKCMO0riPjX58cWBUPjs3LSomIUfhR2IAAAQqSURBVFjD7djXe9MwEABwzpJM4hhKShJCEkahbCi0FEoLbdl777330P\/\/yJ1s92rJRojvgyf0Qs\/Cv550Z0fpmv\/jHw919U9uOn75tKqZOn1Fgwr14HhTj1WT8GJaawGBIoFaj41DxdTyOZySQoWlKC5rXU3Cj5c0k1aIaulhfYoi3VxJKljYbiYS6f6uuV5vSdWKyeKkQxL4ZUqbETkivMXLr4SqW3UaHVzrkAoebNU1ohIPaOuP1ZAKZNJYZ5MK7m7S9WK8B693FoBJaz6ySQU3m\/oXYrplB05McF\/5SCVmDVifYzTfwZmbQv0WqUC8Ya+yMjJq7MWZw6O6JKFEivErulJUS3NqJYWvvZriKAU4hEyjVkEOx3SVqGCu33yY4VTN1zh1RoKTXX5Xc31CJDOOqF5cxZ+nnkOR5IC6656dJAjtIwsRnvcoODcO+XPR2E0LkmCXRDMZEVkvynum\/rMmKwVx9ATjTUOhrMbSPpLFaC9FU8OVJHdiuJ57Mt9gbZEbmHTE1lkKrwmV7+Q+jHZJS4y0h2QRk7pB4dZlyO99RC0ZC2WJXpLEfOdaXYrf50mmjW0YPXVEP0liTuyneFpCvuxJ2kgJlughWaT\/Pdiki\/pSeBSjPbEt+kgWKUkqr74rICsrpbwr30gWvSQ\/1xBnDTSTLzs5gUE39YlMuqKMbtOFzZQWpXwAg+2JR2TSFU1WnJaIT2HQ84tMuqLJSh\/JEIi3YNDJp1n0k3yLQIOQ1WLTEf3klpVbANfJaYE85c3RJbkQmfiJLhwuRNqDniv6ybERFOIdiidyMT5Bta4RPeQ45OJRCncW4i0qvCMGkFjraYp2J4JCYfxdjhhAKnGoT8HtJO\/wzfRcO\/3oI1d\/jstb5vIgzcSE3mb7HTGAFPF5+mlHZIoP8ilFB9IA0SJH8X1N43rRPMcw2Ia8JQaQhybon\/4zUxhFGVNhnPdjAHlGm0o38m381qRtjGSY6B4N+k+KRc\/Q+3zAheFPVx+ZJFGDyX2NvHeW6ZQyydu48p5vn9xojc8Xy2QSp0zuOIgbhwaIaxTe4UXzwbHVLo91JzdeskTJh8ELiwkZCoY9elNiwmCdpPD32wPT3l3+5BICyeJNdIgMELNmC3jRfBYVsjzimCqxt3xqBiL5TaSUWOjQe+cZL5pNBdYwCa17hySLKiP56RlNmF43jeQddDd+H7lR\/vZROliP5B5TpRan6DGFTBrtD\/1VokXepxV05k2KAeTHbSxaZDPrTE7RTwKR80dYtEgcO9um0AFkGrUfn2XRJvuPsl4MI1uPuyxa5IXs4QkiBZIbLrLIJLd60Mh68OCl0jd24L7sDkVAinx71JihFnHJ7neqSzgp0yTlv3zwwie7A96MMFJIydvF5OIgSvl62GbiUBWZc+rhpnIvAWXuB8Mz\/8vjJ5ndr64kqpVrAAAAAElFTkSuQmCC)}";
});define("new_video/player.js",["page/pages/video.css","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js"],function(e,i,t,n){
"use strict";
e("page/pages/video.css"),e("biz_wap/zepto/zepto.js"),e("biz_wap/zepto/event.js"),
e("biz_wap/zepto/touch.js");
var o=e("new_video/player.html.js"),r=e("biz_wap/utils/device.js"),a=e("new_video/ctl.js"),s=e("biz_common/tmpl.js"),l=3e3;
if(top.window._players||(top.window._players={}),top.window._players_guid||(top.window._players_guid=1),
top.window.lastFullScreenPlay=null,r.os.ios||top.window._hasHashChange||(top.window._hasHashChange=!0,
$(top.window).on("hashchange",function(){
var e=top.window.lastFullScreenPlay,i=top.location.hash;
e&&"#fullscreen"!=i&&e.isInFullScreen()&&e.exitH5FullScreen();
})),!top.window._hasOnOrient){
var _="onorientationchange"in window?"orientationchange":"resize";
$(top.window).on(_,function(){
var e=top.window.lastFullScreenPlay;
e&&e.adaptH5FullScreen();
}),top.window._hasOnOrient=!0;
}
var d=(top.window.location.href.indexOf("&vconsole=1")>0?!0:!1,function(){}),h=(navigator.userAgent,
function(){
return!0;
}()),u=function(){
return!!r.browser.M1;
}(),c=function(e){
var i=0,t=0,n=0;
.5>e&&(e=0),e=Math.ceil(e);
var i=Math.floor(e/3600),t=Math.floor((e-3600*i)/60),n=e-3600*i-60*t;
return 0!=i?(10>i&&(i="0"+i),i+=":"):i="",10>t&&(t="0"+t),10>n&&(n="0"+n),i+t+":"+n;
},f=!r.canSupportVideo,p=function(e){
var i=$(e.container);
e.width=e.width||300,e.height=e.height||300,e.duration=e.duration||0,this.opt=e,
this.id=e.id=top.window._players_guid++,this.__forcePause=!1,this.__hasFuncControllBar=!0,
this.__dragTimes=[],this.__play_total_time=0,this.__last_playtime=0,this.__always_hide_loading=e.always_hide_loading||!1,
e._mustHideFullScreen=u,e.display=e.autoHide?"none":"block",e.ad_muted_btn=e.ad_muted_btn||!1;
var t=s.tmpl(o,e);
i.append(t);
var n=this.container=$("#js_mpvedio_"+this.id);
this.$video=n.find("video");
var r=this.video=this.$video[0];
this.__initData(),this.__initVideo();
var a=e.src;
if(!a)return void this.__triggerOutside("error",{
errorcode:5
});
if(r.setAttribute("origin_src",a),f)return n.find(".js_btn_play").attr("href",a).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
var l=e.plugins||[];
this._blockPlugin={};
for(var _=0,d=l.length;d>_;++_){
var h=l[_];
h.setPlayer(this),!!h.init&&h.init();
}
this.plugins=l,top.window._players[a]=this,this._trigger("loading"),this.__bindBtnEvent(),
this.__bindVideoEvent();
};
return $.extend(p.prototype,{
__triggerOutside:function(){
var e=this.opt,i=arguments,t=i[0],n=this,o=this.video;
if(t){
t=t.substr(0,1).toUpperCase()+t.substr(1);
var a=e["on"+t];
"function"==typeof a&&a.apply(this,i),"BeginPlay"!=t||null!=n.__replaySec&&0!=n.__replaySec||!r.os.ios||(o.currentTime=.1);
}
},
__errorHandler:function(){
this.video.removeAttribute("src");
},
__loadingHandler:function(e){
this.showLoading(),this._trigger("ready",e);
},
__readyHandler:function(e){
this.opt.src;
this._trigger("loaded",e);
},
__loadedHandler:function(e){
if(e&&e.autoplay)return void this._trigger("readyBeginPlay",e);
this.hideLoading(),this.container.find(".js_video_play_controll").css({
display:"block"
});
var i=this.opt.duration;
i&&i>0&&this.container.find(".js_video_length").html(c(i)).show();
},
__outsidePauseHandler:function(){
d("__outsidePauseHandler"),this.hideLoading(),this.pause(),this._trigger("userpause"),
this.hideControllBar(!0),this._showPlayControllBar();
},
__readyBeginPlayHandler:function(e){
this.setSrc(this.opt.src),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
f&&(location.href=this.opt.src);
var e=this.container,i=this,t=this.video;
e.find(".js_video_poster").show(),this.hideCover(),e.find(".js_video_play_controll").hide(),
this.__hasBeginPlay=!0,i.showLoading("firstTime"),setTimeout(function(){
t.play();
},1);
},
__replayHandler:function(){
this.setSrc(this.src),this._afterReplay();
},
__endHandler:function(){
this.hideControllBar(),this._hidePlayControllBar();
},
__hideControllTimeoutCallback:function(){
this.isPlay()&&this.hideControllBar();
},
__touchVideoHandler:function(){
var e=this,i=this.opt;
if(i.blockTouchVideo)return!1;
var t=this.__touchVideoTimeoutHandler;
if(!e.__canplay||e.isEnd()&&i.hideControllBarAtEnd)return void e.hideControllBar();
var n=e.container.find(".js_controll");
"none"==n.css("display")?e.showControllBar():e.hideControllBar(!0),t&&clearTimeout(t),
e.__touchVideoTimeoutHandler=setTimeout(function(){
e.__hideControllTimeoutCallback.call(e);
},l);
},
__initData:function(){
this.log={
hasended:0,
lastsec:0,
duration:0,
video_error:0
},this.__hasBeginPlay=!1,this.__canplay=!1,this.__hasscroll=!1,this.__replaySec=null;
},
__initVideo:function(){
var e=this.opt,i=this.video;
i.addEventListener("contextmenu",function(e){
e.preventDefault(),e.stopPropagation();
},!1),i.hasAttribute("controls")&&i.removeAttribute("controls"),i.setAttribute("webkit-playsinline","isiPhoneShowPlaysinline"),
i.setAttribute("playsinline","isiPhoneShowPlaysinline"),i.setAttribute("poster",e.cover),
e.loop&&i.setAttribute("loop",e.loop),e.muted&&i.setAttribute("muted",e.muted),this.$video.off("loadedmetadata durationchange"),
this.__hasVideoDurationchange=!1;
},
__getDuration:function(){
var e=this.opt,i=this.video,t=i.duration;
return t&&1!=t?t:e.duration;
},
__videoDurationchange:function(){
var e=this;
if(!e.__hasVideoDurationchange){
var i=this.video,t=this.opt,n=this.container;
if(1/0!=i.duration&&i.duration>0&&1!=i.duration)e.duration=i.duration,e.__hasVideoDurationchange=!0;else{
if(!t.duration)return!1;
e.duration=t.duration,e.__hasVideoDurationchange=!0;
}
e.log.duration=e.duration,n.find(".js_total_time").text(c(e.duration)),this.__hasFuncControllBar&&n.find(".js_progress_bar,.js_total_time").show();
var o=+new Date,r=o-e.log.loadwait_start;
e.log.loadwait=r,e._trigger("durationchange",{
loadwait:r
});
}
},
__startCountTime:function(){
var e=this,i=this.video;
i&&null===e.__last_playtime&&(e.__last_playtime=i.currentTime);
},
__endCountTime:function(){
var e=this,i=this.video;
i&&i.currentTime>e.__last_playtime&&null!==e.__last_playtime&&(e.__play_total_time+=i.currentTime-e.__last_playtime,
e.__last_playtime=null);
},
__bindVideoEvent:function(){
var e=this.$video,i=this,t=this.container,n=t.find(".js_switch"),o=(t.find(".js_video_pause_controll"),
this.video);
e.off("timeupdate").on("timeupdate",function(){
if(i.__forcePause===!0)return void d(i.id+":timeupdate __forcePause return");
if(i.__hasBeginPlay&&!i.__canplay)return i.showLoading(),!1;
o=i.video,null!=i.__replaySec&&(d(i.id+":timeupdate __replaySec"),o.pause(),o.currentTime=i.__replaySec,
i.__last_playtime=i.__replaySec,o.play(),i.__replaySec=null),i.__startCountTime(),
i.hideLoading(),i.__videoDurationchange();
var e=o.currentTime;
if(e>0){
var n=i.__getDuration();
i.__setControllBar(e/n),i.hideCover(),i.hideLoading(),t.find(".js_now_play_time").text(c(e)),
i._trigger("timeupdate",{
currentTime:e
});
}
}),e.off("canplay").on("canplay",function(){
null!=i.__replaySec&&(o.currentTime=i.__replaySec,i.__last_playtime=i.__replaySec,
i.__replaySec=null),i.__canplay=!0,i._trigger("canplay");
}),e.off("ended").on("ended",function(){
d("player inner isend:"+i.isEnd()),i.isEnd()&&(i.__endCountTime(),i._trigger("end"));
}),e.off("emptied").on("emptied",function(){}),i.waitingHandlerTimer=null;
var r=0;
e.off("stalled").on("stalled",function(){
if(this.__hasBeginPlay&&!i.waitingHandlerTimer){
i.showLoading();
var e=o.src,t=o.readyState,n=o.error;
0!=t||n&&0!=n.code||(clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null,
i.showLoading(),i.showCover(),o.pause(),o.src=e,o.load(),o.play(),d(i.id+":stalled"));
}
}),e.off("seeking").on("seeking",function(){
i.__hasBeginPlay&&i.showLoading();
}),e.off("waiting").on("waiting",function(){
if(i.__hasBeginPlay){
i.showLoading(),clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null;
var e=0,t=top.window._players;
for(var n in t)if(t.hasOwnProperty(n)&&e++,e>1)break;
e>1&&i.__forcePause===!1&&(i.waitingHandlerTimer=setTimeout(function(){
if(i.__forcePause!==!0){
var e=o.error;
if(0==o.readyState&&(!e||0==e.code)){
clearTimeout(i.waitingHandlerTimer),i.waitingHandlerTimer=null;
var t=o.src;
i.showLoading(),i.showCover(),o.pause(),o.src=t,r++,o.load(),o.play(),d(i.id+":waitingHandlerTimer");
}
}
},1e4)),i._trigger("waiting");
}
}),e.off("play playing").on("play playing",function(){
return i.__forcePause===!0?void d(i.id+":play playing __forcePause return"):(d(i.id+":play playing"),
n.removeClass("switch_on"),n.addClass("switch_off"),i._hidePlayControllBar(),i.__startCountTime(),
void i._trigger("play"));
}),e.off("pause").on("pause",function(){
d(i.id+":video pause event"),n.addClass("switch_on"),n.removeClass("switch_off"),
!i.__canplay||i.isEnd()||i.__onTouch?i._hidePlayControllBar():(i.hideControllBar(!0),
i._showPlayControllBar()),i.__endCountTime(),i._trigger("pause");
}),e.off("error").on("error",function(){
var e;
i.video.error&&(e=i.video.error.code),i._trigger("error",{
errorcode:e
});
});
},
__bindBtnEvent:function(){
var e=this,i=this.opt,t=i.extinfo,n=this.container,o=this.video,s=(n.find(".js_video_play_controll"),
n.find(".js_btn_play")),l=(n.find(".js_video_poster"),n.find(".js_switch")),_=n.find(".js_progress_bar"),d=n.find(".js_played_bar"),u=n.find(".js_page_video"),c=n.find(".js_full_mask"),p=n.find(".js_video_pause_controll"),g=n.find(".js_full_screen_control"),v=n.find(".js_loading");
p.on("touchend",".js_btn_pause",function(){
e.__forcePause=!1,e.play(),e._trigger("userplay"),e._hidePlayControllBar();
});
var y,w,m,T,j=0,P=!1,C=0,b=0,S=0,B=e.__getDuration(),F=0,H=1,x=top.window.user_uin||0,D=0!==x&&Math.floor(x/100)%1e3<H,M=!1,k=0;
u.on("touchstart",function(t){
1==t.targetTouches.length&&e.isPlay()&&(i.blockTouchVideo||(m=y=new Date,T=w={
x:t.targetTouches[0].clientX,
y:t.targetTouches[0].clientY
},S=parent.document.body.scrollTop,F=e.getCurTime(),r.os.android&&t.preventDefault()));
}),u.on("touchmove",function(t){
if(1==t.targetTouches.length&&e.isPlay()&&!i.blockTouchVideo){
if(parent.document.body.scrollTop!=S)return P=!1,void(S=-1);
var n=new Date,o=t.changedTouches[0].clientX,r=t.changedTouches[0].clientY,a=n-y,s=o-w.x,l=r-w.y,_=Math.sqrt(Math.pow(s,2)+Math.pow(l,2))+b,d=Math.min(Math.ceil(_/a),6);
C=Math.floor(.1*_+.2*d*d*d)*Math.ceil(B/500),b=0==C?_:0,0>s&&(C=-C);
var h=180*Math.atan2(l,s)/Math.PI;
P||(h>=-30&&30>=h&&++j,(h>=150&&180>=h||h>=-180&&-150>=h)&&--j,(j>=4||-4>=j)&&(5>=_?j=0:(k=Math.max(k,d),
P=!0))),P&&(F+=C,0>F&&(F=0),F>B&&(F=1*B),e.__setForwardBar(F),t.preventDefault(),
t.stopPropagation()),w={
x:o,
y:r
},y=n;
}
}),u.on("touchend",function(i){
if(e.isEnd()||e.isPause()||P||e._trigger("touchVideo"),P&&(e.play(F),n.find(".js_forward").css("display","none"),
D&&((new Image).src="/mp/jsmonitor?idkey=28307_29_1",!M))){
var t=(new Date,{
x:i.changedTouches[0].clientX,
y:i.changedTouches[0].clientY
}),o=t.x-T.x,r=t.y-T.y,a=parseInt(Math.sqrt(Math.pow(o,2)+Math.pow(r,2))),s=parseInt(180*Math.atan2(r,o)/Math.PI);
s>=-30&&30>=s||s>=150&&180>=s||s>=-180&&-150>=s||((new Image).src="/mp/jsmonitor?idkey=28307_35_1"),
(new Image).src="/mp/jsmonitor?idkey=28307_31_1;28307_33_"+a+";28307_34_"+k,M=!0;
}
C=0,P=!1,j=0;
}),u.on("touchmove MSPointerMove pointermove mousemove",function(i){
e.isInFullScreen()&&!h&&(i.preventDefault(),i.stopPropagation());
}),v.on("touchend",function(){
e._trigger("touchVideo");
}),c.on("touchend",function(){
e.isEnd()||e._trigger("touchVideo");
}),c.on("touchmove MSPointerMove pointermove mousemove",function(i){
e.isInFullScreen()&&!h&&(i.preventDefault(),i.stopPropagation());
}),s.on("touchend",function(){
if(f)return location.href=e.opt.src,!1;
if(t){
var i=2;
try{
i=window.cgiData&&"0"==window.cgiData.media_source?11:2;
}catch(n){}
a.report({
step:i,
vid:t.vid,
traceid:t.pageplayer._getTraceId(),
orderid:t.pageplayer._getOrderid()
});
}
e._trigger("readyBeginPlay");
}),v.on("touchend",function(){
e._trigger("touchVideo");
}),l.on("touchend",function(){
e.isPlay()?(e.hideLoading(),e.pause(),e._trigger("userpause"),e.hideControllBar(!0),
e._showPlayControllBar()):(e.__forcePause=!1,e.showLoading(),e.play(),e._trigger("userplay"));
});
var V,L,E,I=null,z=[];
e.__onTouch=!1,_.on("touchstart",function(i){
e.__hasFuncControllBar&&(e.__onTouch=!0,L=V?i:i.touches[0],I={},I.x1=L.pageX,I.y1=L.pageY,
E=o.currentTime,z=E,e.pause(),i.preventDefault());
}),_.on("touchmove",function(i){
if(e.__hasFuncControllBar){
e.__onTouch=!0,L=V?i:i.touches[0];
var t=L.pageX,n=L.pageY;
I.x2=t,I.y2=n;
var o=d.offset(),r=_.width(),a=(t-o.left)/r;
E=e.__getDuration()*a,e.pause(),e.__setControllBar(a),e.__has_drag=!0,i.preventDefault(),
i.stopPropagation();
}
}),_.on("touchend",function(i){
if(e.__hasFuncControllBar){
if(e.__onTouch=!1,I&&I.x1){
var t=I.x2?I.x2:I.x1,n=d.offset(),o=_.width(),r=(t-n.left)/o;
if(r=r>1?1:r,E=e.__getDuration()*r,e.__setControllBar(r),z){
var a=0>E?0:E;
e.__dragTimes.push(Math.round(1e3*z)+":#:"+Math.round(1e3*a)),z=0;
}
}
return I=null,setTimeout(function(){
e.__forcePause=!1,e.showLoading(),e.play(E);
},0),i.preventDefault(),i.stopPropagation(),!1;
}
}),g.on("touchend",function(i){
return e.isInFullScreen()?h?e.exitFullScreen():e.exitH5FullScreen():(e.__has_fullscreen=!0,
h?((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_56_1&r="+Math.random(),
e.enterFullScreen()):e.enterH5FullScreen()),i.stopPropagation(),i.preventDefault(),
!1;
});
},
_hidePlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
e.hide();
},
_showPlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
this.isEnd()||(this.hideControllBar(),e.show(),this.container.find(".js_video_play_controll").hide());
},
_showPlayer:function(){
var e=this.container.find(".js_page_video");
e.show();
},
_hidePlayer:function(){
var e=this.container.find(".js_page_video");
e.hide();
},
__setControllBar:function(e){
e=Math.ceil(100*e),0>e&&(e=0),e>100&&(e=100);
this.video,this.duration;
this.__setBufferBar(e),e+="%";
var i=this.container;
i.find(".js_played_bar").css({
width:e
}),i.find(".js_played_speed_cnt").css({
left:e
});
},
__setForwardBar:function(e){
var i=this.container,t=(this.video,this.__getDuration()),n=e/t;
i.find(".js_forward").css("display","block"),i.find(".total_time").text(c(t)),i.find(".js_forward_bar").css("width",100*n+"%"),
i.find(".js_forward_play_time").text(c(e));
},
__setBufferBar:function(e){
var i=this.container,t=this.video,n=this.__getDuration(),o=t.currentTime;
e=e||o/n;
var r=e;
t.buffered&&t.buffered.length>0&&t.buffered.end&&n&&(r=t.buffered.end(0)/n,r=Math.max(e,Math.ceil(parseInt(100*r))),
r>98&&(r=100)),i.find(".js_buffer_bar").css({
width:r+"%"
});
},
__resetVideo:function(){
this.$video.remove();
var e=this.container,i=e.find(".js_video_poster");
i.append("<video></video>");
{
var t=this.$video=i.find("video");
this.video=t[0];
}
this.__canplay=!1,this.__forcePause=!1,this.__initVideo(),this.__bindVideoEvent();
},
_trigger:function(e,i){
if("play"==e){
var t=top.window._players;
for(var n in t){
var o=t[n];
o!==this&&o.__hasBeginPlay&&!o.isEnd()?(o.__forcePause=!0,o.hideLoading(),o.video.pause(),
o._trigger("userpause"),d(o.id+":pause other"),o._showPlayControllBar()):o===this&&(o.__forcePause=!1,
o._trigger("userplay"));
}
}
var r=this.plugins,a=this._blockPlugin[e]||this._blockPlugin.all,s=0;
if(a&&"function"==typeof a.recv&&(s|=a.recv(e,i),1&s))return!1;
for(var n=0,l=r.length;l>n&&(s|=r[n].recv(e,i),!(2&s));++n);
if(!(this._blockInnerHandler||4&s)){
var _=this["__"+e+"Handler"];
_&&_.call(this,i);
}
8&s||this.__triggerOutside(e,i);
},
_setBlockInnerHandler:function(e){
this._blockInnerHandler=e;
},
_setBlockPlugin:function(e,i){
this._blockPlugin[e]=i;
},
_getContainer:function(){
return this.container;
},
_afterReplay:function(){
this.__hasBeginPlay=!0,this.showControllBar(),this.play(.1);
},
setSrc:function(e,i){
var t=this,n=this.$video,o=(this.opt,this.video);
this.src=e,t.__initData(),t.__initVideo(),this.showCover(),t.log.loadwait_start=+new Date,
n.attr("src",e),o.preload=i||"metadata",o.load(),this.container.find(".js_now_play_time").text(c(0)),
n.on("loadedmetadata durationchange",function(){
t.__videoDurationchange();
}),o.duration>0&&1!=o.duration&&t.__videoDurationchange();
},
replay:function(){
r.os.android&&this.__resetVideo();
var e=this.opt.extinfo;
e&&a.report({
step:9,
vid:e.vid,
traceid:e.pageplayer._getTraceId(),
orderid:e.pageplayer._getOrderid()
}),this._trigger("replay");
},
resetVideo:function(){
this.container.find(".js_video_poster").hide(),this.showCover(),this.__resetVideo(),
this._trigger("loading"),this.__hasBeginPlay=!0;
},
play:function(e){
if(!i||0!=i.readyState){
var i=this.video,t=this;
e*=1;
try{
if(isNaN(e)||"number"!=typeof e)e=0;else{
var n=this.__getDuration();
e>=n&&(e=n-.01),0>e&&(e=0),i.currentTime=e,t.__replaySec=e,t.__last_playtime=e,t.container.find(".js_now_play_time").text(c(e));
}
}catch(o){
e=0;
}
clearTimeout(t.__delayToPlay),t.__delayToPlay=setTimeout(function(){
t.__forcePause!==!0&&(i.pause(),i.play(),t._trigger("play"),d(t.id+":delayToplay"));
},100),d(t.id+":play function");
}
},
pause:function(){
if(!e||0!=e.readyState){
var e=this.video;
this.__replaySec=null,this.__delayToPlay&&(clearTimeout(this.__delayToPlay),this.__delayToPlay=null),
this.waitingHandlerTimer&&(clearTimeout(this.waitingHandlerTimer),this.waitingHandlerTimer=null),
e.pause(),d(this.id+":pause function");
}
},
enterFullScreen:function(){
var e=this.video;
e.webkitSupportsFullscreen?e.webkitEnterFullscreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen(),
this.__isInFullScreen=!0;
},
exitFullScreen:function(){
this.video;
this.hideLoading(),document.webkitExitFullscreen&&document.webkitExitFullscreen(),
this.__isInFullScreen=!1;
},
isInFullScreen:function(){
return!!this.__isInFullScreen;
},
setWidth:function(e){
this.container.find(".js_page_video").css({
width:e
});
},
setHeight:function(e){
this.container.find(".js_page_video").css({
height:e
});
},
showCover:function(){
this.container.find(".js_poster_cover").show();
},
hideCover:function(){
this.container.find(".js_poster_cover").hide();
},
showFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.show(),this.__hasFuncControllBar=!0;
},
hideFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.hide(),this.__hasFuncControllBar=!1;
},
showControllBar:function(){
this.container.find(".js_controll").removeClass("opr_fade_out").show();
},
hideControllBar:function(e){
var i=this.container.find(".js_controll");
i.removeClass("opr_fade_in");
var t=this,e=!1;
e?(t.__timerHideControll&&clearTimeout(t.__timerHideControll),i.hide()):(i.addClass("opr_fade_out"),
t.__timerHideControll=setTimeout(function(){
i.hide();
},500));
},
showLoading:function(e){
if(!this.__isshowLoading&&!this.__always_hide_loading){
this.__isshowLoading=!0;
var i=this;
window.setTimeout(function(){
i.__isshowLoading=!1;
},1e3),"firstTime"==e&&this.container.find(".js_loading").addClass("start_loading"),
this.container.find(".js_loading").show();
}
},
hideLoading:function(){
this.container.find(".js_loading").hasClass("start_loading")&&this.container.find(".js_loading").removeClass("start_loading"),
this.container.find(".js_loading").hide();
},
triggerMuted:function(e){
e?(this.video.muted=!0,this.video.setAttribute("muted",!0),this.container.find(".js_muted_btn").addClass("muting")):(this.video.muted=!1,
this.video.removeAttribute("muted"),this.container.find(".js_muted_btn").removeClass("muting"));
},
adaptH5FullScreen:function(){
var e=$(window).width(),i=$(window).height(),t=!1;
(180==window.orientation||0==window.orientation||i>e)&&(t=!0);
var o=this,r=this.opt,a=o.container,s=a.find(".js_page_video"),l=o.$video;
if(r.defineCSS)return!1;
if(t){
var _=e,d=l.height()/l.width(),h=_*d;
s.css({
marginTop:-h/2,
marginLeft:-_/2,
width:_+"px",
height:h+"px"
});
}else n("!isVertical"),s.css({
marginTop:0,
marginLeft:0,
width:"100%!important",
height:"100%!important"
});
},
enterH5FullScreen:function(){
{
var e=this,i=this.opt,t=e.container;
t.find(".js_page_video"),e.$video;
}
!!i.onBeforeEnterH5FullScreen&&i.onBeforeEnterH5FullScreen(),$("body").addClass("full_screen_mv"),
this.adaptH5FullScreen(),top.window.lastFullScreenPlay=this,this.__isInFullScreen=!0,
"#fullscreen"!=top.location.hash&&(top.location.hash="#fullscreen");
},
exitH5FullScreen:function(){
{
var e=this,i=this.opt,t=e.container,n=t.find(".js_page_video");
e.$video;
}
!!i.onBeforeExitH5FullScreen&&i.onBeforeExitH5FullScreen(),n.css({
marginTop:0,
marginLeft:"auto",
marginRight:"auto",
width:i.width+"px",
height:i.height+"px"
}),$("body").removeClass("full_screen_mv"),t.find(".js_controll").removeClass("opr_fade_out").addClass("opr_fade_in").show(),
top.window.lastFullScreenPlay=null,this.__isInFullScreen=!1,"#fullscreen"==top.location.hash&&(top.location.hash="");
},
setVideoCSS:function(e){
var i=this,t=i.container,n=t.find(".js_page_video");
n.css(e);
},
hasFullScreen:function(){
return!!this.__has_fullscreen;
},
hasDrag:function(){
return!!this.__has_drag;
},
getCurTime:function(){
return this.video.currentTime;
},
getEndDom:function(){
return this.container.find(".js_end_dom");
},
getDrag:function(){
return this.__dragTimes;
},
getPlayTotalTime:function(){
return this.__endCountTime(),this.__play_total_time;
},
getLog:function(){
var e=this.log||{};
return{
hasended:e.hasended,
last_ms:Math.floor(1e3*(e.lastsec||0)),
duration_ms:Math.floor(1e3*(e.duration||0)),
video_error:e.video_error||0,
video_error_code:e.video_error_code||0,
loadwait:e.loadwait||0
};
},
isPlay:function(){
return!this.video.paused&&!this.isEnd();
},
isPause:function(){
return!!this.video.paused;
},
isEnd:function(){
return!!this.video.ended;
}
}),p._getFormatTime=c,p;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function o(e,o){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+o.report_param);
}
function i(){
c({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function t(e){
var t=e.adData,r=e.pos_type,_=t.traceid,c=e.a_info.type,u=t.adid,m=t.url,w=e.a_info.rl;
110==t.pt&&(m=m.replace("#","&AdType=80#"));
var f={};
e.report_param=e.report_param||"";
var y=e.adDetailBtn,v=e.adMoreBtn,g=(e.adMessage,e.adAbout),h=e.adImg,b=e.adVideo,j=0,T={
type:c,
report_type:2,
url:encodeURIComponent(m),
tid:_,
rl:encodeURIComponent(w),
__biz:biz,
pos_type:r,
pt:t.pt,
click_pos:""
},k=null,w=t.rl||"",x="";
if(w){
w=w.split("?"),w=w.length>1?w[1]:"";
var z=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),W=w.match(z);
W&&(x=unescape(W[2]));
}
window.__video_report_data={
aid:t.adid,
traceid:t.traceid,
user_uin:top.window.user_uin,
publisher_appid:t.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:x,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var O=null,E=!0,I=!1;
if(b){
k=new p({
container:b,
cover:t.thumbUrl,
width:b.offsetWidth,
height:b.offsetWidth*parseInt(t.displayHeight)/parseInt(t.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:t.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(i){
console.log("播放出错",i),o(123,e),b.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+t.thumbUrl+"); height:"+s.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
o(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,k.play(),i();
},
onTimeupdate:function(e,o){
window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*o.currentTime,
window.__video_report_data.video_duration=1e3*k.__getDuration();
}
}),j=29,k._showPlayer(),k.setSrc(t.videoUrl,"auto");
var H=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,U=document.documentElement.clientHeight||window.innerHeight;
if(d.isAndroid)if(s.offsetTop>H&&s.offsetTop<H+U)window.__video_report_data.auto_play=0;else{
var M=function(){
k.__beginPlayHandler(),n.off(window,"touchstart",M),I=!0;
};
n.on(window,"touchstart",M);
}
var P=function(){
if(3==window.__video_report_data.play_type)return void n.off(window,"scroll",P);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(H=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
U=document.documentElement.clientHeight||window.innerHeight,k.isPlay()&&(s.offsetTop>H+U||s.offsetTop+s.offsetHeight<H))k.pause();else if(!k.isPlay()&&!(s.offsetTop>H+U||s.offsetTop+s.offsetHeight<H)){
if(d.isAndroid&&!I)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(o(121,e),
d.isIOS&&k.triggerMuted(!0),k._trigger("beginPlay")):k.play();
}
};
n.on(window,"scroll",P),P(),O=function(){
window.setTimeout(function(){
k.triggerMuted(!0);
},1e3);
};
}
n.on(window,"touchend",function(e){
e.target!=g&&e.target!=y&&(g.style.display="none");
}),n.on(document.getElementById("js_ad_inner"),"click",function(i){
if(i.target.className.indexOf("js_muted_btn")>-1)"true"==k.video.getAttribute("muted")?(k.triggerMuted(!1),
E=!1):(k.triggerMuted(!0),E=!0),o(124,e);else{
if(k&&(!k.isPlay()||0==window.__video_report_data.play_type))return k.__beginPlayHandler(),
E||k.triggerMuted(!1),o(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==i.target.id||i.target.className.indexOf("video_mask")>-1?f[_+"_1"]||(f[_+"_1"]=!0,
T.click_pos=1,l(T,function(){
o(87+j,e),f[_+"_1"]=!1,!!O&&O(),d.isWp||d.isIOS?a.invoke("openUrlWithExtraWebview",{
url:m,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=m);
}):location.href=m;
})):f[_+"_2"]||(f[_+"_2"]=!0,T.click_pos=2,l(T,function(){
o(88+j,e),f[_+"_2"]=!1,!!O&&O(),d.isWp||d.isIOS?a.invoke("openUrlWithExtraWebview",{
url:m,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=m);
}):location.href=m;
}));
}
return!1;
}),n.on(v,"click",function(){
return f[_+"_3"]||(f[_+"_3"]=!0,T.click_pos=3,l(T,function(){
o(89+j,e),f[_+"_3"]=!1,!!O&&O(),d.isWp||d.isIOS?a.invoke("openUrlWithExtraWebview",{
url:m,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=m);
}):location.href=m;
})),!1;
}),n.on(y,"click",function(){
return o(90+j,e),g.style.display="none"==window.getComputedStyle(g).display?"initial":"none",
!1;
}),n.on(g,"click",function(){
o(91+j,e);
var i="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+u+"&tid="+_+"#wechat_redirect";
return!!O&&O(),d.isWp||d.isIOS||d.isAndroid?a.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=i);
}):location.href=i,!1;
}),n.on(window,"resize",function(){
setTimeout(function(){
var e=s.clientWidth;
h&&(h.style.height=e/1.77+"px");
},0);
});
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),a=e("biz_wap/jsapi/core.js"),d=e("biz_wap/utils/mmversion.js"),_=e("a/a_report.js"),p=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=_.AdClickReport,s=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),c=e("biz_wap/utils/ajax.js");
return t;
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<div class="ct_mpda_area" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">广告，也可以是生活的一部分</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <p class="ct_mpda_details" id="js_ad_detail">提供的广告</p>\n            </div>\n            <# if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">查看详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more" id="js_ad_more">了解公众号</a>\n            <# } #>\n            <a class="ct_mpda_btn_about" id="js_btn_about">关于广告</a>\n        </div>\n    </div>\n</div>\n';
});define("a/testdata.js",[],function(){
"use strict";
var e=[{
hint_txt:"",
url:"https://mp.weixin.qq.com/mp/ad_biz_info?__biz=MjM5OTg2MjMxMg==&sn=a61272cba6fadd949d14e22c52c4f172&weixinadkey=ddfcad5b2aab7b8ed3d874223e60e05277f0e107a0eddf9193158d436bc1763fa451fa5866706619cbdae6f1486208d5&ticket=24bkzv9mpuvk9&gdt_vid=wx0nbqjrudeu6t3a00&weixinadinfo=10477522.wx0nbqjrudeu6t3a00.0.1#wechat_redirect",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=TtvIAPFkbYCw0NLHyOCuhVUKcvSDeqikHgGHgV06N8wHRqLXjHbiPvzWZ42MQnxG2j%2FU%2BMrrVRLsSiV%2BVyFpLLTP%2FmNhZnfupgbvUnusHoJCZ6qy%2FNILY5M9P6HPuGWlIEdF%2FJa8%2B2nUKqv%2B0%2F2CALIGqmsMtw%2F1dt2CGRNS5UHYOq1Bt9UZ7E3XKghCMDE05E4kC%2FF4JILufWV7Pmm836lmc2vLKc3MvLo6ooJrKLcdW2vJH10vLxF%2BnESDG11SnLK2L7%2BEAlHZc8jskwkmE%2FqpwY1hfPUFzRWTxFIoBAOjn7EavIEM3%2BDO0v9jzXYBsADOrPwx7ZHeCW%2Bkz5sLGaz2P75MJ03uGvDwqvy7TWxs1G5Ds0nRbRrkarBh3QHfW81MyXPRK2v%2BlkDq3LDhWrvZVPotyrGEhPx3InTcFN6u8T%2BpyED5c6kl2HZ2pPgAQGQ3ygQDFeRgAhquTjEqvVZ06XQrEBkecElRz1%2B%2FjKcg6IBvgA1WMMLbnAFQ6YaHJi%2BJLpsDaa%2BQdqcBPAQxX0zBbUJYbmSR5RzrRYF0nivv8PMUGlcxqPhcc6Ro4zml7QeE4lP5mM9K2rrmph4tcUZdwCMCewElmy09lAhZq74X0a9AZvEc22Oj%2F7UY7Xw4wNvDD1R46ZGWX6Vp%2BmoyG0aZeEUplV0WVq66MSe9fxCg5s66xqLd9CZUTiEhVt258HKTM8dfpGxbpocBbMHYCXS8vtzx6Qi1L5b8LGtzc%2FOypgf22ZobjJp4ZZVSIhxdN0305g05XKEocbCwZpPBNVWaPzmIyaNceMOJAh6L6iEQcSsG8bD7QD%2BE2DBpMEUdtReUejhqI4ZcIMog3q51NA%3D%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=TtvIAPFkbYCw0NLHyOCuhVUKcvSDeqikHgGHgV06N8wHRqLXjHbiPvzWZ42MQnxG2j%2FU%2BMrrVRLsSiV%2BVyFpLLTP%2FmNhZnfupgbvUnusHoJCZ6qy%2FNILY5M9P6HPuGWlIEdF%2FJa8%2B2nUKqv%2B0%2F2CALIGqmsMtw%2F1dt2CGRNS5UHYOq1Bt9UZ7E3XKghCMDE05E4kC%2FF4JILufWV7Pmm836lmc2vLKc3MvLo6ooJrKLcdW2vJH10vLxF%2BnESDG11SnLK2L7%2BEAlHZc8jskwkmE%2FqpwY1hfPUFzRWTxFIoBAOjn7EavIEM3%2BDO0v9jzXYBsADOrPwx7ZHeCW%2Bkz5sLGaz2P75MJ03uGvDwqvy7TWxs1G5Ds0nRbRrkarBh3QHfW81MyXPRK2v%2BlkDq3LDhWrvZVPotyrGEhPx3InTcFN6u8T%2BpyED5c6kl2HZ2pPgAQGQ3ygQDFeRgAhquTjEqvVZ06XQrEBkecElRz1%2B%2FjKcg6IBvgA1WMMLbnAFQ6YaHJi%2BJLpsDaa%2BQdqcBPAQxX0zBbUJYbmSR5RzrRYF0nivv8PMUGlcxqPhcc6Ro4zml7QeE4lP5mM9K2rrmph4tcUZdwCMCewElmy09lAhZq74X0a9AZvEc22Oj%2F7UY7Xw4wNvDD1R46ZGWX6Vp%2BmoyG0aZeEUplV0WVq66MSe9fxCg5s66xqLd9CZUTiEhVt258HKTM8dfpGxbpocBbMHYCXS8vtzx6Qi1L5b8LGtzc%2FOypgf22ZobjJp4ZZVSIhxdN0305g05XKEocbCwZpPBNVWaPzmIyaNceMOJAh6L6iEQcSsG8bD7QD%2BE2DBpMEUdtReUejhqI4ZcIMog3q51NA%3D%3D",
traceid:"wx0nbqjrudeu6t3a00",
group_id:"",
ticket:"24bkzv9mpuvk9",
aid:"10477522",
pt:116,
image_url:"baidu.com",
video_info:{
displayWidth:"4px",
displayHeight:"3px",
thumbUrl:"http://vweixinthumb.tc.qq.com/109/20204/snsvideodownload?filekey=30270201010420301e02016d04025348041073f09322d2b39e1e439330a757f2d0690203010c9e0400&hy=SH&storeid=32303137303431323033303233303030303564653666313336666664393336663561333230613030303030303664&bizid=1023",
videoUrl:"http://wxsnsdy.video.qq.com/105/20210/snsdyvideodownload?filekey=30270201010420301e02016904025348041007c00a8ebdfdd80d0aa77790123d0e660203145d190400&hy=SH&storeid=32303137303532353035323735333030303433663536313336666664393330343561333230613030303030303639&bizid=1023"
},
ad_desc:"",
biz_appid:"wxf4c20fc6adac2f78",
biz_info:{
user_name:"gh_f99505e7d9c5",
nick_name:"Skyscanner天巡",
is_subscribed:0,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM6QRHv4Qlh3uvsjicu2mgW5y5GnWmnL9ZeCJbeK9sNdTRQ/0",
biz_uin:2399862312
},
pos_type:3,
watermark_type:0,
logo:"",
is_cpm:1,
exp_info:{},
app_info:{}
}];
return{
data:e
};
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","appmsg/cdn_img_lib.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js"],function(require,exports,module,alert){
"use strict";
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0,both_ad=0,inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_top_ad_area.style.display="none",js_bottom_ad_area.style.display="none";else{
var adLS=new LS("ad");
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key),
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
return screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),
both_ad=screen_num>=2?1:0,{
is_need_ad:is_need_ad,
both_ad:both_ad,
_adInfo:_adInfo
};
}
function afterGetAdData(e,a){
var t={},i=e.is_need_ad,o=e._adInfo;
if(0==i)t=o,t||(t={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var p=a.advertisement_info;
t.advertisement_info=saveCopy(p);
}
t.advertisement_num=a.advertisement_num;
}
if(1==i&&(window._adRenderData=t),t=t||{
advertisement_num:0
},!t.flag&&t.advertisement_num>0){
var n=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=n;
for(var _=0;n>_;++_){
var d=null,s=r[_];
if(s.exp_info=s.exp_info||{},s.is_cpm=s.is_cpm||0,s.biz_info=s.biz_info||{},s.app_info=s.app_info||{},
s.pos_type=s.pos_type||0,s.logo=s.logo||"",100==s.pt||115==s.pt){
for(var l=s.exp_info.exp_value||[],c=!1,m=0,u=0;u<l.length;++u){
var f=l[u]||{};
if(1==f.exp_type&&(m=f.comm_attention_num,c=m>0),2==f.exp_type){
c=!1,m=0;
break;
}
}
s.biz_info.show_comm_attention_num=c,s.biz_info.comm_attention_num=m,d={
usename:s.biz_info.user_name,
pt:s.pt,
url:s.url,
traceid:s.traceid,
adid:s.aid,
ticket:s.ticket,
is_appmsg:!0
};
}else if(102==s.pt)d={
appname:s.app_info.app_name,
versioncode:s.app_info.version_code,
pkgname:s.app_info.apk_name,
androiddownurl:s.app_info.apk_url,
md5sum:s.app_info.app_md5,
signature:s.app_info.version_code,
rl:s.rl,
traceid:s.traceid,
pt:s.pt,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};else if(101==s.pt)d={
appname:s.app_info.app_name,
app_id:s.app_info.app_id,
icon_url:s.app_info.icon_url,
appinfo_url:s.app_info.appinfo_url,
rl:s.rl,
traceid:s.traceid,
pt:s.pt,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};else if(103==s.pt||104==s.pt||2==s.pt&&s.app_info){
var g=s.app_info.down_count||0,y=s.app_info.app_size||0,v=s.app_info.app_name||"",h=s.app_info.category,w=["万","百万","亿"];
if(g>=1e4){
g/=1e4;
for(var j=0;g>=10&&2>j;)g/=100,j++;
g=g.toFixed(1)+w[j]+"次";
}else g=g.toFixed(1)+"次";
y=formSize(y),h=h?h[0]||"其他":"其他",v=formName(v),s.app_info._down_count=g,s.app_info._app_size=y,
s.app_info._category=h,s.app_info.app_name=v,d={
appname:s.app_info.app_name,
app_rating:s.app_info.app_rating||0,
icon_url:s.app_info.icon_url,
app_id:s.app_info.app_id,
channel_id:s.app_info.channel_id,
md5sum:s.app_info.app_md5,
rl:s.rl,
pkgname:s.app_info.apk_name,
url_scheme:s.app_info.url_scheme,
androiddownurl:s.app_info.apk_url,
versioncode:s.app_info.version_code,
appinfo_url:s.app_info.appinfo_url,
traceid:s.traceid,
pt:s.pt,
url:s.url,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(105==s.pt){
var k=s.card_info.card_id||"",b=s.card_info.card_ext||"";
b=b.htmlDecode();
try{
b=JSON.parse(b),b.outer_str=s.card_info.card_outer_id||"",b=JSON.stringify(b);
}catch(x){
b="{}";
}
d={
card_id:k,
card_ext:b,
pt:s.pt,
ticket:s.ticket||"",
url:s.url,
rl:s.rl,
tid:s.traceid,
traceid:s.traceid,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(106==s.pt){
var I=s.mp_shop_info.pid||"",z=s.mp_shop_info.outer_id||"";
d={
pid:I,
outer_id:z,
pt:s.pt,
url:s.url,
rl:s.rl,
tid:s.traceid,
traceid:s.traceid,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(108==s.pt||109==s.pt||110==s.pt||116==s.pt||117==s.pt)d={
pt:s.pt,
ticket:s.ticket||"",
url:s.url,
traceid:s.traceid,
adid:s.aid,
is_appmsg:!0
},s.video_info&&(d.displayWidth=s.video_info.displayWidth,d.displayHeight=s.video_info.displayHeight,
d.thumbUrl=s.video_info.thumbUrl,d.videoUrl=s.video_info.videoUrl,d.rl=s.rl);else if(111==s.pt||113==s.pt||114==s.pt||112==s.pt){
var y=s.app_info.app_size||0,v=s.app_info.app_name||"";
y=formSize(y),v=formName(v),s.app_info.app_size=y,s.app_info.app_name=v,d={
appname:s.app_info.app_name,
app_rating:s.app_info.app_rating||0,
app_id:s.app_info.app_id,
icon_url:s.app_info.icon_url,
channel_id:s.app_info.channel_id,
md5sum:s.app_info.app_md5,
rl:s.rl,
pkgname:s.app_info.apk_name,
url_scheme:s.app_info.url_scheme,
androiddownurl:s.app_info.apk_url,
versioncode:s.app_info.version_code,
appinfo_url:s.app_info.appinfo_url,
traceid:s.traceid,
pt:s.pt,
url:s.url,
ticket:s.ticket,
type:s.type,
adid:s.aid,
source:source||"",
is_appmsg:!0
};
}
var E=s.image_url;
require("appmsg/cdn_img_lib.js"),E&&E.isCDN()&&(E=E.replace(/\/0$/,"/640"),E=E.replace(/\/0\?/,"/640?"),
s.image_url=ParseJs.addParam(E,"wxfrom","50",!0)),adDatas.ads["pos_"+s.pos_type]={
a_info:s,
adData:d
},localStorage&&localStorage.setItem&&s.app_info&&s.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+s.traceid,s.app_info.url_scheme);
}
s.has_installed=!1,s&&(104==s.pt||113==s.pt||114==s.pt||2==s.pt)&&s.app_info.url_scheme&&JSAPI.invoke("getInstallState",{
packageName:s.app_info.apk_name
},function(e){
var a=e.err_msg;
a.indexOf("get_install_state:yes")>-1&&(s.has_installed=!0,document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="进入应用"));
});
var q=function(e){
var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(a=e);
10>=a&&(T.style.display="block",DomEvent.off(window,"scroll",q));
},A=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
B.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),DomEvent.off(window,"scroll",A));
},D=document.getElementById("js_bottom_ad_area"),T=document.getElementById("js_top_ad_area"),B=document.getElementById("js_sponsor_ad_area"),C=adDatas.ads;
for(var O in C)if(0==O.indexOf("pos_")){
var d=C[O],s=!!d&&d.a_info;
if(d&&s){
if(0==s.pos_type){
if(D.innerHTML=TMPL.tmpl(a_tpl,s),111==s.pt||112==s.pt||113==s.pt||114==s.pt){
var S=document.getElementsByClassName("js_download_app_card")[0],N=S.offsetWidth,H=Math.floor(N/2.875);
H>0&&(S.style.height=H+"px");
}
}else if(1==s.pos_type){
T.style.display="none",T.innerHTML=TMPL.tmpl(a_tpl,s),DomEvent.on(window,"scroll",q);
var R=0;
window.localStorage&&(R=1*localStorage.getItem(O)||0),window.scrollTo(0,R),q(R);
}else if(3==s.pos_type){
var S=document.createElement("div");
S.appendChild(document.createTextNode(s.image_url)),s.image_url=S.innerHTML,B.innerHTML=TMPL.tmpl(sponsor_a_tpl,s),
B.style.display="block";
var M=B.clientWidth;
108==s.pt||109==s.pt||110==s.pt?document.getElementById("js_main_img").style.height=M/1.77+"px":116==s.pt||117==s.pt,
DomEvent.on(window,"scroll",A),A(0);
}
lazyLoadAdImg({
aid:s.aid,
type:s.pt
}),checkAdImg(s);
}
}
bindAdOperation();
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),t=0;t<a.length;t++){
var i=a[t];
a[t].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[t].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=ParseJs.addParam(i.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var t=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(i.src)+"&type="+e.type+"&network="+t,
type:"GET",
async:!0
});
},500);
}
window.__addIdKeyReport("28307",57);
},a[t].src=a[t].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],t=e.image_url||"",i=getHost(t);
return void(i&&-1==a.indexOf(i)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],t=0;t<e.length;++t){
var i=e[t],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[t]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,i=0,o=a.length;o>i;++i){
var p=a[i],n=e.indexOf(p);
-1!=n&&(-1==t||t>n)&&(t=n);
}
return-1!=t&&(e=e.substring(0,t)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=function(){
for(var scrollTop=window.pageYOffset||document.documentElement.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop;
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),function(){
try{
var e=window.__report,a=ping_test_apurl[pos_key],t=new Date,i=t.getHours(),o=ping_test_apurl_random&&i>=12&&18>=i&&0==pos_type;
!a[0]&&o&&scrollTop+innerHeight>offsetTop&&(a[0]=!0,e(81)),!a[1]&&o&&scrollTop+innerHeight>offsetTop+40&&(a[1]=!0,
e(82));
}catch(p){}
}(),!ping_apurl[pos_key]&&(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop)||3==pos_type&&scrollTop+innerHeight>offsetTop)){
ping_apurl[pos_key]=!0;
try{
var report_arg="trace_id="+tid+"&product_type="+adDatas.ads[pos_key].a_info.pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){});
}catch(e){}
log("[Ad] seeAd, tid="+tid+", gid="+gid+", pos_type="+pos_type),ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
log("[Ad] seeAd report success, tid="+tid+", gid="+gid+", pos_type="+pos_type);
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
log("[Ad] seeAd report error, tid="+tid+", gid="+gid+", pos_type="+pos_type),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
}
}(i);
};
DomEvent.on(window,"scroll",onScroll),onScroll();
}
}
function ad_click(e,a,t,i,o,p,n,r,_,d,s,l,c,m,u,f,g){
if(!has_click[o]){
has_click[o]=!0;
var y=document.getElementById("loading_"+o);
y&&(y.style.display="inline");
var v=g.exp_info||{},h=v.exp_id||"",w=v.exp_value||[];
try{
w=JSON.stringify(w);
}catch(j){
w="[]";
}
AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:h,
exp_value:w,
url:encodeURIComponent(a),
tid:o,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:_,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:f
},function(){
if(has_click[o]=!1,y&&(y.style.display="none"),"5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+p+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o;else{
if("105"==_&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==_&&l)return void(location.href=ParseJs.join(a,{
outer_id:l.outer_id
}));
if(g&&g.has_installed&&("104"==_||"113"==_||"114"==_||"2"==_)&&g.app_info.url_scheme)return void JSAPI.invoke("launchApplication",{
schemeUrl:g.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=g.app_info.url_scheme);
});
if(0==a.indexOf("https://itunes.apple.com/")||0==a.indexOf("http://itunes.apple.com/"))return JSAPI.invoke("downloadAppInternal",{
appUrl:a
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+p+"#wechat_redirect");
}),!1;
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:_,
aid:r,
ad_engine:s,
pos_type:d
},i=window.__report;
if(("104"==_||"113"==_||"114"==_)&&l||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var n="",c="";
l&&(n=l.pkgname&&l.pkgname.replace(/\./g,"_"),c=l.channel_id||""),t={
source:4,
tid:o,
traceid:o,
mid:mid,
idx:idx,
appuin:biz,
pt:_,
channel_id:c,
aid:r,
engine:s,
pos_type:d,
pkgname:n
};
}
a=URL.join(a,t),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:o,
aid:r,
engine:s
})),!r&&i&&i(80,a);
}
location.href=a;
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t)return!1;
if(!t.getElementsByClassName)return t.style.display="none",!1;
var i=t.getElementsByClassName("js_ad_link")||[],o=adDatas.ads[a];
if(o){
for(var p=o.adData,n=o.a_info,r=n.pos_type,_=o.ad_engine,d=0,s=i.length;s>d;++d)!function(e,a){
var t=i[e],o=t.dataset;
if(o&&3!=n.pos_type){
var p=o.type,d=o.url,s=o.rl,l=o.apurl,c=o.tid,m=o.ticket,u=o.group_id,f=o.aid,g=o.pt;
DomEvent.on(t,"click",function(e){
var t=!!e&&e.target;
if(!t||!t.className||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("btn_processor_value")){
if(a){
a.adid=window.adid||a.adid;
var i="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+_+"&pos_type="+r+"&r="+Math.random();
n&&n.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,i):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,i):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,i);
}
var o,y,v,h;
return o=position.getX(t,"js_ad_link")+e.offsetX,y=position.getY(t,"js_ad_link")+e.offsetY,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(p,d,s,l,c,m,u,f,g,r,_,a,o,y,v,h,n),log("[Ad] ad_click: type="+p+", url="+d+", rl="+s+", apurl="+l+", traceid="+c+", ticket="+m+", group_id="+u+", aid="+f+", pt="+g+", pos_type="+r+", ad_engine="+_),
!1;
}
},!0);
}
}(d,p);
if(p){
p.adid=window.adid||p.adid;
var l=n.exp_info||{},c=l.exp_id||"",m=l.exp_value||[];
try{
m=JSON.stringify(m);
}catch(u){
m="[]";
}
var f="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+_+"&pos_type="+r+"&exp_id="+c+"&exp_value="+m+"&r="+Math.random();
if(p.report_param=f,"100"==p.pt||"115"==p.pt){
var g=require("a/profile.js");
return void new g({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:p,
pos_type:r,
report_param:f,
aid:p.adid,
ad_engine:_
});
}
if("102"==p.pt){
var y=require("a/android.js"),v=15,h=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_app_action_"+r),
adData:p,
report_param:f,
task_ext_info:[p.adid,p.traceid,h,source,v,_].join("."),
via:[p.traceid,p.adid,h,source,v,_].join(".")
});
}
if("101"==p.pt){
var w=require("a/ios.js");
return void new w({
btn:document.getElementById("js_app_action_"+r),
adData:p,
ticket:p.ticket,
report_param:f
});
}
if("105"==p.pt)return void new Card({
btn:document.getElementById("js_card_action_"+r),
adData:p,
report_param:f,
pos_type:r
});
if("106"==p.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+r),
adData:p,
report_param:f,
pos_type:r
});
if("103"==p.pt||"104"==p.pt||"111"==p.pt||"112"==p.pt||"113"==p.pt||"114"==p.pt){
var j=require("a/app_card.js"),v=15,h=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new j({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:p,
report_param:f,
pos_type:r,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,h,source,v,_].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+h,"source="+source,"type="+v,"engine="+_,"appuin="+biz,"pos_type="+r,"ticket="+p.ticket,"scene="+scene].join("&"),
engine:_
});
}
if("108"==p.pt||"109"==p.pt||"110"==p.pt||"116"==p.pt||"117"==p.pt){
var k=require("a/sponsor.js");
new k({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adData:p,
a_info:n,
pos_type:r,
report_param:f
});
}
}
}
}(e);
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),pos_type=window.pos_type||0,__report=window.__report,total_pos_type=4,el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_1:js_top_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_1:js_top_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
};
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ParseJs=require("biz_common/utils/url/parse.js"),log=require("appmsg/log.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[]
},ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0,keyOffset="https:"==top.location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,r=e.length;r>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(h[i[2]]=!0)));
}
function o(e){
for(var t=0,o=v.length;o>t;++t)if(v[t]==e)return!0;
return!1;
}
function n(){
h={},t(document.getElementsByTagName("a"),"href"),t(document.getElementsByTagName("link"),"href"),
t(document.getElementsByTagName("iframe"),"src"),t(document.getElementsByTagName("script"),"src"),
t(document.getElementsByTagName("img"),"src");
var e=[];
for(var n in h)h.hasOwnProperty(n)&&(window.networkType&&"wifi"==window.networkType&&!y&&o(n)&&(y=!0),
e.push(n));
return h={},e.join(",");
}
function i(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=b.js_content,i=b.screen_height,a=b.screen_width,d=b.scroll_height,r=Math.ceil(d/i),m=Math.ceil((o.scrollHeight||o.offsetHeight)/i),s=(window.logs.read_height||t)+i,_=b.pageEndTop,l=b.imgs,c=Math.ceil(s/i)||1,g=b.media,p=50,u=0,h=0,v=0,j=0,T=s+p>_?1:0;
c>r&&(c=r);
var z=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
u++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(h++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&j++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=j||0,e.download_img_cnt=h||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=u||0;
},O=window.appmsgstat||{},E=window.logs.img||{},x=window.logs.pagetime||{},k=E.load||{},D=E.read||{},I=[],S=[],B=0,N=0,M=0;
for(var H in D)H&&0==H.indexOf("http")&&D.hasOwnProperty(H)&&S.push(H);
for(var H in k)H&&0==H.indexOf("http")&&k.hasOwnProperty(H)&&I.push(H);
for(var P=0,q=I.length;q>P;++P){
var A=I[P];
A&&A.isCDN()&&(-1!=A.indexOf("/0")&&B++,-1!=A.indexOf("/640")&&N++,-1!=A.indexOf("/300")&&M++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_width:a,
screen_height:i,
screen_num:m,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:window.logs.video_cnt||0,
read_screen_num:c||0,
is_finished_read:T,
scene:source,
content_len:f.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:N,
img_0_cnt:B,
img_300_cnt:M,
wtime:x.onload_time||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
onload_time:x.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:ct
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=I.length,
e.wifi_read_imgs_cnt=S.length),window.logs.webplog&&4==window.logs.webplog.total){
var R=window.logs.webplog;
e.webp_total=1,e.webp_lossy=R.lossy,e.webp_lossless=R.lossless,e.webp_alpha=R.alpha,
e.webp_animation=R.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,J=[];
for(var K in Y)if(Y.hasOwnProperty(K)){
var C=Y[K];
C.val>0&&J.push(K+"_"+C.val);
}
e.idkey=J.join(";");
}
z(!!g&&g.getElementsByTagName("img")),z(l);
var W=(new Date).getDay(),L=n();
return(y||0!==user_uin&&Math.floor(user_uin/100)%7==W)&&(e.domain_list=L),y&&(e.html_content=w),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e;
}
function a(e){
j||(j=!0,p.remove("page_time"),e.report_time=parseInt(+new Date/1e3),_({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
if(window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,o=[biz,sn,mid,idx].join("_"),n=new c("ad");
n.set(o,{
info:e,
time:t
},+new Date+24e4);
}
g.set(o,z,+new Date+72e5);
}
function r(){
return window.__video_report_data;
}
function m(e){
e&&e.play_type&&(u.remove("spad"),e.report_type=1,_({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
e("biz_common/utils/string/html.js");
var s=e("biz_common/dom/event.js"),_=e("biz_wap/utils/ajax.js"),l=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var w,c=e("biz_wap/utils/storage.js"),g=new c("page_pos"),p=new c("time_on_page"),u=new c("spad"),f={};
!function(){
w=document.getElementsByTagName("html"),w&&1==!!w.length&&l&&(w=w[0].innerHTML,f.content_length=l.htmlSize),
window.logs.pageinfo=f;
}();
var h={},y=!1,v=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],b={
js_content:document.getElementById("js_content"),
screen_height:document.documentElement.clientHeight||window.innerHeight,
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:document.getElementById("js_toobar3").offsetTop,
imgs:document.getElementById("js_content").getElementsByTagName("img")||[],
media:document.getElementById("media")
},j=!1,T=null,z=0,O=(msg_link.split("?").pop(),[biz,sn,mid,idx].join("_"));
!function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(s.on(window,"load",function(){
z=1*g.get(O);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var o=t.offsetTop;
window.scrollTo(0,o-25);
}else window.scrollTo(0,z);
if(window.__wxjs_is_wkwebview){
var n=p.getData("page_time");
n.page_time&&(a(n.page_time.val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random());
var s=u.getData("spad");
s.spad&&m(s.spad.val),window.setInterval(function(){
var e=i();
p.set("page_time",e,+new Date+864e7),d(),e=r(),u.set("spad",e,+new Date+864e7);
},1e3);
}
}),s.on(window,"unload",function(){
d(),window.__ajaxtest="2";
var e=i();
a(e);
}),window.logs.read_height=0,s.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(T),T=setTimeout(function(){
z=window.pageYOffset,g.set(O,z,+new Date+72e5);
},500);
}),s.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(T),T=setTimeout(function(){
z=window.pageYOffset,g.set(O,z,+new Date+72e5);
},500);
}));
});;define('page/appmsg/page_mp_article_improve_combo.css', [], function(require, exports, module) {
	return ".selectTdClass{background-color:#edf5fa!important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd!important}table{margin-bottom:10px;border-collapse:collapse;display:table;width:100%!important}td,th{word-wrap:break-word;word-break:break-all;padding:5px 10px;border:1px solid #DDD}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center}th{border-top:2px solid #BBB;background:#f7f7f7}.ue-table-interlace-color-single{background-color:#fcfcfc}.ue-table-interlace-color-double{background-color:#f7faff}td p{margin:0;padding:0}.res_iframe{display:block;width:100%;background-color:transparent;border:0}.shopcard_iframe{margin:14px 0;height:95px}.vote_area{display:block;position:relative;margin:14px 0;white-space:normal!important}.vote_iframe{display:block;width:100%;height:100%;background-color:transparent;border:0}form{display:none!important}@media screen and (min-width:0\\0) and (min-resolution:72dpi){.rich_media_content table{table-layout:fixed!important}.rich_media_content td,.rich_media_content th{width:auto!important}}.tc{text-align:center}.tl{text-align:left}.tr{text-align:right}.tips_global{color:#8c8c8c}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_tips{margin-top:25px;margin-bottom:0;min-height:24px;text-align:center}.rich_tips .tips{display:inline-block;vertical-align:middle}.rich_tips .tips,.rich_tips .rich_icon{vertical-align:middle}.rich_tips .rich_icon{margin-top:-3px 5px 0 0}.rich_tips.with_line{border-top:1px dotted #e1e1e1}.rich_tips.with_line .tips{position:relative;top:-12px;padding-left:16px;padding-right:16px;background-color:#f3f3f3}.rich_tips.with_line{line-height:16px}.rich_tips.with_line .tips{top:-11px;padding-left:.35em;padding-right:.35em}.title_tips .tips{color:#868686;font-size:16px}.loading_tips{margin:36px 0 20px}.title_bottom_tips{margin-top:-10px}.icon_arrow_gray{width:7px}.icon_loading_white{width:16px}.icon_loading_white.icon_before{margin-right:1em}.icon_loading_white.icon_after{margin-left:1em}.btn{display:block;padding-left:14px;padding-right:14px;font-size:18px;text-align:center;text-decoration:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:#fff;line-height:42px;-webkit-tap-highlight-color:rgba(255,255,255,0)}.btn.btn_inline{display:inline-block}.btn_primary{background-color:#04be02}.btn_primary:not(.btn_disabled):visited{color:#fff}.btn_primary:not(.btn_disabled):active{color:rgba(255,255,255,0.4);background-color:#039702}.btn_disabled{color:rgba(255,255,255,0.6)}.sougou_body .rich_media_area_primary{margin-top:10px}.sougou_body .rich_media_area_primary:first-child{margin-top:0}.sougou_body .rich_media_area_primary.sougou ul{padding-left:0;list-style-type:none}.sougou_body .rich_media_area_extra{margin-top:10px;background-color:#fff}.sougou_body .rich_media_area_title{font-size:16px;margin-bottom:.5em}.sougou_body .relate_article_list{font-size:15px}.sougou_body .relate_article_link{display:block;padding:.35em 0;color:#8c8c8c;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sougou_body .rich_tips.discuss_title_line{text-align:left;margin-top:0;padding:20px 0 .5em;border-width:0;line-height:1.6}.sougou_body .rich_tips.discuss_title_line .tips{position:static;padding:0;color:#3e3e3e}.sougou_body .rich_tips.with_line .tips{background-color:#fff}.sougou_body .rich_split_tips{margin:0;padding:20px 0}.sougou_body .rich_media_extra .loading_tips{margin:0;padding:20px 0}.emotion_tool{position:relative;overflow:hidden}.pic_emotion_switch_wrp{margin-left:15px;margin-bottom:6px;display:inline-block;font-size:0}.pic_emotion_switch_wrp img{width:35px;display:block}.pic_emotion_switch_wrp .pic_active{display:none}.pic_emotion_switch_wrp:active .pic_default{display:none}.pic_emotion_switch_wrp:active .pic_active{display:block}.emotion_switch{margin-left:15px;margin-bottom:6px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:35px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:35px auto;background-size:35px auto}.emotion_switch:active{background-position:0 -40px}.emotion_panel_arrow_wrp{position:absolute;margin-top:-6px;margin-left:26px}.emotion_panel_arrow_wrp .emotion_panel_arrow{position:absolute;display:inline-block;width:0;height:0;border-width:6px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#e5e5e7;border-bottom-style:solid}.emotion_panel_arrow_wrp .arrow_in{border-bottom-color:#f6f6f8;top:1px}.emotion_panel{background-color:#f6f6f8;position:relative}.emotion_panel:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e3e3e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_panel:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e3e3e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_list_wrp{overflow:hidden;position:relative;font-size:0;white-space:nowrap}.emotion_list{padding:10px 15px 0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:normal;display:inline-block;vertical-align:top}.emotion_list:last-child .emotion_item.del{position:absolute;bottom:0;right:18px}.emotion_item{display:inline-block;width:36px;height:36px;margin-bottom:5px;text-align:center;line-height:36px}.emotion_navs{text-align:center;padding-bottom:5px}.emotion_nav{display:inline-block;width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;background-color:#bbb;margin:0 5px}.emotion_nav.current{background-color:#8c8c8c}.icon_emotion{width:22px;height:22px;vertical-align:middle;display:inline-block;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/icon_emotion_panel.2x3518c6.png) no-repeat 0 0;-webkit-background-size:22px auto;background-size:22px auto}.icon_emotion.del{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:28px;height:28px;vertical-align:middle;display:inline-block;background-position:2px -62px;-webkit-background-size:28px auto;background-size:28px auto}.icon_emotion.del:active{background-position:2px -92px}.icon_emotion_single{width:22px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:22px auto;background-size:22px auto}.icon_smiley_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_03518c6.png)}.icon_smiley_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_13518c6.png)}.icon_smiley_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_23518c6.png)}.icon_smiley_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_33518c6.png)}.icon_smiley_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_43518c6.png)}.icon_smiley_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_53518c6.png)}.icon_smiley_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_63518c6.png)}.icon_smiley_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_73518c6.png)}.icon_smiley_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_83518c6.png)}.icon_smiley_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_93518c6.png)}.icon_smiley_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_103518c6.png)}.icon_smiley_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_113518c6.png)}.icon_smiley_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_123518c6.png)}.icon_smiley_13{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_133518c6.png)}.icon_smiley_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_143518c6.png)}.icon_smiley_15{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_153518c6.png)}.icon_smiley_17{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_173518c6.png)}.icon_smiley_18{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_183518c6.png)}.icon_smiley_19{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_193518c6.png)}.icon_smiley_20{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_203518c6.png)}.icon_smiley_21{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_213518c6.png)}.icon_smiley_22{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_223518c6.png)}.icon_smiley_23{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_233518c6.png)}.icon_smiley_25{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_253518c6.png)}.icon_smiley_26{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_263518c6.png)}.icon_smiley_27{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_273518c6.png)}.icon_smiley_28{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_283518c6.png)}.icon_smiley_29{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_293518c6.png)}.icon_smiley_30{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_303518c6.png)}.icon_smiley_31{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_313518c6.png)}.icon_smiley_32{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_323518c6.png)}.icon_smiley_33{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_333518c6.png)}.icon_smiley_34{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_343518c6.png)}.icon_smiley_36{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_363518c6.png)}.icon_smiley_37{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_373518c6.png)}.icon_smiley_38{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_383518c6.png)}.icon_smiley_39{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_393518c6.png)}.icon_smiley_40{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_403518c6.png)}.icon_smiley_41{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_413518c6.png)}.icon_smiley_42{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_423518c6.png)}.icon_smiley_44{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_443518c6.png)}.icon_smiley_45{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_453518c6.png)}.icon_smiley_46{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_463518c6.png)}.icon_smiley_47{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_473518c6.png)}.icon_smiley_48{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_483518c6.png)}.icon_smiley_49{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_493518c6.png)}.icon_smiley_50{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_503518c6.png)}.icon_smiley_51{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_513518c6.png)}.icon_smiley_52{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_523518c6.png)}.icon_smiley_54{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_543518c6.png)}.icon_smiley_55{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_553518c6.png)}.icon_smiley_56{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_563518c6.png)}.icon_smiley_57{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_573518c6.png)}.icon_smiley_60{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_603518c6.png)}.icon_smiley_62{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_623518c6.png)}.icon_smiley_63{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_633518c6.png)}.icon_smiley_64{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_643518c6.png)}.icon_smiley_65{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_653518c6.png)}.icon_smiley_66{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_663518c6.png)}.icon_smiley_67{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_673518c6.png)}.icon_smiley_68{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_683518c6.png)}.icon_smiley_70{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_703518c6.png)}.icon_smiley_74{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_743518c6.png)}.icon_smiley_75{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_753518c6.png)}.icon_smiley_76{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_763518c6.png)}.icon_smiley_78{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_783518c6.png)}.icon_smiley_79{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_793518c6.png)}.icon_smiley_80{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_803518c6.png)}.icon_smiley_81{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_813518c6.png)}.icon_smiley_82{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_823518c6.png)}.icon_smiley_83{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_833518c6.png)}.icon_smiley_84{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_843518c6.png)}.icon_smiley_85{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_853518c6.png)}.icon_smiley_89{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_893518c6.png)}.icon_smiley_92{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_923518c6.png)}.icon_smiley_93{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_933518c6.png)}.icon_smiley_94{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_943518c6.png)}.icon_smiley_95{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/smiley\/smiley_953518c6.png)}.icon_emoji_ios_0{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6043518c6.png)}.icon_emoji_ios_1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6373518c6.png)}.icon_emoji_ios_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6023518c6.png)}.icon_emoji_ios_3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F61D3518c6.png)}.icon_emoji_ios_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6333518c6.png)}.icon_emoji_ios_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6313518c6.png)}.icon_emoji_ios_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6143518c6.png)}.icon_emoji_ios_7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F6123518c6.png)}.icon_emoji_wx_4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_043518c6.png)}.icon_emoji_wx_5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_053518c6.png)}.icon_emoji_wx_2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_023518c6.png)}.icon_emoji_wx_6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_063518c6.png)}.icon_emoji_wx_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_123518c6.png)}.icon_emoji_wx_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_113518c6.png)}.icon_emoji_ios_8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F47B3518c6.png)}.icon_emoji_ios_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F64F.03518c6.png)}.icon_emoji_ios_10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F4AA.03518c6.png)}.icon_emoji_ios_11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3893518c6.png)}.icon_emoji_ios_12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_ios\/u1F3813518c6.png)}.icon_emoji_wx_9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_093518c6.png)}.icon_emoji_wx_14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/common\/emotion_panel\/emoji_wx\/2_143518c6.png)}.wx_poptips{position:fixed;z-index:3;width:120px;min-height:120px;top:180px;left:50%;margin-left:-60px;background:rgba(40,40,40,0.5)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80282828',endcolorstr = '#80282828');text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;color:#fff}.wx_poptips .icon_toast{width:53px;margin:15px 0 0}.wx_poptips .toast_content{margin:0 0 15px}.discuss_container .rich_media_title{font-size:18px}.discuss_container.disabled .btn_discuss{color:#60f05f}.discuss_container.access .discuss_container_inner{padding:15px 15px 0}.discuss_container.editing .discuss_container_inner{padding-bottom:25px}.discuss_container.editing .frm_textarea_box_wrp{margin:0 -15px}.discuss_container.editing .frm_textarea{height:78px;-webkit-overflow-scrolling:touch}.discuss_container.editing .frm_append.counter{display:block}.discuss_container.editing .discuss_btn_wrp{display:block}.discuss_container.editing .discuss_icon_tips{margin-top:0;margin-bottom:-14px}.discuss_container.editing .discuss_title_line{margin-bottom:-20px}.discuss_container.warning .counter{color:#e15f63}.frm_textarea{width:100%;background-color:transparent;border:0;display:block;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;height:37px;padding:10px 15px;resize:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.frm_textarea_box_wrp{position:relative}.frm_textarea_box_wrp:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:-1px}.frm_textarea_box_wrp:after{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.frm_textarea_box{display:block;background-color:#fff}.frm_append.counter{display:none;position:absolute;right:8px;bottom:8px;color:#a3a3a3;font-weight:400;font-style:normal;font-size:12px}.frm_append .current_num.warn{color:#f43631}.discuss_btn_wrp{display:none;margin-top:20px;margin-bottom:20px;text-align:right}.btn_discuss{padding-left:1.5em;padding-right:1.5em}.discuss_list{margin-top:-5px;padding-bottom:20px;font-size:16px}.discuss_item{position:relative;padding-left:45px;margin-top:26px;*zoom:1}.discuss_item:after{content:\"\\200B\";display:block;height:0;clear:both}.discuss_item .user_info{min-height:20px;overflow:hidden}.discuss_item .nickname{display:inline-block;vertical-align:middle;font-weight:400;font-style:normal;color:#727272;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;max-width:9em}.discuss_item .avatar{position:absolute;top:0;left:0;top:3px;width:35px;height:35px;background-color:#ccc;vertical-align:top;margin-top:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.discuss_item .discuss_message{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;color:#3e3e3e;line-height:1.5}.discuss_item .discuss_message_content{white-space:pre-wrap}.discuss_item .discuss_extra_info{color:#bdbdbd;font-size:13px}.discuss_item .discuss_extra_info a{margin-left:.5em}.discuss_item .discuss_status{color:#ff7a21;white-space:nowrap}.discuss_item .discuss_status i{font-style:normal;margin-right:2px}.discuss_item .discuss_opr{float:right}.discuss_item .discuss_opr .meta_praise{display:inline-block;text-align:right;padding-top:5px;margin-top:-5px}.discuss_item .discuss_opr .praise_num{-webkit-user-select:none;user-select:none}.discuss_item .discuss_del{margin-left:.5em}.discuss_icon_tips{margin-bottom:20px}.discuss_icon_tips img{vertical-align:middle;margin-left:3px;margin-top:-4px}.discuss_icon_tips .icon_edit{width:12px}.discuss_icon_tips .icon_access{width:13px}.reply_result{position:relative;margin-top:.5em;padding-top:.5em;padding-left:.4em}.reply_result:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #dadada;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.reply_result .discuss_message{clear:both}.reply_result .nickname{position:relative;overflow:visible}.reply_result .nickname:before{content:\" \";position:absolute;left:-0.4em;top:50%;margin-top:-7px;width:3px;height:14px;background-color:#02bb00}.rich_tips.discuss_title_line{margin-top:50px}.icon_discuss_top{display:inline-block;vertical-align:middle;padding:1px .5em;border:1px solid #bdbdbd;color:#bdbdbd;border-top-left-radius:.7em 50%;-moz-border-radius-topleft:.7em 50%;-webkit-border-top-left-radius:.7em 50%;border-top-right-radius:.7em 50%;-moz-border-radius-topright:.7em 50%;-webkit-border-top-right-radius:.7em 50%;border-bottom-left-radius:.7em 50%;-moz-border-radius-bottomleft:.7em 50%;-webkit-border-bottom-left-radius:.7em 50%;border-bottom-right-radius:.7em 50%;-moz-border-radius-bottomright:.7em 50%;-webkit-border-bottom-right-radius:.7em 50%;font-size:12px;line-height:1;margin-top:-1px;margin-left:.5em}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.icon_discuss_top{font-size:11px;line-height:1.1;padding-top:0}}.reward_area{padding:38px 5% 20px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.reward_area_inner{margin:0 auto;position:relative;left:3px}.reward_access{display:inline-block;padding:0 1.6em;line-height:2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-color:#dc5d4a;color:#fff;font-size:16px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_access:active{background-color:#be5041;color:#e69990}.reward_tips{margin-bottom:5px}.reward_user_tips{margin-top:1.4em}.reward_user_list{padding-top:.5em;overflow:hidden}.reward_user_avatar{display:inline-block;vertical-align:top;width:28px;height:28px;margin:0 6px 6px 0}.reward_user_avatar img{width:100%;height:100%!important}.reward_user_avatar.readmore{-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_qrcode_area{margin:38px 0 20px;padding:30px 20px;font-size:14px;border:1px solid #ebebeb}.reward_qrcode_area p{word-wrap:break-word;word-break:break-all}.reward_qrcode_area .tips_global{font-size:13px}.reward_qrcode_area .reward_money{font-size:30px;margin-top:.6em;margin-bottom:-0.1em;line-height:1;font-family:\"WeChatNumber-151125\"}.reward_qrcode_area .reward_tips{margin-top:1em;margin-bottom:0}.reward_qrcode_img_wrp{width:200px;height:200px;background-color:#fff;display:block;margin:1.5em auto 1.6em}.reward_qrcode_img{width:100%;height:100%;display:block}@font-face{font-weight:normal;font-style:normal;font-family:\"WeChatNumber-151125\";src:url('https:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/assets\/WeChatNumber-170206.ttf') format('truetype')}@media(min-device-width:414px){.reward_qrcode_area .tips_global{line-height:1.8}.reward_qrcode_area .reward_money{margin-top:.6em}.reward_qrcode_area .reward_tips{margin-top:1.2em}.reward_qrcode_img_wrp{width:224px;height:224px;margin:1.8em auto}}.rich_media_extra{position:relative}.rich_media_extra .extra_link{display:block}.rich_media_extra img{vertical-align:middle;margin-top:-3px}.rich_media_extra .appmsg_banner{width:100%}.rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.mpda_bottom_container .rich_media_extra{padding-bottom:15px}.btn_default.btn_line,.btn_primary.btn_line{background-color:#fff;color:#04be02;border:1px solid #04be02;font-size:15px}.rich_media_extra .extra_link{position:relative}.promotion_tag{position:absolute;display:block;height:21px;line-height:21px;width:79px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_primary2c7543.png) no-repeat 0 0;background-position:100% 0;-webkit-background-size:79px 21px;background-size:79px 21px;font-size:14px;font-style:normal;color:#fff;padding-right:6px;text-align:right;right:0;bottom:0}.brand_logo{position:absolute;display:block;width:24%;right:1.54%;top:0}.brand_logo img{width:100%;vertical-align:top;max-height:35px}.top_banner{background-color:#fff}.top_banner .rich_media_extra{padding:15px 15px 20px 15px}.top_banner .rich_media_extra .extra_link{position:relative;padding-bottom:10px}.top_banner .rich_media_extra .extra_link:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d6d6d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.top_banner .rich_media_extra .extra_link:active,.top_banner .rich_media_extra .extra_link:focus{outline:0;border:0}.top_banner .rich_media_extra .appmsg_banner{width:100%;vertical-align:top;outline:0}.top_banner .rich_media_extra .appmsg_banner:active,.top_banner .rich_media_extra .appmsg_banner:focus{outline:0;border:0}.top_banner .rich_media_extra .promotion_tag{height:19px;line-height:19px;width:69px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_small24a2fe.png) no-repeat 0 0;font-size:12px;-webkit-background-size:69px 19px;background-size:69px 19px;bottom:10px;padding-left:6px}.top_banner .rich_media_extra .brand_logo{width:20%;right:2.22%}.top_banner .rich_media_extra .brand_logo img{max-height:35px}.top_banner .rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.top_banner .rich_media_extra .ad_msg_mask img{position:absolute;width:16px;top:50%;margin-top:-8px;left:50%;margin-left:-8px}.top_banner .preview_group.obvious_app{min-height:54px;position:relative}.top_banner .preview_group.obvious_app .pic_app{width:66.6%}.top_banner .preview_group.obvious_app .pic_app img{height:100%;min-height:54px}.top_banner .preview_group.obvious_app .info_app{width:33%;left:68%}.top_banner .preview_group.obvious_app .info_app .name_app{line-height:18px;font-size:13px}.top_banner .preview_group.obvious_app .info_app .profile_app{font-size:10px}.top_banner .preview_group.obvious_app .info_app .dm_app{bottom:5px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn{font-size:12px;padding-left:17px;line-height:16px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{-webkit-background-size:14px 14px;background-size:14px 14px;background-position:0 center;-webkit-background-position:0 center}.top_banner .preview_group.obvious_app .info_app .dm_app .extra_info{display:none}.wrp_preview_group{padding-top:100px}.preview_group{position:relative;min-height:83px;background-color:#fff;border:1px solid #e7e7eb;-webkit-text-size-adjust:none;text-size-adjust:none}.preview_group.fixed_pos{position:fixed;bottom:0;left:0;right:0}.preview_group .preview_group_inner{padding:14px}.preview_group .preview_group_inner .preview_group_info{padding-left:68px;color:#8d8d8d;font-size:14px}.preview_group .preview_group_inner .preview_group_info .preview_group_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:#000;font-weight:400;font-style:normal;padding-right:73px;max-width:142px;display:block}.preview_group .preview_group_inner .preview_group_info .preview_group_desc{padding-right:65px;display:inline-block;line-height:20px}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar{position:absolute;width:55px;height:55px;left:13px;top:50%;margin-top:-27px;z-index:1}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar.br_radius{border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%}.preview_group .preview_group_inner .preview_group_opr{position:absolute;line-height:83px;top:0;right:13px}.preview_group .preview_group_inner .preview_group_opr .btn{padding:0;min-width:60px;min-height:30px;height:auto;line-height:30px;text-align:center}.preview_group.preview_card .card_inner{padding:0;min-height:89px}.preview_group.preview_card .card_inner .preview_card_avatar{position:absolute;width:89px;height:89px!important;margin:0;left:0;top:0}.preview_group.preview_card .card_inner .preview_group_info{padding:10px 12px 0 106px}.preview_group.preview_card .card_inner .preview_group_info .preview_group_title2{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-right:0;display:block;color:#3e3e3e;font-weight:400}.preview_group.preview_card .card_inner .preview_group_info .preview_group_desc{padding-right:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_desc,.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_title{padding-right:68px;width:auto}.preview_group.preview_shop_card .shop_card_inner{padding:0;min-height:96px}.preview_group.preview_shop_card .preview_card_avatar{position:absolute;width:96px;height:96px!important;margin:0;left:0;top:0}.preview_group.preview_shop_card .preview_group_info{padding:10px 12px 0 111px}.preview_group.preview_shop_card .preview_shop_card_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:15px}.preview_group.preview_shop_card .preview_shop_card_desc{color:#8c8c8c;position:absolute;bottom:6px;left:111px;right:12px}.preview_group.preview_shop_card .preview_shop_card_price{font-size:16px;color:#3e3e3e}.preview_group.preview_shop_card .preview_shop_card_oldprice{text-decoration:line-through;color:#8c8c8c;font-size:13px;margin-bottom:-0.5em}.preview_group.preview_shop_card .preview_shop_card_price,.preview_group.preview_shop_card .preview_shop_card_oldprice{display:block}.preview_group.preview_shop_card .preview_shop_card_btn_buy{float:right;line-height:1.75;font-size:16px;padding:0 .8em;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;margin-top:1px}.preview_group.obvious_app{width:100%}.preview_group.obvious_app .preview_group_inner{padding:0}.preview_group.obvious_app .pic_app{width:58.3%;height:100%;display:inline-block;margin-right:2%;vertical-align:top}.preview_group.obvious_app .pic_app img{width:100%;vertical-align:top;margin-top:0}.preview_group.obvious_app .info_app{display:inline-block;width:38%;color:#8a8a8a;font-size:12px;box-sizing:border-box;-webkit-box-sizing:border-box;position:absolute;left:62%;top:0;height:100%}.preview_group.obvious_app .info_app .name_app{color:#000;font-size:15px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:3px}.preview_group.obvious_app .info_app .profile_app{line-height:10px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.obvious_app .info_app .profile_app span{padding:0 5px}.preview_group.obvious_app .info_app .profile_app span:first-child{padding-left:0}.preview_group.obvious_app .info_app .profile_app em{font-size:9px;line-height:16px;font-weight:400;font-style:normal;color:#dfdfdf}.preview_group.obvious_app .info_app .dm_app{line-height:20px;vertical-align:middle;position:absolute;left:0;bottom:5px}.preview_group.obvious_app .info_app .dm_app .ad_btn{display:block;color:#04be02;font-size:15px;padding-left:22px}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_download@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_install@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_installed@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;color:#8a8a8a;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_open@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app p{line-height:15px}.preview_group.obvious_app .info_app .dm_app .extra_info{font-size:9px}.preview_group.obvious_app .info_app .grade_app{height:11px;line-height:11px;font-size:12px;color:#888}.preview_group.obvious_app .info_app .grade_app .stars{display:inline-block;width:55px;height:11px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/star_sprite25624b.png) no-repeat 0 0;-webkit-background-size:55px 110px;background-size:55px 110px}.preview_group.obvious_app .info_app .grade_app .stars.star_half{backgroud-position:0}.preview_group.obvious_app .info_app .grade_app .stars.star_one{background-position:0 -11px}.preview_group.obvious_app .info_app .grade_app .stars.star_one_half{background-position:0 -22px}.preview_group.obvious_app .info_app .grade_app .stars.star_two{background-position:0 -33px}.preview_group.obvious_app .info_app .grade_app .stars.star_two_half{background-position:0 -44px}.preview_group.obvious_app .info_app .grade_app .stars.star_three{background-position:0 -55px}.preview_group.obvious_app .info_app .grade_app .stars.star_three_half{background-position:0 -66px}.preview_group.obvious_app .info_app .grade_app .stars.star_four{background-position:0 -77px}.preview_group.obvious_app .info_app .grade_app .stars.star_four_half{background-position:0 -88px}.preview_group.obvious_app .info_app .grade_app .stars.star_five{background-position:0 -99px}.preview_group.download_app_with_desc{border:0;color:#fff;font-weight:400}.preview_group.download_app_with_desc .preview_group_inner{position:relative;background-repeat:no-repeat;background-position:center;background-size:cover;height:100%;width:100%;box-sizing:border-box;padding:0;overflow:hidden}.preview_group.download_app_with_desc .preview_group_hd{position:relative;z-index:9;width:24%;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;float:right;margin-right:2.875%}.preview_group.download_app_with_desc .preview_group_hd .preview_card_avatar{width:45%;height:45%!important;margin:0;border-radius:18%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{display:block;font-weight:400;font-size:12px;padding-top:4%;padding-bottom:8%;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{display:block;margin:0 auto;font-size:14px;padding:6.5% 0;line-height:1;width:72%;text-align:center;border:1px solid #fff;border-radius:5px;color:#fff;-webkit-tap-highlight-color:transparent}.preview_group.download_app_with_desc .preview_group_hd_inner{-webkit-box-flex:1;-webkit-flex:1;flex:1}.preview_group.download_app_with_desc .preview_group_btn.with_processor{position:relative;overflow:hidden}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#04be02}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor_value{position:relative}.preview_group.download_app_with_img .preview_card_avatar{box-shadow:0 -1px 2px rgba(0,0,0,0.2)}.preview_group.download_app_with_desc{overflow:hidden}.preview_group.download_app_with_desc .preview_group_bg{width:100%;height:100%;position:absolute;background-repeat:no-repeat;background-position:center;background-size:cover;z-index:0;-webkit-filter:blur(30px);-moz-filter:blur(30px);-o-filter:blur(30px);-ms-filter:blur(30px);filter:blur(30px)}.preview_group.download_app_with_desc .preview_group_bd{position:absolute;left:2.875%;right:26%;top:46%;transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center}.preview_group.download_app_with_desc .preview_group_ft{position:absolute;left:2.875%;right:26%;bottom:26%;transform:translateY(50%);-webkit-transform:translateY(50%);-moz-transform:translateY(50%);-ms-transform:translateY(50%);text-align:center}.preview_group.download_app_with_desc .preview_group_desc{display:block;font-size:17px;line-height:1.5;width:12em;margin:0 auto;overflow-x:hidden;white-space:nowrap}.preview_group.download_app_with_desc .preview_group_download_info{display:inline-block;font-size:9px}.preview_group.follow .preview_group_inner .preview_group_info .preview_group_desc{display:block}.preview_group.follow.with_tips .preview_group_desc{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.follow .weak_tips{color:#bbb}.btn_plain_primary{color:#04be02;border:1px solid #04be02}.btn_plain_primary:active{border-color:#039702}.mpda_card .btn{padding:0;font-size:15px}.mpda_card .btn_inline{width:4em;line-height:2}.mpda_card .cardticket_hd{background-color:#fff;border-top-left-radius:5px;-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;border-top-right-radius:5px;-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;border:1px solid #ececec;border-bottom-width:0}.mpda_card .cardticket_hd .radius_avatar{width:45px;height:45px}.mpda_card .cardticket_hd .cell_hd{padding-left:12px}.mpda_card .cardticket_hd .cell_bd{font-size:17px;padding-left:.5em}.mpda_card .cardticket_hd .cell_ft{padding-right:10px}.mpda_card .cardticket_ft{position:relative;margin-top:10px;padding:.35em 12px;font-size:12px;background-color:#fff;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border:1px solid #ececec;border-top-width:0}.mpda_card .cardticket_theme{position:absolute;top:-10px;left:8px;right:8px;height:10px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle290773.png) no-repeat 0 0;background-repeat:repeat-x;-webkit-background-size:10px auto;background-size:10px auto}.mpda_card .cardticket_theme:before{content:\" \";position:absolute;left:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_left290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}.mpda_card .cardticket_theme:after{content:\" \";position:absolute;right:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_right290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}@media(max-width:354px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:16px;line-height:1.4}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{padding-top:3%;padding-bottom:6%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{font-size:13px}}@media(min-width:400px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:18px}}.wx_flex_layout{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.wx_flex_ft{text-align:center}.mod_follow_with_img .wx_flex_ft{width:32%}.mod_follow_with_img .fwi_thumb{margin:0;display:block;width:100%}.mod_follow_with_img .radius_avatar{width:35px;height:35px;padding:0}.mod_follow_with_img .radius_avatar img{margin:0}.mod_follow_with_img .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.2em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.wx_min_plain_btn{display:inline-block;vertical-align:middle;padding:0 .85em;line-height:1.6em;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}.wx_min_plain_btn.primary{color:#1aad19;border:1px solid #1aad19}.wx_min_plain_btn.primary:active{color:rgba(26,173,25,0.6);border-color:rgba(26,173,25,0.6)}span.img_bg_cover{background-repeat:no-repeat;background-position:center center;background-size:cover}.ct_mpda_wrp{margin:38px 0 20px}.ct_mpda_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #ebebeb;-webkit-user-select:none;user-select:none}.ct_mpda_placeholder{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.ct_mpda_tips{color:#d8d8d8;text-align:center;font-size:15px}.ct_mpda_inner{position:relative;width:100%;opacity:0;transition:opacity .6s;-webkit-transition:opacity .6s}.ct_mpda_area.show .ct_mpda_inner{opacity:1}.ct_mpda_main_img{width:100%;min-height:100px;display:block}.ct_mpda_hd .page_video{min-height:0}.ct_mpda_bd{width:100%;position:relative;border-top:1px solid #ebebeb;box-sizing:border-box;white-space:nowrap}.ct_mpda_logo{width:35px;height:35px;display:inline-block;margin:15px 10px;vertical-align:middle;border-radius:50%;overflow:hidden}.ct_mpda_desc_box{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;margin-left:-60px;padding-left:55px;padding-right:80px;box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.ct_mpda_btn_more{position:absolute;right:10px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .75em}.ct_mpda_btn_more:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_title{font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ct_mpda_details{display:inline-block;vertical-align:top;font-size:13px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_details:after{content:'';display:inline-block;width:4px;height:4px;border-width:0 1px 1px 0;border-style:solid;border-color:#878787;-webkit-transform:rotate(45deg) translateY(-3px);transform:rotate(45deg) translateY(-4px);margin-left:3px}.ct_mpda_btn_about{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;bottom:-28px;left:55px;z-index:9;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_btn_about:active{background-color:#ececec}.db{display:block}.qqmusic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.qqmusic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.qqmusic_area .pic_qqmusic_default{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;width:37px;height:37px;display:none}.qqmusic_area.unsupport .unsupport_tips{display:block}.qqmusic_area.unsupport .pic_qqmusic_default{display:inline-block}.qqmusic_area.unsupport .icon_qqmusic_switch{display:none}.qqmusic_wrp{border:1px solid #ebebeb;line-height:1.6}.qqmusic_bd{position:relative;background-color:#fcfcfc;overflow:hidden}.qqmusic_ft{text-align:right;background-color:#f5f5f5;border-top:1px solid #ebebeb;line-height:2.5;overflow:hidden;font-size:11px;padding:0 .5em}.play_area{float:left;width:60px;height:60px;margin-right:12px;position:relative}.qqmusic_thumb{display:block;width:60px;height:60px!important}.access_area{display:block;color:#8c8c8c;min-height:60px;overflow:hidden;margin-right:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.qqmusic_songname,.qqmusic_singername{display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.qqmusic_songname{padding:7px 0 3px;margin-bottom:-4px;font-size:16px;color:#3e3e3e}.qqmusic_singername{font-size:14px;margin-right:20px}.qqmusic_source{position:absolute;right:6px;bottom:6px}.qqmusic_source img{width:13px;height:13px;vertical-align:top;border:0}.qqmusic_love{position:relative;float:right;margin:10px 0 0 10px;height:54px;color:#607fa6;width:53px;text-align:center;font-size:13px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0}.qqmusic_love:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.qqmusic_love .icon_love{margin-top:16px}.qqmusic_love .love_num{display:block}.icon_qqmusic_switch{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;line-height:200px;overflow:hidden;cursor:pointer;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0;-webkit-background-size:37px auto;background-size:37px auto}.qqmusic_playing .icon_qqmusic_switch{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png);background-position:0 -42px}.icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;margin-top:-0.2em;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.db{display:block}.icon_share_audio_switch{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv\/P9Hntmh3cWDTYsMs\/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb\/l4TCTML\/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez\/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS\/C1jFEu3mpdhJyX34PWISY3ByNj\/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X\/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw\/InXlvjO5MjsdE\/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF\/6l1I68d+vj3ho9xH0mO+cjumNiMxvg\/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ\/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm\/TvnYHqCEoh6kMzUCuNxnUUpVzkB\/2+\/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN\/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35\/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg\/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4\/6lw\/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46\/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H\/QOplcP+ctPpgwAAAABJRU5ErkJggg==) no-repeat 0 0;width:42px;height:42px;vertical-align:middle;display:inline-block;-webkit-background-size:42px auto;background-size:42px auto}.share_audio_playing .icon_share_audio_switch{background-image:url(data:image\/gif;base64,R0lGODlhVABUAPfJAButGiKwIe747m7Kbe\/47\/r8+vj7+J3bnB+vHqDcny20LByuG+j16Pz9\/HvPeiOwIk\/ATuT05FLBUTa3Np7bnTm4OCqzKdXv1ff79ySwI8Lowi+1Lj66Pb3mvdvx23nPeaTepMjqyLXktVzEW63hrTW2NEu+So7WjdLu0j66PrzmvKrgqn7QfeL04p\/cnkm+SCiyJ7\/nvmTHYyGwIPn8+fX69d7y3vb69iWxJE2\/TPL58iuzKqzgrHjOeEW8RPT69PH58ZXYlNDtz4bThSyzK+337eb15mLGYdbv1mnJaW\/Lb8bqxja3NeX15V3FXPD48GHGYfP689fw11HAUHzQe3fOd0q+STi4N8rrytPu01\/FXz25PGzKa17FXez37CCvH6ngqaDcoOn26ODz3x6vHZLXkiaxJef150y\/S+Hz4NDt0E\/AT77nvrTjtJfZlnrPeje3N0K7QWvKaoXThLvmu8fqxmXHZIPSg5bZlavgq8\/tz9zx3JzbnI\/WjtHu0Ue9RkS8Q93y3ZTYk6LdovH58FfDV2DGYInUiX3QfIfThmfIZtnw2Dq4OZDXkLrlulDAUIzVi43VjG\/LbsPpw\/n7+XTNc1TBUx6uHcDnv3DLcDG1MN\/y31\/FXsjqx2jJaFPBUi60LS60LljDWHXNdGbIZTS2M6\/hrnfOdke9R9Tv1FbCVWPHYkC6P1rEWbDir0a8RVXCVMnryYvVi4jUiMHowVnDWMvry+v36zO2Mqjfpx2uHGfIZyeyJsDowLHisZHXkZPYk7nluXbNddnw2fv8+4fUhzC1LxqtGf39\/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH\/C05FVFNDQVBFMi4wAwEAAAAh\/wtYTVAgRGF0YVhNUDw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkUzMTAyRkEyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkUzMTAyRjkyMjg0MTFFN0JDNzBCMEY5NjNCMDhDQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzEyYzBkMi03NGJlLTQ5MTEtYmQyMi1lNmI4ZTlhZmQ5ZGIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxMmMwZDItNzRiZS00OTExLWJkMjItZTZiOGU5YWZkOWRiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af\/+\/fz7+vn49\/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M\/OzczLysnIx8bFxMPCwcC\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)}.share_audio_context{background-color:#fcfcfc;padding:14px 15px 6px;font-size:16px;position:relative}.share_audio_context:before{content:\" \";position:absolute;top:0;left:0;border:1px solid #e0e0e0;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.share_audio_switch{margin:-10px 15px 0 0;position:relative;z-index:1}.share_audio_info{position:relative;z-index:1}.share_audio_title{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;min-height:1.6em}.share_audio_tips{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;padding-bottom:.5em;font-size:12px;color:#8c8c8c}.share_audio_progress{height:2px;background-color:#ebebeb}.share_audio_progress_inner{background-color:#09bb07;height:100%}.share_audio_desc{color:#b2b2b2;overflow:hidden;padding-top:.25em;font-size:12px}.share_audio_desc em{font-weight:400;font-style:normal}.share_audio_length_current{float:left}.share_audio_length_total{float:right}.topic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.topic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.topic_area.unsupport .unsupport_tips{display:block}.topic_wrp{border:1px solid #ebebeb;line-height:1.6;background-color:#fcfcfc;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;padding:8px 10px;display:block}.topic_thumb{float:left;width:75px;height:100px;margin-right:20px;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.topic_content{position:relative;display:block;overflow:hidden;height:100px}.topic_title{font-weight:400;font-size:16px;color:#3e3e3e}.topic_desc{color:#8c8c8c;font-size:14px}.topic_title,.topic_desc{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.topic_info{position:absolute;bottom:0;left:0;right:0;color:#8c8c8c}.topic_info_primary{float:left;margin-right:.5em;font-size:14px}.topic_info_extra{float:right;margin-left:.5em;font-size:14px}.icon_topic{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/topic\/icon_topic.2x2e4987.png) no-repeat 0 0;width:10px;height:11px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto;margin:-2px 5px 0 0}.iframe_full_video{position:fixed!important;left:0;right:0;top:0;bottom:0;z-index:1000;background-color:#000;margin-top:0!important}.video_iframe{display:block}.video_ad_iframe{border:0;position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:#fff}@media screen and (device-aspect-ratio:2\/3),screen and (device-aspect-ratio:40\/71){.meta_original_tag{padding-top:0}}@media(min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.mm_appmsg .rich_media_inner,.mm_appmsg .rich_media_meta,.mm_appmsg .discuss_list,.mm_appmsg .rich_media_extra,.mm_appmsg .title_tips .tips{font-size:17px}.mm_appmsg .meta_original_tag{font-size:15px}}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.mm_appmsg .rich_media_title{font-size:25px}}@media screen and (min-width:1024px){.rich_media{width:740px;margin-left:auto;margin-right:auto}.rich_media_inner{padding:20px}body{background-color:#fff}}@media screen and (min-width:1025px){body{font-family:\"Helvetica Neue\",Helvetica,\"Hiragino Sans GB\",\"Microsoft YaHei\",Arial,sans-serif}.rich_media{position:relative}.rich_media_inner{background-color:#fff;padding-bottom:100px}}@media screen and (min-width:1024px){.rich_media_meta{max-width:none}a.rich_media_meta_nickname{display:inline-block!important}span.rich_media_meta_nickname{display:none!important}.rich_media_content{min-height:350px}.rich_media_title{padding-bottom:10px;margin-bottom:14px;border-bottom:1px solid #e7e7eb}.discuss_container.access{width:740px;margin-left:auto;margin-right:auto;background-color:#fff}.discuss_container.editing .frm_textarea_box{margin:0}.frm_textarea_box{position:relative}.frm_textarea_box:before{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.frm_textarea_box:after{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5);left:auto;right:-2px}.rich_media_meta.nickname{max-width:none}.rich_tips.with_line .tips{background-color:#fff}}.text_unselecet{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;user-select:none}.pay_reading_area{padding:60px 8px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.pay_tit_tips_wrp{position:relative}.pay_tit_tips_wrp:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e0e0e0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.pay_tit_tips{position:relative;top:-0.75em;padding:0 .5em;background-color:#fff;color:#8c8c8c}.pay_tit_sub_tips{word-wrap:break-word;word-break:break-all;margin:-12px 0 10px}.btn_pay_reading{width:180px;height:35px;line-height:35px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#0aba07;border:1px solid #0aba07;margin:5px 0 14px 0;display:inline-block}.btn_pay_reading.disabled{border-color:#d5d6d7;color:#c4c2c5;background-color:#fbfbfd}.pay_tips{font-size:14px}.pop_tips .inner{width:280px;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;background-color:#f7f7f9;position:fixed;left:50%;top:28%;margin-left:-140px;z-index:20}.pop_tips .inner .tips_title{font-size:16px;display:block;vertical-align:middle;max-width:98%;padding:15px 10px 0;color:#3e3e3e;text-align:center}.pop_tips .inner .tips_con{color:#888;font-size:14px;padding:10px 15px}.pop_tips .inner .tips_opr{line-height:50px;font-size:18px}.pop_tips .inner .tips_opr .ft_btn{position:relative;width:280px;display:block;text-align:center;color:#0aba07}.pop_tips .inner .tips_opr .ft_btn:before{content:\" \";position:absolute;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:0}.pop_tips .mask{width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.4);z-index:1}.wx_poptips_wrp.pay_reading{top:50%;margin-top:-60px}.wx_poptips_wrp.pay_reading .toast_content{margin-top:75px}.weui_loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:weuiLoading 1s steps(12,end) infinite;animation:weuiLoading 1s steps(12,end) infinite;background:transparent url(data:image\/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;-webkit-background-size:100%;background-size:100%}@-webkit-keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}.load_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.load_img_wrp img{vertical-align:top}.base_loading_opr{position:absolute;top:50%;left:50%;margin-top:-15px;margin-left:-15px}.weui_loading.base_img_loading{width:30px;height:30px}.base_reload_opr{display:block;position:absolute;top:50%;left:50%;text-align:center;margin-top:-32px;margin-left:-28px}.base_reload_opr .base_img_reload{display:inline-block;width:40px;height:40px;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:cover;background-repeat:no-repeat}.base_reload_opr .desc{font-size:14px;color:#888;margin-top:10px}.bg_gray_wrp{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#eeedeb}.gif_img_wrp{display:inline-block;font-size:0;position:relative;font-weight:400;font-style:normal;text-indent:0;text-shadow:none 1px 1px rgba(0,0,0,0.5)}.gif_img_wrp img{vertical-align:top}.gif_img_tips{background:rgba(0,0,0,0.6)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#99000000',endcolorstr = '#99000000');border-top-left-radius:1.2em 50%;-moz-border-radius-topleft:1.2em 50%;-webkit-border-top-left-radius:1.2em 50%;border-top-right-radius:1.2em 50%;-moz-border-radius-topright:1.2em 50%;-webkit-border-top-right-radius:1.2em 50%;border-bottom-left-radius:1.2em 50%;-moz-border-radius-bottomleft:1.2em 50%;-webkit-border-bottom-left-radius:1.2em 50%;border-bottom-right-radius:1.2em 50%;-moz-border-radius-bottomright:1.2em 50%;-webkit-border-bottom-right-radius:1.2em 50%;line-height:2.3;font-size:11px;color:#fff;text-align:center;position:absolute;bottom:10px;left:10px;min-width:65px}.gif_img_tips.loading{min-width:75px}.gif_img_tips i{vertical-align:middle;margin:-0.2em .73em 0 -2px}.gif_img_play_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-right-width:0;border-left-color:#fff;border-left-style:solid;border-width:5px 0 5px 8px}.gif_img_loading{width:14px;height:14px}i.gif_img_loading{margin-left:-4px}.gif_bg_tips_wrp{position:relative;height:0;line-height:0;margin:0;padding:0}.gif_bg_tips_wrp .gif_img_tips_group{position:absolute;top:0;left:0;z-index:9999}.gif_bg_tips_wrp .gif_img_tips_group .gif_img_tips{top:0;left:0;bottom:auto}.flex_context{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.weapp_card{border:1px solid #e1e1e1;background-color:#fdfdfd;color:#3e3e3e;line-height:1.6;font-size:16px;font-weight:400;font-style:normal;text-indent:0;text-align:left;text-decoration:none}.weapp_card.flex_context{padding:12px 15px}.weapp_card.flex_context .weapp_card_hd{padding-right:1em}.weapp_card.flex_context .weapp_card_avatar{width:50px;height:50px}.weapp_card.flex_context .weapp_card_nickname{font-size:17px;font-weight:400;display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weapp_card.app_context{padding-top:10px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden}.weapp_card.app_context .weapp_card_bd{padding:0 15px 15px}.weapp_card.app_context .weapp_card_profile{font-size:12px;color:#8c8c8c}.weapp_card.app_context .weapp_card_avatar{width:20px;height:20px;margin:-0.2em 5px 0 0}.weapp_card.app_context .weapp_card_nickname{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_title{padding:.3em 0 .75em;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-weight:400}.weapp_card.app_context .weapp_card_thumb_wrp{position:relative;display:block;padding-bottom:80%;overflow:hidden;background-repeat:no-repeat;background-position:center center;-webkit-background-size:cover;background-size:cover}.weapp_card.app_context .weapp_card_thumb{position:absolute;top:0;left:0;width:100%;height:100%!important}.weapp_card.app_context .weapp_card_ft{padding:0 15px;border-top:1px solid #e1e1e1;line-height:1.56em}.weapp_card.app_context,.weapp_card .weapp_card_bd,.weapp_card .weapp_card_ft,.weapp_card .weapp_card_nickname,.weapp_card .weapp_card_info,.weapp_card .weapp_card_title{display:block}.weapp_card_avatar{padding:0}.weapp_card_logo{color:#8c8c8c;font-size:13px}.icon_weapp_logo_mini{width:14px;height:14px;vertical-align:middle;margin-right:.2em;margin-top:-0.2em}.img_loadederror{background-color:#eeedeb;border:1px solid #eeedeb;background-image:url('data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAArlBMVEUAAAAAAAD\/\/\/9paWkyMjL\/\/\/\/\/\/\/\/\/\/\/\/29vb\/\/\/\/09PTn5+fh4eGvr6\/\/\/\/\/6+vqZmZm8vLz39\/fj4+P8\/PyBgYH\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Gxsb\/\/\/\/\/\/\/\/\/\/\/\/v7+\/MzMzr6+v\/\/\/+4uLj\/\/\/\/o6OhNTU3Y2NjQ0ND9\/f35+fn\/\/\/\/\/\/\/\/\/\/\/\/t7e3\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/z8\/Pb29v\/\/\/\/y8vLw8PDU1NT\/\/\/\/\/\/\/\/ym0LiAAAAOXRSTlMaAPooH+3z2LwFtYZ5QvXUNkvDgOAul49vV1RHGRKfWZThSPiMI2pf6szLva2ahHhPQa9wIamkYyJOAjtMAAAD1ElEQVRYw8WZ6XbaMBBGp\/K+L4DBxUDZQkjInpB+7\/9ipSapQPKGOT69PxNzbY3Go5FMP2rIxqPkPphrjGnz4D4ZjbO6X1QqJ2liQMJI0kk7pfW8YwD0eOrOvFBRVSX0Zu401gGw3bN1sXLyqAEsdiKSiJyYAdrj5CJlNvSBoDegEga9APCHWWOl9eQDZkSVRCbgP1nNlC8GYHtUi2cDxksDpTUEjJ\/UiJ8GMLTqlO93YI5KDVEdhrv3auVYR39BF7DoQx9XKVMGW6GLUGywtFw5An7RxfwCRpKSG3vUgh53CsoUeKNWvAFpkXLM+DNe\/pxsLCvfdR7HNvHU30WldQebill\/Pph9ben3t\/b0piwfbNxZgnKIfuHVA9dc4gS2dcLCXOpjeK58AVsUCacMEuyjSLpgeDlVWgacghGvdHDqpA4M60T5BEOVi8ItStE28vtu4IkrMx9y7XEZvvBN5+2nF0Yb94Pf5UGVHgF+9k85lGdb3eMIe\/1cE8f79R2MrSLP+vBbOfEhVVwTR2wpaoqjISdeizUZ\/uRL+QiTBKbIMaLCxPq6n6lKz\/F4VFoaIjGOX78pS2z3mKuv4noEzcqVzwjEQLPjDFAps6PzRvhzgOdcuRPLhToXjTKb\/K63ilg+dn+VE8YGYtLmo6ZKboqGPmBsclCmiIUp1QCIr7zMBw6I+RwjPSgT8V184NdWoeThscUBJgelIcy3suTDruQTB4SgRTB+UAa9KEge1dPHgRWdoSOjsRjKVz6eGtx80sVgjmmE6XkG6Tzhaljnl4bCazeiBO55EucRatYfmPLdXSR0jxmdssorQsOFUX4jZrinAJ4UyqZr5SIvckI1CmguBCPAAbfZ1HD07+cKMScNipwZm1plqIFzksYKNGI4r3r5UhBRLTOcMP\/3WCpYsXJB9TjcuFzQibLlwPlaIoRegdZmeniDceTjNMaYFyfRiprg+bkxWAtJVJjqduO+EtBCIdWLX0hfbebcS3F3kZSUjU0zpbrFisSyUVLc9tTQuSCpuJWUYH9A7dCRlS0U+3bGCEbpcsa8VkoHSfmiG7dSxkgrWoPpRS7eGlQ1MG6b\/c+uss1iFWsaH5fYZtU0g6XrxUzj\/xKawbqW1Sx+mhX4dlNoWesba321lvvAIA8Lb5qExrq2\/b\/thee7vy2O2FTa\/tdvUoLVzFMOdwkjvvvjcRY2KRdspZZ6g63UFRu+fc2Gr4NtaQeb5w62+B0cRHR0XHL9oU73R0\/XH5B1c4zX\/WEj5\/f1R6LdH9xef7x8\/SF410f1139Q+P+fPa74ONPBJ6Q\/+TfzjGYmPq8AAAAASUVORK5CYII=');background-size:40px;background-position:center center;background-repeat:no-repeat}.img_loading{background-color:#eeedeb;border:1px solid #eeedeb;background-size:22px;background-position:center center;background-repeat:no-repeat;background-image:url('data:image\/gif;base64,R0lGODlhPAA8APYAAJeXl56enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19nZ2dra2tvb29zc3N3d3eDg4OHh4ePj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkEAEIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPAA8AAAH\/oBCgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKJgwMJ5ycBQAABaKbBKUEqI9BQUCIA6UDhyELDRytg7BAQYezALWGCgEBDLuCvUCxhcHDhA4CAgELyULLzYTPhSAF0wMS10LMzL\/btIUNAdPW49nngtyDFQPTBBjjyuXaQqoArAYlmCYggr5B\/OIZKGVgUAR7Ak5x+tGjh49Dy+JdMGDgwiAG7Aoe8iBBwgdJPXio7PHDUK94hx5MU2CIQ4QEBw5MQKmyZw9DzBghOGDIggIESA+I49lT5cVLFhYgndpABCUfTVdagpBg6oEFFDClbPpzkoOpCBJMIKHJx1ge\/mUlPRiK4IEGVG6fUpowocPBv4ADCz7EIweOw4gR88BUIoOFx5AfY0jBKIeNy5gz58B0wcGDz6A\/O8hQObNpGzg4ew4N2sHdRTwSy8axAxMJDJEjX2gxuLfv35xu0KBhyYOHEqhsyIDBXAYlDRUoVNAwQpMOGsyzO58EvYJ3Cx1WXKIRIzvzGZY2WPDuHcPJSTmWm49RAxMIDOy9Z6Acacb8+oW0wNsiIljVzQX5+RUJdufdYAgLKaTwgiIjcMBBCIaUwMF6FCgICQ4z0JCaIS9EmIILg7xwwgkTCiKChRwgZ8gJHXAQCicrmNiiECgUiMIgGlroAWAlRsgCISYUe2gCISDAuKQ+MqgQoQoxIKkkISjUyEEHKujTgokoWinCk4NUaKGBycAgZQoq2FBIkmMW8oIHFnZAZitfRhimmHcKQgKMaOJp5CFw9ilICBtsECgqNLjQgpuGFHrICyKMcKRvkgKXyAkF3qjpITRESNynpJZq6qmopopKIAAh+QQJBABFACwAAAAAPAA8AIaVlZWbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBFgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKKA4OKZycBwAAB6KbBaUFqI9EQ0NEhwSlBIchCw4drYNDQkJDs7WHCgEBDbyCvr\/BhbQAtoUPAtQMyUXLv7KEz9GDIgXUBBPX2L\/AzsOEDgHV5UVE50Lbgt2EFgPUBRrv5syEqgCwGpSAmgAJ\/QTJa1aElKlBEvIJMCAKiA8fQA5lY4jhwAEMgxq0O3hrgoQQknzwWInR0DKGh6YJUGCogwQFCRBQSLmy5w9DvxjlNHRhQYKjCMhFCtKj58oePy9dYHC0qgMSlFQ65dHDUgScVRlUuBREa8+ukyBUTaCAgglN\/j+aPqWkFkECCBtQWfRhqUIFDwkDCx5MWJCPHDgSK06cA62lExowXJhM+UKGFYxy2NjMuXMOTBgeQBhNevQDfot0dF5t4\/Ol0KVLP8i76AfixYt5YDKRQXLlyRhcFB5OvDgmHDRoWAIB4gSqGzJgSJdBicMFCxc4lNC0g0YM6dOrV8bwQbgl7+Clz7DU4XcGlJN0RE8fowamERp+b2AhiQZ9+4W88AIjI4xgiAgZVPZBf+DNgIMhLaigAgyKlNBBByIYcoIHklkAgiQ5zECDa4XEIKEKAwoSwwknxDAICRd24JwhKXzgQSicsHCii4KgIIIIKAyy4YULJmSihC0QgHLCjzMKIkKMb70zwwoSrkDdICb8GKUgKXhAJH\/luHBiilhqWQiMFxp4TQxUqsDCg4RkKcKWKn5woQdNtiKmhBQWIiedgpgQo5q8vIDkIX8eIgIHHGCVTA0vuACnn2YaEsMIJJhXWKLGIXJCCCHk2SkhNUgI4Kiopqrqqqy2akkgACH5BAkEAEgALAAAAAA8ADwAhpiYmJmZmZqampubm5ycnJ2dnZ+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEiCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4tHR5ygnp6gm6KfpI5FQ0NGh6aHIQoMHKiDQ0JCQ66ihwkAAAu1gre4RIavhQ4BAcDCSES4uK2EyIMiBcsDEs5IxLmF1YIMAMvB3EXRQsaD4RQDywQZ3ILQuLrsvIMIywAQ87bR1iGpBkHAsgKggvjwAeRQvW\/4CC0gFyDCoQ8SIoCQ5IOHR4aGiN1DpCwAAkMcICAwYGACR48wf4QcmeiAAUMWEhzYacBipCA9YHrsIfPShQU7kzIQQclHUKE+LD1AkPSAAgqXhHQU2oNSg6oIJpTQBOQpj66THNg84EAeKCD+Cy1NmNDhn927ePMe+pEDx42\/gHHkQGvpRAYLFRIrtnBBBaMcNSJLnowD04UGDRxo3ozZrSLIk0NXvmQB82bODTQwAoLDL+C\/gglXIoEBseLEFiy40Mu7t29ON2jQsOTBgwlSNmS8WC6DkoYKFCpoGKFpx4zl2JtPer7YA4tLNGBgZ26Jg+3EGD5Q0hFj\/AsYNTCFwHC7QgbHka5jh2+oRQtGIjBVSAgXKEZBXZHQgN0MNxjCAgoo7JbICBtssFEhJZgHnQeS5DDDDDkcAgOEKPwnSAwppBCDNRVucJwhKHjAQQqgqEDiC4OcAAIIJwySYYUI\/vMCiSsQYkIIIbx9KAgILY41Dw0pQJiCdoKUgKSTgqDAAZBFctMCiRL6eGUhFFYooDAwRImCCg0SYmUIWAoCQwcVcqAkKl9CiCOGYxZCQotn4nkCCt8Z8macg4CggQaBklKDf23yCaeIIoxgIm9HJvmbIinsSOOmiNSQYnyglmrqqaimqiopgQAAIfkECQQARwAsAAAAADwAPACGlpaWl5eXmJiYmZmZmpqam5ubnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6AR4KDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbi0ZGnKBGRUWfoJqjo6aPQ0FBRIeoRYchCgwcqoNBPz9AsKiHCQAADLiCurtBhrGGDgEBAAvFR8e8r4TLhCEFzgMS0tO7P8nXv4QNAM7R30LhP0LkqYMUA84EGN\/G4b2D2IIIzgEg4BsEJNw7QaLiHYEgwFkBUD928PhxiB2yQQlLHWGALuChDxEggJDEI4fJHT4MFRSnqFmABIY4QEBgwIC3SCVN5tDRQ+U+RQcOGKqQIOgBAxEkAdGh0yRPTBYWGA3KQAQlHkyb7rD0AIFRAwooXAqSU+fWSQ6mIpBQQlOPHf5mKaU1cMBBBlM+ePCwNGFCh4GAAwsefKiHjRqIEyO2sfeSCQwU+kqeQMFCCkY2ZGjezNkGVAYMGogeDfoCoxucU8uogakC6NGkGdxd5EOxbRtnLZG4EHkyZQosCAsfTpxTjRgxLHHg0BYUDRcror+ghCGkBAxWM+WAwSK6dEoXIoiPIGHDiksyWnj\/XimDhPERKPydhAP6+hYyMH2gAD+CZUkwrMdCfoWooAIjIIxUiAcTjAeBBpLEEB0LMHhWSAommBBcIiJkkMEHhpCggQQQQLCBJDfAUOEhLWRownmCvHDCCdMJAoKHGZBwyAkbaHACKCi42MIgJnjggQmDiIzo4S2AtZjhZUl+8IGOg3iAI5XfxHBChjQSQoKUWB5xggYebgClNCq4CGOUH4xQSAg4KliMC1uagIKFbLpJiAsbeKhBc7ikmeGGXkqpJyEdeiinKiuUYMKZhbb5EQYYLGrKDCuowFqIhh7iAgghrEnYl1MWp8gJRqJgaiIzoIACDavGKuustNZqqyqBAAAh+QQJBABDACwAAAAAPAA8AIaampqbm5ucnJydnZ2enp6fn5+hoaGioqKjo6OkpKSmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr7AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBDgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuLQUGcoEFAQJ+gmqKkpo89Ojo+h6ilqow6ODg5sKOys4q1tjuGsbyMPLa3P4XCw4u+OMCEysuJPcY4PNC60os7xriD0dqIOcbPQ+C8OjY23oXctjqDQp5CjxkLChqSNjP864bjzihZUCAAAIAF+vjxo3HjH7tIDwYEmAhAgSQdNBQubHgJQgEAEyca6EDpRkaNNSwlEBASAIEGl3bsQ0npQMgAAhiA0ISjhsKUkxAEAHlggqkc6iwxYHAhnNOnUKMKwgHjhdWrVmNwtARCwgMHYMM+iECCEQwWaNOqhYHpgYG3\/nDjSmAUQ61dFi\/axt1rwOiiHFWxXoVhA9OHCF\/Dgn3w4ITUx5AjY6rLwtKFCx9MuUhhonMKShIYLGAggWQmGitOdPYMeunSBhZMXGKBYnVnFZYmNHDN4AEGSjJq20bRApOGB7wZRBghaYXtE8ULlSjBSEO+QhkcuF5QQRKLzidUsC00AgQI2Yk4TJiQwdAHCrsXWJAUQ8UKGYdQmAdBXdAKESLgJsgG602QmSEiWECBCKCIYF4IKAwCAgYY7CSIBxSsN184+pnH3CAeZJCBB4RgUCCJ0qwQwoOfgSgiioKEkOEEFXw4DAn7oefiiIWot951vKSwIggixFBIiDwSTZJCBetRcOAsOJqn444wDtJBgUCqUsIHINhICJJVDpKBBBJsMEwLJZAw3pEvHpKCBhtMCRWYkiUiAoUM1nmICwDmpeefgAYq6KCEXhIIACH5BAkEAEYALAAAAAA8ADwAhpeXl5iYmJmZmZubm5ycnJ6enp+fn6CgoKGhoaOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3eDg4OHh4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEaCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4tCQpygQUBAQaCboqSmjz87O0CHqKWHREVFqoM7OTk7sKOyhUTBRLeCubo8hrGGwsHERj26OTqvhMrAzM5GxjnI1b6FRdjZPjrRPd6pg+HCttlGPNG8g9aCzMPuguW654L09qA7bNiQVwiaLoJDggQZMohZu0IZFCTQIOnGjIs2dBgy1g3RunuELCQQAADAAkk2Ll6kgcOQDo2LmhV6MCCATQAKJPGooXJly0sPCNgcWoADpRs0es6wYQmBgKEACDC41ANpzxqUDAwNIGABCE05eF7EOulAAAABDkwwpePGDUv+DBhYwEe3rt27h3TEgPGir18YMX5aCiHBQYPDiB1AMMEoBovHkCPDwPSggOXLmCM0jsyZxeRLDjCLLrB2UQ4YfP32Bfz2kgcIhhEfduAgBd7buHNzcszCkgULH0y9SFGiuO1JEhYoWBDBaKYaK0wUN04pwoLrCxhUOHGJxYnpxVVYmsAA+wIHFyjRQAG+xAkXmDI4ML8AAglJK8CbaGGoOCMNFEHUAHYKVIAfCSWYoEIMhozwwQfcJbKBBBJgYMgHFJSnwFyRyKDCCjIcgsKDH5QwyAohhLDCIBpQKEFwhohQAQUigBICiSgM8sEFF8BohAcTUGggXSM+OAIhHmCDgIEHhGDgIpPusADCgyCIN0gHSnZASAhBSkCBidmUQCJjhGCJgZaETEhhgMSkMOUHIYRYZpaFrFABhRP4qIqYD0Y455mGcOAim3t68MGRhpiJZiEYRBABocKZQIKchSh6iAoZbOAnXkkuqZsiIfAYwqeJvCCCCJ+RquqqrLbq6qugBAIAIfkECQQASQAsAAAAADwAPACGlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ASYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbikVDQ0WcnEFAQEGim6SmqI9APDtCh6qnhkhHR0isgzw5OTuypbSFR0ZGR7qCvL08hrOGxMXHyD69OTqxhM6ESMXRyMnVzNnBw93S3z861T7jq4Pc3bnfgj3Vv4PagtDG84TqvT0GCSmFLck+I6J42LghrlC9ZYOICBFCZNC+c4Q4MFjAQdKNGSBt6DC0A6AiaBgFZVggAACABh5BgqSBg+Q9RcUMRSAQoCcABpJ61JA5s+alCAUA9Ox5AASlGzSIzrBhSYGApQAKPLjk4yPRGpQQLA0woMEITTqGggQ7KUEApf4JLKDaceOGJQcOMvTby7evX0Y7ZMSIAWNw4RgzRl4iMeEB3scOHkhIwUiGi8uYM8vAFMGA58+gJ1TOTNpFDEwQQKs2UAGwYMKGB8swaimEBMeQI0Ng8be379+6ZLRoYSkDBhGoYKgwwVwFJQoNGDSg8EGTDRYnmDenNKGB9wYOLji35AKFduYrLFVw8J0BBL2TaqQ4bwLFC0wcIHz3LuGEJBbnneCCISf4twgHHRWywQPtXSBJCyWYcAILmxViQgghUJaIBxRQoIEhIVjgAAMMYCDJDCywMMMhK2AYAgqDuDDCCAMKwsEEHYZwCAkYWFCCKCNgKEJ6goiQQQbICZECQgUdOshXixiaQAgIGmjg1CAadEiBjv28IIKQxA3yQZXVDTICkxRYYOA3J7iooZhkFtKBlgkiw8KXIYxAQyFjalDmIC1c0GEFSerSJoZvwumnIR\/Q+Q0KIIAgJaNxGqLBBBN08E0MKJywJ6WLGtICBx0k+heVVgK3CAlHkqCqIjKQQEKFr9Zq66245qprP4EAACH5BAkEAEEALAAAAAA8ADwAhpiYmKCgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nra2tvb29zc3N3d3d7e3t\/f3+Li4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o7OTk7nJw3NjY3opukNjiojzYzMqyGqqeGPzw8Pq2DMi8vMoe0hzw7Ozy7gr2+M7OltYQ9xcbIQTS+LzCyg8KEP9I7PdRByi\/MhNyDxMXH4jUw1zTnztDfuuLV1zHypoTq4PeD3vmKJwhHKW3R1oma0aKFuULWfAETpAMHDh3ppIU7BATIJBcpQraYSCjGMkXq2BXqyFJSi5AhVbwwFEPfIlyGWOqURGMFzJgzL+ncScmFip8pWFga2tJSjZc\/lU5i6lETDBYwpUpiikqGCxdLqwIcS7asWUMyTphYy3btCRj+mDIgIDCgrl0CBjwwQiGir9+\/JzAVAEC4sOEDjFL8XSwi8CUChiMDSMCIhtq2bYNasmCArt26BAiEOEu6tGlOfEdYcuDgAioTHzbI\/kApgYAAAhJQ0ORCBAfZskFQQiCguIABDYRbGtEBeHBLCgYYD1DgASUWHpxv6FACU4QCxosf4CAphHMOJAxtIL8IAgRDEAhMZyBJhIb1IVIY0lChgt5EEiCAgHWFWLDAAAEE0IAkKoQgggqHgNBfBewFMQIGGKgmSAQHCGjBIRo0sIAGolwwIW2CWNBAAx8KUkECAi5A1gcTkjgIBaztNogDAiJQAUAkWNCfBSIQgqMDOgprkgGMCChQITIcTNhBIUcmKYgEHSLwHjUgCFnBBRAamWMhIywgYAIt7hJlf\/+JiaQhE\/S4pZoUUGAjlWMa8sABB0RAzQnNhYnnm4aMAEEEKJJW5WmKYLAiBowmgkIGGegX6aWYZqrpppyiEggAIfkECQQARAAsAAAAADwAPACGlpaWm5ubnJycnZ2dnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW2NjY2dnZ2tra29vb3Nzc3d3d39\/f4ODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARIKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbij07Oz2cnDk3Nzmim6SmqI85NDM6h6qnhkE9PkCsgzMwMDKypbSFPTw8PrqCvL01hrOGPsXGyEQ2Mb0xO4XOhLbRP9NEyjA02sGF0MXH4DjWvTeE24I\/0Ty54EQ1vb7w5oPExd\/uCWoHg5mgeOh4hOJUw4ULg4Xy9SIniEeOHDwGJQxYSIiQIUMkvUCRQoWLGYZkTFSEbiGhIR5jSnKRomZJGCl\/LerhclDMn5JqrLBZc0UMTDB\/eqz0YijRFpaUegxp6YYLFU8pSRWyKQYLmyy0\/qTKacaLF5ZAchXItq3bt\/6GaKRAcaKu3RModFraoMBAgb+ADSQIwUjFiMOIE6PAdACA48eQFRROTHnE4kuNIWtewMgGCrp37R69lCGBX8B\/DRwoAbe169ecVJAgYcmBgwyoUITgwJvwpAQCAghIUEETjBEdePemBFyA8wENRFwi4UH58koKBjgPXgACJRcfrHPwYAKThALbnR\/4IGmEdfKGOnRgFCGCoQgEtgdgIInEBg4diLCCIRtYYAF7iVCQQALeFYLBAgMEEEADkrAgAglhGRKCgRZ4MIgJGmhQniASILAgBodw0AADHIiCgYEX+EZEBg88gJsgFyiwIH9sbWjgBoRcAAEEFxDywIIJFH55jwkvWnABbYNYMKQFhGigYwILeAhOBxwiGOWUhUyApATgiHCBgRhARYiUEFBJSAkMLKgAishwaaCXX7ZpSAVI2oeMBxVU0KIhbLpZCAQIIEAmMil40IGahRR6SAkRTADCa0ISCZsiG9QI5KaIrLDBBhmCauqpqKaq6qqiBAIAIfkECQQARQAsAAAAADwAPACGmZmZmpqam5ubnJycnp6eoKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39\/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\/6ARYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbizk5nKA4NTU4oJs3ozemjzgyMZ+GqDWqhkA8PD+rgzEuLjGHsrSFOzo6PLqCvL0zsamGPcXGyEU0L70vOoXBhUHExT3TRTK9LjLazoQ80cfhNta9NYTbgz7ROrnh1OS\/g\/OC3jrA5RP0zgWNQaJIDYJWbAcoGi0MHqJBzpwgHjhwsCui7tshIkOGEJHkIoXJFhYJKWOWqKPDQiCFyBxC0qRJFS8MwYDBaMdLQkNkCqUZqcYKmzd5XgoqVOjISS5UIE3RwhLTpkQr2YiKlAWlqzOfYorBwqbXSVdDmprRy6rIgf5w48qdOxGFiRJ485YwkZLuIBQhAgsefMJvoRQgBis2YZhQDRN39eZV2riy5cuYi6QQMcJSAwYXTJ34oCGDhg+UDgQAEODABE0vRGzQQPt06gC4AwhYEOLSCA61aYOwhEBAbgAEGlBq4SG4Bg4lMEEgkBt3gQ6SQgTnQMLQhg2MIEAw9GDA8QWSRJjeACKFIQ0UKHhQJOHAAQeGLCgQAAAAA0krhCDCCoeAEN8EHAxCAgYYdCdIBAbYZ8EhGiyggAagXBBfBagJYgEDDEwoSAUI2KdAXAbGlwEhFDTQAAWEOGDfARUMRIIFG4pAyAQuvjZIBiUekAB24WwQHwVEDmLCYwM+DiJBhAeMNw0IFcR3AYE79lgICQrYh0BoyBgZ33yFLNmkkjNKqQsHE0yAoSFmHuKAAQZEMA0KHGyAZZlaGkICBBIMZ1iLL2ZmCAYgYmDoYRlkoMKikEYq6aSUVjpIIAAh+QQJBABGACwAAAAAPAA8AIaYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3g4ODh4eEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBGgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPzg3PpycNjMzNqKbNaWnqI43MTA4h6ozNYdAOzs\/rYMwLCwvs6W2hjs5OTu8gr6\/MYa0xIQ8x8jKRjMtvy45hdCFQDrUPdZGzCzOhN6ExsfJ5DXZLC006cOEPtQ6oeRGMr\/AhEiZWkeNB79BLv7JGCSQlZFpx3SIkqFixUJD\/poN2mHDhjsj7HKMMxSk5BBJK0iUMKECHaEXvy4igvhx0JAgQHIGQVmi58oWhlwEW6RDYiGcOXVKooHCZ88TQC8JSZp0JyUWJ5yWUGEJKVUhl2qsMOE0BSWvOcFqepHCp9lJ\/l6DqOUU45clIXIP6t3Lt++hGWRJCB5c4oRLS0QSK17cyMSHx5Ajl8C0uHLiIoxORN78YfIly5YZ1SgxuPTKoZaKgFbst7Xr16JQhAhhiQGDC6hMdMBwAUMHSggCAAiAYIImFyAyYFjum9KBANADCFgA4pKIDcyXe7CUQEB0AAQaXOWQHcOGEZggEBge3cDvSCB6L9eAvpAGDYwcODD0YMD3BZLEh0EGH6BgCAYSSMCBIhEUYAADhliggAAAAABhJCp8AAJXhniQYAQbDDKCBRbUZ8QDDhpQwSEaLKBAiJxUkOAE2wlCgQIKUDAIBQcYYEACe3mYIG6DSLDAAhIQg8KAjwboyM8IFMxI2yARHBkBIRj0aAACC5KjQYISwEillYVAkOJ+1nwwQYIVrFBIlQtcScgICfh4wIrKfJlgl4TAKSchEjCJJi8aRBABBof4eUgDBRTwgDUnbJCBm4YoasgIDkDwwWtGIgmbIhfgSOSnh6RwwQUckqrqqqy26uqrogQCACH5BAkEAEoALAAAAAA8ADwAhpSUlJWVlZaWlpeXl5iYmJmZmZubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t\/f3wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEqCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4pCOTlCnJw4NDQ4ops3pTeojzkzMjyHqjSshkM8PUGtgzIuLjGzq4c8Ojo9vIK+vzSGtLaEPcbHyUo1L78wsoTPhUM7xjs\/1UrLLs3cw9HTyOQ42C4vNum1hD\/TO0DkgjW\/wPTQlBQz5mPfIBj+agwiZWqQD3yiarBgga5Qv18zBvXAgaOdEmkEDxUZMqSIpBYlTJxgkbHQsoqHQG4jVERIkJtDJLEwwVPlC0Mxgi3iMXMQkZtIc0aykaInTxQwMBGxiTSIECOUXKBwamKFJapVlVbCweKEU6+TwOLEmimGip7+KiiBFUIE1YwWLSyRNGmwr9+\/gA3ZQGGW64kUMCklQcK4seNGKUJInkwZBSYkRzJr3oyEkQoQlEOfuLy59JHOi3CcKOz0sAxMi087bhy4tu3bolaMIGHJgQMMqFB80JBBAwhKCAIAEICggqYYIjZomG4ceYDrAQY0EHGJRAfqGjaEsKRAAHYABR5QeuEBvIYOJjBFKID9uoEPkkSA5xC\/EAcOjEAAgSEQEHAeA5KMUJx4aBGiAQUTeKCIBAYcoF4hGCwwAAAAOHBSCCLkZUgIFEDYwSAnZJBBf0pEUOEBFxzCQQMLAMjJBSVWcJwgFzTQQIyCWIDAAQcs4BeJJWqIQEgFvjk3iANEHmCBQSZYkCNvg1DgGwUODnmAAhKSw0GJFISZ5ZaFUEjkgNWEUEGJF4h4pgNcEmKCAkQmACQvY5aIXyFa0mnIBFGyyUsHE0ywwSGB1lnIAwYYEEE1KXTAgZyENHqICRBIMJ5tTDrgJG6IZOBjBqQmwsJ0mKbq6quwxirrrJsEAgAh+QQJBABEACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzOzs7Pz8\/Q0NDR0dHS0tLT09PV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBEgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKPDQ0PJycMy8vMqKbMqWnqI40LS02h6qmhzw3Nzqtgy0nKCyzq4c2nze7gi0oyi+GtKyEOJ80xscwKcoqsoTOhTw10jnHyMooLoXchDfS1OIz1ygpz0TogjnSNbrigjDkwIP0RIh9wqGPkAplKWAMIvVixqBon2qIguFLoSF+ylo8nDGDoCB1n8IZ8sGDxw9JKECEEHHCXCEWylwigqiNEEkdOENFOhGi50oVhlasYGSj5qAeOJPqhCSDhM+eI4Ze6rEjKc4dJyelGPFUhAlLVa3uWEppBgoRT79OCqsUiKYW\/iVCqCxBie0OH6hcpEhhqSTegoADCx68KAbXpz5JMLskJIjjx5CFMBqhYYPly5Y1iMAUBIjnz6CDMCJRGfNlzZxBqwYietEMtIihamQMuXYQyYRz697dqkQHD5aGCEc1IgOFCRQ0UBLOfIgmFh0qUJiefHnz4Zc8XEA+vcKG4NexS1KBgfr0CyEwhRcPiQN3ChZAGLJggdGCBYbWS+owYUIFDmoRUoEDDmSgSAMABIDAIdehxEEHKByyAYENXDBICP1tJsgCCQYQASLsaRIBgQ98J0gEBhjwoSAQCBBAAAUINiGBFBDyQIoPEHLAix4CFgIEJH5AiAMHHOCAgAO8bkiAgfpYQKADGBRCpJGFMNAhfuJw8ACBEfA1ZJFHEiJCAS8OIIE4ThLI5JdUSvkiAFjuckEDDVRwyJRhFpIAAHCKQ8IFFngpJZiHhKAAAxzwdqMBOfKmCAUp1uhoIihUUIGgk2aq6aacduqpPoEAACH5BAkEAEgALAAAAAA8ADwAhpaWlpeXl5iYmJmZmZqampubm52dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+\/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs\/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N3d3d\/f3+Dg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gEiCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam4o\/NDQ\/nJwyLS0yopsxpTGojzUtLDeHMKUwhz43OD2tgywmJiuztYc2nzi8giwnyy6GtC22hTmfNLLIMCjLKceEz9GDPzWfNTrIycsnLYXehTjU1uYz2Scop4PsgzvUNTzmgy\/ogg1S1YLVoGKfcvgjlALdi0GkTA3SsU8UDBMnvhECuEydoBwyZCgU5C7hoSA+egSRhOIDiBAmmhVawUxRSRuGgPTYwdOHpBMggoIQkcKQChWMbOAs9IMHz56SZIwQGlQE0ktNn\/LkIYQSChFUQZSwtFMrD5+WaJwIQXXspLL+T30M0cSihFC3kuD2CCXqBQoUlnz4ALKwsOHDiBnJEME2bIgRGikVGSKksuXKQ4owGqGhs+fPIjANCUK6tOm5i0hk+Mw6BCYhpmMHQa1oRmPHIjxaInK5txDNiYMLH97KhAcPlo4YMYKKM4UJFDRQWk79iCYXHSpQ2E5hw3Tq1DF9uMB9u\/dK4KtTWpGhPIULri8pT89cUgfo2y2AMFTBAqMFCxhCX32QeABdBRyYYAgFDTSQgSINABBAAobMF14kKXDQQVGGbNAgAxcMEgIEEOwnCAMSBiDBIcsdYR0nEDTowHlIRGCAAREMEoEAAQRQwGEeNjgBIQ8ccMADhCCC0GMAOS4UwgMyIjeIA0Y6QEgFA\/RIgHT+WNBgAxgUQuUBVhISYY8BmsOBAw1CwOGUVRYiQgE9DjAkMhV8+aCYcYrZIwBp8nIBAwxQcMiYZRaSAAAAMGAOCRdY8CYhiB4iggIMdEBckUcStwgEN0LgqSIoVFDBpKOmquqqrLbqqjmBAAAh+QQJBABJACwAAAAAPAA8AIaTk5OUlJSVlZWWlpaXl5eYmJiampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\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\/v7\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\/z38+Pc9hFyioMD7egQQLIl\/r2NHD0ojMMBedwu0dokPO\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\/RdvQkULSqVjz\/9kgsU9pmQAg2S7HdeITrowAgMMBjiwgn2rVCgfEIYogMOOOygSAzVjUdIDCtAWEJakQgRXX+F8IAhDgoKooMNNrRYBAzVsbCaITOwsMKNm+SwooaC2DDDDO4JIkONg2V\/piKGMhYhJJGEvFCjDJj14COGPRBSw5DLDUJDC9W1UCQ6F2II5CBbztDlIBxW1yA6S+KQww+FpLmmIDiAyUILPLpSZoaG2GlImyy82UuZTaLJ5SFSFoqODwnSGeiihuAAQww3PJfmmM8h8iSnnRrCww03nBnqqaimquqqrAoUCAAh+QQJBABKACwAAAAAPAA8AIaVlZWWlpaXl5eZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBKgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKMRsbMZycGQwMGaKbFQ0NFaiPIBIPJYcUqxSHLBocKK6DEAUFDrS2hxoTExy9ghAGzROGtQ23hR4U1hvKShcHzQmzhNHTgy0X1hUg2UrMzoXhhRzWFNjpHAjNB6eD7oMjFdYWJtIJstDMQANCqlgRyhDvg8BBCu5ZGETK1KAP\/ihcEMVhQYN5hQgaKBBhUAkLFr4p4TDBGjpDLEKAYCGpAQAAAhZgMOSAXaIO1vIRSgFCQwYMIiQxABCg6YCShRgcXIRhZyESGzJozRBCkgcDTZsCICABUwkOW7V2cEHpAQGm\/k0FKLD0IW0GDiMuiWggIGyABJQ8pNUgAoYmCwgCMEUQ+GgGDydQYXAgrNIIESoeat7MuTOiI6BDi06CSQYKEyVSqzZxogajI0Ziy559BJOJDyBy6879gdci2LOD1750e\/fuDykaiRZt5AgSTDFOq15t4obn69izcyIiRIglFixCiRoSBIj5IJRSqE5hOFMRIebjo5+kfvUK65bgxz9vScX0Eie0QEkR5e0XxBCYvHDCfyi4Fol+8XlXCA88MBKDeIS0gJpqK0gCYRBEGLJDDjn0oMgMLbTQHiExrIAaCTRFwp0QIRrSA4k5VCgIDzbYoKMSMqTYAg2HzLDCCkRyiqIDjj4McsMMM+CnBA1CvrDZjSTuQIgNUNpACAxCJpnOD0uS2OQgXM7gJZoupOgCDgLxgKOJW3ZZSJApYtiLD2XqICGadhKywwtuiumKnCT+CKiahqCYZzaIamlImmsWAmYLMmQDBIXzFULpITvEIAOc2H2qXSKmnnrIDzjg8IOqsMYq66y01upKIAAh+QQJBABHACwAAAAAPAA8AIaYmJiZmZmampqbm5ucnJydnZ2fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nze3t7f39\/i4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBHgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLhcXLpycFQYGFaKbD6UPqI8cDAoihw4HBw6HKRYYJa2DCwAACbO1t4YVDQ0XvYK\/AQHFhLS2hhkO1srLEgPOBbLRxIUpEdYPHMvMzgANhdLQghgN1hbn7wTOA6eD7YQfD9YQ3uhBcBYAASFVBlgNomDNgTl6gwo4ExBhEClTgzb4c1BRlBEjiCKkYzAoRIQIIQZdiOfw0IkOHFBI+kjzEAJn7qhZy0eoBIcKFCZ0mEmzZqFajCZMMATCAoWnEx5GKloUE4gLT7NiUEGJqlFKG4BmvfABk1eQkzJkpVDBQwtN\/l4paQhKQcOIVh8tefBgAqLfv4ADMyoypLDhw0QwvSARorHjxiNiMBoipLLly0MwidCwobPnzhpITL5MWkjmS5s\/fw49+LDrIYkvtRjx+LEIGoJz697dC4gPH5ZSpHiBCkgPHsh7UDIhormJt5mE+EBOXfmkEs2bj0iB25KP49R5AK90IntzElwnBQFf\/QemFSTMiyghQ9L09oZw4GDUAjohFSOYJ1Mk94kHhCE31FBDDp2ggAILhrhwQoAipCBJEL8daIgOCtawnyA5yCADg4K04CAKMBwCg4OScWJDhzoMMsMLL8wwyIoOpucXhwreQIgMNNY3yAonpgjRDi8qaRjjIEC+IKQgMqTgYAo20oNDhyQyGWQhLpzoXy86JGnDeFo6WcgNKkxpZC9XKphlmU8O8oKX57TpoyFNxjkICyec8CUqPOhH5o9bItiCCzXwlidviyzKaCI80EADD49WaumlmGaq6V+BAAAh+QQJBABIACwAAAAAPAA8AIaWlpaXl5eYmJiZmZmampqbm5udnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6\/v7\/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8\/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trc3Nzd3d3f39\/g4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH\/oBIgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpuKLxcXL5ycEQYGEaKbDwcHD6iPHQwKIocOqw6HKRUXJK6DCwAACbS2hxQMDBe9gr8BAbeFtQfPhBkN1hbKSBIDzQUj0MSEKRDWDhzZSAvNANOC0e1IF9YN2OgYBM0D9e7hgh4O1h7MQockQrMACAipYkVowrwNBAcVaCbglCBSpgZtANgAgqgjR4wYOWQwAAAGg0BEiABi0AUG1s4ZStGBQwpJInMeMZSgGbxCGKxRMGSCQwUKEzzgzJnT0CpGEiQYCmGBgtUJHSYx1YkpxAWrYDOsoBRy68hKG46CvfABk9md\/pMygKVQwYMLTWWbTtqAlIIGXqKMgLTkwcOJiIgTK158qMgQIZAjQx5CBNOLESFAaN4cQoQMRkOCiB5NekhXDahTq\/62KDTp10JOq1adAbCiIpJzC6l8qYWIzJs1hwhBg7Hx48g5AfHhw9KJE3dF\/eixo3oPSiQ+ePhAYmymIT6qi78+acSH8x9AmJhxyQcP8dYtlUB\/PgQKSkLew+fxA5OKEPR94Jkk4YnHnyE33MAICyzMBCB6JhA4HhCG2EADDTgo4sJz3hHiggkgaHdYJEH04EMQh+RwIYaD4BBDDBkKwsJzJ8BwyAsnmGAjJzWsmMMgMrTQwmeC4PjcTYipgnihDYTEIGQMhKhAYygE8dDjhTsQAoOQOwoSAwrPoVAcOjesGOMgW7bQpSAt0NhgNjpcWUN\/WnJZyA0phEllL2Ve+GMhaa4pyIbPvdkLDkseEughK+TYQjY94HBDc4YsiiALLdSAXJpQJpeIky106ukhPMwwA3mjpqrqqqy26qoogQAAIfkECQQAPwAsAAAAADwAPACFmpqam5uboaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+\/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8\/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2tra29vb3d3d3t7e39\/fAAAABv7An3BILBqPyKRyyWw6n9CodEqtWq\/YrHarLDUaJi7XAAAYxFtCAEBAa9WBthHEaHDcTri8qBAIGnhNekYPA4YMgUyDRCAGhgQSiUuLQw4Ch5KTAXFEFQSGBRmZSgVlBUQKhgMRo0oHZQdDEZ8DZ1w+PT0+TxcGBhdDDZcDkUYeExIfUj08zbpUDoYKRh0RCgkIE8vN3D1U2EYWCwnkCMVQPtzq3lcXDOTwDSFUzOo87FQQ1\/AMFVe49nhQeQAvgYIJJLTkUjcQW4IHosTgwjeFAoU7rTJq3MhRyI0bOEKKBLkDSwkNFyyoXHkBQwomOWzInEkTBxYMDyDo3Knzgf4GJjhoCrVhsx3Pow82MNkhsmnIGzqwkMiQcqXKliw6at3KFcsNGjSsfPBQAo2NGTHSzqCywUIFCxtEaMlBI63dtVPasvSw4koNGXbVWuFg1QIGZVNwAA4sowaWEBkKa3gZpa7dxkZcuGAyQm4REBhWVuggxXIMGjeMtFCh4oUSEh06zCsCO2UFD1JwgE1tBAZrFZuFvECBwrWQEbE7hDFywkOHE2JY\/IYxJAUJEpR\/mHDeAfEo36xbEEFxHQWREMmXS5Kx4ncMIieuQx+CgrsHFZlc\/DY+JD6J+UPAFptngcDQngos2FCEfwAK90FsHjSIhn6s8deffEYI2AGBbjVQKB5zGBqBHgcjJEKDCy0oCOJ\/R7ggwghZaUUeCeZ1hcSMNdpoxAyshaXjj0AGKeSQRF4RBAA7')}";
});