<?php

require_once 'db.php';
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");





$errors = [];
$rePatternEmail = "/^[a-zA-Z0-9]{2,60}(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*\+?(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*@[a-zA-Z0-9]{1,50}(?:(?:\.|-)[a-zA-Z]+)*\.[a-zA-z]{1,10}$/";




// checks wheter the newUser.json file extends its capacity: it was tested by 1000 entries, though almost all optional attributes were empty.
if(filesize($_ENV["ENTERIES_FILE"])/1000 > 300 ){
    die(json_encode(array("Fehler" => "Temporarer Speicher fuer neue Anfragen wurde aufgebraucht.")));
}

$_POST= json_decode(file_get_contents("php://input"), true);


    if ( $_POST && count($_POST) ){ 

        $lat;
        $lon;
        $firstname;
        $lastname;
        $email;
        $verifyEmail;
        $publicEmail;
        $fieldsOfResearch;
        $activities;
        $title;
        $additionalTitle;
        $website;
        $additionalLinks;
        $tel;
        $position;


        if ( count($_POST['email']) && $_POST["email"] && $_POST["verifyEmail"] 
            && count($_POST["verifyEmail"]) && trim($_POST["email"])   ) 
            {
            $email = trim(htmlspecialchars($_POST['email']));
            $verifyEmail = trim(htmlspecialchars($_POST['verifyEmail']));
            // if(!filter_var($email, FILTER_VALIDATE_EMAIL)  ) {
                if(!preg_match($rePatternEmail, $email) ){
                    
                $errors["verifyEmail"] = "Die E-Mails sind fehlerhaft";
                die(json_encode($errors));
            }
            
           
            $sql = "SELECT * FROM users WHERE email=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($email));
            $result = $stmt->fetch()[0];
            if(count($result) > 0){
                die(json_encode(array("Fehler"=>"Email ist schon vergeben")));
            }   
            if($email != $verifyEmail){
                echo json_encode(array("email"=>$email, "verifyEmail"=>$verifyEmail));
                $errors["verifyEmail"] = "Die E-Mails stimmen nicht ueberein";
            }
            if(strlen($email) > 255){
                $errors["emailSize"] = "Max. Groesse 255";
            }
           
        }
        else 
                $errors["email"] = "Email oder Bestaetigung-Email ist leer"; 



            if ( count($_POST['publicEmail']) && $_POST["publicEmail"] &&  trim($_POST['publicEmail'])  ){
                $publicEmail = trim(htmlspecialchars($_POST['publicEmail']));
                // if(!filter_var($publicEmail, FILTER_VALIDATE_EMAIL)  ) {
                //     $errors["publicEmail"] = "publicEmail fehlerhaft";     
                // }
                
            }
          


                
        if ( count($_POST["lat"]) && $_POST["lat"] && trim($_POST["lat"]) ) 
            $lat = trim(htmlspecialchars($_POST['lat']));

        else 
        $errors["lat"] = "Lat ist leer";
        if ( count($_POST['lon']) && $_POST["lon"] & trim($_POST["lon"])) 
            $lon = trim(htmlspecialchars($_POST['lon']));
        else 
            $errors["lon"] = "lon ist leer";

        if ( count($_POST['firstname']) && $_POST["firstname"] && trim($_POST["firstname"]) ) {
            $firstname = trim(htmlspecialchars($_POST['firstname']));
            if(strlen($firstname) > 255){
                $errors["firstnameSize"] = "Max. Groesse 255";
            }
        }

        else 
            $errors["firstname"] = "firstname ist leer";

        if ( count($_POST['lastname']) && $_POST["lastname"] && trim($_POST["lastname"]) ) {
            $lastname= trim(htmlspecialchars($_POST["lastname"]));
            if(strlen($lastname) > 255){
                $errors["lastnameSize"] = "Max. Groesse 255";
            }
        }
        else 
            $errors["lastname"] = "lastname ist leer";

        if ( count($_POST['website']) && $_POST["website"] && trim($_POST["website"])  ) {
            $website = trim(htmlspecialchars($_POST["website"]));
        }


        if ( count($_POST['tel']) && $_POST["tel"] && trim($_POST["tel"]) )
            $tel = trim(htmlspecialchars($_POST["tel"]));
    
        if ( count($_POST['title']) && $_POST["title"] && trim($_POST["title"])  ) {
            $title = trim(htmlspecialchars($_POST["title"]));
            
        }
    
        if ( count($_POST['position']) && $_POST["position"] && trim($_POST["position"])  ) 
            $position= trim(htmlspecialchars($_POST["position"]));
        else 
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
        if ( count($_POST['additionalLinks']) && $_POST["additionalLinks"] && trim($_POST["additionalLinks"])  ) {
            $additionalLinks=  trim(htmlspecialchars($_POST["additionalLinks"]));        
            if(strlen($additionalLinks) > 500)
                $errors["additionalLinks"] = "Max. Groesse 500 Zeichen.";
        }
    
        
            
        // 500 max length
        if ( count($_POST['additionalTitle']) && $_POST["additionalTitle"] && trim($_POST["additionalTitle"])  ) {
            $additionalTitle=  trim(htmlspecialchars($_POST["additionalTitle"]));        
            if(strlen($additionalTitle) > 127)
                $errors["additionalLinks"] = "Max. Groesse 127 Zeichen.";
        }
      
           

        // 500 max length
        if ( count($_POST['activities']) && $_POST["activities"] ) {
            $activities=  trim(htmlspecialchars($_POST["activities"]));        
            if(strlen($activities) > 500)
                $errors["activities"] = "Max. Groesse 500 Zeichen.";
        }
        

        // 500 max length
        if ( count($_POST['fieldsOfResearch']) && $_POST["fieldsOfResearch"] ) {
            $fieldsOfResearch=  trim(htmlspecialchars($_POST["fieldsOfResearch"]));        
            if(strlen($fieldsOfResearch) > 500)
                $errors["fieldsOfResearch"] = "Max. Groesse 500 Zeichen.";
        }
      

        
        if (count($_POST['newImage']) && $_POST["newImage"]){

        $imagePresent = false;
            
             
            $data = $_POST['newImage'];
            
            $type;
  
        
            if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
        
                    $data = substr($data, strpos($data, ',') + 1);
                    $type = strtolower($type[1]); 
        
                    if (!in_array($type, [ 'jpg', 'jpeg', 'png' ])) {
                        die(json_encode(array("Fehler"=>"Ungültiger Foto-Typ. Erlaubt sind jpg, jpeg und png")));
                    }
                    $imagePresent = true;
                    $data = str_replace( ' ', '+', $data );
                    $data = base64_decode($data);
                    if(!$data){
                        die(json_encode(array("Fehler" => "Fehler beim Lesen der Datei")));
                    }
                    // indicate approx. how many bytes takes the photo.
                    $size = (int)(strlen(rtrim($data, '=')) * 0.75); 
                    if($size > 1000000) // bigger than 1 MB
                    {
                        die(json_encode(array("Fehler"=>"Maximale Groesse betraegt 1 MB")));
                    }
                   
        
                   
                    // save image in a temporary folder as in "email.format"
                   if ( !file_put_contents($_ENV["TEMP_PHOTOS_DIR"].$email.".".$type, $data) )
                   {
                        die(json_encode(array("Fehler"=>"Email ist schon vergeben.")));
                   }
        
            } else {
                die(json_encode(array("Fehler"=>"Das Format der Datei ist ungueltig")));
            }
        }
           




            if(!count($errors)){

               $sql= "SELECT addressName FROM geoLocations WHERE lat=? AND lon=?";
               $stmt= $conn->prepare($sql);
               $stmt->execute([$lat, $lon]);
               $results= $stmt->fetch();
               $addressName= $results["addressName"];


                $file = file_get_contents($_ENV["ENTERIES_FILE"], true);
                $data = json_decode($file,true);
                unset($file);
                

                // check if email already exists and break when a duplicate has been found.
                for($i=0;$i<count($data);$i++){                  
                    if($_POST["email"] == $data[$i]["email"]){ 
                        $errors["emailDuplicate"] = "Email existiert schon";
                        die(json_encode($errors));
                    }
                }

                if($imagePresent)
                    $newImageSrc = $_ENV["TEMP_PHOTOS_DIR"].$email.".".$type;    

                $newUserId = count($data); 
                $newUserEntry = array(
                    "newUserId" => $newUserId,
                    "title" => $title,
                    "additionalTitle" => $additionalTitle,
                    "email" => $email,
                    "public_email" => $publicEmail,
                    "firstname" => $firstname,
                    "lastname" => $lastname,
                    "website" => $website,
                    "tel" => $tel,
                    "activities" => $activities,
                    "lat" => $lat,
                    "lon" => $lon,
                    "addressName"=> $addressName,
                    "keywords" => $keywords,
                    "additionalLinks" => $additionalLinks,
                    "fieldsOfResearch"=> $fieldsOfResearch,
                    "position" => $position,
                    "newImage" => $newImageSrc
                );

                $data[] = $newUserEntry;
            
                $result=json_encode($data);
                if(!file_put_contents($_ENV["ENTERIES_FILE"], $result)){
                    unset($result);
                    die(json_encode(["Fehler"=> "Ein Fehler ist aufgetreten"]));
                }

                unset($result);
                echo "1";
                    
                
            }else{
                $myErrors = [];
                foreach($errors as $error){
                    $myErrors["Fehler"] = $error . " ";
                }
                echo json_encode($myErrors);
            
            }
        }else{
            echo "LEERE EINGABE";
        }


?>



