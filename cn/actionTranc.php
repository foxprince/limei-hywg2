<?php
date_default_timezone_set("Asia/Shanghai");
include_once 'log.php';
if(!isset($conn)){
	require_once('connection.php');
	$conn=dbConnect('write','pdo');
	$conn->query("SET NAMES 'utf8'");
}
$userid = $_COOKIE["userId"];
if (isset($_COOKIE["userId"]))
	$userid = $_COOKIE["userId"];
	else
		$userid = $_COOKIE["everUserId"];
if($_REQUEST['action']) {
	$action = $_REQUEST['action'];
}