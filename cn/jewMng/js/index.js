pic();
add();
$(document).ready(function(){
    list();
});

//$(".delIvtBtn").on("click", function (e) {
function delIvt(item){
	var e = $(item).parent().parent().parent();
	$.ajax({
	       url : '../actionJewMng.php?action=deleteIvt&id='+$(item).attr("id"),
	       type : 'POST',
	       success : function(data) {
	    	   $(e).remove();
	       }
	});
}
//$(".addIvtBtn").on("click", function (e) {
function addIvt(item){
	var e = $(item).parents().find(".mana-c");
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
		//if($(o).val()>0) {
			data.list.push({
				'item':$(itemArr[i]).val(),
				'stock':$(stockArr[i]).val(),
				'amount':$(amountArr[i]).val(),
				'cost':$(costArr[i]).val(),
				'sale_time':$(saleTimeArr[i]).val()
			});
		//}
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
};
//$(".ivtPic").on("change", function (e) {
function chgPic(item){
	var file = $(item)[0].files[0];
    var formData = new FormData();
	formData.append('file', file);
	var element = item; 
	$.ajax({
	       url : '../actionJewMng.php?action=upload',
	       type : 'POST',
	       data : formData,
	       processData: false,  // tell jQuery not to process the data
	       contentType: false,  // tell jQuery not to set contentType
	       success : function(data) {
	           $(element).parent().children(".showImg").show();   //待上传成功后 显示  
	           $(element).parent().children("img").attr("src",data);  
	       }
	});
}
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
function count(item) {
	var jj = $(".kc-r");
	var dd = $(".kc-l");
	if($(item).attr("class")=="kc-r"){
		var c = $(item).prev("input").val();
		c--;
		if (c < 0) {
			return false;
		}
		$(item).prev("input").val(c);
	}
	if($(item).attr("class")=="kc-l"){
		var c = $(item).next("input").val();
		c++;
		$(item).next("input").val(c);
	}
}
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
		url : url,dataType:'json',
	    success : function(json) {
	    	total = json.total;
            total_pages = json.total_pages;
            if(json.l)
            $.each(json.l, function (n, v) {
                var temp = '\
                	<div class="mana-c"><div class="black-line"></div>\
    				<ul>\
    					<li class="w1"><input class="mn-1" type="text" name="ivt_no" value="'+v.ivt_no+'"> <textarea name="title"class="mn-2">'+v.title+'</textarea>\
    						<select name="ivt_type" class="mn-1">\
    							<option value="ring" '+(v.ivt_type=="ring"?"selected":"")+'>戒托</option>\
    							<option value="necklace" '+(v.ivt_type=="necklace"?"selected":"")+'>项链</option>\
    							<option value="earring" '+(v.ivt_type=="earring"?"selected":"")+'>耳钉</option>\
    							<option value="endProduct" '+(v.ivt_type=="endProduct"?"selected":"")+'>成品</option>\
    						</select>\
    						<div class="dele addIvtBtn" id="'+v.id+'" onclick="addIvt(this);">修改</div>\
    						<div class="dele dele2 delIvtBtn" id="'+v.id+'" onclick="delIvt(this);">删除</div>\
    					</li>\
    					<li class="mn-add">\
                		<img class="showImg"  alt="" src="'+v.logo+'"/> \
    					<input class="ivtPic" id="file" name="file" type="file" onchange="chgPic(this)"> <span>添加图片</span>\
    					</li>\
    					<li class="w33">\
    						<div class="jg">\
    							<p class="jg-1">0.3ct-0.89ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price03" value="'+v.price03+'">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">0.9ct-1.99ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price09"value="'+v.price09+'">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">2ct-2.99ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price2"value="'+v.price2+'">\
    							</p>\
    							<p class="jg-3">€</p>\
    						</div>\
    						<div class="jg">\
    							<p class="jg-1">>3ct</p>\
    							<p class="jg-2">\
    								<input type="text" name="price3"value="'+v.price3+'">\
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
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[0].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[1].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[2].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[3].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[4].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[5].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[6].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="stock" value="'+v.spec_list[7].stock+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[0].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[1].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[2].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[3].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[4].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[5].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[6].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p class="kc-l" onclick="count(this)">+</p>\
    								<input type="text" name="amount" value="'+v.spec_list[7].amount+'"/>\
    								<p class="kc-r" onclick="count(this)">-</p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[0].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[1].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[2].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[3].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[4].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[5].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[6].sale_time+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input type="date" name="sale_time" value="'+v.spec_list[7].sale_time+'"> </p>\
    							</div>\
    						</div>\
    					</li>\
    					<li class="w-line">\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[0].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[1].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[2].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[3].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[4].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[5].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[6].cost+'"> </p>\
    							</div>\
    						</div>\
    						<div class="kc">\
    							<div class="kc-m">\
    								<p> <input name="cost" type="text" value="'+v.spec_list[7].cost+'"> </p>\
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
/**
 * @returns
 */
function add() {
	$("#add").on("click",function() {
		var result = '<div class="mana-c">\
		<ul>\
			<li class="w1"><input class="mn-1" type="text" name="ivt_no" value=""> <textarea name="title"class="mn-2">XXXXXXXXXXXX</textarea>\
				<select name="ivt_type" class="mn-1">\
					<option value="ring">戒托</option>\
					<option value="necklace">项链</option>\
					<option value="earring">耳钉</option>\
					<option value="endProduct">成品</option>\
				</select>\
				<div class="dele addIvtBtn" onclick="addIvt(this);" id="">保存</div>\
				<div class="dele dele2 delIvtBtn" id="" onclick="delIvt(this);">删除</div>\
			</li>\
			<li class="mn-add">\
			<img class="showImg" style="display: none" alt="" src=""/>\
			<input class="ivtPic" id="file" name="file" type="file" onchange="chgPic(this)"> <span>添加图片</span>\
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
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="stock" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
			</li>\
			<li class="w-line">\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
					</div>\
				</div>\
				<div class="kc">\
					<div class="kc-m">\
						<p class="kc-l" onclick="count(this)">+</p>\
						<input type="text" name="amount" value="0"/>\
						<p class="kc-r" onclick="count(this)">-</p>\
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
	</div>';
		$(".list-main").append(result);
	})
}
