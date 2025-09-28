module.exports = {
nomes: ["menuferramentas"],
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
┃⚙️𝘐𝘕𝘍𝘖𝘚 
┃╰─»${prefix}Ping
┃╰─»${prefix}Dados
┃╰─»${prefix}Infodono
┃╰─»${prefix}Infocmd <comando>
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃🧑🏽‍💻 FERRAMENTAS
┃╰─»${prefix}encodebinary <nome>
┃╰─»${prefix}unbinary <nome>
┃╰─»${prefix}fazernick <nome>
┃╰─»${prefix}ssweb <site>
┃╰─»${prefix}info_pais <país>
┃╰─»${prefix}ping 
┃╰─»${prefix}dados
┃╰─»${prefix}tourl <@imagem>
┃╰─»${prefix}sticker <@imagem/video>
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
