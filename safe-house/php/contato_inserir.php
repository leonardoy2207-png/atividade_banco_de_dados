<?php
// Recebe o formulário de contato e grava na tabela "contatos"
require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "erro" => "Método não permitido."]);
    exit;
}

$nome     = trim($_POST["nome"] ?? "");
$email    = trim($_POST["email"] ?? "");
$mensagem = trim($_POST["mensagem"] ?? "");

if ($nome === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "erro" => "Preencha nome e um e-mail válido."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $mensagem);

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "erro" => "Erro ao salvar a mensagem."]);
}
$stmt->close();
$conn->close();
