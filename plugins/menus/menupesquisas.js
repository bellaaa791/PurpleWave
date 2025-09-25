module.exports = {
nomes: ["menupesquisas"],
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
┃🔎 PESQUISAS
┃╰─»${prefix}tiktoksearch <nome>
┃╰─»${prefix}steam <jogo>
┃╰─»${prefix}ytsrc <nome>
┃╰─»${prefix}amazon <produto>
┃╰─»${prefix}pinterest <nome>
┃╰─»${prefix}letra <nome>
┃╰─»${prefix}applemusic <nome>
┃╰─»${prefix}imdb <nome>
┃╰─»${prefix}npmjs <nome>
┃╰─»${prefix}kwaisearch <nome>
┃╰─»${prefix}versiculo <nome>
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;

await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
