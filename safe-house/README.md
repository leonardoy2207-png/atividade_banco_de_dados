
# Safe House - Avaliação A1.3

Site de segurança residencial integrado com PHP + MySQL.

## Seções com banco de dados
| Seção       | Tabela        | Funcionalidade      | PHP                                                         |
|-------------|---------------|---------------------|-------------------------------------------------------------|
| Contato     | `contatos`    | Inserção            | `php/contato_inserir.php`                                   |
| Depoimentos | `depoimentos` | Listagem + inserção | `php/depoimentos_listar.php`, `php/depoimentos_inserir.php` |
| Serviços    | `servicos`    | Listagem            | `php/servicos_listar.php`                                   |

O JavaScript (`script.js`) usa `fetch()` para chamar os arquivos PHP e atualizar a página.

## Como rodar (XAMPP)
1. Copie a pasta `safe-house` para `C:\xampp\htdocs\`.
2. Inicie **Apache** e **MySQL** no XAMPP.
3. No phpMyAdmin (`http://localhost/phpmyadmin`), aba **Importar**, selecione `banco/safe_house.sql`.
4. Acesse `http://localhost/safe-house/`.

Se seu MySQL tiver senha, ajuste `php/conexao.php`.
