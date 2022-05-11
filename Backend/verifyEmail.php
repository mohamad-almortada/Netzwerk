<?php


require_once 'db.php';

const APP_URL = 'http://localhost/auth';
const SENDER_EMAIL_ADDRESS = 'no-reply@uni-wuppertal.de';


function generate_activation_code(): string
{
    return bin2hex(random_bytes(16));
}


function send_activation_email(string $email, string $activation_code): void
{
    // create the activation link
    $activation_link = APP_URL . "/activate.php?email=$email&activation_code=$activation_code";

    $subject = 'NeDiChe | Bitte Profil Aktivieren';
    $message = <<<MESSAGE
            Sehr geehrte*r ---,
            Please click the following link to activate your account:
            $activation_link
            MESSAGE;
    $header = "From:" . SENDER_EMAIL_ADDRESS;

    mail($email, $subject, nl2br($message), $header);
}



 
function removeUnverifiedUsers(){
    $sql = "DELETE FROM users WHERE verified= 0 AND verify_expiry < CURRENT_TIMESTAMP";
    $stmt = $conn->prepare($sql);
    return $stmt->execute();
}


function activate_user(int $userId)
{
    $sql = 'UPDATE users SET verified= 1 WHERE id=?';
    $statement = $conn->prepare($sql);
    return $statement->execute([$userId]);
}


$conn = null;


// function delete_user_by_id(int $id, int $active = 0)
// {
//     $sql = 'DELETE FROM users
//             WHERE id =:id and active=:active';

//     $statement = $conn->prepare($sql);
//     $statement->bindValue(':id', $id, PDO::PARAM_INT);
//     $statement->bindValue(':active', $active, PDO::PARAM_INT);

//     return $statement->execute();
// }

// function find_unverified_user(string $activation_code, string $email)
// {

//     $sql = 'SELECT id, activation_code, activation_expiry < now() as expired
//             FROM users
//             WHERE active = 0 AND email=?';

//     $statement = $conn->prepare($sql);
//     $statement->execute($email);

//     $user = $statement->fetch();

//     if ($user) {
//         // when token is expired, delete the users with an unverified email 
//         if ((int)$user['expired'] === 1) {
//             delete_user_by_id($user['id']);
//             return null;
//         }
//         // verify the password
//         if (password_verify($activation_code, $user['activation_code'])) {
//             return $user;
//         }
//     }

//     return null;
// }



?>
