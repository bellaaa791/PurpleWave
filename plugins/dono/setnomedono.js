module.exports = {
nomes: ["setnomedono", "nomedono"],
uso: ["<nome>"],
desc: ["Altera o nome do dono!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar(resposta.textoparametro);
setconfig("criador", q);
enviar(
`✅ Nome do dono atualizado com sucesso!`
);
},
};
