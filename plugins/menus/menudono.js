module.exports = {
nomes: ["menudono"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
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
┃🫅🏽 DONO
┃╰─»${prefix}fotomenu <@imagem>
┃╰─»${prefix}setprefix <novo prefixo>
┃╰─»${prefix}setnomebot <nome bot>
┃╰─»${prefix}setnomedono <nome dono>
┃╰─»${prefix}setnumerodono <número dono>
┝─⚝─⚝─⚝─⚝─⚝─⚝─⚝
┃🔑 ATIVAÇÕES 
┃╰─»${prefix}bangp
┃╰─»${prefix}botoff <on/off>
┃╰─»${prefix}usarprefix <on/off>
╰─⚝─⚝─⚝─⚝─⚝─⚝─⚝
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
