<?php

require_once '../db.php';
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');

require_once 'validateCookie.php';


    $csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
    if($csrfCookie != $_COOKIE['csrf']){
        die(json_encode("Unauthorized"));
    }


$verified = validateCookie($_COOKIE['PHPSESSID'],  $_COOKIE['csrf'], $conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}




$sql = "SELECT c.typ, c.addressName, a.*, k.keyword
        FROM geolocations c 
        INNER JOIN users a ON c.lat = a.lat AND c.lon = a.lon 
        INNER JOIN user_keywords uk ON uk.user_id = a.user_id
        INNER JOIN keywords k ON uk.keyword_id = k.keyword_id
        ORDER BY a.user_id";
$results = $conn->query($sql)->fetchAll();

$keywords = [];

for($i = 0; $i < count($results); $i++){
    $iUserId = $results[$i]["user_id"];

    if($i ==0 || $results[$i]["user_id"] != $results[$i-1]["user_id"])
        $keywords[$iUserId] = $results[$i]["keyword"];
    
    else
         $keywords[$iUserId] .= ", " . $results[$i]["keyword"];
     
    }



$users = [];
    for($i = 0; $i < count($results); $i++){
    
        if( $i==0 ||  $results[$i]["user_id"] != $results[$i-1]["user_id"])

        $users[] = [ 
            "userId" => $results[$i]["user_id"],
            "typ" => $results[$i]["typ"],
            "addressName" => $results[$i]["addressName"],
            "position" => $results[$i]["position"],
            "firstname" => $results[$i]["firstname"],
            "lastname" => $results[$i]["lastname"],
            "imageSrc"=>$results[$i]["profile_image_src"],
            "title" => $results[$i]["title"],
            "additionalLinks" => $results[$i]["additionalLinks"],
            "additionalTitle" => $results[$i]["secondary_title"],
            "website" => $results[$i]["website"],
            "tel" => $results[$i]["tel"],
            "email" => $results[$i]["email"],
            "publicEmail" => $results[$i]["public_email"],
            "activities" => $results[$i]["activities"],
            "fieldsOfResearch" => $results[$i]["fieldsOfResearch"],
            "keywords" => explode(", ",$keywords[$results[$i]["user_id"]])
        
        
        
        ];
    }
    


echo json_encode($users);



$conn = null;

?>
