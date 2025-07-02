// Importa a classe principal do jogo, responsável por criar o cenário e controlar o fluxo.

import { JogoCastelo } from "./JogoCastelo.js";

console.log(`
    ============================================================
                        TUTORIAL DO JOGO
    ============================================================
    Comandos principais:
    - pega [item]         : pega um objeto ou ferramenta da sala (máx. 3 itens na mochila)
    - remover [item]      : remove um item da mochila (Cuidado, remover o item fará com que ele não possa mais ser usado!)
    - inventario          : mostra os itens na mochila
    - usa [item] [alvo]   : usa um item da mochila em um objeto da sala
    - sai [nome_sala]     : muda para outra sala conectada
    - acusar [nome]       : faz a acusação final (apenas na Cripta Real, com a Pena da Verdade)
    - fim                 : encerra o jogo

    Dicas:
    - Explore as salas, colete pistas e ferramentas.
    - Use as ferramentas nos objetos certos para avançar.
    - A mochila tem limite de 3 itens, remova itens se necessário.
    - Para vencer, chegue à Cripta Real com a Pena da Verdade e acuse o verdadeiro traidor.
    `);


console.log(`
    ============================================================
            🏰  O ÚLTIMO SUSPIRO DE LAUFEN  🏰
    ============================================================
    
    Você é Veritas, um historiador solitário fascinado pelo mistério do Castelo de Laufen,
    onde toda a família real desapareceu sem deixar vestígios.
    
    Dizem que um artefato mágico, o Coração de Ferro, guarda a essência de uma alma
    e o segredo da tragédia.
    
    Ao atravessar os portões do castelo, a porta se fecha atrás de você...
    
    Agora, para escapar, será preciso explorar as ruínas, coletar pistas e descobrir:
    >>> Quem foi o verdadeiro traidor da realeza?
    
    Encontre as pistas, use as ferramentas certas e, ao chegar à Sala do Trono com a Pena da Verdade, 
    faça a acusação correta para escapar com vida. Se errar, sua alma será aprisionada para sempre!
    
    ============================================================
                    Boa sorte, aventureiro!
    ============================================================
    `);

// Cria uma nova instância do jogo.
let jogo = new JogoCastelo();

// Inicia o loop principal do jogo, aguardando comandos do jogador.
jogo.joga();
