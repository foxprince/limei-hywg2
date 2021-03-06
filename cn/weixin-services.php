<?php
include_once ('log.php');
include_once ('autoreply.php');
include_once('./lib/emoji.php');
require_once ('connection.php');
define ( "TOKEN", "lumia123weixin" );
$wechatObj = new wechatCallbackapiTest ();
$wechatObj->valid ();
$wechatObj->responseMsg ();

class wechatCallbackapiTest {
	public $msg8001 = "扫描成功，感谢您参加Lumia利美钻石钻石文化与鉴赏讲座活动，您已获得抽奖资格，敬请期待开奖吧/::)";
	public $found_user = false;
	public $clientID;
	public $website_username;
	public $website_password;
	public function __construct() {
	}
	
	public function responseMsg() {
		// get post data, May be due to the different environments
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
		$reference = 'FINAL-WECHAT';
		logger ( "post:" . $postStr );
		if (! empty ( $postStr )) {
			libxml_disable_entity_loader ( true );
			$postObj = simplexml_load_string ( $postStr, 'SimpleXMLElement', LIBXML_NOCDATA );
			$fromUsername = $postObj->FromUserName;
			$toUsername = $postObj->ToUserName;
			$keyword = trim ( $postObj->Content );
			$MsgType = $postObj->MsgType;
			$theevent = $postObj->Event;
			if($MsgType == 'event'&&$theevent == 'unsubscribe'){
				$this->unsubscribe($fromUsername);
				echo "";
				exit();
			}
			else {
				if($this->checkUser($fromUsername)>0)
					$this->updateUser($fromUsername);
				else
					$this->subscribe($fromUsername,$postObj);
			}
			$textTpl = "<xml> <ToUserName><![CDATA[%s]]></ToUserName> <FromUserName><![CDATA[%s]]></FromUserName> <CreateTime>%s</CreateTime> <MsgType><![CDATA[%s]]></MsgType> <Content><![CDATA[%s]]></Content> </xml>";
			
            if ($MsgType == 'event') {
				if ($theevent == 'SCAN'){
					$contentStr = $this->scan($fromUsername,$postObj->EventKey);
					$resultStr = sprintf ( $textTpl, $fromUsername, $toUsername, time(), "text", $contentStr );
					logger ( $resultStr );
					echo $resultStr;
				}
				else if ($theevent == 'CLICK') {
					$contentStr = $this->click($fromUsername,$postObj);
					$resultStr = sprintf ( $textTpl, $fromUsername, $toUsername, time(), "text", $contentStr );
					logger ( $resultStr );
					echo $resultStr;
				}
				else if ($theevent == 'subscribe') {
					$contentStr = "感谢您关注比利时利美珠宝首饰公司!" ;
					$contentStr .= $this->subscribe($fromUsername,$postObj);
					$resultStr = sprintf ( $textTpl, $fromUsername, $toUsername, time(), "text", $contentStr );
					echo $resultStr;
					//$this->pushMsg($fromUsername, $this->subscribe($fromUsername,$postObj));
				}
				exit ();
			}
			else if ($MsgType == 'text') {
				$keywordisTXT = true;
				$keyword = trim ( $postObj->Content );
			} else if ($MsgType == 'image') {
				$keyword = trim ( $postObj->PicUrl );
				$MediaId = $postObj->MediaId;
			} else if ($MsgType == 'voice') {
				$keyword = 'voice & video';
				$MediaId = $postObj->MediaId;
				$Format = $postObj->Format;
			} else if ($MsgType == 'video') {
				$keyword = 'voice & video';
				$MediaId = $postObj->MediaId;
				$Format = $postObj->Format;
				$ThumbMediaId = $postObj->ThumbMediaId;
			} else if ($MsgType == 'location') {
				$keyword = 'location';
				$Location_X = $postObj->Location_X;
				$Location_Y = $postObj->Location_Y;
				$Label = $postObj->Label;
			} else if ($MsgType == 'link') {
				$keyword = 'Url';
				$Title = $postObj->Title;
				$Description = $postObj->Description;
			}
				
			// #################################################################################
			// --------------------------------------------------------------------------------#
			// ----- 2 save the user message to the database ----------------------------------#
			// #################################################################################
			if (isset ( $keyword )) {
				$this->logMsg($fromUsername,$postObj);
			}
			$keyArray = array("克拉", "切工", "净度", "颜色","证书","异形钻","保养","退税");
			// ################# END second of all, if it's not an event, save the message to the database message table END ##################################
			if ($keywordisTXT) {
				//$urltopost = 'http://www.lumiagem.com/autoreply.php';
				// $messageToPost=iconv('UTF-16', 'UTF-8', $crr_message);
				// $trans_sentence = iconv('UTF-8', 'ASCII//TRANSLIT', $utf8_sentence);
				// $data = array("touser" => $wechatopenidofuser, "msgtype" => "text", "text" => array("content"=>$crr_message));
				//$data = '{ "user_open_id":"' . $fromUsername . '", "content":"' . $keyword . '" }';
				logger("autoreply....");
				$result = autoreply( $fromUsername, $keyword);
				$resultStr = sprintf( $textTpl, $fromUsername, $toUsername, time(), "text", $result );
				logger ( "result:".$resultStr );
				echo $resultStr;
				exit ();
			} else {
				echo "Input something...";
			}
		} else {
			echo "";
			exit ();
		}
	}
	function keywordReply($fromUsername, $toUsername,$keyword) {
		$newsTplHead = "<xml>
                <ToUserName><![CDATA[%s]]></ToUserName>
                <FromUserName><![CDATA[%s]]></FromUserName>
                <CreateTime>%s</CreateTime>
                <MsgType><![CDATA[news]]></MsgType>
                <ArticleCount>1</ArticleCount>
                <Articles>";
		$newsTplBody = "<item>
                <Title><![CDATA[%s]]></Title>
                <Description><![CDATA[%s]]></Description>
                <PicUrl><![CDATA[%s]]></PicUrl>
                <Url><![CDATA[%s]]></Url>
                </item>";
		$newsTplFoot = "</Articles> <FuncFlag>0</FuncFlag> </xml>";
		$header = sprintf($newsTplHead, $fromUsername, $toUsername, time());
		if($keyword=='克拉') {
			$title = '你所应该了解的关于4C的一切之克拉';
			$desc = '你所应该了解的关于4C的一切之克拉';
			$picUrl = 'http://mmbiz.qpic.cn/mmbiz_jpg/hLNfXETdjibRo3amGmC61rMGqoLmcL5M1zRpYxv5bkRXNKmByos4C0Y1M919w0iaVJPibA8cibQ6KJude1LV4XibEfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1';
			$url = 'https://mp.weixin.qq.com/s?__biz=MzIyNzA2NjE1OQ==&mid=2653290756&idx=1&sn=719983acc8a03bd09b7a76f9c1edbb31&chksm=f3b44944c4c3c052e0645f1566632d95a0943584afebeb50e605bd4eee105c29863844271d2d&scene=21';
		}
		$body = sprintf($newsTplBody, $title, $desc, $picUrl, $url);
		$FuncFlag = 0;
		$footer = sprintf($newsTplFoot, $FuncFlag);
		return $header.$body.$footer;
	}
	function logMsg($fromUsername,$postObj) {
		$MsgId = $postObj->MsgId;
		if (! isset ( $MediaId )) { $MediaId = '-'; }
		if (! isset ( $Format )) { $Format = '-'; }
		if (! isset ( $ThumbMediaId )) { $ThumbMediaId = '-'; }
		if (! isset ( $Location_X )) { $Location_X = '-'; }
		if (! isset ( $Location_Y )) { $Location_Y = '-'; }
		if (! isset ( $Label )) { $Label = '-'; }
		if (! isset ( $Title )) { $Title = '-'; }
		if (! isset ( $Description )) { $Description = '-'; }
		$if_wechat = 'NEW';
		// ######### END 第一次发信息将收到 利美客服消息 END
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql = 'INSERT INTO wechat_record (client_id, wechat_open_id, wechat_name, message, CreateTime, MsgType, MsgId, MediaId, Format, ThumbMediaId, Location_X, Location_Y, Label, Title, Description, if_wechat) VALUES(:client_id, :wechat_open_id, :wechat_name, :message, NOW(), :MsgType, :MsgId, :MediaId, :Format, :ThumbMediaId, :Location_X, :Location_Y, :Label, :Title, :Description, :if_wechat)';
		$stmt = $conn->prepare ( $sql );
		$stmt->bindParam ( ':client_id', $this->clientID, PDO::PARAM_STR );
		$stmt->bindParam ( ':wechat_open_id', $fromUsername, PDO::PARAM_STR );
		$stmt->bindParam ( ':wechat_name', $wechat_name, PDO::PARAM_STR );
		$stmt->bindParam ( ':message', $keyword, PDO::PARAM_STR );
		$stmt->bindParam ( ':MsgType', $MsgType, PDO::PARAM_STR );
		$stmt->bindParam ( ':MsgId', $MsgId, PDO::PARAM_STR );
		$stmt->bindParam ( ':MediaId', $MediaId, PDO::PARAM_STR );
		$stmt->bindParam ( ':Format', $Format, PDO::PARAM_STR );
		$stmt->bindParam ( ':ThumbMediaId', $ThumbMediaId, PDO::PARAM_STR );
		$stmt->bindParam ( ':Location_X', $Location_X, PDO::PARAM_STR );
		$stmt->bindParam ( ':Location_Y', $Location_Y, PDO::PARAM_STR );
		$stmt->bindParam ( ':Label', $Label, PDO::PARAM_STR );
		$stmt->bindParam ( ':Title', $Title, PDO::PARAM_STR );
		$stmt->bindParam ( ':Description', $Description, PDO::PARAM_STR );
		$stmt->bindParam ( ':if_wechat', $if_wechat, PDO::PARAM_STR );
		$stmt->execute ();
		return $stmt->rowCount ();
	}
	public function valid() {
		$echoStr = $_GET ["echostr"];
		if ($this->checkSignature ()) {
			echo $echoStr;
		}
	}
	function scan($fromUsername,$eventKey) {
		//<EventKey><![CDATA[8001]]></EventKey>
		$contentStr = '您用来登录利美网站的用户名：' . $this->website_username . '  密码：' . $this->website_password;
		if($eventKey=='8001') {
			$contentStr .= "\n".$this->event20170526($fromUsername);//$contentStr." \n".$this->msg8001;
		}
		return $contentStr;
	}
	function event20170526($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql = 'UPDATE clients_list SET more_info = "20170526wenzhou" WHERE wechat_open_id = ?'; // $fromUsername
		$stmt = $conn->prepare ( $sql );
		$stmt->execute ( array ( $fromUsername ) );
		return $this->msg8001;
	}
	public function click($fromUsername,$postObj) {
		$thebutton = $postObj->EventKey;
		$contentStr = "系统升级中...请稍后";
		if ($thebutton == "KEY_BUDGET") {
			$contentStr = '1. 输入您的预算金额，比如 "5000 欧元" "5000 美金" “50000 人民币” “5000 英镑”（有无空格均可） 我们推荐适合此预算的钻石。如果不输入货币单位，那么默认为欧元。 2. 您的预算金额，用货币英文的首字母也可以 "5000 e", "5000 d", "50000 y", "5000 p" 大小写无所谓，有无空格均可。 euro dollar yuan pound.';
		} else if ($thebutton == "KEY_STOCK_REF") {
			$contentStr = '输入您预先得知的库存编号，我们返回此编号钻石的价格和详细信息给您。比如 54183419 如何得知库存编号？ 在我们官网的精品钻石栏目里（http://www.lumiagem.com ）可以查看所有的库存钻石，每颗钻石都有相应编号。如果你想了解相应钻石的价格和详细信息，则需要用库存编号来这个微信里查询。';
		} else if ($thebutton == "KEY_4CS") {
			$contentStr = '1. 输入您要查找的钻石参数， 格式为“0.75 f vvs1 ex ex ex” 我们返回“0.75克拉， f色，vvs1净度 切工excellent 打磨excellent 对称 excellent”的钻石报价给您。输入大小写都可以的。 颜色：D~K; 净度： fl, if, vvs1, vvs2, vs1, vs2, si1, si2; 切工打磨对称： ex vg gd； 2. 如果钻石某项参数您都可以接受，可以用-代替 比如钻石的打磨用-代替即可。“1.20 g si2 vg - vg” 3. 证书：GIA HRD IGI 需要查证书的话加在最后, 如 “0.75 f vvs1 ex ex ex gia”';
		} else if ($thebutton == "KEY_FANCYSHAPE") {
			$contentStr = '异形钻查询：输入您要查找的钻石参数， 格式为“gz 0.75 f vvs1 ex ex” 我们返回“公主方 0.75克拉， f色，vvs1净度 打磨excellent 对称 excellent”的钻石。 注意异形钻只有对称和打磨没有切工的参数。 两字母用首字母拼音：公主方钻石gz、祖母绿形（长方）钻石zm、水滴形（梨形）钻石sd、心形钻xx、椭圆钻ty、橄榄形钻石gl、雷蒂恩形ld、枕形钻石zx';
		} else if ($thebutton == "KEY_JEWLERY") {
			$contentStr = '<a href="https://drive.google.com/folderview?id=0B1PdwXeXM9pXfm5CVHJTeThMUDQ1MEh6QkQ1QzZvUS0xNW56dkpPSDZyUVc3WFU0RzVQWDg&usp=sharing">点击查看精美首饰款式 所有的戒托有现货或者可以订制</a>';
		} else if ($thebutton == "KEY_QRCODE") {
			$conn = dbConnect ( 'write', 'pdo' );
			$conn->query ( "SET NAMES 'utf8'" );
			$sql_check_user = 'SELECT id,qrcode FROM clients_list WHERE wechat_open_id = "' . $fromUsername . '"';
			$r_u = $conn->query ( $sql_check_user )->fetch(PDO::FETCH_ASSOC);
			$content = array ();
			if ($r_u ['qrcode']) {
				$content [] = array (
						"Title" => "动态二维码",
						"Description" => "您在利美钻石的专属动态二维码，可以发给您的朋友共享",
						"PicUrl" => "http://www.lumiagem.com/luAdmin/qrcode/" . $r_u ['id'] . "_200x200.jpg",
						"Url" => "http://www.lumiagem.com/myQrcode.php?id=" . $r_u ['id']
						//"Url" => "http://www.lumiagem.com/luAdmin/qrcode/" . $r_u ['qrcode']
				);
				$result = $this->transmitNews ( $postObj, $content );
				echo $result;
				exit ();
			} else {
				$contentStr = '您尚未被分配动态二维码，请联系我们的客服：limeikefu01，申请专属二维码。';
			}
		} else if ($thebutton == "KEY_PASSWEBACCOUNT") {
			$contentStr = $this->scan($fromUsername);
		}
		return $contentStr;
	}
	function checkUser($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql_check_user = 'SELECT id, website_username, website_password FROM clients_list WHERE wechat_open_id = "' . $fromUsername . '"';
		$stmt_user = $conn->query ( $sql_check_user );
		$found_user = $stmt_user->rowCount ();
		if ($found_user) {
			foreach ( $stmt_user as $r_user ) {
				$this->clientID = $r_user ['id'];
				$this->website_username = $r_user ['website_username'];
				$this->website_password = $r_user ['website_password'];
			}
			return $r_user ['id'];
		}
		return 0;
	}
	function isSubscribe($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql_check_user = 'SELECT suscribe_status FROM clients_list WHERE wechat_open_id = "' . $fromUsername . '"';
		$stmt_user = $conn->query ( $sql_check_user );
		$found_user = $stmt_user->rowCount ();
		if ($found_user) {
			foreach ( $stmt_user as $r_user ) {
				if($r_user ['suscribe_status']=='subscribe');
					return true;
			}
		}
		return false;
	}
	function updateUser($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$name = '-';
		$address = '-';
		$wechat_name = '-'; // 12345
		$sex = '-';
		$address = '-';
		$usericon = '';
		require('getaccesstoken.php');
		$curl_ci = curl_init (); // client info
		curl_setopt_array ( $curl_ci, array (
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL => 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' . $theaccesstoken . '&openid=' . $fromUsername . '&lang=zh_CN',
				CURLOPT_USERAGENT => 'Codular Sample cURL Request'
		) );
		$resp_ci = curl_exec ( $curl_ci );
		logger ( "get wechat user info:" . $resp_ci );
		curl_close ( $curl_ci );
		$obj_ci = json_decode ( $resp_ci );
		$wechat_name = $obj_ci->{'nickname'}; // 12345
		$sex = $obj_ci->{'sex'};
		$address001 = $obj_ci->{'city'};
		$address002 = $obj_ci->{'province'};
		$address002 = $obj_ci->{'country'};
		$address = $address001 . ', ' . $address002 . ', ' . $address003;
		$usericon = $obj_ci->{'headimgurl'};
		$reference = 'FINAL-WECHAT';
		$sql = 'UPDATE clients_list SET wechat_name = ?, sex = ?, address = ?, icon = ? WHERE wechat_open_id = ?'; // $fromUsername
		logger ( " update wechat_name:" . $wechat_name );
		$stmt = $conn->prepare ( $sql );
		$stmt->execute ( array (
				$wechat_name,
				$sex,
				$address,
				$usericon,
				$fromUsername
		) );
		return $stmt->rowCount ();
	}
	function unsubscribe($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql = 'UPDATE clients_list SET suscribe_status = "unsubscribe",last_update_time=now() WHERE wechat_open_id = :wechat_open_id'; // $fromUsername
		$stmt = $conn->prepare ( $sql );
		$stmt->execute(array(
				'wechat_open_id'=> $fromUsername
		));
		logger("unsubscribe :".$stmt->rowCount ());
		return ;
	}
	function reSubscribe($fromUsername) {
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$sql = 'UPDATE clients_list SET suscribe_status = "subscribe",subscribed_time=now(),last_update_time=now() WHERE wechat_open_id = :wechat_open_id'; // $fromUsername
		$stmt = $conn->prepare ( $sql );
		$stmt->execute(array(
				'wechat_open_id'=> $fromUsername
		));
		logger("resubscribe :".$stmt->rowCount ());
		return ;
	}
	function subscribe($fromUsername,$postObj) {
		//<EventKey><![CDATA[qrscene_8001]]></EventKey>
		$conn = dbConnect ( 'write', 'pdo' );
		$conn->query ( "SET NAMES 'utf8'" );
		$thelastinsertedid=$this->checkUser($fromUsername);
		if($thelastinsertedid>0){
			$this->reSubscribe($fromUsername);
			$OK = true;
		}
		else{	$referee = substr ( $postObj->EventKey, 8 );
			logger ( "referee" . $referee );
			$more_info = '';
			if($referee=='8001')
				$more_info='20170526wenzhou';
			$addwords = '';
			$name = '-';
			$address = '-';
			$wechat_name = '-';
			$sex = '-';
			$address = '-';
			$suscribe_status = 'suscribe';
			$usericon = '';
			// here we get all the infos of the user
			require('getaccesstoken.php');
			$curl_ci = curl_init (); // client info Set some options - we are passing in a useragent too here
			curl_setopt_array ( $curl_ci, array (
					CURLOPT_RETURNTRANSFER => 1,
					CURLOPT_URL => 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' . $theaccesstoken . '&openid=' . $fromUsername . '&lang=zh_CN',
					CURLOPT_USERAGENT => 'Codular Sample cURL Request'
			) );
			// Send the request & save response to $resp
			$resp_ci = curl_exec ( $curl_ci );
			logger ( $CURLOPT_URL );
			logger ( $resp_ci );
			curl_close ( $curl_ci );
			$obj_ci = json_decode ( $resp_ci );
			$wechat_name = $obj_ci->{'nickname'}; // 12345
			$sex = $obj_ci->{'sex'};
			$address001 = $obj_ci->{'city'};
			$address002 = $obj_ci->{'province'};
			$address002 = $obj_ci->{'country'};
			$address = $address001 . ', ' . $address002 . ', ' . $address003;
			$usericon = $obj_ci->{'headimgurl'};
			$reference = 'FINAL-WECHAT';
			$website_username = '-';
			$website_password = '-';
			$feedbackwebpass = '';
			$sql = 'INSERT INTO clients_list (wechat_open_id, wechat_name, website_username, website_password, name, sex, reference, address, subscribed_time, suscribe_status, icon,referee,more_info,last_update_time) VALUES("'.$fromUsername.'", "'.$wechat_name.'", "'.$website_username.'", "'.$website_password.'", "'.$name.'", "'.$sex.'", "'.$reference.'", "'.$address.'", NOW(), "'.$suscribe_status.'", "'.$usericon.'","'.$referee.'","'.$more_info.'",now())';
			$stmt = $conn->prepare ( $sql );
			$stmt->execute ();
			$OK = $stmt->rowCount ();
			$thelastinsertedid = $conn->lastInsertId ();
			logger ( "inert result:" . $OK );
			logger ( $sql . "\n" . mysql_errno () . ": " . mysql_error () . "\n" );
		}	
			if ($OK) {
				$website_username = 'lm' . $thelastinsertedid;
				$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				$charactersLength = strlen ( $characters );
				$randomString = '';
				for($i = 0; $i < 3; $i ++) {
					$randomString .= $characters [rand ( 0, $charactersLength - 1 )];
				}
				$website_password = $randomString . $thelastinsertedid;
				$sql_update_webpass = 'UPDATE clients_list SET website_username = "' . $website_username . '", website_password ="' . $website_password . '" WHERE wechat_open_id = "' . $fromUsername . '"';
				$stmt_sql_webpass = $conn->query ( $sql_update_webpass );
				if ($stmt_sql_webpass->rowCount ()) {
					$feedbackwebpass = "\n您的利美网站登录用户名：" . $website_username . "\n密码：" . $website_password . "\n您可以登录以后自己进行修改。\n在这个公众号里您可以获取钻石相关小知识和咨询，以及比利时安特卫普的相关讯息：\n<a href=\"https://mp.weixin.qq.com/s?__biz=MzIyNzA2NjE1OQ==&mid=2653294074&idx=2&sn=ccfd7b99c12a7ea7beb596877c4842b0&chksm=f3b445bac4c3ccacaa1e7f8045558d1b6ba247ab94764614c2c6103efe2268df25022bb9c1e4\">Lumia利美公众号使用指南</a>\n\n如果您有任何疑问可以添加微信客服号：limeikefu01\n我们将竭诚为您解决问题。";
				}
			} else {
				logger ( $sql . "\n" . mysql_errno () . ": " . mysql_error () . "\n" );
			}
			$contentStr =  $feedbackwebpass;
			if($referee=='1118')
				$contentStr = $contentStr." \n您已扫描成功，获得Lumia利美钻石提供的150欧电子优惠卷，本次电子优惠扫码活动有效期截止到2月1日。持有效电子优惠卷的朋友可在2017年7月28日前购买Lumia指定产品，0.7克拉到0.79克拉时出示此优惠卷，即可享受立减优惠。";
			if($referee=='8001')
				$contentStr .= "\n".$this->event20170526($fromUsername);//$contentStr." \n".$this->msg8001;
			return $contentStr;
	}
	
