"use strict"
const { atualizarUsuarioNoGrupo } = require('../utils/grupo')

const chalk = require('chalk')
const { 
detectarLinkDeGrupo, 
creategrupo, 
getGrupoConfig, 
togglegrupoconfig, 
detectarLinkDeCanal 
} = require("../utils/grupo")

function normalizeJid(jid) {
if (!jid) return null
return jid
.replace(/:.*(?=@)/, '')
.replace('@lid', '@s.whatsapp.net')
.replace('@c.us', '@s.whatsapp.net')
}

Object.defineProperty(module.exports, "__esModule", { value: true })

module.exports = {
file: 'message_logger.js',
eventNames: ['messages.upsert'],
desc: 'Handler para log de todas as mensagens',
tags: ['logger', 'messages'],

async start(bot, { messages }, ctx) {
for (const info of messages || []) {
const mensagem = info.message
if (!mensagem) continue

const from = info.key.remoteJid
const isGroup = from.endsWith("@g.us")
// ------------------------------
// Normaliza sender
// ------------------------------
const sendere2 = info.key.participant?.includes('@lid') ? info.key.participant : info.key.participantAlt;
const sendere = info.key.participantAlt?.includes('@s.whatsapp.net') ? info.key.participantAlt : info.key.participant;
const sender2 = sendere2 || from;
const sender = sendere || from;
const normalizedSender = sender

function getRealJid(info) {
// Se participant já está no formato normal
if (info.key.participant?.endsWith('@s.whatsapp.net')) {
return info.key.participant;
}

// Se existe participantPn (usado em grupos novos)
if (info.key.participantPn?.endsWith('@s.whatsapp.net')) {
return info.key.participantPn;
}

// Se só existe participantlid, retornamos ele (único ID disponível)
if (info.key.participantlid?.endsWith('@lid')) {
return info.key.participantlid;
}

// fallback para from
return info.key.participant || info.key.participantAlt || info.from;
}
// ------------------------------
// Metadata do grupo
// ------------------------------
const groupMetadata = isGroup ? await bot.groupMetadata(from) : null
const groupMembers = groupMetadata?.participants || []

// ------------------------------
// Lista de admins
// ------------------------------
const groupAdmins = (groupMembers || [])
.filter(i => i?.admin === "admin" || i?.admin === "superadmin")
.map(i => normalizeJid(i?.id || i?.lid?._serialized))
.filter(Boolean)

const BotNumber = normalizeJid(bot.user?.id || bot.user?.lid?._serialized)
const isBotGroupAdmins = BotNumber && groupAdmins.includes(BotNumber)

const isSenderAdmin = normalizedSender ? groupAdmins.includes(normalizedSender) : false

// ------------------------------
// Nome do grupo e timestamp
// ------------------------------
const groupName = isGroup ? groupMetadata?.subject : ""
const timestamp = ctx.moment(info.messageTimestamp * 1000)
.tz("America/Sao_Paulo")
.format("YYYY-MM-DD HH:mm:ss")

const pushName = info.pushName || "Desconhecido"
const fromDisplay = isGroup
? `${groupName} (${from})`
: `Chat Privado (${from})`

// ------------------------------
// Detecta tipo da mensagem
// ------------------------------
let messageType = "texto"
let displayBody = info.message?.conversation || ""

if (info.message?.imageMessage) {
displayBody = info.message.imageMessage.caption || "[Imagem]"
messageType = "imagem"
} else if (info.message?.videoMessage) {
displayBody = info.message.videoMessage.caption || "[Vídeo]"
messageType = "vídeo"
} else if (info.message?.stickerMessage) {
displayBody = "[Sticker]"
messageType = "sticker"
} else if (info.message?.audioMessage) {
displayBody = "[Áudio]"
messageType = "áudio"
} else if (info.message?.contactMessage) {
displayBody = "[Contato]"
messageType = "contato"
} else if (info.message?.locationMessage) {
displayBody = "[Localização]"
messageType = "localização"
} else if (info.message?.documentMessage || info.message?.documentWithCaptionMessage?.message?.documentMessage) {
displayBody = info.message.documentMessage?.title || info.message.documentWithCaptionMessage?.message?.documentMessage?.title || "[Documento]"
messageType = "documento"
} else if (info.message?.buttonsMessage) {
displayBody = info.message.buttonsMessage.contentText || "[Mensagem com Botões]"
messageType = "botões"
} else if (info.message?.listMessage) {
displayBody = info.message.listMessage.description || "[Lista]"
messageType = "lista"
} else if (info.message?.reactionMessage) {
displayBody = "[Reação]"
messageType = "reação"
} else if (info.message?.pollCreationMessage) {
displayBody = "[Enquete]"
messageType = "enquete"
} else if (info.message?.viewOnceMessage) {
displayBody = "[Mensagem de Visualização Única]"
messageType = "viewOnce"
} else if (info.message?.extendedTextMessage) {
displayBody = info.message.extendedTextMessage.text || "[Texto Estendido]"
messageType = "texto"
} else if (info.message?.conversation) {
displayBody = info.message.conversation
messageType = "texto"
} else {
displayBody = "[Tipo Desconhecido]"
messageType = "desconhecido"
}


// ------------------------------
// Atualiza ranking de usuários
// ------------------------------
if (isGroup) {
const realSender = getRealJid(info);

if (realSender) {
await atualizarUsuarioNoGrupo(bot, from, realSender, messageType);
} else {
console.log('[INFO] Mensagem de usuário desconhecido, não será salvo.');
}
}// ------------------------------
// Anticatalogo (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.productMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-CATALOGO] ADMIN detectado: ${pushName} (${normalizedSender}) enviou produto, não bloqueado.`))
} else if (config.anticatalogo) {
await bot.sendMessage(
from,
{ text: "⚠️ Mensagens de catálogo não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-CATALOGO] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-CATALOGO] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-CATALOGO] Erro ao remover ${pushName}:`), e)
}
continue
}
}

// ------------------------------
// AntiImg (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.imageMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-IMAGEM] ADMIN detectado: ${pushName} (${normalizedSender}) enviou imagem, não bloqueado.`))
} else if (config.antiimg) {
await bot.sendMessage(
from,
{ text: "⚠️ Imagens não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-IMAGEM] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-IMAGEM] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-IMAGEM] Erro ao remover ${pushName}:`), e)
}
continue
}
}

// ------------------------------
// AntiVideo (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.videoMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-VIDEO] ADMIN detectado: ${pushName} (${normalizedSender}) enviou imagem, não bloqueado.`))
} else if (config.antivideo) {
await bot.sendMessage(
from,
{ text: "⚠️ Vídeos não são permitidos neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-VIDEO] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-VIDEO] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-VIDEO] Erro ao remover ${pushName}:`), e)
}
continue
}
}

