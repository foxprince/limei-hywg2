// JavaScript Document
function $(id) {
    return document.getElementById(id);
}

function showMenu (baseID, divID) {
    baseID = $(baseID);
    divID  = $(divID);
    if (showMenu.timer) clearTimeout(showMenu.timer);
	hideCur();
    divID.style.display = 'block';
	showMenu.cur = divID;

    if (! divID.isCreate) {
        divID.isCreate = true;
        //divID.timer = 0;
        divID.onmouseover = function () {
            if (showMenu.timer) clearTimeout(showMenu.timer);
			hideCur();
            divID.style.display = 'block';
        };

        function hide () {
            showMenu.timer = setTimeout(function () {divID.style.display = 'none';}, 1000);
        }

        divID.onmouseout = hide;
        baseID.onmouseout = hide;
    }
	function hideCur () {
		showMenu.cur && (showMenu.cur.style.display = 'none');
	}
}
/*Ò»Á÷ËØ²ÄÍøwww.16sucai.com*/