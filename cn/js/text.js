$(document).ready(function(){
	$("#skype").hover(function(){ $("#skype").attr("src","images/skype_on.gif"); },function(){ $("#skype").attr("src","images/skype.gif"); });
    $("#phone").hover(function(){ $("#phone").attr("src","images/phone_on.gif"); },function(){ $("#phone").attr("src","images/phone.gif"); });
    if(Cookies.get("DIA_CURRENCY")=='EUR')
		$(".currency_EUR").addClass("country");
    else if(Cookies.get("DIA_CURRENCY")=='CNY')
    		$(".currency_CNY").addClass("country");
    else //if (Cookies.get("DIA_CURRENCY")=='USD')
    		$(".currency_USD").addClass("country");
    $(".sewvtop img").click(function () {
    	$(this).addClass("country").siblings().removeClass("country");
    })
});
function makeOrderStep(diaId,jewId) {
	if (appointmentCheck(diaId) > 0) {
		console.log(diaId);
		alert('您已经预约过此钻石，可以在购物车里复查预约登记。');
	} else if (appointmentCount() > 4) {
		console.log(diaId);
		alert('您只能预约五颗钻石。');
	} else if (appointmentMake("jew",diaId,jewId)) {
		console.log(diaId);
		window.location.href="shopcart.php";
	}
}
function appointmentList(id) {
	var url = "action.php?action=appointmentList";
	if(id>0)
		url = "action.php?action=appointmentList&type=dia&appointmentId=" + id;
	//获得已经预约的钻石
	$.ajax({
		type : "get",
		url : url,
		complete : function() {
		},
		success : function(json) {
			$("#appointmentList").html('');
			var data=eval(json);
			var i = 0;
			$.each(data, function (n, j) {
			    var item ='<div class="pro_pics">';
				if(j.jewellery_id>0)
					item +='<div class="pic_00"><img width=122 height=122 src="../images/sitepictures/'+j.image1+'"/>';
				else
					item +='<div class="pic_00"><img src="images/pic_01.png"/>';
		        item +='    <div class="quxiao" >';
		        item +='        <img class="removeApp" id="'+j.id+'" onclick="removeAppointment(this)" src="images/close.png"/>';
		        item +='    </div>';
	            item +='</div>';
				item += '<div class="detail">';
				if(j.jewellery_id>0)
					item += '<p>'+j.name_ch+'</p>';
				else
                	item += '<p>'+j.shapeTxt+'裸钻</p>';
                item += '<p>'+j.diamond_carat+'克拉</p>';
                item += '<p>颜色：'+j.diamond_color+'</p>';
                item += '<p>净度：'+j.diamond_clarity+'</p>';
                item += '<p>切工：'+j.diamond_cut+'</p>';
                item += '<p>抛光：'+j.diamond_polish+'</p>';
                item += '<p>对称性：'+j.diamond_symmetry+'</p>';
                item += '<p>证书：'+j.grading_lab+'</p>';
                item += '<p>编号：'+j.stock_ref+'</p>';
                if(Cookies.get("DIA_CURRENCY")=='EUR')
                		item += '<p>价格：'+(j.euro_price)+'</p>';
                else if(Cookies.get("DIA_CURRENCY")=='CNY')
            			item += '<p>价格：'+(j.yuan_price)+'</p>';
                else //if (Cookies.get("DIA_CURRENCY")=='USD')
        				item += '<p>价格：'+(j.dollar_price)+'</p>';
                if(j.grading_lab=="HRD"){
	            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j.grading_lab+'&certNo='+j.certificate_number+'" data-fancybox ><img id="gradinglabicon" src="./images/hrd.gif" /></a>';
	            }else if(j.grading_lab=='GIA'){
	            		item += '<a class="certi_linker" target="_blank" href="https://api.checkgems.com/api/v2/certs/GIA/'+j.certificate_number+'.pdf" data-fancybox ><img id="gradinglabicon" src="./images/gia.gif" /></a>';
	            } else if(j.grading_lab=='IGI'){
	            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j.grading_lab+'&certNo='+j.certificate_number+'" data-fancybox ><img id="gradinglabicon" src="./images/igi.gif" /></a>';
	            }
	            if(j.grading_lab=='GIA'){
	            		item += '<a class="certi_linker" target="_blank" href="https://api.checkgems.com/api/v2/certs/GIA/'+j.certificate_number+'.pdf" data-fancybox ><p>点击查看证书</p></a>';
	            } else {
	            		item += '<a class="certi_linker" target="_blank" href="./pdf/v.php?lab='+j.grading_lab+'&certNo='+j.certificate_number+'" data-fancybox ><p>点击查看证书</p></a>';
	            }
                item += '</div></div>';
                i = i+1;
				$("#appointmentList").prepend(item);
				if(i==5)
					$("#pro_pics").html("");
			});
		},
		error : function() {
			alert('载入数据失败！');
		}
	});
}
/**
 * @param id
 * @returns
 */
function popup(id,from) {
	if(id==0)
		appointmentList(id);
	else {
		if (appointmentCheck(id) > 0) {
			alert('您已经预约过此钻石，可以在购物车里复查预约登记。');
		} else if (appointmentCount() > 4) {
			alert('您只能预约五颗钻石。');
		} else if (appointmentMake("dia",id,0)) {
			var $haveChoose = false;
			appointmentList(id);
			if(from=='index')
				alert('预约成功，请在购物车里复查预约登记。');
			else {
				$('#appointmentId').val(id);
				popToggle($('#appointmentId').val());
			}
		} else
			alert('预约失败，请联系我们的客服微信号limeikefu');
	}
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
			if(Cookies.get('orderJewId')!=undefined)
				window.location.href="jewelry-detail.php?id="+Cookies.get('orderJewId')+"step=dia&orderDiaId="+diaId;
			else
				window.location.href="jewelry.php?step=dia";
		}
	});
	return check;
}
function appointment(id) {
	if ($('#name').val()==''||$('#email').val()==''||$('#tel').val()==''||$('#viewing_time').val()=='') {
		alert("请提供您的姓名、邮件、电话和预约时间。");
	} else {
		$('#appointmentBtn').text('处理中...').attr("onclick","");;
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
function appointmentMake(type,diaId,jewId) {
	var result = false;
	$.ajax({
		type : "post",
		async : false,
		url : "action.php?action=appointmentMake&type="+type+"&diaId=" + diaId+"&jewId="+jewId,
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
	//var s = '<input type="hidden" value="' + id + '" name="appointmentId" id="appointmentId"/><input type="button" value="" id="sub_btn" onclick="appointment();"/>';
	//$('#appointmentBottom').html(s);
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
			$("#pro_pics").html('<div class="add_pic" id="add_pic"> <div class="fonts"><a href="dia.php?step=dia"><img src="images/addDia.gif"/></a></div><div class="fonts" style=" padding-top: 10px; "><a href="jewelry.php?step=jew"><img src="images/addJew.gif"/></a></div> </div>');
		}
	});
}
function remove(item) {
	$(item).parent().parent().parent().fadeOut();
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