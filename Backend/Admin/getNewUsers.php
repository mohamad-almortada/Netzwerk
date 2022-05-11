<?php


require_once '../db.php';

   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

$mfile = '../'.$_ENV["ENTERIES_FILE"];

$file = file_get_contents($mfile, true);
    $data = json_decode($file,true);
    unset($file);

    echo json_encode($data);

?>