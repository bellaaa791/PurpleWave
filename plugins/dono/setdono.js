module.exports = {
nomes: ["setdono", "numerodono"],
uso: ["<nome>"],
desc: ["Altera o número do dono!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar(resposta.textoparametro);
setconfig("criadorNumber", q);
enviar(
`✅ Número do dono atualizado com sucesso!`
);
},
};
