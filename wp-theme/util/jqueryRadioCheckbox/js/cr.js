/**
 * html 
 * 
 * type : radio /checkbox 必须
 * 
 * 
 * <div class="sf-checked" type="radio">
 *		<div class="sf-checked-item" value='1' checked="checked">启动</div>
 *		<div class="sf-checked-item" value='2'>禁用</div>
 * </div>
 * 
 * 
 *  js
 * 
 * //以html 初始化 
 * $(el).sfcheckbox(options);
 * 
 * //以数据初始化   'initVal' 方法名 list 初始化数据  
 * list[
 * {text:'text',  //文本内容
 * 		val:'val',    //value值
 * 		state:'state', //选中状态
 * }]
 * $(el).sfcheckbox('initVal',list);
 * 
 * 
 * //获取选中的值
 * 
 * return  //redio 返回val    checkbox返回 list[{val:'val',text:'text'}....]
 * 
 * $(el).sfcheckbox('getVal');
 * 
 * //赋值
 * val  需要选中的item项的value值  //redio 只会选中一个    checkbox选中多个
 * $(el).sfcheckbox('setVal',val);
 * 
 **/




;
(function($) {

	//step03-a 插件的默认值属性
	var defaults = {
		type: 'radio', //单选或多选
	};

	//step02 插件的扩展方法名称
	$.fn.sfcheckbox = function(options, v) {
		if(typeof options == "string") {
			var _m = $.fn.sfcheckbox.methods[options];
			if(_m) {
				return _m(this, v);
			}
		}
		//合并用户自定义属性，默认属性
		var options = $.extend({}, defaults, options);
		//初始化页面
		return init(this, options);
	}

	//获取
	$.fn.sfcheckbox.methods = {
		getVal: function(thiz) {
			var that = thiz;
			var type = $(that).attr('type');
			
			if(type == 'checkbox') {
				var list = [];
				$(that).find('.sf-checked-item').each(function(index, item) {
					var checked = $(item).attr('checked');
					if(checked) {
						var t = {
							'val': $(item).attr('value'),
							'text': $(item).find('label').text()
						};
						list.push(t);
					}
				})
				return list;
			} else {
				var s = $(that).find('.sf-checked-item[checked="checked"]');
				return $(s).attr('value');
			}
		},
		initVal: function(thiz, o) {
			if(o) {
				reSethtml(thiz, o);
			} else {
				return init(thiz, options);
			}
		},
		setVal: function(thiz, val) {
			var o = $(thiz).find('.sf-checked-item');
			var type = $(thiz).attr('type');
			var selectedClass = type == 'checkbox' ? 'sf-checkbox-selected' : 'sf-radio-selected';
			if(type == 'checkbox'){
				//添加
				$(thiz).find('.sf-checked-item[value='+val+']').attr('checked','checked');
				$(thiz).find('.sf-checked-item[value='+val+'] span').addClass(selectedClass);
			}else{
				//移除
				$(thiz).find('.sf-checked-item').removeAttr('checked');
				$(thiz).find('.sf-checked-item span').removeClass(selectedClass);
				//添加
				$(thiz).find('.sf-checked-item[value='+val+']').attr('checked','checked');
				$(thiz).find('.sf-checked-item[value='+val+'] span').addClass(selectedClass);
			}			
		},
	};
	var reSethtml = function(thiz, o) {
		var type = $(thiz).attr('type');
		$(thiz).text('');
		var html = '';
		for(var i = 0; i < o.length; i++) {
			var obj = o[i];
			var valText = obj.text;
			var value = obj.val;
			//选中属性
			var checked = obj.state;
			//空样式
			var defauClass;
			//选中样式
			var selectedClass;
			//check样式
			if(type == 'checkbox') {
				defauClass = 'sf-checkbox-icon ';
				selectedClass = checked == '1' ? 'sf-checkbox-selected' : '';
				//radio样式
			} else {
				defauClass = 'sf-radio-icon ';
				selectedClass = checked == '1' ? 'sf-radio-selected' : '';
			}
			html = '<div class="sf-checked-item"><span class=' + defauClass + '></span><label>' + valText + '</label></div>';
			$(thiz).append(html);
			if(checked == '1') {
				$(thiz).find('.sf-checked-item span').addClass(selectedClass);
				$(thiz).find('.sf-checked-item').attr('checked', 'checked');
				$(thiz).find('.sf-checked-item').attr('value', value);
			}
		}
		initClick(thiz, type)
	};
	//初始化方法
	var init = function(thiz, options) {
		//var ops = options;
		var that = thiz;
		//构造html
		var type = $(thiz).attr('type');
		var itemlist = $(thiz).find('.sf-checked-item');

		inithtml(itemlist, type);
		initClick(thiz, type)
	};
	var initClick = function(thiz, type) {
		var that = thiz;
		//点击事件
		$(that).on('click', '.sf-checked-item', function() {
			var value = $(this).attr('value');
			//选中样式
			var selectedClass = type == 'checkbox' ? 'sf-checkbox-selected' : 'sf-radio-selected';
			//check样式
			if(type == 'checkbox') {
				var checked = $(this).attr('checked');
				if(checked) {
					$(this).find('span').removeClass(selectedClass);
					$(this).removeAttr('checked');

				} else {
					$(this).find('span').addClass(selectedClass);
					$(this).attr('checked', 'checked');
				}
				//radio样式
			} else {
				
				//移除原先样式
				$(thiz).find('span').removeClass(selectedClass);
				$(thiz).find('.sf-checked-item').removeAttr('checked');
		
				//当前选中的样式赋值上
				$(this).find('span').addClass(selectedClass);
				$(this).attr('checked', 'checked');
			}
		});
	}
	var inithtml = function(el, type) {
		$(el).each(function(index, item) {
			//item文本
			var valText = $(item).html();
			//清除外部文本
			$(item).html('');

			var html = '';
			//选中属性
			var checked = $(item).attr('checked');
			//不能选中属性
			var disabled = $(item).attr('disabled');

			//空样式
			var defauClass;
			//选中样式
			var selectedClass;
			//check样式
			if(type == 'checkbox') {
				defauClass = 'sf-checkbox-icon ';
				selectedClass = checked ? 'sf-checkbox-selected' : '';
				//radio样式
			} else if(type) {
				defauClass = 'sf-radio-icon ';
				selectedClass = checked ? 'sf-radio-selected' : '';
			}

			html += '<span class=' + defauClass + '></span><label>' + valText + '</label>';
			$(item).append(html);
			if(checked) {
				$(item).find('span').addClass(selectedClass);
			}
		});
	};

})(jQuery);