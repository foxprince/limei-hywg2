	<div class="div_menul">
			<ul class="ul_1">
				<li class="li_1">
					<a href="about.php?p=brandstory" class="a_menu1">品牌故事</a>
					<div class="div1">
						<ul class="ul_2">
							<li class="li_2" style="position: relative;">
								<a href="#" onclick="document.getElementById('antwerp').scrollIntoView(true);return false;" class="a_menu2">世界钻石之都</a>
							</li>
							<li class="li_2" style="position: relative;">
								<a href="#" onclick="document.getElementById('chineseantwerp').scrollIntoView(true);return false;"class="a_menu2">中国人在安特</a>
							</li>
							<li class="li_2" style="position: relative;">
								<a href="#" onclick="document.getElementById('chaunsstory').scrollIntoView(true);return false;"class="a_menu2">利美故事</a>
							</li>
							
						</ul>
					</div>
					
				</li>
				<li class="li_1">
					<a href="about.php?p=whylumia" class="a_menu1">利美优势</a>
				</li>
				<li class="li_1">
					<a href="about.php?p=publicmedia" class="a_menu1" style="color:#b68168;">媒体报道</a>
				</li>
				<li class="li_1">
					<a href="about.php?#" class="a_menu1">购买指南</a>
					
				</li>
				<li class="li_1">
					<a href="guide.php?p=knowledge" class="a_menu1">钻石知识</a>
					<div class="div1">
						<ul class="ul_2">
							<li class="li_2" style="position: relative;">
								<a href="#" class="a_menu2">如何挑选钻石</a>
								<div class="triangle-right"></div>
								<div class="div2">
									<ul class="ul_3" style="margin-left: -30px;margin-top:5
									px;margin-bottom:5px;">
										<li class="li_3">
											<a href="#" class="a_menu3">何谓荧光</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					
				</li>
				
			</ul>
		</div>
		<div class="text-top">
			<img class="ring" src="../images/ring.png">
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
