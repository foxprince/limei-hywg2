<?php ob_end_flush();?>
<footer>
  <div class="f-top">
    <div class="f-au">
      <dl><a href="intro.php?c=gia"><dt><img width="57" src="images/footer-01.png" ></dt><dd>权威认证</dd></a></dl>
      <dl><a href="intro.php?c=hrd"><dt><img width="57" src="images/footer-02.png"></dt><dd>权威认证</dd></a></dl>
      <dl><a href="intro.php?c=igi"><dt><img width="57" src="images/footer-03.png"></dt><dd>权威认证</dd></a></dl>
      <dl><a href="intro.php?c=maintain"><dt><img width="57" src="images/footer-04.png"></dt><dd>终生保养</dd></a></dl>
      <dl><a href="intro.php?c=route"><dt><img width="57" src="images/footer-05.png"></dt><dd>交通指示</dd></a></dl>
      <dl><a href="intro.php?c=tochina"><dt><img width="57" src="images/footer-06.png"></dt><dd>直邮中国</dd></a></dl>
      <dl><a href="intro.php?c=order"><dt><img width="57" src="images/footer-07.png"></dt><dd>预约购买</dd></a></dl>
    </div>
  </div>
  <div class="f-bot">
    <div class="foot">
      <div class="f-left">
        <div class="fo-left">
          <p>注意事项：公司位于安特卫普钻交所大楼内，请每位来访客人务必携带本人护照或者欧洲所在国身份证，以供钻交所门卫安检放行之用。向安检递交身份证时请说明希望访问Belgem公司。</p>
          <p>为了您的方便，请您在来访前提前电话通知我们公司。</p>
          <p>利美钻石专注于<a href="about.php?p=knowledge">安特卫普钻石</a>和<a href="about.php?p=knowledge">比利时钻石</a></p>
        </div>
        <div class="fo-cen">
          <p>地址：Pelikaanstraat 62,2018 Antwerp Belgium</p>
          <p>电话：+32（0）3689 7394</p>
          <p>邮箱：info@lumiagem.com</p>
          <p>微信：请扫描右侧二维码</p>
          <p>更多钻石请看这里:<a href="about.php?p=knowledge">钻石知识</a></p>
        </div>
      </div>
      <div class="f-right"><img width="57" src="images/footerwe.png"></div>
    </div>
  </div>
</footer>
   <script>
	$(function () {
	    setNavigation();//set menu active
		if($("#gwc").hasClass("on")){
			$("#gwcLogo").attr("src","images/gwcWhite.gif");}
		else {
 	    $("#gwc").hover(function(){
 	   		$("#gwcLogo").toggleClass("my_gwx");
 	    	$("#gwcLogo").attr("src","images/gwcWhite.gif");
 	    },function(){
 	 	    	$("#gwcLogo").attr("src","images/gwc.gif");
 	    });}
	});
	function setNavigation() {
	    var path = window.location.href;
	    path = path.replace(/\/$/, "");
	    path = decodeURIComponent(path);
	    $(".nav-box a").each(function () {
	        var navi = $(this).attr('href');
	        if (path.indexOf(navi)!=-1) {
	            $(this).addClass('on');
	            return false;
	        }
	    });
	}
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