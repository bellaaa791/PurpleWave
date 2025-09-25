module.exports = {
nomes: ["setprefix"],
uso: ["<nome>"],
desc: ["Altera o prefixo do bot!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar(resposta.textoparametro);
setconfig("prefix", q);
enviar(
`✅ Prefixo do bot atualizado com sucesso!`
);
},
};
