module.exports = {
nomes: ["addpalavra"],
uso: ["cu"],
desc: ["Adiciona uma palavra a lista de palavras proibidas,o usuário que enviar essa palavra será removido do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
if (!q) return enviar(resposta.textoparametro);
addPalavra(q)
},
};
