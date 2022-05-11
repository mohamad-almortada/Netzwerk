<?php

require_once '../db.php';



header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');


require_once 'validateCookie.php';
require_once '../sendEmail.php';

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $_COOKIE['csrf']){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'], $conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}

$DIR = "../".$_ENV['PHOTOS_DIR'];
$tmpDIR = "../".$_ENV["TEMP_PHOTOS_DIR"];
$mfile = "../".$_ENV["ENTERIES_FILE"];


$file = file_get_contents($mfile, true);
$data = json_decode($file,true);
unset($file);

$_POST= json_decode(file_get_contents("php://input"), true);



if( !empty($_POST) && isset($_POST) ){

    $id = $_POST['userId'];
  
  
    $email = $data[$id]['email'];
    $publicEmail= $data[$id]['public_email'];
    // $verifyEmail = $data[$id]['verifyEmail'];
    
    $title = $data[$id]['title'];
    $titleSecondary = $data[$id]['additionalTitle'];
    $firstname = $data[$id]['firstname'];
    $lastname = $data[$id]['lastname'];
    // $created_at = time();
    $fieldsOfResearch = $data[$id]['fieldsOfResearch'];
    $website = $data[$id]['website'];
    $tel = $data[$id]['tel'];
    $lat = $data[$id]['lat'];
    $lon = $data[$id]['lon'];
    $position = $data[$id]['position'];
    $keywords = $data[$id]['keywords'];
    $activities = $data[$id]['activities'];
    $additionalLinks = $data[$id]['additionalLinks'];
    $imageSrc = $data[$id]["newImage"];
    $token = bin2hex(random_bytes(8));
    $verify_token = password_hash($token, PASSWORD_DEFAULT);
    $verify_expiry = time() + (30 * 24 * 3600); // 30 days
  
    // add the user to the database

  
            // unique email
            $sql = 'SELECT 1 FROM users WHERE email=?';
            
            $stmt = $conn->prepare($sql);
            $stmt->execute($email); 
            $results = $stmt->fetchAll();
                // die(json_encode(array("Fehler"=>"Ein Fehler ist beim Checken die E-MAIL aufgetreten.")));
            
            if( count($results)) {
                die(json_encode(array("Fehler" => "Diese E-Mail ist schon eingetragen.")));
            }

            $imageFormat;
        
            
            // Check if the lat and lon are present
                $sql = 'SELECT * FROM geolocations WHERE lat=? and lon=?';
                $stmt = $conn->prepare($sql);
                $stmt->execute( [$lat,$lon] );
                $res = $stmt->fetchAll();
          
                if(!count($res)){
                    die("Latitude und Longitude sind nicht in der Datenbank");
                }
               
             
                try{
                
                $sql = "INSERT INTO users 
                (email, public_email, title, title_secondary, firstname, lastname, verify_token, verify_expiry,
                 website, tel, activities, fieldsOfResearch, additionalLinks, lat, lon, position) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                
                if ( !$stmt->execute(
                    array( $email, $publicEmail, $title, $titleSecondary,
                           $firstname, $lastname, $verify_token, date('Y-m-d H:i:s', $verify_expiry),
                           $website, $tel, $activities, $fieldsOfResearch, $additionalLinks, $lat, $lon,
                            $position)) ){

                                die("Fehler beim Einfuegen vom neuen User");
                            }
            


                    // getting the id of our new user.
                    $sql = "SELECT user_id FROM users WHERE email=?";
                    $stmt = $conn->prepare($sql);
                    if(!$stmt->execute(array($email))){
                        die("DB. Fehler getLastId().");
                    }
                    $lastId= $stmt->fetch()[0];

                  

                    $image;
                    // check if the table is empty
                    if($imageSrc && count($imageSrc)){
                        $imageFormat = substr($imageSrc, strrpos($imageSrc, '.') + 1);                            
                        $image = $lastId . "." . $imageFormat;
                        $sql = "UPDATE users SET profile_image_src=? WHERE email= ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->execute([$image, $email]);   
                    }
                    

                    // profile image tranporting from tmpUploads to uploads file.
                    if($imageSrc && count($imageSrc)){
                        $typ = substr($imageSrc, strrpos($imageSrc, '.') + 1);
                        // echo ($tmpDIR.'/'.$email. '.'.$typ);
                       
                        // change directory of profile image from tempUploads to uploads.
                        $success = rename($tmpDIR.'/'.$email. '.'.$typ, $DIR.'/'.$lastId. '.'.$typ);
                       
                        
                        if(!$success){
                            die("Fehler beim Aendern des Profilfoto Speicherorts");
                        }
                    
                    } 

               
                    
                    // getting the keywords-IDs to update entries in user_keywords (userId, keywordId)
                    $qMarks = str_repeat('?,', count($keywords) - 1) . '?';
                    $sql = "SELECT keyword_id FROM keywords WHERE keyword IN  ($qMarks)";
                    $stmt = $conn->prepare($sql);
                    if(!$stmt->execute($keywords)){
                            die("DB. Fehler beim Lesen von Schlagworte Id (getKeywordsIds).");
                        }
                        
                        
                    $keywordsIds = $stmt->fetchAll();

                    
                $sql = "INSERT INTO user_keywords (user_id, keyword_id) VALUES (?,?)";
                $stmt = $conn->prepare($sql);

                foreach ($keywordsIds as $keywordsId){            
                        if(!$stmt->execute(array($lastId,  $keywordsId["keyword_id"]))){
                            die("Fehler beim Hinzufuegen der Schlagworte");
                        }
                    
                }


    // send verifyication Email 
    if(!sendEmail($email, $token, $lastId, $title, $firstname, $lastname)){
        echo 'error';
    }


            }catch(Exception $e){
                echo $e->getMessage();
            }


                    if(count($data) >= 2){
                        // from the begin (-count) take the user with the given userId and delete one element 
                        array_splice($data, -count($data)+$id, 1);
            
                        // adjust the newUserId attribute after deleting by decrementing one of the value of every subsequent userId 
                        for ($i =$id; $i<count($data);$i++){
                            $data[$i]["newUserId"] -= 1;
            
                        }
                               
            
                    }else if(count($data) == 1){
                        unset($data);
                    }else{
                        echo "Keine Daten zu bearbeiten.";
                    }

                            
                

                    $result=json_encode($data);
                    file_put_contents($mfile, $result);
                    unset($result);


                    //  remove all unverified users after expiration
                    $sql = "DELETE FROM users WHERE verified= 0 AND verify_expiry < CURRENT_TIMESTAMP";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                    
                    echo true;
                




}else{
    echo "Leere Eingabe";
}

$conn = null;
?>