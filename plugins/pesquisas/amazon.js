module.exports = {
nomes: ["amazon"],
desc: ["Faz uma busca de produtos no site da amazon!"],
uso: ["alexa"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/pesquisa/amazon?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}


let itemParaExibir;

if (data.success && data.data?.texto?.length > 0) {
const randomIndex = Math.floor(Math.random() * data.data.texto.length);
itemParaExibir = data.data.texto[randomIndex];

} else {
console.log("Nenhum resultado válido encontrado pela API ou lista vazia.");
return enviar("Não foi possível encontrar resultados para sua pesquisa no momento. Tente com um termo diferente!");
}

const textoresultado = `
*ミnome⚫:* ${itemParaExibir.nome || "não encontrado"}

*ミpreço⚫:* ${itemParaExibir.preco || "não encontrado"}

*ミ* ${itemParaExibir.parcelamento_informacoes || ""}

*ミCompras no mês passado⚫:* ${itemParaExibir.info_compras || ""}

*ミ* ${itemParaExibir.descricao || ""}

*Avaliações⚫:* ${itemParaExibir.avaliacao_texto || "não encontrado"}

*Avaliações Total⚫:* ${itemParaExibir.avaliacoes_total || "não encontrado"}

*ミlink⚫:* ${itemParaExibir.link || "não encontrado"}
`;

await bot.sendMessage(
from,
{ image: { url: itemParaExibir.imagem }, caption: textoresultado },
{ quoted: info }
);
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar pesquisa da Amazon:", erro);
}
},
};
