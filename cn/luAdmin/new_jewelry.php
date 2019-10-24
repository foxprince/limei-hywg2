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
     exit;
}

// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit;
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit;
}

require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

if(isset($_POST['category']) && isset($_POST['name_ch'])){
	include('nuke_magic_quotes.php');
	//    videolink  
	$category = $_POST['category'];
	$jclass = $_REQUEST['jclass'];
	$brand = $_POST['brand'];
	
	if(isset($_POST['online_retail']) && $_POST['online_retail']=='YES'){
		$online_retail='YES';
	}else{
		$online_retail='NO';
	}
	if(isset($_POST['online_agency']) && $_POST['online_agency']=='YES'){
		$online_agency='YES';
	}else{
		$online_agency='NO';
	}
	if(isset($_POST['online_wholesale']) && $_POST['online_wholesale']=='YES'){
		$online_wholesale='YES';
	}else{
		$online_wholesale='NO';
	}
	if(isset($_POST['price'])){
		$price=$_POST['price'];
	}else{
		$price=NULL;
	}
	
	$color_type = $_POST['color_type'];
	$name_en = $_POST['name_en'];
	$name_ch = $_POST['name_ch'];
	$image1 = $_POST['image1'];
	$image2 = $_POST['image2'];
	$image3 = $_POST['image3'];
	$image4 = $_POST['image4'];
	$image5 = $_POST['image5'];
	$image6 = $_POST['image6'];
	$image7 = $_POST['image7'];
	$image8 = $_POST['image8'];
	$videolink = $_POST['video'];
	$text_en = $_POST['content_en'];
	$text_ch = $_POST['content_ch'];
	
	$sql_insert='INSERT INTO jewelry (category, jclass,brand, name_en, name_ch, image1, image2, image3, image4, image5, image6, image7, image8, videolink, text_en, text_ch, online_retail, online_agency, online_wholesale, price,color_type) 
	VALUES(:category, :jclass,:brand, :name_en, :name_ch, :image1, :image2, :image3, :image4, :image5, :image6, :image7, :image8, :videolink, :text_en, :text_ch, :online_retail, :online_agency, :online_wholesale, :price,:color_type)';
	
	$stmt=$conn->prepare($sql_insert);	  
	$stmt->bindParam(':category', $category, PDO::PARAM_STR);
	$stmt->bindParam(':jclass', $jclass, PDO::PARAM_STR);
	$stmt->bindParam(':brand', $brand, PDO::PARAM_STR);
	$stmt->bindParam(':name_en', $name_en, PDO::PARAM_STR);
	$stmt->bindParam(':name_ch', $name_ch, PDO::PARAM_STR);
	$stmt->bindParam(':image1', $image1, PDO::PARAM_STR);
	$stmt->bindParam(':image2', $image2, PDO::PARAM_STR);
	$stmt->bindParam(':image3', $image3, PDO::PARAM_STR);
	$stmt->bindParam(':image4', $image4, PDO::PARAM_STR);
	$stmt->bindParam(':image5', $image5, PDO::PARAM_STR);
	$stmt->bindParam(':image6', $image6, PDO::PARAM_STR);
	$stmt->bindParam(':image7', $image7, PDO::PARAM_STR);
	$stmt->bindParam(':image8', $image8, PDO::PARAM_STR);
	$stmt->bindParam(':videolink', $videolink, PDO::PARAM_STR);
	$stmt->bindParam(':text_en', $text_en, PDO::PARAM_STR);
	$stmt->bindParam(':text_ch', $text_ch, PDO::PARAM_STR);
	$stmt->bindParam(':online_retail', $online_retail, PDO::PARAM_STR);
	$stmt->bindParam(':online_agency', $online_agency, PDO::PARAM_STR);
	$stmt->bindParam(':online_wholesale', $online_wholesale, PDO::PARAM_STR);
	$stmt->bindParam(':price', $price, PDO::PARAM_STR);
	$stmt->bindParam(':color_type', $color_type, PDO::PARAM_STR);
	$stmt->execute();
	$OK=$stmt->rowCount();
	
	
	if($OK){
		$message_db="发布成功";
		//echo "db ok";
	}else{
		//echo "db no ok";
		$error=$stmt->errorInfo();
			if(isset($error[2])){
				$error=$error[2];
				//echo $error;
			}
	}	
}

?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>提交首饰信息</title>
<style>
body{
	font-family:Georgia, "Times New Roman", Times, serif;
	font-size:14px;
	font-weight:100;
	}

h1{
	position:relative;
	left:40px;
	font-family:Verdana, Geneva, sans-serif;
	font-weight:bold;
	font-size:20px;
	color:#000;
	margin-top:0px;
}
form{
	position:relative;
	left:40px;
	}

p{
	margin-top:30px;
	}
label{
	background-color:#fff0ff;
	}
.formbox{
	width:450px;}
