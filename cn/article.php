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
	<div class=" col-xs-12 col-sm-12 col-md-9">
		<?php 
		if(!isset($_GET['id'])){exit('error: id required');}

		$id=$_GET['id'];
		$sql='SELECT * FROM usefulinfo WHERE id = "'.$id.'"';
		foreach($conn->query($sql) as $row){}
			if(isset($row)){
				?>
					<div >
					<span  id="articletitle" ><?php echo $row['title_ch']; ?></span>
					</div>
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
</div>
	<div class="div_down">
		<div class="text-bottom"></div>
   	</div>
