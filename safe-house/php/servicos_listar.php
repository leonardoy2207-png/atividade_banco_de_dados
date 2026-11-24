<?php
// Retorna os serviços gravados no banco
require "conexao.php";

$resultado = $conn->query("SELECT id, titulo, descricao1, descricao2, imagem, link_video FROM servicos ORDER BY id");

$lista = [];
if ($resultado) {
    while ($linha = $resultado->fetch_assoc()) {
        $lista[] = $linha;
    }
}
echo json_encode($lista);
$conn->close();
