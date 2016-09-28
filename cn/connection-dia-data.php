<?php
//======================onlineserver====================================

function dbConnect_dia($usertype='write', $connectionType = 'pdo') {
  $host = 'localhost';
  $db = 'sihui_belgem';
  if ($usertype  == 'read') {
	$user = 'sihui_liu';
	$pwd = 'lumia112233';
  } elseif ($usertype == 'write') {
	$user = 'sihui_liu';
	$pwd = 'lumia112233';
  } else {
	exit('Unrecognized connection type');
  }
  if ($connectionType == 'mysqli') {
	return new mysqli($host, $user, $pwd, $db) or die ('Cannot open database');
  } else {
    try {
      return new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
    } catch (PDOException $e) {
      echo 'Cannot connect to database';
      exit;
    }
  }
}
/**/
//=====================localserver==================================
/*
function dbConnect_dia($usertype='write', $connectionType = 'pdo') {
  $host = 'localhost';
  $db = 'belgem';
  if ($usertype  == 'read') {
	$user = 'root';
	$pwd = 'root';
  } elseif ($usertype == 'write') {
	$user = 'root';
	$pwd = 'root';
  } else {
	exit('Unrecognized connection type');
  }
  if ($connectionType == 'mysqli') {
	return new mysqli($host, $user, $pwd, $db) or die ('Cannot open database');
  } else {
    try {
      return new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
    } catch (PDOException $e) {
      echo 'Cannot connect to database';
      exit;
    }
  }
}
*/
