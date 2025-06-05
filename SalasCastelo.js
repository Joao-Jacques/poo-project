import { Sala } from "./Basicas.js";
import { PortaBiblioteca, Guardanapo, EstanteSegredos, PoçãoSecreta, DiarioDama, EscuridaoTorre } from "./ObjetosCastelo.js";
import { LanternaMagica, ChaveDourada, CristalDecodificador, PenaVerdade } from "./FerramentasCastelo.js";

/**
 * Saguão Principal: sala inicial do jogo.
 * Permite pegar a lanterna mágica e destrancar a porta da Biblioteca com a chave dourada.
 */
export class SaguaoPrincipal extends Sala {
    constructor(engine) {
        super("Saguao_Principal", engine);
        this.ferramentas.set("lanterna_magica", new LanternaMagica());
        this.objetos.set("porta_biblioteca", new PortaBiblioteca());
    }
    /**
     * Controla a saída para outras salas, impedindo acesso à Biblioteca se a porta estiver trancada.
     */
    sai(porta) {
        if (porta === "Biblioteca") {
            const portaObj = this.objetos.get("porta_biblioteca");
            if (portaObj && portaObj.trancada) {
                console.log("A porta para a Biblioteca está trancada. Use a chave!");
                return null;
            }
        }
        return super.sai(porta);
    }
    /**
     * Permite usar a chave dourada para destrancar a porta da Biblioteca.
     */
    usa(ferramenta, objeto) {
        if (
            ferramenta === "chave_dourada" &&
            objeto === "porta_biblioteca" &&
            this.engine.mochila.tem("chave_dourada")
        ) {
            const porta = this.objetos.get("porta_biblioteca");
            const chave = this.engine.mochila.pega("chave_dourada");
            if (porta && chave && porta.usar(chave)) {
                console.log("Você destrancou a porta da Biblioteca!");
                return true;
            }
        }
        return false;
    }
}

/**
 * Salão de Banquetes: sala onde o jogador pode pegar a chave dourada e usar a lanterna mágica no guardanapo.
 */
export class SalaoBanquetes extends Sala {
    constructor(engine) {
        super("Salao_Banquetes", engine);
        this.ferramentas.set("chave_dourada", new ChaveDourada());
        this.objetos.set("guardanapo", new Guardanapo());
        this.portas.set("Saguao_Principal", null);
        this.portas.set("Ala_Servos", null);
    }

    /**
     * Permite usar a lanterna mágica no guardanapo para revelar uma pista.
     */
    usa(ferramenta, objeto) {
        if (
            ferramenta === "lanterna_magica" &&
            objeto === "guardanapo" &&
            this.engine.mochila.tem("lanterna_magica")
        ) {
            const guardanapo = this.objetos.get("guardanapo");
            const lanterna = this.engine.mochila.pega("lanterna_magica");
            if (guardanapo && lanterna && guardanapo.usar(lanterna)) {
                console.log("Com a luz da lanterna, você lê: 'Capitão e Dama discutiram fortemente durante o banquete. Ambos são suspeitos.'");
                return true;
            }
        }
        return false;
    }
}

/**
 * Biblioteca: sala onde o jogador pode pegar o cristal decodificador e usá-lo na estante para revelar a carta do conselheiro.
 */
export class Biblioteca extends Sala {
    constructor(engine) {
        super("Biblioteca", engine);
        this.ferramentas.set("cristal_decodificador", new CristalDecodificador());
        this.objetos.set("estante", new EstanteSegredos());
        this.portas.set("Saguao_Principal", null);
        this.portas.set("Torre_Alquimista", null);
    }

