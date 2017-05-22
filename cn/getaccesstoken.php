<?php

// Get cURL resource
$curl = curl_init();
// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    //CURLOPT_URL => 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5a50984dd2d7d74a&secret=15c0f2a0d14a98577a90af0e2b02b19b',
		CURLOPT_URL => 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxcf411df5000e9692&secret=88984f146a5d48184db464cfb354d322',
    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources
curl_close($curl);

//$json = '{"foo-bar": 12345}';

$obj = json_decode($resp);
$theaccesstoken=$obj->{'access_token'}; // 12345
//echo $theaccesstoken;