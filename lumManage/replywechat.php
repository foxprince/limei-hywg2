<?php
if(!isset($_POST['clientID']) || !isset($_POST['message'])){
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



require_once('../connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");

$crr_c_id=$_POST['clientID'];
$crr_message=$_POST['message'];


$sql_w_openid='SELECT wechat_open_id, wechat_name, reference FROM clients_list WHERE id = "'.$crr_c_id.'"';
foreach($conn->query($sql_w_openid) as $row_check){
	$wechatopenidofuser=$row_check['wechat_open_id'];
	$wechatnameofuser=$row_check['wechat_name'];
	$weChatAccount=$row_check['reference'];
}

if($weChatAccount=='FINAL-WECHAT'){
	require_once('getaccesstoken2015.php');
}else{
	require_once('getaccesstoken.php');
}


$urltopost='https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='.$theaccesstoken;

//$messageToPost=iconv('UTF-16', 'UTF-8', $crr_message);
//$trans_sentence = iconv('UTF-8', 'ASCII//TRANSLIT', $utf8_sentence);
//$data = array("touser" => $wechatopenidofuser, "msgtype" => "text", "text" => array("content"=>$crr_message)); 
$data = '{
        "touser":"'.$wechatopenidofuser.'",
        "msgtype":"text",
        "text":
        {
             "content":"'.$crr_message.'"
        }
    }';
                                                                  
//$data_string = json_encode($data);                                                                                   
 
$ch = curl_init($urltopost);     
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);                                                                                                                   
 
$result = curl_exec($ch);
//echo '<!-- '.$result.'-->';
$obj_reply = json_decode($result);
$reply_feedback=$obj_reply->{'errmsg'};

if(trim($reply_feedback)=='ok'){
	$sql_insert='INSERT INTO wechat_record (client_id, wechat_open_id, wechat_name, message, CreateTime, MsgType, MsgId, MediaId, Format, ThumbMediaId, Location_X, Location_Y, Label, Title, Description, message_direction, if_wechat, message_read) VALUES(:client_id, :wechat_open_id, :wechat_name, :message, NOW(), :MsgType, :MsgId, :MediaId, :Format, :ThumbMediaId, :Location_X, :Location_Y, :Label, :Title, :Description, :message_direction, :if_wechat, :message_read)';
	
	$MsgType='text';
	$MsgId='-';
	$MediaId='-';
	$Format='-';
	$ThumbMediaId='-';
	$Location_X='-';
	$Location_Y='-';
	$Label='-';
	$Title='-';
	$Description='-';
	$message_direction='GOING';
	$if_wechat='NEW';
	$message_read="YES";
	
	$stmt=$conn->prepare($sql_insert);	  
	
	$stmt->bindParam(':client_id', $crr_c_id, PDO::PARAM_STR);
	$stmt->bindParam(':wechat_open_id', $wechatopenidofuser, PDO::PARAM_STR);
	$stmt->bindParam(':wechat_name', $wechatnameofuser, PDO::PARAM_STR);
	$stmt->bindParam(':message', $crr_message, PDO::PARAM_STR);
	$stmt->bindParam(':MsgType', $MsgType, PDO::PARAM_STR);
	$stmt->bindParam(':MsgId', $MsgId, PDO::PARAM_STR);
	$stmt->bindParam(':MediaId', $MediaId, PDO::PARAM_STR);
	$stmt->bindParam(':Format', $Format, PDO::PARAM_STR);
	$stmt->bindParam(':ThumbMediaId', $ThumbMediaId, PDO::PARAM_STR);
	$stmt->bindParam(':Location_X', $Location_X, PDO::PARAM_STR);
	$stmt->bindParam(':Location_Y', $Location_Y, PDO::PARAM_STR);
	$stmt->bindParam(':Label', $Label, PDO::PARAM_STR);
	$stmt->bindParam(':Title', $Title, PDO::PARAM_STR);
	$stmt->bindParam(':Description', $Description, PDO::PARAM_STR);
	$stmt->bindParam(':message_direction', $message_direction, PDO::PARAM_STR);
	$stmt->bindParam(':if_wechat', $if_wechat, PDO::PARAM_STR);
	$stmt->bindParam(':message_read', $message_read, PDO::PARAM_STR);
	
	$stmt->execute();
	$OK=$stmt->rowCount();
}

if($OK){
	echo 'ok';
}else{
	echo 'error';
}