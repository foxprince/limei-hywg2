<div class="subnavi_box-1 col-xs-12 col-sm-12 col-md-3">

</div>




<div class="col-xs-12 col-sm-12 col-md-9">
<?php
if(!isset($_GET['id'])){exit('error: id required');}

$id=$_GET['id'];


$sql='SELECT * FROM jewelry WHERE id = "'.$id.'"';
foreach($conn->query($sql) as $row){}
?>

<?php


if($row['category']=='ring'){
	$cate='戒指';
	$cate_linker='ring.php';
}else if($row['category']=='necklace'){
	$cate='项链';
	$cate_linker='necklace.php';
}else if($row['category']=='earring'){
	$cate='耳环';
	$cate_linker='earring.php';
}else if($row['category']=='bracelet'){
	$cate='手链';
	$cate_linker='bracelet.php';
}
?>




<h3 class="blocktitle"><?php echo $row['name_ch']; ?></h3>





<div id="txt_box" style="margin-top:12px;">
<?php echo $row['text_ch']; ?>
</div>


<div id="img_show_box">


<div id="thumbsbox">


<a class="thumb" href="../images/sitepictures/<?php echo $row['image1']; ?>" rel="pics">
<img id="thumb1" src="../images/sitepictures/thumbs/<?php echo $row['image1']; ?>" />
</a>

<?php
if($row['image2']!=NULL && $row['image2']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image2']; ?>" rel="pics">
<img id="thumb2" src="../images/sitepictures/thumbs/<?php echo $row['image2']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image3']!=NULL && $row['image3']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image3']; ?>" rel="pics">
<img id="thumb3" src="../images/sitepictures/thumbs/<?php echo $row['image3']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image4']!=NULL && $row['image4']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image4']; ?>" rel="pics">
<img id="thumb4" src="../images/sitepictures/thumbs/<?php echo $row['image4']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image5']!=NULL && $row['image5']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image5']; ?>" rel="pics">
<img id="thumb5" src="../images/sitepictures/thumbs/<?php echo $row['image5']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image6']!=NULL && $row['image6']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image6']; ?>" rel="pics">
<img id="thumb6" src="../images/sitepictures/thumbs/<?php echo $row['image6']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image7']!=NULL && $row['image7']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image7']; ?>" rel="pics">
<img id="thumb7" src="../images/sitepictures/thumbs/<?php echo $row['image7']; ?>" />
</a>

<?php
}
?>
<?php
if($row['image8']!=NULL && $row['image8']!=''){
?>

<a class="thumb" href="../images/sitepictures/<?php echo $row['image8']; ?>" rel="pics">
<img id="thumb8" src="../images/sitepictures/thumbs/<?php echo $row['image8']; ?>" />
</a>

<?php
}
?>




</div>

<div id="txtvideobox">
<?php
if($row['videolink']!=NULL && $row['videolink']!=''){

echo $row['videolink']; 

}
?>
</div>


<br style="clear:both;" />
</div>








<script type="text/javascript" src="../fancyBox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript">
$("a.thumb").fancybox({
	beforeLoad: function(){
					$('iframe').css('visibility',"hidden");
				},
	afterClose: function(){
					$('iframe').css('visibility',"visible");
				}
});
</script>

</div>