<?php
include_once ('log.php');
require_once ('connection.php');
// echo autoreply($_REQUEST['u'],$_REQUEST['m']);
function autoreply($crr_c_o_id,$crr_message){
//$holidaymessage='温馨提示：我公司于7月29日至8月16日放假。查询系统照常工作。如有任何问题，请给我们的客服微信留言：limeikefu 我们会在8月16日以后尽快联系您。 \n\n';
$holidaymessage='';
$pattern_ref = '/^[Kk]*[0-9]+$/';
$conn = dbConnect ( 'write', 'pdo' );
$conn->query ( "SET NAMES 'utf8'" );
if(preg_match($pattern_ref, $crr_message)){
	$sql='SELECT * FROM diamonds WHERE stock_ref = "'.$crr_message.'" AND status = "AVAILABLE"';
	$stmt_dia=$conn->query($sql);
	$found_dia=$stmt_dia->rowCount();
	if($found_dia){
		foreach($stmt_dia as $r){
			$shape=$r['shape'];
			$size=$r['carat'];
			$color=$r['color'];
			$clarity=trim($r['clarity']);
			if($clarity==''){
				$clarity='未知';
			}
			$cut=trim($r['cut_grade']);
			if($cut==''){
				$cut='未知';
			}
			$symmetry=trim($r['symmetry']);
			if($symmetry==''){
				$symmetry='未知';
			}
			$polish=trim($r['polish']);
			if($polish==''){
				$polish='未知';
			}
			$fluor_intensity=trim($r['fluorescence_intensity']);
			$total_sales_price_in_currency=$r['raw_price_retail'];
			$lab=$r['grading_lab'];
			
			$data_from=$r['source'];
			
			if($fluor_intensity=='None'){
				$fluo_txt='; 无荧光. ';
			}else{
				$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
			}
			
			$retail_price=$r['retail_price'];			
		}
		
		$sql_currency='SELECT * FROM convert_currency';
		$stmt_currency=$conn->query($sql_currency);
		foreach($stmt_currency as $row_currency){
			$USD_EUR=$row_currency['USD_EUR'];
			$USD_GBP=$row_currency['USD_GBP'];
			$USD_CNY=$row_currency['USD_CNY'];
		}
		
		//$shape
		switch ($shape){
			case "PR":
			$shape_title="公主方";
			break;
			
			case "EM":
			$shape_title="祖母绿";
			break;
			
			case "PS":
			$shape_title="水滴";
			break;
			
			case "HS":
			$shape_title="心";
			break;
			
			case "OV":
			$shape_title="椭圆";
			break;
			
			case "MQ":
			$shape_title="橄榄";
			break;
			
			case "RAD":
			$shape_title="雷蒂恩";
			break;
			
			case "CU":
			$shape_title="枕";
			break;
			
			default:
			$shape_title="圆";
		}
		
		
		
		$price_y=round($USD_CNY*$retail_price);
		$price_euro=round($USD_EUR*$retail_price);
		
		$price_y_marketing=$price_y*2;
		
		$thefeedbackcontentforwechatuser=$holidaymessage."根据您提供的库存编号，我们为您找到了下列钻石:\n库存编号为 ".$crr_message.": 该钻石为".$shape_title."形；".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$price_euro."欧元 (".$price_y."人民币)。市场价:".$price_y_marketing."人民币。\n如果您有更多问题，欢迎与我们联系。\n客服微信：limeikefu\n电话：+32 (0)3 689 73 94";
	}else{
		$thefeedbackcontentforwechatuser='非常抱歉，我们没有找到符合与您所提供的库存编号相对应的钻石。'.'\n\n'.$holidaymessage;
	}

}else{
	$pos_e_charactor = strpos($crr_message, '欧元');
	$pos_e2_charactor = strpos($crr_message, '欧');
	$pos_d_charactor = strpos($crr_message, '美金');
	$pos_d2_charactor = strpos($crr_message, '美元');
	$pos_y_charactor = strpos($crr_message, '人民币');
	$pos_y2_charactor = strpos($crr_message, '元');
	$pos_p_charactor = strpos($crr_message, '英镑');
	$pos_p2_charactor = strpos($crr_message, '镑');
	
	$pattern_price = '/^[0-9]+\s*[e|E|d|D|y|Y|p|P]$/';
	//$pattern_4c = '/^[0-9]+\.?[0-9]*(\s|\W)*[d|e|f|g|h|i|j|k|D|E|F|G|H|I|J|K](\s|\W)+(fl|if|vvs1|vvs2|vs1|vs2|si1|si2|FL|IF|VVS1|VVS2|VS1|VS2|SI1|SI2|vs|VS|vvs|VVS|si|SI)((\s|\W)+(ex|vg|gd|EX|VG|GD|\-))*((\s|\W)+(igi|hrd|gia|IGI|HRD|GIA))?((\s|\W)+(no|NO|No|nO|ft|md|st|vs|FT|MD|ST|VS))?(\s|\W)*$/';
	$pattern_4c = '/^((gz|zm|sd|xx|ty|gl|ld|GZ|ZM|SD|XX|TY|GL|LD)(\s|\W))?[0-9]+\.?[0-9]*(\s|\W)*[d|e|f|g|h|i|j|k|l|D|E|F|G|H|I|J|K|L|\-](\s|\W)+(fl|if|vvs1|vvs2|vs1|vs2|si1|si2|FL|IF|VVS1|VVS2|VS1|VS2|SI1|SI2|vs|VS|vvs|VVS|si|SI|\-)((\s|\W)+(ex|vg|gd|EX|VG|GD|\-))*((\s|\W)+(igi|hrd|gia|IGI|HRD|GIA))?((\s|\W)+(no|NO|No|nO|ft|md|st|vs|FT|MD|ST|VS))?(\s|\W)*$/';
	##################################################################################
	##################################################################################
	################################################################################## for price respond
	##################################################################################
	##################################################################################
	if(preg_match($pattern_price, $crr_message) || $pos_e_charactor>0  || $pos_d_charactor>0 || $pos_y_charactor>0 || $pos_p_charactor>0 || $pos_e2_charactor>0  || $pos_d2_charactor>0 || $pos_y2_charactor>0 || $pos_p2_charactor>0){
		
		$pattern_pricenumber = '/^[0-9]+\.?[0-9]+/';
		$matches = array();
		
		if (preg_match($pattern_pricenumber, $crr_message, $matches)) {
			$queryprice=$matches[0];
			
			$str_price_unit = trim(str_replace($queryprice, "", $crr_message));
			
			$sql_currency='SELECT * FROM convert_currency';
			foreach($conn->query($sql_currency) as $row_currency){
				$USD_EUR=$row_currency['USD_EUR'];
				$USD_GBP=$row_currency['USD_GBP'];
				$USD_CNY=$row_currency['USD_CNY'];
			}
			
			$user_unit='e';
			if($str_price_unit=='美金' || $str_price_unit=='美元' || $str_price_unit=='d' || $str_price_unit=='D'){
				$searchprice=$queryprice;
				$user_unit='d';
			}else if($str_price_unit=='人民币' || $str_price_unit=='元' || $str_price_unit=='y' || $str_price_unit=='Y'){
				$searchprice=$queryprice/$USD_CNY;
				$user_unit='y';
			}else if($str_price_unit=='欧元' || $str_price_unit=='欧' || $str_price_unit=='e' || $str_price_unit=='E'){
				$searchprice=$queryprice/$USD_EUR;
				$user_unit='e';
			}else if($str_price_unit=='英镑' || $str_price_unit=='镑' || $str_price_unit=='p' || $str_price_unit=='P'){
				$searchprice=$queryprice/$USD_GBP;
				$user_unit='p';
			}
			
			if(isset($searchprice)){
				$searchprice1=$searchprice*0.95;
				$searchprice2=$searchprice*1.10;
				$sql_price_perfect='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "D" OR color = "E" OR color = "F") AND (clarity = "FL" OR clarity = "IF" OR clarity = "VVS1" OR clarity = "VVS2") AND cut_grade = "EX" AND polish = "EX" AND symmetry = "EX" AND fluorescence_intensity = "None" AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price ASC LIMIT 1';
				$sql_price_size='SELECT * FROM diamonds WHERE shape = "BR" AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY carat DESC LIMIT 1';
				$sql_price_goodprice='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "D" OR color = "E" OR color = "F" OR color = "G"  OR color = "H" OR color = "I") AND (clarity = "SI1" OR clarity = "SI2" OR clarity = "VS1" OR clarity = "VS2") AND ((cut_grade = "VG" AND polish = "VG") OR (symmetry = "VG" AND cut_grade = "VG") OR (symmetry = "VG" AND polish = "VG")) AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price ASC LIMIT 1';
				$sql_price_lowprice='SELECT * FROM diamonds WHERE shape = "BR" AND (color = "J" OR color = "K" OR color = "G"  OR color = "H" OR color = "I") AND (clarity = "SI1" OR clarity = "SI2" OR clarity = "VS1" OR clarity = "VS2") AND ((cut_grade = "G") OR (symmetry = "G") OR (polish = "G")) AND retail_price BETWEEN '.$searchprice1.' AND '.$searchprice2.' AND status = "AVAILABLE" ORDER BY price ASC LIMIT 1';
				
				$stmt_price_perfect=$conn->query($sql_price_perfect);
				$found_price_perfect=$stmt_price_perfect->rowCount();
				
				$stmt_price_size=$conn->query($sql_price_size);
				$found_price_size=$stmt_price_size->rowCount();
				
				$stmt_price_goodprice=$conn->query($sql_price_goodprice);
				$found_price_goodprice=$stmt_price_goodprice->rowCount();
				
				$stmt_price_lowprice=$conn->query($sql_price_lowprice);
				$found_price_lowprice=$stmt_price_lowprice->rowCount();
				
				$thefeedbackcontentforwechatuser=$holidaymessage.'根据您的价位，我们为您推荐如下钻石：\n\n';
				
				if($found_price_perfect){
					foreach($stmt_price_perfect as $r){
						
						$ref=$r['stock_ref'];
						$shape=$r['shape'];
						$size=$r['carat'];
						$color=$r['color'];
						$clarity=trim($r['clarity']);
						if($clarity==''){
							$clarity='未知';
						}
						$cut=trim($r['cut_grade']);
						if($cut==''){
							$cut='未知';
						}
						$symmetry=trim($r['symmetry']);
						if($symmetry==''){
							$symmetry='未知';
						}
						$polish=trim($r['polish']);
						if($polish==''){
							$polish='未知';
						}
						$fluor_intensity=trim($r['fluorescence_intensity']);
						$total_sales_price_in_currency=$r['raw_price_retail'];
						$lab=$r['grading_lab'];
						
						
						if($fluor_intensity=='None'){
							$fluo_txt='; 无荧光. ';
						}else{
							$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
						}
						
						$price=$r['retail_price'];
						
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
							$user_price_marketing=round($price*$USD_EUR*2).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
							$user_price_marketing=round($price*$USD_CNY*2).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
							$user_price_marketing=round($price*$USD_GBP*2).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
							$user_price_marketing=($price*2).'美元';
						}
					}
					$thefeedbackcontentforwechatuser.="完美精品:\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$user_price."。（市场价：".$user_price_marketing."）\n\n";
				}
				if($found_price_size){
					foreach($stmt_price_size as $r){
						
						$ref=$r['stock_ref'];
						$shape=$r['shape'];
						$size=$r['carat'];
						$color=$r['color'];
						$clarity=trim($r['clarity']);
						if($clarity==''){
							$clarity='未知';
						}
						$cut=trim($r['cut_grade']);
						if($cut==''){
							$cut='未知';
						}
						$symmetry=trim($r['symmetry']);
						if($symmetry==''){
							$symmetry='未知';
						}
						$polish=trim($r['polish']);
						if($polish==''){
							$polish='未知';
						}
						$fluor_intensity=trim($r['fluorescence_intensity']);
						$total_sales_price_in_currency=$r['raw_price_retail'];
						$lab=$r['grading_lab'];
						
						
						if($fluor_intensity=='None'){
							$fluo_txt='; 无荧光. ';
						}else{
							$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
						}
						
						$price=$r['retail_price'];
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
							$user_price_marketing=round($price*$USD_EUR*2).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
							$user_price_marketing=round($price*$USD_CNY*2).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
							$user_price_marketing=round($price*$USD_GBP*2).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
							$user_price_marketing=($price*2).'美元';
						}
					}
					$thefeedbackcontentforwechatuser.="无敌大钻:\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$user_price."（市场价:".$user_price_marketing."）。\n\n";
				}
				if($found_price_goodprice){
					foreach($stmt_price_goodprice as $r){
						
						$ref=$r['stock_ref'];
						$shape=$r['shape'];
						$size=$r['carat'];
						$color=$r['color'];
						$clarity=trim($r['clarity']);
						if($clarity==''){
							$clarity='未知';
						}
						$cut=trim($r['cut_grade']);
						if($cut==''){
							$cut='未知';
						}
						$symmetry=trim($r['symmetry']);
						if($symmetry==''){
							$symmetry='未知';
						}
						$polish=trim($r['polish']);
						if($polish==''){
							$polish='未知';
						}
						$fluor_intensity=trim($r['fluorescence_intensity']);
						$total_sales_price_in_currency=$r['raw_price_retail'];
						$lab=$r['grading_lab'];
						
						
						if($fluor_intensity=='None'){
							$fluo_txt='; 无荧光. ';
						}else{
							$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
						}
						
						$price=$r['retail_price'];
						/*
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
						}
						*/
						
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
							$user_price_marketing=round($price*$USD_EUR*2).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
							$user_price_marketing=round($price*$USD_CNY*2).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
							$user_price_marketing=round($price*$USD_GBP*2).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
							$user_price_marketing=($price*2).'美元';
						}
						
					}
					$thefeedbackcontentforwechatuser.="高性价比:\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$user_price."（市场价:".$user_price_marketing."）。\n\n";
				}
//$thefeedbackcontentforwechatuser.=$searchprice1."-".$searchprice2;
				if($found_price_lowprice){
					foreach($stmt_price_lowprice as $r){
						
						$ref=$r['stock_ref'];
						$shape=$r['shape'];
						$size=$r['carat'];
						$color=$r['color'];
						$clarity=trim($r['clarity']);
						if($clarity==''){
							$clarity='未知';
						}
						$cut=trim($r['cut_grade']);
						if($cut==''){
							$cut='未知';
						}
						$symmetry=trim($r['symmetry']);
						if($symmetry==''){
							$symmetry='未知';
						}
						$polish=trim($r['polish']);
						if($polish==''){
							$polish='未知';
						}
						$fluor_intensity=trim($r['fluorescence_intensity']);
						$total_sales_price_in_currency=$r['raw_price_retail'];
						$lab=$r['grading_lab'];
						
						
						if($fluor_intensity=='None'){
							$fluo_txt='; 无荧光. ';
						}else{
							$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
						}
						
						$price=$r['retail_price'];
						/*
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
						}
						*/
						
						if($user_unit=='e'){
							$user_price=round($price*$USD_EUR).'欧元';
							$user_price_marketing=round($price*$USD_EUR*2).'欧元';
						}else if($user_unit=='y'){
							$user_price=round($price*$USD_CNY).'元';
							$user_price_marketing=round($price*$USD_CNY*2).'元';
						}else if($user_unit=='p'){
							$user_price=round($price*$USD_GBP).'英镑';
							$user_price_marketing=round($price*$USD_GBP*2).'英镑';
						}else if($user_unit=='d'){
							$user_price=$price.'美元';
							$user_price_marketing=($price*2).'美元';
						}
						
						
					}
					$thefeedbackcontentforwechatuser.="实惠优选:\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$user_price."（市场价:".$user_price_marketing."）。\n\n";
				}
				
				$thefeedbackcontentforwechatuser.='如果您有更多问题，欢迎与我们联系。\n客服微信：limeikefu\n电话：+32 (0)3 689 73 94';
			}else{
				$thefeedbackcontentforwechatuser='非常抱歉，我们无法确定您所选的货币，请重试。'.'\n\n'.$holidaymessage;
			}
		}else{
			$thefeedbackcontentforwechatuser='非常抱歉，我们无法识别您输入的价格，请重试。'.'\n\n'.$holidaymessage;
		}
		
	}else if(preg_match($pattern_4c, $crr_message)){
	##################################################################################
	##################################################################################
	################################################################################## for 4c respond
	##################################################################################
	##################################################################################
	
		$pattern_shape='/gz|zm|sd|xx|ty|gl|ld|GZ|ZM|SD|XX|TY|GL|LD/';
		if(preg_match($pattern_shape, $crr_message, $matches)){	
			$r_shape_byuser=strtoupper($matches[0]);
		}
		if(!isset($r_shape_byuser)){
			$r_shape_byuser='BR';
		}
		//BR
		switch ($r_shape_byuser){
			case "GZ":
			$r_shape="PR";
			$shape_title="公主方";
			break;
			
			case "ZM":
			$r_shape="EM";
			$shape_title="祖母绿";
			break;
			
			case "SD":
			$r_shape="PS";
			$shape_title="水滴";
			break;
			
			case "XX":
			$r_shape="HS";
			$shape_title="心";
			break;
			
			case "TY":
			$r_shape="OV";
			$shape_title="椭圆";
			break;
			
			case "GL":
			$r_shape="MQ";
			$shape_title="橄榄";
			break;
			
			case "LD":
			$r_shape="RAD";
			$shape_title="雷蒂恩";
			break;
			
			case "ZX":
			$r_shape="CU";
			$shape_title="枕";
			break;
			
			default:
			$r_shape="BR";
			$shape_title="圆";
		}
		
		
	
	    $pattern_size='/[0-9]+\.?[0-9]*/';
		if(preg_match($pattern_size, $crr_message, $matches)){	
			$r_size=$matches[0];
		}
		$r_size1=$r_size-0.02;
		$r_size2=$r_size+0.02;
		
		
		
		//define the range for the weight search
		###########################################################
		###########################################################
		###########################################################
		if($r_size<0.3){
			$r_size1=$r_size*0.9;
		}elseif ($r_size>=0.3 && $r_size<0.4) {
			if(($r_size*0.9)<0.3){
				$r_size1=0.3;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=0.4 && $r_size<0.5) {
			if($r_size*0.9<0.4){
				$r_size1=0.4;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=0.5 && $r_size<0.7) {
			if($r_size*0.9<0.5){
				$r_size1=0.5;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=0.7 && $r_size<0.9) {
			if($r_size*0.9<0.7){
				$r_size1=0.7;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=0.9 && $r_size<1) {
			if($r_size*0.9<0.9){
				$r_size1=0.9;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=1 && $r_size<1.5) {
			if($r_size*0.9<1){
				$r_size1=1;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=1.5 && $r_size<2) {
			if($r_size*0.9<1.5){
				$r_size1=1.5;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=2 && $r_size<3) {
			if($r_size*0.9<2){
				$r_size1=2;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=3 && $r_size<4) {
			if($r_size*0.9<3){
				$r_size1=3;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=4 && $r_size<5) {
			if($r_size*0.9<4){
				$r_size1=4;
			}else{
				$r_size1=$r_size*0.9;
			}
		}elseif ($r_size>=5) {
			if($r_size*0.9<5){
				$r_size1=5;
			}else{
				$r_size1=$r_size*0.9;
			}
		}
		$r_size2=$r_size*1.1;
		
		
		$query_weight_to=$query_weight_to_raw*1.1;
		
		###########################################################
		###########################################################
		###########################################################
		//end define the weight range
		
		
		
		
		
		
		$pattern_color='/(\s|\W)+(d|e|f|g|h|i|j|k|D|E|F|G|H|I|J|K|\-)(\s|\W)+/';
		if(preg_match($pattern_color, $crr_message, $matches)){
			$r_color=trim(strtoupper($matches[0]));
			if(trim($r_color)!='-'){
				$r_color_q=' AND color = "'.$r_color.'" ';
			}else{
				$r_color_q='';
			}
		}else{
			$r_color_q='';
		}
		
		$pattern_clarity='/(fl|if|vvs1|vvs2|vs1|vs2|si1|si2|FL|IF|VVS1|VVS2|VS1|VS2|SI1|SI2|vvs|VVS|vs|VS|si|SI)/';
		if(preg_match($pattern_clarity, $crr_message, $matches)){
			$r_clarity=strtoupper($matches[0]);
		}
		
		if($r_clarity=='VS' || $r_clarity=='vs'){
			$r_clarity_q=' (clarity = "VS1" OR clarity = "VS2") ';
		}else if($r_clarity=='VVS' || $r_clarity=='vvs'){
			$r_clarity_q=' (clarity = "VVS1" OR clarity = "VVS2") ';
		}else if($r_clarity=='si' || $r_clarity=='SI'){
			$r_clarity_q=' (clarity = "SI1" OR clarity = "SI2") ';
		}else{
			$r_clarity_q=' clarity = "'.strtoupper($r_clarity).'" ';
		}
		
		
		$pattern_cut='/ex|vg|gd|EX|VG|GD|\-/';
		if(preg_match_all($pattern_cut, $crr_message, $matches)){
			//$r_clarity=$matches[0];
			if(isset($matches[0][0])){
				$r_cut=strtoupper($matches[0][0]);
			}
			if(isset($matches[0][1])){
				$r_polish=strtoupper($matches[0][1]);
			}
			if(isset($matches[0][2])){
				$r_symm=strtoupper($matches[0][2]);
			}
		}
		
		if(isset($r_cut)){
			if(strtoupper($r_cut)=='GD'){
				$r_cut='G';
			}else if(trim($r_cut)=='-'){
				$sql_part_cut='';
			}
			$sql_part_cut=' AND cut_grade = "'.strtoupper($r_cut).'" ';
		}else{
			$sql_part_cut='';
		}
		if(isset($r_polish)){
			if(strtoupper($r_polish)=='GD'){
				$r_polish='G';
			}else if($r_polish=='-'){
				$sql_part_polish='';
			}
			$sql_part_polish=' AND polish = "'.strtoupper($r_polish).'" ';
		}else{
			$sql_part_polish='';
		}
		if(isset($r_symm)){
			if(strtoupper($r_symm)=='GD'){
				$r_symm='G';
			}else if($r_symm=='-'){
				$sql_part_symm='';
			}
			$sql_part_symm=' AND symmetry = "'.strtoupper($r_symm).'" ';
		}else{
			$sql_part_symm='';
		}
		
		
		$pattern_lab='/(igi|hrd|gia|IGI|HRD|GIA)/';
		if(preg_match($pattern_lab, $crr_message, $matches)){			
				$r_lab=strtoupper($matches[0]);			
		}else{
			$r_lab='GIA';
		}
		
		
		$pattern_fluo='/(no|NO|No|nO|ft|md|st|vs|FT|MD|ST|VS)/';
		if(preg_match($pattern_fluo, $crr_message, $matches)){
			$r_fluo=$matches[0];
		}
		
		$sql_4c='SELECT * FROM diamonds WHERE shape= "'.$r_shape.'" AND carat >= "'.$r_size1.'" AND carat < "'.$r_size2.'" '.$r_color_q.' AND '.$r_clarity_q.$sql_part_cut.$sql_part_polish.$sql_part_symm.'AND grading_lab = "'.$r_lab.'" AND status = "AVAILABLE" ORDER BY price ASC LIMIT 5';
		
		$stmt_4c=$conn->query($sql_4c);
		$found_4c=$stmt_4c->rowCount();
		
		$error=$conn->errorInfo();
		if(isset($error[2])) {
			//$thefeedbackcontentforwechatuser=$error[2];
			$thefeedbackcontentforwechatuser='非常抱歉，发生未知错误，请重试。'.$error[2];
		}
		
		if($found_4c){
			$thefeedbackcontentforwechatuser=$holidaymessage.'根据您提供的条件，我们为您挑选出如下'.$found_4c.'颗'.$shape_title.'形钻石：\n';
			foreach($stmt_4c as $r){
				$ref=$r['stock_ref'];
				$shape=$r['shape'];
				$size=$r['carat'];
				$color=$r['color'];
				$clarity=trim($r['clarity']);
				if($clarity==''){
					$clarity='未知';
				}
				$cut=trim($r['cut_grade']);
				if($cut==''){
					$cut='未知';
				}
				$symmetry=trim($r['symmetry']);
				if($symmetry==''){
					$symmetry='未知';
				}
				$polish=trim($r['polish']);
				if($polish==''){
					$polish='未知';
				}
				$fluor_intensity=trim($r['fluorescence_intensity']);
				$total_sales_price_in_currency=$r['raw_price_retail'];
				$lab=$r['grading_lab'];
				
				
				if($fluor_intensity=='None'){
					$fluo_txt='; 无荧光. ';
				}else{
					$fluo_txt='; 荧光：'.$fluor_intensity.'. ';
				}
				$price=$r['retail_price'];
		
				$sql_currency='SELECT * FROM convert_currency';
				$stmt_currency=$conn->query($sql_currency);
				foreach($stmt_currency as $row_currency){
					$USD_EUR=$row_currency['USD_EUR'];
					$USD_GBP=$row_currency['USD_GBP'];
					$USD_CNY=$row_currency['USD_CNY'];
				}		
				$price_euro=round($price*$USD_EUR);
				$price_y=round($price*$USD_CNY);
				$price_y_marketing=$price_y*2;
				if($r_shape=='BR'){
					$thefeedbackcontentforwechatuser.="\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 切工，抛光与对称性分别为：".$cut.", ".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$price_euro."欧元(".$price_y."人民币)。市场价:".$price_y_marketing."人民币。\n\n";
				}else{
					$thefeedbackcontentforwechatuser.="\n库存编号为 ".$ref.": 该钻石为".$size."克拉，".$color."色，净度".$clarity."; 抛光与对称性分别为：".$polish.", ".$symmetry.$fluo_txt." 配有 ".$lab." 证书. 价格为 ".$price_euro."欧元(".$price_y."人民币)。市场价:".$price_y_marketing."人民币。\n\n";
				}
			}
			
			$thefeedbackcontentforwechatuser.="如果您有更多问题，欢迎与我们联系。\n客服微信：limeikefu\n电话：+32 (0)3 689 73 94";
		}else{
			$thefeedbackcontentforwechatuser='抱歉，我们无法找到符合您要求的钻石，请调整挑选条件并重试。'.'\n\n'.$holidaymessage;;
		}
	}else{
		$thefeedbackcontentforwechatuser="欢迎关注利美钻石，我们有24小时客服随时为您提供服务，欢迎添加利美客服号:limeikefu或致电 +32 (0)3 689 73 94\n<a href=\"https://mp.weixin.qq.com/s?__biz=MzIyNzA2NjE1OQ==&mid=2653294074&idx=2&sn=ccfd7b99c12a7ea7beb596877c4842b0&chksm=f3b445bac4c3ccacaa1e7f8045558d1b6ba247ab94764614c2c6103efe2268df25022bb9c1e4\">Lumia利美公众号使用指南﻿</a>";
		//exit();
	}	
}
logger($thefeedbackcontentforwechatuser);
$sql_w_openid='SELECT id, wechat_name FROM clients_list WHERE wechat_open_id = "'.$crr_c_o_id.'"';
foreach($conn->query($sql_w_openid) as $row_check){
	$crr_c_id=$row_check['id'];
	$wechatnameofuser=$row_check['wechat_name'];
}
	
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
	$stmt->bindParam(':wechat_open_id', $crr_c_o_id, PDO::PARAM_STR);
	$stmt->bindParam(':wechat_name', $wechatnameofuser, PDO::PARAM_STR);
	$stmt->bindParam(':message', $thefeedbackcontentforwechatuser, PDO::PARAM_STR);
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
    
	return $thefeedbackcontentforwechatuser;
}
