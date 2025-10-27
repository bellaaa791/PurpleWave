module.exports = {
nomes: ["removerpalavra", "removepalavra"],
uso: ["cu"],
desc: ["Remove uma palavra a lista de palavras proibidas!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
if (!q) return enviar(resposta.textoparametro);
removePalavra(q)
},
};
