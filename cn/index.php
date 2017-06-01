<?php include_once('header.php');?>
<title>比利时钻石,安特卫普钻石 - 利美钻石</title>
</head>
<body>
<div class="zhuti clear">
  <?php
	include_once('topbar.php');
  ?>
  <div class="datu">
  </div>
  
  
  <div class="pic">
    <div class="pic_k">
      <ul>
        <li><a href="javascript:;" bgurl="images/top1.jpg"><img src="images/top1s.jpg"></a></li>
        <li><a href="javascript:;" bgurl="images/top2.jpg"><img src="images/top2s.jpg"></a></li>
        <li><a href="javascript:;" bgurl="images/top3.jpg"><img src="images/top3s.jpg"></a></li>
      </ul>
    </div>
  </div>

  <div class="dz clear">
    <div class="dz-box tc"><img src="images/dz-bg.jpg" alt=""></div>
    <a href="dia.php"><span></span>开始挑选</a>
  </div>  
  
  <div class="xilie">
    <div class="x-top"><img src="images/xlcp.png"></div>
    <div class="x-cen">
      <div class="x-cenk">
        <ul>
          <li class="on">推荐</li>
          <li>钻戒</li>
          <li>吊坠</li>
          <li>耳饰</li>
        </ul>
      </div>
    </div>
      <div class="x-bot">
          <a href="jewelry.php?from=index&category=recommend"><img src="images/xltj.jpg" class="on"></a>
          <a href="jewelry.php?from=index&category=weddingRing"><img src="images/xlzj.jpg"></a>
          <a href="jewelry.php?from=index&category=idoRing"><img src="images/xldz.jpg"></a>
          <a href="jewelry.php?from=index&category=ornament"><img src="images/xles.jpg"></a>
      </div>
  </div>
  
  <div class="kongbai"></div>
  
  <section>
    <div class="about-k">
      <div class="about-bot">
        <div class="about-left">
        <div class="about-title"><img src="images/xz.png"></div>
          <div class="about"><b class="wz">钻石源头</b><br>

          <br>利美钻石诞生于安特卫普，这座城市自1447年起便成为了世界钻石交易中心， 闻名于世。全球80%的钻石在这里切割，半数以上的钻石都在安特卫普交易。利美钻石品牌背后的是全球最出色的钻石供应商和钻石百年世家的传承的信念。

          <br><br><b class="wz">欧洲匠人</b><br><br>

          Antwerp Cut 安特卫普切工，又被称为行业标准钻石切割。安特卫普钻石工匠的手艺被公认为是全世界最优秀的，在安特卫普，每天有上千名工人为获得著名品质标记Antwerp Cut而全力以赴。安特卫普能成为并保持世界钻石中心的地位，与欧洲匠人精湛的工艺是分不开的，至今欧洲匠人仍然垄断者大克拉钻的切割。

          <br><br>
          <b class="wz">裸钻精品</b><br><br>
          利美是位于比利时安特卫普钻石交易所内，是AntwerpDiamond Club钻石交易所的注册会员，世界钻石交易所联合会的会员，同时也是上海钻交所的会员。从原石采购并自己进行组织加工，通过大宗采购来降低成本，这使得我们的销售价格甚至小于某些公司的成本价。 中国一些知名的珠宝品牌商也是我们的客户。</div>
        </div> 
        <div class="about-right"><img src="images/whylumia.gif"></div>
       
      </div>
    </div> 
  </section>
  
  
  
  <div class="tuijian">
    <div class="t-top"><img src="images/tuijianword.png"></div>
    <div class="x-cen">
      <div class="x-cenk">
        <ul>
          <li src="images/dia-left.png" class="on" onclick="recommendDia()">裸钻</li>
          <li src="images/ring-left.png" onclick="recommendJew('ring')">钻戒</li>
          <li src="images/pendant-left.png" onclick="recommendJew('necklace')">吊坠</li>
          <li src="images/eardrop-left.png" onclick="recommendJew('earring')">耳饰</li>
        </ul>
      </div>
    </div>
      <div class="t-bot clear">
        <div class="t-left">
            <img id="recommendImg" src="images/dia-left.png" alt="">
        </div>
        <div id="recommWrapper">
		    <!-- 
	        <div id="recommCenter" class="t-dia-center">
		    </div>
		    <div id="recommRight"class="t-dia-right">
		    </div>
		    
	        <div class="t-center">
	          <a href="" style=""><img src="images/t-center-01.jpg" alt=""></a>
	          <a href="" style="margin-top:-1px;"><img src="images/t-center-02.jpg" alt=""></a>
	          <a href="" style="margin-top:-1px; margin-left:-1px;"><img src="images/t-center-03.jpg" alt=""></a>
	        </div>
	        <div class="t-right">
	          <a href=""><img src="images/t-right.jpg" alt=""></a>
	        </div>
        	-->	
        </div>
  

      </div>
      
