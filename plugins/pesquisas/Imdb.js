module.exports = {
nomes: ["imdb"],
desc: ["Busca informações de filmes, séries e atores no IMDb."],
uso: ["mission impossible"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/imdb?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const resultados = data.data?.texto?.resultado;

if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Nenhum resultado encontrado no IMDb.");
}


const item = resultados[Math.floor(Math.random() * resultados.length)];

const titulo = item.titulo || "Título não informado";
const tipo = item.tipo || "Desconhecido";
const ano = item.ano || "Ano não informado";
const elenco = item.elenco || "Elenco não informado";
const imagem = item.imagem?.url || fotomenu;
const imdbLink = `https://www.imdb.com/title/${item.id}/`;

const caption = `
🎬 *${titulo}* (${ano})
📌 Tipo: ${tipo}
⭐ Rank IMDb: ${item.rank || "N/A"}
👥 Elenco: ${elenco}

🔗Ver no IMDb ${imdbLink}
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
{ text: "❌ Erro ao buscar no IMDb." },
{ quoted: info }
);
}
},
};
