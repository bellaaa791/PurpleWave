module.exports = {
nomes: ["ssweb", "printsite"],
desc: ["Faça capturas de sites através do link deles!"],
uso: ["https://hobsdian.shop"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/ferramentas/ssweb?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const data = await requisicaoComLimite(url);

if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}


if (data && data.success && data.data && data.data.texto && data.data.texto.fileUrl) {
const fileUrl = data.data.texto.fileUrl;
console.log("[ssweb] URL da imagem:", fileUrl); 


if (fileUrl) {
await enviarimg(fileUrl, "*ミ Prontinho 🍁*");
} else {
return enviar("*⚠ Não foi possível obter a captura de tela. Tente novamente mais tarde.*");
}
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
console.error("[ssweb] Erro ao processar ssweb:", erro);
return enviar(resposta.erro);
}
},
};
