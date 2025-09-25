module.exports = {
nomes: ["menubrincadeiras"],
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
┃🎮BRINCADEIRAS
┃╰─»${prefix}beijar
┃╰─»${prefix}tapa
┃╰─»${prefix}rankgay
┃╰─»${prefix}rankgostosos
┃╰─»${prefix}rankprogramers
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
