<div class="subnavi_box" id="subnavi_box_diamondpage">


</div>

<div class="main_contentbox" id="diamondscontentbox_color">
<?php





$sql='SELECT * FROM diamonds WHERE fancy_color <> "" ';
$sorting='';
if(isset($_POST['sortby'])){
	$by=$_POST['sortby'];
	switch ($by){
		case "shape";
		$sorting='ORDER BY shape '.$_POST['direction'];
		break;
		
		case "weight";
		$sorting='ORDER BY carat '.$_POST['direction'];
		break;
		
		case "clarity";
		$sorting='ORDER BY clarity_number '.$_POST['direction'];
		break;
		
		case "price";
		$sorting='ORDER BY price '.$_POST['direction'];
		break;
	}
}
$imgsrc='../images/site_elements/arrow-down.png';
if(isset($_POST['direction'])){
	if($_POST['direction']=='ASC'){
		$imgsrc='../images/site_elements/arrow-down.png';
	}else{
		$imgsrc='../images/site_elements/arrow-up.png';
	}
}
$sql.=$sorting;
$stmt=$conn->query($sql);

//echo $sql;
?>




<table cellpadding="2" cellspacing="0" border="0">
<tr class="t_h">
<td align="center" class="1st_col" style="width:102px;">库存编号</td>
<td align="center" style="width:42px;"><img class="iconarrow" width="8" src="<?php echo $imgsrc; ?>" /><button type="button" class="sortbtn" title="点击排序" onclick="sorting('shape')">形状</button></td>
<td align="center"><img class="iconarrow" width="8" src="<?php echo $imgsrc; ?>" /><button type="button" class="sortbtn" title="点击排序" onclick="sorting('weight')">重量</button></td>
<td align="center" style="width:100px;">颜色</td>
<td align="center"><img class="iconarrow" width="8" src="<?php echo $imgsrc; ?>" /><button type="button" class="sortbtn" title="点击排序" onclick="sorting('clarity')">净度</button></td>
<td align="center" style="width:32px;">证书</td>
<td align="center" style="width:32px;">切工</td>
<td align="center" style="width:32px;">抛光</td>
<td align="center" style="width:42px;">对称性</td>
<td align="center" style="width:112px;"><img class="iconarrow" width="8" src="<?php echo $imgsrc; ?>" /><button type="button" class="sortbtn" title="点击排序" onclick="sorting('price')">价格(美元)</button></td>
<td align="center" style="width:30px;">&nbsp;</td>
</tr>
</table>




<div id="diamondsdata" style="height:200px; overflow:auto;">
<table cellpadding="2" cellspacing="0" border="0">

