<?php

require_once "../db.php";
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");




$errors = [];
$error = false;


// get data in json and set the global post to it after decoding.
$_POST = json_decode(file_get_contents("php://input"), true);


// if post data already exists; reject.

if(isset($_POST) && !empty($_POST)){ 


    if ( !empty($_POST['addressName']) && isset($_POST["addressName"]) )
        $addressName = trim(htmlspecialchars($_POST["addressName"]));
    else 
            $error = true; 


            
    if ( !empty($_POST["lat"]) && isset($_POST["lat"]) ) 
        $longitude= trim(htmlspecialchars($_POST["lat"]));
    else 
        $errors["lat"] = "Latitude fehlt";
    if ( !empty($_POST['lon']) && isset($_POST["lon"]) ) 
        $latitude = trim(htmlspecialchars($_POST["lon"]));
    else 
        $errors["lon"] = "Longitude fehlt";

    if ( !empty($_POST['street']) && isset($_POST["street"]) ) 
        $street = trim(htmlspecialchars($_POST["street"]));
    else 
        $errors["street"] = "Strasse fehlt";

    if ( !empty($_POST['buildingNr']) && isset($_POST["buildingNr"]) ) 
        $buildingNr= trim(htmlspecialchars($_POST["buildingNr"]));
    else 
        $errors["buildingNr"] = "Hausnummer leer";

    if ( !empty($_POST['plz']) && isset($_POST["plz"]) ) 
        $plz= trim(htmlspecialchars($_POST["plz"]));


    if ( !empty($_POST['city']) && isset($_POST["city"]) )
        $city = trim(htmlspecialchars($_POST["city"]));
    else
        $errors["city"] = "Stadt fehlt";



    if ( !empty($_POST['typ']) && isset($_POST["typ"]) ) 
        $typ=  trim(htmlspecialchars($_POST["typ"]));
    else 
        $errors["typ"] = "Typ fehlt";

        if(!count($errors)){
        $address = [];
        $sql; 
        $stmt;

            if($plz != null){
                $sql = "SELECT * FROM geoLocations WHERE city=? AND street=? AND buildingNr=? AND plz IS NULL OR plz=?";
                $stmt= $conn->prepare($sql);
                $stmt->execute(array($city, $street, $buildingNr, $plz));
                 }else{
                     
                     $sql = "SELECT * FROM geoLocations WHERE city=? AND street=? AND  buildingNr=?";
                     $stmt= $conn->prepare($sql);
                     $stmt->execute(array($city, $street, $buildingNr));
                 }
                 
                    $results = $stmt->fetchAll();
                    // echo $results[1] . '\n';
                    if(count($results) > 0){

                        $address = ["addressName"=>$results[0]["addressName"], "lat"=>$results[0]["lon"],
                        "lon"=>$results[0]["lat"], "city"=>$results[0]["city"], "buildingNr"=>$results[0]["buildingNr"], 
                        "plz"=>$results[0]["plz"], "typ"=>$results[0]["typ"], "street"=>$results[0]["street"]];

                        echo json_encode($address);
                        exit;
                    }else{
                        // $address = $results[0];
                        $sql = "INSERT INTO geoLocations  (addressName, lat, lon, street, buildingNr, plz, city, typ) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                        $stmt = $conn->prepare($sql);
                        if($stmt->execute(array($addressName, $latitude, $longitude, $street, $buildingNr, $plz, $city, $typ))){

                            $address = ["addressName"=>$addressName, "lat"=>$longitude,
                            "lon"=>$latitude, "city"=>$city, "buildingNr"=>$buildingNr, 
                            "plz"=>$plz, "typ"=>$typ, "street"=>$street];
                            echo json_encode($address);
                
                        }else{
                            echo json_encode(array("Fehler"=>"Ein Fehler ist beim Abspeichern aufgetreten."));
                        }
                

                    }   
         

        }else{
            echo json_encode(array("Fehler"=>$errors));
        }

    }
    else{
        echo json_encode(array("Fehler" => "Eingabe fehlerhaft"));
    }



$conn = null;