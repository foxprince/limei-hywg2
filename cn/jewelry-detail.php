<?php include_once('header.php');?>	<title>首饰 - 利美钻石</title>	<script type="text/javascript" src="js/mzp-packed.js"></script>	<link href="css/magiczoomplus.css" type="text/css" rel="stylesheet"></head><body><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 --><?phpif(!isset($_GET['id'])){exit('error: id required');}$sql_currency='SELECT * FROM convert_currency';foreach($conn->query($sql_currency) as $row_currency){	$USD_EUR=$row_currency['USD_EUR'];	$USD_GBP=$row_currency['USD_GBP'];	$USD_CNY=$row_currency['USD_CNY'];}$id=$_GET['id'];$sql='SELECT * FROM jewelry WHERE id = "'.$id.'"';foreach($conn->query($sql) as $row){}if($_COOKIE["DIA_CURRENCY"]=='USD')	$jewPriceDesc=round($row['price']/$USD_EUR);else if($_COOKIE["DIA_CURRENCY"]=='CNY')	$jewPriceDesc=round($row['price']/$USD_EUR*$USD_CNY);else	$jewPriceDesc=round($row['price']);?>  <div class="contain">  <?php include_once('orderStep.php'); ?>    <div class="detail w1000 clear">      <div class="detail-l fl">        <div class="box">          <div class="left-pro">            <div class="t1">              <img src="images/gotop.gif" id="gotop" />              <div id="showArea">                <?php for($i=1; $i<=8; $i++){                	if($row['image'.$i]!=NULL && $row['image'.$i]!=''){?>                 		<a href="../images/sitepictures/<?php echo $row['image'.$i]; ?>" rel="zoom1" rev="../images/sitepictures/<?php echo $row['image'.$i]; ?>"><img src="../images/sitepictures/thumbs/<?php echo $row['image'.$i]; ?>" /></a>                	<?php }                }?>              </div>              <img src="images/gobottom.gif" id="gobottom"  />            </div>            <div class="t2">            	<a href="javascript:" id="zoom1" class="MagicZoom MagicThumb"><img src="../images/sitepictures/<?php echo $row['image1']; ?>" id="main_img" class="main_img" style="width:400px; height:400px;" /></a>            </div>          </div>        </div>      </div>      <div class="detail-r" >        <h1><?php echo $row['name_ch']; ?></h1>        <div id="jewDetail" class="jewDetail">        <p><?php echo $row['text_ch']; ?></p>        <div class="detail-s">          <span>材质类型    </span>          <select id="materialSelect">                <option id="material18K">18K白金</option>              <option id="materialPt950">Pt950</option>          </select>         </div>        <div class="detail-s">          <span class="sewvtop">尺寸                    <img src="images/dollar.png" class="country" />                <img src="images/eur.png" />              	<img src="images/cny.png"  />                     <select style="width:50px;">              <option>3</option>              <option>3.5</option>              <option>4</option>              <option>4.5</option>              <option>5</option>              <option>5.5</option>              <option>6</option>              <option>6.5</option>              <option>7</option>              <option>7.5</option>              <option>8</option>               <option>8.5</option>               <option>9</option>              <option>9.5</option>              <option>10</option>              <option>10.5</option>              <option>11</option>              <option>11.5</option>              <option>12</option>               <option>12.5</option>               <option>13</option>              <option>13.5</option>          </select>           <a style="margin-left: 1em;" href="http://www.lumiagem.com/cn/about.php?p=article&ref=knowledge&id=273">如何确定戒圈尺寸</a></span>        </div>        <div class="detail-buy">        <?php         $price = $row['price'];                if($_COOKIE["DIA_CURRENCY"]=='USD')        		$price=round($price/$USD_EUR).'美元';        else if($_COOKIE["DIA_CURRENCY"]=='CNY')        		$yuan_price=round($price/$USD_EUR*$USD_CNY).'元';        else        		$price=round($price).'欧元';        ?>          <p>价格<i><?php echo $price; ?></i></p>        </div>        <div class="detail-s">        	<a style="float:left;" href="javascript:void(0);" onclick="orderJew('<?php echo $row['id'];?>')" class="btn"> 选定此款 </a>         </div>        </div>      </div>      <ul class="share fl">        <li><a href="images/"><img src="images/share01.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share02.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share03.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share04.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share05.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share06.png" height="24" width="24" alt=""></a></li>      </ul>    </div>  </div><!-- 内容主题 结束 --></div><?php include_once('footer.php');?></body><script>  var sizeJson = [  { name: "美国码", list: "3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5" },  //{ name: "欧洲码", list: "F,F1/2,G,G1/2,H,H1/2,I,J,J1/2,K,K1/2,L,L1/2,M,M1/2,N,N1/2,O,O1/2,P,P1/2,Q,Q1/2,R,R1/2,S,S1/2,T,T1/2,U,U1/2,V,V1/2,W,W1/2,X,X1/2,Y,Z,Z1/2,Z+1"},  { name: "欧洲码", list: "44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67"},  { name: "中国码", list: "4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27"}  ];  function bindSize(idx) {	  var html = '', listArr = sizeJson[idx].list.split(',');	  for (var s in listArr) {	  html += '<option>' + listArr[s] + '</option>';	  }	  $(".sewvtop select").html(html)  }  $(function () {	  $('#add_pic').click(function(){	  	window.location.href="dia.php";	  })	  $(".sewvtop img").click(function () {		  $(this).addClass("country").siblings().removeClass("country");		  bindSize($(this).index());  	  })  	  $("#materialSelect").change(function(){       	var s = $("#materialSelect option:selected").attr("id");      	if(s=='materialPt950') {      		s='<p>价格<i> 请咨询客服</i></p>';      		s+='<img src="./images/kefuqrcode-medium.jpg"/>';      		$(".detail-buy").html(s);          }      	else      		$(".detail-buy").html("<p>价格<i><?php echo round($row['price']); ?> 欧元</i></p>");		});  	orderJew(0);  });  function orderJew(id) {  var check = 0;  if(Cookies.get('orderJewId')>0||id>0){  // 	if(Cookies.get('orderDiaId')===undefined){  // 		alert('请在挑选裸钻页面选择定制首饰后再继续操作。');  //}else {  $.ajax({  type : "get",  url : "action.php?action=makeOrderJew&jewId="+id,			success : function(json) {				//window.location.href="dia.php?step=jew";				var item = '<p>材质类型：</p>';				item += '<p>尺寸：</p>';				item += '<p>价格：<?php echo $priceDesc.$jewPriceDesc; ?></p>';				if(Cookies.get('orderDiaId')!=undefined){					var j = <?php echo json_encode($r);?>;//console.log(JSON.stringify(j));					item += '<div class="detail">';		            item += '<p>圆形裸钻</p>';		            item += '<p>'+j[4]+'克拉</p>';		            item += '<p>颜色：'+j[5]+'</p>';		            item += '<p>净度：'+j[7]+'</p>';		            item += '<p>切工：'+j[10]+'</p>';		            item += '<p>抛光：'+j[11]+'</p>';		            item += '<p>对称性：'+j[12]+'</p>';		            item += '<p>证书：'+j[8]+'</p>';		            item += '<p>编号：'+j[1]+'</p>';					item += '<p>价格：<?php echo $priceDesc.$diaPrice;?></p>';	    		        if(j[8]=="HRD"){		            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j[8]+'&certNo='+j[9]+'" data-fancybox ><img id="gradinglabicon" src="./images/hrd.gif" /></a>';		            }else if(j[8]=='GIA'){		            		item += '<a class="certi_linker" target="_blank" href="https://api.checkgems.com/api/v2/certs/GIA/'+j[9]+'.pdf" data-fancybox ><img id="gradinglabicon" src="./images/gia.gif" /></a>';		            } else if(j[8]=='IGI'){		            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j[8]+'&certNo='+j[9]+'" data-fancybox ><img id="gradinglabicon" src="./images/igi.gif" /></a>';		            }		            if(j[8]=='GIA'){		            		item += '<a class="certi_linker" target="_blank" href="https://api.checkgems.com/api/v2/certs/GIA/'+j[9]+'.pdf" data-fancybox ><p>点击查看证书</p></a>';		            } else {		            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j[8]+'&certNo='+j[9]+'" data-fancybox ><p>点击查看证书</p></a>';		            }		            item += '</div>';	 				item += '<a style="float:none;" href="javascript:void(0)" onclick="makeOrderStep(\''+Cookies.get('orderDiaId')+'\',\'<?php echo $row['id']?>\');" class="btn">确定预约</a> ';	 				$('#step2').removeClass("active");	 				$('#step3').attr("class","active");				} else {	            	//item += '<a href="dia.php"  class="btn">挑选裸钻</a> ';					window.location.href="dia.php";				}				$('#jewDetail').fadeOut().html(item).fadeIn();				item = '<p><?php echo $row['name_ch']; ?></p>';				item += '<p><?php echo $priceDesc.$jewPriceDesc; ?> <a href="jewelry.php?action=resetOrder">重选</a></p>';				$('#step2').children().find('span').html(item);				$('#step2').children().find('img').remove();				$('#totalPrice').text('总计:<?php echo $priceDesc.($jewPriceDesc+$diaPrice) ?>');			}		});	}	return check;}</script></html>