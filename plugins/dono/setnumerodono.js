module.exports = {
nomes: ["setnumerodono", "numerodono"],
uso: ["553285076326"],
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
