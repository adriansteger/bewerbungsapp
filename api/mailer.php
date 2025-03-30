<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Erlaube Anfragen von beliebigen Ursprüngen
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Secret Key für JWT-Verifizierung
$secret_key = getenv("JWT_SECRET_KEY");


// Authorization-Header abrufen
$headers = getallheaders();
$jwt = isset($headers['Authorization']) ? str_replace("Bearer ", "", $headers['Authorization']) : null;

if (!$jwt) {
    http_response_code(401);
    echo json_encode(["sent" => false, "message" => "Unauthorized: No token provided"]);
    exit();
}

// JWT validieren
try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    $username = $decoded->data->username; // Falls nötig für Logging oder Personalisierung
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["sent" => false, "message" => "Unauthorized: " . $e->getMessage()]);
    exit();
}

// JSON-Daten empfangen
$rest_json = file_get_contents("php://input");
$data = json_decode($rest_json, true);

// Überprüfen, ob alle benötigten Felder vorhanden sind
if (empty($data['bewerbender']) || empty($data['beruf'])) {
    http_response_code(400);
    echo json_encode(["sent" => false, "message" => "Missing required fields."]);
    exit();
}

// HTTP-Status 200 OK setzen
http_response_code(200);

// E-Mail-Daten zusammenstellen
$subject = $data['bewerbender'];
$to = ""; // Hier die Zieladresse einfügen
$from = ""; // Deine Absenderadresse

// Nachricht erstellen
$msg = $data['beruf'] . " " . ($data['jobbeschreibung'] ?? "") . " " . ($data['geschlecht'] ?? "") . " " . ($data['nachname'] ?? "");

// Header für die E-Mail setzen
$headers_mail = "MIME-Version: 1.0\r\n";
$headers_mail .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_mail .= "From: <" . $from . ">";

// E-Mail versenden
$mail_sent = mail($to, $subject, $msg, $headers_mail);

echo json_encode([
    "sent" => $mail_sent,
    "message" => $mail_sent ? "Mail successfully sent." : "Mail sending failed."
]);
?>
