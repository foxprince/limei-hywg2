<?php
		include_once('script.php');
	?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>首页 - 利美钻石</title>
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
</head>
<body>
    <div class="index">
		<div class="panel panel1">
			<div class="w1200">
				<?php
					include_once('topbarIndex.php');
				?>
				<div class="bottom"><a href="jewelry.php?p=steps">购买指南</a><a href="diamonds.php">裸钻挑选</a><a href="diamonds-rings.php">预算推荐</a><a href="">精选搭配</a><a href="about.php?p=publicmedia">新闻报道</a><a href="">钻石知识</a></div>
			</div>
		</div>

		<div class="panel panel2">
			<div class="w1200">
				<div class="panel2_1"></div>
				<div class="panel2_2"><a href=""></a></div>
			</div>
		</div>
		<div class="panel panel3">
			<div class="w1200">
				<div class="content">
					<dl>
						<dt>钻石源头</dt>
						<dd>利美钻石诞生于安特卫普，这座城市自1447年起便成为了世界钻石交易中心，闻名于世。全球80%的钻石在这里切割，半数以上的钻石都在安特卫普交易。利美钻石品牌背后的是全球最出色的钻石供应商和钻石百年世家的传承的信念。</dd>
						<dt>欧洲匠人</dt>
						<dd>Antwerp Cut 安特卫普切工，又被称为行业标准钻石切割。安特卫普钻石工匠的手艺被公认为是全世界最优秀的，在安特卫普，每天有上千名工人为获得著名品质标记Antwerp Cut而全力以赴。安特卫普能成为并保持世界钻石中心的地位，与欧洲匠人精湛的工艺是分不开的，至今欧洲匠人仍然垄断者大克拉钻的切割。</dd>
						<dt>裸钻精品</dt>
						<dd>利美是位于比利时安特卫普钻石交易所内，是AntwerpDiamond Club钻石交易所的注册会员，世界钻石交易所联合会的会员，同时也是上海钻交所的会员。从原石采购并自己进行组织加工，通过大宗采购来降低成本，这使得我们的销售价格甚至小于某些公司的成本价。 中国一些知名的珠宝品牌商也是我们的客户。</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="panel panel4">
			<div class="w1200">
				<div class="panel4_1"></div>
				<div class="panel4_2"><a href=""></a></div>
				<div class="panel4_3"><a href=""></a></div>
			</div>
		</div>
		<div class="panel panel5">
			<div class="w1200">
				<div class="panel5_1"><a href=""></a></div>
				<div class="panel5_2"><a href=""></a></div>
			</div>
		</div>
		<div class="panel panel6">
			<div class="w1200">
				<div class="panel6_1"><a href=""></a></div>
				<div class="panel6_2"><a href=""></a></div>
			</div>
		</div>
		<div class="panel panel7">
			<div class="w1200">
				<div class="clearfix">
					<div class="panel7_1"><a href=""></a></div>
					<div class="panel7_2"></div>
					<div class="panel7_3"><a href=""></a></div>
				</div>
				<div class="clearfix">
					<div class="panel7_4"><a href=""></a></div>
					<div class="panel7_5"><a href=""></a></div>
					<div class="panel7_6"><a href=""></a></div>
				</div>
			</div>
		</div>
		<?php
		include_once('footerIndex.php');
		?>
	</div>
</body>
</html>
