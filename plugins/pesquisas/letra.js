module.exports = {
nomes: ["letra"],
desc: ["Retorna a letra e informações da música através do nome ou uma frase."],
uso: ["latino americano drinho sp"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/letra?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
const resultado = data.data?.texto;

if (!resultado) {
return bot.sendMessage(
from,
{ text: "Nenhum resultado encontrado." },
{ quoted: info }
);
}

const resultados = data.data?.texto?.resultados;


if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Letra não encontrada.");
}

const musica = resultados[Math.floor(Math.random() * resultados.length)];

const artista = musica.art || "Desconhecido";
const titulo = musica.full_txt || musica.txt || "Música";
const genero = musica.g || "Gênero não informado";
const letra = musica.lyrics || musica.letra || "Letra não disponível.";
const imagem = musica.img || fotomenu;
const link = musica.link ? `🔗Ver no site ${musica.link}` : "";

const caption = `
🎵 *${titulo}*
👤 *Artista:* ${artista}
🎧 *Gênero:* ${genero}

${link}

📝 *Letra:*
${letra.length > 2000 ? letra.slice(0, 2000) + '...' : letra}


`.trim();

bot.sendMessage(
from,
{
image: { url: imagem || fotomenu },
caption: caption,
},
{ quoted: info }
);
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "Erro ao buscar letra." },
{ quoted: info }
);
}
},
};
