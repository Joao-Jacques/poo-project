import { Ferramenta } from "./Basicas.js";

/**
 * LanternaMagica pode ser usada 3 vezes antes de acabar a energia.
 * Usada para revelar pistas em objetos escuros.
 */
export class LanternaMagica extends Ferramenta {
    constructor() {
        super("lanterna_magica");
        this.energia = 3;
    }
    usar() {
        if (this.energia > 0) {
            this.energia--;
            return true;
        }
        return false;
    }
}

/**
 * ChaveDourada só pode ser usada uma vez para destrancar portas.
 */
export class ChaveDourada extends Ferramenta {
    constructor() {
        super("chave_dourada");
        this.usada = false;
    }
    usar() {
        if (!this.usada) {
            this.usada = true;
            return true;
        }
        return false;
    }
}

/**
 * CristalDecodificador pode ser usado ilimitadamente.
 * Usado para decifrar pistas em objetos específicos.
 */
export class CristalDecodificador extends Ferramenta {
    constructor() {
        super("cristal_decodificador");
    }
    usar() { return true; }
}

/**
 * PenaVerdade pode ser usada apenas uma vez.
 * Usada para revelar verdades em objetos.
 */
export class PenaVerdade extends Ferramenta {
    constructor() {
        super("pena_verdade");
        this.usos = 1;
    }
    usar() {
        if (this.usos > 0) {
            this.usos--;
            return true;
        }
        return false;
    }
}
