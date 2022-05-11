<?php


require_once "../db.php";

   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");



// $_GET = json_decode(file_get_contents("php://input"), true);


// if post data already exists; reject.

if(isset($_GET) && !empty($_GET)){ 
   
    $firstname = $_GET["vorname"];
    $lastname = $_GET["nachname"];
    $addresse = $_GET["addresse"];
    
    $sql = "SELECT c.typ typ, c.addressName , a.position, a.firstname, a.lastname, a.user_id, a.title, a.email 
    FROM geoLocations c JOIN users a ON c.lat = a.lat and c.lon = a.lon
    WHERE a.firstname=? and a.lastname=? and c.addressName=?
    ORDER BY c.typ";
    // $result = $conn->query($sql)->fetchAll();

    $stmt = $conn->prepare($sql);
    $stmt->execute(array($userId));
    $results = $stmt->fetchAll();
    if(count($results) > 0){
        print json_encode($results); 
    }else{
        echo "User wurde nicht gefunden.";
    }


    // $sql = "SELECT * FROM geoLocatio"

}else{
    echo "Leer.";
}
$conn = null;

?>
