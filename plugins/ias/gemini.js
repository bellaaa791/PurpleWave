module.exports = {
nomes: ["gemini"],
desc: ["Faça uma pergunta a IA do gemini!"],
uso: ["Boa noite,oque foi a segunda guerra mundial?"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);
try {
url = `${urlapi}/api/ias/geminitexto?query=${q}&apikey=${apikey}`
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}



if (data?.data?.texto) {
  return enviar(`*ミResultado:* ${data.data.texto}`);
}

enviar("*⚠ Nenhum resultado encontrado!*");
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar gemini:", erro);
}
},
};
