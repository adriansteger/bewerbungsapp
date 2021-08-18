<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
$rest_json = file_get_contents("php://input");
$data = json_decode($rest_json, true);
$_POST = $data['data'];
echo var_dump($_POST);
if(empty($_POST['bewerber']) && empty($_POST['beruf'])) die();

if($_POST){
    // set response code - 200 OK
    http_response_code(200);
    $subject = $_POST['bewerber'];
    $to = ""; // FILL EMAIL
    $from = '';

    // data
    $msg = $_POST['beruf'].
    $_POST['jobbeschreibung'].
    $_POST['geschlecht'].
    $_POST['nachname'];

    // headers

    $headers = "MIME-Version: 1.0\r\n";
    $headers.= "Content-type: text/html; charset=UTF-8\r\n";
    $headers.= "From: <".$from.">";
    mail($to, $subject, $msg, $headers);
    
    // echo json_encode($_POST);
    echo json_encode(array(
        "sent" => true
    ));

} else{
    // tell user about error
    echo json_encode(array(
        "sent" => false,
        "message" => "Ein Fehler ist aufgetreten"
    ));
}
?>