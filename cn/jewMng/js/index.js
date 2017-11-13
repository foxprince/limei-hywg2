pic();
count();
add();
$(document).ready(function(){
    list();
});
function list(ivt_type,order,size,page) {
	var e = $(".mana-t");
	var url = '../actionJewMng.php?action=ivtList';
	if(ivt_type)
		url += '&ivt_type='+ivt_type;
	if(order)
		url += '&order='+order;
	if(size)
		url += '&size='+size;
	if(page)
		url += '&page='+page;
	$.ajax({
		url : url,
	    success : function(json) {
	    	total = json.total;
            total_pages = json.total_pages;
            $.each(json.l, function (n, v) {
            	console.log(v);
            //for(var i=0;i<json.list.length;i++){
                var temp = '\
                	<div class="mana-c">\
    				<ul>\
    					<li class="w1"><input class="mn-1" type="text" name="ivt_no" value=""> <textarea name="title"class="mn-2">XXXXXXXXXXXX</textarea>\
    						<select name="ivt_type" class="mn-1">\
    							<option value="ring">戒托</option>\
    							<option value="necklace">项链</option>\
    							<option value="earring">耳钉</option>\
    							<option value="endProduct">成品</option>\
    						</select>\
    						<div class="dele addIvtBtn" id="">保存</div>\
    						<div class="dele dele2 delIvtBtn" id="">删除</div>\
    					</li>\
    					<li class="mn-add">\
                		<img class="showImg" style="display: none" alt="" src=""/> \
    					<input class="ivtPic" id="file" name="file" type="file" > <span>添加图片</span>\
    					</li>\
    					<li class="w33">\
    						<div class="jg">\
    							<p class="jg-1">0.3ct-0.89ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price03" value="99999">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">0.9ct-1.99ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price09"value="99999">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">2ct-2.99ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price2"value="99999">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">>3ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price3"value="99999">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    					</li>\
    					<div class="ivtSpec">\
    					<li class="gg">\
    						<p>0.4CT</p><input type="hidden" name="item" value="0.4CT"/>\
    						<p>0.6CT</p><input type="hidden" name="item" value="0.6CT"/>\
    						<p>0.8CT</p><input type="hidden" name="item" value="0.8CT"/>\
    						<p>1.1CT</p><input type="hidden" name="item" value="1.1CT"/>\
    						<p>1.5CT</p><input type="hidden" name="item" value="1.5CT"/>\
    						<p>2CT</p><input type="hidden" name="item" value="2CT"/>\
    						<p>3CT</p><input type="hidden" name="item" value="3CT"/>\
    						<p>4CT</p><input type="hidden" name="item" value="4CT"/>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="stock" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l">+</p>\
    								<input type="text" name="amount" value="0"/>\
    								<p class="kc-r">-</p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" > </p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text"> </p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="gt">\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    						<p>€</p>\
    					</li>\
    					</div>\
    					<li class="bz"><textarea name="note"></textarea></li>\
    				</ul>\
    			</div>\
                ';
                $(e).append(temp);
            });
	    }
	});
}
$(".delIvtBtn").on("click", function (e) {
	var e = $(this).parents().find(".mana-c");
	$.ajax({
	       url : '../actionJewMng.php?action=deleteIvt&id='+$(this).attr("id"),
	       type : 'POST',
	       success : function(data) {
	    	   $(e).remove();
	       }
	});
});
$(".addIvtBtn").on("click", function (e) {
	var e = $(this).parents().find(".mana-c");
	var ivtId = $(this).attr("id");
	var data = {
			'id':ivtId,'ivt_type':$(e).find("[name='ivt_type']").val(),'ivt_no':$(e).find("[name='ivt_no']").val(),
			'title':$(e).find("[name='title']").val(),'logo':$(e).find(".showImg").attr("src"),
			'price03':$(e).find("[name='price03']").val(),'price09':$(e).find("[name='price09']").val(),
			'price2':$(e).find("[name='price2']").val(),'price3':$(e).find("[name='price3']").val(),
			'note':$(e).find("[name='note']").val(),
			'list':[]
	        };
	var s = $(e).find('.ivtSpec');
	var itemArr = $(e).find("input[name=item]");
	var stockArr = $(e).find("input[name=stock]");
	var amountArr = $(e).find("input[name=amount]");
	var costArr = $(e).find("input[name=cost]");
	var saleTimeArr = $(e).find("input[name=sale_time]");
	stockArr.each(function (i, o) {
		if($(o).val()>0) {
			data.list.push({
				'item':$(itemArr[i]).val(),
				'stock':$(stockArr[i]).val(),
				'amount':$(amountArr[i]).val(),
				'cost':$(costArr[i]).val(),
				'sale_time':$(saleTimeArr[i]).val()
			});
		}
	});
	if(data){
    	var url = "../actionJewMng.php?action=addIvt";
        if(ivtId>0)
        	url = "../actionJewMng.php?action=updateIvt";
        $.post(url,{inventory:JSON.stringify(data)},function(data){
            console.log(data);
        	if(data >0){
                alert('保存成功')
                $(e).find('.dele').attr("id",data);
                $(e).find('.addIvtBtn').text("修改");
                ivtId = data;
            }else{
                alert('网络错误，请检查信息并重试')
            }
        })
    }
//	for(var i = 1;i<9;i++){
//		console.log(stockArr[i].val());
//		if($(e).find("input[name=stock]("+i+")").val()>0 
//				|| $(e).find("input[name=amount]")[i].val()>0 || $(e).find("input[name=cost]")[i].val()) {
//			data.list.push({
//				'item':$(e).find("input[name=item]")[i].val(),
//				'stock':$(e).find("input[name=stock]")[i].val(),
//				'amount':$(e).find("input[name=amount]")[i].val(),
//				'cost':$(e).find("input[name=cost]")[i].val(),
//				'sale_time':$(e).find("input[name=sale_time]")[i].val()
//			});
//		}
//	}
});
$(".ivtPic").on("change", function (e) {
    var file = $(this)[0].files[0];
    var formData = new FormData();
	formData.append('file', file);
	var element = this; 
	$.ajax({
	       url : '../actionJewMng.php?action=upload',
	       type : 'POST',
	       data : formData,
	       processData: false,  // tell jQuery not to process the data
	       contentType: false,  // tell jQuery not to set contentType
	       success : function(data) {
	           $(element).parent().children(".showImg").show();   //待上传成功后 显示  
	           $(element).parent().children("img").attr("src","/cn/"+data);  
	       }
	});
});
function pic() {
	var $img = $(".order-1 img");
	var str;
	var my;
	$img.on("click", function() {
		var $src = $(this).attr("src");
		$(".update img").attr("src", $src);
		$(".all").show();
		console.log($src);
	});
	$('#fil').change(function() {
		str = $(this).val();
		var arr = str.split('\\');
		my = arr[arr.length - 1];
		$(".update img").attr("src", "img/" + my);
	});
	$("#ok").on("click", function() {
		$(".all").hide();
	})
}
function count() {
	var jj = $(".kc-r");
	var dd = $(".kc-l");
	jj.on("click", function() {
		var c = $(this).prev("input").val();
		c--;
		if (c < 0) {
			return false;
		}
		$(this).prev("input").val(c);
	});
	dd.on("click", function() {
		var c = $(this).next("input").val();
		c++;
		$(this).next("input").val(c);
	})
}
/**
 * @returns
 */
