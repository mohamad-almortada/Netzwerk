<?php



include_once '../db.php';


header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Accept');



$https = false;
$httpOnly = false;


$_POST = json_decode(file_get_contents("php://input"), true);

if(isset($_POST) && !empty($_POST)){
    
    $email = trim(htmlspecialchars($_POST['email']));
    $password = trim(htmlspecialchars($_POST['hashed_password']));
    $sql = "SELECT * FROM admins WHERE email=? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($email));
    $result = $stmt->fetch();
    if ($result && password_verify($password, $result["hashed_password"])){
            
            $adminId= $result["admin_id"];
            // if expire is unvalid get new cookie, otherwise deny access with a proper messege 
            // informing that another admin is logged in now for expire time.
           
            $sql = "SELECT expire FROM admins WHERE admin_id= ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$adminId]);
            $results = $stmt->fetch();
            if(count($results)){
            
                // 30 min still not passed
                if($results['expire'] > date('Y-m-d H:i:s', time()) ){
                    die(json_encode("Eine andere Administration ist momentan eingeloggt."));
                }

            // grant access because no one is logged-in.
            $cookie = bin2hex(random_bytes(8));
            $hasedSession = password_hash($cookie, PASSWORD_DEFAULT);

            // store cookie in the db
            $sql = "UPDATE admins SET hashed_token= ? WHERE admin_id= ?";
            $stmt = $conn->prepare($sql);

            if(!$stmt->execute([$hasedSession, $adminId ])) 
                die("Error");

                    // update expire time for this session cookie in db.
                    $sql = "UPDATE admins SET expire= DATE_ADD(current_timestamp, INTERVAL 30 MINUTE) WHERE admin_id= ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute([$adminId]);        
                   
                    // send cookie back to the client.
                    setcookie('PHPSESSID', $cookie, time() + 1800, '/', '', false, true);

                    // add another cookie: double submit cookie to mitgate csrf attack
                    //   on client: axios.defaults.headers.post['X-CSRF-Token'] = res.data;
                    $csrfCookie = bin2hex(random_bytes(8));
                    setcookie('csrf', $csrfCookie, time() + 1800, '/', '', false, true);
                    $sendCsrfCookie = ["anti_csrf"=> $csrfCookie];                    
                    echo json_encode($sendCsrfCookie);

            }else{
                echo json_encode("Error");
            }

           

           
   
        }  else{
                die("E-Mail oder Passwort falsch");
        // http_response_code(400);
        }

}else{
    
    die("Leere Eingabe");
    // http_response_code(400);
}


$conn = null;
?>