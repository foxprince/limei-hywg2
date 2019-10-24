<?php
/* ===================session======================== */
session_start ();

if (isset ( $_POST ['logout'] )) {
	if (isset ( $_SESSION ['authenticated'] )) {
		$_SESSION = array ();
		if (isset ( $_COOKIE [session_name ()] )) {
			setcookie ( session_name (), '', time () - 86400, '/' );
		}
		session_destroy ();
	}
	header ( 'Location: login.php' );
	exit ();
}

// if session variable not set, redirect to login page
if (! isset ( $_SESSION ['authenticated'] )) {
	header ( 'Location: login.php' );
	exit ();
}

if ($_SESSION ['authenticated'] != 'SiHui') {
	$_SESSION = array ();
	if (isset ( $_COOKIE [session_name ()] )) {
		setcookie ( session_name (), '', time () - 86400, '/' );
	}
	session_destroy ();
	header ( 'Location: login.php' );
	exit ();
}

require_once ('../cn/connection.php');
$conn = dbConnect ( 'write', 'pdo' );
$conn->query ( "SET NAMES 'utf8'" );

require_once ('../cn/log.php');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美-客户信息管理</title>
<style type="text/css">
td {
	background: #EFF;
	padding: 5px;
}

.filterbtn {
	display: inline-block;
}
</style>
<script src="/js/jquery-1.11.2.min.js"></script>
<script src="/fancyBox/lib/jquery.mousewheel-3.0.6.pack.js"></script>
<link rel="stylesheet" href="/fancyBox/source/jquery.fancybox.css" />
<script type="text/javascript">
$(document).ready(function(){
	$("img.qrImg").click(function(){
		var qrImg=$(this).attr('id')+".jpg";
		htmlobj=$.ajax({url:"./qrcode/"+qrImg,async:false});
		$("#myDiv"+$(this).attr('id')).html(htmlobj.responseText);
	});
	$("a.createQrcode").click(function() {
		$(this).html('<img width="25px" src="../images/site_elements/loadingGraphic.gif" />');
		$(this).removeClass("createQrcode");
		var btnId=$(this).attr('id');
		$.post("createQrcode.php",
			{id: btnId},
			function(data){
				if($.trim(data)=='OK'){
					alert('生成成功');
					$('td[id='+btnId+']').focus().select();
					$('td[id='+btnId+']').html('<a id="qr_image" href="./qrcode/'+btnId+'.jpg" target="_blank" title="点击查看大图"><span style="color: red"><img width="100" height="100" src="./qrcode/'+btnId+'_200x200.jpg"/></span></a>');
				}else{
					alert('Server is busy, please try later!');
				}
			}
		);
	});
	$("#qr_image").fancybox();

});
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
include ('navi.php');
?>
<hr />
  <h3>微信客户管理：</h3>
  <form action="./clients.php" id="addnew">
    <p>
      <label>微信名称:</label> <input name="wechatName" id="cate_cn" type="text" class="formbox"
        value="<?php echo $wechat_name?>" /> <label>二维码:</label> <select name="isSetQrcode"><option value="2">全部</option>
        <option value="1" <?php $isSetQrcode==1?"selected":""?>>已生成</option>
        <option value="0" <?php $isSetQrcode==0?"selected":""?>>未生成</option></select> <input type="submit"
        id="submit_article" value="search" style="font-size: 24px; font-weight: bold; padding: 5px 20px;" />
    </p>
  </form>



<?php
$page = intval ( $_GET ['page'] );
$pagesize = 10;
$totalSql = "select count(*) as t from clients_list where 1=1";
$isSetQrcode = 2;
if (isset ( $_GET ['isSetQrcode'] ))
	$isSetQrcode = $_GET ['isSetQrcode'];
if (isset ( $_GET ['wechatName'] ) && $_GET ['wechatName'] != '') {
	$totalSql = $totalSql . "  and (wechat_name like '%" . $_GET ['wechatName'] . "%' or wechat_open_id like '%" . $_GET ['wechatName'] . "%')";
}
if (isset ( $_GET ['referee'] )) {
	$totalSql = $totalSql . "  and referee = '" . $_GET ['referee'] . "'";
}
if ($isSetQrcode == 1)
	$totalSql = $totalSql . " and qrcode is not null";
logger ( $totalSql );
foreach ( $conn->query ( $totalSql ) as $num ) {
	$result_number = $num [0];
}
$tpages = intval ( $result_number / $pagesize );
if (! $result_number % $pagesize)
	$tpages ++;
$adjacents = intval ( $_GET ['adjacents'] );
if ($page <= 0)
	$page = 1;
if ($adjacents <= 0)
	$adjacents = 5;
