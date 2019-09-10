<?php
require_once ('../cn/log.php');
if (isset ( $_POST ['id'] )) {
	require_once ('./getaccesstoken2015.php');
	require_once ('../cn/connection.php');
	require_once ('./imgTools.php');
	$conn = dbConnect ( 'write', 'pdo' );
	$conn->query ( "SET NAMES 'utf8'" );
	
	$id = $_POST ['id'];
	$filename = createQrcode ( $theaccesstoken, $id );
	logger ( 'qr file:' . $filename );
	if ($filename) {
		$sql_update_qrcode = 'UPDATE clients_list SET qrcode = "' . $id . '.jpg" WHERE id = "' . $id . '"';
		logger ( $sql_update_qrcode );
		$stmt = $conn->query ( $sql_update_qrcode );
		echo 'OK';
	} else {
		echo 'FAIL';
	}
}
function createQrCode($theaccesstoken, $id) {
	logger ( "token" . $theaccesstoken );
	$data = '{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": ' . $id . '}}}';
	$createUrl = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" . $theaccesstoken;
	logger ( $createUrl );
	$contents = request_by_curl ( $createUrl, $data );
	logger ( "content:" . $contents );
	$jsonInfo = json_decode ( $contents, true );
	$ticket = $jsonInfo ["ticket"];
	$showqrcodeUrl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" . urlencode ( $ticket );
	$imageInfo = downloadImageFromWeiXin ( $showqrcodeUrl );
	
	$filename = "./qrcode/" . $id . ".jpg";
	$local_file = fopen ( $filename, 'w' );
	$thumbnail = "./qrcode/" . $id . "_200x200.jpg";
	if (false !== $local_file) {
		if (false !== fwrite ( $local_file, $imageInfo ["body"] )) {
			fclose ( $local_file );
			$CImage = new CImage ();
			$CImage->CreateThumbnail ( $filename, 200, 200, $thumbnail );
			return $filename;
		}
	}
	return NULL;
}
function downloadImageFromWeiXin($url) {
	$ch = curl_init ( $url );
	curl_setopt ( $ch, CURLOPT_HEADER, 0 );
	curl_setopt ( $ch, CURLOPT_NOBODY, 0 ); // 只取body头
	curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
	curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	$package = curl_exec ( $ch );
	$httpinfo = curl_getinfo ( $ch );
	curl_close ( $ch );
	return array_merge ( array (
			'body' => $package 
	), array (
			'header' => $httpinfo 
	) );
}
function request_by_curl($url, $data = null) {
	$ch = curl_init ();
	curl_setopt ( $ch, CURLOPT_URL, $url );
	curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
	curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
	curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
	curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, 1 );
	curl_setopt ( $ch, CURLOPT_AUTOREFERER, 1 );
	curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
	$info = curl_exec ( $ch );
	if (curl_errno ( $ch )) {
		echo 'Errno' . curl_error ( $ch );
	}
	curl_close ( $ch );
	return $info;
}
?>
