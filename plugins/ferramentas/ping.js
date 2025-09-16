const os = require("os");
const moment = require("moment-timezone");

module.exports = {
  nomes: ["ping"],
  desc: ["Obtenha estatísticas e informações do sistema do bot!"],
  uso: [""],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();

    try {
      let r = Date.now() / 1000 - (info?.messageTimestamp || 0);
      let uptime = process.uptime();
      let hora1 = moment.tz("America/Sao_Paulo").format("HH:mm:ss");

      const kyun = (seconds) => {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${d}d ${h}h ${m}m ${s}s`;
      };

      const response = await axios.get(`${urlapi}/api/canvas/pingV2`, {
        params: {
          apikey: apikey,
          velocidade: r.toFixed(3),
          nomebot: "Nyxbot",
          query: "bs",
          imgperfil: profilebot,
          imgbanner: bannerbot,
        },
        responseType: "arraybuffer",
      });

      if (response.data?.error === "Limite diário de requisições excedido") {
        const horaReset = response.data.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
        return enviar(`⚠ *Limite diário da API excedido!*\nÉ necessário atualizar o plano ou esperar até *${horaReset}* ⏳`);
      }

      const fotobuffer = Buffer.from(response.data);

      const respon =
        `⏱*Ahn… essa é a velocidade de resposta...* ${r.toFixed(3)} _segundos._\n` +
        `*Uhm… eu estou online há… esse tempinho… ❄️:* ${kyun(uptime)}\n` +
        `*Hora atual:* ${hora1}\n` +
        `*Sistema Operacional:* ${os.type()}\n` +
        `*Versão:* ${os.release()}\n` +
        `*Memória RAM total:* ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB\n` +
        `*Memória RAM disponível:* ${(os.freemem() / 1024 ** 3).toFixed(2)} GB`;

      await bot.sendMessage(from, { image: fotobuffer, caption: respon }, { quoted: info });
    } catch (erro) {
      enviar(resposta.erro);
      console.error("Erro ao processar ping:", erro);
    }
  },
};
