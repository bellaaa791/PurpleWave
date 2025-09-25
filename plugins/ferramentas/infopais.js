module.exports = {
nomes: ["info_pais"],
desc: ["Obtenha informações e estatísticas de um país!"],
uso: ["Brasil"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
try {
if (!q) return enviar(resposta.textoparametro);
const url = `${urlapi}/api/ferramentas/infopais?query=${q}&apikey=${apikey}`
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}

const resultado = data.data.texto;

if (!resultado || !resultado.imagem) {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}

const caption = `
🇧🇷 *${resultado.nome_bandeira}*

📝 *Descrição:*
${resultado.descricao}

🌎 *Informações do país:*
🏛 Estado soberano: ${resultado.informacoes_pais.estado_soberano}
📌 Nome oficial: ${resultado.informacoes_pais.nome_oficial}
🏙 Capital: ${resultado.informacoes_pais.capital}
🌍 Continente: ${resultado.informacoes_pais.continente}
🤝 Membro de: ${resultado.informacoes_pais.membro_de}
👥 População: ${resultado.informacoes_pais.população}
🗺 Área total: ${resultado.informacoes_pais.área_total}
⛰ Ponto mais alto: ${resultado.informacoes_pais.ponto_mais_alto}
🌊 Ponto mais baixo: ${resultado.informacoes_pais.ponto_mais_baixo}
💰 PIB per capita: ${resultado.informacoes_pais.pib_para_acontecer}
💵 Moeda: ${resultado.informacoes_pais.moeda}
📞 Código de chamada: ${resultado.informacoes_pais["código_de_chamada"]}
💻 Internet TLD: ${resultado.informacoes_pais.internet_tld}
`.trim();

await enviarimg(resultado.imagem, caption);
} catch (erro) {
console.error("[info_pais] Erro ao processar comando:", erro);
return enviar(resposta.erro);
}
},
};
