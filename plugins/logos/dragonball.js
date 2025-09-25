module.exports = {
nomes: ["dragonball"],
desc: ["Faça uma logo do dragonball!"],
uso: ["tokyo"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/logos/dragonball?apikey=${apikey}&query=${q}`;
const resultado = await requisicaoComLimite(url);

if (resultado.limite) {
return enviar(`${resposta.limiteesgoted} ${resultado.limite} ⏳`);
}


if (resultado?.data?.imagem?.data) {
const buffer = Buffer.from(resultado.data.imagem.data);

return bot.sendMessage(from, {
image: buffer,
caption: "*Prontinho*"
}, { quoted: info });
}

if (resultado?.data?.texto) {
return enviar(`*ミResultado:* ${resultado.data.texto}`);
}

enviar("*⚠ Nenhum resultado encontrado!*");
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar dragonball:", erro);
}
},
};
