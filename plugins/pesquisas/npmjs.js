module.exports = {
nomes: ["npmjs"],
desc: ["Busca pacotes no NPMJS."],
uso: ["axios"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/npmjs?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const resultados = data.data?.texto?.pacotes;

if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Nenhum pacote encontrado no NPMJS.");
}


const item = resultados[Math.floor(Math.random() * resultados.length)];

const nome = item.nome || "Nome não informado";
const descricao = item.descricao || "Sem descrição";
const versaoDetalhes = item.versaoDetalhes || "Versão não informada";
const publicador = item.publicador || "Desconhecido";
const link = item.link || "https://www.npmjs.com";

const caption = `
📦 *${nome}*
📝 ${descricao}

📌 Detalhes: ${versaoDetalhes}
👤 Publicador: ${publicador}

🔗 Ver no NPMJS ${link}
`.trim();

bot.sendMessage(
from,
{
image: { url: fotomenu }, 
caption: caption,
},
{ quoted: info }
);
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar no NPMJS." },
{ quoted: info }
);
}
},
};
