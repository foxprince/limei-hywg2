<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>品牌文化 - 利美钻石</title>
	<?php
		include_once('header.php');
	?>
</head>
<body>
<div class="zhuti clear">
	<?php
		include_once('topbar.php');
	?>
	<div class="contain clear">
	<?php
	include_once("menu.php");
	?>
		<div class="con-r">
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
					
					case 'steps':
						$the_page='steps.php';
						break;
					
					case 'choose-diamond':
						$the_page='choose-diamond.php';
						break;
					
					case 'choose-jewelry':
						$the_page='choose-jewelry.php';
						break;
					
					case 'makeorder':
						$the_page='makeorder.php';
						break;
					
					case 'buyeasy':
						$the_page='buyeasy.php';
						break;
					
					case 'service':
						$the_page='service.php';
						break;
					
					case 'knowledge':
						$the_page='knowledge.php';
						break;
					
					case 'industry':
						$the_page='industry.php';
						break;
					
					case 'article':
						$the_page='article.php';
						break;
					default:
					$the_page='brandstory.php';
				}
				include_once("$the_page");
				?>
		</div>
	</div>
</div> 
<?php include_once('footer.php');?>
   
</body>
</html>