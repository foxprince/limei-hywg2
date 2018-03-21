<?php
session_start();
$error='';
if(isset($_POST['username'])){
    $password=$_POST['password'];
	if($password=='1qsxzse$'){
		    $_SESSION['invoiceAdmin']='true';
			session_regenerate_id();
			header("Location: list.php");
			exit('');
	}else{
			session_destroy();
	}
	$error='Invalid username or password';
}
if(isset($_REQUEST['quit'])){
	$_SESSION['invoiceAdmin']=null;
	session_destroy();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title></title>
    <link rel="stylesheet" type="text/css" href="dist/css/style.css" />
    <link rel="stylesheet" href="../css/page.init.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/index.css">
	<link rel="stylesheet" href="css/print.css">
	<link rel="stylesheet" type="text/css" href="../css/jquery.fancybox.min.css">
    <script src="dist/js/jquery-2.1.3.min.js"></script>
    <script src="../js/pageInit.js"></script>
    <script src="../js/cookie.js"></script>
    <script type="text/javascript" src="../js/jquery.fancybox.min.js"></script>
    <script src="dist/js/flexible.js"></script>
    <style>
    th {text-align: center;}
    </style>
</head>

<body>
    <div class="order_look">
        <header class="c_header">
            <a href="javascript:;" class="h_logo" title=""></a><span>票据查询-登录</span>
        </header>

        <main>
            <form action="" class="c_form" method="post">
                <p class="item">
                    <label for="" class="field">用户名</label>
                    <input type="text" id="num" class="i_text" name="username" placeholder="请输入用户名">
                </p>
                <p class="item">
                    <label for="" class="field">密码</label>
                    <input type="password" id="custom" class="i_text" name="password" placeholder="请输入密码">
                </p>
                <p class="item pc_btn"><button type="submit" id="login" value="Login" class="c_btn look_btn J_lookfor">登录</button></p>
            </form>
            
        </main>
    </div>


            
    
    	
    
</body>
</html>