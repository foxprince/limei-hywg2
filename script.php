<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$_SESSION['lang']='cn';
if(!isset($conn)){
require_once('connection.php');
$conn=dbConnect('write','pdo');
$conn->query("SET NAMES 'utf8'");
}
?>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
	<link href="../css/login.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../fancyBox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	<script src="../js/jquery.min.js"></script>
	<script src="../js/jquery.easing.1.3.js"></script>
	<script src="../js/jquery.scrollify.min.js"></script>
	<script src="../fancyBox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<link rel="shortcut icon" href="../images/site_elements/icon.ico" />