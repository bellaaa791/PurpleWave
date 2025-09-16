module.exports = {
  nomes: ["tiktoksearch"],
  desc: ["Retorna o vídeo do TikTok e informações dele."],
  uso: ["<zulema zahir>"],
  run: async () => {
    try {
      aumentartotalcmds();
      aumentarcmdsgeral();

      if (!q) return enviar(resposta.textologo);

      const response = await axios.get(`${urlapi}/api/pesquisa/tiktok`, {
        params: {
          apikey: apikey,
          query: q,
        },
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

      const resultado = data.resultado?.texto;

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
