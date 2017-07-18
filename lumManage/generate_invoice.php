<?php
function generate_invoice($diamond_discription, $realname, $address, $tel, $ring, $euros, $yuan, $time){
	if($time=='' || $time=='NOW'){
		$date = date('m/d/Y', time());
	}else{
		$date = $time;
	}
	$client=$realname.'<br />'.$address.'<br />Tel:'.$tel;
	if(trim($euros)!=''){
		$euros=trim($euros).'.00';
	}
	if(trim($yuan)!=''){
		$yuan=trim($yuan).'.00';
	}
	$toprint='<div id="invoicetitle" style="display:block; margin-left:10px; font-family:\'Helvetica Neue\', Arial, Helvetica, sans-serif;">
<h1 style="font-size:36px;">LUMIA利美钻石</h1>
<p style="font-size:14px; line-height:20px;">
PELIKAANSTRAAT 62  BUS 206<br />
2018     ANTWERPEN<br />
Tel :   0032 3 689 73 94<br />
Email :  info@lumiagem.com<br />
</p>

<p id="date-invoice">
<span style="font-weight:800">DATE:</span> '.$date.'
</p>

</div>
<br /><br />
<table style="margin-left:10px; font-family:\'Helvetica Neue\', Arial, Helvetica, sans-serif;" cellspacing="0" cellpadding="0">
<tr>
<td width="88" valign="top" style="width:88px; font-weight:800; vertical-align:top;">To:</td>
<td colspan="3" style="border-left-style:none; font-size:14px;">'.$client.'</td>
</tr>

<tr style="font-weight:800;">
<td colspan="2" width="325" style="width:325px;">DESCRIPTION</td>
<td width="128" style="width:128px;">EUR</td>
<td width="128" style="width:128px;">CHN</td>
</tr>

<tr>
<td colspan="2">
'.$diamond_discription.'
</td>
<td style="font-size:14px; font-style:italic;">'.$euros.' </td>
<td style="font-size:14px; font-style:italic;">'.$yuan.' </td>
</tr>

<tr>
<td colspan="2" style="font-weight:800;">TOTAL</td>
<td style="font-size:14px; font-style:italic;">'.$euros.' </td>
<td style="font-size:14px; font-style:italic;">'.$yuan.' </td>
</tr>

</table>';
echo $toprint;
}
?>
