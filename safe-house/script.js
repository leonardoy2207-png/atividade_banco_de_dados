// ===== MENU MOBILE =====
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("ativo");
});

// ===== FUNÇÕES AUXILIARES =====
function mostrarStatus(elemento, mensagem, ok) {
    elemento.textContent = mensagem;
    elemento.className = "status " + (ok ? "ok" : "erro");
}

function formatarData(dataISO) {
    // "2026-08-18" -> "18 de agosto de 2026"
    const [ano, mes, dia] = dataISO.split("-").map(Number);
    return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
        day: "numeric", month: "long", year: "numeric"
    });
}

// ===== SERVIÇOS (carrega do banco) =====
async function carregarServicos() {
    const area = document.getElementById("lista-servicos");
    try {
        const resp = await fetch("php/servicos_listar.php");
        if (!resp.ok) throw new Error();
        const servicos = await resp.json();

        area.innerHTML = "";
        servicos.forEach(function (s) {
            const div = document.createElement("div");
            div.className = "servico";

            const img = document.createElement("img");
            img.src = s.imagem;
            img.alt = s.titulo;

            const texto = document.createElement("div");
            texto.className = "servico-texto";

            const h3 = document.createElement("h3");
            h3.textContent = s.titulo;
            texto.appendChild(h3);

            [s.descricao1, s.descricao2].forEach(function (d) {
                if (d) {
                    const p = document.createElement("p");
                    p.textContent = d;
                    texto.appendChild(p);
                }
            });

            if (s.link_video) {
                const a = document.createElement("a");
                a.href = s.link_video;
                a.target = "_blank";
                a.textContent = "Ver vídeo sobre o serviço";
                texto.appendChild(a);
            }

            div.appendChild(img);
            div.appendChild(texto);
            area.appendChild(div);
        });
    } catch (e) {
        area.innerHTML = '<p class="centro">Não foi possível carregar os serviços.</p>';
    }
}

// ===== DEPOIMENTOS (carrega do banco) =====
async function carregarDepoimentos() {
    const area = document.getElementById("lista-depoimentos");
    try {
        const resp = await fetch("php/depoimentos_listar.php");
        if (!resp.ok) throw new Error();
        const lista = await resp.json();

        area.innerHTML = "";
        if (lista.length === 0) {
            area.innerHTML = '<p class="centro">Ainda não há depoimentos.</p>';
            return;
        }
        lista.forEach(function (d) {
            const div = document.createElement("div");
            div.className = "depoimento";

            const p = document.createElement("p");
            p.textContent = '"' + d.texto + '"';

            const strong = document.createElement("strong");
            strong.textContent = d.nome;

            const small = document.createElement("small");
            small.textContent = formatarData(d.data_criacao);

            div.appendChild(p);
            div.appendChild(strong);
            div.appendChild(small);
            area.appendChild(div);
        });
    } catch (e) {
        area.innerHTML = '<p class="centro">Não foi possível carregar os depoimentos.</p>';
    }
}

// ===== DEPOIMENTOS (envia novo para o banco) =====
const formDepoimento = document.getElementById("form-depoimento");
const depStatus = document.getElementById("dep-status");

formDepoimento.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
        const resp = await fetch("php/depoimentos_inserir.php", {
            method: "POST",
            body: new FormData(formDepoimento)
        });
        const dados = await resp.json();

        if (dados.sucesso) {
            mostrarStatus(depStatus, "Depoimento enviado, obrigado!", true);
            formDepoimento.reset();
            carregarDepoimentos(); // atualiza a lista
        } else {
            mostrarStatus(depStatus, dados.erro, false);
        }
    } catch (err) {
        mostrarStatus(depStatus, "Erro de conexão com o servidor.", false);
    }
});

// ===== CONTATO (envia para o banco) =====
const formContato = document.getElementById("form-contato");
const contatoStatus = document.getElementById("contato-status");

formContato.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
        const resp = await fetch("php/contato_inserir.php", {
            method: "POST",
            body: new FormData(formContato)
        });
        const dados = await resp.json();

        if (dados.sucesso) {
            mostrarStatus(contatoStatus, "Mensagem enviada! Entraremos em contato em breve.", true);
            formContato.reset();
        } else {
            mostrarStatus(contatoStatus, dados.erro, false);
        }
    } catch (err) {
        mostrarStatus(contatoStatus, "Erro de conexão com o servidor.", false);
    }
});

// ===== AO ABRIR A PÁGINA =====
carregarServicos();
carregarDepoimentos();
