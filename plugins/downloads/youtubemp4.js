module.exports = {
nomes: ["ytmp4", "youtubemp4"],
desc: ["Obtenha informações e links de download de vídeos do YouTube!"],
uso: ["https://youtu.be/V2Bail4Iag8?si=G1Y45wzBljZQLnZr"],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do YouTube!");

try {
const response = await axios.get(
`${urlapi}/api/downloads/youtubemp4?query=${encodeURIComponent(q)}&apikey=${apikey}`,
{
headers: {
Accept: "application/json",
"User-Agent": "Node.js",
},
}
);

const json = response.data;

if (!json.data?.success) {
return enviar("Não foi possível obter o vídeo.");
}

const video = json.data;

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
},
};
