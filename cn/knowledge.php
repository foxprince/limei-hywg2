<ul class="clear">
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


<?php
foreach($stmt as $row){
?>

<li class="media_li">
			<img style="width:160px;height:160px;" src="<?php echo $row['main_image_ch']; ?>"/> 
			<a href="about.php?p=article&ref=knowledge&id=<?php echo $row['id']; ?>"><br/>
			<span class="sp_short"><?php echo $row['title_ch']; ?></span>
			</a>
			</li>
<?php
}
?>
</ul>
<ul>
<li class="pagesbtn">
第<?php
if(isset($totalpages) && $totalpages>1){
	
	for($i=1; $i<=$totalpages; $i++){
	?>
	<a class="articlepagelinker" style="display: inline;" href="about.php?p=knowledge&n=<?php echo $i; ?>">
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
?>页
</li>

</ul>
