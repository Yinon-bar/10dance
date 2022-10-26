<?php
include "./connect.php";
// בגלל שעובדים שהפיפ מציג איי פי אייי בלבד אז אנחנו אומרים שהמידע שנקבל ונציג הוא בפורמט
// JSON
header('Content-Type: applicati on/json');
// מאפשר לכל שרת מכל דומיין לפנות לאיי פי איי שלנו
header("Access-Control-Allow-Origin: *");

// יאפשר לנו מהצד לקוח לשלוח את המידע כג'ייסון
$bodyData = file_get_contents('php://input');
$body = json_decode($bodyData); // phpData




switch ($_SERVER["REQUEST_METHOD"]) {
  case "DELETE":
    $body->id = $conn->escape_string($body->id);


    $query = "DELETE FROM students WHERE id = $body->id";
    // echo $query;
    $result_del = $conn->query($query);
    if ($result_del > 0) {
      echo "{'status':'ok'}";
    } else {
      echo "{'err':'there problem'}";
    }

    break;
}
