"use strict";
module.exports = {
nomes: ["checkuser", "veruser"],
desc: "Mostra informações de um usuário específico do grupo",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!menc_os2) return enviar(resposta.parametro);
const configAtual = lergrupo(from);
if (!configAtual.usuarios || configAtual.usuarios.length === 0) {
//console.log(`[LOG] Nenhum usuário registrado no grupo ${from}`);
return enviar("⚠️ Nenhum usuário registrado no grupo.");
}

//console.log(`[LOG] Total de usuários registrados no grupo ${from}: ${configAtual.usuarios.length}`);
//console.log(`[LOG] Usuários JSON:`, configAtual.usuarios);
const groupMetadata = await bot.groupMetadata(from);
const groupMembers = groupMetadata.participants || [];
//console.log(`[LOG] Participantes do grupo:`, groupMembers);
const lidToJid = {};
groupMembers.forEach(p => {
if (p.lid && p.jid) lidToJid[p.lid] = p.jid;
if (p.id && p.id.includes('@s.whatsapp.net')) lidToJid[p.id] = p.id;
if (p.participantPn) lidToJid[p.participantPn] = p.participantPn;
if (p.participant) lidToJid[p.participant] = p.jid || p.participant;
});
//console.log(`[LOG] Map de lid -> JID:`, lidToJid);
function getRealJidFromMention(menc) {
if (lidToJid[menc]) return lidToJid[menc];
if (menc.endsWith('@lid')) return menc.replace('@lid', '@s.whatsapp.net');
return menc;
}

const jid = getRealJidFromMention(menc_os2);
console.log(`[LOG] Usuário mencionado: ${menc_os2} -> JID resolvido: ${jid}`);
const usuariosNormalizados = configAtual.usuarios.map(u => {
return { ...u, numero: u.numero.includes('@s.whatsapp.net') ? u.numero : u.numero + '@s.whatsapp.net' };
});
//console.log(`[LOG] Usuários do ranking (normalizados):`, usuariosNormalizados.map(u => u.numero));
const usuario = usuariosNormalizados.find(u => u.numero === jid);
if (!usuario) {
//console.log(`[LOG] Usuário não encontrado! JID: ${jid}`);
return enviar("⚠️ Usuário não encontrado no grupo.");
}
const numeroDisplay = jid.replace(/@s\.whatsapp\.net$/, "").replace(/@g\.us$/, "");
let texto = `📊 *Informações do Usuário*\n\n`;
texto += `╞═👤 @${numeroDisplay}\n`;
texto += `╞═📝 Mensagens: ${usuario.mensagens || 0}\n`;
texto += `╞═🖼️ Imagens: ${usuario.imagens || 0}\n`;
texto += `╞═🎴 Figurinhas: ${usuario.figurinhas || 0}\n`;
texto += `╞═📄 Documentos: ${usuario.documentos || 0}\n`;
texto += `╞═🎵 Áudios: ${usuario.audios || 0}\n`;
await bot.sendMessage(from, { text: texto, mentions: [jid] }, { quoted: info });
//console.log(`[LOG] Informações enviadas para o usuário mencionado: ${jid}`);
},
};