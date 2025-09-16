module.exports = {
  nomes: ["fazernick"],
  desc: ["Transforma um texto normal em diferentes fontes!"],
  uso: ["tokyo"],

  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textoparametro);

    let nomety = Array.isArray(q) ? q.join(" ") : q;

    try {
      const response = await axios.get(
        `${urlapi}/api/ferramentas/fazernick?apikey=${apikey}&query=${encodeURIComponent(nomety)}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Node.js",
          },
        }
      );

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
        let mensagem = `*ミResultados de "${nomety}":*\n\n`;

        api.resultado.texto.forEach((item, index) => {
          if (item.fonte && item.fonte.trim() !== "") {
            const emoji = index % 2 === 0 ? "🍁" : "💞";
            mensagem += `${emoji} ${item.nome}: ${item.fonte}\n`;
          }
        });

        enviar(mensagem);
      } else {
        return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
      }
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar fazernick:", erro);
    }
  },
};
