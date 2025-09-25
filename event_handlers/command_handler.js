"use strict";
Object.defineProperty(module.exports, "__esModule", { value: true });
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
const jid = info.key.remoteJid || info.key.participant || info.key.lid?._serialized;

const isGroup = jid.endsWith('@g.us');
const from = isGroup ? jid : info.key.remoteJid;
let sender;
if (isGroup) {
sender = info.key.participant
? info.key.participant.lid?._serialized || info.key.participant
: from;
} else {
sender = from;
}

// ===============================
// Configurações e permissões
// ===============================
const { lerConfig, lergrupo, requisicaoComLimite } = require("../config.js");
const { creategrupo } = require("../utils/grupo.js");
const config = lerConfig();
const numerodono = config.criadorNumber + "@s.whatsapp.net";
const dono = sender === numerodono || info.key.fromMe;

if (config.botoff && !dono) continue;

const grupoConfig = isGroup ? lergrupo(from) : {};

if (grupoConfig.bangp && !dono) continue;

const groupMetadata = isGroup ? await bot.groupMetadata(from) : "";
const groupMembers = isGroup ? groupMetadata.participants : [];

function getGroupAdmins(participants) {
const admins = [];
for (const i of participants) {
if (i.admin === "admin" || i.admin === "superadmin") admins.push(i.id);
}
return admins;
}

function getMembros(participants) {
const membros = [];
for (const i of participants) if (!i.admin) membros.push(i.id);
return membros;
}

const somembros = isGroup ? getMembros(groupMembers) : [];
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
const BotNumber = bot.user.id.split(":")[0] + "@s.whatsapp.net";
const isGroupAdmins = groupAdmins.includes(sender);
const isBotGroupAdmins = groupAdmins.includes(BotNumber);

// ===============================
// Preparar argumentos
// ===============================
const args = body.trim().split(/ +/).slice(1);
const qo = args.join(" ");
const q = Array.isArray(qo) ? q.join(" ") : qo;

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

const menc_prt_raw = info.message?.extendedTextMessage?.contextInfo?.participant;
const menc_prt = menc_prt_raw?._serialized || menc_prt_raw || null;
const menc_jid = q.includes("@") ? q.replace("@", "") + "@s.whatsapp.net" : menc_prt;
const menc_os2 = menc_jid;

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
const mentionsList = users.map(u => u);
await bot.sendMessage(from, { text, mentions: mentionsList }, { quoted: quoted ? info : undefined });
}

let modobrincadeira = grupoConfig?.modobrincadeira;

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
requisicaoComLimite,
somembros,
modobrincadeira,
mentions
});

creategrupo();

// ===============================
// Função para executar comandos
// ===============================
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

// ===============================
// Detectar comando
// ===============================
 // ===============================
// 1️⃣ Extrair texto da mensagem
// ===============================
const comandoRaw =
mensagem.conversation?.trim() ||
mensagem.extendedTextMessage?.text?.trim();

// Se não tem texto, não faz absolutamente nada
if (!comandoRaw) continue;

// ===============================
// 2️⃣ Determinar se é comando
// ===============================
// ===============================
// 2️⃣ Determinar se é comando
// ===============================
let isCommand = false;
let acao = comandoRaw;
let comandoDigitado = "";

// BOT COM PREFIXO
if (config.prefixo && comandoRaw.startsWith(config.prefixo)) {
isCommand = true;
acao = comandoRaw.slice(config.prefixo.length).trim();
comandoDigitado = acao.split(" ")[0].toLowerCase();
}

// BOT SEM PREFIXO
else if (!config.prefixo) {
comandoDigitado = comandoRaw.split(" ")[0].toLowerCase();

const arquivosJs = ctx.puxararquivos(ctx.pluginsDir);
for (const file of arquivosJs) {
delete require.cache[require.resolve(file)];
const comandoModule = require(file);
if (!comandoModule.nomes || !comandoModule.run) continue;

const nomesValidos = Array.isArray(comandoModule.nomes)
? comandoModule.nomes.map(n => n.toLowerCase())
: [comandoModule.nomes.toLowerCase()];

if (nomesValidos.some(nome => comandoDigitado === nome)) {
isCommand = true;
break;
}
}
}

// ===============================
//  Se não for comando, ignora totalmente
// ===============================
if (!isCommand) continue;

// ===============================
// 4️⃣Só agora loga e executa
// ===============================
console.log(`> 🔍 Procurando comando: ${comandoDigitado}`);
const encontrado = await executarComando(comandoDigitado);
if (!encontrado) {
console.log(`❌ Nenhum comando com nome "${comandoDigitado}" foi encontrado.`);
}

} 
} 
}; 