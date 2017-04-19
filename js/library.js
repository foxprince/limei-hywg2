// AC_OETags.js
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.embedAttrs["name"] = ret.objAttrs["id"];
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

/* End of AC_OETags.js */

//Auto advance to next form field after maxLength of current field is reached

	function autotab(current,to){
	
		if ((current.getAttribute && current.value.length==current.getAttribute("maxlength")) ) {
			current.blur()
			to.focus() 
		}
	}

/* End of autoTab.js */
// ----------------------------------------------
// File:		BrowserUtils.js
// Author:		Nathan Derksen
// Description:	Class to provide access to some basic browser utilities 
// Example:
// var width = BrowserUtils.getBrowserWidth();
// ----------------------------------------------


// ----------------------------------------------
// Function:	BrowserUtils()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function BrowserUtils() {
}

// ----------------------------------------------
// Function:	getBrowserWidth()
// Author:		Nathan Derksen
// Description:	Find out how wide the browser window is
// Inputs:		<None>
// Returns:		<Number>
// ----------------------------------------------
BrowserUtils.getBrowserWidth = function() {
	var width = 0;
	
	if (typeof(innerWidth) == "number")
	{
		width = window.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
	{
		width = document.documentElement.clientWidth;
	}
	else
	{
		width = document.body.clientWidth;
	}
	return width;
};

// ----------------------------------------------
// Function:	getBrowserHeight()
// Author:		Nathan Derksen
// Description:	Find out how tall the browser page is
// Inputs:		<None>
// Returns:		<Number>
// ----------------------------------------------
BrowserUtils.getBrowserHeight = function() {
	var height = 0;
	
	if (typeof(innerHeight) == "number")
	{
		height = window.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
	{
		height = document.documentElement.clientHeight;
	}
	else
	{
		height = document.body.clientHeight;
	}
	return height;
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.addOnLoadHandler = function (newHandler) {
	if (typeof(console) != "undefined") {
		console.log("BrowserUtils.addOnLoadHandler is deprecated. Please use jQuery $(document).ready(...); instead.");
	}
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.getPosition = function(elementHandle) {
	var currentLeft = currentTop = 0;
	if (elementHandle.offsetParent) 
	{
		currentLeft = elementHandle.offsetLeft;
		currentTop = elementHandle.offsetTop;
		while (elementHandle = elementHandle.offsetParent) 
		{
			currentLeft += elementHandle.offsetLeft;
			currentTop += elementHandle.offsetTop;
		}
	}
	return {left:currentLeft, top:currentTop};
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.getIsSecure = function() {
	var pageLocation = window.location.href.toLowerCase();
	if (pageLocation.indexOf("https://") == 0)
	{
		return true;
	}
	return false;
}

BrowserUtils.preloadImages = function (imageArray) {
	var i, n;
	for (i = 0, n = imageArray.length; i < n; i++) {
		$("<img />").attr("src",imageArray[i]);
	}
}

// This function is to support old FAQ content only.  At some point all FAQ content should
// be updated and this function deleted
function MM_openBrWindow(theURL, winName, features) { //v2.0
    window.open(theURL, winName, features);
}

/* End of BrowserUtils.js */
// CategoryBarRenderer.js, for drawing out category browse refinement menus

function CategoryBarRenderer()
{
	this.pInstance = null;
}

/* End of CategoryBarRenderer.js */
var IE=(navigator.appName.toLowerCase().indexOf("microsoft")!=-1)?true:false;
var NS=(navigator.appName.toLowerCase().indexOf("netscape")!=-1)?true:false;
var MAC=(navigator.appVersion.toLowerCase().indexOf("mac")!=-1)?true:false;
var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);true;false;
var realLength=0;
var textObj=null;
var maxLength=0;
var updateTimer=null;
var useCounter=false;
var globalId=null;
var lastLeftChars=0;
var alertBox=false;
if (typeof isGiftMessage == 'undefined'){
	isGiftMessage = false;
}

function onError(){
	top.location="javascript:";
}
function initCharCount(obj,max,counter,id,msg){
	globalId=id;
	textObj=obj;
	realLength=obj.value.length;
	maxLength=max;
	useCounter=counter;
	alertBox=msg;
	obj.onblur=new Function("if(updateTimer) top.clearTimeout(updateTimer)");
	obj.onblur= validateMessage;
	obj.onkeypress=watchMax;
	obj.onkeydown=watchMax;
	obj.onkeyup=watchMax;
}

function watchMax(e)
{
	//window.status=realLength - countCR();
	var keyCode=(NS)?e.which:event.keyCode;
	
	updateMessageLimit();
	
	if(realLength>=maxLength && keyCode!=8 && keyCode!=37 && keyCode!=38 && keyCode!=39 && keyCode!=40 && keyCode!=46){
		//Safari has a bug that doesnt cancel events correctly.
		if(isSafari && keyCode!=127) this.blur();
		if (isGiftMessage && keyCode!=13) {
			this.blur();
		}
		return false;
	}
	else{
		if(!MAC) return true;
	}
}

function writeToLayer(){
	var leftChars=maxLength-realLength;
	if(leftChars<0) leftChars=0;
	if(leftChars>maxLength) leftChars=maxLength;
//	if(lastLeftChars!=leftChars){
		lastLeftChars=leftChars;
		//var strOutput="<font size=1><font color=red><b>";
		var strOutput="<span class='medText'>";
		//strOutput+=leftChars;
		//if(leftChars==1) strOutput+="</b></font> character remaining";
		if(leftChars==1) strOutput+=prefixMessage + leftChars + suffixMessage + "</span>";
		//else strOutput+="</b></font> characters remaining</font>";
		else strOutput+=prefixMessage + leftChars + suffixMessage + "</span>";
		if (document.getElementById)
		{
			var x=(globalId==null)? document.getElementById(textObj.name+"Lyr"): document.getElementById(globalId+"Lyr");
			if (x)
			{
				x.innerHTML = '';
				x.innerHTML = strOutput;
			}
		}
		else if (document.all)
		{
			var x=(globalId==null)? eval("document.all."+textObj.name+"Lyr"):eval("document.all."+globalId+"Lyr");
			x.innerHTML = strOutput;
		}
		
		

//	}
}

function checkMessageLimit(obj,id){
	var counter = true;
	id = "ID" + id;
	msg = "";

	initCharCount(obj,max,counter,id,msg);
	updateMessageLimit();
}

function updateMessageLimit()
{
	realLength=textObj.value.length-countCR();
	
	if (textObj.value.length > maxLength){	
		textObj.value = textObj.value.substring(0,max);
	}
	if(useCounter) writeToLayer();
}

function validateMessage() {
	if (textObj.value.length-countCR() > maxLength){
		if (isGiftMessage){alert(exceededMessage);}
		textObj.value = textObj.value.substring(0,max + countCR());
		}
}


function countCR() {
		if (typeof isGiftMessage == 'undefined'){
			isGiftMessage = false;
		}
		if (isGiftMessage) {
			count = 0;
			for (cpos=0;cpos<=textObj.value.length;cpos++){
				c = textObj.value.charCodeAt(cpos);
				if (c == 13 && (document.all)){count = count + 1}
				else if (c == 10 && (!document.all)){count = count + 1}
			}
			if (document.all && !isMac) {count = count*2;}
			return count;
		}
		else { return 0}
}

function checkMessageLimitOnly(obj,id){
	var counter = true;
	id = "ID" + id;
	msg = "";
	if(arguments.length>0) initCharCount(obj,max,counter,id,msg);
	else realLength=textObj.value.length;
	if (textObj.value.length > maxLength){	
		textObj.value = textObj.value.substring(0,max);
	}
}

/* End of character_count.js */
// CookieManager.js, for managing browser cookies

function CookieManager() {
}

CookieManager.getCookieValue = function(cookieName) {
    var cookie = document.cookie
    var chkdCookie = cookie.split(" ").join("");
    var nvpair = chkdCookie.split(";")
	var splitValues;

    for (var i = 0; i < nvpair.length; ++i) {
        splitValues = nvpair[i].split("=")
        if (splitValues[0] == cookieName) {
			return splitValues[1];
		}
    }
	return null;
}

CookieManager.setCookieValue = function (cookieName, cookieValue, cookieExpireDays) {
    var futdate = new Date()		//Get the current time and date
    var expdate = futdate.getTime()  //Get the milliseconds since Jan 1, 1970
    if (!cookieExpireDays || cookieExpireDays == "") {
        cookieExpireDays = 364;
    }
    expdate += cookieExpireDays * 24 * 60 * 60 * 1000  //expires in about one year
    futdate.setTime(expdate);
    var newCookie = cookieName + "=" + cookieValue + "; path=/;"
    newCookie += " expires=" + futdate.toGMTString();
    window.document.cookie = newCookie;
}

CookieManager.eraseCookie = function(cookieName) {
    document.cookie = cookieName + "=;expires=-1; path=/";
}

CookieManager.setCookieModule = function(mylink, qs, css, t) {
    var newCookie = "module_mode=yes;path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie2 = "module_url=" + mylink + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie3 = "module_css=" + css + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie4 = "module_qs=" + qs + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie5 = "module_t=" + t + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    window.document.cookie = newCookie
    window.document.cookie = newCookie2
    window.document.cookie = newCookie3
    window.document.cookie = newCookie4
    window.document.cookie = newCookie5
}

CookieManager.areCookiesEnabled = function() {
	if (document.forms[0]) {
		if (document.forms[0].areCookiesEnabled) {
			if (document.forms[0].areCookiesEnabled.value.toLowerCase() == "false") {
				return false;
			}
		}
	}
	return true;
}

/* End of CookieManager.js */
// DomValidation.js.
//<script>
var _val_is_Overlay=false;
try {
    if (typeof parent.divPopupHolder != "undefined") {_val_is_Overlay=true;}
    if (typeof parent.divEmailPopupHolder != "undefined") { _val_is_Overlay = true; }
} catch(e) {
	//probably a cross-domain popup
}
var _val_agt=navigator.userAgent.toLowerCase();
var _val_is_major=parseInt(navigator.appVersion);
var _val_is_ie=((_val_agt.indexOf("msie")!=-1) && (_val_agt.indexOf("opera")==-1));
var _val_isNT=_val_agt.indexOf("windows nt")!=-1;
var _val_IE=(document.all);
var _val_IE4=(_val_is_ie && (_val_is_major==4) && (_val_agt.indexOf("msie 4")!=-1));
var _val_IE6=(_val_is_ie && (_val_agt.indexOf("msie 6.0")!=-1));
var _val_NS=(document.layers);
var _val_DOM=(document.getElementById);
var _val_isMac=(_val_agt.indexOf("Mac")==-1);
var _val_allString="document.";
_val_allString += (_val_IE)?"all.":(_val_DOM)?"getElementById(\"":"";
var _val_styleString=(_val_IE)?".style":(_val_DOM)?"\").style":"";
var _val_endAllString=(_val_DOM && !_val_IE)?"\")":"";
var _val_px=(_val_DOM)?"px":"";

var Page_DomValidationVer = "2";
var Page_IsValid = true;  
var Page_BlockSubmit = false;

function ValidatorUpdateDisplay(val) {
	//var prop = val.getAttribute("display");
	var prop = dom_getAttribute(val,"display");
	
	var style_str = "", style_prefix = "display: ";
		
    if (typeof(prop) == "string") {    
        if (prop == "None") {
            return;
        }
        if (prop == "Dynamic") {
			style_str = val.isvalid ? "none" : "inline";
            //val.setAttribute("style",style_prefix+style_str+"; ");
            val.style.display = style_str;
            return;
        }
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}

function ValidatorUpdateIsValid() {
	var i;
	if (typeof(Page_Validators) != "undefined") {
		for (i = 0; i < Page_Validators.length; i++) {
			if (!Page_Validators[i].isvalid) {
				Page_IsValid = false;
				Page_BlockSubmit = true;
				return;
			}
		}
	}
	Page_IsValid = true;
}

function ValidatorHookupControl(control, val) {
    if (control != null)
    {
	   if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
	        var ev = control.onchange;
	        var new_ev;
            if (typeof(ev) == "function" ) {            
                ev = ev.toString();
                //ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
                //new_ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
                new_ev = "if (Page_IsValid || Page_BlockSubmit) {" + ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}")) + "}";
            }
            else {
                //ev = "";
                new_ev = "";
            }

//			if (new_ev != "") {
//				ev += "if (Page_IsValid || Page_BlockSubmit) {" + new_ev + "}";
				//ev += "if (true) {" + new_ev + "}";
//			}
            //var func = new Function("ValidatorOnChange('" + control.id + "'); " + ev);
            var func = new Function("ValidatorOnChange('" + control.id + "'); " + new_ev);
    //alert(control.id + " function is [" + func + "]");
	        control.onchange = func;
	    }
        control.Validators[control.Validators.length] = val;
    }
}

function ValidatorGetValue(id) {
    var control;
    //control = document.getElementById(id);
    control = dom_getElementByID(id);
    if (control == null)
		return "";

    if (typeof(control.value) == "string") {
        return control.value;
    }

    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var j;
        for (j=0; j < control.length; j++) {
            var inner = control[j];
            if (typeof(inner.value) == "string" && (inner.type != "radio" || inner.status == true)) {
                return inner.value;
            }
        }
    }
}

function Page_ClientValidate() {
	
    var i,ctrl;
    if (typeof(Page_Validators) != "undefined") {
		for (i = 0; i < Page_Validators.length; i++) {
			ValidatorValidate(Page_Validators[i]);
		}
	}
    ValidatorUpdateIsValid();   
    ValidationSummaryOnSubmit(); 
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}

function ValidatorCommonOnSubmit() {
///<V1.200> - Support for CausesValidation property
   var retValue = !Page_BlockSubmit;

   if (!_val_NS) {   // If we are not in crappy old Netscape 4.7 then....
      if (_val_IE)  // If its Internet Explorer, set our return event value.
		if (event)
		{
		 // ND: Added if() statement to deal with situation where event did not exist
         event.returnValue = retValue;
        }
   }
   
   Page_BlockSubmit = false;
   
   //All Overlays that do error conditions should have provision for scrolling.
   //if (_val_is_Overlay) {initScrollLayer();}

   return retValue;
}

function ValidatorOnChange(controlID) {
    //var cont = document.getElementById(controlID);
    var cont = dom_getElementByID(controlID);
    var vals = cont.Validators;
    var i;
    for (i = 0; i < vals.length; i++) {
        ValidatorValidate(vals[i]);
    }
    ValidatorUpdateIsValid();    
    return Page_IsValid;
}

function ValidatorValidate(val) {   
    val.isvalid = true;
    if (val.enabled != false)    // V2.00 change
    {
        if (typeof(val.evalfunc) == "function") {
            val.isvalid = val.evalfunc(val); 
        }
    }
	//All Overlays that do error conditions should have provision for scrolling.
	if (_val_is_Overlay) {initScrollLayer();}
	if (typeof(overlayAutoSize) != "undefined") {checkOverlaySize();}
    ValidatorUpdateDisplay(val);
}

function checkOverlaySize() {
    if ((document.getElementById("divText").offsetHeight) > 150) { resizeOverlay(); }
}
function resizeOverlay() {
    if (parent.document.getElementById("iframeMiniContent") != null) {
        var newOverlayOffSetHeight = document.getElementById("divText").offsetHeight + 20;
        parent.document.getElementById("iframeMiniContent").style.height = newOverlayOffSetHeight + "px"
    }
}

function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;

    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        //var evalFunction = val.getAttribute("evaluationfunction");
        var evalFunction = dom_getAttribute(val,"evaluationfunction");
        if (typeof(evalFunction) == "string") {
            eval("val.evalfunc = " + evalFunction + ";");
        }
        //var isValidAttribute = val.getAttribute("isvalid");
        var isValidAttribute = dom_getAttribute(val,"isvalid");
        if (typeof(isValidAttribute) == "string") {
            if (isValidAttribute == "False") {
                val.isvalid = false;                                
                Page_IsValid = false;
            } 
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        } else {
            val.enabled = true;
        }
       
        //var controlToValidate = val.getAttribute("controltovalidate");
        var controlToValidate = dom_getAttribute(val,"controltovalidate");
        if (typeof(controlToValidate) == "string") {
			ValidatorHookupControl(dom_getElementByID(controlToValidate), val);
            //ValidatorHookupControl(document.getElementById(controlToValidate), val);
        }
		//var controlhookup = val.getAttribute("controlhookup");
		var controlhookup = dom_getAttribute(val,"controlhookup");
		if (typeof(controlhookup) == "string") {
            if (controlhookup != "")    // V2.00 Change
            {
			    //ValidatorHookupControl(document.getElementById(controlhookup), val);
			    ValidatorHookupControl(dom_getElementByID(controlhookup), val);
			}
		}        
    }
    Page_ValidationActive = true;
    if (!Page_IsValid)
		ValidationSummaryOnSubmit();
		
	// IE4 hack test
    if (_val_IE4)
    {
		var ev = new Function("ValidationSummaryOnSubmit();");
		document.onreadystatechange=ev;
	}
	
}
function TrimString(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

function RegularExpressionValidatorEvaluateIsValid(val) {
    //var value = ValidatorGetValue(val.getAttribute("controltovalidate"));
    var value = ValidatorGetValue(dom_getAttribute(val, "controltovalidate"));
    // change sent by Alex Aslam -- 9/21/2005
    if (TrimString(value).length == 0) return true;
    
    //var rx = new RegExp(val.getAttribute("validationexpression"));
    var rx = new RegExp(dom_getAttribute(val, "validationexpression"));
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
    //if (TrimString(value).length != 0) return false;
}

function ValidatorTrim(s) {
    //var m = s.match(/^\s*(.*\S)\s*$/);
    //return (m == null) ? "" : m[1];

    // change sent by Mathew A. Frank 11/05/2003 <V2.000> fix.
    return s.replace(/^\s+|\s+$/g, "");
}

function RequiredFieldValidatorEvaluateIsValid(val) {
    //return (ValidatorTrim(ValidatorGetValue(val.getAttribute("controltovalidate"))) != ValidatorTrim(val.getAttribute("initialvalue")));
    return (ValidatorTrim(ValidatorGetValue(dom_getAttribute(val, "controltovalidate"))) != ValidatorTrim(dom_getAttribute(val, "initialvalue")));
}


///////////////////////////////////// my stuff ////////////////////////////////////////////////////////////

function ValidatorCompare(operand1, operand2, operator, val) {
    //var dataType = val.type;
    //var dataType = val.getAttribute("type",false);
    var dataType = dom_getAttribute(val, "type");
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;   
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    if (op2 == "")
		return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);            
    }
}



function CompareValidatorEvaluateIsValid(val) {
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (null == ctrl)
        return true;
    var value = ValidatorGetValue(ctrl);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";

    // V2.0 changes
    var hookupCtrl = dom_getAttribute(val, "controlhookup");
    var useCtrlToValidate = false;
    if (hookupCtrl != null)
    {
        if (typeof(hookupCtrl) == "string")
        {
		    if (hookupCtrl != "")
		        useCtrlToValidate = true;
        }
    }
    // End V2.00 changes
    
    if (!useCtrlToValidate) {  // V2.00 change
        var ctrl_literal = dom_getAttribute(val, "valuetocompare");
        if (typeof(ctrl_literal) == "string") {
            compareTo = ctrl_literal;  // V2.00 change
         }
    }
    else {
        compareTo = ValidatorGetValue(dom_getAttribute(val, "controlhookup"));
    }
    operator = dom_getAttribute(val, "operator");
    return ValidatorCompare(value, compareTo, operator, val);
}

function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    //var ctrl = val.getAttribute("controltovalidate");
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (typeof(ctrl) == "string") {
		if (ctrl != "") {
			value = ValidatorGetValue(ctrl);
			if (value == "")
				return true;
        }
    }
    var valid = true;
    //var func_str = val.getAttribute("clientvalidationfunction");
    var func_str = dom_getAttribute(val, "clientvalidationfunction");
    if (typeof(func_str) == "string") {
        if (func_str != "") {
            eval("valid = (" + func_str + "(val, value) != false);");
        }
    }        
    return valid;
}

// Added for V2.0 changes - 27/1/2002 - Glav
function RangeValidatorEvaluateIsValid(val) {
	var value;    
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (typeof(ctrl) == "string") {
		if (ctrl != "") {
			value = ValidatorGetValue(ctrl);
			if (value == "")
				return true;
        }
    }

    var minval = dom_getAttribute(val,"minimumvalue");
    var maxval = dom_getAttribute(val,"maximumvalue");

	if (minval == null && maxval == null)
        return true;
    
    if (minval == "")
		minval = 0;
	if (maxval == "")
		maxval = 0;
	
    return ( (parseFloat(value) >= parseFloat(minval)) && (parseFloat(value) <= parseFloat(maxval)));
}

function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        return (year + parseInt(val.century)) - ((year < val.cutoffyear) ? 0 : 100);
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null) 
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d+)?(\\" + val.decimalchar + "(\\d+))?\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        cleanInput = m[1] + (m[2].length>0 ? m[2] : "0") + "." + m[4];
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    } 
    else if (dataType == "Currency") {
        exp = new RegExp("^\\s*([-\\+])?(((\\d+)\\" + val.groupchar + ")*)(\\d+)"
                        + ((val.digits > 0) ? "(\\" + val.decimalchar + "(\\d{1," + val.digits + "}))?" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        var intermed = m[2] + m[5] ;
        cleanInput = m[1] + intermed.replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((val.digits > 0) ? "." + m[7] : 0);
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (m[2].length == 4 || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10))
        }
        else {
            if (val.dateorder == "ymd"){
                return null;		
            }						
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10))
        }
        month -= 1;
        var date = new Date(year, month, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}


function ValidationSummaryOnSubmit() {
    if (typeof(Page_ValidationSummaries) == "undefined") 
        return;
    var summary, sums, s, summ_attrib, hdr_txt, err_msg;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        summary.style.display = "none";
        if (!Page_IsValid) {
			//summ_attrib = summary.getAttribute("showsummary",false);
			summ_attrib = dom_getAttribute(summary, "showsummary");
            if (summ_attrib != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        final_block = "";
                        break;
                        
                    case "BulletList":
                    default: 
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        final_block = "</ul>";
                        break;
                        
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        final_block = "<br>";
                        break;
                }
                s = "";
                //hdr_txt = summary.getAttribute("headertext",false);
                hdr_txt = dom_getAttribute(summary, "headertext");
                if (typeof(hdr_txt) == "string") {
                    s += hdr_txt + headerSep;
                }
  //              var cnt=0;
  //              s += first;
  //              for (i=0; i<Page_Validators.length; i++) {
  //                  //err_msg = Page_Validators[i].getAttribute("errormessage",false);
  //                  err_msg = dom_getAttribute(Page_Validators[i], "errormessage");
  //                  if (!Page_Validators[i].isvalid && typeof(err_msg) == "string") {
  //						if (err_msg != "") {
  //							cnt++;
  //							s += pre + err_msg + post;
  //						}
  //                  }
  //              }   
  //              s += final_block;
            
		// IE4 work around
                if (_val_IE4)
                {
					if (document.readyState == "complete")
					{
						summary.innerHTML  = s;
						window.scrollTo(0,0);
						summary.style.visibility = "visible";
					}
				} else
				{
					summary.innerHTML = s; 
					window.scrollTo(0,0);
					summary.style.visibility = "visible";
				}
            }
            //summ_attrib = summary.getAttribute("showmessagebox",false);
            summ_attrib = dom_getAttribute(summary, "showmessagebox");
            
            if (summ_attrib == "True") {
                s = "";
                //hdr_txt = summary.getAttribute("headertext",false);
                hdr_txt = dom_getAttribute(summary, "headertext");
                if (typeof(hdr_txt) == "string") {
                    //s += hdr_txt + "<BR>";
                    s += hdr_txt + "\n";
                }
                for (i=0; i<Page_Validators.length; i++) {
					//err_msg = Page_Validators[i].getAttribute("errormessage",false);
					err_msg = dom_getAttribute(Page_Validators[i], "errormessage");
                    if (!Page_Validators[i].isvalid && typeof(err_msg) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                //s += err_msg + "<BR>";
                                s += err_msg + "\n";
                                break;
                                
                            case "BulletList":
                            default: 
                                //s += "  - " + err_msg + "<BR>";
                                s += "  - " + err_msg + "\n";
                                break;
                                
                            case "SingleParagraph":
                                s += err_msg + " ";
                                break;
                        }
                    }
                }
                //span = document.createElement("SPAN");
                //span.innerHTML = s;
                //s = span.getAttribute("innerText",false);
                //alert(s);
            }
        }
    }
}

////////////////////////--- Funtions to work in IE4 and DOM ---/////////////////////////////////

function dom_getAttribute(control,attribute)
{
//alert(control + ":" + attribute);
	var attrib;
	if (control)
	{
		if (_val_DOM)
			attrib = control.getAttribute(attribute, false);
		else
			attrib = eval(_val_allString + control.id + "." + attribute + _val_endAllString);
	}
	return attrib;
}

function dom_getElementByID(id)
{
	var element = eval(_val_allString + id + _val_endAllString);
	return element;
}

/* End of DOMValidation.js */
// GridRenderer.js class, for drawing out grids of product and marketing tiles

function GridRenderer()
{
	this.pInstance = null;
}

/* End of GridRenderer.js */
// ----------------------------------------------
// File:		HistoryManager.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of what a person has been doing on the page
// Example:
// HistoryManager.getInstance().setState({productId:10001221, thumbnailIndex:5});
// ----------------------------------------------


// ----------------------------------------------
// Function:	HistoryManager
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function HistoryManager()
{
	this.pInstance = null;
	this.pCurrentIndex = -1;
	this.pHistoryArray = new Array();
	this.pInternalTrigger = true;
	this.pSafariHistoryLength = 0;
	this.pEnabled = true;
	this.lastHistoryLength = 0; // Needed for Safari use
	this.baseHistoryLength = 0;
	this.lastHash;
	this.pIntervalId = 0;
}

// ----------------------------------------------
// Function:	HistoryManager.getInstance()
// Author:		Nathan Derksen
// Description:	Singleton access method
// Inputs:		<none>
// Returns:		<StateModel> Handle to a single HistoryManager instance
// ----------------------------------------------
HistoryManager.getInstance = function()
{
	if (!this.pInstance)
	{
		this.pInstance = new HistoryManager();
	}
	return this.pInstance;
};

// ----------------------------------------------
// Function:	HistoryManager.initHistory()
// Author:		Nathan Derksen
// Description:	Set up the history manager, using a particular state snapshot as a starting point
// Inputs:		<Object> baseState - A StateSnapshotVO instance holding the data to use for the base state snapshot
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.initHistory = function(initBaseState)
{
	var baseState;
	if (initBaseState)
	{
		baseState = initBaseState;
	}
	else
	{
		if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsStateSnapshotVO != "undefined"))
		{
			baseState = new LocationsStateSnapshotVO();
		}
		else
		{
			baseState = new StateSnapshotVO();
		}
	}
	
	if (this.pHistoryArray.length == 0)
	{
		this.pHistoryArray = new Array(baseState);
	}
	this.pCurrentIndex = 0;	
	this.lastHistoryLength = history.length;
	this.baseHistoryLength = history.length;
	this.lastHash = baseState;
	
	clearInterval(this.pIntervalId);
	this.pIntervalId = setInterval("checkHash()", 500);
//	this.printDebug();
};

// ----------------------------------------------
// ----------------------------------------------
HistoryManager.prototype.overrideBaseState = function(initBaseState)
{
	if (initBaseState)
	{
		if (this.pHistoryArray != null && this.pHistoryArray.length > 0)
		{
			this.pHistoryArray[0] = initBaseState;
		}
		else
		{
			this.pHistoryArray = new Array(initBaseState);
		}
		this.lastHash = initBaseState;
	}
}

// ----------------------------------------------
// Function:	HistoryManager.addHistoryItem()
// Author:		Nathan Derksen
// Description:	Add a new item to the end of the history list
// Inputs:		<StateSnapshotVO> historyState: A StateSnapshotVO instance to use for this particular history step
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.addHistoryItem = function(historyState)
{
	if (historyState)
	{
		if (this.pEnabled == true)
		{
			currentHistoryItem = HistoryManager.getInstance().getCurrentHistoryItem();
		
			if (currentHistoryItem != historyState)
			{
				var scrollYPosition = 0;
				if (this.pCurrentIndex < this.pHistoryArray.length)
				{
					this.pHistoryArray.splice(this.pCurrentIndex+1, this.pHistoryArray.length-this.pCurrentIndex-1);
					this.pHistoryArray.push(historyState);
					this.pCurrentIndex++;
					this.lastHash = historyState;
					this.pInternalTrigger = true;
					this.lastHistoryLength++;


					this.setHash(historyState);
				}
			}
		}
		else
		{
			this.setHash(historyState);
		}
	}
//	this.printDebug();
};

// ----------------------------------------------
// Function:	HistoryManager.getHistoryItem()
// Author:		Nathan Derksen
// Description:	Get the state for a particular step in the history
// Inputs:		<Number> historyIndex: The index of the history state to retrieve
// Returns:		<StateSnapshotVO>: An object containing the properties of that state
// ----------------------------------------------
HistoryManager.prototype.getHistoryItem = function(historyIndex)
{
	if (historyIndex < this.pHistoryArray.length)
	{
		return this.pHistoryArray[historyIndex];
	}
	return null;
};

// ----------------------------------------------
// Function:	HistoryManager.getCurrentHistoryItem()
// Author:		Nathan Derksen
// Description:	Get the state for the current step in the history
// Inputs:		<None>
// Returns:		<StateSnapshotVO>: An object containing the properties of that state
// ----------------------------------------------
HistoryManager.prototype.getCurrentHistoryItem = function()
{
	if (this.pCurrentIndex >= 0 && this.pCurrentIndex < this.pHistoryArray.length)
	{
		return this.pHistoryArray[this.pCurrentIndex];
	}
	return null;
};

// ----------------------------------------------
// Function:	HistoryManager.setHistoryPosition()
// Author:		Nathan Derksen
// Description:	Go back to a particular step in the history
// Inputs:		<Number> historyPosition - The history index to set to
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.setHistoryPosition = function(historyPosition)
{
	this.pCurrentIndex = historyPosition;
	var historyItem = this.getHistoryItem(historyPosition);

	// Make sure that the onload event from the history iframe doesn't trigger a second
	// call. The history onload manager will call regardless of whether it is triggered
	// by pressing back/forward or by the history manager, so a flag is set when the trigger
	// to change the history page comes from inside this history class which is then cleared
	// when the onload method is called
	if (historyItem == null)
	{
		// Do nothing
	}
	else if (this.pInternalTrigger == true)
	{
		this.pInternalTrigger = false;
	}
	else
	{
//		generateEvent("onHistoryChanged", historyPosition, URLFactory.convertHashToState(historyItem));

		if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
		{
//			StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
		}
		else
		{
			tempState = URLFactory.convertHashToState(historyItem);
			StateModel.getInstance().setStateSnapshot(tempState);
			$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: historyItem});
		}
	}
//	this.printDebug();
};

// ----------------------------------------------
// Function:	HistoryManager.setHash()
// Author:		Nathan Derksen
// Description:	Set the hash shown in the URL based on the state snapshot
// Inputs:		<String> newHash - URL encoded list of name/value pairs to place in the URL
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.setHash = function(newHash)
{
	if (document.body.scrollTop)
	{
		scrollYPosition = document.body.scrollTop;
	}
	else if (window.pageYOffset)
	{
		scrollYPosition = document.body.pageYOffset;
	}

	window.location.hash = newHash.split("#").join("");

	if (document.body.scrollTop)
	{
		document.body.scrollTop = scrollYPosition;
	}
	else if (window.pageYOffset)
	{
		document.body.pageYOffset = scrollYPosition;
	}
	//	this.printDebug();
};

// ----------------------------------------------
// ----------------------------------------------
function setHashFollowup(newHash)
{
	window.location.hash = newHash;
}

// ----------------------------------------------
// Function:	HistoryManager.disableHistory()
// Author:		Nathan Derksen
// Description:	Disable the history manager's history tracking, but keep the deep links intact
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.disableHistory = function()
{
	this.pEnabled = false;
	clearInterval(this.pIntervalId);
};


// ----------------------------------------------
// Function:	checkHash()
// Author:		Nathan Derksen
// Description:	Utility function called by setInterval used to track whether back button pressed through the current URL
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function checkHash()
{
	var hist = HistoryManager.getInstance();
	var lastHistoryLength = hist.lastHistoryLength;
	var lastHash = hist.lastHash;
	var currentHistoryLength = history.length;
	var currentHash = window.location.hash.split("#").join("");
	var currentHashEscaped = escape(window.location.hash.split("#").join(""));
	var historyIndex = 0;
	var tempState;
	
	if (currentHash == "" && hist.pHistoryArray.length > 0)
	{
		currentHash = hist.pHistoryArray[0];
	}
	
	if (hist.pHistoryArray.length == 0)
	{
		// Do nothing
	}
	else if (hist.pInternalTrigger == true)
	{
		hist.pInternalTrigger = false;
	}
	else
	{
		
		if (navigator.userAgent.indexOf("Safari") != -1 && !isSafari3Plus())
		{
			// Safari version 1 and 2 cannot detect changes to the hash. Get around these bugs
			// by taking advantage of an error in history.length. It will decrease
			// by one when hitting back, and increase by one when hitting next
			if (lastHistoryLength != history.length)
			{
				historyIndex = history.length - hist.baseHistoryLength;
				hist.lastHistoryLength = currentHistoryLength;
				hist.pCurrentIndex = historyIndex;
//				generateEvent("onHistoryChanged", historyIndex, URLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
				{
//					StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				}
				else {
					tempState = URLFactory.convertHashToState(hist.getHistoryItem(historyIndex));
					StateModel.getInstance().setStateSnapshot(tempState);
					$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: hist.getHistoryItem(historyIndex) });
				}
			}
		}
		else
		{
			if (lastHash != currentHash && lastHash != currentHashEscaped)
			{
				var historyArray = hist.pHistoryArray;
				for (var i=0; i < historyArray.length; i++)
				{
					if (currentHash == historyArray[i])
					{
						historyIndex = i;
						hist.pCurrentIndex = i;
						break;
					}
				}
				hist.lastHash = currentHash;
//				generateEvent("onHistoryChanged", historyIndex, URLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
				{
//					StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				}
				else
				{
					tempState = URLFactory.convertHashToState(hist.getHistoryItem(historyIndex));
					StateModel.getInstance().setStateSnapshot(tempState);
					$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: hist.getHistoryItem(historyIndex) });
				}
			}
		}

	}
//	HistoryManager.getInstance().printDebug();
}

// ----------------------------------------------
// Function:	setHistory()
// Author:		Nathan Derksen
// Description:	Utility function called by iframe (for IE implementation) to set a new history position
// Inputs:		<Number> id - The index of the history item to set
// Returns:		<Nothing>
// ----------------------------------------------
function setHistory(id)
{
	HistoryManager.getInstance().setHistoryPosition(Number(id));
}

// ----------------------------------------------
// ----------------------------------------------
/* HistoryManager.prototype.printDebug = function()
{
	var htmlText = "";
	
	for (var i=0; i < this.pHistoryArray.length; i++)
	{
		if (i == this.pCurrentIndex)
		{
			htmlText += "<b>" + i + ") " + this.pHistoryArray[i] + "</b><br />";
		}
		else
		{
			htmlText += i + ") " + this.pHistoryArray[i] + "<br />";
		}
	}
	if (document.getElementById("debug") == null)
	{
		$("body").append('<div id="debug"></div>');
	}
	$("#debug").css({ zIndex:100, backgroundColor:"#fff000", position:"fixed", top:"0px", padding:"5px" });
	$("#debug").html(htmlText);
} */

function HistoryManager_setFlashHistory(historyState)
{
	var model = StateModel.getInstance();
	var currentHistoryItem;

	if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
	{
//		currentHistoryItem = LocationsURLFactory.convertHashToState(HistoryManager.getInstance().getCurrentHistoryItem());
	}
	else
	{
		currentHistoryItem = URLFactory.convertHashToState(HistoryManager.getInstance().getCurrentHistoryItem());
	}

	if (currentHistoryItem.flash != historyState)
	{
		model.setBrowseStatesNoSideEffects({flash:historyState});
		HistoryManager.getInstance().addHistoryItem(URLFactory.convertStateToHash(model.getStateSnapshot()));
	}
}

/* End of HistoryManager.js */
// InlineShoppingBagManager.js, for managing global inline shopping bag and saved items components

var hoverOnEvent;
var hoverOffEvent;

function InlineShoppingBagManager()
{
	this.pInstance = null;
	this.addToBagTimeout;
}

InlineShoppingBagManager.getInstance = function () {
    //var addToBagTimeout;
    if (!this.pInstance) {
        this.pInstance = new InlineShoppingBagManager();
    }
    return this.pInstance;
};

InlineShoppingBagManager.prototype.init = function () {
    var parent = this;
    //inline shopping bag/saved item code

    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
    	hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
         if ($("body").hasClass("ie-10")) {
             hoverOnEvent = "MSPointerOver";
         } else {
             hoverOnEvent = "pointerover";
         }
    } else {
    	hoverOnEvent = "mouseenter";
    }

    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
    	hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
         if ($("body").hasClass("ie-10")) {
             hoverOffEvent = "MSPointerOut";
         } else {
             hoverOffEvent = "pointerout";
         }
    } else {
    	hoverOffEvent = "mouseleave";
    }

    $("body").on("click", "#saved .open-bag, #saved .open-saved, #saved .open-rings", function (e) {
        var target = $(this);
        openInlineSelections(target);

        return false;
    });

    $("body").on("click", ".bag .open-bag, .bag .open-saved", function (e) {
        if (!$(this).hasClass("selected")) {
            e.preventDefault();
        }
    });

    $("body").on(hoverOnEvent, ".bag .open-bag, .bag .open-saved", function (e) {
        if (!$("body#shoppingbag").length && !$("body#savedItemsPage").length) {
            var target = $(this);

            if (hoverOnEvent != "click") {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(function () {
                    openInlineSelections(target);
                    clearTimeout(timer);
                    timer = null;
                }, 300);
            } else {
                openInlineSelections(target);
            }
        } else {
			if ($(this).hasClass("open-bag")) {
			    $(".open-bag").addClass("selected");
			} else if ($(this).hasClass("open-saved")) {
			    $(".open-saved").addClass("selected");
			}	        	
        }
    });
    
    $("body").on("mouseleave", ".bag .open-bag, .bag .open-saved", function (e) {
        if ($("body#shoppingbag").length || $("body#savedItemsPage").length  || (typeof showInlineBags != "undefined" && showInlineBags === false)) {    
        	$(this).removeClass("selected");
        }
    });
    
    $("body").on("click", "#saved .close", function (e) {
        $("#saved").fadeOut(300);
        $(".open-bag, .open-saved, .open-rings").removeClass("selected");
        $("#inlineLoading").show();
        $("#inlineContent").hide();

        return false;
    });

    $("body").on("mouseleave", "#saved", function (e) {
        $("#saved").fadeOut(300);
        $(".open-bag, .open-saved, .open-rings").removeClass("selected");
        $("#inlineLoading").show();
        $("#inlineContent").hide();

        return false;
    });

    $("body").on("mouseenter", "#saved", function (e) {
        clearTimeout(parent.addToBagTimeout);
        parent.addToBagTimeout = null;

        return false;
    });

    $("body").on("click", "#saved a.remove", function (e) {
        var itemcontainer = $(this).parents(".quarter");
        var touchpager = $(this).parents(".touchpager");
        var container = touchpager.find(".container");
        //var bagCount = parseInt($(".bag-count").text());

        //$(".bag-count").text(bagCount - 1);
        $(this).parent().html(LABEL_REMOVED_FROM_SAVED_ITEMS).addClass("item-removed");

        //code to remove from bag

        itemcontainer.fadeTo(2000, 0, function () {
            var pages = $("#saved-content .touchpager .grid-container").length;
            var lastPageSize = $("#saved-content .touchpager .grid-container:last .item").length;

            itemcontainer.html("&nbsp;").removeClass("item");
            if (pages == 1) {
                $("#saved-content .touchpager .grid-container:last").prepend(itemcontainer);
                savedHeaderWidth(pages, lastPageSize - 1);

                if (lastPageSize == 1) {
                    if ($(".open-bag").hasClass("selected")) {
                        fillInlineBagNoItems(inlineBagNoItems);
                    } else if ($(".open-saved").hasClass("selected")) {
                        getInlineSavedItems(true);
                    }
                    itemcontainer.fadeTo(1000, 1);
                    $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
                }
            } else {
                $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
            }
            $("#saved-content .touchpager .grid-container.current").nextAll().each(function () {
                $(this).prev().append($(this).find(".quarter:first"));
                itemcontainer.fadeTo(0, 1);
            });
            if (lastPageSize == 1) {
                if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                    touchpager.find(".page-left-box").click();
                    touchpager.find(".page-right-box span").hide();

                    setTimeout(function () {
                        var pages = container.find(".grid-container").length;
                        if (pages > 1) {
                            $("#saved-content .touchpager .grid-container:last").remove();
                        }

                        pages = container.find(".grid-container").length;
                        var containerWidth = pages * 100;
                        container.css("width", containerWidth + "%");
                        var pageWidth = 100 / pages;
                        container.find(".grid-container").css("width", pageWidth + "%");
                    }, 600);

                } else {
                    if (pages > 1) {
                        $("#saved-content .touchpager .grid-container:last").remove();
                    }

                    var pages = container.find(".grid-container").length;
                    var containerWidth = pages * 100;
                    container.css("width", containerWidth + "%");
                    var pageWidth = 100 / pages;
                    container.find(".grid-container").css("width", pageWidth + "%");

                    if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                        touchpager.find(".page-right-box span").hide();
                    }
                }
            }
        });

        return false;
    });

    $("body").on("click", "#saved a.add", function (e) {
        var itemcontainer = $(this).parents(".quarter");
        var touchpager = $(this).parents(".touchpager");
        var container = touchpager.find(".container");
        var bagCount = parseInt($(".bag-count").text());

        $(".bag-count").text(bagCount - 1);
        $(this).parent().html(inlineNewAddMsg);

        //code to add to bag

        itemcontainer.fadeTo(2000, 0, function () {
            var pages = $("#saved-content .touchpager .grid-container").length;
            var lastPageSize = $("#saved-content .touchpager .grid-container:last .item").length;

            itemcontainer.html("&nbsp;").removeClass("item");
            if (pages == 1) {
                $("#saved-content .touchpager .grid-container:last").prepend(itemcontainer);
                savedHeaderWidth(pages, lastPageSize - 1);

                if (lastPageSize == 1) {
                    if ($(".open-bag").hasClass("selected")) {
                        fillInlineBagNoItems(inlineBagNoItems);
                    } else if ($(".open-saved").hasClass("selected")) {
                        getInlineSavedItems(true);
                    }
                    itemcontainer.fadeTo(1000, 1);
                    $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
                }
            } else {
                $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
            }
            $("#saved-content .touchpager .grid-container.current").nextAll().each(function () {
                $(this).prev().append($(this).find(".quarter:first"));
                itemcontainer.fadeTo(0, 1);
            });
            if (lastPageSize == 1) {
                if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                    touchpager.find(".page-left-box").click();
                    touchpager.find(".page-right-box span").hide();

                    setTimeout(function () {
                        var pages = container.find(".grid-container").length;
                        if (pages > 1) {
                            $("#saved-content .touchpager .grid-container:last").remove();
                        }

                        pages = container.find(".grid-container").length;
                        var containerWidth = pages * 100;
                        container.css("width", containerWidth + "%");
                        var pageWidth = 100 / pages;
                        container.find(".grid-container").css("width", pageWidth + "%");
                    }, 600);

                } else {
                    if (pages > 1) {
                        $("#saved-content .touchpager .grid-container:last").remove();
                    }

                    var pages = container.find(".grid-container").length;
                    var containerWidth = pages * 100;
                    container.css("width", containerWidth + "%");
                    var pageWidth = 100 / pages;
                    container.find(".grid-container").css("width", pageWidth + "%");

                    if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                        touchpager.find(".page-right-box span").hide();
                    }
                }
            }
        });

        return false;
    });

    //end inline shopping bag/saved item code
};

function openInlineSelections(target) {
		if (typeof showInlineBags != "undefined" && showInlineBags === false) {
			if (target.hasClass("open-bag")) {
	        $(".open-bag").addClass("selected");
	    } else if (target.hasClass("open-saved")) {
	        $(".open-saved").addClass("selected");
	    }	
			return;
		}

    $("#storesearch").fadeOut(200);
    $("#myAccountOverlay").fadeOut(200);
    $("a.my-account, a.searchstores, .bag a").removeClass("selected");
    $("#flydown").fadeOut(300);
    $("#nav .flydowns a").removeClass("selected");
    $("#filters > div").slideUp(200);
    $("#filters a").removeClass("selected");
    $("#grid-popup").hide();

    $(".open-bag, .open-saved, .open-rings, .searchstores, .search").removeClass("selected");

		$("#saved-content").removeClass("sb saved rings")
    if (target.hasClass("open-bag")) {
        $("#saved-content").addClass("sb");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-bag").addClass("selected");

        //var pages = $("#saved-content .touchpager .grid-container").length;
        //var lastPageSize = 4 - $("#saved-content .touchpager .grid-container:last .blank").length;

        //savedHeaderWidth(pages, lastPageSize);
        //});
    } else if (target.hasClass("open-saved")) {
        $("#saved-content").addClass("saved");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-saved").addClass("selected");
        //});
    } else if (target.hasClass("open-rings")) {
        $("#saved-content").addClass("rings");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-rings").addClass("selected");
        //});
    }
    initInlineBag(target.hasClass("globalnav"));

    $("#saved:hidden").fadeIn(300);

    $(".empty").each(function () {
        $(this).height($(this).width());
    });

    centerGridText();
}
function initInlineBag(fromGlobalNav) {
		$("#inlineLoading").show();
		$("#inlineContent").hide();
		$("#inlineMainContainer").css("left","0%");
		if ($("#saved-content").hasClass("sb")) {
			getInlineShoppingBag(fromGlobalNav);
		} else if ($("#saved-content").hasClass("saved")) {
			getInlineSavedItems(fromGlobalNav);
		} else if ($("#saved-content").hasClass("rings")) {
			getInlineSavedRings(fromGlobalNav);
		}	
}
function populateInlineShoppingBag(data, headerData) {
	if (headerData == null || headerData.TotalBagCount == 0) {
		fillInlineBagNoItems(inlineBagNoItems);
		return;
	}
	$(".numShoppingBagItemsWrapper").show();
	$("#numShoppingBagItems").text(headerData.TotalBagCount);
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.Items, "sb");
}
function populateInlineSavedItems(data, headerData, fromGlobalNav) {
	$("#saved .open-saved").addClass("selected");
	if (headerData == null || (headerData.TotalCount == 0 && headerData.TotalRingCount == 0)) {
		$(".open-rings-wrapper").hide();
		fillInlineBagNoItems(inlineSavedNoItems);
		return;
	}
	if (headerData.TotalCount == 0 && headerData.TotalRingCount > 0) {
		$(".numSavedItemsWrapper").hide();
		$(".open-rings-wrapper").show();
		if (fromGlobalNav != null && fromGlobalNav == true) {
			$("#saved .open-saved").removeClass("selected");
			$("#saved .open-rings").addClass("selected");
			$("#saved-content").removeClass("saved").addClass("rings")		
			getInlineSavedRings();
		} else {
			$("#saved .open-saved").addClass("selected");
			fillInlineBagNoItems(inlineSavedNoItems);
		}
		return;
	}
	$(".numSavedItemsWrapper").show();
	$("#numSavedItems").text(headerData.TotalCount);
	if (headerData.TotalRingCount == 0) {
		$(".open-rings-wrapper").hide();
	} else {
		$(".open-rings-wrapper").show();
		$("#numSavedRings").text(headerData.TotalRingCount);
	}
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.SavedItems, "saved", true);
}
function populateInlineSavedRings(data, headerData) {
	$(".open-rings-wrapper").show();
	$("#saved .open-saved").removeClass("selected");
	$("#saved .open-rings").addClass("selected");
	if (headerData == null || (headerData.TotalCount == 0 && headerData.TotalRingCount == 0)) {		
		fillInlineBagNoItems(inlineSavedNoItems);
		return;
	}
	if (headerData.TotalCount == 0) {
		$(".numSavedItemsWrapper").hide();
	} else {
		$(".numSavedItemsWrapper").show();
		$("#numSavedItems").text(headerData.TotalCount);
	}
	$("#numSavedRings").text(headerData.TotalRingCount);
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.SavedItems, "rings", true);
}

function fillInlineBagNoItems(content) {
	$(".numSavedItemsWrapper").hide();
	$(".numShoppingBagItemsWrapper").hide();
	$("#inlineMainContainer").html(content);
	savedHeaderWidth(1, 1);					
	$("#saved-content .btn").css("visibility","hidden");
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	initTouchpager($("#saved-content .touchpager"));
	resizeTouchPager($("#saved-content .touchpager"));
	$(".touchpager img:first").load(function () {
	    resizeTouchPager();
	});
}

function fillInlineBag(items, bagType, hasAddToBag) {
  //alert($(items).length);
  var currentGridContainer = $('<div class="grid-container"></div>');
  $("#inlineMainContainer").html(currentGridContainer);
  var count = 0;
	$(items).each(function(){
		if (count > 0 && count % 4 == 0) {
			currentGridContainer = $('<div class="grid-container"></div>');
			$("#inlineMainContainer").append(currentGridContainer);
		}
		var item = $('<div class="quarter item"></div>');
		var itemTemp = inlineItemHTML;
		if (hasAddToBag && this.IsPurchasable == true) {
			itemTemp = itemTemp.replace("$addToBag$", inlineAddToBag);
		} else {
			itemTemp = itemTemp.replace("$addToBag$", "");
		}
		if (this.IsPurchasable == false && this.ShowEmailWhenAvailable == true) {
			itemTemp = itemTemp.replace("$emailMe$", inlineEmailMe);
			itemTemp = itemTemp.replace("$outOfStock$", inlineOutOfStock);
		} else {
			itemTemp = itemTemp.replace("$emailMe$", "");
			itemTemp = itemTemp.replace("$outOfStock$", "");
		}		
		if (typeof this.ListType != "undefined" && this.ListType == "Statement") {
			itemTemp = itemTemp.replace("$removeItem$", "");
		} else {
			itemTemp = itemTemp.replace("$removeItem$", inlineRemoveItem);
		}
		itemTemp = itemTemp.split("$imgSrc$").join(this.MediaPath);
		
		var descArray = this.Desc.split("##");
		var priceArray = this.RetailPrice.split("##");
		var titlepriceTemp = "";
		for (var i=0; i<descArray.length;i++) {
			titlepriceTemp += inlineItemTitlePrice;
			titlepriceTemp = titlepriceTemp.replace("$title$", descArray[i]);
			if ((typeof priceArray[i] == "undefined" || priceArray[i] == "") || (typeof this.ListType != "undefined" && this.ListType == "Statement" && typeof this.ShowPrice != "undefined" && this.ShowPrice.toLowerCase() == "false" )) {
				titlepriceTemp = titlepriceTemp.replace("$price$", "");
			} else {
				titlepriceTemp = titlepriceTemp.replace("$price$", priceArray[i]);
			}
		}
		itemTemp = itemTemp.replace("$titleprice$", titlepriceTemp);		
		
		if (bagType == "sb") {
			itemTemp = itemTemp.replace("$qty$", inlineQtyHTML.replace("$qtyAmt$", this.Qty));
		} else {
			itemTemp = itemTemp.replace("$qty$", "");
		}
		if (bagType == "rings") {
			itemTemp = itemTemp.replace("$itemType$","engagement").replace("$groupSku$","&groupSKU="+this.GroupSku).replace("$mcat$","&mcat=148203").replace("$cid$","").replace("$searchParams$","");
		} else if (this.isGroup == 1) {
			itemTemp = itemTemp.replace("$itemType$","shopping").replace("$groupSku$","&selectedsku="+this.SelectedSku).replace("$mcat$","&mcat="+this.MasterCategoryID).replace("$cid$","&cid="+this.CategoryID).replace("$searchParams$","&search_params="+this.SearchParams);
		} else {
			itemTemp = itemTemp.replace("$itemType$","shopping").replace("$groupSku$","").replace("$mcat$","&mcat="+this.MasterCategoryID).replace("$cid$","&cid="+this.CategoryID).replace("$searchParams$","&search_params="+this.SearchParams);
		}
		//if (this.isGroup == 1) {
		//	itemTemp = itemTemp.replace(/\$sku\$/g, this.groupSku);
		//} else {
		itemTemp = itemTemp.replace(/\$sku\$/g, this.Sku);
		//}
		itemTemp = itemTemp.replace(/\$bagtype\$/g, bagType);
		if (typeof this.ItemID != "undefined") {
			itemTemp = itemTemp.replace(/\$itemID\$/g, this.ItemID);
		} else {
			itemTemp = itemTemp.replace(/\$itemID\$/g, this.ID);
		}
		if (this.GroupSku != null) {
			itemTemp = itemTemp.replace(/\$groupSku\$/g, this.GroupSku);
		} else {
			itemTemp = itemTemp.replace(/\$groupSku\$/g, "");
		}
		if (this.Desc != null ) {
			itemTemp = itemTemp.replace(/\$itemDesc\$/g, encodeURI(this.Desc));
		} else {
			itemTemp = itemTemp.replace(/\$itemDesc\$/g, "");
		}
		if (this.SelectedSku != null ) {
			itemTemp = itemTemp.replace(/\$selectedSku\$/g, this.SelectedSku);
		} else {
			itemTemp = itemTemp.replace(/\$selectedSku\$/g, "");
		}			
		if (typeof this.SizeName != "undefined" && this.SizeName != null && this.SizeName != "") {
			itemTemp = itemTemp.replace("$ring$", inlineItemRingHTML);
			itemTemp = itemTemp.replace("$ringsize$", this.SizeName);
			itemTemp = itemTemp.replace("$sizelabel$", this.SizeLabel);
			/*
			if (this.SizeLabel == "Ring") {
			  itemTemp = itemTemp.replace("$sizelabel$", ringSizeLabel);
			} else if (this.SizeLabel == "Chain") {
			  itemTemp = itemTemp.replace("$sizelabel$", chainLengthLabel);
			} else {
			  itemTemp = itemTemp.replace("$sizelabel$", genericSizeLabel)
			}
			*/
		} else {
			itemTemp = itemTemp.replace("$ring$", "");
		}
		if (typeof this.isServiceable != "undefined" && this.isServiceable == 1) {
			if (typeof this.itemEngravingType != "undefined" && this.itemEngravingType !=null && this.itemEngravingType !="") {
				itemTemp = itemTemp.replace("$engraving$", inlineItemEngravingHTML);
				itemTemp = itemTemp.replace("$engravingType$", this.itemEngravingType);
				itemTemp = itemTemp.replace("$engravingInitials$", this.itemEngravingInitials);
				itemTemp = itemTemp.replace("$engravingStyle$", this.itemEngravingStyle);
				itemTemp = itemTemp.replace("$engravingPrice$", this.itemEngravingSubTotal);
			} else {
				itemTemp = itemTemp.replace("$engraving$", inlineItemNoEngravingHTML);
			}
		} else {
			itemTemp = itemTemp.replace("$engraving$", "");
		}				
		currentGridContainer.append(item.append(itemTemp));
		if (bagType == "saved" && this.IsServiceable) {
			$(item).find("a.add").attr("data-isEngravable", "true");
		}		
		count++;
	});
	if (count < 4) {
		for (var i=0; i<(4-count);i++){
			currentGridContainer.prepend('<div class="quarter">&nbsp;</div>');
		}
		savedHeaderWidth(1, count);				
	} else {
		savedHeaderWidth(count/4, 4-(count%4));
	}
	if (newlyAddedItemsArr.length > 0) {
		$("#inlineMainContainer").find(".quarter.item:lt("+newlyAddedItemsArr.length+")").addClass("newItem");
	}
	newlyAddedItemsArr = [];
	$("#saved-content .btn").css("visibility", "visible");
	initTouchpager($("#saved-content .touchpager"));
	currentGridContainer.find("a.item-page-link").each(function(){
		$(this).css("height",$(this).width()+"px");
	});
    resizeTouchPager($("#saved-content .touchpager"));
    $(".touchpager img:first").load(function () {
        resizeTouchPager();
    });
    $("#inlineMainContainer .newItem").each(function () {
        $(this).find(".inlineDesc").hide();
        if ($("#saved-content").hasClass("sb")) {
            $(this).append(inlineNewAddMsg);
            if ($(this).find(".inline-engraving").length > 0) {
                $(this).find(".item-removed").append("<br/><br/>" + $(this).find(".inline-engraving .engraving-type").text() + "<br/>" + $(this).find(".inline-engraving .engraving-style").text());
            }
        } else {
            $(this).append(inlineNewSavedMsg);
        }
        if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
            setTimeout(function () {
                $(this).find(".item-removed").hide();
                $(this).find(".inlineDesc").show();
                resizeTouchPager();
            }, 3000);
        } else {
            $(this).hide().fadeIn(3000, function () {
                $(this).find(".item-removed").hide();
                $(this).find(".inlineDesc").show();
                resizeTouchPager();
            });
        }
        if (InlineShoppingBagManager.getInstance().addToBagTimeout) {
            clearTimeout(InlineShoppingBagManager.getInstance().addToBagTimeout);
            InlineShoppingBagManager.getInstance().addToBagTimeout = null;
        }
        InlineShoppingBagManager.getInstance().addToBagTimeout = setTimeout(function () {
            $("#saved").fadeOut(300, function () {
                $("#inlineLoading").show();
                $("#inlineContent").hide();
            });
            $(".open-bag, .open-saved").removeClass("selected");
        }, 5000);
    });
}
function decreaseInlineQty(count) {
	if ($("#saved-content").hasClass("sb")) {
		$("#numShoppingBagItems").text(count);
	} else if ($("#saved-content").hasClass("saved")) {
		$("#numSavedItems").text(count);
	} else if ($("#saved-content").hasClass("rings")) {
		$("#numSavedRings").text(count);
	}		
}	
function moveSavedItemToShoppingBag(elem) {
	if ($(elem).attr("data-isEngravable") == "true") {
		OverlayManager.getInstance().open("engraving", {
			url: '/Shopping/Engraving.aspx?wlid=' + $(elem).attr("data-itemID"),
			size: 'wide'
		}); 
		$("#saved").trigger("mouseleave");
		return;	
	}
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/MoveSavedItemToShoppingBag",
		type: "POST",
		data: '{"listItemKey":"' + $(elem).attr("data-itemID") + '"}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			CookieManager.setCookieValue("shoppingbagcnt", data.d.Header.TotalBagCount);
			CookieManager.setCookieValue("saveditemscnt", data.d.Header.TotalCount+data.d.Header.TotalRingCount);
			InlineShoppingBagManager.getInstance().updateShoppingBagLabel();
			InlineShoppingBagManager.getInstance().updateSavedItemsLabel();	
			decreaseInlineQty(data.d.Header.TotalCount);
			//Tracking
			var argItem = ";" + decodeURI($(elem).attr("data-itemDesc")).replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("�?","(TM)").replace("®","(R)") + "-";
			if ($(elem).attr("data-groupSku") != "") {
				argItem += $(elem).attr("data-selectedSku") + ":" + $(elem).attr("data-groupSku");
			} else {
				argItem += $(elem).attr("data-sku");
			}
			TrackActionAddToShoppingBag("Inline Saved Items", "Add to ShoppingBag", argItem);
		},
		error: function (jqXHR, status, error)
		{

		}
	});				
}

function openEmailMeOverlay(elem) {
	var query = window.location.search.split("?").join("");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var sku = $(elem).attr("data-sku");
	var selectedSku = $(elem).attr("data-selectedSku");

    OverlayManager.getInstance().open("linkEmailWhenAvailable", {
        url: "/Customer/Request/EmailWhenItemAvailable.aspx?source=InLineSave&selectedsku="+selectedSku+"&sku="+sku+"&cid="+cid,
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });		
	
}
function removeInlineItem(elem) {
	var removeType;
	var removeKey;
	var isSavedRingsToken = "";
	if ($(elem).attr("data-bag-type") == "sb"){
		removeType = "RemoveShoppingBagItem";
		removeKey = "shoppingBagItemKey";
	} else if ($(elem).attr("data-bag-type") == "saved") {
		removeType = "RemoveSavedItem";
		removeKey = "listItemKey";
		isSavedRingsToken = ',"isSavedRings" : false';
	} else if ($(elem).attr("data-bag-type") == "rings") {
		removeType = "RemoveSavedItem";
		removeKey = "listItemKey";
		isSavedRingsToken = ',"isSavedRings" : true';
	}
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/" + removeType,
		type: "POST",
		data: '{"'+removeKey+'":"' + $(elem).attr("data-itemID") + '"'+isSavedRingsToken+'}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			if ($(elem).attr("data-bag-type") == "sb"){
				CookieManager.setCookieValue("shoppingbagcnt", data.d.Header.TotalBagCount);
				InlineShoppingBagManager.getInstance().updateShoppingBagLabel();
				decreaseInlineQty(data.d.Header.TotalBagCount);
                TrackInlineRemoveShoppingBagItem("Inline Shopping Bag", "Delete Item");
			} else {
				CookieManager.setCookieValue("saveditemscnt", data.d.Header.TotalCount+data.d.Header.TotalRingCount);
				InlineShoppingBagManager.getInstance().updateSavedItemsLabel();	
				if ($(elem).attr("data-bag-type") == "rings"){
				    decreaseInlineQty(data.d.Header.TotalRingCount);
				    TrackRemoveSavedEngagementItem("Inline Saved Items", "Delete Engagement Item");
				} else {
				    decreaseInlineQty(data.d.Header.TotalCount);
				    TrackInlineRemoveSavedItem("Inline Saved Items", "Delete Item");
				}
                
			}
		},
		error: function (jqXHR, status, error)
		{

		}
	});				
}

function getInlineShoppingBag(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineShoppingBag",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
            if (typeof(TrackInlineShoppingBagViewItems)!='undefined' && newlyAddedItemsArr.length == 0) {
				var argItems = "";
				var numItems = data.d.Header.TotalBagCount;
				if (numItems > 0) {
					$(data.d.ResponseObject.Items).each(function(index) {
						argItems += ";" + this.Desc.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("�?","(TM)").replace("®","(R)") + "-" + this.Sku + ";" + this.Qty;
						if (index != numItems - 1) {
							argItems += ",";
						}
					});
				}
				TrackInlineShoppingBagViewItems("Inline Shopping Bag", "View ShoppingBag", argItems);
            }
			populateInlineShoppingBag(data.d.ResponseObject, data.d.Header);
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}
function getInlineSavedItems(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineSavedItems",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			populateInlineSavedItems(data.d.ResponseObject, data.d.Header, fromGlobalNav);
            if (typeof(TrackInlineViewSavedItems)!='undefined') {
                TrackInlineViewSavedItems("Inline Saved Items", "View Saved Items");
            }
            InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}
function getInlineSavedRings(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineSavedRings",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
		    populateInlineSavedRings(data.d.ResponseObject, data.d.Header);
		    InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}

InlineShoppingBagManager.prototype.addToShoppingBag = function (primarySku, skuQtyArray, description, price, selectedSku, source) {

	var parent = this;
	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	if (typeof source != "undefined" && source == "digitalCatalogList") {
		var productData = StateModel.getInstance().custom.tooltipCatalogDataLookup[primarySku];
		if (productData.IsGroup.toLowerCase() == "true") {
			var groupData = StateModel.getInstance().custom.tooltipCatalogDataLookup[primarySku];
		} else {
			var groupData = null;
		}
	} else {
		var productData = StateModel.getInstance().getProduct(primarySku);
		var tooltipGroupDataLookup = StateModel.getInstance().custom.tooltipGroupDataLookup;
		var groupData = (typeof (tooltipGroupDataLookup[primarySku]) != "undefined") ? tooltipGroupDataLookup[primarySku].d : null;
	}
	var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 0;
	var message = "This item has been added to your shopping bag.";
	var links = "";
	var skuQuantityArr = [];
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var origin = (typeof ORDER_ORIGINATION != undefined) ? ORDER_ORIGINATION : 1;

	if (groupData != null && groupData.GroupTypeID == "1") {
		// For group type 1 SKUs, the IsServiceable property in the property data isn't accurate, use the group data instead.
		if (groupData.SKUList != null && groupData.SKUList.length > 0 && typeof (selectedSku) != "undefined" && selectedSku != null) {
			for (var i = 0; i < groupData.SKUList.length; i++) {
				if (groupData.SKUList[i].Sku == selectedSku) {
					isEngravable = (groupData.SKUList[i].IsServiceable != null && groupData.SKUList[i].IsServiceable.toLowerCase() == "true") ? true : false;
					break;
				}
			}
		}
	}
	if (groupData != null && groupData.GroupTypeID == "2") {
		// For group type 2 SKUs, the IsServiceable property in the property data isn't accurate, use the group data instead.
		if (groupData.SKUList != null && groupData.SKUList.length > 0) {
			for (var i = 0; i < groupData.SKUList.length; i++) {
				if (groupData.SKUList[i].IsServiceable != null && groupData.SKUList[i].IsServiceable.toLowerCase() == "true") {
					isEngravable = true;
					break;
				}
			}
		}
		if (isEngravable == false && groupData.Group != null && groupData.Group.SKUList != null && groupData.Group.SKUList.length > 0 && typeof (selectedSku) != "undefined" && selectedSku != null) {
			for (var i = 0; i < groupData.Group.SKUList.length; i++) {
				if (groupData.Group.SKUList[i].Sku == selectedSku) {
					isEngravable = (groupData.Group.SKUList[i].IsServiceable != null && groupData.Group.SKUList[i].IsServiceable.toLowerCase() == "true") ? true : false;
					break;
				}
			}
		}		
	}

	//this.addToBagTimeout = true;
	clearTimeout(this.addToBagTimeout);
	this.addToBagTimeout = null;

	if (isEngravable == true && typeof (getLinkEngravingParams) != "undefined") {
	    $("#grid-popup").hide();
	    $("#grid-popup a.add").css('opacity', 1.0);
		OverlayManager.getInstance().open("engraving", {
			url: '/Shopping/Engraving.aspx?' + getLinkEngravingParams(primarySku, source),
			size: 'wide'
		});
	}
	else {
		itemProperties.name = description;
		itemProperties.price = price;
		itemProperties.qty = 0;

		$("#grid-popup .error").html("");

		$(".open-bag, .open-saved, .open-rings").removeClass("selected");

		if (skuQtyArray.length == 1) {
			url = '/Default.aspx/AddShoppingBagItem';
			itemProperties.qty = skuQtyArray[0].qty;
			mcat = (mcat == "") ? 0 : mcat;
			cid = (cid == "") ? 0 : cid;
			data = '{"sku":"' + skuQtyArray[0].sku + '", "quantity":"' + skuQtyArray[0].qty + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + skuQtyArray[0].sku + ':' + skuQtyArray[0].qty + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		}
		else if (skuQtyArray.length > 1) {
			url = '/Default.aspx/AddMultipleShoppingBagItems';
			for (var i = 0; i < skuQtyArray.length; i++) {
				itemProperties.qty = skuQtyArray[0].qty;
				skuQuantityArr.push(skuQtyArray[i].sku + ":" + skuQtyArray[i].qty);
			}
			mcat = (mcat == "") ? 0 : mcat;
			cid = (cid == "") ? 0 : cid;
			data = '{"strSku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + skuQuantityArr.join(";") + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		}

		if (skuQtyArray.length > 0) {
			$.ajax({
				url: url,
				type: 'POST',
				cache: false,
				data: data,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == "False") {
						// Error handling goes here
					    $("#saved").fadeOut(300);
						if (source != "digitalCatalogList") {
							$("#grid-popup a.add").text($("#grid-popup a.add").attr("data-old-label")).attr("href", $("#grid-popup a.add").attr("data-old-url"));
						} else {
							$(".digital-catalog-item[data-sku="+primarySku+"] a.add").text($(".digital-catalog-item[data-sku="+primarySku+"] a.add").attr("data-old-label")).attr("href", $(".digital-catalog-item[data-sku="+primarySku+"] a.add").attr("data-old-url"));
						}
						$(".open-bag, .open-saved, .open-rings").removeClass("selected");
						for (var i = 0; i < data.d.SKUStatus.length; i++) {
							var errorMsg = "Error";
							try {
								errorMsg = eval(data.d.SKUStatus[i].StatusMessage);								
							} catch (e) {
							}							
							if (data.d.SKUStatus[i].StatusMessage == "ERROR_NEW_QUANTITY") {
								errorMsg = errorMsg.split("{0}").join(data.d.SKUStatus[i].OrderLimit);
							}
							$("#error_" + data.d.SKUStatus[i].SKU).html(errorMsg);
						}
					}
					else {
						CookieManager.setCookieValue("shoppingbagcnt", data.d.BagCount);
						itemProperties.img = data.d.Image;
						parent.updateShoppingBagLabel();
						$("#saved-content").removeClass("saved rings").addClass("sb");
						//parent.updateInlineCustomerSelections(itemProperties, message, links, data.d.BagCount);
						parent.updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
						
						// Tracking
						var pageId = $("body").attr("id");
						var argItem = ";";
						if (productData.IsGroup != null && productData.IsGroup.toLowerCase() == "true" && groupData != null) {
							if (groupData.GroupTypeID == "2" && groupData.SKUList != null && groupData.SKUList.length > 0) {
								argItem += groupData.Name.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("�?","(TM)").replace("®","(R)")+"-"+selectedSku+":"+groupData.DefaultSku;
							} else {
								argItem += description.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("�?","(TM)").replace("®","(R)")+"-"+selectedSku;
							}
						} else {
							argItem += description.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("�?","(TM)").replace("®","(R)")+"-"+primarySku;
						}
						if (pageId == "categoryBrowsePage") {
							if (typeof source != "undefined" && source == "digitalCatalogList") {
								TrackActionAddToShoppingBag("Digital Catalogue", "Add to ShoppingBag",argItem);
							} else if (URLFactory.extractQueryStringValue(query, "search") == 1) {
								TrackActionAddToShoppingBag("Search Results Grid", "Add to ShoppingBag",argItem);
							} else {
								TrackActionAddToShoppingBag("Category Browse", "Add to ShoppingBag",argItem);
							}
						} else if (pageId == "itemPage") {
							TrackActionAddToShoppingBag("Item Page Grid", "Add to ShoppingBag",argItem);
						}
					}
					
					//IBM BT # 9861 Error message is shown while adding an item to the Shopping Bag.
					if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
						$("#grid-popup a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Trade/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
					}
					else {
						if (source != "digitalCatalogList") {
							$("#grid-popup a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
						} else {
							$(".digital-catalog-item[data-sku="+primarySku+"] a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
						}
					}
					$("#grid-popup a.add").css('opacity',1.0);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$("#grid-popup .error.master").html(LABEL_ITEM_NOT_ADDED);
					$("#saved").fadeOut(300);
					$("#grid-popup a.add").text($("#grid-popup a.add").attr("data-old-label")).attr("href", $("#grid-popup a.add").attr("data-old-url"));
					$(".open-bag, .open-saved, .open-rings").removeClass("selected");
					//IBM BT # 9861 Error message is shown while adding an item to the Shopping Bag.
					$("#grid-popup a.add").css('opacity',1.0);
					// window.location = "/Shopping/Item.aspx?fromGrid=1&sku=" + primarySku + "&mcat=&cid=&errorCode=ERROR_HTTP_500&search_params=" + document.location.hash.split("#").join("");
				}
			});
		}

		centerGridText();
	}

};

InlineShoppingBagManager.prototype.addToSavedItems = function (primarySku, skuQtyArray, description, price, selectedSku) {

	var parent = this;
	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var productData = StateModel.getInstance().getProduct(primarySku);
	var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 0;
	var skuArray = [];
	var qtyArray = [];
	var message = "This item has been added to your wish list.";
	var links = "";
	var skuQuantityArr = [];
	var priceMarket = "1";
	var trackingSku;
	//this.addToBagTimeout = true;
	clearTimeout(this.addToBagTimeout);
	this.addToBagTimeout = null;

	itemProperties.name = description;
	itemProperties.price = price;
	itemProperties.qty = 0;

	$(".open-bag, .open-saved, .open-rings").removeClass("selected");

	if (skuQtyArray.length == 1) {
		if (primarySku == skuQtyArray[0].sku) {
			trackingSku = primarySku;
		} else {
			trackingSku = primarySku + ":" + skuQtyArray[0].sku;
		}
		itemProperties.qty = skuQtyArray[0].qty;
		mcat = (mcat == "") ? 0 : mcat;
		cid = (cid == "") ? 0 : cid;
		//updated for IBM BT#9517
		if (locale.toLowerCase() == "en-us-pkb" && ($("#chkShowEInfo").length == 0 || $("#chkShowEInfo").attr("checked") == "checked")) {
			/*
			if (CookieManager.getCookieValue("pkbPriceCurrency") != null) {
				priceMarket = CookieManager.getCookieValue("pkbPriceCurrency");
			}
			*/
			url = '/Default.aspx/AddPKBSavedItem';
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + skuQtyArray[0].sku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"1", "priceMarketID":"' + PKB_PRICMARKETID + '"}'
		}
		else {
			url = '/Default.aspx/AddSavedItem';
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + skuQtyArray[0].sku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"1"}'
		}
	}
	else if (skuQtyArray.length > 1) {
		trackingSku = primarySku + ":" + selectedSku;
		url = '/Default.aspx/AddMultipleSavedItems';
		for (var i = 0; i < skuQtyArray.length; i++) {
			itemProperties.qty = skuQtyArray[0].qty;
			skuArray.push(skuQtyArray[i].sku);
			qtyArray.push(skuQtyArray[i].qty);
		}
		mcat = (mcat == "") ? 0 : mcat;
		cid = (cid == "") ? 0 : cid;
		data = '{"sku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuList":"' + skuArray.join(":") + '", "cid":' + cid + ', "mcid":' + mcat + ', "qtyList":"' + qtyArray.join(":") + '"}'
	}
	
	// Tracking
	var pageId = $("body").attr("id");
	if (pageId == "categoryBrowsePage") {
		if (typeof source != "undefined" && source == "digitalCatalogList") {
			TrackActionAddToSavedItems("Digital Catalogue", "Add to SavedItems", trackingSku);
		} else if (URLFactory.extractQueryStringValue(query, "search") == 1) {
			TrackActionAddToSavedItems("Search Results Grid", "Add to SavedItems", trackingSku);
		} else {
			TrackActionAddToSavedItems("Category Browse", "Add to SavedItems", trackingSku);
		}
	} else if (pageId == "itemPage") {
		TrackActionAddToSavedItems("Item Page Grid", "Add to SavedItems", trackingSku);
	}	

	if (skuQtyArray.length > 0) {
		$.ajax({
			url: url,
			type: 'POST',
			cache: false,
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
			    if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == false || data.d.SuccessFlag == "False") {
				    $("#saved").fadeOut(300);
					$("#grid-popup a.save").text($("#grid-popup a.save").attr("data-old-label")).attr("href", $("#grid-popup a.save").attr("data-old-url"));
					$(".open-bag, .open-saved, .open-rings").removeClass("selected");
					for (var i = 0; i < data.d.SKUStatus.length; i++) {
						$("#error_" + data.d.SKUStatus[i].SKU).html(data.d.SKUStatus[i].StatusMessage);
					}
				}
				else {
					CookieManager.setCookieValue("saveditemscnt", data.d.BagCount);
					itemProperties.img = data.d.Image;
					// TCO BT# 11244 - Updating label is done at method updateInlineCustomerSelections
					$("#saved-content").removeClass("sb rings").addClass("saved");
					//parent.updateInlineCustomerSelections(itemProperties, message, links, data.d.BagCount);
					//IBM BT #9818: Saved count is not incremented after adding to saved.
					parent.updateSavedItemsLabel();
					parent.updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#grid-popup .error.master").html(LABEL_ITEM_NOT_ADDED);
				$("#saved").fadeOut(300);
				$("#grid-popup a.save").text($("#grid-popup a.save").attr("data-old-label")).attr("href", $("#grid-popup a.save").attr("data-old-url"));
				$(".open-bag, .open-saved, .open-rings").removeClass("selected");
			}
		});
	}

	centerGridText();
};

InlineShoppingBagManager.prototype.updateInlineCustomerSelections = function(SKUStatus, imagePath) {
	if (typeof showInlineBags != "undefined" && showInlineBags === false) {
		$("#confirmImage").attr("src",templateStrings.baseScene7ImageURL+imagePath);
		if ($("#saved-content").hasClass("sb")) {
			$("#confirmMessage").html(LABEL_CONFIRM_ADD_TO_BAG);
		} else {
			$("#confirmMessage").html(LABEL_CONFIRM_ADD_TO_WISHLIST);
		}
		$("#addConfirmation").css("opacity",1).show();
		setTimeout(function(){
			$("#addConfirmation").fadeTo(200,0,function(){$(this).hide();});
		}, 2000);
		return;
	}
	newlyAddedItemsArr = [];
	for (var i = 0; i < SKUStatus.length; i++) {
		var bagId = SKUStatus[i].ItemID;
		newlyAddedItemsArr[i] = bagId;
	}
	initInlineBag();
	if ($("#saved-content").hasClass("sb")) {
		$(".open-bag").addClass("selected");
	} else {
		$(".open-saved").addClass("selected");
	}
	$("#saved:hidden").fadeIn(300);
}

InlineShoppingBagManager.prototype.updateSavedItemsLabel = function () {
	var count = CookieManager.getCookieValue("saveditemscnt");
	if (count != null && count != "0" && count != "") {
		$("#spanSavedItemCount").html("(" + count + ")");
	}
	else {
		$("#spanSavedItemCount").html("");
	}
};

InlineShoppingBagManager.prototype.updateShoppingBagLabel = function () {
	var count = CookieManager.getCookieValue("shoppingbagcnt");
	if (count != null && count != "0" && count != "") {
		$("#spanShoppingBagCount").html("(" + count + ")");
	}
	else {
		$("#spanShoppingBagCount").html("");
	}
};

/* End of ShoppingBagManager.js */
// digitalCatalog.js

var miniPDPInit = false;

function initDigCatalogList(tile) {
	getDigCatalogList($(tile).attr("id"));
	if ($("body").hasClass("ios") &&  $(tile).find(".video1").is(":visible")) {
		var video1 = $(tile).find(".video1")[0];
		var video2 = $(tile).find(".video2")[0];
		video1.play();
		video2.play();
		setTimeout(function(){
			video2.pause();
			$(video2).hide();
			video1.play();
		}, 1);
		$(video1).bind("ended", function(){
			$(video2).show();
			$(video1).hide();
			video2.play();
		});
	}	
}

function getDigCatalogList(tileId) {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	if ($("#digital-catalog-overlay").length > 0) {
		$(".digital-catalog-item .grouping .error").html("");
		$(".digital-catalog-item a.add").each(function() {
			if (typeof $(this).attr("data-old-label") != "undefined") {
				$(this).text($(this).attr("data-old-label"));
			}
			if (typeof $(this).attr("data-old-url") != "undefined") {
				$(this).attr("href", $(this).attr("data-old-url"));
			}			
		});
		$("#digital-catalog-overlay").fadeIn(200);
	} else {
		renderCatalogShopList(tileId);
		$.ajax({
			url: "/Shopping/CategoryBrowse.aspx/GetDigCatalogueData",
			type: "POST",
			data: '{"digCatalogueItems":'+digitalCatalogTileData+'}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.d != null) {
					for (var i=0; i < data.d.length; i++) {
					    if (data.d[i] != null && data.d[i].isAvailable.toLowerCase() != "false") {
							tooltipCatalogDataLookup[data.d[i].Sku] = data.d[i];
							$("#digital-catalog-overlay").find(".rollbar").append(renderCatalogShopListItem(data.d[i]));
						}
					}
					$("#digital-catalog-overlay .list .loading").remove();
					applyCustomDropdown();
					initRollbar();
				}
			},
			error: function (jqXHR, status, error) {
		
			}
		});
	}			
}
function renderCatalogShopList(tileId) {
	var tempHTML = $('<div id="digital-catalog-overlay" style="display: none"><div class="list"><hr class="small" /><h3 class="">'+$("#"+tileId+" .btnShop a").text()+'</h3><a href="#" class="close">&times;<br /></a><div class="rollbar"><img class="loading" src="/shared/images/loading.gif" /></div></div><div class="miniPDP"></div></div>');
	$("#"+tileId).append(tempHTML);
	tempHTML.fadeIn(200);
	setTimeout(function(){
		$("#digital-catalog-overlay .list .loading").show();
	}, 500);
}
	
function renderCatalogShopListItem(productData) {
	//var contentHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(desc).split("$setsLabel$").join("");
	//var isEngagementItem = ($("#engagementItemPage").length > 0) ? true : false;
	//var isItemDesignPage = $("#StatementItemPage").length == 1;
		
	var itemHTML = $(templateStrings.catalogListItemHTML);
		
	var sku = productData.Sku;

	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var showPrice = productData.ShowPrice;
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;	

	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var state = URLFactory.convertStateToServiceHash(StateModel.getInstance().pBrowseState);
	var isSearch = URLFactory.extractQueryStringValue(query, "search") == 1?1:0;
	var origin = URLFactory.extractQueryStringValue(query, "search") == 1 ? "search" : "browse";
	var searchKeyword = encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms);

	var contentHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(desc).split("$setsLabel$").join("");		
	var itemURL = '/Shopping/DigiCatMiniPDP.aspx?fromGrid=1&sku=' + sku + '&mcat=' + mcat + '&cid=' + cid + '&search_params=' + state + "&search=" + isSearch + "&origin=" + origin + "&searchkeyword=" + searchKeyword;
	var isInformational = false;
	
	switch (locale.toLowerCase()) {
		case "zh-cn":
		case "zh-hant":
		case "intl":
		case "es-mx":
		case "ko-kr":
		case "pt-br":
		case "ru-ru":
			isInformational = true;
	}	
	
	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = false;
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}

	if (productData.IsGroup != null && productData.IsGroup.toLowerCase() == "false") {
		if (typeof productData.ShowPrice != "undefined" && productData.ShowPrice != null && productData.ShowPrice.toLowerCase() == "false") {
			contentHTML = contentHTML.split("$price$").join("").split("$id$").join(sku);
		} else {
			contentHTML = contentHTML.split("$price$").join(price).split("$id$").join(sku);
		}
		$(itemHTML).find(".info").prepend(contentHTML);	
	} else {
		$(itemHTML).find(".info").prepend(renderCatalogGroupHTML(productData));
		$(itemHTML).find(".info option[value='" + selectedSku + "']").attr('selected', true);
		$(itemHTML).find("select").parent().attr("id","digitalCatalogSelect_"+sku);
	}
	$(itemHTML).find(".grouping:last").after(templateStrings.digCatalogViewDetails);
		
	$(itemHTML).find(".image img").attr("src",templateStrings.baseScene7ImageURL+productData.ImgURL+"?$EcomBrowseM$");		
		
	$(itemHTML).find(".info > a.add").text(LABEL_ADD_TO_SHOPPING_BAG).attr("href", "#").addClass("add-to-bag");
	$(itemHTML).find(".info a.save").html('<span class="plusicon"></span>' + LABEL_ADD_TO_SAVED_ITEMS).attr("href", "#").addClass("add-to-saved");
				 
	$(itemHTML).find(".details").attr("href", itemURL);
	$(itemHTML).find(".image a").attr("href", itemURL);
	$(itemHTML).find(".save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + sku + '", "digitalCatalogList")');

	if (isPurchasable == false) {
		$(itemHTML).find(".add").hide();
		if (productData.ShowEmailWhenAvailable == true) {
			$(itemHTML).find(".out-of-stock").show();
			$(itemHTML).find(".emailMe").show();
		} else {
			$(itemHTML).find(".out-of-stock").hide();
			$(itemHTML).find(".emailMe").hide();
		}
	}
	else {
		$(itemHTML).find(".add").show();
		$(itemHTML).find(".out-of-stock").hide();
		$(itemHTML).find(".emailMe").hide();
	}
	if (isInformational == true) {
		$(itemHTML).find(".findStores").show();
		$(itemHTML).find(".add").hide();
	} else {
		$(itemHTML).find(".findStores").hide();
	}

	if (isSaveForLaterVisible == false) {
		$("#grid-popup .add-to-saved").hide();
		$("#grid-popup .item-links .slash").hide();
	}
	else {
		$("#grid-popup .add-to-saved").show();
		$("#grid-popup .item-links .slash").show();
	}		
		
	itemHTML.attr("data-sku",sku);
	return itemHTML;
}
function renderCatalogGroupHTML(productData) {
	var i, n;
	var itemHTML = "";
	var groupHTML = "";
	var selectHTML = "";
	var outputHTML = "";
	var isInformational = false;
	var showPrice = true;
	var showDropdown = (productData.ShowType1Dropdown != null)?productData.ShowType1Dropdown:true;
	var price = "";
	var crop = "";
	var sharpen = "";
		
	if (typeof (productData.Crop) != "undefined" && productData.Crop != null && productData.Crop != "") {
		crop = productData.Crop;
	}
	else {
		crop = templateStrings.defaultScene7Crop;
	}

	if (typeof (productData.Sharpen) != "undefined" && productData.Sharpen != null && productData.Sharpen != "") {
		sharpen = productData.Sharpen;
	}		


	if (productData.GroupTypeID == "7") {
		price = productData.SKUList[0].Price;
	} else {
		price = productData.Price;
	}

	if (price == null) {price = "";}

	switch (locale.toLowerCase()) {
		case "zh-cn":
		case "zh-hant":
		case "intl":
		case "es-mx":
		case "ko-kr":
		case "pt-br":
			isInformational = true;
	}

	if (typeof productData.ShowPrice != "undefined" && productData.ShowPrice != null && productData.ShowPrice.toLowerCase() == "false") {
		showPrice = false;
		price = "";
	}

	if (productData.GroupTypeID == "1") {
		// Group 1 SKUs have one description and price, plus a drop-down menu.
		if (productData.SKUList != null) {
			itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.Name).split("$price$").join(price).split("$setsLabel$").join("");
			groupHTML = templateStrings.tooltipGroupTemplate;

			if (productData.SKUList.length > 0 && productData.SKUList[0].LinkText != null && showDropdown != false) {
				if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.SKUList[i].SwatchFile + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}
			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((productData.MenuLabel != null) ? productData.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	else if (productData.GroupTypeID == "2") {
		// Group 2 SKUs have two or more descriptions and prices, plus one drop-down menu
		if (productData.Group != null) {
			if (productData.Group.SKUList != null) {

				if (showPrice)
					price = productData.Group.Price;
				else
					price = "";

				groupHTML = templateStrings.tooltipGroupType2Template.split("$description$").join(productData.Group.Name).split("$price$").join(price).split("$id$").join(productData.Group.Sku);

				if (productData.Group.SKUList.length > 0 && productData.Group.SKUList[0].LinkText != null && showDropdown != false) {
					if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
						groupHTML = groupHTML.split("$isColorSwatch$").join("");
						selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
							// Handle each item
							//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
							if (productData.Group.SKUList[i].Price == null) { productData.Group.SKUList[i].Price = ""; }
							selectHTML += '<option value="' + productData.Group.SKUList[i].Sku + '" data-price="' + productData.Group.SKUList[i].Price + '" data-showprice="' + productData.Group.SKUList[i].ShowPrice + '" data-sku="' + productData.Group.SKUList[i].Sku + '" data-description="' + escape(productData.Group.SKUList[i].Name) + '" data-image="' + productData.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.Group.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.Group.SKUList[i].SwatchFile + '" data-save-visible="' + productData.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.Group.SKUList[i].Wholesaleprice + '">' + productData.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
					else {
						selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
							// Handle each item
							//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
							if (productData.Group.SKUList[i].Price == null) { productData.Group.SKUList[i].Price = ""; }
							selectHTML += '<option value="' + productData.Group.SKUList[i].Sku + '" data-price="' + productData.Group.SKUList[i].Price + '" data-showprice="' + productData.Group.SKUList[i].ShowPrice + '" data-sku="' + productData.Group.SKUList[i].Sku + '" data-description="' + escape(productData.Group.SKUList[i].Name) + '" data-image="' + productData.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.Group.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.Group.SKUList[i].Wholesaleprice + '">' + productData.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
				}

				groupHTML = groupHTML.split("$select$").join(selectHTML);
				if (showDropdown != false) {
					groupHTML = groupHTML.split("$label$").join((productData.Group.MenuLabel != null) ? productData.Group.MenuLabel : "");
				}
				else {
					groupHTML = groupHTML.split("$label$").join("");
				}
			}
		}
		if (productData.SKUList != null) {
			for (i = 0, n = productData.SKUList.length; i < n; i++) {
				// Handle each item
				if (productData.SKUList[i].Price == null) { productData.SKUList[i].Price = ""; }

				//Add individual item price here. Based on show price, the price would be hidden in parent call
				//The price is required to be added as 
				price = productData.SKUList[i].Price;
					
				itemHTML += templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.SKUList[i].Name).split("$price$").join(price).split("$id$").join(productData.SKUList[i].Sku).split("$setsLabel$").join("");
			}
		}
		outputHTML = groupHTML + itemHTML;
	}
	else if (productData.GroupTypeID == "7") {
		if (productData.SKUList != null) {
			itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.Name).split("$price$").join(price);
			groupHTML = templateStrings.tooltipGroupTemplate;
			if (productData.SKUList.length > 0 && productData.SKUList[0].LinkText != null && showDropdown != false) {
				if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.SKUList[i].SwatchFile + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}

			if (productData.GroupSkuMultiple != null && productData.isPurchasable == true) {
				itemHTML = itemHTML.split("$setsLabel$").join(templateStrings.soldInSetsLabel.split("$n$").join(productData.GroupSkuMultiple));
			}
			else {
				itemHTML = itemHTML.split("$setsLabel$").join("");
			}

			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((productData.MenuLabel != null) ? productData.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	return outputHTML;
}
	
function loadMiniPDP(url) {
	var itemPageFrame =  '<img class="loading" src="/shared/images/loading.gif" /><iframe src="'+url+'">hi</iframe>'
	$("#digital-catalog-overlay .miniPDP").html("").append(itemPageFrame);
	miniPDPInit = false;
	setTimeout(function(){
		if (miniPDPInit === false) {
			$("#digital-catalog-overlay .miniPDP .loading").show();
		}
	}, 500);		
}
	
function showMiniPDP(url) {
	if ($("#digital-catalog-overlay .miniPDP").is(":visible")) {
		loadMiniPDP(url);
	} else {
		$("#digital-catalog-overlay .list").animate({"min-width":"0"},100, function() {
			$("#digital-catalog-overlay .rollbar-content").css("overflow","hidden");
			$("#digital-catalog-overlay .digital-catalog-item").css("width", $("#digital-catalog-overlay .digital-catalog-item").width());
			$("#digital-catalog-overlay .list").animate({"width":"17%"},200, function() {
				$("#digital-catalog-overlay .list .info").slideUp(500, function() {
					$("#digital-catalog-overlay .image").css("width","98%");
					$("#digital-catalog-overlay .digital-catalog-item").css("width","auto");
					$("#digital-catalog-overlay .rollbar-content").css("overflow","visible");
				});
				//$("#digital-catalog-overlay .miniPDP").show("slide", { direction: "right" }, 500, "easeInOutQuad", function() {
				$("#digital-catalog-overlay .miniPDP").css("width","0").show().animate({width: "77%"},300, function() {
					loadMiniPDP(url);
				});
			});				
		});							
	}
}
	
function resetDigitalCatalog() {
	$("#digital-catalog-overlay .miniPDP").html("").hide();
	$("#digital-catalog-overlay .list").css( { "min-width": "370px","width":"33%" });
	$("#digital-catalog-overlay .image").css("width","48%");
	$("#digital-catalog-overlay .list .info").show();
	$("#digital-catalog-overlay .rollbar-handle, #digital-catalog-overlay .rollbar-content").css("top","0");
	$(".digital-catalog-item .image a").removeClass("active");
}
	
function initMiniPDPOverlay(contentHeight) {
	//var popUpHeight = $("#digital-catalog-overlay iframe").height();
	//console.log(contentHeight +" "+popUpHeight);
	//$("#digital-catalog-overlay iframe").height(contentHeight+20).css("margin-top",(popUpHeight - contentHeight)/2 +"px").animate({"opacity":"1"}, 500); 
	miniPDPInit = true;
	$("#digital-catalog-overlay .miniPDP .loading").hide();
	$("#digital-catalog-overlay iframe").animate({"opacity":"1"}, 500);
}

function getShopTileItems() {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	var itemData = '[';
	var skuList = [];
	$(".shop-tile .shop-section a").each(function() {
		$(this).addClass("null");
		skuList[skuList.length] = '{"SKU": "'+$(this).attr("data-sku")+'", "TYPE": "N"}';
	});
	itemData += skuList.join(",");
	itemData += ']';
	$.ajax({
		url: "/Shopping/CategoryBrowse.aspx/GetDigCatalogueData",
		type: "POST",
		data: '{"digCatalogueItems":'+itemData+'}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			if (data.d != null) {
				for (var i=0; i < data.d.length; i++) {
					if (data.d[i] != null && data.d[i].isAvailable.toLowerCase() != "false") {
						tooltipCatalogDataLookup[data.d[i].Sku] = data.d[i];
						$(".shop-tile .shop-section a[data-sku="+data.d[i].Sku+"]").removeClass("null");
					}
				}
			}
		},
		error: function (jqXHR, status, error) {
	
		}
	});	
}

function renderShopTileList(activeElem) {
	var activeListItem;
	$("#shop-tile-overlay").find(".rollbar").html("");
	$(activeElem).closest(".shop-section").find("a").each(function() {
		if (!$(this).hasClass("null") && $("#shop-tile-overlay").find(".shop-tile-item[data-sku='"+$(this).attr("data-sku")+"']").length == 0) {
			$("#shop-tile-overlay").find(".rollbar").append(renderShopTileListItem($(this).attr("data-sku") ));
		}
	});
	$("#shop-tile-overlay").show();
	$("#gray-overlay-shop-tile").show();
	initRollbar();
	$("#shop-tile-overlay").css("top", $(document).scrollTop() + (($(window).height() - $("#shop-tile-overlay").height())/2) + "px");
	activeListItem = $("#shop-tile-overlay").find(".shop-tile-item[data-sku="+$(activeElem).attr("data-sku")+"]")
	activeListItem.find(".image a").click();
	if ((activeListItem.position().top+activeListItem.height()) > activeListItem.closest(".rollbar").height()) {
		setTimeout(function() {
			activeListItem.closest(".rollbar").trigger('rollbar',(activeListItem.position().top+activeListItem.height())/(activeListItem.closest(".rollbar-content").height()*1.29));
		}, 1500);
	}
}

function renderShopTileListItem(sku) {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	var productData = tooltipCatalogDataLookup[sku];
	var itemHTML = $('<div class="shop-tile-item" data-sku=""><div class="image"><a href="#"><img alt="" src=""></a>\</div></div>');
		
	var sku = productData.Sku;

	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var showPrice = productData.ShowPrice;
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;	

	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var state = URLFactory.convertStateToServiceHash(StateModel.getInstance().pBrowseState);
	var isSearch = URLFactory.extractQueryStringValue(query, "search") == 1?1:0;
	var origin = URLFactory.extractQueryStringValue(query, "search") == 1 ? "search" : "browse";
	var searchKeyword = encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms);
		
	var itemURL = '/Shopping/DigiCatMiniPDP.aspx?shoptile=1&fromGrid=1&sku=' + sku + '&mcat=' + mcat + '&cid=' + cid + '&search_params=' + state + "&search=" + isSearch + "&origin=" + origin + "&searchkeyword=" + searchKeyword;
	
	$(itemHTML).find(".image img").attr("src",templateStrings.baseScene7ImageURL+productData.ImgURL+"?$EcomBrowseM$");		
		
	$(itemHTML).find(".image a").attr("href", itemURL);
	$(itemHTML).find(".save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "digitalCatalogList")');	
		
	itemHTML.attr("data-sku",sku);
	return itemHTML;
}

function showShopTileMiniPDP(url) {
	var itemPageFrame =  '<img class="loading" src="/shared/images/loading.gif" /><iframe src="'+url+'">hi</iframe>'
	$("#shop-tile-overlay .miniPDP").html("").append(itemPageFrame);
	miniPDPInit = false;
	setTimeout(function(){
		if (miniPDPInit === false) {
			$("#digital-catalog-overlay .miniPDP .loading").show();
		}
	}, 500);		
}

function initSTMiniPDPOverlay(contentHeight) {
	miniPDPInit = true;
	$("#shop-tile-overlay .miniPDP .loading").hide();
	$("#shop-tile-overlay iframe").animate({"opacity":"1"}, 500);
}


/* End of digitalCatalog.js */

/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

/* End of jquery-1.11.1.min.js */
/*! jQuery UI - v1.11.2 - 2014-10-16
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}function s(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",o)}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}function h(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var l=0,u=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,n=u.call(arguments,1),a=0,o=n.length;o>a;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=u.call(arguments,1),r=this;return n=!a&&o.length?e.widget.extend.apply(null,[n].concat(o)):n,a?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'")}):this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))}),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var d=!1;e(document).mouseup(function(){d=!1}),e.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!d){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),d=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),d=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,M=e.extend({},y),C=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?M.left-=d:"center"===n.my[0]&&(M.left-=d/2),"bottom"===n.my[1]?M.top-=c:"center"===n.my[1]&&(M.top-=c/2),M.left+=C[0],M.top+=C[1],a||(M.left=h(M.left),M.top=h(M.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](M,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+C[0],p[1]+C[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-M.left,i=t+m-d,s=v.top-M.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:M.left,top:M.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(M,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,e.top+p+f+m>u&&(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,e.top+p+f+m>d&&(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.accordion",{version:"1.11.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(e,t,i){var s,n,a,o=this,r=0,h=e.length&&(!t.length||e.index()<t.index()),l=this.options.animate||{},u=h&&l.down||l,d=function(){o._toggleComplete(i)};return"number"==typeof u&&(a=u),"string"==typeof u&&(n=u),n=n||u.easing||l.easing,a=a||u.duration||l.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:d,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?r+=i.now:"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}}),void 0):t.animate(this.hideProps,a,n,d):e.animate(this.showProps,a,n,d)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.widget("ui.menu",{version:"1.11.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)
}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete;var c,p="ui-button ui-widget ui-state-default ui-corner-all",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},g=function(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return!this.form})),n};e.widget("ui.button",{version:"1.11.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,m),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===c&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n)}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),c=this,t.document.one("mouseup",function(){c=null}),void 0)}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0)}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" ui-state-active "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(f),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "))}}),e.widget("ui.buttonset",{version:"1.11.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.2"}});var v;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0
},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,v=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i},x=function(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw"Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10)},w=function(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+h},k=function(){if(i.charAt(h)!==t.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;t.length>n;n++)if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case"d":v=x("d");break;case"D":w("D",d,c);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=w("M",p,f);break;case"y":m=x("y");break;case"@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?k():b=!0;break;default:k()}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(a=this._getDaysInMonth(m,g-1),a>=v)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},d="",c=!1;if(t)for(s=0;e.length>s;s++)if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),n,a);break;case"o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),o,r);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s)}return d},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=h.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,M,C,N,A,P,I,z,H,F,E,O,j,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),J=this._get(e,"hideIfNoPrevNext"),q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),Q=1!==K[0]||1!==K[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),X=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if(0>Z&&(Z+=12,et--),$)for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),t=X&&X>t?X:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=q?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?G:R,o=q?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;K[0]>w;w++){for(k="",this.maxRows=4,T=0;K[1]>T;T++){if(D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",Q){if(M+="<div class='ui-datepicker-group",K[1]>1)switch(T){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S=""}M+="'>"}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,X,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",C=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)N=(x+u)%7,C+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[N]+"'>"+p[N]+"</span></th>";for(M+=C+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),z=Q?this.maxRows>I?this.maxRows:I:I,this.maxRows=z,H=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;z>F;F++){for(M+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(H)+"</td>":"",x=0;7>x;x++)O=g?g.apply(e.input?e.input[0]:null,[H]):[!0,""],j=H.getMonth()!==Z,W=j&&!y||!O[0]||X&&X>H||$&&H>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(j?" ui-datepicker-other-month":"")+(H.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===H.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!v?"":" "+O[1]+(H.getTime()===G.getTime()?" "+this._currentClass:"")+(H.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(j&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(j&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===R.getTime()?" ui-state-highlight":"")+(H.getTime()===G.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);M+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(Q?"</div>"+(K[0]>0&&T===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=M}_+=k}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.2",e.datepicker,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)
},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseInt(e,10)||0},_isNumber:function(e){return!isNaN(parseInt(e,10))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=this.element.children(this.handles[i]).first().show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=u-t.height,i.size.width=p,i.position.left=o.left+a.width-p))}}),e.ui.resizable,e.widget("ui.dialog",{version:"1.11.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;
if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus()}),t.preventDefault()):(this._delay(function(){s.focus()}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}}),e.widget("ui.droppable",{version:"1.11.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case"fit":return a>=l&&d>=r&&o>=u&&c>=h;case"intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case"pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case"touch":return(o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;a.length>s;s++)if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.ui.droppable;var y="ui-effects-",b=e;e.effects={effect:{}},function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],n=s._rgba=o._rgba,!1):t}),n.length?("0,0,0,0"===n.join()&&e.extend(n,a.transparent),s):a[i]}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(n,o,r,h){if(n===t)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=e(n).css(o),o=t);var d=this,c=e.type(n),p=this._rgba=[];return o!==t&&(n=[n,o,r,h],c="array"),"string"===c?this.parse(s(n)||a._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(n[t.idx],t)}),this):"object"===c?(n instanceof l?f(u,function(e,t){n[t.cache]&&(d[t.cache]=n[t.cache].slice())}):f(u,function(t,s){var a=s.cache;f(s.props,function(e,t){if(!d[a]&&s.to){if("alpha"===e||null==n[e])return;d[a]=s.to(d._rgba)}d[a][t.idx]=i(n[e],t,!0)}),d[a]&&0>e.inArray(null,d[a].slice(0,3))&&(d[a][3]=1,s.from&&(d._rgba=s.from(d[a])))}),this):t},is:function(e){var i=l(e),s=!0,n=this;return f(u,function(e,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),n=s._space(),a=u[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],u=d[n.type]||{};null!==l&&(null===o?h[a]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[a]=i((l-o)*t+o,n)))}),this[n](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*n[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a]},f(u,function(s,n){var a=n.props,o=n.cache,h=n.to,u=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===t)return this[o].slice();var n,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(a,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t)}),u?(n=l(u(c)),n[o]=c,n):l(c)},f(a,function(t,i){l.fn[t]||(l.fn[t]=function(n){var a,o=e.type(n),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===o?u:("function"===o&&(n=n.call(this,u),o=e.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=u+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if(n=l(a||n),!c.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{t.style[i]=n}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(o),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},a=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(b),function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function i(t,i){var s,a,o={};for(s in i)a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(o[s]=a));return o}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(b.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,a,o,r){var h=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t])})},a(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,n,a,o){return"boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a)}}(e.fn.toggleClass),switchClass:function(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a)}})}(),function(){function t(t,i,s,n){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.2",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(y+t[i],e[0].style[t[i]])},restore:function(e,t){var i,s;for(s=0;t.length>s;s++)null!==t[s]&&(i=e.data(y+t[s]),void 0===i&&(i=""),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),e.fn.extend({effect:function(){function i(t){function i(){e.isFunction(a)&&a.call(n[0]),e.isFunction(t)&&t()}var n=e(this),a=s.complete,r=s.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),i()):o.call(n[0],s,i)}var s=t.apply(this,arguments),n=s.mode,a=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?n?this[n](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this)}):a===!1?this.each(i):this.queue(a||"fx",i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}(),e.effects,e.effects.effect.blind=function(t,i){var s,n,a,o=e(this),r=/up|down|vertical/,h=/up|left|vertical|horizontal/,l=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(o,t.mode||"hide"),d=t.direction||"up",c=r.test(d),p=c?"height":"width",f=c?"top":"left",m=h.test(d),g={},v="show"===u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(),l):e.effects.save(o,l),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n=s[p](),a=parseFloat(s.css(f))||0,g[p]=v?n:0,m||(o.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?a:n+a),v&&(s.css(p,0),m||s.css(f,a+n)),s.animate(g,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){"hide"===u&&o.hide(),e.effects.restore(o,l),e.effects.removeWrapper(o),i()}})},e.effects.effect.bounce=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"effect"),l="hide"===h,u="show"===h,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||l?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=o.queue(),_=b.length;for((u||l)&&r.push("opacity"),e.effects.save(o,r),o.show(),e.effects.createWrapper(o),c||(c=o["top"===v?"outerHeight":"outerWidth"]()/3),u&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,y?2*-c:2*c).animate(a,m,g)),l&&(c/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++)n={},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g).animate(a,m,g),c=l?2*c:c/2;l&&(n={opacity:0},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g)),o.queue(function(){l&&o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),o.dequeue()},e.effects.effect.clip=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"hide"),l="show"===h,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(o,r),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[c](),l&&(n.css(c,0),n.css(p,a/2)),f[c]=l?a:0,f[p]=l?0:a/2,n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){l||o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}})},e.effects.effect.drop=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","opacity","height","width"],o=e.effects.setMode(n,t.mode||"hide"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h?"pos":"neg",d={opacity:r?1:0};e.effects.save(n,a),n.show(),e.effects.createWrapper(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===u?-s:s),d[l]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&n()}function n(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i()}var a,o,r,h,l,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(a=0;d>a;a++)for(h=g.top+a*y,u=a-(d-1)/2,o=0;c>o;o++)r=g.left+o*v,l=o-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)},e.effects.effect.fade=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:t.duration,easing:t.easing,complete:i})},e.effects.effect.fold=function(t,i){var s,n,a=e(this),o=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"hide"),h="show"===r,l="hide"===r,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=h!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(a,o),a.show(),s=e.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*n[l?0:1]),h&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=h?n[0]:u,v[f[1]]=h?n[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){l&&a.hide(),e.effects.restore(a,o),e.effects.removeWrapper(a),i()})},e.effects.effect.highlight=function(t,i){var s=e(this),n=["backgroundImage","backgroundColor","opacity"],a=e.effects.setMode(s,t.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),e.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===a&&s.hide(),e.effects.restore(s,n),i()}})},e.effects.effect.size=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=o.css("position"),y=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===t.mode&&"show"===p?(o.from=t.to||b,o.to=t.from||s):(o.from=t.from||("show"===p?b:s),o.to=t.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===m||"both"===m)&&(a.from.y!==a.to.y&&(y=y.concat(d),o.from=e.effects.setTransition(o,d,a.from.y,o.from),o.to=e.effects.setTransition(o,d,a.to.y,o.to)),a.from.x!==a.to.x&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,a.from.x,o.from),o.to=e.effects.setTransition(o,c,a.to.x,o.to))),("content"===m||"both"===m)&&a.from.y!==a.to.y&&(y=y.concat(u).concat(l),o.from=e.effects.setTransition(o,u,a.from.y,o.from),o.to=e.effects.setTransition(o,u,a.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),g&&(n=e.effects.getBaseline(g,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=r.concat(d).concat(c),o.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};
f&&e.effects.save(i,l),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=e.effects.setTransition(i,d,a.from.y,i.from),i.to=e.effects.setTransition(i,d,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=e.effects.setTransition(i,c,a.from.x,i.from),i.to=e.effects.setTransition(i,c,a.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),e.effects.restore(o,y),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,i){var s=parseInt(i,10),n=e?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),e.effects.removeWrapper(o),i()}})},e.effects.effect.scale=function(t,i){var s=e(this),n=e.extend(!0,{},t),a=e.effects.setMode(s,t.mode||"effect"),o=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===a?0:100),r=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=h||["middle","center"],n.restore=!0),n.from=t.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},e.effects.effect.puff=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"hide"),a="hide"===n,o=parseInt(t.percent,10)||150,r=o/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(t)},e.effects.effect.pulsate=function(t,i){var s,n=e(this),a=e.effects.setMode(n,t.mode||"show"),o="show"===a,r="hide"===a,h=o||"hide"===a,l=2*(t.times||5)+(h?1:0),u=t.duration/l,d=0,c=n.queue(),p=c.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),d=1),s=1;l>s;s++)n.animate({opacity:d},u,t.easing),d=1-d;n.animate({opacity:d},u,t.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,l+1))),n.dequeue()},e.effects.effect.shake=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"effect"),r=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=n.queue(),y=v.length;for(e.effects.save(n,a),n.show(),e.effects.createWrapper(n),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,n.animate(f,d,t.easing),s=1;l>s;s++)n.animate(m,d,t.easing).animate(g,d,t.easing);n.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),n.dequeue()},e.effects.effect.slide=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(n,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(n,a),n.show(),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.transfer=function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,h=a?o.scrollLeft():0,l=n.offset(),u={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-r,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})},e.widget("ui.progressbar",{version:"1.11.2",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0)},_constrainedValue:function(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectable",e.ui.mouse,{version:"1.11.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.selectmenu",{version:"1.11.2",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var t=this,i=this.element.attr("tabindex");this.label=e("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(e){this.button.focus(),e.preventDefault()}}),this.element.hide(),this.button=e("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:i||this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),e("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=e("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){t.menuItems||t._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var e,t=this.element.find("option");t.length&&(this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(t,i){var s=this,n="";e.each(i,function(i,a){a.optgroup!==n&&(e("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(t),n=a.optgroup),s._renderItemData(t,a)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(t))}},_buttonEvents:{mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this._setText(this.buttonText,e.label),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){"icons"===e&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button),this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"disabled"===e&&(this.menuInstance.option("disabled",t),this.button.toggleClass("ui-state-disabled",t).attr("aria-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===e&&this._resizeButton()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;e||(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(t){var i=[];t.each(function(t,s){var n=e(s),a=n.parent("optgroup");i.push({element:n,index:t,value:n.attr("value"),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-e},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));
return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-e(document).scrollTop()<o.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-o.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<o.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+o.scrollSpeed)),t.pageX-e(document).scrollLeft()<o.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-o.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<o.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.spinner",{version:"1.11.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);void 0!==n&&n.length&&(t[s]=n)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable"))},_setOptions:h(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();return null===e?!1:e===this._adjustValue(e)},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:h(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:h(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:h(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:h(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(h(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),e.widget("ui.tabs",{version:"1.11.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]
}).addClass("ui-tabs-anchor").attr({ role: "presentation", tabIndex: -1 }), this.panels = e(), this.anchors.each(function (i, s) { var n, a, o, r = e(s).uniqueId().attr("id"), h = e(s).closest("li"), l = h.attr("aria-controls"); t._isLocal(s) ? (n = s.hash, o = n.substring(1), a = t.element.find(t._sanitizeSelector(n))) : (o = h.attr("aria-controls") || e({}).uniqueId()[0].id, n = "#" + o, a = t.element.find(n), a.length || (a = t._createPanel(o), a.insertAfter(t.panels[i - 1] || t.tablist)), a.attr("aria-live", "polite")), a.length && (t.panels = t.panels.add(a)), l && h.data("ui-tabs-aria-controls", l), h.attr({ "aria-controls": o, "aria-labelledby": r }), a.attr("aria-labelledby", r) }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
}, _getList: function () { return this.tablist || this.element.find("ol,ul").eq(0) }, _createPanel: function (t) { return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0) }, _setupDisabled: function (t) { e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1); for (var i, s = 0; i = this.tabs[s]; s++) t === !0 || -1 !== e.inArray(s, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled"); this.options.disabled = t }, _setupEvents: function (t) { var i = {}; t && e.each(t.split(" "), function (e, t) { i[t] = "_eventHandler" }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, { click: function (e) { e.preventDefault() } }), this._on(this.anchors, i), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs) }, _setupHeightStyle: function (t) { var i, s = this.element.parent(); "fill" === t ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () { var t = e(this), s = t.css("position"); "absolute" !== s && "fixed" !== s && (i -= t.outerHeight(!0)) }), this.element.children().not(this.panels).each(function () { i -= e(this).outerHeight(!0) }), this.panels.each(function () { e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height())) }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function () { i = Math.max(i, e(this).height("").height()) }).height(i)) }, _eventHandler: function (t) { var i = this.options, s = this.active, n = e(t.currentTarget), a = n.closest("li"), o = a[0] === s[0], r = o && i.collapsible, h = r ? e() : this._getPanelForTab(a), l = s.length ? this._getPanelForTab(s) : e(), u = { oldTab: s, oldPanel: l, newTab: r ? e() : a, newPanel: h }; t.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", t, u) === !1 || (i.active = r ? !1 : this.tabs.index(a), this.active = o ? e() : a, this.xhr && this.xhr.abort(), l.length || h.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), t), this._toggle(t, u)) }, _toggle: function (t, i) { function s() { a.running = !1, a._trigger("activate", t, i) } function n() { i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show ? a._show(o, a.options.show, s) : (o.show(), s()) } var a = this, o = i.newPanel, r = i.oldPanel; this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () { i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n() }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }), o.length && r.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function () { return 0 === e(this).attr("tabIndex") }).attr("tabIndex", -1), o.attr("aria-hidden", "false"), i.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }) }, _activate: function (t) { var i, s = this._findActive(t); s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: e.noop })) }, _findActive: function (t) { return t === !1 ? e() : this.tabs.eq(t) }, _getIndex: function (e) { return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e }, _destroy: function () { this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function () { e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role") }), this.tabs.each(function () { var t = e(this), i = t.data("ui-tabs-aria-controls"); i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls") }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "") }, enable: function (t) { var i = this.options.disabled; i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = e.isArray(i) ? e.map(i, function (e) { return e !== t ? e : null }) : e.map(this.tabs, function (e, i) { return i !== t ? i : null })), this._setupDisabled(i)) }, disable: function (t) { var i = this.options.disabled; if (i !== !0) { if (void 0 === t) i = !0; else { if (t = this._getIndex(t), -1 !== e.inArray(t, i)) return; i = e.isArray(i) ? e.merge([t], i).sort() : [t] } this._setupDisabled(i) } }, load: function (t, i) { t = this._getIndex(t); var s = this, n = this.tabs.eq(t), a = n.find(".ui-tabs-anchor"), o = this._getPanelForTab(n), r = { tab: n, panel: o }; this._isLocal(a[0]) || (this.xhr = e.ajax(this._ajaxSettings(a, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.success(function (e) { setTimeout(function () { o.html(e), s._trigger("load", i, r) }, 1) }).complete(function (e, t) { setTimeout(function () { "abort" === t && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), o.removeAttr("aria-busy"), e === s.xhr && delete s.xhr }, 1) }))) }, _ajaxSettings: function (t, i, s) { var n = this; return { url: t.attr("href"), beforeSend: function (t, a) { return n._trigger("beforeLoad", i, e.extend({ jqXHR: t, ajaxSettings: a }, s)) } } }, _getPanelForTab: function (t) { var i = e(t).attr("aria-controls"); return this.element.find(this._sanitizeSelector("#" + i)) } 
}), e.widget("ui.tooltip", { version: "1.11.2", options: { content: function () { var t = e(this).attr("title") || ""; return e("<a>").text(t).html() }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, tooltipClass: null, track: !1, close: null, open: null }, _addDescribedBy: function (t, i) { var s = (t.attr("aria-describedby") || "").split(/\s+/); s.push(i), t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(s.join(" "))) }, _removeDescribedBy: function (t) { var i = t.data("ui-tooltip-id"), s = (t.attr("aria-describedby") || "").split(/\s+/), n = e.inArray(i, s); -1 !== n && s.splice(n, 1), t.removeData("ui-tooltip-id"), s = e.trim(s.join(" ")), s ? t.attr("aria-describedby", s) : t.removeAttr("aria-describedby") }, _create: function () { this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body) }, _setOption: function (t, i) { var s = this; return "disabled" === t ? (this[i ? "_disable" : "_enable"](), this.options[t] = i, void 0) : (this._super(t, i), "content" === t && e.each(this.tooltips, function (e, t) { s._updateContent(t.element) }), void 0) }, _disable: function () { var t = this; e.each(this.tooltips, function (i, s) { var n = e.Event("blur"); n.target = n.currentTarget = s.element[0], t.close(n, !0) }), this.element.find(this.options.items).addBack().each(function () { var t = e(this); t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title") }) }, _enable: function () { this.element.find(this.options.items).addBack().each(function () { var t = e(this); t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title")) }) }, open: function (t) { var i = this, s = e(t ? t.target : this.element).closest(this.options.items); s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), t && "mouseover" === t.type && s.parents().each(function () { var t, s = e(this); s.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, i.close(t, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = { element: this, title: s.attr("title") }, s.attr("title", "")) }), this._updateContent(s, t)) }, _updateContent: function (e, t) { var i, s = this.options.content, n = this, a = t ? t.type : null; return "string" == typeof s ? this._open(t, e, s) : (i = s.call(e[0], function (i) { e.data("ui-tooltip-open") && n._delay(function () { t && (t.type = a), this._open(t, e, i) }) }), i && this._open(t, e, i), void 0) }, _open: function (t, i, s) { function n(e) { u.of = e, o.is(":hidden") || o.position(u) } var a, o, r, h, l, u = e.extend({}, this.options.position); if (s) { if (a = this._find(i)) return a.tooltip.find(".ui-tooltip-content").html(s), void 0; i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title")), a = this._tooltip(i), o = a.tooltip, this._addDescribedBy(i, o.attr("id")), o.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone ? (l = s.clone(), l.removeAttr("id").find("[id]").removeAttr("id")) : l = s, e("<div>").html(l).appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, { mousemove: n }), n(t)) : o.position(e.extend({ of: i }, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function () { o.is(":visible") && (n(u.of), clearInterval(h)) }, e.fx.interval)), this._trigger("open", t, { tooltip: o }), r = { keyup: function (t) { if (t.keyCode === e.ui.keyCode.ESCAPE) { var s = e.Event(t); s.currentTarget = i[0], this.close(s, !0) } } }, i[0] !== this.element[0] && (r.remove = function () { this._removeTooltip(o) }), t && "mouseover" !== t.type || (r.mouseleave = "close"), t && "focusin" !== t.type || (r.focusout = "close"), this._on(!0, i, r) } }, close: function (t) { var i, s = this, n = e(t ? t.currentTarget : this.element), a = this._find(n); a && (i = a.tooltip, a.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), a.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function () { s._removeTooltip(e(this)) }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function (t, i) { e(i.element).attr("title", i.title), delete s.parents[t] }), a.closing = !0, this._trigger("close", t, { tooltip: i }), a.hiding || (a.closing = !1))) }, _tooltip: function (t) { var i = e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")), s = i.uniqueId().attr("id"); return e("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = { element: t, tooltip: i} }, _find: function (e) { var t = e.data("ui-tooltip-id"); return t ? this.tooltips[t] : null }, _removeTooltip: function (e) { e.remove(), delete this.tooltips[e.attr("id")] }, _destroy: function () { var t = this; e.each(this.tooltips, function (i, s) { var n = e.Event("blur"), a = s.element; n.target = n.currentTarget = a[0], t.close(n, !0), e("#" + i).remove(), a.data("ui-tooltip-title") && (a.attr("title") || a.attr("title", a.data("ui-tooltip-title")), a.removeData("ui-tooltip-title")) }), this.liveRegion.remove() } })});

/* End of jQuery UI - v1.11.2 */
/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */

(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,r){"$:nomunge";function l(e){return e=e||location.href,"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var i="hashchange",s=n,o,u=e.event.special,a=s.documentMode,f="on"+i in t&&(a===r||a>7);e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.fn[i].delay=50,u[i]=e.extend(u[i],{setup:function(){if(f)return!1;e(o.start)},teardown:function(){if(f)return!1;e(o.stop)}}),o=function(){function p(){var n=l(),r=h(u);n!==u?(c(u=n,r),e(t).trigger(i)):r!==u&&(location.href=location.href.replace(/#.*/,"")+r),o=setTimeout(p,e.fn[i].delay)}var n={},o,u=l(),a=function(e){return e},c=a,h=a;return n.start=function(){o||p()},n.stop=function(){o&&clearTimeout(o),o=r},t.attachEvent&&!t.addEventListener&&!f&&function(){var t,r;n.start=function(){t||(r=e.fn[i].src,r=r&&r+l(),t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||c(l()),p()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow,s.onpropertychange=function(){try{event.propertyName==="title"&&(t.document.title=s.title)}catch(e){}})},n.stop=a,h=function(){return l(t.location.href)},c=function(n,r){var o=t.document,u=e.fn[i].domain;n!==r&&(o.title=s.title,o.open(),u&&o.write('<script>document.domain="'+u+'"</script>'),o.close(),t.location.hash=n)}}(),n}()})(e,this),function(e){e.mobile={}}(e),function(e,t,n){e.extend(e.mobile,{version:"1.4.5",subPageUrlKey:"ui-page",hideUrlBar:!0,keepNative:":jqmData(role='none'), :jqmData(role='nojs')",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:0,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"a",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,buttonMarkup:{hoverDelay:200},dynamicBaseEnabled:!0,pageContainer:e(),allowCrossDomainPages:!1,dialogHashKey:"&ui-state=dialog"})}(e,this),function(e,t,n){var r={},i=e.find,s=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,o=/:jqmData\(([^)]*)\)/g;e.extend(e.mobile,{ns:"",getAttribute:function(t,n){var r;t=t.jquery?t[0]:t,t&&t.getAttribute&&(r=t.getAttribute("data-"+e.mobile.ns+n));try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:s.test(r)?JSON.parse(r):r}catch(i){}return r},nsNormalizeDict:r,nsNormalize:function(t){return r[t]||(r[t]=e.camelCase(e.mobile.ns+t))},closestPageData:function(e){return e.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")}}),e.fn.jqmData=function(t,r){var i;return typeof t!="undefined"&&(t&&(t=e.mobile.nsNormalize(t)),arguments.length<2||r===n?i=this.data(t):i=this.data(t,r)),i},e.jqmData=function(t,n,r){var i;return typeof n!="undefined"&&(i=e.data(t,n?e.mobile.nsNormalize(n):n,r)),i},e.fn.jqmRemoveData=function(t){return this.removeData(e.mobile.nsNormalize(t))},e.jqmRemoveData=function(t,n){return e.removeData(t,e.mobile.nsNormalize(n))},e.find=function(t,n,r,s){return t.indexOf(":jqmData")>-1&&(t=t.replace(o,"[data-"+(e.mobile.ns||"")+"$1]")),i.call(this,t,n,r,s)},e.extend(e.find,i)}(e,this),function(e,t){function s(t,n){var r,i,s,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(s=e("img[usemap=#"+i+"]")[0],!!s&&o(s))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&o(t)}function o(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var r=0,i=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"c0ab71056b936627e8a7821f03c044aec6280a40",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(n,r){return typeof n=="number"?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),r&&r.call(t)},n)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(this[0].ownerDocument||n):t},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++r)})},removeUniqueId:function(){return this.each(function(){i.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return s(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&s(t,!r)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in n.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(r){if(r!==t)return this.css("zIndex",r);if(this.length){var i=e(this[0]),s,o;while(i.length&&i[0]!==n){s=i.css("position");if(s==="absolute"||s==="relative"||s==="fixed"){o=parseInt(i.css("zIndex"),10);if(!isNaN(o)&&o!==0)return o}i=i.parent()}}return 0}}),e.ui.plugin={add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n,r){var i,s=e.plugins[t];if(!s)return;if(!r&&(!e.element[0].parentNode||e.element[0].parentNode.nodeType===11))return;for(i=0;i<s.length;i++)e.options[s[i][0]]&&s[i][1].apply(e.element,n)}}}(e),function(e,t,r){var i=function(t,n){var r=t.parent(),i=[],s=function(){var t=e(this),n=e.mobile.toolbar&&t.data("mobile-toolbar")?t.toolbar("option"):{position:t.attr("data-"+e.mobile.ns+"position"),updatePagePadding:t.attr("data-"+e.mobile.ns+"update-page-padding")!==!1};return n.position!=="fixed"||n.updatePagePadding!==!0},o=r.children(":jqmData(role='header')").filter(s),u=t.children(":jqmData(role='header')"),a=r.children(":jqmData(role='footer')").filter(s),f=t.children(":jqmData(role='footer')");return u.length===0&&o.length>0&&(i=i.concat(o.toArray())),f.length===0&&a.length>0&&(i=i.concat(a.toArray())),e.each(i,function(t,r){n-=e(r).outerHeight()}),Math.max(0,n)};e.extend(e.mobile,{window:e(t),document:e(n),keyCode:e.ui.keyCode,behaviors:{},silentScroll:function(n){e.type(n)!=="number"&&(n=e.mobile.defaultHomeScroll),e.event.special.scrollstart.enabled=!1,setTimeout(function(){t.scrollTo(0,n),e.mobile.document.trigger("silentscroll",{x:0,y:n})},20),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},getClosestBaseUrl:function(t){var n=e(t).closest(".ui-page").jqmData("url"),r=e.mobile.path.documentBase.hrefNoHash;if(!e.mobile.dynamicBaseEnabled||!n||!e.mobile.path.isPath(n))n=r;return e.mobile.path.makeUrlAbsolute(n,r)},removeActiveLinkClass:function(t){!!e.mobile.activeClickedLink&&(!e.mobile.activeClickedLink.closest("."+e.mobile.activePageClass).length||t)&&e.mobile.activeClickedLink.removeClass(e.mobile.activeBtnClass),e.mobile.activeClickedLink=null},getInheritedTheme:function(e,t){var n=e[0],r="",i=/ui-(bar|body|overlay)-([a-z])\b/,s,o;while(n){s=n.className||"";if(s&&(o=i.exec(s))&&(r=o[2]))break;n=n.parentNode}return r||t||"a"},enhanceable:function(e){return this.haveParents(e,"enhance")},hijackable:function(e){return this.haveParents(e,"ajax")},haveParents:function(t,n){if(!e.mobile.ignoreContentEnabled)return t;var r=t.length,i=e(),s,o,u,a,f;for(a=0;a<r;a++){o=t.eq(a),u=!1,s=t[a];while(s){f=s.getAttribute?s.getAttribute("data-"+e.mobile.ns+n):"";if(f==="false"){u=!0;break}s=s.parentNode}u||(i=i.add(o))}return i},getScreenHeight:function(){return t.innerHeight||e.mobile.window.height()},resetActivePageHeight:function(t){var n=e("."+e.mobile.activePageClass),r=n.height(),s=n.outerHeight(!0);t=i(n,typeof t=="number"?t:e.mobile.getScreenHeight()),n.css("min-height",""),n.height()<t&&n.css("min-height",t-(s-r))},loading:function(){var t=this.loading._widget||e(e.mobile.loader.prototype.defaultHtml).loader(),n=t.loader.apply(t,arguments);return this.loading._widget=t,n}}),e.addDependents=function(t,n){var r=e(t),i=r.jqmData("dependents")||e();r.jqmData("dependents",e(i).add(n))},e.fn.extend({removeWithDependents:function(){e.removeWithDependents(this)},enhanceWithin:function(){var t,n={},r=e.mobile.page.prototype.keepNativeSelector(),i=this;e.mobile.nojs&&e.mobile.nojs(this),e.mobile.links&&e.mobile.links(this),e.mobile.degradeInputsWithin&&e.mobile.degradeInputsWithin(this),e.fn.buttonMarkup&&this.find(e.fn.buttonMarkup.initSelector).not(r).jqmEnhanceable().buttonMarkup(),e.fn.fieldcontain&&this.find(":jqmData(role='fieldcontain')").not(r).jqmEnhanceable().fieldcontain(),e.each(e.mobile.widgets,function(t,s){if(s.initSelector){var o=e.mobile.enhanceable(i.find(s.initSelector));o.length>0&&(o=o.not(r)),o.length>0&&(n[s.prototype.widgetName]=o)}});for(t in n)n[t][t]();return this},addDependents:function(t){e.addDependents(this,t)},getEncodedText:function(){return e("<a>").text(this.text()).html()},jqmEnhanceable:function(){return e.mobile.enhanceable(this)},jqmHijackable:function(){return e.mobile.hijackable(this)}}),e.removeWithDependents=function(t){var n=e(t);(n.jqmData("dependents")||e()).remove(),n.remove()},e.addDependents=function(t,n){var r=e(t),i=r.jqmData("dependents")||e();r.jqmData("dependents",e(i).add(n))},e.find.matches=function(t,n){return e.find(t,null,null,n)},e.find.matchesSelector=function(t,n){return e.find(n,null,null,[t]).length>0}}(e,this),function(e,r){t.matchMedia=t.matchMedia||function(e,t){var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",s.style.background="none",s.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',r.insertBefore(s,i),n=o.offsetWidth===42,r.removeChild(s),{matches:n,media:e}}}(n),e.mobile.media=function(e){return t.matchMedia(e).matches}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,n){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(e),function(e,r){function i(e){var t=e.charAt(0).toUpperCase()+e.substr(1),n=(e+" "+u.join(t+" ")+t).split(" "),i;for(i in n)if(o[n[i]]!==r)return!0}function h(){var n=t,r=!!n.document.createElementNS&&!!n.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&(!n.opera||navigator.userAgent.indexOf("Chrome")!==-1),i=function(t){(!t||!r)&&e("html").addClass("ui-nosvg")},s=new n.Image;s.onerror=function(){i(!1)},s.onload=function(){i(s.width===1&&s.height===1)},s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}function p(){var i="transform-3d",o=e.mobile.media("(-"+u.join("-"+i+"),(-")+"-"+i+"),("+i+")"),a,f,l;if(o)return!!o;a=n.createElement("div"),f={MozTransform:"-moz-transform",transform:"transform"},s.append(a);for(l in f)a.style[l]!==r&&(a.style[l]="translate3d( 100px, 1px, 1px )",o=t.getComputedStyle(a).getPropertyValue(f[l]));return!!o&&o!=="none"}function d(){var t=location.protocol+"//"+location.host+location.pathname+"ui-dir/",n=e("head base"),r=null,i="",o,u;return n.length?i=n.attr("href"):n=r=e("<base>",{href:t}).appendTo("head"),o=e("<a href='testurl' />").prependTo(s),u=o[0].href,n[0].href=i||location.pathname,r&&r.remove(),u.indexOf(t)===0}function v(){var e=n.createElement("x"),r=n.documentElement,i=t.getComputedStyle,s;return"pointerEvents"in e.style?(e.style.pointerEvents="auto",e.style.pointerEvents="x",r.appendChild(e),s=i&&i(e,"").pointerEvents==="auto",r.removeChild(e),!!s):!1}function m(){var e=n.createElement("div");return typeof e.getBoundingClientRect!="undefined"}function g(){var e=t,n=navigator.userAgent,r=navigator.platform,i=n.match(/AppleWebKit\/([0-9]+)/),s=!!i&&i[1],o=n.match(/Fennec\/([0-9]+)/),u=!!o&&o[1],a=n.match(/Opera Mobi\/([0-9]+)/),f=!!a&&a[1];return(r.indexOf("iPhone")>-1||r.indexOf("iPad")>-1||r.indexOf("iPod")>-1)&&s&&s<534||e.operamini&&{}.toString.call(e.operamini)==="[object OperaMini]"||a&&f<7458||n.indexOf("Android")>-1&&s&&s<533||u&&u<6||"palmGetResource"in t&&s&&s<534||n.indexOf("MeeGo")>-1&&n.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var s=e("<body>").prependTo("html"),o=s[0].style,u=["Webkit","Moz","O"],a="palmGetResource"in t,f=t.operamini&&{}.toString.call(t.operamini)==="[object OperaMini]",l=t.blackberry&&!i("-webkit-transform"),c;e.extend(e.mobile,{browser:{}}),e.mobile.browser.oldIE=function(){var e=3,t=n.createElement("div"),r=t.all||[];do t.innerHTML="<!--[if gt IE "+ ++e+"]><br><![endif]-->";while(r[0]);return e>4?e:!e}(),e.extend(e.support,{pushState:"pushState"in history&&"replaceState"in history&&!(t.navigator.userAgent.indexOf("Firefox")>=0&&t.top!==t)&&t.navigator.userAgent.search(/CriOS/)===-1,mediaquery:e.mobile.media("only all"),cssPseudoElement:!!i("content"),touchOverflow:!!i("overflowScrolling"),cssTransform3d:p(),boxShadow:!!i("boxShadow")&&!l,fixedPosition:g(),scrollTop:("pageXOffset"in t||"scrollTop"in n.documentElement||"scrollTop"in s[0])&&!a&&!f,dynamicBaseTag:d(),cssPointerEvents:v(),boundingRect:m(),inlineSVG:h}),s.remove(),c=function(){var e=t.navigator.userAgent;return e.indexOf("Nokia")>-1&&(e.indexOf("Symbian/3")>-1||e.indexOf("Series60/5")>-1)&&e.indexOf("AppleWebKit")>-1&&e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}(),e.mobile.gradeA=function(){return(e.support.mediaquery&&e.support.cssPseudoElement||e.mobile.browser.oldIE&&e.mobile.browser.oldIE>=8)&&(e.support.boundingRect||e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/)!==null)},e.mobile.ajaxBlacklist=t.blackberry&&!t.WebKitPoint||f||c,c&&e(function(){e("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),e.support.boxShadow||e("html").addClass("ui-noboxshadow")}(e),function(e,t){var n=e.mobile.window,r,i=function(){};e.event.special.beforenavigate={setup:function(){n.on("navigate",i)},teardown:function(){n.off("navigate",i)}},e.event.special.navigate=r={bound:!1,pushStateEnabled:!0,originalEventName:t,isPushStateEnabled:function(){return e.support.pushState&&e.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return e.mobile.hashListeningEnabled===!0},popstate:function(t){var r=new e.Event("navigate"),i=new e.Event("beforenavigate"),s=t.originalEvent.state||{};i.originalEvent=t,n.trigger(i);if(i.isDefaultPrevented())return;t.historyState&&e.extend(s,t.historyState),r.originalEvent=t,setTimeout(function(){n.trigger(r,{state:s})},0)},hashchange:function(t){var r=new e.Event("navigate"),i=new e.Event("beforenavigate");i.originalEvent=t,n.trigger(i);if(i.isDefaultPrevented())return;r.originalEvent=t,n.trigger(r,{state:t.hashchangeState||{}})},setup:function(){if(r.bound)return;r.bound=!0,r.isPushStateEnabled()?(r.originalEventName="popstate",n.bind("popstate.navigate",r.popstate)):r.isHashChangeEnabled()&&(r.originalEventName="hashchange",n.bind("hashchange.navigate",r.hashchange))}}}(e),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",n)},teardown:function(){e(this).unbind("resize",n)}};var t=250,n=function(){s=(new Date).getTime(),o=s-r,o>=t?(r=s,e(this).trigger("throttledresize")):(i&&clearTimeout(i),i=setTimeout(n,t-o))},r=0,i,s,o}(e),function(e,t){function p(){var e=s();e!==o&&(o=e,r.trigger(i))}var r=e(t),i="orientationchange",s,o,u,a,f={0:!0,180:!0},l,c,h;if(e.support.orientation){l=t.innerWidth||r.width(),c=t.innerHeight||r.height(),h=50,u=l>c&&l-c>h,a=f[t.orientation];if(u&&a||!u&&!a)f={"-90":!0,90:!0}}e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;o=s(),r.bind("throttledresize",p)},teardown:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;r.unbind("throttledresize",p)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=s(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=s=function(){var r=!0,i=n.documentElement;return e.support.orientation?r=f[t.orientation]:r=i&&i.clientWidth/i.clientHeight<1.1,r?"portrait":"landscape"},e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)}(e,this),function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)}(e,t,n),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this),function(e,t){var r={animation:{},transition:{}},i=n.createElement("a"),s=["","webkit-","moz-","o-"];e.each(["animation","transition"],function(n,o){var u=n===0?o+"-"+"name":o;e.each(s,function(n,s){if(i.style[e.camelCase(s+u)]!==t)return r[o].prefix=s,!1}),r[o].duration=e.camelCase(r[o].prefix+o+"-"+"duration"),r[o].event=e.camelCase(r[o].prefix+o+"-"+"end"),r[o].prefix===""&&(r[o].event=r[o].event.toLowerCase())}),e.support.cssTransitions=r.transition.prefix!==t,e.support.cssAnimations=r.animation.prefix!==t,e(i).remove(),e.fn.animationComplete=function(i,s,o){var u,a,f=this,l=function(){clearTimeout(u),i.apply(this,arguments)},c=!s||s==="animation"?"animation":"transition";if(e.support.cssTransitions&&c==="transition"||e.support.cssAnimations&&c==="animation"){if(o===t){e(this).context!==n&&(a=parseFloat(e(this).css(r[c].duration))*3e3);if(a===0||a===t||isNaN(a))a=e.fn.animationComplete.defaultDuration}return u=setTimeout(function(){e(f).off(r[c].event,l),i.apply(f)},a),e(this).one(r[c].event,l)}return setTimeout(e.proxy(i,this),0),e(this)},e.fn.animationComplete.defaultDuration=1e3}(e),function(e,n){var r,i,s="&ui-state=dialog";e.mobile.path=r={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(e){var t=this.parseUrl(e||location.href),n=e?t:location,r=t.hash;return r=r==="#"?"":r,n.protocol+t.doubleSlash+n.host+(n.protocol!==""&&n.pathname.substring(0,1)!=="/"?"/":"")+n.pathname+n.search+r},getDocumentUrl:function(t){return t?e.extend({},r.documentUrl):r.documentUrl.href},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(t){if(e.type(t)==="object")return t;var n=r.urlParseRE.exec(t||"")||[];return{href:n[0]||"",hrefNoHash:n[1]||"",hrefNoSearch:n[2]||"",domain:n[3]||"",protocol:n[4]||"",doubleSlash:n[5]||"",authority:n[6]||"",username:n[8]||"",password:n[9]||"",host:n[10]||"",hostname:n[11]||"",port:n[12]||"",pathname:n[13]||"",directory:n[14]||"",filename:n[15]||"",search:n[16]||"",hash:n[17]||""}},makePathAbsolute:function(e,t){var n,r,i,s;if(e&&e.charAt(0)==="/")return e;e=e||"",t=t?t.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"",n=t?t.split("/"):[],r=e.split("/");for(i=0;i<r.length;i++){s=r[i];switch(s){case".":break;case"..":n.length&&n.pop();break;default:n.push(s)}}return"/"+n.join("/")},isSameDomain:function(e,t){return r.parseUrl(e).domain.toLowerCase()===r.parseUrl(t).domain.toLowerCase()},isRelativeUrl:function(e){return r.parseUrl(e).protocol===""},isAbsoluteUrl:function(e){return r.parseUrl(e).protocol!==""},makeUrlAbsolute:function(e,t){if(!r.isRelativeUrl(e))return e;t===n&&(t=this.documentBase);var i=r.parseUrl(e),s=r.parseUrl(t),o=i.protocol||s.protocol,u=i.protocol?i.doubleSlash:i.doubleSlash||s.doubleSlash,a=i.authority||s.authority,f=i.pathname!=="",l=r.makePathAbsolute(i.pathname||s.filename,s.pathname),c=i.search||!f&&s.search||"",h=i.hash;return o+u+a+l+c+h},addSearchParams:function(t,n){var i=r.parseUrl(t),s=typeof n=="object"?e.param(n):n,o=i.search||"?";return i.hrefNoSearch+o+(o.charAt(o.length-1)!=="?"?"&":"")+s+(i.hash||"")},convertUrlToDataUrl:function(e){var n=e,i=r.parseUrl(e);return r.isEmbeddedPage(i)?n=i.hash.split(s)[0].replace(/^#/,"").replace(/\?.*$/,""):r.isSameDomain(i,this.documentBase)&&(n=i.hrefNoHash.replace(this.documentBase.domain,"").split(s)[0]),t.decodeURIComponent(n)},get:function(e){return e===n&&(e=r.parseLocation().hash),r.stripHash(e).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(e){location.hash=e},isPath:function(e){return/\//.test(e)},clean:function(e){return e.replace(this.documentBase.domain,"")},stripHash:function(e){return e.replace(/^#/,"")},stripQueryParams:function(e){return e.replace(/\?.*$/,"")},cleanHash:function(e){return r.stripHash(e.replace(/\?.*$/,"").replace(s,""))},isHashValid:function(e){return/^#[^#]+$/.test(e)},isExternal:function(e){var t=r.parseUrl(e);return!!t.protocol&&t.domain.toLowerCase()!==this.documentUrl.domain.toLowerCase()},hasProtocol:function(e){return/^(:?\w+:)/.test(e)},isEmbeddedPage:function(e){var t=r.parseUrl(e);return t.protocol!==""?!this.isPath(t.hash)&&t.hash&&(t.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&t.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(t.href)},squash:function(e,t){var n,i,s,o,u,a=this.isPath(e),f=this.parseUrl(e),l=f.hash,c="";t||(a?t=r.getLocation():(u=r.getDocumentUrl(!0),r.isPath(u.hash)?t=r.squash(u.href):t=u.href)),i=a?r.stripHash(e):e,i=r.isPath(f.hash)?r.stripHash(f.hash):i,o=i.indexOf(this.uiStateKey),o>-1&&(c=i.slice(o),i=i.slice(0,o)),n=r.makeUrlAbsolute(i,t),s=this.parseUrl(n).search;if(a){if(r.isPath(l)||l.replace("#","").indexOf(this.uiStateKey)===0)l="";c&&l.indexOf(this.uiStateKey)===-1&&(l+=c),l.indexOf("#")===-1&&l!==""&&(l="#"+l),n=r.parseUrl(n),n=n.protocol+n.doubleSlash+n.host+n.pathname+s+l}else n+=n.indexOf("#")>-1?c:"#"+c;return n},isPreservableHash:function(e){return e.replace("#","").indexOf(this.uiStateKey)===0},hashToSelector:function(e){var t=e.substring(0,1)==="#";return t&&(e=e.substring(1)),(t?"#":"")+e.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,"\\$1")},getFilePath:function(e){return e&&e.split(s)[0]},isFirstPageUrl:function(t){var i=r.parseUrl(r.makeUrlAbsolute(t,this.documentBase)),s=i.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&i.hrefNoHash===this.documentBase.hrefNoHash,o=e.mobile.firstPage,u=o&&o[0]?o[0].id:n;return s&&(!i.hash||i.hash==="#"||u&&i.hash.replace(/^#/,"")===u)},isPermittedCrossDomainRequest:function(t,n){return e.mobile.allowCrossDomainPages&&(t.protocol==="file:"||t.protocol==="content:")&&n.search(/^https?:/)!==-1}},r.documentUrl=r.parseLocation(),i=e("head").find("base"),r.documentBase=i.length?r.parseUrl(r.makeUrlAbsolute(i.attr("href"),r.documentUrl.href)):r.documentUrl,r.documentBaseDiffers=r.documentUrl.hrefNoHash!==r.documentBase.hrefNoHash,r.getDocumentBase=function(t){return t?e.extend({},r.documentBase):r.documentBase.href},e.extend(e.mobile,{getDocumentUrl:r.getDocumentUrl,getDocumentBase:r.getDocumentBase})}(e),function(e,t){e.mobile.links=function(t){e(t).find("a").jqmEnhanceable().filter(":jqmData(rel='popup')[href][href!='']").each(function(){var e=this,t=e.getAttribute("href").substring(1);t&&(e.setAttribute("aria-haspopup",!0),e.setAttribute("aria-owns",t),e.setAttribute("aria-expanded",!1))}).end().not(".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")}}(e),function(e,t){e.mobile.History=function(e,t){this.stack=e||[],this.activeIndex=t||0},e.extend(e.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(e,t){t=t||{},this.getNext()&&this.clearForward(),t.hash&&t.hash.indexOf("#")===-1&&(t.hash="#"+t.hash),t.url=e,this.stack.push(t),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(e,t,n){t=t||this.stack;var r,i,s=t.length,o;for(i=0;i<s;i++){r=t[i];if(decodeURIComponent(e)===decodeURIComponent(r.url)||decodeURIComponent(e)===decodeURIComponent(r.hash)){o=i;if(n)return o}}return o},closest:function(e){var n,r=this.activeIndex;return n=this.find(e,this.stack.slice(0,r)),n===t&&(n=this.find(e,this.stack.slice(r),!0),n=n===t?n:n+r),n},direct:function(n){var r=this.closest(n.url),i=this.activeIndex;r!==t&&(this.activeIndex=r,this.previousIndex=i),r<i?(n.present||n.back||e.noop)(this.getActive(),"back"):r>i?(n.present||n.forward||e.noop)(this.getActive(),"forward"):r===t&&n.missing&&n.missing(this.getActive())}})}(e),function(e,r){var i=e.mobile.path,s=location.href;e.mobile.Navigator=function(t){this.history=t,this.ignoreInitialHashChange=!0,e.mobile.window.bind({"popstate.history":e.proxy(this.popstate,this),"hashchange.history":e.proxy(this.hashchange,this)})},e.extend(e.mobile.Navigator.prototype,{squash:function(r,s){var o,u,a=i.isPath(r)?i.stripHash(r):r;return u=i.squash(r),o=e.extend({hash:a,url:u},s),t.history.replaceState(o,o.title||n.title,u),o},hash:function(e,t){var n,r,s,o;return n=i.parseUrl(e),r=i.parseLocation(),r.pathname+r.search===n.pathname+n.search?s=n.hash?n.hash:n.pathname+n.search:i.isPath(e)?(o=i.parseUrl(t),s=o.pathname+o.search+(i.isPreservableHash(o.hash)?o.hash.replace("#",""):"")):s=e,s},go:function(r,s,o){var u,a,f,l,c=e.event.special.navigate.isPushStateEnabled();a=i.squash(r),f=this.hash(r,a),o&&f!==i.stripHash(i.parseLocation().hash)&&(this.preventNextHashChange=o),this.preventHashAssignPopState=!0,t.location.hash=f,this.preventHashAssignPopState=!1,u=e.extend({url:a,hash:f,title:n.title},s),c&&(l=new e.Event("popstate"),l.originalEvent={type:"popstate",state:null},this.squash(r,u),o||(this.ignorePopState=!0,e.mobile.window.trigger(l))),this.history.add(u.url,u)},popstate:function(t){var n,r;if(!e.event.special.navigate.isPushStateEnabled())return;if(this.preventHashAssignPopState){this.preventHashAssignPopState=!1,t.stopImmediatePropagation();return}if(this.ignorePopState){this.ignorePopState=!1;return}if(!t.originalEvent.state&&this.history.stack.length===1&&this.ignoreInitialHashChange){this.ignoreInitialHashChange=!1;if(location.href===s){t.preventDefault();return}}n=i.parseLocation().hash;if(!t.originalEvent.state&&n){r=this.squash(n),this.history.add(r.url,r),t.historyState=r;return}this.history.direct({url:(t.originalEvent.state||{}).url||n,present:function(n,r){t.historyState=e.extend({},n),t.historyState.direction=r}})},hashchange:function(t){var r,s;if(!e.event.special.navigate.isHashChangeEnabled()||e.event.special.navigate.isPushStateEnabled())return;if(this.preventNextHashChange){this.preventNextHashChange=!1,t.stopImmediatePropagation();return}r=this.history,s=i.parseLocation().hash,this.history.direct({url:s,present:function(n,r){t.hashchangeState=e.extend({},n),t.hashchangeState.direction=r},missing:function(){r.add(s,{hash:s,title:n.title})}})}})}(e),function(e,t){e.mobile.navigate=function(t,n,r){e.mobile.navigate.navigator.go(t,n,r)},e.mobile.navigate.history=new e.mobile.History,e.mobile.navigate.navigator=new e.mobile.Navigator(e.mobile.navigate.history);var n=e.mobile.path.parseLocation();e.mobile.navigate.history.add(n.href,{hash:n.hash})}(e),function(e,t){var n=e("head").children("base"),r={element:n.length?n:e("<base>",{href:e.mobile.path.documentBase.hrefNoHash}).prependTo(e("head")),linkSelector:"[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]",set:function(t){if(!e.mobile.dynamicBaseEnabled)return;e.support.dynamicBaseTag&&r.element.attr("href",e.mobile.path.makeUrlAbsolute(t,e.mobile.path.documentBase))},rewrite:function(t,n){var i=e.mobile.path.get(t);n.find(r.linkSelector).each(function(t,n){var r=e(n).is("[href]")?"href":e(n).is("[src]")?"src":"action",s=e.mobile.path.parseLocation(),o=e(n).attr(r);o=o.replace(s.protocol+s.doubleSlash+s.host+s.pathname,""),/^(\w+:|#|\/)/.test(o)||e(n).attr(r,i+o)})},reset:function(){r.element.attr("href",e.mobile.path.documentBase.hrefNoSearch)}};e.mobile.base=r}(e),function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a={},f=t.split(".")[0];return t=t.split(".")[1],i=f+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[f]=e[f]||{},s=e[f][t],o=e[f][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,r){if(!e.isFunction(r)){a[t]=r;return}a[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},i=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=i,s=r.apply(this,arguments),this._super=t,this._superApply=n,s}}()}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix||t:t},a,{constructor:o,namespace:f,widgetName:t,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(o==="instance")return f=i,!1;if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&e.effects.effect[u]?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}})}(e),function(e,t){var n=/[A-Z]/g,r=function(e){return"-"+e.toLowerCase()};e.extend(e.Widget.prototype,{_getCreateOptions:function(){var t,i,s=this.element[0],o={};if(!e.mobile.getAttribute(s,"defaults"))for(t in this.options)i=e.mobile.getAttribute(s,t.replace(n,r)),i!=null&&(o[t]=i);return o}}),e.mobile.widget=e.Widget}(e),function(e,t){e.mobile.widgets={};var n=e.widget,r=e.mobile.keepNative;e.widget=function(n){return function(){var r=n.apply(this,arguments),i=r.prototype.widgetName;return r.initSelector=r.prototype.initSelector!==t?r.prototype.initSelector:":jqmData(role='"+i+"')",e.mobile.widgets[i]=r,r}}(e.widget),e.extend(e.widget,n),e.mobile.document.on("create",function(t){e(t.target).enhanceWithin()}),e.widget("mobile.page",{options:{theme:"a",domCache:!1,keepNativeDefault:e.mobile.keepNative,contentTheme:null,enhanced:!1},_createWidget:function(){e.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_create:function(){if(this._trigger("beforecreate")===!1)return!1;this.options.enhanced||this._enhance(),this._on(this.element,{pagebeforehide:"removeContainerBackground",pagebeforeshow:"_handlePageBeforeShow"}),this.element.enhanceWithin(),e.mobile.getAttribute(this.element[0],"role")==="dialog"&&e.mobile.dialog&&this.element.dialog()},_enhance:function(){var n="data-"+e.mobile.ns,r=this;this.options.role&&this.element.attr("data-"+e.mobile.ns+"role",this.options.role),this.element.attr("tabindex","0").addClass("ui-page ui-page-theme-"+this.options.theme),this.element.find("["+n+"role='content']").each(function(){var i=e(this),s=this.getAttribute(n+"theme")||t;r.options.contentTheme=s||r.options.contentTheme||r.options.dialog&&r.options.theme||r.element.jqmData("role")==="dialog"&&r.options.theme,i.addClass("ui-content"),r.options.contentTheme&&i.addClass("ui-body-"+r.options.contentTheme),i.attr("role","main").addClass("ui-content")})},bindRemove:function(t){var n=this.element;!n.data("mobile-page").options.domCache&&n.is(":jqmData(external-page='true')")&&n.bind("pagehide.remove",t||function(t,n){if(!n.samePage){var r=e(this),i=new e.Event("pageremove");r.trigger(i),i.isDefaultPrevented()||r.removeWithDependents()}})},_setOptions:function(n){n.theme!==t&&this.element.removeClass("ui-page-theme-"+this.options.theme).addClass("ui-page-theme-"+n.theme),n.contentTheme!==t&&this.element.find("[data-"+e.mobile.ns+"='content']").removeClass("ui-body-"+this.options.contentTheme).addClass("ui-body-"+n.contentTheme)},_handlePageBeforeShow:function(){this.setContainerBackground()},removeContainerBackground:function(){this.element.closest(":mobile-pagecontainer").pagecontainer({theme:"none"})},setContainerBackground:function(e){this.element.parent().pagecontainer({theme:e||this.options.theme})},keepNativeSelector:function(){var t=this.options,n=e.trim(t.keepNative||""),i=e.trim(e.mobile.keepNative),s=e.trim(t.keepNativeDefault),o=r===i?"":i,u=o===""?s:"";return(n?[n]:[]).concat(o?[o]:[]).concat(u?[u]:[]).join(", ")}})}(e),function(e,t,n){e.mobile.Transition=function(){this.init.apply(this,arguments)},e.extend(e.mobile.Transition.prototype,{toPreClass:" ui-page-pre-in",init:function(t,n,r,i){e.extend(this,{name:t,reverse:n,$to:r,$from:i,deferred:new e.Deferred})},cleanFrom:function(){this.$from.removeClass(e.mobile.activePageClass+" out in reverse "+this.name).height("")},beforeDoneIn:function(){},beforeDoneOut:function(){},beforeStartOut:function(){},doneIn:function(){this.beforeDoneIn(),this.$to.removeClass("out in reverse "+this.name).height(""),this.toggleViewportClass(),e.mobile.window.scrollTop()!==this.toScroll&&this.scrollPage(),this.sequential||this.$to.addClass(e.mobile.activePageClass),this.deferred.resolve(this.name,this.reverse,this.$to,this.$from,!0)},doneOut:function(e,t,n,r){this.beforeDoneOut(),this.startIn(e,t,n,r)},hideIn:function(e){this.$to.css("z-index",-10),e.call(this),this.$to.css("z-index","")},scrollPage:function(){e.event.special.scrollstart.enabled=!1,(e.mobile.hideUrlBar||this.toScroll!==e.mobile.defaultHomeScroll)&&t.scrollTo(0,this.toScroll),setTimeout(function(){e.event.special.scrollstart.enabled=!0},150)},startIn:function(t,n,r,i){this.hideIn(function(){this.$to.addClass(e.mobile.activePageClass+this.toPreClass),i||e.mobile.focusPage(this.$to),this.$to.height(t+this.toScroll),r||this.scrollPage()}),this.$to.removeClass(this.toPreClass).addClass(this.name+" in "+n),r?this.doneIn():this.$to.animationComplete(e.proxy(function(){this.doneIn()},this))},startOut:function(t,n,r){this.beforeStartOut(t,n,r),this.$from.height(t+e.mobile.window.scrollTop()).addClass(this.name+" out"+n)},toggleViewportClass:function(){e.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+this.name)},transition:function(){var t,n=this.reverse?" reverse":"",r=e.mobile.getScreenHeight(),i=e.mobile.maxTransitionWidth!==!1&&e.mobile.window.width()>e.mobile.maxTransitionWidth;return this.toScroll=e.mobile.navigate.history.getActive().lastScroll||e.mobile.defaultHomeScroll,t=!e.support.cssTransitions||!e.support.cssAnimations||i||!this.name||this.name==="none"||Math.max(e.mobile.window.scrollTop(),this.toScroll)>e.mobile.getMaxScrollForTransition(),this.toggleViewportClass(),this.$from&&!t?this.startOut(r,n,t):this.doneOut(r,n,t,!0),this.deferred.promise()}})}(e,this),function(e){e.mobile.SerialTransition=function(){this.init.apply(this,arguments)},e.extend(e.mobile.SerialTransition.prototype,e.mobile.Transition.prototype,{sequential:!0,beforeDoneOut:function(){this.$from&&this.cleanFrom()},beforeStartOut:function(t,n,r){this.$from.animationComplete(e.proxy(function(){this.doneOut(t,n,r)},this))}})}(e),function(e){e.mobile.ConcurrentTransition=function(){this.init.apply(this,arguments)},e.extend(e.mobile.ConcurrentTransition.prototype,e.mobile.Transition.prototype,{sequential:!1,beforeDoneIn:function(){this.$from&&this.cleanFrom()},beforeStartOut:function(e,t,n){this.doneOut(e,t,n)}})}(e),function(e){var t=function(){return e.mobile.getScreenHeight()*3};e.mobile.transitionHandlers={sequential:e.mobile.SerialTransition,simultaneous:e.mobile.ConcurrentTransition},e.mobile.defaultTransitionHandler=e.mobile.transitionHandlers.sequential,e.mobile.transitionFallbacks={},e.mobile._maybeDegradeTransition=function(t){return t&&!e.support.cssTransform3d&&e.mobile.transitionFallbacks[t]&&(t=e.mobile.transitionFallbacks[t]),t},e.mobile.getMaxScrollForTransition=e.mobile.getMaxScrollForTransition||t}(e),function(e,r){e.widget("mobile.pagecontainer",{options:{theme:"a"},initSelector:!1,_create:function(){this._trigger("beforecreate"),this.setLastScrollEnabled=!0,this._on(this.window,{navigate:"_disableRecordScroll",scrollstop:"_delayedRecordScroll"}),this._on(this.window,{navigate:"_filterNavigateEvents"}),this._on({pagechange:"_afterContentChange"}),this.window.one("navigate",e.proxy(function(){this.setLastScrollEnabled=!0},this))},_setOptions:function(e){e.theme!==r&&e.theme!=="none"?this.element.removeClass("ui-overlay-"+this.options.theme).addClass("ui-overlay-"+e.theme):e.theme!==r&&this.element.removeClass("ui-overlay-"+this.options.theme),this._super(e)},_disableRecordScroll:function(){this.setLastScrollEnabled=!1},_enableRecordScroll:function(){this.setLastScrollEnabled=!0},_afterContentChange:function(){this.setLastScrollEnabled=!0,this._off(this.window,"scrollstop"),this._on(this.window,{scrollstop:"_delayedRecordScroll"})},_recordScroll:function(){if(!this.setLastScrollEnabled)return;var e=this._getActiveHistory(),t,n,r;e&&(t=this._getScroll(),n=this._getMinScroll(),r=this._getDefaultScroll(),e.lastScroll=t<n?r:t)},_delayedRecordScroll:function(){setTimeout(e.proxy(this,"_recordScroll"),100)},_getScroll:function(){return this.window.scrollTop()},_getMinScroll:function(){return e.mobile.minScrollBack},_getDefaultScroll:function(){return e.mobile.defaultHomeScroll},_filterNavigateEvents:function(t,n){var r;if(t.originalEvent&&t.originalEvent.isDefaultPrevented())return;r=t.originalEvent.type.indexOf("hashchange")>-1?n.state.hash:n.state.url,r||(r=this._getHash());if(!r||r==="#"||r.indexOf("#"+e.mobile.path.uiStateKey)===0)r=location.href;this._handleNavigate(r,n.state)},_getHash:function(){return e.mobile.path.parseLocation().hash},getActivePage:function(){return this.activePage},_getInitialContent:function(){return e.mobile.firstPage},_getHistory:function(){return e.mobile.navigate.history},_getActiveHistory:function(){return this._getHistory().getActive()},_getDocumentBase:function(){return e.mobile.path.documentBase},back:function(){this.go(-1)},forward:function(){this.go(1)},go:function(n){if(e.mobile.hashListeningEnabled)t.history.go(n);else{var r=e.mobile.navigate.history.activeIndex,i=r+parseInt(n,10),s=e.mobile.navigate.history.stack[i].url,o=n>=1?"forward":"back";e.mobile.navigate.history.activeIndex=i,e.mobile.navigate.history.previousIndex=r,this.change(s,{direction:o,changeHash:!1,fromHashChange:!0})}},_handleDestination:function(t){var n;return e.type(t)==="string"&&(t=e.mobile.path.stripHash(t)),t&&(n=this._getHistory(),t=e.mobile.path.isPath(t)?t:e.mobile.path.makeUrlAbsolute("#"+t,this._getDocumentBase())),t||this._getInitialContent()},_transitionFromHistory:function(e,t){var n=this._getHistory(),r=e==="back"?n.getLast():n.getActive();return r&&r.transition||t},_handleDialog:function(t,n){var r,i,s=this.getActivePage();return s&&!s.data("mobile-dialog")?(n.direction==="back"?this.back():this.forward(),!1):(r=n.pageUrl,i=this._getActiveHistory(),e.extend(t,{role:i.role,transition:this._transitionFromHistory(n.direction,t.transition),reverse:n.direction==="back"}),r)},_handleNavigate:function(t,n){var r=e.mobile.path.stripHash(t),i=this._getHistory(),s=i.stack.length===0?"none":this._transitionFromHistory(n.direction),o={changeHash:!1,fromHashChange:!0,reverse:n.direction==="back"};e.extend(o,n,{transition:s});if(i.activeIndex>0&&r.indexOf(e.mobile.dialogHashKey)>-1){r=this._handleDialog(o,n);if(r===!1)return}this._changeContent(this._handleDestination(r),o)},_changeContent:function(t,n){e.mobile.changePage(t,n)},_getBase:function(){return e.mobile.base},_getNs:function(){return e.mobile.ns},_enhance:function(e,t){return e.page({role:t})},_include:function(e,t){e.appendTo(this.element),this._enhance(e,t.role),e.page("bindRemove")},_find:function(t){var n=this._createFileUrl(t),r=this._createDataUrl(t),i,s=this._getInitialContent();return i=this.element.children("[data-"+this._getNs()+"url='"+e.mobile.path.hashToSelector(r)+"']"),i.length===0&&r&&!e.mobile.path.isPath(r)&&(i=this.element.children(e.mobile.path.hashToSelector("#"+r)).attr("data-"+this._getNs()+"url",r).jqmData("url",r)),i.length===0&&e.mobile.path.isFirstPageUrl(n)&&s&&s.parent().length&&(i=e(s)),i},_getLoader:function(){return e.mobile.loading()},_showLoading:function(t,n,r,i){if(this._loadMsg)return;this._loadMsg=setTimeout(e.proxy(function(){this._getLoader().loader("show",n,r,i),this._loadMsg=0},this),t)},_hideLoading:function(){clearTimeout(this._loadMsg),this._loadMsg=0,this._getLoader().loader("hide")},_showError:function(){this._hideLoading(),this._showLoading(0,e.mobile.pageLoadErrorMessageTheme,e.mobile.pageLoadErrorMessage,!0),setTimeout(e.proxy(this,"_hideLoading"),1500)},_parse:function(t,n){var r,i=e("<div></div>");return i.get(0).innerHTML=t,r=i.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),r.length||(r=e("<div data-"+this._getNs()+"role='page'>"+(t.split(/<\/?body[^>]*>/gmi)[1]||"")+"</div>")),r.attr("data-"+this._getNs()+"url",this._createDataUrl(n)).attr("data-"+this._getNs()+"external-page",!0),r},_setLoadedTitle:function(t,n){var r=n.match(/<title[^>]*>([^<]*)/)&&RegExp.$1;r&&!t.jqmData("title")&&(r=e("<div>"+r+"</div>").text(),t.jqmData("title",r))},_isRewritableBaseTag:function(){return e.mobile.dynamicBaseEnabled&&!e.support.dynamicBaseTag},_createDataUrl:function(t){return e.mobile.path.convertUrlToDataUrl(t)},_createFileUrl:function(t){return e.mobile.path.getFilePath(t)},_triggerWithDeprecated:function(t,n,r){var i=e.Event("page"+t),s=e.Event(this.widgetName+t);return(r||this.element).trigger(i,n),this._trigger(t,s,n),{deprecatedEvent:i,event:s}},_loadSuccess:function(t,n,i,s){var o=this._createFileUrl(t);return e.proxy(function(u,a,f){var l,c=new RegExp("(<[^>]+\\bdata-"+this._getNs()+"role=[\"']?page[\"']?[^>]*>)"),h=new RegExp("\\bdata-"+this._getNs()+"url=[\"']?([^\"'>]*)[\"']?");c.test(u)&&RegExp.$1&&h.test(RegExp.$1)&&RegExp.$1&&(o=e.mobile.path.getFilePath(e("<div>"+RegExp.$1+"</div>").text()),o=this.window[0].encodeURIComponent(o)),i.prefetch===r&&this._getBase().set(o),l=this._parse(u,o),this._setLoadedTitle(l,u),n.xhr=f,n.textStatus=a,n.page=l,n.content=l,n.toPage=l;if(this._triggerWithDeprecated("load",n).event.isDefaultPrevented())return;this._isRewritableBaseTag()&&l&&this._getBase().rewrite(o,l),this._include(l,i),i.showLoadMsg&&this._hideLoading(),s.resolve(t,i,l)},this)},_loadDefaults:{type:"get",data:r,reloadPage:!1,reload:!1,role:r,showLoadMsg:!1,loadMsgDelay:50},load:function(t,n){var i=n&&n.deferred||e.Deferred(),s=n&&n.reload===r&&n.reloadPage!==r?{reload:n.reloadPage}:{},o=e.extend({},this._loadDefaults,n,s),u=null,a=e.mobile.path.makeUrlAbsolute(t,this._findBaseWithDefault()),f,l,c,h;return o.data&&o.type==="get"&&(a=e.mobile.path.addSearchParams(a,o.data),o.data=r),o.data&&o.type==="post"&&(o.reload=!0),f=this._createFileUrl(a),l=this._createDataUrl(a),u=this._find(a),u.length===0&&e.mobile.path.isEmbeddedPage(f)&&!e.mobile.path.isFirstPageUrl(f)?(i.reject(a,o),i.promise()):(this._getBase().reset(),u.length&&!o.reload?(this._enhance(u,o.role),i.resolve(a,o,u),o.prefetch||this._getBase().set(t),i.promise()):(h={url:t,absUrl:a,toPage:t,prevPage:n?n.fromPage:r,dataUrl:l,deferred:i,options:o},c=this._triggerWithDeprecated("beforeload",h),c.deprecatedEvent.isDefaultPrevented()||c.event.isDefaultPrevented()?i.promise():(o.showLoadMsg&&this._showLoading(o.loadMsgDelay),o.prefetch===r&&this._getBase().reset(),!e.mobile.allowCrossDomainPages&&!e.mobile.path.isSameDomain(e.mobile.path.documentUrl,a)?(i.reject(a,o),i.promise()):(e.ajax({url:f,type:o.type,data:o.data,contentType:o.contentType,dataType:"html",success:this._loadSuccess(a,h,o,i),error:this._loadError(a,h,o,i)}),i.promise()))))},_loadError:function(t,n,r,i){return e.proxy(function(s,o,u){this._getBase().set(e.mobile.path.get()),n.xhr=s,n.textStatus=o,n.errorThrown=u;var a=this._triggerWithDeprecated("loadfailed",n);if(a.deprecatedEvent.isDefaultPrevented()||a.event.isDefaultPrevented())return;r.showLoadMsg&&this._showError(),i.reject(t,r)},this)},_getTransitionHandler:function(t){return t=e.mobile._maybeDegradeTransition(t),e.mobile.transitionHandlers[t]||e.mobile.defaultTransitionHandler},_triggerCssTransitionEvents:function(t,n,r){var i=!1;r=r||"",n&&(t[0]===n[0]&&(i=!0),this._triggerWithDeprecated(r+"hide",{nextPage:t,toPage:t,prevPage:n,samePage:i},n)),this._triggerWithDeprecated(r+"show",{prevPage:n||e(""),toPage:t},t)},_cssTransition:function(t,n,r){var i=r.transition,s=r.reverse,o=r.deferred,u,a;this._triggerCssTransitionEvents(t,n,"before"),this._hideLoading(),u=this._getTransitionHandler(i),a=(new u(i,s,t,n)).transition(),a.done(e.proxy(function(){this._triggerCssTransitionEvents(t,n)},this)),a.done(function(){o.resolve.apply(o,arguments)})},_releaseTransitionLock:function(){s=!1,i.length>0&&e.mobile.changePage.apply(null,i.pop())},_removeActiveLinkClass:function(t){e.mobile.removeActiveLinkClass(t)},_loadUrl:function(t,n,r){r.target=t,r.deferred=e.Deferred(),this.load(t,r),r.deferred.done(e.proxy(function(e,t,r){s=!1,t.absUrl=n.absUrl,this.transition(r,n,t)},this)),r.deferred.fail(e.proxy(function(){this._removeActiveLinkClass(!0),this._releaseTransitionLock(),this._triggerWithDeprecated("changefailed",n)},this))},_triggerPageBeforeChange:function(t,n,r){var i;return n.prevPage=this.activePage,e.extend(n,{toPage:t,options:r}),e.type(t)==="string"?n.absUrl=e.mobile.path.makeUrlAbsolute(t,this._findBaseWithDefault()):n.absUrl=r.absUrl,i=this._triggerWithDeprecated("beforechange",n),i.event.isDefaultPrevented()||i.deprecatedEvent.isDefaultPrevented()?!1:!0},change:function(t,n){if(s){i.unshift(arguments);return}var r=e.extend({},e.mobile.changePage.defaults,n),o={};r.fromPage=r.fromPage||this.activePage;if(!this._triggerPageBeforeChange(t,o,r))return;t=o.toPage,e.type(t)==="string"?(s=!0,this._loadUrl(t,o,r)):this.transition(t,o,r)},transition:function(t,o,u){var a,f,l,c,h,p,d,v,m,g,y,b,w,E;if(s){i.unshift([t,u]);return}if(!this._triggerPageBeforeChange(t,o,u))return;o.prevPage=u.fromPage,E=this._triggerWithDeprecated("beforetransition",o);if(E.deprecatedEvent.isDefaultPrevented()||E.event.isDefaultPrevented())return;s=!0,t[0]===e.mobile.firstPage[0]&&!u.dataUrl&&(u.dataUrl=e.mobile.path.documentUrl.hrefNoHash),a=u.fromPage,f=u.dataUrl&&e.mobile.path.convertUrlToDataUrl(u.dataUrl)||t.jqmData("url"),l=f,c=e.mobile.path.getFilePath(f),h=e.mobile.navigate.history.getActive(),p=e.mobile.navigate.history.activeIndex===0,d=0,v=n.title,m=(u.role==="dialog"||t.jqmData("role")==="dialog")&&t.jqmData("dialog")!==!0;if(a&&a[0]===t[0]&&!u.allowSamePageTransition){s=!1,this._triggerWithDeprecated("transition",o),this._triggerWithDeprecated("change",o),u.fromHashChange&&e.mobile.navigate.history.direct({url:f});return}t.page({role:u.role}),u.fromHashChange&&(d=u.direction==="back"?-1:1);try{n.activeElement&&n.activeElement.nodeName.toLowerCase()!=="body"?e(n.activeElement).blur():e("input:focus, textarea:focus, select:focus").blur()}catch(S){}g=!1,m&&h&&(h.url&&h.url.indexOf(e.mobile.dialogHashKey)>-1&&this.activePage&&!this.activePage.hasClass("ui-dialog")&&e.mobile.navigate.history.activeIndex>0&&(u.changeHash=!1,g=!0),f=h.url||"",!g&&f.indexOf("#")>-1?f+=e.mobile.dialogHashKey:f+="#"+e.mobile.dialogHashKey),y=h?t.jqmData("title")||t.children(":jqmData(role='header')").find(".ui-title").text():v,!!y&&v===n.title&&(v=y),t.jqmData("title")||t.jqmData("title",v),u.transition=u.transition||(d&&!p?h.transition:r)||(m?e.mobile.defaultDialogTransition:e.mobile.defaultPageTransition),!d&&g&&(e.mobile.navigate.history.getActive().pageUrl=l),f&&!u.fromHashChange&&(!e.mobile.path.isPath(f)&&f.indexOf("#")<0&&(f="#"+f),b={transition:u.transition,title:v,pageUrl:l,role:u.role},u.changeHash!==!1&&e.mobile.hashListeningEnabled?e.mobile.navigate(this.window[0].encodeURI(f),b,!0):t[0]!==e.mobile.firstPage[0]&&e.mobile.navigate.history.add(f,b)),n.title=v,e.mobile.activePage=t,this.activePage=t,u.reverse=u.reverse||d<0,w=e.Deferred(),this._cssTransition(t,a,{transition:u.transition,reverse:u.reverse,deferred:w}),w.done(e.proxy(function(n,r,i,s,a){e.mobile.removeActiveLinkClass(),u.duplicateCachedPage&&u.duplicateCachedPage.remove(),a||e.mobile.focusPage(t),this._releaseTransitionLock(),this._triggerWithDeprecated("transition",o),this._triggerWithDeprecated("change",o)},this))},_findBaseWithDefault:function(){var t=this.activePage&&e.mobile.getClosestBaseUrl(this.activePage);return t||e.mobile.path.documentBase.hrefNoHash}}),e.mobile.navreadyDeferred=e.Deferred();var i=[],s=!1}(e),function(e,r){function f(e){while(e){if(typeof e.nodeName=="string"&&e.nodeName.toLowerCase()==="a")break;e=e.parentNode}return e}var i=e.Deferred(),s=e.Deferred(),o=function(){s.resolve(),s=null},u=e.mobile.path.documentUrl,a=null;e.mobile.loadPage=function(t,n){var r;return n=n||{},r=n.pageContainer||e.mobile.pageContainer,n.deferred=e.Deferred(),r.pagecontainer("load",t,n),n.deferred.promise()},e.mobile.back=function(){var n=t.navigator;this.phonegapNavigationEnabled&&n&&n.app&&n.app.backHistory?n.app.backHistory():e.mobile.pageContainer.pagecontainer("back")},e.mobile.focusPage=function(e){var t=e.find("[autofocus]"),n=e.find(".ui-title:eq(0)");if(t.length){t.focus();return}n.length?n.focus():e.focus()},e.mobile._maybeDegradeTransition=e.mobile._maybeDegradeTransition||function(e){return e},e.mobile.changePage=function(t,n){e.mobile.pageContainer.pagecontainer("change",t,n)},e.mobile.changePage.defaults={transition:r,reverse:!1,changeHash:!0,fromHashChange:!1,role:r,duplicateCachedPage:r,pageContainer:r,showLoadMsg:!0,dataUrl:r,fromPage:r,allowSamePageTransition:!1},e.mobile._registerInternalEvents=function(){var n=function(t,n){var r,i=!0,s,o,f;return!e.mobile.ajaxEnabled||t.is(":jqmData(ajax='false')")||!t.jqmHijackable().length||t.attr("target")?!1:(r=a&&a.attr("formaction")||t.attr("action"),f=(t.attr("method")||"get").toLowerCase(),r||(r=e.mobile.getClosestBaseUrl(t),f==="get"&&(r=e.mobile.path.parseUrl(r).hrefNoSearch),r===e.mobile.path.documentBase.hrefNoHash&&(r=u.hrefNoSearch)),r=e.mobile.path.makeUrlAbsolute(r,e.mobile.getClosestBaseUrl(t)),e.mobile.path.isExternal(r)&&!e.mobile.path.isPermittedCrossDomainRequest(u,r)?!1:(n||(s=t.serializeArray(),a&&a[0].form===t[0]&&(o=a.attr("name"),o&&(e.each(s,function(e,t){if(t.name===o)return o="",!1}),o&&s.push({name:o,value:a.attr("value")}))),i={url:r,options:{type:f,data:e.param(s),transition:t.jqmData("transition"),reverse:t.jqmData("direction")==="reverse",reloadPage:!0}}),i))};e.mobile.document.delegate("form","submit",function(t){var r;t.isDefaultPrevented()||(r=n(e(this)),r&&(e.mobile.changePage(r.url,r.options),t.preventDefault()))}),e.mobile.document.bind("vclick",function(t){var r,i,s=t.target,o=!1;if(t.which>1||!e.mobile.linkBindingEnabled)return;a=e(s);if(e.data(s,"mobile-button")){if(!n(e(s).closest("form"),!0))return;s.parentNode&&(s=s.parentNode)}else{s=f(s);if(!s||e.mobile.path.parseUrl(s.getAttribute("href")||"#").hash==="#")return;if(!e(s).jqmHijackable().length)return}~s.className.indexOf("ui-link-inherit")?s.parentNode&&(i=e.data(s.parentNode,"buttonElements")):i=e.data(s,"buttonElements"),i?s=i.outer:o=!0,r=e(s),o&&(r=r.closest(".ui-btn")),r.length>0&&!r.hasClass("ui-state-disabled")&&(e.mobile.removeActiveLinkClass(!0),e.mobile.activeClickedLink=r,e.mobile.activeClickedLink.addClass(e.mobile.activeBtnClass))}),e.mobile.document.bind("click",function(n){if(!e.mobile.linkBindingEnabled||n.isDefaultPrevented())return;var i=f(n.target),s=e(i),o=function(){t.setTimeout(function(){e.mobile.removeActiveLinkClass(!0)},200)},a,l,c,h,p,d,v;e.mobile.activeClickedLink&&e.mobile.activeClickedLink[0]===n.target.parentNode&&o();if(!i||n.which>1||!s.jqmHijackable().length)return;if(s.is(":jqmData(rel='back')"))return e.mobile.back(),!1;a=e.mobile.getClosestBaseUrl(s),l=e.mobile.path.makeUrlAbsolute(s.attr("href")||"#",a);if(!e.mobile.ajaxEnabled&&!e.mobile.path.isEmbeddedPage(l)){o();return}if(l.search("#")!==-1&&(!e.mobile.path.isExternal(l)||!e.mobile.path.isAbsoluteUrl(l))){l=l.replace(/[^#]*#/,"");if(!l){n.preventDefault();return}e.mobile.path.isPath(l)?l=e.mobile.path.makeUrlAbsolute(l,a):l=e.mobile.path.makeUrlAbsolute("#"+l,u.hrefNoHash)}c=s.is("[rel='external']")||s.is(":jqmData(ajax='false')")||s.is("[target]"),h=c||e.mobile.path.isExternal(l)&&!e.mobile.path.isPermittedCrossDomainRequest(u,l);if(h){o();return}p=s.jqmData("transition"),d=s.jqmData("direction")==="reverse"||s.jqmData("back"),v=s.attr("data-"+e.mobile.ns+"rel")||r,e.mobile.changePage(l,{transition:p,reverse:d,role:v,link:s}),n.preventDefault()}),e.mobile.document.delegate(".ui-page","pageshow.prefetch",function(){var t=[];e(this).find("a:jqmData(prefetch)").each(function(){var n=e(this),r=n.attr("href");r&&e.inArray(r,t)===-1&&(t.push(r),e.mobile.loadPage(r,{role:n.attr("data-"+e.mobile.ns+"rel"),prefetch:!0}))})}),e.mobile.pageContainer.pagecontainer(),e.mobile.document.bind("pageshow",function(){s?s.done(e.mobile.resetActivePageHeight):e.mobile.resetActivePageHeight()}),e.mobile.window.bind("throttledresize",e.mobile.resetActivePageHeight)},e(function(){i.resolve()}),n.readyState==="complete"?o():e.mobile.window.load(o),e.when(i,e.mobile.navreadyDeferred).done(function(){e.mobile._registerInternalEvents()})}(e),function(e){var t=e("meta[name=viewport]"),n=t.attr("content"),r=n+",maximum-scale=1, user-scalable=no",i=n+",maximum-scale=10, user-scalable=yes",s=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(n);e.mobile.zoom=e.extend({},{enabled:!s,locked:!1,disable:function(n){!s&&!e.mobile.zoom.locked&&(t.attr("content",r),e.mobile.zoom.enabled=!1,e.mobile.zoom.locked=n||!1)},enable:function(n){!s&&(!e.mobile.zoom.locked||n===!0)&&(t.attr("content",i),e.mobile.zoom.enabled=!0,e.mobile.zoom.locked=!1)},restore:function(){s||(t.attr("content",n),e.mobile.zoom.enabled=!0)}})}(e),function(e,t){function f(e){i=e.originalEvent,a=i.accelerationIncludingGravity,s=Math.abs(a.x),o=Math.abs(a.y),u=Math.abs(a.z),!t.orientation&&(s>7||(u>6&&o<8||u<8&&o>6)&&s>5)?r.enabled&&r.disable():r.enabled||r.enable()}e.mobile.iosorientationfixEnabled=!0;var n=navigator.userAgent,r,i,s,o,u,a;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(n)&&n.indexOf("AppleWebKit")>-1)){e.mobile.iosorientationfixEnabled=!1;return}r=e.mobile.zoom,e.mobile.document.on("mobileinit",function(){e.mobile.iosorientationfixEnabled&&e.mobile.window.bind("orientationchange.iosorientationfix",r.enable).bind("devicemotion.iosorientationfix",f)})}(e,this),function(e,t){function r(t){var r,i=t.length,s=[];for(r=0;r<i;r++)t[r].className.match(n)||s.push(t[r]);return e(s)}var n=/\bui-screen-hidden\b/;e.mobile.behaviors.addFirstLastClasses={_getVisibles:function(e,t){var n;return t?n=r(e):(n=e.filter(":visible"),n.length===0&&(n=r(e))),n},_addFirstLastClasses:function(e,t,n){e.removeClass("ui-first-child ui-last-child"),t.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),n||this.element.trigger("updatelayout")},_removeFirstLastClasses:function(e){e.removeClass("ui-first-child ui-last-child")}}}(e),function(e,t){e.widget("mobile.controlgroup",e.extend({options:{enhanced:!1,theme:null,shadow:!1,corners:!0,excludeInvisible:!0,type:"vertical",mini:!1},_create:function(){var t=this.element,n=this.options,r=e.mobile.page.prototype.keepNativeSelector();e.fn.buttonMarkup&&this.element.find(e.fn.buttonMarkup.initSelector).not(r).buttonMarkup(),e.each(this._childWidgets,e.proxy(function(t,n){e.mobile[n]&&this.element.find(e.mobile[n].initSelector).not(r)[n]()},this)),e.extend(this,{_ui:null,_initialRefresh:!0}),n.enhanced?this._ui={groupLegend:t.children(".ui-controlgroup-label").children(),childWrapper:t.children(".ui-controlgroup-controls")}:this._ui=this._enhance()},_childWidgets:["checkboxradio","selectmenu","button"],_themeClassFromOption:function(e){return e?e==="none"?"":"ui-group-theme-"+e:""},_enhance:function(){var t=this.element,n=this.options,r={groupLegend:t.children("legend"),childWrapper:t.addClass("ui-controlgroup ui-controlgroup-"+(n.type==="horizontal"?"horizontal":"vertical")+" "+this._themeClassFromOption(n.theme)+" "+(n.corners?"ui-corner-all ":"")+(n.mini?"ui-mini ":"")).wrapInner("<div class='ui-controlgroup-controls "+(n.shadow===!0?"ui-shadow":"")+"'></div>").children()};return r.groupLegend.length>0&&e("<div role='heading' class='ui-controlgroup-label'></div>").append(r.groupLegend).prependTo(t),r},_init:function(){this.refresh()},_setOptions:function(e){var n,r,i=this.element;return e.type!==t&&(i.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-"+(e.type==="horizontal"?"horizontal":"vertical")),n=!0),e.theme!==t&&i.removeClass(this._themeClassFromOption(this.options.theme)).addClass(this._themeClassFromOption(e.theme)),e.corners!==t&&i.toggleClass("ui-corner-all",e.corners),e.mini!==t&&i.toggleClass("ui-mini",e.mini),e.shadow!==t&&this._ui.childWrapper.toggleClass("ui-shadow",e.shadow),e.excludeInvisible!==t&&(this.options.excludeInvisible=e.excludeInvisible,n=!0),r=this._super(e),n&&this.refresh(),r},container:function(){return this._ui.childWrapper},refresh:function(){var t=this.container(),n=t.find(".ui-btn").not(".ui-slider-handle"),r=this._initialRefresh;e.mobile.checkboxradio&&t.find(":mobile-checkboxradio").checkboxradio("refresh"),this._addFirstLastClasses(n,this.options.excludeInvisible?this._getVisibles(n,r):n,r),this._initialRefresh=!1},_destroy:function(){var e,t,n=this.options;if(n.enhanced)return this;e=this._ui,t=this.element.removeClass("ui-controlgroup ui-controlgroup-horizontal ui-controlgroup-vertical ui-corner-all ui-mini "+this._themeClassFromOption(n.theme)).find(".ui-btn").not(".ui-slider-handle"),this._removeFirstLastClasses(t),e.groupLegend.unwrap(),e.childWrapper.children().unwrap()}},e.mobile.behaviors.addFirstLastClasses))}(e),function(e,t){e.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}}}(e),function(e,t){var n=e.mobile.path.hashToSelector;e.widget("mobile.checkboxradio",e.extend({initSelector:"input:not( :jqmData(role='flipswitch' ) )[type='checkbox'],input[type='radio']:not( :jqmData(role='flipswitch' ))",options:{theme:"inherit",mini:!1,wrapperClass:null,enhanced:!1,iconpos:"left"},_create:function(){var t=this.element,n=this.options,r=function(e,t){return e.jqmData(t)||e.closest("form, fieldset").jqmData(t)},i=this.options.enhanced?{element:this.element.siblings("label"),isParent:!1}:this._findLabel(),s=t[0].type,o="ui-"+s+"-on",u="ui-"+s+"-off";if(s!=="checkbox"&&s!=="radio")return;this.element[0].disabled&&(this.options.disabled=!0),n.iconpos=r(t,"iconpos")||i.element.attr("data-"+e.mobile.ns+"iconpos")||n.iconpos,n.mini=r(t,"mini")||n.mini,e.extend(this,{input:t,label:i.element,labelIsParent:i.isParent,inputtype:s,checkedClass:o,uncheckedClass:u}),this.options.enhanced||this._enhance(),this._on(i.element,{vmouseover:"_handleLabelVMouseOver",vclick:"_handleLabelVClick"}),this._on(t,{vmousedown:"_cacheVals",vclick:"_handleInputVClick",focus:"_handleInputFocus",blur:"_handleInputBlur"}),this._handleFormReset(),this.refresh()},_findLabel:function(){var t,r,i,s=this.element,o=s[0].labels;return o&&o.length>0?(r=e(o[0]),i=e.contains(r[0],s[0])):(t=s.closest("label"),i=t.length>0,r=i?t:e(this.document[0].getElementsByTagName("label")).filter("[for='"+n(s[0].id)+"']").first()),{element:r,isParent:i}},_enhance:function(){this.label.addClass("ui-btn ui-corner-all"),this.labelIsParent?this.input.add(this.label).wrapAll(this._wrapper()):(this.element.wrap(this._wrapper()),this.element.parent().prepend(this.label)),this._setOptions({theme:this.options.theme,iconpos:this.options.iconpos,mini:this.options.mini})},_wrapper:function(){return e("<div class='"+(this.options.wrapperClass?this.options.wrapperClass:"")+" ui-"+this.inputtype+(this.options.disabled?" ui-state-disabled":"")+"' ></div>")},_handleInputFocus:function(){this.label.addClass(e.mobile.focusClass)},_handleInputBlur:function(){this.label.removeClass(e.mobile.focusClass)},_handleInputVClick:function(){this.element.prop("checked",this.element.is(":checked")),this._getInputSet().not(this.element).prop("checked",!1),this._updateAll(!0)},_handleLabelVMouseOver:function(e){this.label.parent().hasClass("ui-state-disabled")&&e.stopPropagation()},_handleLabelVClick:function(e){var t=this.element;if(t.is(":disabled")){e.preventDefault();return}return this._cacheVals(),t.prop("checked",this.inputtype==="radio"&&!0||!t.prop("checked")),t.triggerHandler("click"),this._getInputSet().not(t).prop("checked",!1),this._updateAll(),!1},_cacheVals:function(){this._getInputSet().each(function(){e(this).attr("data-"+e.mobile.ns+"cacheVal",this.checked)})},_getInputSet:function(){var t,r,i=this.element[0],s=i.name,o=i.form,u=this.element.parents().last().get(0),a=this.element;return s&&this.inputtype==="radio"&&u&&(t="input[type='radio'][name='"+n(s)+"']",o?(r=o.getAttribute("id"),r&&(a=e(t+"[form='"+n(r)+"']",u)),a=e(o).find(t).filter(function(){return this.form===o}).add(a)):a=e(t,u).filter(function(){return!this.form})),a},_updateAll:function(t){var n=this;this._getInputSet().each(function(){var r=e(this);(this.checked||n.inputtype==="checkbox")&&!t&&r.trigger("change")}).checkboxradio("refresh")},_reset:function(){this.refresh()},_hasIcon:function(){var t,n,r=e.mobile.controlgroup;if(r){t=this.element.closest(":mobile-controlgroup,"+r.prototype.initSelector);if(t.length>0)return n=e.data(t[0],"mobile-controlgroup"),(n?n.options.type:t.attr("data-"+e.mobile.ns+"type"))!=="horizontal"}return!0},refresh:function(){var t=this.element[0].checked,n=e.mobile.activeBtnClass,r="ui-btn-icon-"+this.options.iconpos,i=[],s=[];this._hasIcon()?(s.push(n),i.push(r)):(s.push(r),(t?i:s).push(n)),t?(i.push(this.checkedClass),s.push(this.uncheckedClass)):(i.push(this.uncheckedClass),s.push(this.checkedClass)),this.widget().toggleClass("ui-state-disabled",this.element.prop("disabled")),this.label.addClass(i.join(" ")).removeClass(s.join(" "))},widget:function(){return this.label.parent()},_setOptions:function(e){var n=this.label,r=this.options,i=this.widget(),s=this._hasIcon();e.disabled!==t&&(this.input.prop("disabled",!!e.disabled),i.toggleClass("ui-state-disabled",!!e.disabled)),e.mini!==t&&i.toggleClass("ui-mini",!!e.mini),e.theme!==t&&n.removeClass("ui-btn-"+r.theme).addClass("ui-btn-"+e.theme),e.wrapperClass!==t&&i.removeClass(r.wrapperClass).addClass(e.wrapperClass),e.iconpos!==t&&s?n.removeClass("ui-btn-icon-"+r.iconpos).addClass("ui-btn-icon-"+e.iconpos):s||n.removeClass("ui-btn-icon-"+r.iconpos),this._super(e)}},e.mobile.behaviors.formReset))}(e),function(e,n){function r(e,t,n,r){var i=r;return e<t?i=n+(e-t)/2:i=Math.min(Math.max(n,r-t/2),n+e-t),i}function i(e){return{x:e.scrollLeft(),y:e.scrollTop(),cx:e[0].innerWidth||e.width(),cy:e[0].innerHeight||e.height()}}e.widget("mobile.popup",{options:{wrapperClass:null,theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",dismissible:!0,enhanced:!1,history:!e.mobile.browser.oldIE},_handleDocumentVmousedown:function(t){this._isOpen&&e.contains(this._ui.container[0],t.target)&&this._ignoreResizeEvents()},_create:function(){var t=this.element,n=t.attr("id"),r=this.options;r.history=r.history&&e.mobile.ajaxEnabled&&e.mobile.hashListeningEnabled,this._on(this.document,{vmousedown:"_handleDocumentVmousedown"}),e.extend(this,{_scrollTop:0,_page:t.closest(".ui-page"),_ui:null,_fallbackTransition:"",_currentTransition:!1,_prerequisites:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),this._page.length===0&&(this._page=e("body")),r.enhanced?this._ui={container:t.parent(),screen:t.parent().prev(),placeholder:e(this.document[0].getElementById(n+"-placeholder"))}:(this._ui=this._enhance(t,n),this._applyTransition(r.transition)),this._setTolerance(r.tolerance)._ui.focusElement=this._ui.container,this._on(this._ui.screen,{vclick:"_eatEventAndClose"}),this._on(this.window,{orientationchange:e.proxy(this,"_handleWindowOrientationchange"),resize:e.proxy(this,"_handleWindowResize"),keyup:e.proxy(this,"_handleWindowKeyUp")}),this._on(this.document,{focusin:"_handleDocumentFocusIn"})},_enhance:function(t,n){var r=this.options,i=r.wrapperClass,s={screen:e("<div class='ui-screen-hidden ui-popup-screen "+this._themeClassFromOption("ui-overlay-",r.overlayTheme)+"'></div>"),placeholder:e("<div style='display: none;'><!-- placeholder --></div>"),container:e("<div class='ui-popup-container ui-popup-hidden ui-popup-truncate"+(i?" "+i:"")+"'></div>")},o=this.document[0].createDocumentFragment();return o.appendChild(s.screen[0]),o.appendChild(s.container[0]),n&&(s.screen.attr("id",n+"-screen"),s.container.attr("id",n+"-popup"),s.placeholder.attr("id",n+"-placeholder").html("<!-- placeholder for "+n+" -->")),this._page[0].appendChild(o),s.placeholder.insertAfter(t),t.detach().addClass("ui-popup "+this._themeClassFromOption("ui-body-",r.theme)+" "+(r.shadow?"ui-overlay-shadow ":"")+(r.corners?"ui-corner-all ":"")).appendTo(s.container),s},_eatEventAndClose:function(e){return e.preventDefault(),e.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var e=this._ui.screen,t=this._ui.container.outerHeight(!0),n=e.removeAttr("style").height(),r=this.document.height()-1;n<r?e.height(r):t>n&&e.height(t)},_handleWindowKeyUp:function(t){if(this._isOpen&&t.keyCode===e.mobile.keyCode.ESCAPE)return this._eatEventAndClose(t)},_expectResizeEvent:function(){var e=i(this.window);if(this._resizeData){if(e.x===this._resizeData.windowCoordinates.x&&e.y===this._resizeData.windowCoordinates.y&&e.cx===this._resizeData.windowCoordinates.cx&&e.cy===this._resizeData.windowCoordinates.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:this._delay("_resizeTimeout",200),windowCoordinates:e},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._ui.container.removeClass("ui-popup-hidden ui-popup-truncate"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_stopIgnoringResizeEvents:function(){this._ignoreResizeTo=0},_ignoreResizeEvents:function(){this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=this._delay("_stopIgnoringResizeEvents",1e3)},_handleWindowResize:function(){this._isOpen&&this._ignoreResizeTo===0&&(this._expectResizeEvent()||this._orientationchangeInProgress)&&!this._ui.container.hasClass("ui-popup-hidden")&&this._ui.container.addClass("ui-popup-hidden ui-popup-truncate").removeAttr("style")},_handleWindowOrientationchange:function(){!this._orientationchangeInProgress&&this._isOpen&&this._ignoreResizeTo===0&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(t){var n,r=t.target,i=this._ui;if(!this._isOpen)return;if(r!==i.container[0]){n=e(r);if(!e.contains(i.container[0],r))return e(this.document[0].activeElement).one("focus",e.proxy(function(){this._safelyBlur(r)},this)),i.focusElement.focus(),t.preventDefault(),t.stopImmediatePropagation(),!1;i.focusElement[0]===i.container[0]&&(i.focusElement=n)}this._ignoreResizeEvents()},_themeClassFromOption:function(e,t){return t?t==="none"?"":e+t:e+"inherit"},_applyTransition:function(t){return t&&(this._ui.container.removeClass(this._fallbackTransition),t!=="none"&&(this._fallbackTransition=e.mobile._maybeDegradeTransition(t),this._fallbackTransition==="none"&&(this._fallbackTransition=""),this._ui.container.addClass(this._fallbackTransition))),this},_setOptions:function(e){var t=this.options,r=this.element,i=this._ui.screen;return e.wrapperClass!==n&&this._ui.container.removeClass(t.wrapperClass).addClass(e.wrapperClass),e.theme!==n&&r.removeClass(this._themeClassFromOption("ui-body-",t.theme)).addClass(this._themeClassFromOption("ui-body-",e.theme)),e.overlayTheme!==n&&(i.removeClass(this._themeClassFromOption("ui-overlay-",t.overlayTheme)).addClass(this._themeClassFromOption("ui-overlay-",e.overlayTheme)),this._isOpen&&i.addClass("in")),e.shadow!==n&&r.toggleClass("ui-overlay-shadow",e.shadow),e.corners!==n&&r.toggleClass("ui-corner-all",e.corners),e.transition!==n&&(this._currentTransition||this._applyTransition(e.transition)),e.tolerance!==n&&this._setTolerance(e.tolerance),e.disabled!==n&&e.disabled&&this.close(),this._super(e)},_setTolerance:function(t){var r={t:30,r:15,b:30,l:15},i;if(t!==n){i=String(t).split(","),e.each(i,function(e,t){i[e]=parseInt(t,10)});switch(i.length){case 1:isNaN(i[0])||(r.t=r.r=r.b=r.l=i[0]);break;case 2:isNaN(i[0])||(r.t=r.b=i[0]),isNaN(i[1])||(r.l=r.r=i[1]);break;case 4:isNaN(i[0])||(r.t=i[0]),isNaN(i[1])||(r.r=i[1]),isNaN(i[2])||(r.b=i[2]),isNaN(i[3])||(r.l=i[3]);break;default:}}return this._tolerance=r,this},_clampPopupWidth:function(e){var t,n=i(this.window),r={x:this._tolerance.l,y:n.y+this._tolerance.t,cx:n.cx-this._tolerance.l-this._tolerance.r,cy:n.cy-this._tolerance.t-this._tolerance.b};return e||this._ui.container.css("max-width",r.cx),t={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},{rc:r,menuSize:t}},_calculateFinalLocation:function(e,t){var n,i=t.rc,s=t.menuSize;return n={left:r(i.cx,s.cx,i.x,e.x),top:r(i.cy,s.cy,i.y,e.y)},n.top=Math.max(0,n.top),n.top-=Math.min(n.top,Math.max(0,n.top+s.cy-this.document.height())),n},_placementCoords:function(e){return this._calculateFinalLocation(e,this._clampPopupWidth())},_createPrerequisites:function(t,n,r){var i,s=this;i={screen:e.Deferred(),container:e.Deferred()},i.screen.then(function(){i===s._prerequisites&&t()}),i.container.then(function(){i===s._prerequisites&&n()}),e.when(i.screen,i.container).done(function(){i===s._prerequisites&&(s._prerequisites=null,r())}),s._prerequisites=i},_animate:function(t){this._ui.screen.removeClass(t.classToRemove).addClass(t.screenClassToAdd),t.prerequisites.screen.resolve();if(t.transition&&t.transition!=="none"){t.applyTransition&&this._applyTransition(t.transition);if(this._fallbackTransition){this._ui.container.addClass(t.containerClassToAdd).removeClass(t.classToRemove).animationComplete(e.proxy(t.prerequisites.container,"resolve"));return}}this._ui.container.removeClass(t.classToRemove),t.prerequisites.container.resolve()},_desiredCoords:function(t){var n,r=null,s=i(this.window),o=t.x,u=t.y,a=t.positionTo;if(a&&a!=="origin")if(a==="window")o=s.cx/2+s.x,u=s.cy/2+s.y;else{try{r=e(a)}catch(f){r=null}r&&(r.filter(":visible"),r.length===0&&(r=null))}r&&(n=r.offset(),o=n.left+r.outerWidth()/2,u=n.top+r.outerHeight()/2);if(e.type(o)!=="number"||isNaN(o))o=s.cx/2+s.x;if(e.type(u)!=="number"||isNaN(u))u=s.cy/2+s.y;return{x:o,y:u}},_reposition:function(e){e={x:e.x,y:e.y,positionTo:e.positionTo},this._trigger("beforeposition",n,e),this._ui.container.offset(this._placementCoords(this._desiredCoords(e)))},reposition:function(e){this._isOpen&&this._reposition(e)},_safelyBlur:function(t){t!==this.window[0]&&t.nodeName.toLowerCase()!=="body"&&e(t).blur()},_openPrerequisitesComplete:function(){var t=this.element.attr("id"),n=this._ui.container.find(":focusable").first();this._ui.container.addClass("ui-popup-active"),this._isOpen=!0,this._resizeScreen(),e.contains(this._ui.container[0],this.document[0].activeElement)||this._safelyBlur(this.document[0].activeElement),n.length>0&&(this._ui.focusElement=n),this._ignoreResizeEvents(),t&&this.document.find("[aria-haspopup='true'][aria-owns='"+t+"']").attr("aria-expanded",!0),this._trigger("afteropen")},_open:function(t){var n=e.extend({},this.options,t),r=function(){var e=navigator.userAgent,t=e.match(/AppleWebKit\/([0-9\.]+)/),n=!!t&&t[1],r=e.match(/Android (\d+(?:\.\d+))/),i=!!r&&r[1],s=e.indexOf("Chrome")>-1;return r!==null&&i==="4.0"&&n&&n>534.13&&!s?!0:!1}();this._createPrerequisites(e.noop,e.noop,e.proxy(this,"_openPrerequisitesComplete")),this._currentTransition=n.transition,this._applyTransition(n.transition),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-popup-truncate"),this._reposition(n),this._ui.container.removeClass("ui-popup-hidden"),this.options.overlayTheme&&r&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:n.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prerequisites:this._prerequisites})},_closePrerequisiteScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrerequisiteContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden ui-popup-truncate").removeAttr("style")},_closePrerequisitesDone:function(){var t=this._ui.container,r=this.element.attr("id");e.mobile.popup.active=n,e(":focus",t[0]).add(t[0]).blur(),r&&this.document.find("[aria-haspopup='true'][aria-owns='"+r+"']").attr("aria-expanded",!1),this._trigger("afterclose")},_close:function(t){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrerequisites(e.proxy(this,"_closePrerequisiteScreen"),e.proxy(this,"_closePrerequisiteContainer"),e.proxy(this,"_closePrerequisitesDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:t?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prerequisites:this._prerequisites})},_unenhance:function(){if(this.options.enhanced)return;this._setOptions({theme:e.mobile.popup.prototype.options.theme}),this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all ui-body-inherit"),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove()},_destroy:function(){return e.mobile.popup.active===this?(this.element.one("popupafterclose",e.proxy(this,"_unenhance")),this.close()):this._unenhance(),this},_closePopup:function(n,r){var i,s,o=this.options,u=!1;if(n&&n.isDefaultPrevented()||e.mobile.popup.active!==this)return;t.scrollTo(0,this._scrollTop),n&&n.type==="pagebeforechange"&&r&&(typeof r.toPage=="string"?i=r.toPage:i=r.toPage.jqmData("url"),i=e.mobile.path.parseUrl(i),s=i.pathname+i.search+i.hash,this._myUrl!==e.mobile.path.makeUrlAbsolute(s)?u=!0:n.preventDefault()),this.window.off(o.closeEvents),this.element.undelegate(o.closeLinkSelector,o.closeLinkEvents),this._close(u)},_bindContainerClose:function(){this.window.on(this.options.closeEvents,e.proxy(this,"_closePopup"))},widget:function(){return this._ui.container},open:function(t){var n,r,i,s,o,u,a=this,f=this.options;return e.mobile.popup.active||f.disabled?this:(e.mobile.popup.active=this,this._scrollTop=this.window.scrollTop(),f.history?(u=e.mobile.navigate.history,r=e.mobile.dialogHashKey,i=e.mobile.activePage,s=i?i.hasClass("ui-dialog"):!1,this._myUrl=n=u.getActive().url,o=n.indexOf(r)>-1&&!s&&u.activeIndex>0,o?(a._open(t),a._bindContainerClose(),this):(n.indexOf(r)===-1&&!s?n+=n.indexOf("#")>-1?r:"#"+r:n=e.mobile.path.parseLocation().hash+r,this.window.one("beforenavigate",function(e){e.preventDefault(),a._open(t),a._bindContainerClose()}),this.urlAltered=!0,e.mobile.navigate(n,{role:"dialog"}),this)):(a._open(t),a._bindContainerClose(),a.element.delegate(f.closeLinkSelector,f.closeLinkEvents,function(e){a.close(),e.preventDefault()}),this))},close:function(){return e.mobile.popup.active!==this?this:(this._scrollTop=this.window.scrollTop(),this.options.history&&this.urlAltered?(e.mobile.back(),this.urlAltered=!1):this._closePopup(),this)}}),e.mobile.popup.handleLink=function(t){var n,r=e.mobile.path,i=e(r.hashToSelector(r.parseUrl(t.attr("href")).hash)).first();i.length>0&&i.data("mobile-popup")&&(n=t.offset(),i.popup("open",{x:n.left+t.outerWidth()/2,y:n.top+t.outerHeight()/2,transition:t.jqmData("transition"),positionTo:t.jqmData("position-to")})),setTimeout(function(){t.removeClass(e.mobile.activeBtnClass)},300)},e.mobile.document.on("pagebeforechange",function(t,n){n.options.role==="popup"&&(e.mobile.popup.handleLink(n.options.link),t.preventDefault())})}(e),function(e,t){e.widget("mobile.table",{options:{classes:{table:"ui-table"},enhanced:!1},_create:function(){this.options.enhanced||this.element.addClass(this.options.classes.table),e.extend(this,{headers:t,allHeaders:t}),this._refresh(!0)},_setHeaders:function(){var e=this.element.find("thead tr");this.headers=this.element.find("tr:eq(0)").children(),this.allHeaders=this.headers.add(e.children())},refresh:function(){this._refresh()},rebuild:e.noop,_refresh:function(){var t=this.element,n=t.find("thead tr");this._setHeaders(),n.each(function(){var r=0;e(this).children().each(function(){var i=parseInt(this.getAttribute("colspan"),10),s=":nth-child("+(r+1)+")",o;this.setAttribute("data-"+e.mobile.ns+"colstart",r+1);if(i)for(o=0;o<i-1;o++)r++,s+=", :nth-child("+(r+1)+")";e(this).jqmData("cells",t.find("tr").not(n.eq(0)).not(this).children(s)),r++})})}})}(e),function(e,t){e.widget("mobile.table",e.mobile.table,{options:{mode:"columntoggle",columnBtnTheme:null,columnPopupTheme:null,columnBtnText:"Columns...",classes:e.extend(e.mobile.table.prototype.options.classes,{popup:"ui-table-columntoggle-popup",columnBtn:"ui-table-columntoggle-btn",priorityPrefix:"ui-table-priority-",columnToggleTable:"ui-table-columntoggle"})},_create:function(){this._super();if(this.options.mode!=="columntoggle")return;e.extend(this,{_menu:null}),this.options.enhanced?(this._menu=e(this.document[0].getElementById(this._id()+"-popup")).children().first(),this._addToggles(this._menu,!0)):(this._menu=this._enhanceColToggle(),this.element.addClass(this.options.classes.columnToggleTable)),this._setupEvents(),this._setToggleState()},_id:function(){return this.element.attr("id")||this.widgetName+this.uuid},_setupEvents:function(){this._on(this.window,{throttledresize:"_setToggleState"}),this._on(this._menu,{"change input":"_menuInputChange"})},_addToggles:function(t,n){var r,i=0,s=this.options,o=t.controlgroup("container");n?r=t.find("input"):o.empty(),this.headers.not("td").each(function(){var t,u,a=e(this),f=e.mobile.getAttribute(this,"priority");f&&(u=a.add(a.jqmData("cells")),u.addClass(s.classes.priorityPrefix+f),t=(n?r.eq(i++):e("<label><input type='checkbox' checked />"+(a.children("abbr").first().attr("title")||a.text())+"</label>").appendTo(o).children(0).checkboxradio({theme:s.columnPopupTheme})).jqmData("header",a).jqmData("cells",u),a.jqmData("input",t))}),n||t.controlgroup("refresh")},_menuInputChange:function(t){var n=e(t.target),r=n[0].checked;n.jqmData("cells").toggleClass("ui-table-cell-hidden",!r).toggleClass("ui-table-cell-visible",r)},_unlockCells:function(e){e.removeClass("ui-table-cell-hidden ui-table-cell-visible")},_enhanceColToggle:function(){var t,n,r,i,s=this.element,o=this.options,u=e.mobile.ns,a=this.document[0].createDocumentFragment();return t=this._id()+"-popup",n=e("<a href='#"+t+"' "+"class='"+o.classes.columnBtn+" ui-btn "+"ui-btn-"+(o.columnBtnTheme||"a")+" ui-corner-all ui-shadow ui-mini' "+"data-"+u+"rel='popup'>"+o.columnBtnText+"</a>"),r=e("<div class='"+o.classes.popup+"' id='"+t+"'></div>"),i=e("<fieldset></fieldset>").controlgroup(),this._addToggles(i,!1),i.appendTo(r),a.appendChild(r[0]),a.appendChild(n[0]),s.before(a),r.popup(),i},rebuild:function(){this._super(),this.options.mode==="columntoggle"&&this._refresh(!1)},_refresh:function(t){var n,r,i;this._super(t);if(!t&&this.options.mode==="columntoggle"){n=this.headers,r=[],this._menu.find("input").each(function(){var t=e(this),i=t.jqmData("header"),s=n.index(i[0]);s>-1&&!t.prop("checked")&&r.push(s)}),this._unlockCells(this.element.find(".ui-table-cell-hidden, .ui-table-cell-visible")),this._addToggles(this._menu,t);for(i=r.length-1;i>-1;i--)n.eq(r[i]).jqmData("input").prop("checked",!1).checkboxradio("refresh").trigger("change")}},_setToggleState:function(){this._menu.find("input").each(function(){var t=e(this);this.checked=t.jqmData("cells").eq(0).css("display")==="table-cell",t.checkboxradio("refresh")})},_destroy:function(){this._super()}})}(e)});

/* End jQuery Mobile v1.4.5 */

/* Prevent jQuery Mobile Hash Manipulation */

$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;

/* End */


/*! jQuery Validation Plugin - v1.13.0 - 7/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) } (function (a) { a.extend(a.fn, { validate: function (b) { if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")); var c = a.data(this[0], "validator"); return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (b) { c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.submit(function (b) { function d() { var d; return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0 } return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1) })), c) }, valid: function () { var b, c; return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function () { b = c.element(this) && b })), b }, removeAttrs: function (b) { var c = {}, d = this; return a.each(b.split(/\s/), function (a, b) { c[b] = d.attr(b), d.removeAttr(b) }), c }, rules: function (b, c) { var d, e, f, g, h, i, j = this[0]; if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) { case "add": a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages)); break; case "remove": return c ? (i = {}, a.each(c.split(/\s/), function (b, c) { i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required") }), i) : (delete e[j.name], f) } return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g } }), a.extend(a.expr[":"], { blank: function (b) { return !a.trim("" + a(b).val()) }, filled: function (b) { return !!a.trim("" + a(b).val()) }, unchecked: function (b) { return !a(b).prop("checked") } }), a.validator = function (b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function (b, c) { return 1 === arguments.length ? function () { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () { return c }) }), b) }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "label", focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function (a) { this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function (a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) }, onkeyup: function (a, b) { (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a) }, onclick: function (a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function (b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) }, unhighlight: function (b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) } }, setDefaults: function (b) { a.extend(a.validator.defaults, b) }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}.") }, autoCreateRanges: !1, prototype: { init: function () { function b(b) { var c = a.data(this[0].form, "validator"), d = "on" + b.type.replace(/^validate/, ""), e = c.settings; e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b) } this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var c, d = this.groups = {}; a.each(this.settings.groups, function (b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function (b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", b).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true") }, form: function () { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function () { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() }, element: function (b) { var c = this.clean(b), d = this.validationTargetFor(c), e = !0; return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e }, showErrors: function (b) { if (b) { a.extend(this.errorMap, b), this.errorList = []; for (var c in b) this.errorList.push({ message: b[c], element: this.findByName(c)[0] }); this.successList = a.grep(this.successList, function (a) { return !(a.name in b) }) } this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function () { a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid") }, numberOfInvalids: function () { return this.objectLength(this.invalid) }, objectLength: function (a) { var b, c = 0; for (b in a) c++; return c }, hideErrors: function () { this.hideThese(this.toHide) }, hideThese: function (a) { a.not(this.containers).text(""), this.addWrapper(a).hide() }, valid: function () { return 0 === this.size() }, size: function () { return this.errorList.length }, focusInvalid: function () { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) { } }, findLastActive: function () { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function (a) { return a.element.name === b.name }).length && b }, elements: function () { var b = this, c = {}; return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () { return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0) }) }, clean: function (b) { return a(b)[0] }, errors: function () { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) }, reset: function () { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([]) }, prepareForm: function () { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function (a) { this.reset(), this.toHide = this.errorsFor(a) }, elementValue: function (b) { var c, d = a(b), e = b.type; return "radio" === e || "checkbox" === e ? a("input[name='" + b.name + "']:checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c) }, check: function (b) { b = this.validationTargetFor(this.clean(b)); var c, d, e, f = a(b).rules(), g = a.map(f, function (a, b) { return b }).length, h = !1, i = this.elementValue(b); for (d in f) { e = { method: d, parameters: f[d] }; try { if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) { h = !0; continue } if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (j) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j } } if (!h) return this.objectLength(f) && this.successList.push(b), !0 }, customDataMessage: function (b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") }, customMessage: function (a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) }, findDefined: function () { for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a]; return void 0 }, defaultMessage: function (b, c) { return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>") }, formatAndAdd: function (b, c) { var d = this.defaultMessage(b, c.method), e = /\$?\{(\d+)\}/g; "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({ message: d, element: b, method: c.method }), this.errorMap[b.name] = d, this.submitted[b.name] = d }, addWrapper: function (a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a }, defaultShowErrors: function () { var a, b, c; for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message); if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]); if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass); this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function () { return this.currentElements.not(this.invalidElements()) }, invalidElements: function () { return a(this.errorList).map(function () { return this.element }) }, showLabel: function (b, c) { var d, e, f, g = this.errorsFor(b), h = this.idOrName(b), i = a(b).attr("aria-describedby"); g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id"), i ? i.match(new RegExp("\b" + f + "\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function (b, c) { c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id")) }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g) }, errorsFor: function (b) { var c = this.idOrName(b), d = a(b).attr("aria-describedby"), e = "label[for='" + c + "'], label[for='" + c + "'] *"; return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e) }, idOrName: function (a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function (a) { return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a }, checkable: function (a) { return /radio|checkbox/i.test(a.type) }, findByName: function (b) { return a(this.currentForm).find("[name='" + b + "']") }, getLength: function (b, c) { switch (c.nodeName.toLowerCase()) { case "select": return a("option:selected", c).length; case "input": if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length } return b.length }, depend: function (a, b) { return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0 }, dependTypes: { "boolean": function (a) { return a }, string: function (b, c) { return !!a(b, c.form).length }, "function": function (a, b) { return a(b) } }, optional: function (b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" }, startRequest: function (a) { this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0) }, stopRequest: function (b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function (b) { return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, "remote") }) } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0} }, addClassRules: function (b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) }, classRules: function (b) { var c = {}, d = a(b).attr("class"); return d && a.each(d.split(" "), function () { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c }, attributeRules: function (b) { var c, d, e = {}, f = a(b), g = b.getAttribute("type"); for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0); return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e }, dataRules: function (b) { var c, d, e = {}, f = a(b); for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d); return e }, staticRules: function (b) { var c = {}, d = a.data(b.form, "validator"); return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c }, normalizeRules: function (b, c) { return a.each(b, function (d, e) { if (e === !1) return void delete b[d]; if (e.param || e.depends) { var f = !0; switch (typeof e.depends) { case "string": f = !!a(e.depends, c.form).length; break; case "function": f = e.depends.call(c, c) } f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d] } }), a.each(b, function (d, e) { b[d] = a.isFunction(e) ? e(c) : e }), a.each(["minlength", "maxlength"], function () { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function () { var c; b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])])) }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b }, normalizeRule: function (b) { if ("string" == typeof b) { var c = {}; a.each(b.split(/\s/), function () { c[this] = !0 }), b = c } return b }, addMethod: function (b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) }, methods: { required: function (b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0 }, email: function (a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function (a, b) { return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a) }, date: function (a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) }, dateISO: function (a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function (a, b) { return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function (a, b) { return this.optional(b) || /^\d+$/.test(a) }, creditcard: function (a, b) { if (this.optional(b)) return "dependency-mismatch"; if (/[^0-9 \-]+/.test(a)) return !1; var c, d, e = 0, f = 0, g = !1; if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1; for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g; return e % 10 === 0 }, minlength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c); return this.optional(c) || e >= d }, maxlength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c); return this.optional(c) || d >= e }, rangelength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c); return this.optional(c) || e >= d[0] && e <= d[1] }, min: function (a, b, c) { return this.optional(b) || a >= c }, max: function (a, b, c) { return this.optional(b) || c >= a }, range: function (a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] }, equalTo: function (b, c, d) { var e = a(d); return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () { a(c).valid() }), b === e.val() }, remote: function (b, c, d) { if (this.optional(c)) return "dependency-mismatch"; var e, f, g = this.previousValue(c); return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && { url: d} || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, { url: d, mode: "abort", port: "validate" + c.name, dataType: "json", data: f, context: e.currentForm, success: function (d) { var f, h, i, j = d === !0 || "true" === d; e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j) } }, d)), "pending") } } }), a.format = function () { throw "$.format has been deprecated. Please use $.validator.format instead." }; var b, c = {}; a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function (d) { var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port; return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments) }), a.extend(a.fn, { validateDelegate: function (b, c, d) { return this.bind(c, function (c) { var e = a(c.target); return e.is(b) ? d.apply(e, arguments) : void 0 }) } }) });

/* End of jQuery Validation Plugin */
(function ($) {
    function RollBar(c, s) {
        this.container = $(c); this.settings = s; this.timer = 0; this.before = { 'v': 0, 'h': 0 }; this.touch = {}; this.pressed = 0; this.vslider = $('<div/>', { 'class': 'rollbar-handle' }); this.vpath = $('<div/>', { 'class': 'rollbar-path-vertical' }); this.hslider = $('<div/>', { 'class': 'rollbar-handle' }); this.hpath = $('<div/>', { 'class': 'rollbar-path-horizontal' }); this.sliders = this.vslider.add(this.hslider); this.container.css({ 'overflow': 'hidden', 'position': 'relative' }).contents().filter(this.settings.contentFilter).wrapAll('<div class="rollbar-content"></div>'); this.content = this.container.children('.rollbar-content').css({ 'top': 0, 'left': 0, 'position': 'relative', 'float': 'left' }); if (this.settings.scroll == 'horizontal') { this.container.prepend(this.hpath.append(this.hslider)); } else if (this.settings.scroll == 'vertical') { this.container.prepend(this.vpath.append(this.vslider)); } else { this.container.prepend(this.vpath.append(this.vslider), this.hpath.append(this.hslider)); }
        this.vpath.add(this.hpath).css({ 'z-index': this.settings.zIndex, 'display': 'none' }); this.vslider.css({ 'height': this.settings.sliderSize, 'opacity': this.settings.sliderOpacity }); this.hslider.css({ 'width': this.settings.sliderSize, 'opacity': this.settings.sliderOpacity }); if (this.settings.sliderOpacity) { this.sliders.hover(this.fixFn(function () { this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1); }), this.fixFn(function () { if (!this.pressed) { this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); } })); }
        this.init(); this.pathSize(); this.bindEvent($(window), 'load', function () { setTimeout(this.fixFn(this.checkScroll), 10); }); if (this.settings.lazyCheckScroll > 0) { setInterval(this.fixFn(function () { this.checkScroll(); this.pathSize(); }), this.settings.lazyCheckScroll); } 
    }
    RollBar.prototype.checkScroll = function () {
        this.vtrack = this.vpath.height() - this.vslider.height(); this.htrack = this.hpath.width() - this.hslider.width(); this.vdiff = this.content.height() - this.container.height(); this.hdiff = this.content.width() - this.container.width(); if (!this.settings.autoHide) return; if (this.vdiff > 0) { this.vpath.fadeIn(this.settings.autoHideTime); } else { this.vpath.fadeOut(this.settings.autoHideTime); }
        if (this.hdiff > 0) { this.hpath.fadeIn(this.settings.autoHideTime); } else { this.hpath.fadeOut(this.settings.autoHideTime); } 
    }; RollBar.prototype.pathSize = function () { var pad = parseInt(this.settings.pathPadding, 10); this.vpath.css({ 'top': pad + 'px', 'height': this.container.height() - 2 * pad + 'px' }); this.hpath.css({ 'left': pad + 'px', 'width': this.container.width() - 2 * pad + 'px' }); }; RollBar.prototype.scroll = function (v, h, e) {
        var hs = 0; var vs = 0; if (v < 0) { v = 0; }
        if (v > this.vtrack) { v = this.vtrack; }
        this.vslider.css('top', v + 'px'); if (h < 0) { h = 0; }
        if (h > this.htrack) { h = this.htrack; }
        this.hslider.css('left', h + 'px'); if (this.vdiff > 0) { vs = v / this.vtrack; this.content.css('top', Math.round(-this.vdiff * vs)); if (e && (v && v != this.vtrack)) { e.stopPropagation(); e.preventDefault(); } }
        if (this.hdiff > 0) { hs = h / this.htrack; this.content.css('left', Math.round(-this.hdiff * hs)); if (e && (h && h != this.htrack)) { e.stopPropagation(); e.preventDefault(); } }
        if (this.before.v != vs || this.before.h != hs) {
            if (typeof this.settings.onscroll == 'function') { this.settings.onscroll.call(this.container.get(0), vs, hs); }
            this.before.v = vs; this.before.h = hs;
        } 
    }; RollBar.prototype.easeScroll = function (v, h) { var n = 0; var steps = Math.floor(this.settings.scrollTime / this.settings.scrollInterval); var vs = this.vslider.position().top; var hs = this.hslider.position().left; var easing = $.easing[this.settings.scrollEasing] || $.easing.linear; this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1); window.clearInterval(this.timer); this.timer = window.setInterval(this.fixFn(function () { this.scroll(vs + easing(n / steps, n, 0, 1, steps) * v, hs + easing(n / steps, n, 0, 1, steps) * h); if (++n > steps) { window.clearInterval(this.timer); this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); } }), this.settings.scrollInterval); }; RollBar.prototype.fixFn = function (f, s) { var scope = this; return function () { f.apply(s || scope, Array.prototype.slice.call(arguments)); } }; RollBar.prototype.bindEvent = function (t, e, f, s) { return t.bind(e, this.fixFn(f, s)); }; RollBar.prototype.init = function () {
        var document = $(window.document); this.bindEvent(this.sliders, 'mousedown', function (e) { this.pressed = (e.target === this.vslider.get(0)) ? 1 : 2; var hclick = e.pageX; var vclick = e.pageY; var vtop = this.vslider.position().top; var hleft = this.hslider.position().left; this.bindEvent(document, 'mousemove', function (e) { if (this.pressed == 1) { this.scroll(vtop + (e.pageY - vclick), hleft); } else { this.scroll(vtop, hleft + (e.pageX - hclick)); } }); this.bindEvent(document, 'selectstart', function (e) { e.preventDefault() }); }); this.bindEvent(document, 'mouseup', function (e) {
            if (this.pressed == 1 && e.target !== this.vslider.get(0)) { this.vslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); } else if (this.pressed == 2 && e.target !== this.hslider.get(0)) { this.hslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); }
            this.pressed = 0; document.unbind('mousemove'); document.unbind('selectstart');
        }); var touchStartEvent; var touchMoveEvent; var touchEndEvent; if (window.navigator.msPointerEnabled) { if ($("body").hasClass("ie-10")) { touchStartEvent = "MSPointerDown"; touchMoveEvent = "MSPointerMove"; touchEndEvent = "MSPointerUp"; } else { touchStartEvent = "pointerdown"; touchMoveEvent = "pointermove"; touchEndEvent = "pointerup"; } } else { touchStartEvent = "touchstart"; touchMoveEvent = "touchmove"; touchEndEvent = "touchend"; }
        this.bindEvent(this.container, touchStartEvent, function (e) { if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) { var event = e.originalEvent; var touch = e.originalEvent || e.originalEvent.targetTouches[0]; this.touch.sx = touch.pageX; this.touch.sy = touch.pageY; this.touch.sv = this.vslider.position().top; this.touch.sh = this.hslider.position().left; this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1); if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) { event.stopPropagation(); } } }); this.bindEvent(this.container, touchMoveEvent, function (e) { if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) { var event = e.originalEvent; var touch = e.originalEvent || e.originalEvent.targetTouches[0]; this.scroll(this.touch.sv + (this.touch.sy - touch.pageY) * this.settings.touchSpeed, this.touch.sh + (this.touch.sx - touch.pageX) * this.settings.touchSpeed, e); if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) { event.preventDefault(); event.stopPropagation(); } } }); this.bindEvent(this.container, touchEndEvent, function (e) { if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) { var event = e.originalEvent; var touch = e.originalEvent || e.originalEvent.targetTouches[0]; this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) { event.stopPropagation(); } } }); var vtrack = this.vpath.height(), htrack = this.hpath.width(); this.bindEvent($(window), 'resize', function () {
            this.pathSize(); this.checkScroll(); if (this.vdiff <= 0) { this.content.css('top', 0); }
            if (this.hdiff <= 0) { this.content.css('left', 0); }
            this.scroll(Math.round(parseInt(this.vslider.css('top'), 10) * this.vpath.height() / vtrack), Math.round(parseInt(this.hslider.css('left'), 10) * this.hpath.width() / htrack)); vtrack = this.vpath.height(); htrack = this.hpath.width();
        }); this.bindEvent(this.container, 'mousewheel DOMMouseScroll MozMousePixelScroll', function (e, delta, deltaX, deltaY) {
            var delta = (typeof e.originalEvent.wheelDelta != "undefined") ? e.originalEvent.wheelDelta / 120 : (e.originalEvent.detail / 60) * -1; var deltaX = 0, deltaY = delta; var targetNode = e.target.nodeName; if (targetNode == 'TEXTAREA' || (targetNode == 'SELECT' || targetNode == 'OPTION')) { e.stopPropagation(); return; }
            this.scroll(this.vslider.position().top - this.settings.wheelSpeed * deltaY, this.hslider.position().left + this.settings.wheelSpeed * deltaX, e); this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1); window.clearTimeout(this.timer); this.timer = window.setTimeout(this.fixFn(function () { this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity); }), this.settings.sliderOpacityDelay); if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) { e.preventDefault(); e.stopPropagation(); } 
        }); this.bindEvent(document, 'keydown', function (e) { var hkey = 0, vkey = 0; vkey = (e.keyCode == 38) ? -this.settings.keyScroll : vkey; vkey = (e.keyCode == 40) ? this.settings.keyScroll : vkey; hkey = (e.keyCode == 37) ? -this.settings.keyScroll : hkey; hkey = (e.keyCode == 39) ? this.settings.keyScroll : hkey; if (vkey || hkey) { this.easeScroll(vkey, hkey); } }); this.bindEvent(this.container, "dragstart", function (e) { e.preventDefault(); }); this.bindEvent(this.container, 'rollbar', function (e, v, h, px) {
            e.stopPropagation(); if (v === 'reset') { this.container.find('.rollbar-content, .rollbar-handle').css({ top: 0, left: 0 }); return; }
            v = v || 0; h = h || 0; if (/^[-\d\.]+$/.test(v)) { v = parseFloat(v); if (Math.abs(v) <= 1 && !px) { v *= this.vtrack; } else { v = v + v * (this.vtrack / this.vdiff - 1); } }
            if (/^[-\d\.]+$/.test(h)) { h = parseFloat(h); if (Math.abs(h) <= 1 && !px) { h *= this.htrack; } else { h = h + h * (this.htrack / this.hdiff - 1); } }
            this.easeScroll(v, h);
        });
    }; $.fn.rollbar = function (s) { var settings = { scroll: 'both', autoHide: true, autoHideTime: 'fast', lazyCheckScroll: 1000, blockGlobalScroll: true, contentFilter: '*', sliderSize: '30%', sliderOpacity: 0.5, sliderOpacityTime: 200, sliderOpacityDelay: 1000, wheelSpeed: 20, touchSpeed: 0.3, pathPadding: '20px', keyScroll: 100, scrollTime: 500, scrollInterval: 15, scrollEasing: 'swing', zIndex: 100, onscroll: function () { } }; $.extend(settings, s); return this.each(function () { new RollBar(this, settings); }); };
})(jQuery);/* flash.js */

// Initialize vars for Flash detection
// Set to the Flash Player version checking for
var MM_contentVersion = 8;
// Assume the user doesn't have the plugin
var MM_FlashCanPlay = false;
//
// ------------------------------------------------------------------------------------------------------------
// Main Flash Detection Function
//
// Checks if the Flash Player exists and if it is >= specified version in MM_contentVersion
function flashDetection(width, height, swfName, swfSource) {		
  var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
  //alert(plugin);
	// Determine which browser the user has, since NN and IE handle the Flash Player plugin differently
  if (plugin) {
		// Checks the Flash Player version for NN
		//alert("NN");
		MM_FlashCanPlay = NN_FlashChecker();
  } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		// Checks the Flash Player version for IE
		//alert("IE");
		MM_FlashCanPlay = IE_FlashChecker();
	}
	// Determines if the user has the correct Flash Player
	if ( MM_FlashCanPlay ) {
		// Display Flash
		playFlash(width, height, swfName, swfSource);
	} else{
		// Error - Flash Player does not exist or wrong version
		doNotPlayFlash();
	}
}
//
// ------------------------------------------------------------------------------------------------------------
// Utility Funcitons for Flash Dectection
//
// Detects the Flash Player plugin for Internet Explorer
function IE_FlashChecker() {
	//alert("IE_FlashChecker");
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
	document.write('</SCR' + 'IPT\> \n');
	//alert("MM_FlashCanPlay = " + MM_FlashCanPlay);
	return (MM_FlashCanPlay);
}
//
// Detects the Flash Player plugin for Netscape
function NN_FlashChecker() {
	//alert("NN_FlashChecker");	
	var words = navigator.plugins["Shockwave Flash"].description.split(" ");
	for (var i = 0; i < words.length; ++i) {
		if (isNaN(parseInt(words[i])))
		continue;
		var MM_PluginVersion = words[i]; 
	}
	var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	//alert("MM_FlashCanPlay = " + MM_FlashCanPlay);
	return (MM_FlashCanPlay);
}
//
// The user has the correct Flash Player 
// Writes the code for the Flash movie and allows the Flash movie to play
function playFlash(width, height, swfName, swfSource) {
	//alert("playFlash");
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"');
	document.write(' ID="' + swfName + '" WIDTH="' + width + '" HEIGHT="' + height + '" ALIGN="">');
	document.write('<PARAM NAME=movie VALUE="' + swfSource + '"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF>'); 
	document.write('<EMBED src="' + swfSource + '" quality=high bgcolor=#FFFFFF');
	document.write(' swLiveConnect=FALSE WIDTH="' + width + '" HEIGHT="' + height + '" NAME="' + swfName + '" ALIGN=""');
	document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	document.write('</EMBED>');
	document.write('</OBJECT>');
}
//
// The user does not have the correct Flash Player 
// Redirects the user to the error page for no Flash Player
function doNotPlayFlash() {
	window.location.replace("/error_flash.asp?<%=display_sid%>");
}

function flashSplash(flashSource,assetWidth,assetHeight,bgcolor,imageSource) {
	if ( isCorrectFlash() ) {
				  			document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
				  			document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ');
				  			document.write(' id="flashSplash" width="'+assetWidth+'" height="'+assetHeight+'" align="">');
				  			document.write(' <param name="movie" value="'+ flashSource+'"> <param name="quality" value="high"> <param name="bgcolor" value="#FFFFFF">  <param name="WMode" value="Transparent" />');
				  			document.write(' <embed wmode="transparent" src="'+ flashSource+'" quality="high" bgcolor="#FFFFFF"  ');
				  			document.write(' swLiveConnect=FALSE width="'+assetWidth+'" height="'+assetHeight+'" name="flashSplash" align=""');
				  			document.write(' type="application/x-shockwave-flash" pluginspage="'+flashPluginsPage+'">');
				  			document.write(' </embed>');
				  			document.write(' </object>');
	} else{
				  			document.write('<img src="'+imageSource+'" name="imgCategoryPhoto" width="'+assetWidth+'" height="'+assetHeight+'" border="0" id="imgCategoryPhoto" style="padding: 0px; margin: 0px; display:block;" galleryimg="no" />');
	}
			
}

function isCorrectFlash(){
	return false;
	}

function isCorrectFlash2() {
	// If the user has the correct vr of the Flash, then show flashSource
	// Else, Show the imageSource
	// Users can only see PMA Flash version if they have Flash 6 or higher installed.
	MM_contentVersion = 8; 
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

	// Determine which browser the user has, since NN and IE handle the Flash Player plugin differently
	if (plugin) {
		// Checks the Flash Player version for NN
		MM_FlashCanPlay = NN_FlashChecker();
	} else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		// Checks the Flash Player version for IE
		MM_FlashCanPlay = IE_FlashChecker();
	}
	if ( MM_FlashCanPlay ) {return true; }
	else {return false; }
}
// ------------------------------------------------------------------------------------------------------------
// Flash Version Detection Function
//
// Checks if the Flash Player exists. If exists, returns the flash player version number, otherwise returns -1.
function GetFlashVersion() {		
  
  var flashVersion;
  
  //default to -1
  flashVersion = -1;
  
  var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

// Determine which browser the user has, since NN/Firefox and IE handle the Flash Player plugin differently
  if (plugin) {
		
		// Checks the Flash Player version for NN
		flashVersion = NN_GetFlashVersion();
		
  } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		
		// Checks the Flash Player version for IE
		flashVersion = IE_GetFlashVersion();
	}	
	
	return (flashVersion);

}

// Detects the Flash Player plugin for Netscape
function NN_GetFlashVersion() {

	var flashVersion;
	
	//Default to -1
	MM_PluginVersion = -1;
	
	var words = navigator.plugins["Shockwave Flash"].description.split(" ");
	for (var i = 0; i < words.length; ++i) {
		if (isNaN(parseInt(words[i])))
		continue;
		flashVersion = words[i]; 
	}
	
	return (flashVersion);
}

var IEFlashVersion;

// Utility Funcitons for Flash Dectection
//
// Detects the Flash Player plugin for Internet Explorer
function IE_GetFlashVersion() {

	//Default to -1
	IEFlashVersion = -1;
	
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('For i = 2 to 15 \n');	
	document.write('If Not(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & i))) Then \n');
	document.write('Else \n');
	document.write('IEFlashVersion = i \n');
	document.write('End If \n');	
	document.write('Next \n');	
	document.write('</SCR' + 'IPT\> \n');
		
	return (IEFlashVersion);
}

/* End of flash.js */
// ----------------------------------------------
// File:		flashAPI.js
// Author:		Nathan Derksen
// Description:	Wrapper class for Flash detect kit. Requires the adobe AC_OETags.js file to be in place as well.
// Example:
// var itemFlash = new FlashAPI("itemImage");
// itemFlash.setAttribute("src", "/Shared/flash/itemZoom.swf");
// itemFlash.setAttribute("width", "475");
// itemFlash.setAttribute("height", "440");
// itemFlash.setAttribute("bgcolor", itemZoomProperties.backgroundColor);
// itemFlash.setAttribute("flashVars", imageZoomData);
// itemFlash.setAttribute("name", "itemZoom");
// itemFlash.setAlternateHTML(alternateHTML);
// itemFlash.setFlashVersion(8, 0, 0);
// itemFlash.generateFlash();
// ----------------------------------------------

var FlashAPI_skipFlashFocus = false;

// ----------------------------------------------
// Function:	FlashAPI()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<String> id: The ID for the tag to hold the Flash content
// Returns:		<Nothing>
// ----------------------------------------------
function FlashAPI(handle)
{
	this.pHandle = handle;
	
	this.pAttributes = new Object();
	this.pAttributes["width"] = 100;
	this.pAttributes["height"] = 100;
	this.pAttributes["wmode"] = "opaque";
	this.pAttributes["quality"] = "high";
	this.pAttributes["scale"] = "noscale";
	this.pAttributes["salign"] = "tl";
	this.pAttributes["bgcolor"] = "#FFFFFF";
	this.pAttributes["quality"] = "high";
	this.pAttributes["play"] = "true";
	this.pAttributes["loop"] = "false";
	this.pAttributes["allowScriptAccess"] = "sameDomain";

	this.pAlternateHTML = "";
	this.pAlternateImage = "";
	this.pRedirectURL = "";
	this.pAlternateMobile = "";
		
	this.pVersionMajor = 9;
	this.pVersionMinor = 0;
	this.pVersionRevision = 0;

	// Fix for IE title issue - trap focus event which triggers title replacement
	if (typeof (pageTitle_verify) != "undefined") {
		this.setAttribute("onfocus", "pageTitle_verify();");
	}
	this.setAttribute("menu", "false");
}

// ----------------------------------------------
// Function:	setAttribute()
// Author:		Nathan Derksen
// Description:	Sets the various attributes to be used within the <object> and <embed> tags. 
//				Certain attributes will automatically be put within certain tags (such as width 
//				and height in the <object> and <embed> tags and flashvars in the <param> and <embed> tags.
// Inputs:		<String> attName: The attribute name to set
//				<String> attValue: Value to give the specified attribute
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAttribute = function(attName, attValue)
{
	if (attName)
	{
		this.pAttributes[attName] = attValue;
	}
};

// ----------------------------------------------
// Function:	setAlternateHTML()
// Author:		Nathan Derksen
// Description:	Specify the HTML to show in the event that the user does not have a recent enough version of Flash.
//				This HTML will be applied when the generateFlash method is called.
// Inputs:		<String> alternateHTML: The HTML to place inside the element specified in the constructor
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateHTML = function(alternateHTML)
{
	if (alternateHTML)
	{
		this.pAlternateHTML = alternateHTML;
	}
};

// ----------------------------------------------
// Function:	setAlternateImage()
// Author:		Nathan Derksen
// Description:	Specify an image to show in the event that the user does not have a recent enough version of Flash.
//				This image will be applied when the generateFlash method is called. Note that this method overrides 
//				the effect of setAlternateHTML().
// Inputs:		<String> src: The source of the image to place inside the element specified in the constructor. 
//				The dimensions used are taken from the width and height attributes assigned to the Flash component 
//				through setAttribute().
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateImage = function(src)
{
	if (src)
	{
		this.pAlternateImage = src;
	}
};

// ----------------------------------------------
// ----------------------------------------------
FlashAPI.prototype.setAlternateMobile = function(src)
{
	if (src)
	{
		this.pAlternateMobile = src;
	}
};

// ----------------------------------------------
// Function:	setAlternateRedirect()
// Author:		Nathan Derksen
// Description:	Specify a url to navigate to in the event that the proper version of the Flash plugin is not installed.
// Inputs:		<String> url: The location to navigate to.
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateRedirect = function(url)
{
	if (url)
	{
		this.pRedirectURL = url;
	}
};


// ----------------------------------------------
// Function:	setFlashVersion()
// Author:		Nathan Derksen
// Description:	Specify the version of the Flash player to set as minimum. Anything below this value will trigger
//				the alternate display when the generateFlash() method is called.
// Inputs:		<Number> major: The major version (eg 9)
//				<Number> minor: The minor version (almost always zero)
//				<Number> revision: The revision (generally zero, but may be higher. Set to zero if unsure)
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setFlashVersion = function(major, minor, revision)
{
	if (major)
	{
		this.pVersionMajor = major;
	}
	if (minor)
	{
		this.pVersionMinor = minor;
	}
	if (revision)
	{
		this.pVersionRevision = revision;
	}
};

// ----------------------------------------------
// Function:	generateFlash()
// Author:		Nathan Derksen
// Description:	Trigger the rendering of the Flash component. Nothing is displayed until this method is called.
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.generateFlash = function(inline)
{
	var isInline = false;
	if (inline == true)
	{
		isInline = true;
	}
	var validate = false;

	if (this.pHandle)
	{
		validate = true;
	}
	else if (isInline == true)
	{
		validate = true;
	}

	if (validate == true)
	{
		var hasReqVers = DetectFlashVer(this.pVersionMajor, this.pVersionMinor, this.pVersionRevision);

		var attributeList = new Array();
		for (var attribute in this.pAttributes)
		{
			attributeList.push(attribute);
			attributeList.push(this.pAttributes[attribute]);
		}

		if (hasReqVers == true)
		{
			if (this.pAlternateMobile != "" && isMobile() == true)
			{
				if (isInline == true)
				{
					document.write(this.pAlternateMobile);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateMobile;
				}
			}
			else
			{
				var args = AC_GetArgs(attributeList, "", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
				var html = "";
				html += '<object ';
				for (var attr in args.objAttrs)
				{
					html += attr + '="' + args.objAttrs[attr] + '" ';
				}
				html += '>';
				for (var attr in args.params)
				{
					html += '<param name="' + attr + '" value="' + args.params[attr] + '" />';
				}
				html += '<embed ';
				for (var attr in args.embedAttrs)
				{
					html += attr + '="' + args.embedAttrs[attr] + '" ';
				}
				html += '></embed></object>';
				if (isInline == true)
				{
					document.write(html);
				}
				else
				{
					this.pHandle.innerHTML = html;
				}
				this.triggerBlur();
			}
		}
		else
		{
			if (this.pAlternateMobile != "" && isMobile() == true)
			{
				if (isInline == true)
				{
					document.write(this.pAlternateMobile);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateMobile;
				}
			}
			else if (this.pRedirectURL != "")
			{
				window.location.href = this.pRedirectURL;
			}
			else if (this.pAlternateImage != "")
			{
				if (isInline == true)
				{
					document.write('<img src="' + this.pAlternateImage + '" width="' + this.pAttributes["width"] + '" height="' + this.pAttributes["height"] + '" />');
				}
				else
				{
					this.pHandle.innerHTML = '<img src="' + this.pAlternateImage + '" width="' + this.pAttributes["width"] + '" height="' + this.pAttributes["height"] + '" />';
				}
			}
			else
			{
				if (isInline == true)
				{
					document.write(this.pAlternateHTML);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateHTML;
				}
			}
		}
	}
};

// ----------------------------------------------
// Function:	triggerBlur()
// Author:		Nathan Derksen
// Description:	Manually remove the focus from the Flash module
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.triggerBlur = function()
{
	var elements = [];
	
	if (parent == window)
	{
		// not in an iframe		
		if (document.getElementById("divLogo") != null)
		{
			elements = document.getElementById("divLogo").getElementsByTagName("a");
		}
		else
		{
			elements = document.getElementsByTagName("a");
		}
	}
	else
	{
		// in an iframe, get around the fact that the first bunch of links are not visible and can't be detected as such
		if (document.getElementById("divPageContent") != null)
		{
			elements = document.getElementById("divPageContent").getElementsByTagName("a");
		}
	}

    try {
        // 3219: Fails in IE if <a> tag is hidden, so catch the error so that rest of code isn't aborted
        if (elements.length > 0) {
            if (FlashAPI_skipFlashFocus == false) {
                elements[0].focus();
                elements[0].blur();
            }
        }
    }
    catch (err) {
    }

    if (typeof (pageTitle_verify) != "undefined")
	{
		pageTitle_verify();
	}
}

// ----------------------------------------------
// Function:	isFlashAvailable()
// Author:		Nathan Derksen
// Description:	A static helper method that allows for a Flash player version test without actually needing to create 
//				a new instance of FlashAPI.
// Inputs:		<Number> major: The major version (eg 9)
//				<Number> minor: The minor version (almost always zero)
//				<Number> revision: The revision (generally zero, but may be higher. Set to zero if unsure)
// Returns:		<Boolean>: True if the installed player is greater than or equal to the passed in parameters, false otherwise.
// ----------------------------------------------
FlashAPI.isFlashAvailable = function(major, minor, revision)
{
	return DetectFlashVer(major, minor, revision);
};

FlashAPI.getHandle = function(movieName)
{
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	var windowRef = window[movieName];
	var documentRef = document[movieName];
	
	if (isIE)
	{
		if (windowRef) {
			return windowRef;
		} else {
			return document.getElementById(movieName);
		}
	}
	else
	{
		if (documentRef && documentRef.length > 0)
		{
			// Some flash embed implementations use "name" for both object and embed tags. We want the embed one.
			return documentRef[documentRef.length-1];
		}
	}
	return null;
};

/* End of flashAPI.js */
// GlobalMenuManager.js, for managing top nav overlay component

var hoverOnEvent;
var hoverOffEvent;
var touchStartEvent;
var touchMoveEvent;
var touchEndEvent;

function GlobalMenuManager()
{
	this.pInstance = null;
}

GlobalMenuManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new GlobalMenuManager();
	}
	return this.pInstance;
};

GlobalMenuManager.prototype.init = function () {

    //auto advance carousel code
    var carouselTimer;

    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
    } else {
        hoverOnEvent = "mouseenter";
    }

    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
    } else {
        hoverOffEvent = "mouseleave";
    }

    if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            touchStartEvent = "MSPointerDown";
            touchMoveEvent = "MSPointerMove";
            touchEndEvent = "MSPointerUp";
        } else {
            touchStartEvent = "pointerdown";
            touchMoveEvent = "pointermove";
            touchEndEvent = "pointerup";
        }
    } else {
        touchStartEvent = "touchstart";
        touchMoveEvent = "touchmove";
        touchEndEvent = "touchend";
    }

    $(window).load(function () {
        autoAdvanceCarousel();
    });

    $("body").on("mouseenter", ".auto-advance", function () {
        clearInterval(carouselTimer);
        carouselTimer = null;
    });

    $("body").on("mouseleave", ".auto-advance", function () {
        autoAdvanceCarousel();
    });

    function autoAdvanceCarousel() {
        carouselTimer = setInterval(function () {
            $(".auto-advance").each(function () {
                if ($(this).hasClass("pager-circles")) {
                    var container = $(this).find(".container");
                    var next = $(this).find(".paging-circle.selected").next();

                    if (next.length) {
                        next.click();
                    } else {
                        if (supportsTransitions()) {
                            container.stop().css({
                                WebkitTransition: 'left 0s linear',
                                MozTransition: 'left 0s linear',
                                MsTransition: 'left 0s linear',
                                OTransition: 'left 0s linear',
                                transition: 'left 0s linear'
                            });
                        }
                        container.css("left", "100%");
                        //container.find(".grid-container:first").before(container.find(".grid-container:last"));
                        container.stop().animate({ left: "0%" }, 600, function () {
                            //container.find(".grid-container:last").after(container.find(".grid-container:first"));
                            //container.css("left", "0%");
                        });

                        $(this).find(".paging-circle").removeClass("selected");
                        $(this).find(".paging-circle:first").addClass("selected");
                        //$(this).find(".paging-circle:first").click();

                    }

                    //                    if ($(this).hasClass("auto-advance")) {
                    //                        var container = $(this).find(".container");
                    //                        var pages = container.find(".grid-container").length;

                    //                        if (pages > 2) {
                    //                            var next = container.find("div.current").next("div");
                    //                            container.find("div.current").removeClass("current");
                    //                            next.addClass("current");
                    //                            var index = next.index();

                    //                            container.find(".grid-container:last").after(container.find(".grid-container:first"));
                    //                            leftVal = (-1 * 100 * (index - 1));
                    //                            container.css("left", "0%");

                    //                            container.stop().animate({ left: leftVal + "%" }, 600);

                    //                            
                    //                            var next = $(this).find(".paging-circle.selected").next();
                    //                            $(this).find(".paging-circle").removeClass("selected");

                    //                            if (next.length) {
                    //                                next.addClass("selected");
                    //                            } else {
                    //                                $(this).find(".paging-circle:first").addClass("selected");
                    //                            }
                    //                        }
                    //                    }
                } else {
                    $(this).find(".page-right-box").click();
                }
            });
        }, 10000);
    }

    //nav flydown code	
    $("body").on("click", "#nav .flydowns a", function (e) {
        if (!$(this).hasClass("selected")) {
            if (hoverOnEvent != "click") {
                $(this).trigger(hoverOnEvent);
            }
            e.preventDefault();
        }
    });

    $("body").on(hoverOnEvent, "#nav .flydowns a", function (e) {
        var target = $(this);

        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                flydown(target);
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            flydown(target);
        }
    });

    $("body").on(hoverOffEvent, "#nav .flydowns, .browse-grid", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on("blur", "#searchInput, #lowRangeSearch, #highRangeSearch", function (e) {
        timer = setTimeout(function () {
            if ($("#advSearchDrops").is(":visible")) {
                if ($("#searchInput").hasClass("placeholder") && $("#lowRangeSearch").hasClass("placeholder") && $("#highRangeSearch").hasClass("placeholder") && $("#selectGEMSTONES").val() == "" && $("#selectMATERIALS").val() == "" && $("#selectCATEGORIES").val() == "") {
                    //$("#sitesearch").fadeOut(200);
                    $("#sitesearch input#searchInput").addClass("placeholder");
                    $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                }
            } else {
                if ($("#searchInput").hasClass("placeholder")) {
                    //$("#sitesearch").fadeOut(200);
                    $("#sitesearch input#searchInput").addClass("placeholder");
                    $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                }
            }

            $("a.search").removeClass("selected");
            clearTimeout(timer);
            timer = null;
        }, 1250);
    });

    $("body").on(hoverOffEvent, "#nav", function (e) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if ($("#flydown").is(":visible") && !$(e.target).parents("#flydown").length) {
            timer = setTimeout(function () {
                $("#flydown").fadeOut(300);
                $("#nav .flydowns a").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 3000);
        }

        if ($("#saved").is(":visible")) {
            timer = setTimeout(function () {
                $("#saved").fadeOut(300);
                $(".open-bag, .open-saved, .open-rings").removeClass("selected");
                $("#inlineLoading").show();
                $("#inlineContent").hide();
                clearTimeout(timer);
                timer = null;
            }, 3000);
        }

        if ($(".searchbar").is(":visible")) {
            timer = setTimeout(function () {
                $("#myAccountOverlay").fadeOut(200);
                $("#storesearch").fadeOut(200);
                $("#storesearch input").addClass("placeholder");
                $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));

                $("a.search").removeClass("selected");
                $("a.searchstores").removeClass("selected");
                $("a.my-account").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOnEvent, "#flydown, #saved", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on(hoverOffEvent, "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_MOUSE)) {
            if (!$(e.relatedTarget).parents("#flydown").length) {
                $("#flydown").fadeOut(300);
                $("#nav .flydowns a").removeClass("selected");
            }
        }
    });

    $("body").on("click", "#flydown .close", function (e) {
        $("#flydown").fadeOut(300);
        $("#nav .flydowns a").removeClass("selected");
        return false;
    });

    $('html').on('touchstart', function (e) {
        if ($(e.target) != $("#flydown") && !$(e.target).parents("#flydown").length && !$(e.target).parents(".flydowns").length) {
            $('#flydown').fadeOut();
            $("#nav .flydowns a").removeClass("selected");
        }

        if (!$(e.target).hasClass("rollbar") && !$(e.target).parents(".rollbar").length) {
            $('.custom-drop .rollbar').hide();
        }

        if (!$(e.target).hasClass("searchbar") && !$(e.target).parents(".searchbar").length) {
            $('#storesearch').hide();
        }
    });

    //flydown swipe
    var start;
    var end;
    var left;

    $("body").on(touchStartEvent, "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
            //start = e.originalEvent.targetTouches[0].pageX;
            start = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;
            end = start;
            var index = $("#nav .flydowns a.selected").index();
            left = -1 * 100 * index;
        }
    });

    $("body").on(touchMoveEvent, "#flydown", function (e) {

        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
            //end = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
            end = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;

            if (end > (start + 20) || end < (start - 20)) {
                e.preventDefault();

                var width = $("#flydown #container div:first").width();
                var moveVal = left + (((end - start) / width) * 100);
                var move = moveVal + "%";

                if (supportsTransitions()) {
                    $("#flydown #container").stop().css({
                        WebkitTransition: 'left 0s linear',
                        MozTransition: 'left 0s linear',
                        MsTransition: 'left 0s linear',
                        OTransition: 'left 0s linear',
                        transition: 'left 0s linear'
                    });
                }

                $("#flydown #container").css("left", move);
            }
        }
    });

    $("body").on(touchEndEvent, "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
            if (end > (start + 50)) {
                var prev = $("#nav .flydowns a.selected").prev("#nav .flydowns a");
                if (prev.length == 0) {
                    //$("#nav .flydowns a:last").trigger('mouseenter');
                    flydown($("#nav .flydowns a:last"));
                } else {
                    //$("#nav .flydowns a.selected").prev().trigger('mouseenter');
                    flydown($("#nav .flydowns a.selected").prev());
                }
            } else if (end < (start - 50)) {
                var next = $("#nav .flydowns a.selected").next("#nav .flydowns a");
                if (next.length == 0) {
                    //$("#nav .flydowns a:first").trigger('mouseenter');
                    flydown($("#nav .flydowns a:first"));
                } else {
                    //$("#nav .flydowns a.selected").next().trigger('mouseenter');
                    flydown($("#nav .flydowns a.selected").next());
                }
            }
        }
    });

    //end nav flydown code


    // start reusable touch/slide pager
    var touchPagerStart;
    var touchPagerEnd;
    var touchPagerLeft;

    initTouchpager();

    $("body").on(touchStartEvent, ".touchpager", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
            //touchPagerStart = e.originalEvent.targetTouches[0].pageX;
            touchPagerStart = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;
            touchPagerEnd = touchPagerStart;
            var index = $(this).find(".container div.current").index();
            touchPagerLeft = -1 * 100 * index;
            if ($(this).hasClass("statement")) {
                touchPagerLeft = (-1 * 40 * index) + 30;
            } else if ($(this).hasClass("romance-tips")) {
                touchPagerLeft = (-1 * 40 * index) + 30;
            }
        }
    });

    $("body").on(touchMoveEvent, ".touchpager", function (e) {
        var pages = $(this).find(".grid-container").length;
        if (pages > 1) {
            if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
                var container = $(this).find(".container");
                //touchPagerEnd = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
                touchPagerEnd = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;

                if (touchPagerEnd > (touchPagerStart + 20) || touchPagerEnd < (touchPagerStart - 20)) {
                    e.preventDefault();

                    var pageWidth = container.find("div.current").width();
                    var moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / pageWidth) * 100);
                    if ($(this).hasClass("statement")) {
                        moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / (pageWidth * 2.5)) * 100);
                    } else if ($(this).hasClass("romance-tips")) {
                        moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / (pageWidth * 2.5)) * 100);
                    }

                    if (supportsTransitions()) {
                        container.stop().css({
                            WebkitTransition: 'left 0s linear',
                            MozTransition: 'left 0s linear',
                            MsTransition: 'left 0s linear',
                            OTransition: 'left 0s linear',
                            transition: 'left 0s linear'
                        });
                    }

                    container.css("left", moveVal + "%");
                }
            }
        }
    });

    $("body").on(touchEndEvent, ".touchpager", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == "touch")) {
            var touchPager = $(this);
            var container = $(this).find(".container");
            var pages = container.find(".grid-container").length;
            var index;
            var nextPage = 0;
            var direction = "";

            if (touchPagerEnd > (touchPagerStart + 50)) {
                var direction = "left";
                var prev = container.find("div.current").prev("div");

                if (prev.length > 0) {
                    nextPage = 1;
                    container.find("div.current").removeClass("current");
                    prev.addClass("current");
                    index = prev.index();
                    var childNum = index + 1;

                    if (childNum == 1) {
                        $(this).find(".page-left-box span").hide();
                    }
                    $(this).find(".page-right-box span").show();

                    if ($(this).hasClass("pager-circles")) {
                        $(this).find(".paging-circle.selected").removeClass("selected").prev().addClass("selected");
                    } else {
                        $(this).find(".currentPage").html(childNum);
                    }
                } else {
                    nextPage = 0;
                    index = container.find("div.current").index();
                }
                TrackMobileCarousel("left");

            } else if (touchPagerEnd < (touchPagerStart - 50)) {
                var direction = "right";
                var next = container.find("div.current").next("div");

                if (next.length > 0) {
                    nextPage = 1;
                    container.find("div.current").removeClass("current");
                    next.addClass("current");

                    index = next.index();
                    var childNum = index + 1;

                    if (childNum == pages) {
                        $(this).find(".page-right-box span").hide();
                    }
                    $(this).find(".page-left-box span").show();

                    if ($(this).hasClass("pager-circles")) {
                        $(this).find(".paging-circle.selected").removeClass("selected").next().addClass("selected");
                    } else {
                        $(this).find(".currentPage").html(childNum);
                    }

                } else {
                    nextPage = 0;
                    index = container.find("div.current").index();
                }
                TrackMobileCarousel("right");

            } else {
                index = container.find("div.current").index();
            }

            var leftVal = -1 * 100 * index;
            var itemText1;
            var itemText2;
            var itemDetails;
            if ($(this).hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                if (nextPage > 0) {
                    $("#statement-details").animate({ opacity: 0 }, 200);
                    itemText1 = container.find("div.current").find("img").attr("data-collection");
                    itemText2 = container.find("div.current").find("img").attr("data-itemname");
                    itemDetails = container.find("div.current").find("img").attr("data-href");
                }
            } else if ($(this).hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4 && direction != "") {
                    if (direction == "left") {
                        container.find(".grid-container:first").before(container.find(".grid-container:last"));
                        leftVal = (-1 * 40 * (index + 1)) + 30;
                        container.css("left", "-90%");
                    } else {
                        container.find(".grid-container:last").after(container.find(".grid-container:first"));
                        leftVal = (-1 * 40 * (index - 1)) + 30;
                        container.css("left", "-10%");
                    }

                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 200ms linear',
                    MozTransition: 'left 200ms linear',
                    MsTransition: 'left 200ms linear',
                    OTransition: 'left 200ms linear',
                    transition: 'left 200ms linear'
                });

                if (nextPage > 0) {
                    setTimeout(function () {
                        var loadnext = container.find("div.current").next("div").next("div");
                        if (loadnext.length > 0) {
                            loadnext.find("img").each(function () {
                                $(this).attr("src", $(this).attr("data-src"));
                            });
                            if (typeof preloadImages == 'function') {
                                preloadImages(touchPager.attr("id"));
                            }
                        }
                    }, 200);
                }
            } else {
                container.stop().animate({ left: leftVal + "%" }, 200, function () {
                    if (nextPage > 0) {
                        var loadnext = container.find("div.current").next("div").next("div");
                        if (loadnext.length > 0) {
                            loadnext.find("img").each(function () {
                                $(this).attr("src", $(this).attr("data-src"));
                            });
                            if (typeof preloadImages == 'function') {
                                preloadImages(touchPager.attr("id"));
                            }
                        }
                    }
                });
            }

            if (nextPage > 0 && touchPager.hasClass("statement")) {
                var model = StateModel.getInstance();
                var hash = window.location.hash.split("#").join("");
                if (hash == "") {
                    hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
                }

                var stateSnapshot = model.getStateSnapshot();

                if (hash != "") {
                    stateSnapshot = URLFactory.convertHashToState(hash);
                }
                else if (searchParams != "") {
                    stateSnapshot = URLFactory.convertHashToState(searchParams);
                }
                var page = stateSnapshot.flash;
                if (!page) { page = 1; }
                if (direction == "right") {
                    page++;
                } else {
                    page--;
                }

                hash = URLFactory.updateHash(hash, "flash", page);

                if (e.hasOwnProperty('originalEvent')) {
                    window.location.replace("#" + hash);
                    HistoryManager.getInstance().overrideBaseState(hash);

                    $(".touchpager a").each(function () {
                        var href = $(this).attr("href").split("&search_params=");
                        var newHref = href[0] + "&search_params=" + hash;
                        $(this).attr("href", newHref);
                    });
                }

                var newhash = window.location.hash;
                newhash = newhash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + newhash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 200);
            }
        }
    });

    $("body").on("click", ".touchpager.pager-circles .paging-circle.selected", function (e) {
        return false;
    });

    $("body").on("click", ".touchpager.pager-circles .paging-circle:not('.selected')", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var index = $(this).index();

        $(this).addClass("selected").siblings().removeClass("selected");

        var leftVal = -1 * 100 * index;
        if (supportsTransitions()) {
            container.stop().css({
                left: leftVal + "%",
                WebkitTransition: 'left 600ms linear',
                MozTransition: 'left 600ms linear',
                MsTransition: 'left 600ms linear',
                OTransition: 'left 600ms linear',
                transition: 'left 600ms linear'
            });
        } else {
            container.stop().animate({ left: leftVal + "%" }, 600);
        }
        if (touchPager.hasClass("statement")) {
            setTimeout(function () {
                $("#itemText1").html(itemText1);
                $("#itemText2").html(itemText2);
                $("#itemDetails").attr("href", itemDetails);
                $("#statement-details").animate({ opacity: 1 }, 400);
            }, 600);
        }

        TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "pagerCircles", index + 1);

        return false;
    });

    $("body").on("click", ".touchpager .saved-left, .touchpager .page-left-box", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var pages = container.find(".grid-container").length;

        var prev = container.find("div.current").prev("div");

        if (prev.length > 0) {
            container.find("div.current").removeClass("current");
            prev.addClass("current");
            var index = prev.index();
            var childNum = index + 1;
            touchPager.find(".currentPage").html(childNum);

            if (childNum == 1 && !touchPager.hasClass("romance-tips")) {
                $(this).find("span").hide();
            }
            touchPager.find(".page-right-box span").show();

            var leftVal = -1 * 100 * index;
            if (touchPager.hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                $("#statement-details").animate({ opacity: 0 }, 200);
                var itemText1 = prev.find("img").attr("data-collection");
                var itemText2 = prev.find("img").attr("data-itemname");
                var itemDetails = prev.find("img").attr("data-href");
            } else if (touchPager.hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4) {
                    container.find(".grid-container:first").before(container.find(".grid-container:last"));
                    leftVal = (-1 * 40 * (index + 1)) + 30;
                    container.css("left", "-90%");
                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 600ms linear',
                    MozTransition: 'left 600ms linear',
                    MsTransition: 'left 600ms linear',
                    OTransition: 'left 600ms linear',
                    transition: 'left 600ms linear'
                });
            } else {
                container.stop().animate({ left: leftVal + "%" }, 600);
            }
            if (touchPager.hasClass("statement")) {
                var hash = window.location.hash;
                hash = hash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + hash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 600);
            }
            TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "standardCarousel", index + 1);
        }

        return false;
    });

    $("body").on("click", ".touchpager .saved-right, .touchpager .page-right-box", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var pages = container.find(".grid-container").length;

        var next = container.find("div.current").next("div");

        if (next.length > 0) {
            container.find("div.current").removeClass("current");
            next.addClass("current");

            var index = next.index();
            var childNum = index + 1;
            touchPager.find(".currentPage").html(childNum);

            if (childNum == pages && !touchPager.hasClass("romance-tips")) {
                $(this).children("span").hide();
            }
            touchPager.find(".page-left-box span").show();

            var leftVal = -1 * 100 * index;
            if (touchPager.hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                $("#statement-details").animate({ opacity: 0 }, 200);
                var itemText1 = next.find("img").attr("data-collection");
                var itemText2 = next.find("img").attr("data-itemname");
                var itemDetails = next.find("img").attr("data-href");
            } else if (touchPager.hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4) {
                    container.find(".grid-container:last").after(container.find(".grid-container:first"));
                    leftVal = (-1 * 40 * (index - 1)) + 30;
                    container.css("left", "-10%");
                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 600ms linear',
                    MozTransition: 'left 600ms linear',
                    MsTransition: 'left 600ms linear',
                    OTransition: 'left 600ms linear',
                    transition: 'left 600ms linear'
                });

                var loadnext = container.find("div.current").next("div").next("div");
                if (loadnext.length > 0) {
                    loadNextPage(loadnext);
                }
            } else {
                container.stop().animate({ left: leftVal + "%" }, 600, function () {
                    var loadnext = container.find("div.current").next("div").next("div");
                    if (loadnext.length > 0) {
                        loadnext.find("img").each(function () {
                            $(this).attr("src", $(this).attr("data-src"));
                        });
                        if (typeof preloadImages == 'function') {
                            preloadImages(touchPager.attr("id"));
                        }
                    }
                });
            }

            if (touchPager.hasClass("statement")) {
                var hash = window.location.hash;
                hash = hash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + hash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 600);
            }
            TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "standardCarousel", index + 1);
        }

        return false;
    });

    // end reusable touch/slide pager
}

function initTouchpager(targetTouchpager, startlastpage) {
    var touchpagers;
    if (targetTouchpager) {
        touchpagers = $(targetTouchpager);
    } else {
        touchpagers = $(".touchpager");
    }
    touchpagers.each(function () {
        var container = $(this).find(".container");
        var pages = container.children(".grid-container").length;

        if (pages > 0) {
            var containerWidth = pages * 100;
            container.find(".grid-container:first").addClass("current");
            var pageWidth = 100 / pages;

            if ($(this).hasClass("statement")) {
                containerWidth = containerWidth / 2.5;
                //                var pagePadding = 0.01;
                //                pageWidth = pageWidth - (pagePadding * 2);
                //                container.find(".grid-container").css("padding", "0 " + pagePadding + "%");
                container.css("left", "30%");
                var itemText1 = container.find(".current").find("img").attr("data-collection");
                var itemText2 = container.find(".current").find("img").attr("data-itemname");
                var itemDetails = container.find(".current").find("img").attr("data-href");
                $("#itemText1").html(itemText1);
                $("#itemText2").html(itemText2);
                $("#itemDetails").attr("href", itemDetails);
            } else if ($(this).hasClass("romance-tips")) {
                containerWidth = containerWidth / 2.5;

                if (pages > 4) {
                    $(this).find(".grid-container:first").before($(this).find(".grid-container:last"));
                    $(this).find(".grid-container:first").before($(this).find(".grid-container:last"));
                    container.css("left", "-50%");
                } else {
                    container.css("left", "30%");
                }
            }

            container.css("width", containerWidth + "%");            

            if ($("body").hasClass("ie") || $("body").hasClass("firefox")) {
                var width = Math.ceil(container.width());
                itemWidth = Math.floor(width / pages);

                container.children(".grid-container").css("width", itemWidth + "px");
            } else {
                container.children(".grid-container").css("width", pageWidth + "%");
            }

            if ($(this).hasClass("pager-circles")) {
                $(this).find(".paging").html("");
                if (pages > 1) {
                    for (var i = 0; i < pages; i++) {
                        //Aug-31  shamin    added Tracking Codes for Carousel Paging
                        $(this).find(".paging").prepend('<a href="#" class="paging-circle" name="' + (pages - i) + '" onclick="TrackCarouselClick($(this).parent().prev().children().eq(0).text(), $(this).parent().prev().children().eq(1).text(), this.name);"></a>');
                    }
                }
                $(this).find(".paging-circle:first").addClass("selected");
            } else {
                $(this).find(".totalPages").html(pages);
                $(this).find(".currentPage").html("1");
            }

            if (startlastpage) {
                $(this).find(".page-right-box span").hide();

                if (pages > 1) {
                    $(this).find(".page-left-box span").show();
                }
            } else {
                $(this).find(".page-left-box span, .page-right-box span").hide();

                if (pages > 1) {
                    $(this).find(".page-right-box span").show();
                }

                if ($(this).hasClass("romance-tips") && pages > 4) {
                    $(this).find(".page-left-box span, .page-right-box span").show();
                }
            }

            if (!$(this).hasClass("romance-tips") && !$(this).hasClass("statement")) {
                $(this).find(".paging").fadeIn();
            }
        }
    });
}

function loadNextPage(page) {
    var touchPagerID = page.parents(".touchpager").attr("id");

    setTimeout(function () {
        page.find("img").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });
        if (typeof preloadImages == 'function') {
            preloadImages(touchPagerID);
        }        
    }, 600);
}

/* End of GlobalMenuManager.js */
// MarketingTileLayoutManager.js
function MarketingTileLayoutManager()
{
	this.pInstance = null;

}

MarketingTileLayoutManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new MarketingTileLayoutManager();
	}
	return this.pInstance;
};

MarketingTileLayoutManager.prototype.draw = function (tileDataArray)
{
	var i, n;
	var tileHandle;

	if (typeof (tileDataArray) != "undefined" && tileDataArray != null)
	{
		for (i = 0, n = tileDataArray.length; i < n; i++)
		{
			tileHandle = $(tileDataArray[i].id);
		}
	}
}

/* End of MarketingTileLayoutManager.js */
// ----------------------------------------------
// File:		MassFadeEffect.js
// Author:		Nathan Derksen
// Description:	Manages image fade transitions amongst a number of images
// Example:
// massFadeInstance.addTarget("imageId", 20);
// ----------------------------------------------


// Global variable made available for convenience. Not done through a singleton due to performance optimization.
// This is a optimization sensitive grouping of code.
var massFadeInstance;

// ----------------------------------------------
// Function:	MassFadeEffect()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function MassFadeEffect()
{
	this.objectList = new Array();
	this.isRunning = false;
}
MassFadeEffect.fadeCompleteHandler = null;
// ----------------------------------------------
// Function:	addTarget()
// Author:		Nathan Derksen
// Description:	Indicate an image that is to be given a fade transition
// Inputs:		<String> targetId - The ID of the image to fade
//				<Number> rate - The number of percentage points to modify the fade for each animation interval. 
//						Positive values are for fade in, negative values are for fade out
// Returns:		<Nothing>
// ----------------------------------------------
MassFadeEffect.prototype.addTarget = function(targetId, rate)
{
	var targetElement = document.getElementById(targetId);
	if (rate)
	{
		if (rate == 0 || rate == null || rate == "")
		{
			rate = 20;
		}
	}
	else
	{
		rate = 20;
	}
	
	if (targetElement)
	{
		targetElement.style.visibility = "visible";
		if (rate < 0)
		{
			this.objectList[targetId] = {handle:targetElement, opacity:100+rate, rate:rate};
			setOpacity(targetElement, 100+rate);
		}
		else
		{
			this.objectList[targetId] = {handle:targetElement, opacity:0+rate, rate:rate};
			setOpacity(targetElement, 0+rate);
		}

		if (this.isRunning == false)
		{
			this.isRunning = true;
			setTimeout("updateOpacities()", 50);
		}
	}
};


// ----------------------------------------------
// Function:	updateOpacities()
// Author:		Nathan Derksen
// Description:	Change the opacities of each image in the list of images to transition according to its current and target opacities.
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function updateOpacities() 
{
	var itemArray = massFadeInstance.objectList;
	var itemHandle;
	var itemFound = false;
	
	for (var item in itemArray)
	{
		itemFound = true;
		itemHandle = itemArray[item];
		
		if (itemHandle.rate > 0 && itemHandle.opacity >= 100)
		{
			setOpacity(itemHandle.handle, 100);
			delete massFadeInstance.objectList[item];
		}
		else if (itemHandle.rate < 0 && itemHandle.opacity <= 0)
		{
			setOpacity(itemHandle.handle, 0);
			delete massFadeInstance.objectList[item];
		}
		else
		{
			setOpacity(itemHandle.handle, itemHandle.opacity);
			itemHandle.opacity += itemHandle.rate;
		}
	}

	if (itemFound == true)
	{
		setTimeout("updateOpacities()", 50);
	}
	else
	{
		massFadeInstance.isRunning = false;
		if (MassFadeEffect.fadeCompleteHandler) {
			MassFadeEffect.fadeCompleteHandler();
		}
	}
};



// ----------------------------------------------
// Function:	setOpacity()
// Author:		Nathan Derksen
// Description:	Change the opacity of a particular image
// Inputs:		<Element> sourceObj - The object to modify
//				<Number> number - The new opacity number
// Returns:		<Nothing>
// ----------------------------------------------
function setOpacity(sourceObj, opacity) 
{
	opacity = (opacity == 100)?99.999:opacity;

	// IE/Win
	if (opacity < 99.999)
	{
		sourceObj.style.filter = "alpha(opacity:"+opacity+")";
	}
	else
	{
		sourceObj.style.filter = "";
	}

	// Safari<1.2, Konqueror
	sourceObj.style.KHTMLOpacity = opacity/100;

	// Older Mozilla and Firefox
	sourceObj.style.MozOpacity = opacity/100;

	// Safari 1.2, newer Firefox and Mozilla, CSS3
	sourceObj.style.opacity = opacity/100;
};

function revealImage(id)
{
	//sometimes this will fire BEFORE we add the element to the DOM, so delay it a smidge
	setTimeout(function () {
		massFadeInstance.addTarget(id);
	}, 10);
}

// Initialize the fade manager.
massFadeInstance = new MassFadeEffect();

/* End of MassFadeEffect.js */
// OverlayManager.js, for creating and managing UI overlays
// Currently, it assumes that the modal content exists in the page DOM

function OverlayManager() {
	this.pInstance = null;
	this.initialScrollPosition = null;
}

OverlayManager.getInstance = function () {
	if (!this.pInstance) 	{
		this.pInstance = new OverlayManager();
	}
	return this.pInstance;
};

var deeplink;

OverlayManager.prototype.init = function () {
	var hoverOnEvent;
	var parent = this;

	if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
		hoverOnEvent = "click";
	} else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
	} else {
		hoverOnEvent = "mouseenter";
	}

	var hoverOffEvent;
	if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
		hoverOffEvent = "mouseleave";
	} else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
	} else {
		hoverOffEvent = "mouseleave";
	}

	var parent = this;

	//modals
	$("body").on("click", ".open-modal", function () {
		var id = $(this).attr("id");
		deeplink = $(this).attr('href').split('#')[1];

		if (typeof (id) != "undefined" && id != null && id != "") {
			parent.open(id);
		}

		return false;
	});

	$("body").on("click touchstart", ".modal-popup .close, .btn.cancel, #gray-overlay", function () {
		parent.close();
		$("#gray-overlay").removeClass("newVideo");
		return false;
	});

	$(HistoryManager.getInstance()).bind("historyChanged", function (e, data) {
		var overlayId = data.state.popup;
		if (overlayId == "") {
			if ($(".modal-popup").css("display") != "none") {
				// Don't close an already closed overlay
				parent.close(null, true);
			}
		}
		else {
			parent.open(overlayId, null, true);
		}
	});

	// Open an overlay if the overlay value in the page hash has been set.
	var storyId;
	var hashOverlayValue = URLFactory.extractValue(window.location.hash.split("#").join(""), "popup");
	if (hashOverlayValue != null && hashOverlayValue != "") {
		if (hashOverlayValue.indexOf("storyText") == 0) {
			// Override for WMLT stories, overlay needs to be able to be opened without the link being present
			storyId = hashOverlayValue.split("storyText").join("");
			if (ValidationHelper.isValidNumber(storyId) == true) {
				OverlayManager.getInstance().open(hashOverlayValue, {
					url: "/WorldOfTiffany/WMLT/Stories/Text.aspx?ContentLinkID=" + storyId,
					size: "full",
					iframe: false,
					position: "top"
				});
			}
		}
		else if (hashOverlayValue.indexOf("storyVideo") == 0) {
			// Override for WMLT stories, overlay needs to be able to be opened without the link being present
			storyId = hashOverlayValue.split("storyVideo").join("");
			if (ValidationHelper.isValidNumber(storyId) == true) {
				OverlayManager.getInstance().open(hashOverlayValue, {
					url: "/Video/VideoOverlay.aspx?config=/WorldOfTiffany/WMLT/Stories/StoryData.aspx?contentLinkID=" + storyId,
					size: "full",
					iframe: true,
					position: "top"
				});
			}
		}
		else {
			this.open(hashOverlayValue);
		}
	}
}

OverlayManager.prototype.open = function (handleOrName, overrides, suppressHistory) {

	var hash = window.location.hash.split("#").join("");
	var query = "";

	suppressHistory = (typeof(suppressHistory) == "undefined") ? false : suppressHistory;

	if (hash == "") {
		hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
	}

	var props = {
		url: "",
		size: "",
		iframe: true,
		position: "",
		bgstyle: "",
		height: "auto"
	}

	this.initialScrollPosition = $(window).scrollTop();

	if (typeof (handleOrName) == "string") {

		if (typeof ($("#" + handleOrName).attr("href")) != "undefined") {
			props.url = $("#" + handleOrName).attr("href");
		}
		if (typeof ($("#" + handleOrName).attr("data-iframe")) != "undefined") {
			props.iframe = ($("#" + handleOrName).attr("data-iframe").toLowerCase() == "true") ? true : false;
		}
		if (typeof ($("#" + handleOrName).attr("data-size")) != "undefined") {
			props.size = $("#" + handleOrName).attr("data-size");
		}
		if (typeof ($("#" + handleOrName).attr("data-position")) != "undefined") {
			props.position = $("#" + handleOrName).attr("data-position");
		}
		if (typeof ($("#" + handleOrName).attr("data-bgstyle")) != "undefined") {
			props.bgstyle = $("#" + handleOrName).attr("data-bgstyle");
		}
		if (typeof ($("#" + handleOrName).attr("data-height")) != "undefined") {
			props.height = $("#" + handleOrName).attr("data-height");
		}

		this.close(null, true); // Make sure to destroy the previous overlay if one is already open

		if (typeof (overrides) != "undefined" && overrides != null) {
			$.extend(props, overrides);
		}

		// Exception for WMLT Stories
		if (props.url.toLowerCase().indexOf("text.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
			query = props.url.split("?").join("&")
			handleOrName = "storyText" + URLFactory.extractQueryStringValue(query, "ContentLinkID");
		}
		else if (props.url.toLowerCase().indexOf("storydata.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
			query = props.url.split("?").join("&")
			handleOrName = "storyVideo" + URLFactory.extractQueryStringValue(query, "ContentLinkID");
		}


    if (suppressHistory == false) {
        if (hash.indexOf("-pu+") == -1) {
            // Hash contains a page anchor instead of valid state data, clear out the old anchor
            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
        }
			hash = URLFactory.updateHash(hash, "popup", handleOrName);
			window.location.hash = hash;
			HistoryManager.getInstance().addHistoryItem(hash);
		}

		//inject an iframe into the modal if needed
		if (props.iframe) {
			if (isIPad()) {
				$('meta[name="viewport"]').attr('content', 'width=1024px');
			}
			$("html").addClass('hasIframe');
			$(".modal-popup .content").html("<iframe frameBorder='0'></iframe>").attr("id", "overlayiframe");
			$(".modal-popup .content iframe").html("");
			if (props.height.toLowerCase() != "auto" && props.height != "") {
				$(".modal-popup").css("min-height", props.height + "px");
			}
			var isVideo = props.url.indexOf("/Video/VideoOverlay.aspx");
			if(isVideo >= 0){
				$(".modal-popup .content iframe").attr("scrolling", "no");	
				$(".modal-popup .content iframe").attr("allowfullscreen", "");	
			}
			$(".modal-popup .content iframe").load(function () {
				if (props.height == "auto" || props.height == "") {
					$(".modal-popup .content").css("height", "auto").removeClass("rollbar"); ;
				}
				else {
					$(".modal-popup .content").css("height", props.height + "px").addClass("rollbar"); ;
				}
				initRollbar();
				try {
				    $('a[rel="' + deeplink + '"]', $(".modal-popup .content iframe").contents()).click();
				} catch (e) {
				    // this is a crossdomain iframe
				}
			}).attr("src", props.url);
		} else {
			if (props.height.toLowerCase() != "auto" && props.height != "") {
				$(".modal-popup").css("min-height", props.height + "px");
			}
			$(".modal-popup .content").html("");
			$(".modal-popup .content").load(props.url, function () {
				if (props.height.toLowerCase() == "auto" || props.height == "") {
					$(".modal-popup .content").css("height", "auto").removeClass("rollbar");
				}
				else {
					$(".modal-popup .content").css("height", props.height + "px").addClass("rollbar");
				}
				globalAjaxCallback();
				$('a[rel="' + deeplink + '"]').click();
				// Exception for WMLT stories - once text page loads, check to see if story type has been changed to video.
				if (props.url.toLowerCase().indexOf("text.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
					if ($("#storyType").val() == "video") {
						OverlayManager.getInstance().open("storyVideo" + $("#contentLinkId").val(), {
							url: '/Video/VideoOverlay.aspx?config=/WorldOfTiffany/WMLT/Stories/StoryData.aspx?contentLinkID=' + $("#contentLinkId").val(),
							size: "full",
							iframe: true,
							position: "top"
						});
					}
				}
			});
		}

		var topValue;
		if (props.position == "top") {
			topValue = 0;
		} else {
			topValue = 110;
		}

		//style and show the modal
		$(".modal-popup").attr("class", "modal-popup").addClass(props.size).addClass(props.bgstyle).css("top", this.initialScrollPosition + topValue + "px").show();
		var isVideo = props.url.indexOf("/Video/VideoOverlay.aspx");
			if(isVideo >= 0){
			$(".modal-popup").addClass('videoOverlay');
			$(".modal-popup.videoOverlay .close").html("<img src='/shared/images/icons/newVideoControls/close.png' style='width:23px; height:24px'><img src='/shared/images/icons/newVideoControls/close_hover.png' style='width:23px; height:24px; display:none;'>");
			$(".modal-popup.videoOverlay .close").hover(function(){
				$(this).find("img").toggle();
			});
			$("#gray-overlay").addClass("newVideo");
		}
		else{
			$(".modal-popup .close").html("×");
		}
	}
	else {
		handleOrName.show();
	}
	$("#gray-overlay").show();

	//$(window).scrollTop(0);
};

OverlayManager.prototype.close = function (handle, suppressHistory) {
	if (typeof (handle) != "undefined" && handle != null) {
		handle.hide();
	}

	suppressHistory = (typeof(suppressHistory) == "undefined") ? false : suppressHistory;

	$("html").removeClass("hasIframe");
	var hash = "";
	if ($("body").hasClass("modal-frame")) {
        try {
	        hash = window.parent.location.hash.split("#").join("");
		} catch(e) {
			// this fails when trying to close from cross domain
			sendParentMessage("closePopup");
			return;
		}
		if (hash != "") {
			// Setting the hash to blank when it already is blank will result in IE popping the page to the top, so don't do it
		    if (suppressHistory == false) {
		        if (hash.indexOf("-pu+") == -1) {
		            // Hash contains a page anchor instead of valid state data, clear out the old anchor
		            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
		            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
		        }
				hash = URLFactory.updateHash(hash, "popup", "");
				window.parent.location.hash = hash;
				window.parent.HistoryManager.getInstance().addHistoryItem(hash);
			}
		}
		//window.parent.$(window).scrollTop(this.initialScrollPosition);
		window.parent.$(".modal-popup").attr("class", "modal-popup").hide();
		window.parent.$("#gray-overlay, .image-overlay").hide();
		// mobile safari crashes if you replace the iframe before the script is done running.  Hiding the iframe instead
		window.parent.$(".modal-popup .content").append('<img class="loading" src="/shared/images/loading.gif" />');
		window.parent.$(".modal-popup iframe").attr("src", "").hide();
	} else {
		$(".modal-popup").attr("class", "modal-popup").hide();
		$(".modal-popup .content").html('<img class="loading" src="/shared/images/loading.gif" />');
		$("#gray-overlay, .image-overlay").hide();
		hash = window.location.hash.split("#").join("");
		if (hash != "") {
			// Setting the hash to blank when it already is blank will result in IE popping the page to the top, so don't do it
		    if (suppressHistory == false) {
		        if (hash.indexOf("-pu+") == -1) {
		            // Hash contains a page anchor instead of valid state data, clear out the old anchor
		            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
		            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
		        }
				hash = URLFactory.updateHash(hash, "popup", "");
				window.location.hash = hash;
				HistoryManager.getInstance().addHistoryItem(hash);
			}
		}
		//$(window).scrollTop(this.initialScrollPosition);
	}
};

OverlayManager.prototype.resize = function (newHeight) {
	if ($(".modal-popup .content iframe").length > 0) {
		$(".modal-popup .content iframe").css("height", parseInt(newHeight, 10) + 10 + 'px');
	}
	else {
		$(".modal-popup .content").css("height", parseInt(newHeight, 10) + 10 + 'px');
	}
};

/* End of OverlayManager.js */
/* SiteCatalyst code version: H.22.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/* Specify the Report Suite ID(s) to track here */

var s=s_gi(s_account,1)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="utf-8"
/* E-commerce Config */
//s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,.,tiffany.com,tiffany.co.jp,tiffany.ca,tiffany.cn,tiffany.kr,tiffany.co.uk,tiffany.at,tiffany.fr,tiffany.de,tiffany.ie,tiffany.it,tiffany.es,tiffany.com.mx,tiffany.com.au"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */
	if(s.getQueryParam('omcid')){
		s.campaign=s.getQueryParam('omcid')
		s.campaign = s.cleanParams(s.campaign);
		s_campaign=s.campaign
	}
		
	if(s.campaign){
	    s.prop6 = s.campaign + " : " + s.pageName;
	    s.eVar42 = s.campaign + " : " + s.pageName;
        }
	else{
	    //s.prop6=s.pageName;
        }
		
	//Internal Campaigns
	
	if(s.getQueryParam('hppromo')){
		s.eVar3=s.getQueryParam('hppromo')
		s.eVar3 = s.cleanParams(s.eVar3);
		s_eVar3=s.eVar3
	}
	
	if (s.getQueryParam('lppromo')) {
	    s.eVar28 = s.getQueryParam('lppromo')
	    s.eVar28 = s.cleanParams(s.eVar28);
	    s_eVar28 = s.eVar28		
	}
		
	if(s.getQueryParam('cid')){
			s.eVar4=s.getQueryParam('cid')
			s.eVar4 = s.cleanParams(s.eVar4);
			s_eVar4=s.eVar4
	}
	if(s.getQueryParam('xlink')){
			s.eVar5=s.getQueryParam('xlink')
			s.eVar5 = s.cleanParams(s.eVar5);
			s_eVar5=s.eVar5
	}
	if(s.getQueryParam('IQ_ID')){
			s.eVar22=s.getQueryParam('IQ_ID')
			s.eVar22 = s.cleanParams(s.eVar22);
			s_eVar22=s.eVar22
	}		
	
	/*social Authors*/
	s.socialPlatforms('eVar61');
	
}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

s.cleanParams = new Function ("v",""
+"var p = v;if(p.indexOf('#')>-1){i = p.indexOf('#');p = p.substri"
+"ng(0,i);}return p;");

/*
 * Plugin: socialPlatforms v1.0
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga";
/*  
 * socialAuthors v1.1
 */
s.socialAuthors=new Function("",""
+"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
+"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
+"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar62';s.Integrate"
+".SocialAuthor.get('http://search.twitter.com/search.json?var=[VAR]&"
+"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
+".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
+"){s[p.tEvar]=s.user;}}");
s.twitterSearch=new Function("obj",""
+"if(typeof obj=='undefined'||obj.results.length==0){s.user='Not Foun"
+"d';s.Integrate.SocialAuthor.ready();return;}s.user=obj.results[0].f"
+"rom_user;resultNum=obj.results;s.Integrate.SocialAuthor.ready();");


s.maxDelay='1000';	//max time to wait for 3rd party api response in milliseconds
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
	s.socialAuthors();
	//add other integration module dependent functions here
};


/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");



/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.dc=112
if (typeof(s_account) != "undefined")
{
    if (s_account == 'tiffanyrus' || s_account == 'tiffanyrint' || s_account == 'tiffanyrusmobile' || s_account == 'tiffanyrstmt' || s_account == 'tiffanyrwatches') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyruk' || s_account == 'tiffanyrukmobile') {
        s.trackingServer = "stats.tiffany.co.uk"
        s.trackingServerSecure = "sstats.tiffany.co.uk"
        s.cookieDomainPeriods = "3"
		s.visitorMigrationKey="4CCB6F8B"
        s.visitorMigrationServer = "stats.tiffany.com"
        s.visitorMigrationServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrca' || s_account == 'tiffanyrcamobile') {
        s.trackingServer = "stats.tiffany.ca"
        s.trackingServerSecure = "sstats.tiffany.ca"
    }
    else if (s_account == 'tiffanyrjp' || s_account == 'tiffanyrjpmobile') {
        s.trackingServer = "stats.tiffany.co.jp"
        s.trackingServerSecure = "sstats.tiffany.co.jp"
        s.cookieDomainPeriods = "3"
    }
    else if (s_account == 'tiffanyrmx' || s_account == 'tiffanyrmxmobile') {
        s.trackingServer = "stats.tiffany.com.mx"
        s.cookieDomainPeriods = "3"
    }
    else if (s_account == 'tiffanyrau' || s_account == 'tiffanyraumobile') {
        s.trackingServer = "stats.tiffany.com.au"
        s.trackingServerSecure = "sstats.tiffany.com.au"
        s.cookieDomainPeriods = "3"
        s.visitorMigrationKey = "50E5BE64"
        s.visitorMigrationServer = "stats.tiffany.com"
        s.visitorMigrationServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrcn' || s_account == 'tiffanyrcnmobile') {
        s.trackingServer = "stats.tiffany.cn"
        //s.trackingServerSecure = ""
    }
    else if (s_account == 'tiffanyrbe' || s_account == 'tiffanyrbemobile') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrnl' || s_account == 'tiffanyrnlmobile') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrit' || s_account == 'tiffanyritmobile') {
        s.trackingServer = "stats.tiffany.it"
        s.trackingServerSecure = "sstats.tiffany.it"
    }
    else if (s_account == 'tiffanyrde' || s_account == 'tiffanyrdemobile') {
        s.trackingServer = "stats.tiffany.de"
        s.trackingServerSecure = "sstats.tiffany.de"
    }
    else if (s_account == 'tiffanyrfr' || s_account == 'tiffanyrfrmobile') {
        s.trackingServer = "stats.tiffany.fr"
        s.trackingServerSecure = "sstats.tiffany.fr"
    }
    else if (s_account == 'tiffanyres' || s_account == 'tiffanyresmobile') {
        s.trackingServer = "stats.tiffany.es"
        s.trackingServerSecure = "sstats.tiffany.es"
    }
    else if (s_account == 'tiffanyrat' || s_account == 'tiffanyratmobile') {
        s.trackingServer = "stats.tiffany.at"
        s.trackingServerSecure = "sstats.tiffany.at"
    }
    else if (s_account == 'tiffanyrie' || s_account == 'tiffanyriemobile') {
        s.trackingServer = "stats.tiffany.ie"
        s.trackingServerSecure = "sstats.tiffany.ie"
    }
    else if (s_account == 'tiffanyemployeestore')
    {
        s.trackingServer = "stats.estore-tco.com"
        s.trackingServerSecure = "sstats.estore-tco.com"
    }
    else if (s_account == 'tiffanyrestorejp') {
        s.trackingServer = "stats.estore-tco.jp"
        s.trackingServerSecure = "sstats.estore-tco.jp"
    }
    else if (s_account == 'tiffanyrkr' || s_account == 'tiffanyrkrmobile') {
        s.trackingServer = "stats.tiffany.kr"
        s.trackingServerSecure = "sstats.tiffany.kr"
    }
    else if (s_account == 'tiffanyrzh' || s_account == 'tiffanyrzhmobile') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrbr' || s_account == 'tiffanyrbrmobile') {
        s.trackingServer = "stats.tiffany.com.br"
    }
    else if (s_account == 'tiffanyrru' || s_account == 'tiffanyrrumobile') {
        s.trackingServer = "stats.tiffany.com.ru"
    }
}


/*Modules*/

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");



/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,r"
+"s);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(windo"
+"w.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im"
+".s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;i"
+"m.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\""
+"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s"
+"=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y="
+"y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('goo"
+"gle')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+="
+"(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe."
+"substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt"
+"(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=="
+"'visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'"
+"){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=="
+"'AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider"
+"')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';e"
+"lse if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q"
+"='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if"
+"(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.subst"
+"ring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.l"
+"inkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this"
+",\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e."
+"srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h"
+"=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathn"
+"ame.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCas"
+"e?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot"
+"(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r"
+"\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE"
+"')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').in"
+"dexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.p"
+"t(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs"
+"=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';"
+"for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]"
+"&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.lin"
+"ks.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
+"){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh("
+"s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if"
+"(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='"
+"):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynami"
+"cAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s."
+"fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\""
+"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;"
+"if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m["
+"t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<"
+"g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.subst"
+"ring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n"
+"+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;"
+"if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"s"
+"cript\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e"
+"){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}ret"
+"urn m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)"
+"for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s."
+"dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDel"
+"ay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10"
+"+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta="
+"-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if"
+"(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;t"
+"cf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.jav"
+"aEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5"
+"){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y"
+"\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)w"
+"hile(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.b"
+"rowserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.w"
+"d.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return"
+" '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s"
+"_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i"
+"<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk="
+"0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s."
+"fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta"
+");qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t"
+"(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.lo"
+"cation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns"
+"6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=pa"
+"rseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUp"
+"perCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorName"
+"space,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,s"
+"tate,zip,events,products,linkName,linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,"
+"cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDom"
+"ainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,"
+"linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s."
+"wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}

/* End of s_code.js */
/**
 * @author Sandeep Rudrawar  
 *Dt 4/10/2009
 * Copyright 2009 IBM Corp
 *
 */
 /*  Begin Helper Functions */
 //pageview connector 
 /* Start Comstants */
 var CATEGORY_ITEM_PAGE_ACTIVITIES = 'Item Page Activities';
 var ITEM_EMAIL_ACTIVITIES = 'Item Email Activities'; 
 var ITEM_EMAIL_ACTIVITIES ='Item Email Activities';
 var BROWSE_RELATED = 'Browse Related';
 var USER_ACTIVITIES = 'User Activities';
 var ADVANCED_SEARCH = 'Advanced Search';
 var DEVICE_INFO = 'Device Info';
 var LABEL_VISITED_LINKS = 'Links Visited';
 var SIGN_OUT = 'Sign Out';
 var SIGNIN_STATUS = 'SignIn Status';
 var CREATE_ACCOUNT = 'Create New Account';


 // Start Custom Variable related constants

 // Slot of the variables
 
 var STORE_LOCATION_SEARCH_SLOT = 2;
 var SAVE_ITEM_SLOT = 3;
 var EMAIL_SIGNUP_SLOT = 8;
 // Name of the variables
 var EMAIL_SIGNUP_NAME = 'Email_Signup';
 var SAVE_ITEM_NAME = 'Save_Item';
 var STORE_LOCATION_SEARCH_NAME = 'Store_Search';
 // End Name Section

 // Scope of the variables
 var VISITOR_LEVEL_SCOPE = 1;
 var VISIT_LEVEL_SCOPE = 2;
 var PAGE_LEVEL_SCOPE = 3;
 // End Scope Section

 // End Custom Variable Constants

 /* End Constants */
 function SetCustomVariable(custVarSlot, custVarName, custVarValue, custVarScope,requiresPageView) {

     //slots 1,2,3,4,5 total. Only 5 slots are available in total. Do not send any other value, it will be ignored. 
    //scope 1=>visitor level, 2=>Session Lvele 3=>Page Level. Do not send anything else apart from 1,2,3.
     custVarValue = TrimString(custVarValue);
     if (!IsNullOrEmpty(custVarValue)) 
     {
         custVarValue = ReplaceSpacesWithUnderScore(custVarValue);
         pageTracker._setCustomVar(
      custVarSlot,                   // This custom var is set to this slot
      custVarName,           // Name of custom variable.
      custVarValue,      // Sets the value of "Section" to "Life & Style" for this particular aricle
      custVarScope                    // Sets the scope to page-level as default from GAHelper class.
                             );

         if (requiresPageView == true) 
         {
             TrackPageView();
         }
     } 

 }
 
 function GetVirtualPageViewPath(level0,level1,level2,level3)
 {	var slash = '/';
	var retVal;
	if(IsDefined(level0) && IsDefined(level1) && IsDefined(level2) && IsDefined(level3))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 + slash +level3;
	}
	else if (IsDefined(level0) && IsDefined(level1) && IsDefined(level2))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 ;
	}
	else if(IsDefined(level0) && IsDefined(level1) )
	{
		retVal= slash + level0 + slash + level1;
	}
	else if(IsDefined(level0) )
	{
		retVal= slash + level0;
	}
	// All virtual pageviews should go under /Virtual Folder/ in GA reports.
	retVal = slash + 'Virtual' +retVal ; 
	return retVal;
	
 }
function IsDefined( variable)
{

    if (typeof(variable) != 'undefined' && variable != null && variable != 'undefined') { return true; }
	else{return false;}
	

}
function IsNullOrEmpty(variable)
{
	if(variable ==null || variable =='undefined' || variable =='')
	{ return true;}
	else {return false;}
}
 /*  End Helper Functions */
function TrackEvent(category, action, label,value)
{			
	TrackEventAction(category,action,label,value);			
}
function TrackEventAction(category, action, label,value)
{
		
	if(IsDefined(pageTracker ))
	{		
		if( IsNullOrEmpty( value)== true)
		{			
			pageTracker._trackEvent(category , action, label);
		}
		else
		{
			pageTracker._trackEvent(category , action, label,value);
		}
	}
}
function TrackPageView(drillDownPath)
{
	if(IsDefined(pageTracker) == true )
	{	
		if(IsNullOrEmpty(drillDownPath) == false)
		{			
			pageTracker._trackPageview(drillDownPath);
		}
		else{pageTracker._trackPageview();}
	}	
	
}
function SetVar(varName)
{
	if( IsDefined(pageTracker ) && IsDefined(varName)  )
	{		
		pageTracker._setVar(varName);
	}
}
function GATrackBannerActivity(linkname)
{
    /* following variables are declared on MasterCategoryPage only*/
    if (typeof (BANNER_LABEL) == 'undefined') return;
	if(IsDefined (USER_ACTIVITIES)==true && IsDefined(BANNER_LABEL)==true )
	{	
		TrackEvent(USER_ACTIVITIES, linkname , BANNER_LABEL);
	}
}
function GATrackFileDownLoad(downloadName) 
{
	if(IsNullOrEmpty(downloadName)==false  )
	{
		var drilldownPath = GetVirtualPageViewPath('Downloads',downloadName);
		TrackPageView(drilldownPath);
	}
}
function GATrackExitLink(exitLinkName) {
    if (IsNullOrEmpty(exitLinkName) == false) {
        var drilldownPath = GetVirtualPageViewPath('Exit Links', exitLinkName);
        TrackPageView(drilldownPath);
    }

}
// Change the name as GATrackActivity(linkname)
function GATrackItemActivity(linkname) 
{
	if(IsDefined(linkname) == false)
	{
		return ;
	}
	
    if (linkname == "View Holiday Banner Detail") {
        GATrackBannerActivity(linkname);
        return;
    }

    if (linkname == "Email CSR Link") {
        if (typeof (USER_ACTIVITIES) != 'undefined' && IsDefined(USER_ACTIVITIES)) {
            TrackEvent(USER_ACTIVITIES, 'CSR Email', linkname);
            return;
        }
    }

    if (typeof (CATEGORY_ITEM_PAGE_ACTIVITIES) != 'undefined' && typeof (LABEL_PRODUCT_TITLE) != 'undefined') {
        if (IsDefined(CATEGORY_ITEM_PAGE_ACTIVITIES) && IsDefined(LABEL_PRODUCT_TITLE) && !IsNullOrEmpty(linkname)) {
            TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, linkname, LABEL_PRODUCT_TITLE);
        }
    }
    else {
        GATrackAction(LABEL_VISITED_LINKS, linkname);
    }
}
function GATrackItemEmailActivity(omie)
{
    var gaItemEmailAction = '';

    if (omie == "itemUrlClk") {
        gaItemEmailAction = 'Item Url Click';
    }
    else if (omie == "itemImgClk") {       
        gaItemEmailAction = 'Item Image Click';
    }
    else if (omie == "itemBtnClk") {       
        gaItemEmailAction = 'View Item Button Click';
    }
    else if (omie == "EmailsignUp") {       
        gaItemEmailAction = 'Email Signup';
    }
    else if (omie == "strloc") {       
        gaItemEmailAction = 'Store Locations';
    }
    if (IsDefined(CATEGORY_ITEM_PAGE_ACTIVITIES) && IsDefined(ITEM_EMAIL_ACTIVITIES) && !IsNullOrEmpty(gaItemEmailAction))
	{
	    TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, ITEM_EMAIL_ACTIVITIES, gaItemEmailAction);
	}
}
function TrackEngagementBrowseWithRefinements()
{	
	TrackPageView(ENGAGEMENT_BROWSE_REFINEMENT);
	
}
// Shpng Bag Tracking
function GATrackActionAddToShoppingBag(sourceOfAdd )
{
    var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));
    var drillDownLevel1 ;
    var drillDownLevel0 = 'Shopping Bag';
    var drillDownPath ;

		if (!isNaN(cookieCnt) && cookieCnt > 0)
		{	// nothing to do 
		}
		else 
		{
			drillDownLevel1 = 'sc Open';
			TrackEvent (drillDownLevel0, drillDownLevel1, sourceOfAdd); 
					
		}
		drillDownLevel1 = 'sc Add';
		//drillDownPath =  GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,sourceOfAdd);
		//TrackPageView (drillDownPath);		
		TrackEvent(drillDownLevel0,drillDownLevel1,sourceOfAdd);
}
//saved items 
function GATrackActionAddToSavedItems (sourceOfAdd)
{
	var drillDownLevel1 = 'Add' ;
	var drillDownLevel0 = 'Saved Items';
	var drillDownLevel2 = sourceOfAdd;
	//var drillDownPath = GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	TrackEvent(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	//TrackPageView(drillDownPath);
	
}
function GATrackActionEngagementAdd()
{
	var drillDownLevel0 = 'Saved Items';
	var drillDownLevel1 = 'Engagement add' ;
	var drillDownLevel2 = 'Engagement Item Page';
	//var drillDownPath = GetVirtualPageViewPath(drillDownLevel0, drillDownLevel1 ,drillDownLevel2);
	TrackEvent(drillDownLevel0, drillDownLevel1 ,drillDownLevel2);
	//TrackPageView(drillDownPath);		
	
}
function GATrackAction(argPageTitleSource , argAction,skuValue)
{
	if(! IsNullOrEmpty(argAction ))
	{
	    if (argAction == 'Add to SavedItems') 
	    {
	        if (! IsNullOrEmpty(skuValue))	
		        SetCustomVariableForSaveItem(skuValue); 
			GATrackActionAddToSavedItems (argPageTitleSource);
		}
		else if ( argAction == 'Add to ShoppingBag')
		{
			GATrackActionAddToShoppingBag(argPageTitleSource); 
		}
		else 
		{
			if(IsDefined(USER_ACTIVITIES)==true && IsDefined(argPageTitleSource)==true && IsDefined(argAction))
			{
				TrackEvent(USER_ACTIVITIES,argPageTitleSource,argAction);
			}
		}
	}
}
function GATrackCategoryBrowseEvent(viewAllAction)
{

	if( IsDefined(USER_ACTIVITIES) == true && IsDefined(BROWSE_RELATED) == true  && IsDefined(viewAllAction))
	{
		TrackEvent(USER_ACTIVITIES,BROWSE_RELATED,viewAllAction);
	}

}
function GATrackSearchTerm(searchTerm)
{
// Here /Search should be preceded otherwise it will flood in  Content Drilldown reports. 
  var newURL ;// = location.pathname;
  if(IsDefined(searchTerm) == true )
  {
	//newURL = '/Virtual/Search' +newURL +'?searchTerm='+searchTerm;
	newURL = '/Shopping/CategoryBrowse.aspx?searchTerm=' + searchTerm;	
	TrackPageView(newURL);
  }
}

function GATrackAdvancedSearchTerm(searchTerm, searchCriteriaForTracking) {

    if (IsDefined(searchTerm) == true && IsDefined(searchCriteriaForTracking) == true) {

        TrackEvent(USER_ACTIVITIES, ADVANCED_SEARCH, searchCriteriaForTracking.concat("searchTerm: ").concat(searchTerm));
    }

}
// Track to click event on Search icon in Mobile site.
function GATrackMobileSearchClick(category,action,labelName) {
    if (IsDefined(category) == true && IsDefined(action) == true && IsDefined(labelName) == true) {
        TrackEvent(category, action, labelName, ''); 
    } 
}

function AddTransaction(OrderID,Affiliation,Total,Tax,Shipping ,City ,State,Country)
{	
	if(IsDefined(OrderID) && IsDefined(Affiliation)&& IsDefined(Total)&& IsDefined(Tax)&& 
		IsDefined(Shipping)&& IsDefined(City)&& IsDefined(State) && IsDefined(Country))
	{
	
		pageTracker._addTrans(OrderID,Affiliation,Total,Tax,Shipping ,City ,State,Country);
	}
	else if( IsDefined(OrderID) && IsDefined(Affiliation)&& IsDefined(Total) )
	{
		pageTracker._addTrans(OrderID , Affiliation , Total);
	}
}
function AddItem(OrderID, SKU ,ProductName , Category, UnitPrice, Quantity)
{
	if( IsDefined(OrderID) && IsDefined(SKU) && IsDefined(ProductName) 	   &&
		IsDefined(Category) && IsDefined(UnitPrice) &&  IsDefined(Quantity)	)
	{
	
		pageTracker._addItem(OrderID ,SKU ,ProductName, Category , UnitPrice , Quantity);
	}
}
function TrackTransaction()
{

	if(IsDefined(pageTracker))
	{			
		pageTracker._trackTrans();
	}
}

function GATrackModuleEvent(moduleName, flashTitle)
{
	
	if(IsNullOrEmpty(flashTitle)==true)
	{
		flashTitle = moduleName;
	}
	
	if((IsNullOrEmpty(flashTitle)== false))
	{	var modulePathName ='Modules';
     	var drilldownPath=	GetVirtualPageViewPath(modulePathName,flashTitle );			
		TrackPageView(drilldownPath);
	}
}

//New method for Carosel swipe and nav link clicks
function GATrackCaroselEvent(eventName) {
    if ( ! IsNullOrEmpty(eventName)) {
        TrackEvent(USER_ACTIVITIES, BROWSE_RELATED, eventName);
    }
}

// Function to track device info properties
function GATrackDeviceInfo(category, data) 
{
    if (IsDefined(category) == true && IsDefined(data) == true) {

        TrackEvent(DEVICE_INFO, category, data);
    }
}

/* Functions related to Custom Variable */

// Function to set custom variable for Save Item.
function SetCustomVariableForSaveItem(skuValue) 
{
    SetCustomVariable(SAVE_ITEM_SLOT, SAVE_ITEM_NAME, skuValue, VISITOR_LEVEL_SCOPE,false);  
}

// Function to set custom variable for Store Location.
function SetCustomVariableForStoreLocation(searchTerm) 
{
    SetCustomVariable(STORE_LOCATION_SEARCH_SLOT, STORE_LOCATION_SEARCH_NAME, searchTerm, VISITOR_LEVEL_SCOPE, true);
}

function ReplaceSpacesWithUnderScore(custVarValue) 
{
    custVarValue = custVarValue.replace(" ", "_");
    return custVarValue;
}

function TrimString(contentToTrim) 
{
	 var finalContent = contentToTrim.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	 return (finalContent == null) ? "" : finalContent[1];
}


function GATrackCompleteSearch(searchTerm) {

    if (IsDefined(searchTerm) == true) {

        TrackEvent(USER_ACTIVITIES, "Completed Search Results", searchTerm);
    }

}

function GATrackHomePagePromo(promo) {

    if (!IsNullOrEmpty(promo)) {
        SetVar('hppromo/' + promo);
        // Since setting variable requires pageview to be called, calling TrackPageView() method;
        TrackPageView();
    }

}
function GATrackCreateAccount(label1, label2) {   
    if (!IsNullOrEmpty(label1)) {
        TrackEvent(USER_ACTIVITIES, CREATE_ACCOUNT, label1);
    }
    if (!IsNullOrEmpty(label2)) {
        TrackEvent(USER_ACTIVITIES, CREATE_ACCOUNT, label2);
    }
}
function GATrackSignInStatus(label) {
    if (!IsNullOrEmpty(label)) {
        TrackEvent(USER_ACTIVITIES, SIGNIN_STATUS, label);
    }
}
function GATrackOrderHistory(label) {
    orderHistory = 'OrderHistory';
    if (!IsNullOrEmpty(label)) {
        TrackEvent(USER_ACTIVITIES, ORDERS, orderHistory, label);
    }
}
function GATrackSignOut() {
    TrackEvent(USER_ACTIVITIES, SIGN_OUT, SIGN_OUT);
}
function GATrackEmailSignUp() {
    TrackEvent('Email Sign Up', 'Footer', 'Submit Success', '');
}
// Commented due to issue of custom variables of the slots after 5  
// Function to set custom variable for Email Signup.
//function SetCustomVariableForEmailSignup() 
//{
//   SetCustomVariable(EMAIL_SIGNUP_SLOT, EMAIL_SIGNUP_NAME, GA_SUBMIT_DATE, VISITOR_LEVEL_SCOPE, false);
//}
//--------------------------------------------------------------------------

/* End Functions related to Custom Variable */
/* End of SiteTrackingGA.js */
/**
* @author Partha Banerjee  
* Dt 9/14/2011
*/
/*  Begin Helper Functions */

// Function to track click on Header and Footer links.
function TrackMobileHeaderAndFooter(linkName) 
{
    if (!IsNullOrEmpty(linkName)) 
    {
        s.eVar8 = linkName;
        s.t();
    }

}

// Function to track click on the Master category links of mobile site
function TrackMobileMasterCategoryLink(masterCategoryName) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop3 = masterCategoryName;
        s.t();
    }
}

// Function to track click on the category links in Master Category landing page.
function TrackMobileCategoryLink(categoryName) 
{
    if (!IsNullOrEmpty(categoryName)) 
    {
        s.prop4 = categoryName;
        s.t();
    }
}

// Function to track click on the "Load More Results" link on category browse page.
function TrackMobileLoadMoreResults(valueToPost) 
{
    // Its required new eVar and since we don't have eVar31 yet so, I am assigning the value to the same below
    if (!IsNullOrEmpty(valueToPost)) 
    {
        s.eVar31 = valueToPost;
        s.t();
    }
}

function TrackMobileCarousel(value) 
{
    // Its required new Prop variable and since we don't have Prop 10 yet so, I am assinging the value to prop10.
    if (!IsNullOrEmpty(value)) 
    {
        s.prop10 = value;
        s.t();
    }
}

function omnitureTrackDeviceInfo(category, data) 
{
    if (!IsNullOrEmpty(category) && !IsNullOrEmpty(data)) 
    {
        s.prop11 = "Device Info | " + category + " | " + data;
        s.t();
    }
}
// Redesign Browsing
function OmnitureTrackHeaderMenu(menu) 
{
    if (!IsNullOrEmpty(menu)) 
    {
        s.prop3 = menu;
        s.eVar8 = menu;
        // void (s.t());
        SetlinkTrackVars("prop3,eVar8");
        s.tl(true, 'o', menu);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackHeaderMenuItem(menu, menuItemName) 
{
    if (!IsNullOrEmpty(menu) && !IsNullOrEmpty(menuItemName)) 
    {
        s.prop4 = menu + ' -> ' + menuItemName;
        //void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', menu + ' -> ' + menuItemName);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackExploreAllLink(masterCategoryName) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop4 = masterCategoryName + ' -> ' + 'Explore All';
        //void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', masterCategoryName + ' -> ' + 'Explore All');
        ClearlinkTrackVars();
    }
}

function OmnitureTrackingHeadlineOrImage(masterCategory) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop4 = masterCategoryName + ' -> ' + 'Headline Or Image Click';
        // void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', masterCategoryName + ' -> ' + 'Headline Or Image Click');
        ClearlinkTrackVars();
    }
}

function OmnitureTrackFooterLinkClick(link) 
{
    if (!IsNullOrEmpty(link)) 
    {
        s.prop3 = link;
        s.eVar8 = link;
    //    void (s.t());
        SetlinkTrackVars("prop3,eVar8");
        s.tl(true, 'o', link);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackViewMoreStore() 
{
    s.eVar8 = "View More Stores and Events - Header";
    //void (s.t());
    SetlinkTrackVars("eVar8");
    s.tl(true, 'o', "View More Stores and Events - Header");
    ClearlinkTrackVars();
}

function OmnitureTrackViewAllStoresInCountry(countryandLoc) 
{
    if (!IsNullOrEmpty(countryandLoc)) 
    {
        s.eVar8 = 'View ALL Stores in ' + countryandLoc;
        //  void (s.t());
        SetlinkTrackVars("eVar8");
        s.tl(true, 'o', 'View ALL Stores in ' + countryandLoc);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackSortOptions(pageName, sortOption) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(sortOption)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Sort By' + ' -> ' + sortOption;
        // void (s.t());
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Sort By' + ' -> ' + sortOption);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue) && !IsNullOrEmpty(categoryName)) {
        s.eVar35 = pageName + ' -> ' + categoryName + ' -> ' + endecaDimension + ' -> ' + selectedValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + categoryName + ' -> ' + endecaDimension + ' -> ' + selectedValue);
        ClearlinkTrackVars();
    }
    else if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue)) {
        s.eVar35 = pageName + ' -> ' + endecaDimension + ' -> ' + selectedValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + endecaDimension + ' -> ' + selectedValue);
        ClearlinkTrackVars();
    }   
}

function OmnitureTrackLoadMoreResults(pageName, linkName) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) 
    {
        s.eVar35 = pageName + ' -> ' + 'View All Link' + ' -> ' + linkName;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'View All Link' + ' -> ' + linkName);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackItemDisplayOption(pageName, action, skuDescription) 
{
    s.eVar35 = pageName + '->' + action + '->' + skuDescription;
    SetlinkTrackVars("eVar35");
    s.tl(true, 'o', pageName + '->' + action + '->' + skuDescription);
    ClearlinkTrackVars();
}

function OmnitureTrackSKUInRecentlyViewedItems(pageName, skuDescription) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(skuDescription)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Recently Viewed Rings' + ' -> ' + skuDescription;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Recently Viewed Rings' + ' -> ' + skuDescription);
        ClearlinkTrackVars();

    }
}

function OmnitureTrackSeeItOn(pageName, action, value) 
{

    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) 
    {
        s.eVar35 = pageName + ' -> ' + action + '->' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
        ClearlinkTrackVars();
    }

}

function OmnitureTrackLearnMoreLink(pageName, value) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(value)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Learn More' + '->' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Learn More' + '->' + value);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackScheduleVisit(pageName, action) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) {
        s.eVar35 = pageName + ' -> ' + action;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackCarouselClick(pageName, carousalName, slideNumber) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(carousalName) && !IsNullOrEmpty(slideNumber)) {
        s.eVar35 = pageName + ' -> ' + 'Carousel Click' + ' -> ' + carousalName + ' -> ' + slideNumber;      
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Carousel Click' + ' -> ' + carousalName + ' -> ' + slideNumber);
        ClearlinkTrackVars();    
    }
}


function OmnitureTrackLinkClickFromGridOrCarousel(pageName, action, linkValue) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(linkValue)) {
        s.eVar35 = pageName + ' -> ' + action + ' -> ' + linkValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action + ' -> ' + linkValue);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackInlineCustomerSelectionPaginate(pageName, pageNumber) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(pageNumber)) 
    {
        s.eVar35 = pageName + '->' + 'Paginate' + '->' + pageNumber;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + '->' + 'Paginate' + '->' + pageNumber);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackWishListViewBy(value) 
{
    if (!IsNullOrEmpty(value)) {
        s.eVar35 = 'Full Page Saved Items' + ' -> ' + 'View By' + ' -> ' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', 'Full Page Saved Items' + ' -> ' + 'View By' + ' -> ' + value);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackFullSaveItemLinkClick(linkName)
{
    if (!IsNullOrEmpty(linkName)) 
    {
        s.prop8 = linkName;
        SetlinkTrackVars("prop8");
        s.tl(true, 'o', linkName);
        ClearlinkTrackVars();
    }
}

function omnitureTrackActionAddToShoppingBag(argPageTitle, argAction, argItem) {
    var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));
    if (!isNaN(cookieCnt) && cookieCnt > 1) {
        s.events = "scAdd,event21";
    } else {
        s.events = "scOpen,scAdd,event21";
    }
    // iTrack #11318
//    var pageName;
//    var company = "Tiffany & Co. | ";
//    if (locale == "en-us-ird") {
//        company = "IRIDESSE Pearls | ";
//    }
//    pageName = company + argPageTitle + " | ACTION | " + argAction;
//    //Set Omniture variables
//    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;  
    s.eVar35 = argPageTitle + " | ACTION | " + argAction;
    if (!IsNullOrEmpty(argItem)) {
        s.products = argItem;
        SetlinkTrackVars("prop8,eVar35,products,events", s.events);
    } 
    else {
        SetlinkTrackVars("prop8,eVar35,events", s.events);
    }
    //Submit Omniture variable         
    s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
    ClearlinkTrackVars(); 	
}

function omnitureTrackMobileLoadMoreResults(pageName, action) {
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) {
        s.eVar31 = pageName + ' -> ' + action;
        SetlinkTrackVars("eVar31");
        s.tl(true, 'o', pageName + ' -> ' + action);
        ClearlinkTrackVars();
    }
}
function omnitureTrackMobileCarousel(value) {
    // Its required new Prop variable and since we don't have Prop 10 yet so, I am assinging the value to prop10.
    if (!IsNullOrEmpty(value)) {
        s.prop10 = value;
        SetlinkTrackVars("prop10");
        s.tl(true, 'o', value);
        ClearlinkTrackVars();
    }
}
function OmnitureExitLinkTracking(linkObject, linkName) {
    var siteName = "Tiffany & Co.";   
    linkName = siteName + " | " + linkName
    s.pageName = "Activity | Exit Link";
    s.tl(linkObject, 'e', linkName);
}

function omnitureTrackAction(argPageTitle, argAction, skuValue) {
    var pageName;
    var company = "Tiffany & Co. | ";
    if (locale == "en-us-ird") {
        company = "IRIDESSE Pearls | ";
    }
    pageName = company + argPageTitle + " | ACTION | " + argAction;
    //Set Omniture variables
    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;
    //Submit Omniture variable 	
    s.t();
    GATrackAction(argPageTitle, argAction, skuValue);
}

function OmnitureTrackSearchTerm(searchTerm) {
    s.eVar2 = searchTerm;
    s.eVar9 = "Search";
    s.prop3 = "Search";
    s.prop4 = "Search";
    s.prop18 = searchTerm;
    s.hier1 = "Search,Search";
    // s.pageName = "Activity | Search";
    s.events = "event41";
    SetlinkTrackVars("eVar2,eVar9,prop3,prop4,prop18,hier1,events", "event41");
    s.tl(true, 'o', "Activity | Search");
    ClearlinkTrackVars();
    //void (s.t());
}

function omnitureTrackStoreSearchTerm(searchTerm) {
    //s.eVar2 = "[Store Search] " + searchTerm;
    s.eVar49 = searchTerm;
    s.prop37 = searchTerm;
    s.eVar9 = "Search Store";
    s.prop3 = "Search Store";
    s.prop4 = "Search Store";
    s.hier1 = "Store Search, Search Store";
    //s.pageName = "Activity | Search Store";
    s.events = "event42";
    SetlinkTrackVars("eVar49,eVar9,prop37,prop3,prop4,hier1,events", "event42");
    s.tl(true, 'o', "Activity | Search Store");
    ClearlinkTrackVars();
    //void (s.t());
}

function omnitureTrackViewRemainingItems(pageName, linkName) {
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) {
        s.eVar35 = pageName + ' -> ' + 'Activity' + ' -> ' + linkName;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Activity' + ' -> ' + linkName);
        ClearlinkTrackVars();
    }
}

function omnitureTrackVideo(videoName, action, value) {
    s.events = "event10";
	s.pageName = videoName + " | " + action + " | " + value;

	if (action == "Play" && value == "Started") {
		s.eVar37 = videoName;
	}

	if (action == "Play") {
		s.eVar38 = value;
	}
	else if (action == "Video Length") {
		s.eVar39 = value;
	}

	s.t();
}

function omnitureTrackMasterCategoryShopLinks(masterCategory, linkValue) {
    if (!IsNullOrEmpty(masterCategory) && !IsNullOrEmpty(linkValue)) {
        s.prop5 = masterCategory + ' -> ' + linkValue;
        s.eVar41 = masterCategory + ' -> ' + linkValue;
        // void (s.t());
        SetlinkTrackVars("prop5,eVar41");
        s.tl(true, 'o', masterCategory + ' -> ' + linkValue);
        ClearlinkTrackVars();
    }
}

function OmnitureClickEvent(linkname)
{
        s.eVar16 = "";
        s.eVar17 = "";
        s.eVar18 = "";
        s.eVar19 = "";
        s.eVar20 = "";
        s.eVar21 = "";
        s.prop19 = "";
        s.eVar35 = "";
        s.eVar46 = "";
        s.prop39 = "";
        s.eVar47 = "";
        s.eVar57 = "";
        s.eVar48 = "";
        s.prop43 = "";

        if (linkname == "Engraving Available") {
            if (!IsNullOrEmpty(s.pageName)) {
                s.eVar16 = s.pageName + " -> " + linkname;
                s.events = "event16";
                SetlinkTrackVars("eVar16,events", "event16");
            }
        }
        else if (linkname == "View Specifications") {
            s.eVar17 = linkname;
            s.events = "event48";
            SetlinkTrackVars("eVar17,events", "event48");
        }
        else if (linkname == "View Relative Size") {
            s.eVar18 = linkname;
            SetlinkTrackVars("eVar18");
        }
        else if (linkname == "Print Item Information") {
            s.eVar19 = linkname;
            SetlinkTrackVars("eVar19");
        }
        else if (linkname == "Pick Up at Wall Street Store") {
            s.eVar20 = linkname;
            s.events = "event45";
            SetlinkTrackVars("eVar20,events","event45");
        }
        else if (linkname == "View Holiday Banner Detail") {
            s.eVar21 = linkname;
            SetlinkTrackVars("eVar21");
        }
        else if (linkname == "Email This Item") {
            s.prop19 = linkname;
            s.eVar35 = linkname;
            s.events = "event14";
            s.eVar46 = linkname;
            s.prop39 = linkname;
            SetlinkTrackVars("prop19,prop39,eVar35,eVar46,events", "event14");
        }
        else if (linkname == "CSR Print All Information" || linkname == "CSR Gender Diversity Graph" ||
                    linkname == "CSR Generation and Gender Graph" || linkname == "CSR Grants Graph" ||
                         linkname == "CSR Employee Diversity Graph") {
            s.events = "event32";
            s.eVar47 = linkname;
            SetlinkTrackVars("eVar47,events","event32");
        }
        else if (linkname == "Post to Facebook" || linkname == "Post to Pinterest" || linkname == "Post to Tumblr" ||
                    linkname == "Post to Twitter" || linkname == "Email All Item Icon" || linkname == "EMAIL Saved Item" || linkname == "Email This Ring" || linkname == "Share Saved Item" || linkname == "Post to Google") {
            s.events = "event14";
            s.eVar46 = linkname;
            s.prop39 = linkname;
            SetlinkTrackVars("eVar46,prop39,events", "event14");

        }
        else if (linkname == "Print All Item Icon" || linkname == "Print Item Information" || linkname == "PRINT Saved Item" || linkname == "Print This Ring") {
            s.events = "event37";
            s.eVar57 = linkname;
            SetlinkTrackVars("eVar57,events", "event37");
        }
        else if (linkname == "Save This Item") {
            s.events = "event15";
            SetlinkTrackVars("events", "event15");
        }
        else if (linkname == "Save This Ring") {
            s.events = "event40";
            SetlinkTrackVars("events", "event40");
        }
        else if (linkname == "Discover the Story of This Collection" || linkname == "Discover the Story of This Design" || linkname == "Additional Items" ||
                        linkname == "Recently Viewed Items") {
            s.events = "event43";
            s.eVar48 = linkname;
            s.prop43 = linkname;
            SetlinkTrackVars("eVar48,prop43,events", "event43");
        }
        else if (linkname == "Carat Size Guide") {
            s.events = "event46";
            SetlinkTrackVars("events", "event46");
        }
        else if (linkname == "Drop A Hint") {
            s.events = "event44";
            SetlinkTrackVars("events", "event44");
        }
        else if (linkname == "Shipping & Returns") {
            s.events = "event47";
            SetlinkTrackVars("events", "event47");
        }
        else if (linkname == "EMAIL Engagement Ring") {
            s.events = "event25";
            s.eVar35 = "Saved Items | ACTION | EMAIL Engagement Ring";
            SetlinkTrackVars("eVar35,events", "event25");
        }
        else if (linkname == "PRINT Engagement Ring") {
            s.events = "event26";
            s.eVar35 = "Saved Items | ACTION | PRINT Engagement Ring";
            SetlinkTrackVars("eVar35,events", "event26");
        }
        else if (linkname == "EMAIL ShoppingBag") {
            s.events = "event28";
            s.eVar35 = "Shopping Bag | ACTION | EMAIL ShoppingBag";
            SetlinkTrackVars("eVar35,events", "event28");
        }
        else if (linkname == "PRINT ShoppingBag") {
            s.events = "event29";
            s.eVar35 = "Shopping Bag | ACTION | PRINT ShoppingBag";
            SetlinkTrackVars("eVar35,events", "event29");
        }           
        else {
            s.eVar35 = linkname;
            SetlinkTrackVars("eVar35");
        }
        
        //s.pageName = "Activity | " + linkname;
        //s.t();    
        s.tl(true, 'o', linkname);
        ClearlinkTrackVars();
 }

 function omnitureItemEmailClicks(omie) {

     s.eVar23 = "";
     if (omie == "itemUrlClk") {
         s.pageName = "Activity | Item Email | Item Url Click";
         s.eVar23 = "Item Url Click";
         void (s.t());        
     }
     else if (omie == "itemImgClk") {
         s.pageName = "Activity | Item Email | Item Image Click";
         s.eVar23 = "Item Image Click";
         void (s.t());        
     }
     else if (omie == "itemBtnClk") {
         s.pageName = "Activity | Item Email | View Item Button Click";
         s.eVar23 = "View Item Button Click";
         void (s.t());        
     }
     else if (omie == "EmailsignUp") {
         s.pageName = "Activity | Item Email | Email Signup";
         s.eVar23 = "Email Signup";
         void (s.t());         
     }
     else if (omie == "strloc") {
         s.pageName = "Activity | Item Email | Store Locations";
         s.eVar23 = "Store Locations";
         void (s.t());         
     }

 }

 function omnitureTrackWeddingBandDetailsLink(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }

 }

 function omnitureTrackSkinToneSeeItOn(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackCaratSizeSeeItOn(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems) {
     var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));   
     if (!isNaN(cookieCnt) && cookieCnt > 0) {
         s.events = "scView,event22";         
     } else {
         
     }
     //     var pageName;
     //     var company = "Tiffany & Co. | ";
     //     if (locale == "en-us-ird") {
     //         company = "IRIDESSE Pearls | ";
     //     }
     //     pageName = company + argPageTitle + " | ACTION | " + argAction;
     //Set Omniture variables
     if (!IsNullOrEmpty(argItems)) {
         s.products = argItems;
         SetlinkTrackVars("eVar35,prop8,products,events", "scView,event22");
     } else {
         SetlinkTrackVars("eVar35,prop8");
     }
     
     s.eVar35 = argPageTitle + " | ACTION | " + argAction;
     s.prop8 = argPageTitle + " -> " + argAction;
     //s.pageName = pageName; 
     s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
     ClearlinkTrackVars();
 }

 function omnitureTrackInlineViewSavedItems(argPageTitle, argAction) {
     var cookieCnt = parseInt(CookieManager.getCookieValue("saveditemscnt"));
     if (!isNaN(cookieCnt) && cookieCnt > 0) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();          
      }

 }

 function omnitureTrackInlineRemoveShoppingBagItem(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         s.events = "scRemove";
         SetlinkTrackVars("prop8,events", "scRemove");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();  
      }

 }

 function omnitureTrackInlineRemoveSavedItem(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         s.eVar35 = argPageTitle + " | ACTION | " + argAction;
         s.events = "event24";
         SetlinkTrackVars("prop8,eVar35,events", "event24");        
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }

 }

 function omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackInlineSavedItemsLinkClick(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackSavedItemsViewBy(pageName, viewbyOption) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(viewbyOption)) {
         s.eVar35 = pageName + ' -> ' + 'View By' + ' -> ' + viewbyOption;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'View By' + ' -> ' + viewbyOption);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackSavedItemsViewByImageSize(pageName, viewbyOption) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(viewbyOption)) {
         s.eVar35 = pageName + ' -> ' + 'Image Size Option' + ' -> ' + viewbyOption;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'Image Size Option' + ' -> ' + viewbyOption);
         ClearlinkTrackVars();
     }
 }
 function OmnitureTrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription) {
     if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(ItemViewSource)) {
         s.prop20 = ItemViewSource + ' : ' + skuDescription;
         s.prop43 = ItemViewSource + ' : ' + skuDescription;
         s.eVar48 = ItemViewSource + ' : ' + skuDescription;
         s.events = "event43";         
        // s.pageName = "Activity | " + ItemViewSource + ' -> ' + skuDescription;
         SetlinkTrackVars("prop20,prop43,eVar48,events", "event43");
         s.tl(true, 'o', "Activity | " + ItemViewSource + ' -> ' + skuDescription);
         ClearlinkTrackVars();

     }
 }
 function OmnitureTrackCompleteSearch(pageName, searchTerm) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(searchTerm)) {
         s.eVar35 = pageName + ' -> ' + 'Completed Search' + ' -> ' + searchTerm;
         // void (s.t());
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'Completed Search' + ' -> ' + searchTerm);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackScheduleVisitWithRings(pageName, action, value) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + ' -> ' + value;
         //void (s.t());
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o',  pageName + ' -> ' + action + ' -> ' + value);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackActionAddToSavedItems(argPageTitle, argAction) {
     //var pageName;
//     var company = "Tiffany & Co. | ";
//     if (locale == "en-us-ird") {
//         company = "IRIDESSE Pearls | ";
//     }
     //pageName = company + argPageTitle + " | ACTION | " + argAction;
     //Set Omniture variables
    // s.pageName = pageName;
     s.prop8 = argPageTitle + " -> " + argAction;
     s.eVar35 = argPageTitle + " | ACTION | " + argAction;
     s.events = "event20";
     //Submit Omniture variable 	
     SetlinkTrackVars("prop8,eVar35,events","event20");
     s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
     ClearlinkTrackVars();
 }

 function OmnitureTrackProductZoom(pageName, action, skuDescription) {
     s.events = "event9";
     s.eVar36 = pageName + '->' + action + '->' + skuDescription;
     SetlinkTrackVars("eVar36,events", "event9");
     s.tl(true, 'o', pageName + '->' + action + '->' + skuDescription);
     ClearlinkTrackVars();
 }

 function OmnitureTrackItemOnRollOver(level1) {
     var productDesc = "";
     var company = "Tiffany & Co. | ";     
     productDesc = "Item-" + level1;
     s.eVar40 = productDesc;     
     SetlinkTrackVars("eVar40");
     pageName = company + "Category Browse" + " | ACTION | " + "Item Roll Over";
    // s.pageName = pageName;
     s.tl(true, 'o', pageName);
     ClearlinkTrackVars();
 }

 function OmnitureTrackExpandCollapseMarketingTiles(pageName, action, sectionName) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(sectionName)) {
         s.eVar35 = pageName + ' -> ' + action + ' -> ' + sectionName;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + ' -> ' + sectionName);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackItemPageShareType(linkName) {
     if (!IsNullOrEmpty(linkName)) {
         s.prop19 = linkName;
         s.events = "event13";
         SetlinkTrackVars("prop19,events", "event13");
         s.tl(true, 'o', linkName);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackPDPTabActivity(linkName, itemDesc) {
     if (!IsNullOrEmpty(linkName) && !IsNullOrEmpty(itemDesc)) {
         s.prop20 = linkName + " : " + itemDesc;
         SetlinkTrackVars("prop20");
         s.tl(true, 'o', linkName + " : " + itemDesc);
         ClearlinkTrackVars();
     }

 }

 function OmnitureTrackDeviceInfo(category, data) {
     if (!IsNullOrEmpty(category) && !IsNullOrEmpty(data)) {
         s.prop11 = "Device Info | " + category + " | " + data;
         s.eVar43 = "Device Info | " + category + " | " + data;
         SetlinkTrackVars("prop11,eVar43");
         s.tl(true, 'o', "Device Info | " + category + " | " + data);
         ClearlinkTrackVars();       
    }
 }

function SetlinkTrackVars(vars, evts) {
    if (!IsNullOrEmpty(vars)) { s.linkTrackVars = vars; }
    if (!IsNullOrEmpty(evts)) { s.linkTrackEvents = evts; }
}

function ClearlinkTrackVars() {
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None";
}
function OmnitureTrackRemoveSavedItem(argPageTitle, argAction) {
    if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
        s.eVar35 = argPageTitle + " | ACTION | " + argAction;
        s.events = "event24";
        SetlinkTrackVars("eVar35,events","event24");
        s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
        ClearlinkTrackVars();
    }
}
function OmnitureTrackRemoveSavedEngagementItem(argPageTitle, argAction) {
    if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
        s.eVar35 = argPageTitle + " | ACTION | " + argAction;
        s.events = "event23";
        SetlinkTrackVars("eVar35,events", "event23");
        s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
        ClearlinkTrackVars();
    }
}
function OmnitureTrackMapLink(link) {
    if (!IsNullOrEmpty(link)) {
        s.tl(link, 'o', s.pageName + ' : Map It');
    }
        
}
function OmnitureTrackHomePagePromo(promo) {
    if (!IsNullOrEmpty(promo)) {
        s.eVar3 = promo;
        s.eVar3 = s.cleanParams(s.eVar3);
        SetlinkTrackVars("eVar3");
        s.tl(true, 'o', ' hppromo: ' + promo);
    }

}
function OmnitureTrackCreateAccount(relationshipStatus, signupDate) {
    s.events = "event49";
    if (relationshipStatus != '') {
        s.eVar51 = relationshipStatus;
    }
    if (!IsNullOrEmpty(signupDate)) {
        s.eVar50 = signupDate;
    }
    s.t();
}

function OmnitureTrackSignOut() {
    s.events = "event50";
    // eVar52 and prop44 are tracked in sign_out_success webpage
    //s.eVar52 = "Signed Out";
    //s.prop44 = "Signed Out";
    s.t();
}
function OmnitureTrackAccountActivation() {
    s.events = "event3";
    s.t();
}
function OmnitureTrackSignIn() {
    s.events = "event2";
    s.t();
}
function OmnitureTrackEmailSignUp() {
    s.linkType = "o";
    s.linkName = "Link to E-mail Marketing - Footer Thank You";
    s.events = "event11"; 

    SetlinkTrackVars("events", "event11");
    s.tl(true, 'o', "Link to E-mail Marketing - Footer Thank You");
    ClearlinkTrackVars();
}
/* End of SiteTrackingOmniture.js */
/**
* @author Partha Banerjee  
* Dt 11/10/2011
*/
/*  Begin Helper Functions */

// This function tracks data for header menus
function TrackHeaderMenuEvent(menu) 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(menu)) 
        {
            TrackEvent('Menus', 'Header', menu, '');
        }
    }
    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackHeaderMenu(menu);
    }
}

// This function tracks data for menu items such as categories.
function TrackHeaderMenuItemEvent(menu, menuItemName) 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(menu) && !IsNullOrEmpty(menuItemName)) 
        {
            TrackEvent('Menus', 'Menu Items', menu + ' | ' + menuItemName, '');
        }
    }
    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackHeaderMenuItem(menu, menuItemName);
    }
}

// This function tracks data for click event on footer links.
function TrackFooterClickEvent(link) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(link)) 
        {
            TrackEvent('Menus', 'Footer', link, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackFooterLinkClick(link);
    }
}

// Function to track Explore All link
function TrackExploreAll(masterCategoryName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(masterCategoryName)) 
        {
            TrackEvent('User Activities', 'Explore All', masterCategoryName, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackExploreAllLink(masterCategoryName);
    }
}

// Function to track Headline/Image click in Header Flyout
function TrackHeadlineOrImage(masterCategoryName) 
{

    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(masterCategoryName)) 
        {
            TrackEvent('User Activities', 'Headline Or Image Click', masterCategoryName, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackingHeadlineOrImage(masterCategory); 
    }

}
// Function to track "View More Stores and Events" link. 
function TrackViewMoreStoreEvents() 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        TrackEvent('Menus', 'Header', 'View More Stores and Events', '');
    }

    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackViewMoreStore();
    }
}

function TrackViewAllStoresInCountry(countryandLoc) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(countryandLoc)) 
        {
            TrackEvent('Menus', 'Header', 'View ALL Stores in ' + countryandLoc, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackViewAllStoresInCountry(countryandLoc);
    }
}

// Function to track sort options from different page
// Here pageName will contain the name of the page from where request is coming
// and sortOption will contain the option value that was selected. 
function TrackSortOptions(pageName, sortOption) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(sortOption)) 
        {
            TrackEvent('User Activities', 'Sort By', pageName + ' | ' + sortOption, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSortOptions(pageName, sortOption);
    }
}
// Function to track the endeca dimension that was selected from page and the dimension value.
// Here pageName -  The page from where request came.
//      endecaDimension - Dimension that was selected.
//      selectedValue - value that was selected.
//      categoryName - category selected in categorybrowse
function TrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue) && !IsNullOrEmpty(categoryName)) {
            TrackEvent('User Activities', 'Endeca', categoryName + ' | ' + endecaDimension + ' | ' + selectedValue, '');
        }
        else if (!IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue)) {
            TrackEvent('User Activities', 'Endeca', endecaDimension + ' | ' + selectedValue, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName);
    }
}

// Function to track "View All Link" click.
function TrackLoadMoreResults(pageName, linkName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) 
        {
            TrackEvent('User Activities', 'View All Link', pageName + ' | ' + linkName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLoadMoreResults(pageName, linkName);
    }
}

// This function is used to track different display modes that are used to see items in different way
// pagename - Name of the page from where request is made.
// action - Example "Full screen overlay", "Video overlay"
// skuDescription - SKU description of the item.
function TrackItemDisplayOption(pageName, action, skuDescription) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(action)) 
        {
            TrackEvent('Item Page Activities', action, skuDescription, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackItemDisplayOption(pageName, action, skuDescription);
    }
}

// This function is responsible to track click event on links in item pages and also from some other pages. 
// Since this function is being used from several pages so we have kept this as it is now. But, in future  we need to shift omniture code to SiteTrackingOmniture.js and 
// GA related code to SiteTrackingGA.js file.

function sendOmnitureClickEvent(linkname) 
{
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureClickEvent(linkname);
    }

    if (Is_GA_Enabled == 'true') 
    {
        GATrackItemActivity(linkname);
    }
}

// This function is responsible to track any activities done from Item Emails.
function sendOmnitureItemEmailClicks(omie) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(omie)) {
            GATrackItemEmailActivity(omie);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureItemEmailClicks(omie);
    }   

}

// Function to track click count on items in Recently Viewed items.
// pageName - Name of the page from where the request is made
// skuDescription - SKU description
function TrackSKUInRecentlyViewedItems(pageName, skuDescription) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(skuDescription)) 
        {
            TrackEvent('Item Page Activities', 'Recently Viewed Rings', skuDescription, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSKUInRecentlyViewedItems(pageName, skuDescription);
    }
}

function TrackSeeItOn(pageName, action, value) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) 
        {
            TrackEvent('Item Page Activities', action, value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSeeItOn(pageName, action, value);
    }

}

// This function tracks "Learn More" links in scheduled diamond consultation.
function TrackLearnMoreLink(pageName, value) 
{

    if (Is_GA_Enabled == 'true') 
    {

        if (!IsNullOrEmpty(value)) 
        {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Learn More', value);
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLearnMoreLink(pageName, value);
    }
}

// This function tracks click on "Schedule Visit" link.
function TrackScheduleVisit(pageName, action) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(action)) 
        {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Schedule A Visit', action);
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) 
        {
            OmnitureTrackScheduleVisit(pageName, action);
        }
    }
}

//This function tracks Carousel links click
// pageName - Name of the page
// carousalName - Name of the Carousal
// slideNumber - Number of clicked slide.  
function TrackCarouselClick(pageName, carousalName, slideNumber) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(carousalName) && !IsNullOrEmpty(slideNumber)) 
        {
            TrackEvent('User Activities', 'Carousel Click', pageName + ' | ' + carousalName + ' | ' + slideNumber, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackCarouselClick(pageName, carousalName, slideNumber);
    }
}

// Action can be Grid Link Click or Carousel Link Click

function TrackLinkClickFromGridOrCarousel(pageName, action, linkValue) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(linkValue)) 
        {
            TrackEvent('User Activities', action, pageName + ' | ' + linkValue, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLinkClickFromGridOrCarousel(pageName, action, linkValue);
    }

}


// This function to track pagination from Inline shopping bag or Inline saved item.
// pageName - "Inline Shopping Bag" or "Inline Saved Item" 
// pageNumber - Numbe rof page clicked
function TrackInlineCustomerSelectionPaginate(pageName, pageNumber) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(pageNumber)) 
        {
            TrackEvent('User Activities', 'Paginate', pageName + ' | ' + pageNumber, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackInlineCustomerSelectionPaginate(pageName, pageNumber);
    }

}

// Function to track View By drop down of wish list.
// value represents the option chosen from drop down.
function TrackWishListViewBy(value) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(value)) 
        {
            TrackEvent('User Activities', 'View By', 'Full Page Saved Items' + ' | ' + value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackWishListViewBy(value);
    }
}

// Function to do web tracking on links available in Full page wish list.

function OmnitureTrackFullSaveItemLinkClick(linkName)
{
    if (Is_GA_Enabled == 'true') 
    {
        TrackEvent('Saved Items', linkName, 'Full Page Saved Items', '');
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackFullSaveItemLinkClick(linkName);
    }
}

function TrackPrintEmailClick(argPageTitle, argAction, skuValue) {
    var pageName;
    var company = "Tiffany & Co. | ";
    if (locale == "en-us-ird") {
        company = "IRIDESSE Pearls | ";
    }
    pageName = company + argPageTitle + " | ACTION | " + argAction;
    //Set Omniture variables
    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;
    //Submit Omniture variable 	
    s.t();
    GATrackAction(argPageTitle, argAction, skuValue);
}

function TrackActionAddToShoppingBag(argPageTitle, argAction, argItem) {
     if (Is_GA_Enabled == 'true') {    
            GATrackAction(argPageTitle, argAction);        
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackActionAddToShoppingBag(argPageTitle, argAction, argItem);
    }   

}

function TrackActionMobileLoadMoreResults(argPageTitle, action) {
    if (Is_GA_Enabled == 'true') {
        TrackEvent(argPageTitle, action);
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMobileLoadMoreResults(argPageTitle, action);
    }
}

function TrackMobileCarousel(value) {
    if (Is_GA_Enabled == 'true') {
        GATrackCaroselEvent(value)
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMobileCarousel(value);
    }
}

function TrackExitLinkClick(linkObject, linkName) {
    if (Is_GA_Enabled == 'true') {
        GATrackExitLink(linkName)
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureExitLinkTracking(linkObject, linkName);
    }
}

function TrackSearchTerm(searchTerm) {
    if (Is_GA_Enabled == 'true') {
        GATrackSearchTerm(searchTerm)
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSearchTerm(searchTerm);
    }

}

function TrackStoreSearchTerm(searchTerm) {
    if (Is_GA_Enabled == 'true') {
        GATrackSearchTerm(searchTerm)
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackStoreSearchTerm(searchTerm);
    }

}
function TrackViewRemainingItems(pageName, linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) {
            TrackEvent('User Activities', 'View Remaining Items', pageName + ' | ' + linkName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackViewRemainingItems(pageName, linkName);
    }
}

function TrackVideo(videoName, action, value) {
	omnitureTrackVideo(videoName, action, value);
}

function TrackMasterCategoryShopLinksClick(masterCategory, linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(masterCategory) && !IsNullOrEmpty(linkName)) {
            TrackEvent('Menus', 'MC Menu Items', masterCategory + ' | ' + linkName);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMasterCategoryShopLinks(masterCategory, linkName);
    }
}

function TrackWeddingBandDetailsLink(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackWeddingBandDetailsLink(pageName, action, value);
    }

}

function TrackSkinToneSeeItOn(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSkinToneSeeItOn(pageName, action, value);
    }

}

function TrackCaratSizeSeeItOn(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackCaratSizeSeeItOn(pageName, action, value);
    }

}

function TrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems);
    }

}

function TrackInlineViewSavedItems(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineViewSavedItems(argPageTitle, argAction);
    }

}

function TrackInlineRemoveShoppingBagItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineRemoveShoppingBagItem(argPageTitle, argAction);
    }

}

function TrackInlineRemoveSavedItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineRemoveSavedItem(argPageTitle, argAction);
    }

}

function TrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction);
    }

}

function TrackInlineSavedItemsLinkClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineSavedItemsLinkClick(argPageTitle, argAction);
    }
}

function TrackSavedItemsViewBy(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSavedItemsViewBy(argPageTitle, argAction);
    }
}

function TrackSavedItemsViewByImageSize(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSavedItemsViewByImageSize(argPageTitle, argAction);
    }
}
function TrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(ItemViewSource)) {
            TrackEvent('Item Page Activities', ItemViewSource, skuDescription, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription);
    }
}

function TrackCompleteSearch(pageName, searchTerm) {
    if (Is_GA_Enabled == 'true' && Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(searchTerm)) {
            GATrackCompleteSearch(searchTerm)
        }        
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackCompleteSearch(pageName, searchTerm);
    }
}

function TrackScheduleVisitWithRings(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Schedule A Visit', action + " | " + value);
        }      
    }

    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            OmnitureTrackScheduleVisitWithRings(pageName, action, value);
        }       
    }
}

function TrackActionAddToSavedItems(argPageTitle, argAction, skuValue) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction, skuValue);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackActionAddToSavedItems(argPageTitle, argAction);
    }

}

function TrackProductZoom(pageName, action, skuDescription) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(action)) {
            TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, action, skuDescription, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(skuDescription)) {
            OmnitureTrackProductZoom(pageName, action, skuDescription);
        }
    }
}

function TrackItemOnRollOver(level1, level2) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(level1) && !IsNullOrEmpty(level2)) {
            TrackEvent('Category Browse', 'View Product Overlay', level1);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(level1)) {
            OmnitureTrackItemOnRollOver(level1);
        }
    }
}

function TrackExpandCollapseMarketingTiles(pageName, action, sectionName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(sectionName)) {
            TrackEvent('User Activities', action, sectionName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackExpandCollapseMarketingTiles(pageName, action, sectionName);      
    }
}

function TrackItemPageShareType(linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(linkName)) {
            GATrackItemActivity(linkName);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackItemPageShareType(linkName);
    }
}
function TrackPDPTabActivity(linkName, itemDesc) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(linkName)) {
            GATrackItemActivity(linkName); 
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackPDPTabActivity(linkName, itemDesc);
    }
}

function TrackDeviceInfo(category, data) {
    if (Is_GA_Enabled == 'true') {
            GATrackDeviceInfo(category, data);        
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackDeviceInfo(category, data);
    }
}

function TrackRemoveSavedItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackRemoveSavedItem(argPageTitle, argAction);
    }
}

function TrackRemoveSavedEngagementItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackRemoveSavedEngagementItem(argPageTitle, argAction);
    }
}
function TrackMapLink(link) {
    if (Is_GA_Enabled == 'true' && !IsNullOrEmpty(link) && !IsNullOrEmpty(link.href)) {
        GATrackExitLink(link.href);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackMapLink(link);
    }
}
function TrackHomePagePromo(promo) {
    if (Is_GA_Enabled == 'true') {
        GATrackHomePagePromo(promo);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackHomePagePromo(promo);
    }
}
function TrackCreateAccount(relationshipStatus, signupDate) {
    if (Is_GA_Enabled == 'true') {
        GATrackCreateAccount(relationshipStatus, signupDate);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackCreateAccount(relationshipStatus, signupDate);
    }

}
function TrackSignOut() {
    if (Is_GA_Enabled == 'true') {
        GATrackSignOut();
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSignOut();
    }
}

function TracAccountActivation() {
    // GA tracking done on the Passwordreset.aspx page
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackAccountActivation();
    }
}
function TrackSignIn() {
    // GA tracking done on the signin.aspx page
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSignIn();
    }
}
function TrackEmailSignUp(isCreateAccount, signUpDate) {
    if (Is_GA_Enabled == 'true') {
        GATrackEmailSignUp();
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackEmailSignUp();
    }
    if (isCreateAccount) {   
        TrackCreateAccount('', signUpDate);
    }
}
/* End of SiteTracking.js */
// SearchManager.js, for managing global site search functionality

function SearchManager()
{
	this.pInstance = null;
	this.categoryArray = [];
}

SearchManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new SearchManager();
	}
	return this.pInstance;
};

SearchManager.prototype.init = function () {
    var hoverOnEvent;
    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
    } else {
        hoverOnEvent = "mouseenter";
    }

    var hoverOffEvent;
    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
    } else {
        hoverOffEvent = "mouseleave";
    }

    var parent = this;

    //inline store/search bar code
    if ($(".adv-search-overlay").length) {
        parent.loadAdvancedSearchData();

        var advtimer;

        $("body").on(hoverOnEvent, "#sitesearch", function (e) {
            if (hoverOnEvent != "click") {
                if (advtimer) {
                    clearTimeout(advtimer);
                    advtimer = null;
                }
                advtimer = setTimeout(function () {                    
                    $("#searchInput").addClass("show-advanced");
                    clearTimeout(advtimer);
                    advtimer = null;
                }, 300);
            } else {
                e.preventDefault();
                $("#searchInput").addClass("show-advanced");
            }
        });

        $("body").on(hoverOffEvent, "#sitesearch", function (e) {
            if (!$("body").hasClass("ios")) {
                if (advtimer) {
                    clearTimeout(advtimer);
                    advtimer = null;
                }
                advtimer = setTimeout(function () {
                    $("#searchInput").removeClass("show-advanced");
                    clearTimeout(advtimer);
                    advtimer = null;
                }, 1250);
            }
        });
    }

    $("body").on(hoverOnEvent, "a.my-account", function (e) {
        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#myAccountOverlay").fadeIn();
                $("a.my-account").addClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            e.preventDefault();
            $("#myAccountOverlay").fadeIn();
            $("a.my-account").addClass("selected");
        }
    });

    $("body").on(hoverOffEvent, "#myAccountOverlay", function (e) {
        if (!$("body").hasClass("ios")) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#myAccountOverlay").fadeOut(200);
                $("a.my-account").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOffEvent, "a.my-account", function (e) {
        if (!$("body").hasClass("ios")) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#myAccountOverlay").fadeOut(200);
                $("a.my-account").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    //    $("body").on(hoverOnEvent, "a.search", function (e) {
    //        var target = $(this);

    //        if (hoverOnEvent != "click") {
    //            if (timer) {
    //                clearTimeout(timer);
    //                timer = null;
    //            }
    //            timer = setTimeout(function () {
    //                parent.openSearch(target);
    //                clearTimeout(timer);
    //                timer = null;
    //            }, 300);
    //        } else {
    //            parent.openSearch(target);
    //        }
    //    });

    $("body").on("click", "a.searchstores", function (e) {
        if (hoverOnEvent == "click" && !$("body").hasClass("en-US-EStr") && !$(this).hasClass("selected")) {
            $(this).trigger(hoverOnEvent);
            e.preventDefault();
        }
    });

    $("body").on("click", "a.my-account", function (e) {
        if (hoverOnEvent == "click" && !$(this).hasClass("selected")) {
            $(this).trigger(hoverOnEvent);
            e.preventDefault();
        }
    });

    //    $("body").on(hoverOffEvent, "#sitesearch", function (e) {
    //        if (!$("body").hasClass("ios") && e.target.nodeName != "INPUT") {
    //            if (timer) {
    //                clearTimeout(timer);
    //                timer = null;
    //            }
    //            timer = setTimeout(function () {
    //                $("#searchInput").blur();
    //                //$("#sitesearch").fadeOut(200); 
    //                $("#sitesearch input#searchInput").addClass("placeholder"); $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
    //                $("a.search").removeClass("selected");
    //                clearTimeout(timer);
    //                timer = null;
    //            }, 1250);
    //        }
    //    });

    //    $("body").on(hoverOffEvent, "a.search", function (e) {
    //        if (!$("body").hasClass("ios")) {
    //            if (timer) {
    //                clearTimeout(timer);
    //                timer = null;
    //            }
    //            timer = setTimeout(function () {
    //                $("#searchInput").blur();
    //                //$("#sitesearch").fadeOut(200); 
    //                $("#sitesearch input#searchInput").addClass("placeholder"); $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
    //                $("a.search").removeClass("selected");
    //                clearTimeout(timer);
    //                timer = null;
    //            }, 1250);
    //        }
    //    });

    $("body").on(hoverOnEvent, "#storesearch, #myAccountOverlay", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on(hoverOnEvent, "a.searchstores", function (e) {
        if (typeof locale != "undefined" && (locale == "en-US-EStr" || locale == "ja-JP-EStr")) {
            return;
        }
        var target = $(this);

        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                parent.openStoreSearch(target);
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            e.preventDefault();
            parent.openStoreSearch(target);
        }
    });

    $("body").on(hoverOffEvent, "#storesearch", function (e) {
        if (!$("body").hasClass("ios") && e.target.nodeName != "INPUT") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#locationSearchInput").blur();
                $("#storesearch").fadeOut(200); $("#storesearch input").addClass("placeholder"); $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));
                $("a.searchstores").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOffEvent, "a.searchstores", function (e) {
        if (!$("body").hasClass("ios")) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#locationSearchInput").blur();
                $("#storesearch").fadeOut(200); $("#storesearch input").addClass("placeholder"); $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));
                $("a.searchstores").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on("click", "#myAccountOverlay .close, #storesearch .close", function (e) {
        $(this).parent().fadeOut(200);
        $("#locationSearchInput").blur();
        $("a.searchstores").removeClass("selected");
        $("a.search").removeClass("selected");
        $("a.my-account").removeClass("selected");
        return false;
    });

    $(document).keydown(function (e) {
        var keyPress = (e.keyCode ? e.keyCode : e.which);
        if (keyPress == 13) {
            if ($("#sitesearch input").is(":focus")) {
                parent.searchSite();
                return false;
            }
            if ($("#storesearch input").is(":focus")) {
                parent.searchLocations();
                return false;
            }
        }
    });

    //end inline store/search bar code
};

SearchManager.prototype.openSearch = function (target) {
	if (!$("#filters.searchbar").length) {
	    $("#storesearch").fadeOut(200);
		//$("#sitesearch").fadeIn(200);
		$("#flydown").fadeOut(300);
		$("#nav .flydowns a").removeClass("selected");
		$("#saved").fadeOut(300);
		$("a.searchstores, .bag a").removeClass("selected");
		$("#filters > div").slideUp(200);
		$("#filters a").removeClass("selected");
		$("#grid-popup").hide();

		$("#divAdvSearch").show();
		$("#advSearchDrops").hide();
		$("#topSearchBtn").show();
		$("#advSearchButton").hide();
		target.addClass("selected");
	}
};

SearchManager.prototype.openStoreSearch = function (target) {
    $("#myAccountOverlay").fadeOut(200);
	$("#storesearch").fadeIn(200);
	$("#flydown").fadeOut(300);
	$("#nav .flydowns a").removeClass("selected");
	$("#saved").fadeOut(300);
	$("a.search, .bag a").removeClass("selected");
	$("#filters > div").slideUp(200);
	$("#filters a").removeClass("selected");
	target.addClass("selected");
};

SearchManager.prototype.searchLocations = function (searchTerms) {
    if (typeof (searchTerms) == "undefined") {
        searchTerms = $("#locationSearchInput").val();
    }
    if (searchTerms == "" || searchTerms == $("#locationSearchInput").attr("data-placeholder")) {
        //window.location = '/Locations/Default.aspx';
    }
    else {
        TrackStoreSearchTerm(searchTerms);
        window.location = '/Locations/StoreLocator.aspx?qs=t+' + escape(searchTerms);
    }
};

SearchManager.prototype.searchSite = function () {
    var searchTerms = $.trim($("#searchInput").val());
    if (searchTerms == $("#searchInput").attr("data-placeholder")) {
		searchTerms = "";
	}

    if ($("#advSearchDrops").length == 0 || $("#advSearchDrops").css("display") == "none") {
        if (searchTerms != "" && searchTerms != $("#searchInput").attr("data-placeholder")) {
            TrackSearchTerm(searchTerms);
		    window.location = '/Shopping/CategoryBrowse.aspx?search=1&searchkeyword=' + encodeURIComponent(searchTerms);
		}
    }
    else {
        var refinements = [];
        var selectedCollection = $("#selectCOLLECTIONS").val();
        var selectedCategory = $("#selectCATEGORIES").val();
        var selectedMaterial = $("#selectMATERIALS").val();
        var selectedGemstone = $("#selectGEMSTONES").val();
        var lowRange = $("#lowRangeSearch").val();
        var highRange = $("#highRangeSearch").val();
        var highRangePlaceholder = $("#highRangeSearch").attr("data-placeholder");
        var stateSnapshot = new StateSnapshotVO();

        if (typeof(selectedCollection) != "undefined" && selectedCollection != "") {
            refinements.push(selectedCollection);
        }
        if (typeof(selectedCategory) != "undefined" && selectedCategory != "") {
            refinements.push(selectedCategory);
        }
        if (typeof(selectedMaterial) != "undefined" && selectedMaterial != "") {
            refinements.push(selectedMaterial);
        }
        if (typeof(selectedGemstone) != "undefined" && selectedGemstone != "") {
            refinements.push(selectedGemstone);
        }
        if (lowRange != "" && lowRange != "0") {
            stateSnapshot.lowRange = lowRange;
        }
        if (highRange != "" && highRange != highRangePlaceholder) {
            stateSnapshot.highRange = highRange;
        }

        stateSnapshot.searchTerms = encodeURIComponent(searchTerms);
        stateSnapshot.refinement = refinements.join("+");

		if (searchTerms != "" || refinements.length > 0 || stateSnapshot.highRange != "") {
			// Make sure that something has been selected or typed
	        window.location = '/Shopping/CategoryBrowse.aspx?search=1&search_params=' + URLFactory.convertStateToHash(stateSnapshot);
		}
    }
};

SearchManager.prototype.openAdvancedSearch = function () {
	$("#divAdvSearch").hide();
	$("#advSearchDrops").show();
	$("#topSearchBtn").hide();
	$("#advSearchButton").show();

	this.loadAdvancedSearchData();
};

SearchManager.prototype.loadAdvancedSearchData = function () {
	var parent = this;
	if (this.categoryArray == null || this.categoryArray.length == 0) {
		$.ajax({
			url: "/Default.aspx/GetJSONAdvancedSearchFilters",
			type: "POST",
			data: '',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				parent.categoryArray = data.d.Menus;
				parent.populateAdvancedSearchData(data.d.Menus);
				updateCustomDrop("selectWrapperCOLLECTIONS");
				updateCustomDrop("selectWrapperCATEGORIES");
				updateCustomDrop("selectWrapperMATERIALS");
				updateCustomDrop("selectWrapperGEMSTONES");
				parent.updateAdvancedRefinementVisibility(data.d.Menus);
			},
			error: function (jqXHR, status, error) {

			}
		});
	}
	else {
		// Use cached service data
		parent.populateAdvancedSearchData(this.categoryArray);
		updateCustomDrop("selectWrapperCOLLECTIONS");
		updateCustomDrop("selectWrapperCATEGORIES");
		updateCustomDrop("selectWrapperMATERIALS");
		updateCustomDrop("selectWrapperGEMSTONES");
		this.updateAdvancedRefinementVisibility(this.categoryArray);
	}
};

SearchManager.prototype.updateAdvancedRefinementVisibility = function (categories) {
	var showCollections = false;
	var showCategories = false;
	var showMaterials = false;
	var showGemstones = false;

	if (typeof (categories) != "undefined" && categories != null) {
		for (var i = 0; i < categories.length; i++) {
			switch (categories[i].DimensionGroup) {
				case "COLLECTIONS":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showCollections = true;
					}
					break;
				case "CATEGORIES":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showCategories = true;
					}
					break;
				case "MATERIALS":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showMaterials = true;
					}
					break;
				case "GEMSTONES":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showGemstones = true;
					}
					break;
			}
		}
	}
	if (showCollections == false) {
		$("#ctlHeader_ctlSearch_divsearchCollections").hide();
	}
	if (showCategories == false) {
		$("#ctlHeader_ctlSearch_divsearchCategories").hide();
	}
	if (showMaterials == false) {
		$("#ctlHeader_ctlSearch_divsearchMaterials").hide();
	}
	if (showGemstones == false) {
		$("#ctlHeader_ctlSearch_divsearchGemstones").hide();
	}
};

SearchManager.prototype.populateAdvancedSearchData = function (categories) {
	var $menuHandle;
	var items;
	var menuLabel;
	if (typeof (categories) != "undefined" && categories != null) {
		for (var i = 0; i < categories.length; i++) {
			$menuHandle = $("#select" + categories[i].DimensionGroup);
			menuLabel = $menuHandle.attr("data-initial-label");
			$menuHandle.empty();
			items = categories[i].MenuItems;
			if (items == null || items.length == 0) {
				$menuHandle.hide();
			}
			else {
				$menuHandle.show();
				$menuHandle.append($('<option value="">' + menuLabel + '</option>'));
				$menuHandle.append($('<option value="---">&nbsp;</option>'));
				for (var j = 0; j < items.length; j++) {
					$menuHandle.append($('<option value="' + items[j].refinementQS + '">' + items[j].Name + '</option>'));
				}
			}
		}
		globalAjaxCallback();
	}
}

/* End of SearchManager.js */
// ----------------------------------------------
// File:		StateModel.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of application data and state.
//				Defines getters and setters used to track and modify state data.
// Example:
// StateModel.getInstance().getProduct("1235345");
// ----------------------------------------------
function StateModel()
{
	this.pInstance = null;

	this.pCachedProducts = {
		list: [],
		lookup: {}
	};
	this.pCachedMarketingTiles	= {
		list: [],
		lookup: {}
	};

	this.pCategoryMenus			= {};
	this.pBrowseState			= URLFactory.convertHashToState(window.location.hash);
	this.pLastHash				= "";
	this.pSKU					= "";
	this.productServiceURL = "";
	this.productServiceType = "GET";
	this.layoutType = "1";
	this.numProducts = 0;
	this.currentPage = 0;
	this.isSearchMode = false;
	this.custom = {};
}

StateModel.LAYOUT_UNIFORM = "0";
StateModel.LAYOUT_TOP_LEFT = "1";
StateModel.LAYOUT_TOP_RIGHT = "2";
StateModel.LAYOUT_MARKETING = "3";
StateModel.SHOW_MORE_THRESHOLD = 72;
StateModel.DEFAULT_IMAGE_CROP = "0.2,0.2,0.6,0.6";
StateModel.SORT_CRITERIA_NEW = 3;
StateModel.SORT_CRITERIA_NAME = 4;
StateModel.SORT_CRITERIA_HIGH_LOW = 1;
StateModel.SORT_CRITERIA_LOW_HIGH = 2;
StateModel.SORT_CRITERIA_DEFAULT = 5;

// ----------------------------------------------
StateModel.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new StateModel();
	}
	return this.pInstance;
};

// ----------------------------------------------
StateModel.prototype.getProduct = function (productId)
{
	if (this.pCachedProducts.lookup[productId])
	{
		return this.pCachedProducts.lookup[productId];
	}
	return null;
};

// ----------------------------------------------
StateModel.prototype.getProducts = function (productId)
{
	return this.pCachedProducts.list;
};

// ----------------------------------------------
StateModel.prototype.appendProducts = function (productArray)
{
	if (productArray)
	{
		var numProducts = productArray.length;

		for (var i = 0; i < numProducts; i++)
		{
			if (productArray[i].id)
			{
				this.pCachedProducts.lookup[productArray[i].id] = productArray[i];
				this.pCachedProducts.list.push(productArray[i]);
			}
		}
	}
};

// ----------------------------------------------
StateModel.prototype.removeAllProducts = function ()
{
	$(this).trigger("currentPageChangeRequested", { value: this.getCurrentPage() });
	this.pCachedProducts.list = [];
	this.pCachedProducts.lookup = {};
	$(this).trigger("currentPageChangeCompleted", { value: 0 });
}

// ----------------------------------------------
StateModel.prototype.getCurrentPage = function ()
{
	return this.pBrowseState.currentPage;
};

// ----------------------------------------------
StateModel.prototype.getStateSnapshot = function ()
{
	var browseState = this.pBrowseState;
	return browseState;
};

// ----------------------------------------------
StateModel.prototype.setStateSnapshot = function (modelState) {
	var updatedProperties = [];
	var networkUpdateNeeded = false;
	var resetProductData = false;
	var parent = this;
	var hashData;
	var url;

	for (var propertyName in modelState) {
		if (typeof (modelState[propertyName]) != "undefined") {
			updatedProperties.push(propertyName);
			if (propertyName == "overlay") {
				if (this.pBrowseState.overlay != modelState.overlay) {
					this.pBrowseState.overlay = modelState.overlay;
					if (modelState.overlay != "") {
						var splitPopupState = modelState.overlay.split("+");
						if (splitPopupState.length == 1) {
							//							openMarketingPopUpFollowup(splitPopupState[0])
						}
						else if (splitPopupState.length >= 2) {
							for (var i = 1; i < splitPopupState.length; i++) {
								splitPopupState[i] = URLFactory.hashUnescape(splitPopupState[i]);
							}
							//							openMarketingPopUpFollowup(splitPopupState[0], splitPopupState);
						}
					}
					else {
						//						closePopUpFollowup();
					}
				}
			}
			else {
				this.pBrowseState[propertyName] = modelState[propertyName];
			}
		}

		// Take a look at which properties have been updated. If any of them require
		// a network call, then set the flag to indicate this. We only want one
		// network call for all products needing updating, which is why the flag is used.
		switch (propertyName) {
			case "currentPage":
				if (modelState[propertyName] >= this.pCachedProducts.list.length) {
					// Only call service if we don't already have the data pre-cached
					networkUpdateNeeded = true;
				}
				break;
			case "category":
			case "sortCriteria":
			case "refinement":
			case "searchTerms":
			case "pkbMipsOptions":
			case "pkbHideIndividual":
			case "pkbClassificationSort":
			case "pkbMipsLocations":
			case "pkbAvailableInventory":
				networkUpdateNeeded = true;
		}

	}

	$(this).trigger("setStateSnapshotRequested", { state: this.pBrowseState, updatedProperties: updatedProperties });

	if (networkUpdateNeeded == true && this.productServiceURL != "") {
		hashData = URLFactory.convertStateToServiceHash(this.pBrowseState);
		//		url = "/shared/scripts/ecom/shopping/categoryBrowseJSON_" + this.pBrowseState.currentPage + ".txt";
		url = this.productServiceURL;
		$.ajax({
			url: url,
			type: this.productServiceType,
			data: '{"searchQueryString": "' + hashData + '", "isSearchMode": ' + this.isSearchMode + '}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.d != null) {
					$(parent).trigger("getProductsComplete", { results: data.d, service: "getProducts", state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
					$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
				} else {
					$(parent).trigger("getProductsError");
					$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });					
				}
			},
			error: function (jqXHR, status, error) {
				$(parent).trigger("getProductsError", { status: status, message: jqXHR.responseText, service: "getProducts", state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
				$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
			}
		});
	}
	else {
		$(this).trigger("setStateSnapshotComplete", { state: this.pBrowseState, updatedProperties: updatedProperties });
	}

	//	FlashCommBridge.getInstance().send("setFromHistory", modelState.flash); // Should be done in follow-up event handler

};

// ----------------------------------------------
StateModel.prototype.getSKU = function ()
{
	return this.pSKU;
};

// ----------------------------------------------
StateModel.prototype.setSKU = function (sku)
{
	this.pSKU = sku;
};

/* End of StateModel.js */
// ----------------------------------------------
// File:		TelephoneMaskManager.js
// Author:		Aaron Koss
// Description:	Controls telephone number masking for telephone input fields
// ----------------------------------------------

function TelephoneMaskManager() {
	this.pInstance = null;
	this.telMask = "(___) ___-____";
	this.phoneNumberBuffer = this.telMask.replace(/[^_]/g, '');
}

TelephoneMaskManager.getInstance = function () {
    //var addToBagTimeout;
    if (!this.pInstance) {
        this.pInstance = new TelephoneMaskManager();
    }
    return this.pInstance;
};
// ----------------------------------------------
// Function:	TelephoneMaskManager.init()
// Author:		Aaron Koss
// Description:	Attach event handlers to phone number fields with class "applyPhoneMask"
// Inputs:		<String> customPhoneMask - optional variable overrides default US/CA phone mask
// Returns:		<Nothing>
// ----------------------------------------------
TelephoneMaskManager.init = function(customPhoneMask) {
	$(".applyPhoneMask").each(function() {
		var telephoneMask = new TelephoneMaskManager();
		if (customPhoneMask != null) {
			telephoneMask.telMask = customPhoneMask;
		}		
		if (!isAndroid()) {
			$(this).focus(function() { telephoneMask.phoneFocus(this); });
			$(this).blur(function() { telephoneMask.phoneBlur(this); });
			$(this).keydown(function(event) { telephoneMask.formatPhoneNumber(this, event); });
		} else {
			$(this).focus(function() {telephoneMask.prePhoneFormat(this)});
			$(this).blur(function() {telephoneMask.postPhoneFormat(this)});
		}
	});
	$(".applyPhoneMask").removeClass("applyPhoneMask");
}

TelephoneMaskManager.prototype.phoneFocus = function(elem) {
    if (elem.value == "") {
      elem.value = this.telMask;
      this.setPhoneNumCursor(elem,0);
    } else {
	    this.setPhoneNumCursor(elem);
	  }
}
TelephoneMaskManager.prototype.phoneBlur = function(elem) {
    if (elem.value == this.telMask) {
        elem.value = "";
    }
    
}
TelephoneMaskManager.prototype.findNextPosition = function(pos) {
  while (/[^0-9_]/g.test(this.telMask.substring(pos, pos+1)) && pos<this.telMask.length) {
  	pos++;
  }
  return pos;
}
TelephoneMaskManager.prototype.findPreviousPosition = function(pos) {
  while (/[^_]/g.test(this.telMask.substring(pos-1, pos)) && pos > 0) {
  	pos--;
  }
  return pos;
}
TelephoneMaskManager.prototype.setPhoneNumCursor = function (elem, pos) {
    if (pos == null) {
        pos = $(elem).val().indexOf("_");
        if (pos < 0) { pos = $(elem).val().length; }
    }
    if (elem.setSelectionRange) {
        elem.focus();
        setTimeout(function () {
            elem.setSelectionRange(pos, pos);
        }, 0);
    }
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }

}
TelephoneMaskManager.prototype.mergePhoneMask = function() {
    var tempMask = this.telMask.replace(/_/g,"x");
    var tempPos;
    for (var i=0; i<this.phoneNumberBuffer.length;i++) {
        tempPos = tempMask.indexOf("x");
        tempMask = tempMask.substr(0, tempPos) + this.phoneNumberBuffer.charAt(i) + tempMask.substr(tempPos+1);
    }
    return tempMask;
}
TelephoneMaskManager.prototype.formatPhoneNumber = function(elem, e) {
    var tempMask;
    var key;
    var tempPos;
    var selectionRange = this.getInputSelectionRange(elem);
    var newCursorPos = selectionRange.begin;
    if (e.which == 9 || e.which == 37 || e.which == 39 || e.which == 16) { return; }
    if ((e.which == 8) || (e.which == 46) || (e.which > 47 && e.which < 58) || (e.which > 95	&& e.which < 106)) {
	    // numpad keys don't match to charcode
      if (e.which > 95 && e.which < 106) {
        key = (e.which-96).toString();
      } else if (e.which == 8 || e.which == 46) {
      	key = "_";
      } else {
        key = String.fromCharCode(e.which);
      }
      //if (this.phoneNumberBuffer.indexOf("_") != -1 || selectionRange.begin != selectionRange.end) {
  		tempMask = this.mergePhoneMask();
  		if (selectionRange.begin != selectionRange.end) {
  			var underscore = "";
  			for (var i=0; i < tempMask.substring(selectionRange.begin,selectionRange.end).replace(/[^0-9_]/g, '').length -1; i++) {
  				underscore += "_";
  			}
  			if (e.which != 8 && e.which != 46) {
  				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.end,tempMask.length) + underscore).replace(/[^0-9_]/g, '');
  				newCursorPos = this.findNextPosition(selectionRange.begin)+1;
  			} else {
  				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + tempMask.substring(selectionRange.end,tempMask.length) + key + underscore).replace(/[^0-9_]/g, '');
  			}
  		} else if (e.which == 8 && selectionRange.begin > 0) {
  				selectionRange.begin = this.findPreviousPosition(selectionRange.begin);
  				if (selectionRange.begin > 0) {
						this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin-1) + tempMask.substring(selectionRange.begin,tempMask.length) + key).replace(/[^0-9_]/g, '');
					}
					if (selectionRange.begin-1 <= 0) {
						newCursor = this.findNextPosition(0);
					} else {
						newCursorPos = selectionRange.begin-1;
					}
			} else if(e.which == 46 && selectionRange.begin < tempMask.length) {
				selectionRange.begin = this.findNextPosition(selectionRange.begin);
				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + tempMask.substring(selectionRange.begin+1,tempMask.length) + key).replace(/[^0-9_]/g, '');				
			} else if (this.phoneNumberBuffer.indexOf("_") != -1 && selectionRange.begin != tempMask.length) {
				selectionRange.begin = this.findNextPosition(selectionRange.begin);
				if (tempMask.substring(selectionRange.begin, selectionRange.begin+1) == "_") {
					this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.begin+1,tempMask.length)).replace(/[^0-9_]/g, '');
				} else {
					var nextPosition = tempMask.substring(selectionRange.begin, tempMask.length).indexOf("_") + selectionRange.begin;
					this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.begin,nextPosition)+tempMask.substring(nextPosition+1,tempMask.length)).replace(/[^0-9_]/g, '');
				}
				newCursorPos = this.findNextPosition(selectionRange.begin+1);
			} 
	  	//}		
      elem.value = this.mergePhoneMask();    		    
    }
    e.preventDefault();
    this.setPhoneNumCursor(elem, newCursorPos);
}
TelephoneMaskManager.prototype.prePhoneFormat = function(elem) {
	$(elem).val($(elem).val().replace(/[^0-9]/g, ''));
}
TelephoneMaskManager.prototype.postPhoneFormat = function(elem) {
    var phoneNum = $(elem).val().replace(/[^0-9]/g, '');
    if (phoneNum == "") { $(elem).val(""); return; } 
	var newPhone = "(";
	if (typeof phoneNum.substring(0,1) != "undefined" && phoneNum.substring(0,1) == "1") {
		phoneNum = phoneNum.substring(1,phoneNum.length);
	}
	for (var i=0; i < 10; i++) {
		if (i == 3) {newPhone += ") ";}
		if (i == 6) {newPhone += "-";}
		if (typeof phoneNum.substring(i,i+1) != "undefined") {
			newPhone += phoneNum.substring(i,i+1);
		} else {
			newPhone += "_";
		}
	}
	$(elem).val(newPhone);
	$(elem).valid();
}

TelephoneMaskManager.prototype.getInputSelectionRange = function (elem) {
    if ($(elem)[0].setSelectionRange) {
        begin = $(elem)[0].selectionStart;
        end = $(elem)[0].selectionEnd;
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
    }
    return { begin: begin, end: end };
}

$(document).ready(function() { 
	//apply Telephone Mask
	if (typeof locale != "undefined" && (locale == "en-US" || locale == "en-CA" || locale == "fr-CA")) {
		TelephoneMaskManager.init();
	}
});

/* End of TelephoneMaskManager.js */
// URLFactory.js

function StateSnapshotVO()
{
	this.numProductsVisible = 0;
	this.currentPage = 0;
	this.pageSize = "1000";
	this.selectedTab = "";
	this.category = "";
	this.sortCriteria = 9999;
	this.refinement = "";
	this.searchTerms = "";
	this.onlyItems = "1";
	this.isNormalized = "";
	this.popup = "";
	this.flash = "";
	this.custom = "";
	this.selectedImage = "";
	this.selectedFilters = "";
	this.lowRange = "";
	this.highRange = "";
	this.pkbMipsOptions = "";
	this.pkbHideIndividual = "";
	this.pkbClassificationSort = "";
	this.pkbMipsLocations = "";
	this.pkbAvailableInventory = "";
	this.relatedItemSku = "";
	this.soldIR = "";
	this.pagePosition = "";
}

// ----------------------------------------------
// File:		URLFactory.js
// Author:		Nathan Derksen
// Description:	Class to handle converting URL parameters to StateSnapshotVO
// Example:
// var stateObj = URLFactory.convertHashToState(window.location.href);
// ----------------------------------------------


// ----------------------------------------------
// Function:	URLFactory()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function URLFactory()
{
}

var intToExtStateMap = {
	currentPage:"p",
	currentProductGrid:"cg",
	category:"c",
	sortCriteria:"s",
	refinement:"r",
	pageSize:"n",
	searchTerms:"t",
	relatedItemSku:"ri",
	onlyItems:"ni",
	isNormalized:"x",
	popup:"pu",
	flash:"f",
	id:"id",
	selectedFilters:"k",
	lowRange:"lr",
	highRange:"hr",
	soldIR:"mi",
	pagePosition:"pp"
};

var extToIntStateMap = {
	p:"currentPage",
	cg:"currentProductGrid",
	c:"category",
	s:"sortCriteria",
	r:"refinement",
	n:"pageSize",
	t:"searchTerms",
	ri:"relatedItemSku",
	ni:"onlyItems",
	x:"isNormalized",
	pu:"popup",
	f:"flash",
	id:"id",
	k:"selectedFilters",
	lr:"lowRange",
	hr:"highRange",
	mi:"soldIR",
	pp:"pagePosition"
};


// ----------------------------------------------
// Function:	ProductFactory.convertHashToState()
// Author:		Nathan Derksen
// Description:	Converts a URL with parameters in an anchor to fill a StateSnapshotVO object
// Inputs:		<String> url: The URL from the address bar
// Returns:		<StateSnapshotVO>: An object with properties to hold the state values
// ----------------------------------------------
URLFactory.convertHashToState = function(hash)
{
	var snapshot = new StateSnapshotVO();
	var splitURL;
	var anchor;
	var hashArray;
	var splitItem;
	var mappedProperty;
	var valueName;

	if (hash)
	{
		hash = hash.split("#").join("");
		hashArray = hash.split("-");
		for (var i=0; i < hashArray.length; i++)
		{
			splitItem = hashArray[i].split("+");
			valueName = splitItem[0];
			if (splitItem.length >= 2)
			{
				mappedProperty = extToIntStateMap[valueName];
				splitItem.shift();
				
				if (mappedProperty)
				{
					switch(mappedProperty.toLowerCase())
					{
						case "currentpage":
							snapshot.currentPage = Number(unescape(splitItem.join("+"))) - 1;
							break;							
						case "currentproductgrid":
							snapshot.currentProductGrid = unescape(splitItem.join("+"));
							break;
						case "category":
							snapshot.category = unescape(splitItem.join("+"));
							break;
						case "sortcriteria":
							snapshot.sortCriteria = unescape(splitItem.join("+"));
							break;
						case "refinement":
							snapshot.refinement = unescape(splitItem.join("+"));
							break;
						case "pagesize":
							snapshot.pageSize = unescape(splitItem.join("+"));
							break;
						case "searchterms":
							snapshot.searchTerms = unescape(splitItem.join("+"));
							break;
						case "relateditemsku":
							snapshot.relatedItemSku = unescape(splitItem.join("+"));
							break;
						case "onlyitems":
							snapshot.onlyItems = unescape(splitItem.join("+"));
							break;
						case "isnormalized":
							snapshot.isNormalized = unescape(splitItem.join("+"));
							break;
						case "popup":
							snapshot.popup = unescape(splitItem.join("+"));
							break;
						case "flash":
							snapshot.flash = unescape(splitItem.join("+"));
							break;
						case "lowrange":
							snapshot.lowRange = unescape(splitItem.join("+"));
							break;
						case "highrange":
							snapshot.highRange = unescape(splitItem.join("+"));
							break;
						case "soldir":
							snapshot.soldIR = unescape(splitItem.join("+"));
							break;
						case "pageposition":
							snapshot.pagePosition = unescape(splitItem.join("+"));
							break;
					}
				}
			}
		}
	}
	return snapshot;
};

// ----------------------------------------------
// Function:	ProductFactory.convertStateToHash()
// Author:		Nathan Derksen
// Description:	Converts a StateSnapshotVO object to a URL with parameters in an anchor
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertStateToHash = function(stateSnapshot)
{
	var stateArray = new Array();
	var newStateStr = "";

	var productGrid = StateModel.getInstance().getProducts();
	var sortCriteria = "";
	var sampleQueryString = "";
	
	if (productGrid.length > 0) {
		if (typeof(productGrid[0].qs) != "undefined") {
			sampleQueryString = productGrid[0].qs;
		}
		else {
			sampleQueryString = productGrid[0].ItemQS;
		}
		sortCriteria = URLFactory.extractValue(sampleQueryString, "sortCriteria");
	}

	for (var item in stateSnapshot)
	{
		switch(item.toLowerCase())
		{
			case "currentproductgrid":
			case "category":
			case "refinement":
			case "pagesize":
			case "searchterms":
			case "relateditemsku":
			case "soldir":
			case "onlyitems":
			case "isnormalized":
			case "popup":
			case "flash":
			case "lowrange":
			case "highrange":
			case "pageposition":
				stateArray.push(intToExtStateMap[item] + "+" + escape(stateSnapshot[item]));
				break;
			case "currentpage":
				var offsetNum = String(Number(stateSnapshot[item]) + 1);
				stateArray.push(intToExtStateMap[item] + "+" + escape(offsetNum));
				break;
			case "sortcriteria":
				if (stateSnapshot[item] == "9999" || stateSnapshot[item] == 9999)
				{
					stateArray.push(intToExtStateMap[item] + "+" + sortCriteria);
				}
				else
				{
					stateArray.push(intToExtStateMap[item] + "+" + escape(stateSnapshot[item]));
				}
				break;
		}
	}
	
	newStateStr = stateArray.join("-");
	return newStateStr;
};

// ----------------------------------------------
// Function:	ProductFactory.convertStateToServiceHash()
// Author:		Nathan Derksen
// Description:	Converts a StateSnapshotVO object to a hash that can be consumed by a service (eg: removes "currentProductGrid" and makes pages 1 based instead of 0 based)
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertStateToServiceHash = function(stateSnapshot)
{
	var stateArray = new Array();
	var newStateStr = "";

	var productGrid = StateModel.getInstance().getProducts();
	var sortCriteria = "";
	var sampleQueryString = "";
	
	if (productGrid.length > 0)
	{
		if (typeof(productGrid[0].qs) != "undefined") {
			sampleQueryString = productGrid[0].qs;
		}
		else {
			sampleQueryString = productGrid[0].ItemQS;
		}
		sortCriteria = URLFactory.extractValue(sampleQueryString, "sortCriteria");
	}
	
	for (var item in stateSnapshot)
	{
		switch(item.toLowerCase())
		{
			case "category":
			case "refinement":
			case "pagesize":
			case "searchterms":
			case "relateditemsku":
			case "soldir":
			case "onlyitems":
			case "isnormalized":
			case "lowrange":
			case "highrange":
			case "pageposition":
			    stateArray.push(intToExtStateMap[item] + "+" + encodeURI(stateSnapshot[item]));
				break;
			case "currentpage":
				var offsetNum = String(Number(stateSnapshot[item]) + 1);
				stateArray.push(intToExtStateMap[item] + "+" + encodeURI(offsetNum));
				break;
			case "sortcriteria":
				if (stateSnapshot[item] == "9999" || stateSnapshot[item] == 9999)
				{
					stateArray.push(intToExtStateMap[item] + "+" + sortCriteria);
				}
				else
				{
				    stateArray.push(intToExtStateMap[item] + "+" + encodeURI(stateSnapshot[item]));
				}
				break;
		}
	}
	
	newStateStr = stateArray.join("-");
	return newStateStr;
};

// ----------------------------------------------
// Function:	ProductFactory.convertHashToServiceHash()
// Author:		Nathan Derksen
// Description:	Cleans up the hash contents for sending to a service (eg: removes "currentProductGrid" and makes pages 1 based instead of 0 based.
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertHashToServiceHash = function(hash)
{
	var tempState = URLFactory.convertHashToState(hash);
	return URLFactory.convertStateToServiceHash(tempState);
};


// ----------------------------------------------
// ----------------------------------------------
URLFactory.updateHash = function(inputHash, criteria, value)
{
	var hashArray = inputHash.split("-");
	var splitItem;
	
	for (var i=0; i < hashArray.length; i++)
	{
		splitItem = hashArray[i].split("+");
		if (extToIntStateMap[splitItem[0]] == criteria)
		{
			hashArray[i] = splitItem[0] + "+" + value;
		}
	}
	return hashArray.join("-");
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.updateQuery = function(inputQuery, criteria, value)
{
	var queryArray = inputQuery.split("&");
	var splitItem;
	var itemFound = false;
	
	for (var i=0; i < queryArray.length; i++)
	{
		splitItem = queryArray[i].split("=");
		if (splitItem[0] == criteria)
		{
			queryArray[i] = splitItem[0] + "=" + value;
			itemFound = true;
		}
	}
	if (itemFound == false)
	{
		queryArray.push(criteria + "=" + value);
	}
	return queryArray.join("&");
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.extractValue = function(inputHash, criteria)
{
	var hashArray = inputHash.split("-");
	var splitItem;
	var valueName;
	
	for (var i=0; i < hashArray.length; i++)
	{
		splitItem = hashArray[i].split("+");
		valueName = splitItem[0];
		splitItem.shift();
		if (extToIntStateMap[valueName] == criteria)
		{
//		alert("extractValue: " + criteria + ":" + splitItem.join("+"));
			return splitItem.join("+");
		}
	}
	return "";
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.extractQueryStringValue = function(inputQueryString, criteria)
{
	var queryStringArray = inputQueryString.split("?").join("").split("&");
	var splitItem;
	
	for (var i=0; i < queryStringArray.length; i++)
	{
		splitItem = queryStringArray[i].split("=");
		if (splitItem[0].toLowerCase() == criteria.toLowerCase())
		{
			return splitItem[1];
		}
	}
	return "";
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.hashEscape = function(oldHash)
{
	var newHash = oldHash;
	newHash = escape(newHash);
	newHash = newHash.split("-").join("%45");
	newHash = newHash.split("+").join("%43");
	return newHash;
}

// ----------------------------------------------
// ----------------------------------------------
URLFactory.hashUnescape = function(oldHash)
{
	var newHash = oldHash;
	newHash = newHash.split("%45").join("-");
	newHash = newHash.split("%43").join("+");
	newHash = unescape(newHash);
	return newHash;
}

URLFactory.appendQueryString = function (key, value, isFirst) {
	if (isFirst == true) {
		return key + "=" + value;
	} else {
		return "&" + key + "=" + value;
	}
}

URLFactory.scene7ImageURL = function (image, preset, sharpen, crop) {
	var base = templateStrings.baseScene7ImageURL;
	var missingImage = (templateStrings.defaultScene7NoImageName == "") ? "" : "&defaultImage=" + templateStrings.defaultScene7NoImageName + "&&";
	var url = "";

	if (preset.indexOf("$") == -1) {
		preset = "$" + preset + "$";
	}

	if (typeof (image) == "undefined" || image == null || image == "") {
		image = templateStrings.defaultScene7NoImageName;
		sharpen = "";
		crop = "";
	}
	else {
		if (typeof (sharpen) != "undefined" && sharpen != null && sharpen != "") {
			sharpen = "&op_usm=" + sharpen;
		}
		else {
			sharpen = "";
		}

		if (typeof (crop) != "undefined" && crop != null && crop != "") {
			if (preset == "$EcomBrowseM$" || preset == "$EcomBrowseL$" || preset == "$EcomInlineM$") {
				crop = "&$cropvalue=" + crop;
			}
			else {
				crop = "&cropN=" + crop;
			}
		}
		else {
			crop = "";
		}

	}

	url = base + image + "?" + preset + sharpen + crop + missingImage;

	return url;
}

URLFactory.hasSubDomain = function (url) {
    // IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
    url = url.replace(new RegExp(/^\s+/), ""); // START
    url = url.replace(new RegExp(/\s+$/), ""); // END

    // IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
    url = url.replace(new RegExp(/\\/g), "/");

    // IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i), "");

    // IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
    url = url.replace(new RegExp(/^www\./i), "");

    // REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
    url = url.replace(new RegExp(/\/(.*)/), "");

    // REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");

        // REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
    }
    // CHECK TO SEE IF THERE IS A DOT '.' LEFT IN THE STRING
    var subDomain = (url.match(new RegExp(/\./g))) ? true : false;

    return (subDomain);
};

   /* End of URLFactory.js */
// VideoPlayer.js

function VideoPlayer(elementId) {
	this.elementId = elementId;
	this.dragInProgress = false;
	this.progressTracked = -1;
	this.props = {};
}

VideoPlayer.CONFIG_VALIDATION_ERROR = "configValidationError";
VideoPlayer.CONFIG_LOAD_ERROR = "configLoadError";

//Checks URL to see if it is the new version of the video overlay	
var query = window.location.search.split("?").join("");
var mode = unescape(URLFactory.extractQueryStringValue(query, "mode"));

VideoPlayer.prototype.embedVideo = function (configData) {

	var parent = this;
	var testVideo = document.createElement('video');
	var canPlayHtml5 = false;

	if (!!testVideo.canPlayType && (testVideo.canPlayType("video/mp4") != "" || testVideo.canPlayType("video/ogg") != "")) {
		canPlayHtml5 = true;
	}

	this.props = {
		playerWidth: 800,
		playerHeight: 480,
		videoURL: "/Shared/Videos/DreamMaker/DreamMaker.mp4",
		videoURLMobile: "",
		videoURLOgg: "",
		captionURL: "",
		videoPosterURL: "",
		title: "",
		autoPlay: true,
		showReplay: true,
		showTime: true
	}

	// Check for <video>
	$("#btnShare").click(function () {

		if ($("#divMiniPopUpShare").css('display') == "none") {
			$("#divMiniPopUpShare").css('display', 'block');
			$("#btnShare").css('color', 'black');
			changeBulletStateShare();
		}
		else {
			$("#divMiniPopUpShare").css('display', 'none');
			$("#btnShare").css('color', '#7F7F7F');
		}
		return false;
	});

	if ($("body").attr('id') == "overlay") {
		//		if (usingIE6) {
		//			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-3px" });
		//		}
		if (isMac && (agt.indexOf('firefox') != -1)) {
			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-52px" });
		}
		else {
			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-2px" });
		}
	}
	//	else {
	//		if (usingIE6) { $("div#divMiniPopUpShare").css({ "top": "40px" }); }
	//	}


	if (typeof (configData) == "string") {
		// A URL has been provided, load the URL to get the config data
		$.ajax({
			url: configData,
			type: 'GET',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				var defaultData = null;
				var overrideData = null;
				var error = false;
				var baseImageUrl = templateStrings.baseScene7ImageURL;
				if (typeof (templateStrings.baseScene7VideoURL) != "undefined" && templateStrings.baseScene7VideoURL != null && templateStrings.baseScene7VideoURL != "") {
					baseImageUrl = templateStrings.baseScene7VideoURL;
				}

				if (data == null || typeof (data.d) == "undefined" || data.d == null) {
					error = true;
					$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
				}
				else {
					for (var i = 0; i < data.d.length; i++) {
						if (data.d[i].locale.toLowerCase() == "default") {
							if (parent.isConfigDataValid(data.d[i]) == true) {
								defaultData = data.d[i];
							}
						}
						if (data.d[i].locale.toLowerCase() == locale.toLowerCase()) {
							if (parent.isConfigDataValid(data.d[i]) == true) {
								overrideData = data.d[i];
							}
						}
					}
					$.extend(parent.props, defaultData);
					$.extend(parent.props, overrideData);

					if (typeof (parent.props.videoPosterURL) == "undefined" || parent.props.videoPosterURL == null || parent.props.videoPosterURL == "") {
						if (Number(parent.props.playerWidth) / Number(parent.props.playerHeight) < 1.4) {
							parent.props.videoPosterURL = baseImageUrl + "video_poster_default_standard?wid=1440&hei=1080";
						}
						else {
							parent.props.videoPosterURL = baseImageUrl + "video_poster_default_wide?wid=1920&hei=1080";
						}
					} else if (parent.props.videoPosterURL.indexOf("/") == -1) {
						// Just the ID was provided, so assume Scene7 use and derive the poster frame URL
						if (Number(parent.props.playerWidth) / Number(parent.props.playerHeight) < 1.4) {
							parent.props.videoPosterURL = baseImageUrl + parent.props.videoPosterURL + "?wid=1440&hei=1080";
						}
						else {
							parent.props.videoPosterURL = baseImageUrl + parent.props.videoPosterURL + "?wid=1920&hei=1080";
						}
					}

					
					if (parent.props.videoURL != "" && parent.props.videoURL != null && parent.props.videoURL.indexOf("/") == -1 && mode != "new") {
						// Just the video ID was provided, so assume Scene7 use and derive the URLs
						parent.deriveVideoURLs(parent.props.videoURL);
					}
					else{
						if (typeof (templateStrings.baseScene7VideoURL) != "undefined" && templateStrings.baseScene7VideoURL != null && templateStrings.baseScene7VideoURL != "") {
							baseScene7video = templateStrings.baseScene7VideoURL.split("/image/").join("/content/");
						}
						else {
							baseScene7video = templateStrings.baseScene7ImageURL.split("/image/").join("/content/");
						}
						parent.props.videoURL = baseScene7video + parent.props.videoURL;
						parent.props.videoURLOgg = parent.props.videoURL + "_webm";
					}

					if (defaultData == null && overrideData == null) {
						error = true;
						$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
					}
					else {
						if (canPlayHtml5 == true) {
							parent.embedHTML5Video(parent.props);
						}
						else {
							// Need to account for the height of the control bar in calculating 
							// the height of the Flash video playback component
							parent.props.playerHeight += 30;
							parent.embedFlashVideo(parent.props);
						}
					}
				}
				if (error == false) {
					$(parent).trigger("embedComplete", { properties: parent.props });
				}
			},
			error: function (jqXHR, status, error) {
				$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_LOAD_ERROR });
			}
		});
	}
	else {
		// An object representing the config data to use has been provided
		if (this.isConfigDataValid(configData) == true) {
			$.extend(parent.props, configData);

			if (parent.props.videoURL != "" && parent.props.videoURL != null && parent.props.videoURL.indexOf("/") == -1) {
				// Just the video ID was provided, so assume Scene7 use and derive the URLs
				parent.deriveVideoURLs(parent.props.videoURL);
			}

			if (canPlayHtml5) {
				parent.embedHTML5Video(parent.props);
			}
			else {
				// Need to account for the height of the control bar in calculating 
				// the height of the Flash video playback component
				parent.props.playerHeight += 30;
				parent.embedFlashVideo(parent.props);
			}
			$(parent).trigger("embedComplete", { properties: parent.props });
		}
		else {
			// Show error message
			$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
		}
	}

	var $element = $("#" + this.elementId);
	var html = "";
};

VideoPlayer.prototype.embedFlashVideo = function (configData) {

	var autoPlay = configData.autoPlay;
	var parent = this;
	var videoHolderHnd;
	var flashHolder;
	var flashVars;

	if (configData.videoPosterURL != "") {
		$('#' + this.elementId + " .video-poster").html('<img src="' + configData.videoPosterURL + '" width="' + configData.playerWidth + '" height="' + configData.playerHeight + '" alt="" />');
		if (configData.autoPlay == false) {
			$('#' + this.elementId + " .video-poster").show();
		}
		else {
			$('#' + this.elementId + " .video-poster").hide();
		}
	}

	flashVars = "video=" + configData.videoURL;
	flashVars += "&subtitles=" + configData.captionURL;
	flashVars += "&audio=" + configData.audio;
	flashVars += "&autoplay=" + configData.autoPlay;
	flashVars += "&showreplay=" + configData.showReplay;
	flashVars += "&showtime=" + configData.showTime;
	flashVars += "&usearrow=true";
	flashVars += "&strokecolor=#ffffff";

	if ($('#' + this.elementId + " .video").length > 0) {
		videoHolderHnd = $('#' + this.elementId + " .video")[0];
		flashHolder = new FlashAPI(videoHolderHnd);
		flashHolder.setFlashVersion(8, 0, 0);
		flashHolder.setAttribute("src", "/shared/videos/player/video-player.swf");
		flashHolder.setAttribute("width", configData.playerWidth);
		flashHolder.setAttribute("height", configData.playerHeight);
		flashHolder.setAttribute("bgcolor", "#FFFFFF");
		flashHolder.setAttribute("wmode", "transparent");
		flashHolder.setAttribute("flashVars", flashVars);
		flashHolder.setAlternateRedirect("/Common/Errors/Flash.aspx");
		flashHolder.generateFlash();

		$('#' + this.elementId + ' .video-poster img').bind('click', function () {
			var tempHTML = $(videoHolderHnd).html();

			$('#' + parent.elementId + " .video-poster").hide();

			// Grab the HTML for the Flash player, set autoPlay to true so that when it's recreated it plays
			tempHTML = tempHTML.split("autoplay=false").join("autoplay=true");
			$(videoHolderHnd).html("");
			$(videoHolderHnd).html(tempHTML);
		});
	}

	setTimeout(function () { $("#" + parent.elementId + " .controls").hide(); }, 10);
};

VideoPlayer.prototype.embedHTML5Video = function (configData) {

	var parent = this;
	var videoHTML = "";
//	var videoURL = configData.videoURL;

//	if ((isIPad() == true || isIPhone() == true || isAndroid() == true) && configData.videoURLMobile != "") {
//		videoURL = configData.videoURLMobile;
//	}

	if (configData.videoPosterURL != "") {
		$('#' + parent.elementId + " .video-poster").html('<img src="' + configData.videoPosterURL + '" width="' + configData.playerWidth + '" height="' + configData.playerHeight + '" alt="" />');
		$('#' + parent.elementId + " .video-poster").show();
	}

	if(mode == "new"){
		var videoHeight = (720*$("#videoOverlay").width())/1280;
		videoHTML = '<video id="' + this.elementId + '_video" onclick="play();" style="width:' + $("#videoOverlay").width() + 'px; height:' + videoHeight + 'px">';
	}
	else{
		videoHTML = '<video id="' + this.elementId + '_video" onclick="play();" style="width:' + configData.playerWidth + 'px; height:' + configData.playerHeight + 'px">';
	}
	
	// Add a source element for each video type, the browswer will pick the first one that is supported on that browser
	if (typeof (configData.videoURLMobile) != "undefined" && configData.videoURLMobile != null && configData.videoURLMobile != "") {
		videoHTML += '<source src="' + configData.videoURLMobile + '" type="application/x-mpegURL"></source>';
	}
	if (typeof (configData.videoURL) != "undefined" && configData.videoURL != null && configData.videoURL != "") {
		videoHTML += '<source src="' + configData.videoURL + '" type="video/mp4"></source>';
	}
	if (typeof (configData.videoURLOgg) != "undefined" && configData.videoURLOgg != null && configData.videoURLOgg != "") {
		videoHTML += '<source src="' + configData.videoURLOgg + '" type="video/ogg"></source>';
	}
	videoHTML += '</video>';

	$("#" + this.elementId + " .video").html(videoHTML);
	if (configData.captionURL != "") {
		this.setupHTML5Captions(configData);
	}

	$('#' + this.elementId + ' .video-back').bind('click', function () {
		$('#' + parent.elementId + " video")[0].currentTime -= 10;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-forward').bind('click', function () {
		$('#' + parent.elementId + " video")[0].currentTime += 10;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-play').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-pause').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		$('#' + parent.elementId + " video")[0].pause();
	});

	$('#' + this.elementId + ' .video-mute').bind('click', function () {
		$('#' + parent.elementId + ' .video-mute').hide();
		$('#' + parent.elementId + ' .video-unmute').show();
		$('#' + parent.elementId + " video")[0].muted = true;
	});

	$('#' + this.elementId + ' .video-unmute').bind('click', function () {
		$('#' + parent.elementId + ' .video-mute').show();
		$('#' + parent.elementId + ' .video-unmute').hide();
		$('#' + parent.elementId + " video")[0].muted = false;
	});

	$('#' + this.elementId + ' .video-seek').bind('click', function (e) {
		var position = e.clientX - $(this).offset().left;
		var width = $('#' + parent.elementId + ' .video-seek').width();
		var percent = position / width;
		var duration = $('#' + parent.elementId + " video")[0].duration;
		var currentTime = Math.round(percent * duration)
		$('#' + parent.elementId + " video")[0].currentTime = currentTime;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-poster img').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-playhead').draggable({
		axis: "x",
		containment: "parent",
		start: function (event, ui) {
			parent.dragInProgress = true;
			$('#' + parent.elementId + " video")[0].pause();
		},
		drag: function (event, ui) {
			var position = ui.position.left;
			$('#' + parent.elementId + ' .video-play-progress').width((position + 5) + "px");
		},
		stop: function (event, ui) {
			parent.dragInProgress = false;
			var position = ui.position.left;
			var width = $('#' + parent.elementId + ' .video-seek').width();
			var percent = position / width;
			var duration = $('#' + parent.elementId + " video")[0].duration;
			$('#' + parent.elementId + " video")[0].currentTime = Math.round(percent * duration);
			$('#' + parent.elementId + " video")[0].play();
		}
	});

	$('#' + this.elementId + ' video').bind('timeupdate', function () {
		if (parent.dragInProgress == false) {
			var currentTime = Math.round(this.currentTime);
			var totalTime = this.duration;
			var numMinutes = Math.floor(currentTime / 60);
			var numSeconds = currentTime % 60;
			var percentProgress;
			if (numSeconds < 10) {
				$('#' + parent.elementId + ' .video-timer').html(numMinutes + ":0" + numSeconds);
			}
			else {
				$('#' + parent.elementId + ' .video-timer').html(numMinutes + ":" + numSeconds);
			}
			if (this.currentTime != null && this.currentTime > 0) {
				percentProgress = currentTime / totalTime * 100;
				$('#' + parent.elementId + ' .controls .video-play-progress').css("width", percentProgress + "%");
				$('#' + parent.elementId + ' .controls .video-playhead').css("left", ($('#' + parent.elementId + ' .controls .video-play-progress').width() - 5) + "px");

				if (percentProgress > 0 && parent.progressTracked == -1) {
					parent.progressTracked = 0;
					TrackVideo(parent.props.title, "Video Length", totalTime);
					TrackVideo(parent.props.title, "Play", "Started");
				}
				else if (percentProgress > 25 && parent.progressTracked == 0) {
					parent.progressTracked = 25;
					TrackVideo(parent.props.title, "Play", "25%");
				}
				else if (percentProgress > 50 && parent.progressTracked == 25) {
					parent.progressTracked = 50;
					TrackVideo(parent.props.title, "Play", "50%");
				}
				else if (percentProgress > 75 && parent.progressTracked == 50) {
					parent.progressTracked = 75;
					TrackVideo(parent.props.title, "Play", "75%");
				}
				else if (percentProgress >= 95 && parent.progressTracked == 75) {
					parent.progressTracked = 100;
					TrackVideo(parent.props.title, "Play", "Complete");
				}
			}

		}
	});

	$('#' + this.elementId + ' video').bind('progress', function () {
		var percentProgress = 0;

		if (this.buffered.length > 0 && this.buffered.end && this.duration) {
			percentProgress = this.buffered.end(0) / this.duration * 100;
		} else if (this.bytesTotal != undefined && this.bytesTotal > 0 && this.bufferedBytes != undefined) {
			percentProgress = this.bufferedBytes / this.bytesTotal * 100;
		}

		$('#' + parent.elementId + ' .controls .video-load-progress').css("width", percentProgress + "%");
	});

	$('#' + this.elementId + ' video').bind('play', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
	});

	$('#' + this.elementId + ' video').bind('pause', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
	});

	$('#' + this.elementId + ' video').bind('ended', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		if (configData.videoPosterURL != "") {
			$('#' + parent.elementId + " .video-poster").show();
		}
	});

	if (configData.autoPlay == true) {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " video")[0].play();
	}
	else {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		$('#' + parent.elementId + " video")[0].pause();
	}

	if (configData.audio == true) {
		$('#' + parent.elementId + ' .video-mute').show();
		$('#' + parent.elementId + ' .video-unmute').hide();
	}
	else {
		$('#' + parent.elementId + ' .video-mute').hide();
		$('#' + parent.elementId + ' .video-unmute').hide();
		$('#' + parent.elementId + ' .video-seek').css("right", "38px");
		$('#' + parent.elementId + ' .video-timer').css("right", "9px");
	}

	if (configData.showTime == false) {
		$('#' + parent.elementId + ' .video-timer').hide();
		$('#' + parent.elementId + ' .video-seek').css("right", "40px");
	}

	if (configData.audio == false && configData.showTime == false) {
		$('#' + parent.elementId + ' .video-seek').css("right", "11px");
	}

};

VideoPlayer.prototype.setupHTML5Captions = function (configData) {
	/* HTML5 Video Captioning */

	var $video = $("#" + this.elementId + "_video");
	var $player = $("#" + this.elementId + " .video");
	var isXMLLoaded = false;

	/* Manage captions */
	if (configData.captionURL != "") {

		var captionNode = '';

		/* Parse captions */
		$.ajax({
			type: "GET",
			url: configData.captionURL,
			dataType: "xml",
			success: function (xml) {

				isXMLLoaded = true;
				var $captions = $(xml).find('p')

				if ($captions.length) {

					$captions.each(function () {

						var beginSplit = $(this).attr('begin').split(':');
						var endSplit = $(this).attr('end').split(':');
						var begin = (parseFloat(beginSplit[0]) * 60) + parseFloat(beginSplit[1]);
						var end = (parseFloat(endSplit[0]) * 60) + parseFloat(endSplit[1]);
						var text = $(this).text();

						captionNode += '<span class="caption" data-begin="' + begin + '" data-end="' + end + '" style="display:none">' + text + '</span>';

					})

					$player.append('<div class="captions ' + locale + '">' + captionNode + '</div>');
					$("#" + this.elementId).css("position", "relative");
					$("#" + this.elementId + " .captions").width(configData.playerWidth);
				}
			}
		});

		/* Handle the display of captions */
		$player.children('video')[0].addEventListener('timeupdate', function () {
			if (isXMLLoaded) {
				var currT = $video[0].currentTime;

				if ($('.caption').length) {
					var howManyShowing = 0;
					$('.caption').each(function () {
						if ((currT >= $(this).attr('data-begin')) && (currT <= $(this).attr('data-end'))) {
							$(this).css('display', 'block');
							howManyShowing++;
						} else {
							$(this).css('display', 'none');
						}
					});
					if(howManyShowing == 0)
						$(".captions").hide();
					else
						$(".captions").show();
				}
			}
		}, false);
	}
};

VideoPlayer.prototype.isConfigDataValid = function (configData) {
	if (typeof(configData.playerWidth) != "undefined" && ValidationHelper.isValidNumber(configData.playerWidth) == false) {
		return false;
	}
    else if (typeof (configData.playerHeight) != "undefined" && ValidationHelper.isValidNumber(configData.playerHeight) == false) {
		return false;
	}
    else if (typeof (configData.videoURL) != "undefined" && ValidationHelper.isValidURL(configData.videoURL) == false) {
		return false;
	}
    else if (typeof (configData.videoURLMobile) != "undefined" && ValidationHelper.isValidURL(configData.videoURLMobile) == false) {
		return false;
	}
    else if (typeof (configData.captionURL) != "undefined" && ValidationHelper.isValidPath(configData.captionURL) == false) {
		return false;
	}
    else if (typeof (configData.videoPosterURL) != "undefined" && ValidationHelper.isValidURL(configData.videoPosterURL) == false) {
		return false;
	}
    else if (typeof (configData.title) != "undefined" && ValidationHelper.isValidText(configData.title) == false) {
		return false;
	}
    else if (typeof (configData.autoPlay) != "undefined" && ValidationHelper.isValidBoolean(configData.autoPlay) == false) {
		return false;
	}
    else if (typeof (configData.showReplay) != "undefined" && ValidationHelper.isValidBoolean(configData.showReplay) == false) {
		return false;
	}
    else if (typeof (configData.showTime) != "undefined" && ValidationHelper.isValidBoolean(configData.showTime) == false) {
		return false;
	}
    else if (typeof (configData.audio) != "undefined" && ValidationHelper.isValidBoolean(configData.audio) == false) {
		return false;
	}

	return true;
}

VideoPlayer.prototype.deriveVideoURLs = function (videoId) {

	// Just the video ID was provided, so assume Scene7 use and derive the URLs

	var profileWide = "_1024x576_1500K";
	var profileStandard = "_1024x768_1500K";
	var profile = "";
	var baseScene7video = "";
	var scene7videoId = "";

	scene7videoId = videoId.split("-AVS").join("");
	if (typeof (templateStrings.baseScene7VideoURL) != "undefined" && templateStrings.baseScene7VideoURL != null && templateStrings.baseScene7VideoURL != "") {
		baseScene7video = templateStrings.baseScene7VideoURL.split("/image/").join("/content/");
	}
	else {
		baseScene7video = templateStrings.baseScene7ImageURL.split("/image/").join("/content/");
	}

	if (Number(this.props.playerWidth) / Number(this.props.playerHeight) < 1.4) {
		// Letterbox aspect ratio
		profile = profileStandard;
	}
	else {
		// Wide screen aspect ratio
		profile = profileWide;
	}

	// HTML5 video element can take a comma separated list of file names, the first one that works will be used
	this.props.videoURL = baseScene7video + scene7videoId + profile;
	this.props.videoURLMobile = baseScene7video + scene7videoId + profile + ".m3u8";
	this.props.videoURLOgg = baseScene7video + scene7videoId + "_OGG" + profile;
};

/* End of VideoPlayer.js */
/* Validation Manager for validation framework functionality */

function ValidationManager() {
}

ValidationManager.init = function () {
    // Custom Validation rules
    ValidationManager.addValidationRule("customRequired", function (value, element, param) { if (value == $(element).attr("data-placeholder")) { return false; } else { return true; } });
    ValidationManager.addValidationRule("notEqual", function (value, element, param) { return value != param; });
    ValidationManager.addValidationRule("notEqualGroup",
        function (value, element, param) {
            for (var i = 0; i < param.length; i++) {
                if(value == param[i])
                {
                    return false;
                }
            }
            return true;
        }
        );
    ValidationManager.addValidationRule("isValidUSZip", function (value, element, param) { return /^\d{5}(-\d{4})?$/.test(value); });
    ValidationManager.addValidationRule("isValidCAZip", function (value, element, param) { return /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i.test(value); });
    ValidationManager.addValidationRule("isValidUSPhone", function (value, element, param) { return (value.replace(/[^0-9]/g, "").length == 10); });
    ValidationManager.addValidationRule("hasOnlyRomanChars", function (value, element, param) { return !(/[^\u0000-\u007f]/.test(value)); });
    ValidationManager.addValidationRule("isAlphaNumeric", function (value, element, param) { return /^[a-zA-Z0-9 ]*$/.test(value); });
    ValidationManager.addValidationRule("isNumberOrEmpty", function (value, element, param) { return (value == "" || (Math.floor(value) == value && $.isNumeric(value))); });
	ValidationManager.addValidationRule("isValidPassword", function (value, element, param) { return (value.indexOf(" ") === -1); });
}

ValidationManager.addControlValidation = function(obj) {
    if ($("[name='" + obj.fieldName + "']:first").length > 0) {
        $("[name='" + obj.fieldName + "']:first").rules("add", obj.rules);
    }
}
ValidationManager.addValidationRule = function(ruleName, func) {
    jQuery.validator.addMethod(ruleName, func);
}
ValidationManager.errorPlacement = function(error, element) {
    $(element).closest("div").append(error);
}

ValidationManager.clearError = function (elem) {
    $(elem).closest("div").removeClass("errorWrapper").find("label.error").hide();
}
ValidationManager.highlightError = function(element) {
    $(element).closest("div").addClass("errorWrapper");
    //ValidationManager.toggleGlobalError(element);
}
ValidationManager.unhighlightError = function(element) {
    $(element).closest("div").removeClass("errorWrapper");
    //ValidationManager.toggleGlobalError();
}
ValidationManager.validateField = function(element) {
	$(element).valid();
	ValidationManager.toggleGlobalError();
}
ValidationManager.toggleGlobalError = function(element) {
	this.defaultShowErrors();
    if ($("form.validateForm label.error:visible").length > 0 || $("form.validateForm label.serverError:visible").length > 0) {
        $("#pleaseCorrectErrors").show();
		if ($("#pnlErrorMessageIndicator").length > 0) { $("#pnlErrorMessageIndicator").hide(); }
    } else {
        $("#pleaseCorrectErrors").hide();
		if ($("#pnlErrorMessageIndicator").length > 0) { $("#pnlErrorMessageIndicator").show(); }
    }
}
ValidationManager.noValidation = function(value, element) {
    return true;
}
ValidationManager.displayServerSideError = function(value, element) {
    return false;
}
ValidationManager.handleInvalid = function() {
	window.scrollTo(0,0);
}
ValidationManager.showServerSideErrors = function (errors) {
    for (var i = 0; i < errors.length; i++) {
        var fieldId = errors[i].fieldId;
        var message = "";
        if (fieldId == null || fieldId == "") {
            break;
        }
        var fieldIDGenerated = fieldId.split("$").join("_");
        if (errors[i].errorMessage) {
            message = errors[i].errorMessage;
        } else if (errors[i].errorName) {
            message = validation.settings.messages[errors[i].fieldId][errors[i].errorName];
        } else {
            break;
        }
        var obj = new Object();
        if ($("#" + fieldIDGenerated).hasClass("sectionError")) {
            $("#" + fieldIDGenerated).append('<input type="hidden" name="' + fieldId + '" />');
        }
        obj[fieldId] = message;
        validation.showErrors(obj);
    }
    $("label.error").each(function () {
        $(this).removeClass("error").addClass("serverError");
        $(this).closest("div").removeClass("errorWrapper").addClass("serverErrorWrapper");
    });
    ValidationManager.toggleGlobalError();
}
ValidationManager.clearServerSideError = function(id) {
    $("label[for='" + id + "']").remove();
}

/* End Validation Manager */
/* ValidationHelper.js */

function ValidationHelper() {
}

ValidationHelper.isValidNumber = function (input) {

	if (typeof (input) == "number" && isFinite(input) == true) {
		return true;
	} else if (isFinite(Number(input)) == true) {
		return true;
	}

	return false;
};

ValidationHelper.isValidText = function (input) {

	if (input.indexOf("<") > -1 || input.indexOf(">") > -1 || input.indexOf("\n") > -1) {
		return false;
	}
	return true;
};

ValidationHelper.isValidBoolean = function (input) {

	if (typeof (input) == "boolean") {
		return true;
	} else if (input.toLowerCase() == "true" || input.toLowerCase() == "false" || input == "") {
		return true;
	}
	return false;
};

ValidationHelper.isValidPath = function (input) {

	var valid = true;
	var validCharRegexp = /^[a-zA-Z0-9\/][a-zA-Z0-9_\.\&\?\/\%\-\=]*$/g;

	if (input == "") {
		return true;
	}
	else if (input.toLowerCase().indexOf("javascript:") > -1) {
		// No javascript: protocol allowed
		return false;
	}
	else if (input.toLowerCase().indexOf("http:") == 0 || input.toLowerCase().indexOf("https:") == 0) {
		// Paths are required to be from the same server, so no http: or https: protocol designators allowed
		return false;
	}
	else if (input.indexOf("//") == 0) {
		// An absolute URL can start with just // instead of http:// so don't allow that either
		return false;
	}
	else if (input.indexOf("./") > -1) {
		// ./ and ../ can be used improperly
		return false;
	}
	else if (input.search(validCharRegexp) == -1) {
		return false;
	}
	return true;
};

ValidationHelper.isValidURL = function (input) {
	var valid = true;
	var validCharRegexp = /^[a-zA-Z0-9\/][a-zA-Z0-9_\.\&\?\/\%\-\:\=]*$/g;

	if (input == "") {
		return true;
	}
	else if (input.toLowerCase().indexOf("javascript:") > -1) {
		// No javascript: protocol allowed
		return false;
	}
	else if (input.indexOf("./") > -1) {
		// ./ and ../ can be used improperly
		return false;
	}
	else if (input.search(validCharRegexp) == -1) {
		return false;
	}
	return true;

};

/* End of ValidationHelper.js */
// ----------------------------------------------
// File:		Detection.js
// Author:		Aaron Koss
// Description:	This file includes browser and hardware detection scripts.
// ----------------------------------------------

// ** Begin functions brought over from old JavaScript.ascx
var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
var is_minor = parseFloat(appVer);
var is_major = parseInt(is_minor);

function isIEUnsupported() 
{
	var iePos  = appVer.indexOf('msie');
	if (iePos !=-1) {
		is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
		is_major = parseInt(is_minor);
	}
	if ((iePos!=-1) && is_major<6) {
		if (isRetail.toLowerCase() == "true") {return false} 
		else {return true}
	}	
	else {return false}
}
	
function isSafariUnsupported() 
{
	if((agt.indexOf('safari') > 0) && agt.indexOf('mac') > 0 )
	{
		is_minor = parseFloat(agt.substring(agt.indexOf('safari')+7,agt.indexOf('safari')+12));
		is_major = parseInt(is_minor);
		if (is_major < 412) {return true}
		else {return false}
	}
}
	
function isSafari3Plus()
{
	if(agt.indexOf('safari') > 0)
	{
		is_minor = parseFloat(agt.substring(agt.indexOf('safari')+7,agt.indexOf('safari')+12));
		is_major = parseInt(is_minor);
		if (is_major >= 500) {return true}
		else {return false}
	}
	return false;
}

var browserName=navigator.appName;
var browserVer=parseInt(navigator.appVersion);
var isMac = (navigator.appVersion.indexOf("Mac") != -1);
//Do Object detection
if (document.location.href.toLowerCase().indexOf("upgrade.aspx") == -1 && document.location.href.toLowerCase().indexOf("externalsitewarning.aspx") == -1) {
	if (document.getElementById) {
		if ((browserName=="Netscape" && browserVer<5) || isIEUnsupported() || isSafariUnsupported() || (browserName=="Microsoft Internet Explorer" && isMac)) 
			{
				document.location.href = "/Common/errors/upgrade.aspx";
			}
	}
	else {document.location.href = "/Common/errors/upgrade.aspx";}
}
	
function shouldPriceBeVisible()
{
	if ((locale.toLowerCase() == "intl" && isRetail.toLowerCase() == "false") || (locale.toLowerCase() == "zh-cn") || (locale.toLowerCase().indexOf("watch") > -1))
	{
		return false;
	}
	return true;
}
	
function Redirect(url)
{
	window.location = url;
}
	
// ND: Added so that tIFR could access user agent through ExternalInterface
function getUserAgent()
{
	return navigator.userAgent.toLowerCase();
}
	
// ND: Added so that tIFR could access browser detection through ExternalInterface
function isBrowserIE()
{
	var iePos = appVer.indexOf('msie');
	if (iePos !=-1) 
	{
		is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
		is_major = parseInt(is_minor);
	}
		
	if ((iePos!=-1) && is_major >= 4) 
	{
		return true;
	}	
	else 
	{
		return false;
	}
}

function isIPhone()
{
    if (navigator.userAgent.match(/iPhone/i) != null)
    {
    	return true;
    }
    return false;
}

function isIPad()
{
    if (navigator.userAgent.match(/iPad/i) != null)
    {
    	return true;
    }
    return false;
}

function isIPod()
{
    if (navigator.userAgent.match(/iPod/i) != null)
    {
    	return true;
    }
    return false;
}

function isBlackBerry()
{
    if (navigator.userAgent.match(/BlackBerry/i) != null)
    {
    	return true;
    }
    return false;
}

function isKindle()
{
    if (navigator.userAgent.match(/Kindle/i) != null)
    {
    	return true;
    }
    else if (navigator.userAgent.match(/Silk-Accelerated/i) != null)
    {
    	return true;
    }
    return false;
}

function isKindleFire()
{
    if (navigator.userAgent.match(/Kindle Fire/i) != null)
    {
    	return true;
    }
    else if (navigator.userAgent.match(/Silk-Accelerated/i) != null)
    {
    	return true;
    }
   	return false;
}

function isWindowsPhone()
{
    if (navigator.userAgent.match(/Windows Phone/i) != null)
    {
    	return true;
    }
    return false;
}

function isAndroid()
{
	if (navigator.userAgent.match(/Android/i) != null)
	{
		return true;
	}
	return false;
}

function isAndroidMobile() {
	if (navigator.userAgent.match(/Android/i) != null && navigator.userAgent.match(/Mobile/i) != null) {
	    return true;
	}
	return false;
}

function isAndroidTablet() {
	if (navigator.userAgent.match(/Android/i) != null && navigator.userAgent.match(/Mobile/i) == null) {
	    return true;
	}
}    

function isMobile()
{
    return isIPhone() || isIPad() || isIPod() || isAndroid();
}
    
function isSmallMobile()
{
	return isIPhone() || isIPod() || isAndroidMobile();
}

function isTablet()
{
    return isIPad() || isAndroidTablet();
}
    
function isMobileDomain()
{
	var url = document.location.href;
	url = url.split("http://").join("").split("https://").join("");
	if (url.indexOf("m") == 0)
	{
		return true;
	}
	return false;
}

// ** End functions brought over from old JavaScript.ascx
/* End of Detection.js */
﻿var pcEmailID = "ctlEmailSignUp_txtSubscribeEmail"
var mEmailID = "ctlFooter_emailMarketingCtl_txtSubscribeMobileEmail"

if (locale.toUpperCase() == 'EN-US-ESTR' || locale.toUpperCase() == 'JA-JP-ESTR') {
	/* pcEmailID = "ctlFooter_emailMarketingCtlEStore_txtSubscribeEmail"; */
	mEmailID = "ctlFooter_emailMarketingCtlEStore_txtSubscribeMobileEmail" }
     
	function ValidateEmptySelectedValue() {
	var ddl = document.getElementById(countryddlID);
	if (ddl.options[ddl.selectedIndex].value == '-1') {
		ddl.selectedIndex = '0'; return;
	}
}

function getEmailMarketingAttributes() 
{
	var valid;
	valid = ValidateSubscribeEmail();
  
	var isCountrySelected ;
	if (locale.toUpperCase() == 'INTL' || locale.toUpperCase() == 'ZH-HANT') {

		var ddl = document.getElementById(countryddlID);
		if (ddl.options[ddl.selectedIndex].value == '-1') { ddl.selectedIndex = '0';return;}

		isCountrySelected = ValidateCountrySelected();
	}
  
	if (valid== true && (locale.toUpperCase()=='INTL'||locale.toUpperCase()=='ZH-HANT'))
	{
		valid =isCountrySelected;
	}
  
	if(valid)
	{
		// Commented due to issue of custom variables of the slots after 5  
		// Custom variable setting for Email Signup
		//SetCustomVariableForEmailSignup();
		//----------------------------------------
		if(blnSubscribeFromFooter)
		{
			//Omniture
			s.linkType="o";
			s.linkName = "Link to E-mail Marketing - Footer Thank You";
			s.events = "event11";
			s.linkTrackVars = "events";
			s.linkTrackEvents = "event11";
			//s_lnk = s_co(this);
			// iTrack #11317 
			//s_pageName="Activity | Email Marketing | Footer | Success";			
			//s_gs(s_account);
			s.tl(true, 'o', "Link to E-mail Marketing - Footer Thank You");
			s.linkTrackEvents = "None";
			s.linkTrackVars = "None";
			TrackEvent('Email Sign Up','Footer','Submit Success','');
		}
		else
		{
			//Omniture
			s_linkType="o";
			s_linkName = "Link to E-mail Marketing - HomePage Thank You";
			// iTrack #11317
			//s_pageName="Activity | Email Marketing | HomePage | Success";
			if (typeof s_account != 'undefined') {
				s_lnk=s_co(this);
				s_gs(s_account);
			}
			TrackEvent('Email Sign Up','Home Page','Submit Success','');
		}

		emailMarketing_showProgress();
//		var poststr = "txtSubscribeEmail=" + encodeURI( document.getElementById(pcEmailID).value ) + 
//						"&blnSubscribeFooter=" + encodeURI( document.getElementById("blnSubscribeFooter").value ) +
//						"&source=" + encodeURI ( '<%= Source %>' );
//		makePOSTRequest('/Customer/Request/ProcessEmailMarketingRequest.aspx', poststr);

		var emailAddr;
		var mobileEmailAddr; 
		var selectedCountry ;	
		var countryCode ='';
	
		if(locale.toUpperCase() == 'INTL'||locale.toUpperCase() == 'ZH-HANT')
		{
			selectedCountry = document.getElementById(countryddlID );
			if(selectedCountry !=null && selectedCountry!='undefined')
			{
			    countryCode = selectedCountry.options[selectedCountry.selectedIndex].value;
			    if (countryCode == '-1') {
			    
			    }
			}
		}	
		emailAddr = encodeURI( document.getElementById(pcEmailID).value );	
		if (isMobileEmailSubscribe() == true)
		{
			mobileEmailAddr = encodeURI( document.getElementById(mEmailID).value );
		}
//		var footer = encodeURI( document.getElementById("blnSubscribeFooter").value );
//		var source = encodeURI ( '<%= Source %>' );

		$.ajax({
			url: '/Default.aspx/SubmitEmailMarketingPreference',
			type: 'POST',
			data: '{"emailAddress": "' + emailAddr + '","mobileEmailAddress":"' + mobileEmailAddr + '","countryCode":"' + countryCode + '"}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				emailMarketing_showResults();
			},
			error: function (jqXHR, status, error) {
				emailMarketing_showResults();
			}
		});
	}
}

function emailMarketing_showStart()
{
		/* This fix allows multiple time submissoin because every time in success we are setting join_email_list_confirm.gif 
		image in innerHTML of divTitle when submitting  from homepage / your account not footer.*/
		
		var emailSignup_joinTitle = document.getElementById('emailSignup_joinTitle');
		
		if(emailSignup_joinTitle == null || typeof(emailSignup_joinTitle)=='undefined')
		{
			document.getElementById('divTitle').innerHTML = '<span id="emailSignup_joinTitle"></span>';
		}
		
	if (blnSubscribeFromFooter == true)
	{
	
		$('#divSubscribeEntry').show();
		
		$("#emailSignup_joinTitle").show();
		
		document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeTitle;
		
		$("#divClose").show();
		document.getElementById('divClose').innerHTML = '<a class="closeLink" href="javascript:closeSubscribe();">'+txtSubscribeClose+'</a>';

		$("#emailSignup_body").show();
		$("#emailSignup_progress").hide();
		$("#emailSignup_results").hide();

		document.getElementById('divErrors').innerHTML="";
		if(isMobileEmailSubscribe()) {document.getElementById('divPCErrors').innerHTML="";}

		$("#emailSignup_specialOfferPopover").show();
		$("#emailSignup_specialOfferLink").hide();
		
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	}
	else
	{
		$('#divSubscribeEntry').show();
		
		$("#emailSignup_joinTitle").show();
		document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeTitle;

		$("#divClose").show();
		document.getElementById('divClose').innerHTML = '<a class="closeLink" href="javascript:closeSubscribe();">'+txtSubscribeClose+'</a>';

		$("#emailSignup_body").show();
		$("#emailSignup_progress").hide();
		$("#emailSignup_results").hide();

		document.getElementById('divErrors').innerHTML="";
		//if(isMobileEmailSubscribe) {document.getElementById('divPCErrors').innerHTML="";}
		
		$("#emailSignup_specialOfferPopover").show();
		$("#emailSignup_specialOfferLink").hide();
		document.getElementById("divSubscribeEntry").style.top = "105px";
	}
}

function emailMarketing_showProgress()
{
	$("#emailSignup_joinTitle").hide();
	$("#emailSignup_resultsTitle").hide();

	$("#divClose").hide();

	$("#emailSignup_body").hide();
	$("#emailSignup_progress").show();
	document.getElementById('emailSignup_progress').innerHTML = txtSubscribeProcessing;
	$("#emailSignup_results").hide();

	document.getElementById('divErrors').innerHTML="";

	$("#emailSignup_specialOfferPopover").hide();
	$("#emailSignup_specialOfferLink").hide();
		
	//if (blnSubscribeFromFooter == true)
	//{
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	//}
}

function emailMarketing_showResults()
{
	$("#emailSignup_joinTitle").show();
	document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeThankYouTitle;

	if (blnSubscribeFromFooter == true)
	{
		$("#divClose").show();
	}
	else
	{
		$("#divClose").show();
		if (locale == "ja-JP" || locale == "ja-JP-EStr") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/ja-JP/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "zh-CN") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/zh-CN/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "zh-Hant") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/zh-Hant/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "ko-KR") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/ko-KR/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "de-AT") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/de-AT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "de-DE") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/de-AT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "es-ES") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/es-ES/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "fr-FR") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/fr-FR/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "it-IT") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/it-IT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "es-MX") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/es-MX/images/title/join_email_list_confirm.gif' />"
		    document.getElementById('divTitle').style.backgroundImage = "none";
		}
		else if (locale == "fr-CA") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/fr-CA/images/title/join_email_list_confirm.gif' />"
		    document.getElementById('divTitle').style.backgroundImage = "none";
		}
		else {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/en-US/images/title/join_email_list_confirm.gif' />"
		}
	}

	$("#emailSignup_body").hide();
	$("#emailSignup_progress").hide();
	$("#emailSignup_results").show();
	
	document.getElementById('emailSignup_results').innerHTML = '<p>'+txtSubscribeThankYou+'</p>';

	$("#emailSignup_specialOfferPopover").hide();
	$("#emailSignup_specialOfferLink").show();
	
	//if (blnSubscribeFromFooter == true)
	//{
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	//}
}


function clearEmailText(aTextBox,txtMatchInputValue) 
{
	if (aTextBox.value == txtMatchInputValue || aTextBox.value =='') 
	{
		if (blnSubscribeFromFooter == true)
		{
			if (aTextBox.value == txtEmailAddress) {
				$('#' + pcEmailID).attr('class', 'english formText237');
			}

			if (isMobileEmailSubscribe() && aTextBox.value == txtMobEmailAddress) 
			{
				$('#' + pcEmailID).attr('class', 'english formText237 txtSubscribeMobileEmail');
			}

			if (document.getElementById(pcEmailID).value == "")
			{
				document.getElementById(pcEmailID).value = txtEmailAddress;
				$('#' + pcEmailID).attr('class', 'formText237');
			} 

			if (isMobileEmailSubscribe() && document.getElementById(mEmailID).value == "") 
			{
				document.getElementById(mEmailID).value = txtMobEmailAddress; 
				$('#' + pcEmailID).attr('class', 'formText237 txtSubscribeMobileEmail');
				$("#divErrors").hide();
			}
		}
		else
		{
			if (aTextBox.value == txtEmailAddress)
			{
				$('#' + pcEmailID).attr('class', 'english formText237');
			}
			if (isMobileEmailSubscribe() && aTextBox.value == txtMobEmailAddress) 
			{
				$('#' + pcEmailID).attr('class', 'english formText237 txtSubscribeMobileEmail');
			}
		}
		aTextBox.value = '';
	}
}

function isMobileEmailSubscribe()
{
	if (document.getElementById(mEmailID)!= null) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function subscribeFooter()
{	
	if (blnSubscribeReady) 
	{
	
		document.getElementById(pcEmailID).onkeydown = function(e)
		{
		
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
				return false;
			}
		};
		document.getElementById(pcEmailID).onkeypress = function(e) 
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				return false;
			}
		};
		
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).onkeydown = document.getElementById(pcEmailID).onkeydown;
			document.getElementById(mEmailID).onkeypress = document.getElementById(pcEmailID).onkeypress;
		}
		
		blnSubscribeFromFooter = true;
		document.getElementById("blnSubscribeFooter").value = true; 
		document.getElementById(pcEmailID).value = txtEmailAddress;
		
		$('#' + pcEmailID).attr('class', 'formText237');
		
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).value = txtMobEmailAddress;
			$('#' + mEmailID).attr('class', 'formText237 txtSubscribeMobileEmail');
			document.getElementById('divPCErrors').style.paddingBottom = "10px";
		}
		
		document.getElementById("divSubscribeEntry").className = 'subscribeFooter';		
		
		document.getElementById("divSubscribeEntry").style.left = "50%";
		document.getElementById("divSubscribeEntry").style.marginLeft = "145px";
			emailMarketing_showStart();
			
		//Omniture
		if (typeof s_account != 'undefined') 
		{
			s_linkType="o";
		    s_linkName="Link to E-mail Marketing - Footer Form";
            s_lnk=s_co(this);
            
            s_pageName="Activity | Email Marketing | Footer";	
			s_gs(s_account);
		}
		TrackEvent('Email Sign Up','Footer','View','');
		
	}
}
function linkEmailMarketing()
{
	if (blnSubscribeReady) 
	{	
		document.getElementById(pcEmailID).onkeydown = function(e)
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
				return false;
			}
		};
		document.getElementById(pcEmailID).onkeypress = function(e) 
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				return false;
			}
		};
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).onkeydown = document.getElementById(pcEmailID).onkeydown;
			document.getElementById(mEmailID).onkeypress = document.getElementById(pcEmailID).onkeypress;
		}
	
		blnSubscribeFromFooter = false;
		document.getElementById("blnSubscribeFooter").value = false;
		document.getElementById(pcEmailID).value = "";
		$('#' + pcEmailID).attr('class', 'english formText237');
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).value = "";
			$('#' + mEmailID).attr('class', 'english formText237');
			document.getElementById('divPCErrors').style.paddingBottom = "10px";
		}
		
		document.getElementById("divSubscribeEntry").className = 'subscribeHomepage';
		document.getElementById("divSubscribeEntry").style.left = "50%";
		document.getElementById("divSubscribeEntry").style.marginLeft = "-205px";
		
		emailMarketing_showStart();
		
		//Omniture
		s_linkType="o";
		s_linkName="Link to E-mail Marketing - HomePage Form";
		if (typeof s_account != 'undefined') 
		{
			s_lnk=s_co(this);
			s_pageName="Activity | Email Marketing | HomePage";
			s_gs(s_account);
		}
		
		TrackEvent('Email Sign Up','Home Page','View','');
		
	}
}

function closeSubscribe() 
{
	$('#divSubscribeEntry').hide();
	document.getElementById('divErrors').innerHTML="";
	if (isMobileEmailSubscribe()) 
	{
		document.getElementById('divPCErrors').innerHTML="";
	}
	if(locale.toUpperCase()=='INTL'||locale.toUpperCase()=='ZH-HANT')
	{
		document.getElementById('divCountryddlErr').innerHTML ="";
		selectedCountry = document.getElementById(countryddlID );
		if(selectedCountry !=null && selectedCountry!='undefined')
		{
			 selectedCountry.selectedIndex =0;
		}
	}
}


function ValidateCountrySelected() 
{
		var valid = false ;		
		var ddl=	document.getElementById(countryddlID );
		
		if(ddl.options[ddl.selectedIndex].value != '0')
		{	document.getElementById('divCountryddlErr').innerHTML ='';// Reset value.
			valid= true;
		}
		else 
		{
			document.getElementById('divCountryddlErr').innerHTML = txtErrSelectACountry;
			if (isMobileEmailSubscribe()) {document.getElementById('divCountryddlErr').style.paddingBottom = "10px";}
		}	

		return valid;
}
function ValidateSubscribeEmail()
{	
	var divPCEmailError = 'divErrors';
	var divMEmailError = 'divErrors';
	if (isMobileEmailSubscribe()) {divPCEmailError = 'divPCErrors';}
	
	document.getElementById('divErrors').innerHTML = "";
	if (isMobileEmailSubscribe()) {document.getElementById('divPCErrors').innerHTML = "";}
	
	var valid = ValidateEmailEntered(pcEmailID);
	if(!valid) 
	{
		document.getElementById(divPCEmailError).innerHTML = txtErrEmailNull;
		if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
	} 
	else 
	{
		valid = ValidateEmail4ASCII (pcEmailID);
		if(!valid)
		{
			document.getElementById(divPCEmailError).innerHTML = txtErrEmailNotASCII;
			if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
		}
		else
		{
			valid = ValidateEmailFormat(pcEmailID);
			if(!valid)
			{
				document.getElementById(divPCEmailError).innerHTML = txtErrEmailInvalidFormat;
				if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
			}
		}
	}
	
	
	if (isMobileEmailSubscribe() == true)
	{
		var mobileEmailValid = ValidateMobileEmailEntered(mEmailID);
	 
	    //In order to prevent sending to server "Please enter in half width." in Japanese as mobileEmail Address.
		if(document.getElementById(mEmailID).value == txtMobEmailAddress && valid == true )
		{
			document.getElementById(mEmailID).value ='';
		} 
		if (mobileEmailValid == true)
		{	
			mobileEmailValid = ValidateEmail4ASCII(mEmailID);
			if (!mobileEmailValid)
			{
				document.getElementById(divMEmailError).innerHTML = txtErrEmailNotASCII;
				valid = false;
			}
			else
			{
				mobileEmailValid = ValidateEmailFormat(mEmailID);
				if(!mobileEmailValid)
				{
					document.getElementById(divMEmailError).innerHTML = txtErrEmailInvalidFormat;
					valid = false;
				} 
				else 
				{				
				    mobileEmailValid = ValidateSameEmailAndMobileEmail(pcEmailID, mEmailID);
				    if(!mobileEmailValid)
				    {
				        document.getElementById(divMEmailError).innerHTML = txtErrSameEmailAndMobileEmail;
					    valid = false;
				    }
				}
			}
		}
	}
		
	return valid;
}

function ValidateEmailEntered(validateID)
{
	var email = document.getElementById(validateID).value;

	if (email!=txtEmailAddress && TrimString(email).length >0) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function ValidateMobileEmailEntered(validateID)
{
	//This is an optional field
	var email = document.getElementById(validateID).value;
	if (email != txtMobEmailAddress && TrimString(email).length >0) 
	{
		return true;
	}
	else
	{
		return false;
	}
}

function ValidateEmailFormat(validateID) 
{	
	return ValidateEmailRegExp(document.getElementById(validateID).value);
}

function ValidateEmail4ASCII(validateID)
{
	var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1)?true:false;
	if (isSafari) 
	{
		return ValidateRegExp(validateID, "^[a-zA-Z_0-9'\.\-]+@[a-zA-Z_0-9\-]+(\.([a-zA-Z_0-9\-])+)*[a-zA-Z]{1,4}$");
	}
	else 
	{
		return ValidateRegExp(validateID, "[\x00-\x7F]*");
	}
}

function ValidateRegExp(control, pattern) 
{	
	//Get the value entered in subscribe email textbox
	var email = document.getElementById(control).value;

	//Create a RegEx for Email Validation			
	var rx = new RegExp(pattern);
	
	//perform RegEx match
	var matches = rx.exec(email);
	
	return (matches != null && email == matches[0]);

}

function ValidateSameEmailAndMobileEmail(emailID, mobileEmailID)
{
    var email = document.getElementById(emailID).value;
    var mobileEmail = document.getElementById(mobileEmailID).value;

    return (email != mobileEmail);
}
function TrimString(s) 
{
	 var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	 return (m == null) ? "" : m[1];
}


function ValidateEmailRegExp(email)
{	
	var result;
	//Tco Bug 2613 fixed
	var filter = /^\s*([0-9a-zA-Z]([-!#$%&*+_~'.\w]*[0-9a-zA-Z])*@[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*\.[a-zA-Z]{2,9})\s*$/i;
	try {
	    filter = emailsignupregex;
	}
	catch (ex) {
	    try {
	        filter = window.parent.window.emailsignupregex;
	    }
	    catch (ex1) {
	    }
	}

	if (filter == null || filter == 'undefined') {
	    return false;
	}

	if (filter.test(email)) {
	    result = true;
	}
	else {
	    result = false;
	}
	
	return (result);
}

/* End of emailSignup.js */