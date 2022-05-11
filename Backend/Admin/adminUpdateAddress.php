<?php

require_once '../db.php';
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');

require_once 'validateCookie.php';

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $_COOKIE['csrf']){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'],$conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}



$_POST = json_decode(file_get_contents("php://input"), true);
// echo json_encode($_POST['data']['altLat']);
if( $_POST && count($_POST) && trim(htmlspecialchars($_POST['data']['altLat'])) && trim(htmlspecialchars($_POST['data']['altLon'])) ){

    $address = trim(htmlspecialchars($_POST['data']['schoolName']));
    $lat = trim(htmlspecialchars($_POST['data']['lat']));
    $lon = trim(htmlspecialchars($_POST['data']['lon']));
    $altLat = trim(htmlspecialchars($_POST['data']['altLat']));
    $altLon = trim(htmlspecialchars($_POST['data']['altLon']));
    $street = trim(htmlspecialchars($_POST['data']['street']));
    $buildingNr = trim(htmlspecialchars($_POST['data']['streetNr']));
    $city = trim(htmlspecialchars($_POST['data']['place']));
    $plz = trim(htmlspecialchars($_POST['data']['plz']));
    $type = trim(htmlspecialchars($_POST['data']['typ']));

   

// // check if keyword already exists.
//     $sql = "SELECT * FROM geoLocations WHERE lat=? AND lon=? AND addressName=?";
//     $stmt = $conn->prepare($sql);
//     if(!$stmt->execute(array($lat, $lon, $address))){
//         http_response_code(500);
//         // die("Ein Fehler ist beim Hinzufuegen aufgetreten");
//     }
//     if($result = $stmt->fetchAll() ){
//         die("Dieses Addresse mit der eingegebenen Name existiert bereits.");
//     }
    
    $sql = "UPDATE geoLocations 
            SET lat=?,
                lon=?,
                addressName=?,
                street=?,
                plz=?,
                buildingNr=?,
                city=?,
                typ=?
            WHERE lat=? AND lon=?";
    $stmt = $conn->prepare($sql);
    if(!$stmt->execute( [$lat, $lon, $address, $street, $plz, $buildingNr, $city, $type, $altLat, $altLon ] ) )
        echo "Ein Fehler ist beim Hinzufuegen aufgetreten";
    
        echo json_encode(array("valid"=>true));
}else {
    echo "Leer Eingabe";
}

$conn = null;

?>