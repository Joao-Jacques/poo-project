import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });
// ---------------------------------------------
export class Ferramenta {
	#nome;

	constructor(nome) {
		validate(nome, "String");
		this.#nome = nome;
	}

	get nome() {
		return this.#nome;
	}

	usar() {
		return true;
	}
}

export class Mochila {
	#ferramentas;
	#limite;

	constructor(limite = 3) {
		this.#ferramentas = [];
		this.#limite = limite;
	}

	guarda(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (this.#ferramentas.length >= this.#limite) {
			throw new Error(`A mochila está cheia! Limite de ${this.#limite} itens.`);
		}
		this.#ferramentas.push(ferramenta);
	}

	pega(nomeFerramenta) {
		validate(arguments, ["String"]);
		let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
		return ferramenta;
	}

	tem(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	remover(nomeFerramenta) {
		validate(arguments, ["String"]);
		const idx = this.#ferramentas.findIndex(f => f.nome === nomeFerramenta);
		if (idx !== -1) {
			this.#ferramentas.splice(idx, 1);
			return true;
		}
		return false;
	}

	inventario() {
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}

// ---------------------------------------------
export class Objeto {
	#nome;
	#descricaoAntesAcao;
	#descricaoDepoisAcao;
	#acaoOk;

	constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
		validate(arguments, ["String", "String", "String"]);
		this.#nome = nome;
		this.#descricaoAntesAcao = descricaoAntesAcao;
		this.#descricaoDepoisAcao = descricaoDepoisAcao;
		this.#acaoOk = false;
	}

	get nome() {
		return this.#nome;
	}

	get acaoOk() {
		return this.#acaoOk;
	}

	set acaoOk(acaoOk) {
		validate(acaoOk, "Boolean");
		this.#acaoOk = acaoOk;
	}

	get descricao() {
		if (!this.acaoOk) {
			return this.#descricaoAntesAcao;
		} else {
			return this.#descricaoDepoisAcao;
		}
	}

	usa(ferramenta, objeto) {
	}
}
// ---------------------------------------------
export class Sala {
	#nome;
	#objetos;
	#ferramentas;
	#portas;
	#engine;

	constructor(nome, engine) {
		validate(arguments, ["String", Engine]);
		this.#nome = nome;
		this.#objetos = new Map();
		this.#ferramentas = new Map();
		this.#portas = new Map();
		this.#engine = engine;
	}

	get nome() {
		return this.#nome;
	}


	get objetos() {
		return this.#objetos;
	}

	get ferramentas() {
		return this.#ferramentas;
	}

	get portas() {
		return this.#portas;
	}

	get engine() {
		return this.#engine;
	}

