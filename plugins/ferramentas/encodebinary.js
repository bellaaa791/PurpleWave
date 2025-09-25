module.exports = {
nomes: ["encodebinary"],
desc: ["Transforma um texto normal em um texto binário!"],
uso: ["tokyo"],

run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

try {
const url = `${urlapi}/api/ferramentas/encodebinary?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
if (data?.data?.texto) {
return enviar(`*ミResultado:* ${data.data.texto}`);
}

enviar("*⚠ Nenhum resultado encontrado!*");
} catch (e) {
enviar(resposta.erro);
console.error("Erro ao processar encodebinary:", e);
}
},
};
