<?php
header("Content-type: text/html; charset=utf-8");
static $realip = NULL;
$url='http://freeapi.ipip.net/'.get_ip();
try{
	$html = file_get_contents($url);
	$arr = json_decode($html);
	if($arr[0]=='中国') {
		header("Location: http://cn.lumiagem.com/cn/index.php");
		exit;
	}
	else {
		header("Location: http://www.lumiagem.com/cn/index.php");
		exit;
	}
}catch(Exception $e){
	header("Location: http://www.lumiagem.com/cn/index.php");
	exit;
}
function get_ip(){
	if($realip !== NULL){
		return $realip;
	}
	//判断服务器是否允许$_SERVER
	if(isset($_SERVER)){
		if(isset($_SERVER[HTTP_X_FORWARDED_FOR])){
			$realip = $_SERVER[HTTP_X_FORWARDED_FOR];
		}elseif(isset($_SERVER[HTTP_CLIENT_IP])) {
			$realip = $_SERVER[HTTP_CLIENT_IP];
		}else{
			$realip = $_SERVER[REMOTE_ADDR];
		}
	}else{
		//不允许就使用getenv获取
		if(getenv("HTTP_X_FORWARDED_FOR")){
			$realip = getenv( "HTTP_X_FORWARDED_FOR");
		}elseif(getenv("HTTP_CLIENT_IP")) {
			$realip = getenv("HTTP_CLIENT_IP");
		}else{
			$realip = getenv("REMOTE_ADDR");
		}
	}

	return $realip;
}
?>