.alert{
	font-family:"Courier New", Courier, monospace;
	font-size:14px;
	color:#F00;
	position:relative;
	left:40px;}
span{
	color:#F00;
	}
.logout{
	position:absolute;
	left:100%;
	top:20px;
	margin-left:-58px;}
.mnavic{
	position:absolute;
	left:380px;
	top:20px;
	}
.mnavic a{
	margin:10px;
	padding-left:5px;
	padding-right:5px;
	cursor:pointer;
	}
.mnavi{
	background-color:#CFF;
	border-style:outset;
	border-width:2px;
	font-family:Verdana, Geneva, sans-serif;
	font-size:12px;
	text-decoration: none;
	color:#000;
	}
.instruction{
	background-color:#FF9;
	color:#000;
	font-weight:bold;
	}
	
.progress { position:relative; width:260px; border: 1px solid #AAA; padding: 1px; border-radius: 3px; margin:12px 0px; display:none;}
.bar { background-color:#CCC; width:0%; height:13px; border-radius: 3px; background-image:url(../../_0_image_elements/animated-overlay.gif); }
.percent { position:absolute; display:inline-block; top:3px; left:48%; font-size:10px; display:none;}
#footer{
	margin:30px auto;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="formplugin.js"></script>
<script type="text/javascript">
tinymce.init({
    selector: "textarea#content_ch, textarea#content_en",
	theme: "modern",
    width: 500,
    height: 260,
    plugins: [
         "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
         "save table contextmenu directionality emoticons template paste textcolor"
    ],
    toolbar: "insertfile undo redo | fontsizeselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons"
 });
</script>

<script type="text/javascript">
$(document).ready(function(){
	
	$('input.image_selecting').change(function(e) {
		e.preventDefault(); 
		//check first if the file extension is correct
		var crr_form=$(this).parent('form');
		var filefullpath=$(this).val();
		var dotposition=filefullpath.lastIndexOf('.');
		var extension=filefullpath.substring(dotposition);
		if(extension=='.jpg' || extension=='.jpe' || extension=='.jpeg' || extension=='.JPG' || extension=='.JPEG' || extension=='.JPE' || extension=='.gif' || extension=='.GIF' || extension=='.png' || extension=='.PNG'){
			$('div.progress').fadeIn('fast');
			crr_form.submit();
		}else{
			alert("图片格式不支持，请上传. JPEG,. GIF 或. PNG 图片.");
		}		
	});
	
	
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
				$('div.progress').fadeOut('fast');
				
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);

				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					
					var imagename=status.find("p#imagename").html();
					var imagewhere=status.find("p#imagewhere").html();
					$("#img"+imagewhere).attr('src',('../images/sitepictures/'+imagename));
					$("#value_img_"+imagewhere).val(imagename);			
				}else{
					console.log(feedback);					
					alert("上传失败："+feedback);											  
				}
			}
		}); 
	})();
	
	
	
	
	$("#submit_article").click(function(){
		if(formcomplete()){
			$("form#addnewjewelry").submit();
		}
	});
});


function formcomplete(){
	
	
	
	
	
	if($.trim($('#name_ch').val())=='' || $.trim($('#name_en').val())==''){
		alert('请输入名称！');
		return false;
	}
	
	if($('#cate').val()=='undefined'){
		alert('请选择类别！');
		return false;
	}
	
	return true;
}

</script>


</head>

<body>
<!--
<div class="mnavic">

<a class="mnavi" href="index.php">SUBMISSION</a><a class="mnavi" href="list.php">MANAGEMENT</a>
<a class="mnavi" href="banner.php">BANNER</a>
</div>
-->
<?php
include('navi.php');
?>
<hr />

<h1>提交珠宝首饰信息</h1>
<?php 
if(isset($failure)){
    echo "<p class='alert'>"."$failure"."</p>";
}
if(isset($error)){
	//print_r($error);
    echo "<p class='alert'>"."$error"."</p>";
}
if(isset($message_db)){
	echo "<p class='alert'>"."$message_db"."</p>";
}


?>








<form action="" method="post" id="addnewjewelry">
  
  
  
  <p>
	<label>颜色分类</label>
	<select name="color_type" id="cate" style="font-size:18px;">
	<option value="white">白钻</option>
	<option value="fancy">彩钻</option>
	</select>
  </p>
  
  <p>
<label>类别</label><span>(必填)</span>
<select name="category" id="cate" style="font-size:18px;">
<option value="undefined">请选择...</option>
<?php
$sql_cate='SELECT * FROM jewelry_category';
foreach($conn->query($sql_cate) as $row_c){
?>
<option value="<?php echo $row_c['category_en']; ?>"><?php echo $row_c['category_cn']; ?></option>
<?php
}
?>
</select>
<label>子类</label>
<select name="jclass"  style="font-size:16px;">
<option value="undefined">请选择...</option>
<option value="jy" <?php if(strcmp($jclass,'jy')==0) echo 'selected="selected"';?>>简约独钻</option>
<option value="sh" <?php if(strcmp($jclass,'sh')==0) echo 'selected="selected"';?>>奢华群镶</option>
<option value="yx" <?php if(strcmp($jclass,'yx')==0) echo 'selected="selected"';?>>异形美钻</option>
</select>

