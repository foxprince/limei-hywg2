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
<div class="div_down">
    <div class="text-title"><span>钻石知识</span></div>
    <div class="text-top">
      <img class="ring" src="../images/ring.png">
    </div>
</div>
		
<div class="div_text">
		<div class="text_in"> 
<div  class="container-fluid">
	<div class="row ">
	</div>
	<div class=" col-xs-12 col-sm-12 col-md-9">
		<?php 
		if(!isset($_GET['id'])){exit('error: id required');}

		$id=$_GET['id'];
		$sql='SELECT * FROM usefulinfo WHERE id = "'.$id.'"';
		foreach($conn->query($sql) as $row){}
			if(isset($row)){
				?>
					<div class="text-title" style="top:-170px;"><span  id="articletitle" style="width:400px;text-align:center;left:-50px;top:70px;font-weight:bold;"><?php echo $row['title_ch']; ?></span></div>
				


				<div id="txt_box" style="margin-top:12px;">
					<?php echo $row['text_ch']; ?>
				</div>
				<?php
			}
			?>
		</div>

	</div>
</div>
</div>
<div class="div_down">
		<div class="text-bottom"></div>
   	</div>
<?php
		include_once('footer.php');
	?>
</body>
</html>