module.exports = {
nomes: ["menudono"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
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

╭━━⪩ DONO ⪨━━
▢ • ${prefix}fotomenu <@imagem>
▢ • ${prefix}setprefix <novo prefixo>
▢ • ${prefix}setapikey <nova apikey>
▢ • ${prefix}setnomebot <nome bot>
▢ • ${prefix}setnomedono <nome dono>
▢ • ${prefix}setnumerodono <número dono>
▢ • ${prefix}blockcmd <comando>
▢ • ${prefix}unblockcmd <comando>
▢ • ${prefix}blockuser @user
▢ • ${prefix}unblockuser @user
▢ • ${prefix}addcomandodono <NoGrupo>
▢ • ${prefix}delcomandodono <NoGrupo>
▢ • ${prefix}comandosdono <NoGrupo>
▢ • ${prefix}addcomandoadm <NoGrupo>
▢ • ${prefix}delcomandoadm <NoGrupo>
▢ • ${prefix}comandosadm <NoGrupo>
▢ • ${prefix}listarcomandosdono
▢ • ${prefix}listarcomandosadm
▢ • ${prefix}rg_aluguel
▢ • ${prefix}del_aluguel
▢ • ${prefix}alugueis
╰━━─「💜」─━━

╭━━⪩ ATIVAÇÕES ⪨━━
▢ • ${prefix}bangp
▢ • ${prefix}comandosadm 
▢ • ${prefix}comandosdono
▢ • ${prefix}botoff <on/off>
▢ • ${prefix}usarprefix <on/off>
▢ • ${prefix}antipv <on/off>
╰━━─「💜」─━━
`;
await bot.sendMessage(
from,
{ image: { url: fotomenu }, caption: menu },
{ quoted: info }
);
},
};
