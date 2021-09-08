;
(function(global) {
	"use strict";
	/* 
	 * el 元素选择器
	 * str 显示的提示文字
	 */
	var init = function(el, str, postion) {
		var mouseoverFlag = false,
			id = ''
		$(el).mouseover(function() {
			if (mouseoverFlag == true) {
				return false
			}
			id = Date.parse(new Date())
			var offset = $(this).offset()
			var width = $(this).width()
			var height = $(this).height()
			var ext_class = postion ? `tool_tip_${postion}` : ''

			var html =
				`<div class="tool_tip ${ext_class}" id="${id}" style="left:${offset.left}px;top:${offset.top}px">
				<span class="tool_tip_p">${str}</span>
				<span class="tool_tip_b">NEXT</span>
			  </div>`
			$('body').append(html)
			mouseoverFlag = true
		})
		$(el).mouseleave(function() {
			mouseoverFlag = false
			$(`#${id}`).remove()
		})
		if (typeof module !== 'undefined' && module.exports) module.exports = M;
		if (typeof define === 'function') define(function() {
			return M;
		});
	}
	global.tooltip = init;
})(this);
