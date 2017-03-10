
    
    <div class="text-title"><span>钻石知识</span></div>
    <div class="text-top">
      <img class="ring" src="../images/ring.png">
    </div>
   </div>
   <div class="div_text">
    <div class="text_in"> 


<div  class="container-fluid">
<div class="row ">


<div class="col-xs-12 col-sm-12 col-md-9">
<?php 
$sql_count='SELECT COUNT(*) AS num_articles FROM usefulinfo WHERE category = "knowledge"';
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

$sql='SELECT * FROM usefulinfo WHERE category = "knowledge" ORDER BY id DESC LIMIT '.$startnumber.', 25';
$stmt=$conn->query($sql);
?>


<ul class="news-box">
<?php
foreach($stmt as $row){
?>

<li class="media_li">
			<a href="guide.php?p=article&ref=knowledge&id=<?php echo $row['id']; ?>">
			<img style="width:160px;height:160px;" src="<?php echo $row['main_image_ch']; ?>"/> 
			<span class="sp_short"><?php echo $row['title_ch']; ?></span>
			</a>
			</li>
<?php
}
?>

<li class="pagesbtn">
<?php
if(isset($totalpages) && $totalpages>1){
	
	for($i=1; $i<=$totalpages; $i++){
	?>
	<a class="articlepagelinker" href="guide.php?p=knowledge&n=<?php echo $i; ?>">
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
</div>
</div>
</div>
</div>
</div>
<script type="text/javascript">
$('document').ready(function(){
	$('a#knowledgebtn').css({'border-bottom-style':'solid',
	'border-width':'2px'});
});
</script>