module.exports = {
nomes: ["tiktoksearch"],
desc: ["Retorna o vídeo do TikTok e informações dele."],
uso: ["<zulema zahir>"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

const url = `${urlapi}/api/pesquisa/tiktok?query=${q}&apikey=${apikey}`


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

const textoresultado = `
*===◥◣☆◢◤ nome:* ${resultado.titulo || "não encontrado"}

*===◥◣☆◢◤ tipo:* ${resultado.type || "não encontrado"}

*===◥◣☆◢◤ mime:* ${resultado.mime || "não encontrado"}
`;

bot.sendMessage(
from,
{
video: { url: resultado.video || videoerro },
caption: textoresultado,
},
{ quoted: info }
);
} catch (e) {
console.error(e);
bot.sendMessage(
from,
{ text: "Erro ao buscar vídeo do TikTok." },
{ quoted: info }
);
}
},
};
