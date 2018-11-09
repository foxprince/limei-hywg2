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
$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->getActiveSheet();
//设置工作表标题名称
$worksheet->setTitle('Lumiagem_Invoice_Receipt');

//表头
//设置单元格内容
$worksheet->setCellValueByColumnAndRow(1, 1, 'LUMIAGEM INVOICE & RECEIPT');
$worksheet->setCellValueByColumnAndRow(1, 2, 'id');
$worksheet->setCellValueByColumnAndRow(2, 2, '类型');
$worksheet->setCellValueByColumnAndRow(3, 2, '发票编号');
$worksheet->setCellValueByColumnAndRow(4, 2, '开票日期');
$worksheet->setCellValueByColumnAndRow(5, 2, '客户姓名');
$worksheet->setCellValueByColumnAndRow(6, 2, '重量|颜色|净度|证书');
$worksheet->setCellValueByColumnAndRow(7, 2, '货币');
$worksheet->setCellValueByColumnAndRow(8, 2, '金额');
$worksheet->setCellValueByColumnAndRow(9, 2, 'VAT');
$worksheet->setCellValueByColumnAndRow(10, 2, '退税状态');
$worksheet->setCellValueByColumnAndRow(11, 2, '退税方式');
$worksheet->setCellValueByColumnAndRow(12, 2, '护照');
$worksheet->setCellValueByColumnAndRow(13, 2, '电话');
$worksheet->setCellValueByColumnAndRow(14, 2, 'EMAIL');
$worksheet->setCellValueByColumnAndRow(15, 2, '地址');
$worksheet->setCellValueByColumnAndRow(16, 2, '备注');
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
$sql='select * from transaction order by tranc_date desc';
$stmt = $conn->query($sql);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$len = count($rows);
$j = 0;
for ($i=0; $i < $len; $i++) {
	$j = $i + 3; //从表格第3行开始
	$worksheet->setCellValueByColumnAndRow(1, $j, $rows[$i]['id']);
	$worksheet->setCellValueByColumnAndRow(2, $j, $rows[$i]['type']);
	$worksheet->setCellValueByColumnAndRow(3, $j, $rows[$i]['invoice_no']);
	$worksheet->setCellValueByColumnAndRow(4, $j, $rows[$i]['tranc_date']);
	$worksheet->setCellValueByColumnAndRow(5, $j, $rows[$i]['name'] );
	$sql = 'select a.* from tranc_detail a where a.tranc_id=:tranc_id ';
	$stmt=$conn->prepare($sql);
	$stmt->execute(array('tranc_id'=>$rows[$i]['id']));
	$detail = "";
	foreach($stmt as $rowDetail){
		$detail .= $rowDetail["carat"]."|".$rowDetail["color"]."|".$rowDetail["carat"]."|".$rowDetail["report_no"]."\r\n";
	}
	$worksheet->setCellValueByColumnAndRow(6, $j, $detail );
	$worksheet->setCellValueByColumnAndRow(7, $j, $rows[$i]['currency'] );
	$worksheet->setCellValueByColumnAndRow(8, $j, $rows[$i]['vat_price'] );
	$worksheet->setCellValueByColumnAndRow(9, $j, $rows[$i]['total_price'] );
	$worksheet->setCellValueByColumnAndRow(10, $j, $rows[$i]['tax_confirm']==0?'未退税':($rows[$i]['tax_confirm']==1?'已退税':($rows[$i]['tax_confirm']==2?'退税异常':'')) );
	$worksheet->setCellValueByColumnAndRow(11, $j, $rows[$i]['tax_confirm']==1?$rows[$i]['tax_rebate']:'' );
	$worksheet->setCellValueByColumnAndRow(12, $j, $rows[$i]['passport'] );
	$worksheet->setCellValueByColumnAndRow(13, $j, $rows[$i]['tel'] );
	$worksheet->setCellValueByColumnAndRow(14, $j, $rows[$i]['email'] );
	$worksheet->setCellValueByColumnAndRow(15, $j, $rows[$i]['street'].' '.$rows[$i]['city'].$rows[$i]['postcode'].$rows[$i]['country'] );
	$worksheet->setCellValueByColumnAndRow(16, $j, $rows[$i]['notes'] );
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
$filename = 'lumiagem_invoice.xlsx';
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="'.$filename.'"');
header('Cache-Control: max-age=0');
$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('php://output');
?>