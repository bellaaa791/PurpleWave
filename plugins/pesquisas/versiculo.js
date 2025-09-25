module.exports = {
nomes: ["versiculo", "biblia", "verso"],
desc: ["Busca versículos bíblicos por livro e capítulo."],
uso: ["Joao:3"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);
const url = `${urlapi}/api/pesquisa/versiculo?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const resultados = data?.data?.texto;

if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
return enviar("❌ Nenhum versículo encontrado.");
}


const item = resultados[Math.floor(Math.random() * resultados.length)];

const versiculo = item.texto || "Versículo não encontrado.";
const link = item.link || "";
const imagem = item.imagem?.url || null;

const legenda = `
📖 *Versículo encontrado:*

"${versiculo}"

🔗Ler na Bíblia Online ${link}
`.trim();

if (imagem) {
await bot.sendMessage(
from,
{
image: { url: imagem },
caption: legenda,
},
{ quoted: info }
);
} else {
await bot.sendMessage(from, { text: legenda }, { quoted: info });
}
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar versículo." },
{ quoted: info }
);
}
},
};
