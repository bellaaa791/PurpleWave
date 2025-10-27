// ==============================
//Créditos: Tokyo (DAKI INFOS)
// ==============================


/*
 * Se você clicou aqui é porque provavelmente já usou um bot de "case" e com um "index.js" de 20 mil linhas...
 * Eu sei, eu entendo você!
 * O que é melhor? Dar erro no seu play, você ir no arquivo "play.js" e corrigir
 * ou ir na linha 71023 do "index.js" e corrigir?
 *
 * Imagina se vc cola sua "case" errado e esquece de fechar
 * ou abrir um parênteses, uma chave...
 * Você põe o bot pra rodar, dá vários erros e você não sabe resolver...
 * Adivinha o que você faz?
 * Você volta "a index.js" pra que estava antes, não é verdade?
 *
 * É isso que não queremos! Queremos um código limpo, legível e de fácil manutenção!
 * Nós criamos código para humanos, não para máquinas, então, quanto mais simples, melhor!
 *
 * A partir de agora, vamos trocar a palavra "case" por "comando", ok? Vamos lá!
 *
 * ---------------- 🤖 ONDE ESTÃO OS COMANDOS? 🤖 ----------------
 *
 * Você encontra os comandos dentro da pasta "plugins"
 * Não entendeu? Vamos lá:
 *
 * Abra a pasta "plugins"
*
 * Perceba que dentro dela tem 7 pastas:
 *
 * - 📁 adm
 * - 📁 dono
 * - 📁 downloads
 * - 📁 ferramentas
 * - 📁 ias
 * - 📁 menus
 * - 📁 pesquisas
 *
 * O nome das pastas já é auto explicativo
 *
 * ---------------- 🤖 ONDE MODIFICO O MENU? 🤖 ----------------
 *
 * Abra a pasta "plugins"
 * Vá no arquivo "menu.js" e edite o menu!
 * Só lembrando, faça tudo dentro das crases (`), pois é um template string!
 *
 * Não entendeu?
 * Veja:
 *
 * `Olá tudo bem?` - Isto está CORRETO ✅
 *
 * Olá `tudo bem?` - Isto está ERRADO (veja que o "Olá" está fora das crases) ❌
 *
 * ---------------- 🤖 COMO TROCO A FOTO DO BOT? 🤖 ----------------
 *
 * Liguei o bot e use o comando !fotomenu marcando a imagem
 * A troca é feita automáticamente 
 *
 * Créditos: Tokyo (DAKI INFOS)
 * Inspiração: Takeshi-bot
 *
 * Não modifique nada abaixo, a não ser que saiba o que está fazendo!
 */
 
const cfonts = require("cfonts");
const { mostrarMenu } = require("./utils");
const conectarBot = require("./connect");

cfonts.say("OBSIDIAN", {
font: "block",
align: "center",
colors: ["#a970ff", "#800080"],
background: "black",
letterSpacing: 1,
lineHeight: 1,
});

mostrarMenu(conectarBot);
