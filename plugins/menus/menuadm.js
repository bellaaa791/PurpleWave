module.exports = {
  nomes: ["menuadm"],
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
┃👑 ADMINISTRAÇÃO
┃╰─»${prefix}ban <@user>
┃╰─»${prefix}promover <@user>
┃╰─»${prefix}rebaixar <@user>
┃╰─»${prefix}nomegp <nome>
┃╰─»${prefix}descgp <descrição>
┃╰─»${prefix}antilinkgp
┃╰─»${prefix}antilinkchannel
┃╰─»${prefix}bemvindo
┃╰─»${prefix}bemvindo2
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
    await bot.sendMessage(
      from,
      { image: { url: fotomenu }, caption: menu },
      { quoted: info }
    );
  },
};
