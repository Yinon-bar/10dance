<?php
include "./connect.php";
// בגלל שעובדים שהפיפ מציג איי פי אייי בלבד אז אנחנו אומרים שהמידע שנקבל ונציג הוא בפורמט
// JSON
header('Content-Type: application/json');
// מאפשר לכל שרת מכל דומיין לפנות לאיי פי איי שלנו
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

// יאפשר לנו מהצד לקוח לשלוח את המידע כג'ייסון
$bodyData = file_get_contents('php://input');
$body = json_decode($bodyData); // phpData




switch ($_SERVER["REQUEST_METHOD"]) {
  case "PUT":
    // מסנן את המידע כדי שלא יבצעו אס קיו אל אנג'יקשן שיכול
    // לגרום לפירצה ולהרס של המסד נתונים
    // $body->arrive = $conn->escape_string($body->arrive);
    // $body->t_z_id = $conn->escape_string($body->t_z_id);
    $query = "UPDATE geo SET arrive = 1 WHERE t_z_id = $bodyData";
    $result_insert = $conn->query($query);
    echo $result_insert;
    if ($result_insert > 0) {
      echo "{'status':'ok'}";
    } else {
      http_response_code(500);
    }
    break;
}
