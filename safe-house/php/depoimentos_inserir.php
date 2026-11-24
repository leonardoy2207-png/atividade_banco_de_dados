<?php
// Recebe o formulário de depoimento e grava na tabela "depoimentos"
require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "erro" => "Método não permitido."]);
    exit;
}

$nome  = trim($_POST["nome"] ?? "");
$texto = trim($_POST["texto"] ?? "");

if ($nome === "" || $texto === "") {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "erro" => "Preencha nome e depoimento."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO depoimentos (nome, texto, data_criacao) VALUES (?, ?, CURDATE())");
$stmt->bind_param("ss", $nome, $texto);

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "erro" => "Erro ao salvar o depoimento."]);
}
$stmt->close();
$conn->close();
