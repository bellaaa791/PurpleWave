module.exports = {
nomes: ["nomegp"],
desc: ["Muda o nome do grupo!"],
uso: ["<novo nome para o grupo>"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
let nomety = Array.isArray(q) ? q.join(" ") : q;
bot.groupUpdateSubject(from, nomety);
enviar(resposta.executado);
},
};
