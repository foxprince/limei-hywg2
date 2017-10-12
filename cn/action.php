<?php
date_default_timezone_set("Asia/Shanghai");
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
					$appoinmentList[$i]['shapeTxt']=diamondShapeDesc($row_history['shape']);
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
			setcookie("orderDiaId",$_REQUEST['diaId'],time()+3600);
			logger("orderDiaId:".$_SESSION['orderDiaId']);
			echo '定制成功，请继续';
			break;
		case "makeOrderJew":
			$_SESSION['orderJewId'] = $_REQUEST['jewId'];
			setcookie("orderJewId",$_REQUEST['jewId'],time()+3600);
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
				$Mail = new PHPMailer(); //建立邮件发送类
				$Mail->IsSMTP(); // Use SMTP
				$Mail->Host        = "smtp.gmail.com"; // Sets SMTP server
				$Mail->SMTPDebug   = 0; // 2 to enable SMTP debug information
				$Mail->SMTPAuth    = TRUE; // enable SMTP authentication
				$Mail->SMTPSecure  = "tls"; //Secure conection
				$Mail->Port        = 587; // set the SMTP port
				$Mail->Username    = 'anthony.fly@gmail.com'; // SMTP account username
				$Mail->Password    = 'pwd4gmail'; // SMTP account password
				$Mail->Priority    = 1; // Highest priority - Email priority (1 = High, 3 = Normal, 5 = low)
				$Mail->CharSet     = 'UTF-8';
				$Mail->Encoding    = '8bit';
				$Mail->ContentType = 'text/html; charset=utf-8\r\n';
				$Mail->From        = 'anthony.fly@gmail.com';
				$Mail->FromName    = 'lumiagem';
				$Mail->WordWrap    = 900; // RFC 2822 Compliant for Max 998 characters per line
				$Mail->isHTML( TRUE );
				//发邮件给客服
				$Mail->AddAddress('info@lumiagem.com');//收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
				$Mail->addCC('lwl380451663@Outlook.com');                // 添加抄送人
				$Mail->addCC('cxjlgzzc@163.com');
				$Mail->Subject = '新的看钻预约来自于'.$name; //邮件标题
				$content="新的看钻预约, 姓名：".$name." 联系电话：".$tel." 电子邮件：".$email;
				$content .= "<br/>预约时间：".$viewTime;
				//预约钻石的详细信息
				$userhistory='select  t.*,c.name_ch,c.image1,c.price from (SELECT a.*,b.stock_ref,b.grading_lab,b.certificate_number FROM viewing_record a,diamonds b WHERE a.viewer = "'.$userid.'" and a.diamond=b.id ) as t  left join jewelry c on t.jewellery_id=c.id ORDER BY t.id DESC';
				logger($userhistory);
				$stmt_history=$conn->query($userhistory);
				$historyfound=$stmt_history->rowCount();
				$appoinmentList=array();$i=0;
				if($historyfound){
					foreach($stmt_history as $row_history){
						$content .='<div class="pro_pics">';
						if($row_history['jewellery_id']>0)
							$content .='<div class="pic_00"><img width=122 height=122 src="http://www.lumiagem.com/images/sitepictures/'.$row_history['image1'].'"/>';
						else
							$content .='<div class="pic_00"><img src="http://www.lumiagem.com/cn/images/pic_01.png"/>';
						$content .='</div>';
						$content .= '<div class="detail">';
						if($row_history['jewellery_id']>0)
							$content .= '<p>'.$row_history['name_ch'].'</p>';
						else
							$content .= '<p>'.$row_history['shapeTxt'].'裸钻</p>';
						$content .= '<p>'.$row_history['diamond_carat'].'克拉</p>';
						$content .= '<p>颜色：'.$row_history['diamond_color'].'</p>';
						$content .= '<p>净度：'.$row_history['diamond_clarity'].'</p>';
						$content .= '<p>切工：'.$row_history['diamond_cut'].'</p>';
						$content .= '<p>抛光：'.$row_history['diamond_polish'].'</p>';
						$content .= '<p>对称性：'.$row_history['diamond_symmetry'].'</p>';
						$content .= '<p>证书：'.$row_history['grading_lab'].'</p>';
						$content .= '<p>编号：'.$row_history['stock_ref'].'</p>';
						$content .= '<p>价格：'.round($row_history['diamond_price']).'美元</p>';
						if($row_history['grading_lab']=="HRD"){
							$content .= '<a class="certi_linker" target="_black" href="http://www.hrdantwerplink.be/index.php?record_number='.$row_history['certificate_number'].'&weight=&L="><img id="gradinglabicon" src="http://www.lumiagem.com/cn/images/HRD.png" width="98" height="37" /></a>';
						}else if($row_history['grading_lab']=='GIA'){
							$content .= '<a class="certi_linker" target="_black" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='.$row_history['certificate_number'].'"><img id="gradinglabicon" src="http://www.lumiagem.com/cn/images/GIA.png" width="98" height="37"/></a>';
						} else if($row_history['grading_lab']=='IGI'){
							$content .= '<a class="certi_linker" target="_black" href="http://www.igiworldwide.com/igi/verify.php?r='.$row_history['certificate_number'].'"><img id="gradinglabicon" src="http://www.lumiagem.com/cn/images/IGI.png" width="98" height="37"/></a>';
						}
						$content .= '<p>点击查看证书</p>';
						$content .= '</div></div><hr>';
						$i++;
					}
				}
				$Mail->Body = $content; //邮件内容
				$Mail->AltBody = "This is the body in plain text for non-HTML mail clients"; //附加信息，可以省略
				$Mail->Send();
				//发邮件给预约者
				$Mail->FromName    = 'lumiagem利美钻石';
				$Mail->AddAddress($email);//收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
				$Mail->Subject = '已经收到您的预约-利美钻石'; //邮件标题
				$content="<b>您的预约信息</b><br/>姓名：".$name." 联系电话：".$tel." 电子邮件：".$email;
				$content .= "<br/>预约时间：".$viewTime;
				$content .='您的预约已经保存，我们会尽快联系您。';
				$Mail->Body = $content; //邮件内容
				$Mail->AltBody = "This is the body in plain text for non-HTML mail clients"; //附加信息，可以省略
 				$Mail->Send();
				$Mail->SmtpClose();
				if(!$Mail->IsError()) {
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
		case "deleteTranc":
			$sql_delete='delete from transaction WHERE id = '.$_REQUEST['id'];
			$conn->query($sql_delete);
			$sql_delete='delete from tranc_detail WHERE tranc_id = '.$_REQUEST['id'];
			$conn->query($sql_delete);
			echo "OK";
			break;
		case "trancDetail":
			$stmt=$conn->prepare('select * from transaction where id=:id');
			$stmt->execute(array('id'=>$_REQUEST['id']));
			foreach($stmt as $r){
				$transactionDetail=$r;
			}
			$stmt=$conn->prepare('select * from tranc_detail where tranc_id=:tranc_id');
			$stmt->execute(array('tranc_id'=>$_REQUEST['id']));
			$tranc_detailList=array();
			foreach($stmt as $row){
				$tranc_detailList[]=$row;
			}
			$result = array('trancDetail'=>$transactionDetail,'list'=>$tranc_detailList);
			echo json_encode($result);
			break;
		case "trancList":
			$totalSql = 'select count(*) as t from transaction';
			$sql='select id,type,invoice_no,tranc_date,name,currency,vat_price,total_price from transaction ';
			$clause = ' where 1=1 ';
			if($_REQUEST['type']!=null)
				$clause .= ' and type ="'.$_REQUEST['type'].'"';
			if($_REQUEST['name']!=null)
				$clause .= ' and name like "%'.$_REQUEST['name'].'%"';
			if($_REQUEST['invoice_no']!=null)
				$clause .= ' and invoice_no like "%'.$_REQUEST['invoice_no'].'%"';
			if($_REQUEST['start']!=null)
				$clause .= ' and tranc_date>='.$_REQUEST['start'];
			if($_REQUEST['end']!=null)
				$clause .= ' and tranc_date<'.$_REQUEST['end'];
			$pagesize = 10;
			if(isset($_REQUEST['page'])&&$_REQUEST['page']!=null){
				$crr_page=$_REQUEST['page'];
			}else{
				$crr_page=1;
			}
			$startfrom=($crr_page-1)*$pagesize;
			$totalSql .= $clause;
			$sql .= $clause.' order by id desc limit '.$startfrom.','.$pagesize;
			foreach($conn->query($totalSql) as $r_r){
				$total=$r_r['t'];
			}
			if($total>0) {
				$transactionList=array();$i=0;
				foreach($conn->query($sql) as $row){
					$transactionList[]=$row;
					$i++;
				}
			}
			$tpages = ceil ( $total / $pagesize );
			$result = array('total'=>$total,'page'=>$crr_page,'total_pages'=>$tpages,'list'=>$transactionList);
			echo json_encode($result);
			break;
		case "updateTranc":
			$obj=json_decode($_REQUEST['transaction'],TRUE);
			$sql = 'update transaction set type=?,name=?,passport=?,street=?,city=?,postcode=?,country=?,tranc_date=?,invoice_no=?,currency=?,vat_price=?,total_price=? where id=?';
			$stmt=$conn->prepare($sql);
			$stmt->execute(array($obj['type'],$obj['name'],
					$obj['passport'],
					$obj['street'],$obj['city'],
					$obj['postcode'],
					$obj['country'],
					$obj['tranc_date'],
					$obj['invoice_no'],$obj['currency'],$obj['vat_price'],$obj['total_price'],$obj['id']));
			//删除原有纪录
			$sql_delete='delete from tranc_detail WHERE tranc_id = '.$obj['id'];
			$conn->query($sql_delete);
			$num=count($obj["list"]);
			//--遍历数组，将对应信息添加入数据库
			for ($i=0;$i<$num;$i++) {
				$item = $obj["list"][$i];
				if($item["type"]=='jew') {
					$insert_sql="INSERT INTO tranc_detail (tranc_id,type,jewerly,material,jewerly_price,ctime)
						VALUES (?,?,?,?,?,now())";
					$result = $conn -> prepare($insert_sql);
					$result -> execute(array( $obj['id'],$item["type"],$item["jewerly"], $item["material"],
							$item["jewerly_price"]
					));
				}
				else{
					$insert_sql="INSERT INTO tranc_detail (tranc_id,type,report_no,shape,color,fancy,grading_lab,carat,
						clarity,cut_grade,polish,symmetry,price,jewerly,material,jewerly_price,ctime)
						VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())";
					$result = $conn -> prepare($insert_sql);
					$result -> execute(array( $obj['id'],$item["type"],$item["report_no"],$item["shape"],$item["color"],
							$item["fancy"],$item["grading_lab"],$item["carat"], $item["clarity"],$item["cut_grade"],
							$item["polish"], $item["symmetry"],$item["price"],$item["jewerly"], $item["material"],
							$item["jewerly_price"]
					));
				}
			}
			echo $obj['id'];
			break;
		case "addTranc":
			$obj=json_decode($_REQUEST['transaction'],TRUE);logger($_REQUEST['transaction']);
			$sql = 'insert into transaction(name,passport,street,city,postcode,country,type,tranc_date,invoice_no,currency,vat_price,total_price,ctime) 
					values(:name,:passport,:street,:city,:postcode,:country,:type,:tranc_date,:invoice_no,:currency,:vat_price,:total_price,now())';
			$stmt=$conn->prepare($sql);
			$stmt->execute(array('name'=>$obj['name'],
					'passport'=>$obj['passport'],
					'street'=>$obj['street'],'city'=>$obj['city'],
					'postcode'=>$obj['postcode'],
					'country'=>$obj['country'],'type'=>$obj['type'],
					'tranc_date'=>$obj['tranc_date'],
					'invoice_no'=>$obj['invoice_no'],'currency'=>$obj['currency'],'vat_price'=>$obj['vat_price'],'total_price'=>$obj['total_price']));
			$transactionId = $conn->lastInsertId();
			//--得到Json_list数组长度
			$num=count($obj["list"]);
			//--遍历数组，将对应信息添加入数据库
			for ($i=0;$i<$num;$i++) {
				$item = $obj["list"][$i];
				if($item["type"]=='jew') {
					$insert_sql="INSERT INTO tranc_detail (tranc_id,type,jewerly,material,jewerly_price,ctime)
						VALUES (?,?,?,?,?,now())";
					$result = $conn -> prepare($insert_sql);
					$result -> execute(array( $transactionId,$item["type"],$item["jewerly"], $item["material"],
							$item["jewerly_price"]
					));
				}
				else{
					$insert_sql="INSERT INTO tranc_detail (tranc_id,type,report_no,shape,color,fancy,grading_lab,carat,
						clarity,cut_grade,polish,symmetry,price,jewerly,material,jewerly_price,ctime)
						VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())";
					$result = $conn -> prepare($insert_sql);
					$result -> execute(array( $transactionId,$item["type"],$item["report_no"],$item["shape"],$item["color"],
							$item["fancy"],$item["grading_lab"],$item["carat"], $item["clarity"],$item["cut_grade"],
							$item["polish"], $item["symmetry"],$item["price"],$item["jewerly"], $item["material"],
							$item["jewerly_price"]
					));
				}
			}
			echo $transactionId;
			break;
		case "currencyRate":
			$from=$_REQUEST['from'];
			$to=$_REQUEST['to'];
			foreach($conn->query('SELECT * FROM convert_currency') as $row_currency){
				$USD_EUR=$row_currency['USD_EUR'];
				$USD_GBP=$row_currency['USD_GBP'];
				$USD_CNY=$row_currency['USD_CNY'];
			}
			if($from=='EUR'&&$to=='CNY') 
				$rate=($USD_CNY/$USD_EUR);
			if($from=='EUR'&&$to=='USD')
				$rate=1/$USD_EUR;
			if($from=='CNY'&&$to=='EUR') 
				$rate=($USD_EUR/$USD_CNY);
			if($from=='CNY'&&$to=='USD')
				$rate=(1/$USD_CNY);
			if($from=='USD'&&$to=='EUR')
				$rate=($USD_EUR);
			if($from=='USD'&&$to=='CNY')
				$rate=($USD_CNY);
			echo $rate;
				break;
		case "fetchDia":
			$ref=$_REQUEST['ref'];
			$currency=$_REQUEST['currency'];
			if($_REQUEST['ref']!=null){
				$sql_currency='SELECT * FROM convert_currency';
				foreach($conn->query($sql_currency) as $row_currency){
					$USD_EUR=$row_currency['USD_EUR'];
					$USD_GBP=$row_currency['USD_GBP'];
					$USD_CNY=$row_currency['USD_CNY'];
				}
				$sql_dia='SELECT * FROM diamonds WHERE visiable=1 and stock_ref LIKE "'.$ref.'" OR certificate_number = "'.$ref.'"';
				$stmt_dia=$conn->query($sql_dia);
				foreach($stmt_dia as $r_d){
					$item=$r_d;
					if($currency!=null&&$currency=='CNY')
						$item['retail_price']=round($r_d['retail_price']*$USD_CNY);
					else 
						$item['retail_price']=round($r_d['retail_price']*$USD_EUR);
				}
				echo json_encode($item);
			}
			break;
		case "invoiceNo":
			$transactionNo = 1;
			$sql_dia='select max(invoice_no) as t from transaction';
			foreach($conn->query($sql_dia) as $r_r){
				$transactionNo=$r_r['t']+1;
			}
			//$transactionStr=  date('Y').sprintf('%04s', $transactionNo);
			echo $transactionNo;
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
				setcookie("orderDiaId",NULL);
				setcookie("orderJewId",NULL);
				$feedbackwords='非常感谢您的预订。您的预约已经保存，我们会尽快联系您。';
			}else{
				$feedbackwords='非常抱歉，系统繁忙，请电话联系我们或发送电子邮件。谢谢！';
			}
			echo $OK;
			break;
		default:
			echo "wrong action";
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