<?php
/*************************************************************************
 php easy :: pagination scripts set - Version Two
==========================================================================
Author:      php easy code, www.phpeasycode.com
Web Site:    http://www.phpeasycode.com
Contact:     webmaster@phpeasycode.com
*************************************************************************/
function paginate_two($page, $tpages, $adjacents) {

	$firstlabel = "&laquo;&nbsp;";
	$prevlabel  = "&lsaquo;&nbsp;";
	$nextlabel  = "&nbsp;&rsaquo;";
	$lastlabel  = "&nbsp;&raquo;";

	$out = "<div class='pagin'>共"  . $tpages . "页。\n";

	// first
	if($page>($adjacents+1)) {
		$out.= "<a href='javascript:void(0);' alt='1' class='dia-page-btn' onclick='choosethispage(1)'>" . $firstlabel . "</a>\n";
	}
	if($page>1)
		$out.= "<a href='javascript:void(0);' alt='".($page-1)."' class='dia-page-btn' onclick='choosethispage(".($page-1).")'>" . $prevlabel . "</a>\n";

	// 1 2 3 4 etc
	$pmin = ($page>$adjacents) ? ($page-$adjacents) : 1;
	$pmax = ($page<($tpages-$adjacents)) ? ($page+$adjacents) : $tpages;
	for($i=$pmin; $i<=$pmax; $i++) {
		if($i==$page) {
			$out.= "<span class='current'>" . $i . "</span>\n";
		}
// 		elseif($i==1) {
// 			$out.= "<a href='javascript:void(0);' alt=".$i."class='dia-page-btn' onclick='choosethispage(" . $i . ")'>" . $i . "</a>\n";
// 		}
		else {
			$out.= "<a href='javascript:void(0);' alt=".$i."class='dia-page-btn' onclick='choosethispage(" . $i . ")'>" . $i . "</a>\n";
		}
	}

	// next
	if($page<$tpages) {
		$out.= "<a href='javascript:void(0);' alt=".($page+1)."class='dia-page-btn' onclick='choosethispage(" . ($page+1) . ")'>" . $nextlabel . "</a>\n";
	}

	// last
	if($page<($tpages-$adjacents)) {
		$out.= "<a href='javascript:void(0);' alt=".$tpages."class='dia-page-btn' onclick='choosethispage(" . $tpages . ")'>" . $lastlabel . "</a>\n";
	}

	$out.= "</div>";

	return $out;
}
?>
