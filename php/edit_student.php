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

  
  

  switch ($_SERVER["REQUEST_METHOD"]){
    case "PUT":
      $body->id = $conn->escape_string($body->id);
      $body->t_z_id = $conn->escape_string($body->t_z_id);
      $body->first = $conn->escape_string($body->first);
      $body->last = $conn->escape_string($body->last);
      $body->if_dikan = $conn->escape_string($body->if_dikan);
      

      $query = "UPDATE students SET t_z_id = '$body->t_z_id' , first = '$body->first' , last = '$body->last' , if_dikan = $body->if_dikan WHERE id = $body->id";
      // echo $query;
      $result_update = $conn->query($query);
      if($result_update > 0){
        echo "{'status':'ok'}";
        }
        else{
          echo "{'err':'there problem'}";
      }

      break;
      
    }