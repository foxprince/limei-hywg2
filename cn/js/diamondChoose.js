var $featured = 'NO';
var $shapeBR = false;
var $shapePS = false;
var $shapePR = false;
var $shapeHS = false;
var $shapeMQ = false;
var $shapeOV = false;
var $shapeEM = false;
var $shapeRAD = false;
var $shapeCU = false;
var $shape = '';
var $color = '';
var $clarity = '';
var $cut = '';
var $sym = '';
var $polish = '';
var $certi = '';
var $certiIGI=false;
var $certiHRD=false;
var $certiGIA=false;
var $fluo = '';
var $weight_from = '';
var $weight_to = '';
var $price_from = '';
var $price_to = '';
var $sorting = 'price';
var $sorting_weight_direction = 'ASC';
var $sorting_color_direction = 'ASC';
var $sorting_clarity_direction = 'ASC';
var $sorting_cut_direction = 'ASC';
var $sorting_price_direction = 'ASC';
var $sorting_direction = 'ASC';
var $crr_page = 1;
function filter_shape(theshape) {
	var $theshape = theshape;
	var $or = '';
	$shape = '';
	if ($theshape == 'BR') {
		if ($shapeBR) {
			$shapeBR = false;
			$('#filter_shapeBR').removeClass('btn-active');
		} else {
			$shapeBR = true;
			$('#filter_shapeBR').addClass('btn-active');
		}
	} else if ($theshape == 'PS') {
		if ($shapePS) {
			$shapePS = false;
			$('#filter_shapePS').removeClass('btn-active');
		} else {
			$shapePS = true;
			$('#filter_shapePS').addClass('btn-active');
		}
	} else if ($theshape == 'PR') {
		if ($shapePR) {
			$shapePR = false;
			$('#filter_shapePR').removeClass('btn-active');
		} else {
			$shapePR = true;
			$('#filter_shapePR').addClass('btn-active');
		}
	} else if ($theshape == 'HS') {
		if ($shapeHS) {
			$shapeHS = false;
			$('#filter_shapeHS').removeClass('btn-active');
		} else {
			$shapeHS = true;
			$('#filter_shapeHS').addClass('btn-active');
		}
	} else if ($theshape == 'MQ') {
		if ($shapeMQ) {
			$shapeMQ = false;
			$('#filter_shapeMQ').removeClass('btn-active');
		} else {
			$shapeMQ = true;
			$('#filter_shapeMQ').addClass('btn-active');
		}
	} else if ($theshape == 'OV') {
		if ($shapeOV) {
			$shapeOV = false;
			$('#filter_shapeOV').removeClass('btn-active');
		} else {
			$shapeOV = true;
			$('#filter_shapeOV').addClass('btn-active');
		}
	} else if ($theshape == 'EM') {
		if ($shapeEM) {
			$shapeEM = false;
			$('#filter_shapeEM').removeClass('btn-active');
		} else {
			$shapeEM = true;
			$('#filter_shapeEM').addClass('btn-active');
		}
	} else if ($theshape == 'RAD') {
		if ($shapeRAD) {
			$shapeRAD = false;
			$('#filter_shapeRAD').removeClass('btn-active');
		} else {
			$shapeRAD = true;
			$('#filter_shapeRAD').addClass('btn-active');
		}
	} else if ($theshape == 'CU') {
		if ($shapeCU) {
			$shapeCU = false;
			$('#filter_shapeCU').removeClass('btn-active');
		} else {
			$shapeCU = true;
			$('#filter_shapeCU').addClass('btn-active');
		}
	}
	if ($shapeBR) {
		$shape += ' shape = "BR" ';
		$or = ' OR ';
	}
	if ($shapePS) {
		$shape += $or + ' shape = "PS" ';
		$or = ' OR ';
	}
	if ($shapePR) {
		$shape += $or + ' shape = "PR" ';
		$or = ' OR ';
	}
	if ($shapeHS) {
		$shape += $or + ' shape = "HS" ';
		$or = ' OR ';
	}
	if ($shapeMQ) {
		$shape += $or + ' shape = "MQ" ';
		$or = ' OR ';
	}
	if ($shapeOV) {
		$shape += $or + ' shape = "OV" ';
		$or = ' OR ';
	}
	if ($shapeEM) {
		$shape += $or + ' shape = "EM" ';
		$or = ' OR ';
	}
	if ($shapeRAD) {
		$shape += $or + ' shape = "RAD" ';
		$or = ' OR ';
	}
	if ($shapeCU) {
		$shape += $or + ' shape = "CU" ';
		$or = ' OR ';
	}
	update();
}
function filter_color(thecolor) {
	$color = 'color in("'+colorRange.slice(colorSlider.noUiSlider.get('start')[0],colorSlider.noUiSlider.get('start')[1]).join('","')+'")';
	update();
}
function filter_clarity(theclarity) {
	$clarity = 'clarity in("'+clarityRange.slice(claritySlider.noUiSlider.get('start')[0],claritySlider.noUiSlider.get('start')[1]).join('","')+'")';
	update();
}
function filter_cut(thegrade) {
	$cut = 'cut_grade in("'+cutRange.slice(cutSlider.noUiSlider.get('start')[0],cutSlider.noUiSlider.get('start')[1]).join('","')+'")';
	update();
}
function filter_polish(thegrade) {
	$polish = 'polish in("'+polishRange.slice(polishSlider.noUiSlider.get('start')[0],polishSlider.noUiSlider.get('start')[1]).join('","')+'")';
	update();
}
function filter_sym(thegrade) {
	$symmetry = 'symmetry in("'+symRange.slice(symSlider.noUiSlider.get('start')[0],symSlider.noUiSlider.get('start')[1]).join('","')+'")';
	update();
}
function filter_certi(thelab) {
	var $thecerti = thelab;
	var $or = '';
	$certi = '';
	if ($thecerti == 'IGI') {
		if ($certiIGI) {
			$certiIGI = false;
			$('#filter_certiIGI').removeClass('btn-active');
		} else {
			$certiIGI = true;
			$('#filter_certiIGI').addClass('btn-active');
		}
	} else if ($thecerti == 'GIA') {
		if ($certiGIA) {
			$certiGIA = false;
			$('#filter_certiGIA').removeClass('btn-active');
		} else {
			$certiGIA = true;
			$('#filter_certiGIA').addClass('btn-active');
		}
	} else if ($thecerti == 'HRD') {
		if ($certiHRD) {
			$certiHRD = false;
			$('#filter_certiHRD').removeClass('btn-active');
		} else {
			$certiHRD = true;
			$('#filter_certiHRD').addClass('btn-active');
		}
	}
	if ($certiIGI) {
		$certi += ' grading_lab = "IGI" ';
		$or = ' OR ';
	}
	if ($certiGIA) {
		$certi += $or + ' grading_lab = "GIA" ';
		$or = ' OR ';
	}
	if ($certiHRD) {
		$certi += $or + ' grading_lab = "HRD" ';
		$or = ' OR ';
	}
	update();
}
function sorting_weight() {
	$sorting = 'weight';
	if ($sorting_weight_direction == 'ASC') {
		$sorting_weight_direction = 'DESC';
		$('#arrow_sorting_weight').attr('src', '../images/site_elements/arrow-down.png');
	} else {
		$sorting_weight_direction = 'ASC';
		$('#arrow_sorting_weight').attr('src', '../images/site_elements/arrow-up.png');
	}
	$sorting_direction = $sorting_weight_direction;
	update();
}
function sorting_color() {
	$sorting = 'color';
	if ($sorting_color_direction == 'ASC') {
		$sorting_color_direction = 'DESC';
		$('#arrow_sorting_color').attr('src', '../images/site_elements/arrow-down.png');
	} else {
		$sorting_color_direction = 'ASC';
		$('#arrow_sorting_color').attr('src', '../images/site_elements/arrow-up.png');
	}
	$sorting_direction = $sorting_color_direction;
	update();
}
function sorting_clarity() {
	$sorting = 'clarity';
	if ($sorting_clarity_direction == 'ASC') {
		$sorting_clarity_direction = 'DESC';
		$('#arrow_sorting_clarity').attr('src', '../images/site_elements/arrow-down.png');
	} else {
		$sorting_clarity_direction = 'ASC';
		$('#arrow_sorting_clarity').attr('src', '../images/site_elements/arrow-up.png');
	}
	$sorting_direction = $sorting_clarity_direction;
	update();
}
function sorting_cut() {
	$sorting = 'cut';
	if ($sorting_cut_direction == 'ASC') {
		$sorting_cut_direction = 'DESC';
		$('#arrow_sorting_cut').attr('src', '../images/site_elements/arrow-down.png');
	} else {
		$sorting_cut_direction = 'ASC';
		$('#arrow_sorting_cut').attr('src', '../images/site_elements/arrow-up.png');
	}
	$sorting_direction = $sorting_cut_direction;
	update();
}
function sorting_price() {
	$sorting = 'price';
	if ($sorting_price_direction == 'ASC') {
		$sorting_price_direction = 'DESC';
		$('#arrow_sorting_price').attr('src', '../images/site_elements/arrow-down.png');
	} else {
		$sorting_price_direction = 'ASC';
		$('#arrow_sorting_price').attr('src', '../images/site_elements/arrow-up.png');
	}
	$sorting_direction = $sorting_price_direction;
	update();
}
function update() {
	nowworkingonfilter = true;
	$('div#loading_indi').fadeIn('fast');
	$.post("diamond-data.php", {
		shape : $shape,
		color : $color,
		clarity : $clarity,
		cut : $cut,
		polish : $polish,
		sym : $sym,
		fluo : $fluo,
		certi : $certi,
		weight_from : $weight_from,
		weight_to : $weight_to,
		price_from : $price_from,
		price_to : $price_to,
		featured : $featured,
		sorting : $sorting,
		sorting_direction : $sorting_direction,
		crr_page : $crr_page
	}, function(data) {
		var contentLoaded = data;
		// alert(data);
		// return;
		$('div#loading_indi').fadeOut('fast');
		$('div#diamondsdata').html(data);
		var howmanyrecords = $("div#howmanyrecords").html();
		$('span#resulthowmany').html(howmanyrecords);
		diamondlistpagenavi(howmanyrecords);
		//addlisteners();
		$('button#btn_weight').removeClass('weight-btn-active');
	});
}
function searchbynumbers() {
	$('div#loading_indi').fadeIn('fast');
	thenumbertosearch = $('input#numbersearch').val();
	if (thenumbertosearch == '') {
		$('div#loading_indi').fadeOut('fast');
		return false;
	}
	$.post("diamond-data-byref.php", {
		number : thenumbertosearch
	}, function(data) {
		var contentLoaded = data;
		// alert(data);
		// return;
		$('div#loading_indi').fadeOut('fast');
		$('div#diamondsdata').html(data);
		var howmanyrecords = $("div#howmanyrecords").html();
		;
		$('span#resulthowmany').html(howmanyrecords);
		diamondlistpagenavi(howmanyrecords);
		addlisteners();
		$('button#btn_weight').removeClass('weight-btn-active');
	});
}
function choosethispage(page) {
	$crr_page = page;
	update();
}
var crrlistnavipage = 0;
var $intotalhowmanyrecords = 0;
function diamondlistpagenavi(howmanyrecords) {
	$intotalhowmanyrecords = howmanyrecords;
	$('span#diapagenavi').empty();
	var totalrecords = parseFloat(howmanyrecords);
	var totalpages = Math.ceil(totalrecords / 35);
	for (var i = crrlistnavipage * 10 + 1; i <= totalpages; i++) {
		if (i <= crrlistnavipage * 35 + 10) {
			if (i == $crr_page) {
				$('span#diapagenavi').append('<span class="dia-page-btn" id="crr_page">' + i + '</span>');
			} else {
				$('span#diapagenavi').append('<span class="dia-page-btn" onclick="choosethispage(' + i + ')">' + i + '</span>');
			}
		}
	}
}
