module.exports = {
  nomes: ["gemini"],
  desc: ["Faça uma pergunta a IA do gemini!"],
  uso: ["Boa noite,oque foi a segunda guerra mundial?"],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    if (!q) return enviar(resposta.textologo);

    const nomety = Array.isArray(q) ? q.join(" ") : q;

    try {
      const response = await axios.get(
        `${urlapi}/api/ias/geminitexto`,
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

      const data = response.data;

      if (data?.error === "Limite diário de requisições excedido") {
        const horaReset = data.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      if (data?.resultado?.texto) {
        console.log(data.resultado.texto);
        return enviar(`*ミResultado:* ${data.resultado.texto}`);
      }

      console.log(data);
      enviar("*⚠ Nenhum resultado encontrado!*");
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar gemini:", erro);
    }
  },
};
