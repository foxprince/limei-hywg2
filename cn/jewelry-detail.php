<?php include_once('header.php');?>	<title>首饰 - 利美钻石</title>	<script type="text/javascript" src="js/mzp-packed.js"></script>	<link href="css/magiczoomplus.css" type="text/css" rel="stylesheet"></head><body><div class="zhuti clear">  <?php include_once('topbar.php'); ?>  <!-- 内容主题 --><?phpif(!isset($_GET['id'])){exit('error: id required');}$id=$_GET['id'];$sql='SELECT * FROM jewelry WHERE id = "'.$id.'"';foreach($conn->query($sql) as $row){}?>  <div class="contain">  <?php include_once('orderStep.php'); ?>    <div class="detail w1000 clear">      <div class="detail-l fl">        <div class="box">          <div class="left-pro">            <div class="t1">              <img src="images/gotop.gif" id="gotop" />              <div id="showArea">                <?php for($i=1; $i<=8; $i++){                	if($row['image'.$i]!=NULL && $row['image'.$i]!=''){?>                 		<a href="../images/sitepictures/<?php echo $row['image'.$i]; ?>" rel="zoom1" rev="../images/sitepictures/<?php echo $row['image'.$i]; ?>"><img src="../images/sitepictures/thumbs/<?php echo $row['image'.$i]; ?>" /></a>                	<?php }                }?>              </div>              <img src="images/gobottom.gif" id="gobottom"  />            </div>            <div class="t2">            	<a href="javascript:" id="zoom1" class="MagicZoom MagicThumb"><img src="../images/sitepictures/<?php echo $row['image1']; ?>" id="main_img" class="main_img" style="width:400px; height:400px;" /></a>            </div>          </div>        </div>      </div>      <div class="detail-r" >        <h1><?php echo $row['name_ch']; ?></h1>        <div id="jewDetail" class="jewDetail">        <p><?php echo $row['text_ch']; ?></p>        <div class="detail-s">          <span>材质类型：</span>          <select>                <option>---请选择---</option>          </select>         </div>        <div class="detail-s">          <span>尺寸：</span>          <select>                <option>---请选择---</option>           </select>         </div>        <div class="detail-buy">          <p>价格：<i><?php echo $row['price']; ?> 元</i></p>          <a href="javascript:void(0)" onclick="orderJew(<?php echo $row['id'];?>)" class="btn">选定此款</a>          </div>        </div>      </div>      <ul class="share fl">        <li><a href="images/"><img src="images/share01.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share02.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share03.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share04.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share05.png" height="24" width="24" alt=""></a></li>        <li><a href="images/"><img src="images/share06.png" height="24" width="24" alt=""></a></li>      </ul>    </div>  </div><!-- 内容主题 结束 --></div><?php include_once('footer.php');?></body><script>$(function () {	$('#add_pic').click(function(){	    window.location.href="dia.php";	})});function orderJew(id) {	var check = 0;	$.ajax({		type : "get",		url : "action.php?action=makeOrderJew&jewId="+id,		success : function(json) {			var j = <?php echo json_encode($r);?>;			var item = '<p>材质类型：</p>';			item += '<p>尺寸：</p>';			item += '<div class="detail">';            item += '<p>圆形裸钻</p>';            item += '<p>'+j[4]+'克拉</p>';            item += '<p>颜色：'+j[5]+'</p>';            item += '<p>净度：'+j[7]+'</p>';            item += '<p>切工：'+j[10]+'</p>';            item += '<p>抛光：'+j[11]+'</p>';            item += '<p>对称性：'+j[12]+'</p>';            item += '<p>证书：'+j[8]+'</p>';            item += '<p>编号：'+j[1]+'</p>';            item += '<p>价格：'+Math.round(j["retail_price"])+'美元</p>';            if(j[8]=="HRD"){            	item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.hrdantwerplink.be/index.php?record_number='+j.certificate_number+'&weight=&L="><img id="gradinglabicon" src="./images/hrd.gif" /></a>';            }else if(j[8]=='GIA'){            	item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='+j.certificate_number+'"><img id="gradinglabicon" src="./images/gia.gif" /></a>';            } else if(j[8]=='IGI'){            	item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.igiworldwide.com/igi/verify.php?r='+j.certificate_number+'"><img id="gradinglabicon" src="./images/igi.gif" /></a>';            }            item += '<p>点击查看证书</p>';            item += '</div>';            item += '<a href="javascript:void(0)" onclick="makeOrderStep(<?php echo $r['id']?>)" class="btn">确定预约</a> '; 			$('#jewDetail').fadeOut().html(item).fadeIn();			$('#step2').removeClass("active");			item = '<p><?php echo $row['name_ch']; ?></p>';			item += '<p><?php echo $row['price']; ?>元 <a href="jewelry.php?action=resetOrder">重选</a></p>';			console.log(item);			//$('#step2').children().find('span').text("");			$('#step2').children().find('span').html(item);			$('#step2').children().find('img').remove();			$('#step3').attr("class","active");		}	});	return check;}</script></html>