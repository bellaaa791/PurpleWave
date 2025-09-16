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

var body =
info.message?.conversation ||
info.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
info.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
info.message?.imageMessage?.caption ||
info.message?.videoMessage?.caption ||
info.message?.extendedTextMessage?.text ||
info.message?.viewOnceMessage?.message?.videoMessage?.caption ||
info.message?.viewOnceMessage?.message?.imageMessage?.caption ||
info.message?.documentWithCaptionMessage?.message?.documentMessage
?.caption ||
info.message?.buttonsMessage?.imageMessage?.caption ||
info.message?.buttonsResponseMessage?.selectedButtonId ||
info.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
info.message?.templateButtonReplyMessage?.selectedId ||
info?.text ||
"";

const mensagem = info.message;
if (!mensagem || info.key.fromMe) return;

const from = info.key.remoteJid;
const isGroup = from.endsWith("@g.us");
const sender = isGroup ? info.key.participant : info.key.remoteJid;
const { lerConfig } = require("../config.js");
const config = lerConfig(); 
const numerodono = config.criadorNumber + "@s.whatsapp.net";
const dono = numerodono.includes(sender);
if (config.botoff && !dono) return;


const groupMetadata = isGroup ? await bot.groupMetadata(from) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";

function getGroupAdmins(participants) {
const admins = [];
for (let i of participants) {
if (i.admin === "admin" || i.admin === "superadmin")
admins.push(i.id);
}
return admins;
}

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
const isBot = (await bot.user.id.split(":")[0]) + "@s.whatsapp.net";
const BotNumber = bot.user.id.split(":")[0] + "@s.whatsapp.net";
const isGroupAdmins = groupAdmins.includes(sender) || false;
const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false;

const args = body.trim().split(/ +/).slice(1);
const qo = args.join(" ");
let nomety = Array.isArray(qo) ? q.join(" ") : qo;
const q = nomety;

const quoted =
info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const isImagem =
info.message?.imageMessage ||
info.message?.message?.imageMessage ||
quoted?.imageMessage ||
quoted?.message?.imageMessage;
const isVideo =
info.message?.imageMessage ||
info.message?.message?.videoMessage ||
quoted?.videoMessage ||
quoted?.message?.videoMessage;
const menc_prt =
info.message?.extendedTextMessage?.contextInfo?.participant;
const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net";
const menc_jid2 =
info.message?.extendedTextMessage?.contextInfo?.mentionedJid;
const sender_ou_n = q.includes("@") ? menc_jid : sender;
const mrc_ou_numero =
q.length > 6 && !q.includes("@")
? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
: menc_prt;
const menc_os2 = q.includes("@") ? menc_jid : menc_prt;

const nome = info.pushName || "";

const enviar = async (texto) => {
if (!texto) texto = "⚠ Nenhuma mensagem para enviar.";
await bot.sendMessage(from, { text: texto }, { quoted: info });
};

const enviarimg = async (imagem, desc) => {
bot.sendMessage(
from,
{ image: { url: imagem }, caption: desc },
{ quoted: info }
);
};

const enviarvideo = async (video, desc) => {
bot.sendMessage(
from,
{ video: { url: video }, caption: desc },
{ quoted: info }
);
};

const comando =
mensagem.conversation?.trim() ||
mensagem.extendedTextMessage?.text?.trim();
if (!comando) return;

let acao = comando;
if (config.prefixo) {
if (!comando.startsWith(config.prefix)) {
return;
}
acao = comando.slice(config.prefix.length).trim();
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
nomety,
q,
args,
isBot,
enviarimg,
enviarvideo,
body,
isImagem,
isVideo,
dono,
});



acao = acao.split(" ")[0];
const comandoDigitado = acao.toLowerCase();
console.log(`> 🔍 Procurando comando: ${comandoDigitado}`);

async function executarComando(comandoDigitado) {
try {
if (!ctx.fs.existsSync(ctx.pluginsDir)) {
console.log("⚠ Pasta plugins não encontrada:", ctx.pluginsDir);
return false;
}

const arquivosJs = ctx.puxararquivos(ctx.pluginsDir);

for (const file of arquivosJs) {
delete require.cache[require.resolve(file)];
const comandoModule = require(file);

if (!comandoModule.nomes || !comandoModule.run) continue;

const nomesValidos = Array.isArray(comandoModule.nomes)
? comandoModule.nomes.map((n) => n.toLowerCase())
: [comandoModule.nomes.toLowerCase()];

if (nomesValidos.includes(comandoDigitado.toLowerCase())) {
Object.assign(global, ctx);
await comandoModule.run();
console.log(
`✅ Comando executado: ${comandoDigitado} (arquivo: ${file})`
);
return true;
}
}

console.log(`⚠ Comando não encontrado: ${comandoDigitado}`);
return false;
} catch (err) {
console.error("❌ Erro ao executar comando:", err);
return false;
}
}

let encontrado = await executarComando(comandoDigitado);
if (!encontrado) {
console.log(
`❌ Nenhum comando com nome "${comandoDigitado}" foi encontrado.`
);
}
}
}
};