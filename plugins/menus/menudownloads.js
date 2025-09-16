module.exports = {
  nomes: ["menudownloads"],
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
┃🎥 DOWNLOADS
┃╰─»${prefix}play <nome>
┃╰─»${prefix}youtubemp3 <link>
┃╰─»${prefix}youtubemp4 <link>
┃╰─»${prefix}tiktokmp4 <link>
┃╰─»${prefix}pinterest <link>
┃╰─»${prefix}pinterest2 <link>
┃╰─»${prefix}pinterest3 <link>
┃╰─»${prefix}facebook* <link>
┃╰─»${prefix}instamp4* <link>
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
    await bot.sendMessage(
      from,
      { image: { url: fotomenu }, caption: menu },
      { quoted: info }
    );
  },
};
