function makeOrderStep(id) {
	if (appointmentCheck(id) > 0) {
		alert('您已经预约过此钻石，可以在购物车里复查预约登记。');
	} else if (appointmentCount() > 4) {
		alert('您只能预约五颗钻石。');
	} else if (appointmentMake(id)) {
		window.location.href="shopcart.php";
	}
}
function popup(id) {
	if (appointmentCheck(id) > 0) {
		alert('您已经预约过此钻石，可以在购物车里复查预约登记。');
	} else if (appointmentCount() > 4) {
		alert('您只能预约五颗钻石。');
	} else if (appointmentMake(id)) {
		var $haveChoose = false;
		$.ajax({
					type : "get",
					url : "action.php?action=appoinmentList&type=dia&appointmentId=" + id,
					complete : function() {
						$("#gwcTotal").text(parseInt($("#gwcTotal").text()) + 1);
					},
					success : function(json) {
						$("#appointmentList").html('');
						var data = eval(json);
						var i = 0;
						$
								.each(
										data,
										function(n, j) {
											i++;
											var item = '<div class="pro_pics">';
											item += '<div class="pic_00"><img src="images/pic_01.png"/>';
											item += '    <div class="quxiao" >';
											item += '        <img class="removeApp" id="' + j.id + '" onclick="removeAppointment(this)" src="images/close.png"/>';
											item += '    </div>';
											item += '</div>';
											item += '<div class="detail">';
											item += '<p>圆形裸钻</p>';
											item += '<p>' + j.diamond_carat + '克拉</p>';
											item += '<p>颜色：' + j.diamond_color + '</p>';
											item += '<p>净度：' + j.diamond_clarity + '</p>';
											item += '<p>切工：' + j.diamond_cut + '</p>';
											item += '<p>抛光：' + j.diamond_polish + '</p>';
											item += '<p>对称性：' + j.diamond_symmetry + '</p>';
											item += '<p>证书：' + j.grading_lab + '</p>';
											item += '<p>编号：' + j.stock_ref + '</p>';
											item += '<p>价格：' + Math.round(j.diamond_price) + '欧元</p>';
											if (j.grading_lab == "HRD") {
												item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.hrdantwerplink.be/index.php?record_number='
														+ j.certificate_number + '&weight=&L="><img id="gradinglabicon" src="./images/hrd.gif" /></a>';
											} else if (j.grading_lab == 'GIA') {
												item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.gia.edu/cs/Satellite?pagename=GST%2FDispatcher&childpagename=GIA%2FPage%2FReportCheck&c=Page&cid=1355954554547&reportno='
														+ j.certificate_number + '"><img id="gradinglabicon" src="./images/gia.gif" /></a>';
											} else if (j.grading_lab == 'IGI') {
												item += '<a class="certi_linker" href="javascript:;" data-fancybox data-src="http://www.igiworldwide.com/igi/verify.php?r='
														+ j.certificate_number + '"><img id="gradinglabicon" src="./images/igi.gif" /></a>';
											}
											item += '<p>点击查看证书</p>';
											item += '</div></div>';
											$("#appointmentList").prepend(item);
											if (i == 5)
												$("#pro_pics").html("");
										});
					},
					error : function() {
						alert('载入数据失败！');
					}
				});
		$('#appointmentId').val(id);
		popToggle($('#appointmentId').val());
	} else
		alert('预约失败，请联系我们的客服微信号limeikefu');
}
function appointmentCheck(id) {
	var check = 0;
	$.ajax({
		type : "get",
		async : false,
		url : "action.php?action=appointmentCheck&appointmentId=" + id,
		success : function(json) {
			check = json;
		}
	});
	return check;
}
function appointmentCount() {
	var check = 0;
	$.ajax({
		type : "get",
		async : false,
		url : "action.php?action=appointmentCount",
		success : function(json) {
			check = json;
		}
	});
	return check;
}
function makeOrder(diaId) {
	var check = 0;
	$.ajax({
		type : "get",
		async : false,
		url : "action.php?action=makeOrder&diaId=" + diaId,
		success : function(json) {
			alert(json);
			window.location.href="dia.php";
		}
	});
	return check;
}
function appointment(id) {
	if (Cookies.get('userId') === undefined) {
		alert("请登录之后到购物车之内复查您的预约并继续操作。");
		window.location.href = "login.php";
	} else {
		$.ajax({
			type : "post",
			url : "action.php?action=appointmentMakeAll",
			data : $('#appointmentForm').serialize(),
			complete : function() {
				// layer.close(page_layer);
			},
			success : function(json) {
				$('#appointmentResult').html(json);
				$('#appointmentBottom').html('');
			},
			error : function() {
				alert('载入数据失败！');
			}
		});
	}
}
function appointmentMake(id) {
	var result = false;
	$.ajax({
		type : "post",
		async : false,
		url : "action.php?action=appointmentMake&type=dia&appointmentId=" + id,
		complete : function() {
			// layer.close(page_layer);
		},
		success : function(json) {
			if (json == '1') {
				result = true;
			}
		},
		error : function() {
			alert('载入数据失败！');
		}
	});
	return result;
}
function popToggle(id) {
	$("#fade").fadeToggle();
	$("#makeOrder").fadeToggle("slow").focus();
	var s = '<input type="hidden" value="' + id + '" name="appointmentId" id="appointmentId"/><input type="button" value="" id="sub_btn" onclick="appointment();"/>';
	$('#appointmentBottom').html(s);
}
function switchChoose(id) {
	if (id == 'whiteDia') {
		$("#fancyDia").hide("slow");
		$("#whiteDia").show("slow");
	} else {
		$("#whiteDia").hide("slow");
		$("#fancyDia").show("slow");
	}
}
function removeAppointment(item) {
	$.ajax({
		type : "get",
		url : "action.php?action=removeAppointment&id=" + $(item).attr('id'),
		success : function(json) {
			remove(item);
			$("#gwcTotal").text($("#gwcTotal").text() - 1);
			$("#pro_pics").html('<div class="add_pic" id="add_pic"><div class="fonts"><a href="dia.php">追加商品</a></div></div>');
		}
	});
}
$(document).ready(function() {
	$(".a_menu1").click(function() {
		var th = $(this);
		$(th).next().slideToggle("fast", function() {
			$(th).parent().siblings().find(".div2").slideUp();
			$(th).parent().siblings().find(".triangle-right").slideUp();
			$(th).parent().siblings().find(".div1").slideUp("fast", function() {
				$(th).css({
					"color" : "#b68168"
				});
				$(th).parent().siblings().find(".a_menu1").css({
					"color" : "#373232"
				});
			});
		});
	});
	$(".a_menu2").click(function() {
		var th2 = $(this);
		$(th2).css({
			"color" : "#b68168"
		}).nextAll().slideToggle("fast", function() {
			$(th2).parent().siblings().find(".div2").slideUp("fast", function() {
				$(th2).css({
					"color" : "#b68168"
				});
				$(th2).parent().siblings().find(".a_menu2").css({
					"color" : "#373232"
				});
			});
			$(th2).parent().siblings().find(".triangle-right").slideUp("fast");
		});
	});
});