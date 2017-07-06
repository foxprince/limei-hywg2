<?php
include_once 'log.php';
require 'mail/PHPMailerAutoload.php';
require("mail/class.phpmailer.php");
require("mail/class.smtp.php");
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
$userid = $_COOKIE["userId"];
if (isset($_COOKIE["userId"]))
	$userid = $_COOKIE["userId"];
else
	$userid = $_COOKIE["everUserId"];
if($_REQUEST['action']) {
	$action = $_REQUEST['action'];
	switch($action) {
		case "event20170526List":
			$userhistory='SELECT id,wechat_name from clients_list  where suscribe_status!="unsuscribe" and more_info="20170526wenzhou"';
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$itemList=array();
			if($historyfound){
				foreach($stmt_history as $row_history){
					$itemList[]=$row_history;
				}
			}
			echo json_encode($itemList);
			break;
		case "event20170526Draw"://抽奖
			$grade = $_REQUEST['grade'];
			$sql = 'SELECT t1.id,t1.wechat_name FROM clients_list as t1 where suscribe_status!="unsuscribe" and more_info="20170526wenzhou"  ORDER BY RAND() LIMIT '.$_REQUEST['number']; // $fromUsername
			$stmt = $conn->prepare ( $sql );
			$stmt->execute ();
			$found=$stmt->rowCount();
			$itemList=array();
			if($found){
				foreach($stmt as $row){
					$itemList[]=$row;
				}
			}
			$idList="(";
			for($i = 0 ;$i < count($itemList);$i++){
				$idList .= $itemList[$i]['id'];
				if($i<count($itemList)-1)
					$idList .=",";
			}
			$idList .= ")";
			$sql = 'UPDATE clients_list SET more_info = "20170526wenzhou_grade_'.$grade.'" WHERE id in '.$idList; // $fromUsername
			$stmt = $conn->prepare ( $sql );$stmt->execute();
			echo json_encode($itemList);
			break;
		case "event20170526Cancel"://取消获奖资格
			$sql = 'UPDATE clients_list SET more_info = "20170526wenzhou_Cancel" WHERE id = '.$_REQUEST['id']; // $fromUsername
			logger($sql);
			$stmt = $conn->prepare ( $sql );
			$stmt->execute ();
			echo "OK";
			break;
		case "recommendDia":
			$userhistory='SELECT * from diamonds  where visiable=1 limit 0,2';
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$itemList=array();
			if($historyfound){
				foreach($stmt_history as $row_history){
					$itemList[]=$row_history;
				}
			}
			echo json_encode($itemList);
			break;
		case "recommendJew":
			$userhistory='SELECT * from jewelry where category="'.$_REQUEST['jewType'].'"  limit 0,2';
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$itemList=array();
			if($historyfound){
				foreach($stmt_history as $row_history){
					$itemList[]=$row_history;
				}
			}
			echo json_encode($itemList);
			break;
		case "appoinmentTotal":
			$userhistory='SELECT count(*) FROM viewing_record a WHERE a.viewer = "'.$userid.'"';
			foreach($conn->query($userhistory) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appointmentList":
			//$userhistory='SELECT a.*,b.stock_ref,b.grading_lab,b.certificate_number,c.name_ch,c.image1,c.price FROM viewing_record a,diamonds b,jewelry c WHERE a.viewer = "'.$appointmentOwner.'" and a.diamond=b.id and a.jewellery_id=c.id ORDER BY a.id DESC';
			$userhistory='select  t.*,c.name_ch,c.image1,c.price from (SELECT a.*,b.stock_ref,b.grading_lab,b.certificate_number FROM viewing_record a,diamonds b WHERE a.viewer = "'.$userid.'" and a.diamond=b.id ) as t  left join jewelry c on t.jewellery_id=c.id ORDER BY t.id DESC';
			logger($userhistory);
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$appoinmentList=array();$i=0;
			if($historyfound){
				foreach($stmt_history as $row_history){
					$appoinmentList[]=$row_history;
					$appoinmentList[0]['shapeTxt']=diamondShapeDesc($row_history['shape']);
					/*
					$demopiclink='./img-eles/goodprice.png';
					if($user_jewellery_id!='' && $user_jewellery_id!=NULL && $user_jewellery_id!=0){
						$sql_ring='SELECT * FROM jewelry WHERE id = '.$user_jewellery_id;
						foreach($conn->query($sql_ring) as $r_r){
							$user_ring_name_ch=$r_r['name_ch'];
							$user_ring_image1=$r_r['image1'];
						}
						$demopiclink='../images/sitepictures/'.$user_ring_image1;
					}*/
					$i++;
				}
			}
			echo json_encode($appoinmentList);
			break;
		case "removeAppointment":
			$sql_delete='delete from viewing_record WHERE id = '.$_REQUEST['id'];
			$conn->query($sql_delete);
			echo "OK";
			break;
		case "updatePassword":
			$usernamenew=addslashes($_POST['usernamenew']);
			$passwordold=addslashes($_POST['passwordold']);
			$passwordnew=addslashes($_POST['passwordnew']);
			$passwordnewrepeat=addslashes($_POST['passwordnewrepeat']);
			if($passwordnewrepeat!=$passwordnew){
				$feedbackmessage='两次输入的新密码不一致，请重新输入';
			}
			else if($passwordold!=$website_password){
				$feedbackmessage='密码输入不正确，请重试';
			}
			else if($passwordnewrepeat==$passwordnew && $passwordold==$website_password){
				$sql_user_update='UPDATE clients_list SET website_username = "'.$usernamenew.'", website_password = "'.$passwordnew.'" WHERE id = '.$userid;
				logger($sql_user_update);
				$stmt_user_update=$conn->query($sql_user_update);
				$userupdated=$stmt_user_update->rowCount();
				if($userupdated){
					$website_username=$usernamenew;
					$feedbackmessage='修改成功。';
				}
			}
			echo $feedbackmessage;
			break;
		case "updateProfile":
			$name=addslashes($_REQUEST['name']);
			$email=addslashes($_REQUEST['email']);
			$tel=addslashes($_REQUEST['tel']);
			$userSql = "update clients_list set name=:name,email=:email,tel=:tel where id=:id";
			$stmt=$conn->prepare($userSql);
			$stmt->execute(array(
					'name'=> $name,
					'email'=> $email,
					'tel'=> $tel,
					'id'=> $userid
			));
			$OK=$stmt->rowCount();
			if($OK){
				$feedbackwords='修改成功。';
			}else{
				$feedbackwords='修改失败，请检查您输入的数据。';
			}
			echo $feedbackwords;
			break;
		case "makeOrder":
			$_SESSION['orderDiaId'] = $_REQUEST['diaId'];
			//setcookie("orderDiaId",$_REQUEST['diaId'],time()+365*24*3600);
			echo '定制成功，请继续选择款式';
			break;
		case "makeOrderJew":
			$_SESSION['orderJewId'] = $_REQUEST['jewId'];
			//setcookie("orderJewId",$_REQUEST['jewId'],time()+365*24*3600);
			echo '定制成功，请继续';
			break;
		case "appointmentMakeAll":
			$name=$_POST['name'];
			$email=$_POST['email'];
			$tel=$_POST['tel'];
			$isRegist = 0;
			if(isset($_SESSION['useraccount'])){
				$isRegist = 1;
				$userSql = "update clients_list set name=:name,email=:email,tel=:tel where id=:id";
				$stmt=$conn->prepare($userSql);
				$stmt->execute(array(
						'name'=> $name,
						'email'=> $email,
						'tel'=> $tel,
						'id'=> $userid
				));
				//var_dump( $stmt->queryString, $stmt->_debugQuery() );
				$OK=$stmt->rowCount();
			}
			$viewTime=$_POST['viewTime'];
			$timeSql = "update viewing_record set name=:name,email=:email,tel=:tel,isRegist=:isRegist,view_time=:viewTime where viewer=:userid";
			$stmt=$conn->prepare($timeSql);
			$stmt->execute(array('name'=> $name,
						'email'=> $email,
						'tel'=> $tel,
						'isRegist'=> $isRegist,
					'viewTime'=> $viewTime,
					'userid'=> $userid
			));
			$OK=$stmt->rowCount();
			if($OK){
				$feedbackwords='非常感谢您的预订。您的预约已经保存，我们会尽快联系您。';
				//发送邮件
				$mail = new PHPMailer(); //建立邮件发送类
				$mail->isSendmail();
				$mail->From = "service@lumiagem.com"; //邮件发送者email地址
				$mail->FromName = "lumiagem";
				$mail->AddReplyTo("info@lumiagem.com", "info_lumiagem");
				
				//$mail->IsHTML(true); // set email format to HTML //是否使用HTML格式
				$mail->AddAddress($email, $name);//收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
				$mail->Subject = '您在利美钻石预约的钻石信息'; //邮件标题
				$content = '非常感谢您的预订。您预约的时间是：'.$viewTime.'，我们将恭候您的光临。';
				/*$content .= '公司地址：DIAMANTCLUB VAN ANTWERPEN
					Pelikaanstraat 62, 2018 Antwerp, Belgium 比利时安特卫普
					电话：+32 (0)3 689 73 94
					您可以选择从大门 Pelikaanstraat 62, 2018 Antwerp 进入
					(周一至周五开放）
					或大门 Hovenierstraat 35, 2018 Antwerp 进入
					（周一至周日开放）
					钻石街停车场地址：Vestingstraat 382018 Antwerp Belgium';*/
				$mail->Body = $content; //邮件内容
				$mail->AltBody = "This is the body in plain text for non-HTML mail clients"; //附加信息，可以省略
				if(!$mail->send()) {
					logger( 'Mailer Error: ' . $mail->ErrorInfo);
				} else {
					logger( 'Message has been sent');
				}
			}else{
				$feedbackwords='请检查您输入的数据。如果还存在问题请联系我们客服微信号limeikefu。';
			}
			echo $feedbackwords;
			break;
		case "appointmentCheck":
			$sql_dia='SELECT count(*) as t FROM viewing_record WHERE diamond = '.$_REQUEST['appointmentId'].' and viewer="'.$userid.'"';
			foreach($conn->query($sql_dia) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appointmentCount":
			$sql_dia='SELECT count(*) as t FROM viewing_record WHERE viewer="'.$userid.'"  and diamond in (select id from diamonds)';
			foreach($conn->query($sql_dia) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appointmentMake":
			$diaId=$_REQUEST['diaId'];
			$jewId=$_REQUEST['jewId'];
			if($_REQUEST['type']=='jew'){
				$sql_ring='SELECT name_ch, image1,price FROM jewelry WHERE id='.$jewId;
				foreach($conn->query($sql_ring) as $r_r){
					$ringname=$r_r['name_ch'];
					$ringpic=$r_r['image1'];
					$jewellery_price=$r_r['price'];
				}
			}else{
				$ringname='无戒托';
				$ringpic='Diamond.jpg';$jewellery_price=0;
			}
			$sql_dia='SELECT * FROM diamonds WHERE id = '.$diaId;
			$stmt_dia=$conn->query($sql_dia);
			foreach($stmt_dia as $r_d){
				$stock_ref=$r_d['stock_ref'];
				$stock_num_rapnet=$r_d['stock_num_rapnet'];
				$shape=$r_d['shape'];
				$carat=$r_d['carat'];
				$color=$r_d['color'];
				$fancy_color=$r_d['fancy_color'];
				$clarity=$r_d['clarity'];
				$grading_lab=$r_d['grading_lab'];
				$certificate_number=$r_d['certificate_number'];
				$cut_grade=$r_d['cut_grade'];
				$polish=$r_d['polish'];
				$symmetry=$r_d['symmetry'];
				$fluorescence_intensity=$r_d['fluorescence_intensity'];
				$country=$r_d['country'];
				$raw_price=$r_d['raw_price'];
				$raw_price_retail=$r_d['raw_price_retail'];
				$price=$r_d['price'];
				$retail_price=$r_d['retail_price'];
				$from_company=$r_d['from_company'];
				$contact_tel=$r_d['contact_tel'];
				$certificatelink=$r_d['certificatelink'];
				$from_company=$r_d['from_company'];
				$contact_tel=$r_d['contact_tel'];
				$certificatelink=$r_d['certificatelink'];
			}
			$thetotalprice=0;
			$chosenby='USER';$viewTime=null;
			$sql_view='INSERT INTO viewing_record (diamond, diamond_shape, diamond_color, diamond_clarity, diamond_carat, diamond_cut, diamond_symmetry, diamond_polish, diamond_fluo, diamond_price, jewellery_price, totalprice_in_currency, jewellery_id, viewer, view_time, chosenby)
											  VALUES (:diamond, :diamond_shape, :diamond_color, :diamond_clarity, :diamond_carat, :diamond_cut, :diamond_symmetry, :diamond_polish, :diamond_fluo, :diamond_price, :jewellery_price, :totalprice_in_currency, :jewellery_id, :viewer, :viewTime, :chosenby)';
			$stmt=$conn->prepare($sql_view);
			$stmt->execute(array(
					'diamond'=> $diaId,
					'diamond_shape'=> $shape,
					'diamond_carat'=> $carat,
					'diamond_color'=> $color,
					'diamond_clarity'=> $clarity,
					'diamond_cut'=> $cut_grade,
					'diamond_polish'=> $polish,
					'diamond_symmetry'=> $symmetry,
					'diamond_fluo'=> $fluorescence_intensity,
					'diamond_price'=> $retail_price,
					'jewellery_price'=> $jewellery_price,
					'totalprice_in_currency'=> $thetotalprice,
					'jewellery_id'=> $jewId,
					'viewer'=> $userid,
					'viewTime'=> $viewTime,
					'chosenby'=> $chosenby
			));
			$OK=$stmt->rowCount();
			logger($OK);
			if($OK){
				$feedbackwords='非常感谢您的预订。您的预约已经保存，我们会尽快联系您。';
			}else{
				$feedbackwords='非常抱歉，系统繁忙，请电话联系我们或发送电子邮件。谢谢！';
			}
			echo $OK;
			break;
		default:
			echo "ok";
			break;
	}
}
function diamondShapeDesc($shape) {
	switch ($shape){
		case "BR":
			$pic_where="01.gif";
			$shape_TXT='圆形';
			break;
		case "PR":
			$pic_where="02.gif";
			$shape_TXT='水滴形';
			break;
		case "PS":
			$pic_where="03.gif";
			$shape_TXT='公主方';
			break;
		case "HS":
			$pic_where="04.gif";
			$shape_TXT='心形';
			break;
		case "MQ":
			$pic_where="05.gif";
			$shape_TXT='马眼形';
			break;
		case "OV":
			$pic_where="06.gif";
			$shape_TXT='椭圆形';
			break;
		case "EM":
			$pic_where="07.gif";
			$shape_TXT='祖母绿形';
			break;
		case "RAD":
			$pic_where="08.gif";
			$shape_TXT='雷电形';
			break;
		case "CU":
			$pic_where="09.gif";
			$shape_TXT='垫形';
			break;
		default:
			$pic_where="01.gif";
			$shape_TXT='圆形';
			break;
	}
	return $shape_TXT;	
}
?>