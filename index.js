// Importa a classe principal do jogo, responsável por criar o cenário e controlar o fluxo.
import { JogoCastelo } from "./JogoCastelo.js";

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
    
    Encontre as pistas, use as ferramentas certas e faça a acusação correta para escapar com vida...
    ou tenha sua alma aprisionada para sempre!
    
    ============================================================
                    Boa sorte, aventureiro!
    ============================================================
    `);

// Cria uma nova instância do jogo.
let jogo = new JogoCastelo();

// Inicia o loop principal do jogo, aguardando comandos do jogador.
jogo.joga();
