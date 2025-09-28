"use strict";

Object.defineProperty(module.exports, "__esModule", { value: true });

module.exports = {
file: 'anti_link.js',
eventNames: ['messages.upsert'],
desc: 'Handler para anti-link em grupos',
tags: ['anti-link', 'group'],
async start(bot, { messages }, ctx) {
const groupCache = {}; 

for (const info of messages || []) {
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

if (info.key.fromMe) return;


let groupMetadata;
try {
if (isGroup) {
if (groupCache[from]) {
groupMetadata = groupCache[from];
} else {
groupMetadata = await bot.groupMetadata(from);
groupCache[from] = groupMetadata; // salva no cache
}
}
} catch (e) {
console.log(`[ANTI-LINK] Não foi possível obter metadados do grupo ${from}: ${e.message}`);
continue; 
}

const groupMembers = groupMetadata?.participants || [];

function getGroupAdmins(participants) {
const admins = [];
for (let i of participants) {
if (i.admin === "admin" || i.admin === "superadmin") admins.push(i.id);
}
return admins;
}

const groupAdmins = getGroupAdmins(groupMembers);
const isGroupAdmins = groupAdmins.includes(sender) || false;
const BotNumber = bot.user.id.split(":")[0] + "@s.whatsapp.net";
const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false;

await ctx.creategrupo(from);
const grupoConfig = await ctx.getGrupoConfig(from);

const linkRegex = /(https?:\/\/[^\s]+)/gi;
const hasLink = linkRegex.test(body);

if (grupoConfig.antilinkgp || grupoConfig.antilinkchannel) {
if (hasLink) {
console.log(`[ANTI-LINK] Link detectado de ${sender}: ${body}`);
if (isGroupAdmins) return;
if (isBotGroupAdmins) {
await bot.groupParticipantsUpdate(from, [sender], "remove");
await bot.sendMessage(from, { delete: info.key });
}
}
}
}
}
};