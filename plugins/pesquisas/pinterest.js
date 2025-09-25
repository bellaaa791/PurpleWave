module.exports = {
nomes: ["pinterest", "pin", "pinterestimg"],
desc: ["Pesquise e baixe imagens do Pinterest através de palavras-chave!"],
uso: ["anime girl"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/pesquisa/pinterest?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

if (
data &&
data.data &&
Array.isArray(data.data.texto) &&
data.data.texto.length > 0
) {
for (let item of data.data.texto.slice(0, 3)) {
await enviarimg(
item.directLink,
`🔹 Resultado para: *${q}*\n🌐 Link: ${item.link}`
);
}
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
console.error("❌ Erro ao processar:", erro);
return enviar(resposta.erro);
}
},
};
