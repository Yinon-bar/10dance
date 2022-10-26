<?php

include "../connect.php";
// בגלל שעובדים שהפיפ מציג איי פי אייי בלבד אז אנחנו אומרים שהמידע שנקבל ונציג הוא בפורמט
// JSON
header('Content-Type: application/json');
// // מאפשר לכל שרת מכל דומיין לפנות לאיי פי איי שלנו
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");

$get_id = 12;
if (isset($_GET["id"])) {
  $get_id = $_GET["id"];
}

// $query = "SELECT * FROM students WHERE id = $get_id";
$query = "SELECT * FROM geo WHERE id = $get_id +1 ";

// conn.query();
// מחזיר את כל המידע שקיבל מהדי בי
$result = $conn->query($query);
// כמה רשומות חזרו
$rows = $result->num_rows;

$rowsData_ar = [];
while ($row = $result->fetch_assoc()) {
  // מוסיף למערך שיצרנו את השורה ויוסיף כל עוד מצליח להוציא שורות מהטבלה
  array_push($rowsData_ar, $row);
}

// print_r($rowsData_ar);
// print_r($rowsData_ar[0]['first']);


// |||||||||||||||||||||||||||||||||||||||||||||||||
// TCPDF
require_once('TCPDF-main/tcpdf.php');

$pdf = new TCPDF('L', 'mm', array(100, 60), true, 'UTF-8', false);

$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->setAutoPageBreak(true, 0);

$pdf->AddPage();

$pdf->setFont($font_family = 'opensans_semicondensed', $font_variant = '', $font_size = 25);
$pdf->Cell(80, 5, $rowsData_ar[0]['first'] . " " . $rowsData_ar[0]['last'], 0, 1, "C", false);

// יצירת קו
// $pdf->Line(5, 40, 95, 40);

$pdf->Image('img/logo2.jpg', 1, 40, 98);

$pdf->Output();

echo json_encode($rowsData_ar);


// function goHome()
// {

//   header('location: https://www.google.com');
// }

// goHome();