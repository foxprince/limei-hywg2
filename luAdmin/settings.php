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

require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$sql='SELECT * FROM settings';
foreach($conn->query($sql) as $row){
	$topimage=$row['topimage'];
	$newsimage=$row['newsimage'];
	$aboutimage=$row['aboutimage'];
	$knowledgeimage=$row['knowledgeimage'];
	$industryimage=$row['industryimage'];
	$contactimage=$row['contactimage'];
	
	$description_ch=$row['description_ch'];
	$description_en=$row['description_en'];
}
	
	

if(isset($_POST['topimage']) && isset($_POST['newsimage'])){
	
	$topimage=$_POST['topimage'];
	$newsimage=$_POST['newsimage'];
	$aboutimage=$_POST['aboutimage'];
	$knowledgeimage=$_POST['knowledgeimage'];
	$industryimage=$_POST['industryimage'];
	$contactimage=$_POST['contactimage'];
	
	$description_ch=$_POST['description_ch'];
	$description_en=$_POST['description_en'];
	
	
	$sql_update='UPDATE settings SET topimage = ?, newsimage=?, aboutimage=?, knowledgeimage=?, industryimage=?,contactimage=?, description_ch=?, description_en=?';
	
	
	$stmt=$conn->prepare($sql_update);	  
	
	
	$stmt->execute(array($topimage, $newsimage, $aboutimage, $knowledgeimage, $industryimage, $contactimage, $description_ch, $description_en));
	$OK=$stmt->rowCount();
	
	
	if($OK){
		$message_db="更新成功";
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
<title>文章发布</title>
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
h2{
	font-weight:bold;
	font-size:16px;
	margin:35px 0 5px 0;
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
	
#settingsform input{
	width:500px;
}
</style>
<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>


<script type="text/javascript">
$(document).ready(function(){
	
	$("#submit_article").click(function(){
		
			$("form#uploadArticle").submit();
		
	});
});


function formcomplete(){
	
	
	if($.trim($('#title').val())==''){
		alert('没有标题！');
		return false;
	}
	
	return true;
}

</script>


</head>

<body>

<?php
include('navi.php');
?>
<hr />

<h1>网站综合设定</h1>
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








<form action="" method="post" id="settingsform">
<h2>页面图片管理</h2>
<p style="margin-top:0;">请在右侧上传图片并把链接复制到相应的输入框中</p>
<p>
<label>页面顶部大图</label><span>(尺寸 1950 × 396 像素)</span><br /> 
<input type="text" name="topimage" id="topimage" value="<?php echo $topimage; ?>" /><br /> <br /> 

<label>最新消息页 侧面小图</label> <span></span><br />       
<input type="text" name="newsimage" id="newsimage" value="<?php echo $newsimage; ?>" />
<br /><br />
<label>品牌故事 侧面小图</label> <span></span><br />      
<input type="text" name="aboutimage" id="aboutimage" value="<?php echo $aboutimage; ?>" />
<br /> <br /> 
<label>钻石知识 侧面小图</label> <span></span>
<br />          
<input type="text" name="knowledgeimage" id="knowledgeimage" value="<?php echo $knowledgeimage; ?>" />
<br /> <br /> 
<label>产业新闻 侧面小图</label> <span></span>
<br />          
<input type="text" name="industryimage" id="industryimage" value="<?php echo $industryimage; ?>" />
<br /> <br /> 
<label>联系我们 侧面小图</label> <span></span>
<br />          
<input type="text" name="contactimage" id="contactimage" value="<?php echo $contactimage; ?>" />
</p>


<p style="color:#CC6699;">*** -------------------------------------------------------------------- ***</p>


  
 <h2>搜索引擎优化</h2>
 
  <p>  
  <label for="content_ch">网站描述文字（中文）</label> <span></span>
  <br />          
  <textarea name="description_ch" class="maitext" id="description_ch" cols="60" rows="8"><?php echo $description_ch; ?></textarea>  
  <br />
  </p>
  
  <p>  
  <label for="content_en">网站描述文字（英文）</label> <span></span>
  <br />          
  <textarea name="description_en" class="maitext" id="description_en" cols="60" rows="8"><?php echo $description_en; ?></textarea>   
  </p>
  
  

  
  
  <p>
    <input type="submit" id="submit_settings" style="font-size:18px; font-weight:bold; padding:12px 50px; background-color:#CC6699; color:#FFF; border-width:1px; width:200px;" value="保存更新" />
  </p>
  <br /><br /><br /><br /><br />
</form>


<iframe src="upload_sitepics.php" style="position:absolute; left:738px; width:380px; top:120px; height:980px; border-style:solid; border-color:#CC6699; border-width:1px;"></iframe>



</body>
</html>