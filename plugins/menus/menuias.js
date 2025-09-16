module.exports = {
  nomes: ["menuias"],
  uso: [""],
  run: async () => {
    aumentartotalcmds();
    aumentarcmdsgeral();
    const menu = `
╭─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃🐈‍⬛»Bot: *${NomeDoBot}*
┃╰─»Usuário: *${nome}*
┃╰─»Minha Versão: *Beta*
┃╰─»Biblioteca: *Baileys MD*
┃╰─»Dono: *${criador}*
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃⚙️𝘐𝘕𝘍𝘖𝘚 
┃╰─»${prefix}Ping
┃╰─»${prefix}Dados
┃╰─»${prefix}Infodono
┃╰─»${prefix}Infocmd <comando>
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃🤖 INTELIGÊNCIAS ARTIFICIAIS 
┃╰─»${prefix}Gemini (pergunta)
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
    await bot.sendMessage(
      from,
      { image: { url: fotomenu }, caption: menu },
      { quoted: info }
    );
  },
};