<?php
$r=0;
foreach($stmt as $row){
	$color=$row['color'];
	
	$color_str_length=strlen($color);
	$first_letter=substr($color, 0, 1);
	
	//if($color_str_length>1 && $first_letter=='F'){
	$r++;
?>
<tr class="<?php echo $r; ?>">
<td align="center" class="ref_number">
<span class="valuetxt" style="width:102px;">
<?php echo $row['stock_ref']; ?>
</span>
</td>
<td align="center" style="width:42px;">



<?php 
switch ($row['shape']){
	case "BR":
	$pic_where="01.gif";
	break;
	
	case "CU":
	$pic_where="12.gif";
	break;
	
	case "EM":
	$pic_where="10.gif";
	break;
	
	case "HS":
	$pic_where="08.gif";
	break;
	
	case "MQ":
	$pic_where="05.gif";
	break;
	
	
	case "OV":
	$pic_where="11.gif";
	break;
	
	
	case "PR":
	$pic_where="03.gif";
	break;
	
	case "PS":
	$pic_where="02.gif";
	break;
	
	case "RAD":
	$pic_where="06.gif";
	break;
	
	case "TRI":
	$pic_where="04.gif";
	break;
	
	default:
	$pic_where="01.gif";
}

?>
<img height="25" src="../images/site_elements/icons/<?php echo $pic_where; ?>" />



</td>
<td align="center"><span class="valuetxt"><?php echo $row['carat']; ?></span></td>
<td align="center"><span class="valuetxt" style="font-size:10px; width:100px; white-space:normal;"><?php echo $row['fancy_color']; ?></span></td>
<td align="center"><span class="valuetxt"><?php echo $row['clarity']; ?></span></td>
<td align="center"><span class="valuetxt" style="width:32px;"><?php echo $row['grading_lab']; ?></span></td>
<td align="center"><span class="valuetxt" style="width:32px;"><?php echo $row['cut_grade']; ?></span></td>
<td align="center"><span class="valuetxt" style="width:32px;"><?php echo $row['polish']; ?></span></td>
<td align="center" class="value_symmetry"><span class="valuetxt" style="width:42px;"><?php echo $row['symmetry']; ?></span></td>
<td align="center"><span class="valuetxt" style="width:112px;"><?php echo $row['price']; ?></span></td>
<td class="seedetail" align="center" title="open"><span style="display:inline-block;width:28px; text-align:center; white-space:nowrap;">详情</span></td>
</tr>

<tr id="d_<?php echo $r; ?>" class="details">
<td colspan="11" class="detail_1stcol">
<div class="detailouterbox">

<div class="detailboxtop">
<p class="details_txt">
荧光强度:
<?php 
echo $row["fluorescence_intensity"];
?> &nbsp; &nbsp; 
所在地: <?php echo $row['country']; ?>
 &nbsp; &nbsp; 
证书编号: <?php echo $row['certificate_number']; ?>
 &nbsp; &nbsp; 
<?php
if(trim($row["grading_lab"])=='HRD'){
?>
<a class="certi_linker" target="_blank" href="http://www.hrdantwerplink.be/index.php?record_number=<?php echo $row['certificate_number']; ?>&weight=<?php echo $row['carat']; ?>&L=">查看证书</a>
<?php
}else if(trim($row["grading_lab"])=='GIA'){
?>
<a class="certi_linker" target="_blank" href="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno=<?php echo $row['certificate_number']; ?>">查看证书</a>
<?php
}else if(trim($row["grading_lab"])=='IGI'){
?>
<a class="certi_linker" target="_blank" href="http://www.igiworldwide.com/igi/verify.php?r=<?php echo $row['certificate_number']; ?>">查看证书</a>
<?php
}
?>
</p>

<?php
if($row['recommend_words']!=NULL && $row['recommend_words']!=''){
?>
<p class="commentbox"><?php echo $row['recommend_words']; ?></p>
<?php
}
if($row['stars']>0){
?>
<p class="stars">推荐指数:

<?php 
$crr_rating=$row['stars'];
$i=1;
while($i<=5)
{
if($i<=$crr_rating){
	$crr_gif='rating_color.gif';
}else{
	$crr_gif='rating_gray.gif';
}
?>
<span class="ratingicon"><img src="../images/site_elements/<?php echo $crr_gif; ?>" /></span>
<?php
$i++;
}
?>

</p>
<?php
}
?>

</div>

<div class="detailboxleft">

<div class="imagescontainer">
		
<?php		
		$thumbs_dir='../images/contentimgs/'.$row['stock_ref'].'/thumbs/';
		
		$picsinfolder=array();	
		/* step one:  read directory, make array of files */
		if ($handle = opendir($thumbs_dir)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != '.' && $file != '..' && $file != '.DS_Store') 
				{					
			        $picsinfolder[] = $file;					
				}
			}
			closedir($handle);
		}
		
		/* step two: loop through, format gallery */
		if(count($picsinfolder)){
			?>
            <div class="thumbsbox">
            <p style="margin:0 0 0 10px; font-size:12px; position:relative; top:-3px;">点击看大图</p>
            <?php
			$c=0;		
			foreach($picsinfolder as $file){
				
				?>						
                
                <a class="thumbbox" rel="thumbbox<?php echo $row['stock_ref']; ?>" id="pic_<?php echo $row['stock_ref'].$c; ?>" href="../images/contentimgs/<?php echo $row['stock_ref']; ?>/<?php echo urldecode($file); ?>">
                <img src="<?php echo urldecode($thumbs_dir.$file); ?>" />
                </a>

                
                <?php
				$c++;
			}
			?>
            </div>
			<?php
		}
?>
			
</div>

</div><!-- end detail box left -->



<div class="detailboxright">

<?php
$sql_v='SELECT * FROM video_diamond WHERE ref_number = "'.$row["stock_ref"].'"';
foreach($conn->query($sql_v) as $v){
?>
<div class="videobox" title="<?php echo $v['thelink']; ?>">

</div>
<?php
} 
?>


</div><!-- end of detail box right -->
<br style="clear:both;" />
</div>

</td>
</tr>
<?php
}
?>
</table>
</div>



<form action="" method="post" id="sort">
<input type="hidden" name="sortby" id="sortby" value="ref" />
<?php
if(isset($_POST['direction'])){
?>
	<input type="hidden" name="direction" id="sortdirection" value="<?php echo $_POST['direction']; ?>" />
<?php
}else{
?>
	<input type="hidden" name="direction" id="sortdirection" value="ASC" />
<?php
}
?>
</form>



<script type="text/javascript" src="../fancyBox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	$('a#colorbtn').css({'border-bottom-style':'solid',
	'border-width':'2px'});

	
	$('tr').click(function(){
		var crr_obj=$(this);
		var theid='#d_'+crr_obj.attr('class');
		if(crr_obj.children('td.seedetail').attr('title')=='open'){	
		    $(theid).show();
			$(theid).find('div.detailouterbox').slideDown("slow", function(){
				crr_obj.children('td.seedetail').attr('title','close');
				var thelink=$(theid).find('div.videobox').attr('title');
				$(theid).find('div.videobox').css({'background-image':'URL(../images/site_elements/loading.gif)','background-repeat':'no-repeat'});
				$(theid).find('div.videobox').html('<iframe height=268 width=352 src="" frameborder=0 allowfullscreen></iframe>');
				$(theid).find('div.videobox iframe').attr('src',thelink);
				$(theid).find('div.thumbbox').eq(0).click();
			});
		}else{
			$(theid).find('div.detailouterbox').slideUp("fast", function(){
				crr_obj.children('td.seedetail').attr('title','open');
				$(theid).hide();
			});
		}
	});
	
	$("a.thumbbox").fancybox({
		beforeLoad: function(){
						$('iframe').css('visibility',"hidden");
					},
		afterClose: function(){
						$('iframe').css('visibility',"visible");
					}
	});
});

function sorting($by){
	$('input#sortby').val($by);
	if($('#sortdirection').val()=='ASC'){
		$('#sortdirection').val('DESC');
	}else{
		$('#sortdirection').val('ASC');
	}
	$('form#sort').submit();
}



</script>

</div>