// ------------------------------
// AntiImg (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.stickerMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-STICKER] ADMIN detectado: ${pushName} (${normalizedSender}) enviou imagem, não bloqueado.`))
} else if (config.antisticker) {
await bot.sendMessage(
from,
{ text: "⚠️ Stickers não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-STICKER] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-STICKER] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-STICKER] Erro ao remover ${pushName}:`), e)
}
continue
}
}


// ------------------------------
// AntiLocation (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.locationMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-LOCATION] ADMIN detectado: ${pushName} (${normalizedSender}) enviou localização, não bloqueado.`))
} else if (config.antilocalizacao) {
await bot.sendMessage(
from,
{ text: "⚠️ Localizações não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-LOCATION] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-LOCATION] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-LOCATION] Erro ao remover ${pushName}:`), e)
}
continue
}
}



// ------------------------------
// Antipagameno (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.requestPaymentMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-LOCATION] ADMIN detectado: ${pushName} (${normalizedSender}) enviou localização, não bloqueado.`))
} else if (config.antipagamento) {
await bot.sendMessage(
from,
{ text: "⚠️ Mensagens de pagamentos não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-PAGAMENTO] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-PAGAMENTO] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-PAGAMENTO] Erro ao remover ${pushName}:`), e)
}
continue
}
}

// ------------------------------
// AntiContact (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.contactMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-CONTACT] ADMIN detectado: ${pushName} (${normalizedSender}) enviou contato, não bloqueado.`))
} else if (config.anticontato) {
await bot.sendMessage(
from,
{ text: "⚠️ Contatos não são permitidos neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-CONTACT] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-CONTACT] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-CONTACT] Erro ao remover ${pushName}:`), e)
}
continue
}
}


// ------------------------------
// AntiDocument (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.documentMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-DOCUMENT] ADMIN detectado: ${pushName} (${normalizedSender}) enviou documento, não bloqueado.`))
} else if (config.antidocumento) {
await bot.sendMessage(
from,
{ text: "⚠️ Documentos não são permitidos neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-DOCUMENT] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-DOCUMENT] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-DOCUMENT] Erro ao remover ${pushName}:`), e)
}
continue
}
}

