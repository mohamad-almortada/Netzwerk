<?php
     require_once "../db.php";
 
     header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
     header("Access-Control-Allow-Methods: GET");
     header("Access-Control-Allow-Headers: Content-Type");
     
    //  getAllAddresses

    $sql = "SELECT * FROM geoLocations";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll();
    print json_encode($results);
  
    // remove all unverified users after expiration
    $sql= "SELECT user_id FROM users  WHERE verified= 0 AND verify_expiry < CURRENT_TIMESTAMP";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $userIds= $stmt->fetchAll();
    if(count($userIds)){
      $qMarks = str_repeat('?,', count($userIds) - 1) . '?';
      $sql = "DELETE FROM users WHERE user_id IN ($qMarks)";
      $stmt = $conn->prepare($sql);
      $stmt->execute([$userIds]);

      $sql= "DELETE FROM user_keywords WHERE user_id IN ($qMarks)";
      $stmt = $conn->prepare($sql);
      $stmt->execute([$userIds]);
    }



    $conn = null;
?>