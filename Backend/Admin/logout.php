<?php


require_once '../db.php';
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Origin, Anti-CSRF, Content-Type, Accept');

// header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Origin, Anti-CSRF, Content-Type, Accept');
// require_once 'validateCookie.php';

// $csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
// if($csrfCookie != $_COOKIE['csrf']){
//     die(json_encode("Unauthorized"));
// }

// $verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'], $conn);
// if(!$verified){
//     die(json_encode("Unauthorized"));
// }

$https = false;
$httpOnly = true;


// reset expire cookie in the db.

$sql = "UPDATE admins SET expire= 0 WHERE admin_id = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();

setcookie('PHPSESSID', $cookie, time() - 1800, '/', '', false, true);
setcookie('csrf', $csrfCookie, time() - 1800, '/', '', false, true);

echo json_encode(["valid" =>true]); 

?>