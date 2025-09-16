module.exports = {
  nomes: ["amazon"],
  desc: ["Faz uma busca de produtos no site da amazon!"],
  uso: ["alexa"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textoparametro);

    try {
      const response = await axios.get(`${urlapi}/api/pesquisa/amazon`, {
        params: { apikey: apikey, query: q },
        headers: {
          Accept: "application/json",
          "User-Agent": "Node.js",
        },
      });

      const data = response.data;

      if (data?.error === "Limite diário de requisições excedido") {
        const horaReset = data.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      let itemParaExibir;

      if (data && data.resultado && data.resultado.texto && data.resultado.texto.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.resultado.texto.length);
        itemParaExibir = data.resultado.texto[randomIndex];
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
