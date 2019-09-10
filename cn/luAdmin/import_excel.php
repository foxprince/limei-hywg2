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


$e_message=array();

if(isset($_POST['records'])){
	
	include('nuke_magic_quotes.php');
	
	require_once('../connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
	
	//if($_POST['databefore']=='d'){}
	$sql_delete='DELETE FROM diamonds';
	$stmt_d=$conn->query($sql_delete);
	$OK=$stmt_d->rowCount();
	$error=$stmt_d->errorInfo();
	
	if(isset($error[2])){
		$error=$error[2];
		exit($error);
	}
	
	$ref_array=array();
	
	$r=$_POST['records'];
	$line_arr = explode("\r\n", $r);
	$crr_line=0;
	$available_line=0;
	foreach($line_arr as $line){
		$crr_line++;
		
		$records=explode("\t", $line);
		if($crr_line==1){
			if(count($records)<5){
				exit('wrong format!');
			}
		}
		if(count($records)>5){
			$available_line++;
			
			$stock_ref=trim($records[0]);
			$shape=$records[1];
			$carat=$records[2];
			
			$carat=str_replace(',','.',$carat);
			
			$color=$records[3];
			$fancy_color=$records[4];
			$clarity=$records[5];
			$grading_lab=$records[6];
			$certificate_number=$records[7];
			$cut_grade=$records[8];
			if(isset($records[9])){
			    $polish=$records[9];
			}else{
				 $polish="";
			}
			
			if(isset($records[10])){
				$symmetry=$records[10];
			}else{
				$symmetry="";
			}
			
			if(isset($records[11])){
				$fluorescence_intensity=$records[11];
			}else{
				$fluorescence_intensity="";
			}
			if(isset($records[12])){
			    $country=$records[12];
			}else{
				$country='-';
			}
			if(isset($records[13])){
			    $price=$records[13];
			}else{
				$price='-';
			}
			if(isset($records[14])){
			    $recommend_words=$records[14];
			}else{
				$recommend_words='';
			}
			if(isset($records[15])){
			    $stars=$records[15];
			}else{
				$stars='0';
			}
			
			switch($clarity){
				case "IF":
				$clarity_number='0';
				break;
				
				case "VVS1":
				$clarity_number='1';
				break;
				
				case "VVS2":
				$clarity_number='2';
				break;
				
				case "VS1":
				$clarity_number='3';
				break;
				
				case "VS2":
				$clarity_number='4';
				break;
				
				case "SI1":
				$clarity_number='5';
				break;
				
				case "SI2":
				$clarity_number='6';
				break;
				
				default:
				$clarity_number='-';
		
			}
			
			switch($cut_grade){
				case "EX":
				$cut_number='0';
				break;
				
				case "VG":
				$cut_number='1';
				break;
				
				case "G":
				$cut_number='2';
				break;
				
				case "F":
				$cut_number='3';
				break;
				
				default:
				$cut_number='-';
		
			}
			
			$main_dir_toCreate='../images/contentimgs/'.$stock_ref;
			$thumbs_dir_toCreate=$main_dir_toCreate.'/thumbs';
			if(!is_dir($main_dir_toCreate)){
				if(!mkdir($main_dir_toCreate, 0777)){
					exit('creating folder problem, please try again'.$main_dir_toCreate);
				}else{
					if(!mkdir($thumbs_dir_toCreate)){
						exit('creating folder problem, please try again'.$thumbs_dir_toCreate);
					}
				}
			}
			
			
			//exit($clarity_number.' = '.$cut_number);
			
			$sql_insert='INSERT INTO diamonds (id, stock_ref, shape, carat, color, fancy_color, clarity, grading_lab, certificate_number, cut_grade, polish, symmetry, fluorescence_intensity, country, price, clarity_number, cut_number, recommend_words, stars) VALUES (:id, :stock_ref, :shape, :carat, :color, :fancy_color, :clarity, :grading_lab, :certificate_number, :cut_grade, :polish, :symmetry, :fluorescence_intensity, :country, :price, :clarity_number, :cut_number, :recommend_words, :stars)';
		
		//exit($sql_insert);
		
			$stmt=$conn->prepare($sql_insert);	  
			
			$stmt->bindParam(':id', $available_line, PDO::PARAM_INT);
			$stmt->bindParam(':stock_ref', $stock_ref, PDO::PARAM_STR);
			$stmt->bindParam(':shape', $shape, PDO::PARAM_STR);
			$stmt->bindParam(':carat', $carat, PDO::PARAM_STR);
			$stmt->bindParam(':color', $color, PDO::PARAM_STR);
			$stmt->bindParam(':fancy_color', $fancy_color, PDO::PARAM_STR);
			$stmt->bindParam(':clarity', $clarity, PDO::PARAM_STR);
			$stmt->bindParam(':grading_lab', $grading_lab, PDO::PARAM_STR);
			$stmt->bindParam(':certificate_number', $certificate_number, PDO::PARAM_STR);
			$stmt->bindParam(':cut_grade', $cut_grade, PDO::PARAM_STR);
			$stmt->bindParam(':polish', $polish, PDO::PARAM_STR);
			$stmt->bindParam(':symmetry', $symmetry, PDO::PARAM_STR);
			$stmt->bindParam(':fluorescence_intensity', $fluorescence_intensity, PDO::PARAM_STR);
			$stmt->bindParam(':country', $country, PDO::PARAM_STR);
			$stmt->bindParam(':price', $price, PDO::PARAM_STR);			
			$stmt->bindParam(':clarity_number', $clarity_number, PDO::PARAM_STR);
			$stmt->bindParam(':cut_number', $cut_number, PDO::PARAM_STR);			
			$stmt->bindParam(':recommend_words', $recommend_words, PDO::PARAM_STR);
			$stmt->bindParam(':stars', $stars, PDO::PARAM_STR);
			
			
			$stmt->execute();
			$OK=$stmt->rowCount();
			
			$error=$conn->errorInfo();
            if(isset($error[2])) die($error[2]);
			if(isset($error[1])) die($error[1]);
			
			if(!$OK){
				//echo('id--'.$available_line.' ref---'.$stock_ref.'---color'.$color.' ---grlab: '.$grading_lab.'---re_words'.$recommend_words.'---'.$stars);
				$e_message[]='<p>inserting problem for stock_ref: '.$stock_ref.' please check the record, make sure no data is missing.</p>';
			}
			
			$ref_array[]=$stock_ref;
		}
		
	}
	
	$thedir='../images/contentimgs/';
	$handle = opendir($thedir);
    if($handle) {
        while(false !== ($file = readdir($handle))) {
			
			if ($file != '.' && $file != '..') {
				$filename = $thedir.$file;
				if(is_dir($filename)){
					if(!in_array($file, $ref_array)){
						$inactive[]=$file;
					}
				}
			}
        }   //  end while
        closedir($handle);
    }
	
	if(isset($inactive)){
		foreach($inactive as $d){
			$thedir='../images/contentimgs/'.$d.'/thumbs';
			if(is_dir($thedir)){
				$handle = opendir($thedir);
				if($handle) {
					while(false !== ($file = readdir($handle))) {
						
						if ($file != '.' && $file != '..') {
							$filename = $thedir.'/'.$file;
							if(is_file($filename)){
								if(is_readable($filename)){
									$OK=unlink($filename);
								}
							}
						}
						
					}   //  end while
					closedir($handle);
				}
				if($OK){
					rmdir($thedir);
				}
			}
			
			$themaindir='../images/contentimgs/'.$d;
			if(is_dir($themaindir)){
				$handle = opendir($themaindir);
				if($handle) {
					while(false !== ($file = readdir($handle))) {
						
						if ($file != '.' && $file != '..') {
							$filename = $themaindir.'/'.$file;
							if(is_file($filename)){
								if(is_readable($filename)){
									$OK=unlink($filename);
								}
							}
						}
						
					}   //  end while
					closedir($handle);
				}
				if($OK){
					rmdir($themaindir);
				}
			}
		}
	}
	
	
	
	
	if($OK){
		$message_db="数据成功导入, 共输入".$available_line."条记录";
		if(count($e_message)){
			foreach($e_message as $e){
				echo $e;
			}
		}
		//echo "db ok";
	}else{
		//echo "db no ok";
		$error=$stmt->errorInfo();
			if(isset($error[2])){
				$error=$error[2];
				exit($error);
			}
	}	
}

?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>利美珠宝::excel数据导入</title>
</head>

<body>

<?php
include('navi.php');

?>
<hr />

<h3>excel数据导入</h3>
<?php if(isset($message_db)){ ?>
<h4 style='color:#C00;'><?php echo $message_db; ?></h4>
<?php } ?>

<form action="" method="post">
<br />
<!--
是否保留数据库中原有数据:
<select name="databefore" style="font-size:16px;">
<option value="d">删除</option>
<option value="keep">保留</option>
</select>
<br /><br />

-->

<label>复制数据库所有记录的内容并粘贴到下面的文本框内（请不要复制第一行的标题）</label><br />
<textarea name="records" style="width:580px; height:280px;"></textarea>
<br /><br />
<input type="submit" value="提交数据" style="font-size:18px; background-color:#CC6699; padding:15px 68px; border-width:1px; color:#FFF;" />
</form>



<br /><br />
<p style="font-size:12px;">注：excel数据表格请按这个顺序 （stock_ref, shape, carat, color, fancy_color, clarity, grading_lab, certificate_number, cut_grade, polish, symmetry, fluorescence_intensity, country, price, recommend_words*, stars*）<br />
带*的可以省略<br />
recommend_words为推荐文字<br />
stars为推荐指数，值从1到5的数字<br />
</p>

<br /><br /><br /><br />
</body>
</html>