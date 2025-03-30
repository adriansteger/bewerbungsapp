<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Content-Type: application/json");

$secret_key = getenv("JWT_SECRET_KEY");

// Get JWT from Authorization header
$headers = getallheaders();
$jwt = isset($headers['Authorization']) ? str_replace("Bearer ", "", $headers['Authorization']) : null;

if (!$jwt) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: No token provided."]);
    exit();
}

try {
    // Decode and verify JWT
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    echo json_encode(["message" => "Access granted!", "user" => $decoded->data->username]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Invalid token."]);
    exit();
}
?>
