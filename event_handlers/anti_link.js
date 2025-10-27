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

const from = info.key.remoteJid || '';
const isGroup = from.includes('@g.us');
if (!isGroup) continue;
if (info.key.fromMe) continue;

// função utilitária
function normalizeJid(jid) {
if (!jid) return null;
return jid
.replace(/:.*(?=@)/, '') // remove sufixos tipo ":16"
.replace('@c.us', '@s.whatsapp.net');
}

// garante que temos sender
let sender = info.key.participant || info.key.participantPn || info.key.participantlid || from;
sender = normalizeJid(sender);

// cache de metadata
let groupMetadata;
try {
if (groupCache[from]) {
groupMetadata = groupCache[from];
} else {
groupMetadata = await bot.groupMetadata(from);
groupCache[from] = groupMetadata; // salva cache
}
} catch (e) {
console.log(`[ANTI-LINK] Não foi possível obter metadados do grupo ${from}: ${e.message}`);
continue; 
}

const groupMembers = groupMetadata?.participants || [];

// detecta se grupo é LID (participantes tem id @lid)
const isLidGroup = groupMembers.some(m => m.id?.endsWith('@lid'));

// monta array de admins no formato certo
const groupAdmins = (groupMembers || [])
.filter(i => i?.admin === "admin" || i?.admin === "superadmin")
.map(i => {
if (isLidGroup) {
return normalizeJid(i?.lid?._serialized || i?.id); // mantem @lid
} else {
return normalizeJid(i?.participantPn || i?.id); // usa número normal
}
})
.filter(Boolean);

// ajusta sender no mesmo padrão dos admins
let senderCheck;
if (isLidGroup) {
senderCheck = normalizeJid(info.key.participantlid || sender);
} else {
senderCheck = normalizeJid(info.key.participantPn || sender);
}

// numero do bot
const BotNumber = normalizeJid(bot.user.id.split(":")[0] + "@s.whatsapp.net");
const isBotGroupAdmins = groupAdmins.includes(BotNumber);

await ctx.creategrupo(from);
const grupoConfig = await ctx.getGrupoConfig(from);

const linkRegex = /(https?:\/\/[^\s]+)/gi;
const hasLink = linkRegex.test(body);

if (grupoConfig.antilinkgp && hasLink) {
console.log(`[ANTI-LINK] Link detectado de ${senderCheck}: ${body}`);

if (groupAdmins.includes(senderCheck)) {
console.log(`[ANTI-LINK] ADMIN detectado: ${senderCheck}, não removido.`);
continue;
}

if (isBotGroupAdmins) {
try {
await bot.groupParticipantsUpdate(from, [senderCheck], "remove");
await bot.sendMessage(from, { 
delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: senderCheck } 
});
console.log(`[ANTI-LINK] Membro removido: ${senderCheck}`);
} catch (e) {
console.error(`[ANTI-LINK] Erro ao remover ${senderCheck}:`, e);
}
} else {
console.log(`[ANTI-LINK] Bot não é admin, não pode remover ${senderCheck}.`);
}
}
}
}
};