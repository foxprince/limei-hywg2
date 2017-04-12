<?php
//======================onlineserver====================================

function dbConnect($usertype='write', $connectionType = 'pdo') {
  $host = 'localhost';
  $db = 'limei';
  if ($usertype  == 'read') {
	$user = 'lmhuser';
	$pwd = 'p@ss0Day!';
  } elseif ($usertype == 'write') {
	$user = 'lmhuser';
	$pwd = 'p@ss0Day!';
  } else {
	exit('Unrecognized connection type');
  }
  if ($connectionType == 'mysqli') {
    
	return new mysqli($host, $user, $pwd, $db) or die ('Cannot open database');
  } else {
    try {
      return new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
    } catch (PDOException $e) {
      echo $e;
      echo 'Cannot connect to database!';
      exit;
    }
  }
}
/**/
//=====================localserver==================================
/*
function dbConnect($usertype='write', $connectionType = 'pdo') {
  $host = 'localhost';
  $db = 'limei';
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
