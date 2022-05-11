<?php

require_once '../db.php';
   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');


require_once "validateCookie.php";


$csrfCookie = $_COOKIE["csrf"];

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $csrfCookie){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE["PHPSESSID"], $_COOKIE["csrf"], $conn);

$response = array();

if($verified){
   echo json_encode(["isValid" => "valid"]);  
} else {    
    echo json_encode(["isValid" => "invalid"]);
}

// echo json_encode($response);

?>  