
<?php
session_start();
include_once 'log.php';
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
$userid = $_SESSION ['useraccount'];
$cookieId = $_COOKIE['everCookieId'];
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
			$appointmentOwner;
			if (isset($_COOKIE["userId"]))
				$appointmentOwner = $_COOKIE["userId"];
			else
				$appointmentOwner = $_COOKIE["everUserId"];
						
			$userhistory='SELECT count(*) FROM viewing_record a WHERE a.viewer = "'.$appointmentOwner.'"';
			foreach($conn->query($userhistory) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appoinmentList":
			$appointmentOwner;
			if (isset($_COOKIE["userId"]))
				$appointmentOwner = $_COOKIE["userId"];
			else
				$appointmentOwner = $_COOKIE["everUserId"];
			$userhistory='SELECT a.*,b.stock_ref,b.grading_lab,b.certificate_number FROM viewing_record a,diamonds b WHERE a.viewer = "'.$appointmentOwner.'" and a.diamond=b.id ORDER BY a.id DESC';
			logger($userhistory);
			$stmt_history=$conn->query($userhistory);
			$historyfound=$stmt_history->rowCount();
			$appoinmentList=array();$i=0;
			if($historyfound){
				foreach($stmt_history as $row_history){
					$appoinmentList[]=$row_history;
					$demopiclink='./img-eles/goodprice.png';
					if($user_jewellery_id!='' && $user_jewellery_id!=NULL && $user_jewellery_id!=0){
						$sql_ring='SELECT * FROM jewelry WHERE id = '.$user_jewellery_id;
						foreach($conn->query($sql_ring) as $r_r){
							$user_ring_name_ch=$r_r['name_ch'];
							$user_ring_image1=$r_r['image1'];
						}
						$demopiclink='../images/sitepictures/'.$user_ring_image1;
					}
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
		case "appointmentMakeAll":
			if(!isset($_SESSION['useraccount'])){
				echo '请<a href="login.php">登录</a>之后到购物车之内复查您的预约并继续操作。';
				return;
			}
			$name=$_POST['name'];
			$email=$_POST['email'];
			$tel=$_POST['tel'];
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
			$viewTime=$_POST['viewTime'];
			$timeSql = "update viewing_record set view_time=:viewTime where viewer=:userid";
			$stmt=$conn->prepare($timeSql);
			$stmt->execute(array(
					'viewTime'=> $viewTime,
					'userid'=> $userid
			));
			$OK=$stmt->rowCount();
			if($OK){
				$feedbackwords='非常感谢您的预订。您的预约已经保存，我们会尽快联系您。';
			}else{
				$feedbackwords='请检查您输入的数据。如果还存在问题请联系我们客服微信号limeikefu。';
			}
			echo $feedbackwords;
			break;
		case "appointmentCheck":
			if (isset($_COOKIE["userId"]))
				$appointmentOwner = $_COOKIE["userId"];
			else
				$appointmentOwner = $_COOKIE["everUserId"];
			$sql_dia='SELECT count(*) as t FROM viewing_record WHERE diamond = '.$_REQUEST['appointmentId'].' and viewer="'.$appointmentOwner.'"';
			foreach($conn->query($sql_dia) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appointmentCount":
			if (isset($_COOKIE["userId"]))
				$appointmentOwner = $_COOKIE["userId"];
			else
				$appointmentOwner = $_COOKIE["everUserId"];
			$sql_dia='SELECT count(*) as t FROM viewing_record WHERE viewer="'.$appointmentOwner.'"';
			foreach($conn->query($sql_dia) as $r_r){
				$t=$r_r['t'];
			}
			echo $t;
			break;
		case "appointmentMake":
			$appointmentOwner;
			if (isset($_COOKIE["userId"]))
				$appointmentOwner = $_COOKIE["userId"];
			else
				$appointmentOwner = $_COOKIE["everUserId"];
			if($_REQUEST['type']=='dia'){
				$diaId=$_REQUEST['appointmentId'];
				$jewId=0;
			}else{
				$diaId=0;
				$jewId=$_REQUEST['appointmentId'];
			}
			if($jewId!=0){
				$sql_ring='SELECT name_ch, image1 FROM jewelry WHERE id='.$jewId;
				foreach($conn->query($sql_ring) as $r_r){
					$ringname=$r_r['name_ch'];
					$ringpic=$r_r['image1'];
				}
			}else{
				$ringname='无戒托';
				$ringpic='Diamond.jpg';
			}
			
			$sql_dia='SELECT * FROM diamonds WHERE id = '.$_REQUEST['appointmentId'];;
			logger($sql_dia);
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
			$jewellery_price=0;$thetotalprice=0;
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
					'viewer'=> $appointmentOwner,
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

?>