module.exports = {
nomes: ["menuadm"],
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

╭━━⪩ ADMINISTRACAO⪨━━
▢ • ${prefix}ban <@user>
▢ • ${prefix}marcar <@user>
▢ • ${prefix}hidetag <mensagem>
▢ • ${prefix}promover <@user>
▢ • ${prefix}rebaixar <@user>
▢ • ${prefix}nomegp <nome>
▢ • ${prefix}descgp <descrição>
▢ • ${prefix}setlimite <valor>
▢ • ${prefix}rg_mensagem
▢ • ${prefix}del_mensagem
▢ • ${prefix}list_mensagem
▢ • ${prefix}help_rgmensagem
▢ • ${prefix}veruser @user
▢ • ${prefix}resetrank
▢ • ${prefix}addpalavra
▢ • ${prefix}removepalavra
▢ • ${prefix}palavras
▢ • ${prefix}resetpalavras
╰━━─「💜」─━━

╭━━⪩ ATIVACOES ⪨━━
▢ • ${prefix}antilinkgp
▢ • ${prefix}antivideo
▢ • ${prefix}antisticker
▢ • ${prefix}antiimg
▢ • ${prefix}anticatalogo
▢ • ${prefix}antilocalizacao
▢ • ${prefix}anticontato
▢ • ${prefix}antihidetag
▢ • ${prefix}antidocumento
▢ • ${prefix}limitecaracteres
▢ • ${prefix}antistatus
▢ • ${prefix}rankusers
▢ • ${prefix}bemvindo
▢ • ${prefix}bemvindo2
▢ • ${prefix}antipalavra 
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
