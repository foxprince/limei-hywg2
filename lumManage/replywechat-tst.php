<?php

require_once('getaccesstoken.php');


$crr_c_id=$_POST['clientID'];
$crr_message='你好你好123abc';



$wechatopenidofuser='oCgWSjjJlKj7EmTZ5reKxLU2U6nM';
$wechatnameofuser="testing";


$urltopost='https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='.$theaccesstoken;

//$messageToPost=iconv('UTF-16', 'UTF-8', $crr_message);
//$trans_sentence = iconv('UTF-8', 'ASCII//TRANSLIT', $utf8_sentence);
//$data = array("touser" => $wechatopenidofuser, "msgtype" => "text", "text" => array("content"=>$crr_message));

$data = '{
        "touser":"'.$wechatopenidofuser.'",
        "msgtype":"text",
        "text":
        {
             "content":"'.$crr_message.'"
        }
    }';
                                                                    
//$data_string = json_encode($data);                                                                                   
 
$ch = curl_init($urltopost);     
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

/*                                                                
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
//CURLOPT_HEADER         => TRUE,                                                                        
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json; charset=UTF-8',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);*/
//curl_setopt($x, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded; charset=UTF-8'));                                                                                                                   
 
$result = curl_exec($ch);
echo  $result.'-------';
$obj_reply = json_decode($result);
//echo $obj_reply.'$$$--------$$$';
$reply_feedback=$obj_reply->{'errmsg'};
echo $reply_feedback;
