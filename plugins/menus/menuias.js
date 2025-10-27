module.exports = {
nomes: ["menuias"],
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

╭━━⪩ INTELIGÊNCIAS ARTIFICIAIS⪨━━
▢ • ${prefix}Gemini (pergunta)
▢ • ${prefix}chatgpt (pergunta)
▢ • ${prefix}todesenho (@imagem)
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