<a href="list_jewelrycates.php" style="position:relative; display:inline-block; background-color:#FC0; padding:2px 8px; text-decoration:none; margin-left:20px; color:#FFF;">编辑类别</a>
  </p>
  
  
  
  <p>
<label>原品牌</label><span>(必填)</span>
<select name="brand" id="brand" style="font-size:18px;">
<option value="undefined">请选择...</option>
<?php
$sql_brand='SELECT * FROM jewelry_brands';
foreach($conn->query($sql_brand) as $row_b){
?>
<option value="<?php echo $row_b['brand_en']; ?>"><?php echo $row_b['brand_cn']; ?></option>
<?php
}
?>
</select>

<a href="list_jewelrybrands.php" style="position:relative; display:inline-block; background-color:#FC0; padding:2px 8px; text-decoration:none; margin-left:20px; color:#FFF;">编辑品牌</a>
  </p>
  
  <p>
  <label>发布到：</label><br>
  <input type="checkbox" name="online_retail" value="YES" checked="checked" /> 利美 （零售网站）<br />
  <input type="checkbox" name="online_agency" value="YES" checked="checked" /> BELGEM （代购网站）<br />
  <input type="checkbox" name="online_wholesale" value="YES" checked="checked" /> EDECENTER （批发网站）
  <!-- <input type="hidden" name="video" id="video" /> -->
  </p>
  
  
  
  <p>
  <label>名称（中文）</label><span>(必填)</span><br>
  <input name="name_ch" id="name_ch" type="text" class="formbox" size="200"/><br /><br />
  <label>名称（English）</label><span>(必填)</span><br>
  <input name="name_en" id="name_en" type="text" class="formbox" size="200"/>
  </p>
  
  
  
  
  
  <p>
  <label>内容（中文）</label><br>
  <textarea name="content_ch" id="content_ch"></textarea><br><br>
  <label>内容（English）</label><br>
  <textarea name="content_en" id="content_en"></textarea>
  </p>
  
  <input type="hidden" name="image1" id="value_img_1" value="" />
  <input type="hidden" name="image2" id="value_img_2" value="" />
  <input type="hidden" name="image3" id="value_img_3" value="" />
  <input type="hidden" name="image4" id="value_img_4" value="" />
  <input type="hidden" name="image5" id="value_img_5" value="" />
  <input type="hidden" name="image6" id="value_img_6" value="" />
  <input type="hidden" name="image7" id="value_img_7" value="" />
  <input type="hidden" name="image8" id="value_img_8" value="" />
  
  <p>
  <label>视频嵌入代码</label><br>
  <textarea  id="video_input" style="width:400px; height:100px;" name="video"></textarea>
  <!-- <input type="hidden" name="video" id="video" /> -->
  </p>
  
  <p>
  <label>价格（欧元）</label><br>
  <input name="price" id="price" type="text" class="formbox" size="200" style="width:120px;"/> €
  </p>
  
  
</form> 



<div class="picture" style="position:relative;">
    <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage1" class="uploadImage"> 
    <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry1" />
        <img id="img1" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting1" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage2" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry2" />
        <img id="img2" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting2" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage3" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry3" />
        <img id="img3" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting3" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage4" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry4" />
        <img id="img4" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting4" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage5" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry5" />
        <img id="img5" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting5" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage6" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry6" />
        <img id="img6" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting6" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage7" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry7" />
        <img id="img7" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting7" class="image_selecting">                
    </form>
    
     <form action="uploadingimage.php" method="post" enctype="multipart/form-data" id="uploadImage8" class="uploadImage"> 
     <label>添加图片:</label>
        <input type="hidden" name="picturewhere" value="jewelry8" />
        <img id="img8" width="58" src="../images/sitepictures/noimage.jpg" />
        <input type="file" name="image" id="image_selecting8" class="image_selecting">                
    </form>
    
    
    
    <div class="progress" style="width:300px; position:relative; top:-320px; left:488px;">
    <p>上传中</p>
        <div class="bar"></div >
        <div class="percent">0%</div >
    </div>    
</div>




<p style="padding-left:40px; padding-top:30px;">
<button type="button" id="submit_article" style="font-size:18px; font-weight:bold; padding:12px 50px; background-color:#CC6699; color:#FFF; border-width:1px;"> 提交 </button>
</p>
  
  

<div id="status" style="display:none"></div>
<div id="iframecontainer" style="display:none;"></div>
<br /><br /><br /><br /><br /><br />
</body>
</html>