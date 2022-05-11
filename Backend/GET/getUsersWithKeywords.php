<?php


require_once "../db.php";
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");






  
        
        $sql = "SELECT c.typ, c.addressName, a.*, k.keyword
        FROM geoLocations c 
        INNER JOIN users a ON c.lat = a.lat AND c.lon = a.lon 
        INNER JOIN user_keywords uk ON uk.user_id = a.user_id
        INNER JOIN keywords k ON uk.keyword_id = k.keyword_id";



        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll();

        if(count($results) > 0){

        $keywords = [];

        for($i = 0; $i < count($results); $i++){
            $iUserId = $results[$i]["user_id"];

            if($i ==0 || $results[$i]["user_id"] != $results[$i-1]["user_id"])
                $keywords[$iUserId] = $results[$i]["keyword"];
            
            else
                $keywords[$iUserId] .= ", " . $results[$i]["keyword"];
            
            }


            $users = [];
            for($i = 0; $i < count($results); $i++){
            
                if( $i==0 ||  $results[$i]["user_id"] != $results[$i-1]["user_id"])
        
                $users[] = [
                
                    "typ" => $results[$i]["typ"],
                    "addressName" => $results[$i]["addressName"],
                    "position" => $results[$i]["position"],
                    "firstname" => $results[$i]["firstname"],
                    "lastname" => $results[$i]["lastname"],
                    "image"=>$results[$i]["profile_image_src"],
                    "title" => $results[$i]["title"],
                    "additionalLinks" => $results[$i]["additionalLinks"],
                    "additionalTitle" => $results[$i]["secondary_title"],
                    "website" => $results[$i]["website"],
                    "tel" => $results[$i]["tel"],
                    "email" => $results[$i]["email"],
                    "publicEmail" => $results[$i]["public_email"],
                    "activities" => $results[$i]["activities"],
                    "fieldsOfResearch" => $results[$i]["fieldsOfResearch"],
                    "keywords" => $keywords
                    ];
            }

          
            
        
            // $user= [
                
            //     "typ" => $results[0]["typ"],
            //     "addressName" => $results[0]["addressName"],
            //     "position" => $results[0]["position"],
            //     "firstname" => $results[0]["firstname"],
            //     "lastname" => $results[0]["lastname"],
            //     "image"=>$results[0]["profile_image_src"],
            //     "title" => $results[0]["title"],
            //     "additionalLinks" => $results[0]["additionalLinks"],
            //     "additionalTitle" => $results[0]["secondary_title"],
            //     "website" => $results[0]["website"],
            //     "tel" => $results[0]["tel"],
            //     "email" => $results[0]["email"],
            //     "publicEmail" => $results[0]["public_email"],
            //     "activities" => $results[0]["activities"],
            //     "fieldsOfResearch" => $results[0]["fieldsOfResearch"],
            //     "keywords" => $keywords
            //     ];

                echo json_encode($users);
            }
             
        else{
            http_response_code(404);
        }


     

  
    $conn = null;

    ?>
