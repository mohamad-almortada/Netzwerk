<?php

require_once '../db.php';
   

header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');

require_once 'validateCookie.php';

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $_COOKIE['csrf']){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'], $conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}


if( !empty($_GET) && isset($_GET) ){

    $lat = trim(htmlspecialchars($_GET['lat']));
    $lon= trim(htmlspecialchars($_GET['lon']));

    $sql = "DELETE FROM geoLocations WHERE lat=? AND lon=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$lat, $lon]);
    
    echo json_encode(array("valid"=> true));

}


$conn = null;
?>