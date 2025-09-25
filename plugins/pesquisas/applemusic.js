module.exports = {
nomes: ["applemusic"],
desc: ["Busca álbuns, músicas, artistas, playlists e estações no Apple Music."],
uso: ["latino americano"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/applemusic?query=${q}&apikey=${apikey}`

const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
} 
const resultados = data.data;
if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Nenhum resultado encontrado no Apple Music.");
}

const item = resultados[Math.floor(Math.random() * resultados.length)];

const titulo = item.title || "Título não informado";
const subtitulo = item.subtitle || "";
const link = item.link || "";
const imagem = item.image || fotomenu;

const caption = `
🍎 *Apple Music*
🎵 *${titulo}*
📌 ${subtitulo}

🔗Ouvir no Apple Music ${link}
`.trim();

bot.sendMessage(
from,
{
image: { url: imagem },
caption: caption,
},
{ quoted: info }
);
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar no Apple Music." },
{ quoted: info }
);
}
},
};
