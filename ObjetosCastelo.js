import { Objeto, Ferramenta } from "./Basicas.js";
import { LanternaMagica, ChaveDourada, CristalDecodificador, PenaVerdade } from "./FerramentasCastelo.js";

/**
 * PortaBiblioteca: representa a porta trancada que separa o Saguão Principal da Biblioteca.
 * Só pode ser destrancada usando a Chave Dourada.
 */
export class PortaBiblioteca extends Objeto {
    constructor() {
        super("porta_biblioteca", "Uma grande porta trancada.", "A porta está aberta.");
        this.trancada = true;
    }
    /**
     * Permite destrancar a porta apenas com a chave dourada.
     * @param {Ferramenta} ferramenta - Ferramenta usada pelo jogador.
     * @returns {boolean} true se destrancou, false caso contrário.
     */
    usar(ferramenta) {
        if (ferramenta.nome === "chave_dourada") {
            this.trancada = false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

/**
 * EstanteSegredos: representa a estante da Biblioteca.
 * Só pode ser usada com o Cristal Decodificador para revelar a carta do conselheiro.
 */
export class EstanteSegredos extends Objeto {
    constructor() {
        super("estante", "Uma estante cheia de livros antigos.", "Você encontrou a carta do conselheiro!");
    }
    /**
     * Permite revelar o segredo da estante usando o Cristal Decodificador.
     * @param {Ferramenta} ferramenta
     * @returns {boolean}
     */
    usar(ferramenta) {
        if (ferramenta instanceof CristalDecodificador && ferramenta.usar()) {
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

/**
 * PoçãoSecreta: representa a poção misteriosa na Torre do Alquimista.
 * Só pode ser usada com a Pena da Verdade para revelar a inocência do príncipe.
 */
export class PoçãoSecreta extends Objeto {
    constructor() {
        super("pocao", "Um frasco misterioso na torre.", "A receita prova a inocência do príncipe.");
    }
    /**
     * Permite revelar o segredo da poção usando a Pena da Verdade.
     * @param {Ferramenta} ferramenta
     * @returns {boolean}
     */
    usar(ferramenta) {
        if (ferramenta instanceof PenaVerdade && ferramenta.usar()) {
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

/**
 * DiarioDama: representa o diário da dama na Ala dos Servos.
 * Só pode ser usado com a Pena da Verdade para revelar sua cumplicidade.
 */
export class DiarioDama extends Objeto {
    constructor() {
        super("diario_dama", "Diário fechado da dama.", "O diário revela arrependimento e cumplicidade, mas não a culpa.");
    }
    /**
     * Permite revelar o conteúdo do diário usando a Lanterna Mágica.
     * @param {Ferramenta} ferramenta
     * @returns {boolean}
     */
    usar(ferramenta) {
        if (ferramenta instanceof LanternaMagica && ferramenta.usar()) {
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

/**
 * EscuridaoTorre: representa a escuridão da Torre do Alquimista.
 * Só pode ser iluminada com a Lanterna Mágica.
 */
export class EscuridaoTorre extends Objeto {
    constructor() {
        super("escuridao_torre", "A torre está totalmente escura.", "A sala foi iluminada!");
        this.iluminada = false;
    }
    /**
     * Permite iluminar a torre usando a Lanterna Mágica.
     * @param {Ferramenta} ferramenta
     * @returns {boolean}
     */
    usar(ferramenta) {
        if (ferramenta instanceof LanternaMagica && ferramenta.usar()) {
            this.iluminada = true;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}

/**
 * Guardanapo: representa o guardanapo encontrado no Salão de Banquetes.
 * Só pode ser usado com a Lanterna Mágica para revelar uma pista sobre os suspeitos.
 */
export class Guardanapo extends Objeto {
    constructor() {
        super(
            "guardanapo",
            "Um guardanapo com escritas meio obscuras.",
            "Com a luz da lanterna, você lê: 'Capitão e Dama \n discutiram fortemente durante o banquete. \nAmbos são suspeitos.'"
        );
        this.revelado = false;
    }
    /**
     * Permite revelar a mensagem do guardanapo usando a Lanterna Mágica.
     * @param {Ferramenta} ferramenta
     * @returns {boolean}
     */
    usar(ferramenta) {
        if (ferramenta instanceof LanternaMagica && ferramenta.usar()) {
            this.revelado = true;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
