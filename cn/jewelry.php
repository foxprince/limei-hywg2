<?php
$crr_page='jewelry';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>精品首饰 - 利美钻石</title>
	<?php
		include_once('header.php');
	?>

	<script>
		$(function() {
			$(".panel").css({"height":$(window).height()});
			$.scrollify({
				section:".panel",
				before:function(e){},
				after:function(e){}
			});
			$(".scroll").click(function(e) {
				e.preventDefault();
				$.scrollify("move",$(this).attr("href"));
			});
		});
	</script>
<style type="text/css">
#jewelrybtn{
	border-bottom-style: solid;
    border-width: 2px;
}
div.r_box{
	background-color: #CCCCCC;
    display: inline-block;
    height: 165px;
    list-style: none outside none;
    margin: 2px;
    padding: 0;
    position: relative;
    width: 165px;
}
a.j_linker{
	height: 165px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 165px;
}
.j_linker img{
	width:100%;
}
a.j_linker_txt{
	  background-color: rgba(255, 255, 255, 0.95);
    bottom: 0;
    color: #000000;
    font-size: 12px;
    left: 0;
    padding: 5px;
    position: absolute;
    text-decoration: none;
    width: 165px;
		text-align:center;
}



h3.blocktitle{
	text-align:left;
}

div#thumbsbox{
	position:relative;
	float:left;
	width:350px;
}
div#txtvideobox{
	position:relative;
	float:left;
	margin:5px 0 0 3px;
	width:350px;
}
a.thumb{
	display:inline-block;
	width: 98px;
	height:98px;
	overflow:hidden;
	padding:0;
	margin:3px;
	border-width:3px;
	border-color:#FFF;
	border-style:solid;
	background-color:#999;
}
a.thumb img{
	width:100%;
}
span.thumbholder{
	display:inline-block;
	width:165px;
	height:165px;
	padding:0;
	margin:0;
	background-position:center center;
	background-size:auto 165px;
	background-repeat:no-repeat;
}
label{
	display:inline-block;
	width:108px;
}
#contactform input{
	width:208px;
}
#contactform #cformsendbtn{
	font-size:14px; 
	font-weight:bold; 
	padding:8px 25px; 
	background-color:#C30;
	color:#FFF; 
	border-width:1px;
	width:auto;
	margin-bottom:55px; 
}
p.pq{
	margin:5px 0;
}
h4#feedbackmessage{
	color:#CC6699;
	font-size:20px;
}
#contactinfo{
	margin-bottom:20px;
	border-bottom-style:dotted;
	border-width:1px;
	border-color:#CC6699;
	padding-bottom:20px;
}
</style>
</head>
<body>
<?php
		include_once('topbar.php');
	?>
	<div  class="container-fluid maxcontainer" style="width:870px;margin:0 auto;margin-top:-50px;">
		<div class="row bodycontent-1">
			<?php
			if(isset($_GET['p'])){
				$p=$_GET['p'];
			}else{
				$p='';
			}
			switch($p){
				case 'all':
				$the_page='jewelry-all.php';
				break;

				
				case 'steps':
				$the_page='steps.php';
				break;
				
				case 'contact':
				$the_page='contact.php';
				break;
				
				case 'buyeasy':
				$the_page='buyeasy.php';
				break;
				
				case 'detail':
				$the_page='jewelry-detail.php';
				break;
				
				default:
				$the_page='jewelry-all.php';
			}
			include_once("$the_page");
			?>
		</div>
		<!--*************************************************************************-->
		<!--****************************************************************************-->
		
	</div>
	<?php
		include_once('footer.php');
		?>
</body>
</html>