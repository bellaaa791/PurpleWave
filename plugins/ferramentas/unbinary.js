module.exports = {
  nomes: ["unbinary"],
  desc: ["Transforma um texto binário em um texto normal"],
  uso: ["1010100 1101111 1101011 1111001 1101111"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();
    if (!q) {
      return enviar(resposta.textologo);
    }

    const nomety = Array.isArray(q) ? q.join(" ") : q;

    try {
      const response = await axios.get(
        `${urlapi}/api/ferramentas/unbinary`,
        {
          params: {
            apikey: apikey,
            query: nomety,
          },
          headers: {
            Accept: "application/json",
            "User-Agent": "Node.js",
          },
        }
      );

      const api = response.data;

      if (api?.error === "Limite diário de requisições excedido") {
        const horaReset = api.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(
          `⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`
        );
      }

      if (api && api.resultado && api.resultado.texto) {
        enviar(`*ミResultado:* ${api.resultado.texto}`);
      } else {
        console.log("Nenhum resultado válido encontrado para:", nomety, "Resposta da API:", api);
        return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
      }
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar unbinary:", erro);
    }
  },
};
