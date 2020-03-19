<?php
	include_once('header.php');
?>
<?php
				if(isset($_GET['p'])){
					$p=$_GET['p'];
				}else{
					$p='';
				}
				$title='比利时钻石,安特卫普钻石,钻石购买,钻交所,钻石交易所，比利时钻交所，比利时钻石交易所';
				switch($p){
					case 'brandstory':
					$the_page='brandstory.php';
					$title='品牌故事';
					break;
					case 'whylumia':
					$the_page='whylumia.php';
					$title='利美优势';
					break;
					
					case 'buyeasy':
					$the_page='buyeasy.php';$title='轻松定制';
					break;
					
					case 'publicmedia':
					$the_page='publicmedia.php';$title='媒体报道';
					break;
					
					case 'steps':
						$the_page='steps.php';$title='购买流程';
						break;
					
					case 'choose-diamond':
						$the_page='choose-diamond.php';$title='如何挑选钻石';
						break;
					
					case 'choose-jewelry':
						$the_page='choose-jewelry.php';
						break;
					
					case 'makeorder':
						$the_page='makeorder.php';$title='如何下单';
						break;
					
					case 'service':
						$the_page='service.php';$title='售后服务';
						break;
					
					case 'knowledge':
						$the_page='knowledge.php';$title='钻石知识';
						break;
					
					case 'industry':
						$the_page='industry.php';
						break;
					
					case 'article':
						$the_page='article.php';$title='钻石知识';
						break;
					case 'laxs':
						$the_page='../articles/020215255208.html';
						$title='《恋爱先生》开播！跟着靳东新剧逛比利时啦！';
						$keyword='恋爱先生，比利时，安特卫普，钻石，啤酒，巧克力，利美钻石';
						break;
					case 'laxs2':
						$the_page='../articles/laxs.html';
						$title='《恋爱先生》开播！跟着靳东新剧逛比利时啦！';
						$keyword='恋爱先生，比利时，安特卫普，钻石，啤酒，巧克力，利美钻石';
						break;
					case 'yxz':
                    	$the_page='./articles/yxz.html';
                    	$title='足不出户云选钻，在家享受私人订制';
                    	$keyword='云选钻，比利时，安特卫普，钻石，私人订制';
                    	break;

					case 'ssdz':
						$the_page='../articles/ssdz.html';
						$title='首饰定制步骤';
						$keyword='比利时，安特卫普，钻石，利美钻石，定制，首饰';
						break;
					case 'tax':
						$the_page='../articles/tax.html';
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