const axios = require("axios");

module.exports = {
nomes: ["pinterestmp4", "pinterest_video"],
desc: ["Baixe vídeos do Pinterest através do link!"],
uso: ["https://pin.it/5r2915692"],

run: async () => {
if (!q) return enviar(resposta.textologo);

const nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const url = `${urlapi}/api/downloads/pinterest?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const api = data.data;

if (api && api.texto) {
enviarvideo(api.texto.video,
`*ミTítulo:* ${api.texto.titulo}`
);
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar:", erro);
}
},
};
