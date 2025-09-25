module.exports = {
nomes: ["linkgp"],
uso: [""],
desc: ["Envia o link do grupo atual."],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
linkgc = await bot.groupInviteCode(from)
enviar('https://chat.whatsapp.com/'+linkgc)},
};
