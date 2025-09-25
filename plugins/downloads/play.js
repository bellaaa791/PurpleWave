module.exports = {
nomes: ["play", "música"],
desc: ["Pesquisa vídeos no YouTube e envia o áudio."],
uso: ["<nome do vídeo ou artista>"],

run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) {
return enviar(resposta.textoparametro);
}

try {

const pesquisaURL = `${urlapi}/api/pesquisa/youtube?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const headersPadrao = {
Accept: "application/json",
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
};

const response1 = await axios.get(pesquisaURL, { headers: headersPadrao });
const data1 = response1.data;

if (data1?.error === "Limite diário de requisições excedido") {
const horaReset = data1.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
return enviar(`⚠ *Limite diário da API excedido!*
É necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
}

if (
!data1 ||
!data1.resultado ||
!Array.isArray(data1.resultado.texto) ||
data1.resultado.texto.length === 0
) {
return enviar("⚠ Nenhum vídeo encontrado no YouTube. Tente outro termo!");
}

const video = data1.resultado.texto[0];

const downloadURL = `${urlapi}/api/downloads/youtubemp3?apikey=${apikey}&query=${video.url}`;
const response2 = await axios.get(downloadURL, {
headers: {
...headersPadrao,
Referer: "https://hobsidian.shop/",
Origin: "https://hobsidian.shop",
},
});

const data2 = response2.data;
const audio = data2?.resultado?.texto || null;

const textoresultado = `
*🎬 Título:* ${video.title || "não encontrado"}
*📺 Canal:* ${video.author?.name || "não encontrado"}
*🔗 Link:* ${video.url || "não encontrado"}
*🕒 Duração:* ${video.timestamp || "não encontrado"}
*👀 Views:* ${video.views?.toLocaleString() || "não encontrado"}
*📅 Publicado:* ${video.ago || "não encontrado"}
*📝 Descrição:* ${
video.description
? video.description.substring(0, 200) + "..."
: "não encontrado"
}
`.trim();

await bot.sendMessage(
from,
{
image: { url: video.thumbnail || fotomenu },
caption: textoresultado,
},
{ quoted: info }
);

if (audio) {
await bot.sendMessage(
from,
{ audio: { url: audio }, mimetype: "audio/mpeg" },
{ quoted: info }
);
} else {
enviar("⚠ Não consegui obter o áudio desse vídeo.");
}

} catch (erro) {
console.error("❌ Erro ao processar pesquisa do YouTube:", erro);
enviar(resposta.erro);
}
},
};
