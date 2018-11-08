<?php
include_once('../log.php');
function getHTTPS($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_REFERER, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}
$lab = $_REQUEST['lab'];
if($lab=='GIA'){
	header("Location: https://www.gia.edu/report-check?reportno=".$certNo);
	exit;
}
$certNo = $_REQUEST['certNo'];
$destination = '../../labpdf/'.$lab.'_'.$certNo.'.pdf';
if(!file_exists($destination)) {
	if($lab=='HRD')
		$certi_linker="http://ws2.hrdantwerp.com/HRD.CertificateService.WebAPI/certificate?certificateType=MCRT&certificateNumber=". $certNo;
	else if($lab=='GIA') {
		$certi_linker="https://api.checkgems.com/api/v2/certs/GIA/".$certNo.".pdf";
		//$url="https://www.gia.edu/report-check?reportno=".$certNo;
		//logger(getHTTPS($url));
	}
	else if($lab=='IGI')
		$certi_linker="http://global.igiworldwide.com/viewpdf.php?r=".$certNo;
	$ch = curl_init();//初始化一个cURL会话
	curl_setopt($ch,CURLOPT_URL,$certi_linker);//抓取url
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);//是否显示头信息
	//curl_setopt($ch,CURLOPT_SSLVERSION,3);//传递一个包含SSL版本的长参数
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	$data = curl_exec($ch);// 执行一个cURL会话
	if (!$data) {
		logger("curl error:".$certi_linker.":".curl_error($ch));
	} else {
		$file = fopen($destination,"w+");
		fputs($file,$data);//写入文件
		fclose($file);
	}
	curl_close($ch);//关闭一个cURL会话并且释放所有资源
}	

?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>
        </title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=640" name="viewport">
            <link href="css/style.css" media="screen" rel="stylesheet">
                <script src="js/jquery.js" type="text/javascript">
                </script>
                <script src="js/iscroll.js">
                </script>
                <script src="js/default.js">
                </script>
                <script src="js/pdf.js">
                </script>
            </link>
        </meta>
    </head>
    <body>
        <div>
            <iframe frameborder="0" scrolling="yes" src="pdf/web/viewer.html?file=../../<?php echo $destination;?>" width="100%">
            </iframe>
        </div>
        <script>
            $(function () {
            var _height = $(window).height();
            $("iframe").attr("height", _height + "px");
            $("iframe").attr("width", $(window).width() + "px");
        })
        </script>
    </body>
</html>
