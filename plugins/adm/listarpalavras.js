module.exports = {
nomes: ["lista", "listarpalavras", "palavras"],
uso: [""],
desc: ["Mostra a lista de palavras proibidas no grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
listarPalavras()
},
};
