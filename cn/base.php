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
					
					case 'laxs':
						$the_page='../cn/articles/020215255208.html';
						$title='《恋爱先生》开播！跟着靳东新剧逛比利时啦！';
						$keyword='恋爱先生，比利时，安特卫普，钻石，啤酒，巧克力，利美钻石';
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
			<div class="div_text">
				<div class="text_in"> 
					<div class="container-fluid">
						<div class="row">
						<?php include_once("$the_page"); ?>
						</div>
					</div>
				</div>
			</div>
			<div class="div_down">
				<div class="text-bottom"></div>
	   		</div>
		</div>
	</div>
</div> 
<?php include_once('footer.php');?>
</body>
</html>