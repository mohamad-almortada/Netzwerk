<?php

function validateCookie ($cookie, $csrfCookie, $conn){
    
  
    $sql = "SELECT hashed_token FROM admins WHERE admin_id=1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetch();

    if(!password_verify($cookie, $result["hashed_token"]) ) {
        return false;
    }

    // reset cookie time span to 30 min and adjust the expire attribute in db.
    setcookie('PHPSESSID', $cookie, time() + 1800, '/', '', false, true);
    setcookie('csrf', $csrfCookie, time() + 1800, '/', '', false, true);

    $sql = "UPDATE admins 
            SET expire= DATE_ADD(current_timestamp, INTERVAL 30 MINUTE) 
            WHERE admin_id = 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    return true;
}

?>