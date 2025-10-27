module.exports = {
nomes: ["menuferramentas"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
const menu = `
╭━━⪩ INFOS ⪨━━
▢ • Bot: *${NomeDoBot}*
▢ • Usuário: ${nome}
▢ • Dono: *${criador}*
▢ • Minha Versão: *${version}*
▢ • Biblioteca: *Baileys MD*
▢ • Para detalhes de um comando:
▢ • ${prefix}infocmd [nome do comando]
╰━━─「💜」─━━

╭━━⪩ INFOS ⪨━━
▢ • ${prefix}Ping
▢ • ${prefix}Dados
▢ • ${prefix}Infodono
▢ • ${prefix}Infocmd <comando>
╰━━─「💜」─━━ 


╭━━⪩ FERRAMENTAS ⪨━━
▢ • ${prefix}encodebinary <nome>
▢ • ${prefix}unbinary <nome>
▢ • ${prefix}fazernick <nome>
▢ • ${prefix}ssweb <site>
▢ • ${prefix}info_pais <país>
▢ • ${prefix}ping 
▢ • ${prefix}dados
▢ • ${prefix}tourl <@imagem>
▢ • ${prefix}sticker <@imagem/video>
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