    /**
     * Permite usar o cristal decodificador na estante para revelar a inocência do conselheiro.
     */
    usa(ferramenta, objeto) {
        if (
            ferramenta === "cristal_decodificador" &&
            objeto === "estante" &&
            this.engine.mochila.tem("cristal_decodificador")
        ) {
            const estante = this.objetos.get("estante");
            const cristal = this.engine.mochila.pega("cristal_decodificador");
            if (estante && cristal && estante.usar(cristal)) {
                console.log("Você encontrou uma carta do conselheiro!\n Essa carta revela a inocência do conselheiro.");
                return true;
            }
        }
        return false;
    }
}

/**
 * Torre do Alquimista: sala onde o jogador pode pegar a pena da verdade, iluminar a torre e usar a pena na poção.
 */
export class TorreAlquimista extends Sala {
    constructor(engine) {
        super("Torre_Alquimista", engine);
        this.ferramentas.set("pena_verdade", new PenaVerdade());
        this.objetos.set("pocao", new PoçãoSecreta());
        this.objetos.set("escuridao_torre", new EscuridaoTorre());
        this.portas.set("Biblioteca", null);
    }

    /**
     * Permite usar a lanterna mágica para iluminar a torre e a pena da verdade na poção.
     */
    usa(ferramenta, objeto) {
        // Ilumina a torre
        if (
            ferramenta === "lanterna_magica" &&
            objeto === "escuridao_torre" &&
            this.engine.mochila.tem("lanterna_magica")
        ) {
            const escuridao = this.objetos.get("escuridao_torre");
            const lanterna = this.engine.mochila.pega("lanterna_magica");
            if (escuridao && lanterna && escuridao.usar(lanterna)) {
                console.log("Você iluminou a torre! Agora pode ver os objetos.");
                return true;
            }
        }
        // Usa a pena na poção
        if (
            ferramenta === "pena_verdade" &&
            objeto === "pocao" &&
            this.engine.mochila.tem("pena_verdade")
        ) {
            const pocao = this.objetos.get("pocao");
            const pena = this.engine.mochila.pega("pena_verdade");
            if (pocao && pena && pocao.usar(pena)) {
                console.log("A poção revela a inocência do príncipe!");
                return true;
            }
        }
        return false;
    }
}

/**
 * Ala dos Servos: sala onde o jogador pode usar a pena da verdade no diário da dama.
 */
export class AlaServos extends Sala {
    constructor(engine) {
        super("Ala_Servos", engine);
        this.objetos.set("diario_dama", new DiarioDama());
        this.portas.set("Salao_Banquetes", null);
        this.portas.set("Cripta_Real", null);
    }

    /**
     * Permite usar a lanterna mágica no diário da dama para revelar sua cumplicidade.
     */
    usa(ferramenta, objeto) {
        if (
            ferramenta === "lanterna_magica" &&
            objeto === "diario_dama" &&
            this.engine.mochila.tem("lanterna_magica")
        ) {
            const diario = this.objetos.get("diario_dama");
            const lanterna = this.engine.mochila.pega("lanterna_magica");
            if (diario && lanterna && diario.usar(lanterna)) {
                console.log("O diário revela: a dama é cúmplice, mas não a mentora do crime.");
                return true;
            }
        }
        return false;
    }
}

/**
 * Cripta Real: sala final onde o jogador pode acusar o capitão usando a pena da verdade.
 * Se acusar incorretamente, o jogo termina em derrota.
 */
export class CriptaReal extends Sala {
    constructor(engine) {
        super("Cripta_Real", engine);
        this.portas.set("Ala_Servos", null);
    }
    /**
     * Permite acusar o capitão usando a pena da verdade. Qualquer outra acusação resulta em derrota.
     */
    usa(ferramenta, objeto) {
        if (objeto === "capitao" && ferramenta === "pena_verdade" && this.engine.mochila.tem("pena_verdade")) {
            this.engine.indicaFimDeJogo();
            console.log("Você acusou o Capitão da Guarda! Vitória!");
            return true;
        }
        console.log("Acusação incorreta. Sua alma foi aprisionada no castelo!");
        this.engine.indicaFimDeJogo();
        return false;
    }
}
