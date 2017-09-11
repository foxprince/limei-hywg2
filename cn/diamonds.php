<?php 
session_start();
function gheader($url)  
{  
echo '<html><head><meta http-equiv="Content-Language" content="utf-8"><meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=utf-8"><meta http-equiv="refresh"  
content="0;url='.$url.'"><title>loading ... </title></head><body>
<script>window.location="'.$url.'";</script></body></html>';  
exit();  
}  
gheader('dia.php');
?>