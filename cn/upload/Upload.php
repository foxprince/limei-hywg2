<?php
include_once 'log.php';
class img_Upload{
	protected $_uploaded=array();
	protected $_destination;
	protected $_max=3148576;
	protected $_messages=array();
	protected $_permitted=array('image/gif','image/jpeg','image/pjpeg','image/png','image/JPG');
	protected $_renamed=false;
	protected $_uploadingSuccess=false;
	protected $_finalName;
	protected $_sizetoobig;
	protected $_sizemessage;
	protected $_formatmessage='OK';
	
	public function __construct($path){
		if(!is_dir($path) || !is_writable($path)){
			throw new Exception("$path must be a valid, writable directory.");
		}
		$this->_destination=$path;
		$this->_uploaded=$_FILES;
	}
	
	public function move($overwrite=false){
		$field=current($this->_uploaded);
		$OK=$this->checkError($field['name'], $field['error']);
		if($OK){
			$sizeOK=$this->checkSize($field['name'], $field['size']);
			$typeOK=$this->checkType($field['name'], $field['type']);
			if($sizeOK && $typeOK){
				//$name=$this->checkName($field['name'], $overwrite);	
				$name=$this->reName($field['name']);		
				$success=move_uploaded_file($field['tmp_name'], $this->_destination.$name);
				if ($success) {
					$message=$field['name'].' uploaded successfully';
					if($this->_renamed){$message.=" and renamed $name";}
					$this->_messages[]=$message;
					$this->_uploadingSuccess=true;
					$this->_finalName=$name;
				}else{
					$this->_messages[]='Could not upload '.$field['name'];
					$this->_uploadingSuccess=false;
				}
			}
		}
	}
	
	public function uploadingSuccess(){
	    return $this->_uploadingSuccess;
	}
	
	public function finalName(){
		return $this->_finalName;
	}
	
	public function getMessages(){
	    return $this->_messages;	
	}
	
	public function sizeMessage(){
		if($this->_sizetoobig){
			$this->_sizemessage="exceeding";
		}else{
			$this->_sizemessage="size ok";
		}
		return $this->_sizemessage;
	}
	public function formatMessage(){
		return $this->_formatmessage;
	}
	
	
	
	protected function checkError($filename, $error){
		switch ($error){
			case 0:
			  return true;
			case 1:
			case 2:
			  $this->_messages[]="$filename exceeds maximum size: ".$this->getMaxSize().' Please reduce your image size.';
			  return true;
			case 3:
			  $this->_messages[]="Error uploading $filename. Please try again.";
			  return false;
			case 4:
			  $this->_messages[]="No file selected.";
			  return false;
			default:
			  $this->_messages[]="System error uploading $filename. Contact webmaster.";
			  return false;
			}
	}
	protected function checkSize($filename, $size){
		if($size==0){
			return false;
		}elseif($size > $this->_max){
			$this->_messages[]="$filename exceeds maximum size: ".$this->getMaxSize().'. Please reduce your image size.';
			$this->_sizetoobig=true;
			return false;
		}else{
			return true;
			$this->_sizetoobig=false;
		}
	}
	protected function checkType($filename, $type){
		if(!in_array($type, $this->_permitted)){
			$this->_messages[]="$filename is not a permitted type of file. Only jpeg, gif and png are accepted.";
			$this->_formatmessage="NOT_PERMITTED";
			return false;
			}else{
			return true;
			}
	}
	protected function checkName($name, $overwrite){
		$nospaces=str_replace(' ','_',$name);
		if($nospaces != $name){
			$this->_renamed=true;
			}
		if(!$overwrite){
			$existing=scandir($this->_destination);
			if(in_array($nospaces, $existing)){
				$dot=strrpos($nospaces, '.');//
				if($dot){
					$base=substr($nospaces, 0, $dot);
					$extension=substr($nospaces, $dot);
				}else{
					$base=$nospaces;
					$extension='';
				}
				$i=1;
				do{
					$nospaces=$base.'_'.$i++.$extension;
					}while(in_array($nospaces, $existing));
				$this->_renamed=true;
				}
			}
		return $nospaces;
	}
	
	protected function reName($name){
		$newIMGnameMain=date("Ymd_His");
		$dot=strrpos($name, '.');
		if($dot){
			$extension=substr($name, $dot);
		}else{
			$extension='';
		}
		if($extension=='.jpe' || $extension=='.jpeg' || $extension=='.JPG' || $extension=='.JPEG' || $extension=='.JPE'){
			$extension='.jpg';
		}
		$newIMGname="limei".$newIMGnameMain.$extension;
		return $newIMGname;
	}
		
	public function getMaxSize(){
		return number_format($this->_max/1024, 1).'kB';
	}
}