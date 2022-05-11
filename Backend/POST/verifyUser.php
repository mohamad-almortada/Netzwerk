<?php

require_once "../db.php";
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");







$_POST = json_decode(file_get_contents("php://input"), true);


if(isset($_POST) && !empty($_POST) && htmlspecialchars($_POST["token"]) && htmlspecialchars($_POST["userId"]) ){ 
    $verifyToken = trim(htmlspecialchars($_POST["token"]));
    $userId = htmlspecialchars($_POST["userId"]);

    $sql = "SELECT * FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    if($user["verified"] == 1){
        die(json_encode("Das Profil wurde schon verifiziert"));
    }
    if(password_verify($verifyToken, $user["verify_token"])){
        $sql= "UPDATE users SET verified= 1 WHERE user_id=?";
        $stmt= $conn->prepare($sql);
        $stmt->execute([$userId]);
        echo json_encode(array("valid"=>"true"));
    } else{
        echo json_encode(array("valid"=>"false"));    
    }



}else{
    echo "Leer";
}

$conn = null;
?>