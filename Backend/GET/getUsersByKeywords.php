<?php


       
    include_once '../db.php';

    header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type");





if($_GET && count($_GET) && htmlspecialchars($_GET["keywords"]) ){
    $keywords = htmlspecialchars($_GET['keywords']);
    
    $keywords = explode(',', $keywords);
    sort($keywords);
    $wh = "%";
    for($i=0;$i<count($keywords);$i++){
      if($i != count($keywords) -1)
      $wh .= $keywords[$i]."%,";
      else 
      $wh .= $keywords[$i]. "%";
    }
 
      
  
    $sql = 'SELECT user_id FROM user_keywords GROUP BY user_id HAVING group_concat(keyword_id) LIKE :para';
    

    if(!$stmt = $conn->prepare($sql)){
        http_response_code(500);
    } 
    
    $stmt->bindValue(':para', $wh);
    if(!$stmt->execute() ){
        http_response_code(500);
    }
  
    $results = $stmt->fetchAll();
    $userIds = array();
    foreach($results as $user){
        $userIds[] = $user["user_id"];
    }
    if(count($userIds)){

    

        $qMarks = str_repeat('?,', count($userIds) - 1) . '?';

        // retrieve user by the collected userId
        $sql = "SELECT a.user_id, a.firstname, a.lastname, a.title, a.title_secondary, b.addressName, a.tel, a.public_email, a.profile_image_src
        FROM users a JOIN geoLocations b ON a.lat = b.lat AND a.lon = b.lon
        WHERE user_id IN ($qMarks) 
        ORDER BY a.lastname";
        $stmt = $conn->prepare($sql);
        
        if(!$stmt->execute($userIds)){
            http_response_code(500);
            die(json_encode(array("DB. Fehler" =>"Beim Laden von users mittels user_id.")));
        }
        $results = $stmt->fetchAll();

        $users = array();
        foreach ($results as $user){
            $users[] = [
                "title" => $user["title"],
                "additionalTitle" => $user["title_secondary"],
                "firstname" => $user["firstname"],
                "lastname" => $user["lastname"],
                "addressName" => $user["addressName"],
                "userId" => $user["user_id"],
                "publicEmail" => $user["public_email"],
                "tel" => $user["tel"],
                "image" => $user["profile_image_src"]
            ];
        }
        
        echo json_encode($users);

    } else{
        http_response_code(404);
    }



} else{
    die(json_encode(array("Fehler"=> "Leere Eingabe")) );
}


$conn = null;
?>