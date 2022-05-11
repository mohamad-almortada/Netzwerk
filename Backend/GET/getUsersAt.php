<?php


require_once "../db.php";


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");



if(isset($_GET) && !empty($_GET)){ 

  $lat = $_GET["lat"];
  $lon = $_GET["lon"];
  
  
//   $sql = "SELECT u.*
//   from users u
//   inner join geolocation g on g.lat = u.lat and g.lon = u.lon 
//   inner join user_keywords uk on uk.user_id = u.user_id 
//   inner join keywords k on uk.keyword_id = k.keyword_id 
//   where u.lat= :lat
//   order by u.user_id";
    
//     $stmt = $conn->prepare($sql);
//     // echo $stmt->errorCode();
//     $stmt->bindParam(":lat", $lat); 
//     $stmt->execute();
//    $results = $stmt->fetchAll();
// echo json_encode($results);

// $collectKeywords = [];
// $tmpUsers = [];
// $previous = -1;
// for($i =0; $i < count($results); $i++){
//   $currentId = $results['user_id'];
//   echo json_encode($currentId);
//   if($previous != $currentId){
//     $tmpUsers[] = [

//       "additionalTitle" => $results["title_secondary"],
//       "addressName" => $results["addressName"],
//       "firstname" => $results["firstname"],
//       "lastname" => $results["lastname"],
//       "title" => $results["title"],
//       "userId" => $results["user_id"],
//       "website" => $results["website"],
//       "tel" => $results["tel"],
//       "publicEmail" => $results["public_email"],
//       // "keywords" => $keywords["keyword"],
//      ];
//      $collectKeywords[] = $results["keyword"];
//   }
//   // collect keywords for the corrospond user 
//   else {
//     $collectKeywords[$prev] .= $results["keyword"];
//   }



//   $previous = $currentId;
// } 

// echo json_encode($tmpUsers);

    $sql = 'SELECT a.addressName, b.user_id, b.firstname, b.lastname, b.title, b.title_secondary, b.public_email, b.tel, b.website, b.profile_image_src
    FROM users b JOIN geoLocations a ON a.lat = b.lat AND a.lon = b.lon 
    WHERE a.lat=? AND a.lon=?
    ORDER BY b.lastname';
    
  
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($lat, $lon));
   $results = $stmt->fetchAll();


  //  $sql = "SELECT k.keyword, k2.user_id 
  //  FROM keywords k JOIN user_keywords k2 ON k.keyword_id = k2.keyword_id
  //  WHERE keyword_id IN (SELECT keyword_id FROM user_keywords WHERE user_id = ?)";
  $sql = "SELECT k.keyword, k2.user_id 
  FROM keywords k JOIN user_keywords k2 ON k.keyword_id = k2.keyword_id order by k2.user_id";
  
  $keywords;
  
  if(!$stmt = $conn->prepare($sql)){
    echo "error 1";
  }
   if(!$stmt->execute()){
     echo "error 2";
   }
   $keywords = $stmt->fetchAll();
   if($keywords === false){
   echo "error 3";
  
  }
   

 $mkeywords = [];

   $users = array();
   foreach($results as $user){
     for($i = 0; $i < count($keywords); $i++){
       if($keywords[$i]["user_id"] == $user["user_id"]){
         $mkeywords[] = $keywords[$i]["keyword"];
       }
     }
    //  echo json_encode(array($user["user_id"]=>$mkeywords));

     $users[] = [

      "additionalTitle" => $user["title_secondary"],
      "addressName" => $user["addressName"],
      "firstname" => $user["firstname"],
      "lastname" => $user["lastname"],
      "title" => $user["title"],
      "userId" => $user["user_id"],
      "website" => $user["website"],
      "tel" => $user["tel"],
      "image" => $user["profile_image_src"],
      "publicEmail" => $user["public_email"],
      "keywords" => $mkeywords,
     ];
    $mkeywords = [];
   }

  if(count($results) == 0) 
    echo "Keine Daten";
  else
      print json_encode($users); 
  

}else {
  echo "Koordinaten fehlen";
}


  



$conn = null;   
?>

