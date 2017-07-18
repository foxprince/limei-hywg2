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
<title>利美珠宝 最新消息列表</title>
<style type="text/css">
td{
	background:#EFF;
	padding:5px;
}
.filterbtn{
	display:inline-block;
}
</style>
<script src="http://edecenter.com/lab/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
function deleteNEWS($id){
	var theid=$id;
	var r=confirm("确定删除该条新闻记录?");
	if(r){
		$.post(         
			"delete_news.php", 
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

</script>
</head>

<body>


<?php
include('navi.php');
?>
<hr />

<h3>最新消息管理页面</h3>

<p>
<a href="index.php" style="display:inline-block; padding:3px 15px; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none;">＋发布新消息</a>
</p>



<?php
$sql="SELECT * FROM news ORDER BY id DESC";
$ooh=$conn->query($sql);
?>
<table>
<tr>
<td colspan="4" style="background-color:#FFF;">
已发布消息：
</td>
</tr>
<tr>
<td width="398" align="center" style="font-size:14px; background-color:#6CF">题目（中文）</td>
<td width="398" align="center" style="font-size:14px; background-color:#6CF">题目（英文）</td>
<td width="80" align="center" style="font-size:14px; background-color:#6CF">操作</td>
</tr>
<?php
foreach($ooh as $row){
?>
<tr id="r_<?php echo $row['id']; ?>">
<td><?php echo $row['title_ch']; ?></td>
<td><?php echo $row['title_en']; ?></td>
<td align="center"><button type="button" onclick="deleteNEWS('<?php echo $row['id']; ?>', '1')">删除</button></td>
</tr>
<?php
}
?>

</table>


<p style="height:50px;">&nbsp;</p>
</body>
</html>