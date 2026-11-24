<?php
// Retorna os depoimentos gravados no banco (mais recentes primeiro)
require "conexao.php";

$resultado = $conn->query("SELECT id, nome, texto, data_criacao FROM depoimentos ORDER BY data_criacao DESC, id DESC");

$lista = [];
if ($resultado) {
    while ($linha = $resultado->fetch_assoc()) {
        $lista[] = $linha;
    }
}
echo json_encode($lista);
$conn->close();
