<?php
//======================onlineserver====================================
class MyPDOStatement extends PDOStatement
{
	protected $_debugValues = null;

	protected function __construct()
	{
		// need this empty construct()!
	}

	public function execute($values=array())
	{
		$this->_debugValues = $values;
		try {
			$t = parent::execute($values);
			// maybe do some logging here?
		} catch (PDOException $e) {
			// maybe do some logging here?
			throw $e;
		}

		return $t;
	}

	public function _debugQuery($replaced=true)
	{
		$q = $this->queryString;

		if (!$replaced) {
			return $q;
		}

		return preg_replace_callback('/:([0-9a-z_]+)/i', array($this, '_debugReplace'), $q);
	}

	protected function _debugReplace($m)
	{
		$v = $this->_debugValues[$m[1]];
		if ($v === null) {
			return "NULL";
		}
		if (!is_numeric($v)) {
			$v = str_replace("'", "''", $v);
		}

		return "'". $v ."'";
	}
}
function dbConnect($usertype='write', $connectionType = 'pdo') {
  $host = '127.0.0.1';
  $db = 'limei';
	$user = 'lmhuser';
	$pwd = 'p@ss0Day!';
  if ($connectionType == 'mysqli') {
    
	return new mysqli($host, $user, $pwd, $db) or die ('Cannot open database');
  } else {
    try {
    	$options = array(
    			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    			PDO::ATTR_STATEMENT_CLASS => array('MyPDOStatement', array()),
    	);
    	//return new PDO("mysql:host=$host;dbname=$db", $user, $pwd, $options);
    	return new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
    } catch (PDOException $e) {
      echo $e;
      echo 'Cannot connect to database!';
      exit;
    }
  }
}
