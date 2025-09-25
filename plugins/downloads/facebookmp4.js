module.exports = {
nomes: ["facebook", "facebookmp4", "facebook_video"],
desc: ["Baixe vídeos do Facebook através do link!"],
uso: ["https://www.facebook.com/share/r/16wQcNaLpw/"],

run: async () => {
if (!q) return enviar(resposta.textologo);

const nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const url = `${urlapi}/api/downloads/facebook?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const api = data.data;

if (api && api.texto) {
enviarvideo(
api.texto.video_sd,
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