function add() {
	$("#add").on("click",function() {
		var result = '<div class="mana-c"><div class="black-line"></div> <ul> <li class="w1"> <input class="mn-1" name="name" type="text" value="0001" id="name"> <textarea class="mn-2" >XXXXXXXXXXXX</textarea><select class="mn-1"> <option>全部</option> <option>戒托</option><option>项链</option> <option>耳钉</option> <option>成品</option></select> <div class="dele">保存</div><div class="dele dele2">删除</div></li> <li class="mn-add"><a href="#"> <input type="file"> <span>添加图片</span> </a> </li> <li class="w33"> <div class="jg"> <p class="jg-1">0.3ct-0.89ct</p> <p class="jg-2"><input  type="text"   value="99999"></p> <p class="jg-3">€</p> </div> <div class="jg"> <p class="jg-1">0.9ct-1.99ct</p> <p class="jg-2"><input type="text"   value="99999"></p> <p class="jg-3">€</p> </div> <div class="jg"> <p class="jg-1">2ct-2.99ct</p> <p class="jg-2"><input  type="text"   value="99999"></p> <p class="jg-3">€</p> </div> <div class="jg"> <p class="jg-1">>3ct</p> <p class="jg-2"><input  type="text"   value="99999"></p> <p class="jg-3">€</p> </div> </li> <li class="gg"> <p>0.4CT</p> <p>0.8CT</p> <p>0.8CT</p> <p>1.1CT</p> <p>1.5CT</p> <p>2CT</p> <p>3CT</p> <p>4CT</p> </li> <li class="w-line"> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> </li> <li class="w-line"> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> <div class="kc"> <div class="kc-m"> <p class="kc-l">+</p> <p>0</p> <p class="kc-r">-</p> </div> </div> </li> <li class="w-line"> <div class="kc"> <div class="kc-m"> <p><input type="date" value="2017-11-10"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> <div class="kc"> <div class="kc-m"> <p></p> </div> </div> </li> <li class="w-line"> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> <div class="kc"> <div class="kc-m"> <p><input type="text"></p> </div> </div> </li> <li class="gt"> <p>€</p> <p>€</p> <p>€</p> <p>€</p> <p>€</p> <p>€</p> <p>€</p> <p>€</p> </li> <li class="bz"> <textarea  >11111111111111111</textarea> </li> </ul> </div>';
		$(".list-main").append(result);
	})
}
