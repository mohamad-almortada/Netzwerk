<?php

   
require_once "../db.php";


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods:  POST");
header("Access-Control-Allow-Headers: Content-Type");




// check if the OTP still is not expired (1 hour). If the hash value of token is identical to the token send from client.
// returns true if the above criteria fullfills otherwise false.

$_POST = json_decode(file_get_contents("php://input"), true);

if($_POST && count($_POST) && trim(htmlspecialchars($_POST["token"])) && trim(htmlspecialchars($_POST["email"])) ){
   
        
    $token = trim(htmlspecialchars($_POST["token"]));
    $email = trim(htmlspecialchars($_POST["email"]));
    


try{
  

    
    $sql = "SELECT * FROM users WHERE email= ?";
    $stmt= $conn->prepare($sql);
    $stmt->execute([$email]);
    $results= $stmt->fetchAll();
    $userId = $results[0]["user_id"];

    if(count($results)){
        $sql = "SELECT * FROM otps WHERE user_id= ?";
        $stmt= $conn->prepare($sql);
        $stmt->execute([$userId]);
        $results= $stmt->fetchAll();

        $otp = $results[0]["otp"];
        $expire = $results[0]["expire"];
        // echo json_encode($expire > date('Y-m-d H:i:s', time()));
        // echo json_encode($otp);
        if(password_verify($token, $otp) && $expire > date('Y-m-d H:i:s', time()) ) {
            // remove the stored one time password
            $sql = 'DELETE FROM otps WHERE user_id= ?';
            $stmt= $conn->prepare($sql);
            $stmt->execute([$userId]);

            // grant access to modify functionality and return the profile data.

            $sql = "SELECT c.*, a.*, k.keyword
            FROM geoLocations c 
            INNER JOIN users a ON c.lat = a.lat AND c.lon = a.lon 
            INNER JOIN user_keywords uk ON uk.user_id = a.user_id
            INNER JOIN keywords k ON uk.keyword_id = k.keyword_id
            WHERE a.email=?";
    
    
    
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($email));
            $results = $stmt->fetchAll();


            if(count($results) > 0){
                $keywords = [];
                for($i = 0; $i < count($results); $i++){
                    $keywords[] = $results[$i]["keyword"];
                }
                // echo json_encode($results);
    
                $user= [
                    
                    "typ" => $results[0]["typ"],
                    "position" => $results[0]["position"],
                    "firstname" => $results[0]["firstname"],
                    "lastname" => $results[0]["lastname"],
                    "imageSrc"=>$results[0]["profile_image_src"],
                    "title" => $results[0]["title"],
                    "additionalLinks" => $results[0]["additionalLinks"],
                    "additionalTitle" => $results[0]["title_secondary"],
                    "website" => $results[0]["website"],
                    "tel" => $results[0]["tel"],
                    "email" => $results[0]["email"],
                    "publicEmail" => $results[0]["public_email"],
                    "activities" => $results[0]["activities"],
                    "fieldsOfResearch" => $results[0]["fieldsOfResearch"],
                    "keywords" => $keywords,
                    "userId" => $results[0]["user_id"],
                    "addressName" => $results[0]["addressName"],
                    "lat" => $results[0]["lat"],
                    "lon" => $results[0]["lon"],
                    "street" => $results[0]["street"],
                    "buildingNr" => $results[0]["buildingNr"],  
                    "plz" => $results[0]["plz"],
                    "city" => $results[0]["city"],
                    "typ" => $results[0]["typ"]
                    ];
                    echo json_encode(array("user"=>$user, "success"=>"true"));
                }
                 
            else{
                 die(json_encode("User wurde nicht gefunden."));
            }
        
        
        
        } else {
            die(json_encode("Ungültiger Token"));
        }  
    
    }
    else{

    }
    }catch(Exception $e){
            echo $e->getMessage();
        }
    
        
    }


    
