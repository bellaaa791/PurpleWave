"use strict";

module.exports = {
nomes: ["rankusers", "ranking"],
desc: "Mostra o ranking de usuários do grupo",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
const configAtual = lergrupo(from);

if (!configAtual.rankingusers || !configAtual.usuarios || configAtual.usuarios.length === 0) {
return enviar("⚠️ Nenhum usuário registrado ou ranking desativado.");
}
const groupMetadata = await bot.groupMetadata(from);
const groupMembers = groupMetadata.participants || [];
const lidToJid = {};
groupMembers.forEach(p => {
if (p.id) lidToJid[p.id] = p.id; 
if (p.lid) lidToJid[p.lid] = p.id;
if (p.participant) lidToJid[p.participant] = p.id || p.participant;
});
const usuariosOrdenados = configAtual.usuarios.sort((a, b) => b.mensagens - a.mensagens);
let texto = `📊 *Ranking de Usuários*\n`;
texto += `Total de usuários: ${usuariosOrdenados.length}\n\n`;
const mentionsList = [];
usuariosOrdenados.forEach((u, index) => {
let jid = lidToJid[u.numero] || u.numero;
if (!jid.includes("@s.whatsapp.net") && !jid.includes("@g.us")) {
jid += "@s.whatsapp.net";
}

mentionsList.push(jid);
let numeroDisplay = jid.replace(/@s\.whatsapp\.net$/, "").replace(/@g\.us$/, "");
texto += `╞═🏅 ${index + 1}. @${numeroDisplay}\n`;
texto += `╞═📝 Mensagens: ${u.mensagens}\n`;
texto += `╞═🖼️ Imagens: ${u.imagens}\n`;
texto += `╞═🎴 Figurinhas: ${u.figurinhas}\n`;
texto += `╞═📄 Documentos: ${u.documentos}\n`;
texto += `╞═🎵 Áudios: ${u.audios}\n\n`;
});
await bot.sendMessage(from, { text: texto, mentions: mentionsList }, { quoted: info });
},
};