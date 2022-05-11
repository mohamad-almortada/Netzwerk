<?php


// require_once realpath(__DIR__ . "/vendor/autoload.php");
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();


function sendEmail($email, $token, $userId, $title, $firstname, $lastname){

    $FRONTEND_DOMAIN = $_ENV['FRONTEND_DOMAIN'];
    $subject = 'NeDiChe | Profil Aktivieren';
    $url = $FRONTEND_DOMAIN. "/"."email-bestaetigen/" . urlencode($token). "/"  .$userId;
    $NO_REPLY_EMAIL= $_ENV['NO_REPLY_EMAIL'];

    $body = '<!DOCTYPE html>
    <html lang="de">

    <head>
    <meta charset="UTF-8">
    <title>Profil Aktivierung</title>
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

        a {
        background: #b19e26;
        text-decoration: none;
        margin: 33%;
        padding: 2%;
        color: #FFFFFF;
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
            vielen Dank dafür, dass Sie sich bei NeDiChe registriert haben.
        </p>
        <p>
            Klicken Sie bitte auf dem Link, um Ihren Profil zu aktivieren
        </p>
        <p>
            Sie haben 30 Tage Zeit zur Aktivierung Ihres Profils. 
            <strong>
                Nicht-aktivierte Profile werden nach Fristende automatisch gelöscht
            </strong>
        </p>
        <a href='.$url.'>Profil Aktivieren</a>
        </div>
    </div>
    </body>

    </html>';


    $headers = "From: ". $NO_REPLY_EMAIL ."\r\n";
    $headers .= "Content-Type:text/html;charset=UTF-8" . "\r\n";

    if(!mail($email, $subject, $body, $headers) ){
        return false;
    }
    
    return true;
}







?>