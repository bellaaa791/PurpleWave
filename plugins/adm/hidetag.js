module.exports = {
nomes: ["hidetag"],
uso: ["fiquem de olho no grupo!"],
desc: ["Marque todos os usuários com uma mensagem (invisível)"],
run: async () => {
const baileys = await import('@whiskeysockets/baileys');
const type = baileys.getContentType(info.message);
let quotedMessageContent = null;
if (type === 'extendedTextMessage' && info.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
quotedMessageContent = info.message.extendedTextMessage.contextInfo.quotedMessage;
}
const isQuotedMsg = !!quotedMessageContent?.conversation;
const isQuotedMsg2 = !!quotedMessageContent?.extendedTextMessage?.text;
const isQuotedImage = !!quotedMessageContent?.imageMessage;
const isQuotedVisuU = !!quotedMessageContent?.viewOnceMessage;
const isQuotedVisuU2 = !!quotedMessageContent?.viewOnceMessageV2;
const isQuotedVideo = !!quotedMessageContent?.videoMessage;
const isQuotedDocument = !!quotedMessageContent?.documentMessage;
const isQuotedDocW = !!quotedMessageContent?.documentWithCaptionMessage;
const isQuotedAudio = !!quotedMessageContent?.audioMessage;
const isQuotedSticker = !!quotedMessageContent?.stickerMessage;
const isQuotedContact = !!quotedMessageContent?.contactMessage;
const isQuotedLocation = !!quotedMessageContent?.locationMessage;
const isQuotedProduct = !!quotedMessageContent?.productMessage;

aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
async function marcac() {
if (!somembros || somembros.length === 0) {
return enviar(`❌️ Olá *${pushname}* - Não contém nenhum membro comum no grupo.`);
}
let DFC4 = "";
const rsm4 = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const pink4 = isQuotedImage ? rsm4?.imageMessage : info.message?.imageMessage;
const blue4 = isQuotedVideo ? rsm4?.videoMessage : info.message?.videoMessage;
const purple4 = isQuotedDocument ? rsm4?.documentMessage : info.message?.documentMessage;
const yellow4 = isQuotedDocW ? rsm4?.documentWithCaptionMessage?.message?.documentMessage : info.message?.documentWithCaptionMessage?.message?.documentMessage;
const aud_d4 = isQuotedAudio ? rsm4?.audioMessage : "";
const figu_d4 = isQuotedSticker ? rsm4?.stickerMessage : "";
const red4 = isQuotedMsg && !aud_d4 && !figu_d4 && !pink4 && !blue4 && !purple4 && !yellow4 ? rsm4?.conversation : info.message?.conversation;
const green4 = rsm4?.extendedTextMessage?.text || info?.message?.extendedTextMessage?.text;

if (pink4 && !aud_d4 && !purple4) {
DFC4 = pink4;
pink4.caption = q.length > 1 ? q : (pink4.caption || "").replace(new RegExp(prefix + "hidetag", "gi"), ` `);
pink4.image = { url: pink4.url };
pink4.mentions = somembros;
} else if (blue4 && !aud_d4 && !purple4) {
DFC4 = blue4;
blue4.caption = q.length > 1 ? q.trim() : (blue4.caption || "").replace(new RegExp(prefix + "hidetag", "gi"), ` `).trim();
blue4.video = { url: blue4.url };
blue4.mentions = somembros;
} else if (red4 && !aud_d4 && !purple4) {
const black4 = {
text: (red4 || "").replace(new RegExp(prefix + "hidetag", "gi"), ` `).trim(),
mentions: somembros
};
DFC4 = black4;
} else if (!aud_d4 && !figu_d4 && green4 && !purple4) {
const brown4 = {
text: (green4 || "").replace(new RegExp(prefix + "hidetag", "gi"), ` `).trim(),
mentions: somembros
};
DFC4 = brown4;
} else if (purple4) {
DFC4 = purple4;
purple4.document = { url: purple4.url };
purple4.mentions = somembros;
} else if (yellow4 && !aud_d4) {
DFC4 = yellow4;
yellow4.caption = q.length > 1 ? q.trim() : (yellow4.caption || "").replace(new RegExp(prefix + "hidetag", "gi"), `${pushname}\n—\n`).trim();
yellow4.document = { url: yellow4.url };
yellow4.mentions = somembros;
} else if (figu_d4 && !aud_d4) {
DFC4 = figu_d4;
figu_d4.sticker = { url: figu_d4.url };
figu_d4.mentions = somembros;
} else if (aud_d4) {
DFC4 = aud_d4;
aud_d4.audio = { url: aud_d4.url };
aud_d4.ptt = true;
aud_d4.mentions = somembros;
}

await bot.sendMessage(from, DFC4).catch(err => "Erro ao enviar mensagem hidetag: " + err);
}

marcac().catch((error) => {
console.log(error);
});
}
};