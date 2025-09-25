// ==============================
//Créditos: Tokyo (DAKI INFOS)
// Inspiração: Takeshi-bot
// ==============================

const readline = require("readline");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const configPath = path.join(__dirname, "./json/config.json");

function lerConfig() {
try {
const data = fs.readFileSync(configPath, "utf8");
return JSON.parse(data);
} catch (err) {
console.error("Erro ao ler config:", err);
return {};
}
}

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

function perguntar(texto) {
return new Promise((resolve) => rl.question(texto, resolve));
}

function mensagemSucesso(texto) {
const cores = ["\x1b[38;2;169;112;255m", "\x1b[38;2;128;0;128m"];
let resultado = "";
for (let i = 0; i < texto.length; i++) {
resultado += (i % 2 === 0 ? cores[0] : cores[1]) + texto[i];
}
resultado += "\x1b[0m";
console.log("\n" + resultado + "\n");
}

async function alterarApiKey() {
try {
const data = fs.readFileSync(configPath, "utf8");
const config = lerConfig()
const novaKey = await perguntar("Digite a nova API key: ");
config.apikey = novaKey;
fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
mensagemSucesso("API key atualizada com sucesso!");
} catch (err) {
console.error("Erro ao alterar API key:", err);
}
}

function mostrarSistema() {
console.log(`\nSistema: ${os.type()}`);
console.log(`Plataforma: ${os.platform()}`);
console.log(`Arquitetura: ${os.arch()}`);
console.log(`Usuário: ${os.userInfo().username}`);
}

function abrirLink(url) {
exec(`start ${url}`, (err) => {
if (err) console.error("Erro ao abrir o link:", err);
});
}

function abrirInstagram() {
abrirLink("https://www.instagram.com/obsidiaapis/");
}

function abrirYouTube() {
abrirLink("https://www.youtube.com/");
}

function abrirWhatsApp() {
abrirLink("https://wa.me/1234567890");
}

async function mostrarMenu(conectarBot) {
while (true) {

console.log("\n=== MENU ===");
console.log("1. Ver informações do sistema");
console.log("2. Configurar minha API key");
console.log("3. Iniciar bot");
console.log("4. Abrir canal no Instagram");
console.log("5. Abrir canal no YouTube");
console.log("6. Abrir canal no WhatsApp");
console.log("0. Sair");
const opcao = await perguntar("\nDigite a opção: ");
switch (opcao) {
case "1":
mostrarSistema();
break;
case "2":
await alterarApiKey();
break;
case "3":
try {
const sessionDir = path.join(__dirname, "sessoes");
const temSessao =
fs.existsSync(sessionDir) && fs.readdirSync(sessionDir).length > 0;

let numero = null;
if (!temSessao) {
numero = await perguntar(
"📲 Digite seu número (DDD + número, sem espaços, ex.: 553285076326): "
);
} else {
mensagemSucesso(
"Sessão encontrada, reconectando automaticamente..."
);
}

await conectarBot(numero);
mensagemSucesso("Bot iniciado! Ele está rodando em background...");
rl.close();
return;
} catch (err) {
console.error("❌ Erro ao iniciar o bot:", err.message);
console.error(
"[DEBUG] Detalhes do erro:",
JSON.stringify(err, null, 2)
);
rl.close();
process.exit(1);
}
case "4":
abrirInstagram();
break;
case "5":
abrirYouTube();
break;
case "6":
abrirWhatsApp();
break;
case "0":
mensagemSucesso("Saindo...");
rl.close();
return;
default:
mensagemSucesso("Opção inválida!");
}
}
}

module.exports = { mostrarMenu, mensagemSucesso };
