module.exports = {
  nomes: ["info_pais"],
  desc: ["Obtenha informações e estatísticas de um país!"],
  uso: ["Brasil"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textologo);

    const nomety = Array.isArray(q) ? q.join(" ") : q;
    const apiUrl = `${urlapi}/api/ferramentas/infopais?apikey=${apikey}&query=${encodeURIComponent(nomety)}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Node.js",
        },
      });

      const api = response.data;

      if (api?.error === "Limite diário de requisições excedido") {
        const horaReset = api.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      const resultado = api?.resultado?.texto;

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
