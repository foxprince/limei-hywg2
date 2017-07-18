<?php
if(!isset($_POST['keyword'])){
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


$keyword=$_POST['keyword'];
//$sortby='BYCONTACT';


require_once('../cn/connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");


$sql='SELECT clients_list.id AS theuserID, clients_list.wechat_open_id AS weixin_openID, clients_list.wechat_name, clients_list.name, clients_list.sex, clients_list.tel, clients_list.email, clients_list.reference, clients_list.address, clients_list.subscribed_time, clients_list.suscribe_status, clients_list.more_info, icon, wechat_record.client_id, wechat_record.wechat_open_id, wechat_record.CreateTime FROM clients_list, wechat_record WHERE clients_list.id = wechat_record.client_id AND (clients_list.wechat_name LIKE "%'.$keyword.'%" OR clients_list.name LIKE "%'.$keyword.'%" OR clients_list.more_info LIKE "%'.$keyword.'%" OR wechat_record.message LIKE "%'.$keyword.'%") GROUP BY clients_list.id ORDER BY wechat_record.CreateTime DESC';



foreach($conn->query($sql) as $row){
?>

<div class="clientinfo-container" id="client_<?php echo $row['theuserID']; ?>">
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
			$crr_client_id=$row['theuserID'];
			$sql_num_message='SELECT COUNT(message) AS num_message FROM wechat_record WHERE client_id = "'.$crr_client_id.'"';
			foreach($conn->query($sql_num_message) as $row_num_m){
				$num_message=$row_num_m['num_message'];
			}
			$sql_num_buy='SELECT COUNT(diamond) AS num_bought FROM purchase_record WHERE buyer = "'.$crr_client_id.'"';
			foreach($conn->query($sql_num_buy) as $row_num_b){
				$num_purchase=$row_num_b['num_bought'];
			}
			?>
        	消息:<span class="num_message"><?php echo $num_message; ?></span> &nbsp; &nbsp; &nbsp; 购买:<span class="num_purchase">
			<?php if($num_purchase>0){echo '<span class="realbuyer">'.$num_purchase.'</span>';}else{echo '0';} ?>
            </span>
        </p>
        
        
        
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
    
    <div class="client-action-buttons-box">
    <span class="registered-at" style="font-size:10px; color:#666; display:inline-block; margin-right:15px;">注册日期: <span style="color:#000; display:inline-block; padding:1px 3px; background-color:rgba(255,255,255,0.8);"><?php echo date_format(date_create($row['subscribed_time']),"Y/m/d"); ?></span></span>
    <button type="button" class="clientmanagebtn-history" onclick="showHistory('<?php echo $row['theuserID']; ?>')">历史</button>
    <button type="button" class="clientmanagebtn-choose" onclick="chooseDiamonds('<?php echo $row['theuserID']; ?>')">选钻</button>
    </div>
</div>

<div class="client-detial-info-box">


<p class="tel-container">电话: <?php echo $row['tel']; ?></p>
<p class="email-container">电邮: <?php echo $row['email']; ?></p>
<p class="address-container">地址:<br /><?php echo $row['address']; ?></p>
<p class="moreinfo-container">备注信息:<br />
<?php
echo $row['more_info'];
?>
</p>
<button type="button" class="clientmanagebtn-edit" onclick="editClient('<?php echo $row['theuserID']; ?>')">编辑信息</button>

</div>

</div>

<?php
}
?>