</div>
  
  
  <div class="new">
    <div class="newk">
      <div class="newkk">
        <div class="n-pp"><a href="about.php"><img src="images/ppgs.png"></a></div>
        <div class="n-pp1"><a href="about.php?p=knowledge"><img src="images/zszs.png"></a></div>
        <div class="n-new">
          <div class="n-title"><a href="">最新动态</a></div>
          <div class="n-con">
            <?php 
            $sql='SELECT * FROM usefulinfo  ORDER BY id DESC LIMIT 0,5';
			$stmt=$conn->query($sql);
            ?>
            <ul>
              <?php foreach($stmt as $row){?>
              <li>
              <a href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>"> <span class="sp_short"><?php echo $row['title_ch']; ?></span></a>
              </li>
              <?php }?>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="layout white_content" id="makeOrder" style="display:none;">
    <div class="l-close"><a class="btn" href="javascript:void(0)" onclick="popToggle()"><img src="images/close.png"/></a></div>
    <div class="l-top"><img src="images/yuyue_button.png"/></div>
    <form id="appointmentForm" >
<?php
$userid=$_SESSION['useraccount'];
$user_info='select name,tel,email from clients_list WHERE id = "'.$userid.'"';
foreach($conn->query($user_info) as $r_u){
	$name=$r_u['name'];
	$email=$r_u['email'];
	$tel=$r_u['tel'];
}
?>
    <div class="l-input" id="appointmentDiv">
        <div class="linput" style="height: 30px;">
            <div class="linputs"><label>真实姓名：</label><input type="text" name="name" value="<?php echo $name;?>"/></div>
            <div class="rinputs"><label>电子邮件：</label><input type="text" name="email" value="<?php echo $email;?>"/></div>
        </div>
        <div>
            <div class="linputs"><label>手机号：</label><input type="text" name="tel" value="<?php echo $tel;?>"/></div>
            <div class="rinputs"><label>预约时间：</label><input type="text" name="viewTime" value=""placeholder="yyyy-mm-dd hh:mi"/>
            </div>
        </div>
        <br>
        <div class="l-bottom" id="appointmentBottom">
	        <input type="hidden" name="appointmentId" id="appointmentId"/>
	        <input type="hidden" name="type" id="appointmentType"/>
	        <input type="button" value="" id="sub_btn" onclick="appointment();"/>
    	</div>
    </div>
    
    </form>
