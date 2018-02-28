<?php
	include_once('header.php');
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
					case 'laxs':
						$the_page='../cn/articles/020215255208.html';
						$title='《恋爱先生》开播！跟着靳东新剧逛比利时啦！';
						$keyword='恋爱先生，比利时，安特卫普，钻石，啤酒，巧克力，利美钻石';
						break;
					case 'laxs2':
						$the_page='../cn/articles/laxs.html';
						$title='《恋爱先生》开播！跟着靳东新剧逛比利时啦！';
						$keyword='恋爱先生，比利时，安特卫普，钻石，啤酒，巧克力，利美钻石';
						break;
					case 'tax':
						$the_page='../cn/articles/tax.html';
						$title='在Lumia购买钻石如何退21%全税？ ';
						$keyword='购买，比利时，安特卫普，退税，钻石，啤酒，巧克力，利美钻石';
						break;
					default:
						$the_page='publicmedia.php';
				}
			?>
			<meta name=标题 content="<?php echo $title;?>"/>
			<meta name=关键词 content="<?php echo $keyword;?>"">
			
			<title><?php echo $title;?> - 利美钻石</title>
	
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
		
			<?php include_once("$the_page"); ?>
		</div>
	</div>
</div> 
<?php include_once('footer.php');?>
   
</body>
</html>