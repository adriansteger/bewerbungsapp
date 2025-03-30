<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

// Set CORS and headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Secret key for JWT encoding
$secret_key = "YOUR_SECRET_KEY";
$issuer_claim = "http://vernoh.com";
$audience_claim = "http://vernoh.com";
$issuedat_claim = time();
$expire_claim = $issuedat_claim + 3600;

// Dummy users (replace with database verification)
$users = [
    "exampleUser" => "password123",
    "testUser" => "test123"
];

// Get POST data
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["message" => "Username and password are required."]);
    exit();
}

$username = $data->username;
$password = $data->password;

// Check if user exists and password is correct
if (!isset($users[$username]) || $users[$username] !== $password) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid username or password."]);
    exit();
}

// Generate JWT if login is successful
$token = array(
    "iss" => $issuer_claim,
    "aud" => $audience_claim,
    "iat" => $issuedat_claim,
    "nbf" => $issuedat_claim,
    "exp" => $expire_claim,
    "data" => array(
        "username" => $username
    )
);

$jwt = JWT::encode($token, $secret_key, 'HS256');

echo json_encode([
    "message" => "Successful login.",
    "jwt" => $jwt,
    "expireAt" => $expire_claim
]);
?>
