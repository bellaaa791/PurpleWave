module.exports = {
nomes: ["steam"],
desc: ["Faz uma busca de produtos no site da Steam!"],
uso: ["Need for speed"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/pesquisa/steamjogo?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

let itemParaExibir;

if (
data &&
data.data &&
data.data.texto &&
data.data.texto.length > 0
) {
const randomIndex = Math.floor(Math.random() * data.data.texto.length);
itemParaExibir = data.data.texto[randomIndex];
} else {
console.log(
"Nenhum resultado válido encontrado pela API da Steam ou lista vazia para:",
q
);
return enviar(
"Nenhum jogo encontrado com esse termo. Tente uma pesquisa diferente!"
);
}

const textoresultado = `
*ミ nome ⚫:* ${itemParaExibir.titulo || "não encontrado"}

*ミ data ⚫:* ${itemParaExibir.data || "não encontrado"}

*ミ preço ⚫:* ${itemParaExibir.preço || "não encontrado"}

*ミ preço original ⚫:* ${itemParaExibir.preço_original || "não encontrado"}

*ミ desconto ⚫:* ${itemParaExibir.desconto || "não encontrado"}

*ミ desenvolvedor ⚫:* ${itemParaExibir.desenvolvedor || "não encontrado"}

*ミ publicador ⚫:* ${itemParaExibir.publicou || "não encontrado"}

*ミ descrição ⚫:* ${itemParaExibir.descrição || "não encontrado"}

*ミ tradução da descrição ⚫:* ${itemParaExibir.traducao_descricao || "não encontrado"}

*ミ avaliações recentes ⚫:* ${itemParaExibir.avaliacoes_recentes || "não encontrado"}

*ミ avaliações totais ⚫:* ${itemParaExibir.avaliacoes_total || "não encontrado"}
`;

bot.sendMessage(
from,
{
image: { url: itemParaExibir.foto || fotomenu },
caption: textoresultado,
},
{ quoted: info }
);
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar pesquisa da Steam:", erro);
}
},
};
