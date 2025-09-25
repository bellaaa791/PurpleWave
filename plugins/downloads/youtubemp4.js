module.exports = {
nomes: ["ytmp4", "youtubemp4"],
desc: ["Obtenha informações e links de download de vídeos do YouTube!"],
uso: ["https://youtu.be/V2Bail4Iag8?si=G1Y45wzBljZQLnZr"],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do YouTube!");

try {
const url = `${urlapi}/api/downloads/youtubemp4?query=${q}&apikey=${apikey}`;
const data = await requisicaoComLimite(url);

if (!data.success || !data.data) {
return enviar("Não foi possível obter informações do vídeo. Verifique o link ou tente novamente mais tarde.");
}

const video = data.data;

const mensagem = `
📌 *Título:* ${video.title}
👤 *Autor:* ${video.author || "Desconhecido"}
⏱️ *Duração:* ${Math.floor(video.duration / 60)}m ${video.duration % 60}s
🌐 *Link:* ${video.url}
`.trim();

enviarvideo(video.medias[0].url, mensagem);

} catch (err) {
console.error(err);
enviar("Ocorreu um erro ao buscar o vídeo.");
}
}

};
