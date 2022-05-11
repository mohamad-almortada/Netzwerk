<?php


require_once '../db.php';

   

header('Access-Control-Allow-Origin:'. $_ENV["FRONTEND_DOMAIN"]);
header("Access-Control-Allow-Methods: DELETE");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Anti-CSRF, Accept');


require_once 'validateCookie.php';

$csrfCookie = $_SERVER['HTTP_ANTI_CSRF'];
if($csrfCookie != $_COOKIE['csrf']){
    die(json_encode("Unauthorized"));
}


$verified = validateCookie($_COOKIE['PHPSESSID'], $_COOKIE['csrf'], $conn);
if(!$verified){
    die(json_encode("Unauthorized"));
}

$mfile = '../'.$_ENV['ENTERIES_FILE'];




$file = file_get_contents($mfile, true);
$data = json_decode($file,true);
unset($file);



    $id = trim(htmlspecialchars($_GET['userId'] ));

    if($id >=0 && $id <=count($data)){

        // the newImage attribute in the newUser.json file is stored like uploads/filename.png. Because we are in another directory we need to specify the path
       $imageSrc = "../". $data[$id]["newImage"];

        if(count($data) >= 2){
            array_splice($data, -count($data)+$id, 1);

            // adjust the newUserId attribute after deleting by decrementing one of every subsequent userId 
            for ($i =$id; $i<count($data);$i++){
                $data[$i]["newUserId"] -= 1;

            }
                   

        }else if(count($data) == 1){
            unset($data);
        }else{
            die(json_encode("Keine Daten zu bearbeiten."));
        }

                            
                    // $data = array_values($data);

                    $result=json_encode($data);
                    file_put_contents($mfile, $result);
                    unset($result);


                   
                    // remove Photo if exists
                    if (!file_exists($imageSrc)) 
                        die(json_encode("Foto Datei wurde nicht gefunden."));
                        
                    unlink($imageSrc);
                        

                  


                    
                    echo json_encode(["valid"=>true]);
            } else{
                echo "ID fehlerhaft. Der uebergebene ID liegt ausserhalb der Datei.";
            }
   

?>



