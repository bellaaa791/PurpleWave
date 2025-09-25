module.exports = {
nomes: ["menu"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
const menu = `
╭─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃🐈‍⬛»Bot: *${NomeDoBot}*
┃╰─»Usuário: *${nome}*
┃╰─»Minha Versão: *2.0*
┃╰─»Biblioteca: *Baileys MD*
┃╰─»Dono: *${criador}*
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃📄𝘓𝘐𝘚𝘛𝘈 𝘋𝘌 𝘔𝘌𝘕𝘜𝘚
┃╰─»${prefix}Menudono
┃╰─»${prefix}Menuadm
┃╰─»${prefix}Menuias
┃╰─»${prefix}Menudonwloads
┃╰─»${prefix}Menuferramentas
┃╰─»${prefix}Menupesquisas
┃╰─»${prefix}Menulogos
┃╰─»${prefix}Menubrincadeiras
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃⚙️𝘐𝘕𝘍𝘖𝘚 
┃╰─»${prefix}Ping
┃╰─»${prefix}Dados
┃╰─»${prefix}Infodono
┃╰─»${prefix}Infocmd <comando>
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
