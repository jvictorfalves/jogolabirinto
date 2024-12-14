const fases = document.querySelectorAll(".fase");
    // Seleciona todas as fases do labirinto.

let faseAtual = 0;
    // Define a fase inicial como a primeira (índice 0).

let jogador; // Referência ao elemento jogador na fase atual.
let saida; // Referência ao elemento saída na fase atual.
let paredes; // Referência às paredes na fase atual.

let posicaoJogador = { x: 10, y: 10 };
    // Posição inicial do jogador dentro da fase.
const velocidade = 10;
    // Define a velocidade de movimento do jogador (em pixels).

// Função para exibir a fase atual
function exibirFase(faseIndex) {
    fases.forEach((fase, index) => {
        // Itera por todas as fases.
        fase.style.display = index === faseIndex ? "block" : "none";
            // Exibe somente a fase atual (esconde as demais).
    });

    // Atualiza as referências para a fase atual
    jogador = fases[faseIndex].querySelector("#jogador");
        // Seleciona o elemento jogador na fase atual.
    saida = fases[faseIndex].querySelector("#saida");
        // Seleciona o elemento saída na fase atual.
    paredes = fases[faseIndex].querySelectorAll(".parede");
        // Seleciona todas as paredes na fase atual.

    // Reseta a posição do jogador
    posicaoJogador = { x: 10, y: 10 };
        // Define a posição inicial do jogador.
    moverJogador();
        // Atualiza a posição visual do jogador.
}

// Movimentação
document.addEventListener("keydown", (e) => {
    // Adiciona um ouvinte de eventos para detectar teclas pressionadas.
    const tecla = e.key.toLowerCase();
        // Captura a tecla pressionada e converte para minúscula.

    switch (tecla) {
        case "w":
            posicaoJogador.y -= velocidade; // Move o jogador para cima.
            break;
        case "s":
            posicaoJogador.y += velocidade; // Move o jogador para baixo.
            break;
        case "a":
            posicaoJogador.x -= velocidade; // Move o jogador para a esquerda.
            break;
        case "d":
            posicaoJogador.x += velocidade; // Move o jogador para a direita.
            break;
    }

    moverJogador(); // Atualiza a posição do jogador na tela.
    verificarColisao(); // Verifica se o jogador colidiu com uma parede.
    verificarVitoria(); // Verifica se o jogador alcançou a saída.
});

function moverJogador() {
    // Atualiza visualmente a posição do jogador.
    jogador.style.top = posicaoJogador.y + "px";
    jogador.style.left = posicaoJogador.x + "px";
}


function verificarColisao() {
    // Verifica colisões entre o jogador e as paredes.
    paredes.forEach((parede) => {
        const rectParede = parede.getBoundingClientRect();
        const rectJogador = jogador.getBoundingClientRect();

        if (
            rectJogador.left < rectParede.right && // Verifica sobreposição lateral.
            rectJogador.right > rectParede.left &&
            rectJogador.top < rectParede.bottom && // Verifica sobreposição vertical.
            rectJogador.bottom > rectParede.top
        ) {
            alert("Você colidiu! Voltando para a Fase 1.");
            reiniciarJogo(); // Reinicia o jogo na Fase 1.
        }
    });

    verificarColisaoComBorda(); // Adiciona verificação da borda.
}

function verificarColisaoComBorda() {
    // Verifica se o jogador saiu dos limites do labirinto.
    const rectFase = fases[faseAtual].getBoundingClientRect();
    const rectJogador = jogador.getBoundingClientRect();

    if (
        rectJogador.left < rectFase.left || // Saiu pela esquerda.
        rectJogador.right > rectFase.right || // Saiu pela direita.
        rectJogador.top < rectFase.top || // Saiu pelo topo.
        rectJogador.bottom > rectFase.bottom // Saiu pela base.
    ) {
        alert("Você saiu da área do labirinto! Voltando para a Fase 1.");
        reiniciarJogo(); // Reinicia o jogo na Fase 1.
    }
}


function verificarVitoria() {
    // Verifica se o jogador alcançou a saída.
    const rectSaida = saida.getBoundingClientRect();
        // Obtém as dimensões da saída.
    const rectJogador = jogador.getBoundingClientRect();
        // Obtém as dimensões do jogador.

    if (
        rectJogador.left < rectSaida.right && // Verifica sobreposição lateral.
        rectJogador.right > rectSaida.left &&
        rectJogador.top < rectSaida.bottom && // Verifica sobreposição vertical.
        rectJogador.bottom > rectSaida.top
    ) {
        if (faseAtual === fases.length - 1) {
            // Verifica se é a última fase.
            alert("Parabéns! Você venceu todas as fases!");
                // Exibe uma mensagem de vitória.
            reiniciarJogo();
                // Reinicia o jogo.
        } else {
            faseAtual++;
                // Passa para a próxima fase.
            exibirFase(faseAtual);
                // Exibe a próxima fase.
        }
    }
}

function reiniciarJogo() {
    // Reinicia o jogo a partir da Fase 1.
    faseAtual = 0;
    exibirFase(faseAtual);
        // Exibe a primeira fase.
}

// Inicializa o jogo na Fase 1
exibirFase(faseAtual);
    // Chama a função para começar o jogo na Fase 1.
