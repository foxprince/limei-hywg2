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




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>珠宝类别目录</title>
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
a.modifybtn{
	display:inline-block;
	text-decoration:none;
	color:#FFF;
	padding:1px 8px;
	background-color:#CC6699;
	border-radius:4px;
}
a.modifybtn:hover{
	color:#000;
}
</style>
<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
function delete_jc($id){
	var r=confirm("确定删除该类别 ?");
	if(r){
		$("#indi").fadeIn('fast');
		$.post(         
			"deletejewelrycate.php", 
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

<h3>珠宝首饰类别页面</h3>


<p>
<!--
<a href="new_jewelry_category.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#9C9; color: #FFF; text-decoration:none; border-radius:6px;">＋添加首饰类型</a>
<a href="new_jewelry_brand.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#0CF; color: #FFF; text-decoration:none; border-radius:6px;">＋添加首饰原品牌</a>
<a href="new_jewelry.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none; border-radius:6px;">＋添加新首饰</a>
-->
</p>



<?php
$sql="SELECT * FROM jewelry_category ORDER BY id DESC";
$ooh=$conn->query($sql);
?>
<table>

<tr>
<td width="90" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">类别(英文)</td>
<td width="220" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">类别(中文)</td>
<td width="160" colspan="2" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">操作</td>
</tr>
<?php
foreach($ooh as $row){
?>
<tr id="record<?php echo $row['id']; ?>">
<td align="center"><?php echo $row['category_en']; ?></td>
<td align="center"><?php echo $row['category_cn']; ?></td>


<td align="center">

<button type="button" onclick="delete_jc('<?php echo $row['id']; ?>')">删除</button>
</td>
</tr>
<?php
}
?>

</table>
<p style="margin-top:30px;">
<a href="new_jewelry_category.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none; border-radius:6px;">+添加首饰类型</a>
</p>

<p id="indi" style="position:fixed; top:50px; left:50px; width:150px; text-align:center; padding: 12px 30px; border-style:solid; border-width:3px; border-color:#000; background-color:#FF9; font-size:24px; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; display:none;"> Saving ... </p>
<p style="height:50px;">&nbsp;</p>
</body>
</html>