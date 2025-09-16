module.exports = {
  nomes: ["pinterest", "pin", "pinterestimg"],
  desc: ["Pesquise e baixe imagens do Pinterest através de palavras-chave!"],
  uso: ["anime girl"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textologo);

    try {
      const response = await axios.get(`${urlapi}/api/pesquisa/pinterest`, {
        params: { apikey: apikey, query: q },
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

      if (
        api &&
        api.resultado &&
        Array.isArray(api.resultado.texto) &&
        api.resultado.texto.length > 0
      ) {
        for (let item of api.resultado.texto.slice(0, 3)) {
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
