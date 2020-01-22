<?php
require '../phpSpreadsheet/autoload.php';
include_once '../log.php';
if(!isset($conn)){
	require_once('../connection.php');
	$conn=dbConnect('write','pdoption');
	$conn->query("SET NAMES 'utf8'");
}
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
$type = $_REQUEST["type"];
$tableName = 'transaction';
$title = 'Lumiagem_Invoice';
$detailTable = 'tranc_detail';
if($type=='offerte') {
	$tableName = 'offerte';
	$detailTable = 'offerte_detail';
	$title = 'Lumiagem_Receipt';
}

$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->getActiveSheet();
//设置工作表标题名称
$worksheet->setTitle($title);

//表头
//设置单元格内容
$worksheet->setCellValueByColumnAndRow(1, 1, 'LUMIAGEM '.strtoupper($type));
$worksheet->setCellValueByColumnAndRow(1, 2, 'id');
$worksheet->setCellValueByColumnAndRow(2, 2, '类型');
$worksheet->setCellValueByColumnAndRow(3, 2, '发票编号');
$worksheet->setCellValueByColumnAndRow(4, 2, '开票日期');
$worksheet->setCellValueByColumnAndRow(5, 2, '客户姓名');
$worksheet->setCellValueByColumnAndRow(6, 2, '是否现场');
$worksheet->setCellValueByColumnAndRow(7, 2, '重量');
$worksheet->setCellValueByColumnAndRow(8, 2, '颜色');
$worksheet->setCellValueByColumnAndRow(9, 2, '净度');
$worksheet->setCellValueByColumnAndRow(10, 2, '荧光');
$worksheet->setCellValueByColumnAndRow(11, 2, '证书');
$worksheet->setCellValueByColumnAndRow(12, 2, '货币');
$worksheet->setCellValueByColumnAndRow(13, 2, 'VAT');
$worksheet->setCellValueByColumnAndRow(14, 2, '金额');
$worksheet->setCellValueByColumnAndRow(15, 2, '戒托');
$worksheet->setCellValueByColumnAndRow(16, 2, '材质');
$worksheet->setCellValueByColumnAndRow(17, 2, '戒托颜色');
$worksheet->setCellValueByColumnAndRow(18, 2, '戒托金额');
$worksheet->setCellValueByColumnAndRow(19, 2, '退税状态');
$worksheet->setCellValueByColumnAndRow(20, 2, '退税方式');
$worksheet->setCellValueByColumnAndRow(21, 2, '护照');
$worksheet->setCellValueByColumnAndRow(22, 2, '电话');
$worksheet->setCellValueByColumnAndRow(23, 2, 'EMAIL');
$worksheet->setCellValueByColumnAndRow(24, 2, '地址');
$worksheet->setCellValueByColumnAndRow(25, 2, '备注');
//合并单元格
$worksheet->mergeCells('A1:M1');
$styleArray = [
		'font' => [
				'bold' => true
		],
		'alignment' => [
				'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
		],
];
//设置单元格样式
$worksheet->getStyle('A1')->applyFromArray($styleArray)->getFont()->setSize(28);
$worksheet->getStyle('A2:E2')->applyFromArray($styleArray)->getFont()->setSize(14);
$sql='select * from '.$tableName.' where type="'.$type.'" order by tranc_date desc';
$stmt = $conn->query($sql);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$len = count($rows);
$j = 3;
for ($i=0; $i < $len; $i++) {
	$sql = 'select a.* from '.$detailTable.' a where a.tranc_id=:tranc_id ';
	$stmt=$conn->prepare($sql);
	$stmt->execute(array('tranc_id'=>$rows[$i]['id']));
	$k = 0;
	foreach($stmt as $rowDetail){
// 		if($rowDetail["type"]=='jew') {
// 			$worksheet->setCellValueByColumnAndRow(6, $j+$k, $rowDetail["jewerly"]);
// 			$worksheet->setCellValueByColumnAndRow(7, $j+$k, $rowDetail["material"]);
// 		}
// 		else {
// 			$worksheet->setCellValueByColumnAndRow(6, $j+$k, $rowDetail["carat"]);
// 			$worksheet->setCellValueByColumnAndRow(7, $j+$k, $rowDetail["color"]);
// 			$worksheet->setCellValueByColumnAndRow(8, $j+$k, $rowDetail["clarity"]);
// 			$worksheet->setCellValueByColumnAndRow(9, $j+$k, $rowDetail["report_no"]);
// 		}
		if($k==0) {
			$worksheet->setCellValueByColumnAndRow(1, $j+$k, $rows[$i]['id']);
			$worksheet->setCellValueByColumnAndRow(2, $j+$k, $rows[$i]['type']);
			if($rows[$i]['type']=='invoice')
				$worksheet->setCellValueByColumnAndRow(3, $j+$k, $rows[$i]['invoice_no']);
			$worksheet->setCellValueByColumnAndRow(4, $j+$k, $rows[$i]['tranc_date']);
			$worksheet->setCellValueByColumnAndRow(5, $j+$k, $rows[$i]['name'] );
			$worksheet->setCellValueByColumnAndRow(6, $j+$k, $rows[$i]['visit_type'] );
            $worksheet->setCellValueByColumnAndRow(7, $j+$k, $rowDetail["carat"]);
			$worksheet->setCellValueByColumnAndRow(8, $j+$k, $rowDetail["color"]);
			$worksheet->setCellValueByColumnAndRow(9, $j+$k, $rowDetail["clarity"]);
			$worksheet->setCellValueByColumnAndRow(10, $j+$k, $rowDetail["fluorescence"]);
			$worksheet->setCellValueByColumnAndRow(11, $j+$k, $rowDetail["report_no"]);
			$worksheet->setCellValueByColumnAndRow(12, $j+$k, $rows[$i]['currency'] );
			$worksheet->setCellValueByColumnAndRow(13, $j+$k, $rows[$i]['vat_price'] );
			$worksheet->setCellValueByColumnAndRow(14, $j+$k, $rows[$i]['total_price']-$rows[$i]['vat_price'] );
			$worksheet->setCellValueByColumnAndRow(15, $j+$k, $rowDetail["jewerly"]);
			$worksheet->setCellValueByColumnAndRow(16, $j+$k, $rowDetail["material"]);
			$worksheet->setCellValueByColumnAndRow(17, $j+$k, $rowDetail["jewerly_color"]);
			$worksheet->setCellValueByColumnAndRow(18, $j+$k, $rowDetail["jewerly_price"]);
			$worksheet->setCellValueByColumnAndRow(19, $j+$k, $rows[$i]['tax_confirm']==0?'未退税':($rows[$i]['tax_confirm']==1?'已退税':($rows[$i]['tax_confirm']==2?'退税异常':'')) );
			$worksheet->setCellValueByColumnAndRow(20, $j+$k, $rows[$i]['tax_confirm']==1?$rows[$i]['tax_rebate']:'' );
			$worksheet->setCellValueByColumnAndRow(21, $j+$k, $rows[$i]['passport'] );
			$worksheet->setCellValueByColumnAndRow(22, $j+$k, $rows[$i]['tel'] );
			$worksheet->setCellValueByColumnAndRow(23, $j+$k, $rows[$i]['email'] );
			$worksheet->setCellValueByColumnAndRow(24, $j+$k, $rows[$i]['street'].' '.$rows[$i]['city'].$rows[$i]['postcode'].$rows[$i]['country'] );
			$worksheet->setCellValueByColumnAndRow(25, $j+$k, $rows[$i]['notes'] );
		}
		$k++;
	}
	if($k>0) {
		$worksheet->mergeCellsByColumnAndRow(1, $j, 1, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(2, $j, 2, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(3, $j, 3, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(4, $j, 4, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(5, $j, 5, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(10, $j, 10, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(11, $j, 11, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(12, $j, 12, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(13, $j, 13, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(14, $j, 14, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(15, $j, 15, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(16, $j, 16, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(17, $j, 17, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(18, $j, 18, $j+$k-1);
		$worksheet->mergeCellsByColumnAndRow(19, $j, 19, $j+$k-1);
	}
	$j += $k;
}
$styleArrayBody = [
		'borders' => [
				'allBorders' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
						'color' => ['argb' => '666666'],
				],
		],
		'alignment' => [
				'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
		],
];
$total_rows = $len + 2;
//添加所有边框/居中
$worksheet->getStyle('A1:E'.$total_rows)->applyFromArray($styleArrayBody);
$filename = 'lumiagem_'.$type.'.xlsx';
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="'.$filename.'"');
header('Cache-Control: max-age=0');
$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('php://output');
?>