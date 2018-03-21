var phoneWidth = parseInt(window.screen.width);
var widthScreen = 640;
var phoneScale = phoneWidth/widthScreen;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
	var version = parseFloat(RegExp.$1);
	// andriod 2.3
	if(version>2.3){
		$("meta").eq(1).attr('content','width='+widthScreen+', minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi');
	// andriod 2.3ртио
	}else{
		$("meta").eq(1).attr('content','width='+widthScreen+', target-densitydpi=device-dpi');
	}
} else {
	$("meta").eq(1).attr('content','width='+widthScreen+', user-scalable=no, target-densitydpi=device-dpi');
}

var time = 1000;
var setAni = function(cb,time){
	setTimeout(function(){
		cb();
	},time)
};

var myScroll;

function loaded() {
    if ($('#wrapper').length > 0)
        myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
}

if ($('#wrapper').length > 0)
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function () {
    loaded();
})