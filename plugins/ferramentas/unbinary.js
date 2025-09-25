module.exports = {
nomes: ["unbinary"],
desc: ["Transforma um texto binário em um texto normal"],
uso: ["1010100 1101111 1101011 1111001 1101111"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) {
return enviar(resposta.textoparametro);
}

try {
const url = `${urlapi}/api/ferramentas/unbinary?query=${q}&apikey=${apikey}`
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

if (data && data.data.texto) {
enviar(`*ミResultado:* ${data.data.texto}`);
} else {
console.log("Nenhum resultado válido encontrado para:", nomety, "Resposta da API:", api);
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar unbinary:", erro);
}
},
};
