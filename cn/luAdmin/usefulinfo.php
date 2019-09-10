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




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>文章目录</title>
<style type="text/css">
td{
	background:#FFF9FF;
	border-bottom-style:dotted;
	border-width:1px;
	border-color:#CC6699;
	padding:3px;
}
.filterbtn{
	display:inline-block;
}
a.editbtn{
	display:inline-block;
	text-decoration:none;
	color:#FFF;
	padding:1px 8px;
	background-color:#CC6699;
	border-radius:4px;
}
a.editbtn:hover{
	color:#000;
}
</style>
<script src="/cn/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
function delete_u($id){
	var r=confirm("确实要删除这篇文章?");
	if(r){
		$("#indi").fadeIn('fast');
		$.post(         
			"delete_usefulinfo.php", 
			{id: $id}, 
			function(data){
				//if the returned data indicates ok, then do the actions
				if(data=="ok"){
					alert("删除成功!");
					var Idtodelete="tr#record"+$id;
					$(Idtodelete).remove();
					$("#indi").fadeOut('fast');
				}else{
					alert(data);
					$("#indi").fadeOut('fast');
				}
			}
		);
	}
}
</script>
</head>

<body>


<?php
include('navi.php');
?>
<hr />

<h3>站内文章文章管理页面</h3>


<p>
<a href="new_usefulinfo.php" style="display:inline-block; padding:8px 25px; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none; border-radius:6px;">＋ 添加文章 | 新闻</a>
</p>

<br />
<p style="margin:20px 0 5px 0;">已发布文章</p>
<?php
$sql="SELECT * FROM usefulinfo ORDER BY id DESC";
$ooh=$conn->query($sql);
?>
<table>

<tr>
<td width="90" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">文章类别</td>
<td width="550" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">题目</td>
<td width="160" colspan="2" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">操作</td>
</tr>
<?php
foreach($ooh as $row){
?>
<tr id="record<?php echo $row['id']; ?>">
<td align="center">

<?php 
if($row['category']=='knowledge'){
	echo '钻石知识';
}else if($row['category']=='news'){
	echo '最新消息';
}else if($row['category']=='industry'){
	echo '产业新闻';
}else if($row['category']=='publicmedia'){
	echo '媒体报道';
}
?>


</td>
<td align="center"><?php echo $row['title_ch']; ?><br /><?php echo $row['title_en']; ?></td>
<td align="center"><a class="editbtn" href="<?php echo 'usefulinfo_edit.php?id='.$row['id']; ?>">修改</a></td>
<td align="center">
<!--
<a href="<?php echo 'jewelry_delete.php?id='.$row['id']; ?>"></a>
-->
<button type="button" onclick="delete_u('<?php echo $row['id']; ?>')">删除</button>
</td>
</tr>
<?php
}
?>

</table>

<p id="indi" style="position:fixed; top:50px; left:50px; width:150px; text-align:center; padding: 12px 30px; border-style:solid; border-width:3px; border-color:#000; background-color:#FF9; font-size:24px; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; display:none;"> Saving ... </p>
<p style="height:50px;">&nbsp;</p>
</body>
</html>