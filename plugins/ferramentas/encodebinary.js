module.exports = {
  nomes: ["encodebinary"],
  desc: ["Transforma um texto normal em um texto binário!"],
  uso: ["encodebinary <texto>"],

  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textologo);

    try {
      const response = await axios.get(
        `${urlapi}/api/ferramentas/encodebinary?apikey=${apikey}&query=${encodeURIComponent(q)}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Node.js",
          },
        }
      );

      const data = response.data;

      if (data?.error === "Limite diário de requisições excedido") {
        const horaReset = data.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      if (data?.resultado?.texto) {
        return enviar(`*ミResultado:* ${data.resultado.texto}`);
      }

      enviar("*⚠ Nenhum resultado encontrado!*");
    } catch (e) {
      enviar(resposta.erro);
      console.error("Erro ao processar encodebinary:", e);
    }
  },
};
