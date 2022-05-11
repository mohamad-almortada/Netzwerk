<?php
     require_once "../db.php";

   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods:  GET");
header("Access-Control-Allow-Headers: Content-Type");



$sql = "SELECT * FROM geoLocations ORDER BY typ";
$result = $conn->query($sql)->fetchAll();


print json_encode($result); 



$conn = null;