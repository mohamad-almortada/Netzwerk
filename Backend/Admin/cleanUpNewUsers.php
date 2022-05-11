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


// allows to clean up newUsers.json file from possible spam by deleting the first given number of data to delete. 


$mfile = 'newUsers.json';
$errors = [];

$file = file_get_contents($mfile, true);
$data = json_decode($file,true);
unset($file);

$_POST= json_decode(file_get_contents("php://input"), true);
// echo json_encode($_POST) ;
// echo isset($_POST)&& !empty($_POST);


if( !empty($_POST) && isset($_POST) ){
    

    $usersToDelete = $_POST['how_many'];

    if($usersToDelete <= 0){
        die("Keine Daten zu loeschen.");
    }

    if(count($data) <=  $usersToDelete){
        unset($data);
    }
    else{

        array_splice($data, 0, $usersToDelete);
         // adjust the newUserId attribute after deleting by decrementing one of every subsequent userId 
         for ($i =0; $i<count($data);$i++){
            $data[$i]["newUserId"] -= 50;
            
            

        }
    }
    
        $result=json_encode($data);
        file_put_contents($mfile, $result);
        unset($result);
        
        echo true;
    } else 
        echo "Fehler";

?>



