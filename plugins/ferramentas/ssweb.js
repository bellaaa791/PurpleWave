module.exports = {
  nomes: ["ssweb", "printsite"],
  desc: ["Faça capturas de sites através do link deles!"],
  uso: ["https://hobsdian.shop"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();
    if (!q) return enviar(resposta.textologo);
    const nomety = Array.isArray(q) ? q.join(" ") : q;
    const apiUrl = `${urlapi}/api/ferramentas/ssweb?apikey=${apikey}&query=${encodeURIComponent(nomety)}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: { Accept: "application/json", "User-Agent": "Node.js" },
      });

      let api = response.data;

      if (api.error === "Limite diário de requisições excedido") {
        const horaReset = api.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      const resultado = api?.resultado?.texto;

      if (resultado && resultado.success && resultado.fileUrl) {
        await enviarimg(resultado.fileUrl, "*ミ Prontinho 🍁*");
      } else {
        console.log("[ssweb] Resultado inválido:", resultado);
        return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
      }
    } catch (erro) {
      console.error("[ssweb] Erro ao processar ssweb:", erro);
      return enviar(resposta.erro);
    }
  },
};
