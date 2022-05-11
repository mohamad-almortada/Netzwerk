<?php


require_once "../db.php";
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");







   

    if(isset($_GET) && !empty($_GET) && trim(htmlspecialchars($_GET["email"])) ){ 
        $email = trim(htmlspecialchars($_GET["email"]));
        
        $sql = "SELECT c.*, a.*, k.keyword
        FROM geoLocations c 
        INNER JOIN users a ON c.lat = a.lat AND c.lon = a.lon 
        INNER JOIN user_keywords uk ON uk.user_id = a.user_id
        INNER JOIN keywords k ON uk.keyword_id = k.keyword_id
        WHERE a.email=?";
        // $result = $conn->query($sql)->fetchAll();



        $stmt = $conn->prepare($sql);
        $stmt->execute(array($email));
        $results = $stmt->fetchAll();
        if(count($results) > 0){
            $keywords = [];
            for($i = 0; $i < count($results); $i++){
                $keywords[] = $results[$i]["keyword"];
            }

            $user= [
                
                "typ" => $results[0]["typ"],
                "position" => $results[0]["position"],
                "firstname" => $results[0]["firstname"],
                "lastname" => $results[0]["lastname"],
                "imageSrc"=>$results[0]["profile_image_src"],
                "title" => $results[0]["title"],
                "additionalLinks" => $results[0]["additionalLinks"],
                "additionalTitle" => $results[0]["secondary_title"],
                "website" => $results[0]["website"],
                "tel" => $results[0]["tel"],
                "email" => $results[0]["email"],
                "publicEmail" => $results[0]["public_email"],
                "activities" => $results[0]["activities"],
                "fieldsOfResearch" => $results[0]["fieldsOfResearch"],
                "keywords" => $keywords,
                
                "addressName" => $results[0]["addressName"],
                "lat" => $results[0]["lat"],
                "lon" => $results[0]["lon"],
                "street" => $results[0]["street"],
                "buildingNr" => $results[0]["buildingNr"],
                "plz" => $results[0]["plz"],
                "city" => $results[0]["city"],
                "typ" => $results[0]["typ"]
                ];
                echo json_encode($user);
            }
             
        else{
             die(json_encode("User wurde nicht gefunden."));
        }


      

    }else{
        echo "Leer.";
    }
    $conn = null;

    ?>
