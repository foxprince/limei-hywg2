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



if(isset($_POST['thisisdata'])){
	
	include('nuke_magic_quotes.php');	
	
	$p1_txt1 = $_POST['p1_txt1'];
	$p1_txt2 = $_POST['p1_txt2'];
	$p1_txt3 = $_POST['p1_txt3'];
	$p2_txt1 = $_POST['p2_txt1'];
	$p2_txt2 = $_POST['p2_txt2'];
	$p2_txt3 = $_POST['p2_txt3'];
	$p3_txt1 = $_POST['p3_txt1'];
	$p3_txt2 = $_POST['p3_txt2'];
	$p3_txt3 = $_POST['p3_txt3'];
	$p4_txt1 = $_POST['p4_txt1'];	
	$p4_txt2 = $_POST['p4_txt2'];
	$p4_txt3 = $_POST['p4_txt3'];
	
	
	$p1_img1 = $_POST['p1_img1'];
	$p1_img2 = $_POST['p1_img2'];
	$p1_img3 = $_POST['p1_img3'];
	$p2_img1 = $_POST['p2_img1'];
	$p2_img2 = $_POST['p2_img2'];
	$p2_img3 = $_POST['p2_img3'];
	$p3_img1 = $_POST['p3_img1'];
	$p3_img2 = $_POST['p3_img2'];	
	$p3_img3 = $_POST['p3_img3'];
	$p4_img1 = $_POST['p4_img1'];
	$p4_img2 = $_POST['p4_img2'];
	$p4_img3 = $_POST['p4_img3'];
	
	
	$p1_link1 = $_POST['p1_link1'];
	$p1_link2 = $_POST['p1_link2'];
	$p1_link3 = $_POST['p1_link3'];
	$p2_link1 = $_POST['p2_link1'];
	$p2_link2 = $_POST['p2_link2'];
	$p2_link3 = $_POST['p2_link3'];	
	$p3_link1 = $_POST['p3_link1'];
	$p3_link2 = $_POST['p3_link2'];
	$p3_link3 = $_POST['p3_link3'];
	$p4_link1 = $_POST['p4_link1'];
	$p4_link2 = $_POST['p4_link2'];
	$p4_link3 = $_POST['p4_link3'];
	

	$sql_update="UPDATE homepage SET 
	
	
	
	
	
	
	p1_txt1 = '".$p1_txt1."',
	p1_txt2 = '".$p1_txt2."',
	p1_txt3 = '".$p1_txt3."',
	p2_txt1 = '".$p2_txt1."',
	p2_txt2 = '".$p2_txt2."',
	p2_txt3 = '".$p2_txt3."',
	p3_txt1 = '".$p3_txt1."',
	p3_txt2 = '".$p3_txt2."',
	p3_txt3 = '".$p3_txt3."',
	p4_txt1 = '".$p4_txt1."',
	p4_txt2 = '".$p4_txt2."',
	p4_txt3 = '".$p4_txt3."',
	
	
	p1_img1 = '".$p1_img1."',
	p1_img2 = '".$p1_img2."',
	p1_img3 = '".$p1_img3."',
	p2_img1 = '".$p2_img1."',
	p2_img2 = '".$p2_img2."',
	p2_img3 = '".$p2_img3."',
	p3_img1 = '".$p3_img1."',
	p3_img2 = '".$p3_img2."',
	p3_img3 = '".$p3_img3."',
	p4_img1 = '".$p4_img1."',
	p4_img2 = '".$p4_img2."',
	p4_img3 = '".$p4_img3."',
	
	
	p1_link1 = '".$p1_link1."',
	p1_link2 = '".$p1_link2."',
	p1_link3 = '".$p1_link3."',
	p2_link1 = '".$p2_link1."',
	p2_link2 = '".$p2_link2."',
	p2_link3 = '".$p2_link3."',
	p3_link1 = '".$p3_link1."',
	p3_link2 = '".$p3_link2."',
	p3_link3 = '".$p3_link3."',
	p4_link1 = '".$p4_link1."',
	p4_link2 = '".$p4_link2."',
	p4_link3 = '".$p4_link3."'";
	
	
	
	
	$stmt=$conn->query($sql_update);
    $OK=$stmt->rowCount();
			


}
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>首页</title>
<style type="text/css">
td{
	background:#FeF0F9;
	border-style:solid;
	border-width:5px;
	border-color:#FFF;
	vertical-align:top;
	padding:5px;
}
td img{
	padding:5px;
	border-style:solid;
	background-color:#FFF;
	border-width:1px;
	border-color:#CC6699;
	margin-bottom:8px;s
}
.filterbtn{
	display:inline-block;
}


