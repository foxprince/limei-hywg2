<?php
session_start();
include_once 'log.php';
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
$userid = $_SESSION ['useraccount'];
if($_REQUEST['action']) {
	$action = $_REQUEST['action'];
	switch($action) {
		case "appoinmentList":
			$userhistory='SELECT a.*,b.stock_ref,b.grading_lab FROM viewing_record a,diamonds b WHERE a.viewer = "'.$userid.'" and a.diamond=b.id ORDER BY a.id DESC';
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
		case "appointmentMake":
			if($_REQUEST['type']=='dia'){
				$diaId=$_REQUEST['diaId'];
				$jewId=0;
			}else{
				$diaId=0;
				$jewId=$_REQUEST['jewId'];
			}
			$name=$_POST['name'];
			$email=$_POST['email'];
			$tel=$_POST['tel'];
			$viewTime=$_POST['viewTime'];
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
			
				$sql_dia='SELECT * FROM diamonds WHERE id = '.$diaId;
				logger($sql_dia);
				$stmt_dia=$conn->query($sql_dia);
				$dia_found=$stmt_dia->rowCount();
				if($dia_found){
					foreach($conn->query($sql_dia) as $r_d){
						logger('ddd');
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
				}
				$jewellery_price=0;$thetotalprice=0;
				$chosenby='USER';
				$sql_view='INSERT INTO viewing_record (diamond, diamond_shape, diamond_color, diamond_clarity, diamond_carat, diamond_cut, diamond_symmetry, diamond_polish, diamond_fluo, diamond_price, jewellery_price, totalprice_in_currency, jewellery_id, viewer, view_time, chosenby) 
											  VALUES (:diamond, :diamond_shape, :diamond_color, :diamond_clarity, :diamond_carat, :diamond_cut, :diamond_symmetry, :diamond_polish, :diamond_fluo, :diamond_price, :jewellery_price, :totalprice_in_currency, :jewellery_id, :viewer, :viewTime, :chosenby)';
				$stmt=$conn->prepare($sql_view);
// 				$stmt->bindParam(':diamond', $diaId, PDO::PARAM_INT);
// 				$stmt->bindParam(':diamond_shape', $shape, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_carat', $carat, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_color', $color, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_clarity', $clarity, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_cut', $cut_grade, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_polish', $polish, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_symmetry', $symmetry, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_fluo', $fluorescence_intensity, PDO::PARAM_STR);
// 				$stmt->bindParam(':diamond_price', $retail_price, PDO::PARAM_STR);
// 				$stmt->bindParam(':jewellery_price', $jewellery_price, PDO::PARAM_STR);
// 				$stmt->bindParam(':totalprice_in_currency', $thetotalprice, PDO::PARAM_STR);
// 				$stmt->bindParam(':jewellery_id', $jewId, PDO::PARAM_STR);
// 				$stmt->bindParam(':viewer', $userid, PDO::PARAM_INT);
// 				$stmt->bindParam(':viewTime', $viewTime, PDO::PARAM_STR);
// 				$stmt->bindParam(':chosenby', $chosenby, PDO::PARAM_INT);
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
				//var_dump( $stmt->queryString, $stmt->_debugQuery() );
				$OK=$stmt->rowCount();
				if($OK){
					$feedbackwords='非常感谢您的预订。您的预约已经保存，我们会尽快联系您。';
				}else{
					$feedbackwords='非常抱歉，系统繁忙，请电话联系我们或发送电子邮件。谢谢！';
				}
				echo $feedbackwords;
				break;
		default:
			echo "ok";
			break;
	}
}

?>