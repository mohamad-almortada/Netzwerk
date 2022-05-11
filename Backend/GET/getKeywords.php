<?php


require_once "../db.php";
   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$sql = "SELECT keyword_id , keyword FROM keywords ORDER BY keyword_id";
$results = $conn->query($sql)->fetchAll();

$keywords = array();
foreach ($results as $keyword)
$keywords[] = [
    "keywordId" => $keyword["keyword_id"],
    "keyword" => $keyword["keyword"]
];

// $sql = "SELECT * FROM geoLocatio"

print json_encode($keywords); 

$conn = null;

?>
