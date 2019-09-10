<?php
ob_start();
session_start();
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
require_once('log.php');
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8" />
	<meta content="比利时钻石,安特卫普钻石,钻石购买,钻交所,钻石交易所，比利时钻交所，比利时钻石交易所" name="keywords" />
	<meta name="description" content="利美钻石主营产品：比利时钻石，安特卫普钻石，利美钻石婚戒定制专家，为您专业定制独一无二的钻戒，每颗钻石都配有国际钻石证书，清晰的解释，贴心的建议和优惠的价格是利美对您的承诺，作为华人的购钻渠道，利美钻石将竭诚为您的选择提供最专业的服务。"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<link rel="stylesheet" type="text/css" href="./css/public.css">
	<link rel="stylesheet" type="text/css" href="./css/text.css">
	<link rel="stylesheet" type="text/css" href="./css/css.css">
	<script type="text/javascript" src="./js/jquery.1.11.3.min.js"></script>
	<script type="text/javascript" src="./js/text.js"></script>
	<script type="text/javascript" src="./js/js.cookie.js"></script>
	<script type="text/javascript">
	var bForcepc = fGetQuery("dv") == "pc";
	function fBrowserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIpad) {
			var sUrl = location.href;
			if (!bForcepc) {
				window.location.href = "/m/";
			}
		}
		else if (bIsIphoneOs || bIsAndroid) {
			var sUrl = location.href;
			if (!bForcepc) {
				window.location.href = "/m/";
				return;
			}
		}
		else if (bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM) {
			var sUrl = location.href;
			if (!bForcepc) {
				window.location.href = "/m/";
			}
		}
		//else
			//window.location.href="/cn/index.php"
	}
	function fGetQuery(name) {//获取参数值 
		var sUrl = window.location.search.substr(1);
		var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
		return (r == null ? null : (r[2]));
	}
	function fShowVerBlock() {
		if (bForcepc) {
			document.getElementByIdx_x("dv_block").style.display = "block";
		} else {
			document.getElementByIdx_x("ad_block").style.display = "block";
		}
	}
	fBrowserRedirect();
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-84729490-1', 'auto');
  ga('send', 'pageview');
</script>
<script>

(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
	<script>
	// Generate four random hex digits.  
	function S4() {  
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
	};  
	// Generate a pseudo-GUID by concatenating random hexadecimal.  
	function guid() {  
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());  
	};  
    // set a cookie "id" to "12345"
    // usage: ec.set(key, value)
    if(Cookies.get('everUserId')===undefined) {
    	Cookies.set("everUserId", guid(), { expires: 365,path: '/' }); 
		console.log(Cookies.get('everUserId'));
    }
	</script>