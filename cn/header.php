﻿<?php
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../css/public.css">
<link rel="stylesheet" type="text/css" href="../css/text.css">
<link rel="stylesheet" type="text/css" href="./css/css.css">
<script type="text/javascript" src="../js/jquery.1.11.3.min.js"></script>
<script type="text/javascript" src="../js/text.js"></script>