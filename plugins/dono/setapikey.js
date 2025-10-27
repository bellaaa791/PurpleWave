module.exports = {
nomes: ["setapikey"],
uso: ["apikey"],
desc: ["Altera a apikey do bot!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar(resposta.textoparametro);
setconfig("apikey", q);
enviar(
`✅ Apikey do bot atualizado com sucesso!`
);
},
};
