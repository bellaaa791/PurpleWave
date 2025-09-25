module.exports = {
nomes: ["pinterest2", "pinterestmp4_2", "pinterest_video_2"],
desc: ["Baixe vídeos do Pinterest através do link!"],
uso: ["https://pin.it/5r2915692"],

run: async () => {
if (!q) return enviar(resposta.textologo);

const nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const url = `${urlapi}/api/downloads/pinterestv2?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
const api = data.data;
const videoData = api.texto;

if (videoData?.download) {
const mensagem = `
*🎬 Título:* ${videoData.titulo || "Sem título"}
*👤 Autor:* ${videoData.autor?.nome || "Desconhecido"} (${videoData.autor?.usuario || ""})
*📤 Upload:* ${videoData.upload || "Desconhecido"}
*🔗 Fonte:* ${videoData.source || "Sem link"}
*🏷️ Keywords:* ${videoData.keyword ? videoData.keyword.join(", ") : "Nenhuma"}
`.trim();

enviarvideo(videoData.download, mensagem, videoData.thumb || "");
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar:", erro);
}
},
};
