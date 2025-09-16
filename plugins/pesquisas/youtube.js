module.exports = {
  nomes: ["youtube", "ytsrc", "ytsearch"],
  desc: ["Pesquisa vídeos no YouTube."],
  uso: ["<nome do vídeo ou artista>"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();
    if (!q) return enviar(resposta.textoparametro);
    try {
      const response = await axios.get(`${urlapi}/api/pesquisa/youtube`, {
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

      if (
        !data ||
        !data.resultado ||
        !Array.isArray(data.resultado.texto) ||
        data.resultado.texto.length === 0
      ) {
        return enviar("⚠ Nenhum vídeo encontrado no YouTube. Tente outro termo!");
      }

      const randomIndex = Math.floor(Math.random() * data.resultado.texto.length);
      const video = data.resultado.texto[randomIndex];

      const textoresultado = `
*🎬 Título:* ${video.title || "não encontrado"}

*📺 Canal:* ${video.author?.name || "não encontrado"}

*🔗 Link:* ${video.url || "não encontrado"}

*🕒 Duração:* ${video.timestamp || "não encontrado"}

*👀 Views:* ${video.views?.toLocaleString() || "não encontrado"}

*📅 Publicado:* ${video.ago || "não encontrado"}

*📝 Descrição:* ${
        video.description ? video.description.substring(0, 200) + "..." : "não encontrado"
      }
`;

      bot.sendMessage(
        from,
        {
          image: { url: video.thumbnail || fotomenu },
          caption: textoresultado,
        },
        { quoted: info }
      );
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar pesquisa do YouTube:", erro);
    }
  },
};