p.imgbox{
	position:relative;
	width:130px;
	height:158px;
	text-align:center;
	overflow:hidden;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="formplugin.js"></script>
<script type="text/javascript">
var crr_img;
$(document).ready(function(){
	
	$('input.image_selecting').change(function(e) {
		
		var crr_obj=$(this);
		crr_img=crr_obj.parent('form').children('input.picnumber').val();
		e.preventDefault(); 
		//check first if the file extension is correct
		var filefullpath=$(this).val();
		var dotposition=filefullpath.lastIndexOf('.');
		var extension=filefullpath.substring(dotposition);
		if(extension=='.jpg' || extension=='.jpe' || extension=='.jpeg' || extension=='.JPG' || extension=='.JPEG' || extension=='.JPE' || extension=='.gif' || extension=='.GIF' || extension=='.png' || extension=='.PNG'){
			crr_obj.parent('form').submit();
		}else{
			alert("图片格式不支持，请上传. JPEG,. GIF 或. PNG 图片.");
		}		
	});
	
	
	$('button#savehc').click(function(){
		//alert('abc');
		datasubmit();
		
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
				
				$('div#uploadingIndication').fadeOut('fast');
				$('button').removeAttr('disabled');
				status.html(xhr.responseText);
	
				var feedback=status.find("p.message").html();
				
				if(feedback=='OK'){
					var imgname=status.find("p#imagename").html();
					//alert(imgname);
					$('img#'+crr_img).attr('src',"../images/sitepictures/"+imgname);
					$('input#db_'+crr_img).val(imgname);
					//$('td#'+crr_idofpic+' div.'+crr_picnumber+'bosx').html('<span>aaa</span>');
				}else{
					var ttt=status.html();
					alert(ttt);				
					alert("未知错误，请重试");											  
				}
			}
		}); 
	})();
		
	
	
});

function formcomplete(){
	$('input.linkinput, input.textinput').each(function(){
		$crr_value=$(this).val();
		$crr_id=$(this).attr('id');
		$db_id='input#db_'+$crr_id;
		$($db_id).val($crr_value);
	});
	return true;
}

function datasubmit(){
	if(formcomplete()){
		//alert('dfdf');
		$('form#savedata').submit();
	}else{
		//alert('not complete');
	}
}
</script>
</head>

<body>


<?php
include('navi.php');
?>
<hr />

<h3>homepage管理页面</h3>

<p>中文  <a href="homepage_en.php">英文</a></p>

<?php
if(isset($OK)){
?>
<h3 style="color:#C00;">更新成功</h3>
<?php
}
?>



<?php
$sql="SELECT * FROM homepage ORDER BY id DESC";
$ooh=$conn->query($sql);
foreach($ooh as $row){}
?>





<form action="" method="post" enctype="multipart/form-data" id="savedata">

<input type="hidden" name="thisisdata" value="data" />


