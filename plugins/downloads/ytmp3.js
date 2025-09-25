module.exports = {
nomes: ["ytmp3", "youtubemp3"],
desc: ["Obtenha informações e links de download de vídeos do YouTube!"],
uso: ["https://youtu.be/V2Bail4Iag8?si=G1Y45wzBljZQLnZr"],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do YouTube!");

try {
const url = `${urlapi}/api/downloads/youtubemp3?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}


const data2 = data.data;
const audio = data.data.texto || null;

if (audio) {
await bot.sendMessage(
from,
{ audio: { url: audio }, mimetype: "audio/mpeg" },
{ quoted: info }
);
} else {
enviar("⚠ Não consegui obter o áudio desse vídeo.");
}
} catch (err) {
console.error(err);
enviar("Ocorreu um erro ao buscar o vídeo.");
}
},
};
