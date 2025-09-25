module.exports = {
nomes: ["kwai", "kwaisearch"],
desc: ["Pesquisa vídeos no Kwai."],
uso: ["emili"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/kwai?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const resultados = data?.data?.texto?.data;

if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Nenhum vídeo encontrado no Kwai.");
}


const item = resultados[Math.floor(Math.random() * resultados.length)];

const titulo = item.caption || item.coverCaption || "Sem título";
const autor = item.user_name || "Desconhecido";
const views = item.view_count?.toLocaleString("pt-BR") || "0";
const likes = item.like_count?.toLocaleString("pt-BR") || "0";
const comentarios = item.comment_count?.toLocaleString("pt-BR") || "0";

let videoUrl = null;
if (Array.isArray(item.main_mv_urls_rate) && item.main_mv_urls_rate.length > 0) {
const melhorQualidade = item.main_mv_urls_rate[item.main_mv_urls_rate.length - 1];
if (melhorQualidade?.urls?.[0]?.url) {
videoUrl = melhorQualidade.urls[0].url;
}
}
if (!videoUrl && Array.isArray(item.main_mv_urls) && item.main_mv_urls.length > 0) {
videoUrl = item.main_mv_urls[0].url;
}

if (!videoUrl) {
return enviar("❌ Não foi possível extrair o link do vídeo.");
}

const legenda = `
🎬 *${titulo}*

👤 Autor: ${autor}
👁️ Views: ${views}
❤️ Likes: ${likes}
💬 Comentários: ${comentarios}
`.trim();

await bot.sendMessage(
from,
{
video: { url: videoUrl },
caption: legenda,
},
{ quoted: info }
);
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar vídeos do Kwai." },
{ quoted: info }
);
}
},
};
