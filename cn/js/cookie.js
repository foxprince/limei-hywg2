function addCookie(name, value, expireHours) {
	var cookieString = name + "=" + escape(value) + "; path=/";
	// 判断是否设置过期时间
	if (expireHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1000);
		cookieString = cookieString + "; expire=" + date.toGMTString();
	}
	document.cookie = cookieString;
}
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
function delCookie(name) {// 删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getcookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}