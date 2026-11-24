-- Banco de dados do site Safe House

CREATE DATABASE IF NOT EXISTS safe_house
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE safe_house;

-- CONTATOS (inserção) 
CREATE TABLE IF NOT EXISTS contatos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nome         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL,
  mensagem     TEXT,
  data_envio   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

--  DEPOIMENTOS (listagem + inserção) 
CREATE TABLE IF NOT EXISTS depoimentos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL,
  texto         TEXT NOT NULL,
  data_criacao  DATE NOT NULL DEFAULT (CURRENT_DATE)
) ENGINE=InnoDB;

INSERT INTO depoimentos (nome, texto, data_criacao) VALUES
('Carlos Mendes', 'A instalação foi rápida e muito bem organizada. As câmeras têm excelente qualidade e a inteligência artificial diferencia pessoas de outros movimentos. Agora consigo acompanhar minha casa pelo celular e me sinto muito mais seguro.', '2026-08-18'),
('Fernanda Oliveira', 'Contratamos a instalação de câmeras inteligentes para o nosso condomínio. A equipe explicou todo o funcionamento e os alertas em tempo real melhoraram bastante a segurança das entradas e da garagem.', '2026-07-07'),
('Ricardo Santos', 'O sistema instalado em minha loja superou as expectativas. A imagem é nítida mesmo à noite, e a inteligência artificial identifica movimentações suspeitas rapidamente.', '2026-05-22');

--  SERVIÇOS (listagem) 
CREATE TABLE IF NOT EXISTS servicos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(150) NOT NULL,
  descricao1  TEXT NOT NULL,
  descricao2  TEXT,
  imagem      VARCHAR(150) NOT NULL,
  link_video  VARCHAR(255)
) ENGINE=InnoDB;

INSERT INTO servicos (titulo, descricao1, descricao2, imagem, link_video) VALUES
('Câmera Analítica com Inteligência Artificial',
 'O objetivo é eliminar o estresse dos falsos alarmes. Você e nossa Central 24h passam a ser notificados apenas quando importa, antecipando ações contra intrusos antes que eles se tornem um risco.',
 'Pode operar de forma autônoma ou ser totalmente integrada a um sistema de alarme, com sensores de abertura e vibração.',
 'img/camera-seguranca.jpg', 'https://www.youtube.com/watch?v=C3bDzGk89lc'),
('Instalação de Reconhecimento Facial',
 'A tecnologia permite controlar o acesso de forma rápida e prática, identificando pessoas autorizadas sem a necessidade de chaves, cartões ou controles.',
 'Ajuda a reduzir o risco de acessos indevidos e proporciona mais comodidade para os moradores.',
 'img/reconhecimento-facial.jpg', 'https://youtu.be/cCp_eR1_5uA'),
('Monitoramento e Controle de Acesso',
 'Câmeras com IA instaladas em entradas, garagens e áreas comuns reforçam o controle de acesso, com gravação em nuvem e identificação automática de movimentações suspeitas.',
 'Tudo integrado à nossa Central 24h, que acompanha entradas e saídas em tempo real.',
 'img/controle-acesso.jpg', 'https://www.youtube.com/watch?v=C3bDzGk89lc');