$reload = $_SERVER ['PHP_SELF'] . "?tpages=" . $tpages . "&amp;adjacents=" . $adjacents;
if (isset ( $_GET ['wechatName'] ))
	$reload .= "&wechatName" . $_GET ['wechatName'];
if (isset ( $_GET ['referee'] ))
	$reload .= "&referee" . $_GET ['referee'];
if ($isSetQrcode == 1)
	$reload .= "&isSetQrcode=1";
$offset = $pagesize * ($page - 1);
$sql = "SELECT a.* FROM clients_list a where 1=1";
if (isset ( $_GET ['wechatName'] ) && $_GET ['wechatName'] != '') {
	$sql = $sql . " and a.wechat_name like '%" . $_GET ['wechatName'] . "%'";
}
if ($isSetQrcode == 1)
	$sql = $sql . " and qrcode is not null";
if (isset ( $_GET ['referee'] )) {
	$sql = $sql . "  and referee = '" . $_GET ['referee'] . "'";
}
$sql = $sql . " ORDER BY id DESC";
$sql = $sql . " limit " . $offset . "," . $pagesize;
$ooh = $conn->query ( $sql );
?>
<table>
    <tr>
      <td colspan="4" style="background-color: #FFF;">微信客户列表：</td>
    </tr>
    <tr>
      <td width="108" align="center" style="font-size: 14px; background-color: #6CF">ID</td>
      <td width="108" align="center" style="font-size: 14px; background-color: #6CF">微信名</td>
      <td width="108" align="center" style="font-size: 14px; background-color: #6CF">实名</td>
      <td width="100" align="center" style="font-size: 14px; background-color: #6CF">注册时间</td>
      <td width="100" align="center" style="font-size: 14px; background-color: #6CF">账户状态</td>
      <td width="100" align="center" style="font-size: 14px; background-color: #6CF">推荐人</td>
      <td width="100" align="center" style="font-size: 14px; background-color: #6CF">二维码</td>
      <td width="258" align="center" style="font-size: 14px; background-color: #6CF">行为记录</td>
    </tr>
<?php
foreach ( $ooh as $row ) {
	?>

<tr id="<?php echo $row['wechat_open_id']; ?>">
      <td align="center"><?php echo $row['id']; ?></td>
      <td class="wechatname"><?php echo $row['wechat_name']; ?></td>
      <td class="realname"><?php echo $row['name']; ?></td>
      <td align="center"><?php echo $row['subscribed_time']; ?></td>
      <td align="center"><?php echo $row['suscribe_status']; ?></td>
      <td align="center">
<?php
	if ($row ['referee']) {
		$tsql = "select wechat_name from clients_list where id=" . $row ['referee'];
		foreach ( $conn->query ( $tsql ) as $row_history ) {
			$referee_name = $row_history [0];
		}
		echo $referee_name;
	}
	?>
</td>
      <td align="center" id="<?php echo $row['id'] ?>">
	<?php
	if ($row ['qrcode']) {
		$sql_history = 'SELECT COUNT(*) AS num FROM clients_list WHERE referee = "' . $row ['id'] . '"';
		foreach ( $conn->query ( $sql_history ) as $row_history ) {
			$num = $row_history ['num'];
		}
		?>
		
		<a id="qr_image" title="点击查看大图" href="./qrcode/<?php echo $row['qrcode'] ?>" target="_blank"></a>
		<img class="qrImg" id="<?php echo $row['id'] ?>" width="100" height="100" src="./qrcode/<?php echo $row['id'] ?>_200x200.jpg" /><br /> 
          共推荐<a href="clients.php?referee=<?php echo $row['id'] ?>"><?php echo $num ?></a>用户<br/> 
          <div id="myDiv<?php echo $row['id'] ?>"></div>
        <a href="#" id="<?php echo $row['id'] ?>" class="createQrcode">重新生成</a>

	<?php
	} else {
		?><a href="#" id="<?php echo $row['id'] ?>" class="createQrcode">生成</a><?php
	}
	?>

</td>
      <td align="center">
<?php
	$sql_history = 'SELECT COUNT(*) AS num FROM wechat_record WHERE wechat_open_id = "' . $row ['wechat_open_id'] . '"';
	foreach ( $conn->query ( $sql_history ) as $row_history ) {
		$num = $row_history ['num'];
	}
	if ($num > 0) {
		?>
该用户发送过<?php echo $num; ?>条信息。

<a href="clientrecords.php?user=<?php echo $row['wechat_open_id']; ?>">历史记录</a>

<?php
	} else {
		?>

该用户没有历史记录。

<?php
	}
	?>
</td>
    </tr>
<?php
}
?>

</table>
  <p style="height: 50px;">
<?php
echo "共" . $result_number . "条纪录，总" . $tpages . "页。";
include ("pagination2.php");
echo paginate_two ( $reload, $page, $tpages, $adjacents );
?>
</p>
</body>
</html>
