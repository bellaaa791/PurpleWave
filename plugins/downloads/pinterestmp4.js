const axios = require("axios");

module.exports = {
nomes: ["pinterestmp4", "pinterest_video"],
desc: ["Baixe vídeos do Pinterest através do link!"],
uso: ["https://pin.it/5r2915692"],

run: async () => {
if (!q) return enviar(resposta.textologo);

const nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const response = await axios.get(
`${urlapi}/api/downloads/pinterest?apikey=${apikey}&query=${encodeURIComponent(nomety)}`,
{
headers: {
Accept: "application/json",
"User-Agent": "Node.js",
},
}
);

const api = response.data;

if (api && api.resultado && api.resultado.texto) {
enviarvideo(
api.resultado.texto.video,
`*ミTítulo:* ${api.resultado.texto.titulo}`
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
