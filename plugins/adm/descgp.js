module.exports = {
nomes: ["descgp"],
desc: ["Muda a descrição do grupo"],
uso: ["<nova descrição do grupo>"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
let nomety = Array.isArray(q) ? q.join(" ") : q;
bot.groupUpdateDescription(from, nomety);
enviar(resposta.executado);
},
};
