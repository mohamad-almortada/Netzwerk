<?php 

require_once 'db.php';

   
header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods:  POST");
header("Access-Control-Allow-Headers: Content-Type");



function sendEmail($userEmail, $token, $firstname, $lastname, $title)
{
       
        
    $subject = 'NeDiChe | Profil Abändern';


    $body = '<!DOCTYPE html>
    <html lang="de">

    <head>
    <meta charset="UTF-8">
    <title>Profil Abändern</title>
    <style>
        .container{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        div{
            background-color: #d7fcae;
            border-radius:  22px;
            margin: 0;
            padding: 0;
            align-items: center;
        }
    p{
        display: block;
        margin-left: 2%;
    }

        .token {
        margin: 10% 17% 10% 17%;
        padding: 2%;
        color: #FFFFFF;
        width: 70%;
        }
        
    
    </style>
    </head>

    <body>
    
    <div class="container">
        <div>
            <p>
                Sehr geehrte*r '.$title.' '.$firstname.' '.$lastname.',
            </p>
            <p>
            Sie haben eine Anfrage bzgl. Ihrem Profil bei NeDiChe geschickt. Anbei erhalten Sie ein einmaliges Passwort, um Ihr Profil ändern zu können.
        </p>
        <p>
            <strong>
                Haben Sie keine Anfrage geschickt? Dann ignorieren Sie bitte diese E-Mail
            </strong>
        </p>
     <div class="token">
    ';

    $sty = 'style= "background: #222; color: #FFFFFF;
    display: inline-block; 
    height: 40px;
    width: 20px;
    margin: 20px 20px 0 0;
    padding: 9px 13px 0 8px;"';

    for ($i = 0; $i <8; $i++){
    $body .= "<strong $sty>";
    $body .=  $token[$i] ;
    $body .= "</strong>";
    }
    $body .= '</div>
    </div>
    </div>
    </body>

    </html>'; 


    
    $headers = "From: ". $_ENV['NO_REPLY_EMAIL'] ."\r\n";
    $headers .= "Content-Type:text/html;charset=UTF-8" . "\r\n";


    if(!mail($userEmail, $subject, $body, $headers) ){
        http_response_code(500);
    }

}


// there are 3 scenarios: 
    /*
        ○ user's requests with an email that is not in the database will be declined.
        ○ users with unverified email: will be asked to verify their email before becoming a token via this email.
        ○ users with verified email become a token via email, this will be stored in the db with an expire of 60 minutes.
           When users enter this token within the 60 minutes they grant access to modify, otheriwse another token will be issued
           and send back with a new expire for next 60 minutes. ONCE the token has been used, it will be deleted as it is meant to be an otp.
    */ 





$_POST = json_decode(file_get_contents("php://input"), true);

if($_POST && count($_POST) && trim(htmlspecialchars($_POST["email"]))){
   
        
    $email = trim(htmlspecialchars($_POST["email"]));
        
    // get the user email is verified and the email is present
    // first case: check presence of the given email in db.
    $sql = "SELECT user_id, email, verified, firstname, lastname, title FROM users WHERE email= ?";
    $stmt= $conn->prepare($sql);
    $stmt->execute([$email]);
    $results = $stmt->fetchAll();
        
    if(count($results) ){
        // echo json_encode($results[0]['verified']);
        if ($results[0]['verified'] != 1 ){
            die(json_encode('Die E-Mail ist nicht verifiziert. Bitte, die E-Mail vor der Frist bestätigen.'));
        }
        //  generate an otp, store it, and send it via the email.
        
        try{

        
        // 3rd: 
        $userId = $results[0]["user_id"];
        $token = bin2hex(random_bytes(4));
        $expire = time() + 3600; // 60 minutes
        $expire = date('Y-m-d H:i:s', $expire);
        $tokenHashed = password_hash($token, PASSWORD_DEFAULT);

        $firstname= $results[0]["firstname"];
        $lastname= $results[0]["lastname"];
        $title= $results[0]["title"];
        
        
        // check if the token has already been sent
        $sql = "SELECT * FROM otps WHERE user_id=?";
        $stmt = $conn->prepare($sql);

        $stmt->execute([$userId]);
        $results = $stmt->fetchAll();   
        // echo json_encode($results);
        if(count($results)){
        

            $sql= "UPDATE otps SET otp=?, expire=? WHERE user_id=?";
            $stmt= $conn->prepare($sql);
            
            $stmt->execute([$tokenHashed, $expire, $userId]);
        } else{
            $sql = "INSERT INTO otps (otp, user_id, expire) 
            VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$tokenHashed, $userId, $expire]);
        }

   
    }catch(Exception $e){
        echo $e->getMessage();
    }


        sendEmail($email, $token, $firstname, $lastname, $title);

        echo json_encode(array("valid"=>"success"));
    } else{
        // second case: unverfied email will become a warning messege.
        echo json_encode("Die eingegebene E-Mail ist nicht eingetragen. Prüfen Sie bitte Ihre Eingabe.");
    }

} else {
    echo "Leer";
}



$conn = null;
?>