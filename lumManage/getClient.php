<?php
if(!isset($_POST['id'])){
	exit('ERROR');
}

session_start();
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit('ERROR');
}
if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	if (isset($_COOKIE['limei112233'])){
		setcookie('limei112233', '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit('ERROR');
}


$id=$_POST['id'];
//$sortby='BYCONTACT';


require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql='SELECT * FROM clients_list WHERE id = "'.$id.'"';


foreach($conn->query($sql) as $row){
?>

<div class="clientinfo-container" id="client_<?php echo $id; ?>">

<?php
if($row['reference']=='NEW-WECHAT'){
?>
<span style="position:absolute; top:-2px; right:2px; font-size:9px; color:#999; font-style:italic;">旧平台</span>
<?php
}else if($row['reference']=='FINAL-WECHAT'){
?>
<span style="position:absolute; top:2px; right:2px; display:inline-block; background-color:#FF8; width:12px; height:12px; border-radius:100%;"></span>
<?php
}
?>

<div class="clientbasicinfobox">
    <div class="clientbasicinfo">
        <p class="namecontainer">
        	实名:<span class="thename">
            <?php
				if($row['name']=='' || $row['name']==NULL || $row['name']=='-'){ echo '<span class="unknown-name">未知</span>';}else{echo $row['name'];}
			?>
            </span>
        </p>
        
        <p class="weixinnamecontainer">
        	<?php
            if($row['sex']==1){
            ?>
            <img class="sexicon" src="manicon.png" />
            <?php
            }else if($row['sex']==2){
            ?>
            <img class="sexicon" src="womanicon.png" />
            <?php
            }
            ?>
        
        	<span class="theweixinname">
            <?php
				if($row['wechat_name']=='' || $row['wechat_name']==NULL || $row['wechat_name']=='-'){ echo '<span class="unknown-name">未知</span>';}else{echo $row['wechat_name'];}
			?>
            </span>
        </p>
        
        <p class="actionnumbers">
        	<?php
			$sql_num_message='SELECT COUNT(message) AS num_message FROM wechat_record WHERE client_id = "'.$id.'"';
			foreach($conn->query($sql_num_message) as $row_num_m){
				$num_message=$row_num_m['num_message'];
			}
			$sql_num_buy='SELECT COUNT(diamond) AS num_bought FROM purchase_record WHERE buyer = "'.$id.'"';
			foreach($conn->query($sql_num_buy) as $row_num_b){
				$num_purchase=$row_num_b['num_bought'];
			}
			?>
        	消息:<span class="num_message"><?php echo $num_message; ?></span> &nbsp; &nbsp; &nbsp; 购买:<span class="num_purchase">
			<?php if($num_purchase>0){echo '<span class="realbuyer">'.$num_purchase.'</span>';}else{echo '0';} ?>
            </span>
        </p>
       
    </div>
    
    <div class="client-action-buttons-box">
    <span class="registered-at" style="font-size:10px; color:#666; display:inline-block; margin-right:15px;">注册日期: <span style="color:#000; display:inline-block; padding:1px 3px; background-color:rgba(255,255,255,0.8);"><?php echo date_format(date_create($row['subscribed_time']),"Y/m/d"); ?></span></span>
    <button type="button" class="clientmanagebtn-history" onclick="showHistory('<?php echo $id; ?>')">历史</button>
    <button type="button" class="clientmanagebtn-choose" onclick="chooseDiamonds('<?php echo $id; ?>')">选钻</button>
    </div>
    
    <?php
	if($row['icon']!='' &&  trim($row['icon'])!='not set yet'){
	?>
	<span class="user-icon">
	<img src="<?php echo $row['icon']; ?>" />
	</span>
	<?php
	}else{
		echo '<!-- no icon -->';
	}
	?>
</div>

<div class="client-detial-info-box">
<p class="address-container">地址: <span class="info-txt"><?php echo $row['address']; ?></span></p>

<p class="tel-container">电话: <span class="info-txt"><?php echo $row['tel']; ?></span></p>
<p class="email-container">电邮: <span class="info-txt"><?php echo $row['email']; ?></span></p>
<p class="moreinfo-container">备注信息:<br />
<?php
echo $row['more_info'];
?>
</p>
<button type="button" class="clientmanagebtn-edit" onclick="editClient('<?php echo $id; ?>')">编辑信息</button>

</div>

</div>

<?php
}
?>