	private function checkSignature() {
		// you must define TOKEN by yourself
		if (! defined ( "TOKEN" )) {
			throw new Exception ( 'TOKEN is not defined!' );
		}
		$signature = $_GET ["signature"];
		$timestamp = $_GET ["timestamp"];
		$nonce = $_GET ["nonce"];
		$token = TOKEN;
		$tmpArr = array (
				$token,
				$timestamp,
				$nonce 
		);
		// use SORT_STRING rule
		sort ( $tmpArr, SORT_STRING );
		$tmpStr = implode ( $tmpArr );
		$tmpStr = sha1 ( $tmpStr );
		
		if ($tmpStr == $signature) {
			return true;
		} else {
			return false;
		}
	}
	// 回复图文消息
	private function transmitNews($object, $newsArray) {
		if (! is_array ( $newsArray )) {
			return "";
		}
		$itemTpl = "        <item>
            <Title><![CDATA[%s]]></Title>
            <Description><![CDATA[%s]]></Description>
            <PicUrl><![CDATA[%s]]></PicUrl>
            <Url><![CDATA[%s]]></Url>
        	</item>
		";
		$item_str = "";
		foreach ( $newsArray as $item ) {
			$item_str .= sprintf ( $itemTpl, $item ['Title'], $item ['Description'], $item ['PicUrl'], $item ['Url'] );
		}
		$xmlTpl = "<xml>
		<ToUserName><![CDATA[%s]]></ToUserName>
		<FromUserName><![CDATA[%s]]></FromUserName>
		<CreateTime>%s</CreateTime>
		<MsgType><![CDATA[news]]></MsgType>
		<ArticleCount>%s</ArticleCount>
		<Articles>".
		$item_str   ." </Articles>
		</xml>";
		$result = sprintf ( $xmlTpl, $object->FromUserName, $object->ToUserName, time (), count ( $newsArray ) );
		logger($result);
		return $result;
	}
	
	private function pushMsg($toUsername,$msg) {
		require ('getaccesstoken.php');
		logger("accesstoken:".$theaccesstoken);
		$urltopost='https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='.$theaccesstoken;
		$data = '{
			"touser":"'.$toUsername.'",
			"msgtype":"text",
			"text":
			{
				 "content":"'.$msg.'"
			}
		}';
			
		$ch = curl_init($urltopost);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($ch);
		logger("push result".$result);
		$obj_reply = json_decode($result);
		$reply_feedback=$obj_reply->{'errmsg'};
	}
}

?>
