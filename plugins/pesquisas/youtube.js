module.exports = {
nomes: ["youtube", "ytsrc", "ytsearch"],
desc: ["Pesquisa vídeos no YouTube."],
uso: ["<nome do vídeo ou artista>"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar(resposta.textoparametro);
try {
const url = `${urlapi}/api/pesquisa/youtube?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
if (
!data ||
!data.data ||
!Array.isArray(data.data.texto) ||
data.data.texto.length === 0
) {
return enviar("⚠ Nenhum vídeo encontrado no YouTube. Tente outro termo!");
}

const randomIndex = Math.floor(Math.random() * data.data.texto.length);
const video = data.data.texto[randomIndex];

const textoresultado = `
*🎬 Título:* ${video.title || "não encontrado"}

*📺 Canal:* ${video.author?.name || "não encontrado"}

*🔗 Link:* ${video.url || "não encontrado"}

*🕒 Duração:* ${video.timestamp || "não encontrado"}

*👀 Views:* ${video.views?.toLocaleString() || "não encontrado"}

*📅 Publicado:* ${video.ago || "não encontrado"}

*📝 Descrição:* ${
video.description ? video.description.substring(0, 200) + "..." : "não encontrado"
}
`;

bot.sendMessage(
from,
{
image: { url: video.thumbnail || fotomenu },
caption: textoresultado,
},
{ quoted: info }
);
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar pesquisa do YouTube:", erro);
}
},
};