<input type="hidden" name="p1_txt1" id="db_p1_txt1" value="" />
<input type="hidden" name="p1_txt2" id="db_p1_txt2" value="" />
<input type="hidden" name="p1_txt3" id="db_p1_txt3" value="" />
<input type="hidden" name="p2_txt1" id="db_p2_txt1" value="" />
<input type="hidden" name="p2_txt2" id="db_p2_txt2" value="" />
<input type="hidden" name="p2_txt3" id="db_p2_txt3" value="" />
<input type="hidden" name="p3_txt1" id="db_p3_txt1" value="" />
<input type="hidden" name="p3_txt2" id="db_p3_txt2" value="" />
<input type="hidden" name="p3_txt3" id="db_p3_txt3" value="" />
<input type="hidden" name="p4_txt1" id="db_p4_txt1" value="" />
<input type="hidden" name="p4_txt2" id="db_p4_txt2" value="" />
<input type="hidden" name="p4_txt3" id="db_p4_txt3" value="" />

<input type="hidden" name="p1_img1" id="db_p1_img1" value="<?php echo $row['p1_img1']; ?>">
<input type="hidden" name="p1_img2" id="db_p1_img2" value="<?php echo $row['p1_img2']; ?>">
<input type="hidden" name="p1_img3" id="db_p1_img3" value="<?php echo $row['p1_img3']; ?>">
<input type="hidden" name="p2_img1" id="db_p2_img1" value="<?php echo $row['p2_img1']; ?>">
<input type="hidden" name="p2_img2" id="db_p2_img2" value="<?php echo $row['p2_img2']; ?>">
<input type="hidden" name="p2_img3" id="db_p2_img3" value="<?php echo $row['p2_img3']; ?>">
<input type="hidden" name="p3_img1" id="db_p3_img1" value="<?php echo $row['p3_img1']; ?>">
<input type="hidden" name="p3_img2" id="db_p3_img2" value="<?php echo $row['p3_img2']; ?>">
<input type="hidden" name="p3_img3" id="db_p3_img3" value="<?php echo $row['p3_img3']; ?>">
<input type="hidden" name="p4_img1" id="db_p4_img1" value="<?php echo $row['p4_img1']; ?>">
<input type="hidden" name="p4_img2" id="db_p4_img2" value="<?php echo $row['p4_img2']; ?>">
<input type="hidden" name="p4_img3" id="db_p4_img3" value="<?php echo $row['p4_img3']; ?>">

<input type="hidden" name="p1_link1" id="db_p1_link1" value="" />
<input type="hidden" name="p1_link2" id="db_p1_link2" value="" />
<input type="hidden" name="p1_link3" id="db_p1_link3" value="" />
<input type="hidden" name="p2_link1" id="db_p2_link1" value="" />
<input type="hidden" name="p2_link2" id="db_p2_link2" value="" />
<input type="hidden" name="p2_link3" id="db_p2_link3" value="" />
<input type="hidden" name="p3_link1" id="db_p3_link1" value="" />
<input type="hidden" name="p3_link2" id="db_p3_link2" value="" />
<input type="hidden" name="p3_link3" id="db_p3_link3" value="" />
<input type="hidden" name="p4_link1" id="db_p4_link1" value="" />
<input type="hidden" name="p4_link2" id="db_p4_link2" value="" />
<input type="hidden" name="p4_link3" id="db_p4_link3" value="" />
         
</form>

<br />
















<div id="page1" class="homepagebox">

<table cellspacing="0" cellpadding="0" border="1">

<tr>

<td width="230" align="center">

<p class="imgbox"><img id="p1_img1" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p1_img1']; ?>" /></p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p1_img1">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p1_link1" value="<?php echo $row['p1_link1']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p1_txt1" value="<?php echo $row['p1_txt1']; ?>" />
</p>

</td>



<td width="230" align="center">


<p class="imgbox"><img id="p1_img2" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p1_img2']; ?>" /></p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p1_img2">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p1_link2" value="<?php echo $row['p1_link2']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p1_txt2" value="<?php echo $row['p1_txt2']; ?>" />
</p>


</td>





<td width="230" align="center">


<p class="imgbox"><img id="p1_img3" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p1_img3']; ?>" /></p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p1_img3">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p1_link3" value="<?php echo $row['p1_link3']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p1_txt3" value="<?php echo $row['p1_txt3']; ?>" />
</p>


