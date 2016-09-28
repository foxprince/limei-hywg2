<div  class="container-jewelry">
<div class="ring-demo-box">

<div class="title03" style="font-size:24px;margin:20px 0 10px;">步骤一 选款式</div>
<div class="rings-container-inner">
<?php
$sql_lowprice_dia='SELECT MIN(raw_price_retail) AS lowestprice FROM diamonds';
foreach($conn_dia->query($sql_lowprice_dia) as $row_lowprice){
	$thelowestprice=$row_lowprice['lowestprice'];
	//echo $budget_USD.' -------- '.$thelowestprice;
}
$budget_ring_withoutdia=$budget_USD-$thelowestprice;

if(($thelowestprice*1.2+(300/$USD_EUR))>$budget_USD){
	echo '非常抱歉，没有找到符合您预算的钻戒';
}else{
	$sql='SELECT * FROM jewelry WHERE category = "ring" AND price <= '.$budget_ring_withoutdia.' ORDER BY id';
	//echo $sql;
	foreach($conn->query($sql) as $row){
	?>
		<div class="r_box">
			<a class="j_linker fancybox.iframe" href="jewelry-view.php?p=detail&id=<?php echo $row['id']; ?>">
      
					<span class="pic-ring-containter" style="background-image:url(/images/sitepictures/thumbs/<?php echo $row['image1']; ?>)"></span>
          
          <span class="jewlery_name">
						<?php echo $row['name_ch']; ?>
          </span>
          
			</a>
      <p class="choose-ring-btn-box">
      <button class="ringChoiceBtn" onclick="chooseRing('<?php echo $row['id'] ?>')">选择</button>
      </p>
		  </div>
	<?php
	}
}
?>

</a>
<script type="text/javascript">
function chooseRing(ringID){
	$('#ringChoice').val(ringID);
	$('form#ringChoiceForm').submit();
}
</script>

</div><!-- END ring-demo-box -->
</div>


