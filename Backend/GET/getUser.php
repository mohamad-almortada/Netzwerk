    <?php

require_once "../db.php";

   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");




    if(isset($_GET) && !empty($_GET) && trim(htmlspecialchars($_GET["userId"])) ){ 
        $userId = trim(htmlspecialchars($_GET["userId"]));
        
        $sql = "SELECT c.typ, c.addressName, a.*, k.keyword
        FROM geoLocations c 
        INNER JOIN users a ON c.lat = a.lat AND c.lon = a.lon 
        INNER JOIN user_keywords uk ON uk.user_id = a.user_id
        INNER JOIN keywords k ON uk.keyword_id = k.keyword_id
        WHERE a.user_id=?";
        // $result = $conn->query($sql)->fetchAll();



        $stmt = $conn->prepare($sql);
        $stmt->execute(array($userId));
        $results = $stmt->fetchAll();
        if(count($results) > 0){
            $keywords = [];
            for($i = 0; $i < count($results); $i++){
                $keywords[] = $results[$i]["keyword"];
            }

            $user= [
                
                "typ" => $results[0]["typ"],
                "addressName" => $results[0]["addressName"],
                "position" => $results[0]["position"],
                "firstname" => $results[0]["firstname"],
                "lastname" => $results[0]["lastname"],
                "image"=>$results[0]["profile_image_src"],
                "title" => $results[0]["title"],
                "additionalLinks" => $results[0]["additionalLinks"],
                "additionalTitle" => $results[0]["secondary_title"],
                "website" => $results[0]["website"],
                "tel" => $results[0]["tel"],
                "email" => $results[0]["email"],
                "publicEmail" => $results[0]["public_email"],
                "activities" => $results[0]["activities"],
                "fieldsOfResearch" => $results[0]["fieldsOfResearch"],
                "keywords" => $keywords
                ];
                echo json_encode($user);
            }
             
        else{
            http_response_code(404);
        }


     

    }else{
        echo "Leer.";
    }
    $conn = null;

    ?>