</div>
<div class="black_overlay" id="fade" style="display:none;"></div>
<?php include_once('footer.php');?>
<script>
    $(function(){
    	recommendDia();
        $(".caidanr a,.caidanl a").click(function () {
            if ($(".xlcd").is(":hidden")) {
                $(".xlcd").show();
            } else {
                $(".xlcd").hide();
            }
        })
        $(".xilie .x-cenk li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
            $(".xilie .x-bot img").removeClass("on");
            $(".xilie .x-bot a").eq($(this).index()).find("img").addClass("on");
        })
		  $(".pic .pic_k li a").click(function () {
			  var bkgUrl=$(this).attr("bgurl");
            $(".datu").css("background-image","url("+bkgUrl+")");
        })
      $(".tuijian .x-cenk li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
            $('#recommendImg').hide().attr("src",$(this).attr("src")).fadeIn('slow');
        })
    })
    function checkLogin(type,id) {
    	<?php if(!isset($_SESSION['useraccount'])){?>
        if(window.confirm('请登录后继续操作')){window.location.href='login.php';}
        <?php }else{?>
		$("#appointmentType").val(type);
		$("#appointmentId").val(id);
        popToggle()
        <?php }?>
    }
    function popToggle() {
		$("#fade").fadeToggle();
		$("#makeOrder").fadeToggle("slow").focus();
    }
    function appointment(type,id) {
		//获得已经预约的钻石
		$.ajax({
			type : "post",
			url : "action.php?action=appointmentMake",
			data: $('#appointmentForm').serialize(),
			complete : function() {
				// layer.close(page_layer);
			},
			success : function(json) {
				$('#appointmentBottom').text(json);
			},
			error : function() {
				alert('载入数据失败！');
			}
		});
		//popToggle();
	}
    function recommendDia() {
    	recommWrapper
    	$("#recommWrapper").hide();
    	//$("#recommCenter").hide();$("#recommRight").hide();
		$.ajax({
				type : "get",
				url : "action.php?action=recommendDia",
				complete : function() {
				},
				success : function(json) {
					var data=eval(json);
					var item = "";
					$.each(data, function (n, j) {
						if(n==0)
							item +='<div id="recommCenter" class="t-dia-center"><div class="pro_pics">';
						else
							item +='<div id="recommRight"class="t-dia-right"><div class="pro_pics">';
						item +='<div class="pic_00"><img src="images/pic_01.png"/>';
				        item +='</div>';
						item += '<div class="detail">';
			            item += '<p>圆形裸钻</p>';
			            item += '<p>'+j.carat+'克拉</p>';
			            item += '<p>颜色：'+j.color+'</p>';
			            item += '<p>净度：'+j.clarity+'</p>';
			            item += '<p>切工：'+j.cut+'</p>';
			            item += '<p>抛光：'+j.polish+'</p>';
			            item += '<p>对称性：'+j.symmetry+'</p>';
			            item += '<p>证书：'+j.grading_lab+'</p>';
			            item += '<p>编号：'+j.stock_ref+'</p>';
			            item += '<p>价格：'+j.price+'欧元</p>';
			            item += '</div></div>';
			            item += '<div class="l-bottom">';
			            item += '<ul><li class="on" onclick="checkLogin(\'dia\','+j.id+')">预约</li></ul>';
			            item += '</div></div>';
					$("#recommWrapper").html(item).fadeIn('slow');
				});
						
				},
				error : function() {
					alert('载入数据失败！');
				}
			});
    	}
    function recommendJew(jewType) {
    	$("#recommWrapper").hide();
    	$.ajax({
			type : "get",
			url : "action.php?action=recommendJew&jewType="+jewType,
			complete : function() {
			},
			success : function(json) {
				var data=eval(json);
				 $.each(data, function (n, j) {
					if(n==0){
						var item ='<div class="t-center">';
				        item +='  <a href="jewelry-detail.php?id='+j.id+'"><img style="max-width:386px;max-height:386px;"class="01" src="/images/sitepictures/thumbs/'+j.image1+'" alt="'+j.name_ch+'" /></a>';
				        item +='  <a href="jewelry-detail.php?id='+j.id+'" style="margin-top:-1px;"><img style="max-width:238px;max-height:238px;" class="02"  src="/images/sitepictures/thumbs/'+j.image2+'" alt="'+j.name_ch+'" /></a>';
				        item +='  <a href="jewelry-detail.php?id='+j.id+'" style="margin-top:-1px; margin-left:-1px;"><img style="max-width:148px;max-height:148px;" class="03" src="/images/sitepictures/thumbs/'+j.image3+'" alt="'+j.name_ch+'" /></a>';
				        item +='</div>';
				        item +='<div class="t-right">';
				        item +='  <a href="jewelry-detail.php?id='+j.id+'"><img style="max-width:177px;max-height:177px;" class="04" src="/images/sitepictures/thumbs/'+j.image4+'" alt="'+j.name_ch+'" /></a>';
				        item +='</div>';}
					$("#recommWrapper").html(item).fadeIn('slow');
				});
				
			},
			error : function() {
				alert('载入数据失败！');
			}
		});
	}
</script>
</body>

</html>
