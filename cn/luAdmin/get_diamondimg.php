<?php
/*===================session========================*/
session_start();


// if session variable not set, redirect to login page
if(!isset($_SESSION['authenticated'])) {
  header('Location: login.php');
  exit();
}

if($_SESSION['authenticated']!='SiHui'){
	$_SESSION=array();
	if (isset($_COOKIE[session_name()])){
		setcookie(session_name(), '', time()-86400, '/');
	}
	session_destroy();
	header('Location: login.php');
    exit();
}

if(!isset($_POST['ref'])){
	exit('error');
}

$dir=$_POST['ref'];
		/* settings */
		//$image_dir = 'pictures/2014apr/gallery/';
		$thumbs_dir='../images/contentimgs/'.$dir.'/thumbs/';
		
		$picsinfolder=array();	
		/* step one:  read directory, make array of files */
		if ($handle = opendir($thumbs_dir)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != '.' && $file != '..' && $file != '.DS_Store') 
				{					
			        $picsinfolder[] = $file;					
				}
			}
			closedir($handle);
		}
		
		/* step two: loop through, format gallery */
		if(count($picsinfolder)){
			$c=0;		
			foreach($picsinfolder as $file){
				?>						
                
                <div class="imagebosx" id="pic_<?php echo $dir.$c; ?>">
<img src="<?php echo urldecode($thumbs_dir.$file); ?>" />
<button type="button" onclick="deleteIMG('<?php echo $dir; ?>', '<?php echo $file; ?>', 'pic_<?php echo $dir.$c; ?>')">删除</button>

</div>
                
                
                <?php
				$c++;
			}
		}else{
			echo '<p id="nopicnote">尚未添加图片</p>';
		}
?>







