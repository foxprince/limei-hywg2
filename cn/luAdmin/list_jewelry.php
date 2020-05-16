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
<title>珠宝首饰目录</title>
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
<script src="/js/jquery-1.11.2.min.js"></script>
<script src="/js/utils.js"></script>
<script type="text/javascript">
    function editPrice(editType,item) {
        var id = $(item).data("id");
        $(item).html('<input type="text" data-id="'+id+'" name="remark" value="'+$(item).text()+'" onchange="changePrice(\''+editType+'\',this)"/>');
        $(item).removeAttr("onclick");
    }
    function changePrice(editType,item) {
	    var id = $(item).data("id");
	    var price = $(item).val();
	    var p = $(item).parent();
        utils.ajaxPost('../action.php?id='+id+'&action=editJewelryPrice&editType=' + editType+'&price='+price, { type: 'POST'}, function (data) {
            $(p).html(price);
            $(p).attr("onclick","editPrice('"+editType+"',this)'");
        })
    }
function delete_j($id){
	var r=confirm("Are you sure to delete this submission ?");
	if(r){
		$("#indi").fadeIn('fast');
		$.post(         
			"deletejewelry.php", 
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

<h3>珠宝首饰管理页面</h3>


<p>
<a href="list_jewelrycates.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#9C9; color: #FFF; text-decoration:none; border-radius:6px;">管理首饰类型</a>
<a href="list_jewelrybrands.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#0CF; color: #FFF; text-decoration:none; border-radius:6px;">管理首饰原品牌</a>
<a href="new_jewelry.php" style="display:inline-block; padding:8px 35px; border-style:outset; border-width:1px; background-color:#CC6699; color: #FFF; text-decoration:none; border-radius:6px;">＋添加新首饰</a>
</p>



<?php
$sql="SELECT * FROM jewelry ORDER BY id DESC";
$ooh=$conn->query($sql);
?>
<table>

<tr>
<td width="80" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">颜色</td>
<td width="80" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">类别</td>
<td width="80" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">子类</td>
<td width="80" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">名称</td>
<td width="320" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">图片</td>
<td width="320" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">18K白金价格</td>
<td width="320" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">Pt950铂金价格</td>
<td width="160" colspan="2" align="center" style="font-size:14px; background-color:#CC6699; color:#FFF;">操作</td>
</tr>
<?php
foreach($ooh as $row){
	if($row['jclass']=='jy')
		$jclassName = "简约独钻";
	else if($row['jclass']=='sh')
		$jclassName = "奢华群镶";
	else if($row['jclass']=='yx')
		$jclassName = "异形美钻";
	else 
		$jclassName = "";
		
?>
<tr id="record<?php echo $row['id']; ?>">
<td align="center"><?php echo $row['color_type']; ?></td>
<td align="center"><?php echo $row['category']; ?></td>
<td align="center"><?php echo $jclassName; ?></td>
<td align="center"><?php echo $row['name_en']; ?><br /><?php echo $row['name_ch']; ?></td>
<td align="center">
<?php
if($row['image1']!=NULL && $row['image1']!='' && $row['image1']!="NO"){
?>
<img src="../images/sitepictures/<?php echo $row['image1']; ?>" height="116" />
<?php
}
if($row['image2']!=NULL && $row['image2']!='' && $row['image2']!="NO"){
?>
<img src="../images/sitepictures/<?php echo $row['image2']; ?>" height="116" />
<?php
}

if($row['image3']!=NULL && $row['image3']!='' && $row['image3']!="NO"){
?>
<img src="../images/sitepictures/<?php echo $row['image3']; ?>" height="116" />
<?php
}
?>

</td>
<td align="center" data-id="<?php echo $row['id']; ?>" onclick="editPrice('18k',this);"><?php echo $row['18k03'].','.$row['18k05'].','.$row['18k07'].','.$row['18k09'].','.$row['18k15'].','.$row['18k20']; ?></td>
<td align="center" data-id="<?php echo $row['id']; ?>" onclick="editPrice('Pt950',this);"><?php echo $row['pt03'].','.$row['pt05'].','.$row['pt07'].','.$row['pt09'].','.$row['pt15'].','.$row['pt20']; ?></td>
<td align="center"><a class="modifybtn" href="<?php echo 'jewelry_edit.php?id='.$row['id']; ?>">修改</a></td>
<td align="center">
<!--
<a href="<?php echo 'jewelry_delete.php?id='.$row['id']; ?>"></a>
-->
<button type="button" onclick="delete_j('<?php echo $row['id']; ?>')">删除</button>
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
