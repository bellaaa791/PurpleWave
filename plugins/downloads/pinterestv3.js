module.exports = {
nomes: ["pinterest3", "pinterestmp4_3", "pinterest_video_3"],
desc: ["Baixe vídeos do Pinterest através do link!"],
uso: ["https://pin.it/5r2915692"],

run: async () => {
if (!q) return enviar(resposta.textologo);

const nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const response = await axios.get(
`${urlapi}/api/downloads/pinterestv3?apikey=${apikey}&query=${encodeURIComponent(nomety)}`,
{
headers: {
Accept: "application/json",
"User-Agent": "Node.js",
},
}
);

const api = response.data;

if (api && api.resultado && api.resultado.texto) {
enviarvideo(api.resultado.texto.video, `*ミprontinho🍁* `);
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar:", erro);
}
},
};
