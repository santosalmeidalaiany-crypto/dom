// 1. SELECIONAR os elementos do DOM
const campo = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa() {
    const texto = campo.value.trim();

    // Validação: não deixar adicionar tarefa vazia
    if (texto === "") {
        mensagem.textContent = "Escreva algo antes de adicionar.";
        campo.focus();
        return;
    }
    mensagem.textContent = "";

    // CRIAR elementos novos
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto; 

    const botaoRemove = document.createElement("button");
    botaoRemove.textContent = "Remover";
    botaoRemove.className = "remover";
    botaoRemove.type = "button";
     
    // Montar a estrutura:
    li.appendChild(span);
    li.appendChild(botaoRemove);
    lista.appendChild(li);

    // Limpar o campo e voltar o foco para ele
    campo.value = "";
    campo.focus();

    atualizarContador();
}

// 3. FUNÇÃO que atualiza o texto do contador
function atualizarContador() {
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length;

    if (total === 0) {
        contador.textContent = "Nenhuma tarefa ainda.";
    } else {
        contador.textContent = `${feitas} de ${total} concluída(s).`;
    }
}

// 4. EVENTOS 

// Clique no botão "adicionar"
botao.addEventListener("click", adicionarTarefa);

// Aperta Enter no campo também adiciona
campo.addEventListener("keydown", (eventos) => {
    if (eventos.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegação de eventos
lista.addEventListener("click", (eventos) => {
    const alvo = eventos.target;
    const li = alvo.closest("li");
    if (!li) return;

    if (alvo.classList.contains("remover")) {
        li.remove(); // Remover do DOM
    } else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida"); // Alternar classe CSS
    }

    atualizarContador();
});