module.exports = {
nomes: ["kick", "ban", "expulsar"],
uso: ["@user"],
desc: ["Remove usuários do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
if (!menc_os2) return enviar(resposta.marcar_alguem);
await bot.groupParticipantsUpdate(from, [menc_os2], "remove");
enviar(resposta.usuario_removido);
},
};
