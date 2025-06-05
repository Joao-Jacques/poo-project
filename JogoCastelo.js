// Importa a Engine base e as classes de todas as salas do castelo.
import { Engine } from "./Basicas.js";
import { SaguaoPrincipal, SalaoBanquetes, Biblioteca, TorreAlquimista, AlaServos, CriptaReal } from "./SalasCastelo.js";

/**
 * JogoCastelo: classe principal do jogo.
 * Responsável por criar o cenário (todas as salas) e conectar as portas entre elas.
 * Herda de Engine, que controla o loop principal do jogo.
 */
export class JogoCastelo extends Engine {
    /**
     * criaCenario: instancia todas as salas e conecta as portas entre elas.
     * Define a sala inicial do jogo.
     */
    criaCenario() {
        // Instancia todas as salas, passando a referência da engine (this)
        const saguao = new SaguaoPrincipal(this);
        const banquete = new SalaoBanquetes(this);
        const biblio = new Biblioteca(this);
        const torre = new TorreAlquimista(this);
        const servos = new AlaServos(this);
        const cripta = new CriptaReal(this);

        // Conecta as portas entre as salas (bidirecional onde necessário)
        saguao.portas.set(banquete.nome, banquete);
        saguao.portas.set(biblio.nome, biblio);

        banquete.portas.set(saguao.nome, saguao);
        banquete.portas.set(servos.nome, servos);

        biblio.portas.set(saguao.nome, saguao);
        biblio.portas.set(torre.nome, torre);

        torre.portas.set(biblio.nome, biblio);

        servos.portas.set(banquete.nome, banquete);
        servos.portas.set(cripta.nome, cripta);

        cripta.portas.set(servos.nome, servos);

        // Define a sala inicial do jogo
        this.salaCorrente = saguao;
    }
}