// ------------------------------
// ANTI-STATUS (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.groupStatusMentionMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-STATUS] ADMIN detectado: ${pushName} (${normalizedSender}) enviou documento, não bloqueado.`))
} else if (config.antistatus) {
await bot.sendMessage(
from,
{ text: "⚠️ Status não são permitidos neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-STATUS] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-STATUS] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-STATUS] Erro ao remover ${pushName}:`), e)
}
continue
}
}


// ------------------------------
// ANTI-Ligacao (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.callogMessage) {
const config = await getGrupoConfig(from)

if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-STATUS] ADMIN detectado: ${pushName} (${normalizedSender}) enviou documento, não bloqueado.`))
} else if (config.antiligacao) {
await bot.sendMessage(
from,
{ text: "⚠️ Ligações não são permitidas neste grupo!" },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-LIGAÇÃO] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")

await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-LIGAÇÃO] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-LIGAÇÃO] Erro ao remover ${pushName}:`), e)
}
continue
}
}


// ------------------------------
// Anti-Limite de Caracteres (apenas para membros comuns)
// ------------------------------
if (isGroup && info.message?.conversation) {
const config = await getGrupoConfig(from)
const mensagem = info.message.conversation

if (!config.limitecaracteres || config.limite <= 0) {
continue
}

if (mensagem.length > config.limite) {
if (isSenderAdmin) {
console.log(chalk.yellow(`[ANTI-LIMIT] ADMIN detectado: ${pushName} (${normalizedSender}) enviou mensagem longa, não bloqueado.`))
} else {
await bot.sendMessage(
from,
{ text: `⚠️ Sua mensagem ultrapassou o limite de ${config.limite} caracteres!` },
{ quoted: info }
)
console.log(chalk.red(`[ANTI-LIMIT] Mensagem bloqueada de ${pushName} (${normalizedSender})`))
try {
await bot.groupParticipantsUpdate(from, [sender], "remove")
await bot.sendMessage(from, { delete: info.key })
console.log(chalk.red(`[ANTI-LIMIT] Membro ${pushName} removido do grupo.`))
} catch (e) {
console.error(chalk.red(`[ANTI-LIMIT] Erro ao remover ${pushName}:`), e)
}
}
}
}














const config = await getGrupoConfig(from);
function getMembros(participants) {
return participants
.filter(p => !p.admin)
.map(p => {
const jidReal =
p.jid ||
p.participantPn ||
(p.participant.includes("@")
? p.participant.split(":")[0] + "@s.whatsapp.net"
: p.participant + "@s.whatsapp.net");
return normalizeJid(jidReal);
});
}

const somembros = isGroup ? getMembros(groupMembers) : [];
if (isGroup && config.antihidetag) {
let mencionados = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const membrosNorm = somembros.map(normalizeJid);
const mencionadosNorm = mencionados.map(normalizeJid);
let marcados = 0;
membrosNorm.forEach(jid => {
if (mencionadosNorm.includes(jid)) marcados++;
});

const LIMITE = membrosNorm.length - 1;

if (marcados >= LIMITE && !isSenderAdmin) {
try {
await bot.sendMessage(from, { delete: info.key });
if (isBotGroupAdmins) {
await bot.groupParticipantsUpdate(from, [sender], "remove");
}
} catch (e) {
console.error(`[ANTI-HIDETAG] Erro ao remover/apagar:`, e);
}
}
}

// ------------------------------
// Limite de exibição do conteúdo
// ------------------------------
const maxContentLength = 50
if (displayBody.length > maxContentLength) {
displayBody = displayBody.slice(0, maxContentLength) + '...'
}

// ------------------------------
// Log completo do usuário e grupo
// ------------------------------
console.log(chalk.blue.bold('\n--- NOVA MENSAGEM RECEBIDA ---'))
console.log(chalk.gray('Data/Hora: ') + chalk.white(timestamp))
console.log(chalk.gray('Usuário: ') + chalk.white(`${pushName} (${normalizedSender})`))
console.log(chalk.gray('Admin: ') + chalk.white(isSenderAdmin ? 'Sim' : 'Não'))
console.log(chalk.gray('Grupo: ') + chalk.white(`${groupName || '[Privado]'} (${from})`))
console.log(chalk.gray('Bot Admin: ') + chalk.white(isBotGroupAdmins ? 'Sim' : 'Não'))
console.log(chalk.gray('Tipo: ') + chalk.white(messageType))
console.log(chalk.gray('Conteúdo: ') + chalk.white(displayBody))
console.log(chalk.gray('Admins do grupo: ') + chalk.white(groupAdmins.join(', ') || 'Nenhum'))
console.log(chalk.gray('-----------------------------'))
} // fecha for
} // fecha async start
} // fecha module.exports