<?php
include_once('../log.php');
$lab = $_REQUEST['lab'];
$certNo = $_REQUEST['certNo'];
$destination = '../../labpdf/'.$lab.'_'.$certNo.'.pdf';
if(!file_exists($destination)) {
	if($lab=='HRD')
		$certi_linker="http://ws2.hrdantwerp.com/HRD.CertificateService.WebAPI/certificate?certificateType=MCRT&certificateNumber=". $certNo;
	else if($lab=='GIA')
		$certi_linker="https://www.gia.edu/otmm_wcs_int/proxy-pdf/?url=https://myapps.gia.edu/RptChkClient/reportClient.do?ReportNumber=55D341284A617F73B46866D227152ECE&ReportNumber=".$certNo;
	else if($lab=='IGI')
		$certi_linker="http://global.igiworldwide.com/viewpdf.php?r=".$certNo;
		$ch = curl_init();//初始化一个cURL会话
		curl_setopt($ch,CURLOPT_URL,$certi_linker);//抓取url
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);//是否显示头信息
		//curl_setopt($ch,CURLOPT_SSLVERSION,3);//传递一个包含SSL版本的长参数
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		$data = curl_exec($ch);// 执行一个cURL会话
		if (!$data) {
			logger("curl error:".curl_error($ch));
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
        <div style="margin-top:50px;padding-bottom:85px;">
            <iframe frameborder="0" scrolling="yes" src="pdf/web/viewer.html?file=../../<?php echo $destination;?>" width="100%">
            </iframe>
        </div>
        <script>
            $(function () {
            var _height = $(window).height() - 20;
            $("iframe").attr("height", _height + "px");
            $("iframe").attr("width", $(window).width() + "px");
        })
        </script>
    </body>
</html>
