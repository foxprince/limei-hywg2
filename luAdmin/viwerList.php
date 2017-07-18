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
include_once('../cn/connection.php');
$conn_dia=dbConnect('write','pdo');
$conn_dia->query("SET NAMES 'utf8'");
require_once('../cn/log.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美-预约管理</title>
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

<h3>预约列表</h3>


<?php
$page   = intval($_GET['page']);
$pagesize = 10;
$totalSql = "select count(*) as t from viewing_record where 1=1";
foreach($conn->query($totalSql) as $num){
	$result_number=$num[0];
}
$tpages=intval($result_number/$pagesize);
if(!$numrows%$pagesize) $tpages++;
$adjacents  = intval($_GET['adjacents']);
if($page<=0)  $page  = 1;
if($adjacents<=0) $adjacents = 5;
$reload = $_SERVER['PHP_SELF'] . "?tpages=" . $tpages . "&amp;adjacents=" . $adjacents;
$offset=$pagesize*($page - 1);
$sql="SELECT b.wechat_name,a.* FROM viewing_record a,clients_list b where a.viewer=b.id";
$sql = $sql." ORDER BY id DESC";
$sql = $sql." limit ".$offset.",".$pagesize;
$ooh=$conn->query($sql);
?>
<table>
<tr>
<td width="108" align="center" style="font-size:14px; background-color:#6CF">微信名</td>
<td width="108" align="center" style="font-size:14px; background-color:#6CF">分类</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">预约时间</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">总价</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">克拉</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">颜色</td>
<td width="258" align="center" style="font-size:14px; background-color:#6CF">净度</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">切割</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">抛光</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">对称性</td>
<td width="258" align="center" style="font-size:14px; background-color:#6CF">荧光</td>
<td width="100" align="center" style="font-size:14px; background-color:#6CF">证书</td>
<td width="258" align="center" style="font-size:14px; background-color:#6CF">价格</td>
</tr>
<?php
foreach($ooh as $row){
	$user_diamond = $row['diamond'];
	$user_jewellery_price = $row['jewellery_price'];
	$user_jewellery_id = $row['jewellery_id'];
	$user_view_time = $row['view_time'];
	$totalprice=$row['totalprice_in_currency'];
?>
<tr>
<td class="wechatname"><?php echo $row['wechat_name']; ?></td>
<td class="realname">
<?php if($user_jewellery_id==0) {echo "裸钻";} else {
			$sql_ring='SELECT name_ch FROM jewelry WHERE id = '.$user_jewellery_id;
			foreach($conn->query($sql_ring) as $r_r){
				$user_ring_name_ch=$r_r['name_ch'];
				$user_ring_image1=$r_r['image1'];
			}
			$demopiclink='/images/sitepictures/'.$user_ring_image1;
			echo $user_ring_name_ch;
		}	
		?>
</td>
<td align="center"><?php echo $user_view_time; ?></td>
<td align="center"><?php echo $totalprice; ?></td>

<?php
	$sql_dia='SELECT * FROM diamonds WHERE id = '.$user_diamond;
		foreach($conn_dia->query($sql_dia) as $r_d){
			$user_diamond_shape = $r_d['shape'];
			$user_diamond_color = $r_d['color'];
			$user_diamond_clarity = $r_d['clarity'];
			$user_diamond_carat = $r_d['carat'];
			$user_diamond_cut = $r_d['cut_grade'];
			$user_diamond_symmetry = $r_d['symmetry'];
			$user_diamond_polish = $r_d['polish'];
			$user_diamond_fluo = $r_d['fluorescence_intensity'];
			$user_diamond_price = $r_d['retail_price'];
			$user_diamond_grading_lab=$r_d['grading_lab'];
			$user_diamond_certificate_number=$r_d['certificate_number'];
		}

?>
<td align="center"><?php echo $user_diamond_carat; ?>克拉</td>
<td align="center"><?php echo $user_diamond_color; ?></td>
<td align="center"><?php echo $user_diamond_clarity; ?></td>
<td align="center"><?php echo $user_diamond_cut; ?></td>
<td align="center"><?php echo $user_diamond_polish; ?></td>
<td align="center"><?php echo $user_diamond_symmetry; ?></td>
<td align="center"><?php  echo $user_diamond_fluo; ?></td>
<td align="center"><?php echo $user_diamond_certificate_number; ?></td>
<td align="center"><?php echo $user_diamond_price; ?> 美元</p>
</tr>
<?php
}
?>

</table>


<p style="height:50px;">
<?php
echo "共".$result_number."条纪录，总".$tpages."页。";
include("pagination2.php");
echo paginate_two($reload, $page, $tpages, $adjacents);
?>
</p>
</body>
</html>

