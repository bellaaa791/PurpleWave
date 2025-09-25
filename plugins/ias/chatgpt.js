module.exports = {
nomes: ["chatgpt"],
desc: ["Faça uma pergunta à IA do chatgpt!"],
uso: ["Boa noite, o que foi a segunda guerra mundial?"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar(resposta.textoparametro);


const url = `${urlapi}/api/ias/chatgpt?apikey=${apikey}&query=${encodeURIComponent(q)}`;


const resultado = await requisicaoComLimite(url);
if (resultado.limite) {
return enviar(`${resposta.limiteesgoted} ${resultado.limite} ⏳`);
}
if (resultado.success) {
return enviar(`*ミResultado:* ${resultado.data.texto}`);
}

enviar("*⚠ Nenhum resultado encontrado!*");
},
};
