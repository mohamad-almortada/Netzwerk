<?php 


require_once "../db.php";



$userId = $_GET['user_id'];



$sql = "SELECT a.public_email, a.title, a.title_secondary, a.firstname, a.lastname, a.website,
a.tel, a.activities, a.fieldsOfResearch, a.additionalLinks, b.addressName
FROM users a join geoLocations b on b.lat = a.lat AND b.lon = a.lon";
$user = $conn->query($sql)->fetchAll();

$sql2 = "SELECT k.keyword from keywords k WHERE k.keyword_id IN (
        SELECT keyword_Id FROM user_keywords WHERE user_id = ?)";

$stmt = $conn->prepare($sql2);
$stmt->execute(array($userId));
$keywords = $stmt->fetchAll();

$result = array(

    "publicEmail" => $user["public_email"],
    "title" => $user["title"],
    "titleSecondary" => $user["title_secondary"],
    "fistname" => $user["firstname"],
    "lastname" => $user["lastname"],
    "website" => $user["website"],
    "tel" => $user["tel"],
    "activities" => $user["activities"],
    "fieldsOfResearch" => $user["fieldsOfResearch"],
    "additionalLinks" => $user["additionalLinks"],
    "address" => $user["addressName"],
    "keywords" => $keywords

);


echo json_encode($result);      

$conn = null;
?>