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
const { creategrupo } = require("../utils/grupo.js");
const config = lerConfig();
const numerodono = config.criadorNumber + "@s.whatsapp.net";
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
mentions,
BotNumber,
groupAdmins,
sender,
menc_jid,
normalizeJid,
config
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
//NÃO MEXER
// ===============================
// 1️⃣ Extrair texto da mensagem
// ===============================
let isCommand = false;
let comandoDigitado = "";
const comandoRaw = (mensagem.conversation || mensagem.extendedTextMessage?.text || "").trim();
if (!comandoRaw) continue; 

// ===============================
// 2️⃣ Detectar comando
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
// 3️⃣ Verificar comandos bloqueados
// ===============================
let bloqueados = [];
try {
bloqueados = JSON.parse(fs.readFileSync("../../Json/bloqueados.json", "utf-8"));
} catch (err) {
console.error("Erro ao ler bloqueados.json:", err);
bloqueados = [];
}

if (bloqueados.includes(comandoDigitado)) {
console.log(`🚫 Comando bloqueado: ${comandoDigitado}`);
await enviar("❌ Este comando foi bloqueado pelo meu dono.");
continue; // não executa nada
}

// ===============================
// 4️⃣ Executar comando
// ===============================
const encontrado = await executarComando(comandoDigitado);
if (!encontrado) {
console.log(`❌ Nenhum comando com nome "${comandoDigitado}" foi encontrado.`);
}



//NAOMEXER
} 
} 
}; 