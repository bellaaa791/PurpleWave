module.exports = {
  nomes: ["facebook", "facebookmp4", "facebook_video"],
  desc: ["Baixe vídeos do Facebook através do link!"],
  uso: ["https://www.facebook.com/share/r/16wQcNaLpw/"],

  run: async () => {
    if (!q) return enviar(resposta.textologo);

    const nomety = Array.isArray(q) ? q.join(" ") : q;

    try {
      const response = await axios.get(
        `${urlapi}/api/downloads/facebook?apikey=${apikey}&query=${encodeURIComponent(nomety)}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Node.js",
          },
        }
      );

      const api = response.data;

      if (api && api.resultado && api.resultado.texto) {
        enviarvideo(
          api.resultado.texto.video_sd,
          `*ミTítulo:* ${api.resultado.texto.titulo}`
        );
      } else {
        return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
      }
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar:", erro);
    }
  },
};
