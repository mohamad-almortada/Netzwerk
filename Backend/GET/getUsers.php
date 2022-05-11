<?php


require_once "../db.php";

   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");



$sql = "SELECT c.typ, c.addressName, a.position, a.firstname, a.lastname, a.user_id, a.profile_image_src as imageSrc
FROM geoLocations c JOIN users a ON c.lat = a.lat AND c.lon = a.lon ORDER BY a.lastname";
$results = $conn->query($sql)->fetchAll();
// echo json_encode($_ENV["FRONTEND_DOMAIN"]);


// $sql = "SELECT * FROM geoLocatio"

$users = [];
foreach ($results as $result){
$users[] = [ 
    "userId" => $result["user_id"],
    "typ" => $result["typ"],
    "addressName" => $result["addressName"],
    "position" => $result["position"],
    "firstname" => $result["firstname"],
    "lastname" => $result["lastname"],
    "imageSrc"=>$result["imageSrc"]
];

}

echo json_encode($users);

// print json_encode($users); 

$conn = null;

?>
