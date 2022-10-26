<?php
include "./connect.php";
// בגלל שעובדים שהפיפ מציג איי פי אייי בלבד אז אנחנו אומרים שהמידע שנקבל ונציג הוא בפורמט
// JSON
header('Content-Type: application/json');
// מאפשר לכל שרת מכל דומיין לפנות לאיי פי איי שלנו
header("Access-Control-Allow-Origin: *");

// יאפשר לנו מהצד לקוח לשלוח את המידע כג'ייסון
$bodyData = file_get_contents('php://input');
$body = json_decode($bodyData); // phpData




switch ($_SERVER["REQUEST_METHOD"]) {
  case "POST":
    // מסנן את המידע כדי שלא יבצעו אס קיו אל אנג'יקשן שיכול
    // לגרום לפירצה ולהרס של המסד נתונים
    $body->t_z_id = $conn->escape_string($body->t_z_id);
    $body->first = $conn->escape_string($body->first);
    $body->last = $conn->escape_string($body->last);
    $body->if_dikan = $conn->escape_string($body->if_dikan);


    $query = "INSERT INTO students (t_z_id,first,last,if_dikan,arrive) VALUES ('$body->t_z_id','$body->first','$body->last',$body->if_dikan,0)";
    $result_insert = $conn->query($query);
    if ($result_insert > 0) {
      echo "{'status':'ok'}";
    } else {
      echo "{'err':'there problem'}";
    }
    break;
}
