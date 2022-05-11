<?php

   
require_once '../db.php';


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: POST');
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


// get data in json and set the global post to it after decoding.
$_POST = json_decode(file_get_contents("php://input"), true);

if( !empty($_POST) && $_POST && trim(htmlspecialchars($_POST['keyword']))){

    $keyword = trim(htmlspecialchars($_POST['keyword']));

// check if keyword already exists.
    $sql = "SELECT * FROM keywords WHERE keyword=?";
    $stmt = $conn->prepare($sql);
    if($stmt->execute(array($keyword))){
        if($result = $stmt->fetchAll() ){
            die("Schlagwort ist schon in der Liste");
        }
    }else{
        die("Ein Fehler ist beim Hinzufuegen aufgetreten");
    }
    
    $sql = "INSERT INTO keywords (keyword) VALUE (?)";
    $stmt = $conn->prepare($sql);
    if($stmt->execute(array($keyword))){
        echo json_encode(array("valid"=>true));
    }else{
        echo "Ein Fehler ist beim Hinzufuegen aufgetreten";
    }
}else {
    echo "Leer Eingabe";
}

$conn = null;
?>