	objetosDisponiveis() {
		let arrObjs = [...this.#objetos.values()];
		return arrObjs.map(obj => obj.nome + ":" + obj.descricao);
	}

	ferramentasDisponiveis() {
		let arrFer = [...this.#ferramentas.values()];
		return arrFer.map(f => f.nome);
	}

	portasDisponiveis() {
		let arrPortas = [...this.#portas.values()];
		return arrPortas.map(sala => sala.nome);
	}

	pega(nomeItem) {
		validate(nomeItem, "String");
		let ferramenta = this.#ferramentas.get(nomeItem);
		if (ferramenta != null) {
			this.#engine.mochila.guarda(ferramenta);
			this.#ferramentas.delete(nomeItem);
			return true;
		}
		let objeto = this.#objetos.get(nomeItem);
		if (objeto != null) {
			this.#engine.mochila.guarda(objeto); // Você precisaria adaptar a mochila para aceitar objetos também!
			this.#objetos.delete(nomeItem);
			return true;
		}
		return false;
	}

	sai(porta) {
		validate(porta, "String");
		return this.#portas.get(porta);
	}

	textoDescricao() {
		let descricao = "Você está no " + this.nome + "\n";
		if (this.objetos.size == 0) {
			descricao += "Não há objetos na sala\n";
		} else {
			descricao += "Objetos: " + this.objetosDisponiveis() + "\n";
		}
		if (this.ferramentas.size == 0) {
			descricao += "Não há ferramentas na sala\n";
		} else {
			descricao += "Ferramentas: " + this.ferramentasDisponiveis() + "\n";
		}
		descricao += "Portas: " + this.portasDisponiveis() + "\n";
		return descricao;
	}

	usa(ferramenta, objeto) {
		return false;
	}
}
// ---------------------------------------------
//Exemplo de como pode ser a classe de controle do jogo
// ---------------------------------------------
export class Engine {
	#mochila;
	#salaCorrente;
	#fim;

	constructor() {
		this.#mochila = new Mochila();
		this.#salaCorrente = null;
		this.#fim = false;
		this.criaCenario();
	}

	get mochila() {
		return this.#mochila;
	}

	get salaCorrente() {
		return this.#salaCorrente;
	}

	set salaCorrente(sala) {
		validate(sala, Sala);
		this.#salaCorrente = sala;
	}

	indicaFimDeJogo() {
		this.#fim = true;
	}

	// Para criar um jogo deriva-se uma classe a partir de
	// Engine e se sobrescreve o método "criaCenario"
	criaCenario() { }

	// Para poder acionar o método "joga" deve-se garantir que 
	// o método "criaCenario" foi acionado antes
	joga() {
		let novaSala = null;
		let acao = "";
		let tokens = null;
		while (!this.#fim) {
			console.log("-------------------------");
			console.log(this.salaCorrente.textoDescricao());
			acao = prompt("O que voce deseja fazer? ");
			tokens = acao.split(" ");
			switch (tokens[0]) {
				case "fim":
					this.#fim = true;
					break;
				case "pega":
					try {
						if (this.salaCorrente.pega(tokens[1])) {
							console.log(`\n✅  ${tokens[1]} guardado!\n`);
						} else {
							console.log(`\n❌  Objeto ${tokens[1]} não encontrado.\n`);
						}
					} catch (e) {
						console.log(`\n❌ ${e.message}\n`);
					}
					break;
				case "remover":
					if (this.#mochila.remover(tokens[1])) {
						console.log(`\n🗑️  ${tokens[1]} removido da mochila.\n`);
					} else {
						console.log(`\n❌  ${tokens[1]} não está na mochila.\n`);
					}
					break;
				case "inventario":
					console.log("\n🧰 Ferramentas disponíveis para serem usadas: " + this.#mochila.inventario() + "\n");
					break;
				case "usa":
					if (this.salaCorrente.usa(tokens[1], tokens[2])) {
						console.log("\n✨ Ação realizada com sucesso!\n");
						if (this.#fim == true) {
							console.log("\n🏆 Parabéns, você venceu!\n");
						}
					} else {
						console.log(`\n❌ Não é possível usar ${tokens[1]} sobre ${tokens[2]} nesta sala\n`);
					}
					break;
				case "sai":
					novaSala = this.salaCorrente.sai(tokens[1]);
					if (novaSala == null) {
						console.log("\n❌ Sala desconhecida ...\n");
					} else {
						this.#salaCorrente = novaSala;
						console.log("\n🚪 Você mudou de sala!\n");
					}
					break;
				case "acusar":
					// Só pode acusar na Cripta Real e com a Pena da Verdade
					if (this.salaCorrente.nome === "Cripta_Real" && this.#mochila.tem("pena_verdade")) {
						if (tokens[1] && tokens[1].toLowerCase() === "capitao") {
							console.log("\n🏆 Parabéns! Você acusou corretamente o Capitão da Guarda e escapou do castelo!\n");
							this.#fim = true;
						} else {
							console.log("\n❌ Acusação incorreta. Sua alma foi aprisionada no castelo!\n");
							this.#fim = true;
						}
					} else if (this.salaCorrente.nome !== "Cripta_Real") {
						console.log("\n❌ Você só pode fazer a acusação final na Cripta Real!\n");
					} else if (!this.#mochila.tem("pena_verdade")) {
						console.log("\n❌ Você precisa da Pena da Verdade para acusar!\n");
					}
					break;
				default:
					console.log("Comando desconhecido: " + tokens[0]);
					break;
			}
		}
		console.log("Jogo encerrado!");
	}
}