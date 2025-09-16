module.exports = {
nomes: ["ytmp3", "youtubemp3"],
desc: ["Obtenha informações e links de download de vídeos do YouTube!"],
uso: ["https://youtu.be/V2Bail4Iag8?si=G1Y45wzBljZQLnZr"],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do YouTube!");

try {
const api2Url = `${urlapi}/api/downloads/youtubemp3?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const response2 = await axios.get(api2Url, {
headers: {
Accept: "application/json",
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
Referer: "https://hobsidian.shop/",
Origin: "https://hobsidian.shop",
},
});

const data2 = response2.data;
const audio = data2?.resultado?.texto || null;

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
