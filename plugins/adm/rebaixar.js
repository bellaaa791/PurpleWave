module.exports = {
nomes: ["rebaixar"],
desc: ["Tira o cargo de administrador do usuário mencionado!"],
uso: ["@user"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
if (!menc_os2) return enviar(resposta.marcar_alguem);
bot.groupParticipantsUpdate(from, [menc_os2], "demote");
enviar(resposta.cargoadm_off);
},
};
