<ul class="clear">
<?php 
$sql_count='SELECT COUNT(*) AS num_articles FROM usefulinfo WHERE category = "publicmedia"';
foreach($conn->query($sql_count) as $number){
	$articleCount=$number['num_articles'];
}
$totalpages=ceil($articleCount/25);
if(isset($_GET['n'])){
	$crr_page=$_GET['n'];
	if($crr_page>$totalpages){
		$crr_page=$totalpages;
	}
}else{
	$crr_page=1;
}
$startnumber=($crr_page-1)*25;
$sql='SELECT * FROM usefulinfo WHERE category = "publicmedia" ORDER BY id DESC LIMIT '.$startnumber.',25';
$stmt=$conn->query($sql);
$rulesCount=$stmt->rowCount();
$n = floor($rulesCount/4);
?>
		<li>
            <a href="javascript:void(0);" ><div class="about-txt"></div></a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg1" href="http://www.chinaqw.com/hqhr/2017/08-15/157524.shtml" target="_blank">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg10" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg02">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg10" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>

        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg1" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg03">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg2" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg10" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>

        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg4" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg10" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg1" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg06">
            <div class="about-txt"></div>
          </a>
        </li>

        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg07">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg0" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg2" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>

        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg<?php echo rand(1, 4);?>" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg0" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg08">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>

        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" class="about-bg0">
            <div class="about-txt"></div>
          </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg4" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg0" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
        <li>
          <?php $row=$stmt->fetch();?>
          <a class="about-bg1" href="about.php?p=article&ref=publicmedia&id=<?php echo $row['id']; ?>">
			<div class="about-txt"><?php echo $row['title_ch']; ?></div>
		  </a>
        </li>
			
			<!-- 分页 -->
			<li class="pagesbtn">
			<?php
			if(isset($totalpages) && $totalpages>1){
				for($i=1; $i<=$totalpages; $i++){
				?>
				<a class="articlepagelinker" href="guide.php?p=publicmedia&n=<?php echo $i; ?>">
				<?php 
				if($crr_page==$i){
					echo '<span style="font-weight:bold; font-size:16px;">'.$i.'</span>'; 
				}else{
					echo $i;
				}
				?>
			    </a>
				<?php
				}
			}
			?>
			</li>
		</ul>

