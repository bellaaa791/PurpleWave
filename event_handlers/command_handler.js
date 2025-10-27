"use strict";
Object.defineProperty(module.exports, "__esModule", { value: true });
function normalizeJid(jid) {
if (!jid) return null;
let id = jid.replace(/:.*(?=@)/, ''); 
if (id.endsWith('@lid')) {
id = id.replace('@lid', '@s.whatsapp.net');
} else if (!id.endsWith('@s.whatsapp.net')) {
id += '@s.whatsapp.net';
}
return id;
}
module.exports = {
file: 'command_handler.js',
eventNames: ['messages.upsert'],
desc: 'Handler para processamento de comandos',
tags: ['commands', 'plugins'],


async start(bot, { messages }, ctx) {
for (const info of messages || []) {
ctx.info = info;

// ===============================
// Extrair texto da mensagem
// ===============================
const body =
info.message?.conversation ||
info.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
info.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
info.message?.imageMessage?.caption ||
info.message?.videoMessage?.caption ||
info.message?.extendedTextMessage?.text ||
info.message?.viewOnceMessage?.message?.videoMessage?.caption ||
info.message?.viewOnceMessage?.message?.imageMessage?.caption ||
info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption ||
info.message?.buttonsMessage?.imageMessage?.caption ||
info.message?.buttonsResponseMessage?.selectedButtonId ||
info.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
info.message?.templateButtonReplyMessage?.selectedId ||
info?.text ||
"";

const mensagem = info.message;
if (!mensagem) continue; 

// ===============================
// Remetente e grupo
// ===============================
const from = info.key.remoteJid || '';
const isGroup = from.includes('@g.us');
let participant = '';
if (info.key.participant) {
if (info.key.participant.includes('@s.whatsapp.net')) {
participant = info.key.participant;
} 
else if (info.key.participantPn) {
participant = info.key.participantPn;
} 
else {
participant = info.key.participant.includes(':')
? info.key.participant.split(':')[0] + '@s.whatsapp.net'
: info.key.participant + '@s.whatsapp.net';
}
} else {
participant = from; 
}

let sender = '';
if (info.key.participantPn) {
sender = normalizeJid(info.key.participantPn);
} 
else if (info.key.participant && info.key.participant.includes('@s.whatsapp.net')) {
sender = normalizeJid(info.key.participant);
} 
else if (info.key.participant) {
sender = normalizeJid(info.key.participant.split(':')[0] + '@s.whatsapp.net');
} 
else if (info.key.fromMe) {
sender = normalizeJid(bot.user?.id || bot.user?.lid?._serialized);
} 
else {
sender = normalizeJid(info.key.remoteJid);
}

// ===============================
// Configurações e permissões
// ===============================
const fs = require('fs');
const { lerConfig, lergrupo, requisicaoComLimite, getGrupoConfig } = require("../config.js");
const { creategrupo, registrarAluguel, listarAlugueis, apagarAluguel, adicionarMsgProgramada, gerarId } = require("../utils/grupo.js");
const config = lerConfig();
const numerodono = config.criadorNumber + "@s.whatsapp.net";
const version = config.version
const dono = sender === numerodono || info.key.fromMe;

let grupoConfig = {};

if (grupoConfig.bangp && !dono) continue;

const groupMetadata = isGroup ? await bot.groupMetadata(from) : "";
const groupMembers = isGroup ? groupMetadata.participants : [];
function getGroupAdmins(participants) {
return participants
.filter(p => p.admin === "admin" || p.admin === "superadmin")
.map(p => {

const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
return normalizeJid(jidReal);
});
}

function getMembros(participants) {
return participants
.filter(p => !p.admin)
.map(p => {
const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
return normalizeJid(jidReal);
});
}
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
const somembros = isGroup ? getMembros(groupMembers) : [];
const normalizedSender = normalizeJid(sender);
const BotNumber = normalizeJid(bot.user?.id || bot.user?.lid?._serialized);
if (isGroup && !groupAdmins.includes(BotNumber)) groupAdmins.push(BotNumber);

const isGroupAdmins = groupAdmins.includes(sender);
const isBotGroupAdmins = groupAdmins.includes(normalizeJid(bot.user?.id));//console.
// ===============================
// Preparar argumentos
// ===============================
const args = body.trim().split(/ +/).slice(1);
const qo = args.join(" ");
const q = Array.isArray(qo) ? q.join(" ") : qo;
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant;
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid;
const menc_os2 = q.includes("@") 
? (Array.isArray(menc_jid2) && menc_jid2.length > 0 ? menc_jid2[0] : null) 
: menc_prt;
const menc_jid = normalizeJid(menc_os2 || sender);
const sender_ou_n = q.includes("@") ? menc_jid2?.[0] : (menc_prt || sender);
const targetJid = normalizeJid(sender_ou_n);
 
 
const quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const isImagem =
info.message?.imageMessage ||
info.message?.message?.imageMessage ||
quoted?.imageMessage ||
quoted?.message?.imageMessage;
const isVideo =
info.message?.videoMessage ||
info.message?.message?.videoMessage ||
quoted?.videoMessage ||
quoted?.message?.videoMessage;

const nome = info.pushName || "";
// ===============================
// Funções de envio
// ===============================
const enviar = async (texto) => {
if (!texto) texto = "⚠ Nenhuma mensagem para enviar.";
await bot.sendMessage(from, { text: texto }, { quoted: info });
};

const enviarimg = async (imagem, desc, mentions = []) => {
await bot.sendMessage(from, { image: { url: imagem }, caption: desc, mentions }, { quoted: info });
};

const enviarvideo = async (video, desc) => {
await bot.sendMessage(from, { video: { url: video }, caption: desc }, { quoted: info });
};

async function mentions(text, users, quoted = false) {
if (!Array.isArray(users) || users.length === 0) return;
const mentionsList = users.map(u => normalizeJid(u));

await bot.sendMessage(from, { text, mentions: mentionsList }, { 
quoted: quoted ? info : undefined 
});
}

if (isGroup) {
grupoConfig = await getGrupoConfig(from); 
}
let modobrincadeira = grupoConfig.modobrincadeira;

const path = require("path");
const bloqueadosPath = path.join(__dirname, "..", "json", "bloqueados.json");

function carregarBloqueados() {
let bloqueados = [];
try {
if (fs.existsSync(bloqueadosPath)) {
const data = fs.readFileSync(bloqueadosPath, "utf-8");
bloqueados = JSON.parse(data);
} else {
console.warn("Arquivo bloqueados.json não encontrado. Criando um novo array vazio.");
}
} catch (err) {
console.error("Erro ao ler ou parsear bloqueados.json:", err);
bloqueados = [];
}
return bloqueados;
}


function adicionarBloqueado(id) {
const bloqueados = carregarBloqueados();

if (!bloqueados.includes(id)) {
bloqueados.push(id);
fs.writeFileSync(bloqueadosPath, JSON.stringify(bloqueados, null, 2), "utf-8");
console.log(`ID ${id} adicionado à lista de bloqueados.`);
} else {
console.log(`ID ${id} já está na lista de bloqueados.`);
}
}
const blockPath = path.join(__dirname, "..", "json", "central.json");

function carregarBlocks() {
let bloqueados = [];
try {
if (fs.existsSync(blockPath)) {
const data = fs.readFileSync(blockPath, "utf-8");
bloqueados = JSON.parse(data);
} else {
console.warn("Arquivo central.json não encontrado. Criando um novo array vazio.");
}
} catch (err) {
console.error("Erro ao ler ou parsear bloqueados.json:", err);
bloqueados = [];
}
return bloqueados;
}


function adicionarBlock(id) {
const bloqueados = carregarBlocks();

if (!bloqueados.includes(id)) {
bloqueados.push(id);
fs.writeFileSync(blockPath, JSON.stringify(bloqueados, null, 2), "utf-8");
console.log(`ID ${id} adicionado à lista de bloqueados.`);
} else {
console.log(`ID ${id} já está na lista de bloqueados.`);
}
}

//Adiciona palavra na lista de palavras proibidas
const pathkk = `./utils/json/grupos/${from}.json`;

function loadData() {
if (!fs.existsSync(pathkk)) {
fs.writeFileSync(pathkk, JSON.stringify({ antipalavra: false, palavras: [] }, null, 2));
}
return JSON.parse(fs.readFileSync(pathkk));
}
function saveData(data) {
fs.writeFileSync(pathkk, JSON.stringify(data, null, 2));
}
function addPalavra(palavra) {
let data = loadData();
palavra = palavra.toLowerCase();
if (data.palavras.includes(palavra)) {
enviar(`⚠️ A palavra "${palavra}" já existe na lista.`);
return false;
}
data.palavras.push(palavra);
saveData(data);
enviar(`✅ Palavra "${palavra}" adicionada.`);
return true;
}

//Remove palavra da lista de proibidas 
function removePalavra(palavra) {
let data = loadData();
palavra = palavra.toLowerCase();

if (!data.palavras.includes(palavra)) {
enviar(`⚠️ A palavra "${palavra}" não existe na lista.`);
return false;
}
data.palavras = data.palavras.filter(p => p !== palavra);
saveData(data);
enviar(`🗑️ Palavra "${palavra}" removida.`);
return true;
}

// Exibe as palavras da lista proibida
function listarPalavras() {
let data = loadData();

if (!data.palavras || data.palavras.length === 0) {
enviar("🚫 Nenhuma palavra proibida cadastrada.");
return [];
}

let msg = "📌 Lista de palavras proibidas\n";
data.palavras.forEach((p, i) => {
msg += `${i + 1}. ${p}\n`;
});

enviar(msg.trim());
return data.palavras;
}

// Apagar todas as palavras proibidas
function resetPalavras() {
let data = loadData();

if (!data.palavras || data.palavras.length === 0) {
enviar("🚫 Não há palavras proibidas para apagar.");
return false;
}

data.palavras = [];
saveData(data);

enviar("🗑️ Todas as palavras proibidas foram apagadas.");
return true;
}



Object.assign(ctx, {
info,
nome,
from,
isGroupAdmins,
enviar,
isGroup,
menc_os2,
isBotGroupAdmins,
q,
args,
isBot: BotNumber,
enviarimg,
enviarvideo,
body,
isImagem,
isVideo,
dono,
version,
requisicaoComLimite,
somembros,
modobrincadeira,
mentions,
BotNumber,
groupAdmins,
sender,
menc_jid,
normalizeJid,
config,
registrarAluguel,
listarAlugueis,
apagarAluguel,
adicionarMsgProgramada,
gerarId,
carregarBloqueados,
adicionarBloqueado,
carregarBlocks,
adicionarBlock,
numerodono,
addPalavra,
removePalavra,
listarPalavras,
resetPalavras,
lergrupo
});

creategrupo();

// ===============================
// Função para executar comandos
// ===============================

if (config.botoff && !dono) continue;
if (!isGroup && config.antipv && !dono) {
console.log(`🚫 Mensagem privada bloqueada de ${sender}`);
continue; 
}

async function executarComando(comandoDigitado) {
try {
if (!ctx.fs.existsSync(ctx.pluginsDir)) return false;
const arquivosJs = ctx.puxararquivos(ctx.pluginsDir);
for (const file of arquivosJs) {
delete require.cache[require.resolve(file)];
const comandoModule = require(file);
if (!comandoModule.nomes || !comandoModule.run) continue;

const nomesValidos = Array.isArray(comandoModule.nomes)
? comandoModule.nomes.map(n => n.toLowerCase())
: [comandoModule.nomes.toLowerCase()];

if (nomesValidos.includes(comandoDigitado.toLowerCase())) {
Object.assign(global, ctx);
await comandoModule.run();
console.log(`✅ Comando executado: ${comandoDigitado} (arquivo: ${file})`);
return true;
}
}
return false;
} catch (err) {
console.error("❌ Erro ao executar comando:", err);
return false;
}
}
//NÃO MEXER⬇️

// ===============================
//SISTEMA DE MENSAGENS AUTOMATICAS NO GRUPO 
// ===============================


async function processarMensagensProgramadas(bot) {
//console.log("🌐 Sistema de mensagens programadas iniciado");

const gruposDir = path.join(__dirname, "..", "utils", "json", "grupos");
if (!fs.existsSync(gruposDir)) {
console.warn("[AVISO] Diretório de grupos não encontrado.");
return;
}

const arquivos = fs.readdirSync(gruposDir).filter(f => f.endsWith(".json"));
for (const arquivo of arquivos) {
const filePath = path.join(gruposDir, arquivo);
const groupId = arquivo.replace(".json", "");

try {
let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
if (!Array.isArray(data.msgpeogramada)) data.msgpeogramada = [];

let modificou = false;

for (const msg of data.msgpeogramada) {
if (!msg.ultimaExecucao) msg.ultimaExecucao = null;
const ultima = msg.ultimaExecucao ? new Date(msg.ultimaExecucao).getTime() : 0;
const agora = Date.now();
if (agora - ultima >= msg.intervalo) {
try {
//console.log(`🚀 Enviando mensagem para ${groupId} (tipo: ${msg.tipo})`);
if (msg.tipo === "texto") {
if (!msg.conteudo) continue;
await bot.sendMessage(groupId, { text: String(msg.conteudo) });
} else if (msg.tipo === "imagem") {
if (!msg.conteudo?.url) {
console.warn(`[AVISO] Mensagem de imagem sem URL para ${groupId}`);
continue;
}
await bot.sendMessage(groupId, {
image: { url: msg.conteudo.url },
caption: msg.conteudo.caption || "",
});
}
msg.ultimaExecucao = new Date().toISOString();
msg.repeticoes = (msg.repeticoes || 0) + 1;
modificou = true;
console.log(`✅ Mensagem enviada para ${groupId} com sucesso`);
} catch (err) {
console.error(
`[ERRO] Falha ao enviar msg ${msg.id} para ${groupId}:`,
err.message
);
}
} else {
//const restante = msg.intervalo - (agora - ultima);
//console.log(`⏱ Mensagem ${msg.id} para ${groupId} ainda não pode ser enviada. Próximo envio em ${Math.ceil(restante / 1000)}s`);
}
}

if (modificou) {
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`[INFO] JSON do grupo ${groupId} atualizado`);
}
} catch (err) {
console.error(`[ERRO] Processando grupo ${groupId}:`, err.message);
}
}
}
processarMensagensProgramadas(bot)
// ==============================
// SISTEMA DE ALUGUEL
// ==============================
function verificarAlugueisExpirados() {
const alugueis = listarAlugueis();
const agora = new Date();
for (const groupId in alugueis) {
const aluguel = alugueis[groupId];
const expira = new Date(aluguel.expira);
if (agora >= expira) {
bot.sendMessage(numerodono, {
text: `⚠ Aluguel expirado!\n\n` +
`🏷️ Grupo: ${groupId}\n` +
`🔑 ID do aluguel: ${aluguel.id}\n` +
`📅 Expirou em: ${aluguel.expira}`
});
bot.sendMessage(groupId, {
text: `⚠ O aluguel deste grupo expirou!\n` +
`🔑 ID do aluguel: ${aluguel.id}\n` +
`📅 Expirou em: ${aluguel.expira}\n\n` +
`Entre em contato com o dono do bot para renovar.`
});
console.log(`[ALUGUEL] Aluguel do grupo ${groupId} expirou, dono e grupo notificados.`);
apagarAluguel(aluguel.id);
}
}
}
setInterval(verificarAlugueisExpirados, 60 * 1000);

// ===============================
// EXECUTAR COMANDOS
// ===============================
let isCommand = false;
let comandoDigitado = "";
const comandoRaw = (mensagem.conversation || mensagem.extendedTextMessage?.text || "").trim();
if (!comandoRaw) continue; 
// ===============================
// Detectar comando
// ===============================
if (config.usarprefixo) {
if (comandoRaw.startsWith(config.prefix)) {
const semPrefixo = comandoRaw.slice(config.prefix.length).trim();
if (semPrefixo) {
comandoDigitado = semPrefixo.split(/\s+/)[0].toLowerCase(); 
isCommand = true;
}
}
} else {
comandoDigitado = comandoRaw.split(/\s+/)[0].toLowerCase();
isCommand = true;
}
if (!isCommand) continue;

console.log(`> 🔍 Procurando comando: ${comandoDigitado}`);
// ===============================
//  Verificar comandos bloqueados
// ===============================
let bloqueados = [];
try {
bloqueados = require("../json/bloqueados.json");
} catch (err) {
console.error("Erro ao ler bloqueados.json:", err);
bloqueados = [];
}

if (bloqueados.includes(comandoDigitado)) {
console.log(`🚫 Comando bloqueado: ${comandoDigitado}`);
await enviar("❌ Este comando foi bloqueado pelo meu dono.");
continue; 
}

if (isGroup) {
const alugueis = listarAlugueis();
const aluguelAtivo = alugueis[from]; 

if (!aluguelAtivo && !dono) {
await bot.sendMessage(from, {
text: `⚠ O grupo não possui plano ativo!\nContate meu dono: wa.me/${config.criadorNumber}`
});
continue; 
}
}

// ===============================
// 4️⃣ Executar comando
// ===============================
const encontrado = await executarComando(comandoDigitado);
if (!encontrado) {
console.log(`❌ Nenhum comando com nome "${comandoDigitado}" foi encontrado.`);
}

//NAOMEXER⬆️
} 
} 
}; 