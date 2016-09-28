<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>品牌文化 - 利美钻石</title>
	<?php
		include_once('header.php');
	?>
</head>
<body>
	<?php
		include_once('topbar.php');
	?>
	<?php
	include_once("menu.php");
	?>
		<?php
				if(isset($_GET['p'])){
					$p=$_GET['p'];
				}else{
					$p='';
				}
				switch($p){
					case 'brandstory':
					$the_page='brandstory.php';
					break;
					
					case 'whylumia':
					$the_page='whylumia.php';
					break;
					
					case 'buyeasy':
					$the_page='buyeasy.php';
					break;
					
					case 'publicmedia':
					$the_page='publicmedia.php';
					break;
					
					case 'article':
					$the_page='article.php';
					break;
					
					default:
					$the_page='brandstory.php';
				}
				include_once("$the_page");
				?>
			

   	<?php
		include_once('footer.php');
	?>
   
</body>
</html>