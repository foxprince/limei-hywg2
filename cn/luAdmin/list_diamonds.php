<?php
/*===================session========================*/
session_start();

if(isset($_POST['logout'])){
	if(isset($_SESSION['authenticated'])){
			$_SESSION=array();
			if (isset($_COOKIE[session_name()])){
			    setcookie(session_name(), '', time()-86400, '/');
			}
			session_destroy();
	 }
	 header('Location: login.php');
     exit();
}

// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit();
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit();
}


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>钻石目录</title>
<link href="style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../fancyBox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<style type="text/css">

td{
	background:#EFF;
	padding:5px;
	border-bottom-color:#CC6699;
	border-bottom-width:2px;
	border-bottom-style:dotted;
}
td label{
	font-size:13px;
}
.filterbtn{
	display:inline-block;
}

div.imagebosx{
	border-style:solid;
	border-width:2px;
	border-color:#CC6699;
	padding:3px;
	margin:3px 2px;
	position:relative;
	display:inline-block; 
	width:85px; 
	margin-right:5px; 
	text-align:center;
}
div.imagebosx img{
	width:85px;
	margin-bottom:12px;
}
span.suc_indi{
	position:absolute;
	display:inline-block;
	background-color:#C90;
	border-radius:6px;
	top:5px;
	left:5px;
	padding:5px 12px;
	color:#FFF;
}
.progress{
	display:none;
}
a.multi_btn{
	display:inline-block;
	padding:3px 20px;
	background-color:#CC6699;
	color:#FFF;
	border-radius:6px;
	letter-spacing:5px;
	text-decoration:none;
	font-size:13px;
}
div.forcomments{
	margin-top:20px;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../fancyBox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="formplugin.js"></script>
<script type="text/javascript">
var crr_idofpic;
var crr_picnumber;
var crr_idv;
$(document).ready(function(){
	
	$('#sortbyref').click(function(){
		$('form#sort').submit();
	});
	
	$('input.image_selecting').change(function(e) {
		
		var crr_obj=$(this);
		crr_idofpic=crr_obj.parent('form').children('input.idforpic').val();
		crr_picnumber=crr_obj.parent('form').children('input.picnumber').val();
		e.preventDefault(); 
		//check first if the file extension is correct
		var filefullpath=$(this).val();
		var dotposition=filefullpath.lastIndexOf('.');
		var extension=filefullpath.substring(dotposition);
		if(extension=='.jpg' || extension=='.jpe' || extension=='.jpeg' || extension=='.JPG' || extension=='.JPEG' || extension=='.JPE' || extension=='.gif' || extension=='.GIF' || extension=='.png' || extension=='.PNG'){
			$('td#'+crr_idofpic).children('div.progress').fadeIn('fast');
			crr_obj.parent('form').submit();
		}else{
			alert("图片格式不支持，请上传. JPEG,. GIF 或. PNG 图片.");
		}		
	});
	
	$('button.vbtn').click(function(){
		var crr_obj=$(this);
		/*
		var thecode=crr_obj.parent('form').children('textarea').val();
		$('div#iframecontainer').html(thecode);
		var thelink=$('div#iframecontainer iframe').attr('src');
		crr_idv=crr_obj.parent('form').parent('td').attr('id');
		crr_obj.parent('form').children('input.thelink').val(thelink);
		*/
		crr_obj.parent('form').submit();
	});
	
	(function(){
	var bar = $('.progress .bar');
	var percent = $('.progress .percent');
	var status = $('#status');	  
		$('form.save_video').ajaxForm({
			beforeSend: function() {
				status.empty();
				var percentVal = '0%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			uploadProgress: function(event, position, total, percentComplete) {
				
				var percentVal = percentComplete + '%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			complete: function(xhr) {
				
				$('div#uploadingIndication').fadeOut('fast');
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					var thelink=status.find("p#linkfeedback").html();
					var thecor_id=status.find("p#idfeedback").html();
					var thecor_id_v=status.find("p#idfeedbackv").html();
					//alert(thecor_id);
					$('td#v'+thecor_id+' div.forvideo').html('视频已成功保存，视频链接: <a target="_blank" href="'+thelink+'" >点击查看视频</a><br /><span style="font-size:12px">（视频未加载以防止页面过载）</span><br /><button type="button" onclick="deleteVideo('+"'"+thecor_id_v+"'"+')">删除</button>');
					
					
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
		
	(function(){
	var bar = $('.progress .bar');
	var percent = $('.progress .percent');
	var status = $('#status');	  
		$('form.uploadImage').ajaxForm({
			beforeSend: function() {
				status.empty();
				var percentVal = '0%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			uploadProgress: function(event, position, total, percentComplete) {
				
				var percentVal = percentComplete + '%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			complete: function(xhr) {
				
				$('div#uploadingIndication').fadeOut('fast');
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					var imgname=status.find("p#imagename").html();
					//alert(imgname);
					$('td#'+crr_idofpic+' div.'+crr_picnumber+'bosx').html('<img width="138" src="../images/contentimgs/'+imgname+'" /><br /><button type="button" onclick="deleteIMG('+"'"+crr_idofpic+"', '"+crr_picnumber+"'"+')">删除</button><span class="suc_indi">图片添加成功</span>');
					$('td#'+crr_idofpic).children('div.progress').fadeOut('slow');
					$('.suc_indi').delay(1500).fadeOut('slow');
					
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
	
	
	(function(){
	var bar = $('.progress .bar');
	var percent = $('.progress .percent');
	var status = $('#status');	  
		$('form.save_comment').ajaxForm({
			beforeSend: function() {
				status.empty();
				var percentVal = '0%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			uploadProgress: function(event, position, total, percentComplete) {
				
				var percentVal = percentComplete + '%';
				bar.width(percentVal)
				percent.html(percentVal);
			},
			complete: function(xhr) {
				
				$('div#uploadingIndication').fadeOut('fast');
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.html();
				
				if(feedback=='OK'){
					$('div#success_indi').fadeIn('fast').delay(1500).fadeOut('slow');
					
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
	
	
	$(".multi_btn").fancybox({
		afterClose : function() {
			//location.reload();
			$.post(         
			"get_diamondimg.php", 
			{ref:affecting_ref}, 
			function(data){
				//if the returned data indicates ok, then do the actions
				if(data=="error"){
					
					window.location.reload(true);
					
				}else{
					//alert(data);
					$( "div[title='"+affecting_ref+"']" ).html(data);
				}
			}
		);
			return;
		}
	});
	$(".multi_btn").click(function(){
		//alert('a');
		affecting_ref=$(this).attr('id');
	});
	
	
	
	$("input.featuredcheckbox").click(function(){
		var ifFeatured='NO';
		var crr_obj=$(this);
		var affectiongID=crr_obj.attr('title');
		
		
		
		if(crr_obj.is(':checked')){
			ifFeatured='YES';
		}else{
			ifFeatured='NO';
		}
		
		
		updatingFeatured(affectiongID, ifFeatured);
		
	});
	
});


function deleteIMG($dir, $img, $id){
	var imgwhere=$dir;
	var img=$img;
	var id=$id;
	var r=confirm("确定删除该图?");
	if(r){
		$.post(         
			"delete_diamondimg.php", 
			{imgname:img, dir:imgwhere}, 
			function(data){
				//if the returned data indicates ok, then do the actions
				if(data=="ok"){
					alert("该图已经成功删除。")
					//window.location.reload(true);
					$('#'+id).remove();
				}else{
					alert(data);
					
				}
			}
		);
	}else{
		//window.location.reload(true);
	}
}

function deleteRecord($id){
	var theid=$id;
	var r=confirm("确定删除该条钻石记录?");
	if(r){
		$.post(         
			"delete_diamond.php", 
			{id: $id}, 
			function(data){
				if(data=="ok"){
					alert("该记录已经成功删除。")
					$('tr#r_'+theid).remove();
					//window.location.reload(true);
				}else{
					alert(data);					
				}
			}
		);
	}else{
		//window.location.reload(true);
	}
}
function updatingFeatured($id, $value){
	$('#loading_indi').fadeIn('fast');
	$.post(         
		"updatingfeatured.php", 
		{id: $id, thevalue: $value}, 
		function(feedbackdata){
			
			if($.trim(feedbackdata)=='OK'){
				$('#loading_indi').stop(true).css({'display':'none','opacity':1});
				$('#success_indi').fadeIn('fast').delay(1000).fadeOut('fast');
			}else{
				alert(feedbackdata);
				$('#loading_indi').fadeOut('fast');			
			}
		}
	);
}




function deleteVideo($id){
	var theid=$id;
	var r=confirm("确定删除该视频?");
	if(r){
		$.post(         
			"delete_diamondvideo.php", 
			{id: $id}, 
			function(data){
				if(data=="ok"){
					alert("该记录已经成功删除。")
					window.location.reload(true);
				}else{
					alert(data);					
				}
			}
		);
	}else{
		//window.location.reload(true);
	}
}

</script>
</head>

<body>


<?php
include('navi.php');
?>
<hr />

<h3>裸钻目录管理页面</h3>


<p style="border-bottom-style:dotted; border-width:2px; border-color:#CC6699; padding-bottom:20px; margin-bottom:20px;">
<a href="import_excel.php" style="display:inline-block; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none; padding:10px 38px 10px 30px; border-radius:6px; font-size:18px;">&uArr; 导入excel数据</a>
</p>

<p style="margin-bottom:5px;">为钻石添加图片与视频:</p>
<?php
if(isset($_POST['stockref'])){
	$stock_ref=trim($_POST['stockref']);


$sql="SELECT * FROM diamonds WHERE stock_ref = ".$stock_ref." ORDER BY id DESC";
if(isset($_POST['sortby'])){
	$sql="SELECT * FROM diamonds ORDER BY stock_ref DESC";
}
$ooh=$conn->query($sql);
?>

<form action="" method="post" id="sort">
<input type="hidden" name="sortby" value="ref" />
</form>
<table>

<tr>
<td width="80" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;"><img width="12" src="../images/site_elements/arrow-up.png" /><button type="button" id="sortbyref" style="border:none; background-color:#CC6699; font-size:12px; color:#FFF; cursor:pointer;" title="点击排序">库存编号</button></td>
<td width="550" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">图片</td>
<td width="350" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">视频</td>
<td width="100" colspan="2" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">操作</td>
</tr>
<?php
foreach($ooh as $row){
	$v_e=false;
?>
<tr id="r_<?php echo $row['id']; ?>">
<td align="center" valign="top" style="font-size:14px;"><?php echo $row['stock_ref']; ?></td>
<td align="left" id="<?php echo $row['id']; ?>" style="position:relative;" valign="top">




<div class="imagescontainer" title="<?php echo $row['stock_ref']; ?>">
<?php		
		/* settings */
		//$image_dir = 'pictures/2014apr/gallery/';
		$thumbs_dir='../images/contentimgs/'.$row['stock_ref'].'/thumbs/';
		
		$picsinfolder=array();	
		/* step one:  read directory, make array of files */
		if ($handle = opendir($thumbs_dir)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != '.' && $file != '..' && $file != '.DS_Store') 
				{					
			        $picsinfolder[] = $file;					
				}
			}
			closedir($handle);
		}
		
		/* step two: loop through, format gallery */
		if(count($picsinfolder)){
			$c=0;		
			foreach($picsinfolder as $file){
				?>						
                
                <div class="imagebosx" id="pic_<?php echo $row['stock_ref'].$c; ?>">
<img src="<?php echo urldecode($thumbs_dir.$file); ?>" />
<button type="button" onclick="deleteIMG('<?php echo $row["stock_ref"]; ?>', '<?php echo $file; ?>', 'pic_<?php echo $row["stock_ref"].$c; ?>')">删除</button>

</div>
                
                
                <?php
				$c++;
			}
		}else{
			echo '<p id="nopicnote">尚未添加图片</p>';
		}
?>

</div>









 
<p><a class="multi_btn" href="multiple_files_upload/index.php?ref=<?php echo $row['stock_ref']; ?>" id="<?php echo $row["stock_ref"]; ?>" data-fancybox-type="iframe">同时上传多张图片</a></p>
</td>
<td align="left" valign="top" id="v<?php echo $row['id']; ?>" style="position:relative;">
<div class="forvideo" style="background-color:#FFC; padding:5px;">
<?php
$sql_v='SELECT * FROM video_diamond WHERE ref_number = "'.$row["stock_ref"].'" ORDER BY id DESC LIMIT 1';
foreach($conn->query($sql_v) as $v){
?>
视频已保存，视频链接:
<a target="_blank" href="<?php echo $v['thelink']; ?>" >点击查看视频</a><br />
<span style="font-size:12px">（视频未加载以防止页面过载）</span>
<br />
<button type="button" onclick="deleteVideo('<?php echo $v['id']; ?>')">删除</button>
<?
	$v_e=true;
}
if(!$v_e){
?>
<form action="video_save.php" method="post" enctype="multipart/form-data" class="save_video"> 
<label>视频链接:(请使用Flowplayer链接)</label><br />
<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
<input type="hidden" name="where" value="diamond">
<input type="hidden" name="ref" value="<?php echo $row["stock_ref"]; ?>">
<input type="hidden" name="thelink" class="thelink" value="" />
<textarea name="videolink" style="width:320px; height:80px;"></textarea><br />
<button type="button" class="vbtn" style="margin-top:5px; font-size:14px; background-color:#CC6699; color:#FFF; padding:2px 12px; border-width:1px;">保存</button>  
</form>
<?
}
?>
</div>

<div class="forcomments" style="background-color:#CCF; padding:5px;">
<form action="comment_save.php" method="post" enctype="multipart/form-data" class="save_comment"> 

<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
<label>推荐指数:</label>
<select name="stars" class="stars">
<option value="0">0</option>
<option value="1" <?php if($row['stars']=='1'){ echo 'selected="selected"'; } ?>>1</option>
<option value="2" <?php if($row['stars']=='2'){ echo 'selected="selected"'; } ?>>2</option>
<option value="3" <?php if($row['stars']=='3'){ echo 'selected="selected"'; } ?>>3</option>
<option value="4" <?php if($row['stars']=='4'){ echo 'selected="selected"'; } ?>>4</option>
<option value="5" <?php if($row['stars']=='5'){ echo 'selected="selected"'; } ?>>5</option>
</select>
<br />
<label>推荐文字:</label><br />
<textarea name="thecomment" style="width:320px; height:80px;">
<?php echo $row['recommend_words']; ?>
</textarea><br />
<input type="submit" value="保存" style="margin-top:5px; font-size:14px; background-color:#CC6699; color:#FFF; padding:2px 12px; border-width:1px;">
</form>
</div>



</td>

<td align="center" valign="top">
<div style="margin-bottom:12px; font-size:14px; border-style:solid; border-width:2px; border-color:#CC6699; padding:3px 0;">
<input type="checkbox" class="featuredcheckbox" title="<?php echo $row['id']; ?>" id="feature_<?php echo $row['id']; ?>" <?php if($row['featured']=="YES"){ echo 'checked="checked"';} ?> /> 精品大钻
</div>
<button style="display:inline-block; text-align:center; background-color:#CC6699; padding:3px 8px; color:#FFF; font-size:14px; text-decoration:none;" type="button" onclick="deleteRecord('<?php echo $row['id']; ?>')">删除该记录</button>

</td>
</tr>
<?php
}
?>

</table>


<?php
}else{
?>
<form action="" method="post">
请输入要操作的钻石的 stock_reference :<input type="text" name="stockref" />
<input type="submit" name="btnofsubmit" value="提交" />
</form>
<?php
}
?>

<div id="status" style="display:none"></div>
<div id="iframecontainer" style="display:none;"></div>
<p style="height:50px;">&nbsp;</p>



<div id="loading_indi" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:#FFF; background-color:rgba(255, 255, 255, 0.7); display:none;">
<p style="position:relative; top:50%; margin-top:-35px; text-align:center;"><img width="25px" src="../images/site_elements/loadingGraphic.gif" /><br /><span style="position:relative; left:8px; display:inline-block; margin-top:12px;">载入中...</span></p>
</div>

<div id="success_indi" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:#FFF; background-color:rgba(255, 255, 255, 0.7); display:none;">
<p style="position:relative; top:50%; margin-top:-35px; text-align:center;"><span style="position:relative; left:8px; display:inline-block; margin-top:12px; padding:20px; background-color:#FFC;">更新成功</span></p>
</div>


</body>
</html>