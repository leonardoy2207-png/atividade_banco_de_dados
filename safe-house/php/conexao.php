<?php
// Conexão com o MySQL (XAMPP: usuário root, senha vazia)
$host  = "localhost";
$user  = "root";
$senha = "";
$banco = "safe_house";

mysqli_report(MYSQLI_REPORT_OFF);
$conn = new mysqli($host, $user, $senha, $banco);

header("Content-Type: application/json; charset=utf-8");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "erro" => "Falha na conexão com o banco."]);
    exit;
}
$conn->set_charset("utf8mb4");
