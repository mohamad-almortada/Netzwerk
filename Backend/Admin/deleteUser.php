<?php



require_once '../db.php';
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: DELETE");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');

$photosFile = "../".$_ENV["PHOTOS_DIR"];

require_once 'validateCookie.php';

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $_COOKIE['csrf']){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'], $conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}

$userId = trim(htmlspecialchars($_GET['userId']));

$sql = "SELECT * FROM users WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->execute([$userId]);
$results = $stmt->fetch();


if(count($results)){
      

    $sql= "DELETE FROM users WHERE user_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);
    // remove Photo if exists
    $imageSrc = $photosFile . $results['profile_image_src'];

    if ($results['profile_image_src'] && !file_exists($imageSrc) ) 
        die(json_encode("Foto Datei wurde nicht gefunden."));
    unlink($imageSrc);
    echo json_encode(["valid"=>true]);
} else{
    echo json_encode(array("unvalid"=>true));
}

?>



