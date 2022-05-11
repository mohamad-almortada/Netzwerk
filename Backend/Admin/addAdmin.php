<?php


include_once '../db.php';

$email = trim(htmlspecialchars($_POST['email']));
$password= trim(htmlspecialchars($_POST['password']));
// $token = bin2hex(random_bytes(50)); 
$passwordHash = password_hash($password, PASSWORD_DEFAULT); 

// Check if email already exists
$sql = 'SELECT * FROM admins WHERE email=?';
$results = $conn->query($sql)->fetchAll();
if ($results->rowCount() > 0) {
    echo "Diese E-Mail existiert schon";
}
else{
$results = $stmt->fetch();

}
 
$sql= "INSERT INTO admins (email, hashed_password) VALUES (?,?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$email, $passwordHash]);


$conn = null;
?>