# 🏰 O Último Suspiro de Laufen

Um adventure textual desenvolvido em **JavaScript**, como projeto da disciplina de **Programação Orientada a Objetos** (PUCRS).

---

## 🎭 História

Você é **Veritas**, um historiador solitário que encontra um antigo manuscrito sobre o Castelo de Laufen, um local há muito abandonado após o desaparecimento súbito de toda a família real. Intrigado por relatos de um artefato mágico conhecido como **O Coração de Ferro**, capaz de conter a essência de uma alma, você decide explorar o castelo em busca da verdade.

Logo ao entrar, a porta atrás de você se fecha sozinha. Para escapar e revelar o que realmente aconteceu, será preciso atravessar as ruínas do castelo, coletar pistas deixadas por antigos moradores e resolver um enigma central: **descobrir o verdadeiro traidor da realeza**

---

## 🧩 O Enigma

Cinco suspeitos surgem em manuscritos e anotações espalhadas pelo castelo:

* o conselheiro
* o capitão da guarda
* o alquimista
* a dama de companhia
* o próprio príncipe

Você deve coletar pistas para inocentar suspeitos.
**Pena da Verdade** é necessária para fazer acusações.
A sala final contém o artefato mágico, mas ele só se revela se o verdadeiro culpado for nomeado.
Se acusar a pessoa errada, o artefato se corrompe e aprisiona sua alma para sempre.


* O jogo termina em **vitória** ao descobrir corretamente o traidor e escapar com o Coração de Ferro.
* O jogo termina em **derrota** ao fazer uma acusação errada na Cripta Real.

---

## 🎯 Objetivo

Descobrir **quem traiu a família real** e escapar do castelo com o Coração de Ferro intacto.

---

## 🗺️ Mapa do Jogo

### 1. Saguão Principal

Vasta entrada coberta de poeira, tapeçarias desbotadas e o brasão da família Laufen rasgado ao meio.
Conexões: Biblioteca, Salão de Banquetes.
**Observação:** Ponto inicial do jogo. Contém o bilhete misterioso que dá contexto à tragédia.

### 2. Biblioteca Proibida

Estantes cobertas de livros antigos e documentos secretos; um cheiro de papel queimado paira no ar.
Conexões: Saguão Principal, Torre do Alquimista.
**Obstáculo:** Trancada, só pode ser aberta com a chave dourada (do Salão de Banquetes).
**Pista:** Carta entre o conselheiro e o alquimista, provando a inocência do conselheiro.

### 3. Torre do Alquimista

Sala circular com frascos quebrados e fórmulas nas paredes; um círculo de invocação foi desativado recentemente.
Conexão: Apenas pela Biblioteca.
**Obstáculo:** Escura, precisa da lanterna mágica para ser explorada.
**Pista:** Receita para poção da verdade usada pelo príncipe — inocentando-o.

### 4. Salão de Banquetes

Mesas postas como se um jantar fosse começar, mas tudo está empoeirado. Uma taça caída tem vestígios de veneno.
Conexões: Saguão Principal, Ala dos Servos.
**Item:** Chave dourada que abre a Biblioteca.
**Pista:** Diálogo escrito em guardanapo entre o capitão da guarda e a dama de companhia, indicando suspeita.

### 5. Ala dos Servos

Corredores apertados e quartos simples; um aposento parece ter sido saqueado às pressas.
Conexões: Salão de Banquetes, Cripta Real.
**Pista:** Diário da dama de companhia mostrando arrependimento — ela era cúmplice, mas não a mentora.

### 6. Cripta Real

Local sagrado sob o castelo. Estátuas guardam túmulos de pedra, e ao fundo há um pedestal com o Coração de Ferro.
Conexão: Apenas acessível pela Ala dos Servos.
**Final:** Aqui o jogador deve escolher quem acusar. Se errar, a alma de Veritas será aprisionada.

---

## 🔧 Comandos Disponíveis

* `pega <ferramenta>` — Guarda uma ferramenta da sala na mochila
* `usa <ferramenta> <objeto>` — Usa uma ferramenta da mochila sobre um objeto fixo na sala
* `sai <nome da sala>` — Move para a sala indicada
* `inventario` — Exibe as ferramentas atualmente na mochila
* `fim` — Encerra o jogo

---

## 🏆 Caminho Sugerido (Passo a Passo)

Digite os comandos a seguir, um de cada vez, para solucionar o enigma e vencer:

```
pega lanterna_magica
sai Salao_Banquetes
pega chave_dourada
sai Saguao_Principal
usa chave_dourada porta_biblioteca
sai Biblioteca
sai Torre_Alquimista
pega pena_verdade
sai Biblioteca
sai Saguao_Principal
sai Salao_Banquetes
sai Ala_Servos
sai Cripta_Real
usa pena_verdade capitao
```

---

## 📦 Dependências

* [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
* [bycontract](https://www.npmjs.com/package/bycontract)
* [prompt-sync](https://www.npmjs.com/package/prompt-sync)

Instale as dependências com:

```bash
npm install
```

---

## 🚀 Como Executar

1. Certifique-se de ter o Node.js instalado.
2. Baixe os arquivos do projeto.
3. Instale as dependências:

   ```bash
   npm install
   ```
4. Execute o jogo no terminal:

   ```bash
   node index.js
   ```
5. O jogo será iniciado diretamente no terminal.

---

## 🧠 Dicas

* Nem todas as ferramentas funcionam em todos os objetos.
* Algumas ferramentas têm uso limitado.
* Use a lanterna em objetos para revelar segredos.
* Leia as mensagens do console para entender o enredo e encontrar pistas.

---

## 📁 Estrutura dos Arquivos

```
.
├── index.js
├── Basicas.js
├── FerramentasCastelo.js
├── ObjetosCastelo.js
├── SalasCastelo.js
├── JogoCastelo.js
├── package.json
└── README.md
```

---

## 📚 Sobre o Projeto

Desenvolvido por João Jacques
para disciplina **Programação Orientada a Objetos** — PUCRS
