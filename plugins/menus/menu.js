module.exports = {
nomes: ["menu"],
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

╭━━⪩ MENUS ⪨━━
▢ • ${prefix}Menudono
▢ • ${prefix}Menuadm
▢ • ${prefix}Menuias
▢ • ${prefix}Menudonwloads
▢ • ${prefix}Menuferramentas
▢ • ${prefix}Menupesquisas
▢ • ${prefix}Menulogos
▢ • ${prefix}Menustalks
▢ • ${prefix}Menubrincadeiras
╰━━─「💜」─━━

╭━━⪩ INFOS ⪨━━
▢ • ${prefix}Ping
▢ • ${prefix}Dados
▢ • ${prefix}Infodono
▢ • ${prefix}Infocmd <comando>
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
