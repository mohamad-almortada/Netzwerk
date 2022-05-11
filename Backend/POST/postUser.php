<?php

require_once "../db.php";
   


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");





$errors = [];



// get data in json and set the global post to it after decoding.
$_POST = json_decode(file_get_contents("php://input"), true);


// if post data already exists; reject.

if(isset($_POST) && !empty($_POST)){ 


    if ( !empty($_POST['email']) && isset($_POST["email"]) && isset($_POST["verifyEmail"]) && !empty($_POST["verifyEmail"]) ){
        $email = $_POST["email"];
        $verifyEmail = $_POST["verifyEmail"];
        if($email != $verifyEmail ){
            $errors["email"] = "Die E-Mails stimmen nicht ueberein";
        }
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors["email"] = "E-Mail invalid";
        }
    }
    else 
            $errors["email"] = "Email oder Bestaetigung-Email ist leer"; 


            
    if ( !empty($_POST["lat"]) && isset($_POST["lat"]) ) 
        $latitude= $_POST["lat"];
    else 
    $errors["lat"] = "Lat ist leer";
    if ( !empty($_POST['lon']) && isset($_POST["lon"]) ) 
        $longitude = $_POST["lon"];
    else 
        $errors["lon"] = "lon ist leer";

    if ( !empty($_POST['firstname']) && isset($_POST["firstname"]) ) 
        $firstname = $_POST["firstname"];
    else 
        $errors["firstname"] = "firstname ist leer";

    if ( !empty($_POST['lastname']) && isset($_POST["lastname"]) ) 
        $lastname= $_POST["lastname"];
    else 
        $errors["lastname"] = "lastname ist leer";

    if ( !empty($_POST['website']) && isset($_POST["website"]) ) 
        $website= $_POST["website"];


    if ( !empty($_POST['tel']) && isset($_POST["tel"]) )
        $tel = $_POST["tel"];
   
    if ( !empty($_POST['title']) && isset($_POST["title"]) ) 
        $title=  $_POST["title"];
   
    if ( !empty($_POST['position']) && isset($_POST["position"]) ) 
        $position=  $_POST["position"];
    else 
        $errors["postion"] = "Position ist leer";

    if ( !empty($_POST['interests']) && isset($_POST["interests"]) ) {
        $interests=  $_POST["interests"];
        
    }
    else 
        $errors["interests"] = "Interesse fehlen";

        if(!count($errors)){
        
            // try{
                // echo json_encode(array($email, $title, $firstname, $lastname, $website, $tel, $latitude, $longitude, $position));


            // unique email
            $sql = 'SELECT * FROM users where email=? limit 1';
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($email));
            if($res= $stmt->fetch()){
                $errors["email"] .= "Diese E-Mail ist schon eingetragen.";
                die(json_encode($errors));
            }
            
            // Check if the lat and lon are present
                $sql = 'SELECT * FROM geoLocations where lat=? and lon=?';
                $stmt = $conn->prepare($sql);
                $stmt->execute(array($latitude,$longitude));
                $res = $stmt->fetchAll();
                if(count($res) == 0){
                    $errors["location"] = "Latitude and Longitude sind nicht in der Datenbank";
                    die(json_encode($errors));
                }
                
                $sql = "INSERT INTO users (email, title, firstname, lastname, website, tel, lat, lon, position) values (?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $inserted = $stmt->execute(array($email, $title, $firstname, $lastname, $website, $tel, $latitude, $longitude, $position));
                    
            
           
            // }catch(PDOException  $e){
            //     die("Error: ".$e->getMessage());
            // }
        
        
        // insert interests

        // $latsId = $conn->lastInsertId();
        // echo $conn->lastInsertId();

        // $sql = "SELECT LAST_INSERT_ID()";
        if($inserted){
            $sql = "SELECT user_id FROM users WHERE email=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($email));
            $lastId= $stmt->fetch()[0];
           
            // echo "Lastid: " . $lastId;


            $qMarks = str_repeat('?,', count($interests) - 1) . '?';
            
        $sql = "SELECT interest_id FROM interests WHERE interest IN  ($qMarks)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($interests);
        // $result = $conn->query($sql)->fetchAll();
        $results = $stmt->fetchAll();
        $sql = "INSERT INTo user_interests (user_id, interest_id) VALUES (?,?)";
        $stmt = $conn->prepare($sql);

        foreach ($results as $interest){
            echo $interest["interest_id"];
            try{

                $stmt->execute(array($lastId,  $interest["interest_id"]));
            }
            catch(PDOException $e){
                echo "ERROR: ".$e->getMessage();
            }

        }

        }
       

        // $lastId = $conn->query($sql)->fetch()[0];
        // echo "lastId: ".$lastId;
        
        // $sql = "SELECT DISTINCT interest_id FROM interests WHERE interest IN ?";
        // $stmt = $conn->prepare($sql);
        // $stmt->execute(array($interests));
        // $results = $stmt->fetchAll();
        // echo 'Results:';
        // echo json_encode($results);
        
        // $sql = "INSERT INTO user_interests (user_id, interest_id) VALUES (?,?)";
        // $stmt = $conn->prepare($sql);
        // foreach ($results as $interest){
        //     $stmt->execute(array($lastId, $interest));
        // }
        }
        else{
            echo json_encode($errors);
        }
    }
    else{
        echo "Fehler. Eingabe fehlerhaft";
    }



$conn = null;
?>