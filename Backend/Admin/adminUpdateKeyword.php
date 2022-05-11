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

if( !empty($_POST && isset($_POST))){

    $keyword = trim(htmlspecialchars($_POST['data']['keyword']));
    $newKeyword = trim(htmlspecialchars($_POST['data']['newKeyword']));
   

// check if keyword already exists.
    $sql = "SELECT * FROM keywords WHERE keyword=?";
    $stmt = $conn->prepare($sql);
    if(!$stmt->execute(array($newKeyword))){
        die("Ein Fehler ist beim Hinzufuegen aufgetreten");
    }
    if($result = $stmt->fetchAll() ){
        die("Dieses Schlagwort existiert bereits.");
    }
    
    $sql = "UPDATE keywords SET keyword=? WHERE keyword=?";
    $stmt = $conn->prepare($sql);
    if(!$stmt->execute( [$newKeyword, $keyword ] ) )
        echo "Ein Fehler ist beim Hinzufuegen aufgetreten";
    
        echo json_encode(array("valid"=>true));
}else {
    echo "Leer Eingabe";
}

$conn = null;

?>