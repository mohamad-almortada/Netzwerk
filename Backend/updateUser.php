
<?php

require_once 'db.php';
require_once 'sendEmail.php';

header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");




// $DIR = $_ENV['PHOTOS_DIR'];
$errors = [];
$rePatternEmail = "/^[a-zA-Z0-9]{2,60}(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*\+?(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*@[a-zA-Z0-9]{1,50}(?:(?:\.|-)[a-zA-Z]+)*\.[a-zA-z]{1,10}$/";



$_POST= json_decode(file_get_contents("php://input"), true);


    if ( $_POST && count($_POST) ){ 

        $userId = trim(htmlspecialchars($_POST["userId"]));
        $lat= trim(htmlspecialchars($_POST["lat"]));
        $lon= trim(htmlspecialchars($_POST["lon"]));
        $firstname= trim(htmlspecialchars($_POST["firstname"]));
        $lastname= trim(htmlspecialchars($_POST["lastname"]));
        $email= trim(htmlspecialchars($_POST["email"]));
        $verifyEmail= trim(htmlspecialchars($_POST["verifyEmail"]));
        $publicEmail= trim(htmlspecialchars($_POST["publicEmail"]));
        $fieldsOfResearch= trim(htmlspecialchars($_POST["fieldsOfResearch"]));
        $activities= trim(htmlspecialchars($_POST["activities"]));
        $title= trim(htmlspecialchars($_POST["title"]));
        $additionalTitle= trim(htmlspecialchars($_POST["additionalTitle"]));
        $website= trim(htmlspecialchars($_POST["website"]));
        $additionalLinks= trim(htmlspecialchars($_POST["additionalLinks"]));
        $tel= trim(htmlspecialchars($_POST["tel"]));
        $position= trim(htmlspecialchars($_POST["position"]));


        


        // get the data of the user before updating → $preUserData
        $sql = "SELECT * FROM users WHERE user_id= ?";
        $stmt= $conn->prepare($sql);
        $stmt->execute([$userId]);
        $preUserData = $stmt->fetch();
        if(!count($preUserData)){
            http_response_code(500);
        }


        if ( $email && count($email) && $verifyEmail && count($verifyEmail)   ) 
            {
            
         
                if(!preg_match($rePatternEmail, $email) )       
                    $errors["email"] = "Die E-Mails sind fehlerhaft";
               
            
            
            
           
           
            if($email != $verifyEmail){
                // echo json_encode(array("email"=>$email, "verifyEmail"=>$verifyEmail));
                $errors["verifyEmail"] = "Die E-Mails stimmen nicht ueberein";
            }
            if(strlen($email) > 255){
                $errors["emailSize"] = "Max. Groesse 255";
            }
           
        }
        else 
                $errors["email"] = "Email und/oder Bestaetigung-Email ist leer"; 



            if ( $publicEmail ){
                // $publicEmail = trim(htmlspecialchars($_POST['publicEmail']));
                if(!preg_match($rePatternEmail, $publicEmail) )       
                    $errors["publicEmail"] = "Die öffentliche E-Mails ist fehlerhaft";
                
            }
          


                
        if ( !$lat ) 
            $errors["lat"] = "Lat ist leer";
        if (!$lon) 
            $errors["lon"] = "lon ist leer";

        if ($firstname ) {
            // $firstname = trim(htmlspecialchars($_POST['firstname']));
            if(strlen($firstname) > 255){
                $errors["firstnameSize"] = "Max. Groesse 255";
            }
        }

        else 
            $errors["firstname"] = "firstname ist leer";

        if ( $lastname) {
            // $lastname= trim(htmlspecialchars($_POST["lastname"]));
            if(strlen($lastname) > 255){
                $errors["lastnameSize"] = "Max. Groesse 255";
            }
        }
        else 
            $errors["lastname"] = "lastname ist leer";

       

      
    
        if ( !$position  ) 
            $errors["postion"] = "Position ist leer";

        if ( count($_POST['keywords']) && $_POST["keywords"]  ) {
            $keywordsPost = $_POST["keywords"];
            $keywords = [];
            foreach($keywordsPost as $keyword) {
                $keywords[] =  trim(htmlspecialchars($keyword));        
            }

        }
        else 
            $errors["keywords"] = "Schlagworte fehlen";

        // 500 max length
        if ( !$additionalLinks  ) {    
            if(strlen($additionalLinks) > 500)
                $errors["additionalLinks"] = "Max. Groesse 500 Zeichen.";
        }
    
        
            
        // 500 max length
        if ( !$additionalLinks  ) {
            // $additionalTitle=  trim(htmlspecialchars($_POST["additionalTitle"]));        
            if(strlen($additionalTitle) > 127)
                $errors["additionalLinks"] = "Max. Groesse 127 Zeichen.";
        }
      
           

        // 500 max length
        if ( $activities ) {
            // $activities=  trim(htmlspecialchars($_POST["activities"]));        
            if(strlen($activities) > 500)
                $errors["activities"] = "Max. Groesse 500 Zeichen.";
        }
        

        // 500 max length
        if ( $fieldsOfResearch ) {
            // $fieldsOfResearch=  trim(htmlspecialchars($_POST["fieldsOfResearch"]));        
            if(strlen($fieldsOfResearch) > 500)
                $errors["fieldsOfResearch"] = "Max. Groesse 500 Zeichen.";
        }
      

       

        $newImageSrc;




            if(!count($errors)){

                $token = bin2hex(random_bytes(8));
                $verify_token = password_hash($token, PASSWORD_DEFAULT);
                $verify_expiry = time() + (30 * 24 * 3600); // 30 days
  
                $newImage = $_POST['newImage'];
                
                
                $imageDeleted= false;

                // image is deleted
                if($newImage == ""){
                    // echo json_encode($preUserData["profile_image_src"]);
                unlink($preUserData["profile_image_src"]);
                $imageDeleted= true;

                }

                //  image is specified AND is either a base64 encoded or a string refering to the source like '1.png'
                if(! $imageDeleted){
                if (preg_match('/^data:image\/(\w+);base64,/', $newImage, $type)) {
                    $newImage = substr($newImage, strpos($newImage, ',') + 1);
                    $type = strtolower($type[1]); 
        
                    if (!in_array($type, [ 'jpg', 'jpeg', 'png' ])) 
                        die(json_encode(array("Fehler"=>"Ungültiger Foto-Typ. Erlaubt sind jpg, jpeg und png")));
                    
                    $newImage = str_replace( ' ', '+', $newImage );
                    $newImage = base64_decode($newImage);
                    
                    if(!$newImage)
                        die(json_encode(array("Fehler" => "Fehler beim Lesen der Datei")));
                        
                    // indicate approx. how many bytes takes the photo.
                    $size = (int)(strlen(rtrim($newImage, '=')) * 0.75); 
                    if($size > 1000000) // bigger than 1 MB
                        die(json_encode(array("Fehler"=>"Maximale Groesse betraegt 1 MB")));
                    
                        // save image in a temporary folder as in "email.format"
                    if ( !file_put_contents($_ENV['PHOTOS_DIR'].$userId.".".$type, $newImage) )
                        die(json_encode(array("Fehler"=>"Email ist schon vergeben.")));
                        
                        $newImageSrc= $userId.".".$type;
                            
        
            } else {
                // the image is neither a base64 nor a match of this regex below. 
                if(!preg_match('/^.*(?:\.(?:png|jpg|jpeg))$/', $newImage, $type))
                    die(json_encode("Das Foto ist ungütlig"));
                    $newImageSrc= $newImage;
                }
            }
// try{



                $sql= "UPDATE users
                        SET email=?,
                        public_email=?, 
                        firstname=?,
                        lastname=?,
                        title=?,
                        title_secondary=?,
                        tel=?,
                        website=?,
                        additionalLinks=?,
                        fieldsOfResearch=?,
                        position=?,
                        profile_image_src=?,
                        lat=?,
                        lon=?,
                        activities=?
                        WHERE user_id=?
                ";

                $stmt= $conn->prepare($sql);
                $stmt->execute([$email, $publicEmail, $firstname, $lastname, $title, $additionalTitle, $tel, $website, $additionalLinks,
                                $fieldsOfResearch, $position, $newImageSrc, $lat, $lon, $activities, $userId    
                ]);

            
                // To update the keywords: first delete all keyword_ids assigned to the user, then add the given (array) of keywords 
                $sql="DELETE FROM user_keywords WHERE user_id=?";
                $stmt= $conn->prepare($sql);
                $stmt->execute([$userId]);
                // $qMarks = str_repeat('(?,?),', count($keywords) - 1) . '(?,?)';
            

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
                if(!$stmt->execute(array($userId,  $keywordsId["keyword_id"]))){
                    die("Fehler beim Hinzufuegen der Schlagworte");
                }
            
        }
            
            // when the email is changed (updated) a verification email must be sent to assure the correctness of the new email
            if($email != $preUserData["email"]){
                // send email with the verification link
                sendEmail($email, $token, $userId, $title, $firstname, $lastname);
                $sql= "UPDATE users SET verified= 0, verify_token=?, verify_expiry=? WHERE user_id=?";
                $stmt= $conn->prepare($sql);
                $stmt->execute([$verify_token, date('Y-m-d H:i:s', $verify_expiry), $userId]);
            }

        // }catch(Exception $e){
        //     echo $e->getMessage();
        // }
      


        

        echo "1";
                
            }else{
                $myErrors = [];
                foreach($errors as $error){
                    $myErrors["Fehler"] = $error . ", ";
                }
                echo json_encode($myErrors);
            
            }
        } else{
            echo "LEERE EINGABE";
        }


?>






