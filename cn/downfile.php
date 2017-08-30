<?php 
function downfile($fileurl,$filename)
{
 ob_start(); 
 $date=date("Ymd-H:i:m");
 header( "Content-type:  application/octet-stream "); 
 header( "Accept-Ranges:  bytes "); 
 header( "Content-Disposition:  attachment;  filename= {$filename}"); 
 $size=readfile($fileurl); 
  header( "Accept-Length: " .$size);
}
 $url="https://www.gia.edu/otmm_wcs_int/proxy-pdf/?ReportNumber=1218944382&url=https://myapps.gia.edu/RptChkClient/reportClient.do?ReportNumber=25E4FDD2C083917217A874B5114C20E3";
 $filename="1218944382.pdf";
 downfile($url,$filename);
?> 