</td>

</tr>

</table>


</div>





















<div id="page2" class="homepagebox">

<table cellspacing="0" cellpadding="0" border="1">

<tr>

<td width="230" align="center">
<p class="imgbox">
<img id="p2_img1" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p2_img1']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p2_img1">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p2_link1" value="<?php echo $row['p2_link1']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p2_txt1" value="<?php echo $row['p2_txt1']; ?>" />
</p>

</td>



<td width="230" align="center">

<p class="imgbox">
<img id="p2_img2" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p2_img2']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p2_img2">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p2_link2" value="<?php echo $row['p2_link2']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p2_txt2" value="<?php echo $row['p2_txt2']; ?>" />
</p>


</td>





<td width="230" align="center">

<p class="imgbox">
<img id="p2_img3" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p2_img3']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p2_img3">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p2_link3" value="<?php echo $row['p2_link3']; ?>" />
</p>


<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p2_txt3" value="<?php echo $row['p2_txt3']; ?>" />
</p>


</td>

</tr>

</table>


</div>


















<div id="page3" class="homepagebox">

<table cellspacing="0" cellpadding="0" border="1">

<tr>

<td width="230" align="center">
<p class="imgbox">
<img id="p3_img1" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p3_img1']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p3_img1">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p3_link1" value="<?php echo $row['p3_link1']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p3_txt1" value="<?php echo $row['p3_txt1']; ?>" />
</p>

</td>



<td width="230" align="center">

<p class="imgbox">
<img id="p3_img2" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p3_img2']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p3_img2">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p3_link2" value="<?php echo $row['p3_link2']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p3_txt2" value="<?php echo $row['p3_txt2']; ?>" />
</p>


</td>



<td width="230" align="center">


<img id="p3_img3" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p3_img3']; ?>" />
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p3_img3">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p3_link3" value="<?php echo $row['p3_link3']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p3_txt3" value="<?php echo $row['p3_txt3']; ?>" />
</p>


</td>

</tr>

</table>


</div>






















<div id="page4" class="homepagebox" style="display:none;">

<table cellspacing="0" cellpadding="0" border="1">

<tr>

<td width="230" align="center">
<p class="imgbox">
<img id="p4_img1" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p4_img1']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p4_img1">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p4_link1" value="<?php echo $row['p4_link1']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p4_txt1" value="<?php echo $row['p4_txt1']; ?>" />
</p>

</td>



<td width="230" align="center">

<p class="imgbox">
<img id="p4_img2" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p4_img2']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p4_img2">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p4_link2" value="<?php echo $row['p4_link2']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p4_txt2" value="<?php echo $row['p4_txt2']; ?>" />
</p>


</td>



<td width="230" align="center">

<p class="imgbox">
<img id="p4_img3" width="118" class="imagehomepage" src="../images/sitepictures/<?php echo $row['p4_img3']; ?>" />
</p>
<form action="uploadingimage.php" method="post" enctype="multipart/form-data" class="uploadImage"> 
<label>更新图片:</label>
<input type="hidden" name="picturewhere" class="picnumber" value="p4_img3">
<input type="file" name="image" class="image_selecting">                
</form>

<p class="linkbox">
link: <input type="text" class="linkinput" id="p4_link3" value="<?php echo $row['p4_link3']; ?>" />
</p>

<p class="txtbox">
text(可选): <input type="text" class="textinput" id="p4_txt3" value="<?php echo $row['p4_txt3']; ?>" />
</p>


</td>

</tr>

</table>


</div>







<button type="button" id="savehc" style="font-size:18px; font-weight:bold; padding:12px 50px; background-color:#CC6699; color:#FFF; border-width:1px;">保存更新</button>


<div class="progress" style="width:140px; position:absolute; top:120px; left:750px;">
    <div class="bar"></div >
    <div class="percent">0%</div >
</div>   
<div id="status" style="display:none"></div>


<p style="height:50px;">&nbsp;</p>
</body>
</html>