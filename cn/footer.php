<footer>
  <div class="f-top">
    <div class="f-au">
      <dl><a href="/"><dt><img src="images/footico.png" ></dt><dd>权威认证</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico2.png"></dt><dd>权威认证</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico3.png"></dt><dd>权威认证</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico4.png"></dt><dd>终生保养</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico5.png"></dt><dd>交通指示</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico6.png"></dt><dd>直邮中国</dd></a></dl>
      <dl><a href="/"><dt><img src="images/footico7.png"></dt><dd>预约购买</dd></a></dl>
    </div>
  </div>
  <div class="f-bot">
    <div class="foot">
      <div class="f-left">
        <div class="fo-left">
          <p>注意事项：公司位于安特卫普钻交所大楼内，请每位来访客人务必携带本人护照或者欧洲所在国身份证，以供钻交所门卫安检放行之用。向安检递交身份证时请说明希望访问Belgem公司。</p>
          <p>为了您的方便，请您在来访前提前电话通知我们公司。</p>
          <p>利美钻石专注于<a href="">安特卫普钻石</a>和<a href="">比利时钻石</a></p>
        </div>
        <div class="fo-cen">
          <p>地址：Pelikaanstraat 62,2018 Antwerp Belgium</p>
          <p>电话：+32（0）3689 7394</p>
          <p>邮箱：info@lumiagem.com</p>
          <p>微信：请扫描右侧二维码</p>
          <p>更多钻石请看这里:<a href="">钻石知识</a></p>
        </div>
      </div>
      <div class="f-right"><img src="images/footerwe.png"></div>
    </div>
  </div>
</footer>
   <script>
	$(function () {
	    setNavigation();//set menu active
//  	    $("#gwc").hover(function(){
//  	    	$(this).find('img').attr("src","images/gwc-se.png");
//  	    },function(){
//  	    	$(this).find('img').attr("src","images/gwc.gif");
//  	    });
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