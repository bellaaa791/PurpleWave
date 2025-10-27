module.exports = {
nomes: ["infogp", "infogrupo", "gpinfo"],
uso: [],
desc: ["Mostra informações do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);

try {
const metadata = await bot.groupMetadata(from);
const fotoGrupo = metadata?.desc?.image || null;
const nomeGrupo = metadata.subject;
const dataCriacao = metadata.creation
? new Date(metadata.creation * 1000).toLocaleString()
: "Desconhecida";
const participantes = metadata.participants.length;
const descricao = metadata.desc || "Sem descrição";
let donokk = "Desconhecido";
if (metadata.owner) {
  const donoInfo = metadata.participants.find(p => p.id === metadata.owner);
  donokk = donoInfo?.displayName || donoInfo?.id || metadata.owner;
}
let msg = `📄 *Informações do Grupo*\n\n`;
msg += `👥 Nome: ${nomeGrupo}\n`;
msg += `🗓️ Criado em: ${dataCriacao}\n`;
msg += `👤 Participantes: ${participantes}\n`;
msg += `🧑‍💼 Dono: ${donokk}\n`;
msg += `📝 Descrição: ${descricao}`;
if (fotoGrupo) {
await bot.sendMessage(from, {
image: { url: fotoGrupo },
caption: msg,
});
} else {
enviar(msg);
}
} catch (err) {
console.error(err);
enviar("❌ Não foi possível obter informações do grupo.");
}
},
};