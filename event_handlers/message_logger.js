"use strict";

const chalk = require('chalk');

Object.defineProperty(module.exports, "__esModule", { value: true });

module.exports = {
file: 'message_logger.js',
eventNames: ['messages.upsert'],
desc: 'Handler para log de todas as mensagens',
tags: ['logger', 'messages'],
async start(bot, { messages }, ctx) {
for (const info of messages || []) {
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
if (!mensagem) continue;

const from = info.key.remoteJid;
const isGroup = from.endsWith("@g.us");
let sender;
if (isGroup) {
const participants = Object.keys(info.key).filter(k => k.startsWith("participant")).map(k => info.key[k]).filter(Boolean);
if (participants.length) {
sender = participants.find(p => p.includes("lid")) || participants[0];
};
} else {
sender = info.key.remoteJid;
};

const groupMetadata = isGroup ? await bot.groupMetadata(from) : null;
const groupName = isGroup ? groupMetadata.subject : "";

const timestamp = ctx.moment(info.messageTimestamp * 1000).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss");


const pushName = info.pushName || "Desconhecido";
const fromDisplay = isGroup
? `${groupName} (${from})`
: `Chat Privado (${from})`;
let messageType = "texto";
let displayBody = body;

if (info.message?.imageMessage) {
displayBody = info.message.imageMessage.caption || "[Imagem]";
messageType = "imagem";
} else if (info.message?.videoMessage) {
displayBody = info.message.videoMessage.caption || "[Vídeo]";
messageType = "vídeo";
} else if (info.message?.stickerMessage) {
displayBody = "[Sticker]";
messageType = "sticker";
} else if (info.message?.audioMessage) {
displayBody = "[Áudio]";
messageType = "áudio";
} else if (info.message?.contactMessage) {
displayBody = "[Contato]";
messageType = "contato";
} else if (info.message?.locationMessage) {
displayBody = "[Localização]";
messageType = "localização";
} else if (info.message?.documentMessage || info.message?.documentWithCaptionMessage?.message?.documentMessage) {
displayBody = info.message.documentMessage?.title || info.message.documentWithCaptionMessage?.message?.documentMessage?.title || "[Documento]";
messageType = "documento";
} else if (info.message?.buttonsMessage) {
displayBody = info.message.buttonsMessage.contentText || "[Mensagem com Botões]";
messageType = "botões";
} else if (info.message?.listMessage) {
displayBody = info.message.listMessage.description || "[Lista]";
messageType = "lista";
} else if (info.message?.reactionMessage) {
displayBody = "[Reação]";
messageType = "reação";
} else if (info.message?.pollCreationMessage) {
displayBody = "[Enquete]";
messageType = "enquete";
} else if (info.message?.viewOnceMessage) {
displayBody = "[Mensagem de Visualização Única]";
messageType = "viewOnce";
} else if (info.message?.extendedTextMessage) {
displayBody = info.message.extendedTextMessage.text || "[Texto Estendido]";
messageType = "texto";
} else if (info.message?.conversation) {
displayBody = info.message.conversation;
messageType = "texto";
} else {
displayBody = "[Tipo Desconhecido]";
messageType = "desconhecido";
}

const maxContentLength = 50;
if (displayBody.length > maxContentLength) {
displayBody = displayBody.slice(0, maxContentLength) + '...';
}
console.log(chalk.blue.bold('\n--- NOVA MENSAGEM RECEBIDA ---'));
console.log(chalk.gray('Data/Hora: ') + chalk.white(timestamp));
console.log(chalk.gray('Remetente: ') + chalk.white(`${pushName} (${sender})`));
console.log(chalk.gray('Origem: ') + chalk.white(fromDisplay));
console.log(chalk.gray('Tipo: ') + chalk.white(messageType));
console.log(chalk.gray('Conteúdo: ') + chalk.white(displayBody));
console.log(chalk.gray('-----------------------------'));
}
}
};