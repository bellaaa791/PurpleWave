module.exports = {
nomes: ["setnomebot", "nomebot"],
uso: ["<nome>"],
desc: ["Altera o nome do bot!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar(resposta.textoparametro);
setconfig("bot", q);
enviar(
`✅ Nome do bot atualizado com sucesso!`
);
},
};
