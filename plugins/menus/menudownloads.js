module.exports = {
nomes: ["menudownloads"],
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

╭━━⪩ DOWNLOADS ⪨━━
▢ • ${prefix}play <nome>
▢ • ${prefix}youtubemp3 <link>
▢ • ${prefix}youtubemp4 <link>
▢ • ${prefix}tiktokmp4 <link>
▢ • ${prefix}pinterest <link>
▢ • ${prefix}pinterest2 <link>
▢ • ${prefix}pinterest3 <link>
▢ • ${prefix}facebook* <link>
▢ • ${prefix}instamp4* <link>
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
