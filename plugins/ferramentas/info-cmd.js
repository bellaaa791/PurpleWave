module.exports = {
  nomes: ["infocmd", "cmdinfo", "ajuda-cmd"],
  desc: ["Exibe informações detalhadas sobre um comando do bot."],
  uso: ["info-cmd seguir"],

  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();
    if (!q) {
      return enviar(
        `❗ Por favor, forneça o nome de um comando. Exemplo: \`${global.prefix}ban\``
      );
    }
    const nomecmd = args[0].toLowerCase();
    const arquivosJs = puxararquivos(pluginsDir);

    let command = null;

    for (const file of arquivosJs) {
      delete require.cache[require.resolve(file)];
      const cmd = require(file);

      if (!cmd.nomes) continue;

      const nomesvalidos = Array.isArray(cmd.nomes)
        ? cmd.nomes.map((n) => n.toLowerCase())
        : [cmd.nomes.toLowerCase()];

      if (nomesvalidos.includes(nomecmd)) {
        command = cmd;
        break;
      }
    }

    if (!command) {
      return enviar(`❌ Comando ou alias não encontrado: \`${nomecmd}\`.`);
    }

    const nome = command.nomes ? command.nomes[0] : "Não especificado";
    const uso = command.uso ? command.uso.join(" | ") : "Não especificado";
    const desc = command.desc ? command.desc.join(" | ") : "Sem descrição";
    const aliases =
      command.nomes.length > 1
        ? command.nomes
            .slice(1)
            .map((a) => `\`${a}\``)
            .join(", ")
        : "Nenhum";

    const resposta = `
📄 *Informações do Comando*

🔹 *Nome:* ${nome}
🔹 *Uso:* ${prefix + nome} ${uso}
🔹 *Aliases:* ${aliases}
🔹 *Descrição:* ${desc}
`.trim();
    await enviar(resposta);
  },
};
