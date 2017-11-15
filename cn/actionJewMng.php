<?php
date_default_timezone_set("Asia/Shanghai");
include_once 'log.php';
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
		case "ivtList":
			$totalSql = 'select count(*) as t from inventory';
			$sql='select * from inventory ';
			$clause = ' where 1=1 ';
			if($_REQUEST['order']!=null)
				$clause .= ' and id in (select distinct inventory_id from inventory_spec)';
			if($_REQUEST['ivt_type']!=null&&$_REQUEST['ivt_type']!="all")
				$clause .= ' and ivt_type ="'.$_REQUEST['ivt_type'].'"';
			$total =0;$pagesize = 10;
			if(isset($_REQUEST['size'])&&$_REQUEST['size']!=null){ $pagesize=$_REQUEST['size'];
			}
			if(isset($_REQUEST['page'])&&$_REQUEST['page']!=null){ $crr_page=$_REQUEST['page'];
			}else{ $crr_page=1; }
			$startfrom=($crr_page-1)*$pagesize;
			$totalSql .= $clause;
			$sql .= $clause.' order by id desc limit '.$startfrom.','.$pagesize;
			foreach($conn->query($totalSql) as $row){
				$total=$row['t'];
			}
			if($total>0) {
				$inventoryList=array();$i=0;
				foreach($conn->query($sql) as $row){
					$inventoryList[$i]=$row;
					$specSql = 'select * from inventory_spec where inventory_id='.$row['id'];
					$specList = array();
					foreach($conn->query($specSql) as $rowSpec){
						$specList[]=$rowSpec;
					}
					$inventoryList[$i]["spec_list"]=$specList;
					$i++;
				}
			}
			$tpages = ceil ( $total / $pagesize );
			$result = array('total'=>$total,'page'=>$crr_page,'total_pages'=>$tpages,'l'=>$inventoryList);
			$callback = $_GET['callback'];
			if($callback)
				echo $callback.'('.json_encode($result).')';
			else 
				echo json_encode($result);
			break;
		case "addIvt" :
			$obj=json_decode($_REQUEST['inventory'],TRUE);
			$sql = 'insert into inventory(ivt_type,ivt_no,title,logo,price03,price09,price2,price3,note,ctime)
					values(?,?,?,?,?,?,?,?,?,now())';
			$stmt=$conn->prepare($sql);
			$stmt->execute(array($obj['ivt_type'],
					$obj['ivt_no'], $obj['title'],$obj['logo'],
					$obj['price03'], $obj['price09'],$obj['price2'],
					$obj['price3'], $obj['note']));
			//var_dump( $stmt->queryString, $stmt->_debugQuery() );
			$inventoryId = $conn->lastInsertId();
			//--得到Json_list数组长度
			$num=count($obj["list"]);
			//--遍历数组，将对应信息添加入数据库
			if($inventoryId>0){
			for ($i=0;$i<$num;$i++) {
				$item = $obj["list"][$i];
					$insert_sql="INSERT INTO inventory_spec (inventory_id,item,stock,amount,sale_time,cost,ctime)
						VALUES (?,?,?,?,?,?,now())";
					$result = $conn -> prepare($insert_sql);
					$result -> execute(array( $inventoryId,$item["item"],$item["stock"], $item["amount"],
							$item["sale_time"],$item["cost"]
					));
			}}
			echo $inventoryId;
			break;
		case "updateIvt":
			$obj=json_decode($_REQUEST['inventory'],TRUE);
			$sql = 'update inventory set ivt_type=?,ivt_no=?,title=?,logo=?,price03=?,price09=?,price2=?,price3=?,note=? where id=?';
			$stmt=$conn->prepare($sql);
			$stmt->execute(array($obj['ivt_type'],
					$obj['ivt_no'], $obj['title'],$obj['logo'],
					$obj['price03'], $obj['price09'],$obj['price2'],
					$obj['price3'], $obj['note'],$obj['id']));
			//删除原有纪录
			$sql_delete='delete from inventory_spec WHERE inventory_id = '.$obj['id'];
			$conn->query($sql_delete);
			$num=count($obj["list"]);
			//--遍历数组，将对应信息添加入数据库
			for ($i=0;$i<$num;$i++) {
				$item = $obj["list"][$i];
				$insert_sql="INSERT INTO inventory_spec (inventory_id,item,stock,amount,sale_time,cost,ctime)
						VALUES (?,?,?,?,?,?,now())";
				$result = $conn -> prepare($insert_sql);
				$result -> execute(array( $obj['id'],$item["item"],$item["stock"], $item["amount"],
						$item["sale_time"],$item["cost"]
				));
			}
			echo $obj['id'];
			break;
		case "deleteIvt":
			$sql_delete='delete from inventory WHERE id = '.$_REQUEST['id'];
			$conn->query($sql_delete);
			$sql_delete='delete from inventory_spec WHERE inventory_id = '.$_REQUEST['id'];
			$conn->query($sql_delete);
			echo "OK";
			break;
		case "addOrder" :
			$obj=json_decode($_REQUEST['order'],TRUE);
			$sql = 'insert into customer_order(cert_no,amount,main_stone,side_stone,diamond_pic,
					ring_no,ring_pic1,ring_pic2,ring_pic3,model,detail,inscription,diamond_price,
					order_time,ring_price,ready_time,fetch_place,package,customer_name,wechat,phone,address,ctime)
					values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())';
			$stmt=$conn->prepare($sql);
			$stmt->execute(array($obj['cert_no'],$obj['amount'],$obj['main_stone'],$obj['side_stone'],$obj['diamond_pic'],
					$obj[' ring_no'],$obj['ring_pic1'],$obj['ring_pic2'],$obj['ring_pic3'],$obj['model'],$obj['detail'],
					$obj['inscription'],$obj['diamond_price'],$obj[' order_time'],$obj['ring_price'],$obj['ready_time'],
					$obj['fetch_place'],$obj['package'],$obj['customer_name'],$obj['wechat'],$obj['phone'],$obj['address']));
			$orderId = $conn->lastInsertId();
			echo $orderId;
			break;
		case "orderList":
			$totalSql = 'select count(*) as t from customer_order';
			$sql='select * from customer_order ';
			$clause = ' where 1=1 ';
			if($_REQUEST['customer_name']!=null)
				$clause .= ' and customer_name ="'.$_REQUEST['customer_name'].'"';
			$pagesize = 10;
			if(isset($_REQUEST['size'])&&$_REQUEST['size']!=null){ $pagesize=$_REQUEST['size'];
			}
			if(isset($_REQUEST['page'])&&$_REQUEST['page']!=null){ $crr_page=$_REQUEST['page'];
			}else{ $crr_page=1; }
			$startfrom=($crr_page-1)*$pagesize;
			$totalSql .= $clause;
			$sql .= $clause.' order by id desc limit '.$startfrom.','.$pagesize;
			foreach($conn->query($totalSql) as $row){
				$total=$row['t'];
			}
			if($total>0) {
				$inventoryList=array();
				foreach($conn->query($sql) as $row){
					$inventoryList[]=$row;
				}
			}
			$tpages = ceil ( $total / $pagesize );
			$result = array('total'=>$total,'page'=>$crr_page,'total_pages'=>$tpages,'list'=>$inventoryList);
			echo json_encode($result);
			break;
		case "upload":
			require_once('./upload/Upload.php');
			$destination='siteImgs/';
			try{
				$upload = new img_Upload($destination);
				$upload->move();
				$result_upload=$upload->getMessages();
				$success=$upload->uploadingSuccess();
			}catch (Exception $e){
				$error=$e->getMessage();
				$errormessage='<p class="message">ERROR_UNKNOWN</p>';
				echo($errormessage);
			}
			//echo "uploading done<br>";
			if(!$success){
				$imagesizeinfo=$upload->sizeMessage();
				$imageformatinfo=$upload->formatMessage();
				if($imagesizeinfo=='<p class="message">EXCEED</p>'){
					echo "<p id='size'>too big</p>";
				}else if($imageformatinfo=='NOT_PERMITTED'){
					foreach($upload->getMessages() as $key=>$value) { logger($key."=>".$value); }
					echo '<p class="message">FORMAT_WRONG</p>';
				}else{
					echo "<p class='error'>An error has occured during uploading, please try again.</p>";
				}
			}else{
				$final_name=$upload->finalName();
				$image=$destination.$final_name;
				$imagedetails=getimagesize($image);
				$imageWidth=$imagedetails[0];
				$imageHeight=$imagedetails[1];
				if($imageWidth>2000 || $imageHeight>2000){
					echo "<p class='message'>ERROR_DIMENSION</p>";
				}
				else echo '/cn/'.$image;
				/*
				$ratio=$imageWidth/$imageHeight;
				if($imageWidth>1280 || $imageHeight>1280){
					require_once('./upload/ResizeImage.php');
					$maxsize=1280;
					try{
						$resize=new image_Resize($image);
						$resize->setDestination($destination);
						$resize->setMaxSize($maxsize);
						$resize->setSuffix('');
						$resize->create();
						$messages_R=$resize->getMessages();
						$success_R=$resize->thumbCreated();
					} catch (Exception $e){
						echo $e->getMessage();
					}
					if($success_R){
						$sizeVerified=true;
					}else{
						echo ("<p class='message'>ERROR_UNKNOWN</p>");
					}
				}else{
					$sizeVerified=true;
				}
				if(!$sizeVerified){
					echo("<p class='message'>ERROR_UNKNOWN</p>");
				}
				$maxsize=220;
				$destinationT=$destination.'/thumbs/';
				try{
					$resize=new image_Resize($image);
					$resize->setDestination($destinationT);
					$resize->setMaxSize($maxsize);
					$resize->setSuffix('');
					$resize->create();
					$messages_T=$resize->getMessages();
					$success_T=$resize->thumbCreated();
				} catch (Exception $e){
					echo $e->getMessage();
				}
				if($success_T){
					$thumbcreated=true;
				}else{
					echo ("<p class='message'>ERROR_UNKNOWN</p>");
				}*/
			}
			break;
		default:
			echo "wrong action";
			break;
	}
}